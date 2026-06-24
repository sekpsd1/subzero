import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { SectionHeader } from "@/components/SharedUI/SectionHeader";
import { imageLibrary } from "@/lib/site-data";

export const metadata = {
  title: "Inspiration",
};

const styles = ["Transitional", "Traditional", "Contemporary"];

export default function InspirationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0F0F0F] px-6 py-32 text-[#FBF9F5] md:px-12">
        <SectionHeader
          eyebrow="Design Gallery"
          title="Kitchen inspiration by style"
          description="A future destination for Kitchen Design Contest galleries and editorial visual stories."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {styles.map((style) => (
            <a key={style} href="#" className="group relative min-h-[460px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${imageLibrary.kitchenDark})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <h2 className="absolute bottom-8 left-8 font-serif text-4xl">{style}</h2>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
