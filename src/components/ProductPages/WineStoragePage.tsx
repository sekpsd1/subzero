"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DesignedWithYou } from "@/components/Home/DesignedWithYou";

const aem = (id: string, file: string, width = 1920) =>
  `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:${id}/as/${file}&width=${width}&max-quality=90`;

const assets = {
  heroVideo:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:a2594487-25d6-44c0-8e94-2f3cc070690b/renditions/original/as/Wine LP Hero.mp4#t=0.001",
  heroPoster: aem(
    "891614aa-070b-46ff-9b50-d87646bbed1b",
    "wine-fallback.avif?assetname=wine-fallback.png",
    2560,
  ),
  showroom: "/assets/subzero/discover/SZG_Miami_Showroom_51876.avif",
  exceptional: aem(
    "902166d3-b002-4391-8fea-d2ac16b3bd57",
    "MED_SLG_LIVINGRM_DEU_3.avif?assetname=MED_SLG_LIVINGRM_DEU_3.tif",
    1440,
  ),
  design: aem(
    "4cd7a164-2ea7-49be-b27d-0e5ff40a2752",
    "MED_SLG_043019_8_closed.avif?assetname=MED_SLG_043019_8_closed.tif",
    1440,
  ),
  precision: aem(
    "fde34f80-f701-441f-b764-6f1b5301d843",
    "Fixed-aspect-ratio-image-(6).avif?assetname=Fixed+aspect+ratio+image+%286%29.png",
    1440,
  ),
  tailored: aem(
    "a4883214-fb7f-4938-8c9e-51573b5ae50a",
    "CU_SLG_070221_3.avif?assetname=CU_SLG_070221_3.tif",
    1440,
  ),
  parallax: aem(
    "6728ba26-d033-4c89-9f42-8fccaf31d809",
    "Shot_17_18-copy.avif?assetname=Shot_17_18+copy.jpg",
    1920,
  ),
  complements: aem(
    "4e44980a-3ef9-483f-a755-d7c0adfd72b2",
    "SM_SLG_CLOSET_DEU_11.avif?assetname=SM_SLG_CLOSET_DEU_11.tif",
    1440,
  ),
  detail: aem(
    "61fcf355-5d48-4753-8dee-e2e1d536039e",
    "LG_SLG_102218_3.avif?assetname=LG_SLG_102218_3.jpg",
    1440,
  ),
  classicModel: aem(
    "cb8b7cce-7af9-47d4-b4f9-e7607b5f4e7a",
    "22-SUBZ-BI-CLASSIC-SILOS_WINE_CL3050W_S_T_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_WINE_CL3050W_S_T_R_SH.png",
    1280,
  ),
  designerModel: aem(
    "6b4ac4d0-3581-477d-be84-14271f11f416",
    "DEC3050W_R-CUSTOM_SH-(1).avif?assetname=DEC3050W_R-CUSTOM_SH+%281%29.png",
    1280,
  ),
  undercounterModel: aem(
    "2ff85bed-db0d-4d22-aff7-3ebf479c730c",
    "DEU2450W_R_SH.avif?assetname=DEU2450W_R_SH.png",
    1280,
  ),
  inspirationOne: aem(
    "6d86ad53-e5f7-4f85-8fd5-27c04cf6ff5c",
    "ICBIW-30_Pair_ICBIT-36CIID_ICBSO30TE_Pair.avif?assetname=ICBIW-30_Pair_ICBIT-36CIID_ICBSO30TE_Pair.tif",
    1440,
  ),
  inspirationTwo: aem(
    "77b48fb5-09dd-4b92-9e81-5e2d3f641446",
    "IW-30R_LT_SLG.avif?assetname=IW-30R_LT_SLG.jpg",
    1440,
  ),
  inspirationThree: aem(
    "5eec95ee-9bc3-4ae6-8c78-5911c2771f3d",
    "V2_22_06_09_Retouch_SteamOvens_SubZero_Toolbox_CoffeeMachine_Bold_v2.avif?assetname=V2_22_06_09_Retouch_SteamOvens_SubZero_Toolbox_CoffeeMachine_Bold_v2.jpg",
    1440,
  ),
  inspirationFour: aem(
    "f423735d-f194-47b9-bc2a-85da14853c9c",
    "MED_SLG_070121_1.avif?assetname=MED_SLG_070121_1.tif",
    1440,
  ),
  kitchen: aem(
    "4400f1c2-f6f3-4e9a-824d-84fb42c6785b",
    "SLG_MED_081522_8b_dynamiccarousel.avif?assetname=SLG_MED_081522_8b_dynamiccarousel.jpg",
    1440,
  ),
  drawers: aem("fe99de7e-0cbd-412c-8381-0b152ab1760e", "image1.avif?assetname=image1.png", 900),
  beverage: aem("fc3a3c26-5add-4d29-8f6b-8e9f0e335c59", "image.avif?assetname=image.png", 900),
  overview: aem(
    "45bd0bf4-1368-4015-931d-34c45d46e1e4",
    "SZWC_PA_0342_4021FC_A_GraCol2006.avif?assetname=SZWC_PA_0342_4021FC_A_GraCol2006.jpg",
    900,
  ),
  story: aem(
    "86a9f640-dd9a-4dc2-b2e1-c026a850c307",
    "Sub-Zero-day-1-7995.avif?assetname=Sub-Zero+day+1-7995.jpg",
    900,
  ),
};

