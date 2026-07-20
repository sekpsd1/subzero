import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { GasRangesPage } from "@/components/ProductPages/GasRangesPage";

export const metadata: Metadata = {
  title: "Wolf Gas Ranges",
  description: "Explore Wolf Gas Ranges, GR Series widths, burner configurations, finishes, gas oven performance, and showroom planning.",
};

export default function GasRangesRoutePage() {
  return <><Header /><GasRangesPage /><Footer /></>;
}
