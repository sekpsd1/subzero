"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

type ShowcaseItem = {
  brand: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  logo: string;
  webm: string;
  mp4: string;
  openHoldAt: number;
};

const showcaseItems: ShowcaseItem[] = [
  {
    brand: "Wolf",
    title: "Cooking",
    description:
      "With striking aesthetics and precision control, Wolf cooking appliances help you prepare exquisite meals time and time again.",
    cta: "Explore Wolf products",
    href: "/products/cooking",
    logo: "/assets/subzero/wolf-logo.svg",
    webm: "/assets/subzero/wolf-tb.webm",
    mp4: "/assets/subzero/wolf-tb.mp4",
    openHoldAt: 1.45,
  },
  {
    brand: "Sub-Zero",
    title: "Refrigeration",
    description:
      "Iconic Sub-Zero refrigeration preserves food at its delicious peak and guards wine against its enemies.",
    cta: "Explore Sub-Zero products",
    href: "/products/refrigeration",
    logo: "/assets/subzero/sub-zero-logo.svg",
    webm: "/assets/subzero/sub-zero-tb.webm",
    mp4: "/assets/subzero/sub-zero-tb.mp4",
    openHoldAt: 1.5,
  },
];

export function TriBrandShowcase() {
  return (
    <section className="overflow-hidden bg-[#eeece4] text-[#1d1c1a]">
      <div className="grid gap-8 px-5 pt-8 md:grid-cols-[1.15fr_0.85fr] md:px-8 lg:px-10">
        <h2 className="font-serif text-[40px] leading-none md:text-[54px] lg:text-[62px]">
          A <em>Higher</em> Standard
          <sup className="ml-1 align-super text-[0.28em] font-normal">{"\u00ae"}</sup>
        </h2>
        <p className="max-w-[620px] text-sm leading-6 text-[#34322e] md:justify-self-end md:text-base md:leading-6">
          Discover the pinnacle of luxury kitchen appliances. Sub-Zero and Wolf
          bring timeless design and unrivaled innovation into the heart of the
          home. From advanced refrigeration that keeps food fresher longer, to
          precision cooking technologies that elevate every meal, our products
          are consciously crafted for those who expect more.
        </p>
      </div>

      <div className="relative mt-12 overflow-hidden bg-[#eeece4] md:mt-14">
        <div className="absolute inset-x-0 top-0 h-[270px] bg-[linear-gradient(180deg,#eeece4_0%,#e9e7df_72%,#dfdcd1_100%)] md:h-[356px]" />
        <div className="absolute inset-x-0 top-[270px] h-px bg-[#c4c0b3]/85 md:top-[356px]" />
        <div className="absolute inset-x-0 top-[271px] h-[86px] bg-[linear-gradient(180deg,#d6d3c7_0%,#dedbd0_58%,#e8e6dc_100%)] md:top-[357px] md:h-[108px]" />
        <div className="absolute inset-x-0 bottom-0 top-[357px] bg-[linear-gradient(180deg,#e8e6dc_0%,#eeece4_34%,#eeece4_100%)] md:top-[465px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_48%,rgba(0,0,0,0.018)_58%,rgba(255,255,255,0)_78%)]" />
        <ul className="relative mx-auto grid w-full max-w-[1080px] gap-10 px-7 md:grid-cols-2 md:gap-16 lg:gap-24">
          {showcaseItems.map((item) => (
            <TriBrandColumn key={item.brand} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TriBrandColumn({ item }: { item: ShowcaseItem }) {
  const cardRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const shouldHoldOpenRef = useRef(false);
  const isClosingRef = useRef(false);

  const stopMotion = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    isClosingRef.current = false;
  }, []);

  const holdOpen = useCallback((video: HTMLVideoElement) => {
    video.currentTime = item.openHoldAt;
    video.pause();
    stopMotion();
  }, [item.openHoldAt, stopMotion]);

  const openDoors = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    stopMotion();
    shouldHoldOpenRef.current = true;
    isClosingRef.current = false;

    if (video.currentTime >= item.openHoldAt) {
      holdOpen(video);
      return;
    }

    video.playbackRate = 1;
    void video.play();

    const tick = () => {
      if (!shouldHoldOpenRef.current) return;

      if (video.currentTime >= item.openHoldAt) {
        holdOpen(video);
        return;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
  }, [holdOpen, item.openHoldAt, stopMotion]);

  const closeDoors = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    stopMotion();
    shouldHoldOpenRef.current = false;
    isClosingRef.current = true;
    video.playbackRate = 1;
    void video.play();
  }, [stopMotion]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener("pointerenter", openDoors);
    card.addEventListener("pointerleave", closeDoors);
    card.addEventListener("mouseenter", openDoors);
    card.addEventListener("mouseleave", closeDoors);
    card.addEventListener("focusin", openDoors);
    card.addEventListener("focusout", closeDoors);

    return () => {
      card.removeEventListener("pointerenter", openDoors);
      card.removeEventListener("pointerleave", closeDoors);
      card.removeEventListener("mouseenter", openDoors);
      card.removeEventListener("mouseleave", closeDoors);
      card.removeEventListener("focusin", openDoors);
      card.removeEventListener("focusout", closeDoors);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [closeDoors, openDoors]);

  return (
    <li
      ref={cardRef}
      onPointerEnter={openDoors}
      onPointerLeave={closeDoors}
      onMouseEnter={openDoors}
      onMouseLeave={closeDoors}
      onFocus={openDoors}
      onBlur={closeDoors}
    >
      <Link
        href={item.href}
        className="group mx-auto block h-full w-full max-w-[430px] text-center outline-none"
      >
        <div className="relative flex h-[320px] items-end md:h-[424px]">
          <video
            ref={videoRef}
            aria-label={`${item.brand} ${item.title} product animation`}
            className="relative z-10 w-full"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload noremoteplayback noplaybackrate nopicinpic"
            onLoadedMetadata={(event) => {
              event.currentTarget.currentTime = 0;
            }}
            onTimeUpdate={(event) => {
              if (isClosingRef.current) return;

              if (
                shouldHoldOpenRef.current &&
                event.currentTarget.currentTime >= item.openHoldAt
              ) {
                holdOpen(event.currentTarget);
              }
            }}
            onEnded={(event) => {
              event.currentTarget.currentTime = 0;
              event.currentTarget.pause();
              isClosingRef.current = false;
            }}
          >
            <source src={item.webm} type="video/webm" />
            <source src={item.mp4} type="video/mp4" />
          </video>
        </div>

        <div className="relative flex min-h-[230px] flex-col items-center px-5 pt-6 md:min-h-[238px]">
          <Image
            src={item.logo}
            alt={item.brand}
            width={128}
            height={28}
            className="h-auto max-h-7 w-auto max-w-[128px]"
          />
          <h3 className="mt-5 font-serif text-[38px] leading-none md:text-[44px]">
            {item.title}
          </h3>
          <div className="mt-5 max-w-[330px] text-sm leading-6 text-[#33312d] opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
            <p>{item.description}</p>
            <span className="mt-4 inline-block border-b border-[#1d1c1a] pb-1 font-semibold">
              {item.cta}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
