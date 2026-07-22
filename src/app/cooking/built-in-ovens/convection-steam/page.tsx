import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ConvectionSteamOvensPage } from "@/components/ProductPages/ConvectionSteamOvensPage";

export const metadata: Metadata = {
  title: { absolute: "Convection Steam Ovens | Wolf Built-In Ovens" },
  description:
    "Browse Wolf convection steam ovens with climate-sensing steam, precise heat, and built-in design.",
};

export default function ConvectionSteamOvensRoutePage() {
  return (
    <>
      <Header />
      <ConvectionSteamOvensPage />
      <Footer />
    </>
  );
}
