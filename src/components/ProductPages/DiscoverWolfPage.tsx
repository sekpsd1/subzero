"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DesignedWithYou } from "@/components/Home/DesignedWithYou";

const assets = {
  heroPoster:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:0b25fcce-e900-446e-aad3-a02309cbca8a/as/SZWC_Seattle_1359_4021FC_A_ADOBERGB.avif?assetname=SZWC_Seattle_1359_4021FC_A_ADOBERGB.tif&width=1920&max-quality=90",
  showroom: "/assets/subzero/discover/SZG_Miami_Showroom_51876.avif",
  showroomMarble: "/assets/subzero/wolf-showroom-marble.png",
  ranges:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:e144574f-107a-4554-9e59-32d532d538a0/as/ICB648PRO_ICBDF606CG_ICBPW602718.avif?assetname=ICB648PRO_ICBDF606CG_ICBPW602718.tif&width=1400&max-quality=90",
  ovens:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:5eec95ee-9bc3-4ae6-8c78-5911c2771f3d/as/V2_22_06_09_Retouch_SteamOvens_SubZero_Toolbox_CoffeeMachine_Bold_v2.avif?assetname=V2_22_06_09_Retouch_SteamOvens_SubZero_Toolbox_CoffeeMachine_Bold_v2.jpg&width=1400&max-quality=90",
  cooktops:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3de12754-7ea9-4718-91d3-d768b2a7fde2/as/SubZero-Wolf-JV-04.avif?assetname=SubZero-Wolf-JV-04.png&width=1400&max-quality=90",
  outdoor:
    "/assets/subzero/discover/LG_SLG_042919_3-1.jfif",
  discoverSubZero:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:1f5241f4-6db4-4462-a927-f43fa1e43179/as/SM_TCSLG_111621_Grill.avif?assetname=SM_TCSLG_111621_Grill.jpg&width=960&max-quality=90",
  discoverCove:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:24ec6ec9-5615-4793-aaeb-4692dfa57679/as/complete-your-kitchen-3.avif?assetname=complete-your-kitchen-3.jpg&width=960&max-quality=90",
  craft:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:d512d527-62bc-4001-a646-f9bbea9533ef/as/WR10_modal.avif?assetname=WR10_modal.jpg&width=1920&max-quality=90",
  precision:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:2d4b1d0e-6a46-4e67-8d8e-17fff8e23add/as/SZWC_Nashville_46455_R_RGB.avif?assetname=SZWC_Nashville_46455_R_RGB.jpg&width=1920&max-quality=90",
  crowd:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:bacca8c9-f528-4fc6-8216-06480c2d2506/as/SZWC_Nashville_46570_R_RGB_fadingmedia.avif?assetname=SZWC_Nashville_46570_R_RGB_fadingmedia.jpg&width=1920&max-quality=90",
  design:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:f550e635-f6c2-4eb8-aac3-e5fa69089807/as/SZ_Elemental_TCS_101123_MED1_WhiteDoor_BrassKnobs_Skirt.avif?assetname=SZ_Elemental_TCS_101123_MED1_WhiteDoor_BrassKnobs_Skirt.png&width=1920&max-quality=90",
};

const features = [
  {
    title: "Built to last for decades",
    copy: "Crafted with innovation and design excellence at their core, Wolf appliances are engineered with premium materials and rigorously tested to promise 20-plus years of everyday use.",
    image: assets.craft,
    alt: "Wolf range detail",
  },
  {
    title: "Reliable results on every recipe",
    copy: "Wolf technologies ensure precise, even heat across all fuel types and temperatures for remarkable flavor development in every dish.",
    image: assets.precision,
    alt: "Wolf steam oven open with talent",
  },
  {
    title: "Pleasing the toughest crowd",
    copy: "With ovens offering a variety of cooking modes for foolproof results, and cooktops and rangetops engineered to deliver exceptional heat control from simmer to sear, it’s no wonder chefs around the world praise Wolf.",
    image: assets.crowd,
    alt: "M Series multi-rack cooking",
  },
  {
    title: "A feast for the eyes, too",
    copy: "Whether your aesthetic is bold and modern or sleek and minimalistic, Wolf appliances are crafted to complement your home and lifestyle.",
    image: assets.design,
    alt: "Wolf dual fuel range with white door",
  },
];

