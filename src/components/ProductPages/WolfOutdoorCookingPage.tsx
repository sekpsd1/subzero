import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";
const pageSerif: CSSProperties = { fontFamily: '"Times New Roman", Times, serif' };
const editorialSerif: CSSProperties = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

const assets = {
  hero: `${aem}7c7db478-2aab-435a-80f1-09ff72aa61ee/as/outdoor-content-1.avif?assetname=outdoor+content+1.jpg&width=1920&max-quality=90`,
  grill: `${aem}fb786a6f-fcef-4b85-a935-6be6881f0717`,
  sideBurner: `${aem}1ca31676-1486-4c2e-a48c-971566e1a4c6`,
  burnerModule: `${aem}47538b57-e8e3-44b3-817d-093434b6d53c`,
  warmingDrawer: `${aem}d083168d-c862-44a8-b21e-d5a9313aece3`,
  wallHood: `${aem}44994875-a68a-42a0-a651-4c8afba30343`,
  refrigeration: `${aem}81756aa7-f917-449b-a5e8-335bdaaebd88/as/SM_TCSLG_111621_Grill.avif?assetname=SM_TCSLG_111621_Grill.jpg&width=1200&max-quality=90`,
  dishwasher: `${aem}390cad36-9e50-4e66-9ae9-feb55e0bd553/as/cove-dishwashing.avif?assetname=cove-dishwashing.jpg&width=1200&max-quality=90`,
};

const cookingCategories = [
  ["All cooking", "/products/cooking"],
  ["Ranges", "/cooking/ranges"],
  ["Built-in ovens", "/cooking/built-in-ovens"],
  ["Cooktops and Rangetops", "/cooking/cooktops-rangetops"],
  ["Ventilation", "/cooking/ventilation"],
  ["Coffee systems", "/cooking/coffee-systems"],
  ["Microwaves", "/cooking/microwaves"],
  ["Outdoor", "/cooking/outdoor"],
  ["Drawers", "/cooking/drawers"],
] as const;

type OutdoorProduct = {
  model: string;
  title: string;
  image: string;
  specs: ReadonlyArray<readonly [string, string]>;
  count?: string;
};

const groups: ReadonlyArray<{
  title: string;
  copy: string;
  products: readonly OutdoorProduct[];
}> = [
  {
    title: "Grills and Burners",
    copy: "Wolf outdoor grills specialize in nuanced temperature control—the key to successful grilling. We combine the searing power of independent grill burners with even, radiant heat from ceramic briquettes. The result? Predictably delicious meals. The precise high to low temperature control lets you masterfully grill anything from mouthwatering ribeyes to enticingly crosshatched vegetables.",
    products: [
      { model: "OG", title: "Outdoor Gas Grill", image: assets.grill, specs: [["Width:", '54"'], ["Fuel Type:", "Natural Gas"]] },
      { model: "SB", title: "Side Burner", image: assets.sideBurner, specs: [["Width:", '13"'], ["Fuel Type:", "Liquid Propane / Natural Gas"]] },
      { model: "BM", title: "Built-In Burner Module", image: assets.burnerModule, specs: [["Width:", '13"'], ["Fuel Type:", "Liquid Propane / Natural Gas"]] },
    ],
  },
  {
    title: "Drawers",
    copy: "With the Wolf warming drawer, dishes prepared at different times stay warm, moist, and ready to serve on your schedule. 30\" and 36\" front panels are available.",
    products: [
      { model: "WWDO", title: "Outdoor Warming Drawer", image: assets.warmingDrawer, specs: [["Width:", '30"']] },
    ],
  },
  {
    title: "Ventilation",
    copy: "Whisk away those pesky, uninvited guests—smoke, grease, and odor. Behind the sculpted lines of Wolf outdoor pro wall hoods, you will find power and finesse. A powerful, multi-speed internal, in-line, or remote blower is required. Multi-setting, bright LED lighting illuminates your cooking surface.",
    products: [
      { model: "PWO", title: "Outdoor Pro Wall Hood", image: assets.wallHood, specs: [["Width:", '36\" / 48\" / 60\"']], count: "1 / 3" },
    ],
  },
];

