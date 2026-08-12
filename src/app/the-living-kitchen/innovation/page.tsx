import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { LifestyleInnovationPage } from "@/components/Lifestyle/LifestyleInnovationPage";

export const metadata: Metadata = {
  title: "Innovation | The Living Kitchen",
  description:
    "Inspired innovation, intelligent appliances, and engineering stories from The Living Kitchen.",
};

export default function LivingKitchenInnovationRoutePage() {
  return (
    <>
      <Header />
      <LifestyleInnovationPage />
      <Footer />
    </>
  );
}
