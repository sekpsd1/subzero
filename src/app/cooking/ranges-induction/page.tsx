import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { InductionRangesPage } from "@/components/ProductPages/InductionRangesPage";

export const metadata: Metadata = {
  title: "Wolf Induction Ranges",
  description: "Explore Wolf Induction Ranges, available configurations, design options, and showroom planning.",
};

export default function InductionRangesRoutePage() {
  return (
    <>
      <Header />
      <InductionRangesPage />
      <Footer />
    </>
  );
}
