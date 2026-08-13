"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const assetRoot = "/assets/sustainability";

const pillars = [
  {
    title: "Thoughtful manufacturing",
    copy: "Built to last for decades—not just years—our products emphasize exceptional durability, repairability, and timeless style that withstands trends. We proudly design and engineer everything in the USA, with manufacturing facilities located in Wisconsin, Arizona, and Iowa. More than 75 percent of our materials are sourced domestically, and our facilities are committed to zero-waste-to-landfill goals.",
    image: `${assetRoot}/thoughtful-manufacturing.avif`,
    alt: "A team member carefully assembling a Sub-Zero appliance in a manufacturing facility",
  },
  {
    title: "Efficient supply chains",
    copy: "We use advanced transportation lifecycle management and GPS-integrated smart technologies to optimize shipping across all levels. A key strategy is using intermodal rail for most product transport, significantly cutting emissions compared to traditional trucking.",
    image: `${assetRoot}/efficient-supply-chains.avif`,
    alt: "Freight containers traveling by intermodal rail",
  },
  {
    title: "Better buildings",
    copy: "We take pride in creating sustainable buildings and spaces. Across our facilities, we conduct annual energy reviews to identify opportunities to improve efficiency and reduce greenhouse gas emissions. Also, we currently operate three facilities equipped with solar photovoltaic systems, reflecting our dedication to responsible energy solutions.",
    image: `${assetRoot}/better-buildings.avif`,
    alt: "The Sub-Zero Group Innovation Center in Fitchburg, Wisconsin",
  },
] as const;

const brands = [
  {
    eyebrow: "Fresher food",
    title: "Sub-Zero Refrigeration",
    copy: "Sub-Zero refrigeration technology precisely controls temperature, optimizes humidity, and scrubs the air of impurities. The result? Food that’s fresher longer—meaning fewer trips to the store and less food waste going to landfills. Full-size models use less energy than a 50-watt light bulb!",
    image: `${assetRoot}/sub-zero-refrigeration.avif`,
    alt: "Fresh vegetables stored in Sub-Zero refrigeration",
  },
  {
    eyebrow: "Precision and control",
    title: "Wolf Cooking",
    copy: "Wolf induction and electric convection technologies speed up cooking time while using less energy. Convection ovens cook food faster and at lower temperatures, while induction cooktops and ranges generate nearly instantaneous heat with less wasted energy and faster boiling times.",
    image: `${assetRoot}/wolf-cooking.avif`,
    alt: "Food being prepared on a Wolf induction cooktop",
  },
  {
    eyebrow: "Spotless cleaning",
    title: "Cove Dishwashing",
    copy: "Cove is engineered to get dishes spotless and dry the first time, so you don’t have to rewash them. The advanced, water-conserving wash system features a four-stage filtration system that traps debris and circulates only clean water. It even uses recycled denim for insulation and quiet operation.",
    image: `${assetRoot}/cove-dishwashing.avif`,
    alt: "Clean dishes arranged inside a Cove dishwasher",
  },
] as const;

const cultureSlides = [
  {
    title: "Cultivating freshness",
    copy: "The Sub-Zero hydroponics lab, cultivating lettuce in product development.",
    image: `${assetRoot}/cultivating-freshness.avif`,
    alt: "Lettuce growing in the Sub-Zero hydroponics lab",
  },
  {
    title: "Holistic health",
    copy: "The two-acre organic garden on our Wisconsin campus, which supplies bountiful fresh produce for events.",
    image: `${assetRoot}/harvest-haven.avif`,
    alt: "The organic garden at the Sub-Zero Group Wisconsin campus",
  },
  {
    title: "Well-being for all",
    copy: "We support healthy lifestyles with an on-site medical clinic at our headquarters, fitness centers, and extensive wellness programs for employees.",
    image: `${assetRoot}/walking-path.avif`,
    alt: "A walking path through the Sub-Zero Group campus",
  },
] as const;

const stories = [
  { title: "Positive Energy", href: "https://lifestyle.subzero-wolf.com/lifestyle/positive-energy", image: `${assetRoot}/positive-energy.avif`, alt: "Gardeners holding soil over a garden bed" },
  { title: "Farming the Future", href: "https://lifestyle.subzero-wolf.com/food/farming-the-future", image: `${assetRoot}/farming-the-future.avif`, alt: "Two people tending plants in a garden" },
  { title: "Culinary Getaway", href: "https://lifestyle.subzero-wolf.com/places/culinary-getaway", image: `${assetRoot}/culinary-getaway.avif`, alt: "A rustic lodge surrounded by trees at sunset" },
] as const;

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

