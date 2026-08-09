import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { WolfCoffeeSystemsPage } from "@/components/ProductPages/WolfCoffeeSystemsPage";

export const metadata: Metadata = {
  title: "Coffee Systems | Wolf",
  description:
    "Browse Wolf built-in coffee systems with espresso, cappuccino, latte, personalized settings, and refined kitchen integration.",
};

export default function CoffeeSystemsPage() {
  return (
    <>
      <Header />
      <WolfCoffeeSystemsPage />
      <Footer />
    </>
  );
}
