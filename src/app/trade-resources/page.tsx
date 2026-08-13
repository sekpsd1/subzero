import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { TradeResourcesPageContent } from "@/components/TradeResources/TradeResourcesPageContent";

export const metadata: Metadata = {
  title: "Trade Resources",
  description: "Product specifications, installation guidance, professional tools, representatives, education, and trade resources from Sub-Zero, Wolf, and Cove.",
};

export default function TradeResourcesPage() {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/fmm1fin.css" />
      <Header ownerResources cove />
      <TradeResourcesPageContent />
      <Footer ownerResources />
    </>
  );
}
