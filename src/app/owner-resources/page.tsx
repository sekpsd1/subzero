import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { OwnerResourcesPageContent } from "@/components/OwnerResources/OwnerResourcesPageContent";

export const metadata: Metadata = {
  title: "Owner Resources",
  description:
    "Product information, use and care videos, recipes, connected appliance guidance, and support for Sub-Zero, Wolf, and Cove owners.",
};

export default function OwnerResourcesPage() {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/fmm1fin.css" />
      <Header ownerResources />
      <OwnerResourcesPageContent />
      <Footer ownerResources />
    </>
  );
}
