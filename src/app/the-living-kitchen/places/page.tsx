import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { LifestylePlacesPage } from "@/components/Lifestyle/LifestylePlacesPage";

export const metadata: Metadata = {
  title: "Places | The Living Kitchen",
  description: "Explore extraordinary destinations, culinary travel, architecture, hospitality, and refined experiences from The Living Kitchen.",
};

export default function LifestylePlacesRoutePage() {
  return (
    <>
      <Header />
      <LifestylePlacesPage />
      <Footer lifestyle />
    </>
  );
}
