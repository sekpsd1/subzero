import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  hero: `${aem}5f4186ae-0d91-4db3-ac46-c9175d6ac670/as/25-SUBZERO_CI36560TS_INDUCTION-COOKTOP.avif?assetname=25-SUBZERO_CI36560TS_INDUCTION-COOKTOP.jpg&width=2560&max-quality=90`,
  contemporary: `${aem}c829e438-3665-48cc-9e50-db711f30ce70/as/image.avif?width=408&quality=95`,
  professional: `${aem}96bedc90-e2ac-4f11-91e1-0d0b9f251071/as/image.avif?width=408&quality=95`,
  transitional: `${aem}2d5ea2d3-f602-4076-b2e0-9717e942a249/as/image.avif?width=408&quality=95`,
  framed: `${aem}9b90cea3-f408-455f-9777-6ee6e4368f76/as/image.avif?width=408&quality=95`,
  refrigeration: `${aem}81756aa7-f917-449b-a5e8-335bdaaebd88/as/SM_TCSLG_111621_Grill.avif?assetname=SM_TCSLG_111621_Grill.jpg&width=1200&max-quality=90`,
  dishwasher: `${aem}390cad36-9e50-4e66-9ae9-feb55e0bd553/as/cove-dishwashing.avif?assetname=cove-dishwashing.jpg&width=1200&max-quality=90`,
};

const cookingCategories = [
  ["All cooking", "/products/cooking"],
  ["Ranges", "/cooking/ranges"],
  ["Built-in ovens", "/cooking/built-in-ovens"],
  ["Cooktops & Rangetops", "/cooking/cooktops-rangetops"],
  ["Ventilation", "/products/cooking/ventilation"],
  ["Coffee systems", "/products/cooking/coffee-systems"],
  ["Microwaves", "/products/cooking/microwaves"],
  ["Outdoor", "/products/outdoor"],
  ["Drawers", "/products/cooking/drawers"],
] as const;

type Cooktop = {
  group: string;
  title: string;
  width: string;
  burners: string;
  image: string;
  imageClassName: string;
  href: string;
  count?: string;
};

const cooktops: readonly Cooktop[] = [
  {
    group: "CGC",
    title: "Contemporary Gas Cooktop",
    width: '36"',
    burners: "5 Burners",
    image: assets.contemporary,
    imageClassName: "mix-blend-darken",
    href: "/products/cgc-contemporary-gas-cooktop",
  },
  {
    group: "CGP",
    title: "Professional Gas Cooktop",
    width: '30" 36"',
    burners: "4 Burners / 5 Burners",
    image: assets.professional,
    imageClassName: "mix-blend-darken",
    href: "/products/cgp-professional-gas-cooktop",
    count: "1 / 2",
  },
  {
    group: "CGT",
    title: "Transitional Gas Cooktop",
    width: '30" 36"',
    burners: "4 Burners / 5 Burners",
    image: assets.transitional,
    imageClassName: "mix-blend-darken",
    href: "/products/cgt-transitional-gas-cooktop",
    count: "1 / 2",
  },
  {
    group: "CGTF",
    title: "Transitional Framed Gas Cooktop",
    width: '15" 24"',
    burners: "2 Burners / 3 Burners",
    image: assets.framed,
    imageClassName: "mix-blend-darken",
    href: "/products/cgtf-transitional-framed-gas-cooktop",
    count: "1 / 2",
  },
];

