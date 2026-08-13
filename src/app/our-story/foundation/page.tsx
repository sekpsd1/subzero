import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { FoundationPageContent } from "@/components/Foundation/FoundationPageContent";
import { Header } from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Sub-Zero Group Foundation Mission",
  description:
    "Learn how the Sub-Zero Group Foundation invests in food security, juvenile diabetes research, community centers, and lifelong health.",
};

export default function FoundationPage() {
  return (
    <>
      <Header />
      <FoundationPageContent />
      <Footer ourStory showroomMarket="U.S." />
    </>
  );
}
