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
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:5583195a-37b7-4be5-b8c3-481795d4f12f/as/bringing-products-to-life-1.jpg",
  intuitive:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:01950421-e725-46df-b8a6-0f5f25fd8c7a/as/bringing-products-to-life-2.mp4",
  decades:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:fe0e0d66-2a92-481c-84dd-ccf020b6d232/as/bringing-products-to-life-3.mp4",
  wine:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:2e936d2a-bd0f-4346-93e0-1e0f215ff799/as/wine-storage-desktop.avif",
  undercounter:
    "https://www.subzero-wolf.com/adobe/assets/urn:aaid:aem:7e647231-6fb3-49fd-bd17-b34e7107607c/as/undercounter-desktop.avif",
};

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

const featurePanels = [
  {
    title: "Peak freshness, longer",
    description:
      "Dual refrigeration, advanced air purification, and magnetic door seals help maintain ideal conditions for food, wine, and frozen goods.",
    cta: "Learn about preservation",
    media: assets.freshness,
    type: "image",
  },
  {
    title: "Intuitive and thoughtful",
    description:
      "Storage, lighting, and controls are designed around the way people actually use their kitchens every day.",
    cta: "Explore features",
    media: assets.intuitive,
    type: "video",
  },
  {
    title: "Yours for decades to come",
    description:
      "Products are tested beyond typical industry standards so performance feels steady today and far into the future.",
    cta: "Explore ownership",
    media: assets.decades,
    type: "video",
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

function MediaBlock({
  src,
  type = "image",
  alt,
  className = "",
}: {
  src: string;
  type?: string;
  alt: string;
  className?: string;
}) {
  if (type === "video") {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className={`object-cover ${className}`}
    />
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
      className="section hero-container relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#111]"
      data-palette="none"
      data-brand="sub-zero"
      role="region"
    >
      <div className="hero-wrapper h-full min-h-[calc(100vh-72px)]">
        <div className="hero block h-full min-h-[calc(100vh-72px)]">
          <div className="relative h-full min-h-[calc(100vh-72px)]">
            <div
              className="media-item-wrapper hero-media-video relative h-full min-h-[calc(100vh-72px)]"
              role="group"
              aria-label="woman smiling while placing a plate of salad into an open Sub-Zero refrigerator"
            >
              <div className="frame h-full min-h-[calc(100vh-72px)]">
                <video
                  ref={videoRef}
                  className="h-full min-h-[calc(100vh-72px)] w-full object-cover"
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
              <div className="absolute bottom-5 right-5 z-20 md:bottom-8 md:right-8">
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

export function DiscoverSubZeroPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <HeroVideo />

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1392px] gap-4 lg:grid-cols-3">
          {seriesCards.map((card) => (
            <Link key={card.title} href={card.href} className="group bg-[#fbfaf6]">
              <div className="relative aspect-[1.05] overflow-hidden bg-[#ece9df]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-contain p-10 transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-8 pb-10 pt-8">
                <h2 className="font-serif text-4xl leading-none md:text-5xl">{card.title}</h2>
                <p className="mt-5 max-w-[360px] text-base leading-relaxed text-[#5c5a55]">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto grid max-w-[1180px] gap-10 bg-[#fbfaf6] p-6 md:grid-cols-[0.48fr_0.52fr] md:p-8 lg:gap-20">
          <div className="relative min-h-[360px] overflow-hidden">
            <Image src={assets.showroom} alt="Showroom consultation" fill sizes="50vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center py-8 md:py-14">
            <h2 className="font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.98]">
              Start your journey
              <br />
              in a showroom
            </h2>
            <p className="mt-8 max-w-[430px] text-lg leading-relaxed">
              Explore products in person and get expert advice on your next refrigeration project.
            </p>
            <div className="mt-9">
              <Link
                href="/showroom/appointment"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#171715] px-9 text-sm font-bold text-white"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e7e3d8] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1392px]">
          <div className="grid gap-10 lg:grid-cols-[0.48fr_0.52fr]">
            <h2 className="font-serif text-[clamp(3.5rem,7vw,8rem)] leading-[0.92]">
              A pioneer
              <br />
              for 80 years
            </h2>
            <p className="max-w-[600px] text-lg leading-relaxed text-[#3b3934] lg:pt-7">
              For decades, Sub-Zero has pioneered preservation with advanced technology, quality
              materials, and rigorous testing. Today&apos;s products continue that legacy, keeping food
              fresher while elevating the way kitchens are designed and experienced.
            </p>
          </div>
          <div className="mt-16 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[460px] overflow-hidden">
              <Image src={assets.preservationOne} alt="Sub-Zero preservation detail" fill sizes="45vw" className="object-cover" />
            </div>
            <div className="grid gap-4">
              <div className="relative min-h-[260px] overflow-hidden">
                <Image src={assets.preservationTwo} alt="Sub-Zero kitchen refrigeration" fill sizes="55vw" className="object-cover" />
              </div>
              <video className="h-[320px] w-full object-cover" src={assets.preservationVideo} autoPlay muted loop playsInline />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1392px] space-y-6">
          {featurePanels.map((panel, index) => (
            <div
              key={panel.title}
              className={`grid min-h-[560px] bg-[#fbfaf6] lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative min-h-[360px] overflow-hidden">
                <MediaBlock src={panel.media} type={panel.type} alt={panel.title} />
              </div>
              <div className="flex flex-col justify-center px-8 py-14 md:px-16">
                <h2 className="font-serif text-[clamp(3rem,5vw,6rem)] leading-[0.94]">{panel.title}</h2>
                <p className="mt-8 max-w-[430px] text-lg leading-relaxed text-[#3b3934]">
                  {panel.description}
                </p>
                <div className="mt-9">
                  <OutlineButton>{panel.cta}</OutlineButton>
                </div>
              </div>
            </div>
          ))}
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
