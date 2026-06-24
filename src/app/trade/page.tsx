import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

export const metadata = {
  title: "Professionals",
};

const tradeLinks = [
  "Specification Library",
  "Brochure",
  "Future Products",
  "Kitchen Design Contest",
];

export default function TradePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0F0F0F] px-6 py-32 text-[#FBF9F5] md:px-12">
        <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
          Professionals
        </p>
        <h1 className="mt-5 font-serif text-5xl">Trade Resources</h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tradeLinks.map((link) => (
            <a key={link} href="#" className="border border-white/10 p-6">
              <p className="font-serif text-2xl">{link}</p>
              <p className="mt-4 text-sm leading-7 text-stone-500">
                Built for specification, brochure, and professional workflows.
              </p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
