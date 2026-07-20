import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import {
  RefrigerationCategoryPage,
  refrigerationCategoryMetadata,
} from "@/components/ProductPages/RefrigerationCategoryPage";

export const metadata = refrigerationCategoryMetadata["column-freezer"];

export default function ColumnFreezerRoutePage() {
  return (
    <>
      <Header />
      <RefrigerationCategoryPage category="column-freezer" />
      <Footer />
    </>
  );
}
