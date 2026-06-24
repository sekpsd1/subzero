import { products } from "@/lib/site-data";
import { ProductCard } from "@/components/ProductCard/ProductCard";

export function ProductGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.model} product={product} />
      ))}
    </div>
  );
}
