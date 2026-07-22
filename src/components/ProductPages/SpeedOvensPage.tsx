import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  hero: `${aem}8f5c4f68-6dff-4f46-aec4-dbebe71e0eb3/as/KDC_17-18_Canadian-Bay_Kirstyn-Lloyd_02.avif?assetname=KDC_17-18_Canadian-Bay_Kirstyn-Lloyd_02.jpg&width=2560&max-quality=90`,
  speed: `${aem}c077915f-ae96-4ed1-95dd-ccac1e277505/as/MDD_SPO_3050TE_S_T-1.avif?assetname=MDD_SPO_3050TE_S_T+1.png&width=1000&max-quality=90`,
  comparison: `${aem}aee58e73-2457-46fd-9551-c46a46c99e13/as/SPO_Comparison_scaled.avif?assetname=SPO_Comparison_scaled.png&width=1000&max-quality=90`,
  refrigeration: `${aem}c0465147-b4fc-4839-a9cd-95ca2b2c9ef1/as/complete-your-kitchen-2.avif?assetname=complete-your-kitchen-2.png&width=1200&max-quality=90`,
  dishwasher: `${aem}24ec6ec9-5615-4793-aaeb-4692dfa57679/as/complete-your-kitchen-3.avif?assetname=complete-your-kitchen-3.jpg&width=1200&max-quality=90`,
};

const cookingCategories = [
  ["All cooking", "/products/cooking"],
  ["Ranges", "/cooking/ranges"],
  ["Built-in ovens", "/cooking/built-in-ovens"],
  ["Cooktops and rangetops", "/products/cooking/cooktops-rangetops"],
  ["Ventilation", "/products/cooking/ventilation"],
  ["Coffee systems", "/products/cooking/coffee-systems"],
  ["Microwaves", "/products/cooking/microwaves"],
  ["Outdoor", "/products/outdoor"],
  ["Drawers", "/products/cooking/drawers"],
] as const;

type SpeedOven = {
  model: string;
  title: string;
  width: string;
  finish: "Black" | "Stainless Steel";
  image: string;
  treatment?: "black" | "professional";
  count?: string;
};

const models: readonly SpeedOven[] = [
  { model: "SPO50CM", title: "M Series Contemporary Speed Oven", width: '30"', finish: "Black", image: assets.speed, treatment: "black" },
  { model: "SPO50PE", title: "E Series Professional Speed Oven", width: '30"', finish: "Stainless Steel", image: assets.speed, treatment: "professional" },
  { model: "SPO50PM", title: "M Series Professional Speed Oven", width: '30"', finish: "Stainless Steel", image: assets.speed, treatment: "professional" },
  { model: "SPO50TE", title: "E Series Transitional Speed Oven", width: '24" 30"', finish: "Stainless Steel", image: assets.comparison, count: "1 / 2" },
  { model: "SPO50TM", title: "M Series Transitional Speed Oven", width: '30"', finish: "Stainless Steel", image: assets.comparison },
];

function FilterButton({ children }: { children: string }) {
  return (
    <button type="button" className="inline-flex min-h-9 items-center gap-4 text-[13px] font-light">
      {children}<span aria-hidden="true">⌄</span>
    </button>
  );
}

