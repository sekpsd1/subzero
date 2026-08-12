import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { LifestyleDesignPage } from "@/components/Lifestyle/LifestyleDesignPage";

export const metadata: Metadata = {
  title: "Design | The Living Kitchen",
  description:
    "Exceptional design, refined interiors, architecture, and kitchen stories from The Living Kitchen.",
};

export default function LivingKitchenDesignRoutePage() {
  return (
    <>
      <Header />
      <LifestyleDesignPage />
      <Footer />
    </>
  );
}
