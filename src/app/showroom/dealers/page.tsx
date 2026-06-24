import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { showrooms } from "@/lib/site-data";

export const metadata = {
  title: "Dealers",
};

export default function DealersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0F0F0F] px-6 py-32 text-[#FBF9F5] md:px-12">
        <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Dealers</p>
        <h1 className="mt-5 font-serif text-5xl">Locations & Dealers</h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {showrooms.map((showroom) => (
            <div key={showroom.country} className="border border-white/10 p-6">
              <p className="font-serif text-3xl">{showroom.country}</p>
              <p className="mt-3 text-stone-400">Authorized Dealers</p>
              <p className="mt-8 text-sm text-stone-500">{showroom.email}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
