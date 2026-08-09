import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { WolfMicrowavesPage } from "@/components/ProductPages/WolfMicrowavesPage";

export const metadata: Metadata = {
  title: "Microwaves | Wolf",
  description: "Browse Wolf microwaves, drawer microwaves, and built-in microwave options with refined design and everyday speed.",
};

export default function MicrowavesPage() {
  return (
    <>
      <Header />
      <WolfMicrowavesPage />
      <Footer />
    </>
  );
}
