import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { OutdoorHotspotFeature } from "@/components/ProductPages/OutdoorHotspotFeature";
import { OutdoorInspirationCarousel } from "@/components/ProductPages/OutdoorInspirationCarousel";

const serif: CSSProperties = {
  fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif',
};

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  hero: `${aem}38dac182-e3b5-4f1d-bed4-89f7ba7ff08b/as/LG_TCS_111418.avif?assetname=LG_TCS_111418.tif&width=1920&max-quality=90`,
  elements: `${aem}f1e487db-b9bf-4e0d-9a3c-72a9996a738a/as/discover-sub-zero-010b.avif?assetname=discover-sub-zero-010b.png&width=1920&max-quality=90`,
  confidence: `${aem}f6382da5-f12c-4a87-94a3-43a241c82880/as/MD_SLG_042919_4a.avif?assetname=MD_SLG_042919_4a.tif&width=1440&max-quality=90`,
  grill: `${aem}5bbe8b65-0760-4fd2-a73f-7a2cbb9aea56/as/SM_SLG_042919_1b.avif?assetname=SM_SLG_042919_1b.jpg&width=1200&max-quality=90`,
  refrigeration: `${aem}06214498-60d9-4f00-bd7f-20e24eac1bf8/as/SM_TCS_PIER52_2.avif?assetname=SM_TCS_PIER52_2.jpg&width=1200&max-quality=90`,
  warming: `${aem}7e8c9e8a-5e7a-4ac3-a285-ca0f9902fe49/as/MD_WWD30O_OPEN_TCS_091818.avif?assetname=MD_WWD30O_OPEN_TCS_091818.jpg&width=1200&max-quality=90`,
  inspiration: `${aem}28443823-953e-4aad-aa2c-169440fc79bd/as/Outdoor-Kitchen-3---Central-America.avif?assetname=Outdoor+Kitchen+3+-+Central+America.jpg&width=1600&max-quality=90`,
  showroom: `${aem}8fb0da74-6d9a-442e-9e5a-42564fc05540/as/SZG_Miami_Showroom_51876.avif?assetname=SZG_Miami_Showroom_51876.jpg&width=800&max-quality=90`,
  wolf: `${aem}0b25fcce-e900-446e-aad3-a02309cbca8a/as/SZWC_Seattle_1359_4021FC_A_ADOBERGB.avif?assetname=SZWC_Seattle_1359_4021FC_A_ADOBERGB.tif&width=1440&max-quality=90`,
  subzero: `${aem}81756aa7-f917-449b-a5e8-335bdaaebd88/as/SM_TCSLG_111621_Grill.avif?assetname=SM_TCSLG_111621_Grill.jpg&width=900&max-quality=90`,
  cove: `${aem}390cad36-9e50-4e66-9ae9-feb55e0bd553/as/cove-dishwashing.avif?assetname=cove-dishwashing.jpg&width=900&max-quality=90`,
  grillingIcon: `${aem}9e7aa4bd-7dd2-4355-abc0-bc4566e7959e/renditions/original/as/Outdoor_Outdoor-Cooking.svg?assetname=Outdoor_Outdoor+Cooking.svg`,
  refrigerationIcon: `${aem}cf477488-786d-4cfb-9464-b62446d32dcc/renditions/original/as/Outdoor_DEU_Refrigeration.svg?assetname=Outdoor_DEU_Refrigeration.svg`,
  ventilationIcon: `${aem}b17e6a46-4947-485c-8520-bcf74145ad51/renditions/original/as/Outdoor_Ventilation.svg?assetname=Outdoor_Ventilation.svg`,
  warmingIcon: `${aem}cc0003d9-801e-4a30-be37-c6111583b0af/renditions/original/as/Outdoor_Warming-Drawers.svg?assetname=Outdoor_Warming-Drawers.svg`,
  iceIcon: `${aem}5f2dc876-91c1-4a8b-9cb3-0b29423a797b/renditions/original/as/DEU_Ice-makers.svg?assetname=DEU_Ice+makers.svg`,
};

const productStories = [
  {
    title: "Wolf grills",
    copy: "Wolf Grills deliver searing heat, precision control, and even cooking across every grate.",
    cta: "Explore grills",
    href: "/cooking/outdoor",
    image: assets.grill,
  },
  {
    title: "Sub-Zero undercounter refrigeration",
    copy: "Convenient outdoor refrigeration options abound, from wine storage and drawers to beverage centers, and more.",
    cta: "Explore all outdoor refrigeration",
    href: "/refrigeration/outdoor",
    image: assets.refrigeration,
  },
  {
    title: "Warming drawers and storage",
    copy: "Durable stainless steel is tested to resist extreme temperatures and corrosion, and constructed to live outside full-time.",
    cta: "Explore outdoor warming and storage",
    href: "/cooking/drawers",
    image: assets.warming,
  },
] as const;

