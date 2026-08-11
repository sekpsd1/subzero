import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { OutdoorWarmingDrawersPage } from "@/components/ProductPages/OutdoorWarmingDrawersPage";

export const metadata: Metadata = {
  title: "Outdoor Warming Drawers | Wolf",
  description: "Browse Wolf outdoor warming drawers with stainless outdoor-rated construction, even heat, and refined serving support.",
};

export default function OutdoorWarmingDrawersRoutePage() {
  return (
    <>
      <Header />
      <OutdoorWarmingDrawersPage />
      <Footer />
    </>
  );
}
