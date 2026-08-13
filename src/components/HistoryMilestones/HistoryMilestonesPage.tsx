"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Milestone = {
  year: string;
  copy: string;
  image: string;
  alt: string;
  layout?: "half" | "wide";
};

const milestones: Milestone[] = [
  { year: "1926", copy: "Westye F. Bakke packs up his wife and two young children, and moves to Madison, Wisconsin, in search of opportunity.", image: "/assets/history-milestones/1926.avif", alt: "Westye Bakke riding a motorcycle in 1926" },
  { year: "1930s", copy: "Frank Lloyd Wright hires young Westye Bakke to help design custom refrigeration for the architect’s homes.", image: "/assets/history-milestones/1930s.avif", alt: "View through the spiraling interior of a Frank Lloyd Wright building" },
  { year: "1943", copy: "Westye turns his basement into a lab for developing his own refrigeration designs. Amid wartime shortages, he builds a prototype from scrap metal.", image: "/assets/history-milestones/1943.avif", alt: "Early Sub-Zero refrigerator installed in a period kitchen", layout: "wide" },
  { year: "1950s", copy: "No more fishy ice cubes. Sub-Zero pioneers dual refrigeration–separate, sealed systems for refrigerator and freezer. Sub-Zero invents the built in category. Cabinet-depth, flush-mounted–the look associated with Sub-Zero ever since.", image: "/assets/history-milestones/1950s.avif", alt: "Ice cube illustrating separate refrigerator and freezer systems" },
  { year: "1960s", copy: "The phrase “Sub-Zero kitchen” enters the American real-estate lexicon as shorthand for “a home that gets all the high-end details right.”", image: "/assets/history-milestones/1960s.avif", alt: "Illustration of a 1960s Sub-Zero kitchen" },
  { year: "1970s", copy: "Sub-Zero leads the way in making energy-efficient products. Today, the average Sub-Zero consumes less energy than a 75-watt light bulb.", image: "/assets/history-milestones/1970s.avif", alt: "Illuminated light bulb representing energy efficiency" },
  { year: "1980s", copy: "Our aim is true. Sub-Zero’s awardwinning 500 series nails temperature within 1° for superior food preservation.", image: "/assets/history-milestones/1980s.avif", alt: "Fresh lettuce representing precise food preservation" },
  { year: "1990", copy: "The disappearing refrigerator? Revolutionary integrated designs, another Sub-Zero first, allow refrigeration to blend seamlessly into the décor.", image: "/assets/history-milestones/1990.avif", alt: "Integrated Sub-Zero refrigeration concealed in white cabinetry", layout: "wide" },
  { year: "1999", copy: "Cheers! Sub-Zero uncorks the first wine storage system that does more than just cool the bottles. It protects wine from UV light, vibration, and improper humidity too.", image: "/assets/history-milestones/1999.avif", alt: "Wine glass protected beneath a glass cloche" },
  { year: "2000", copy: "Sub-Zero acquires the residential side of Wolf, a legend in commercial kitchens. Two specialists, now corporate companions and kitchen soul mates. Home chefs can finally enjoy professional-level performance with Wolf ranges, ovens, cooktops, and ventilation.", image: "/assets/history-milestones/2000.avif", alt: "Historic red Wolf Cooking logo" },
  { year: "2003", copy: "Mouths water as Wolf introduces its first dual fuel range: gas cooking above, dual convection electric ovens below.", image: "/assets/history-milestones/2003.avif", alt: "Wolf dual fuel range introduced in 2003" },
  { year: "2008", copy: "Adapting technology used by NASA, Sub-Zero introduces an air purification system that scrubs the air of ethylene gas and odor every 20 minutes.", image: "/assets/history-milestones/2008.avif", alt: "Fresh plated salad representing air purification and food preservation" },
  { year: "2013", copy: "Largest new-product rollout in the company’s history. New technologies. New décor possibilities. New ways to use refrigeration anywhere from the patio to home gym. Here’s to long life; Sub-Zero and Wolf products are engineered and tested to perform beautifully for at least 20 years of heavy use.", image: "/assets/history-milestones/2013.avif", alt: "Sub-Zero and Wolf product collection introduced in 2013", layout: "wide" },
  { year: "2018", copy: "On a mission to conquer clean, the company introduces its newest brand, Cove. Engineered with the same commitment to quality, innovation, and design flexibility as its kitchen counterparts, Cove sets a new standard in luxury dishwashing.", image: "/assets/history-milestones/2018.avif", alt: "Cove dishwasher introduced in 2018" },
  { year: "2020", copy: "To the delight of design professionals everywhere, Sub-Zero perfects its Designer Undercounter Refrigeration with completely concealed hinges that enable stealth storage throughout the home.", image: "/assets/history-milestones/2020.avif", alt: "Designer undercounter refrigeration integrated into dark cabinetry" },
  { year: "2023", copy: "Innovation from the inside out: Sub-Zero reimagines its Classic and Designer Series Refrigeration with patented Split Climate® intelligent cooling, ClearSight™ lighting, and much more.", image: "/assets/history-milestones/2023.avif", alt: "Sub-Zero refrigeration interior with ClearSight lighting" },
  { year: "2025", copy: "Dishwashing on a new scale. Cove debuts ADA-height models that accept handleless panels for a seamless look, and an innovative new wash system makes every new Cove more energy efficient than ever.", image: "/assets/history-milestones/2025.avif", alt: "Cove dishwasher with racks of clean dishes" },
];

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

