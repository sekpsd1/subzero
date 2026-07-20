import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import {
  RefrigerationCategoryPage,
  refrigerationCategoryMetadata,
} from "@/components/ProductPages/RefrigerationCategoryPage";

export const metadata = refrigerationCategoryMetadata["side-by-side"];

export default function SideBySideRoutePage() {
  return (
    <>
      <Header />
      <RefrigerationCategoryPage category="side-by-side" />
      <Footer />
    </>
  );
}
