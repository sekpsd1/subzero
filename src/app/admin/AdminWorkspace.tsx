"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["Dashboard", "/admin"],
  ["Posts", "/admin/posts"],
  ["Products", "/admin/products"],
  ["Inventory", "/admin/inventory"],
  ["Appointments", ""],
  ["SEO / AEO", "/admin/posts"],
  ["Users", ""],

] as const;

export default function AdminWorkspace({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/admin/login") return children;

  return (
    <div className="min-h-screen bg-[#101010] text-[#FBF9F5] lg:pl-72">
      <aside className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a] px-4 py-2 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:overflow-y-auto lg:border-r lg:border-b-0 lg:p-6">
        <Link href="/" className="font-serif text-xl lg:text-2xl">SZ Wolf SEA</Link>
        <p className="hidden text-xs uppercase tracking-[0.3em] text-stone-500 lg:mt-2 lg:block">Admin</p>
        <nav aria-label="Admin navigation" className="mt-1 flex gap-1 overflow-x-auto text-sm lg:mt-10 lg:block lg:space-y-2">
          {links.map(([label, href]) => {
            const style = "block shrink-0 whitespace-nowrap px-3 py-2 lg:px-4 lg:py-3";
            if (!href) return <span key={label} aria-disabled="true" className={style + " text-stone-500"}>{label}</span>;
            const active = label !== "SEO / AEO" && (path === href || (href !== "/admin" && path.startsWith(href + "/")));
            if(label==='Products' && (active || path==='/admin/catalog')) return <div key={label} className="flex shrink-0 items-center lg:block"><Link href={href} className={style+" block bg-white/10"}>Products</Link><div className="flex lg:block lg:pl-4">{[["All products","/admin/products"],["Add product","/admin/products/new"],["Brands & categories","/admin/catalog"]].map(([text,url])=><Link key={url} href={url} aria-current={path===url?'page':undefined} className={style+(path===url?" text-white underline":" text-stone-400")}>{text}</Link>)}</div></div>;
            return <Link key={label} href={href} aria-current={active ? "page" : undefined} className={style + (active ? " bg-white/10 text-white" : " text-stone-300 hover:bg-white/5 hover:text-white")}>{label}</Link>;
          })}
        </nav>
      </aside>
      {children}
    </div>
  );
}
