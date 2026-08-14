import type { Metadata } from "next";
import { ContinuingEducationPageContent } from "@/components/ContinuingEducation/ContinuingEducationPageContent";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Continuing Education Units",
  description:
    "Continuing education courses and trade representative training resources for design and building professionals.",
};

export default function ContinuingEducationPage() {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/fmm1fin.css" />
      <Header ownerResources />
      <ContinuingEducationPageContent />
      <Footer ownerResources />
    </>
  );
}
