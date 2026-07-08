"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DesignedWithYou } from "@/components/Home/DesignedWithYou";

const aem = (id: string, file: string, width = 1920) =>
  `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:${id}/as/${file}&width=${width}&max-quality=90`;

const aemSvg = (id: string, file: string) =>
  `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:${id}/renditions/original/as/${file}`;

const assets = {
  heroVideo: "/assets/subzero/undercounter/Undercounter-hero.mp4",
  heroPoster: aem(
    "6d98d052-9046-4db5-b992-b4002c84c746",
    "undercounter-fallback.avif?assetname=undercounter-fallback.png",
    2560,
  ),
  iceMaker:
    "/assets/subzero/dice-unveil-cut-wr.avif",
  refined: aem(
    "5488f716-14a4-4750-ae3b-c651be4d0b32",
    "SZ_Elemental_TCS_091323_14.avif?assetname=SZ_Elemental_TCS_091323_14.tif",
    1440,
  ),
  entertain: aem(
    "ab3b753d-7f07-45d0-89bf-6e578bb28803",
    "LG_SLG_LIVINGRM_DEU_2.avif?assetname=LG_SLG_LIVINGRM_DEU_2.tif",
    1440,
  ),
  overperform: aem(
    "38321b61-a6ee-4b63-aef5-bd37ef95cab6",
    "SM_SLG_042919_3.avif?assetname=SM_SLG_042919_3.tif",
    1440,
  ),
  convenience: aem(
    "29f35cec-ee46-4248-999d-04a7112aeb02",
    "Minimal_European_Kitchen_Mid_06_2.avif?assetname=Minimal_European_Kitchen_Mid_06_2.jpg",
    1440,
  ),
  flexibility: aem(
    "22dedbba-0e49-4360-88e7-34582c824d91",
    "21-SUBZERO_DEU-UNDERCOUNTER-PRODUCT_2_CAMEO-A_(F02).avif?assetname=21-SUBZERO_DEU-UNDERCOUNTER-PRODUCT_2_CAMEO-A_%28F02%29.png",
    1440,
  ),
  showroom: "/assets/subzero/discover/SZG_Miami_Showroom_51876.avif",
  inspirationOne: aem(
    "80fb348d-fa21-4137-b61e-83117cc5bb12",
    "MED_SLG_CLOSET_DEU_02.avif?assetname=MED_SLG_CLOSET_DEU_02.jpg",
    1440,
  ),
  inspirationTwo: aem(
    "3ec67a7a-7b30-4312-b6ca-611c18c8f75d",
    "LG_BSTYLE_091719_5.avif?assetname=LG_BSTYLE_091719_5.jpg",
    1440,
  ),
  inspirationThree: aem(
    "b7fb1430-e86c-4cb8-bb2d-8531e41f02a2",
    "Sm_slg_caligreen_deu_7.avif?assetname=Sm_slg_caligreen_deu_7.png",
    1440,
  ),
  inspirationFour: aem(
    "cc267e33-4923-4ffa-9c62-d6faa557adf7",
    "MED_SLGTC_Euro_041223_6.avif?assetname=MED_SLGTC_Euro_041223_6.jpeg",
    1440,
  ),
  inspirationFive: aem(
    "7b7e61b5-e5c4-4814-a725-52f58cc04f97",
    "LG_SLG_062921_4.avif?assetname=LG_SLG_062921_4.tif",
    1440,
  ),
  ranges: aem(
    "c060bf7c-de9d-4cb2-98b3-6064b83c3cf5",
    "W_BohoBelize_IR36551_Close_006.avif?assetname=W_BohoBelize_IR36551_Close_006.jpg",
    1200,
  ),
  outdoor: aem(
    "8087b6ca-7f7d-451c-8196-e766d449ec06",
    "SM_OG30_WWD30_TCS_020316_1.avif?assetname=SM_OG30_WWD30_TCS_020316_1.jpg",
    1200,
  ),
  overview: aem(
    "45bd0bf4-1368-4015-931d-34c45d46e1e4",
    "SZWC_PA_0342_4021FC_A_GraCol2006.avif?assetname=SZWC_PA_0342_4021FC_A_GraCol2006.jpg",
    900,
  ),
  whyUs: aem(
    "86a9f640-dd9a-4dc2-b2e1-c026a850c307",
    "Sub-Zero-day-1-7995.avif?assetname=Sub-Zero+day+1-7995.jpg",
    900,
  ),
};