function CooktopCard({ cooktop, priority }: { cooktop: Cooktop; priority?: boolean }) {
  return (
    <Link
      href={cooktop.href}
      className="group flex min-w-0 flex-col border border-[#d2cdc1] bg-[#f7f5ef] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#181817]"
    >
      <div className="relative aspect-[1/1.34] overflow-hidden bg-[#f4f2ec]">
        <Image
          src={cooktop.image}
          alt={cooktop.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"
          className={`object-contain px-8 py-14 transition duration-500 md:px-10 md:py-16 ${cooktop.imageClassName}`}
        />
        {cooktop.count ? <span className="absolute bottom-4 right-4 text-[14px] font-light">{cooktop.count}</span> : null}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 md:px-6">
        <h3 className="min-h-[45px] max-w-[360px] pb-2 font-serif text-[20px] font-light leading-[1.12] underline-offset-4 group-hover:underline md:text-[24px]">
          {cooktop.title}
        </h3>
        <dl className="border-t border-[#d2cdc1] text-[13px] font-light leading-[1.4]">
          <div className="grid min-h-[35px] grid-cols-2 border-b border-[#d2cdc1] py-2">
            <dt>Width:</dt><dd>{cooktop.width}</dd>
          </div>
          <div className="grid min-h-[61px] grid-cols-2 border-b border-[#d2cdc1] py-2">
            <dt>Cooktop Configuration:</dt>
            <dd>{cooktop.burners.split(" / ").map((burner) => <span key={burner} className="block">{burner}</span>)}</dd>
          </div>
          <div className="grid min-h-[39px] grid-cols-2 border-b border-[#d2cdc1] py-2">
            <dt>Finish:</dt>
            <dd className="flex items-center gap-2"><span className="size-3 rounded-full border border-black/15 bg-[#aaa9a5]" aria-hidden="true" />Stainless Steel</dd>
          </div>
          <div className="grid min-h-[61px] grid-cols-2 py-2">
            <dt>Fuel Type:</dt><dd><span className="block">Liquid Propane</span><span className="block">Natural Gas</span></dd>
          </div>
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
        <div className="flex flex-col items-start justify-between gap-7">
          <h3 className="font-serif text-[32px] font-light leading-[1.02] md:text-[38px]">{title}</h3>
          <Link href={href} className="inline-flex min-h-10 items-center rounded-full border border-[#181817] px-6 text-[12px] font-semibold">{cta}</Link>
        </div>
        <p className="text-[14px] font-light leading-[1.35]">{copy}</p>
      </div>
    </article>
  );
}

export function GasCooktopsPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#181817]">
      <section className="relative h-[520px] overflow-hidden bg-[#171715] text-white md:h-auto md:aspect-[2/1] md:max-h-[960px]" aria-labelledby="gas-cooktop-hero-title">
        <Image src={assets.hero} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/52" />
        <h2 id="gas-cooktop-hero-title" className="absolute inset-x-0 bottom-0 px-5 pb-7 font-serif text-[34px] font-light leading-none md:px-8 md:pb-9 md:text-[44px]">
          Precision heat control for maximum flavor development
        </h2>
      </section>

      <nav aria-label="Cooking categories" className="overflow-x-auto border-b border-[#d4cfc5] bg-[#f7f5f0] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex min-w-max max-w-[1440px] border-l border-[#d4cfc5]">
          {cookingCategories.map(([title, href]) => (
            <Link key={title} href={href} className={`flex min-h-[68px] w-[160px] items-center justify-center border-r border-[#d4cfc5] px-3 text-center text-[13px] underline underline-offset-4 ${title === "Cooktops & Rangetops" ? "bg-white font-semibold" : ""}`}>
              {title}
            </Link>
          ))}
        </div>
      </nav>

      <section className="px-6 pb-14 pt-16 md:px-12 md:pb-16 md:pt-[68px]">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-20">
          <h1 className="font-serif text-[46px] font-light leading-none tracking-[-0.02em] md:text-[60px]">Cooktops &amp; Rangetops</h1>
          <p className="max-w-[560px] font-serif text-[18px] font-light leading-[1.28] md:text-[24px]">
            Fitting in seamlessly to a wide array of kitchen styles—and available in gas or induction—each Wolf Cooktop and Rangetop offers unrivaled power, precision, and proven performance.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-24">
        <div className="mx-auto max-w-[1392px]">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#c9c4ba] pb-3">
            <div className="flex flex-wrap gap-x-12 gap-y-2 text-[13px]">
              <span className="inline-flex min-h-9 items-center gap-4">Burner Configuration <span aria-hidden="true">⌄</span></span>
              <span className="inline-flex min-h-9 items-center gap-4">Width <span aria-hidden="true">⌄</span></span>
              <span className="inline-flex min-h-9 items-center gap-4">Finish <span aria-hidden="true">⌄</span></span>
            </div>
            <div className="flex items-center gap-7 text-[12px] font-light"><span>All filters (1)</span><span className="h-7 w-px bg-[#c9c4ba]" /><span>Sort by ↓</span></div>
          </div>
          <div className="mt-4 border-b border-[#c9c4ba] pb-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em]">Selected filters (1)</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px]">
              <span className="rounded-full border border-[#8d877d] px-4 py-2 font-semibold">Gas Cooktop ×</span>
              <Link href="/cooking/cooktops-rangetops" className="ml-2 underline underline-offset-4">Clear all</Link>
            </div>
          </div>

          <div className="sr-only">
            <h2>Gas Cooktops</h2>
            <p>Dual-stacked, sealed gas burners provide precise high heat for fast boils and quick sears, and low flames for delicate simmers and silky sauces.</p>
          </div>
          <div className="mt-8 grid gap-[6px] sm:grid-cols-2 lg:grid-cols-3">{cooktops.map((cooktop, index) => <CooktopCard key={cooktop.group} cooktop={cooktop} priority={index < 3} />)}</div>
          <p className="mt-10 text-center text-[11px] font-semibold">Viewing 4 of 4</p>
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12 md:pb-12">
        <div className="mx-auto grid max-w-[1392px] gap-8 pt-6 lg:grid-cols-[1.32fr_1fr] lg:gap-20">
          <h2 className="font-serif text-[38px] font-light leading-none md:text-[44px]">Precision heat control for maximum flavor development</h2>
          <div>
            <p className="max-w-[590px] font-serif text-[18px] font-light leading-[1.3] md:text-[24px]">Wolf Cooktops and Rangetops combine sleek design with professional-grade performance. Whether gas or induction, each model delivers precise temperature control and lasting power—crafted to elevate any kitchen and empower your cooking with consistent, high-end results.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#d3d0c5] px-6 pb-16 pt-20 md:px-12 md:pb-20 md:pt-[104px]">
        <div className="mx-auto max-w-[1392px]">
          <h2 className="font-serif text-[44px] font-light leading-none md:text-[54px]">Discover more</h2>
          <div className="mt-10 grid gap-1 md:grid-cols-2">
            <DiscoveryCard title="Cleaner air for fresher food" copy="Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies." cta="Explore Sub-Zero" href="/refrigeration/discover-sub-zero" image={assets.refrigeration} />
            <DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove’s intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/dishwashing/discover-cove" image={assets.dishwasher} />
          </div>
        </div>
      </section>
    </main>
  );
}
