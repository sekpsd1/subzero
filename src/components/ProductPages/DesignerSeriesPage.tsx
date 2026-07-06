"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DesignedWithYou } from "@/components/Home/DesignedWithYou";

const aemAsset = (id: string, path: string) =>
  `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:${id}/${path}`;

const aemImage = (id: string, file: string, width = 1920) =>
  `${aemAsset(id, `as/${file}`)}&width=${width}&max-quality=90`;

const assets = {
  heroVideo: `${aemAsset(
    "32319839-f5e9-4ae2-80c3-0dc6a6995223",
    "renditions/original/as/Subzero-Designer-Hero-1280-Optimized.mp4",
  )}#t=0.001`,
  heroPoster: `${aemAsset(
    "d49584d7-2899-4c44-9323-537229debcb2",
    "as/designer-series-fallback.avif?assetname=designer-series-fallback.png",
  )}&width=2560&max-quality=90`,
  hotspot: aemImage(
    "2797357e-836d-4e61-99ed-0ffe5c787172",
    "designer-hotspot.avif?assetname=designer-hotspot.png",
  ),
  hingeOne: aemImage(
    "1d5e2279-ba90-4099-84ee-fecc97586b5e",
    "sz-designer-hinge-01_new.avif?assetname=sz-designer-hinge-01_new.png",
  ),
  hingeTwo: aemImage(
    "f1f51156-e332-44f9-9801-362220bb380a",
    "sz-designer-hinge-02_new.avif?assetname=sz-designer-hinge-02_new.jpg",
  ),
  vision: aemImage(
    "f0cd8ff7-3213-48a5-9552-9c23613921d5",
    "sz-designer-colors-1.avif?assetname=sz-designer-colors-1.jpg",
  ),
  colorBrown: aemImage(
    "15816710-351c-4286-b59b-514d5d5e6636",
    "SZWC_Nashville_45738_R_RGB.avif?assetname=SZWC_Nashville_45738_R_RGB.jpg",
  ),
  colorBlack: aemImage(
    "f7bc73a6-53ee-4c16-bfc4-825fc30a9ad7",
    "sz-designer-colors-3.avif?assetname=sz-designer-colors-3.jpg",
  ),
  colorWhite: aemImage(
    "d285ef6f-f63e-4d01-abad-2f979d6714eb",
    "sz-designer-colors-4.avif?assetname=sz-designer-colors-4.jpg",
  ),
  colorMidnight: aemImage(
    "7661391f-4b83-4ce9-957e-cfee88509886",
    "SubZero_Toolbox_CoffeeMachine_Bold_v2.avif?assetname=SubZero_Toolbox_CoffeeMachine_Bold_v2.png",
  ),
  colorDesert: aemImage(
    "a0f8c58d-1628-440f-a172-5ec406ae83db",
    "SLG_LG_081822_1_V2.avif?assetname=SLG_LG_081822_1_V2.jpg",
  ),
  colorDriftwood: aemImage(
    "a6d44dfd-0e41-474b-a7c1-a2e399ee0bba",
    "KDC_17-18_NNH-Residence_Miriam-Fanning_01.avif?assetname=KDC_17-18_NNH-Residence_Miriam-Fanning_01.tif",
  ),
  colorGreen: aemImage(
    "c0298eeb-8bea-4913-b947-d82f67509316",
    "sz-designer-colors-7.avif?assetname=sz-designer-colors-7.jpg",
  ),
  featureTouch: aemImage(
    "3eb06e82-d504-475a-a007-6bc98f398d9b",
    "Rectangle-135702-(1).avif?assetname=Rectangle+135702+%281%29.png",
    1440,
  ),
  featureShelf: aemImage(
    "40a83e18-29a5-4869-9795-2ce6e862e4ba",
    "SLG_NanoCoatedShelf_1_042822.avif?assetname=SLG_NanoCoatedShelf_1_042822.jpg",
    1440,
  ),
  featureDrawer: aemImage(
    "209e8ee8-2231-477b-84cb-fee2c2be7448",
    "SLG_SM_081822_2_for-GIF.avif?assetname=SLG_SM_081822_2_for+GIF.jpg",
    1440,
  ),
  featureDoor: aemImage(
    "f2a02db9-0f97-4df5-a899-af0b89db85d9",
    "SLG_StainlessDoor_1_042822.avif?assetname=SLG_StainlessDoor_1_042822.jpg",
    1440,
  ),
  showroom: aemImage(
    "8fb0da74-6d9a-442e-9e5a-42564fc05540",
    "SZG_Miami_Showroom_51876.avif?assetname=SZG_Miami_Showroom_51876.jpg",
    1280,
  ),
  galleryOne: aemImage(
    "22674b65-6541-4a1f-8f3d-93bd3c724511",
    "SZG_AdamTaylorKitchen_AT_03_Medium.avif?assetname=SZG_AdamTaylorKitchen_AT_03_Medium.jpg",
    1280,
  ),
  galleryTwo: aemImage(
    "3249c5a4-3fdb-46a3-8ea0-2aeb5db2c4d1",
    "13_gallery.avif?assetname=13_gallery.jpg",
    1280,
  ),
  galleryThree: aemImage(
    "36d68ebb-1e1c-4e7b-b9fc-291b1e6fe305",
    "Finchley-Rd-SS-20.avif?assetname=Finchley-Rd-SS-20.jpg",
    1280,
  ),
  galleryFour: aemImage(
    "0089c9d3-27b8-4843-8b6f-b1ca6924b6f3",
    "BOULANGER_LG_KDC_15-16_81717_3_PRIMARY_carousel.avif?assetname=BOULANGER_LG_KDC_15-16_81717_3_PRIMARY_carousel.jpg",
    1280,
  ),
  galleryFive: aemImage(
    "87dd0c1a-c1c4-490c-9237-a1a3b29ae631",
    "TriBrand_Gladwyne_PA_55378.avif?assetname=TriBrand_Gladwyne_PA_55378.tif",
    1280,
  ),
  gallerySix: aemImage(
    "bd70ebdf-e163-45aa-8914-15a41654840d",
    "Griswold-SS-35.avif?assetname=Griswold-SS-35.jpg",
    1280,
  ),
  gallerySeven: aemImage(
    "7a1637c3-a0fc-4e4e-acb1-af4e489df825",
    "23-SUBZERO_ACCENT-DOORS_S02-GLAM_EST_F01.avif?assetname=23-SUBZERO_ACCENT-DOORS_S02-GLAM_EST_F01.jpg",
    1280,
  ),
  galleryEight: aemImage(
    "af4e665e-2734-4dd4-a035-8cbd47908603",
    "SM_BSTYLE_061416_8_V2_frajni_gallery.avif?assetname=SM_BSTYLE_061416_8_V2_frajni_gallery.jpg",
    1280,
  ),
  galleryNine: aemImage(
    "8fe370dd-5db5-4030-8f91-2eac9d0a0a4b",
    "Fixed-aspect-ratio-image-(10).avif?assetname=Fixed+aspect+ratio+image+%2810%29.png",
    1280,
  ),
  overUnder: aemImage(
    "f1fc6aee-91ae-4261-8581-ae3ed36ca3ce",
    "DET3050R_R-CUSTOM_SH.avif?assetname=DET3050R_R-CUSTOM_SH.png",
    1280,
  ),
  column: aemImage(
    "98ac4d20-9a8c-43ba-b63a-5aec33ab76c7",
    "DEC2450FI_R-CUSTOM_SH.avif?assetname=DEC2450FI_R-CUSTOM_SH.png",
    1280,
  ),
  wine: aemImage(
    "c47bb99b-a487-49a0-bdea-b1f24e7f9542",
    "DEC3050W_L-CUSTOM_SH.avif?assetname=DEC3050W_L-CUSTOM_SH.png",
    1280,
  ),
  undercounter: aemImage(
    "38e1b742-00f6-4b4d-ac3c-89e56ecc0450",
    "DEU1550B_R-PANEL-TUB_SH.avif?assetname=DEU1550B_R-PANEL-TUB_SH.png",
    1280,
  ),
  expanding: aemImage(
    "33766109-c472-4795-9491-701618c42023",
    "sz-designer-media-break.avif?assetname=sz-designer-media-break.png",
  ),
  designerCompare: aemImage(
    "08d37139-fb2e-4518-9166-dfadb8ed57cc",
    "DET3650R_R_SH.avif?assetname=DET3650R_R_SH.png",
    800,
  ),
  classicCompare: aemImage(
    "d588e559-ff10-4cd6-a6d6-632c71c0134c",
    "22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_T_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_T_R_SH.png",
    800,
  ),
  proCompare: aemImage(
    "08979add-b21f-4476-a316-0353f8487da0",
    "SILO_PRO3650-RH_PIK_120618_SH.avif?assetname=SILO_PRO3650-RH_PIK_120618_SH.png",
    800,
  ),
  discoverSubZero: aemImage(
    "03f0901e-dfa5-4e54-8482-7b65d7de3c26",
    "test-image-1.avif?assetname=test-image-1.png",
    1280,
  ),
  whyUs: aemImage(
    "86a9f640-dd9a-4dc2-b2e1-c026a850c307",
    "Sub-Zero-day-1-7995.avif?assetname=Sub-Zero+day+1-7995.jpg",
    1280,
  ),
};

