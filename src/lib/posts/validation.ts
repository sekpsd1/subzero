import { CatalogError, object, text, slug } from "@/lib/catalog/validation.mjs";
import { sanitizeContent } from "./content.mjs";
export function postInput(input: unknown) {
  const b = object(input) as Record<string, unknown>;
  const title = text(b.title, "title", 191, true)!;
  let content;
  try {
    content = sanitizeContent(b.content);
  } catch {
    throw new CatalogError(
      422,
      "Content must be HTML text, maximum 120000 characters.",
    );
  }
  if (!content.replace(/<[^>]*>/g, "").trim())
    throw new CatalogError(422, "Content is required.");
  if (!["DRAFT", "PUBLISHED", "ARCHIVED"].includes(String(b.status)))
    throw new CatalogError(422, "Invalid status.");
  if (
    !Array.isArray(b.tagIds) ||
    b.tagIds.length > 30 ||
    b.tagIds.some((v) => typeof v !== "string" || v.length > 191) ||
    new Set(b.tagIds).size !== b.tagIds.length
  )
    throw new CatalogError(422, "Choose up to 30 unique tags.");
  const seo = object(b.seo || {}) as Record<string, unknown>;
  const canonicalUrl = text(seo.canonicalUrl, "canonical", 191);
  if (canonicalUrl) {
    let url;
    try {
      url = new URL(canonicalUrl);
    } catch {
      throw new CatalogError(422, "Canonical must be an absolute HTTPS URL.");
    }
    if (url.protocol !== "https:" || url.username || url.password)
      throw new CatalogError(422, "Canonical must be an absolute HTTPS URL.");
  }
  const robots = text(seo.robots, "robots", 100) || "index, follow";
  if (!/^(index|noindex), (follow|nofollow)$/.test(robots))
    throw new CatalogError(422, "Invalid robots directive.");
  if (
    seo.sitemapVisible !== undefined &&
    typeof seo.sitemapVisible !== "boolean"
  )
    throw new CatalogError(422, "Invalid sitemap visibility.");
  return {
    title,
    slug: slug(b.slug)!,
    excerpt: text(b.excerpt, "excerpt", 2000),
    content,
    status: b.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    categoryId: text(b.categoryId, "category"),
    tagIds: b.tagIds as string[],
    seo: {
      metaTitle: text(seo.metaTitle, "SEO title", 191),
      metaDescription: text(seo.metaDescription, "SEO description", 2000),
      canonicalUrl,
      ogTitle: text(seo.ogTitle, "OG title", 191),
      ogDescription: text(seo.ogDescription, "OG description", 2000),
      robots,
      sitemapVisible: seo.sitemapVisible !== false,
    },
  };
}
