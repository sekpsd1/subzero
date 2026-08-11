import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { OutdoorGrillsPage } from "@/components/ProductPages/OutdoorGrillsPage";

export const metadata: Metadata = {
  title: "Outdoor Gas Grills | Wolf",
  description:
    "Browse Wolf outdoor gas grills with independent burners, ceramic briquettes, stainless construction, and refined outdoor performance.",
};

export default function OutdoorGrillsRoutePage() {
  return (
    <>
      <Header />
      <OutdoorGrillsPage />
      <Footer />
    </>
  );
}