const features = [
  {
    title: "Touch control panel",
    copy: "Customize settings, from lighting to humidity, with the tap of a finger via the conveniently accessible interface.",
    image: assets.featureTouch,
  },
  {
    title: "Nano-coated shelves",
    copy: "Spill-resistant glass shelves help contain messes and keep clean-up simple.",
    image: assets.featureShelf,
  },
  {
    title: "Flexible storage",
    copy: "Adjustable drawers and shelving make it easier to organize ingredients of varying shapes and sizes.",
    image: assets.featureDrawer,
  },
  {
    title: "Stainless accents",
    copy: "Complements the exterior's sophistication and creates a consistent feel throughout your kitchen.",
    image: assets.featureDoor,
  },
];

const designerSeriesFeatureCategories = [
  {
    label: "Designer",
    images: features.map((feature) => feature.image),
    captions: features.map((feature) => ({
      title: feature.title,
      copy: feature.copy,
    })),
  },
];

const models = [
  {
    title: "Over-and-Under",
    copy: "Designer refrigerator/freezer with internal dispenser, designed with fresh storage above and freezer below for a timeless, built-in look.",
    image: assets.overUnder,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fover-and-under&default.mnseries=Designer+Series",
  },
  {
    title: "Column",
    copy: "Sleek, built-in all-refrigerator or all-freezer column units offering advanced food preservation with flexible, high-capacity storage.",
    image: assets.column,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fcolumn-refrigeration&default.mnseries=Designer+Series",
  },
  {
    title: "Wine Storage",
    copy: "From UV-resistant glass to dual evaporators and separate temperature zones for reds and whites, our wine storage options are designed to maintain and showcase your collection.",
    image: assets.wine,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage&default.mnseries=Designer+Series",
  },
  {
    title: "Undercounter",
    copy: "Sub-Zero Undercounter Refrigeration integrates seamlessly wherever you need it most for truly anywhere refrigeration.",
    image: assets.undercounter,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fundercounter&default.mnseries=Designer+Series",
  },
];

