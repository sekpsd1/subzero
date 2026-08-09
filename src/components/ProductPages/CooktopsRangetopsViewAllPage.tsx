import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  hero: `${aem}5f4186ae-0d91-4db3-ac46-c9175d6ac670/as/25-SUBZERO_CI36560TS_INDUCTION-COOKTOP.avif?assetname=25-SUBZERO_CI36560TS_INDUCTION-COOKTOP.jpg&width=1920&max-quality=90`,
  rangetop: `${aem}afec8f74-a992-407f-aa6a-bf84b31fa36f`,
  contemporary: `${aem}c829e438-3665-48cc-9e50-db711f30ce70/as/image.avif?width=900&quality=95`,
  professional: `${aem}96bedc90-e2ac-4f11-91e1-0d0b9f251071/as/image.avif?width=900&quality=95`,
  transitional: `${aem}2d5ea2d3-f602-4076-b2e0-9717e942a249/as/image.avif?width=900&quality=95`,
  framed: `${aem}9b90cea3-f408-455f-9777-6ee6e4368f76/as/image.avif?width=900&quality=95`,
  gasModule: `${aem}7ec10470-2b42-4c78-a74d-b6c457baeb5f`,
  contemporaryInduction: `${aem}8277324c-12f4-47e5-8978-de28269b0495`,
  transitionalInduction: `${aem}aa96cc8f-a905-4e64-aea4-2327beea2747`,
  framedInduction: `${aem}593d5bc3-786c-435e-b292-29bdbe5de038`,
  refrigeration: `${aem}81756aa7-f917-449b-a5e8-335bdaaebd88/as/SM_TCSLG_111621_Grill.avif?assetname=SM_TCSLG_111621_Grill.jpg&width=1200&max-quality=90`,
  dishwasher: `${aem}390cad36-9e50-4e66-9ae9-feb55e0bd553/as/cove-dishwashing.avif?assetname=cove-dishwashing.jpg&width=1200&max-quality=90`,
};

const cookingCategories = [
  ["All cooking", "/products/cooking"],
  ["Ranges", "/cooking/ranges"],
  ["Built-in ovens", "/cooking/built-in-ovens"],
  ["Cooktops & Rangetops", "/cooking/cooktops-rangetops"],
  ["Ventilation", "/cooking/ventilation"],
  ["Coffee systems", "/cooking/coffee-systems"],
  ["Microwaves", "/cooking/microwaves"],
  ["Outdoor", "/products/outdoor"],
  ["Drawers", "/cooking/drawers"],
] as const;

type Product = {
  group: string;
  title: string;
  width: string;
  configuration: string;
  finish: string;
  fuel: string;
  image: string;
  href: string;
  count?: string;
};

const groups: ReadonlyArray<{ title: string; copy: string; products: Product[] }> = [
  {
    title: "Gas Rangetops",
    copy: "However you like to cook, there’s a Wolf Gas Rangetop for you. Each offers dual-stacked, sealed burners; choose an optional charbroiler, griddle, or wok burner for extra flexibility.",
    products: [
      { group: "SRT", title: "Sealed Burner Rangetop", width: '30\" / 36\" / 48\"', configuration: "Infrared Charbroiler / Infrared Charbroiler and Infrared Griddle / Infrared Double Griddle / Infrared Griddle / Wok Burner", finish: "", fuel: "Liquid Propane / Natural Gas", image: assets.rangetop, href: "/products/cooking/gas-rangetops", count: "1 / 3" },
    ],
  },
  {
    title: "Gas Cooktops",
    copy: "Dual-stacked, sealed gas burners provide precise high heat for fast boils and quick sears, and low flames for delicate simmers and silky sauces.",
    products: [
      { group: "CGP", title: "Professional Gas Cooktop", width: '30\" / 36\"', configuration: "4 Burners / 5 Burners", finish: "Stainless Steel", fuel: "Liquid Propane / Natural Gas", image: assets.professional, href: "/products/cgp-professional-gas-cooktop", count: "1 / 2" },
      { group: "CGTF", title: "Transitional Framed Gas Cooktop", width: '15\" / 24\"', configuration: "2 Burners / 3 Burners", finish: "Stainless Steel", fuel: "Liquid Propane / Natural Gas", image: assets.framed, href: "/products/cgtf-transitional-framed-gas-cooktop", count: "1 / 2" },
      { group: "CGT", title: "Transitional Gas Cooktop", width: '30\" / 36\"', configuration: "4 Burners / 5 Burners", finish: "Stainless Steel", fuel: "Liquid Propane / Natural Gas", image: assets.transitional, href: "/products/cgt-transitional-gas-cooktop", count: "1 / 2" },
      { group: "CGC", title: "Contemporary Gas Cooktop", width: '36\"', configuration: "5 Burners", finish: "Stainless Steel", fuel: "Liquid Propane / Natural Gas", image: assets.contemporary, href: "/products/cgc-contemporary-gas-cooktop" },
      { group: "MMTF", title: "Transitional Framed Multifunction Module", width: '15\"', configuration: "", finish: "Stainless Steel", fuel: "", image: assets.gasModule, href: "/products/mmtf-transitional-framed-multifunction-module" },
    ],
  },
  {
    title: "Induction Cooktops",
    copy: "Induction is Wolf’s most efficient heat delivery system. By supplying heat directly to the cookware, induction offers precise control and nearly instantaneous temperature response.",
    products: [
      { group: "CI60C", title: "Contemporary Induction Cooktop", width: '30\" / 36\"', configuration: "4 Cooking Zones / 5 Cooking Zones", finish: "Black", fuel: "", image: assets.contemporaryInduction, href: "/products/ci60c-contemporary-induction-cooktop", count: "1 / 2" },
      { group: "CI60T", title: "Transitional Induction Cooktop", width: '30\" / 36\"', configuration: "4 Cooking Zones / 5 Cooking Zones", finish: "Stainless Steel", fuel: "", image: assets.transitionalInduction, href: "/products/ci60t-transitional-induction-cooktop", count: "1 / 2" },
      { group: "CITF", title: "Transitional Framed Induction Cooktop", width: '15\" / 24\" / 30\" / 36\"', configuration: "2 Cooking Zones / 3 Cooking Zones / 4 Cooking Zones / 5 Cooking Zones", finish: "Stainless Steel", fuel: "", image: assets.framedInduction, href: "/products/citf-transitional-framed-induction-cooktop", count: "1 / 4" },
    ],
  },
];

