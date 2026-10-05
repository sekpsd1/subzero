/* eslint-disable @next/next/no-img-element -- Authenticated private media bypasses the image optimization proxy. */
import { notFound } from "next/navigation";
import { requirePage } from "@/lib/auth/server";
import { getPrisma } from "@/lib/prisma";
import { postInclude } from "@/lib/posts/service";
import { sanitizeContent } from "@/lib/posts/content.mjs";
import PostsShell from "@/components/AdminPosts/PostsShell";
export const metadata = {
  title: "Private post preview",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePage();
  const p = await getPrisma().post.findUnique({
    where: { id: (await params).id },
    include: postInclude,
  });
  if (!p) notFound();
  return (
    <PostsShell title="Private preview">
      <p className="mb-5">
        Saved content · {p.deletedAt ? "Deleted" : p.status} · Visible only to
        ADMIN / STAFF
      </p>
      <article className="max-w-3xl space-y-5">
        <h2 className="text-3xl">{p.title}</h2>
        {p.coverImage && (
          <img
            src={p.coverImage}
            alt={p.title}
            className="max-h-96 max-w-full"
          />
        )}
        <p>{p.excerpt}</p>
        <div
          className="space-y-4 [&_a]:underline [&_h2]:text-2xl [&_h3]:text-xl [&_li]:ml-6 [&_ul]:list-disc [&_ol]:list-decimal"
          dangerouslySetInnerHTML={{ __html: sanitizeContent(p.content) }}
        />
        <p>
          {p.category?.name} · {p.tags.map((t) => t.name).join(", ")}
        </p>
        <section className="mt-8 border-t border-white/20 pt-5">
          <h3 className="text-xl">Saved SEO</h3>
          <dl className="break-words">
            {Object.entries(p.seoMeta || {})
              .filter(([k]) => !["id", "schemaJson", "faqJson"].includes(k))
              .map(([k, v]) => (
                <div key={k}>
                  <dt className="mt-3 text-stone-400">{k}</dt>
                  <dd>{String(v ?? "—")}</dd>
                </div>
              ))}
          </dl>
        </section>
      </article>
    </PostsShell>
  );
}