export function HistoryMilestonesPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    videoRef.current?.pause();
  }, []);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPaused(true));
    else video.pause();
  }

  function syncVideoProgress() {
    const video = videoRef.current;
    if (!video) return;
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    setProgress(duration ? video.currentTime / duration : 0);
  }

  return (
    <main className="overflow-x-clip bg-[#f1efe8] text-[#1c1b19]">
      <section className="relative h-[100svh] min-h-[620px] bg-[#11151d] md:h-[56.25vw] md:max-h-[100svh] md:min-h-0" aria-label="Sub-Zero history film">
        <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/assets/history-milestones/hero-poster.avif" aria-hidden="true" onLoadedMetadata={syncVideoProgress} onTimeUpdate={syncVideoProgress} onPlay={() => setPaused(false)} onPause={() => setPaused(true)}>
          <source src="/assets/history-milestones/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,14,.15)_35%,rgba(4,8,14,.42)_100%)]" />
        <button type="button" onClick={toggleVideo} aria-label={paused ? "Play" : "Pause"} aria-pressed={!paused} className="group absolute bottom-5 right-5 grid h-[60px] w-[60px] place-items-center rounded-full text-white transition hover:scale-[1.03] focus-visible:outline-none md:bottom-6 md:right-6">
          <VideoProgressButton paused={paused} progress={progress} />
          <span className="sr-only">Video</span>
        </button>
      </section>

      <section className="px-6 pb-[86px] pt-[58px] md:px-8 md:pb-[112px] md:pt-[64px]">
        <div className="mx-auto grid max-w-[1392px] items-start gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-[576px_574px] lg:justify-between lg:gap-0">
          <h1 style={serif} className="max-w-[576px] text-[52px] font-normal leading-[.98] tracking-[-.025em] sm:text-[64px] lg:text-[80px] lg:leading-[1.02]">History and milestones</h1>
          <p style={serif} className="max-w-[574px] text-[18px] leading-[1.25] md:text-[20px] lg:text-[24px] lg:leading-[28.8px]">Westye Bakke built his first refrigerator for his young son, who needed insulin preserved securely and consistently at all times. From those hand-bent coils, the Bakkes founded Sub-Zero, a Wisconsin-based, family-owned and -operated company committed to food preservation to this day – along with precision cooking and dishwashing.</p>
        </div>
      </section>

      <div className="px-5 pb-[96px] md:px-8 md:pb-[132px]">
        <div className="mx-auto max-w-[1392px]">
          <TimelineGroup items={milestones.slice(0, 3)} />
          <FeatureMilestone year="1945" copy="Westye launches Sub-Zero Freezer Company, introducing the first system for preserving food at ultra-low temperatures. Literally sub-zero." image="/assets/history-milestones/1945.avif" alt="The original Sub-Zero Freezer Company building in Madison, Wisconsin" />
          <TimelineGroup items={milestones.slice(3, 12)} />
          <FeatureMilestone year="2012" copy="World’s smartest oven? Wolf’s convection steam oven amazes. Crusty steam-baked loaves. Leftovers rejuvenated to just-made deliciousness." image="/assets/history-milestones/2012.avif" alt="Wolf convection steam oven with roasted chicken and vegetables inside" />
          <TimelineGroup items={milestones.slice(12)} />
        </div>
      </div>
    </main>
  );
}

