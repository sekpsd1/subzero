import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { InstallationVideosPageContent } from "@/components/InstallationVideos/InstallationVideosPageContent";

export const metadata: Metadata = {
  title: "Installation Videos",
  description:
    "Visual guides for installing Sub-Zero refrigeration, wine storage, and Cove dishwashers.",
};

export default function InstallationVideosPage() {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/fmm1fin.css" />
      <Header ownerResources />
      <InstallationVideosPageContent />
      <Footer ownerResources />
    </>
  );
}
