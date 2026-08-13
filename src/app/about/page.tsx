import type { Metadata } from "next";
import { AboutPageContent } from "@/components/About/AboutPageContent";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sub-Zero, Wolf, and Cove, the refrigeration, cooking, and dishwashing specialists behind exceptional kitchens for more than 80 years.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutPageContent />
      <Footer ourStory />
    </>
  );
}
