import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  hero: `${aem}ee3df836-e310-4239-8c46-faac1e4d08d8/as/SM_INTL_FRIGO_51217.avif?assetname=SM_INTL_FRIGO_51217.png&width=1920&max-quality=90`,
  downdraft: `${aem}46727688-7022-4a23-a8bf-13bcdcb235da`,
  ceiling: `${aem}74464036-024f-4f96-ba36-c46f3c74607a`,
  island: `${aem}7a9f7a84-988b-4fb3-a1c0-d0b33f4ef54b`,
  proIsland: `${aem}193a51b4-54e1-4c39-a9ee-b7496ff950cd`,
  lowProfile: `${aem}96473b06-972f-47ce-98af-436040d32719`,
  proWall24: `${aem}6942e63e-73b4-452f-bae8-888687ef5633`,
  proWall27: `${aem}6f97ca26-3012-4511-a21f-8f1a1db98461`,
  wallChimney: `${aem}d2e667f5-c7e1-47fe-b935-2daf64e9d12c`,
  outdoorWall: `${aem}44994875-a68a-42a0-a651-4c8afba30343`,
  cooktopWall: `${aem}c3705298-c651-4f01-b19b-6b75920292a2`,
  liner19: `${aem}2ebd4a48-8b9f-45ae-941d-1b85233c2475`,
  liner22: `${aem}f2c0affc-a4e7-4795-a4bb-ee4c86ce62fe`,
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

type VentilationProduct = {
  model: string;
  title: string;
  image: string;
  widths: string;
  finishes?: string[];
  count: string;
  href: string;
};

const groups: ReadonlyArray<{
  title: string;
  copy: string;
  products: VentilationProduct[];
}> = [
  {
    title: "Downdraft",
    copy: "Achieve a sleek, minimal look. Rising and lowering out of the countertop, downdraft units are especially useful in open-concept kitchens and in islands.",
    products: [
      { model: "DD", title: "Downdraft Ventilation", image: assets.downdraft, widths: '30\" / 36\" / 45\"', count: "1 / 3", href: "/products/downdraft-ventilation-dd/dd" },
    ],
  },
  {
    title: "Ceiling-Mounted Hood",
    copy: "Available in white glass or stainless steel, ceiling-mounted hoods are one of our most concealed ventilation options. LED lights amply illuminate your cooking area. Adjust the blower as needed with discreet recessed controls. Also includes an ADA-compliant remote control.",
    products: [
      { model: "VC", title: "Ceiling-Mounted Hood", image: assets.ceiling, widths: '36\" / 48\"', finishes: ["Stainless Steel", "White"], count: "1 / 4", href: "/products/ceiling-mounted-hood-vc/vc" },
    ],
  },
  {
    title: "Island Hood",
    copy: "Select from contemporary black glass looks—that coordinate with Wolf ovens and cooktops—or the professional, bold character of a pro island hood. No matter the style, all models come with a telescoping chimney that reaches standard ceiling heights.",
    products: [
      { model: "VI", title: "Cooktop Island Hood", image: assets.island, widths: '42\" / 45\"', finishes: ["Black", "Glass", "Stainless Steel"], count: "1 / 3", href: "/products/cooktop-island-hood-vi/vi" },
      { model: "PI3418", title: "Pro Island Hood", image: assets.proIsland, widths: '36\" / 42\" / 54\" / 66\"', count: "1 / 4", href: "/products/pro-island-hood-pi3418/pi3418" },
    ],
  },
  {
    title: "Wall Hood",
    copy: "Wolf wall hoods provide a classic look that matches other Sub-Zero, Wolf, and Cove professional-style products. Wall hoods also come in contemporary black glass or stainless steel styles, with hand-finished details.",
    products: [
      { model: "PW2210", title: "Low Profile Wall Hood", image: assets.lowProfile, widths: '30\" / 36\" / 42\" / 48\"', count: "1 / 4", href: "/products/low-profile-wall-hood-pw2210/pw2210" },
      { model: "PW2418", title: 'Pro Wall Hood - 24\" Depth', image: assets.proWall24, widths: '30\" / 36\" / 42\" / 48\" / 54\" / 60\" / 66\"', count: "1 / 4", href: "/products/pro-wall-hood-24-depth-pw2418/pw2418" },
      { model: "PW2718", title: 'Pro Wall Hood - 27\" Depth', image: assets.proWall27, widths: '30\" / 36\" / 42\" / 48\" / 54\" / 60\" / 66\"', count: "1 / 4", href: "/products/pro-wall-hood-27-depth-pw2718/pw2718" },
      { model: "PWC2418", title: "Pro Wall Chimney Hood", image: assets.wallChimney, widths: '36\" / 42\" / 48\" / 54\"', count: "1 / 4", href: "/products/pro-wall-chimney-hood-pwc2418/pwc2418" },
      { model: "PWO3318", title: "Outdoor Pro Wall Hood", image: assets.outdoorWall, widths: '36\" / 48\" / 60\"', count: "1 / 3", href: "/products/outdoor-pro-wall-hood-pwo3318/pwo3318" },
      { model: "VW", title: "Cooktop Wall Hood", image: assets.cooktopWall, widths: '30\" / 36\" / 45\"', finishes: ["Black", "Glass", "Stainless Steel"], count: "1 / 3", href: "/products/cooktop-wall-hood-vw/vw" },
    ],
  },
  {
    title: "Hood Liner",
    copy: "Pair the professional power of Wolf hood liners with your custom ventilation needs. Conceal ventilation within custom hoods, enhancing your kitchen’s décor. Features include LED lighting, a heat safety sensor, and recessed controls.",
    products: [
      { model: "PL1912", title: 'Pro Hood Liner - 19\" Depth', image: assets.liner19, widths: '36\" / 42\" / 48\" / 54\" / 60\"', count: "1 / 5", href: "/products/pro-hood-liner-19-depth-pl1912/pl1912" },
      { model: "PL2212", title: 'Pro Hood Liner - 22\" Depth', image: assets.liner22, widths: '36\" / 42\" / 48\" / 54\" / 60\"', count: "1 / 5", href: "/products/pro-hood-liner-22-depth-pl2212/pl2212" },
    ],
  },
];

