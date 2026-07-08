import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { FrenchDoorPage } from "@/components/ProductPages/FrenchDoorPage";

export const metadata = {
  title: "French Door Refrigeration | Sub-Zero",
  description:
    "Browse Sub-Zero French Door refrigeration models, preservation features, widths, finishes, and related refrigeration categories.",
};

export default function FrenchDoorRoutePage() {
  return (
    <>
      <Header />
      <FrenchDoorPage />
      <Footer />
    </>
  );
}
