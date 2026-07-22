import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ConvectionOvensPage } from "@/components/ProductPages/ConvectionOvensPage";

export const metadata: Metadata = {
  title: { absolute: "Convection Ovens | Wolf Built-In Ovens" },
  description:
    "Browse Wolf convection, convection steam, and convection speed ovens with precise heat, airflow, and built-in design.",
};

export default function ConvectionOvensRoutePage() {
  return (
    <>
      <Header />
      <ConvectionOvensPage />
      <Footer />
    </>
  );
}
