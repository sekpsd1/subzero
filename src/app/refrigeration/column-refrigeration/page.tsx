import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import {
  RefrigerationCategoryPage,
  refrigerationCategoryMetadata,
} from "@/components/ProductPages/RefrigerationCategoryPage";

export const metadata = refrigerationCategoryMetadata["column-refrigeration"];

export default function ColumnRefrigerationRoutePage() {
  return (
    <>
      <Header />
      <RefrigerationCategoryPage category="column-refrigeration" />
      <Footer />
    </>
  );
}
