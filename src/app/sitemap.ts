import type { MetadataRoute } from "next";
import { mainNavigation, products } from "@/lib/site-data";
import { slugify } from "@/lib/utils";

const baseUrl = "https://subzerowolf-sea.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/showroom",
    "/showroom/appointment",
    "/showroom/dealers",
    "/journal",
    "/support",
    "/trade",
    "/our-story",
    "/inspiration",
  ];

  const navRoutes = mainNavigation.flatMap((item) => [
    item.href,
    ...(item.children ?? []).map((child) => child.href),
  ]);

  const productRoutes = products.map((product) => `/products/${slugify(product.model)}`);

  return [...staticRoutes, ...navRoutes, ...productRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
