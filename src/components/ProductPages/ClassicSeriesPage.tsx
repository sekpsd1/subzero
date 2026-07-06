"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DesignedWithYou } from "@/components/Home/DesignedWithYou";

const aem = (id: string, file: string, width = 1920) =>
  `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:${id}/as/${file}&width=${width}&max-quality=90`;

const assets = {
  heroVideo:
    "/assets/subzero/refrigeration-classic-series/Subzero-Classic-Hero-1280-Optimized.mp4#t=0.001",
  heroPoster: aem(
    "fa1b0993-7a82-4a9e-a023-c3e7f48214f9",
    "classic-series-fallback.avif?assetname=classic-series-fallback.png",
    2560,
  ),
  grille: aem(
    "41015403-2960-4982-9a0a-20d041965ebe",
    "SM_TCSLG_111621_Grill.avif?assetname=SM_TCSLG_111621_Grill.jpg",
  ),
  hotspot: aem(
    "0de7fdc9-6bda-4254-a894-292154375fa5",
    "classic-hotspot.avif?assetname=classic-hotspot.png",
    1280,
  ),
  splitClimateVideo:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:09a4c6ac-6f72-4860-95d1-f6dc932854f1/renditions/original/as/220025_SplitClimate.mp4#t=0.001",
  clearSightVideo:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:325629db-cbf9-419f-b580-0bd8b7c1214b/renditions/original/as/220025_ClearSight.mp4#t=0.001",
  purifier: aem(
    "18bf0383-28c5-4d4b-b36a-f84f218b7f7b",
    "SZ_CL4850UFD_S_T_SILO_19.avif?assetname=SZ_CL4850UFD_S_T_SILO_19.jpg",
  ),
  touchPanel: aem(
    "cb476705-2ddf-4cb6-a277-3f854648002c",
    "SZ_CL4850UFDID_S_P_SILO_29.avif?assetname=SZ_CL4850UFDID_S_P_SILO_29.jpg",
    1920,
  ),
  nightModeVideo:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:ab893736-db7d-46ba-892d-bfae770d9ca3/renditions/original/as/220025_NightMode.mp4#t=0.001",
  stainlessClassicVideo:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:63e40690-13cd-4103-a870-1b035f73380b/renditions/original/as/stainless-classic.mp4#t=0.001",
  featureOne: aem(
    "00f9a816-4ceb-4ee3-b77d-106d6756133e",
    "SM_GreenBold_SLGTC_022723_3-V2.avif?assetname=SM_GreenBold_SLGTC_022723_3-V2.jpg",
    1440,
  ),
  featureTwo: aem(
    "84041798-e013-4f3e-9709-06d85d40c0f9",
    "SZ_CL4850UFD_S_T_SILO_40.avif?assetname=SZ_CL4850UFD_S_T_SILO_40.jpg",
    1440,
  ),
  featureThree: aem(
    "036fe5c0-f958-4f9d-a3c4-f80458ae310a",
    "SZ_CL4850UFDID_S_P_SILO_30.avif?assetname=SZ_CL4850UFDID_S_P_SILO_30.jpg",
    1440,
  ),
  featureFour: aem(
    "20641757-a244-43dd-963e-db0e85a3d2c4",
    "Sub_Zero_Euro_Refer_Opened_Propped.avif?assetname=Sub_Zero_Euro_Refer_Opened_Propped.jpg",
    1440,
  ),
  showroom: aem(
    "6126f941-959f-4f99-a139-339156f3e015",
    "SZG_Ohio_Showroom_0496_R_hires_CMYK0.avif?assetname=SZG_Ohio_Showroom_0496_R_hires_CMYK0.tif",
    1280,
  ),
  galleryTraditional: aem(
    "d3ff6837-d965-49d9-9a57-67bcdb6e3ddd",
    "SubZero-Wolf-BB-024.avif?assetname=SubZero-Wolf-BB-024.png",
    1280,
  ),
  galleryTransitional: aem(
    "6acfd733-88de-4c17-9774-33e4b586e700",
    "W_SPO2450TE_S_T_Overall.avif?assetname=W_SPO2450TE_S_T_Overall.tif",
    1280,
  ),
  galleryContemporary: aem(
    "00441eeb-6f0b-4445-97f6-57c2b373fa3b",
    "SubZero-Wolf-AZ.avif?assetname=SubZero+Wolf+AZ.png",
    1280,
  ),
  expanding: aem(
    "e8892ec9-24c4-42de-afde-dcbe37051e76",
    "SZWC_Seattle_0517_4021FC_B_ADOBERGB.avif?assetname=SZWC_Seattle_0517_4021FC_B_ADOBERGB.tif",
  ),
  column: aem(
    "0874947b-b523-488c-8f42-4ae36441d07e",
    "22-SUBZ-BI-CLASSIC-SILOS_COLUMNS_CL3650F_S_P_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_COLUMNS_CL3650F_S_P_R_SH.png",
    1280,
  ),
  frenchDoor: aem(
    "08c9cf5e-239e-45e8-b4c4-57f6bb518c1d",
    "22-SUBZ-BI-CLASSIC-SILOS_FRENCH-DOOR_CL4250UFD_S_P_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_FRENCH-DOOR_CL4250UFD_S_P_SH.png",
    1280,
  ),
  overUnder: aem(
    "3eb82e9a-e475-4f10-9d0e-9e93e69ca45f",
    "22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_P_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_P_R_SH.png",
    1280,
  ),
  sideBySide: aem(
    "8e08acb6-c5f6-4f1f-909d-2029ff4cac77",
    "22-SUBZ-BI-CLASSIC-SILOS_SIDE-BY-SIDE_CL4850S_S_P_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_SIDE-BY-SIDE_CL4850S_S_P_SH.png",
    1280,
  ),
  wine: aem(
    "cb8b7cce-7af9-47d4-b4f9-e7607b5f4e7a",
    "22-SUBZ-BI-CLASSIC-SILOS_WINE_CL3050W_S_T_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_WINE_CL3050W_S_T_R_SH.png",
    1280,
  ),
  designer: aem("08d37139-fb2e-4518-9166-dfadb8ed57cc", "DET3650R_R_SH.avif?assetname=DET3650R_R_SH.png", 800),
  pro: aem(
    "ec0c2afa-8c7a-4c70-80ff-476ee5f380e0",
    "SILO_PRO3650-RH_PIK_120618_SH.avif?assetname=SILO_PRO3650-RH_PIK_120618_SH.png",
    800,
  ),
  overview: aem(
    "33766109-c472-4795-9491-701618c42023",
    "sz-designer-media-break.avif?assetname=sz-designer-media-break.png",
    800,
  ),
  wolf: aem(
    "0b25fcce-e900-446e-aad3-a02309cbca8a",
    "SZWC_Seattle_1359_4021FC_A_ADOBERGB.avif?assetname=SZWC_Seattle_1359_4021FC_A_ADOBERGB.tif",
    800,
  ),
};

