import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { DualFuelRangesPage } from "@/components/ProductPages/DualFuelRangesPage";

export const metadata: Metadata = {
  title: "Wolf Dual Fuel Ranges",
  description: "Explore Wolf Dual Fuel Ranges, available widths, burner configurations, finishes, and showroom planning.",
};

export default function DualFuelRangesRoutePage() {
  return (
    <>
      <Header />
      <DualFuelRangesPage />
      <Footer />
    </>
  );
}
