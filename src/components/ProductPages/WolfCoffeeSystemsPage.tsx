import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  hero: `${aem}16a8c1cf-f911-4c89-b740-f9ac83b25135/as/built-in-coffee.avif?assetname=built-in-coffee.jpeg&width=1920&max-quality=90`,
  mProfessional: `${aem}2a11dcdc-27d0-4f5e-a553-de0cf1631420`,
  mTransitional: `${aem}ed7ec0d1-0036-4554-a599-de9cea472000`,
  mContemporary: `${aem}5d8df632-215b-461e-b952-63f611ca5dcc`,
  eProfessional: `${aem}f0a2f378-85b2-478a-b99e-93af0d23fbc3`,
  eTransitional: `${aem}5b1b24ff-cc13-495b-ab92-17111d46c09d`,
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
  ["Outdoor", "/products/outdoor"],
  ["Drawers", "/cooking/drawers"],
] as const;

type CoffeeSystem = {
  model: string;
  title: string;
  image: string;
  width: string;
  finish: readonly string[];
  count?: string;
};

const coffeeSystems: readonly CoffeeSystem[] = [
  { model: "EC3050P/S", title: "M Series Professional Coffee System", image: assets.mProfessional, width: '30"', finish: ["Stainless Steel"] },
  { model: "EC3050T/S", title: "M Series Transitional Coffee System", image: assets.mTransitional, width: '30"', finish: ["Stainless Steel"] },
  { model: "EC3050TE/B", title: "M Series Contemporary Coffee System", image: assets.mContemporary, width: '30"', finish: ["Black", "Stainless Steel"], count: "1 / 2" },
  { model: "EC24/B", title: "E Series Professional Coffee System", image: assets.eProfessional, width: '30"', finish: ["Stainless Steel"] },
  { model: "EC2450TE/S", title: "E Series Transitional Coffee System", image: assets.eTransitional, width: '24" / 30"', finish: ["Stainless Steel"], count: "1 / 2" },
];

function FinishDot({ finish }: { finish: string }) {
  return <span aria-hidden="true" className={`size-3.5 shrink-0 rounded-full border border-black/15 ${finish === "Black" ? "bg-[#161616]" : "bg-[#92918e]"}`} />;
}

function CoffeeCard({ product, priority = false }: { product: CoffeeSystem; priority?: boolean }) {
  const href = `/products/cooking/coffee-systems/${product.model.toLowerCase().replaceAll("/", "-")}`;
  return (
    <article className="flex min-w-0 flex-col bg-[#f8f6f1] p-6 ring-1 ring-inset ring-[#d3d0c5]">
      <Link href={href} className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#181817]">
        <div className="relative aspect-[1.34/1] overflow-hidden bg-[#f4f2ec]">
          <Image src={product.image} alt={product.title} fill priority={priority} sizes="(min-width: 1024px) 29vw, (min-width: 640px) 46vw, 86vw" className="object-contain mix-blend-darken transition duration-500 group-hover:scale-[1.02]" />
        </div>
        <div className="flex min-h-10 items-center justify-end text-[13px] font-light"><span>{product.count}</span></div>
        <h3 className="min-h-[76px] pb-4 pt-5 font-serif text-[21px] font-light leading-[1.2] underline-offset-4 group-hover:underline md:text-[24px]">{product.title}</h3>
      </Link>
      <dl className="text-[13px] font-light leading-[1.45]">
        <div className="grid min-h-[52px] grid-cols-[0.38fr_0.62fr] border-t border-[#d3d0c5] py-4"><dt>Width:</dt><dd>{product.width}</dd></div>
        <div className="grid min-h-[70px] grid-cols-[0.38fr_0.62fr] border-t border-[#d3d0c5] py-4"><dt>Finish:</dt><dd className="space-y-1.5">{product.finish.map((finish) => <span key={finish} className="flex items-center gap-2"><FinishDot finish={finish} />{finish}</span>)}</dd></div>
      </dl>
    </article>
  );
}

function DiscoveryCard({ title, copy, cta, href, image }: { title: string; copy: string; cta: string; href: string; image: string }) {
  return (
    <article className="bg-[#f8f6f1]">
      <div className="relative aspect-[1.62] overflow-hidden"><Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
      <div className="grid gap-6 p-7 md:min-h-[205px] md:grid-cols-[0.48fr_0.52fr] md:p-8">
        <div className="flex flex-col items-start justify-between gap-7"><h3 className="font-serif text-[32px] font-light leading-[1.02] md:text-[40px]">{title}</h3><Link href={href} className="inline-flex min-h-10 items-center rounded-full border border-[#181817] px-6 text-[12px] font-semibold">{cta}</Link></div>
        <p className="text-[14px] font-light leading-[1.35]">{copy}</p>
      </div>
    </article>
  );
}

export function WolfCoffeeSystemsPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#181817]">
      <section className="relative h-[520px] overflow-hidden bg-[#0b0b0b] text-white md:h-[100svh] md:max-h-[1080px]" aria-labelledby="coffee-hero-title">
        <Image src={assets.hero} alt="Wolf built-in coffee system preparing a latte" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/60" />
        <h2 id="coffee-hero-title" className="absolute bottom-7 left-6 font-serif text-[34px] font-light leading-[1.1] md:text-[40px]">A perfect cup, every time</h2>
      </section>

      <nav aria-label="Cooking categories" className="overflow-x-auto border-b border-[#d4cfc5] bg-[#f7f5f0] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex min-w-max max-w-[1440px] border-l border-[#d4cfc5]">
          {cookingCategories.map(([title, href]) => <Link key={title} href={href} aria-current={title === "Coffee systems" ? "page" : undefined} className={`flex min-h-[68px] w-[160px] items-center justify-center border-r border-[#d4cfc5] px-3 text-center text-[13px] underline underline-offset-4 ${title === "Coffee systems" ? "bg-white font-semibold" : ""}`}>{title}</Link>)}
        </div>
      </nav>

      <section className="px-6 pb-14 pt-16 md:pb-20 md:pt-[68px]">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-20">
          <h1 className="self-start font-serif text-[46px] font-light leading-[1.1] tracking-[-0.02em] md:text-[53px] xl:text-[60px]">Coffee Systems</h1>
          <p className="max-w-[590px] font-serif text-[18px] font-light leading-[1.28] md:text-[24px]">Experience café-quality beverages at home with the Wolf Coffee System. Whether you prefer a rich espresso, a frothy cappuccino, or a soothing hot water infusion, this system delivers with precision and style. Designed to integrate seamlessly into your kitchen, it offers intuitive controls and a sleek aesthetic that complements your culinary space.</p>
        </div>
      </section>

      <section className="px-6"><div className="mx-auto max-w-[1392px]">
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#c9c4ba] pb-5 pt-2 text-[14px]">
          <div className="flex flex-wrap gap-x-12 gap-y-2">{["Series", "Width", "Finish"].map((filter) => <span key={filter} className="inline-flex min-h-9 items-center gap-3">{filter}<svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 fill-none stroke-current stroke-[1.2]"><path d="m3 4.5 3 3 3-3" /></svg></span>)}</div>
          <span className="inline-flex min-h-9 items-center gap-3 text-[12px]">All filters <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[18px] fill-none stroke-current stroke-[1.2]"><path d="M4 2v14M9 2v14M14 2v14" /><circle cx="4" cy="6" r="1.6" className="fill-[#f4f2ec]" /><circle cx="9" cy="12" r="1.6" className="fill-[#f4f2ec]" /><circle cx="14" cy="8" r="1.6" className="fill-[#f4f2ec]" /></svg></span>
        </div>
        <section className="pt-24 md:pt-[132px]" aria-label="Coffee Systems products">
          <div className="grid gap-1 pb-4 sm:grid-cols-2 lg:grid-cols-3">{coffeeSystems.map((product, index) => <CoffeeCard key={product.model} product={product} priority={index < 3} />)}</div>
        </section>
      </div></section>

      <section className="mt-16 border-t border-[#cbc6bc] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-20">
          <h2 className="max-w-[620px] font-serif text-[36px] font-light leading-[1.1] md:text-[40px]">A perfect cup, every time</h2>
          <p className="max-w-[620px] font-serif text-[18px] font-light leading-[1.3] md:text-[24px]">Wolf Coffee Systems feature a user-friendly interface with programmable settings, allowing you to customize your coffee experience. Every model includes a built-in grinder, adjustable milk frother, and a hot water dispenser for tea and other beverages. Its sleek design and advanced features make it a perfect addition to any modern kitchen.</p>
        </div>
      </section>

      <section className="bg-[#d3d0c5] px-6 pb-16 pt-20 md:pb-20 md:pt-[104px]"><div className="mx-auto max-w-[1392px]">
        <h2 className="font-serif text-[44px] font-light leading-none md:text-[53px] xl:text-[60px]">Discover more</h2>
        <div className="mt-10 grid gap-1 md:grid-cols-2"><DiscoveryCard title="Cleaner air for fresher food" copy="Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies." cta="Explore Sub-Zero" href="/refrigeration/discover-sub-zero" image={assets.refrigeration} /><DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove's intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/dishwashing/discover-cove" image={assets.dishwasher} /></div>
      </div></section>
    </main>
  );
}
