import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { OutdoorRefrigerationPage as OutdoorRefrigerationListing } from "@/components/ProductPages/OutdoorRefrigerationPage";

export const metadata = {
  title: "Outdoor Refrigeration | Sub-Zero and Wolf",
  description:
    "Browse Sub-Zero outdoor refrigeration including outdoor undercounter refrigerators and outdoor refrigerator drawers for refined outdoor living.",
};

export default function OutdoorRefrigerationPage() {
  return (
    <>
      <Header />
      <OutdoorRefrigerationListing />
      <Footer />
    </>
  );
}
