import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { SectionHeader } from "@/components/SharedUI/SectionHeader";
import { imageLibrary, showrooms } from "@/lib/site-data";

export const metadata = {
  title: "Regional Experience",
  description: "Showrooms, appointment requests, and authorized dealers.",
};

export default function ShowroomPage() {
  return (
    <>
      <Header />
      <main className="bg-[#0F0F0F] text-[#FBF9F5]">
        <section
          className="flex min-h-[70vh] items-end bg-cover bg-center px-6 pb-16 pt-32 md:px-12"
          style={{ backgroundImage: `linear-gradient(to top, #0F0F0F, rgba(15,15,15,.15)), url(${imageLibrary.showroom})` }}
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-stone-300">
              Regional Experience
            </p>
            <h1 className="mt-5 font-serif text-5xl md:text-7xl">
              Showrooms and dealers across SEA
            </h1>
          </div>
        </section>
        <section className="px-6 py-24 md:px-12">
          <SectionHeader
            eyebrow="Appointments"
            title="Country-routed consultation flow"
            description="The appointment system follows the old SEA form while routing submissions to each regional team."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {showrooms.map((showroom) => (
              <div key={showroom.country} className="border border-white/10 p-6">
                <p className="font-serif text-3xl">{showroom.country}</p>
                <p className="mt-3 text-sm text-stone-400">{showroom.name}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.24em] text-stone-500">
                  {showroom.city}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
