"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const heroVideo = "/assets/subzero/sz-hero.mp4#t=0.001";

const heroPoster =
  "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:62b796d9-e925-4168-bada-74a03f01ae24/as/sz-hero-backup.avif?assetname=sz-hero-backup.png&width=1920&max-quality=90";

const heroPosterSrcSet = [430, 640, 992, 1280, 1440, 1920, 2560, 3840]
  .map(
    (width) =>
      `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:62b796d9-e925-4168-bada-74a03f01ae24/as/sz-hero-backup.avif?assetname=sz-hero-backup.png&width=${width}&max-quality=90 ${width}w`,
  )
  .join(", ");

const assets = {
  immersiveClassic: "/assets/subzero/discover/discover.avif",
  immersiveDesigner: "/assets/subzero/discover/02.avif",
  immersivePro: "/assets/subzero/discover/discover-sub-zero-005c.avif",
  classic:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:4889a049-e540-4492-92b1-49dfe6f3cfd2/as/classic-cl3650u-g-ms-rh-full-exterior-desktop.avif",
  designer:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:3e607d7f-34e5-4711-a0ce-692a448006d8/as/designer-cl3650u-g-ms-rh-full-exterior-desktop.avif",
  pro:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:4ad193d0-e60c-42a8-a342-7f0a52cc9557/as/pro-full-exterior-desktop.avif",
  showroom: "/assets/subzero/discover/SZG_Miami_Showroom_51876.avif",
  specialtyWine: "/assets/subzero/discover/IW-30R_LT_SLG.avif",
  specialtyUndercounter: "/assets/subzero/discover/discover-sub-zero-006b.avif",
  preservationOne:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:ea507c18-6501-4daa-a64d-7d419979a338/as/learn-about-preservation-1.jpg",
  preservationTwo:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:79f9a63f-b157-4d0a-bead-3f3b90dce805/as/learn-about-preservation-2.jpg",
  preservationVideo:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:dd92e0bf-53f7-4588-ac22-60cde7637b9d/as/learn-about-preservation-video.mp4",
  freshness:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:f2a1cb66-2ed2-4cdd-9bbb-077fadf8fcd7/as/Sub_Zero_Euro_Refer_Detail_05.avif?assetname=Sub_Zero_Euro_Refer_Detail_05.jpg",
  intuitive:
    "/assets/subzero/sub-zero-refrigerator-inside.mp4",
  decades: "/assets/subzero/sub-zero-landing-quality.mp4",
  wine:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:2e936d2a-bd0f-4346-93e0-1e0f215ff799/as/wine-storage-desktop.avif",
  undercounter:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:7e647231-6fb3-49fd-bd17-b34e7107607c/as/undercounter-desktop.avif",
  discoverWolf:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:0b25fcce-e900-446e-aad3-a02309cbca8a/as/SZWC_Seattle_1359_4021FC_A_ADOBERGB.avif?assetname=SZWC_Seattle_1359_4021FC_A_ADOBERGB.tif",
  discoverCove:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:390cad36-9e50-4e66-9ae9-feb55e0bd553/as/cove-dishwashing.avif?assetname=cove-dishwashing.jpg",
  discoverOutdoor:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:8a2967b8-7d3d-4ab9-b324-5f4ca6f950bc/as/LG_SLG_042919_3.avif?assetname=LG_SLG_042919_3.tif",
};

const immersiveSeries = [
  {
    id: "classic-series",
    eyebrow: "Classic series",
    title: "An icon for generations",
    cta: "Discover Classic Series",
    href: "/refrigeration/classic-series",
    image: assets.immersiveClassic,
    width: 2560,
    height: 1706,
    alt: "Modern kitchen with navy blue cabinetry, Sub-Zero stainless steel refrigerator, and Wolf stove with white range hood.",
  },
  {
    id: "designer-series",
    eyebrow: "Designer Series",
    title: "Blends in, stands out",
    cta: "Discover Designer Series",
    href: "/refrigeration/designer-series",
    image: assets.immersiveDesigner,
    width: 2560,
    height: 1708,
    alt: "Modern kitchen with Sub-Zero built-in refrigeration, Wolf cooktop, black countertops, wood cabinetry, and stone accent wall.",
  },
  {
    id: "pro-series",
    eyebrow: "PRO Series",
    title: "Engineered to elevate",
    cta: "Discover PRO Series",
    href: "/refrigeration/pro-series",
    image: assets.immersivePro,
    width: 2560,
    height: 3267,
    alt: "Modern kitchen interior with a stainless steel Sub-Zero built-in refrigerator centered against light wood cabinetry.",
  },
];

