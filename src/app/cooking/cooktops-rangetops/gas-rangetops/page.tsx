import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { CooktopsRangetopsViewAllPage } from "@/components/ProductPages/CooktopsRangetopsViewAllPage";

export const metadata: Metadata = {
  title: "Cooktops and Rangetops | Wolf",
  description:
    "Browse Wolf gas rangetops, gas cooktops, and induction cooktops with precise control and professional performance.",
};

export default function CooktopsRangetopsGasRangetopsRoutePage() {
  return (
    <>
      <Header />
      <CooktopsRangetopsViewAllPage />
      <Footer />
    </>
  );
}
