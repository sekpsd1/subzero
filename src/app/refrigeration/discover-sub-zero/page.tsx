import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { DiscoverSubZeroPage } from "@/components/ProductPages/DiscoverSubZeroPage";

export const metadata = {
  title: "Discover Sub-Zero",
  description:
    "Explore Sub-Zero refrigeration, food preservation, integrated design, and showroom planning.",
};

export default function DiscoverSubZeroRoutePage() {
  return (
    <>
      <Header />
      <DiscoverSubZeroPage />
      <Footer />
    </>
  );
}
