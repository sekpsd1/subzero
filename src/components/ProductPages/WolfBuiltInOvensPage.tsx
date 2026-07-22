import Image from "next/image";
import Link from "next/link";
import { BuiltInOvensHero } from "@/components/ProductPages/BuiltInOvensHero";
import { StickyShowroomButton } from "@/components/ProductPages/StickyShowroomButton";
import { WolfDesignGallery, type WolfDesignGalleryCategory } from "@/components/ProductPages/WolfDesignGallery";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";
const assets = {
  heroPoster: `${aem}321761b1-2db5-4158-935b-96c72e9ee6e2/as/ovens-fallback.avif?assetname=ovens-fallback.png&width=2560&max-quality=90`,
  heroVideo: `${aem}4c6a5940-2b8f-42ad-9efe-d51857bc4b1f/renditions/original/as/Wolf%20-%20Ovens%20-%20Animation.mp4`,
  convection: `${aem}6c1ca93c-5e90-4295-8e6f-1ddb85acc61e/as/Wolf-Convection-Oven.avif?assetname=Wolf+Convection+Oven.jpg&width=1200&max-quality=90`,
  steam: `${aem}18ea2a62-8993-4715-a998-6360fcfc080c/as/CSO3050PE_S_P-1.avif?assetname=CSO3050PE_S_P+1.png&width=1200&max-quality=90`,
  speed: `${aem}c077915f-ae96-4ed1-95dd-ccac1e277505/as/MDD_SPO_3050TE_S_T-1.avif?assetname=MDD_SPO_3050TE_S_T+1.png&width=1200&max-quality=90`,
  eSeries: `${aem}065f4cdf-3cc8-4e78-affd-d41a29e98087/as/SM_TCS_MACARTHUR_9.avif?assetname=SM_TCS_MACARTHUR_9.png&width=1200&max-quality=90`,
  mSeries: `${aem}8a71250e-ef91-43fa-8fb5-a27e6cdf66a2/as/MED_GreenBold_SLGTC_022723_3-V3_contentcard.avif?assetname=MED_GreenBold_SLGTC_022723_3-V3_contentcard.png&width=1200&max-quality=90`,
  compareConvection: `${aem}6555c214-3930-4677-bc7c-081cd9f8f8d1/as/DO_Comparison_scaled.avif?assetname=DO_Comparison_scaled.png&width=800&max-quality=90`,
  compareSteam: `${aem}bc8cfbe9-3c5d-4c31-9424-4cafe815949b/as/CSO_Comparison_scaled.avif?assetname=CSO_Comparison_scaled.png&width=800&max-quality=90`,
  compareSpeed: `${aem}aee58e73-2457-46fd-9551-c46a46c99e13/as/SPO_Comparison_scaled.avif?assetname=SPO_Comparison_scaled.png&width=800&max-quality=90`,
  showroomJourney: `${aem}8fb0da74-6d9a-442e-9e5a-42564fc05540/as/SZG_Miami_Showroom_51876.avif?assetname=SZG_Miami_Showroom_51876.jpg&width=1000&max-quality=90`,
  living: `${aem}75536247-75a2-42db-b380-6ca30aeeaeb3/as/antique-aesthetic-d.avif?assetname=antique-aesthetic-d.png&width=1000&max-quality=90`,
  recipes: `${aem}0ded33ac-d600-4bd4-97c4-82cdc2f7871a/as/recipe_060-card.avif?assetname=recipe_060-card.jpg&width=1000&max-quality=90`,
  refrigeration: `${aem}c0465147-b4fc-4839-a9cd-95ca2b2c9ef1/as/complete-your-kitchen-2.avif?assetname=complete-your-kitchen-2.png&width=1440&max-quality=90`,
  dishwasher: `${aem}b06ca44f-fb08-4b3e-8675-83682b844f04/as/Cove-Dishwashers.avif?assetname=Cove+Dishwashers.png&width=1440&max-quality=90`,
};