function ProductCard({ product, priority = false, compact = false }: { product: OutdoorProduct; priority?: boolean; compact?: boolean }) {
  return (
    <article className="flex min-w-0 flex-col bg-[#f8f6f1] p-6 ring-1 ring-inset ring-[#d3d0c5]">
      <Link href={`/products/cooking/outdoor/${product.model.toLowerCase()}`} className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#181817]">
        <div className={`relative aspect-[1.34/1] overflow-hidden bg-[#f4f2ec] lg:aspect-auto ${compact ? "lg:h-[328px]" : "lg:h-[360px]"}`}>
          <Image src={product.image} alt={product.title} fill priority={priority} sizes="(min-width: 1024px) 29vw, (min-width: 640px) 46vw, 86vw" className="object-contain mix-blend-darken transition duration-500 group-hover:scale-[1.02]" />
          {product.count ? <span className="absolute bottom-0 right-0 text-[13px] font-light">{product.count}</span> : null}
        </div>
        <h3 style={pageSerif} className="min-h-[69px] pb-4 pt-6 text-[21px] font-light leading-[1.2] underline-offset-4 group-hover:underline md:text-[24px]">{product.title}</h3>
      </Link>
      <dl className="text-[13px] font-light leading-[1.45]">
        {product.specs.map(([label, value]) => {
          const options = value.split(" / ");
          const stacked = label === "Fuel Type:" && options.length > 1;

          return (
            <div key={label} className={`grid min-h-[52px] grid-cols-[0.38fr_0.62fr] border-t border-[#d3d0c5] ${stacked ? "py-2" : "py-4"}`}>
              <dt>{label}</dt>
              <dd>{options.map((option, index) => <span key={option} className={stacked ? "block" : index ? "ml-3" : undefined}>{option}</span>)}</dd>
            </div>
          );
        })}
      </dl>
    </article>
  );
}

function DiscoveryCard({ title, copy, cta, href, image }: { title: string; copy: string; cta: string; href: string; image: string }) {
  return (
    <article className="bg-[#f8f6f1]">
      <div className="relative aspect-[1.62] overflow-hidden"><Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
      <div className="grid gap-6 p-7 md:min-h-[205px] md:grid-cols-[0.48fr_0.52fr] md:p-8">
        <div className="flex flex-col items-start justify-between gap-7"><h3 style={editorialSerif} className="text-[32px] font-light leading-[1.1] md:text-[40px]">{title}</h3><Link href={href} className="inline-flex min-h-10 items-center rounded-full border border-[#181817] px-6 text-[12px] font-semibold">{cta}</Link></div>
        <p className="text-[14px] font-light leading-[1.35]">{copy}</p>
      </div>
    </article>
  );
}