function FinishDot({ finish }: { finish: string }) {
  const color = finish === "Black" ? "bg-[#181817]" : finish === "White" ? "bg-white" : finish === "Glass" ? "bg-[#c8ced0]" : "bg-[#91918f]";
  return <span className={`size-3.5 shrink-0 rounded-full border border-black/10 ${color}`} aria-hidden="true" />;
}

function ProductCard({ product, priority = false }: { product: VentilationProduct; priority?: boolean }) {
  return (
    <Link href={product.href} className="group flex min-w-0 flex-col bg-[#f7f5ef] p-6 ring-1 ring-inset ring-[#d3d0c5] focus:outline-none focus-visible:ring-[#181817]">
      <div className="relative aspect-[1.6/1] overflow-hidden bg-[#f4f2ec]">
        <Image src={product.image} alt={product.title} fill priority={priority} sizes="(min-width: 1024px) 29vw, (min-width: 640px) 46vw, 86vw" className="object-contain mix-blend-darken transition duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="flex min-h-10 items-center justify-end text-[13px] font-light">{product.count}</div>
      <h3 className="min-h-[74px] pb-4 pt-5 font-serif text-[22px] font-light leading-[1.2] underline-offset-4 group-hover:underline md:text-[24px]">{product.title}</h3>
      <dl className="text-[13px] font-light leading-[1.45]">
        <div className="grid min-h-[52px] grid-cols-[0.45fr_0.55fr] border-t border-[#d3d0c5] py-4">
          <dt>Width:</dt><dd>{product.widths}</dd>
        </div>
        {product.finishes ? (
          <div className="grid min-h-[74px] grid-cols-[0.45fr_0.55fr] border-t border-[#d3d0c5] py-4">
            <dt>Finish:</dt>
            <dd className="space-y-1.5">{product.finishes.map((finish) => <span key={finish} className="flex items-center gap-2"><FinishDot finish={finish} />{finish}</span>)}</dd>
          </div>
        ) : null}
      </dl>
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

export function WolfVentilationPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#181817]">
      <section className="relative h-[520px] overflow-hidden bg-[#111] text-white md:h-[max(100svh,56.25vw)] md:max-h-[1080px]" aria-labelledby="ventilation-hero-title">
        <Image src={assets.hero} alt="Wolf wall hood in a dark professional kitchen" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65" />
        <h2 id="ventilation-hero-title" className="absolute bottom-7 left-6 max-w-[960px] font-serif text-[34px] font-light leading-[1.1] md:bottom-auto md:top-[calc(100svh-68px)] md:text-[40px]">Discreet removal of smoke, odors, and heat</h2>
      </section>

      <nav aria-label="Cooking categories" className="overflow-x-auto border-b border-[#d4cfc5] bg-[#f7f5f0] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex min-w-max max-w-[1440px] border-l border-[#d4cfc5]">
          {cookingCategories.map(([title, href]) => <Link key={title} href={href} aria-current={title === "Ventilation" ? "page" : undefined} className={`flex min-h-[68px] w-[160px] items-center justify-center border-r border-[#d4cfc5] px-3 text-center text-[13px] underline underline-offset-4 ${title === "Ventilation" ? "bg-white font-semibold" : ""}`}>{title}</Link>)}
        </div>
      </nav>

      <section className="px-6 pb-14 pt-16 md:pb-16 md:pt-[68px]">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-20">
          <h1 className="self-start font-serif text-[46px] font-light leading-[1.1] tracking-[-0.02em] md:text-[53px] xl:text-[60px]">Ventilation</h1>
          <p className="max-w-[590px] font-serif text-[18px] font-light leading-[1.28] md:text-[24px]">Powerful ventilation with a refined presence. Whether you prefer the sleek minimalism of a downdraft or the bold statement of a pro wall hood, each Wolf Ventilation model is engineered to clear smoke, odors, and grease—quietly and efficiently—while complementing your kitchen’s design.</p>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto max-w-[1392px]">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#c9c4ba] pb-5 pt-2 text-[14px]">
            <div className="flex flex-wrap gap-x-12 gap-y-2">{["Series", "Width", "Finish"].map((filter) => <span key={filter} className="inline-flex min-h-9 items-center gap-3">{filter}<svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 fill-none stroke-current stroke-[1.2]"><path d="m3 4.5 3 3 3-3" /></svg></span>)}</div>
            <span className="inline-flex min-h-9 items-center gap-3 text-[12px]">All filters <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[18px] fill-none stroke-current stroke-[1.2]"><path d="M4 2v14M9 2v14M14 2v14" /><circle cx="4" cy="6" r="1.6" className="fill-[#f4f2ec]" /><circle cx="9" cy="12" r="1.6" className="fill-[#f4f2ec]" /><circle cx="14" cy="8" r="1.6" className="fill-[#f4f2ec]" /></svg></span>
          </div>

          {groups.map((group, groupIndex) => (
            <section key={group.title} className="pt-14 md:pt-16" aria-labelledby={`ventilation-group-${groupIndex}`}>
              <h2 id={`ventilation-group-${groupIndex}`} className="font-serif text-[36px] font-light leading-[1.1] md:text-[40px]">{group.title}</h2>
              <p className="mt-5 max-w-[760px] text-[15px] font-light leading-[1.5] md:text-[18px]">{group.copy}</p>
              <div className="mt-7 grid gap-1 pb-4 sm:grid-cols-2 lg:grid-cols-3">{group.products.map((product, index) => <ProductCard key={product.model} product={product} priority={groupIndex < 2 && index === 0} />)}</div>
            </section>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-[#cbc6bc] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-20">
          <h2 className="max-w-[620px] font-serif text-[36px] font-light leading-[1.1] md:text-[40px]">Discreet removal of smoke, odors, and heat</h2>
          <div>
            <p className="max-w-[620px] font-serif text-[18px] font-light leading-[1.3] md:text-[24px]">Wolf Ventilation features advanced extraction technology with options for internal, inline, or remote blowers. Many models include LED lighting with adjustable brightness, a heat safety sensor that automatically adjusts blower speed, and backdraft transitions to minimize cold air flow. Designed to integrate seamlessly with Wolf cooking appliances, these hoods offer both style and performance.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#d3d0c5] px-6 pb-16 pt-20 md:pb-20 md:pt-[104px]">
        <div className="mx-auto max-w-[1392px]">
          <h2 className="font-serif text-[44px] font-light leading-none md:text-[53px] xl:text-[60px]">Discover more</h2>
          <div className="mt-10 grid gap-1 md:grid-cols-2">
            <DiscoveryCard title="Cleaner air for fresher food" copy="Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies." cta="Explore Sub-Zero" href="/refrigeration/discover-sub-zero" image={assets.refrigeration} />
            <DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove’s intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/dishwashing/discover-cove" image={assets.dishwasher} />
          </div>
        </div>
      </section>
    </main>
  );
}