const productTypes = [
  {
    title: "Refrigeration",
    image: aemSvg("79faaed1-ef39-4799-96bb-497ef2d75e6b", "DEU_Refrigeration.svg?assetname=DEU_Refrigeration.svg"),
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fundercounter",
  },
  {
    title: "Wine Storage",
    image: aemSvg("c3afbf3c-5f1f-4769-9f53-1b7c2f6830cf", "DEU_Wine-Storage.svg?assetname=DEU_Wine+Storage.svg"),
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fwine-storage%2Fundercounter",
  },
  {
    title: "Drawers",
    image: aemSvg("b53b975e-8b6d-420f-90ab-b1f0d9e00240", "DEU_Drawers.svg?assetname=DEU_Drawers.svg"),
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fdesigner-drawers",
  },
  {
    title: "Beverage Centers",
    image: aemSvg("154c80b4-a79c-4c72-b0ea-f94977a56c06", "DEU_Beverage-Center.svg?assetname=DEU_Beverage+Center.svg"),
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fbeverage-centers",
  },
  {
    title: "Ice Makers",
    image: aemSvg("5f2dc876-91c1-4a8b-9cb3-0b29423a797b", "DEU_Ice-makers.svg?assetname=DEU_Ice+makers.svg"),
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fice-maker",
  },
];

const inspirationCategories = [
  {
    label: "Undercounter",
    images: [
      assets.inspirationOne,
      assets.inspirationTwo,
      assets.inspirationThree,
      assets.inspirationFour,
      assets.inspirationFive,
    ],
  },
];

const undercounterLayeredSlides = [
  {
    title: "Refined refreshment",
    image: assets.refined,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fbeverage-centers",
    alt: "Modern lounge kitchenette with Sub-Zero undercounter beverage and wine storage.",
  },
  {
    title: "Entertain in style",
    image: assets.entertain,
    href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fundercounter",
    alt: "Elegant lounge with undercounter refrigeration and bar storage.",
  },
];

