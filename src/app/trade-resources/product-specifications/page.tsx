import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ProductSpecificationsPage } from "@/components/ProductSpecifications/ProductSpecificationsPage";
import { products } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Product Specifications and Manuals",
  description: "Search product specifications and model information for Sub-Zero, Wolf, and Cove appliances.",
};

export default function ProductSpecificationsRoute() {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/fmm1fin.css" />
      <Header ownerResources />
      <ProductSpecificationsPage products={products} />
      <Footer ownerResources />
    </>
  );
}
