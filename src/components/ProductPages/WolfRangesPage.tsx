import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { WolfDesignGallery } from "@/components/ProductPages/WolfDesignGallery";
import { WolfRangesHero } from "@/components/ProductPages/WolfRangesHero";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";
const assets = {
  dualTop: `${aem}c1c07bf4-e6c8-4541-926d-7d76d5eaf9e9/as/DF36650_S_P_Top-Down_1_1.avif?assetname=DF36650_S_P_Top-Down_1_1.png&width=992&max-quality=90`,
  inductionTop: `${aem}950c5c2a-9d60-4e1f-b77f-974d08018500/as/PROIR36_TOP.avif?assetname=PROIR36_TOP.png&width=800&max-quality=90`,
  gasTop: `${aem}7d87a252-20fe-435f-997d-82317169bc62/as/top-config-gas.avif?assetname=top-config-gas.png&width=800&max-quality=90`,
  dualFuel: `${aem}20d8fcd5-f7c5-4f50-9e81-06ab4f317956/as/DF36450G_BK_P_SSBEZEL_REDKNOB_SH_comparison.avif?assetname=DF36450G_BK_P_SSBEZEL_REDKNOB_SH_comparison.png&width=800&max-quality=90`,
  induction: `${aem}d8d4b3f1-02f8-462c-9bc5-2c566a9dcfbe/as/IR36551_S_P_SSBEZEL_REDKNOB_SH.avif?assetname=IR36551_S_P_SSBEZEL_REDKNOB_SH.png&width=800&max-quality=90`,
  gas: `${aem}644afbd7-f2ca-4a65-b99f-85506c061c07/as/GR364C_RedKnob_SSBezel_SH_comparison.avif?assetname=GR364C_RedKnob_SSBezel_SH_comparison.png&width=800&max-quality=90`,
  showroom: `${aem}8fb0da74-6d9a-442e-9e5a-42564fc05540/as/SZG_Miami_Showroom_51876.avif?assetname=SZG_Miami_Showroom_51876.jpg&width=800&max-quality=90`,
  showroomExperience: "https://s7d9.scene7.com/is/image/szw/SZG_Ohio_Showroom_0496_R_hires_CMYK0?wid=992&qlt=90",
  proInduction: `${aem}b29f8814-9492-4044-a1fd-bacc27826349/as/IR-animation-still.avif?assetname=IR-animation-still.jpg&width=800&max-quality=90`,
  living: `${aem}75536247-75a2-42db-b380-6ca30aeeaeb3/as/antique-aesthetic-d.avif?assetname=antique-aesthetic-d.png&width=800&max-quality=90`,
  recipes: `${aem}0ded33ac-d600-4bd4-97c4-82cdc2f7871a/as/recipe_060-card.avif?assetname=recipe_060-card.jpg&width=800&max-quality=90`,
  refrigeration: `${aem}c0465147-b4fc-4839-a9cd-95ca2b2c9ef1/as/complete-your-kitchen-2.avif?assetname=complete-your-kitchen-2.png&width=1440&max-quality=90`,
  dishwasher: `${aem}24ec6ec9-5615-4793-aaeb-4692dfa57679/as/complete-your-kitchen-3.avif?assetname=complete-your-kitchen-3.jpg&width=1440&max-quality=90`,
};

const dualFuelOptionIcons = [
  `${aem}478e6373-c4b1-4c92-9b92-90fdd8b741ea/renditions/original/as/DualFuel_allBurner.svg?assetname=DualFuel_allBurner.svg`,
  `${aem}22d946da-eb44-4b89-8013-60cae8fb8451/renditions/original/as/Gas_charbroiler.svg?assetname=Gas_charbroiler.svg`,
  `${aem}e94e00e5-498e-4e87-99bf-13caae34432e/renditions/original/as/DualFuel_griddle.svg?assetname=DualFuel_griddle.svg`,
  `${aem}f1bb3f32-957e-4934-8b3e-782cd2063191/renditions/original/as/DualFuel_french_top.svg?assetname=DualFuel_french_top.svg`,
] as const;

