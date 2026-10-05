"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
type Row = { id: string; name: string; slug: string };
const control = "min-w-0 rounded border border-white/20 bg-[#202020] p-3";
export default function TaxonomyEditor({
  categories,
  tags,
  isAdmin,
}: {
  categories: Row[];
  tags: Row[];
  isAdmin: boolean;
}) {
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    router = useRouter();
  async function save(
    e: React.FormEvent<HTMLFormElement>,
    kind: string,
    row?: Row,
    remove = false,
  ) {
    e.preventDefault();
    const target = e.currentTarget;
    setBusy(true);
    setError("");
    try {
      const b = {
        ...Object.fromEntries(new FormData(target)),
        id: row?.id,
        previousName: row?.name,
        previousSlug: row?.slug,
      };
      const r = await fetch("/api/admin/posts/taxonomy/" + kind, {
        method: remove ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(b),
      });
      const result = await r.json();
      if (!r.ok) throw Error(result.error || "Failed.");
      router.refresh();
      if (!row) target.reset();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      {error && (
        <p role="alert" className="mb-5 text-red-300">
          {error}
        </p>
      )}
      {(
        [
          ["categories", categories],
          ["tags", tags],
        ] as const
      ).map(([kind, rows]) => (
        <section className="mb-10" key={kind}>
          <h2 className="mb-4 text-xl capitalize">{kind}</h2>
          <form
            onSubmit={(e) => save(e, kind)}
            className="mb-5 grid gap-3 sm:grid-cols-3"
          >
            <input
              className={control}
              name="name"
              aria-label={"New " + kind + " name"}
              placeholder="Name"
              required
              maxLength={191}
            />
            <input
              className={control}
              name="slug"
              aria-label={"New " + kind + " slug"}
              placeholder="slug"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              maxLength={191}
            />
            <button disabled={busy} className={control}>
              Create
            </button>
          </form>
          {rows.map((row) => (
            <form
              key={row.id + row.name + row.slug}
              onSubmit={(e) => save(e, kind, row)}
              className="mb-3 grid gap-3 sm:grid-cols-4"
            >
              <input
                className={control}
                name="name"
                aria-label="Name"
                required
                defaultValue={row.name}
              />
              <input
                className={control}
                name="slug"
                aria-label="Slug"
                required
                defaultValue={row.slug}
              />
              <button disabled={busy} className={control}>
                Save
              </button>
              {isAdmin && (
                <button
                  disabled={busy}
                  className={control}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = e.currentTarget.form!;
                    save(
                      {
                        preventDefault() {},
                        currentTarget: target,
                      } as React.FormEvent<HTMLFormElement>,
                      kind,
                      row,
                      true,
                    );
                  }}
                >
                  Delete unused
                </button>
              )}
            </form>
          ))}
        </section>
      ))}
    </>
  );
}
