import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { KitchenGalleryPage } from "@/components/Inspiration/KitchenGalleryPage";

export const metadata: Metadata = {
  title: "Inspiration Gallery",
  description: "Explore award-winning kitchen inspiration featuring Sub-Zero, Wolf, and Cove appliances.",
};

export default function InspirationKitchensPage() {
  return (
    <>
      <Header />
      <div className="h-[68px] bg-[#151514] md:h-[78px]" aria-hidden="true" />
      <KitchenGalleryPage />
      <Footer />
    </>
  );
}