const featureCards = [
  {
    title: "Split Climate",
    suffix: "Intelligent Cooling System",
    copy: "Revolutionizes Sub-Zero's already-superior preservation capabilities, keeping food even fresher for longer.",
    media: assets.splitClimateVideo,
    type: "video",
    position: "left-[64%] top-[18%]",
  },
  {
    title: "ClearSight",
    suffix: "LED lighting",
    copy: "Fully lights the interior, minimizing shadows with overhead, shelf, and drawer illumination.",
    media: assets.clearSightVideo,
    type: "video",
    position: "left-[22%] top-[45%]",
  },
  {
    title: "Air purification",
    suffix: "",
    copy: "Developed with technology originally designed for NASA to scrub the air of ethylene and odor every 20 minutes.",
    media: assets.purifier,
    type: "image",
    position: "left-[71%] top-[65%]",
  },
];

const fadingMediaItems = [
  {
    title: "Touch control panel",
    copy: "Provides effortless access to customizable settings such as temperature, air quality, ice maker, and more with a simple tap - keeping everything at your fingertips.",
    media: assets.touchPanel,
    type: "image",
    alt: "Refrigerator drawers with leafy greens",
    href: "/refrigeration/view-all-refrigeration",
    mediaFirst: true,
  },
  {
    title: "Night mode",
    copy: "Optimizes the interior lighting based on the detected ambient light, reducing the brightness by 90% in dim environments for easier snacking at night.",
    media: assets.nightModeVideo,
    type: "video",
    alt: "Night mode demonstration inside Sub-Zero refrigerator",
    href: "/refrigeration/view-all-refrigeration?default.mnseries=Classic+Series+Refrigeration",
    mediaFirst: false,
  },
  {
    title: "Stainless accents",
    copy: "Complements the exterior's sophistication and creates a consistent feel throughout your kitchen.",
    media: assets.stainlessClassicVideo,
    type: "video",
    alt: "Stainless accents on Classic Series refrigeration",
    href: "/refrigeration/view-all-refrigeration?default.mnseries=Classic+Series+Refrigeration",
    mediaFirst: true,
  },
];