const families = [
  { title: "Dual Fuel", description: "This best-of-both-worlds range features a variety of burner options and an advanced electric oven with a Dual VertiFlow™ convection system for perfect multi-rack cooking.", overviewDescription: "Dual-stacked, sealed gas burners with electric convection oven.", optionDescription: "Dual-stacked, sealed burners offer precise temperature adjustments for everything from fast boils to true simmers and melts.", showOptions: true, image: assets.dualTop, product: assets.dualFuel, learn: "Learn more about dual fuel ranges", view: "View all dual fuel range models", href: "/products?series=Dual+Fuel+Ranges", options: ["All burner", "Charbroiler", "Griddle", "French top"] },
  { title: "Induction", description: "Induction cooking delivers incredible responsiveness, efficient heat transfer, and astonishing speed—all on a sleek, easy-to-clean ceramic glass cooktop. Paired with a Dual VertiFlow™ convection oven with 10 chef-tested modes, it offers precision at every turn.", overviewDescription: "Induction ceramic glass cooktop with convection electric oven.", optionDescription: null, showOptions: false, image: assets.inductionTop, product: assets.induction, learn: "Learn more about induction ranges", view: "View all induction range models", href: "/cooking/ranges-induction", options: ["30 inch", "36 inch", "48 inch"] },
  { title: "Gas", description: "Power and control at every temperature come from dual-stacked, sealed gas burners, while the dependable gas oven ensures consistent results for baking, roasting, and more.", overviewDescription: "Dual-stacked, sealed gas burners with gas oven.", optionDescription: "Get top-tier temperature control with six dual-stacked, sealed gas burners for higher highs and lower lows.", showOptions: true, image: assets.gasTop, product: assets.gas, learn: "Learn more about gas ranges", view: "View all gas range models", href: "/products?series=Gas+Ranges", options: ["All burner", "Charbroiler", "Griddle"] },
] as const;

const comparisonRows = {
  "Dual Fuel": [
    ["Widths", ["30\"", "36\"", "48\"", "60\""]],
    ["Style", ["Professional"]],
    ["Cooktop Configuration", ["All Burner", "Charbroiler", "Griddle", "French Top"]],
    ["Oven", ["Electric Dual VertiFlow™ convection", "10 chef-created cooking modes", "50 gourmet presets"]],
    ["Knob Colors", ["Red", "Black", "Brushed Stainless", "Brushed Gray", "Brushed Brass"]],
    ["Bezel Colors", ["Stainless Steel", "Brushed Brass"]],
    ["Finish", ["Stainless Steel", "Black", "White"]],
  ],
  Induction: [
    ["Widths", ["30\"", "36\"", "48\""]],
    ["Style", ["Professional", "Transitional"]],
    ["Cooktop Configuration", ["Induction", "Griddle"]],
    ["Oven", ["Electric Dual VertiFlow™ convection", "10 chef-created cooking modes", "50 gourmet presets"]],
    ["Knob Colors", ["Red", "Black", "Brushed Stainless", "Brushed Gray", "Brushed Brass"]],
    ["Bezel Colors", ["Brushed Stainless", "Brushed Brass"]],
    ["Finish", ["Stainless Steel", "Black", "White"]],
  ],
  Gas: [
    ["Widths", ["30\"", "36\"", "48\"", "60\""]],
    ["Style", ["Professional"]],
    ["Cooktop Configuration", ["All Burner", "Charbroiler", "Griddle", "Double Griddle"]],
    ["Oven", ["Gas convection"]],
    ["Knob Colors", ["Red", "Black", "Brushed Stainless"]],
    ["Bezel Colors", ["Brushed Stainless", "Brushed Brass", "Chrome"]],
    ["Finish", ["Stainless Steel"]],
  ],
} as const;

const comparisonRowHeights: Record<string, string> = {
  Widths: "min-h-[153px]",
  Style: "min-h-[99px]",
  "Cooktop Configuration": "min-h-[152px]",
  Oven: "min-h-[164px]",
  "Knob Colors": "min-h-[180px]",
  "Bezel Colors": "min-h-[125px]",
  Finish: "min-h-[149px]",
};