function SpeedOvenCard({ oven, priority }: { oven: SpeedOven; priority?: boolean }) {
  return (
    <Link href={`/products/${oven.model.toLowerCase()}`} className="group flex min-w-0 flex-col border border-[#d2cdc1] bg-[#f7f5ef] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#181817]">
      <div className="relative aspect-[1/1.18] overflow-hidden bg-[#f4f2ec]">
        <Image src={oven.image} alt={oven.title} fill priority={priority} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" className={`object-contain px-8 py-10 transition duration-500 group-hover:scale-[1.025] md:px-12 md:py-14 ${oven.treatment === "black" ? "brightness-[0.34] contrast-[1.35]" : oven.treatment === "professional" ? "scale-[0.94] group-hover:scale-[0.965]" : ""}`} />
        {oven.count ? <span className="absolute bottom-4 right-4 text-[11px]">{oven.count}</span> : null}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 md:px-6">
        <h2 className="min-h-[48px] max-w-[330px] font-serif text-[20px] font-light leading-[1.12] underline-offset-4 group-hover:underline group-focus-visible:underline">{oven.title}</h2>
        <dl className="mt-5 border-t border-[#d2cdc1] text-[11px] leading-[1.35]">
          <div className="grid grid-cols-[42%_1fr] border-b border-[#d2cdc1] py-2.5"><dt>Width:</dt><dd>{oven.width}</dd></div>
          <div className="grid grid-cols-[42%_1fr] border-b border-[#d2cdc1] py-2.5"><dt>Oven type:</dt><dd>Convection speed</dd></div>
          <div className="grid grid-cols-[42%_1fr] border-b border-[#d2cdc1] py-2.5"><dt>Finish:</dt><dd className="flex items-center gap-2"><span className={`size-3 rounded-full border border-black/15 ${oven.finish === "Black" ? "bg-[#242424]" : "bg-[#aaa9a5]"}`} aria-hidden="true" />{oven.finish}</dd></div>
          <div className="grid grid-cols-[42%_1fr] py-2.5"><dt>Features:</dt><dd>Convection, broil, microwave speed</dd></div>
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

export function SpeedOvensPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#181817]">
      <section className="relative h-[100svh] min-h-[560px] max-h-[1080px] overflow-hidden bg-[#171715] text-white" role="region" aria-labelledby="faster-heat-better-airflow">
        <Image src={assets.hero} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-transparent to-black/42" />
        <div className="absolute inset-x-0 bottom-0 flex items-end px-5 pb-7 md:px-8 md:pb-9">
          <h2 id="faster-heat-better-airflow" className="font-serif text-[34px] font-light leading-none md:text-[44px]">Faster heat, better airflow</h2>
        </div>
      </section>

      <nav aria-label="Cooking categories" className="overflow-x-auto border-b border-[#d4cfc5] bg-[#f7f5f0] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><div className="mx-auto flex min-w-max max-w-[1440px] border-l border-[#d4cfc5]">{cookingCategories.map(([title, href]) => <Link key={title} href={href} className={`flex min-h-[68px] w-[160px] items-center justify-center border-r border-[#d4cfc5] px-3 text-center text-[14px] underline underline-offset-4 ${title === "Built-in ovens" ? "bg-white font-semibold" : ""}`}>{title}</Link>)}</div></nav>

      <section className="px-6 pb-16 pt-16 md:px-12 md:pt-[68px]"><div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-2 lg:gap-20"><h1 className="font-serif text-[46px] font-light leading-none tracking-[-0.02em] md:text-[60px]">Built-In Ovens</h1><p className="max-w-[560px] font-serif text-[18px] font-light leading-[1.28] md:text-[24px]">Wolf’s wide assortment of wall ovens—in convection, convection steam, and speed models—make cooking easier and more enjoyable. With simple controls and even heat, you can count on delicious, perfectly cooked meals every time.</p></div></section>

      <section className="px-6 pb-20 md:px-12 md:pb-24"><div className="mx-auto max-w-[1392px]">
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#c9c4ba] pb-3"><div className="flex flex-wrap gap-x-12 gap-y-2"><FilterButton>Series (1)</FilterButton><FilterButton>Width</FilterButton><FilterButton>Finish</FilterButton></div><div className="flex items-center gap-7 text-[12px] font-light"><button type="button">All filters (1)</button><span className="h-7 w-px bg-[#c9c4ba]" /><button type="button">Sort by ↓</button></div></div>
        <div className="mt-4 border-b border-[#c9c4ba] pb-5"><p className="text-[9px] font-semibold uppercase tracking-[0.22em]">Selected filters (1)</p><div className="mt-3 flex flex-wrap items-center gap-2 text-[12px]"><span className="rounded-full border border-[#8d877d] px-4 py-2 font-semibold">Speed Oven ×</span><button type="button" className="ml-2 underline underline-offset-4">Clear all</button></div></div>

        <div className="py-12 md:py-16"><div className="grid gap-8 lg:grid-cols-2 lg:gap-20"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em]">Product group</p><h2 className="mt-3 font-serif text-[38px] font-light leading-none md:text-[44px]">Convection Speed Ovens</h2></div><p className="max-w-[560px] font-serif text-[18px] font-light leading-[1.3] md:text-[20px]">The performance you expect from Wolf—only faster and smaller. Delight in the versatility of convection and broil capabilities combined with the power of a microwave in one easy-to-use appliance.</p></div></div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">{models.map((oven, index) => <SpeedOvenCard key={oven.model} oven={oven} priority={index < 3} />)}</div><p className="mt-10 text-center text-[11px] font-semibold">Viewing 5 of 5</p>
      </div></section>

      <section className="px-6 pb-20 md:px-12 md:pb-24"><div className="mx-auto grid max-w-[1392px] gap-8 border-t border-[#c9c4ba] pt-12 lg:grid-cols-2 lg:gap-20"><h2 className="font-serif text-[38px] font-light leading-none md:text-[44px]">Faster heat, better airflow</h2><p className="max-w-[560px] font-serif text-[18px] font-light leading-[1.3] md:text-[20px]">Wolf Convection Ovens, Convection Steam Ovens, and Convection Speed Ovens take the guesswork out of cooking, with intuitive controls and consistent, even heat for maximum flavor development.</p></div></section>

      <section className="border-y border-[#c9c4ba] px-6 py-16 md:px-12"><div className="mx-auto max-w-[1392px]"><p className="text-[10px] font-semibold uppercase tracking-[0.22em]">Related Built-In Ovens</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Link href="/cooking/built-in-ovens/convection" className="flex items-center justify-between border border-[#aaa49a] px-6 py-5 font-serif text-[24px] hover:bg-white">Convection Ovens <span aria-hidden="true">→</span></Link><Link href="/cooking/built-in-ovens/convection-steam" className="flex items-center justify-between border border-[#aaa49a] px-6 py-5 font-serif text-[24px] hover:bg-white">Convection Steam Ovens <span aria-hidden="true">→</span></Link></div></div></section>

      <section className="bg-[#d3d0c5] px-6 py-16 md:px-12 md:py-20"><div className="mx-auto max-w-[1392px]"><h2 className="font-serif text-[44px] font-light leading-none md:text-[54px]">Discover more</h2><div className="mt-10 grid gap-1 md:grid-cols-2"><DiscoveryCard title="Cleaner air for fresher food" copy="Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies." cta="Explore Sub-Zero" href="/refrigeration/discover-sub-zero" image={assets.refrigeration} /><DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove’s intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/products" image={assets.dishwasher} /></div></div></section>
    </main>
  );
}
