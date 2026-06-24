import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { IceMakerFeature } from "@/components/Home/IceMakerFeature";
import { LayeredVideos } from "@/components/Home/LayeredVideos";
import { ShowroomJourney } from "@/components/Home/ShowroomJourney";
import { TriBrandShowcase } from "@/components/Home/TriBrandShowcase";
import { Hero } from "@/components/Hero/Hero";
import { SectionHeader } from "@/components/SharedUI/SectionHeader";
import { journalPosts } from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#0F0F0F] text-[#FBF9F5]">
        <Hero />
        <div className="bg-[#eeece4]">
          <TriBrandShowcase />
          <ShowroomJourney />
          <IceMakerFeature />
        </div>
        <LayeredVideos />

        <section className="px-6 py-24 md:px-12">
          <SectionHeader
            eyebrow="Journal & Culinary"
            title="Editorial tools for a WordPress-like workflow"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {journalPosts.map((post) => (
              <article key={post.slug} className="border border-white/10 bg-white/[0.03]">
                <div
                  className="aspect-[4/3] bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                    {post.category}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl">{post.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-400">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