const classicSeriesDesignImages = [
  "/assets/subzero/refrigeration-classic-series/classic-series-gallery-1.avif",
  "/assets/subzero/refrigeration-classic-series/classic-series-gallery-2.avif",
  "/assets/subzero/refrigeration-classic-series/classic-series-gallery-3.avif",
  "/assets/subzero/refrigeration-classic-series/classic-series-gallery-4.avif",
];

const classicSeriesDesignCaptions = [
  {
    title: "Panel ready",
    copy: "Seamlessly accepts custom panels to integrate perfectly with cabinetry.",
  },
  {
    title: "Flip-up dairy compartment",
    copy: "Enables storage of taller bottles on the shelf below.",
  },
  {
    title: "Nano-coated glass",
    copy: "Spill-proof shelves treated with a special finish make cleanup simple.",
  },
  {
    title: "Maximum flexibility",
    copy: "Adjustable shelves and door bins easily adapt to fit items of varying shapes and sizes.",
  },
];

const classicSeriesDesignCategories = [
  {
    label: "Transitional",
    images: classicSeriesDesignImages,
    captions: classicSeriesDesignCaptions,
  },
  {
    label: "Traditional",
    images: [
      classicSeriesDesignImages[1],
      classicSeriesDesignImages[2],
      classicSeriesDesignImages[3],
      classicSeriesDesignImages[0],
    ],
    captions: [
      classicSeriesDesignCaptions[1],
      classicSeriesDesignCaptions[2],
      classicSeriesDesignCaptions[3],
      classicSeriesDesignCaptions[0],
    ],
  },
  {
    label: "Contemporary",
    images: [
      classicSeriesDesignImages[2],
      classicSeriesDesignImages[3],
      classicSeriesDesignImages[0],
      classicSeriesDesignImages[1],
    ],
    captions: [
      classicSeriesDesignCaptions[2],
      classicSeriesDesignCaptions[3],
      classicSeriesDesignCaptions[0],
      classicSeriesDesignCaptions[1],
    ],
  },
];

const aestheticGalleries = [
  {
    tab: "Traditional",
    images: [assets.galleryTraditional, assets.galleryTransitional, assets.galleryContemporary],
  },
  {
    tab: "Transitional",
    images: [assets.galleryTransitional, assets.galleryContemporary, assets.galleryTraditional],
  },
  {
    tab: "Contemporary",
    images: [assets.galleryContemporary, assets.galleryTraditional, assets.galleryTransitional],
  },
];

const models = [
  {
    title: "Column",
    copy: "Sleek, built-in all-refrigerator or all-freezer column units offering advanced food preservation with flexible, high-capacity storage.",
    image: assets.column,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fcolumn-refrigeration&default.mnseries=Classic+Series+Refrigeration",
  },
  {
    title: "French Door",
    copy: "Classic built-in refrigerator/freezer with dual refrigerator doors above a pull-out freezer drawer, ideal for wide or tall items.",
    image: assets.frenchDoor,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Ffrench-doors&default.mnseries=Classic+Series+Refrigeration",
  },
  {
    title: "Over-and-Under",
    copy: "Classic refrigerator/freezer with internal dispenser, designed with fresh storage above and freezer below for a timeless, built-in look.",
    image: assets.overUnder,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fover-and-under&default.mnseries=Classic+Series+Refrigeration",
  },
  {
    title: "Side-by-Side",
    copy: "Timeless built-in design with fresh food and frozen storage side by side, providing easy access and balanced capacity in one streamlined appliance.",
    image: assets.sideBySide,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fside-by-side&default.mnseries=Classic+Series+Refrigeration",
  },
  {
    title: "Wine Storage",
    copy: "From UV-resistant glass to dual evaporators and separate temperature zones for reds and whites, our wine storage options are designed to maintain and showcase your collection.",
    image: assets.wine,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage",
  },
];