const builtInOvenGalleries = [
  {
    label: "Contemporary",
    images: [
      `${aem}6251ed2b-f5d8-490c-8f7a-ee62d6410999/as/Chiselwood_Eco_Homes_Fossdyke_Paddock_Saxilby_09.avif?assetname=Chiselwood_Eco_Homes_Fossdyke_Paddock_Saxilby_09.png&width=1920&max-quality=90`,
      `${aem}bd75d5d0-72c7-4deb-8093-9a094fb3834f/as/Wolf_Gladwyne_PA_55799-2.avif?assetname=Wolf_Gladwyne_PA_55799-2.tif&width=1280&max-quality=90`,
      `${aem}917beb89-da38-48dd-82a7-5812301c6283/as/photo-113882.avif?assetname=photo-113882.jpg&width=1920&max-quality=90`,
    ],
  },
  {
    label: "Traditional",
    images: [
      `${aem}4ef7f63d-66aa-4cd4-9f02-8dd7a9c7a1cc/as/MED_BSTYLE_091719_8_V3.avif?assetname=MED_BSTYLE_091719_8_V3.png&width=1920&max-quality=90`,
      `${aem}91d41621-c1c5-407c-ae70-63784f0d205a/as/SZW_Traditional_Flush_gallery.avif?assetname=SZW_Traditional_Flush_gallery.png&width=1280&max-quality=90`,
      `${aem}d3ff6837-d965-49d9-9a57-67bcdb6e3ddd/as/SubZero-Wolf-BB-024.avif?assetname=SubZero-Wolf-BB-024.png&width=1920&max-quality=90`,
    ],
  },
  {
    label: "Transitional",
    images: [
      `${aem}29b67aa7-b112-4f0c-89a4-cfadc2d7a013/as/MED_SLGTC_ADA_041323_1.avif?assetname=MED_SLGTC_ADA_041323_1.jpg&width=1920&max-quality=90`,
      `${aem}0abb9eef-f73f-4c03-887a-fb75b8c51904/as/SZWC_Austin_0788-2_4021FC_B_GRACoL2006.avif?assetname=SZWC_Austin_0788-2_4021FC_B_GRACoL2006.png&width=1280&max-quality=90`,
      `${aem}f4a49409-a4e4-42c2-af85-66ac255ec4f8/as/11_Retouch_5311003_standard.avif?assetname=11_Retouch_5311003_standard.jpg&width=1920&max-quality=90`,
    ],
  },
] as const satisfies readonly WolfDesignGalleryCategory[];

const families = [
  {
    title: "Convection ovens",
    copy: "The secret to Wolf’s consistent, flavorful results lies in its patented Dual VertiFlow™ convection system, where two fans circulate hot air to ensure even cooking and uniform browning throughout.",
    image: assets.convection,
    href: "/cooking/built-in-ovens/convection",
    learn: "Learn more about convection ovens",
    view: "View all convection oven models",
  },
  {
    title: "Convection steam ovens",
    copy: "Unmatched versatility, endless benefits. Engineered with a climate sensor, it ensures perfect results in everything from artisan-quality breads and baked goods to succulent meats, poultry, and vegetables.",
    image: assets.steam,
    href: "/cooking/built-in-ovens/convection-steam",
    learn: "Learn more about convection steam ovens",
    view: "View all convection steam oven models",
  },
  {
    title: "Convection speed",
    copy: "The performance you expect from Wolf—only faster and smaller. Delight in convection and broil capabilities combined with the power of a microwave in one easy-to-use appliance.",
    image: assets.speed,
    href: "/cooking/view-all-cooking/built-in-ovens?default.mnseries=Speed+Oven",
    learn: "Learn more about convection speed ovens",
    view: "View all convection speed oven models",
  },
] as const;

