import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { RevealPageContent } from "@/components/Reveal/RevealPageContent";

export const metadata: Metadata = {
  title: "Reveal Cabinetry Specifications",
  description:
    "Create accurate Sub-Zero, Wolf, and Cove appliance specifications with the Reveal cabinetry specification tool.",
};

export default function RevealPage() {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/fmm1fin.css" />
      <Header ownerResources />
      <RevealPageContent />
      <Footer ownerResources />
    </>
  );
}