const comparison = [
  {
    title: "Classic Series",
    image: assets.overUnder,
    copy: "Features the iconic Sub-Zero grille for a timeless look that suits any aesthetic.",
    active: true,
    href: "/refrigeration/view-all-refrigeration?default.mnseries=Classic+Series+Refrigeration",
    finish: ["Stainless Steel", "Panel Ready"],
    width: ['30"', '36"', '42"', '48"'],
    models: ["Side-by-Side", "Over-and-Under", "French Door", "Column", "Wine Storage"],
    personalization:
      "Stainless-steel exterior and tubular or pro handles to match other Sub-Zero, Wolf, and Cove products",
  },
  {
    title: "Designer Series",
    image: assets.designer,
    copy: "Built to accept custom panels and blend seamlessly into your unique kitchen design.",
    href: "/refrigeration/designer-series",
    modelsHref:
      "/refrigeration/view-all-refrigeration?default.mnseries=Designer+Series+Refrigeration",
    finish: ["Panel Ready", "Stainless Steel (Optional)"],
    width: ['18"', '24"', '30"', '36"'],
    models: ["Over-and-Under", "Column", "Wine Storage", "Undercounter"],
    personalization:
      "Stainless-steel exterior and tubular or pro handles to match other Sub-Zero, Wolf, and Cove products",
  },
  {
    title: "PRO Series",
    image: assets.pro,
    copy: "Professional-grade quality in a striking form with stainless steel inside and out.",
    href: "/refrigeration/pro-series",
    modelsHref: "/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series+Refrigeration",
    finish: ["Stainless Steel"],
    width: ['36"', '48"'],
    models: ["Side-by-Side", "Over-and-Under"],
    personalization: "Stainless steel or glass door models",
  },
];

function VideoButton({
  isPaused,
  progress,
  className = "",
}: {
  isPaused: boolean;
  progress: number;
  className?: string;
}) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg
      className={`h-[60px] w-[60px] ${className}`}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        className="dynamic-media-progress-bg"
        cx="30"
        cy="30"
        r={radius}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="3"
        fill="none"
      />
      <circle
        className="dynamic-media-progress-bar"
        cx="30"
        cy="30"
        r={radius}
        stroke="rgba(255,255,255,0.98)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: dashOffset,
          transform: "rotate(-90deg)",
          transformOrigin: "30px 30px",
        }}
      />
      <circle
        className="dynamic-media-circle"
        cx="30"
        cy="30"
        r="20"
        fill="rgba(0,0,0,0.72)"
        fillOpacity="0.8"
      />
      {isPaused ? (
        <path d="M25 20L40 30L25 40V20Z" fill="currentColor" />
      ) : (
        <g className="dynamic-media-button-pause-play-icon">
          <rect
            className="dynamic-media-button-bar dynamic-media-button-bar-left"
            x="24"
            y="20"
            width="3"
            height="20"
            fill="currentColor"
            rx="1.5"
          />
          <rect
            className="dynamic-media-button-bar dynamic-media-button-bar-center"
            x="24"
            y="20"
            width="3"
            height="20"
            fill="currentColor"
            rx="1.5"
          />
          <rect
            className="dynamic-media-button-bar dynamic-media-button-bar-right"
            x="33"
            y="20"
            width="3"
            height="20"
            fill="currentColor"
            rx="1.5"
          />
        </g>
      )}
      <circle
        className="dynamic-media-focus-ring"
        cx="30"
        cy="30"
        r="18"
        fill="none"
        stroke="transparent"
        strokeWidth="2"
      />
    </svg>
  );
}

function VideoFrame({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

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
    <div className={`overflow-hidden bg-[#171715] ${className}`}>
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
        className="h-full w-full object-cover object-[52%_50%]"
        onLoadedMetadata={syncVideoState}
        onTimeUpdate={syncVideoState}
        onPlay={syncVideoState}
        onPause={syncVideoState}
      />
      <div className="dynamic-media-video-button-wrapper flow absolute bottom-7 right-7 z-30">
        <button
          type="button"
          className="dynamic-media-video-button icon grid h-[60px] w-[60px] place-items-center rounded-full text-white outline-none transition focus-visible:ring-2 focus-visible:ring-white"
          aria-label={isPaused ? "Play" : "Pause"}
          aria-pressed={!isPaused}
          onClick={toggleVideo}
        >
          <VideoButton isPaused={isPaused} progress={progress} />
          <span className="sr-only">Video</span>
        </button>
      </div>
    </div>
  );
}

