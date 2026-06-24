import Link from "next/link";
import { adminModules, journalPosts, products, showrooms } from "@/lib/site-data";
import { formatNumber } from "@/lib/utils";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin and staff management surface for catalog, posts, stock, appointments, and SEO.",
};

export default function AdminPage() {
  const totalStock = products.reduce((total, product) => total + product.stock, 0);
  const reservedStock = products.reduce((total, product) => total + product.reserved, 0);

  return (
    <main className="min-h-screen bg-[#101010] text-[#FBF9F5]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-black/40 p-6 lg:block">
        <Link href="/" className="font-serif text-2xl">SZ Wolf SEA</Link>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-stone-500">
          Admin
        </p>
        <nav className="mt-10 space-y-2 text-sm">
          {["Dashboard", "Posts", "Products", "Inventory", "Appointments", "SEO / AEO", "Users"].map((item) => (
            <a
              key={item}
              href="#"
              className="block border border-transparent px-4 py-3 text-stone-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>
      <section className="lg:pl-72">
        <header className="border-b border-white/10 px-6 py-8 md:px-10">
          <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
            Staff and admin workspace
          </p>
          <h1 className="mt-4 font-serif text-4xl">Dashboard</h1>
        </header>
        <div className="grid gap-5 p-6 md:grid-cols-2 md:p-10 xl:grid-cols-5">
          {adminModules.map((module) => (
            <div key={module.title} className="border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-stone-400">{module.title}</p>
              <p className="mt-3 font-serif text-4xl">{formatNumber(module.count)}</p>
              <p className="mt-4 text-xs leading-6 text-stone-500">{module.description}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 p-6 pt-0 md:p-10 md:pt-0 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="border border-white/10 bg-white/[0.03]">
            <div className="border-b border-white/10 p-5">
              <h2 className="font-serif text-2xl">Product Catalog</h2>
              <p className="mt-2 text-sm text-stone-500">
                Prices are stored but hidden from public pages until enabled.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.2em] text-stone-500">
                  <tr>
                    <th className="p-4">Model</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Series</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Reserved</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.model} className="border-t border-white/10">
                      <td className="p-4 font-medium">{product.model}</td>
                      <td className="p-4 text-stone-400">{product.brand}</td>
                      <td className="p-4 text-stone-400">{product.series}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4">{product.reserved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div className="space-y-6">
            <section className="border border-white/10 bg-white/[0.03] p-5">
              <h2 className="font-serif text-2xl">Inventory Snapshot</h2>
              <p className="mt-5 text-5xl font-light">{totalStock - reservedStock}</p>
              <p className="mt-2 text-sm text-stone-500">available units in backend stock</p>
            </section>
            <section className="border border-white/10 bg-white/[0.03] p-5">
              <h2 className="font-serif text-2xl">Country Routing</h2>
              <div className="mt-5 space-y-3">
                {showrooms.map((showroom) => (
                  <div key={showroom.country} className="flex justify-between gap-4 text-sm">
                    <span>{showroom.country}</span>
                    <span className="text-stone-500">{showroom.email}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="border border-white/10 bg-white/[0.03] p-5">
              <h2 className="font-serif text-2xl">Editorial Queue</h2>
              <div className="mt-5 space-y-3">
                {journalPosts.map((post) => (
                  <div key={post.slug} className="text-sm">
                    <p>{post.title}</p>
                    <p className="text-stone-500">{post.status}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
