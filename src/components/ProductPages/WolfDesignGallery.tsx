"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const scene7 = "https://s7d9.scene7.com/is/image/szw/";
const delivery = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

export type WolfDesignGalleryCategory = {
  label: string;
  images: readonly [string, string, string];
};

const defaultGalleries = [
  {
    label: "Contemporary",
    images: [
      `${scene7}24-SUBZERO-PRO-IR-UPDATE_S01-MODERN-HIGH-RISE_EST_%28F04%29BLK?wid=1920&qlt=90`,
      `${delivery}a05cd08b-02cf-4b98-b113-ce21d2b22895/as/Wolf_Gladwyne_PA_55697.avif?assetname=Wolf_Gladwyne_PA_55697.tif&width=1280&max-quality=90`,
      `${scene7}19_SUBZERO_WDFV_SET_03_IR304TM_S_THF03?wid=1920&qlt=90`,
    ],
  },
  {
    label: "Traditional",
    images: [
      `${delivery}0226dac9-e644-40cf-8d55-46ad431f5eae/as/SubZero-Wolf-BB-020.avif?assetname=SubZero-Wolf-BB-020.jpg&width=1920&max-quality=90`,
      `${scene7}SZWC_IR_Hype_56262_1_R_Full_hires_RGB_Revised-1?wid=1280&qlt=90`,
      `${delivery}6c3d4c74-f758-4446-9e4f-e4eda1fe96e1/as/1603-Elmhurst---NH-2.avif?assetname=1603+Elmhurst+-+NH-2.jpg&width=1920&max-quality=90`,
    ],
  },
  {
    label: "Transitional",
    images: [
      `${delivery}3de12754-7ea9-4718-91d3-d768b2a7fde2/as/SubZero-Wolf-JV-04.avif?assetname=SubZero-Wolf-JV-04.png&width=1920&max-quality=90`,
      `${scene7}Sm_SLG_caligreen_IR_1_b?wid=1280&qlt=90`,
      `${scene7}003_LG_SLG_92817?wid=1920&qlt=90`,
    ],
  },
] as const satisfies readonly WolfDesignGalleryCategory[];

export function WolfDesignGallery({
  categories = defaultGalleries,
  thirdImageAspectClass = "md:aspect-[2.05]",
}: {
  categories?: readonly WolfDesignGalleryCategory[];
  thirdImageAspectClass?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const active = categories[activeIndex];

  useEffect(() => {
    if (!expandedImage) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedImage(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [expandedImage]);

  const galleryImage = (image: string, index: number, className: string, sizes: string) => (
    <button
      type="button"
      onClick={() => setExpandedImage(image)}
      className={`group relative block w-full overflow-hidden ${className}`}
      aria-label={`Expand ${active.label} kitchen image ${index + 1}`}
    >
      <Image src={image} alt={`${active.label} kitchen with Wolf appliances`} fill sizes={sizes} className="object-cover" />
      <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-black/70 text-2xl font-light leading-none text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">↗</span>
    </button>
  );

  return (
    <>
      <div className="mt-12 inline-flex min-h-11 rounded-full border border-black/15 bg-[#f8f7f3] p-1" role="tablist" aria-label="Kitchen design style">
        {categories.map((gallery, index) => <button key={gallery.label} type="button" role="tab" aria-selected={index === activeIndex} onClick={() => setActiveIndex(index)} className={`min-h-9 rounded-full px-4 text-sm font-bold transition ${index === activeIndex ? "bg-[#171715] text-white" : "hover:bg-black/5"}`}>{gallery.label}</button>)}
      </div>
      <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-[2fr_1fr] md:overflow-visible">
        {galleryImage(active.images[0], 0, "h-[72vw] min-h-[360px] min-w-[88%] snap-center md:h-[696px] md:min-h-0 md:min-w-0", "(min-width: 768px) 918px, 88vw")}
        {galleryImage(active.images[1], 1, "h-[72vw] min-h-[360px] min-w-[88%] snap-center md:h-[696px] md:min-h-0 md:min-w-0", "(min-width: 768px) 459px, 88vw")}
        {galleryImage(
          active.images[2],
          2,
          `h-[72vw] min-h-[360px] min-w-[88%] snap-center md:col-span-2 md:h-auto md:min-h-0 md:min-w-0 ${thirdImageAspectClass}`,
          "(min-width: 768px) 1392px, 88vw",
        )}
      </div>
      {expandedImage && (
        <div role="dialog" aria-modal="true" aria-label="Expanded kitchen image" className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 md:p-10" onClick={() => setExpandedImage(null)}>
          <button type="button" onClick={() => setExpandedImage(null)} className="absolute right-5 top-5 grid size-12 place-items-center rounded-full border border-white/60 text-3xl font-light text-white" aria-label="Close expanded image">×</button>
          <div className="relative h-full w-full max-w-[1600px]" onClick={(event) => event.stopPropagation()}>
            <Image src={expandedImage} alt={`${active.label} kitchen enlarged`} fill sizes="100vw" className="object-contain" priority />
          </div>
        </div>
      )}
    </>
  );
}
