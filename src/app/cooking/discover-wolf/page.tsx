import type { Metadata } from "next";

import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { DiscoverWolfPage } from "@/components/ProductPages/DiscoverWolfPage";

export const metadata: Metadata = {
  title: "Discover Wolf",
  description:
    "Discover Wolf precision cooking appliances, professional heritage, inspired design, and showroom experiences.",
};

export default function DiscoverWolfRoutePage() {
  return (
    <>
      <Header />
      <DiscoverWolfPage />
      <Footer />
    </>
  );
}
