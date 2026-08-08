import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { InductionCooktopsPage } from "@/components/ProductPages/InductionCooktopsPage";

export const metadata: Metadata = {
  title: "Induction Cooktops | Wolf Cooktops and Rangetops",
  description:
    "Browse Wolf induction cooktops with precise temperature response, bridge zones, and refined built-in design.",
};

export default function InductionCooktopsRoutePage() {
  return (
    <>
      <Header />
      <InductionCooktopsPage />
      <Footer />
    </>
  );
}
