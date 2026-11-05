import Link from "next/link";
import { requirePage } from "@/lib/auth/server";
import { getPrisma } from "@/lib/prisma";
import CatalogShell from "@/components/AdminCatalog/CatalogShell";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminPage() {
  const session = await requirePage();
  const db = getPrisma();
  const [count, balances, recent] = await db.$transaction([
    db.product.count({ where: { deletedAt: null } }),
    db.inventory.aggregate({ _sum: { quantity: true, reserved: true } }),
    db.stockMovement.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }], take: 8,
      select: { id: true, createdAt: true, operation: true, type: true, quantity: true,
        product: { select: { id: true, model: true } } },
    }),
  ], { isolationLevel: "RepeatableRead" });
  const total = balances._sum.quantity ?? 0;
  const reserved = balances._sum.reserved ?? 0;
  return <CatalogShell title="Dashboard">
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <p>{session.user.name} · {session.user.role}</p>
      <Link className="rounded bg-stone-100 px-4 py-2 text-black" href="/admin/products/new">Add product</Link>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {([["Products", count, "/admin/products"], ["Total units", total, "/admin/inventory?deleted=yes"],
         ["Reserved units", reserved, "/admin/inventory?deleted=yes"], ["Available units", total-reserved, "/admin/inventory?deleted=yes"]] as const)
        .map(([label,value,href]) => <Link key={label} href={href} className="rounded border border-white/15 bg-[#191919] p-5 hover:border-white/40">
          <span className="text-stone-400">{label}</span><strong className="mt-3 block text-3xl">{value.toLocaleString("en")}</strong>
        </Link>)}
    </div>
    <h2 className="mb-3 mt-9 text-xl">Recent stock movements</h2>
    {recent.length ? <ul className="divide-y divide-white/10 border-y border-white/10">{recent.map(m =>
      <li key={m.id}><Link className="flex flex-wrap items-baseline justify-between gap-2 py-3 hover:underline" href={`/admin/inventory/${m.product.id}`}>
        <strong>{m.product.model}</strong><span>{(m.operation ?? m.type).replaceAll("_"," ")} · {m.quantity}</span>
        <time className="text-stone-400" dateTime={m.createdAt.toISOString()}>{m.createdAt.toISOString().slice(0,16).replace("T"," ")} UTC</time>
      </Link></li>)}</ul> : <p>No stock movements recorded.</p>}
    {session.user.role === "ADMIN" && <form className="mt-8" method="post" action="/api/admin/sessions/revoke"><button className="underline">Sign out all sessions</button></form>}
  </CatalogShell>;
}
