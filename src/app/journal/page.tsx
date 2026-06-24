import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { SectionHeader } from "@/components/SharedUI/SectionHeader";
import { journalPosts } from "@/lib/site-data";

export const metadata = {
  title: "Journal & Culinary",
};

export default function JournalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0F0F0F] px-6 py-32 text-[#FBF9F5] md:px-12">
        <SectionHeader
          eyebrow="Journal & Culinary"
          title="Recipes, stories, and regional inspiration"
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
                <h2 className="mt-3 font-serif text-2xl">{post.title}</h2>
                <p className="mt-4 text-sm leading-7 text-stone-400">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
