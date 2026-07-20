import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import {
  RefrigerationCategoryPage,
  refrigerationCategoryMetadata,
} from "@/components/ProductPages/RefrigerationCategoryPage";

export const metadata = refrigerationCategoryMetadata.outdoor;

export default function OutdoorRefrigerationRoutePage() {
  return (
    <>
      <Header />
      <RefrigerationCategoryPage category="outdoor" />
      <Footer />
    </>
  );
}
