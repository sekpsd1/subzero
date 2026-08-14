import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { KitchenDesignContestPage } from "@/components/KitchenDesignContest/KitchenDesignContestPage";

export const metadata: Metadata = {
  title: "Kitchen Design Contest",
  description:
    "Enter the 2026-2027 Kitchen Design Contest and explore the contest timeline, prizes, rules, judges, and award-winning kitchens.",
};

export default function Page() {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/fmm1fin.css" />
      <Header ownerResources />
      <KitchenDesignContestPage />
      <Footer ourStory showroomMarket="U.S." />
    </>
  );
}
