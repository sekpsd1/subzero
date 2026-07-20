"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DetailedProductCardProps = {
  title: string;
  images: string[];
  imageSizes?: string;
  widths: string;
  finish: string[];
  features: string | string[];
  countLabel?: string | null;
  fallbackCountLabel: string;
  priority?: boolean;
};

export function DetailedProductCard({
  title,
  images,
  imageSizes,
  widths,
  finish,
  features,
  countLabel,
  fallbackCountLabel,
  priority = false,
}: DetailedProductCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const imageList = images.length ? images : [""];
  const hasFeatures = Array.isArray(features) ? features.length > 0 : features.length > 0;

  const moveImage = (direction: -1 | 1) => {
    setActiveImage((current) => (current + direction + imageList.length) % imageList.length);
  };

  return (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className="group block h-full border border-[#d2cdc1] bg-transparent p-6 transition hover:bg-[#fbfaf7]"
    >
      <div className="relative w-full overflow-hidden bg-transparent">
        <div className="aspect-[4/5] w-full">
          <Image
            src={imageList[activeImage]}
            alt={title}
            fill
            sizes={imageSizes ?? "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw"}
            className="object-contain"
            priority={priority}
          />
        </div>
        {imageList.length > 1 ? (
          <div className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 items-center justify-between px-3 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 md:flex">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171715] text-white shadow-sm"
              aria-label="Previous product image"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                moveImage(-1);
              }}
            >
              <ChevronLeft size={17} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171715] text-white shadow-sm"
              aria-label="Next product image"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                moveImage(1);
              }}
            >
              <ChevronRight size={17} strokeWidth={1.8} />
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex min-h-[44px] justify-end px-0 py-3 text-[0.9rem] font-light text-[#171715]">
        {countLabel === null ? null : (countLabel ?? fallbackCountLabel)}
      </div>
      <div className="pb-3">
        <h2 className="min-h-[74px] max-w-[360px] font-serif text-[clamp(1.75rem,1.65vw,2rem)] leading-[1.08] underline-offset-4 group-hover:underline group-focus-visible:underline">
          {title}
        </h2>
        <dl className="mt-3 border-t border-[#d8d2c8] text-[0.8125rem] leading-[1.4]">
          <div className="grid grid-cols-2 border-b border-[#d8d2c8] py-2">
            <dt className="text-[#6f695f]">Width:</dt>
            <dd>{widths}</dd>
          </div>
          <div className="grid grid-cols-2 border-b border-[#d8d2c8] py-2">
            <dt className="text-[#6f695f]">Finish:</dt>
            <dd className="space-y-1">
              {finish.map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span
                    className={`h-4 w-4 rounded-full border border-[#a7a196] ${
                      item === "Panel Ready" ? "bg-[#5f5d57]" : "bg-[#9d9b95]"
                    }`}
                    aria-hidden="true"
                  />
                  {item}
                </span>
              ))}
            </dd>
          </div>
          {hasFeatures ? (
            <div className="grid min-h-[36px] grid-cols-2 py-2">
              <dt className="text-[#6f695f]">Features:</dt>
              <dd className="space-y-1">
                {Array.isArray(features)
                  ? features.map((feature) => (
                      <span key={feature} className="block">
                        {feature}
                      </span>
                    ))
                  : features}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </a>
  );
}
