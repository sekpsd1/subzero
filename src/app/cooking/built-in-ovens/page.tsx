import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { WolfBuiltInOvensPage } from "@/components/ProductPages/WolfBuiltInOvensPage";

export const metadata: Metadata = {
  title: { absolute: "Built-In Ovens | Wolf" },
  description:
    "Wolf built-in ovens, convection ovens, steam ovens, and speed ovens for precise cooking and baking.",
};

export default function BuiltInOvensRoutePage() {
  return (
    <>
      <Header />
      <WolfBuiltInOvensPage />
      <Footer />
    </>
  );
}
