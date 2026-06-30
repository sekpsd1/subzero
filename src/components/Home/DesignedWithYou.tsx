"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const designCategories = [
  {
    label: "Transitional",
    images: [
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:70898477-c56b-42bf-b046-8c11b49eb6ac/as/MED_GreenBold_SLGTC_022723_1-V2.avif?assetname=MED_GreenBold_SLGTC_022723_1-V2.jpg",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3de12754-7ea9-4718-91d3-d768b2a7fde2/as/SubZero-Wolf-JV-04.avif?assetname=SubZero-Wolf-JV-04.png",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:902166d3-b002-4391-8fea-d2ac16b3bd57/as/MED_SLG_LIVINGRM_DEU_3.avif?assetname=MED_SLG_LIVINGRM_DEU_3.tif",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:c845447a-dbec-4715-afc3-0dd3381f0b05/as/003_LG_SLG_92817.avif?assetname=003_LG_SLG_92817.tif",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:87dd0c1a-c1c4-490c-9237-a1a3b29ae631/as/TriBrand_Gladwyne_PA_55378.avif?assetname=TriBrand_Gladwyne_PA_55378.tif",
    ],
  },
  {
    label: "Traditional",
    images: [
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:36d68ebb-1e1c-4e7b-b9fc-291b1e6fe305/as/Finchley-Rd-SS-20.avif?assetname=Finchley-Rd-SS-20.jpg",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:fb544016-e4ec-4fe5-80a2-bd311768b7bd/as/SZWC_IR_Hype_56193_R_RGB.avif?assetname=SZWC_IR_Hype_56193_R_RGB.tif",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:6c3d4c74-f758-4446-9e4f-e4eda1fe96e1/as/1603-Elmhurst---NH-2.avif?assetname=1603+Elmhurst+-+NH-2.jpg",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:0226dac9-e644-40cf-8d55-46ad431f5eae/as/SubZero-Wolf-BB-020.avif?assetname=SubZero-Wolf-BB-020.jpg",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:0f2ca9e5-6e10-4733-849c-9be31a3809df/as/MED_TCS_MACARTHUR_8.avif?assetname=MED_TCS_MACARTHUR_8.tif",
    ],
  },
  {
    label: "Contemporary",
    images: [
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:5eec95ee-9bc3-4ae6-8c78-5911c2771f3d/as/V2_22_06_09_Retouch_SteamOvens_SubZero_Toolbox_CoffeeMachine_Bold_v2.avif?assetname=V2_22_06_09_Retouch_SteamOvens_SubZero_Toolbox_CoffeeMachine_Bold_v2.jpg",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:1330ac36-eea8-4a36-8f59-110a17d0fd01/as/BOULANGER_LG_KDC_15-16_81717_3_PRIMARY.avif?assetname=BOULANGER_LG_KDC_15-16_81717_3_PRIMARY.jpg",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:32d1f57a-a41e-40a1-b824-abeaa75480b1/as/24-SUBZERO-PRO-IR-UPDATE_S01-MODERN-HIGH-RISE_EST_(F04)BLK.avif?assetname=24-SUBZERO-PRO-IR-UPDATE_S01-MODERN-HIGH-RISE_EST_%28F04%29BLK.tif",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:917beb89-da38-48dd-82a7-5812301c6283/as/photo-113882.avif?assetname=photo-113882.jpg",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:96fd605d-028f-4181-b286-e17759c98575/as/Sub_Zero_Euro_Mid_Cove.avif?assetname=Sub_Zero_Euro_Mid_Cove.jpeg",
    ],
  },
];

export function DesignedWithYou() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const category = designCategories[activeCategory];
  const nextSlide = (activeSlide + 1) % category.images.length;

  function selectCategory(index: number) {
    setActiveCategory(index);
    setActiveSlide(0);
  }

  function goToPrevious() {
    setActiveSlide((current) => (current === 0 ? category.images.length - 1 : current - 1));
  }

  function goToNext() {
    setActiveSlide((current) => (current + 1) % category.images.length);
  }

  return (
    <section className="overflow-hidden bg-[#f4f2ec] px-5 pb-24 pt-6 text-[#171715] md:px-8 md:pb-32 md:pt-7">
      <div className="mx-auto max-w-[1392px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_1fr] lg:items-end">
          <div className="bg-transparent">
            <h2 className="bg-transparent font-serif text-[44px] leading-[1.04] md:text-[58px] lg:whitespace-nowrap">
              Designed with you in mind
            </h2>
            <p className="mt-6 max-w-[520px] text-base leading-[1.35]">
              From midcentury modern to mountain lodge aesthetics, get inspired
              by award-winning, one-of-a-kind kitchens featuring Sub-Zero and Wolf.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="inline-flex rounded-full border border-[#c8c3b7] bg-[#f7f5ef] p-1">
            {designCategories.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => selectCategory(index)}
                className={cn(
                  "h-8 rounded-full px-5 text-sm font-semibold transition",
                  activeCategory === index
                    ? "bg-[#11110f] text-white"
                    : "text-[#171715] hover:bg-[#e4e0d5]",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4">
            <span className="text-base">
              {activeSlide + 1} / {category.images.length}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous design"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#171715] text-[#171715] transition hover:bg-[#171715] hover:text-white"
              >
                <ChevronLeft size={18} strokeWidth={1.35} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next design"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#171715] text-[#171715] transition hover:bg-[#171715] hover:text-white"
              >
                <ChevronRight size={18} strokeWidth={1.35} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2 md:gap-3 xl:w-[calc(100%+((100vw-1392px)/2))]">
          <div className="relative h-[470px] min-w-0 flex-[1_1_auto] overflow-hidden bg-[#dedbd1] md:h-[654px] lg:h-[668px]">
            <Image
              key={`${category.label}-${activeSlide}`}
              src={category.images[activeSlide]}
              alt={`${category.label} kitchen inspiration ${activeSlide + 1}`}
              fill
              sizes="(min-width: 1280px) 1160px, (min-width: 768px) 76vw, 100vw"
              className="animate-[designImageFade_520ms_ease_both] object-cover"
            />
          </div>
          <div className="relative hidden h-[470px] w-[26%] shrink-0 overflow-hidden bg-[#dedbd1] md:block lg:h-[523px]">
            <Image
              key={`${category.label}-next-${nextSlide}`}
              src={category.images[nextSlide]}
              alt={`${category.label} kitchen inspiration preview`}
              fill
              sizes="360px"
              className="animate-[designImageFade_520ms_ease_both] object-cover"
            />
          </div>
        </div>

      </div>

      <div className="flex w-full justify-center pt-14">
        <a
          href="/inspiration"
          className="inline-flex h-12 min-w-[224px] items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-semibold text-[#171715] transition hover:bg-[#171715] hover:text-white"
        >
          Discover the possibilities
        </a>
      </div>

      <style jsx global>{`
        @keyframes designImageFade {
          from {
            opacity: 0;
            transform: translate3d(18px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
