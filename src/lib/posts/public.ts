import "server-only";
import { getPrisma } from "@/lib/prisma";
export function publicPostWhere() {
  return {
    status: "PUBLISHED" as const,
    deletedAt: null,
    publishedAt: { lte: new Date() },
  };
}
export async function publicJournal() {
  const rows = await getPrisma().post.findMany({
    where: publicPostWhere(),
    orderBy: [{ publishedAt: "desc" }, { id: "asc" }],
    select: {
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      category: { select: { name: true } },
    },
  });
  return rows.map((p) => ({
    title: p.title,
    slug: p.slug,
    category: p.category?.name || "",
    excerpt: p.excerpt || "",
    status: "published",
    image: p.coverImage || "",
  }));
}
// Consumer for future public-page integration; no unresolved public URLs added to sitemap.
export async function sitemapPosts() {
  return getPrisma().post.findMany({
    where: {
      ...publicPostWhere(),
      seoMeta: {
        is: {
          sitemapVisible: true,
          NOT: { robots: { startsWith: "noindex" } },
        },
      },
    },
    select: {
      slug: true,
      updatedAt: true,
      seoMeta: { select: { canonicalUrl: true } },
    },
  });
}