export function WolfOutdoorCookingPage() {
  return (
    <main
      className="bg-[#f4f2ec] text-[#181817]"
      style={{
        fontFamily: '"Segoe UI", Arial, Helvetica, sans-serif',
      }}
    >
      <section className="relative h-[520px] overflow-hidden bg-[#0b0b0b] text-white md:h-[100svh] md:max-h-[1080px]" aria-labelledby="outdoor-hero-title">
        <Image src={assets.hero} alt="Wolf outdoor kitchen with gas grill, burners, and seating" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />
        <h2 id="outdoor-hero-title" style={pageSerif} className="absolute bottom-7 left-6 text-[34px] font-light leading-[1.1] md:text-[40px]">Expert-level outdoor cooking</h2>
      </section>

      <nav aria-label="Cooking categories" className="overflow-x-auto border-b border-[#d4cfc5] bg-[#f7f5f0] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex min-w-max max-w-[1440px] border-l border-[#d4cfc5]">
          {cookingCategories.map(([title, href]) => <Link key={title} href={href} aria-current={title === "Outdoor" ? "page" : undefined} className={`flex min-h-[68px] w-[160px] items-center justify-center border-r border-[#d4cfc5] px-3 text-center text-[14px] underline underline-offset-4 ${title === "Outdoor" ? "bg-white font-semibold" : "font-light"}`}>{title}</Link>)}
        </div>
      </nav>

      <section className="px-6 pb-14 pt-16 md:pb-20 md:pt-[68px]">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.28fr_1fr] lg:gap-20">
          <h1 style={pageSerif} className="self-start text-[46px] font-light leading-[1.1] md:text-[53px] xl:text-[60px]">Outdoor Cooking</h1>
          <p style={pageSerif} className="max-w-[574px] text-[18px] font-light leading-[1.2] md:text-[24px]">Experience the same confidence in freshness and precise cooking outdoors with Sub-Zero and Wolf. Combining iconic design with durable construction, they perform flawlessly, rain or shine.</p>
        </div>
      </section>

      <section className="px-6"><div className="mx-auto max-w-[1392px]">
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#c9c4ba] pb-5 pt-2 text-[14px]">
          <div className="flex flex-wrap gap-x-12 gap-y-2">{["Series", "Width", "Finish"].map((filter) => <span key={filter} className="inline-flex min-h-9 items-center gap-3">{filter}<svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 fill-none stroke-current stroke-[1.2]"><path d="m3 4.5 3 3 3-3" /></svg></span>)}</div>
          <span className="inline-flex min-h-9 items-center gap-3 text-[12px]">All filters <span>25</span><svg aria-hidden="true" viewBox="0 0 18 18" className="size-[18px] fill-none stroke-current stroke-[1.2]"><path d="M4 2v14M9 2v14M14 2v14" /><circle cx="4" cy="6" r="1.6" className="fill-[#f4f2ec]" /><circle cx="9" cy="12" r="1.6" className="fill-[#f4f2ec]" /><circle cx="14" cy="8" r="1.6" className="fill-[#f4f2ec]" /></svg></span>
        </div>

        <div className="pb-10 pt-20 md:pt-[104px]">
          {groups.map((group, groupIndex) => <section key={group.title} className={groupIndex ? "mt-16 pt-14 md:mt-10 md:pt-16" : ""} aria-labelledby={`outdoor-group-${groupIndex}`}>
            <div><h2 id={`outdoor-group-${groupIndex}`} style={pageSerif} className="text-[36px] font-light leading-[1.1] md:text-[40px]">{group.title}</h2><p className="mt-6 max-w-[696px] text-[16px] font-light leading-[1.4] md:text-[18px]">{group.copy}</p></div>
            <div className="mt-8 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">{group.products.map((product, index) => <ProductCard key={product.model} product={product} priority={groupIndex === 0 && index < 3} compact={groupIndex > 0} />)}</div>
          </section>)}
        </div>
      </div></section>

      <section className="px-6 pb-10 pt-16">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.28fr_1fr] lg:gap-20">
          <h2 style={editorialSerif} className="max-w-[620px] self-start text-[36px] font-light leading-[1.1] md:text-[40px]">Expert-level outdoor cooking</h2>
          <p style={editorialSerif} className="max-w-[620px] text-[18px] font-light leading-[1.2] md:text-[24px]">Enjoy more moments worth savoring indoors and out with Wolf outdoor products. They feature the same superior performance, quality, and stunning design as their indoor counterparts, plus the rugged durability needed to withstand the elements.</p>
        </div>
      </section>

      <section className="bg-[#d3d0c5] px-6 pb-16 pt-20 md:pt-24"><div className="mx-auto max-w-[1392px]">
        <h2 style={editorialSerif} className="text-[44px] font-light leading-[1.1] md:text-[53px] xl:text-[60px]">Discover more</h2>
        <div className="mt-10 grid gap-1 md:grid-cols-2"><DiscoveryCard title="Cleaner air for fresher food" copy="Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies." cta="Explore Sub-Zero" href="/refrigeration/discover-sub-zero" image={assets.refrigeration} /><DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove's intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/dishwashing/discover-cove" image={assets.dishwasher} /></div>
      </div></section>
    </main>
  );
}
