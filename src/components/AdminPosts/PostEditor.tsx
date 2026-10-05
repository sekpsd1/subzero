"use client";
/* eslint-disable @next/next/no-img-element -- Authenticated private media bypasses the image optimization proxy. */
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Option = { id: string; name: string; slug: string };
type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: string;
  categoryId: string | null;
  tags: Option[];
  coverImage: string | null;
  deletedAt: string | null;
  publishedAt: string | null;
  updatedAt: string;
  seoMeta: Record<string, unknown> | null;
};
const control =
  "w-full min-w-0 rounded border border-white/20 bg-[#202020] p-3";
export default function PostEditor({
  initial,
  categories,
  tags,
  isAdmin,
}: {
  initial: Post | null;
  categories: Option[];
  tags: Option[];
  isAdmin: boolean;
}) {
  const [post, setPost] = useState(initial),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false);
  const form = useRef<HTMLFormElement>(null),
    router = useRouter();
  async function request(url: string, method: string, body: unknown) {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) throw Error(result.error || "Save failed.");
    return result.data as Post;
  }
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const f = new FormData(e.currentTarget);
      const body = {
        ...Object.fromEntries(f),
        tagIds: f.getAll("tagIds"),
        updatedAt: post?.updatedAt,
        seo: {
          metaTitle: f.get("metaTitle"),
          metaDescription: f.get("metaDescription"),
          canonicalUrl: f.get("canonicalUrl"),
          ogTitle: f.get("ogTitle"),
          ogDescription: f.get("ogDescription"),
          robots: f.get("robots"),
          sitemapVisible: f.get("sitemapVisible") === "on",
        },
      };
      const saved = await request(
        post ? "/api/admin/posts/" + post.id : "/api/admin/posts",
        post ? "PATCH" : "POST",
        body,
      );
      setPost(saved);
      setNotice("Saved to database.");
      if (!post) {
        router.replace("/admin/posts/" + saved.id);
        router.refresh();
      } else {
        const content = form.current?.elements.namedItem(
          "content",
        ) as HTMLTextAreaElement | null;
        if (content) content.value = saved.content;
        router.refresh();
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function lifecycle(restore: boolean) {
    if (!post) return;
    setBusy(true);
    setError("");
    try {
      setPost(
        await request(
          "/api/admin/posts/" + post.id + (restore ? "/restore" : ""),
          restore ? "POST" : "DELETE",
          { updatedAt: post.updatedAt },
        ),
      );
      setNotice(restore ? "Restored as Draft." : "Post deleted.");
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!post) return;
    setBusy(true);
    setError("");
    try {
      const f = new FormData(e.currentTarget);
      f.set("updatedAt", post.updatedAt);
      const response = await fetch("/api/admin/posts/" + post.id + "/cover", {
        method: "POST",
        body: f,
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.error || "Upload failed.");
      setPost(result.data);
      setNotice("Cover saved.");
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function format(tag: string) {
    const area = form.current?.elements.namedItem(
      "content",
    ) as HTMLTextAreaElement | null;
    if (!area) return;
    const start = area.selectionStart,
      end = area.selectionEnd,
      selected = area.value.slice(start, end) || "Text";
    area.setRangeText(
      "<" + tag + ">" + selected + "</" + tag + ">",
      start,
      end,
      "select",
    );
    area.focus();
  }
  const seo = post?.seoMeta || {};
  return (
    <>
      <div aria-live="polite" className="mb-5">
        {error && (
          <p role="alert" className="text-red-300">
            {error}
          </p>
        )}
        {notice && <p>{notice}</p>}
      </div>
      {post && (
        <div className="mb-5 flex flex-wrap gap-4">
          <Link href={"/admin/posts/" + post.id + "/preview"} target="_blank">
            Preview saved post
          </Link>
          <span>
            {post.deletedAt ? "Deleted" : post.status} · Published:{" "}
            {post.publishedAt || "—"}
          </span>
        </div>
      )}
      <form
        key={(post?.id || "new") + String(post?.deletedAt)}
        ref={form}
        onSubmit={save}
        className="grid gap-5"
      >
        <fieldset
          disabled={
            busy ||
            Boolean(post?.deletedAt) ||
            (!isAdmin && post?.status === "PUBLISHED")
          }
          className="grid min-w-0 gap-5 sm:grid-cols-2"
        >
          <label>
            Title
            <input
              name="title"
              className={control}
              required
              maxLength={191}
              defaultValue={post?.title}
            />
          </label>
          <label>
            Slug
            <input
              name="slug"
              className={control}
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              maxLength={191}
              defaultValue={post?.slug}
            />
          </label>
          <label className="sm:col-span-2">
            Excerpt
            <textarea
              name="excerpt"
              className={control}
              rows={3}
              maxLength={2000}
              defaultValue={post?.excerpt || ""}
            />
          </label>
          <div
            className="flex flex-wrap gap-2 sm:col-span-2"
            role="toolbar"
            aria-label="Content formatting"
          >
            {[
              ["p", "Paragraph"],
              ["h2", "Heading"],
              ["strong", "Bold"],
              ["em", "Italic"],
              ["blockquote", "Quote"],
            ].map(([tag, label]) => (
              <button
                key={tag}
                type="button"
                className="rounded border border-white/20 p-2"
                onClick={() => format(tag)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="sm:col-span-2">
            Content (HTML)
            <span className="mb-2 block text-stone-400">
              Supports paragraphs, headings, bold, lists and links. Unsafe
              markup is removed on save. Preview shows saved content.
            </span>
            <textarea
              name="content"
              className={control + " font-mono"}
              rows={16}
              required
              maxLength={120000}
              defaultValue={post?.content || "<p></p>"}
            />
          </label>
          <label>
            Category
            <select
              name="categoryId"
              className={control}
              defaultValue={post?.categoryId || ""}
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select
              name="status"
              className={control}
              defaultValue={post?.status || "DRAFT"}
            >
              {(isAdmin
                ? ["DRAFT", "PUBLISHED", "ARCHIVED"]
                : post?.status === "PUBLISHED"
                  ? ["PUBLISHED"]
                  : ["DRAFT", "ARCHIVED"]
              ).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <fieldset className="sm:col-span-2">
            <legend>Tags</legend>
            <div className="flex flex-wrap gap-4">
              {tags.map((t) => (
                <label key={t.id}>
                  <input
                    type="checkbox"
                    name="tagIds"
                    value={t.id}
                    defaultChecked={post?.tags.some((p) => p.id === t.id)}
                  />{" "}
                  {t.name}
                </label>
              ))}
              {!tags.length && (
                <p>No tags. Add them under Categories & tags.</p>
              )}
            </div>
          </fieldset>
          <h2 className="text-xl sm:col-span-2">SEO & Open Graph</h2>
          {[
            ["metaTitle", "SEO title"],
            ["metaDescription", "SEO description"],
            ["canonicalUrl", "Canonical URL"],
            ["ogTitle", "Open Graph title"],
            ["ogDescription", "Open Graph description"],
          ].map(([name, label]) => (
            <label key={name}>
              {label}
              <input
                className={control}
                name={name}
                defaultValue={String(seo[name] || "")}
                maxLength={name.includes("Description") ? 2000 : 191}
              />
            </label>
          ))}
          <label>
            Robots
            <select
              className={control}
              name="robots"
              defaultValue={String(seo.robots || "index, follow")}
            >
              {[
                "index, follow",
                "noindex, follow",
                "index, nofollow",
                "noindex, nofollow",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              name="sitemapVisible"
              defaultChecked={seo.sitemapVisible !== false}
            />{" "}
            Include in sitemap when published
          </label>
          <p className="text-stone-400">
            Open Graph image uses the managed cover. Public page metadata
            integration is a separate task.
          </p>
          <button className="rounded border border-white/30 p-3 sm:col-span-2">
            {busy ? "Saving…" : "Save post"}
          </button>
        </fieldset>
      </form>
      {post && !post.deletedAt && (isAdmin || post.status !== "PUBLISHED") && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl">Cover image</h2>
          {post.coverImage && (
            <>
              <img
                className="mb-4 max-h-64 max-w-full"
                src={post.coverImage}
                alt={post.title}
              />
              <button
                disabled={busy}
                className="mb-5 border p-2"
                onClick={async () => {
                  setBusy(true);
                  try {
                    setPost(
                      await request(
                        "/api/admin/posts/" + post.id + "/cover",
                        "DELETE",
                        { updatedAt: post.updatedAt },
                      ),
                    );
                  } catch (e) {
                    setError((e as Error).message);
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Remove cover
              </button>
            </>
          )}
          <form onSubmit={upload} className="flex flex-wrap gap-3">
            <input
              aria-label="Cover image"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              disabled={busy}
            />
            <button disabled={busy} className="border p-2">
              Upload cover
            </button>
            <p className="w-full text-stone-400">
              JPEG, PNG or WebP, maximum 5 MiB. Save pending post edits before
              uploading.
            </p>
          </form>
        </section>
      )}
      {!post && (
        <p className="mt-5">Save a Draft first to upload its cover image.</p>
      )}
      {post && isAdmin && (
        <button
          disabled={busy}
          className="mt-8 border border-red-300 p-3"
          onClick={() => lifecycle(Boolean(post.deletedAt))}
        >
          {post.deletedAt ? "Restore as Draft" : "Delete post"}
        </button>
      )}
      {!isAdmin && post?.status === "PUBLISHED" && (
        <p className="mt-4">ADMIN must save changes to published content.</p>
      )}
      {post?.deletedAt && (
        <p className="mt-4">
          Deleted posts cannot be edited. ADMIN can restore as Draft.
        </p>
      )}
    </>
  );
}