function TimelineGroup({ items }: { items: Milestone[] }) {
  return <section className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label={`${items[0].year} through ${items.at(-1)?.year}`}>{items.map((item) => <MilestoneEntry key={item.year} item={item} />)}</section>;
}

function MilestoneEntry({ item }: { item: Milestone }) {
  if (item.layout === "wide") return <article className="grid bg-[#f7f5ef] sm:col-span-2 sm:grid-cols-[25.4%_74.6%]"><MilestoneCopy item={item} wide /><MilestoneImage item={item} wide /></article>;
  return <article className="flex min-w-0 flex-col bg-[#f7f5ef]"><MilestoneImage item={item} /><MilestoneCopy item={item} /></article>;
}

function MilestoneCopy({ item, wide = false }: { item: Milestone; wide?: boolean }) {
  return <div className={wide ? "min-h-[178px] px-5 py-6 sm:min-h-0 sm:p-6" : "min-h-[178px] px-5 py-6 sm:grid sm:min-h-0 sm:grid-cols-2 sm:items-start sm:gap-6 sm:px-6 sm:py-6"}><h2 style={serif} className="text-[36px] font-normal leading-[1.1] tracking-[-.015em] md:text-[40px] md:leading-[44px]">{item.year}</h2><p className={`${wide ? "mt-6" : "mt-4 sm:mt-0"} max-w-[310px] text-[14px] leading-[1.35] md:text-[16px] md:leading-[19.52px]`}>{item.copy}</p></div>;
}

function MilestoneImage({ item, wide = false }: { item: Milestone; wide?: boolean }) {
  return <div className={`relative overflow-hidden bg-[#ece9e1] ${wide ? "min-h-[300px] sm:min-h-0 sm:aspect-[1.6]" : "aspect-[1.6]"}`}><Image src={item.image} alt={item.alt} fill sizes={wide ? "(min-width: 1440px) 1040px, (min-width: 768px) 75vw, 100vw" : "(min-width: 1440px) 692px, (min-width: 768px) 50vw, 100vw"} className="object-cover" /></div>;
}

function FeatureMilestone({ year, copy, image, alt }: { year: string; copy: string; image: string; alt: string }) {
  return <section className="py-[112px] text-center md:relative md:left-1/2 md:mb-[72px] md:mt-16 md:w-[calc(100%+48px)] md:max-w-[1440px] md:-translate-x-1/2 md:px-12 md:py-16" aria-labelledby={`milestone-${year}`}><div className="relative mx-auto aspect-[1.55] w-full max-w-[760px] sm:aspect-[1.75] md:aspect-video md:max-w-none"><Image src={image} alt={alt} fill sizes="(min-width: 1440px) 1344px, (min-width: 768px) calc(100vw - 96px), 100vw" className="object-cover" /></div><h2 id={`milestone-${year}`} style={serif} className="mx-auto mt-8 max-w-[830px] text-[31px] font-normal leading-[1.08] tracking-[-.012em] md:mt-10 md:max-w-[980px] md:text-[40px] md:leading-[50px]">{year} - {copy}</h2></section>;
}

function VideoProgressButton({ paused, progress }: { paused: boolean; progress: number }) {
  const circumference = 2 * Math.PI * 24;

  return (
    <svg className="h-[60px] w-[60px]" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="3" className="opacity-45" />
      <circle
        cx="30"
        cy="30"
        r="24"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: circumference * (1 - progress),
          transform: "rotate(-90deg)",
          transformOrigin: "30px 30px",
        }}
      />
      <circle cx="30" cy="30" r="20" fill="rgba(10, 14, 22, .72)" />
      {paused ? (
        <path d="M25 20.5 40 30 25 39.5v-19Z" fill="currentColor" />
      ) : (
        <g fill="currentColor">
          <rect x="24" y="20" width="3" height="20" rx="1.5" />
          <rect x="33" y="20" width="3" height="20" rx="1.5" />
        </g>
      )}
      <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 transition group-focus-visible:opacity-100" />
    </svg>
  );
}
