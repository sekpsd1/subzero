import type { Metadata } from "next";
import { BrochureMakerPage } from "@/components/BrochureMaker/BrochureMakerPage";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Brochure Maker | Select Products",
  description: "Select Sub-Zero, Wolf, and Cove products for a custom brochure.",
};

export default function BrochureMakerProductSelectRoute() {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/fmm1fin.css" />
      <Header ownerResources cove />
      <BrochureMakerPage />
      <Footer ownerResources />
    </>
  );
}
