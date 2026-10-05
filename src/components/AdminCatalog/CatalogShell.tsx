import Link from 'next/link';
export default function CatalogShell({ title, children }: { title: string; children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#101010] p-4 text-sm text-[#FBF9F5] md:p-8"><div className="mx-auto max-w-6xl"><nav className="mb-6 flex flex-wrap gap-5 text-stone-300"><Link href="/admin">Dashboard</Link><Link href="/admin/products">Products</Link><Link href="/admin/catalog">Brands & categories</Link><form action="/api/admin/logout" method="post"><button>Sign out</button></form></nav><h1 className="mb-6 text-2xl font-medium">{title}</h1>{children}</div></main>;
}
