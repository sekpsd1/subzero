import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { FrenchDoorPage } from "@/components/ProductPages/FrenchDoorPage";
import { refrigerationCategoryMetadata } from "@/components/ProductPages/RefrigerationCategoryPage";

export const metadata = refrigerationCategoryMetadata["french-door"];

export default function FrenchDoorRoutePage() {
  return (
    <>
      <Header />
      <FrenchDoorPage />
      <Footer />
    </>
  );
}
