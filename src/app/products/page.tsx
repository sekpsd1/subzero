import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { SectionHeader } from "@/components/SharedUI/SectionHeader";
import { mainNavigation } from "@/lib/site-data";

export const metadata = {
  title: "Products",
  description: "Sub-Zero and Wolf product catalog for Southeast Asia.",
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#0F0F0F] px-6 pb-24 pt-32 text-[#FBF9F5] md:px-12">
        <SectionHeader
          eyebrow="Catalog"
          title="Sub-Zero and Wolf Products"
          description="Catalog architecture for the full SEA price-list import. Public pricing is intentionally hidden until enabled."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {mainNavigation.slice(0, 3).map((item) => (
            <a key={item.title} href={item.href} className="border border-white/10 p-6">
              <p className="font-serif text-3xl">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-stone-400">{item.description}</p>
            </a>
          ))}
        </div>
        <div className="mt-16">
          <ProductGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
