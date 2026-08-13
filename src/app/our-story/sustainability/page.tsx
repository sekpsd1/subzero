import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { SustainabilityPageContent } from "@/components/Sustainability/SustainabilityPageContent";

export const metadata: Metadata = {
  title: "Sustainability | Sub-Zero, Wolf, and Cove",
  description:
    "Discover how Sub-Zero, Wolf, and Cove foster sustainability through responsible manufacturing, efficient products, and a positive culture.",
};

export default function SustainabilityPage() {
  return (
    <>
      <Header />
      <SustainabilityPageContent />
      <Footer ourStory showroomMarket="U.S." />
    </>
  );
}