const colorSwatches: Record<string, string> = {
  Red: "bg-[#a6282c]",
  Black: "bg-[#363431]",
  "Brushed Stainless": "bg-gradient-to-br from-[#f4f3f1] to-[#9a9998]",
  "Stainless Steel": "bg-gradient-to-br from-[#f4f3f1] to-[#9a9998]",
  "Brushed Gray": "bg-[#9a9998]",
  "Brushed Brass": "bg-[#cba567]",
  Chrome: "bg-gradient-to-br from-white via-[#aaa] to-white",
  White: "border border-[#d3d0c5] bg-white",
};

function ComparisonValue({ familyTitle, term, value }: { familyTitle: string; term: string; value: string }) {
  const isLinkedValue = term === "Widths" || term === "Style" || term === "Cooktop Configuration";
  const swatch = colorSwatches[value];
  const isNew = familyTitle === "Induction" && term === "Finish" && (value === "Black" || value === "White");

  return <li className={`flex items-center gap-2 ${isLinkedValue ? "underline underline-offset-4" : ""}`}>{swatch && <span className={`size-[18px] shrink-0 rounded-full ${swatch}`} aria-hidden="true" />}<span>{value}{isNew && <sup className="ml-0.5 text-[10px] font-bold">*NEW</sup>}</span></li>;
}

