"use client";

import { ArrowDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  heroPoster: `${aem}5e5fdce0-1bb4-43fb-9703-d1cb0ea0699c/as/our-story-fallback.avif?assetname=our-story-fallback.png&width=2560&max-quality=90`,
  heroVideo: `${aem}d3db2c62-203a-4069-819c-134362baa8b9/renditions/original/as/home-004.mp4`,
  filmVideo: `${aem}36b784e7-cf4c-4738-9621-867c2d8e4f1f/renditions/original/as/SZG_Tri-Brand_80th_Foresight_4k_h264%20Full%20HD%20mp4%20(1080p).mp4#t=0.001`,
  unified: `${aem}20c0bcfe-f948-4105-95d5-9865e619a4d1/as/TriBrand_Holiday_2024_Product_01.avif?assetname=TriBrand_Holiday_2024_Product_01.jpg&width=1920&max-quality=90`,
  craft: `${aem}2b0627dc-b4b3-45cb-a356-643736625b0e/as/Factory_Craftsmanship_HP.avif?assetname=Factory_Craftsmanship_HP.jpg&width=1920&max-quality=90`,
  subZero: `${aem}01b8448b-53dc-4c1b-9a08-4acbe7e182bf/as/SZWC_Austin_0934-2-(1)_4021FC_A_GRACoL2006.avif?assetname=SZWC_Austin_0934-2+%281%29_4021FC_A_GRACoL2006.jpg&width=992&max-quality=90`,
  wolf: `${aem}3187c9c4-38c4-49be-9fec-833b4d22fb56/as/Wolf_Montauk_2024_Product_Range_01.avif?assetname=Wolf_Montauk_2024_Product_Range_01.jpg&width=992&max-quality=90`,
  cove: `${aem}91280361-64cb-4f1e-9dab-df609f6a0b41/as/SZWC_Nashville_46750_R_RGB.avif?assetname=SZWC_Nashville_46750_R_RGB.jpg&width=992&max-quality=90`,
  exceptional: `${aem}1bf01ff8-7f0e-4baf-a8e9-dd09a56637d7/as/COMPANY_FACTORY_TURBEN_080116_02.avif?assetname=COMPANY_FACTORY_TURBEN_080116_02.jpg&width=1920&max-quality=90`,
  lifetime: "https://s7d9.scene7.com/is/image/szw/SZG_Ohio_Showroom_0905-2_CMYK?wid=1920&qlt=90",
};

const brands = [
  {
    eyebrow: "Sub-Zero (established 1945)",
    title: "The champion of fresh food",
    copy: "An American original, Sub-Zero pioneered built-in refrigeration and dual refrigeration systems—keeping food fresher longer and setting the standard for kitchen preservation.",
    image: assets.subZero,
    alt: "Integrated Sub-Zero refrigeration in a refined kitchen",
  },
  {
    eyebrow: "Wolf (introduced in 2000)",
    title: "The master of precision heat",
    copy: "Wolf brings professional-grade cooking into the home, offering precise control and consistent performance that empower cooks to create with confidence.",
    image: assets.wolf,
    alt: "Wolf range in a warm contemporary kitchen",
  },
  {
    eyebrow: "Cove (launched in 2018)",
    title: "The quiet force of clean",
    copy: "Cove completes the kitchen suite with powerful cleaning and adaptable interiors—ensuring every dish emerges spotless and ready for whatever comes next.",
    image: assets.cove,
    alt: "Cove dishwasher in a premium kitchen",
  },
] as const;

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

