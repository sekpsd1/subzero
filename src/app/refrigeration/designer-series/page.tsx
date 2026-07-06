import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { DesignerSeriesPage } from "@/components/ProductPages/DesignerSeriesPage";

export const metadata = {
  title: "Designer Series Refrigeration | Sub-Zero",
  description:
    "Explore Sub-Zero Designer Series refrigeration with integrated panel-ready design and advanced food preservation.",
};

export default function DesignerSeriesRoutePage() {
  return (
    <>
      <Header />
      <DesignerSeriesPage />
      <Footer />
    </>
  );
}