function VideoButton({ isPaused, progress }: { isPaused: boolean; progress: number }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg className="h-[60px] w-[60px]" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <circle cx="30" cy="30" r={radius} stroke="rgba(255,255,255,0.45)" strokeWidth="3" />
      <circle
        cx="30"
        cy="30"
        r={radius}
        stroke="currentColor"
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
      <circle cx="30" cy="30" r="20" fill="rgba(0,0,0,0.72)" />
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

function Hero() {
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      void video.play().then(syncVideoState).catch(syncVideoState);
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    syncVideoState();

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().then(syncVideoState).catch(syncVideoState);
    } else {
      video.pause();
      syncVideoState();
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#111110]">
      <video
        ref={videoRef}
        poster={assets.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        onLoadedMetadata={syncVideoState}
        onTimeUpdate={syncVideoState}
        onPlay={syncVideoState}
        onPause={syncVideoState}
      >
        <source src={assets.heroVideo} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/55 via-black/16 to-transparent" />
      <button
        type="button"
        aria-label={isPaused ? "Play" : "Pause"}
        aria-pressed={!isPaused}
        onClick={toggleVideo}
        className="absolute bottom-7 right-7 z-30 grid h-[60px] w-[60px] place-items-center rounded-full text-white outline-none transition focus-visible:ring-2 focus-visible:ring-white"
      >
        <VideoButton isPaused={isPaused} progress={progress} />
        <span className="sr-only">Video</span>
      </button>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-24 pt-14 text-[#171715] md:px-12 md:pb-36 md:pt-16">
      <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
        <Image
          src="/assets/subzero/sub-zero-logo.svg"
          alt="Sub-Zero"
          width={156}
          height={36}
          className="h-auto w-[118px] md:w-[132px]"
          priority
        />
        <h1 className="mt-7 max-w-[912px] font-serif text-[clamp(3.35rem,5vw,5rem)] leading-[1.02]">
          The art of anywhere refrigeration
        </h1>
        <p className="mt-6 max-w-[760px] text-[1rem] leading-snug md:text-[1.08rem]">
          Add comfort and convenience to your master suite. Create a stunning cocktail bar-ice
          included-in the study. And complete your outdoor kitchen with cool drinks and tasty snacks
          ready to serve poolside. Sub-Zero Undercounter Refrigeration integrates seamlessly wherever
          you need it most. It&apos;s truly anywhere refrigeration.
        </p>
        <Link
          href="/showroom"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#171715] px-9 text-sm font-bold text-white transition hover:bg-[#34322e]"
        >
          Experience in a showroom
        </Link>
      </div>
    </section>
  );
}

function IceMakerPromo() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-32 text-[#171715] md:px-12 md:pb-32">
      <div className="mx-auto grid max-w-[1392px] overflow-hidden bg-[#fbfaf7] lg:h-[696px] lg:grid-cols-2">
        <div className="flex min-h-[520px] flex-col justify-center px-6 py-10 md:px-7 md:py-14 lg:min-h-0">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em]">
              Designer undercounter ice maker
            </p>
            <h2 className="mt-10 max-w-[500px] font-serif text-[clamp(3.45rem,3.15vw,3.75rem)] leading-[1.12]">
              The future of ice making is here
            </h2>
            <p className="mt-8 max-w-[460px] text-[1.05rem] leading-snug">
              Created for luxury homes where quiet, convenience, and performance matter.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fice-maker"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171715] px-8 text-sm font-bold text-white transition hover:bg-[#34322e]"
            >
              View product
            </Link>
            <Link
              href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fice-maker"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold transition hover:bg-[#171715] hover:text-white"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="relative min-h-[520px] bg-[#d8d2c8] lg:min-h-0">
          <Image
            src={assets.iceMaker}
            alt="Sub-Zero designer undercounter ice maker with clear ice."
            fill
            sizes="(min-width: 1024px) 696px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function LayeredUndercounterImages() {
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

  const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);
  const ease = (value: number) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };

  const timelineProgress = scrollProgress * undercounterLayeredSlides.length * 2;
  const progressLineHeight = 8 + scrollProgress * 92;

  const scrollToSlide = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const targetStage = index === 0 ? 0 : index * 2 + 1;
    const targetProgress = targetStage / (undercounterLayeredSlides.length * 2);
    const top = section.getBoundingClientRect().top + window.scrollY + scrollable * targetProgress;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const skipSection = () => {
    const section = sectionRef.current;
    if (!section) return;

    window.scrollTo({
      top: section.getBoundingClientRect().bottom + window.scrollY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="section layered-images-container relative h-[260svh] bg-[#f4f2ec] px-6 pb-0 md:px-12"
      data-palette="stone--dark"
      role="region"
      aria-label="Sub-Zero undercounter design inspiration"
    >
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-start justify-center pt-5 md:pt-6">
        <div className="relative w-full max-w-[1320px]">
          <ul className="relative aspect-[1.15] min-h-[320px] overflow-hidden bg-[#d8d2c5] md:aspect-[1.78] md:min-h-[520px]">
            {undercounterLayeredSlides.map((slide, index) => {
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
                (index === undercounterLayeredSlides.length - 1 ||
                  timelineProgress < (index + 1) * 2);

              return (
                <li
                  key={slide.title}
                  className="absolute inset-0 transition-transform duration-150 ease-out"
                  style={{ transform: `translateY(${translateY}%)`, zIndex: index + 1 }}
                  aria-hidden={!isActive}
                >
                  <Link href={slide.href} className="relative block h-full w-full overflow-hidden">
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
                      <h2 className="font-serif text-[clamp(3rem,4vw,4.75rem)] leading-none">
                        {slide.title}
                      </h2>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="absolute right-[-32px] top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="relative h-[100px] w-px bg-[#171715]/35">
              <div
                className="absolute left-0 top-0 w-px bg-[#171715]"
                style={{ height: `${progressLineHeight}%` }}
              />
              <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-between">
                {undercounterLayeredSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    className="h-6 w-6 -translate-x-1/2"
                    aria-label={`Show ${slide.title}`}
                    onClick={() => scrollToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="absolute bottom-3 right-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#171715] bg-[#f4f2ec]/90 text-[#171715] transition hover:bg-[#171715] hover:text-[#f4f2ec] md:bottom-4 lg:right-[-60px]"
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

function PerformanceStatement() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-28 pt-8 text-[#171715] md:px-12 md:pb-36 md:pt-10">
      <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
        <h2 className="max-w-[760px] font-serif text-[clamp(3.25rem,4.55vw,5rem)] leading-[1.02]">
          The same superior performance
        </h2>
        <p className="mt-6 max-w-[660px] text-[1rem] leading-snug md:text-[1.08rem]">
          Engineered with the precise temperature control and advanced preservation technology of
          full-size models-with quiet, efficient operation for any space in your home.
        </p>
        <Link
          href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fundercounter"
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171715] px-8 text-sm font-bold text-white transition hover:bg-[#34322e]"
        >
          Explore undercounter refrigeration
        </Link>
      </div>
    </section>
  );
}

function FeatureRows() {
  const rows = [
    {
      title: "Undercounter refrigeration that overperforms",
      copy: "Multiple widths, customizable configurations, and stainless-steel or panel-ready finishes combine powerful cooling with seamless integration.",
      image: assets.overperform,
      alt: "Sub-Zero undercounter refrigeration in a modern living space.",
    },
    {
      title: "Cool convenience",
      copy: "Small footprint, meaningful impact. Add chilled storage to kitchens, bars, and entertainment spaces without interrupting the room.",
      image: assets.convenience,
      alt: "Minimal kitchen with integrated undercounter refrigeration.",
      reverse: true,
    },
    {
      title: "Maximum design flexibility",
      copy: "A sophisticated suite of design enhancements helps undercounter models integrate as carefully as full-size refrigeration.",
      image: assets.flexibility,
      alt: "Sub-Zero undercounter product detail.",
    },
  ];

  return (
    <section className="bg-[#f4f2ec] px-6 pb-24 text-[#171715] md:px-12 md:pb-32">
      <div className="mx-auto grid max-w-[1392px] gap-20 lg:gap-28">
        {rows.map((row) => (
          <article
            key={row.title}
            className={`grid items-center gap-10 lg:grid-cols-[minmax(0,820px)_minmax(360px,1fr)] lg:gap-16 ${
              row.reverse
                ? "lg:grid-cols-[minmax(360px,1fr)_minmax(0,820px)] lg:[&>div:first-child]:order-2"
                : ""
            }`}
          >
            <div className="relative aspect-[1.16] overflow-hidden bg-[#d8d2c8]">
              <Image
                src={row.image}
                alt={row.alt}
                fill
                sizes="(min-width: 1024px) 820px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-[clamp(2.35rem,2.55vw,3rem)] leading-[1.05]">
                {row.title}
              </h3>
              <p className="mt-6 max-w-[500px] text-[1rem] leading-snug">
                {row.copy}
              </p>
              <Link
                href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fundercounter"
                className="mt-6 inline-flex border-b border-[#171715] pb-0.5 text-[0.95rem] font-medium transition hover:border-[#6f6a60] hover:text-[#6f6a60]"
              >
                Explore products
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ShowroomJourney() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-36 pt-10 text-[#171715] md:px-12 md:pb-40 md:pt-16">
      <div className="mx-auto grid max-w-[1120px] items-center bg-[#fbfaf7] p-6 md:grid-cols-[426px_1fr] md:gap-16 lg:gap-[104px]">
        <div className="relative aspect-square w-full overflow-hidden bg-[#d8d2c8]">
          <Image
            src={assets.showroom}
            alt="Showroom consultation with Sub-Zero and Wolf appliances."
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
          <Link
            href="/showroom/appointment"
            className="mt-8 inline-flex min-h-[52px] w-fit items-center justify-center rounded-full bg-[#171715] px-8 text-base font-bold text-white transition hover:bg-[#34322e]"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}

function OverachievingGrid() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-20 pt-0 text-[#171715] md:px-12 md:pb-28">
      <div className="mx-auto max-w-[1392px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="font-serif text-[clamp(3rem,3.3vw,4rem)] leading-tight">
              Undercounter, overachieving
            </h2>
            <p className="mt-5 max-w-[610px] text-[1rem] leading-snug">
              From refrigerator and freezer drawers to beverage centers and wine storage, blend
              premium performance with thoughtful design for exciting possibilities to customize
              your space however you desire.
            </p>
          </div>
          <Link
            href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fundercounter"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#171715] px-8 text-[0.95rem] font-bold transition hover:bg-[#171715] hover:text-white"
          >
            Explore all undercounter
          </Link>
        </div>
        <div className="mt-16 grid gap-1.5 md:grid-cols-2 lg:grid-cols-3">
          {productTypes.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex min-h-[360px] flex-col justify-between border border-[#cbc6bb] bg-[#f4f2ec] px-5 pb-9 pt-20 transition hover:bg-[#fbfaf6] lg:min-h-[455px] lg:pb-10 lg:pt-[104px]"
            >
              <div className="relative mx-auto h-[205px] w-full max-w-[245px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="245px"
                  className="object-contain transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-10 font-serif text-[clamp(1.85rem,1.8vw,2rem)] leading-none">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompleteKitchen() {
  return (
    <section className="bg-[#f4f2ec] px-6 py-16 text-[#171715] md:px-12 md:py-20">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="mb-8 font-serif text-[clamp(2.85rem,3.25vw,4rem)] leading-tight md:mb-9">
          Complete your kitchen
        </h2>
        <Link
          href="/outdoor/view-all-outdoor"
          className="group relative block aspect-[16/9] min-h-[330px] overflow-hidden bg-[#d8d2c8] md:min-h-[560px]"
          aria-label="Outdoor"
        >
          <Image
            src={assets.outdoor}
            alt="Wolf outdoor stainless steel grill integrated into a stone and granite countertop kitchen island."
            fill
            sizes="(min-width: 1440px) 1392px, 100vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-transparent" />
          <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/18" />
          <span className="absolute bottom-7 left-7 font-serif text-[clamp(2.15rem,2.5vw,2.75rem)] leading-none text-white md:bottom-8 md:left-8">
            Outdoor
          </span>
        </Link>
      </div>
    </section>
  );
}

function MoreToDiscover() {
  return (
    <section className="bg-[#ebe8df] px-6 py-20 text-[#171715] md:px-12 md:py-24">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="font-serif text-[clamp(3rem,3.6vw,4rem)] leading-tight">
          More to discover
        </h2>
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

export function UndercounterPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <Hero />
      <Intro />
      <IceMakerPromo />
      <LayeredUndercounterImages />
      <PerformanceStatement />
      <FeatureRows />
      <ShowroomJourney />
      <OverachievingGrid />
      <DesignedWithYou
        categories={inspirationCategories}
        title="Get inspired"
        copy=""
        ctaLabel="See more inspiration"
        ctaHref="/inspiration"
        showTabs={false}
      />
      <CompleteKitchen />
      <MoreToDiscover />
    </main>
  );
}
