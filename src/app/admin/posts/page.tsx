import Link from "next/link";
import { requirePage } from "@/lib/auth/server";
import { listPosts } from "@/lib/posts/service";
import PostsShell from "@/components/AdminPosts/PostsShell";
export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requirePage();
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(await searchParams))
    if (typeof v === "string") params.set(k, v);
  let result;
  try {
    result = await listPosts(params);
  } catch {
    return (
      <PostsShell title="Posts">
        <p role="alert">Unable to load posts. Check filters or try again.</p>
        <Link href="/admin/posts">Clear filters</Link>
      </PostsShell>
    );
  }
  const url = (page: number) => {
    const p = new URLSearchParams(params);
    p.set("page", String(page));
    return "/admin/posts?" + p;
  };
  const control = "rounded border border-white/20 bg-[#202020] p-3";
  return (
    <PostsShell title="Posts & SEO">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p>{result.total} posts · Database content</p>
        <Link className={control} href="/admin/posts/new">
          Add post
        </Link>
      </div>
      <form method="get" className="mb-6 grid gap-3 sm:grid-cols-4">
        <input
          className={control}
          name="q"
          aria-label="Search posts"
          placeholder="Search title or slug"
          defaultValue={result.filters.q}
        />
        <select
          className={control}
          name="status"
          aria-label="Status"
          defaultValue={result.filters.status}
        >
          <option value="">All statuses</option>
          {["DRAFT", "PUBLISHED", "ARCHIVED"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          className={control}
          name="deleted"
          aria-label="Deleted"
          defaultValue={result.filters.deleted}
        >
          <option value="live">Current</option>
          <option value="deleted">Deleted</option>
        </select>
        <button className={control}>Filter</button>
      </form>
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr>
              {["Title", "Category", "Status", "Published"].map((h) => (
                <th className="p-3" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.posts.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-3">
                  <Link className="underline" href={"/admin/posts/" + p.id}>
                    {p.title}
                  </Link>
                </td>
                <td className="p-3">{p.category?.name || "—"}</td>
                <td className="p-3">{p.deletedAt ? "Deleted" : p.status}</td>
                <td className="p-3">
                  {p.publishedAt?.toISOString().slice(0, 10) || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!result.total && <p className="p-5">No matching posts.</p>}
      </div>
      <div className="mt-5 flex gap-5">
        {result.page > 1 && <Link href={url(result.page - 1)}>Previous</Link>}
        <span>
          Page {result.page} of {result.pages}
        </span>
        {result.page < result.pages && (
          <Link href={url(result.page + 1)}>Next</Link>
        )}
      </div>
    </PostsShell>
  );
}
