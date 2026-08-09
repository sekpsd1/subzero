import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { WolfOutdoorCookingPage } from "@/components/ProductPages/WolfOutdoorCookingPage";

export const metadata: Metadata = {
  title: "Outdoor Cooking | Wolf",
  description: "Browse Wolf outdoor gas grills, burners, warming drawers, and ventilation for premium outdoor kitchens.",
};

export default function OutdoorCookingRoutePage() {
  return (
    <>
      <Header />
      <WolfOutdoorCookingPage />
      <Footer />
    </>
  );
}
