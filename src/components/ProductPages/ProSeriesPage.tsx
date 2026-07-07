"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { DesignedWithYou } from "@/components/Home/DesignedWithYou";

const aemAsset = (id: string, path: string) =>
  `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:${id}/${path}`;

const aemImage = (id: string, file: string, width = 1920) =>
  `${aemAsset(id, `as/${file}`)}&width=${width}&max-quality=90`;

const assets = {
  heroVideo: `${aemAsset(
    "6b8cf15f-e27c-404e-a900-e5769466501b",
    "renditions/original/as/Subzero - Pro - Hero_FINAL.mp4",
  )}#t=0.001`,
  heroPoster: aemImage(
    "ca894942-f38e-4bc3-93f5-272def43fb7f",
    "pro-series-fallback.avif?assetname=pro-series-fallback.png",
    2560,
  ),
  freshnessVideo: `${aemAsset(
    "13aaa092-42bc-4b40-8c72-1c9f68ce07d3",
    "renditions/original/as/Sub_Zero_Landing_Quality.mp4",
  )}#t=8`,
  freshnessPoster: aemImage(
    "3233460d-523c-4423-a2a8-eba17861bd18",
    "Fixed-aspect-ratio-image.avif?assetname=Fixed+aspect+ratio+image.png",
    1440,
  ),
  cauli: aemImage(
    "a112f210-0b61-4f53-a1e2-9465c9b0ecbb",
    "Cauli_1440px.avif?assetname=Cauli_1440px.png",
    1440,
  ),
  stainlessInterior: aemImage(
    "9b1a9eaa-1978-42a7-bc6d-a598d30c384a",
    "SM_SLG_043019_8.avif?assetname=SM_SLG_043019_8.tif",
    1280,
  ),
  airPurification: aemImage(
    "1efb52c4-05ee-4c26-bce1-6bb7684025dd",
    "Sm_TC_031417_5.avif?assetname=Sm_TC_031417_5.tif",
    1280,
  ),
  lighting: aemImage(
    "ca305776-3367-47d4-82b6-6e482be673fd",
    "SZ_PRO4850G_TCS_030724_04.avif?assetname=SZ_PRO4850G_TCS_030724_04.tif",
    1280,
  ),
  hotspotDoor: aemImage(
    "a6ab40a6-b91a-4f31-b9df-3dd36cc02926",
    "pro-hotspot-1.avif?assetname=pro-hotspot+1.png",
    1440,
  ),
  hotspotShelf: aemImage(
    "1bed83d3-b15f-444b-baf1-65178efaf933",
    "MED_TC_121218_4_CMYK.avif?assetname=MED_TC_121218_4_CMYK.tif",
    960,
  ),
  hotspotDrawer: aemImage(
    "07b36b99-19fb-44de-b316-6f2428e4f12f",
    "SM_TC_121218_8.avif?assetname=SM_TC_121218_8.tif",
    960,
  ),
  galleryOne: aemImage(
    "4530a1ed-9858-4c88-a713-0ddead5ef6c9",
    "MED_SLG_043019_14_856.avif?assetname=MED_SLG_043019_14_856.tif",
    1280,
  ),
  galleryTwo: aemImage(
    "0bab6a11-27c0-4209-8b89-0c71b8d1285e",
    "sm_648prog_frg_2014_carousel.avif?assetname=sm_648prog_frg_2014_carousel.jpg",
    1280,
  ),
  galleryThree: aemImage(
    "0ffafa85-a5e1-4f17-b9fa-b4158c8ae577",
    "24-SUBZERO-PRO-IR-S02-NORDIC-CHALET_EST.avif?assetname=24-SUBZERO-PRO-IR-S02-NORDIC-CHALET_EST.tif",
    1280,
  ),
  galleryFour: aemImage(
    "62f35ee7-6588-46b7-99ce-b740f3f0345e",
    "med_tc_121218_4_carousel.avif?assetname=med_tc_121218_4_carousel.jpg",
    1280,
  ),
  galleryFive: aemImage(
    "8dd9140b-a33c-43fe-9a36-02fb2d74e0f4",
    "ICB648PRO_ICBDF606CG_ICBPW602718.avif?assetname=ICB648PRO_ICBDF606CG_ICBPW602718.tif",
    1280,
  ),
  model36Solid: aemImage(
    "742887fc-53b0-4fd5-ace0-aea6b43b0df7",
    "SILO_PRO3650-RH_PIK_120618_SH.avif?assetname=SILO_PRO3650-RH_PIK_120618_SH.png",
    1280,
  ),
  model36Glass: aemImage(
    "60963683-cc5a-44b9-b673-e0ab8cdf2bc3",
    "SUB_SILO_PRO3650G_RH_SS_F_SH.avif?assetname=SUB_SILO_PRO3650G_RH_SS_F_SH.png",
    1280,
  ),
  model48Solid: aemImage(
    "3c8739d6-a976-49f6-9c87-21333b8c9216",
    "SUB_SILO_PRO4850_SS_F_SH.avif?assetname=SUB_SILO_PRO4850_SS_F_SH.png",
    1280,
  ),
  model48Glass: aemImage(
    "dbd43a78-59cf-4029-b72c-12d33ba83fcc",
    "SUB_SILO_PRO4850G_SS_F_SH.avif?assetname=SUB_SILO_PRO4850G_SS_F_SH.png",
    1280,
  ),
  expanding: aemImage(
    "134aceca-524e-4b8a-a854-289c2550de7e",
    "SZWC_PA_0519_4021FC_A_GraCol2006.avif?assetname=SZWC_PA_0519_4021FC_A_GraCol2006.tif",
    1920,
  ),
  showroom: aemImage(
    "8fb0da74-6d9a-442e-9e5a-42564fc05540",
    "SZG_Miami_Showroom_51876.avif?assetname=SZG_Miami_Showroom_51876.jpg",
    1280,
  ),
  moreSubZero: aemImage(
    "45bd0bf4-1368-4015-931d-34c45d46e1e4",
    "SZWC_PA_0342_4021FC_A_GraCol2006.avif?assetname=SZWC_PA_0342_4021FC_A_GraCol2006.jpg",
    1280,
  ),
  whyUs: aemImage(
    "86a9f640-dd9a-4dc2-b2e1-c026a850c307",
    "Sub-Zero-day-1-7995.avif?assetname=Sub-Zero+day+1-7995.jpg",
    1280,
  ),
  designerCompare: aemImage(
    "08d37139-fb2e-4518-9166-dfadb8ed57cc",
    "DET3650R_R_SH.avif?assetname=DET3650R_R_SH.png",
    800,
  ),
  proCompare: aemImage(
    "08979add-b21f-4476-a316-0353f8487da0",
    "SILO_PRO3650-RH_PIK_120618_SH.avif?assetname=SILO_PRO3650-RH_PIK_120618_SH.png",
    800,
  ),
  classicCompare: aemImage(
    "d588e559-ff10-4cd6-a6d6-632c71c0134c",
    "22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_T_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_T_R_SH.png",
    800,
  ),
};

