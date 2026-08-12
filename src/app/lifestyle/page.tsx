import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { LifestylePage } from "@/components/Lifestyle/LifestylePage";

export const metadata: Metadata = {
  title: "Lifestyle | The Living Kitchen",
  description: "Explore The Living Kitchen magazine: stories celebrating design, cuisine, travel, wellness, and the art of living well.",
};

export default function LifestyleRoutePage() {
  return (
    <>
      <Header />
      <LifestylePage />
      <Footer />
    </>
  );
}