const comparisons = [
  {
    title: "Convection",
    copy: "Take the guesswork out of cooking with intuitive controls and consistent, even heat.",
    image: assets.compareConvection,
    rows: [
      ["Widths", ["24\"", "30\""]],
      ["Style", ["Transitional", "Contemporary", "Professional"]],
      ["Configuration", ["Single", "Double"]],
      ["Oven", ["Convection"]],
      ["Knob colors", ["Red", "Black", "Brushed Stainless", "Brushed Brass", "Brushed Gray"]],
      ["Bezel colors", ["Brushed Stainless", "Brushed Brass"]],
      ["Finish", ["Stainless", "Black Glass"]],
      ["Line", ["E Series", "M Series"]],
    ],
  },
  {
    title: "Convection steam",
    copy: "Ensure perfect results in everything from crusty loaves to casseroles and roast poultry.",
    image: assets.compareSteam,
    rows: [
      ["Widths", ["24\"", "30\""]],
      ["Style", ["Transitional", "Contemporary", "Professional"]],
      ["Configuration", ["Single"]],
      ["Oven", ["Convection and steam"]],
      ["Knob colors", ["—"]],
      ["Bezel colors", ["—"]],
      ["Finish", ["Stainless", "Black"]],
      ["Line", ["E Series", "M Series"]],
    ],
  },
  {
    title: "Convection speed",
    copy: "Convection and broil capabilities meet microwave speed for unmatched versatility.",
    image: assets.compareSpeed,
    rows: [
      ["Widths", ["24\"", "30\""]],
      ["Style", ["Transitional", "Professional", "Contemporary"]],
      ["Configuration", ["Single"]],
      ["Oven", ["Microwave, convection, and broil technologies"]],
      ["Knob colors", ["—"]],
      ["Bezel colors", ["—"]],
      ["Finish", ["Stainless", "Black"]],
      ["Line", ["E Series", "M Series"]],
    ],
  },
] as const;

function Pill({ href, children, outline = false }: { href: string; children: React.ReactNode; outline?: boolean }) {
  return (
    <Link href={href} className={`inline-flex min-h-10 items-center justify-center rounded-full px-6 text-[13px] font-bold transition ${outline ? "border border-[#171715] hover:bg-[#171715] hover:text-white" : "bg-[#171715] text-white hover:bg-[#393834]"}`}>
      {children}
    </Link>
  );
}

const comparisonColorSwatches: Record<string, string> = {
  Red: "#b32329",
  Black: "#2b2b28",
  "Black Glass": "#252522",
  "Brushed Stainless": "linear-gradient(135deg, #e4e3df 0%, #aaa9a5 100%)",
  Stainless: "linear-gradient(135deg, #e4e3df 0%, #aaa9a5 100%)",
  "Brushed Brass": "#c39c58",
  "Brushed Gray": "#92918d",
};

function ComparisonValue({ label, value }: { label: string; value: string }) {
  const showsSwatch = ["Knob colors", "Bezel colors", "Finish"].includes(label) && value !== "—";
  const isLinked = ["Widths", "Style", "Configuration", "Line"].includes(label) || (label === "Oven" && !value.startsWith("Microwave"));
  const content = isLinked ? (
    <Link href="/cooking/view-all-cooking/built-in-ovens" className="underline decoration-[0.075em] underline-offset-[0.18em] hover:no-underline">
      {value}
    </Link>
  ) : value;

  return (
    <li className="flex items-start gap-2.5">
      {showsSwatch && <span className="mt-[0.18em] size-[17px] shrink-0 rounded-full border border-black/5" style={{ background: comparisonColorSwatches[value] }} aria-hidden="true" />}
      <span>{content}</span>
    </li>
  );
}