const comparisons = [
  {
    title: "Designer Series",
    image: assets.designerCompare,
    copy: "Built to accept custom panels and blend seamlessly into your unique kitchen design.",
    active: true,
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
  {
    title: "PRO Series",
    image: assets.proCompare,
    copy: "Professional-grade quality in a striking form with stainless steel inside and out.",
    href: "/refrigeration/pro-series",
    modelsHref: "/refrigeration/view-all-refrigeration?default.mnseries=PRO+Series+Refrigeration",
    finish: ["Stainless Steel"],
    width: ['36"', '48"'],
    models: ["Side-by-Side", "Over-and-Under"],
    personalization: "Stainless steel or glass door models",
  },
];

const designerAestheticGalleries = [
  {
    tab: "Traditional",
    images: [assets.galleryOne, assets.galleryTwo, assets.galleryThree],
  },
  {
    tab: "Transitional",
    images: [assets.galleryFive, assets.gallerySix, assets.gallerySeven],
  },
  {
    tab: "Contemporary",
    images: [assets.galleryFour, assets.galleryEight, assets.galleryNine],
  },
];

function VideoButton({
  isPaused,
  progress,
}: {
  isPaused: boolean;
  progress: number;
}) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg
      className="h-[60px] w-[60px]"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="30"
        cy="30"
        r={radius}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="3"
        fill="none"
      />
      <circle
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
      <circle cx="30" cy="30" r="20" fill="rgba(0,0,0,0.72)" fillOpacity="0.8" />
      {isPaused ? (
        <path d="M25 20L40 30L25 40V20Z" fill="currentColor" />
      ) : (
        <>
          <rect x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
          <rect x="33" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
        </>
      )}
    </svg>
  );
}

