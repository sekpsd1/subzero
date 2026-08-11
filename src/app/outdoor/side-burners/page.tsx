import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { OutdoorSideBurnersPage } from "@/components/ProductPages/OutdoorSideBurnersPage";

export const metadata: Metadata = {
  title: "Side Burners and Burner Modules | Wolf Outdoor",
  description: "Browse Wolf outdoor side burners and built-in burner modules for complete outdoor cooking stations.",
};

export default function OutdoorSideBurnersRoutePage() {
  return (
    <>
      <Header />
      <OutdoorSideBurnersPage />
      <Footer />
    </>
  );
}
