import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

export const metadata = {
  title: "Owner Resources",
};

const resources = [
  { title: "Product Information", href: "/support/product-information" },
  { title: "Accessories", href: "/cooking/accessories" },
  { title: "Recipes", href: "/journal/recipes" },
  { title: "Use and Care Videos", href: "/support/videos" },
  { title: "Warranty Information", href: "/support/warranty" },
  { title: "Product Support", href: "/support/product-support" },
  { title: "Owner Technique Guide", href: "/support/owner-technique-guide" },
  { title: "Customer Care", href: "/support/customer-care" },
];

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0F0F0F] px-6 py-32 text-[#FBF9F5] md:px-12">
        <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
          Owners
        </p>
        <h1 className="mt-5 font-serif text-5xl">Owner Resources</h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {resources.map((resource) => (
            <a key={resource.title} href={resource.href} className="border border-white/10 p-6">
              <p className="font-serif text-2xl">{resource.title}</p>
              <p className="mt-4 text-sm leading-7 text-stone-500">
                Managed in the CMS with SEO and AEO controls.
              </p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
