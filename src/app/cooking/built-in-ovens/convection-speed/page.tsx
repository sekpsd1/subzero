import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { SpeedOvensPage } from "@/components/ProductPages/SpeedOvensPage";

export const metadata: Metadata = {
  title: { absolute: "Speed Ovens | Wolf Built-In Ovens" },
  description:
    "Browse Wolf convection speed ovens with compact speed, convection, broil, and microwave versatility.",
};

export default function ConvectionSpeedOvensRoutePage() {
  return (
    <>
      <Header />
      <SpeedOvensPage />
      <Footer />
    </>
  );
}
