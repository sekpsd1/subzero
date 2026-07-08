import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { UndercounterPage } from "@/components/ProductPages/UndercounterPage";

export const metadata = {
  title: "Undercounter Refrigeration | Sub-Zero",
  description:
    "Explore Sub-Zero undercounter refrigeration, beverage centers, wine storage, ice makers, and flexible compact preservation.",
};

export default function UndercounterRoutePage() {
  return (
    <>
      <Header />
      <UndercounterPage />
      <Footer />
    </>
  );
}
