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
  seriesClassic:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:fc99f905-1577-4727-a017-a88beead365b/as/SZ12216022.avif?assetname=SZ12216022.jpg",
  seriesDesigner:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:6d5ad573-0976-4851-bad7-f463408cd539/as/SZ2169182.avif?assetname=SZ2169182.jpg",
  seriesPro:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:134aceca-524e-4b8a-a854-289c2550de7e/as/SZWC_PA_0519_4021FC_A_GraCol2006.avif?assetname=SZWC_PA_0519_4021FC_A_GraCol2006.tif",
  classic:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:4889a049-e540-4492-92b1-49dfe6f3cfd2/as/classic-cl3650u-g-ms-rh-full-exterior-desktop.avif",
  designer:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:3e607d7f-34e5-4711-a0ce-692a448006d8/as/designer-cl3650u-g-ms-rh-full-exterior-desktop.avif",
  pro:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:4ad193d0-e60c-42a8-a342-7f0a52cc9557/as/pro-full-exterior-desktop.avif",
  showroom:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:5ae8f6e2-2c32-49bc-bf53-e4119c8d0335/as/woman-in-showroom-looking-at-refrigerator.jpg",
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
};

const seriesTeasers = [
  {
    title: "Classic",
    label: "series",
    image: assets.seriesClassic,
    href: "/refrigeration/classic-series",
  },
  {
    title: "Designer",
    label: "series",
    image: assets.seriesDesigner,
    href: "/refrigeration/designer-series",
  },
  {
    title: "PRO",
    label: "series",
    image: assets.seriesPro,
    href: "/refrigeration/pro-series",
  },
];

const seriesCards = [
  {
    title: "Classic Series",
    description: "Refined performance and industry-inspired style combine to create an iconic design.",
    image: assets.classic,
    href: "/products/refrigeration/classic-series",
  },
  {
    title: "Designer Series",
    description: "Bespoke style with crafted precision, delivering virtually seamless integration into any design.",
    image: assets.designer,
    href: "/products/refrigeration/designer-series",
  },
  {
    title: "PRO Series",
    description: "Stainless-steel construction, advanced performance, and impressive aesthetic size.",
    image: assets.pro,
    href: "/products/refrigeration/pro-series",
  },
];

const productTypes = [
  {
    title: "French Door",
    image:
      "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:9d1ee387-c419-449d-bee8-ac825d65a26a/as/product-french-door-desktop.svg",
  },
  {
    title: "Side-By-Side",
    image:
      "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:2287eb8d-9de0-409f-92ca-6b9d6bb3eaf9/as/product-side-by-side-desktop.svg",
  },
  {
    title: "Over-And-Under",
    image:
      "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:8a1559a9-06d9-41ff-9c78-8a65c748cc25/as/product-over-and-under-desktop.svg",
  },
  {
    title: "Column Refrigeration",
    image:
      "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:f13bb319-d743-4bf6-88c9-b7dd5e85c238/as/product-column-refrigeration-desktop.svg",
  },
  {
    title: "Column Freezer",
    image:
      "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:170ec763-f4a4-46fb-97de-9e005635091e/as/product-column-freezer-desktop.svg",
  },
  {
    title: "Drawers",
    image: assets.undercounter,
  },
  {
    title: "Ice Makers",
    image: "/assets/subzero/dice-unveil-cut-wr.avif",
  },
  {
    title: "Outdoor",
    image: assets.classic,
  },
];

