import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  hero: "https://s7d9.scene7.com/is/image/szw/SZWC_Seattle_1359_4021FC_A_ADOBERGB?wid=3000&qlt=90",
  range: `${aem}20d8fcd5-f7c5-4f50-9e81-06ab4f317956/as/DF36450G_BK_P_SSBEZEL_REDKNOB_SH_comparison.avif?assetname=DF36450G_BK_P_SSBEZEL_REDKNOB_SH_comparison.png&width=900&max-quality=90`,
  refrigeration: `${aem}c0465147-b4fc-4839-a9cd-95ca2b2c9ef1/as/complete-your-kitchen-2.avif?assetname=complete-your-kitchen-2.png&width=1000&max-quality=90`,
  dishwasher: `${aem}24ec6ec9-5615-4793-aaeb-4692dfa57679/as/complete-your-kitchen-3.avif?assetname=complete-your-kitchen-3.jpg&width=1000&max-quality=90`,
};

const cookingCategories = [
  ["All cooking", "/products/cooking"],
  ["Ranges", "/cooking/ranges"],
  ["Built-in ovens", "/products/cooking/built-in-ovens"],
  ["Cooktops and Rangetops", "/products/cooking/cooktops-rangetops"],
  ["Ventilation", "/products/cooking/ventilation"],
  ["Coffee systems", "/products/cooking/coffee-systems"],
  ["Microwaves", "/products/cooking/microwaves"],
  ["Outdoor", "/products/outdoor"],
  ["Drawers", "/products/cooking/drawers"],
] as const;

const configurations = ["French Top", "Infrared Charbroiler", "Infrared Charbroiler and Infrared Griddle", "Infrared Double Griddle", "Infrared Griddle"] as const;

function FilterButton({ children }: { children: string }) {
  return <button type="button" className="inline-flex min-h-9 items-center gap-4 text-[14px] font-light">{children}<span aria-hidden="true">⌄</span></button>;
}

function ProductFamilyCard() {
  return (
    <article className="w-full max-w-[408px] border border-[#d4cfc5] bg-transparent">
      <div className="relative aspect-[0.88] bg-[#f4f2ec]">
        <Image src={assets.range} alt="Wolf Dual Fuel Range" fill sizes="408px" priority className="object-contain px-10 py-16" />
        <span className="absolute bottom-5 right-5 text-[14px] font-light">1 / 4</span>
      </div>
      <div className="px-6 pb-8">
        <h2 className="font-serif text-[24px] font-light leading-tight">Dual Fuel Range</h2>
        <dl className="mt-5 border-t border-[#d4cfc5] text-[13px] font-light leading-[1.35]">
          <div className="grid grid-cols-[45%_1fr] border-b border-[#d4cfc5] py-3"><dt>Width:</dt><dd>30&quot; 36&quot; 48&quot; 60&quot;</dd></div>
          <div className="grid grid-cols-[45%_1fr] border-b border-[#d4cfc5] py-3"><dt>Rangetop Configuration:</dt><dd className="space-y-1">{configurations.map((item) => <span key={item} className="block">{item}</span>)}</dd></div>
          <div className="grid grid-cols-[45%_1fr] border-b border-[#d4cfc5] py-3"><dt>Finish:</dt><dd className="space-y-1">{[["bg-[#222]","Black"],["bg-[#999]","Stainless Steel"],["bg-white","White"]].map(([color,label]) => <span key={label} className="flex items-center gap-2"><span className={`size-4 rounded-full border border-[#aaa] ${color}`} />{label}</span>)}</dd></div>
          <div className="grid grid-cols-[45%_1fr] py-3"><dt>Fuel Type:</dt><dd><span className="block">Liquid Propane</span><span className="mt-1 block">Natural Gas</span></dd></div>
        </dl>
      </div>
    </article>
  );
}

function DiscoveryCard({ title, copy, cta, href, image }: { title: string; copy: string; cta: string; href: string; image: string }) {
  return (
    <article className="bg-[#f8f6f1]">
      <div className="relative aspect-[1.62] overflow-hidden"><Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
      <div className="grid gap-6 p-7 md:min-h-[205px] md:grid-cols-[0.48fr_0.52fr] md:p-8">
        <div className="flex flex-col items-start justify-between gap-7"><h3 className="font-serif text-[clamp(2rem,2.5vw,2.7rem)] font-light leading-[1.02]">{title}</h3><Link href={href} className="inline-flex min-h-11 items-center rounded-full border border-[#181817] px-6 text-[13px] font-semibold">{cta}</Link></div>
        <p className="text-[15px] font-light leading-[1.25]">{copy}</p>
      </div>
    </article>
  );
}

