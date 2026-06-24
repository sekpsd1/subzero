import Link from "next/link";
import type { Product } from "@/lib/site-data";
import { slugify } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${slugify(product.model)}`}
      className="group block overflow-hidden border border-white/10 bg-white/[0.03]"
    >
      <div
        className="aspect-[4/5] bg-cover bg-center transition duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-500">{product.brand}</p>
        <h3 className="mt-3 font-serif text-2xl text-stone-50">{product.model}</h3>
        <p className="mt-2 text-sm text-stone-400">{product.series}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs text-stone-300">
          <span className="border border-white/10 px-3 py-1">{product.type}</span>
          {product.width ? <span className="border border-white/10 px-3 py-1">{product.width}</span> : null}
        </div>
      </div>
    </Link>
  );
}