function HeroVideo() {
  return (
    <section className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[#171715]">
      <VideoFrame
        src={assets.heroVideo}
        poster={assets.heroPoster}
        label="Sub-Zero built-in wine refrigerator integrated into white kitchen cabinetry"
        className="absolute inset-0"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/58 via-black/18 to-transparent" />
    </section>
  );
}

function SubZeroSnowflakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
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
      data-classic-intro
      className="bg-[#f4f2ec] px-6 pb-20 pt-14 text-[#171715] md:px-12 md:pb-24 md:pt-16"
      aria-labelledby="classic-series"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em]">Sub-Zero</p>
        <h1
          id="classic-series"
          className="mt-6 font-serif text-[clamp(4.5rem,5vw,5.8rem)] leading-[0.94]"
        >
          Classic Series
        </h1>
        <p className="mt-7 max-w-[920px] text-[1.04rem] leading-snug md:text-[1.16rem]">
          For those seeking the timeless Sub-Zero aesthetic. Classic Series features Split Climate
          <sup className="text-[0.55em]">&reg;</sup> cooling, ClearSight
          <sup className="text-[0.55em]">&reg;</sup> LED lighting, and stunning stainless-steel
          accents for exceptional convenience and refinement inside and out.
        </p>
        <Link
          href="/showroom"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#171715] px-9 text-sm font-bold text-white transition hover:bg-[#34322e]"
        >
          Experience in a showroom
        </Link>
        <div className="mt-7 flex w-full flex-col items-center text-[#0081c6]" aria-hidden="true">
          <span className="block h-40 w-px bg-[#0081c6]" />
          <SubZeroSnowflakeIcon className="mt-5 h-6 w-7 text-[#0081c6]" />
        </div>
      </div>
    </section>
  );
}

function StickyShowroomCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const intro = document.querySelector<HTMLElement>("[data-classic-intro]");
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
      className={`fixed bottom-6 left-1/2 z-[90] inline-flex min-h-[38px] -translate-x-1/2 items-center justify-center rounded-full bg-[#74716a] px-5 text-[0.82rem] font-bold text-white shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition duration-300 hover:bg-[#56534e] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      Visit a showroom
    </Link>
  );
}

function FullWidthStatement() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-20 text-[#171715] md:px-12 md:pb-28">
      <div className="relative mx-auto aspect-[16/9] max-w-[1345px] overflow-hidden bg-[#171715]">
        <Image
          src={assets.grille}
          alt="Close-up of stainless steel Sub-Zero refrigerator grille"
          fill
          sizes="(max-width: 900px) calc(100vw - 48px), 1345px"
          className="object-cover"
        />
      </div>
      <p className="mx-auto mt-11 max-w-[1180px] text-center font-serif text-[clamp(1.9rem,2.05vw,2.48rem)] font-normal leading-[1.18]">
        <span className="block md:whitespace-nowrap">
          The Classic Series grille has been a defining
        </span>
        <span className="block md:whitespace-nowrap">
          emblem of Sub-Zero quality for over seven decades
        </span>
      </p>
    </section>
  );
}

function HotspotFeature() {
  return (
    <section className="bg-[#d2cec4] text-[#171715]">
      <div className="mx-auto max-w-[1392px]">
        <div className="relative overflow-hidden">
          <Image
            src={assets.hotspot}
            alt="Sub-Zero stainless steel refrigerator with organized fresh produce and containers inside"
            width={1280}
            height={794}
            sizes="(max-width: 1392px) 100vw, 1392px"
            className="h-auto w-full"
          />
          {featureCards.map((feature) => (
            <details
              key={feature.title}
              className={`group absolute hidden w-[min(324px,22vw)] rounded-[4px] border border-white/45 bg-[#272724]/90 p-4 text-white shadow-xl backdrop-blur-[1px] lg:block ${feature.position}`}
            >
              <summary className="relative min-h-[72px] cursor-pointer list-none pr-12">
                <span className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-full border border-white/65 text-lg leading-none">
                  +
                </span>
                <h3 className="font-serif text-[1.55rem] leading-[1.04]">
                  {feature.title}
                  {feature.title !== "Air purification" ? (
                    <sup className="ml-0.5 text-[0.4em]">&reg;</sup>
                  ) : null}
                </h3>
                {feature.suffix ? (
                  <p className="mt-2 text-[0.78rem] font-semibold uppercase tracking-[0.28em]">
                    {feature.suffix}
                  </p>
                ) : null}
              </summary>
              <p className="mt-4 text-sm leading-snug text-white/88">{feature.copy}</p>
              <div className="mt-4 aspect-video overflow-hidden bg-black/40">
                {feature.type === "video" ? (
                  <video
                    src={feature.media}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={feature.media}
                    alt={feature.title}
                    width={420}
                    height={240}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </details>
          ))}
        </div>
        <div className="mt-5 grid gap-4 lg:hidden">
          {featureCards.map((feature) => (
            <article key={feature.title} className="bg-[#fbfaf6] p-5">
              <h3 className="font-serif text-3xl leading-tight">
                {feature.title}
                {feature.title !== "Air purification" ? <sup className="text-[0.45em]">&reg;</sup> : null}
              </h3>
              {feature.suffix ? <p className="mt-1 text-xs uppercase tracking-[0.28em]">{feature.suffix}</p> : null}
              <p className="mt-4 text-sm leading-snug">{feature.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FadingMediaCopyBlock() {
  return (
    <section className="bg-[#f4f2ec] px-6 py-16 text-[#171715] md:px-12 md:py-24">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-20 md:gap-24">
        {fadingMediaItems.map((item) => {
          const media = (
            <div className="relative overflow-hidden bg-[#e4e1d8]">
              {item.type === "video" ? (
                <VideoFrame src={item.media} label={item.alt} className="aspect-[820/710] w-full" />
              ) : (
                <Image
                  src={item.media}
                  alt={item.alt}
                  width={1920}
                  height={1664}
                  sizes="(min-width: 1024px) 820px, 100vw"
                  className="aspect-[820/710] h-full w-full object-cover"
                />
              )}
            </div>
          );

          const copy = (
            <div className="max-w-[480px]">
              <h2 className="font-serif text-[clamp(2.35rem,3vw,3.25rem)] leading-[1.06]">
                {item.title}
              </h2>
              <p className="mt-7 text-[1.05rem] leading-[1.45] md:text-[1.12rem]">
                {item.copy}
              </p>
              <Link
                href={item.href}
                className="mt-6 inline-block border-b border-current pb-1 text-[1.02rem] leading-none transition hover:text-[#555047]"
              >
                Explore products
              </Link>
            </div>
          );

          return (
            <article
              key={item.title}
              className={`grid items-center gap-10 lg:gap-16 xl:gap-20 ${
                item.mediaFirst
                  ? "lg:grid-cols-[minmax(0,820px)_minmax(320px,480px)]"
                  : "lg:grid-cols-[minmax(320px,480px)_minmax(0,820px)]"
              }`}
            >
              {item.mediaFirst ? (
                <>
                  {media}
                  {copy}
                </>
              ) : (
                <>
                  {copy}
                  {media}
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ShowroomCta() {
  return (
    <section className="bg-[#f4f2ec] px-6 py-20 text-[#171715] md:px-12 md:py-28">
      <div className="mx-auto grid max-w-[1120px] items-center bg-[#fbfaf6] p-6 md:grid-cols-[430px_1fr] md:gap-16 lg:gap-[104px]">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={assets.showroom}
            alt="Modern appliance showroom with Sub-Zero refrigeration and Wolf cooking appliances"
            fill
            sizes="(min-width: 1024px) 430px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center py-8 md:py-0">
          <h2 className="max-w-[520px] font-serif text-[clamp(3rem,3.2vw,4rem)] leading-[1.05]">
            Start your journey in a showroom
          </h2>
          <p className="mt-7 max-w-[470px] text-[1.05rem] leading-snug">
            Our showrooms are where inspiration turns into informed decisions. Learn how a visit
            helps you plan, compare, and move forward with confidence.
          </p>
          <Link
            href="/showroom"
            className="mt-8 inline-flex min-h-[52px] w-fit items-center justify-center rounded-full bg-[#171715] px-8 text-base font-bold text-white transition hover:bg-[#34322e]"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}

function DesignGallery() {
  const [active, setActive] = useState(0);
  const current = aestheticGalleries[active];

  return (
    <section className="bg-[#f4f2ec] px-4 py-16 text-[#171715] md:px-8 md:py-24">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="max-w-[690px] font-serif text-[2rem] leading-[1.08] md:text-[2.35rem] lg:text-[2.7rem]">
          The perfect fusion of elegance and performance, Classic Series enhances any kitchen
          aesthetic.
        </h2>
        <div className="mt-7 flex items-center">
          <div className="inline-flex w-fit rounded-full border border-[#cbc6bb] bg-[#f4f2ec] p-1">
            {aestheticGalleries.map((item, index) => (
              <button
                key={item.tab}
                type="button"
                className={`rounded-full px-5 py-2 text-[0.82rem] font-bold transition ${
                  index === active ? "bg-[#171715] text-white" : "text-[#171715]"
                }`}
                onClick={() => setActive(index)}
              >
                {item.tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.82fr)]">
          <div className="relative aspect-[1.54] overflow-hidden bg-[#d7d0c4]">
            <Image
              src={current.images[0]}
              alt={`${current.tab} Classic Series kitchen inspiration`}
              fill
              sizes="(min-width: 1024px) 908px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[0.82] overflow-hidden bg-[#d7d0c4] lg:aspect-auto lg:h-full">
            <Image
              src={current.images[1]}
              alt={`${current.tab} kitchen with open Classic Series refrigerator`}
              fill
              sizes="(min-width: 1024px) 472px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative mt-3 aspect-[2.48] overflow-hidden bg-[#d7d0c4]">
          <Image
            src={current.images[2]}
            alt={`${current.tab} full kitchen design with Classic Series refrigeration`}
            fill
            sizes="(min-width: 1024px) 1392px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/inspiration"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white"
          >
            See more inspiration
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
    <section className="overflow-hidden bg-[#f4f2ec] px-4 pb-16 pt-20 text-[#171715] md:px-8 md:pb-24 md:pt-[74px]">
      <div className="mx-auto max-w-[1392px]">
        <div className="grid min-h-[268px] gap-8 lg:grid-cols-[minmax(0,620px)_auto] lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-[3.25rem] leading-[1.07] md:text-[3.75rem] lg:text-[4rem]">
              Personalize to find your perfect fit
            </h2>
            <p className="mt-6 max-w-[610px] text-[1.05rem] leading-[1.46]">
              Discover what makes the Classic Series refrigeration a true icon. Choose from
              stainless-steel or panel-ready models to suit your taste and lifestyle.
            </p>
          </div>
          <Link
            href="/refrigeration/view-all-refrigeration?default.mnseries=Classic+Series+Refrigeration"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#171715] px-8 text-[0.95rem] font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white lg:mt-20"
          >
            See all Classic Series Refrigeration
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
            <p className="mt-4 text-[1rem] leading-[1.25]">{visibleModel.copy}</p>
            <Link
              href={visibleModel.href}
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full border border-[#171715] px-5 text-[0.9rem] font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white"
            >
              Explore this model
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 flex w-full max-w-[1392px] -translate-x-1/2 justify-center px-4 md:px-8">
          <div className="inline-flex max-w-full overflow-x-auto rounded-full border border-[#cbc6bb] bg-[#f4f2ec] p-1">
            {models.map((model, index) => (
              <button
                key={model.title}
                type="button"
                aria-pressed={index === active}
                className={`shrink-0 rounded-full px-5 py-2 text-[0.84rem] font-bold transition ${
                  index === active ? "bg-[#171715] text-white" : "text-[#171715]"
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

function ExpandingMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const [zoomProgress, setZoomProgress] = useState(0);

  useEffect(() => {
    const updateZoomProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
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
    <section ref={sectionRef} className="expanding-media-wrapper h-[155svh] bg-[#f4f2ec]">
      <div
        className="expanding-media sticky top-0"
        data-block-name="expanding-media"
        data-block-status="loaded"
      >
        <div className="tension-zoom tension-zoom--active relative left-1/2 h-[100svh] min-h-[640px] w-screen -translate-x-1/2 overflow-hidden bg-[#171715]">
          <div
            className="expanding-media-media-element relative h-full w-full"
            data-aem-asset-id="e8892ec9-24c4-42de-afde-dcbe37051e76"
          >
            <Image
              src={assets.expanding}
              alt="Modern kitchen with Sub-Zero stainless steel refrigerator, Wolf range with red knobs, marble island, and wooden cabinetry under curved ceiling beams"
              fill
              sizes="100vw"
              className="object-cover will-change-transform"
              style={{ transform: `scale(${imageScale})` }}
            />
          </div>
          <div
            className="tension-zoom-border tension-zoom-block tension-zoom-top pointer-events-none absolute left-0 top-0 w-full bg-[#f4f2ec] will-change-[height]"
            style={{ height: borderSize }}
          />
          <div
            className="tension-zoom-border tension-zoom-inline tension-zoom-right pointer-events-none absolute right-0 top-0 h-full bg-[#f4f2ec] will-change-[width]"
            style={{ width: borderSize }}
          />
          <div
            className="tension-zoom-border tension-zoom-block tension-zoom-bottom pointer-events-none absolute bottom-0 left-0 w-full bg-[#f4f2ec] will-change-[height]"
            style={{ height: borderSize }}
          />
          <div
            className="tension-zoom-border tension-zoom-inline tension-zoom-left pointer-events-none absolute left-0 top-0 h-full bg-[#f4f2ec] will-change-[width]"
            style={{ width: borderSize }}
          />
          <div className="trigger-line absolute top-[55%] w-full" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function ExploreMoreSubZero() {
  return (
    <section className="bg-[#f4f2ec] px-6 py-20 text-[#171715] md:px-12 md:py-28">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="text-center font-serif text-[clamp(3rem,4vw,4.3rem)] leading-tight">
          Explore more Sub-Zero
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {comparison.map((item) => (
            <article
              key={item.title}
              className={`px-5 pb-8 pt-7 text-center transition ${
                item.active ? "bg-[#ece8dd]" : "hover:bg-[#ece8dd]"
              }`}
            >
              <div className="relative mx-auto h-[210px] w-full max-w-[260px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 300px, 100vw"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-7 font-serif text-[2.35rem] leading-tight">{item.title}</h3>
              <p className="mx-auto mt-3 min-h-[54px] max-w-[330px] text-sm leading-snug">{item.copy}</p>
              <div className="mt-5 flex min-h-10 flex-wrap items-center justify-center gap-3">
                <Link
                  href={item.modelsHref ?? item.href}
                  className="inline-flex min-h-9 items-center justify-center rounded-full bg-[#171715] px-5 text-[0.78rem] font-bold text-white"
                >
                  View models
                </Link>
                {item.active ? (
                  <span className="text-[0.72rem]">Currently Viewing</span>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#171715] px-5 text-[0.78rem] font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white"
                  >
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
                <div className="grid gap-3 border-b border-[#8a8578] py-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.26em]">Width</dt>
                  <dd className="space-y-1">
                    {item.width.map((width) => (
                      <Link
                        key={width}
                        href={item.modelsHref ?? item.href}
                        className="block w-fit underline underline-offset-2"
                      >
                        {width}
                      </Link>
                    ))}
                  </dd>
                </div>
                <div className="grid gap-3 border-b border-[#8a8578] py-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.26em]">Models</dt>
                  <dd className="space-y-1">
                    {item.models.map((model) => (
                      <Link
                        key={model}
                        href={item.modelsHref ?? item.href}
                        className="block w-fit underline underline-offset-2"
                      >
                        {model}
                      </Link>
                    ))}
                  </dd>
                </div>
                <div className="grid gap-3 py-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.26em]">
                    Personalization
                  </dt>
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
              image: assets.overview,
            },
            {
              title: "Why Sub-Zero, Wolf, and Cove?",
              copy: "Delve into why designers trust Sub-Zero, Wolf, and Cove to help craft the world's finest kitchens.",
              cta: "Learn about us",
              href: "/our-story",
              image: assets.showroom,
            },
          ].map((item) => (
            <article key={item.title} className="bg-[#fbfaf6]">
              <div className="relative aspect-[1.6] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 696px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-8 p-6 md:min-h-[174px] md:grid-cols-[0.95fr_1fr] md:p-6">
                <div className="flex flex-col justify-between gap-7">
                  <h3 className="font-serif text-[clamp(2.2rem,2.35vw,3rem)] leading-[1.02]">
                    {item.title}
                  </h3>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-12 w-fit items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold transition hover:bg-[#171715] hover:text-white"
                  >
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

export function ClassicSeriesPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <StickyShowroomCta />
      <HeroVideo />
      <IntroBlock />
      <FullWidthStatement />
      <HotspotFeature />
      <FadingMediaCopyBlock />
      <DesignedWithYou
        categories={classicSeriesDesignCategories}
        title="More Classic Series features"
        copy=""
        ctaLabel={null}
        showTabs={false}
      />
      <ShowroomCta />
      <DesignGallery />
      <ModelGallery />
      <ExpandingMedia />
      <ExploreMoreSubZero />
      <MoreToDiscover />
    </main>
  );
}
