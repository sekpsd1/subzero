import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { DesignedWithYou } from "@/components/Home/DesignedWithYou";
import { ExperienceMore } from "@/components/Home/ExperienceMore";
import { IceMakerFeature } from "@/components/Home/IceMakerFeature";
import { LayeredVideos } from "@/components/Home/LayeredVideos";
import { ShowroomJourney } from "@/components/Home/ShowroomJourney";
import { TriBrandShowcase } from "@/components/Home/TriBrandShowcase";
import { TrustedByBest } from "@/components/Home/TrustedByBest";
import { Hero } from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#0F0F0F] text-[#FBF9F5]">
        <Hero />
        <div className="bg-[#eeece4]">
          <TriBrandShowcase />
          <ShowroomJourney />
          <IceMakerFeature />
        </div>
        <LayeredVideos />
        <TrustedByBest />
        <DesignedWithYou />
        <ExperienceMore />
      </main>
      <Footer />
    </>
  );
}