const featureCards = [
  {
    title: "Stainless steel interior",
    copy: "Easy access to food with full-extension slide-out glass shelf with adjustable gates.",
    image: assets.stainlessInterior,
  },
  {
    title: "Air purification",
    copy: "Developed with technology originally designed for NASA to scrub the air of ethylene and odor every 20 minutes.",
    image: assets.airPurification,
  },
  {
    title: "Lighting",
    copy: "Control brightness with soft-on LED lighting that fully illuminates the cavity, making food more visible.",
    image: assets.lighting,
  },
];

const proSeriesDesignCategories = [{
  label: "PRO Series",
  images: [assets.galleryOne, assets.galleryTwo, assets.galleryThree, assets.galleryFour, assets.galleryFive],
}];

const models = [
  {
    title: '36" with Solid Door',
    copy: "PRO refrigerator/freezer with fresh storage above and a spacious bottom freezer.",
    image: assets.model36Solid,
    href: "/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series&default.width=36",
  },
  {
    title: '36" with Glass Door',
    copy: "PRO refrigerator/freezer with glass-front storage above and a spacious bottom freezer.",
    image: assets.model36Glass,
    href: "/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series&default.width=36",
  },
  {
    title: '48" with Solid Door',
    copy: "PRO refrigerator/freezer with fresh storage above and a spacious bottom freezer.",
    image: assets.model48Solid,
    href: "/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series&default.width=48",
  },
  {
    title: '48" with Glass Door',
    copy: "PRO refrigerator/freezer with glass-front storage above and a spacious bottom freezer.",
    image: assets.model48Glass,
    href: "/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series&default.width=48",
  },
];

