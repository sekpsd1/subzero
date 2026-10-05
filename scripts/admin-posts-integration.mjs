import "dotenv/config";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getPrisma } from "./admin-db.mjs";
import { randomToken, digest } from "../src/lib/auth/crypto.mjs";
const base = process.env.NEXT_PUBLIC_SITE_URL;
if (
  base !== "https://new.subzerowolf-sea.com" ||
  path.basename(process.cwd()) !== "new.subzerowolf-sea.com"
)
  throw Error("Staging only.");
const db = getPrisma(),
  marker = "posts-test-" + randomBytes(8).toString("hex"),
  users = [],
  posts = [],
  categories = [],
  tags = [],
  media = [],
  seos = [];
let checks = 0;
function ok(value, name) {
  assert(value, name);
  checks++;
  console.log("PASS", name);
}
async function call(
  route,
  { method = "GET", body, cookie, origin = base, raw, contentType } = {},
) {
  const r = await fetch(base + route, {
    method,
    redirect: "manual",
    headers: {
      ...(cookie ? { cookie } : {}),
      ...(origin ? { origin } : {}),
      ...(body ? { "content-type": "application/json" } : {}),
      ...(contentType ? { "content-type": contentType } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : raw ? { body: raw } : {}),
  });
  let value;
  try {
    value = await r.json();
  } catch {
    value = null;
  }
  return { status: r.status, value };
}
const ownerBefore = await db.user.findMany({
  where: { role: "ADMIN" },
  select: { id: true, updatedAt: true },
});
try {
  const cookies = {};
  for (const role of ["ADMIN", "STAFF"]) {
    const u = await db.user.create({
      data: {
        name: "Disposable posts test",
        email: marker + "-" + role + "@example.invalid",
        role,
        passwordHash: "disabled-disposable-no-login",
      },
    });
    users.push(u.id);
    const token = randomToken();
    await db.adminSession.create({
      data: {
        tokenHash: digest(token),
        userId: u.id,
        expiresAt: new Date(Date.now() + 900000),
      },
    });
    cookies[role] = "__Host-sz-admin=" + token;
  }
  const admin = cookies.ADMIN,
    staff = cookies.STAFF;
  ok(
    (await call("/api/admin/posts")).status === 401,
    "private API unauthenticated",
  );
  ok((await call("/admin/posts")).status === 307, "private list redirects");
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        origin: null,
        body: {},
      })
    ).status === 403,
    "missing Origin",
  );
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        origin: "https://example.invalid",
        body: {},
      })
    ).status === 403,
    "foreign Origin",
  );
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        body: {},
      })
    ).status === 422,
    "invalid fields",
  );
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        raw: "{bad",
        contentType: "application/json",
      })
    ).status === 400,
    "malformed JSON",
  );
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        raw: "x".repeat(262145),
        contentType: "application/json",
      })
    ).status === 413,
    "bounded body",
  );
  let r = await call("/api/admin/posts/taxonomy/categories", {
    method: "POST",
    cookie: staff,
    body: { name: marker, slug: marker },
  });
  ok(r.status === 200, "STAFF category create");
  let category = r.value.data;
  categories.push(category.id);
  r = await call("/api/admin/posts/taxonomy/tags", {
    method: "POST",
    cookie: staff,
    body: { name: marker, slug: marker },
  });
  ok(r.status === 200, "STAFF tag create");
  let tag = r.value.data;
  tags.push(tag.id);
  ok(
    (
      await call("/api/admin/posts/taxonomy/tags", {
        method: "POST",
        cookie: staff,
        body: { name: marker, slug: marker + "-duplicate" },
      })
    ).status === 409,
    "duplicate taxonomy name denied",
  );
  const payload = {
    title: "Persistent article " + marker,
    slug: marker,
    excerpt: "Database excerpt",
    content:
      '<h2>Editorial</h2><p onclick="evil()">Safe <strong>content</strong></p><script>alert(1)</script><img src=x onerror=alert(1)><a href="java&#x73;cript:alert(1)">unsafe</a>',
    categoryId: category.id,
    tagIds: [tag.id],
    status: "DRAFT",
    seo: {
      metaTitle: "SEO " + marker,
      metaDescription: "Search description",
      canonicalUrl: base + "/journal/" + marker,
      ogTitle: "OG " + marker,
      ogDescription: "Social description",
      robots: "index, follow",
      sitemapVisible: true,
    },
    authorId: "forged",
    deletedAt: new Date().toISOString(),
    role: "ADMIN",
    coverImage: "https://evil.invalid/a.svg",
  };
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        body: { ...payload, status: "PUBLISHED" },
      })
    ).status === 403,
    "STAFF publish denied",
  );
  r = await call("/api/admin/posts", {
    method: "POST",
    cookie: staff,
    body: payload,
  });
  ok(r.status === 201, "STAFF creates Draft");
  let post = r.value.data;
  posts.push(post.id);
  seos.push(post.seoMetaId);
  const route = "/api/admin/posts/" + post.id;
  let persisted = await db.post.findUnique({
    where: { id: post.id },
    include: { tags: true, seoMeta: true },
  });
  ok(
    persisted.excerpt === payload.excerpt &&
      persisted.tags[0].id === tag.id &&
      persisted.seoMeta.metaTitle === payload.seo.metaTitle,
    "actual MySQL fields relations SEO persisted",
  );
  ok(
    !persisted.coverImage &&
      !persisted.deletedAt &&
      persisted.authorId === users[1],
    "forged private fields ignored",
  );
  ok(
    !/script|onclick|onerror|javascript:|<img/i.test(persisted.content),
    "stored XSS sanitized",
  );
  ok(
    (await call(route, { cookie: staff })).value.data.title === payload.title,
    "reload from API retains article",
  );
  ok(
    !(await call("/api/journal")).value.data.some((p) => p.slug === marker),
    "Draft public API hidden",
  );
  ok(
    (await call("/admin/posts/" + post.id + "/preview")).status === 307,
    "private preview unauthenticated",
  );
  ok(
    (await call("/admin/posts/" + post.id + "/preview", { cookie: staff }))
      .status === 200,
    "STAFF saved preview",
  );
  ok((await call("/journal/" + marker)).status === 404, "no public Draft URL");
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        body: payload,
      })
    ).status === 409,
    "duplicate post slug",
  );
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        body: { ...payload, slug: marker + "-bad", tagIds: ["foreign"] },
      })
    ).status === 422,
    "unknown tag denied",
  );
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        body: { ...payload, slug: marker + "-bad", categoryId: "foreign" },
      })
    ).status === 422,
    "unknown category denied",
  );
  ok(
    (
      await call("/api/admin/posts", {
        method: "POST",
        cookie: staff,
        body: {
          ...payload,
          slug: marker + "-bad",
          seo: { ...payload.seo, canonicalUrl: "javascript:evil()" },
        },
      })
    ).status === 422,
    "unsafe canonical denied",
  );
  const initialVersion = post.updatedAt;
  r = await call(route, {
    method: "PATCH",
    cookie: staff,
    body: { ...payload, title: "Edited " + marker, updatedAt: post.updatedAt },
  });
  ok(r.status === 200, "STAFF edit");
  post = r.value.data;
  ok(
    (
      await call(route, {
        method: "PATCH",
        cookie: staff,
        body: { ...payload, updatedAt: initialVersion },
      })
    ).status === 409,
    "stale text edit denied",
  );
  ok(
    (
      await call(route, {
        method: "PATCH",
        cookie: staff,
        body: { ...payload },
      })
    ).status === 422,
    "missing revision denied",
  );
  const png = await sharp({
    create: { width: 40, height: 30, channels: 3, background: "#999" },
  })
    .png()
    .toBuffer();
  async function upload(bytes, mime = "image/png", revision = post.updatedAt) {
    const f = new FormData();
    f.set("file", new Blob([bytes], { type: mime }), "test.png");
    f.set("updatedAt", revision);
    return call(route + "/cover", { method: "POST", cookie: staff, raw: f });
  }
  ok(
    (await upload(Buffer.from("<svg/>"), "image/svg+xml")).status === 415,
    "SVG rejected",
  );
  ok(
    (await upload(Buffer.from("not image"))).status === 422,
    "spoof image rejected",
  );
  ok(
    (await upload(png, "image/jpeg")).status === 422,
    "MIME mismatch rejected",
  );
  ok(
    (await upload(Buffer.alloc(5 * 1024 * 1024 + 1))).status === 422,
    "oversized file rejected",
  );
  r = await upload(png);
  ok(r.status === 200, "cover decoded and saved");
  post = r.value.data;
  const image = post.coverImage;
  media.push(image.split("/").pop());
  ok(post.seoMeta.ogImage === image, "cover populates OG image");
  ok((await fetch(base + image)).status === 404, "Draft image public denied");
  ok(
    (await fetch(base + image, { headers: { cookie: staff } })).status === 200,
    "Draft image authorized",
  );
  ok(
    (await upload(png, "image/png", initialVersion)).status === 409,
    "stale image upload denied",
  );
  ok(
    (
      await call(route, {
        method: "DELETE",
        cookie: staff,
        body: { updatedAt: post.updatedAt, role: "ADMIN" },
      })
    ).status === 403,
    "STAFF delete denied",
  );
  r = await call(route, {
    method: "PATCH",
    cookie: admin,
    body: { ...payload, status: "PUBLISHED", updatedAt: post.updatedAt },
  });
  ok(r.status === 200, "ADMIN publishes");
  post = r.value.data;
  ok(!!post.publishedAt, "server publication time");
  const publicPost = (await call("/api/journal")).value.data.find(
    (p) => p.slug === marker,
  );
  ok(
    publicPost &&
      Object.keys(publicPost).sort().join(",") ===
        "category,excerpt,image,slug,status,title",
    "public exact existing field contract",
  );
  ok((await fetch(base + image)).status === 200, "published image public");
  ok(
    (
      await call(route, {
        method: "PATCH",
        cookie: staff,
        body: { ...payload, status: "PUBLISHED", updatedAt: post.updatedAt },
      })
    ).status === 403,
    "STAFF published content save denied",
  );
  ok((await upload(png)).status === 403, "STAFF published cover denied");
  ok(
    (
      await call(route + "/cover", {
        method: "DELETE",
        cookie: staff,
        body: { updatedAt: post.updatedAt },
      })
    ).status === 403,
    "STAFF published cover removal denied",
  );
  r = await call(route, {
    method: "PATCH",
    cookie: admin,
    body: { ...payload, status: "ARCHIVED", updatedAt: post.updatedAt },
  });
  ok(r.status === 200, "ADMIN archives published");
  post = r.value.data;
  ok(
    !(await call("/api/journal")).value.data.some((p) => p.slug === marker),
    "Archived public hidden",
  );
  r = await call(route, {
    method: "DELETE",
    cookie: admin,
    body: { updatedAt: post.updatedAt },
  });
  ok(r.status === 200 && r.value.data.deletedAt, "ADMIN soft deletes");
  post = r.value.data;
  ok(
    (
      await call(route, {
        method: "PATCH",
        cookie: staff,
        body: { ...payload, updatedAt: post.updatedAt },
      })
    ).status === 409,
    "deleted article edit denied",
  );
  ok((await fetch(base + image)).status === 404, "deleted image public hidden");
  ok(
    (
      await call(route + "/restore", {
        method: "POST",
        cookie: staff,
        body: { updatedAt: post.updatedAt },
      })
    ).status === 403,
    "STAFF restore denied",
  );
  ok(
    (
      await call("/api/admin/posts/taxonomy/categories", {
        method: "DELETE",
        cookie: admin,
        body: {
          id: category.id,
          previousName: category.name,
          previousSlug: category.slug,
        },
      })
    ).status === 409,
    "deleted relationship category retained",
  );
  ok(
    (
      await call("/api/admin/posts/taxonomy/tags", {
        method: "DELETE",
        cookie: admin,
        body: { id: tag.id, previousName: tag.name, previousSlug: tag.slug },
      })
    ).status === 409,
    "deleted relationship tag retained",
  );
  r = await call(route + "/restore", {
    method: "POST",
    cookie: admin,
    body: { updatedAt: post.updatedAt },
  });
  ok(
    r.status === 200 &&
      r.value.data.status === "DRAFT" &&
      !r.value.data.deletedAt &&
      !r.value.data.publishedAt,
    "restore always Draft",
  );
  post = r.value.data;
  r = await call(route + "/cover", {
    method: "DELETE",
    cookie: staff,
    body: { updatedAt: post.updatedAt },
  });
  ok(r.status === 200 && !r.value.data.coverImage, "cover removal persisted");
  post = r.value.data;
  ok(
    (await fetch(base + image, { headers: { cookie: staff } })).status === 404,
    "unlinked cover inaccessible",
  );
  r = await call("/api/admin/posts/taxonomy/tags", {
    method: "POST",
    cookie: staff,
    body: {
      ...tag,
      name: marker + " edited",
      previousName: tag.name,
      previousSlug: tag.slug,
    },
  });
  ok(r.status === 200, "taxonomy edit");
  ok(
    (
      await call("/api/admin/posts/taxonomy/tags", {
        method: "POST",
        cookie: staff,
        body: {
          ...tag,
          name: marker + " stale",
          previousName: tag.name,
          previousSlug: tag.slug,
        },
      })
    ).status === 409,
    "stale taxonomy edit",
  );
  for (let i = 0; i < 21; i++) {
    const p = await db.post.create({
      data: {
        title: marker + " page " + i,
        slug: marker + "-page-" + i,
        content: "<p>Pagination</p>",
      },
    });
    posts.push(p.id);
  }
  const page1 = (
      await call("/api/admin/posts?q=" + marker + "&status=DRAFT&page=1", {
        cookie: staff,
      })
    ).value.data,
    page2 = (
      await call("/api/admin/posts?q=" + marker + "&status=DRAFT&page=2", {
        cookie: staff,
      })
    ).value.data;
  ok(
    page1.total === 22 && page1.posts.length === 20 && page2.posts.length === 2,
    "server pagination 20 plus 2",
  );
  ok(
    !page1.posts.some((p) => page2.posts.some((q) => p.id === q.id)),
    "stable pagination no repeated rows",
  );
  ok(
    (await db.auditLog.count({
      where: { entity: "Post", entityId: post.id, userId: { in: users } },
    })) >= 8,
    "audit persisted",
  );
  ok(
    (await db.auditLog.findMany({ where: { userId: { in: users } } })).every(
      (a) => a.metadata === null,
    ),
    "audit excludes bodies and credentials",
  );
  await db.user.update({ where: { id: users[1] }, data: { role: "ADMIN" } });
  r = await call(route, {
    method: "PATCH",
    cookie: staff,
    body: { ...payload, status: "PUBLISHED", updatedAt: post.updatedAt },
  });
  ok(r.status === 200, "role reread from current DB session");
  console.log("POSTS_INTEGRATION_OK", checks);
} finally {
  await db.post.deleteMany({ where: { id: { in: posts } } });
  await db.seoMeta.deleteMany({ where: { id: { in: seos } } });
  await db.postTag.deleteMany({ where: { id: { in: tags } } });
  await db.postCategory.deleteMany({ where: { id: { in: categories } } });
  await db.media.deleteMany({ where: { id: { in: media } } });
  for (const id of media)
    await unlink(path.join(process.cwd(), ".post-media", id + ".webp")).catch(
      () => {},
    );
  await db.auditLog.deleteMany({ where: { userId: { in: users } } });
  await db.adminSession.deleteMany({ where: { userId: { in: users } } });
  await db.user.deleteMany({ where: { id: { in: users } } });
  assert.deepEqual(
    await db.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true, updatedAt: true },
    }),
    ownerBefore,
  );
  await db.$disconnect();
  console.log("Disposable test data cleaned; owner unchanged.");
}