export function WolfBuiltInOvensPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <BuiltInOvensHero videoSrc={assets.heroVideo} poster={assets.heroPoster} />
      <StickyShowroomButton triggerId="built-in-ovens-introduction" />

      <section id="built-in-ovens-introduction" className="px-6 pb-20 pt-14 text-center md:px-12 md:pb-28 md:pt-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Wolf</p>
        <h1 className="mt-3 font-serif text-[52px] leading-none tracking-[-0.035em] md:text-[64px] lg:text-[76px]">Built-in ovens</h1>
        <p className="mx-auto mt-7 max-w-[860px] text-base leading-[1.5] md:text-lg">Taking the guesswork out of cooking and baking, Wolf Built-In Ovens deliver dependable and consistently delicious results with intuitive controls, precise and even heat, and technology refined through decades of innovation and rigorous testing.</p>
        <div className="mt-7"><Pill href="/showroom/appointment">Experience in a showroom</Pill></div>
        <div className="mx-auto mt-6 h-32 w-px bg-[#c93622]" />
        <svg viewBox="0 0 24 30" className="mx-auto mt-5 h-7 w-6 text-[#c93622]" fill="currentColor" aria-hidden="true"><path d="M13.8.8c1.2 5.1-2.2 7.4-4.8 10.1-1.8 1.9-3.1 3.9-3.1 6.8 0 4.3 3.1 7.7 7.2 7.7 4.4 0 7.6-3.4 7.6-8.1 0-3.9-2.3-7.5-5.8-10.8.2 3.1-1 5.2-3 6.6.2-3.3 2.9-6.2 1.9-12.3Z" /></svg>
      </section>

      <section id="oven-families" className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-[1392px] space-y-24 md:space-y-32">
          {families.map((family, index) => <article key={family.title} className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className={`relative aspect-[1.2] ${index % 2 ? "md:order-2" : ""}`}><Image src={family.image} alt={`Wolf ${family.title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" /></div>
            <div className={`mx-auto max-w-[470px] text-center ${index % 2 ? "md:order-1" : ""}`}><h2 className="font-serif text-[38px] leading-[1.05] md:text-[44px]">{family.title}</h2><p className="mt-6 font-serif text-xl leading-[1.3]">{family.copy}</p><div className="mt-8"><Pill href={family.href}>{family.learn}<span className="ml-3 grid size-5 place-items-center rounded-full border border-white font-normal">+</span></Pill></div><Link href={family.href} className="mt-5 inline-block border-b border-[#171715] pb-1 text-sm">{family.view}</Link></div>
          </article>)}
        </div>
      </section>

      <section className="bg-[#efede7] px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-[1392px] gap-3 md:grid-cols-2">
          {[
            ["E series", "Stunning style and performance", "Combining enhanced performance with sleek design, advanced Dual VertiFlow™ convection and chef-tested cooking modes ensure every dish you envision is the one you serve.", assets.eSeries, "View E Series models"],
            ["M series", "Wolf innovation at its best", "Experience Wolf’s most advanced dual convection oven. Two fans and vertical heating elements work in harmony for consistent heat, air circulation, and remarkable flavor development.", assets.mSeries, "View M Series models"],
          ].map(([eyebrow, title, copy, image, cta]) => <article key={eyebrow} className="bg-[#fbfaf7]"><div className="relative aspect-[1.38]"><Image src={image} alt={`${eyebrow} Wolf oven in use`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><div className="p-7 md:min-h-[280px]"><p className="text-[11px] font-bold uppercase tracking-[0.22em]">{eyebrow}</p><h2 className="mt-3 font-serif text-[30px] leading-[1.08]">{title}</h2><p className="mt-4 text-sm leading-[1.5]">{copy}</p><div className="mt-6"><Pill href="/cooking/view-all-cooking/built-in-ovens" outline>{cta}</Pill></div></div></article>)}
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1296px]"><h2 className="text-center font-serif text-[40px] leading-none md:text-[52px]">Wolf Built-In Ovens Overview</h2><div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-16">
          {comparisons.map((item) => <article key={item.title} className="flex flex-col text-center"><div className="relative mx-auto aspect-[1.15] w-full max-w-[260px]"><Image src={item.image} alt={`Wolf ${item.title} oven`} fill sizes="280px" className="object-contain" /></div><h3 className="mt-5 font-serif text-[28px] leading-none">{item.title}</h3><p className="mx-auto mt-4 min-h-14 max-w-[310px] text-sm leading-[1.4]">{item.copy}</p><div className="mt-5 flex justify-center gap-3"><Pill href="/cooking/view-all-cooking/built-in-ovens">View models</Pill><Pill href="#oven-families" outline>Learn more</Pill></div><dl className="mt-7 text-left">{item.rows.map(([label, values]) => <div key={label} className="grid min-h-[98px] grid-cols-[138px_1fr] gap-5 border-t border-black/40 py-6"><dt className="text-[12px] font-bold uppercase tracking-[0.2em]">{label}</dt><dd><ul className="space-y-1 text-[16px] leading-[1.35]">{values.map((value) => <ComparisonValue key={value} label={label} value={value} />)}</ul></dd></div>)}</dl></article>)}
        </div></div>
      </section>

      <section className="px-6 py-20 md:px-12"><div className="mx-auto max-w-[1392px]">
        <article className="mx-auto grid max-w-[1120px] overflow-hidden bg-[#fbfaf7] md:grid-cols-[0.92fr_1.08fr]"><div className="relative min-h-[340px] md:min-h-[430px]"><Image src={assets.showroomJourney} alt="Consultation in a Wolf showroom" fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" /></div><div className="flex flex-col justify-center p-8 md:p-12"><h2 className="font-serif text-[40px] leading-[1.06] md:text-[48px]">Start your journey<br />in a showroom</h2><p className="mt-5 max-w-[450px] text-base leading-[1.45]">Our showrooms are where inspiration turns into informed decisions. Learn how a visit helps you plan, compare, and move forward with confidence.</p><div className="mt-7"><Pill href="/showroom/appointment">Get started</Pill></div></div></article>

        <section className="pt-24"><div className="max-w-[720px]"><h2 className="font-serif text-[40px] leading-[1.07] md:text-[52px]">Create a kitchen that’s<br />uniquely yours</h2><p className="mt-5 text-base leading-[1.4]">Whether you want a statement range with colored doors and knobs, a minimalistic look with a sleek induction cooktop and understated contemporary wall ovens—or something in between—there’s a Wolf cooking setup to meet your aesthetic and culinary needs.</p></div><WolfDesignGallery categories={builtInOvenGalleries} /><div className="mt-7 flex justify-center"><Pill href="/inspiration" outline>See more inspiration</Pill></div></section>

        <section className="pt-24"><h2 className="font-serif text-[40px] leading-none md:text-[52px]">More to savor</h2><div className="mt-10 grid gap-3 md:grid-cols-2">{[
          ["The art of living elegantly", "Stories of travel, cuisine, design, chefs, and artists to inspire life in and beyond the kitchen.", assets.living, "/journal", "Learn more"],
          ["Chef-tested recipes", "Explore bold flavors and culinary techniques created to make the most of precise Wolf performance.", assets.recipes, "/journal", "View recipes"],
        ].map(([title,copy,image,href,cta]) => <article key={title} className="bg-[#fbfaf7]"><div className="relative aspect-[1.55]"><Image src={image} alt={title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><div className="p-7"><h3 className="font-serif text-[28px] leading-[1.08]">{title}</h3><p className="mt-4 min-h-12 text-sm leading-[1.45]">{copy}</p><div className="mt-6"><Pill href={href} outline>{cta}</Pill></div></div></article>)}</div></section>

        <section className="pt-24" aria-labelledby="complete-kitchen"><h2 id="complete-kitchen" className="font-serif text-[40px] leading-none md:text-[52px]">Complete your kitchen</h2><div className="mt-8 grid gap-2 md:grid-cols-2">{[
          ["Refrigerators", assets.refrigeration, "/refrigeration/view-all-refrigeration"], ["Dishwashers", assets.dishwasher, "/dishwashing/view-all-dishwashing"],
        ].map(([title,image,href]) => <Link key={title} href={href} className="group relative aspect-[1.25] overflow-hidden"><Image src={image} alt={title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" /><span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><span className="absolute bottom-6 left-6 font-serif text-[30px] text-white">{title}</span></Link>)}</div></section>
      </div></section>

    </main>
  );
}