export function DualFuelRangesPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#181817]">
      <section className="relative h-[100svh] min-h-[650px] max-h-[960px] overflow-hidden bg-[#171715] text-white">
        <Image src={assets.hero} alt="Wolf range with signature red knobs" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-black/48" />
        <h1 className="absolute bottom-7 left-6 font-serif text-[30px] font-light leading-none md:bottom-8 md:text-[40px]">Crafted for culinary confidence</h1>
      </section>

      <nav aria-label="Cooking categories" className="overflow-x-auto bg-[#f7f5f0] md:px-12">
        <div className="mx-auto flex min-w-max max-w-[1556px] border-l border-[#d4cfc5]">
          {cookingCategories.map(([title, href]) => <Link key={title} href={href} className={`flex min-h-[68px] w-[160px] items-center justify-center border-b border-r border-[#d4cfc5] px-4 text-center text-[14px] underline underline-offset-4 ${title === "Ranges" ? "bg-white font-semibold" : ""}`}>{title}</Link>)}
        </div>
      </nav>

      <section className="px-6 pb-8 pt-16 md:px-12 md:pb-12 md:pt-20">
        <div className="mx-auto grid max-w-[1392px] gap-9 lg:grid-cols-2">
          <h2 className="font-serif text-[48px] font-light leading-none md:text-[60px]">Ranges</h2>
          <p className="max-w-[570px] font-serif text-[clamp(1.35rem,1.65vw,1.65rem)] font-light leading-[1.12]">Whether you choose dual fuel, induction, or gas, there&apos;s a Wolf Range for you. Each promises precise heat control on the cooktop, reliable convection cooking in the oven, striking aesthetics, and unmatched durability.</p>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-[1392px]">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#d4cfc5] pb-4"><div className="flex flex-wrap gap-x-12 gap-y-3"><FilterButton>Burner Configuration</FilterButton><FilterButton>Width</FilterButton><FilterButton>Finish</FilterButton></div><div className="flex items-center gap-8 text-[14px] font-light"><button type="button">All filters (1) ⚙</button><span className="h-8 w-px bg-[#d4cfc5]" /><button type="button">Sort by ↓</button></div></div>
          <div className="mt-5"><p className="text-[11px] font-semibold uppercase tracking-[0.2em]">Selected filters (1)</p><div className="mt-4 flex items-center gap-5 text-[14px]"><span className="rounded-full border border-[#8d877d] px-4 py-2 font-semibold">Dual Fuel Range ×</span><Link href="/cooking/ranges" className="underline underline-offset-4">Clear all</Link></div></div>
          <div className="mt-12"><ProductFamilyCard /></div>
          <p className="mt-16 text-center text-[13px] font-semibold">Viewing 1 of 1</p>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-24"><div className="mx-auto grid max-w-[1392px] gap-10 lg:grid-cols-2"><h2 className="font-serif text-[clamp(2.3rem,3.2vw,3.75rem)] font-light leading-none">Crafted for culinary confidence</h2><p className="max-w-[570px] font-serif text-[clamp(1.35rem,1.65vw,1.65rem)] font-light leading-[1.14]">The spark behind extraordinary meals—decades of engineering innovations and design refinements, tested by the world&apos;s top chefs. Discover how precision heat control, striking aesthetics, and unmatched durability make a Wolf Dual Fuel, Gas, or Induction Range the centerpiece of your hard-working kitchen.</p></div></section>

      <section className="bg-[#d3d0c5] px-6 py-20 md:px-12 md:py-24"><div className="mx-auto max-w-[1392px]"><h2 className="font-serif text-[clamp(3rem,4vw,4rem)] font-light leading-none">Discover more</h2><div className="mt-12 grid gap-2 md:grid-cols-2"><DiscoveryCard title="Cleaner air for fresher food" copy="Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies." cta="Explore Sub-Zero" href="/refrigeration/discover-sub-zero" image={assets.refrigeration} /><DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove's intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/products" image={assets.dishwasher} /></div></div></section>
    </main>
  );
}
