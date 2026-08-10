"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type InspirationSlide = {
  src: string;
  alt: string;
};

type OutdoorInspirationCarouselProps = {
  slides: readonly InspirationSlide[];
};

const serif = {
  fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif',
};

export function OutdoorInspirationCarousel({ slides }: OutdoorInspirationCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const previousIndex = (activeIndex - 1 + slides.length) % slides.length;
  const nextIndex = (activeIndex + 1) % slides.length;

  return (
    <section className="mx-auto max-w-[1392px] px-6 pb-24 md:px-0 md:pb-32">
      <div className="mb-9 md:grid md:w-[calc(100%-101px)] md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 style={serif} className="max-w-[730px] text-[42px] font-light leading-[1.04] md:text-[60px]">
            Entertain effortlessly in every season
          </h2>
          <p className="mt-5 max-w-[620px] text-[14px] font-light leading-[1.5] md:text-[16px]">
            Create your outdoor cooking oasis with products designed to match your style and outlast the elements.
          </p>
        </div>

        <div className="mt-7 flex items-center gap-5 md:mt-0" aria-live="polite">
          <span className="text-[14px]">
            {activeIndex + 1} <span className="mx-1">/</span> {slides.length}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveIndex(previousIndex)}
              aria-label="Previous slide"
              className="grid size-9 place-items-center rounded-full border border-[#292824] transition hover:bg-[#292824] hover:text-white"
            >
              <span aria-hidden="true" className="-mt-px text-[22px] leading-none">‹</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex(nextIndex)}
              aria-label="Next slide"
              className="grid size-9 place-items-center rounded-full border border-[#292824] transition hover:bg-[#292824] hover:text-white"
            >
              <span aria-hidden="true" className="-mt-px text-[22px] leading-none">›</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:w-[calc(50vw+696px)]">
        <div className="relative aspect-video w-full shrink-0 overflow-hidden md:w-[calc(min(100vw,1392px)-101px)] md:max-w-[1291px]">
          <Image
            key={slides[activeIndex].src}
            src={slides[activeIndex].src}
            alt={slides[activeIndex].alt}
            fill
            sizes="(min-width: 1440px) 1291px, 100vw"
            className="object-cover"
          />
          <button
            type="button"
            aria-label="Open more options"
            className="absolute right-4 top-4 hidden size-10 place-items-center rounded-full bg-[#30363a] text-white md:grid"
          >
            <span aria-hidden="true" className="pb-1 text-[22px] leading-none">⋮</span>
          </button>
        </div>

        <div className="relative hidden aspect-[2.103] w-[1220px] shrink-0 self-start overflow-hidden md:block" aria-hidden="true">
          <Image
            key={slides[nextIndex].src}
            src={slides[nextIndex].src}
            alt=""
            fill
            sizes="1220px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/inspiration"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#292824] px-6 text-[12px] font-semibold transition hover:bg-[#292824] hover:text-white"
        >
          See more inspiration
        </Link>
      </div>
    </section>
  );
}