export function SustainabilityPageContent() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = cultureSlides[activeSlide];
  const nextSlide = cultureSlides[(activeSlide + 1) % cultureSlides.length];

  function changeSlide(direction: -1 | 1) {
    setActiveSlide((current) => (current + direction + cultureSlides.length) % cultureSlides.length);
  }

  return (
    <main className="overflow-hidden bg-[#f2f0e9] text-[#171715]">
      <section aria-labelledby="sustainability-hero-title" className="relative h-[100svh] min-h-[620px] text-white">
        <Image src={`${assetRoot}/hero.avif`} alt="Green agricultural fields glowing in the evening sun" fill priority sizes="100vw" className="object-cover object-[54%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.24),rgba(0,0,0,.04)_45%,rgba(0,0,0,.48))]" />
        <h2 id="sustainability-hero-title" style={serif} className="absolute bottom-6 left-5 right-5 text-[32px] font-normal leading-[1.1] md:bottom-12 md:left-6 md:text-[40px] md:leading-[44px]">Our commitment to responsible luxury</h2>
      </section>

      <section aria-labelledby="sustainability-intro-title" className="px-5 pb-24 pt-16 md:px-8 md:pb-[104px] md:pt-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-[1050px] text-center">
            <h1 id="sustainability-intro-title" style={serif} className="text-[46px] font-normal leading-[1.02] md:text-[64px] xl:text-[80px] xl:leading-[81.6px]">Fostering sustainability</h1>
            <p className="mx-auto mt-5 max-w-[900px] text-[14px] leading-[1.35] md:text-[16px]">At Sub-Zero, Wolf, and Cove, sustainability is more than a goal—it’s a core value woven into every aspect of our business. When you bring our products into your home, you can have the peace of mind that you’re choosing appliances engineered for energy efficiency and long life.</p>
          </div>

          <div className="mt-20 space-y-20 md:mt-28 md:space-y-[64px]">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className={`grid items-center gap-8 md:gap-16 ${
                  index % 2
                    ? "md:ml-16 md:grid-cols-[3fr_5fr]"
                    : "md:mr-16 md:grid-cols-[5fr_3fr]"
                }`}
              >
                <div className={`relative aspect-[1.157/1] overflow-hidden ${index % 2 ? "md:order-2" : ""}`}>
                  <Image src={pillar.image} alt={pillar.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className={`md:px-2 ${index % 2 ? "md:order-1" : ""}`}>
                  <h2 style={serif} className="text-[36px] font-normal leading-[1.08] md:text-[40px] md:leading-[44px]">{pillar.title}</h2>
                  <p className="mt-5 max-w-[500px] text-[15px] leading-[1.35] md:text-[16px]">{pillar.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Sustainable appliances by brand" className="px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto grid max-w-[1392px] gap-14 md:grid-cols-3 md:gap-2">
          {brands.map((brand) => (
            <article key={brand.title}>
              <div className="relative aspect-[1.6/1] overflow-hidden"><Image src={brand.image} alt={brand.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div>
              <div className="min-h-[258px] bg-[#faf9f5] px-6 pb-6 pt-[23px]">
                <p className="text-[12px] uppercase leading-[17px] tracking-[0.14em] md:text-[14px]">{brand.eyebrow}</p>
                <h2 style={serif} className="mt-1 text-[34px] font-normal leading-[1.08] md:text-[40px] md:leading-[44px]">{brand.title}</h2>
                <p className="mt-5 max-w-[420px] text-[14px] leading-[1.38] md:text-[15px]">{brand.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="culture-title" className="pb-24 pt-2 md:pb-[166px] md:pt-2">
        <div className="mx-auto max-w-[1392px] px-5 md:px-0">
          <h2 id="culture-title" style={serif} className="text-[43px] font-normal leading-[1.04] md:text-[60px] md:leading-[66px]">Growing a positive culture</h2>
          <div className="mt-7 flex justify-end md:mt-10">
            <div className="flex items-center gap-5 md:gap-12">
              <p aria-live="polite" className="min-w-[48px] text-center text-[14px]">{activeSlide + 1} / {cultureSlides.length}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous slide" className="grid h-12 w-12 place-items-center rounded-full border border-[#171715]/60 transition hover:bg-[#171715] hover:text-white md:h-8 md:w-8"><ArrowLeft size={15} strokeWidth={1.5} /></button>
                <button type="button" onClick={() => changeSlide(1)} aria-label="Next slide" className="grid h-12 w-12 place-items-center rounded-full border border-[#171715]/60 transition hover:bg-[#171715] hover:text-white md:h-8 md:w-8"><ArrowRight size={15} strokeWidth={1.5} /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex gap-5 pl-5 md:mt-6 md:gap-2 md:pl-[max(32px,calc((100vw-1392px)/2))]">
          <figure className="w-[calc(100vw-40px)] shrink-0 md:w-[min(1290px,67.75vw)]">
            <div className="relative aspect-[1.5/1] overflow-hidden bg-[#ddd9d0] md:aspect-[1.78/1]"><Image key={slide.image} src={slide.image} alt={slide.alt} fill sizes="(min-width: 768px) 74vw, 100vw" className="object-cover" /></div>
            <figcaption className="mt-4 text-[14px] leading-[1.35]"><strong className="block font-semibold">{slide.title}</strong>{slide.copy}</figcaption>
          </figure>
          <div aria-hidden="true" className="hidden aspect-[2.093/1] w-[min(1214px,63.75vw)] shrink-0 self-start overflow-hidden md:block">
            <div className="relative aspect-video w-full">
              <Image src={nextSlide.image} alt="" fill sizes="64vw" className="scale-[1.08] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-title" className="px-5 py-20 md:px-8 md:py-[108px]">
        <div className="mx-auto grid max-w-[1120px] bg-[#faf9f5] p-5 md:grid-cols-[426px_1fr] md:p-6">
          <div className="relative aspect-square overflow-hidden"><Image src={`${assetRoot}/contact.avif`} alt="Young plants growing in cultivated soil" fill sizes="(min-width: 768px) 426px, 100vw" className="object-cover" /></div>
          <div className="flex flex-col justify-center px-2 py-10 md:py-0 md:pl-[104px] md:pr-10">
            <h2 id="contact-title" style={serif} className="text-[36px] font-normal leading-[1.1] md:max-w-[455px] md:text-[40px] md:leading-[44px]">Connect with our organization</h2>
            <p className="mt-6 text-[15px] leading-[1.35] md:max-w-[455px] md:text-[16px]">If you have suggestions or questions about our sustainability efforts, please reach out.</p>
            <Link href="mailto:sustainability@subzero.com" className="mt-7 inline-flex h-12 w-fit items-center rounded-full bg-[#171715] px-8 text-[14px] font-semibold text-white transition hover:bg-black/75 md:h-[52px]">Contact us</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="climate-title" className="px-5 pb-[108px] pt-14 text-center md:px-8 md:pb-[140px] md:pt-12">
        <h2 id="climate-title" style={serif} className="text-[43px] font-normal leading-[1.05] md:text-[60px] md:leading-[66px]">2025 Climate Report</h2>
        <p className="mx-auto mt-5 max-w-[900px] text-[14px] leading-[1.4] md:text-[16px]">This report reflects a collaborative effort to integrate climate-related risks and opportunities into Sub-Zero Group Inc.’s business strategy and operations, highlighting the significance of organizational awareness. As the company progresses its sustainability journey, it will continue to enhance its ESG reporting.</p>
        <Link href="https://haven.subzero.com/AssetLink/mj8p1e5nr42h576807a455y08iueq42t.pdf" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex h-12 items-center rounded-full bg-[#171715] px-8 text-[14px] font-semibold text-white transition hover:bg-black/75">See report</Link>
      </section>

      <section aria-labelledby="stories-title" className="bg-[#dddbd3] px-5 py-16 md:px-8 md:py-[72px]">
        <div className="mx-auto max-w-[1392px]">
          <h2 id="stories-title" style={serif} className="text-[34px] font-normal leading-[1.1] md:text-[40px] md:leading-[44px]">Stories from Sub-Zero, Wolf, and Cove</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3 md:gap-2">
            {stories.map((story) => (
              <Link key={story.title} href={story.href} className="group relative aspect-[.75/1] overflow-hidden text-white">
                <Image src={story.image} alt={story.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <span style={serif} className="absolute bottom-5 left-5 right-5 text-[31px] leading-[1.05] md:text-[40px] md:leading-[44px]">{story.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
