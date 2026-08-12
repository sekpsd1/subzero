import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { LifestyleFoodPage } from "@/components/Lifestyle/LifestyleFoodPage";

export const metadata: Metadata = {
  title: "Food | Culinary Artistry",
  description: "Discover chef stories, recipes, hosting inspiration, and the craft behind exceptional cuisine.",
};

export default function LifestyleFoodRoutePage() {
  return (
    <>
      <Header />
      <LifestyleFoodPage />
      <Footer />
    </>
  );
}
