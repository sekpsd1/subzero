import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { DiscoverSubZeroPage } from "@/components/ProductPages/DiscoverSubZeroPage";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { SectionHeader } from "@/components/SharedUI/SectionHeader";
import { imageLibrary, products } from "@/lib/site-data";

type ProductRouteProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: ProductRouteProps) {
  const { slug } = await params;
  const routePath = slug.join("/");

  if (routePath === "refrigeration/discover-sub-zero") {
    return {
      title: "Discover Sub-Zero",
      description:
        "Explore Sub-Zero refrigeration, food preservation, integrated design, and showroom planning.",
    };
  }

  const title = slug.map((part) => part.replace(/-/g, " ")).join(" / ");

  return {
    title,
    description: `Sub-Zero Wolf SEA catalog page for ${title}.`,
  };
}

export default async function ProductRoutePage({ params }: ProductRouteProps) {
  const { slug } = await params;
  const routePath = slug.join("/");

  if (routePath === "refrigeration/discover-sub-zero") {
    return (
      <>
        <Header />
        <DiscoverSubZeroPage />
        <Footer />
      </>
    );
  }

  const lastSlug = slug.at(-1) ?? "";
  const product = products.find((item) => item.model.toLowerCase() === lastSlug.replace(/-/g, ""));
  const title = product?.model ?? slug.map((part) => part.replace(/-/g, " ")).join(" / ");

  return (
    <>
      <Header />
      <main className="bg-[#0F0F0F] text-[#FBF9F5]">
        <section
          className="flex min-h-[72vh] items-end bg-cover bg-center px-6 pb-16 pt-32 md:px-12"
          style={{ backgroundImage: `linear-gradient(to top, #0F0F0F, rgba(15,15,15,.2)), url(${product?.image ?? imageLibrary.refrigeration})` }}
        >
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.35em] text-stone-300">
              {product?.brand ?? "Catalog"}
            </p>
            <h1 className="mt-5 font-serif text-5xl capitalize leading-tight md:text-7xl">
              {title}
            </h1>
            {product ? (
              <p className="mt-5 text-lg text-stone-300">
                {product.series} / {product.type} / {product.width}
              </p>
            ) : null}
          </div>
        </section>
        <section className="px-6 py-24 md:px-12">
          <SectionHeader
            eyebrow="Specifications"
            title={product ? "Product detail framework" : "Category framework"}
            description="This route is ready for hero imagery, specifications, features, accessories, design gallery links, and showroom CTAs."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {["Series", "Type", "Width", "Finish"].map((label) => (
              <div key={label} className="border border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">{label}</p>
                <p className="mt-3 font-serif text-2xl">
                  {label === "Series"
                    ? product?.series ?? "Filter"
                    : label === "Type"
                      ? product?.type ?? "Filter"
                      : label === "Width"
                        ? product?.width ?? "Filter"
                        : product?.finish ?? "Filter"}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="border-t border-white/10 px-6 py-24 md:px-12">
          <SectionHeader eyebrow="Discover More" title="Related products" />
          <div className="mt-14">
            <ProductGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
