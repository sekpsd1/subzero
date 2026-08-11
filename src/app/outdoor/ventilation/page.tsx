import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { OutdoorVentilationPage } from "@/components/ProductPages/OutdoorVentilationPage";

export const metadata: Metadata = {
  title: "Outdoor Ventilation | Wolf",
  description:
    "Browse Wolf outdoor pro wall hoods with stainless construction, blower options, LED lighting, and heat safety sensors for outdoor kitchens.",
};

export default function OutdoorVentilationRoutePage() {
  return (
    <>
      <Header />
      <OutdoorVentilationPage />
      <Footer />
    </>
  );
}
