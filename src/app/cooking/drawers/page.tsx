import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { WolfDrawersPage } from "@/components/ProductPages/WolfDrawersPage";

export const metadata: Metadata = {
  title: "Drawers | Wolf",
  description: "Browse Wolf warming drawers and vacuum seal drawers for refined preparation, serving, storage, and sous vide support.",
};

export default function DrawersPage() {
  return (
    <>
      <Header />
      <WolfDrawersPage />
      <Footer />
    </>
  );
}
