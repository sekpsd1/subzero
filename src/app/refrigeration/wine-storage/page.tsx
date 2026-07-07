import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { WineStoragePage } from "@/components/ProductPages/WineStoragePage";

export const metadata = {
  title: "Wine Storage Refrigeration | Sub-Zero",
  description:
    "Explore Sub-Zero wine storage, precise preservation, design options, and showroom planning.",
};

export default function WineStorageRoutePage() {
  return (
    <>
      <Header />
      <WineStoragePage />
      <Footer />
    </>
  );
}
