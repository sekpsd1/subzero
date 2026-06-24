import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { imageLibrary } from "@/lib/site-data";

export const metadata = {
  title: "Our Story",
};

export default function OurStoryPage() {
  return (
    <>
      <Header />
      <main className="bg-[#0F0F0F] text-[#FBF9F5]">
        <section
          className="flex min-h-screen items-end bg-cover bg-center px-6 pb-16 pt-32 md:px-12"
          style={{ backgroundImage: `linear-gradient(to top, #0F0F0F, rgba(15,15,15,.18)), url(${imageLibrary.kitchenDark})` }}
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-stone-300">
              Our Story
            </p>
            <h1 className="mt-5 font-serif text-6xl leading-tight">
              The Sub-Zero story, milestones, and sustainability.
            </h1>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
