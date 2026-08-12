import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { OutdoorViewAllPage } from "@/components/ProductPages/OutdoorViewAllPage";

export const metadata: Metadata = {
  title: "All Outdoor Appliances | Sub-Zero and Wolf",
  description: "Browse Sub-Zero and Wolf outdoor grills, side burners, refrigeration, warming drawers, ventilation, and ice makers.",
};

export default function OutdoorViewAllRoutePage() {
  return (
    <>
      <Header />
      <OutdoorViewAllPage />
      <Footer />
    </>
  );
}