const comparisons = [
  {
    title: "PRO Series",
    image: assets.proCompare,
    copy: "Professional-grade quality in a striking form with stainless steel inside and out.",
    active: true,
    href: "/refrigeration/pro-series",
    modelsHref: "/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series",
    finish: ["Stainless Steel"],
    width: ['36"', '48"'],
    models: ["Side-by-Side", "Over-and-Under"],
    personalization: "Stainless steel or glass door models",
  },
  {
    title: "Designer Series",
    image: assets.designerCompare,
    copy: "Built to accept custom panels and blend seamlessly into your unique kitchen design.",
    href: "/refrigeration/designer-series",
    modelsHref:
      "/refrigeration/view-all-refrigeration?default.mnseries=Designer+Series+Refrigeration",
    finish: ["Panel Ready", "Stainless Steel (Optional)"],
    width: ['18"', '24"', '30"', '36"'],
    models: ["Over-and-Under", "Column", "Wine Storage", "Undercounter"],
    personalization: "Fully integrated panel-ready design for a custom look that blends into cabinetry",
  },
  {
    title: "Classic Series",
    image: assets.classicCompare,
    copy: "Features the iconic Sub-Zero grille for a timeless look that suits any aesthetic.",
    href: "/refrigeration/classic-series",
    modelsHref:
      "/refrigeration/view-all-refrigeration?default.mnseries=Classic+Series+Refrigeration",
    finish: ["Stainless Steel", "Panel Ready"],
    width: ['30"', '36"', '42"', '48"'],
    models: ["Side-by-Side", "Over-and-Under", "French Door", "Column", "Wine Storage"],
    personalization:
      "Stainless-steel exterior and tubular or pro handles to match other Sub-Zero, Wolf, and Cove products",
  },
];

function VideoButton({ isPaused, progress }: { isPaused: boolean; progress: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg className="h-[52px] w-[52px]" viewBox="0 0 52 52" fill="none" aria-hidden="true">
      <circle cx="26" cy="26" r="18.5" fill="rgba(36,35,32,0.72)" />
      <circle cx="26" cy="26" r={radius} stroke="rgba(255,255,255,0.48)" strokeWidth="2" />
      <circle
        cx="26"
        cy="26"
        r={radius}
        stroke="rgba(255,255,255,0.98)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: dashOffset,
          transform: "rotate(-90deg)",
          transformOrigin: "26px 26px",
        }}
      />
      {isPaused ? (
        <path d="M22 17.5L35 26L22 34.5V17.5Z" fill="currentColor" />
      ) : (
        <>
          <rect x="21.5" y="17" width="3" height="18" fill="currentColor" rx="1.5" />
          <rect x="28.5" y="17" width="3" height="18" fill="currentColor" rx="1.5" />
        </>
      )}
    </svg>
  );
}