const promos = [
  {
    eyebrow: "Ranges",
    title: "Ranges that say “yes, chef”",
    href: "/cooking/ranges",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:670ced7a-fae2-4f8e-b8bf-5f686584e5e6/as/W_BohoBelize_IR36551_Close_002.avif?assetname=W_BohoBelize_IR36551_Close_002.jpg&width=1920&max-quality=90",
  },
  {
    eyebrow: "Built-in ovens",
    title: "Delectable results, every time",
    href: "/products/cooking/built-in-ovens",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:b9994de0-a0be-4e5a-a7c7-e21427000f5f/as/Wolf_Montauk_2024_Product_Oven_03.avif?assetname=Wolf_Montauk_2024_Product_Oven_03.png&width=1920&max-quality=90",
  },
  {
    eyebrow: "Cooktops and rangetops",
    title: "Cooking with chef-level finesse",
    href: "/products/cooking/cooktops-rangetops",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:6797feb8-59af-48ab-9f70-8d0625f41bd6/as/MED_SLG_043019_4.avif?assetname=MED_SLG_043019_4.jpg&width=1920&max-quality=90",
  },
];

const wolfInspirationCategories = [
  {
    label: "Transitional",
    images: [
      "https://s7d9.scene7.com/is/image/szw/003_LG_SLG_92817?wid=1920&qlt=90",
      "https://s7d9.scene7.com/is/image/szw/one%20bennett%20park_003?wid=1440&qlt=90",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:29b67aa7-b112-4f0c-89a4-cfadc2d7a013/as/MED_SLGTC_ADA_041323_1.avif?assetname=MED_SLGTC_ADA_041323_1.jpg&width=1440&max-quality=90",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:92d41196-f45c-4fe5-8212-a0a5d813d197/as/SLG_MED_081522_3.avif?assetname=SLG_MED_081522_3.jpg&width=1440&max-quality=90",
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3de12754-7ea9-4718-91d3-d768b2a7fde2/as/SubZero-Wolf-JV-04.avif?assetname=SubZero-Wolf-JV-04.png&width=1440&max-quality=90",
    ],
  },
  { label: "Traditional", images: [assets.ranges, assets.showroom, assets.craft, assets.precision, assets.design] },
  { label: "Contemporary", images: [assets.ovens, assets.cooktops, assets.design, assets.precision, assets.ranges] },
];

const wolfLayeredCards = [
  {
    title: "Ranges",
    href: "/cooking/ranges",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:126a8411-83aa-4ae4-a1e8-23de7cab5f79/as/Ada_003v2.avif?assetname=Ada_003v2.png&width=1920&max-quality=90",
  },
  {
    title: "Built-In Ovens",
    href: "/products/cooking/built-in-ovens",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:2ac3c1c8-4482-47f2-81c5-209a13fde8ee/as/W02.avif?assetname=W02.jpg&width=1920&max-quality=90",
  },
  {
    title: "Cooktops and Rangetops",
    href: "/products/cooking/cooktops-rangetops",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:ad009616-6b5d-40ca-8d6f-0d76bc9d4c5f/as/W03.avif?assetname=W03.jpg&width=1920&max-quality=90",
  },
  {
    title: "Outdoor Cooking",
    href: "/products/outdoor",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:8a2967b8-7d3d-4ab9-b324-5f4ca6f950bc/as/LG_SLG_042919_3.avif?assetname=LG_SLG_042919_3.tif&width=1920&max-quality=90",
  },
];

