import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  hero: `${aem}5f4186ae-0d91-4db3-ac46-c9175d6ac670/as/25-SUBZERO_CI36560TS_INDUCTION-COOKTOP.avif?assetname=25-SUBZERO_CI36560TS_INDUCTION-COOKTOP.jpg&width=2560&max-quality=90`,
  contemporary: `${aem}8277324c-12f4-47e5-8978-de28269b0495`,
  transitional: `${aem}aa96cc8f-a905-4e64-aea4-2327beea2747`,
  framed: `${aem}593d5bc3-786c-435e-b292-29bdbe5de038`,
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
  ["Drawers", "/products/cooking/drawers"],
] as const;

type Cooktop = {
  group: string;
  title: string;
  width: string;
  zones: string;
  finish: string;
  image: string;
  href: string;
  count: string;
};

const cooktops: readonly Cooktop[] = [
  {
    group: "CI60C",
    title: "Contemporary Induction Cooktop",
    width: '30" / 36"',
    zones: "4 Cooking Zones / 5 Cooking Zones",
    finish: "Black",
    image: assets.contemporary,
    href: "/products/ci60c-contemporary-induction-cooktop",
    count: "1 / 2",
  },
  {
    group: "CI60T",
    title: "Transitional Induction Cooktop",
    width: '30" / 36"',
    zones: "4 Cooking Zones / 5 Cooking Zones",
    finish: "Stainless Steel",
    image: assets.transitional,
    href: "/products/ci60t-transitional-induction-cooktop",
    count: "1 / 2",
  },
  {
    group: "CITF",
    title: "Transitional Framed Induction Cooktop",
    width: '15" / 24" / 30" / 36"',
    zones: "2 Cooking Zones / 3 Cooking Zones / 4 Cooking Zones / 5 Cooking Zones",
    finish: "Stainless Steel",
    image: assets.framed,
    href: "/products/citf-transitional-framed-induction-cooktop",
    count: "1 / 4",
  },
];