const productComparison = [
  {
    title: "Classic Series",
    description: "Features the iconic Sub-Zero grille for a timeless look that suits any aesthetic.",
    image: "/assets/subzero/discover/22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_T_R_SH.avif",
    href: "/refrigeration/classic-series",
    finishes: ["Stainless Steel", "Panel Ready"],
    widths: ['30"', '36"', '42"', '48"'],
    models: ["Side-by-Side", "Over-and-Under", "French Door", "Column", "Wine Storage"],
    personalization:
      "Stainless-steel exterior and tubular or pro handles to match other Sub-Zero, Wolf, and Cove products.",
  },
  {
    title: "Designer Series",
    description: "Built to accept custom panels and blend seamlessly into your unique kitchen design.",
    image: "/assets/subzero/discover/DET3650R_R_SH.avif",
    href: "/refrigeration/designer-series",
    finishes: ["Panel Ready", "Stainless Steel (Optional)"],
    widths: ['18"', '24"', '30"', '36"'],
    models: ["Over-and-Under", "Column", "Wine Storage", "Undercounter"],
    personalization:
      "Stainless-steel exterior and tubular or pro handles to match other Sub-Zero, Wolf, and Cove products.",
  },
  {
    title: "PRO Series",
    description: "Professional-grade quality in a striking form with stainless steel inside and out.",
    image: "/assets/subzero/discover/SILO_PRO3650-RH_PIK_120618_SH.avif",
    href: "/refrigeration/pro-series",
    finishes: ["Stainless Steel"],
    widths: ['36"', '48"'],
    models: ["Side-by-Side", "Over-and-Under"],
    personalization: "Stainless steel or glass door models.",
  },
];

const productTypes = [
  {
    title: "Side-by-side",
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fside-by-side",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:85466422-77aa-4c53-ab1f-f26ea58833df/renditions/original/as/Side-by-Side.svg?assetname=Side-by-Side.svg",
  },
  {
    title: "Over-and-under",
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fover-and-under",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3f9421fd-c669-4492-ac3c-a1b4286eb7d7/renditions/original/as/Over-and-Under.svg?assetname=Over-and-Under.svg",
  },
  {
    title: "French door",
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Ffrench-doors",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:82ae348a-0830-437a-8164-99bb624af6e1/renditions/original/as/French-Door.svg?assetname=French%20Door.svg",
  },
  {
    title: "Column freezer",
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fcolumn",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:93a4f04d-050f-4498-8871-f06558d22f0b/renditions/original/as/Column-Freezer.svg?assetname=Column%20Freezer.svg",
  },
  {
    title: "Column refrigeration",
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fcolumn-refrigeration",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:640e7e31-3a61-4ba8-8c7c-f33269dbb3b0/renditions/original/as/Column-Refrigeration.svg?assetname=Column%20Refrigeration.svg",
  },
  {
    title: "Undercounter",
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fundercounter",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:eaa9787b-5f84-46d7-9371-e20817c72080/renditions/original/as/Undercounter.svg?assetname=Undercounter.svg",
  },
  {
    title: "Wine storage",
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:d78ebc4a-be59-49a8-8020-a5605eb48954/renditions/original/as/Wine-Storage.svg?assetname=Wine%20Storage.svg",
  },
  {
    title: "Drawers",
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fdesigner-drawers",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:e5cd5e14-f847-4d7a-931a-dab275effc3e/renditions/original/as/Drawers.svg?assetname=Drawers.svg",
  },
  {
    title: "Ice Makers",
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fice-maker",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:b90480bb-ea65-4790-816f-5abc157306e3/renditions/original/as/Ice-Makers.svg?assetname=Ice%20Makers.svg",
  },
];