function VideoFrame({
  src,
  poster,
  label,
  startAt = 0,
  className = "",
  frameStyle,
  videoClassName = "",
  videoStyle,
}: {
  src: string;
  poster?: string;
  label: string;
  startAt?: number;
  className?: string;
  frameStyle?: CSSProperties;
  videoClassName?: string;
  videoStyle?: CSSProperties;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const didSetStartTimeRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    didSetStartTimeRef.current = false;
  }, [src, startAt]);

  const applyStartTime = () => {
    const video = videoRef.current;
    if (!video || didSetStartTimeRef.current || startAt <= 0) return;
    didSetStartTimeRef.current = true;
    try {
      video.currentTime = startAt;
    } catch {
      // Some browsers block currentTime before enough metadata is ready.
    }
  };

  const syncVideoState = () => {
    const video = videoRef.current;
    if (!video) return;
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    setIsPaused(video.paused);
    setProgress(duration ? video.currentTime / duration : 0);
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
    syncVideoState();
  };

  return (
    <div
      ref={frameRef}
      className={`overflow-hidden bg-[#171715] ${className}`}
      style={{
        position: "relative",
        ...frameStyle,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className={`h-full w-full object-cover object-[52%_50%] ${videoClassName}`}
        style={{
          display: "block",
          height: "100%",
          objectFit: "cover",
          width: "100%",
          ...videoStyle,
        }}
        onLoadedMetadata={() => {
          applyStartTime();
          syncVideoState();
        }}
        onCanPlay={applyStartTime}
        onTimeUpdate={syncVideoState}
        onPlay={syncVideoState}
        onPause={syncVideoState}
      />
      <button
        type="button"
        data-video-control="pro-series"
        className="absolute bottom-7 right-7 grid h-[58px] w-[58px] place-items-center rounded-full bg-black/25 text-white shadow-[0_3px_16px_rgba(0,0,0,0.36)] outline-none transition hover:bg-black/35 focus-visible:ring-2 focus-visible:ring-white"
        style={{
          display: "grid",
          opacity: 1,
          pointerEvents: "auto",
          visibility: "visible",
          zIndex: 300,
        }}
        aria-label={isPaused ? "Play" : "Pause"}
        aria-pressed={!isPaused}
        onClick={toggleVideo}
      >
        <VideoButton isPaused={isPaused} progress={progress} />
        <span className="sr-only">Video</span>
      </button>
    </div>
  );
}

function HeroVideo() {
  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#171715]">
      <VideoFrame
        src={assets.heroVideo}
        poster={assets.heroPoster}
        label="Sub-Zero PRO Series stainless steel refrigeration in a professional kitchen"
        startAt={0.001}
        className="h-full w-full"
        frameStyle={{ inset: 0, position: "absolute" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/58 via-black/18 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/45 via-black/12 to-transparent" />
    </section>
  );
}

function SubZeroSnowflakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 26 24" fill="none" aria-hidden="true">
      <path
        d="M25.3118 10.9216H20.5082L23.3528 6.00573H17.677L20.0788 1.85336L18.2003 0.768383L15.7985 4.92076L12.9539 0.00488281L10.1093 4.92076L7.70747 0.768383L5.82895 1.85336L8.23077 6.00573H2.55497L5.39958 10.9216H0.595947V13.0916H5.39958L2.55497 17.994H8.23077L5.82895 22.1464L7.70747 23.2314L10.1093 19.079L12.9539 23.9949L15.7985 19.079L18.2003 23.2314L20.0788 22.1464L17.677 17.994H23.3528L20.5082 13.0916H25.3118V10.9216ZM9.49206 15.8241H6.33883L7.90874 13.1049H11.062L9.49206 15.8241ZM7.92215 10.9216L6.35225 8.20247H9.49206L11.062 10.9216H7.92215ZM12.9539 19.6282L11.384 16.9091L12.9539 14.1899L14.5238 16.9091L12.9539 19.6282ZM12.9539 9.83663L11.384 7.1175L12.9539 4.39836L14.5238 7.1175L12.9539 9.83663ZM16.4023 15.8241L14.8324 13.1049H17.9856L19.5555 15.8241H16.4023ZM17.9856 10.9216H14.8324L16.4023 8.20247H19.5555L17.9856 10.9216Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IntroBlock() {
  return (
    <section
      data-pro-intro
      className="bg-[#171715] px-6 pb-10 pt-14 text-white md:px-12 md:pb-14 md:pt-16"
      aria-labelledby="pro-series"
    >
      <div className="mx-auto flex max-w-[990px] flex-col items-center text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em]">Sub-Zero</p>
        <h1 id="pro-series" className="mt-5 font-serif text-[clamp(2.8rem,4.7vw,4.9rem)] leading-[0.98]">
          PRO Series
        </h1>
        <p className="mt-6 max-w-[900px] text-[0.96rem] font-light leading-snug md:text-[1.02rem]">
          For those who live to cook, PRO Series preserves the finest ingredients longer. With
          stainless steel inside and out, every PRO model is equipped with features like dual
          refrigeration and advanced air purification for restaurant-quality results at every meal.
        </p>
        <Link
          href="/showroom"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#fbfaf6] px-9 text-sm font-bold text-[#171715] transition hover:bg-white"
        >
          Experience in a showroom
        </Link>
        <div className="mt-8 flex flex-col items-center text-[#0081c6]" aria-hidden="true">
          <span className="h-40 w-px bg-[#0081c6]" />
          <SubZeroSnowflakeIcon className="mt-7 h-6 w-7 text-[#0081c6]" />
        </div>
      </div>
    </section>
  );
}

function StickyShowroomCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const intro = document.querySelector<HTMLElement>("[data-pro-intro]");
      if (!intro) return;
      const introTop = intro.getBoundingClientRect().top + window.scrollY;
      setVisible(window.scrollY >= introTop - 12);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <Link
      href="/showroom"
      className={`fixed bottom-6 left-1/2 z-[90] inline-flex -translate-x-1/2 items-center justify-center rounded-full transition-[opacity,transform] duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{
        backgroundColor: "#18181799",
        boxSizing: "border-box",
        color: "#FBF9F5",
        fontFamily: '"Museo Sans", museo-sans, Arial, Helvetica, sans-serif',
        fontSize: "14px",
        fontWeight: 700,
        height: "37px",
        letterSpacing: "0",
        lineHeight: "17px",
        padding: "10px 16px",
        whiteSpace: "nowrap",
        width: "144.02px",
      }}
    >
      Visit a showroom
    </Link>
  );
}

function ParallaxMedia() {
  return (
    <section className="overflow-hidden bg-[#171715] px-6 pb-0 pt-6 text-white md:px-12 md:pt-8">
      <div className="mx-auto grid max-w-[1410px] gap-3 md:grid-cols-2 md:gap-4">
        <div className="relative aspect-[0.8] overflow-hidden bg-[#171715]">
          <VideoFrame
            src={assets.freshnessVideo}
            label="Sub-Zero preservation detail film"
            startAt={8}
            className="h-full w-full"
            videoStyle={{
              objectPosition: "50% 48%",
              transform: "scale(1.03)",
              transformOrigin: "50% 50%",
            }}
          />
        </div>
        <div className="relative aspect-[0.8] overflow-hidden bg-[#d7d0c4]">
          <Image
            src={assets.freshnessPoster}
            alt="Close-up of stainless steel hinge and handle on Sub-Zero refrigerator door"
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function FreshnessFeature() {
  return (
    <section className="bg-[#171715] px-6 pb-24 pt-20 text-white md:flex md:min-h-[900px] md:items-center md:px-12 md:py-24">
      <div className="mx-auto grid w-full max-w-[1420px] items-center gap-10 md:grid-cols-[0.95fr_1fr] md:gap-14 lg:gap-20">
        <h2 className="font-serif text-[clamp(4rem,7.6vw,8.25rem)] leading-[0.95]">
          The art of
          <br />
          freshness
        </h2>
        <div className="relative aspect-square w-full max-w-[720px] justify-self-center overflow-hidden bg-[#171715]">
          <Image
            src={assets.cauli}
            alt="Assorted colorful cauliflower varieties in a blue colander"
            fill
            sizes="(min-width: 1280px) 720px, (min-width: 768px) 48vw, 90vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCards() {
  const [firstFeature, ...restFeatures] = featureCards;

  return (
    <section className="bg-[#171715] px-6 pb-20 pt-4 text-white md:px-12 md:pb-28 md:pt-0">
      <div className="mx-auto max-w-[1440px]">
        <article className="grid items-center gap-8 md:grid-cols-[minmax(0,820px)_minmax(320px,460px)] md:gap-16 lg:gap-20">
          <div className="relative aspect-[1.155] overflow-hidden bg-[#232320]">
            <Image
              src={firstFeature.image}
              alt={firstFeature.title}
              fill
              sizes="(min-width: 1280px) 820px, (min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center md:pb-4">
            <h3 className="font-serif text-[2rem] leading-[1.08] md:text-[2.5rem] lg:text-[2.65rem]">
              {firstFeature.title}
            </h3>
            <p className="mt-7 max-w-[410px] text-[1rem] leading-[1.45] text-white md:text-[1.08rem]">
              {firstFeature.copy}
            </p>
            <Link
              href="/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series"
              className="mt-6 w-fit text-[0.95rem] font-normal leading-none text-white underline underline-offset-4 transition hover:text-white/75"
            >
              Explore products
            </Link>
          </div>
        </article>

        <div className="mt-16 space-y-16 md:mt-16 md:space-y-20">
          {restFeatures.map((feature, index) => (
            <article
              key={feature.title}
              className={`grid items-center gap-8 md:gap-16 lg:gap-20 ${
                index % 2 === 0
                  ? "md:grid-cols-[minmax(320px,440px)_minmax(0,820px)] md:[&>div:first-child]:order-2"
                  : "md:grid-cols-[minmax(0,820px)_minmax(320px,440px)]"
              }`}
            >
              <div
                className={`relative overflow-hidden bg-[#232320] ${
                  index % 2 === 1 ? "aspect-[1.155]" : "aspect-[1.36]"
                }`}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(min-width: 1280px) 820px, (min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-serif text-[1.85rem] leading-[1.08] md:text-[2.25rem] lg:text-[2.45rem]">
                  {feature.title}
                </h3>
                <p className="mt-5 max-w-[360px] text-[0.95rem] leading-[1.45] text-white md:text-[1rem]">
                  {feature.copy}
                </p>
                <Link
                  href="/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series"
                  className="mt-6 w-fit text-[0.92rem] font-normal leading-none text-white underline underline-offset-4 transition hover:text-white/75"
                >
                  Explore products
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HotspotFeature() {
  const hotspots = [
    {
      title: "Stainless steel or glass door",
      copy: "Locks in temperature and humidity with a soft-close door hinge and magnetic seal on doors and drawers.",
      image: assets.hotspotShelf,
      position: "left-[69%] top-[50%]",
      defaultOpen: true,
    },
    {
      title: "Pull-out shelf",
      copy: "The bottom shelf slides out for easy access to condiments and other items commonly stored on door shelves.",
      image: assets.hotspotDrawer,
      position: "left-[22%] top-[77%]",
      defaultOpen: false,
    },
  ];

  return (
    <section className="bg-[#171715] px-0 py-0 text-[#171715]">
      <div className="mx-auto max-w-none">
        <div className="relative overflow-hidden bg-[#d7d0c4]">
          <div className="relative h-[620px] md:h-[calc(100svh-124px)] md:min-h-[760px] md:max-h-[860px]">
            <Image
              src={assets.hotspotDoor}
              alt="Sub-Zero stainless steel built-in refrigerator with glass door open"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            {hotspots.map((item) => (
              <details
                key={item.title}
                open={item.defaultOpen}
                className={`group absolute hidden w-[310px] -translate-x-1/2 rounded-[2px] bg-[#f4f2ec] text-[#171715] shadow-[0_18px_45px_rgba(0,0,0,0.18)] open:min-h-[180px] open:w-[326px] open:bg-[#1f1e1c] open:text-white md:block ${item.position}`}
              >
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center gap-3 px-4 py-3 text-sm font-bold group-open:items-start group-open:justify-between group-open:px-5 group-open:py-5 group-open:font-serif group-open:text-[1.6rem] group-open:font-normal group-open:leading-[1.08] [&::-webkit-details-marker]:hidden">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#171715] text-lg leading-none text-white group-open:hidden">
                    +
                  </span>
                  <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-full border border-white/45 bg-transparent text-lg leading-none text-white group-open:grid">
                    -
                  </span>
                  <span className="group-open:order-first group-open:max-w-[210px]">{item.title}</span>
                </summary>
                <div className="hidden px-4 pb-4">
                  <p className="text-sm leading-snug text-white/82">{item.copy}</p>
                  <div className="relative mt-4 aspect-[1.35] overflow-hidden bg-[#d7d0c4]">
                    <Image src={item.image} alt={item.title} fill sizes="310px" className="object-cover" />
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:hidden">
          {[
            {
              title: "Stainless steel or glass door",
              copy: "Locks in temperature and humidity with a soft-close door hinge and magnetic seal on doors and drawers.",
              image: assets.hotspotShelf,
            },
            {
              title: "Pull-out shelf",
              copy: "The bottom shelf slides out for easy access to condiments and other items commonly stored on door shelves.",
              image: assets.hotspotDrawer,
            },
          ].map((item) => (
            <article key={item.title} className="bg-[#fbfaf6] p-4">
              <h3 className="font-serif text-[1.65rem] leading-tight">{item.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-snug">{item.copy}</p>
              <div className="relative mt-4 aspect-[1.35] overflow-hidden bg-[#d7d0c4]">
                <Image src={item.image} alt={item.title} fill sizes="100vw" className="object-cover" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowroomCta() {
  return (
    <section className="bg-[#171715] px-5 py-16 text-[#171715] md:px-8 md:py-20">
      <div className="mx-auto grid max-w-[1120px] items-center gap-8 bg-[#fbfaf6] px-6 py-6 shadow-sm md:grid-cols-[426px_minmax(0,1fr)] md:gap-[104px]">
        <div className="relative aspect-[0.995] overflow-hidden">
          <Image
            src={assets.showroom}
            alt="Showroom consultation with Sub-Zero and Wolf appliances"
            fill
            sizes="(min-width: 768px) 426px, calc(100vw - 88px)"
            className="object-cover"
          />
        </div>
        <div className="max-w-none">
          <h2 className="font-serif text-[clamp(2.5rem,3.25vw,3.9rem)] leading-[1.04]">
            Start your journey
            {" "}
            <br />
            in a showroom
          </h2>
          <p className="mt-7 max-w-[420px] text-[1.02rem] leading-[1.35]">
            Our showrooms are where inspiration turns into informed decisions. Learn how a visit
            helps you plan, compare, and move forward with confidence.
          </p>
          <Link
            href="/showroom"
            className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-[#171715] px-8 text-sm font-bold text-white transition hover:bg-[#34322e]"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}

function ModelGallery() {
  const [active, setActive] = useState(0);
  const [visibleModelIndex, setVisibleModelIndex] = useState(0);
  const [descriptionVisible, setDescriptionVisible] = useState(true);
  const descriptionTimerRef = useRef<number | null>(null);
  const visibleModel = models[visibleModelIndex];

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
    <section className="overflow-hidden bg-[#171715] px-4 pb-16 pt-20 text-white md:px-8 md:pb-24 md:pt-[74px]">
      <div className="mx-auto max-w-[1392px]">
        <div className="grid min-h-[268px] gap-8 lg:grid-cols-[minmax(0,760px)_auto] lg:items-center lg:justify-between">
          <div>
            <h2 className="max-w-[760px] font-serif text-[2.85rem] leading-[1.06] md:text-[3.35rem] lg:text-[3.75rem]">
              For kitchens that mean business
            </h2>
            <p className="mt-6 max-w-[570px] text-[0.9rem] leading-[1.46] text-white/78 md:text-[0.96rem]">
              See how the PRO Series blends enduring performance with bold design. Choose from
              options designed for a kitchen that is practical, purposeful, and professionally inspired.
            </p>
          </div>
          <Link
            href="/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/70 px-8 text-[0.9rem] font-bold text-white transition hover:bg-white hover:text-[#171715] lg:mt-20"
          >
            See all PRO Series Refrigeration
          </Link>
        </div>
      </div>
      <div className="relative left-1/2 mt-6 min-h-[700px] w-screen -translate-x-1/2 md:mt-10 lg:min-h-[720px]">
        <div className="absolute left-1/2 top-0 h-[500px] w-[330px] -translate-x-1/2 sm:h-[540px] sm:w-[380px] lg:h-[560px] lg:w-[430px]">
          {models.map((model, index) => {
            const offset = index - active;
            const wrappedOffset =
              offset > models.length / 2
                ? offset - models.length
                : offset < -models.length / 2
                  ? offset + models.length
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
                  alt={model.title}
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
            <p className="mt-4 text-[1rem] leading-[1.25] text-white/78">{visibleModel.copy}</p>
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
            {models.map((model, index) => (
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

function ExpandingImage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [zoomProgress, setZoomProgress] = useState(0);

  useEffect(() => {
    const updateZoomProgress = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      setZoomProgress(Math.min(1, Math.max(0, (window.innerHeight * 0.55 - rect.top) / travel)));
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
      className="section expanding-media-container h-[155svh] bg-[#171715]"
      data-section-status="loaded"
      data-brand="sub-zero"
      role="region"
    >
      <div className="expanding-media-wrapper sticky top-0">
        <div className="expanding-media block relative" data-block-name="expanding-media" data-block-status="loaded">
          <div className="tension-zoom tension-zoom--active relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#171715]">
            <div
              className="media-item-wrapper expanding-media-media-element relative h-full w-full"
              data-aem-asset-id="134aceca-524e-4b8a-a854-289c2550de7e"
            >
              <Image
                src={assets.expanding}
                alt="Sub-Zero stainless steel refrigerator with open door showing organized shelves of food in a modern kitchen setting with floral wallpaper and marble countertops"
                fill
                sizes="100vw"
                className="frame object-cover will-change-transform"
                style={{ transform: `scale(${imageScale})` }}
              />
            </div>
            <div className="tension-zoom-border tension-zoom-block tension-zoom-top pointer-events-none absolute left-0 top-0 w-full bg-[#171715]" style={{ height: borderSize }} />
            <div className="tension-zoom-border tension-zoom-inline tension-zoom-right pointer-events-none absolute right-0 top-0 h-full bg-[#171715]" style={{ width: borderSize }} />
            <div className="tension-zoom-border tension-zoom-block tension-zoom-bottom pointer-events-none absolute bottom-0 left-0 w-full bg-[#171715]" style={{ height: borderSize }} />
            <div className="tension-zoom-border tension-zoom-inline tension-zoom-left pointer-events-none absolute left-0 top-0 h-full bg-[#171715]" style={{ width: borderSize }} />
            <div className="trigger-line pointer-events-none absolute top-[55%] w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareSeries() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-20 pt-16 text-[#171715] md:px-12 md:pb-24 md:pt-[72px]">
      <div className="mx-auto max-w-[1340px]">
        <h2 className="text-center font-serif text-[clamp(3rem,3.1vw,3.75rem)] leading-[1.08]">Explore more Sub-Zero</h2>
        <div className="mt-[47px] grid gap-8 lg:grid-cols-3">
          {comparisons.map((item) => (
            <article key={item.title} className={`px-5 pb-8 pt-7 text-center transition ${item.active ? "bg-[#ece8dd]" : "hover:bg-[#ece8dd]"}`}>
              <div className="relative mx-auto h-[210px] w-full max-w-[260px]">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 300px, 100vw" className="object-contain" />
              </div>
              <h3 className="mt-7 font-serif text-[2.35rem] leading-tight">{item.title}</h3>
              <p className="mx-auto mt-3 min-h-[54px] max-w-[330px] text-sm leading-snug">{item.copy}</p>
              <div className="mt-5 flex min-h-10 flex-wrap items-center justify-center gap-3">
                <Link href={item.modelsHref} className="inline-flex min-h-9 items-center justify-center rounded-full bg-[#171715] px-5 text-[0.78rem] font-bold text-white">
                  View models
                </Link>
                {item.active ? (
                  <span className="text-[0.72rem]">Currently Viewing</span>
                ) : (
                  <Link href={item.href} className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#171715] px-5 text-[0.78rem] font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white">
                    Learn more
                  </Link>
                )}
              </div>
              <dl className="mt-7 border-t border-[#8a8578] text-left text-sm">
                <div className="grid gap-3 border-b border-[#8a8578] py-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.26em]">Finish</dt>
                  <dd className="space-y-1">
                    {item.finish.map((finish) => (
                      <div key={finish} className="flex items-start gap-2">
                        <span
                          className={`mt-[0.2rem] h-3 w-3 rounded-full ${
                            finish.toLowerCase().includes("panel")
                              ? "bg-[#2d2c29]"
                              : "bg-[radial-gradient(circle_at_30%_30%,#f5f5f3,#8f8d88)]"
                          }`}
                          aria-hidden="true"
                        />
                        <span>{finish}</span>
                      </div>
                    ))}
                  </dd>
                </div>
                {[
                  ["Width", item.width],
                  ["Models", item.models],
                ].map(([label, values]) => (
                  <div key={label as string} className="grid gap-3 border-b border-[#8a8578] py-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4">
                    <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.26em]">{label as string}</dt>
                    <dd className="space-y-1">
                      {(values as string[]).map((value) => (
                        <Link key={value} href={item.modelsHref} className="block w-fit underline underline-offset-2">
                          {value}
                        </Link>
                      ))}
                    </dd>
                  </div>
                ))}
                <div className="grid gap-3 py-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.26em]">Personalization</dt>
                  <dd className="leading-snug">{item.personalization}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreToDiscover() {
  return (
    <section className="bg-[#ebe8df] px-6 py-20 text-[#171715] md:px-12 md:py-24">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="font-serif text-[clamp(3rem,3.6vw,4rem)] leading-tight">More to discover</h2>
        <div className="mt-10 grid gap-3 lg:grid-cols-2">
          {[
            {
              title: "Sub-Zero overview",
              copy: "Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies.",
              cta: "Learn about Sub-Zero",
              href: "/refrigeration/discover-sub-zero",
              image: assets.moreSubZero,
            },
            {
              title: "Why Sub-Zero, Wolf, and Cove?",
              copy: "Delve into why designers trust Sub-Zero, Wolf, and Cove to help craft the world's finest kitchens.",
              cta: "Learn about us",
              href: "/our-story",
              image: assets.whyUs,
            },
          ].map((item) => (
            <article key={item.title} className="bg-[#fbfaf6]">
              <div className="relative aspect-[1.6] overflow-hidden">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 696px, 100vw" className="object-cover" />
              </div>
              <div className="grid gap-8 p-6 md:min-h-[174px] md:grid-cols-[0.95fr_1fr] md:p-6">
                <div className="flex flex-col justify-between gap-7">
                  <h3 className="font-serif text-[clamp(2.2rem,2.35vw,3rem)] leading-[1.02]">{item.title}</h3>
                  <Link href={item.href} className="inline-flex min-h-12 w-fit items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold transition hover:bg-[#171715] hover:text-white">
                    {item.cta}
                  </Link>
                </div>
                <p className="max-w-[360px] text-[0.98rem] leading-snug md:pt-1">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProSeriesPage() {
  return (
    <main className="overflow-x-hidden bg-[#f4f2ec] text-[#171715]">
      <StickyShowroomCta />
      <HeroVideo />
      <IntroBlock />
      <ParallaxMedia />
      <FreshnessFeature />
      <FeatureCards />
      <HotspotFeature />
      <DesignedWithYou
        categories={proSeriesDesignCategories}
        title="Discover how the PRO Series' striking design fits seamlessly across different aesthetics and styles"
        copy=""
        ctaLabel="See more inspiration"
        ctaHref="/inspiration"
        showTabs={false}
        theme="dark"
        previewImageClassName="object-left"
      />
      <ShowroomCta />
      <ModelGallery />
      <ExpandingImage />
      <CompareSeries />
      <MoreToDiscover />
    </main>
  );
}