const wolfCategoryGridItems = [
  {
    title: "Ranges",
    href: "/cooking/ranges",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:151bd4d0-4a55-4f4c-b5c8-815313d7bbe2/renditions/original/as/Ranges.svg?assetname=Ranges.svg",
  },
  {
    title: "Built-in ovens",
    href: "/products/cooking/built-in-ovens",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:192e5f9b-7202-4d5e-8926-1e015af3938c/renditions/original/as/Built-in-Ovens.svg?assetname=Built-in+Ovens.svg",
  },
  {
    title: "Cooktops and rangetops",
    href: "/products/cooking/cooktops-rangetops",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:237bdff2-1c98-4286-8c60-f9f9ed4361c0/renditions/original/as/Cooktops-Rangetops.svg?assetname=Cooktops-Rangetops.svg",
  },
  {
    title: "Module cooktops",
    href: "/products/cooking/module-cooktops-gas",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:a484767d-50c0-493f-8c51-ee649500dcd7/renditions/original/as/Modules.svg?assetname=Modules.svg",
  },
  {
    title: "Ventilation",
    href: "/products/cooking/ventilation",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:8ec8f3a0-7852-45e8-8050-65125ab99732/renditions/original/as/Ventilation.svg?assetname=Ventilation.svg",
  },
  {
    title: "Coffee systems",
    href: "/products/cooking/coffee-systems",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:ca9a8d04-c42b-40f4-a88f-d348c109c358/renditions/original/as/Coffee-Systems.svg?assetname=Coffee-Systems.svg",
  },
  {
    title: "Microwaves",
    href: "/products/cooking/microwaves",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:589abff0-730e-490a-a196-94fb98fe8fc0/renditions/original/as/Microwaves.svg?assetname=Microwaves.svg",
  },
  {
    title: "Vacuum seal drawers",
    href: "/products/cooking/drawers",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:edf59f9c-f314-4995-9fbb-0f0a415ff499/renditions/original/as/VSD.svg?assetname=VSD.svg",
  },
  {
    title: "Warming drawers",
    href: "/products/cooking/drawers",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:4befd29c-760a-4f31-9b97-8ea742d4597c/renditions/original/as/Warming-Drawers.svg?assetname=Warming-Drawers.svg",
  },
  {
    title: "Outdoor cooking",
    href: "/products/outdoor",
    image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:bb1ce5d0-4233-49d5-8fb6-3dd2a663b88b/renditions/original/as/Outdoor-Cooking.svg?assetname=Outdoor+Cooking.svg",
  },
];