const wineModels = [
  {
    title: "Classic",
    copy: "Its distinctive grille and stainless-steel features make Classic Series iconic. This 30-inch wine storage unit offers the option of a pro or tubular handle to coordinate with other Sub-Zero, Wolf, and Cove appliances.",
    image: assets.classicModel,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage&default.mnseries=Classic+Series+Refrigeration",
  },
  {
    title: "Designer",
    copy: "Equipped with the same preservation technology as Classic Series, Designer Series units accept custom panels and handles for a completely integrated look that blends seamlessly into your decor.",
    image: assets.designerModel,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage&default.mnseries=Designer+Series",
  },
  {
    title: "Undercounter",
    copy: "These compact models open a nearly endless array of undercounter refrigeration options-pair multiple units side by side or combine with a beverage center or ice maker for more robust functionality.",
    image: assets.undercounterModel,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage%2Fundercounter",
  },
];

const wineLayeredSlides = [
  {
    title: "Exceptional preservation",
    titleLines: ["Exceptional", "preservation"],
    id: "exceptional-preservation",
    image: assets.exceptional,
    assetId: "902166d3-b002-4391-8fea-d2ac16b3bd57",
    alt: "Sub-Zero wine storage integrated into an elegant home bar with a chair, glassware, and warm brass cabinetry.",
  },
  {
    title: "Endless design possibilities",
    titleLines: ["Endless design", "possibilities"],
    id: "endless-design-possibilities",
    image: assets.design,
    assetId: "4cd7a164-2ea7-49be-b27d-0e5ff40a2752",
    alt: "Sub-Zero wine storage integrated into cabinetry in a refined kitchen.",
  },
];

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncProgress = () => {
      if (!video.duration) {
        setProgress(0);
        return;
      }

      setProgress(video.currentTime / video.duration);
    };

    video.addEventListener("timeupdate", syncProgress);
    video.addEventListener("loadedmetadata", syncProgress);

    return () => {
      video.removeEventListener("timeupdate", syncProgress);
      video.removeEventListener("loadedmetadata", syncProgress);
    };
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <section
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#111]"
      data-aem-asset-id="a2594487-25d6-44c0-8e94-2f3cc070690b"
      role="region"
      aria-label="Sub-Zero built-in wine refrigerator integrated into wooden kitchen cabinetry with wine glasses and decanter on marble countertop, featuring Wolf lighting fixture above"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={assets.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={assets.heroVideo} type="video/mp4" />
      </video>
      <button
        type="button"
        aria-label={isPaused ? "Play" : "Pause"}
        aria-pressed={!isPaused}
        onClick={toggleVideo}
        className="group absolute bottom-5 right-5 grid h-[60px] w-[60px] place-items-center text-white outline-none transition hover:text-[#f4f2ec] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:bottom-8 md:right-8"
      >
        <svg
          className="h-[60px] w-[60px]"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="30" cy="30" r={radius} stroke="rgba(255,255,255,0.38)" strokeWidth="3" />
          <circle
            cx="30"
            cy="30"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="-rotate-90 origin-center transition-[stroke-dashoffset]"
          />
          <circle cx="30" cy="30" r="20" fill="rgba(0,0,0,0.72)" />
          {isPaused ? (
            <path d="M25 20L40 30L25 40V20Z" fill="currentColor" />
          ) : (
            <>
              <rect x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
              <rect x="33" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
            </>
          )}
          <circle cx="30" cy="30" r="18" fill="none" stroke="rgba(255,255,255,0)" strokeWidth="2" />
        </svg>
        <span className="sr-only">Video</span>
      </button>
    </section>
  );
}

function StickyShowroomCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const intro = document.querySelector("[data-wine-intro]");
    if (!intro) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { threshold: 0.05 },
    );

    observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      href="/showroom"
      className={`fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 rounded-full bg-[#171715] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition duration-300 md:inline-flex ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      Visit a showroom
    </Link>
  );
}

function Intro() {
  return (
    <section data-wine-intro className="bg-[#111110] px-6 pb-20 pt-14 text-[#f8f5ee] md:px-12 md:pb-24 md:pt-16">
      <div className="mx-auto flex max-w-[940px] flex-col items-center text-center">
        <Image
          src="/assets/subzero/white-logo-sub-zero.png"
          alt="Sub-Zero"
          width={156}
          height={36}
          className="h-auto w-[118px] md:w-[128px]"
          priority
        />
        <h1 className="mt-7 max-w-[840px] font-serif text-[clamp(3.6rem,5.56vw,5rem)] leading-[1.02] tracking-normal">
          Protect your
          <br />
          <span className="whitespace-nowrap">treasured collection</span>
        </h1>
        <p className="mt-5 max-w-[720px] text-[1rem] leading-[1.35] text-white md:text-[1.08rem]">
          Sub-Zero Wine Storage Units are more than just coolers: they are guardians against heat,
          humidity, vibration, and light-the four enemies that can rob wine of its complexity,
          character, and taste.
        </p>
        <Link
          href="/showroom"
          className="mt-8 inline-flex min-h-[52px] min-w-[260px] items-center justify-center rounded-full bg-[#f8f5ee] px-9 text-[0.95rem] font-bold text-[#111110] transition hover:bg-white"
        >
          Experience in a showroom
        </Link>
      </div>
    </section>
  );
}

function WineLayeredImage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const syncProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);

      setScrollProgress(progress);
    };

    syncProgress();
    window.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress);

    return () => {
      window.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
    };
  }, []);

  const skipSection = () => {
    const section = sectionRef.current;
    if (!section) return;

    window.scrollTo({
      top: section.getBoundingClientRect().bottom + window.scrollY,
      behavior: "smooth",
    });
  };

  const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);
  const ease = (value: number) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };

  const scrollToSlide = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const targetStage = index === 0 ? 0 : index * 2 + 1;
    const targetProgress = targetStage / (wineLayeredSlides.length * 2);
    const top = section.getBoundingClientRect().top + window.scrollY + scrollable * targetProgress;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const timelineProgress = scrollProgress * wineLayeredSlides.length * 2;
  const progressLineHeight = 8 + scrollProgress * 92;

  return (
    <section
      ref={sectionRef}
      className="section layered-images-container relative h-[320svh] bg-[#111110] px-6 pb-8 md:px-12 md:pb-12"
      data-palette="dark--off-white"
      role="region"
      aria-labelledby="exceptional-preservation"
    >
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-start justify-center pt-5 md:pt-6">
        <div className="relative w-full max-w-[1320px]">
          <ul className="relative aspect-[1.78] min-h-[520px] overflow-hidden bg-[#171715]">
            {wineLayeredSlides.map((slide, index) => {
              const enterStart = index === 0 ? 0 : index * 2;
              const imageSettle = index === 0 ? 1 : enterStart + 1;
              const overlayStart = imageSettle + 0.28;
              const overlayEnd = imageSettle + 0.95;
              const enterProgress = index === 0 ? 1 : ease(timelineProgress - enterStart);
              const zoomProgress = ease((timelineProgress - imageSettle + 0.9) / 0.9);
              const overlayOpacity = ease((timelineProgress - overlayStart) / (overlayEnd - overlayStart));
              const translateY = index === 0 ? 0 : (1 - enterProgress) * 110;
              const imageScale = 1.15 - zoomProgress * 0.15;
              const isActive =
                timelineProgress >= enterStart &&
                (index === wineLayeredSlides.length - 1 ||
                  timelineProgress < (index + 1) * 2);

              return (
                <li
                  key={slide.id}
                  className="absolute inset-0 transition-transform duration-150 ease-out"
                  style={{ transform: `translateY(${translateY}%)`, zIndex: index + 1 }}
                  aria-hidden={!isActive}
                >
                  <div className="relative h-full w-full overflow-hidden" data-aem-asset-id={slide.assetId}>
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="(min-width: 1440px) 1320px, calc(100vw - 48px)"
                      className="object-cover"
                      style={{ transform: `scale(${imageScale})` }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-black"
                      style={{ opacity: overlayOpacity * 0.62 }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-white"
                      style={{
                        opacity: overlayOpacity,
                        transform: `translateY(${(1 - overlayOpacity) * 10}px)`,
                      }}
                    >
                      <h2
                        id={slide.id}
                        className="font-serif text-[clamp(2.55rem,3.15vw,3.75rem)] leading-none"
                      >
                        {slide.titleLines.map((line) => (
                          <span key={line} className="block whitespace-nowrap">
                            {line}
                          </span>
                        ))}
                      </h2>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="absolute right-[-32px] top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="relative h-[100px] w-px bg-white/45">
              <div
                className="absolute left-0 top-0 w-px bg-white"
                style={{ height: `${progressLineHeight}%` }}
              />
              <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-between">
                {wineLayeredSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className="h-6 w-6 -translate-x-1/2"
                    aria-label={`Image ${index + 1} / ${wineLayeredSlides.length}`}
                    onClick={() => scrollToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="absolute bottom-3 right-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white bg-[#111110]/80 text-white transition hover:bg-white hover:text-[#111110] md:bottom-4 lg:right-[-60px]"
            aria-label="Skip to next section"
            onClick={skipSection}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 21L7 16M12 21L17 16M12 21V3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function CraftedSection() {
  return (
    <section className="bg-[#111110] px-6 pb-0 pt-8 text-[#f4f2ec] md:px-12 md:pb-0 md:pt-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="font-serif text-[clamp(3.6rem,4.5vw,5rem)] leading-[1.02]">
            Crafted for connoisseurs
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-[1rem] leading-[1.45] text-white md:text-[1.08rem]">
            Advanced preservation technology ensures each bottle ages just as the winemaker
            intended. With precise temperature control and vibration-dampening design, every glass
            you serve will reflect the integrity of the original vintage.
          </p>
          <Link href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage" className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-[#171715]">
            Explore wine storage
          </Link>
        </div>

        <div className="mt-24 grid gap-16 lg:gap-24">
          <FeatureRow
            title="Preserve with precision"
            copy="Sub-Zero honors every bottle in your collection. From UV-resistant glass to dual evaporators and separate temperature zones for red and white wine, each unit maintains ideal conditions and showcases your collection beautifully."
            image={assets.precision}
            imageAlt="Sub-Zero wine storage with bottles arranged on shelves."
          />
          <FeatureRow
            title="Tailored to your taste"
            copy="Whether you are curating a few favorites or filling an expansive cellar, flexible configurations and accessories fit your space, style, and collection size."
            image={assets.tailored}
            imageAlt="Wine storage under a counter in a lounge setting."
            reverse
          />
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  title,
  copy,
  image,
  imageAlt,
  reverse = false,
}: {
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <article
      className={`grid items-center gap-10 lg:grid-cols-[minmax(0,820px)_minmax(360px,1fr)] lg:gap-16 xl:gap-20 ${
        reverse ? "lg:grid-cols-[minmax(360px,1fr)_minmax(0,820px)] lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="relative aspect-[1.16] overflow-hidden bg-[#26231f]">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1280px) 820px, 100vw" className="object-cover" />
      </div>
      <div className="lg:pt-8">
        <h3 className="font-serif text-[clamp(2.25rem,3.125vw,2.5rem)] leading-[1.1]">{title}</h3>
        <p className="mt-6 max-w-[520px] text-[0.98rem] leading-[1.45] text-white md:text-[1.05rem]">
          {copy}
        </p>
        <Link
          href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage"
          className="mt-6 inline-flex border-b border-white pb-0.5 text-[0.95rem] font-medium text-white transition hover:border-[#d8d2c8] hover:text-[#d8d2c8]"
        >
          Explore products
        </Link>
      </div>
    </article>
  );
}

function MediaBreak() {
  return (
    <section className="bg-[#111110] px-6 pb-16 pt-16 md:px-12 md:pb-[72px] md:pt-24">
      <div className="relative mx-auto min-h-[760px] max-w-[1408px] md:min-h-[820px]">
        <div className="relative z-10 w-full max-w-[700px] md:w-[50%]">
          <div className="relative aspect-[0.81] overflow-hidden bg-[#24221f]">
            <Image
              src={assets.parallax}
              alt="Sub-Zero wine storage integrated into a wet bar with glass doors."
              fill
              sizes="(min-width: 1280px) 700px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-6 max-w-[360px] text-white">
            <h2 className="text-[0.95rem] font-bold leading-tight">Complements any space</h2>
            <p className="mt-4 text-[0.9rem] leading-[1.22]">
              Pair with other Sub-Zero, Wolf, and Cove appliances for a unified kitchen or combine
              with a beverage center or Wolf Coffee System for a comprehensive wet bar.
            </p>
          </div>
        </div>

        <div className="relative z-20 -mt-20 ml-auto w-[88%] max-w-[700px] overflow-hidden bg-[#24221f] md:absolute md:right-0 md:top-[120px] md:mt-0 md:w-[50%]">
          <div className="relative aspect-[0.76]">
            <Image
              src={assets.complements}
              alt="Wine bottles arranged on Sub-Zero wine storage shelves."
              fill
              sizes="(min-width: 1280px) 700px, 88vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WineShowroomJourney() {
  return (
    <section className="bg-[#111110] px-6 pb-32 pt-24 text-[#171715] md:px-12 md:pb-40 md:pt-24">
      <div className="mx-auto grid max-w-[1040px] items-center bg-[#fbfaf7] p-6 md:grid-cols-[380px_1fr] md:gap-14">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={assets.showroom}
            alt="Showroom consultation with Sub-Zero and Wolf appliances"
            fill
            sizes="(min-width: 1024px) 426px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center py-8 md:py-0">
          <h2 className="max-w-[520px] font-serif text-[clamp(3rem,3.2vw,4rem)] leading-[1.05]">
            <span className="block md:whitespace-nowrap">Start your journey</span>
            <span className="block">in a showroom</span>
          </h2>
          <p className="mt-7 max-w-[470px] text-[1.05rem] leading-snug md:text-[1.08rem]">
            Our showrooms are where inspiration turns into informed decisions. Learn how a visit
            helps you plan, compare, and move forward with confidence.
          </p>
          <div className="mt-8">
            <Link
              href="/showroom/appointment"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171715] px-8 text-base font-bold text-white transition hover:bg-[#34322e]"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpandingMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const [zoomProgress, setZoomProgress] = useState(0);

  useEffect(() => {
    const updateZoomProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - rect.top) / travel));
      setZoomProgress(progress);
    };

    updateZoomProgress();
    window.addEventListener("scroll", updateZoomProgress, { passive: true });
    window.addEventListener("resize", updateZoomProgress);

    return () => {
      window.removeEventListener("scroll", updateZoomProgress);
      window.removeEventListener("resize", updateZoomProgress);
    };
  }, []);

  const borderSize = `${Math.max(0, 2.1 - zoomProgress * 2.1)}vw`;
  const imageScale = 1.035 - zoomProgress * 0.035;

  return (
    <section
      ref={sectionRef}
      className="section expanding-media-container h-[155svh] bg-[#111110]"
      data-section-status="loaded"
      data-brand="sub-zero"
      role="region"
      aria-label="Modern dining area with Sub-Zero wine refrigerator"
    >
      <div className="expanding-media-wrapper sticky top-0">
        <div className="expanding-media block relative" data-block-name="expanding-media" data-block-status="loaded">
          <div className="tension-zoom tension-zoom--active relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#111110]">
            <div
              className="media-item-wrapper expanding-media-media-element relative h-full w-full"
              data-aem-asset-id="61fcf355-5d48-4753-8dee-e2e1d536039e"
            >
              <Image
                src={assets.detail}
                alt="Modern dining area with Sub-Zero wine refrigerator built into a textured wall and Wolf kitchen appliances in a high-rise apartment."
                fill
                sizes="100vw"
                className="frame object-cover will-change-transform"
                style={{ transform: `scale(${imageScale})` }}
              />
            </div>
            <div
              className="tension-zoom-border tension-zoom-block tension-zoom-top pointer-events-none absolute left-0 top-0 w-full bg-[#111110] will-change-[height]"
              style={{ height: borderSize }}
            />
            <div
              className="tension-zoom-border tension-zoom-inline tension-zoom-right pointer-events-none absolute right-0 top-0 h-full bg-[#111110] will-change-[width]"
              style={{ width: borderSize }}
            />
            <div
              className="tension-zoom-border tension-zoom-block tension-zoom-bottom pointer-events-none absolute bottom-0 left-0 w-full bg-[#111110] will-change-[height]"
              style={{ height: borderSize }}
            />
            <div
              className="tension-zoom-border tension-zoom-inline tension-zoom-left pointer-events-none absolute left-0 top-0 h-full bg-[#111110] will-change-[width]"
              style={{ width: borderSize }}
            />
            <div className="trigger-line pointer-events-none absolute top-[55%] w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function WineModelGallery() {
  const [active, setActive] = useState(0);
  const [visibleModelIndex, setVisibleModelIndex] = useState(0);
  const [descriptionVisible, setDescriptionVisible] = useState(true);
  const descriptionTimerRef = useRef<number | null>(null);
  const visibleModel = wineModels[visibleModelIndex];

  const selectModel = (index: number) => {
    if (index === active) return;

    setActive(index);
    setDescriptionVisible(false);

    if (descriptionTimerRef.current) {
      window.clearTimeout(descriptionTimerRef.current);
    }

    descriptionTimerRef.current = window.setTimeout(() => {
      setVisibleModelIndex(index);
      window.requestAnimationFrame(() => setDescriptionVisible(true));
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (descriptionTimerRef.current) {
        window.clearTimeout(descriptionTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="overflow-hidden bg-[#111110] px-4 pb-16 pt-20 text-[#f4f2ec] md:px-8 md:pb-24 md:pt-[74px]">
      <div className="mx-auto max-w-[1392px]">
        <div className="grid min-h-[268px] gap-8 lg:grid-cols-[minmax(0,620px)_auto] lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-[3.25rem] leading-[1.07] md:text-[3.75rem] lg:text-[4rem]">
              Cheers to smarter wine storage
            </h2>
            <p className="mt-6 max-w-[570px] text-[1rem] leading-[1.35] text-white">
              Innovative technology, superior quality, and exceptional design set Sub-Zero Wine
              Storage apart.
            </p>
          </div>
          <Link
            href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/70 px-8 text-[0.9rem] font-bold text-white transition hover:bg-white hover:text-[#171715] lg:mt-20"
          >
            Explore all wine storage
          </Link>
        </div>
      </div>

      <div className="relative left-1/2 mt-6 min-h-[700px] w-screen -translate-x-1/2 md:mt-10 lg:min-h-[720px]">
        <div className="absolute left-1/2 top-0 h-[500px] w-[330px] -translate-x-1/2 sm:h-[540px] sm:w-[380px] lg:h-[560px] lg:w-[430px]">
          {wineModels.map((model, index) => {
            const offset = index - active;
            const wrappedOffset =
              offset > wineModels.length / 2
                ? offset - wineModels.length
                : offset < -wineModels.length / 2
                  ? offset + wineModels.length
                  : offset;
            const isActive = index === active;

            return (
              <button
                key={model.title}
                type="button"
                aria-label={`Show ${model.title}`}
                className="absolute left-1/2 top-0 h-full w-full transition duration-500 ease-out"
                style={{
                  opacity: Math.abs(wrappedOffset) > 1 ? 0 : isActive ? 1 : 0.52,
                  transform: `translateX(calc(-50% + ${wrappedOffset * 910}px)) scale(${
                    isActive ? 1 : 0.86
                  })`,
                  zIndex: isActive ? 2 : 1,
                }}
                onClick={() => selectModel(index)}
              >
                <Image
                  src={model.image}
                  alt={`${model.title} wine storage model`}
                  fill
                  sizes="(min-width: 1024px) 430px, 80vw"
                  className="object-contain"
                  priority={index === 0}
                />
              </button>
            );
          })}
        </div>

        <div className="mx-auto flex max-w-[1392px] justify-center px-4 pt-[500px] sm:pt-[540px] md:px-8 lg:block lg:pt-0">
          <div
            className={`w-full max-w-[330px] transition duration-300 ease-out lg:absolute lg:left-[calc(50%+240px)] lg:top-[200px] ${
              descriptionVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <h3 className="font-serif text-[1.8rem] leading-tight">{visibleModel.title}</h3>
            <p className="mt-4 text-[1rem] leading-[1.25] text-white">{visibleModel.copy}</p>
            <Link
              href={visibleModel.href}
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full border border-white/70 px-5 text-[0.9rem] font-bold text-white transition hover:bg-white hover:text-[#171715]"
            >
              Explore this model
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 flex w-full max-w-[1392px] -translate-x-1/2 justify-center px-4 md:px-8">
          <div className="inline-flex max-w-full overflow-x-auto rounded-full border border-white/22 bg-[#171715] p-1">
            {wineModels.map((model, index) => (
              <button
                key={model.title}
                type="button"
                aria-pressed={index === active}
                className={`shrink-0 rounded-full px-5 py-2 text-[0.84rem] font-bold transition ${
                  index === active ? "bg-white text-[#171715]" : "text-white"
                }`}
                onClick={() => selectModel(index)}
              >
                {model.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompleteKitchen() {
  return (
    <section className="bg-[#f4f2ec] px-6 py-16 text-[#171715] md:px-12 md:py-20">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="mb-8 font-serif text-[clamp(2.85rem,3.25vw,4rem)] leading-tight">
          Complete your kitchen
        </h2>
        <div className="grid gap-2 md:grid-cols-2">
          <Link href="/products/refrigeration/drawers" className="group relative aspect-[1.05] min-h-[430px] overflow-hidden bg-[#d8d2c8]">
            <Image src={assets.drawers} alt="Sub-Zero refrigeration drawers with fresh fruit and beverages." fill sizes="(min-width: 1024px) 696px, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
            <TileLabel title="Drawers" />
          </Link>
          <Link href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fbeverage-centers" className="group relative aspect-[1.05] min-h-[430px] overflow-hidden bg-[#d8d2c8]">
            <Image src={assets.beverage} alt="Beverage center in a wet bar." fill sizes="(min-width: 1024px) 696px, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
            <TileLabel title="Beverage centers" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TileLabel({ title }: { title: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <h3 className="absolute bottom-7 left-7 font-serif text-[clamp(2.1rem,2.45vw,2.6rem)] leading-none text-white">
        {title}
      </h3>
    </>
  );
}

function MoreToDiscover() {
  return (
    <section className="bg-[#f4f2ec] px-6 py-16 text-[#171715] md:px-12 md:py-24">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="font-serif text-[clamp(3rem,3.2vw,4rem)] leading-tight">
          More to discover
        </h2>
        <div className="mt-8 grid gap-2 md:grid-cols-2">
          {[
            {
              title: "Sub-Zero overview",
              copy: "Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies.",
              cta: "Learn about Sub-Zero",
              href: "/refrigeration/discover-sub-zero",
              image: assets.overview,
            },
            {
              title: "Why Sub-Zero, Wolf, and Cove?",
              copy: "Delve into why designers trust Sub-Zero, Wolf, and Cove to help craft the world's finest kitchens.",
              cta: "Learn about us",
              href: "/our-story",
              image: assets.story,
            },
          ].map((item) => (
            <article key={item.title} className="bg-[#fbfaf7]">
              <div className="relative aspect-[1.45] overflow-hidden">
                <Image src={item.image} alt="" fill sizes="(min-width: 768px) 696px, 100vw" className="object-cover" />
              </div>
              <div className="grid gap-7 p-7 md:grid-cols-[0.9fr_1fr] md:p-8">
                <div>
                <h3 className="font-serif text-[clamp(2.35rem,2.45vw,2.85rem)] leading-[1.03]">
                  {item.title}
                </h3>
                <Link href={item.href} className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold text-[#171715]">
                  {item.cta}
                </Link>
                </div>
                <p className="max-w-[300px] text-[0.95rem] leading-[1.32]">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WineStoragePage() {
  return (
    <main className="bg-[#171715] text-[#f4f2ec]">
      <StickyShowroomCta />
      <HeroVideo />
      <Intro />
      <WineLayeredImage />
      <CraftedSection />
      <MediaBreak />
      <WineShowroomJourney />
      <ExpandingMedia />
      <WineModelGallery />
      <DesignedWithYou
        title="Enhance any space in your home"
        copy=""
        showTabs={false}
        ctaLabel={null}
        theme="dark"
        sectionClassName="bg-[#111110] pt-24 md:pt-[100px]"
        titleClassName="!text-[2.25rem] md:!text-[2.5rem]"
      />
      <CompleteKitchen />
      <MoreToDiscover />
    </main>
  );
}