function OutlineButton({ children, href = "#" }: { children: string; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold text-[#171715] transition hover:bg-[#171715] hover:text-[#f4f2ec]"
    >
      {children}
    </Link>
  );
}

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

function LayeredImages() {
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

  const timelineProgress = scrollProgress * seriesTeasers.length * 2;
  const caretHeight = 10 + scrollProgress * 90;

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
    const targetProgress = targetStage / (seriesTeasers.length * 2);
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
      className="section layered-images-container relative h-[360svh] px-6 pb-24 md:px-12 md:pb-32"
      data-palette="stone--dark"
      role="region"
      aria-labelledby="classic"
    >
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-start justify-center pt-5 md:pt-6">
        <div className="relative w-full max-w-[1190px]">
          <ul className="relative aspect-[1.6] min-h-[520px] overflow-hidden bg-[#d8d2c5]">
            {seriesTeasers.map((card, index) => {
              const enterStart = index === 0 ? 0 : index * 2;
              const imageSettle = index === 0 ? 1 : enterStart + 1;
              const overlayStart = imageSettle + 0.28;
              const overlayEnd = imageSettle + 0.95;
              const enterProgress = index === 0 ? 1 : ease(timelineProgress - enterStart);
              const zoomProgress = ease((timelineProgress - imageSettle + 0.9) / 0.9);
              const overlayOpacity = ease((timelineProgress - overlayStart) / (overlayEnd - overlayStart));
              const overlayLift = (1 - overlayOpacity) * 10;
              const translateY = index === 0 ? 0 : (1 - enterProgress) * 110;
              const imageScale = 1.15 - zoomProgress * 0.15;
              const isActive =
                timelineProgress >= enterStart &&
                (index === seriesTeasers.length - 1 ||
                  timelineProgress < (index + 1) * 2);

              return (
                <li
                  key={card.title}
                  className="layered-images-slide absolute inset-0 transition-transform duration-150 ease-out"
                  style={{ transform: `translateY(${translateY}%)`, zIndex: index + 1 }}
                  aria-hidden={!isActive}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 1280px) 1190px, calc(100vw - 48px)"
                      className="object-cover"
                      style={{ transform: `scale(${imageScale})` }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-black"
                      style={{ opacity: overlayOpacity * 0.62 }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-white"
                      style={{
                        opacity: overlayOpacity,
                        transform: `translateY(${overlayLift}px)`,
                      }}
                    >
                      <h2 className="font-serif text-[clamp(3.4rem,4.1vw,5rem)] leading-none">
                        {card.title}
                      </h2>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.34em] md:text-sm">
                        {card.label}
                      </p>
                    </div>
                    <div className="sr-only">
                      <h2 id={card.title.toLowerCase()}>
                        {card.title} {card.label}
                      </h2>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="layered-images-progress-controls absolute right-[-32px] top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="relative h-[90px] w-px bg-[#171715]/40">
              <div
                className="absolute left-0 top-0 w-px bg-[#171715]"
                style={{ height: `${caretHeight}%` }}
              />
              <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-between">
                {seriesTeasers.map((card, index) => (
                  <button
                    key={card.title}
                    type="button"
                    className="h-6 w-6 -translate-x-1/2"
                    aria-label={`Image ${index + 1} / ${seriesTeasers.length}`}
                    onClick={() => scrollToSlide(index)}
                  >
                    <span className="sr-only">
                      Image {index + 1} / {seriesTeasers.length}
                    </span>
                  </button>
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
            Our refrigerators and freezers keep food fresher longer, protecting every ingredient with
            precision and care. Built on a long legacy of excellence, Sub-Zero stands alone in its
            class.
          </p>
          <div className="mt-6">
            <Link
              href="/showroom"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#171715] px-9 text-sm font-bold text-white transition hover:bg-[#34322e]"
            >
              Experience in a showroom
            </Link>
          </div>
        </div>
      </section>

      <LayeredImages />

      <section className="px-6 pb-24 pt-10 md:px-12 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto flex max-w-[1392px] flex-col items-center text-center">
            <h2 className="font-serif text-[clamp(4rem,7.2vw,8.2rem)] leading-[0.86] tracking-normal lg:whitespace-nowrap">
              A pioneer for 80 years
            </h2>
            <p className="mt-5 max-w-[710px] font-serif text-[clamp(1.35rem,1.9vw,1.75rem)] leading-[1.08] text-[#171715]">
              Decades of innovation. Precision craftsmanship. Rigorous testing. Every Sub-Zero is
              engineered to deliver over 20 years of flawless performance.
            </p>
            <Link
              href="/refrigeration/view-all-refrigeration"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#171715] px-7 text-sm font-bold text-white transition hover:bg-[#34322e]"
            >
              Explore Sub-Zero products
            </Link>
          </div>

          <div className="mt-24 grid items-center gap-12 lg:grid-cols-[0.56fr_0.44fr] lg:gap-12">
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

      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto grid max-w-[1392px] bg-[#fbfaf6] lg:grid-cols-[0.48fr_0.52fr]">
          <div className="flex flex-col justify-center px-8 py-16 md:px-16">
            <p className="text-xs uppercase tracking-[0.35em]">Designer Undercounter Ice Maker</p>
            <h2 className="mt-7 font-serif text-[clamp(3rem,5vw,6rem)] leading-[0.94]">
              The future of ice
              <br />
              making is here
            </h2>
            <p className="mt-8 max-w-[440px] text-lg leading-relaxed text-[#3b3934]">
              Created for luxury homes where quiet, convenience, and performance matter.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/products/refrigeration/ice-makers"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#171715] px-9 text-sm font-bold text-white"
              >
                View product
              </Link>
              <OutlineButton href="/products/refrigeration/ice-makers">Learn more</OutlineButton>
            </div>
          </div>
          <div className="relative min-h-[620px] overflow-hidden">
            <Image
              src="/assets/subzero/dice-unveil-cut-wr.avif"
              alt="Designer Undercounter Ice Maker"
              fill
              sizes="52vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#e7e3d8] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1392px]">
          <h2 className="font-serif text-[clamp(3.5rem,7vw,8rem)] leading-none">
            Distinct series,
            <br />
            exceptional preservation
          </h2>
          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {seriesCards.map((card) => (
              <Link key={`series-${card.title}`} href={card.href} className="group bg-[#f7f5ee]">
                <div className="relative aspect-[1.2] overflow-hidden bg-[#ece9df]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="33vw"
                    className="object-contain p-10 transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-4xl">{card.title}</h3>
                  <p className="mt-5 leading-relaxed text-[#5c5a55]">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1392px] gap-4 lg:grid-cols-2">
          {[
            {
              title: "Wine Storage",
              description: "Advanced climate control helps protect treasured collections.",
              image: assets.wine,
            },
            {
              title: "Undercounter",
              description: "Refrigeration, freezer, beverage, and ice solutions where you need them most.",
              image: assets.undercounter,
            },
          ].map((item) => (
            <Link key={item.title} href="#" className="group bg-[#fbfaf6]">
              <div className="relative aspect-[1.55] overflow-hidden">
                <Image src={item.image} alt={item.title} fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="p-8 md:p-10">
                <h2 className="font-serif text-5xl leading-none">{item.title}</h2>
                <p className="mt-5 max-w-[420px] text-lg leading-relaxed text-[#5c5a55]">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#e7e3d8] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1392px]">
          <h2 className="font-serif text-[clamp(3.5rem,7vw,8rem)] leading-none">
            Explore all
            <br />
            Sub-Zero refrigeration
          </h2>
          <div className="mt-16 grid gap-px bg-[#cfcbc0] sm:grid-cols-2 lg:grid-cols-4">
            {productTypes.map((item) => (
              <Link key={item.title} href="#" className="group bg-[#f4f2ec] px-8 py-10 text-center">
                <div className="relative mx-auto h-56 w-full max-w-[240px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="240px"
                    className="object-contain transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-8 font-serif text-3xl leading-none">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