function WolfLayeredImages() {
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
  const timelineProgress = scrollProgress * wolfLayeredCards.length * 2;
  const progressLineHeight = 8 + scrollProgress * 92;

  const scrollToSlide = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const targetStage = index === 0 ? 0 : index * 2 + 1;
    const targetProgress = targetStage / (wolfLayeredCards.length * 2);
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
      aria-label="Wolf cooking categories"
    >
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-start justify-center pt-5 md:pt-6">
        <div className="relative w-full max-w-[1320px]">
          <ul className="relative aspect-[1.6] min-h-[520px] overflow-hidden bg-[#d8d2c5]">
            {wolfLayeredCards.map((card, index) => {
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
                (index === wolfLayeredCards.length - 1 || timelineProgress < (index + 1) * 2);

              return (
                <li
                  key={card.title}
                  className="absolute inset-0 transition-transform duration-150 ease-out"
                  style={{ transform: `translateY(${translateY}%)`, zIndex: index + 1 }}
                  aria-hidden={!isActive}
                >
                  <Link href={card.href} className="relative block h-full w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 1440px) 1320px, calc(100vw - 48px)"
                      className="object-cover"
                      style={{ transform: `scale(${imageScale})` }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: overlayOpacity * 0.62 }} />
                    <div
                      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-white"
                      style={{ opacity: overlayOpacity, transform: `translateY(${(1 - overlayOpacity) * 10}px)` }}
                    >
                      <h2 className="font-serif text-[clamp(3rem,4vw,4.75rem)] leading-none">{card.title}</h2>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="absolute right-[-32px] top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="relative h-[100px] w-px bg-[#171715]/35">
              <div className="absolute left-0 top-0 w-px bg-[#171715]" style={{ height: `${progressLineHeight}%` }} />
              <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-between">
              {wolfLayeredCards.map((card, index) => (
                  <button
                    key={card.title}
                    type="button"
                    className="h-6 w-6 -translate-x-1/2"
                    aria-label={`Show ${card.title}`}
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
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 21L7 16M12 21L17 16M12 21V3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function WolfFadingMediaBlocks() {
  return (
    <section className="bg-[#f4f2ec] px-6 py-16 text-[#171715] md:px-12 md:py-20">
      <div className="mx-auto max-w-[1440px] space-y-16 md:space-y-20">
        {features.map((item, index) => (
          <article key={item.title} className="grid items-stretch md:min-h-[710px] md:grid-cols-2">
            <div className={`relative min-h-[390px] overflow-hidden md:min-h-full ${index % 2 ? "md:order-2" : ""}`}>
              <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className={`flex items-center px-7 py-12 md:px-16 lg:px-16 ${index % 2 ? "md:order-1" : ""}`}>
              <div className="max-w-[520px]">
                <h3 className={`font-serif text-[clamp(2.15rem,2.15vw,2.55rem)] leading-[0.98] ${item.title === "Built to last for decades" ? "md:whitespace-nowrap" : ""}`}>{item.title}</h3>
                <p className="mt-7 max-w-[500px] text-[1rem] leading-[1.45] text-black/80 md:text-[1.08rem]">{item.copy}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WolfShowroomInspiration() {
  return (
    <section className="bg-[#f4f2ec] px-6 py-16 text-[#171715] md:px-12 md:py-20">
      <div className="mx-auto grid max-w-[1120px] items-center bg-[#fbfaf6] p-6 md:grid-cols-[426px_1fr] md:gap-16 lg:gap-[104px]">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image src={assets.showroom} alt="Showroom consultation with Wolf appliances" fill sizes="(min-width: 1024px) 430px, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center py-8 md:py-0">
          <h2 className="max-w-[520px] font-serif text-[clamp(3rem,3.2vw,4rem)] leading-[1.05]">
            <span className="block md:whitespace-nowrap">Start your journey</span>
            <span className="block">in a showroom</span>
          </h2>
          <p className="mt-7 max-w-[470px] text-[1.05rem] leading-snug md:text-[1.08rem]">Our showrooms are where inspiration turns into informed decisions. Learn how a visit helps you plan, compare, and move forward with confidence.</p>
          <div className="mt-8"><PillLink href="/showroom/appointment">Get started</PillLink></div>
        </div>
      </div>

      <DesignedWithYou
        categories={wolfInspirationCategories}
        title="Dive into a world of design and curate your kitchen inspiration."
        copy=""
        ctaLabel="See more inspiration"
        ctaHref="/inspiration"
        sectionClassName="mt-20 !overflow-visible !bg-[#f4f2ec] !px-0 !pb-0 !pt-[76px]"
        headerClassName="!grid-cols-[minmax(0,920px)_1fr]"
        titleClassName="!max-w-[920px] !whitespace-normal !text-[clamp(3rem,3.2vw,3.8rem)]"
        galleryClassName="!mt-2"
        previewObjectPosition="left center"
      />
    </section>
  );
}

function WolfCategoryGrid() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-24 pt-28 text-[#171715] md:px-12 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-[1377px]">
        <h2 className="max-w-[830px] font-serif text-[clamp(3.1rem,3.15vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
          Unrivaled precision, power, and beauty
        </h2>
        <p className="mt-7 max-w-[570px] text-[1.05rem] leading-[1.45] md:text-[1.12rem]">
          From cooking to coffee, grills to ventilation, Wolf empowers your culinary vision indoors and out.
        </p>

        <div className="mt-16 grid gap-[6px] sm:grid-cols-2 lg:grid-cols-3">
          {wolfCategoryGridItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex aspect-square min-h-[330px] flex-col border border-[#cecabe] px-4 pb-8 pt-6 transition-colors hover:bg-[#ece9e1]"
            >
              <div className="relative flex min-h-0 flex-1 items-center justify-center">
                <Image
                  src={item.image}
                  alt=""
                  width={220}
                  height={220}
                  unoptimized
                  className="h-[70%] w-[66%] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="font-serif text-[clamp(1.75rem,1.7vw,2rem)] leading-none">{item.title}</h3>
            </Link>
          ))}
        </div>

        <div className="flex justify-center pt-10">
          <Link href="/showroom" className="inline-flex min-h-9 items-center rounded-full bg-[#77746e] px-5 text-sm font-bold text-white transition hover:bg-[#5f5c57]">
            Visit a showroom
          </Link>
        </div>
      </div>
    </section>
  );
}

function WolfDiscoverMore() {
  return (
    <section className="bg-[#cbc7bc] px-6 py-20 text-[#171715] md:px-12 md:py-24">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="mb-10 font-serif text-[clamp(3rem,3.5vw,4rem)] leading-none">
          Discover more
        </h2>

        <article className="grid bg-[#fbfaf6] md:grid-cols-[0.255fr_0.745fr]">
          <div className="flex min-h-[385px] flex-col justify-between p-7 md:min-h-[650px] md:p-6">
            <div>
              <h3 className="font-serif text-[clamp(2.15rem,2.45vw,2.9rem)] leading-[0.98]">
                Exceptional
                <br />
                outdoor living
              </h3>
              <p className="mt-8 max-w-[285px] text-[0.95rem] leading-tight">
                Entertain confidently outdoors with the same superior refrigeration and cooking technologies you trust from Sub-Zero and Wolf.
              </p>
            </div>
            <Link
              href="/products/outdoor"
              className="inline-flex min-h-[52px] w-fit items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold transition hover:bg-[#171715] hover:text-white"
            >
              Explore Outdoor
            </Link>
          </div>

          <div className="relative min-h-[385px] overflow-hidden md:min-h-[650px]">
            <Image
              src={assets.outdoor}
              alt="Outdoor kitchen and dining space with premium Wolf appliances"
              fill
              unoptimized
              sizes="1038px"
              className="object-cover"
            />
          </div>
        </article>

        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {[
            {
              title: "Cleaner air for fresher food",
              copy: "Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies.",
              cta: "Explore Sub-Zero",
              href: "/refrigeration/discover-sub-zero",
              image: assets.discoverSubZero,
              alt: "Sub-Zero refrigeration integrated into custom cabinetry",
            },
            {
              title: "A pristine and peaceful clean",
              copy: "Your silent partner in the kitchen, Cove's intuitive, customizable features offer a worry-free wash and dry.",
              cta: "Explore Cove",
              href: "https://www.subzero-wolf.com/dishwashing/discover-cove",
              image: assets.discoverCove,
              alt: "Cove dishwasher controls in a refined kitchen",
            },
          ].map((item) => (
            <article key={item.title} className="bg-[#fbfaf6]">
              <div className="relative aspect-[1.6] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="696px"
                  className="object-cover"
                />
              </div>
              <div className="grid min-h-[212px] gap-7 p-6 md:grid-cols-[0.48fr_0.52fr]">
                <div className="flex flex-col justify-between gap-6">
                  <h3 className="font-serif text-[clamp(2.05rem,2.2vw,2.6rem)] leading-[1.02]">
                    {item.title}
                  </h3>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[52px] w-fit items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold transition hover:bg-[#171715] hover:text-white"
                  >
                    {item.cta}
                  </Link>
                </div>
                <p className="text-[0.95rem] leading-tight">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-bold transition ${
        light ? "bg-white text-[#171715] hover:bg-[#e7e4dc]" : "bg-[#171715] text-white hover:bg-[#373632]"
      }`}
    >
      {children}
    </Link>
  );
}

export function DiscoverWolfPage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const video = heroVideoRef.current;
      if (video?.duration) setHeroProgress(video.currentTime / video.duration);
      frame = window.requestAnimationFrame(updateProgress);
    };

    frame = window.requestAnimationFrame(updateProgress);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleHeroVideo() {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setHeroPaused(false);
    } else {
      video.pause();
      setHeroPaused(true);
    }
  }

  return (
    <main className="bg-[#f2f0ea] text-[#171715]">
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-black text-white">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={assets.heroPoster}
          aria-label="Wolf culinary performance video"
        >
          <source src="/assets/subzero/wolf-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.05)_28%,rgba(0,0,0,0.10)_70%,rgba(0,0,0,0.42)_100%)]" />
        <button
          type="button"
          onClick={toggleHeroVideo}
          aria-label={heroPaused ? "Play hero video" : "Pause hero video"}
          className="group absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full text-white transition md:bottom-10 md:right-10"
        >
          <HeroProgressRing progress={heroProgress} />
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 transition group-hover:bg-white group-hover:text-black">
            {heroPaused ? <Play size={17} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
          </span>
        </button>
      </section>

      <section className="px-6 pb-18 pt-24 text-center md:px-12 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-[860px]">
          <Image
            src="/assets/subzero/wolf-logo.svg"
            alt="Wolf"
            width={132}
            height={38}
            className="mx-auto h-auto w-[102px]"
          />
          <h1 className="mt-8 font-serif text-[clamp(2.75rem,3.6vw,4.5rem)] leading-[0.98] tracking-[-0.025em]">
            Effortless control,<br />maximum flavor
          </h1>
          <p className="mx-auto mt-7 max-w-[690px] text-[1.03rem] leading-[1.45] text-black/78 md:text-[1.12rem]">
            Striking form. Superior function. Born in world-class chefs&apos; kitchens, Wolf brings
            unparalleled precision and intuitive control—and confidence—in the hands of every cook.
            Every product inspires and empowers your home cooking experience.
          </p>
          <div className="mt-7"><PillLink href="/showroom">Experience in a showroom</PillLink></div>
        </div>

      </section>

      <WolfLayeredImages />

      <section className="overflow-hidden bg-[#f4f2ec] px-6 pt-28 text-center text-[#171715] md:px-12 md:pt-32">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mx-auto max-w-[1220px] font-serif text-[clamp(3.5rem,7.2vw,8.5rem)] leading-[0.92] tracking-[-0.04em]">Heritage honed in professional kitchens</h2>
          <p className="mx-auto mt-8 max-w-[1080px] font-serif text-[clamp(1.35rem,1.65vw,2rem)] leading-[1.18]">Coming from the culinary world—where precision is paramount—Wolf appliances deliver flawless results for home cooks, whether for everyday dinners or grand celebrations.</p>
          <div className="mt-7"><PillLink href="/products/cooking">Explore Wolf products</PillLink></div>
          <div className="hidden">
            <Image src={assets.craft} alt="Wolf range with sauté pan" fill sizes="(min-width: 768px) 820px, 100vw" className="object-cover" />
            <Link href="/showroom" className="absolute bottom-5 right-5 inline-flex min-h-10 items-center rounded-full bg-black/60 px-5 text-sm font-bold text-white transition hover:bg-black/80">Visit a showroom</Link>
          </div>
        </div>
      </section>

      <WolfFadingMediaBlocks />

      <section className="bg-[#171715] text-white">
        {promos.map((item) => (
          <article key={item.title} className="relative min-h-[720px] overflow-hidden md:min-h-[100svh]">
            <Image src={item.image} alt={item.eyebrow} fill sizes="100vw" className="object-cover" priority={item.eyebrow === "Ranges"} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/28 to-transparent" />
            <div className="relative flex min-h-[720px] max-w-[650px] flex-col px-7 py-12 md:min-h-[100svh] md:px-12 md:py-11">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/90">{item.eyebrow}</p>
              <h2 className="mt-6 font-serif text-[clamp(3.25rem,4.8vw,5.25rem)] leading-[0.96]">{item.title}</h2>
              <div className="mt-auto pt-12 md:pb-[20svh]"><PillLink href={item.href} light>Discover {item.eyebrow.toLowerCase()}</PillLink></div>
            </div>
          </article>
        ))}
      </section>

      <WolfShowroomInspiration />
      <WolfCategoryGrid />
      <WolfDiscoverMore />
    </main>
  );
}

function HeroProgressRing({ progress }: { progress: number }) {
  const radius = 21;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
      <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="2" />
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - Math.min(Math.max(progress, 0), 1))}
      />
    </svg>
  );
}
