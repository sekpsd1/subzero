import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { DesignerIceMakerPage } from "@/components/ProductPages/DesignerIceMakerPage";

export const metadata = {
  title: "Designer Undercounter Ice Maker | Sub-Zero",
  description:
    "Explore the Sub-Zero Designer Undercounter Ice Maker, built for clear slow-melting ice in refined indoor and outdoor spaces.",
};

export default function IceMakersRoutePage() {
  return (
    <>
      <Header />
      <DesignerIceMakerPage />
      <Footer />
    </>
  );
}
