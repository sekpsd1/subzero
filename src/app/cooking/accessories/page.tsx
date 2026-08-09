import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { AccessoriesPage } from "@/components/ProductPages/AccessoriesPage";

export const metadata: Metadata = {
  title: "Accessories Store",
  description: "Find genuine Sub-Zero and Wolf filters, cleaning kits, replacement accessories, add-ons, and installation accessories.",
};

export default function CookingAccessoriesPage() {
  return (
    <>
      <Header />
      <AccessoriesPage />
      <Footer />
    </>
  );
}
