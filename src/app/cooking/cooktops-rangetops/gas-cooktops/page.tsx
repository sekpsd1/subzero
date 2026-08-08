import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { GasCooktopsPage } from "@/components/ProductPages/GasCooktopsPage";

export const metadata: Metadata = {
  title: "Gas Cooktops | Wolf Cooktops and Rangetops",
  description:
    "Browse Wolf gas cooktops with dual-stacked sealed burners, precise flame control, and professional performance.",
};

export default function GasCooktopsRoutePage() {
  return (
    <>
      <Header />
      <GasCooktopsPage />
      <Footer />
    </>
  );
}
