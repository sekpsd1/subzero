import "server-only";
import { Prisma, type UserRole } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import {
  CatalogError,
  text,
  version,
  slug,
} from "@/lib/catalog/validation.mjs";
import { audit } from "@/lib/catalog/service";
import { postInput } from "./validation";
export const postInclude = {
  category: true,
  tags: true,
  seoMeta: true,
} satisfies Prisma.PostInclude;
export async function options() {
  const db = getPrisma();
  const [categories, tags] = await Promise.all([
    db.postCategory.findMany({ orderBy: { name: "asc" } }),
    db.postTag.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { categories, tags };
}
export async function listPosts(params: URLSearchParams) {
  const q = text(params.get("q"), "search", 100) || "",
    status = params.get("status") || "",
    deleted = params.get("deleted") || "live",
    raw = params.get("page") || "1";
  if (
    !/^[1-9]\d{0,5}$/.test(raw) ||
    !["", "DRAFT", "PUBLISHED", "ARCHIVED"].includes(status) ||
    !["live", "deleted"].includes(deleted)
  )
    throw new CatalogError(422, "Invalid filters.");
  const where: Prisma.PostWhereInput = {
    deletedAt: deleted === "deleted" ? { not: null } : null,
    ...(status ? { status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } : {}),
    ...(q
      ? { OR: [{ title: { contains: q } }, { slug: { contains: q } }] }
      : {}),
  };
  return getPrisma().$transaction(
    async (tx) => {
      const total = await tx.post.count({ where }),
        pages = Math.max(1, Math.ceil(total / 20)),
        page = Math.min(Number(raw), pages);
      const posts = await tx.post.findMany({
        where,
        take: 20,
        skip: (page - 1) * 20,
        orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          deletedAt: true,
          publishedAt: true,
          category: { select: { name: true } },
        },
      });
      return { posts, total, page, pages, filters: { q, status, deleted } };
    },
    { isolationLevel: "RepeatableRead" },
  );
}
export async function lockPost(
  tx: Prisma.TransactionClient,
  id: string,
  expected: unknown,
  allowDeleted = false,
) {
  await tx.$queryRaw`SELECT id FROM Post WHERE id = ${id} FOR UPDATE`;
  const old = await tx.post.findUnique({ where: { id }, include: postInclude });
  if (!old) throw new CatalogError(404, "Post not found.");
  if (!allowDeleted && old.deletedAt)
    throw new CatalogError(409, "Restore this post before editing.");
  if (old.updatedAt.getTime() !== version(expected).getTime())
    throw new CatalogError(409, "Post changed. Reload before saving.");
  return old;
}
export async function savePost(
  userId: string,
  role: UserRole,
  input: Record<string, unknown>,
  id?: string,
) {
  const { tagIds, seo, categoryId, ...data } = postInput(input);
  return getPrisma().$transaction(
    async (tx) => {
      const old = id ? await lockPost(tx, id, input.updatedAt) : null;
      if (
        role !== "ADMIN" &&
        (data.status === "PUBLISHED" || old?.status === "PUBLISHED")
      )
        throw new CatalogError(
          403,
          "Only ADMIN can save published content or change publication.",
        );
      if (
        categoryId &&
        !(await tx.postCategory.findUnique({ where: { id: categoryId } }))
      )
        throw new CatalogError(422, "Category no longer exists.");
      if (
        (await tx.postTag.count({ where: { id: { in: tagIds } } })) !==
        tagIds.length
      )
        throw new CatalogError(422, "Tag no longer exists.");
      // monotonic revision survives rapid sequential changes within the same millisecond.
      const updatedAt = new Date(
        Math.max(Date.now(), (old?.updatedAt.getTime() || 0) + 1),
      );
      const publishedAt =
        data.status === "PUBLISHED" ? old?.publishedAt || new Date() : null;
      const post = id
        ? await tx.post.update({
            where: { id },
            data: {
              ...data,
              category: categoryId
                ? { connect: { id: categoryId } }
                : { disconnect: true },
              updatedAt,
              publishedAt,
              tags: { set: tagIds.map((id) => ({ id })) },
              seoMeta: { upsert: { create: seo, update: seo } },
            },
            include: postInclude,
          })
        : await tx.post.create({
            data: {
              ...data,
              category: categoryId
                ? { connect: { id: categoryId } }
                : undefined,
              updatedAt,
              publishedAt,
              author: { connect: { id: userId } },
              tags: { connect: tagIds.map((id) => ({ id })) },
              seoMeta: { create: seo },
            },
            include: postInclude,
          });
      await audit(tx, userId, id ? "UPDATE" : "CREATE", "Post", post.id);
      return post;
    },
    { isolationLevel: "Serializable" },
  );
}
export async function lifecycle(
  userId: string,
  id: string,
  input: Record<string, unknown>,
  restore: boolean,
) {
  return getPrisma().$transaction(async (tx) => {
    const old = await lockPost(tx, id, input.updatedAt, true);
    if (restore !== Boolean(old.deletedAt))
      throw new CatalogError(409, "Lifecycle already changed.");
    const post = await tx.post.update({
      where: { id },
      data: {
        deletedAt: restore ? null : new Date(),
        status: "DRAFT",
        publishedAt: null,
        updatedAt: new Date(Math.max(Date.now(), old.updatedAt.getTime() + 1)),
      },
      include: postInclude,
    });
    await audit(
      tx,
      userId,
      restore ? "RESTORE_AS_DRAFT" : "SOFT_DELETE",
      "Post",
      id,
    );
    return post;
  });
}
export async function taxonomy(
  userId: string,
  kind: "categories" | "tags",
  input: Record<string, unknown>,
  remove = false,
) {
  const id = text(input.id, "id"),
    name = text(input.name, "name", 191, !remove),
    value = remove ? null : slug(input.slug);
  return getPrisma().$transaction(
    async (tx) => {
      const model =
        kind === "categories"
          ? tx.postCategory
          : (tx.postTag as unknown as typeof tx.postCategory);
      if (remove) {
        if (!id) throw new CatalogError(422, "ID required.");
        const old = await model.findUnique({ where: { id } });
        if (!old) throw new CatalogError(404, "Record not found.");
        if (input.previousName !== old.name || input.previousSlug !== old.slug)
          throw new CatalogError(
            409,
            "Taxonomy changed. Reload before deleting.",
          );
        if (
          await tx.post.count({
            where:
              kind === "categories"
                ? { categoryId: id }
                : { tags: { some: { id } } },
          })
        )
          throw new CatalogError(
            409,
            "Record is used by posts, including deleted posts.",
          );
        await model.delete({ where: { id } });
        await audit(tx, userId, "DELETE", kind, id);
        return { id };
      }
      const existing = await model.findFirst({
        where: {
          OR: [{ name: name! }, { slug: value! }],
          ...(id ? { id: { not: id } } : {}),
        },
      });
      if (existing) throw new CatalogError(409, "Name or slug already exists.");
      if (id) {
        const old = await model.findUnique({ where: { id } });
        if (!old) throw new CatalogError(404, "Record not found.");
        if (input.previousName !== old.name || input.previousSlug !== old.slug)
          throw new CatalogError(
            409,
            "Taxonomy changed. Reload before saving.",
          );
      }
      const record = id
        ? await model.update({
            where: { id },
            data: { name: name!, slug: value! },
          })
        : await model.create({ data: { name: name!, slug: value! } });
      await audit(tx, userId, id ? "UPDATE" : "CREATE", kind, record.id);
      return record;
    },
    { isolationLevel: "Serializable" },
  );
}
