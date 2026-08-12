import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { OurStoryPageContent } from "@/components/OurStory/OurStoryPageContent";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover more than 80 years of Sub-Zero, Wolf, and Cove innovation, craftsmanship, and dedication to the heart of the home.",
};

export default function OurStoryPage() {
  return (
    <>
      <Header />
      <OurStoryPageContent />
      <Footer ourStory />
    </>
  );
}
