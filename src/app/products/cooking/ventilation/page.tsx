import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { WolfVentilationPage } from "@/components/ProductPages/WolfVentilationPage";

export const metadata: Metadata = {
  title: "Ventilation | Wolf",
  description: "Browse Wolf downdraft, ceiling-mounted, island, wall hood, and hood liner ventilation for quiet, powerful kitchen performance.",
};

export default function VentilationPage() {
  return (
    <>
      <Header />
      <WolfVentilationPage />
      <Footer />
    </>
  );
}
