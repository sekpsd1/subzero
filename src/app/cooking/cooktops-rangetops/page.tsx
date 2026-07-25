import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { WolfCooktopsRangetopsPage } from "@/components/ProductPages/WolfCooktopsRangetopsPage";

export const metadata: Metadata = {
  title: "Cooktops and Rangetops | Wolf",
  description:
    "Explore Wolf gas rangetops, gas cooktops, and induction cooktops with precise control, power, and professional performance.",
};

export default function WolfCooktopsRangetopsRoutePage() {
  return (
    <>
      <Header />
      <WolfCooktopsRangetopsPage />
      <Footer />
    </>
  );
}
