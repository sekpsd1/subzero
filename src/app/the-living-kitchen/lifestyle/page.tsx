import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { LifestyleCategoryPage } from "@/components/Lifestyle/LifestyleCategoryPage";

export const metadata: Metadata = {
  title: "Lifestyle | The Living Kitchen",
  description: "Explore refined living, wellness, travel, hosting, and elegant home rituals from The Living Kitchen.",
};

export default function LifestyleCategoryRoutePage() {
  return (
    <>
      <Header />
      <LifestyleCategoryPage />
      <Footer lifestyle />
    </>
  );
}