const categories = [
  ["Grilling & Cooking", assets.grillingIcon, "/cooking/view-all-cooking/outdoor?default.categories=outdoor%2Fcooking-grilling"],
  ["Refrigeration", assets.refrigerationIcon, "/refrigeration/outdoor"],
  ["Ventilation", assets.ventilationIcon, "/cooking/ventilation"],
  ["Warming Drawers", assets.warmingIcon, "/cooking/drawers"],
  ["Ice Makers", assets.iceIcon, "/outdoor/view-all-outdoor?default.categories=outdoor%2Fice-maker"],
] as const;

const inspirationSlides = [
  {
    src: assets.hero,
    alt: "Wolf outdoor grill and matching range hood in a white poolside outdoor kitchen.",
  },
  {
    src: assets.inspiration,
    alt: "Covered outdoor kitchen with dark wood cabinetry and mountain views.",
  },
  {
    src: "https://s7d9.scene7.com/is/image/szw/LG_BSTYLE_091719_6-1?wid=1440&qlt=90",
    alt: "Freestanding Wolf grill on a compact city patio.",
  },
  {
    src: "https://s7d9.scene7.com/is/image/szw/SubZero-Wolf-Outdoor-01?wid=1440&qlt=90",
    alt: "Built-in Wolf grill in a brick outdoor kitchen.",
  },
  {
    src: "https://s7d9.scene7.com/is/image/szw/LG_SLG_042919_3-1?wid=1440&qlt=90",
    alt: "Stone outdoor kitchen and covered lounge at dusk.",
  },
] as const;

function PillLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-10 items-center justify-center rounded-full px-6 text-[12px] font-semibold transition ${
        dark ? "bg-[#171715] text-white hover:bg-black" : "border border-[#292824] hover:bg-[#292824] hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

export function DiscoverOutdoorPage() {
  return (
    <main className="overflow-hidden bg-[#f4f1e9] text-[#201f1c]" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <section className="relative h-[58svh] min-h-[440px] md:h-[100svh] md:min-h-[760px] md:max-h-[1080px]">
        <Image src={assets.hero} alt="Luxury outdoor kitchen beside a swimming pool" fill priority sizes="100vw" className="object-cover object-center" />
      </section>

      <section className="px-6 py-16 text-center md:py-10">
        <h1 style={serif} className="text-[46px] font-light leading-[1.02] md:text-[64px] xl:text-[80px]">Exceptional outdoor living</h1>
        <p className="mx-auto mt-6 max-w-[680px] text-[14px] font-light leading-[1.5] md:text-[16px]">
          Experience the same confidence in fresh food preservation and precise cooking outside with Sub-Zero and Wolf luxury outdoor appliances. Combining iconic design with durable construction, they perform flawlessly, rain or shine.
        </p>
        <div className="mt-7"><PillLink href="/showroom" dark>Experience in a showroom</PillLink></div>
      </section>

      <section className="pt-6 md:pt-0">
        <h2 style={serif} className="max-w-[620px] px-6 pb-7 text-[32px] font-light leading-[1.1] md:px-8 md:text-[40px]">Master the elements of<br className="hidden md:block" /> refined outdoor entertaining</h2>
        <OutdoorHotspotFeature background={assets.elements} />
      </section>

      <section className="px-6 pb-16 pt-20 text-center md:pb-32 md:pt-32">
        <h2 style={serif} className="text-[42px] font-light leading-[1.05] md:text-[60px]">Your outdoor oasis</h2>
        <p className="mx-auto mt-6 max-w-[700px] text-[14px] font-light leading-[1.5] md:text-[16px]">With Sub-Zero and Wolf, you can picture yourself preparing the same gourmet meals outdoors as you do indoors. From multi-function grills to warming drawers, and undercounter refrigeration, outdoor entertaining has never been so effortless.</p>
        <div className="mt-7"><PillLink href="/cooking/outdoor" dark>View all outdoor</PillLink></div>
      </section>

      <section className="mx-auto max-w-[1392px] px-6 pb-24 md:pb-16">
        <div className="relative aspect-[16/9] overflow-hidden"><Image src={assets.confidence} alt="Family and friends entertaining in an outdoor kitchen" fill sizes="(min-width: 1400px) 1344px, 100vw" className="object-cover" /></div>
        <h2 style={serif} className="mx-auto mt-10 max-w-[720px] text-center text-[32px] font-light leading-[1.12] md:text-[40px]">From drinks to dinner, Sub-Zero and<br className="hidden md:block" /> Wolf help you host with confidence</h2>
      </section>

      <section className="mx-auto max-w-[1488px] px-6 pb-24 md:pb-12">
        {productStories.map((story, index) => (
          <article key={story.title} className={`grid items-center gap-8 md:gap-0 ${index % 2 ? "md:grid-cols-[43fr_57fr]" : "md:grid-cols-[57fr_43fr]"} ${index ? "mt-14 md:mt-16" : ""}`}>
            <div className={`relative aspect-[1.157] overflow-hidden ${index % 2 ? "md:order-2" : ""}`}><Image src={story.image} alt={story.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
            <div className={`px-1 py-3 md:px-14 lg:px-16 ${index % 2 ? "md:order-1" : ""}`}>
              <h3 style={serif} className="text-[32px] font-light leading-[1.08] md:text-[40px]">{story.title}</h3>
              <p className="mt-5 max-w-[420px] text-[14px] font-light leading-[1.5] md:text-[16px]">{story.copy}</p>
              <div className="mt-7"><PillLink href={story.href}>{story.cta}</PillLink></div>
            </div>
          </article>
        ))}
      </section>

      <OutdoorInspirationCarousel slides={inspirationSlides} />

      <section className="mx-auto max-w-[1148px] px-6 pb-24 md:pb-[288px]">
        <div className="grid bg-[#fbfaf6] p-5 md:grid-cols-2 md:p-8">
          <div className="relative aspect-square"><Image src={assets.showroom} alt="Sub-Zero and Wolf showroom consultation" fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" /></div>
          <div className="flex flex-col items-start justify-center px-1 py-8 md:px-12">
            <h2 style={serif} className="text-[36px] font-light leading-[1.06] md:text-[48px]">Start your journey in a showroom</h2>
            <p className="mt-5 text-[14px] font-light leading-[1.5]">Our showrooms are where inspiration turns into informed decisions. Explore products, compare details, and plan with a specialist.</p>
            <div className="mt-7"><PillLink href="/showroom" dark>Get started</PillLink></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1392px] px-6 pb-24 md:px-0 md:pb-32">
        <div className="grid items-end gap-7 md:grid-cols-[1fr_auto]">
          <div><h2 style={serif} className="text-[42px] font-light leading-[1.04] md:text-[60px]">Built for effortless outdoor living</h2><p className="mt-5 max-w-[650px] text-[14px] font-light leading-[1.5] md:text-[16px]">From Sub-Zero Refrigeration to Wolf Grills, Warming Drawers and Storage, our outdoor appliances are built for years of dependable performance.</p></div>
          <PillLink href="/cooking/outdoor">Explore all outdoor products</PillLink>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-3">
          {categories.map(([title, icon, href]) => (
            <div key={title} className="relative flex min-h-[260px] flex-col border border-[#d4d0c6] p-7 md:aspect-square md:min-h-0 md:p-4">
              <div className="relative mx-auto h-[120px] w-[150px] md:absolute md:left-1/2 md:top-1/2 md:h-[260px] md:w-[260px] md:-translate-x-1/2 md:-translate-y-1/2">
                <Image src={icon} alt="" fill sizes="(min-width: 768px) 260px, 150px" className="object-contain" />
              </div>
              <Link href={href} style={serif} className="mt-auto text-[22px] font-light leading-none md:absolute md:bottom-8 md:left-4 md:text-[32px]">
                {title}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#d4d1c7] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-[1392px]">
          <h2 style={serif} className="text-[44px] font-light leading-none md:text-[60px]">Discover more</h2>
          <div className="mt-10 grid gap-1 md:grid-cols-2">
            <article className="grid min-h-[460px] overflow-hidden bg-[#fbfaf6] md:col-span-2 md:min-h-[649px] md:grid-cols-[0.34fr_0.66fr]">
              <div className="flex min-h-[460px] flex-col items-start p-8 md:min-h-[649px] md:p-12">
                <h3 style={serif} className="text-[32px] font-light leading-[1.08] md:text-[40px]">Effortless control,<br />flawless flavor</h3>
                <p className="mt-5 max-w-[300px] text-[14px] font-light leading-[1.5]">Wolf equips cooks of every level with the confidence to create exquisite meals time and time again.</p>
                <div className="mt-auto"><PillLink href="/cooking/discover-wolf">Explore Wolf</PillLink></div>
              </div>
              <div className="relative min-h-[380px]"><Image src={assets.wolf} alt="Wolf range with signature red knobs" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover object-center" /></div>
            </article>
            {[
              ["Cleaner air for fresher food", "Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies.", "Explore Sub-Zero", "/refrigeration/discover-sub-zero", assets.subzero],
              ["A pristine and peaceful clean", "Your silent partner in the kitchen, Cove’s intuitive, customizable features offer a worry-free wash and dry.", "Explore Cove", "/dishwashing/discover-cove", assets.cove],
            ].map(([title, copy, cta, href, image]) => (
              <article key={title} className="bg-[#fbfaf6]">
                <div className="relative aspect-[1.6]"><Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
                <div className="grid gap-7 p-8 lg:grid-cols-2"><div><h3 style={serif} className="text-[32px] font-light leading-[1.08] md:text-[40px]">{title}</h3><div className="mt-8"><PillLink href={href}>{cta}</PillLink></div></div><p className="text-[14px] font-light leading-[1.5]">{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