function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const referenceCardHeight = product.group === "SRT" ? "xl:min-h-[763px]" : product.group.startsWith("CG") || product.group === "MMTF" ? "xl:min-h-[728px]" : "";

  return (
    <Link href={product.href} className={`group flex min-w-0 flex-col bg-[#f7f5ef] p-6 ring-1 ring-inset ring-[#d3d0c5] focus:outline-none focus-visible:ring-[#181817] ${referenceCardHeight}`}>
      <div className="h-9" aria-hidden="true" />
      <div className="relative aspect-[1.6/1] overflow-hidden bg-[#f4f2ec]">
        <Image src={product.image} alt={product.title} fill priority={priority} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 84vw" className="object-contain mix-blend-darken transition duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="flex min-h-9 items-center justify-end text-[13px] font-light">{product.count ?? ""}</div>
      <div className="flex flex-1 flex-col">
        <h3 className="min-h-[69px] pb-4 pt-6 font-serif text-[24px] font-light leading-[1.2] underline-offset-4 group-hover:underline">{product.title}</h3>
        <dl className="text-[13px] font-light leading-[1.4]">
          {[["Width", product.width], ["Cooktop Configuration", product.configuration], ["Finish", product.finish], ["Fuel Type", product.fuel]].filter(([, value]) => Boolean(value)).map(([label, value]) => (
            <div key={label} className="grid min-h-[51px] grid-cols-2 border-t border-[#d3d0c5] py-4">
              <dt>{label === "Cooktop Configuration" && product.group === "SRT" ? "Rangetop Configuration" : label}:</dt>
              <dd>
                {label === "Finish" ? (
                  <span className="inline-flex items-center gap-2">
                    <span className={`size-3.5 rounded-full border border-black/10 ${value === "Black" ? "bg-[#181817]" : "bg-[#929291]"}`} aria-hidden="true" />
                    {value}
                  </span>
                ) : value.split(" / ").map((option, optionIndex) => label === "Width" ? <span key={option} className="pr-2">{option}</span> : <span key={option} className={optionIndex === value.split(" / ").length - 1 ? "block" : "block pb-2"}>{option}</span>)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}

function DiscoveryCard({ title, copy, cta, href, image }: { title: string; copy: string; cta: string; href: string; image: string }) {
  return (
    <article className="bg-[#f8f6f1]">
      <div className="relative aspect-[1.62] overflow-hidden"><Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
      <div className="grid gap-6 p-7 md:min-h-[205px] md:grid-cols-[0.48fr_0.52fr] md:p-8">
        <div className="flex flex-col items-start justify-between gap-7"><h3 className="font-serif text-[32px] font-light leading-[1.02] md:text-[38px]">{title}</h3><Link href={href} className="inline-flex min-h-10 items-center rounded-full border border-[#181817] px-6 text-[12px] font-semibold">{cta}</Link></div>
        <p className="text-[14px] font-light leading-[1.35]">{copy}</p>
      </div>
    </article>
  );
}

export function CooktopsRangetopsViewAllPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#181817]">
      <section className="relative h-[520px] w-full overflow-hidden bg-[#171715] text-white md:h-auto md:aspect-[2/1] md:max-h-[960px]" aria-labelledby="cooktops-view-all-hero-title">
        <Image src={assets.hero} alt="Wolf induction cooktop in a refined kitchen" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <h2 id="cooktops-view-all-hero-title" className="absolute bottom-0 left-6 max-w-[1200px] text-[34px] font-normal leading-[1.1] md:text-[37px] xl:text-[40px]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Precision heat control for maximum flavor development</h2>
      </section>

      <nav aria-label="Cooking categories" className="overflow-x-auto border-b border-[#d4cfc5] bg-[#f7f5f0] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex min-w-max max-w-[1440px] border-l border-[#d4cfc5]">{cookingCategories.map(([title, href]) => <Link key={title} href={href} className={`flex min-h-[68px] w-[160px] items-center justify-center border-r border-[#d4cfc5] px-3 text-center text-[13px] underline underline-offset-4 ${title === "Cooktops & Rangetops" ? "bg-white font-semibold" : ""}`}>{title}</Link>)}</div>
      </nav>

      <section className="px-6 pb-14 pt-16 md:pb-16 md:pt-[68px]">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-20">
          <h1 className="self-start font-serif text-[46px] font-light leading-[1.1] tracking-[-0.02em] md:text-[53px] xl:text-[60px]">Cooktops &amp; Rangetops</h1>
          <p className="max-w-[560px] font-serif text-[18px] font-light leading-[1.28] md:text-[24px]">Fitting in seamlessly to a wide array of kitchen styles—and available in gas or induction—each Wolf Cooktop and Rangetop offers unrivaled power, precision, and proven performance.</p>
        </div>
      </section>

      <section className="px-6 pb-0">
        <div className="mx-auto max-w-[1392px]">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#c9c4ba] pb-5 pt-2">
            <div className="flex flex-wrap gap-x-12 gap-y-2 text-[13px]">
              {["Burner Configuration", "Width", "Finish"].map((filter) => (
                <span key={filter} className="inline-flex min-h-9 items-center gap-3">
                  {filter}
                  <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 fill-none stroke-current stroke-[1.2]">
                    <path d="m3 4.5 3 3 3-3" />
                  </svg>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-[12px] font-light">
              <span>All filters</span>
              <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[18px] fill-none stroke-current stroke-[1.2]">
                <path d="M4 2v14M9 2v14M14 2v14" />
                <circle cx="4" cy="6" r="1.6" className="fill-[#f4f2ec]" />
                <circle cx="9" cy="12" r="1.6" className="fill-[#f4f2ec]" />
                <circle cx="14" cy="8" r="1.6" className="fill-[#f4f2ec]" />
              </svg>
            </div>
          </div>

          {groups.map((group, groupIndex) => (
            <section key={group.title} className={`pb-0 ${groupIndex === 0 ? "pt-14 md:pt-20" : "pt-14 md:pt-16"}`} aria-labelledby={`group-${groupIndex}`}>
              <div>
                <h2 id={`group-${groupIndex}`} className="font-serif text-[37px] font-light leading-[1.19] xl:text-[40px] xl:leading-[1.1]">{group.title}</h2>
                <p className="mt-5 max-w-[700px] text-[15px] font-light leading-[1.5] md:text-[16px] xl:text-[18px]">{group.copy}</p>
              </div>
              <div className="mt-4 grid gap-2 pb-10 pt-2 sm:grid-cols-2 lg:grid-cols-3">{group.products.map((product, index) => <ProductCard key={product.group} product={product} priority={groupIndex === 0 || (groupIndex === 1 && index < 2)} />)}</div>
            </section>
          ))}
        </div>
      </section>

      <section className="border-t border-[#cbc6bc] px-6 pb-4 pt-16">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-20"><h2 className="self-start font-serif text-[37px] font-light leading-[1.1] xl:text-[40px]">Precision heat control for maximum flavor development</h2><p className="max-w-[590px] font-serif text-[18px] font-light leading-[1.3] md:text-[24px]">Wolf Cooktops and Rangetops combine sleek design with professional-grade performance. Whether gas or induction, each model delivers precise temperature control and lasting power—crafted to elevate any kitchen and empower your cooking with consistent, high-end results.</p></div>
      </section>

      <section className="bg-[#d3d0c5] px-6 pb-16 pt-20 md:pb-20 md:pt-[104px]">
        <div className="mx-auto max-w-[1392px]"><h2 className="font-serif text-[44px] font-light leading-none md:text-[53px] xl:text-[60px]">Discover more</h2><div className="mt-10 grid gap-1 md:grid-cols-2"><DiscoveryCard title="Cleaner air for fresher food" copy="Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies." cta="Explore Sub-Zero" href="/refrigeration/discover-sub-zero" image={assets.refrigeration} /><DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove’s intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/dishwashing/discover-cove" image={assets.dishwasher} /></div></div>
      </section>
    </main>
  );
}