const designCarouselGroups = [
  {
    tab: "Transitional",
    slides: [
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:87dd0c1a-c1c4-490c-9237-a1a3b29ae631/as/TriBrand_Gladwyne_PA_55378.avif?assetname=TriBrand_Gladwyne_PA_55378.tif&width=1440&max-quality=90",
        alt: "Modern transitional kitchen with vaulted ceiling, marble island, warm wood cabinetry, and integrated Sub-Zero refrigeration.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:6acfd733-88de-4c17-9774-33e4b586e700/as/W_SPO2450TE_S_T_Overall.avif?assetname=W_SPO2450TE_S_T_Overall.tif&width=1440&max-quality=90",
        alt: "Transitional kitchen with cream cabinetry, stone wall, dark island, and stainless steel appliances.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:94f7adb6-bb89-412c-96e6-01fbeb49a426/as/LG_TCSLG_111621_Nat_Sophis_Refrigeration_OA.avif?assetname=LG_TCSLG_111621_Nat_Sophis_Refrigeration_OA.jpg&width=1440&max-quality=90",
        alt: "Sophisticated kitchen featuring a classic French door refrigerator.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:902166d3-b002-4391-8fea-d2ac16b3bd57/as/MED_SLG_LIVINGRM_DEU_3.avif?assetname=MED_SLG_LIVINGRM_DEU_3.tif&width=1440&max-quality=90",
        alt: "Living room bar with integrated refrigeration.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:4530a1ed-9858-4c88-a713-0ddead5ef6c9/as/MED_SLG_043019_14_856.avif?assetname=MED_SLG_043019_14_856.tif&width=1440&max-quality=90",
        alt: "Elegant modern kitchen with dark marble island, open shelving, and glass-door refrigeration.",
      },
    ],
  },
  {
    tab: "Traditional",
    slides: [
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:36d68ebb-1e1c-4e7b-b9fc-291b1e6fe305/as/Finchley-Rd-SS-20.avif?assetname=Finchley-Rd-SS-20.jpg&width=1440&max-quality=90",
        alt: "Traditional kitchen with paneled refrigeration and refined cabinetry.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:fb544016-e4ec-4fe5-80a2-bd311768b7bd/as/SZWC_IR_Hype_56193_R_RGB.avif?assetname=SZWC_IR_Hype_56193_R_RGB.tif&width=1440&max-quality=90",
        alt: "Traditional kitchen with wine storage and integrated refrigeration.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:e144574f-107a-4554-9e59-32d532d538a0/as/ICB648PRO_ICBDF606CG_ICBPW602718.avif?assetname=ICB648PRO_ICBDF606CG_ICBPW602718.tif&width=1440&max-quality=90",
        alt: "Classic kitchen with professional-grade Sub-Zero and Wolf appliances.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:7b7e61b5-e5c4-4814-a725-52f58cc04f97/as/LG_SLG_062921_4.avif?assetname=LG_SLG_062921_4.tif&width=1440&max-quality=90",
        alt: "Traditional kitchen with warm cabinetry and premium refrigeration.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:22674b65-6541-4a1f-8f3d-93bd3c724511/as/SZG_AdamTaylorKitchen_AT_03_Medium.avif?assetname=SZG_AdamTaylorKitchen_AT_03_Medium.jpg&width=1440&max-quality=90",
        alt: "Traditional kitchen inspiration with integrated Sub-Zero refrigeration.",
      },
    ],
  },
  {
    tab: "Contemporary",
    slides: [
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:0089c9d3-27b8-4843-8b6f-b1ca6924b6f3/as/BOULANGER_LG_KDC_15-16_81717_3_PRIMARY_carousel.avif?assetname=BOULANGER_LG_KDC_15-16_81717_3_PRIMARY_carousel.jpg&width=1440&max-quality=90",
        alt: "Contemporary kitchen with sleek cabinetry and integrated appliances.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:62f35ee7-6588-46b7-99ce-b740f3f0345e/as/med_tc_121218_4_carousel.avif?assetname=med_tc_121218_4_carousel.jpg&width=1440&max-quality=90",
        alt: "Modern kitchen inspiration with clean lines and integrated refrigeration.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:5eec95ee-9bc3-4ae6-8c78-5911c2771f3d/as/V2_22_06_09_Retouch_SteamOvens_SubZero_Toolbox_CoffeeMachine_Bold_v2.avif?assetname=V2_22_06_09_Retouch_SteamOvens_SubZero_Toolbox_CoffeeMachine_Bold_v2.jpg&width=1440&max-quality=90",
        alt: "Bold contemporary kitchen with Sub-Zero and Wolf appliances.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:1c724a79-5c64-496e-9e5b-47cac10c039b/as/SZ_Elemental_TCS_091323_13.avif?assetname=SZ_Elemental_TCS_091323_13.tif&width=1440&max-quality=90",
        alt: "Elemental contemporary kitchen with built-in refrigeration.",
      },
      {
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:4dd9983b-9a40-4a44-b73f-482f73ba9ffe/as/LG_SLGTC_Euro_041223_1.avif?assetname=LG_SLGTC_Euro_041223_1.jpg&width=1440&max-quality=90",
        alt: "Contemporary kitchen with beverage center and wine units.",
      },
    ],
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
      className="section hero-container relative h-[100svh] overflow-hidden bg-[#111]"
      data-palette="none"
      data-brand="sub-zero"
      role="region"
    >
      <div className="hero-wrapper h-full">
        <div className="hero block h-full">
          <div className="relative h-full">
            <div
              className="media-item-wrapper hero-media-video relative h-full"
              role="group"
              aria-label="woman smiling while placing a plate of salad into an open Sub-Zero refrigerator"
            >
              <div className="frame h-full">
                <video
                  ref={videoRef}
                  className="block h-full w-full object-cover"
                  poster={heroPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex={-1}
                >
                  <source type="video/mp4" src={heroVideo} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    loading="eager"
                    srcSet={heroPosterSrcSet}
                    sizes="100vw"
                    src={heroPoster}
                  />
                </video>
              </div>
              <div className="absolute bottom-5 right-5 z-30 md:bottom-8 md:right-8">
                <button
                  type="button"
                  className="group grid h-[60px] w-[60px] place-items-center rounded-full text-white outline-none transition hover:text-[#f4f2ec] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label={isPaused ? "Play" : "Pause"}
                  aria-pressed={!isPaused}
                  onClick={toggleVideo}
                >
                  <svg
                    className="h-[60px] w-[60px]"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="30" cy="30" r={radius} stroke="rgba(255,255,255,0.28)" strokeWidth="3" />
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
                    <circle cx="30" cy="30" r="20" fill="rgba(0,0,0,0.68)" />
                    {isPaused ? (
                      <path d="M25 20L40 30L25 40V20Z" fill="currentColor" />
                    ) : (
                      <>
                        <rect x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
                        <rect x="33" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
                      </>
                    )}
                  </svg>
                  <span className="sr-only">Video</span>
                </button>
              </div>
            </div>
            <div className="layer pointer-events-none absolute inset-0 bg-black/12" />
            <div className="hero-banner-title layer pointer-events-none absolute inset-0 flex items-end">
              <div />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoPanel({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

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

  return (
    <div className="relative aspect-[1.08] overflow-hidden bg-[#e1ddd2]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      />
      <button
        type="button"
        className="absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-full text-white outline-none transition focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:bottom-4 md:right-4"
        aria-label={isPaused ? "Play" : "Pause"}
        aria-pressed={!isPaused}
        onClick={toggleVideo}
      >
        <svg
          className="h-12 w-12"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="30" cy="30" r="24" stroke="rgba(255,255,255,0.45)" strokeWidth="3" />
          <circle cx="30" cy="30" r="20" fill="rgba(0,0,0,0.68)" />
          {isPaused ? (
            <path d="M25 20L40 30L25 40V20Z" fill="currentColor" />
          ) : (
            <>
              <rect x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
              <rect x="33" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
            </>
          )}
        </svg>
        <span className="sr-only">Video</span>
      </button>
    </div>
  );
}

function ImmersiveSeries() {
  return (
    <section
      className="immersive-hero-container bg-[#e7e3d8]"
      data-palette="stone--dark"
      role="region"
      aria-label="Sub-Zero refrigeration series"
    >
      {immersiveSeries.map((item) => (
        <div key={item.title} className="immersive-hero-wrapper">
          <article
            className="immersive-hero block relative h-[100svh] overflow-hidden bg-[#171715] bg-cover bg-center"
            data-block-name="immersive-hero"
            data-brand="sub-zero"
            aria-label={item.alt}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="immersive-hero-layer layer absolute inset-0">
              <div className="absolute inset-0 bg-black/18" />
              <div className="immersive--text-gradient pointer-events-none absolute inset-x-0 top-0 h-[42svh] bg-gradient-to-b from-black/64 via-black/28 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36svh] bg-gradient-to-t from-black/50 via-black/18 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between px-8 pb-12 pt-12 text-white md:px-12 md:pb-14 md:pt-14 lg:px-12">
                <div className="immersive-hero-title-wrapper relative w-full max-w-[860px]">
                  <div className="immersive-hero-content flow relative">
                    <h4 id={item.id} className="flow">
                      <span className="eyebrow block text-[0.7rem] font-semibold uppercase tracking-[0.34em] md:text-xs">
                        {item.eyebrow}
                      </span>
                      <span className="immersive-hero-title mt-5 block font-serif text-[clamp(3.4rem,4.2vw,5rem)] leading-[0.96]">
                        {item.title}
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="immersive-hero-buttons-wrapper immersive-hero-content cluster">
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-[#171715] transition hover:bg-[#e8e4d8]"
                  >
                    {item.cta}
                  </Link>
                </div>
              </div>
            </div>
            <div className="trigger-line absolute left-0 top-[55%] w-full" />
          </article>
        </div>
      ))}
    </section>
  );
}

function ProductComparison() {
  const renderList = (items: string[], withDots = false) => (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          {withDots ? (
            <span className="mt-[0.2rem] h-3 w-3 rounded-full border border-[#b7b3aa] bg-gradient-to-br from-[#f4f2ec] to-[#8d8981]" />
          ) : null}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="bg-[#f4f2ec] px-6 pb-14 pt-10 md:px-12 md:pb-20 md:pt-12">
      <div className="mx-auto max-w-[1320px]">
        <h2 className="text-center font-serif text-[clamp(3rem,3.7vw,4.35rem)] leading-tight">
          View all Sub-Zero products
        </h2>
        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {productComparison.map((product) => (
            <article
              key={product.title}
              className="px-8 pb-8 pt-10 transition-colors duration-300 hover:bg-[#efede7]"
            >
              <div className="relative mx-auto h-[205px] w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 320px, 70vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-8 text-center">
                <h3 className="font-serif text-[clamp(2.1rem,2.4vw,2.8rem)] leading-none">
                  {product.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[330px] text-[0.95rem] leading-tight">
                  {product.description}
                </p>
                <div className="mt-5 flex justify-center gap-4">
                  <Link
                    href={product.href}
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#171715] px-6 text-[0.82rem] font-bold text-white"
                  >
                    View models
                  </Link>
                  <Link
                    href={product.href}
                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#171715] px-6 text-[0.82rem] font-bold text-[#171715]"
                  >
                    Learn more
                  </Link>
                </div>
              </div>

              <div className="mt-8 divide-y divide-[#171715]/70 border-y border-[#171715]/70 text-[0.95rem] leading-tight">
                <div className="grid grid-cols-[0.48fr_0.52fr] gap-7 py-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em]">Finish</p>
                  {renderList(product.finishes, true)}
                </div>
                <div className="grid grid-cols-[0.48fr_0.52fr] gap-7 py-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em]">Width</p>
                  {renderList(product.widths)}
                </div>
                <div className="grid grid-cols-[0.48fr_0.52fr] gap-7 py-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em]">Models</p>
                  {renderList(product.models)}
                </div>
                <div className="grid grid-cols-[0.48fr_0.52fr] gap-7 py-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em]">
                    Personalization
                  </p>
                  <p>{product.personalization}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignInspirationCarousel() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeGroup = designCarouselGroups[activeTab];
  const slide = activeGroup.slides[activeSlide];

  const goToTab = (index: number) => {
    setActiveTab(index);
    setActiveSlide(0);
  };

  const goToPrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? activeGroup.slides.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveSlide((current) =>
      current === activeGroup.slides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="bg-[#e7e3d8] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1290px]">
        <h2 className="max-w-[820px] font-serif text-[clamp(3rem,3.35vw,4rem)] leading-[1.08] text-[#171715]">
          Traditional. Modern. Industrial.
          <br />
          Dive deeper into design and
          <br />
          start envisioning your space.
        </h2>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex w-fit rounded-full border border-[#cbc6bb] bg-[#f5f3ec] p-1">
            {designCarouselGroups.map((group, index) => {
              const isActive = index === activeTab;
              return (
                <button
                  key={group.tab}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => goToTab(index)}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-[#171715] text-white"
                      : "text-[#171715] hover:bg-white"
                  }`}
                >
                  {group.tab}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-5 text-sm text-[#171715]">
            <p aria-live="polite">
              {activeSlide + 1} / {activeGroup.slides.length}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={goToPrevious}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#171715] transition hover:bg-[#171715]"
              >
                <span className="block h-2.5 w-2.5 rotate-[225deg] border-r border-t border-[#171715] transition group-hover:border-white" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={goToNext}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#171715] transition hover:bg-[#171715]"
              >
                <span className="block h-2.5 w-2.5 rotate-45 border-r border-t border-[#171715] transition group-hover:border-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-7 aspect-[1.78] overflow-hidden bg-[#171715]">
          <Image
            key={`${activeTab}-${activeSlide}`}
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="1290px"
            className="object-cover"
          />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="https://www.subzero-wolf.com/inspiration/kitchens#numberOfResults=20"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white"
          >
            See more inspiration
          </Link>
        </div>
      </div>
    </section>
  );
}

function DiscoverMoreBrands() {
  return (
    <section className="bg-[#cbc7bc] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="mb-10 font-serif text-[clamp(3rem,3.5vw,4rem)] leading-none text-[#171715]">
          Discover more
        </h2>

        <div className="grid gap-0.5 bg-white">
          <article className="grid bg-[#fbfaf6] md:grid-cols-[0.255fr_0.745fr]">
            <div className="flex min-h-[385px] flex-col justify-between p-7 md:min-h-[540px] md:p-9">
              <div>
                <h3 className="font-serif text-[clamp(2.15rem,2.6vw,3rem)] leading-[0.98] text-[#171715]">
                  Effortless control,
                  <br />
                  flawless flavor
                </h3>
                <p className="mt-8 max-w-[260px] text-[0.95rem] leading-tight text-[#171715]">
                  Wolf equips cooks of every level with the confidence to create exquisite meals
                  time and time again.
                </p>
              </div>
              <Link
                href="/cooking"
                className="inline-flex min-h-[34px] w-fit items-center justify-center rounded-full border border-[#171715] px-5 text-xs font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white"
              >
                Explore Wolf
              </Link>
            </div>
            <div className="relative min-h-[385px] overflow-hidden md:min-h-[540px]">
              <Image
                src={assets.discoverWolf}
                alt="Wolf range with red knobs in a bright kitchen."
                fill
                sizes="1035px"
                className="object-cover"
              />
            </div>
          </article>

          <div className="grid gap-0.5 md:grid-cols-2">
            {[
              {
                title: "A pristine and peaceful clean",
                copy: "Your silent partner in the kitchen, Cove's intuitive, customizable features offer a worry-free wash and dry.",
                cta: "Explore Cove",
                href: "/cove",
                image: assets.discoverCove,
                alt: "Open Cove dishwasher with dishes loaded inside.",
              },
              {
                title: "Exceptional outdoor living",
                copy: "Entertain confidently outdoors with the same superior refrigeration and cooking technologies you trust from Sub-Zero and Wolf.",
                cta: "Explore Outdoor",
                href: "/outdoor",
                image: assets.discoverOutdoor,
                alt: "Outdoor kitchen and dining space with premium appliances.",
              },
            ].map((item) => (
              <article key={item.title} className="bg-[#fbfaf6]">
                <div className="relative min-h-[285px] overflow-hidden md:min-h-[365px]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="696px"
                    className="object-cover"
                  />
                </div>
                <div className="grid min-h-[175px] gap-7 p-7 md:grid-cols-[0.47fr_0.53fr] md:p-8">
                  <div className="flex flex-col justify-between gap-5">
                    <h3 className="font-serif text-[clamp(2.05rem,2.4vw,2.75rem)] leading-[0.98] text-[#171715]">
                      {item.title}
                    </h3>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[34px] w-fit items-center justify-center rounded-full border border-[#171715] px-5 text-xs font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white"
                    >
                      {item.cta}
                    </Link>
                  </div>
                  <p className="text-[0.9rem] leading-tight text-[#171715]">
                    {item.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DiscoverSubZeroPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <HeroVideo />

      <section className="px-6 pb-7 pt-8 md:px-12 md:pb-8 md:pt-10">
        <div className="mx-auto flex max-w-[1392px] flex-col items-center text-center">
          <Image
            src="/assets/subzero/sub-zero-logo.svg"
            alt="Sub-Zero"
            width={156}
            height={36}
            className="h-auto w-[118px] md:w-[132px]"
            priority
          />
          <h1 className="mt-6 max-w-[980px] font-serif text-[clamp(2.75rem,3.25vw,4rem)] leading-[1.06] lg:whitespace-nowrap">
            The pinnacle of food preservation
          </h1>
          <p className="mt-5 max-w-[860px] text-base leading-snug text-[#171715] md:text-lg">
            Remarkable innovation. Timeless design. For generations, Sub-Zero refrigerators and
            freezers have forged a legendary legacy, defining an icon.
          </p>
          <div className="mt-6">
            <Link
              href="/showroom"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#171715] px-9 text-sm font-bold text-white transition hover:bg-[#34322e]"
            >
              Experience in the showroom
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-10 md:px-12 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid items-center gap-12 lg:grid-cols-[0.56fr_0.44fr] lg:gap-12">
            <div className="relative aspect-[1.08] overflow-hidden bg-[#e1ddd2]">
              <Image
                src={assets.freshness}
                alt="Fresh vegetables in a Sub-Zero refrigerator drawer"
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:pl-3">
              <h3 className="font-serif text-[clamp(2.35rem,3vw,3rem)] leading-tight">
                Peak freshness, longer
              </h3>
              <p className="mt-5 max-w-[440px] text-base leading-snug text-[#171715]">
                With revolutionary dual refrigeration, air purification, and vacuum-sealed doors,
                our products help keep your fruits bright and flavorful, your vegetables crisp, and
                your proteins in their prime longer.
              </p>
            </div>
          </div>

          <div className="mt-24 grid items-center gap-12 lg:grid-cols-[0.44fr_0.56fr] lg:gap-12">
            <div className="lg:pr-3">
              <h3 className="font-serif text-[clamp(2.2rem,2.35vw,2.85rem)] leading-tight lg:whitespace-nowrap">
                Intuitive and thoughtful
              </h3>
              <p className="mt-6 max-w-[520px] text-[clamp(1rem,1.05vw,1.12rem)] leading-snug text-[#171715]">
                With ClearSight<sup className="text-[0.55em]">&reg;</sup> LED lighting that fully
                illuminates the interior, Night Mode for dim environments, and a flip-up dairy
                compartment for added convenience, every detail enhances the experience of owning a
                full-size Sub-Zero.
              </p>
            </div>
            <VideoPanel src={assets.intuitive} label="Sub-Zero refrigerator interior video" />
          </div>

          <div className="mt-24 grid items-center gap-12 lg:grid-cols-[0.56fr_0.44fr] lg:gap-12">
            <VideoPanel src={assets.decades} label="Sub-Zero product quality video" />
            <div className="lg:pl-3">
              <h3 className="font-serif text-[clamp(2.2rem,2.35vw,2.85rem)] leading-tight">
                Yours for decades to come
              </h3>
              <p className="mt-6 max-w-[520px] text-[clamp(1rem,1.05vw,1.12rem)] leading-snug text-[#171715]">
                Our legendary reliability starts with advanced engineering, superior-grade
                materials, and exacting craftsmanship. Exhaustive testing on every component ensures
                your Sub-Zero can handle at least 20 years of everyday use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProductComparison />

      <section className="bg-[#e7e3d8] px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-[1120px] items-center bg-[#fbfaf6] p-6 md:grid-cols-[426px_1fr] md:gap-16 lg:gap-[104px]">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={assets.showroom}
              alt="Showroom consultation with Sub-Zero and Wolf appliances"
              fill
              sizes="(min-width: 1024px) 430px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center py-8 md:py-0">
            <h2 className="max-w-[520px] font-serif text-[clamp(3rem,3.2vw,4rem)] leading-[1.05]">
              <span className="block md:whitespace-nowrap">Start your journey</span>
              <span className="block">in a showroom</span>
            </h2>
            <p className="mt-7 max-w-[470px] text-[1.05rem] leading-snug text-[#171715] md:text-[1.08rem]">
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

      <ImmersiveSeries />

      <section className="bg-[#e7e3d8] px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1392px]">
          <h2 className="font-serif text-[clamp(3rem,3.3vw,4rem)] leading-tight text-[#171715]">
            Specialty Refrigeration
          </h2>
          <div className="mt-7 grid gap-2 lg:grid-cols-2">
            {[
              {
                title: "Wine storage",
                href: "/refrigeration/wine-storage",
                image: assets.specialtyWine,
                alt: "Built-in Sub-Zero wine refrigerator integrated into blue kitchen cabinetry with wooden shelves and glass door.",
              },
              {
                title: "Undercounter",
                href: "/refrigeration/undercounter",
                image: assets.specialtyUndercounter,
                alt: "Open Sub-Zero undercounter refrigerator drawer with beverages and fresh produce inside.",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative block aspect-square overflow-hidden bg-[#171715]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 696px, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/12 to-transparent" />
                <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/12" />
                <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-6 text-white md:bottom-8">
                  <h2 className="font-serif text-[clamp(2.25rem,2.45vw,2.9rem)] leading-none">
                    {item.title}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="mb-2 block h-3 w-3 shrink-0 rotate-45 overflow-hidden border-r border-t border-white/45 text-[0px] transition group-hover:border-white"
                  >
                    ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e7e3d8] px-6 pb-20 pt-20 md:px-12 md:pb-28 md:pt-36">
        <div className="mx-auto grid max-w-[1392px] overflow-hidden bg-[#fbfaf6] lg:min-h-[696px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-7 py-14 md:px-16 lg:px-6 xl:px-6">
            <div className="mx-auto w-full max-w-[580px]">
              <p className="text-[0.78rem] font-medium uppercase tracking-[0.38em] text-[#2b2925]">
                Designer undercounter ice maker
              </p>
              <h2 className="mt-8 font-serif text-[clamp(3.35rem,4vw,4.35rem)] leading-[1.02] text-[#171715]">
                The future of ice
                <br />
                making is here
              </h2>
              <p className="mt-8 max-w-[500px] text-[1.05rem] leading-snug text-[#3b3934] md:text-lg">
                Created for luxury homes where quiet, convenience, and performance matter.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products/designer-undercounter-indoor-outdoor-clear-ice-maker-de50i/de50i"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171715] px-8 text-base font-bold text-white transition hover:bg-[#34322e]"
                >
                  View product
                </Link>
                <Link
                  href="/refrigeration/undercounter/designer-ice-maker"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#171715] px-8 text-base font-bold text-[#171715] transition hover:bg-[#171715] hover:text-white"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
          <div className="relative min-h-[520px] overflow-hidden lg:min-h-[696px]">
            <Image
              src="/assets/subzero/dice-unveil-cut-wr.avif"
              alt="The New Designer Undercounter Ice Maker from Sub-Zero showcased in a black room, sitting on blocks of ice."
              fill
              sizes="(min-width: 1024px) 696px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#e7e3d8] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1392px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-serif text-[clamp(2.45rem,3vw,3.35rem)] leading-tight text-[#171715]">
                A higher standard of refrigeration
              </h2>
              <p className="mt-4 max-w-[470px] text-sm leading-snug text-[#171715]">
                From fresh foods to treasured wines to the clearest ice, Sub-Zero promises advanced
                preservation and lasting quality anywhere you need it.
              </p>
            </div>
            <Link
              href="/refrigeration/view-all-refrigeration"
              className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#171715] px-7 text-sm font-bold text-white transition hover:bg-[#34322e]"
            >
              View all Sub-Zero products
            </Link>
          </div>

          <div className="mt-12 grid border-l border-t border-[#cbc6bb] sm:grid-cols-2 lg:grid-cols-3">
            {productTypes.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-[300px] flex-col justify-between border-b border-r border-[#cbc6bb] bg-[#e7e3d8] px-5 pb-7 pt-14 transition duration-300 hover:bg-[#f7f5ef] lg:min-h-[456px] lg:px-7 lg:pb-9 lg:pt-20"
              >
                <div className="relative mx-auto h-[190px] w-full max-w-[190px] lg:h-[285px] lg:max-w-[270px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 270px, 190px"
                    className="object-contain transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-7 font-serif text-[1.75rem] leading-none text-[#171715] lg:text-[2.05rem]">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DesignInspirationCarousel />

      <DiscoverMoreBrands />
    </main>
  );
}