function HeroVideo() {
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
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#171715]">
      <div
        className="absolute inset-0"
        data-aem-asset-id="32319839-f5e9-4ae2-80c3-0dc6a6995223"
        role="group"
        aria-label="Sub-Zero integrated wine refrigerator with wooden shelves built into white kitchen cabinetry with marble countertops and Wolf appliances nearby"
      >
        <video
          ref={videoRef}
          poster={assets.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          className="h-full w-full object-cover object-[52%_50%]"
          onLoadedMetadata={syncVideoState}
          onTimeUpdate={syncVideoState}
          onPlay={syncVideoState}
          onPause={syncVideoState}
        >
          <source src={assets.heroVideo} type="video/mp4" />
        </video>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/58 via-black/18 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/68 via-black/20 to-transparent" />
      <button
        type="button"
        className="absolute bottom-7 right-7 z-30 grid h-[60px] w-[60px] place-items-center rounded-full text-white outline-none transition focus-visible:ring-2 focus-visible:ring-white"
        aria-label={isPaused ? "Play" : "Pause"}
        aria-pressed={!isPaused}
        onClick={toggleVideo}
      >
        <VideoButton isPaused={isPaused} progress={progress} />
        <span className="sr-only">Video</span>
      </button>
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
      data-designer-intro
      className="bg-[#f4f2ec] px-6 pb-20 pt-14 text-[#171715] md:px-12 md:pb-24 md:pt-16"
      aria-labelledby="designer-series"
    >
      <div className="mx-auto flex max-w-[990px] flex-col items-center text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em]">Sub-Zero</p>
        <h1
          id="designer-series"
          className="mt-5 font-serif text-[clamp(2.8rem,4.7vw,4.9rem)] leading-[0.98]"
        >
          Designer Series
        </h1>
        <p className="mt-6 max-w-[900px] text-[0.96rem] font-light leading-snug md:text-[1.02rem]">
          For those who see the kitchen as a blank canvas, Designer Series offers freedom to
          customize and create a truly personal design. It&apos;s panel ready to seamlessly integrate
          with surrounding cabinetry. Inside, features like Split Climate
          <sup className="text-[0.55em]">&reg;</sup> cooling and advanced air purification ensure
          performance that matches the aesthetics.
        </p>
        <Link
          href="/showroom"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#171715] px-9 text-sm font-bold text-white transition hover:bg-[#34322e]"
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
      const intro = document.querySelector<HTMLElement>("[data-designer-intro]");
      if (!intro) return;

      const introTop = intro.getBoundingClientRect().top + window.scrollY;
      const colorPalette = document.querySelector<HTMLElement>("[data-designer-color-palette]");
      const paletteRect = colorPalette?.getBoundingClientRect();
      const paletteVisible =
        paletteRect != null && paletteRect.top < window.innerHeight && paletteRect.bottom > 0;

      setVisible(window.scrollY >= introTop - 12 && !paletteVisible);
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

function HotspotVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setPlaying(true);
      return;
    }

    video.pause();
    setPlaying(false);
  };

  return (
    <div className="relative mt-4 aspect-video overflow-hidden bg-black/30">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        aria-pressed={playing}
        onClick={togglePlayback}
        className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-[#3d3b37]/85 text-white shadow-[0_0_0_2px_rgba(255,255,255,0.65)] transition hover:bg-[#2b2925]"
      >
        {playing ? (
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-5 w-1.5 rounded-sm bg-current" />
            <span className="h-5 w-1.5 rounded-sm bg-current" />
          </span>
        ) : (
          <span
            className="ml-0.5 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-current"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}

function HotspotFeature() {
  const hotspots = [
    {
      title: "Clearsight\u00ae\nLED lighting",
      position: "left-[68%] top-[18%]",
      copy:
        "Fully illuminates the interior and reduces shadows, adding light overhead, under each shelf, and in each crisper drawer.",
      video:
        "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:6a276661-6599-4eda-8672-c185e6d44aa3/renditions/original/as/220037_ClearSight.mp4#t=0.001",
    },
    {
      title: "Split Climate\u00ae\nintelligent\ncooling system",
      position: "left-[30%] top-[40%]",
      copy:
        "Revolutionizes Sub-Zero's already-superior preservation capabilities, keeping food even fresher by optimizing the refrigerator temperature within one degree of a set point.",
      video:
        "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:61cdfdc4-717e-47f9-b5fb-069405f81908/renditions/original/as/SZ11970442_Segment--638971761799583497.mp4#t=0.001",
    },
    {
      title: "Stainless accents",
      position: "left-[58%] top-[72%]",
      copy:
        "Complements the exterior's sophistication and creates a consistent feel throughout your kitchen.",
      video:
        "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:1565cf1e-9152-41c7-b980-8924d1ea3e27/renditions/original/as/220037_Stainless_Accents.mp4#t=0.001",
    },
  ];

  return (
    <section className="bg-[#f4f2ec] text-[#171715]" role="region">
      <div className="relative w-full">
        <div className="relative aspect-[16/15] w-full overflow-visible">
          <Image
            src={assets.hotspot}
            alt="Open Sub-Zero built-in refrigerator integrated into wood cabinetry."
            fill
            sizes="100vw"
            className="object-contain"
          />
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.title}
              tabIndex={0}
              className={`group absolute hidden w-[clamp(210px,17vw,326px)] -translate-x-1/2 bg-[#2f2d29]/95 px-5 py-4 text-white shadow-xl outline-none ring-1 ring-white/70 transition md:block ${hotspot.position}`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="whitespace-pre-line font-serif text-[clamp(1.15rem,1.5vw,1.65rem)] leading-[1.05]">
                  {hotspot.title}
                </p>
                <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/60 text-xl leading-none">
                  <span className="transition group-hover:opacity-0 group-focus-within:opacity-0">
                    +
                  </span>
                  <span className="absolute opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                    -
                  </span>
                </span>
              </div>
              <div className="grid max-h-0 grid-rows-[0fr] overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-5 group-hover:max-h-[360px] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:mt-5 group-focus-within:max-h-[360px] group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
                <div className="min-h-0">
                  <p className="text-[0.82rem] leading-snug text-white/85">{hotspot.copy}</p>
                  <HotspotVideo src={hotspot.video} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HingeFeature() {
  return (
    <section className="bg-[#f4f2ec] px-5 pb-10 pt-20 text-[#171715] md:px-0 md:pb-12 md:pt-[130px]">
      <div className="mx-auto grid max-w-[1410px] gap-2 md:grid-cols-2">
        <div>
          <div className="relative aspect-[0.93] overflow-hidden">
            <Image
              src={assets.hingeOne}
              alt="Open Sub-Zero Designer Series refrigerator."
              fill
              sizes="(min-width: 1440px) 701px, (min-width: 768px) calc((100vw - 8px) / 2), calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <div className="mt-5 max-w-[355px]">
            <h2 className="text-[0.78rem] font-bold leading-tight">Integrated door hinge</h2>
            <p className="mt-4 text-[0.72rem] leading-tight text-[#171715]">
              A hallmark of Designer Series, the hidden hinge creates a sleek, flush appearance in
              single or multiple side-by-side installations.
            </p>
          </div>
        </div>
        <div className="relative aspect-[0.805] overflow-hidden">
          <Image
            src={assets.hingeTwo}
            alt="Close-up of a Sub-Zero integrated door hinge."
            fill
            sizes="(min-width: 1440px) 701px, (min-width: 768px) calc((100vw - 8px) / 2), calc(100vw - 40px)"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

const colorPaletteItems = [
  {
    name: "Blue Bungalow",
    color: "#274660",
    image: assets.vision,
    alt: "Modern kitchen with Sub-Zero blue integrated refrigeration, wooden cabinetry, black countertops, and a dining area with natural light.",
  },
  {
    name: "Brown Grain",
    color: "#BEA27E",
    image: assets.colorBrown,
    alt: "Modern kitchen with light wood cabinetry, marble countertops, Sub-Zero refrigerator, and Wolf oven.",
  },
  {
    name: "Black Midnight",
    color: "#181817",
    image: assets.colorBlack,
    alt: "Modern kitchen with matte black cabinetry featuring Sub-Zero integrated wine storage and Wolf appliances.",
  },
  {
    name: "White Stone",
    color: "#FBF9F5",
    image: assets.colorWhite,
    alt: "Sub-Zero built-in wine refrigerator integrated into white cabinetry in a modern kitchen.",
  },
  {
    name: "Midnight Modern",
    color: "#1e2128",
    image: assets.colorMidnight,
    alt: "Sleek modern kitchen with dark cabinetry and a built-in coffee machine.",
  },
  {
    name: "Desert Oasis",
    color: "#593527",
    image: assets.colorDesert,
    alt: "Modern kitchen with Sub-Zero integrated refrigeration and wood cabinetry.",
  },
  {
    name: "Driftwood Oak",
    color: "#9D9A97",
    image: assets.colorDriftwood,
    alt: "Modern kitchen and dining area with gray marble island and wood cabinetry.",
  },
  {
    name: "Green",
    color: "#21301B",
    image: assets.colorGreen,
    alt: "Modern kitchen with dark green Sub-Zero cabinetry and terrazzo countertop.",
  },
];

const colorWheelSlots = [
  { x: 88, y: 26 },
  { x: 132, y: 45 },
  { x: 156, y: 88 },
  { x: 132, y: 132 },
  { x: 88, y: 150 },
  { x: 44, y: 132 },
  { x: 20, y: 88 },
  { x: 44, y: 45 },
];

function VisionBand() {
  const [active, setActive] = useState(0);
  const item = colorPaletteItems[active];
  const isLight = item.name === "White Stone" || item.name === "Driftwood Oak" || item.name === "Brown Grain";
  return (
    <section
      data-designer-color-palette
      className={`px-6 py-14 transition-colors duration-500 md:px-6 md:pb-0 md:pt-[72px] ${
        isLight ? "text-[#171715]" : "text-white"
      }`}
      style={{ backgroundColor: item.color }}
      aria-labelledby="designed-to-fit-your-vision"
    >
      <div className="mx-auto max-w-none">
        <div className="mb-10 grid gap-6 md:grid-cols-[660px_minmax(0,1fr)] md:items-start md:gap-10">
          <h2
            id="designed-to-fit-your-vision"
            className="font-serif text-[clamp(2.4rem,2.9vw,3.45rem)] leading-[1.02] md:whitespace-nowrap"
          >
            Designed to fit your vision
          </h2>
          <p
            className={`pt-3 text-[0.98rem] leading-snug ${
              isLight ? "text-[#302e29]/80" : "text-white/82"
            }`}
          >
            No two kitchens are alike. The Designer Series conceals advanced preservation
            technology behind fully-integrated panels, blending effortlessly into any aesthetic.
          </p>
        </div>
        <div className="relative mx-auto">
          <div className="relative aspect-[1.45] min-h-[330px] overflow-hidden md:aspect-[2.42]">
            {colorPaletteItems.map((paletteItem, index) => (
              <Image
                key={paletteItem.name}
                src={paletteItem.image}
                alt={paletteItem.alt}
                fill
                sizes="100vw"
                className={`object-cover transition-opacity duration-500 ${
                  active === index ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={active === index ? "false" : "true"}
                priority={index === 0}
              />
            ))}
          </div>
          <div className="relative h-[118px] text-center">
            <div className="absolute left-1/2 top-[-88px] h-[88px] w-[176px] -translate-x-1/2 overflow-hidden">
              <div
                className="absolute left-1/2 top-0 h-[176px] w-[176px] -translate-x-1/2 rounded-full transition-transform duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 38%, rgba(255,255,255,0.12), rgba(255,255,255,0) 43%), ${item.color}`,
                }}
              >
                <div className="pointer-events-none absolute left-1/2 top-[82px] h-[52px] w-[72px] -translate-x-1/2 rounded-t-full border border-white/25 bg-[#c9c0ad]/55" />
                {colorPaletteItems.map((paletteItem, index) => {
                  const slot = colorWheelSlots[
                    (index - active + colorWheelSlots.length) % colorWheelSlots.length
                  ];

                  return (
                    <button
                      key={paletteItem.name}
                      type="button"
                      aria-label={`Select ${paletteItem.name}`}
                      aria-pressed={active === index}
                      title={paletteItem.name}
                      onClick={() => setActive(index)}
                      className={`absolute h-8 w-8 rounded-full border transition-all duration-500 ease-out ${
                        active === index
                          ? "border-white"
                          : "border-white/50 hover:scale-110"
                      }`}
                      style={{
                        left: slot.x,
                        top: slot.y,
                        backgroundColor: active === index ? "transparent" : paletteItem.color,
                        transform: active === index ? "translate(-50%, -50%) scale(1.03)" : "translate(-50%, -50%)",
                      }}
                    >
                      <span className="sr-only">{paletteItem.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[-4px] z-30 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-white bg-transparent"
            />
            <div className="pt-4">
              <p className={`text-[0.95rem] leading-tight ${isLight ? "text-[#171715]/75" : "text-white/88"}`}>
                Select a color
              </p>
              <p className={`mt-2 text-[0.95rem] font-bold leading-tight ${isLight ? "text-[#171715]" : "text-white"}`}>
                {item.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowroomCta() {
  return (
    <section className="bg-[#f4f2ec] px-5 py-20 text-[#171715] md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1120px] items-center gap-8 bg-[#fbfaf6] px-6 py-6 shadow-sm md:grid-cols-[426px_minmax(0,1fr)] md:gap-[104px] md:px-6 md:py-6">
        <div className="relative aspect-[0.995] overflow-hidden">
          <Image
            src={assets.showroom}
            alt="Showroom consultation."
            fill
            sizes="(min-width: 768px) 426px, calc(100vw - 88px)"
            className="object-cover"
          />
        </div>
        <div className="max-w-none">
          <h2 className="font-serif text-[clamp(2.5rem,3.25vw,3.9rem)] leading-[1.04]">
            Start your journey
            <br />
            in a showroom
          </h2>
          <p className="mt-7 max-w-[420px] text-[1.02rem] leading-[1.35] text-[#171715]">
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

function DesignGallery() {
  const [active, setActive] = useState(0);
  const current = designerAestheticGalleries[active];

  return (
    <section className="bg-[#f4f2ec] px-4 py-16 text-[#171715] md:px-8 md:py-24">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="max-w-[690px] font-serif text-[2rem] leading-[1.08] md:text-[2.35rem] lg:text-[2.7rem]">
          With a host of features hiding in plain sight, Designer Series integrates beautifully
          into any aesthetic.
        </h2>
        <div className="mt-7 flex items-center">
          <div className="inline-flex w-fit rounded-full border border-[#cbc6bb] bg-[#f4f2ec] p-1">
            {designerAestheticGalleries.map((item, index) => (
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
              alt={`${current.tab} Designer Series kitchen inspiration`}
              fill
              sizes="(min-width: 1024px) 908px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[0.82] overflow-hidden bg-[#d7d0c4] lg:aspect-auto lg:h-full">
            <Image
              src={current.images[1]}
              alt={`${current.tab} kitchen with Designer Series refrigeration`}
              fill
              sizes="(min-width: 1024px) 472px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative mt-3 aspect-[2.48] overflow-hidden bg-[#d7d0c4]">
          <Image
            src={current.images[2]}
            alt={`${current.tab} full kitchen design with Designer Series refrigeration`}
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
    <section
      data-designer-model-gallery
      className="overflow-hidden bg-[#f4f2ec] px-4 pb-16 pt-20 text-[#171715] md:px-8 md:pb-24 md:pt-[74px]"
    >
      <div className="mx-auto max-w-[1392px]">
        <div className="grid min-h-[268px] gap-8 lg:grid-cols-[minmax(0,620px)_auto] lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-[3.25rem] leading-[1.07] md:text-[3.75rem] lg:text-[4rem]">
              Personalize to find the perfect fit
            </h2>
            <p className="mt-6 max-w-[610px] text-[1.05rem] leading-[1.46]">
              See how Designer Series blends advanced performance with personalized design. Choose
              from a range of widths, configurations, and limitless exterior options to create a
              look that&apos;s uniquely yours.
            </p>
          </div>
          <Link
            href="/refrigeration/view-all-refrigeration?default.mnseries=Designer+Series"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#171715] px-8 text-[0.95rem] font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white lg:mt-20"
          >
            See all Designer Series Refrigeration
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
                  active === index ? "bg-[#171715] text-white" : "text-[#171715]"
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
            data-aem-asset-id="33766109-c472-4795-9491-701618c42023"
          >
            <Image
              src={assets.expanding}
              alt="Modern kitchen featuring Sub-Zero integrated wood-paneled refrigeration."
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

function CompareSeries() {
  return (
    <section className="bg-[#f4f2ec] px-6 py-20 text-[#171715] md:px-12 md:py-28">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="text-center font-serif text-[clamp(3rem,4vw,4.3rem)] leading-tight">
          Explore more Sub-Zero
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {comparisons.map((item) => (
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
              image: assets.discoverSubZero,
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

export function DesignerSeriesPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <StickyShowroomCta />
      <HeroVideo />
      <IntroBlock />
      <HotspotFeature />
      <HingeFeature />
      <VisionBand />
      <DesignedWithYou
        categories={designerSeriesFeatureCategories}
        title="More Designer Series features"
        copy=""
        ctaLabel={null}
        showTabs={false}
      />
      <ShowroomCta />
      <DesignGallery />
      <ModelGallery />
      <ExpandingImage />
      <CompareSeries />
      <MoreToDiscover />
    </main>
  );
}
