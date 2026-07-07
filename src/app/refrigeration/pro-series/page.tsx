import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ProSeriesPage } from "@/components/ProductPages/ProSeriesPage";

export const metadata = {
  title: "PRO Series Refrigeration | Sub-Zero",
  description:
    "Explore Sub-Zero PRO Series refrigeration with stainless steel performance, professional design, and preservation features.",
};

export default function ProSeriesRoutePage() {
  return (
    <>
      <Header />
      <ProSeriesPage />
      <Footer />
    </>
  );
}
