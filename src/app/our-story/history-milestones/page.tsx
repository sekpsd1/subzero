import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { HistoryMilestonesPage } from "@/components/HistoryMilestones/HistoryMilestonesPage";

export const metadata: Metadata = {
  title: "80 Years of Innovation",
  description:
    "Explore the Sub-Zero, Wolf, and Cove history of innovation, from Westye Bakke's first refrigeration system to today's kitchen appliances.",
};

export default function HistoryAndMilestonesRoute() {
  return (
    <>
      <Header />
      <HistoryMilestonesPage />
      <Footer ourStory />
    </>
  );
}