function CooktopCard({ cooktop, priority = false }: { cooktop: Cooktop; priority?: boolean }) {
  const rows = [
    ["Width", cooktop.width],
    ["Cooktop Configuration", cooktop.zones],
    ["Finish", cooktop.finish],
  ] as const;

  return (
    <article className="flex min-w-0 flex-col bg-[#f7f5ef] p-6 ring-1 ring-inset ring-[#d3d0c5]">
      <Link href={cooktop.href} className="group flex flex-1 flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#181817]">
        <div className="h-9" aria-hidden="true" />
        <div className="relative aspect-[1.6/1] overflow-hidden bg-[#f4f2ec]">
          <Image
            src={cooktop.image}
            alt={cooktop.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 29vw, (min-width: 640px) 45vw, 84vw"
            className="object-contain mix-blend-darken transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex min-h-9 items-center justify-end text-[13px] font-light">{cooktop.count}</div>
        <h3 className="min-h-[76px] pb-4 pt-5 font-serif text-[20px] font-light leading-[1.2] underline-offset-4 group-hover:underline md:text-[24px]">
          {cooktop.title}
        </h3>
        <dl className="text-[13px] font-light leading-[1.4]">
          {rows.map(([label, value]) => (
            <div key={label} className="grid min-h-[51px] grid-cols-2 border-t border-[#d3d0c5] py-4">
              <dt>{label}:</dt>
              <dd>
                {label === "Finish" ? (
                  <span className="inline-flex items-center gap-2">
                    <span className={`size-3.5 rounded-full border border-black/10 ${value === "Black" ? "bg-[#181817]" : "bg-[#929291]"}`} aria-hidden="true" />
                    {value}
                  </span>
                ) : (
                  value.split(" / ").map((option) => <span key={option} className="block pb-1 last:pb-0">{option}</span>)
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Link>
    </article>
  );
}

function DiscoveryCard({ title, copy, cta, href, image }: { title: string; copy: string; cta: string; href: string; image: string }) {
  return (
    <article className="bg-[#f8f6f1]">
      <div className="relative aspect-[1.62] overflow-hidden"><Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
      <div className="grid gap-6 p-7 md:min-h-[205px] md:grid-cols-[0.48fr_0.52fr] md:p-8">
        <div className="flex flex-col items-start justify-between gap-7">
          <h3 className="font-serif text-[32px] font-light leading-[1.02] md:text-[40px]">{title}</h3>
          <Link href={href} className="inline-flex min-h-10 items-center rounded-full border border-[#181817] px-6 text-[12px] font-semibold">{cta}</Link>
        </div>
        <p className="text-[14px] font-light leading-[1.35]">{copy}</p>
      </div>
    </article>
  );
}

export function InductionCooktopsPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#181817]">
      <section className="relative h-[520px] overflow-hidden bg-[#171715] text-white md:h-auto md:aspect-[2/1] md:max-h-[960px]" aria-labelledby="induction-hero-title">
        <Image src={assets.hero} alt="Wolf induction cooktop in a dark stone kitchen" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <h2 id="induction-hero-title" className="absolute inset-x-0 bottom-0 px-6 pb-7 font-serif text-[34px] font-light leading-[1.1] md:pb-8 md:text-[40px]">
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

      <section className="px-6 pb-14 pt-16 md:pb-16 md:pt-[68px]">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-20">
          <h1 className="font-serif text-[46px] font-light leading-[1.1] tracking-[-0.02em] md:text-[60px]">Cooktops &amp; Rangetops</h1>
          <p className="max-w-[560px] font-serif text-[18px] font-light leading-[1.28] md:text-[24px]">
            Fitting in seamlessly to a wide array of kitchen styles—and available in gas or induction—each Wolf Cooktop and Rangetop offers unrivaled power, precision, and proven performance.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-[1392px]">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#c9c4ba] pb-5 pt-2">
            <div className="flex flex-wrap gap-x-12 gap-y-2 text-[13px]">
              {["Series (1)", "Width", "Finish"].map((filter) => (
                <span key={filter} className="inline-flex min-h-9 items-center gap-3">
                  {filter}
                  <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 fill-none stroke-current stroke-[1.2]"><path d="m3 4.5 3 3 3-3" /></svg>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-7 text-[12px] font-light"><span>All filters (1)</span><span className="h-7 w-px bg-[#c9c4ba]" /><span>Sort by ↓</span></div>
          </div>

          <div className="border-b border-[#c9c4ba] pb-5 pt-4">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em]">Selected filters (1)</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px]">
              <span className="rounded-full border border-[#8d877d] px-4 py-2 font-semibold">Induction Cooktop ×</span>
              <Link href="/cooking/cooktops-rangetops/view-all" className="ml-2 underline underline-offset-4">Clear all</Link>
            </div>
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
            {cooktops.map((cooktop, index) => <CooktopCard key={cooktop.group} cooktop={cooktop} priority={index < 3} />)}
          </div>
          <p className="mt-10 text-center text-[11px] font-semibold">Viewing 3 of 3</p>
        </div>
      </section>

      <section className="border-t border-[#cbc6bc] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-20">
          <h2 className="font-serif text-[38px] font-light leading-[1.1] md:text-[40px]">Precision heat control for maximum flavor development</h2>
          <p className="max-w-[590px] font-serif text-[18px] font-light leading-[1.3] md:text-[24px]">Wolf Cooktops and Rangetops combine sleek design with professional-grade performance. Whether gas or induction, each model delivers precise temperature control and lasting power—crafted to elevate any kitchen and empower your cooking with consistent, high-end results.</p>
        </div>
      </section>

      <section className="bg-[#d3d0c5] px-6 pb-16 pt-20 md:pb-20 md:pt-[104px]">
        <div className="mx-auto max-w-[1392px]">
          <h2 className="font-serif text-[44px] font-light leading-none md:text-[60px]">Discover more</h2>
          <div className="mt-10 grid gap-1 md:grid-cols-2">
            <DiscoveryCard title="Cleaner air for fresher food" copy="Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies." cta="Explore Sub-Zero" href="/refrigeration/discover-sub-zero" image={assets.refrigeration} />
            <DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove’s intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/dishwashing/discover-cove" image={assets.dishwasher} />
          </div>
        </div>
      </section>
    </main>
  );
}