export function OurStoryPageContent() {
  const [filmOpen, setFilmOpen] = useState(false);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const [filmPaused, setFilmPaused] = useState(false);
  const [filmProgress, setFilmProgress] = useState(0);
  const [layeredProgress, setLayeredProgress] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const filmVideoRef = useRef<HTMLVideoElement>(null);
  const layeredImagesRef = useRef<HTMLElement>(null);

  function syncHeroVideoState() {
    const video = heroVideoRef.current;
    if (!video) return;

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    setHeroPaused(video.paused);
    setHeroProgress(duration ? video.currentTime / duration : 0);
  }

  function toggleHeroVideo() {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setHeroPaused(true));
    } else {
      video.pause();
    }
  }

  function syncFilmVideoState() {
    const video = filmVideoRef.current;
    if (!video) return;

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    setFilmPaused(video.paused);
    setFilmProgress(duration ? video.currentTime / duration : 0);
  }

  function toggleFilmVideo() {
    const video = filmVideoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setFilmPaused(true));
    } else {
      video.pause();
    }
  }

  function moveToLayeredImage(progress: number) {
    const section = layeredImagesRef.current;
    if (!section) return;

    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 0);
    window.scrollTo({ top: section.offsetTop + scrollable * progress, behavior: "smooth" });
  }

  useEffect(() => {
    if (!filmOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFilmOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [filmOpen]);

  useEffect(() => {
    let frame = 0;

    const updateLayeredProgress = () => {
      const section = layeredImagesRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      setLayeredProgress(Math.min(Math.max(-rect.top / scrollable, 0), 1));
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateLayeredProgress);
    };

    updateLayeredProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const firstTitleOpacity =
    Math.min(Math.max((layeredProgress - 0.1) / 0.14, 0), 1) *
    Math.min(Math.max((0.52 - layeredProgress) / 0.12, 0), 1);
  const secondTitleOpacity = Math.min(Math.max((layeredProgress - 0.63) / 0.15, 0), 1);
  const secondSlideOffset = Math.max(0, 110 - Math.max(layeredProgress - 0.46, 0) * 520);

  return (
    <main className="overflow-x-clip bg-[#272623] text-[#f7f4ed]">
      <section className="relative h-[100svh] min-h-[680px] md:min-h-[720px]" aria-labelledby="story-hero-title">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={assets.heroPoster}
          aria-hidden="true"
          onLoadedMetadata={syncHeroVideoState}
          onTimeUpdate={syncHeroVideoState}
          onPlay={syncHeroVideoState}
          onPause={syncHeroVideoState}
        >
          <source src={assets.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.12)_45%,rgba(8,8,8,.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-5 pb-7 md:px-6 md:pb-8">
          <h2 id="story-hero-title" style={serif} className="max-w-[900px] text-[36px] font-normal leading-[1.02] md:text-[48px] lg:text-[52px]">
            Rooted in tradition, fueled by innovation
          </h2>
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <a href="#our-story" aria-label="Continue to Our story" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-black/15 backdrop-blur-sm transition hover:bg-white hover:text-[#22211f]">
              <ArrowDown size={20} strokeWidth={1.4} />
            </a>
            <button
              type="button"
              onClick={toggleHeroVideo}
              aria-label={heroPaused ? "Play" : "Pause"}
              aria-pressed={!heroPaused}
              className="grid h-[60px] w-[60px] place-items-center rounded-full text-white outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
            >
              <HeroVideoProgressButton isPaused={heroPaused} progress={heroProgress} />
              <span className="sr-only">Video</span>
            </button>
          </div>
        </div>
      </section>

      <section id="our-story" className="bg-[#f2f0e9] px-5 pb-12 pt-16 text-center text-[#171715] md:px-8 md:pb-[42px] md:pt-[62px]">
        <div className="mx-auto max-w-[1040px]">
          <h1 style={serif} className="text-[54px] font-normal leading-none md:text-[80px]">Our story</h1>
          <p className="mx-auto mt-6 max-w-[940px] text-[16px] leading-[1.42] md:text-[18px]">
            Sub-Zero, Wolf, and Cove have spent more than 80 years transforming kitchens into the heart of the home. Our commitment to quality and ingenuity has revolutionized the modern kitchen—bringing ease to everyday life, elevating aesthetics, and turning appliances into icons of form and function.
          </p>
          <Link href="https://www.subzero-wolf.com/our-story/history-milestones" className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171715] px-8 text-[14px] font-semibold text-[#f7f4ed] transition hover:bg-[#34332f]">
            Our timeline of innovations
          </Link>
        </div>
      </section>

      <section ref={layeredImagesRef} className="relative bg-[#f2f0e9] text-[#f7f4ed] md:h-[250svh]" aria-label="Specialized by design. Unified by excellence.">
        <div className="md:sticky md:top-10 md:flex md:h-[calc(100svh-80px)] md:items-center md:justify-center">
          <div className="relative mx-auto w-full px-5 pb-20 md:max-w-[1380px] md:px-[30px] md:pb-0">
            <div className="relative overflow-hidden bg-[#262522] md:aspect-[16/9]">
              <div className="relative aspect-[4/5] md:absolute md:inset-0 md:aspect-auto">
                <Image src={assets.unified} alt="Sub-Zero, Wolf, and Cove appliances designed together" fill sizes="(min-width: 768px) 1320px, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 hidden items-center justify-center px-5 text-center md:flex" style={{ opacity: firstTitleOpacity }}>
                  <h2 id="specialized-title" style={serif} className="text-[76px] font-normal leading-none lg:text-[90px]">Specialized by design.</h2>
                </div>
              </div>

              <div
                className="relative mt-4 aspect-[4/5] md:absolute md:inset-0 md:mt-0 md:aspect-auto md:[transform:translateY(var(--story-slide-offset))]"
                style={{ "--story-slide-offset": `${secondSlideOffset}%` } as CSSProperties}
              >
                <Image src={assets.craft} alt="Skilled craftsmanship in a Sub-Zero Group factory" fill sizes="(min-width: 768px) 1320px, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 hidden items-center justify-center px-5 text-center md:flex" style={{ opacity: secondTitleOpacity }}>
                  <h2 style={serif} className="text-[76px] font-normal leading-none lg:text-[90px]">Unified by excellence.</h2>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 flex flex-col md:hidden">
                <div className="flex flex-1 items-center justify-center px-8 text-center">
                  <h2 style={serif} className="text-[46px] leading-[.96]">Specialized by design.</h2>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 text-center">
                  <h2 style={serif} className="text-[46px] leading-[.96]">Unified by excellence.</h2>
                </div>
              </div>
            </div>

            <div className="layered-images-progress-controls absolute inset-y-0 right-0 hidden w-px items-center md:flex">
              <div className="layered-images-progress-wrap relative h-[100px] w-px">
                <div className="layered-images-progress-bar relative flex h-[100px] w-px flex-col rounded-full bg-[#181817]">
                  <div
                    className="layered-images-progress-caret absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-[#181817]"
                    style={{ height: `${layeredProgress * 100}%` }}
                  />
                  <div className="layered-images-progress-hotspots absolute inset-0 flex flex-col">
                    <button type="button" onClick={() => moveToLayeredImage(0.16)} className="layered-images-progress-btn relative block h-[50px] w-4 -translate-x-[7.5px]">
                      <span className="layered-images-progress-indicator sr-only">Image 1 / 2</span>
                    </button>
                    <button type="button" onClick={() => moveToLayeredImage(0.78)} className="layered-images-progress-btn relative block h-[50px] w-4 -translate-x-[7.5px]">
                      <span className="layered-images-progress-indicator sr-only">Image 2 / 2</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f0eee7] px-6 py-16 text-center text-[#181817]">
        <div className="mx-auto max-w-[912px]">
          <h2 style={serif} className="text-[32px] font-normal leading-[1.1] md:text-[40px]">Each of our brands is laser-focused on a single kitchen pillar—refrigeration, cooking, or cleaning.</h2>
          <p style={serif} className="mx-auto mt-6 max-w-[684px] text-[21px] leading-[1.2] md:text-[24px]">The result? Award-winning appliances thoughtfully crafted for purpose, precision, and performance.</p>
        </div>
      </section>

      <section className="bg-[#f0eee7] px-6 pb-16 pt-[72px]">
        <div className="mx-auto grid max-w-[1392px] gap-2 md:grid-cols-3">
          {brands.map((brand) => (
            <article key={brand.eyebrow} className="flex flex-col bg-[#fbf9f5] text-[#181817]">
              <div className="relative aspect-[1.6] overflow-hidden">
                <Image src={brand.image} alt={brand.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 hover:scale-[1.02]" />
              </div>
              <div className="flex min-h-[211px] flex-col p-6">
                <p className="text-[14px] font-semibold uppercase leading-[1.22] tracking-[.15em]">{brand.eyebrow}</p>
                <h3 style={serif} className="mt-2 text-[30px] font-normal leading-[1.2]">{brand.title}</h3>
                <p className="mt-6 text-[16px] leading-[1.22]">{brand.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative h-[100svh] min-h-[640px]" aria-labelledby="film-title">
        <video
          ref={filmVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedMetadata={syncFilmVideoState}
          onTimeUpdate={syncFilmVideoState}
          onPlay={syncFilmVideoState}
          onPause={syncFilmVideoState}
        >
          <source src={assets.filmVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#000_0%,transparent_50%)]" />
        <div className="absolute inset-0 flex items-center px-6">
          <div className="w-full md:w-1/2">
            <h2 id="film-title" style={serif} className="text-[44px] font-normal leading-[1.05] md:text-[60px] md:leading-[1.1]">Purpose built into every detail</h2>
            <button type="button" onClick={() => setFilmOpen(true)} className="mt-8 inline-flex h-10 items-center gap-2 rounded-full border border-white/90 bg-transparent px-[19px] text-[14px] font-medium leading-[17px] transition hover:bg-white hover:text-[#22211f]">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M2 1V15L12 8L2 1ZM4 4V12L10 8L4 4Z" fill="currentColor" />
              </svg>
              <span>Watch film</span>
            </button>
          </div>
        </div>
        <div className="layered-videos-progress-controls absolute right-6 top-1/2 hidden h-[100px] w-[18px] -translate-y-1/2 md:block">
          <div className="layered-videos-progress-bar relative h-[100px] w-[18px] rounded-full bg-[rgba(24,24,23,.4)] before:absolute before:left-1/2 before:top-2 before:h-[84px] before:w-px before:-translate-x-1/2 before:bg-white/30">
            <div className="layered-videos-progress-caret absolute left-1/2 top-2 h-px w-0.5 -translate-x-1/2 bg-[#fbf9f5]" />
            <div className="layered-videos-progress-hotspots absolute inset-0">
              <button type="button" className="layered-videos-progress-btn h-full w-full" aria-label="Video 1 of 1">
                <span className="layered-videos-progress-indicator sr-only">Video 1 / 1</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 right-6 flex items-center gap-3">
          <button
            type="button"
            onClick={toggleFilmVideo}
            aria-label={filmPaused ? "Play" : "Pause"}
            aria-pressed={!filmPaused}
            className="grid h-12 w-12 place-items-center rounded-full text-white outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
          >
            <HeroVideoProgressButton isPaused={filmPaused} progress={filmProgress} size={48} />
            <span className="sr-only">Video</span>
          </button>
          <a href="#exceptional-starts-here" aria-label="Continue to Exceptional starts here" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-[#242421]/80 transition hover:border-white/70 hover:bg-white hover:text-[#22211f]">
            <ArrowDown size={17} strokeWidth={1.4} />
          </a>
        </div>
      </section>

      <section id="exceptional-starts-here" className="bg-[#f0eee7] px-6 py-8 text-[#181817]">
        <div className="mx-auto grid max-w-[1440px] gap-16">
          <StoryDetail title="Exceptional starts here" copy="Ideas for every product take shape in our American innovation labs, where meticulous engineering and inspired design come together. From our factories in Wisconsin, Iowa, and Arizona to homes around the world, we promise the consistent quality and refined aesthetics that define our brands." image={assets.exceptional} alt="Sub-Zero refrigeration craftsmanship in an American factory" />
          <StoryDetail reverse title="A lifetime commitment" copy="Our relationship with owners begins at the moment of purchase and grows through expert service, personalized experiences, and inspiring content. We’re committed to offering a lifetime of support that reflects our core values: dedication, integrity, and respect for every customer." image={assets.lifetime} alt="Sub-Zero refrigeration in a welcoming showroom kitchen" />
        </div>
      </section>

      {filmOpen ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10" role="dialog" aria-modal="true" aria-label="Purpose built into every detail film" onClick={() => setFilmOpen(false)}>
          <button type="button" onClick={() => setFilmOpen(false)} aria-label="Close film" className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/50 text-white md:right-8 md:top-8">
            <X size={22} />
          </button>
          <video className="max-h-[82vh] w-full max-w-[1400px] bg-black" controls autoPlay playsInline onClick={(event) => event.stopPropagation()}>
            <source src={assets.filmVideo} type="video/mp4" />
          </video>
        </div>
      ) : null}
    </main>
  );
}

function HeroVideoProgressButton({ isPaused, progress, size = 60 }: { isPaused: boolean; progress: number; size?: number }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg width={size} height={size} className="drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="30" cy="30" r={radius} stroke="rgba(255,255,255,0.48)" strokeWidth="3" fill="none" />
      <circle
        cx="30"
        cy="30"
        r={radius}
        stroke="rgba(255,255,255,0.98)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset, transform: "rotate(-90deg)", transformOrigin: "30px 30px" }}
      />
      <circle cx="30" cy="30" r="20" fill="rgba(20,20,18,0.7)" fillOpacity="0.8" />
      {isPaused ? (
        <path d="M25 20L40 30L25 40V20Z" fill="currentColor" />
      ) : (
        <g>
          <rect x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
          <rect x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
          <rect x="33" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
        </g>
      )}
      <circle cx="30" cy="30" r="18" fill="none" stroke="transparent" strokeWidth="2" />
    </svg>
  );
}

function StoryDetail({ title, copy, image, alt, reverse = false }: { title: string; copy: string; image: string; alt: string; reverse?: boolean }) {
  return (
    <article className={`grid bg-[#f0eee7] lg:min-h-[709.4375px] ${reverse ? "lg:grid-cols-[43%_57%]" : "lg:grid-cols-[57%_43%]"}`}>
      <div className={`relative aspect-[1.157] overflow-hidden lg:aspect-auto lg:h-full ${reverse ? "lg:order-2" : ""}`}>
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="scale-[1.15] object-cover" />
      </div>
      <div className={`flex flex-col justify-center px-0 py-10 sm:px-8 lg:p-16 ${reverse ? "lg:order-1" : ""}`}>
        <h2 style={serif} className="text-[36px] font-normal leading-[1.1] md:text-[40px] md:leading-[44px]">{title}</h2>
        <p className="mt-6 max-w-[492px] text-[17px] font-light leading-[1.4] md:text-[18px] md:leading-[25.2px]">{copy}</p>
      </div>
    </article>
  );
}
