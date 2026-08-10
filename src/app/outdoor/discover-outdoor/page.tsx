import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { DiscoverOutdoorPage } from "@/components/ProductPages/DiscoverOutdoorPage";

export const metadata: Metadata = {
  title: "Discover Outdoor | Sub-Zero and Wolf",
  description: "Discover Sub-Zero and Wolf outdoor appliances for refined outdoor entertaining, grilling, refrigeration, warming, and storage.",
};

export default function DiscoverOutdoorRoutePage() {
  return (
    <>
      <Header />
      <DiscoverOutdoorPage />
      <Footer />
    </>
  );
}
