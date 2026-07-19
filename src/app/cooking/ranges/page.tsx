import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { WolfRangesPage } from "@/components/ProductPages/WolfRangesPage";

export const metadata: Metadata = {
  title: "Wolf Ranges",
  description: "Explore Wolf Dual Fuel, Induction, and Gas Ranges, configurations, design options, and showroom experiences.",
};

export default function WolfRangesRoutePage() {
  return (
    <>
      <Header />
      <WolfRangesPage />
      <Footer />
    </>
  );
}