function PillLink({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
  return <Link href={href} className={`inline-flex min-h-10 items-center justify-center rounded-full px-6 text-[13px] font-bold transition ${outline ? "border border-[#171715] hover:bg-[#171715] hover:text-white" : "bg-[#171715] text-white hover:bg-[#393834]"}`}>{children}</Link>;
}

function FamilyOptions({ names, detailed = false }: { names: readonly string[]; detailed?: boolean }) {
  return <div className={`mt-8 flex w-full flex-wrap justify-center ${detailed ? "gap-1 sm:flex-nowrap" : "gap-3"}`}>{names.map((name, index) => <div key={name} className={detailed ? `flex min-h-[128px] w-[116px] flex-none flex-col items-center justify-center px-2 text-center ${index === 0 ? "rounded border border-[#77736b]" : ""}` : "w-[66px] text-center"}>{detailed ? <Image src={dualFuelOptionIcons[index]} alt="" width={64} height={48} className="h-12 w-16 object-contain" /> : <div className="mx-auto grid h-11 w-11 place-items-center border border-[#c8c4ba] bg-[#faf9f5]"><span className={`h-5 w-5 border border-[#77736b] ${index % 2 ? "" : "rounded-full"}`} /></div>}<p className={`${detailed ? `mt-4 text-[14px] ${index === 0 ? "font-bold" : ""}` : "mt-2 text-[9px] leading-tight text-black/65"}`}>{name}</p></div>)}</div>;
}

export function WolfRangesPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <WolfRangesHero />

      <section className="px-6 pb-24 pt-14 text-center md:px-12 md:pb-32 md:pt-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Wolf</p>
        <h1 className="mt-3 font-serif text-[56px] leading-none tracking-[-0.035em] md:text-[64px] lg:text-[80px]">Ranges</h1>
        <p className="mx-auto mt-7 max-w-[912px] text-base leading-[1.48] md:text-lg">The spark behind extraordinary meals—decades of engineering innovations and design refinements, tested by the world&apos;s top chefs. Discover how precision heat control, striking aesthetics, and unmatched durability can make a Wolf Dual Fuel, Gas, or Induction Range the centerpiece of your hard-working kitchen.</p>
        <div className="mt-7">
          <Link href="#range-families" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171715] px-8 text-base font-bold text-white transition hover:bg-[#393834]">Explore the Wolf Range</Link>
        </div>
        <div className="mx-auto mt-6 h-40 w-[2px] bg-[#c93622]" />
        <svg viewBox="0 0 24 30" className="mx-auto mt-6 h-[30px] w-6 text-[#c93622]" fill="currentColor" aria-hidden="true">
          <path d="M13.8 0.8c1.2 5.1-2.2 7.4-4.8 10.1-1.8 1.9-3.1 3.9-3.1 6.8 0 4.3 3.1 7.7 7.2 7.7 4.4 0 7.6-3.4 7.6-8.1 0-3.9-2.3-7.5-5.8-10.8.2 3.1-1 5.2-3 6.6.2-3.3 2.9-6.2 1.9-12.3Z" />
          <path d="M10.9 17.1c-1.8 1.8-2.3 3.4-1.7 5 .6 1.5 2 2.4 3.7 2.4 2.3 0 3.9-1.7 3.9-4.1 0-1.8-.8-3.3-2.3-4.8-.2 2-1.3 3-2.5 3.8.1-1.1-.2-1.9-1.1-2.3Z" fill="#f4f2ec" />
        </svg>
      </section>

      <section className="px-6 pb-24 md:px-12 md:pb-32" aria-labelledby="showroom-experience-title">
        <div className="mx-auto grid max-w-[664px] overflow-hidden bg-[#fbfaf7] sm:grid-cols-[230px_1fr]">
          <div className="relative min-h-[206px]">
            <Image src={assets.showroomExperience} alt="Wolf appliances in a premium showroom" fill sizes="230px" className="object-cover" />
          </div>
          <div className="flex min-h-[206px] flex-col justify-center p-7 sm:px-8">
            <h2 id="showroom-experience-title" className="font-serif text-2xl leading-[1.2]">The showroom experience</h2>
            <p className="mt-3 text-sm leading-[1.45]">Explore every element of your future kitchen inside one of our premium showrooms or dealers.</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <Link href="/showroom/appointment" className="font-bold underline underline-offset-4">Request a consultation</Link>
              <Link href="/showroom" className="underline underline-offset-4">More about showrooms</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="range-families" className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-[1556px] space-y-24 md:space-y-32">
          {families.map((family, index) => <article key={family.title} className={`grid items-center gap-10 md:grid-cols-2 md:gap-20 2xl:items-start ${index % 2 ? "2xl:grid-cols-[718px_718px] 2xl:gap-[129px]" : "2xl:grid-cols-[718px_486px] 2xl:gap-[177px]"}`}>
            <div className={`relative aspect-square ${index % 2 ? "md:order-2" : ""}`}>
              <Image src={family.image} alt={`Top view of Wolf ${family.title} range`} fill sizes="(min-width: 1200px) 718px, (min-width: 768px) 48vw, 100vw" className="object-contain" />
            </div>
            <div className={`mx-auto flex w-full max-w-[486px] flex-col items-center text-center ${index % 2 ? "md:order-1 2xl:translate-x-[77px]" : ""}`}><h2 className="font-serif text-[42px] leading-none md:text-[52px] lg:text-[60px]">{family.title}</h2><p className="mt-7 font-serif text-[clamp(1.25rem,1.25vw,1.375rem)] leading-[1.25]">{family.description}</p>{family.showOptions && <FamilyOptions names={family.options} detailed={family.title === "Dual Fuel" || family.title === "Gas"} />}{family.optionDescription && <p className="mt-10 w-full text-left text-base leading-[1.25] text-black/75">{family.optionDescription}</p>}<div className="mt-10"><Link href={family.href} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#171715] px-8 text-base font-bold text-white transition hover:bg-[#393834]">{family.learn}<span className="grid size-6 place-items-center rounded-full border border-white text-xl font-light leading-none" aria-hidden="true">+</span></Link></div><Link href={family.href} className="mt-5 inline-flex border-b border-[#171715] pb-1 text-base">{family.view}</Link></div>
          </article>)}
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1296px]"><h2 className="text-center font-serif text-[42px] font-normal leading-none md:text-[52px] lg:text-[60px]">Wolf Ranges overview</h2>
          <div className="mt-28 grid gap-16 md:grid-cols-3">{families.map((family) => <article key={family.title} className="flex flex-col text-center transition-[background-color,box-shadow] duration-200 hover:bg-[#efede7] focus-within:bg-[#efede7] md:hover:shadow-[-24px_0_0_#efede7,24px_0_0_#efede7] md:focus-within:shadow-[-24px_0_0_#efede7,24px_0_0_#efede7]">
            <div className="relative mx-auto aspect-[1.1] w-full max-w-[270px]"><Image src={family.product} alt={`Wolf ${family.title} range`} fill sizes="300px" className="object-contain" /></div>
            <h3 className="mt-7 font-serif text-[2.5rem] font-normal leading-none">{family.title}</h3>
            <p className="mx-auto mt-4 min-h-10 max-w-[360px] text-base leading-[1.25]">{family.overviewDescription}</p>
            <div className="mt-5 flex justify-center gap-4"><Link href={family.href} className="inline-flex min-h-[38px] items-center justify-center rounded-full bg-[#171715] px-5 text-sm font-bold text-white">View models</Link><Link href={family.href} className="inline-flex min-h-[38px] items-center justify-center rounded-full border border-[#171715] px-5 text-sm">Learn more</Link></div>
            <dl className="mt-6 text-left">{comparisonRows[family.title].map(([term, values]) => <div key={term} className={`grid grid-cols-[180px_1fr] gap-5 border-t border-black/45 py-6 ${comparisonRowHeights[term]}`}><dt className="text-[13px] uppercase leading-[1.15] tracking-[0.18em]">{term}</dt><dd><ul className="space-y-2 text-base leading-[1.2]">{values.map((value) => <ComparisonValue key={value} familyTitle={family.title} term={term} value={value} />)}</ul>{term === "Finish" && family.title !== "Gas" && <p className="mt-4 text-xs italic">*Must be ordered separately</p>}</dd></div>)}</dl>
          </article>)}</div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12"><div className="mx-auto max-w-[1392px] space-y-20">
        <article className="mx-auto mb-20 grid max-w-[1120px] overflow-hidden bg-[#fbfaf7] p-5 md:grid-cols-2 md:p-0 xl:grid-cols-[426px_1fr] xl:gap-[104px] xl:p-6"><div className="relative min-h-[300px] md:min-h-[426px] xl:h-[426px]"><Image src={assets.showroom} alt="Wolf appliance consultation in a showroom" fill sizes="426px" className="object-cover" /></div><div className="flex flex-col justify-center p-8 md:p-12 xl:p-0"><h2 className="font-serif text-[42px] font-normal leading-[1.08] md:text-[52px] lg:text-[60px]">Start your journey<br />in a showroom</h2><p className="mt-6 max-w-[450px] text-lg leading-[1.4]">Our showrooms are where inspiration turns into informed decisions. Learn how a visit helps you plan, compare, and move forward with confidence.</p><div className="mt-8"><Link href="/showroom/appointment" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171715] px-8 text-base font-bold text-white transition hover:bg-[#393834]">Get started</Link></div></div></article>

        <article className="grid overflow-hidden bg-[#fbfaf7] md:min-h-[696px] md:grid-cols-2"><div className="flex flex-col justify-center p-8 md:p-6"><p className="text-[13px] font-medium uppercase tracking-[0.2em]">Product spotlight</p><h2 className="mt-10 font-serif text-[42px] font-normal leading-[1.08] md:text-[52px] lg:text-[60px]">The 48-inch<br />Professional<br />Induction Range</h2><p className="mt-8 max-w-[560px] text-lg leading-[1.4]">Take on any culinary challenge with seven induction heat zones and two spacious oven cavities.</p><div className="mt-7 flex flex-wrap gap-4"><Link href="/products?series=Induction+Ranges" className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#171715] px-8 text-base font-bold text-white transition hover:bg-[#393834]">Discover Induction Range</Link><Link href="/showroom/appointment" className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#171715] px-8 text-base font-medium transition hover:bg-[#171715] hover:text-white">Explore product</Link></div></div><div className="relative min-h-[430px] md:min-h-[696px]"><Image src={assets.proInduction} alt="48-inch Wolf Professional Induction Range" fill sizes="(min-width: 768px) 696px, 100vw" className="object-cover" /></div></article>

        <section><div className="max-w-[720px]"><h2 className="font-serif text-[42px] font-normal leading-[1.08] md:text-[52px] lg:text-[60px]">Create a kitchen that&apos;s<br />uniquely yours</h2><p className="mt-5 text-base leading-[1.25]">Whether you want a statement range with colored doors and knobs, a minimalistic look with a sleek induction cooktop and understated contemporary wall ovens—or something in between—there&apos;s a Wolf cooking setup to meet your aesthetic and culinary needs.</p></div><WolfDesignGallery /><div className="mt-7 flex justify-center"><PillLink href="/inspiration" outline>See more inspiration</PillLink></div></section>

        <section><h2 className="font-serif text-[42px] font-normal leading-none md:text-[52px] lg:text-[60px]">More to savor</h2><div className="mt-12 grid gap-2 md:grid-cols-2">{[
          { title: "The art of living elegantly", copy: "Discover The Living Kitchen, our online magazine featuring celebrations of travel, cuisine, and design. It's full of inspiring stories, flavorful recipes, profiles of chefs and artists, and much more.", image: assets.living, href: "/journal", cta: "Learn more" },
          { title: "Chef-tested recipes", copy: "Our curated collection of gourmet recipes invites you to explore bold flavors and culinary techniques, while our state-of-the-art appliances elevate your cooking experience to new heights.", image: assets.recipes, href: "/journal/recipes", cta: "View recipes" },
        ].map((item) => <article key={item.title} className="bg-[#fbfaf7]"><div className="relative aspect-[1.59] md:h-[434px] md:aspect-auto"><Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 692px, 100vw" className="object-cover" /></div><div className="grid gap-8 p-6 sm:grid-cols-2 md:min-h-[220px]"><div className="flex flex-col items-start"><h3 className="max-w-[290px] font-serif text-[clamp(2rem,2.1vw,2.5rem)] font-normal leading-[1.05]">{item.title}</h3><Link href={item.href} className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#171715] px-8 text-base font-medium transition hover:bg-[#171715] hover:text-white">{item.cta}</Link></div><p className="text-base leading-[1.25]">{item.copy}</p></div></article>)}</div></section>

        <section aria-labelledby="complete-your-kitchen"><h2 id="complete-your-kitchen" className="font-serif text-[42px] font-normal leading-none md:text-[52px] lg:text-[60px]">Complete your kitchen</h2><div className="mt-8 flex snap-x snap-mandatory gap-2 overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible">{[
          { title: "Refrigerators", image: assets.refrigeration, href: "/refrigeration/view-all-refrigeration" },
          { title: "Dishwashers", image: assets.dishwasher, href: "/dishwashing/view-all-dishwashing" },
        ].map((item) => <Link key={item.title} href={item.href} className="group relative aspect-square min-w-[88%] snap-center overflow-hidden md:min-w-0"><Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 692px, 88vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" /><span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent transition-colors group-hover:bg-black/20" aria-hidden="true" /><svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><path d="M15 8.333 26.667 20 15 31.667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-24 font-serif text-[clamp(2rem,2.1vw,2.5rem)] font-normal leading-none text-white">{item.title}</span></Link>)}</div></section>
      </div></section>

      <section className="bg-[#88857f] px-6 py-12 text-white md:px-12"><div className="mx-auto grid max-w-[1120px] gap-8 md:grid-cols-3">{[
        ["You’re one step closer to creating your future kitchen.", "Request a brochure", "/trade/brochure"], ["Why Wolf ranges? Precision, durability, and unmistakable design.", "Learn about our standards", "/cooking/discover-wolf"], ["Plan a personalized visit with a product specialist.", "Find your showroom", "/showroom/appointment"],
      ].map(([copy, cta, href]) => <div key={cta}><p className="max-w-[300px] font-serif text-xl leading-[1.18]">{copy}</p><div className="mt-5"><Link href={href} className="inline-flex min-h-10 items-center rounded-full bg-white px-6 text-[12px] font-bold text-[#171715]">{cta}</Link></div></div>)}</div></section>
    </main>
  );
}
