import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ClassicSeriesPage } from "@/components/ProductPages/ClassicSeriesPage";

export const metadata = {
  title: "Classic Series Refrigeration | Sub-Zero",
  description:
    "Explore Sub-Zero Classic Series built-in refrigeration, preservation features, finishes, and design inspiration.",
};

export default function ClassicSeriesRoutePage() {
  return (
    <>
      <Header />
      <ClassicSeriesPage />
      <Footer />
    </>
  );
}
