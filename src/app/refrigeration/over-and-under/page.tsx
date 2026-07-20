import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import {
  RefrigerationCategoryPage,
  refrigerationCategoryMetadata,
} from "@/components/ProductPages/RefrigerationCategoryPage";

export const metadata = refrigerationCategoryMetadata["over-and-under"];

export default function OverAndUnderRoutePage() {
  return (
    <>
      <Header />
      <RefrigerationCategoryPage category="over-and-under" />
      <Footer />
    </>
  );
}
