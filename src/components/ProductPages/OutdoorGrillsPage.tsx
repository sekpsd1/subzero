import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";
const serif: CSSProperties = {
  fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif',
};

const assets = {
  hero: `${aem}d9bddb0e-982d-44a8-b846-9328a43ae8dc/as/outdoor-carousel-1.avif?assetname=outdoor+carousel+1.jpg&width=1920&max-quality=90`,
  grill: `${aem}fb786a6f-fcef-4b85-a935-6be6881f0717`,
  subZero: `${aem}81756aa7-f917-449b-a5e8-335bdaaebd88/as/SM_TCSLG_111621_Grill.avif?assetname=SM_TCSLG_111621_Grill.jpg&width=1400&max-quality=90`,
  wolf: `${aem}0b25fcce-e900-446e-aad3-a02309cbca8a/as/SZWC_Seattle_1359_4021FC_A_ADOBERGB.avif?assetname=SZWC_Seattle_1359_4021FC_A_ADOBERGB.tif&width=1200&max-quality=90`,
  cove: `${aem}390cad36-9e50-4e66-9ae9-feb55e0bd553/as/cove-dishwashing.avif?assetname=cove-dishwashing.jpg&width=1200&max-quality=90`,
};

function PillLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-9 items-center rounded-full border border-[#181817] px-5 text-[11px] font-semibold transition hover:bg-[#181817] hover:text-white">
      {children}
    </Link>
  );
}

function DiscoveryCard({ title, copy, cta, href, image }: { title: string; copy: string; cta: string; href: string; image: string }) {
  return (
    <article className="bg-[#fbfaf6]">
      <div className="relative aspect-[1.6] overflow-hidden">
        <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="grid min-h-[180px] gap-6 p-6 md:min-h-[212px] md:grid-cols-2">
        <div className="flex flex-col items-start justify-between gap-6">
          <h3 style={serif} className="text-[30px] font-light leading-[1.1] md:text-[40px]">{title}</h3>
          <PillLink href={href}>{cta}</PillLink>
        </div>
        <p className="text-[13px] font-light leading-[1.35] md:text-[14px]">{copy}</p>
      </div>
    </article>
  );
}

export function OutdoorGrillsPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#181817]" style={{ fontFamily: '"Segoe UI", Arial, Helvetica, sans-serif' }}>
      <section className="relative h-[520px] overflow-hidden bg-[#0c0c0b] text-white md:h-[100svh] md:max-h-[1080px]">
        <Image src={assets.hero} alt="Premium outdoor kitchen with a Wolf gas grill" fill preload sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/48" />
        <p style={serif} className="absolute bottom-6 left-6 text-[34px] font-light leading-none md:bottom-8 md:left-12 md:text-[40px]">Masterful performance</p>
      </section>

      <section className="px-6 pb-12 pt-14 md:px-12 md:pb-[76px] md:pt-16">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.28fr_1fr] lg:gap-20">
          <h1 style={serif} className="self-start text-[46px] font-light leading-[1.1] md:text-[53px] xl:text-[60px]">All Outdoor</h1>
          <p style={serif} className="max-w-[574px] text-[18px] font-light leading-[1.2] md:text-[24px]">
            Experience the same confidence in freshness and precise cooking outdoors with Sub-Zero and Wolf. Combining iconic design with durable construction, they perform flawlessly, rain or shine.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12 md:pb-16">
        <div className="mx-auto max-w-[1392px]">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#c9c4ba] pb-3 text-[13px] font-light">
            <div className="flex flex-wrap gap-x-12 gap-y-2">
              {["Series", "Width"].map((filter) => (
                <button key={filter} type="button" className="inline-flex min-h-9 items-center gap-3">{filter}<span aria-hidden="true">⌄</span></button>
              ))}
            </div>
            <div className="flex items-center gap-8"><button type="button">All filters (2)</button><button type="button">Sort by ↓</button></div>
          </div>

          <div className="pb-[70px] pt-4 text-[11px]">
            <p className="font-semibold uppercase tracking-[0.18em]">Selected filters (1)</p>
            <div className="mt-3 flex items-center gap-4">
              <span className="rounded-full border border-[#8d877d] px-3 py-1.5">Outdoor Gas Grill ×</span>
              <Link href="/cooking/outdoor" className="underline underline-offset-4">Clear all</Link>
            </div>
          </div>

          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            <article className="w-full max-w-[459px] border border-[#d2cdc1] bg-transparent p-5 md:p-6 md:pb-[14px]">
              <Link href="/products/cooking/outdoor/og" className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#181817]">
                <div className="relative aspect-[4/5] overflow-hidden md:h-[598px] md:aspect-auto">
                  <Image src={assets.grill} alt="Wolf Outdoor Gas Grill" fill preload sizes="(min-width: 1024px) 408px, (min-width: 640px) 46vw, 88vw" className="object-contain transition duration-500 group-hover:scale-[1.02]" />
                </div>
                <h2 style={serif} className="max-w-[410px] pb-4 text-[20px] font-light leading-[1.2] underline-offset-4 group-hover:underline md:text-[24px]">Outdoor Gas Grill</h2>
              </Link>
              <dl className="mt-3 border-t border-[#d8d2c8] text-[12px] font-light leading-[1.35]">
                <div className="grid grid-cols-2 border-b border-[#d8d2c8] py-2"><dt>Width:</dt><dd>54&quot;</dd></div>
                <div className="grid grid-cols-2 py-2"><dt>Fuel Type:</dt><dd>Natural Gas</dd></div>
              </dl>
            </article>
          </div>
          <p className="mt-[68px] text-center text-[11px] font-semibold">Viewing 1 of 1</p>
        </div>
      </section>

      <section className="px-6 pb-16 pt-4 md:px-12 md:pb-14 md:pt-4">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.28fr_1fr] lg:gap-20">
          <h2 style={serif} className="max-w-[576px] self-start text-[36px] font-light leading-[1.1] md:text-[40px]">Expand your culinary curiosity to the outdoors.</h2>
          <p style={serif} className="max-w-[500px] text-[18px] font-light leading-[1.2] md:text-[24px]">
            With Sub-Zero and Wolf, you can picture yourself preparing the same gourmet meals outdoors as you do indoors. Our multi-function grill gives you masterful control, while warming drawers lend a helping hand. Sub-Zero’s convenient undercounter refrigeration keeps fresh foods, cold drinks, ice, and other necessities at your fingertips.
          </p>
        </div>
      </section>

      <section className="bg-[#d3d0c5] px-6 pb-16 pt-16 md:px-12 md:pb-16 md:pt-20">
        <div className="mx-auto max-w-[1392px]">
          <h2 style={serif} className="text-[44px] font-light leading-[1.1] md:text-[53px] xl:text-[60px]">Discover more</h2>
          <div className="mt-10 grid gap-2">
            <article className="grid bg-[#fbfaf6] md:grid-cols-[0.255fr_0.745fr]">
              <div className="flex min-h-[360px] flex-col items-start justify-between p-6 md:min-h-[649px]">
                <div><h3 style={serif} className="text-[30px] font-light leading-[1.1] md:text-[40px]">Cleaner air for fresher food</h3><p className="mt-6 max-w-[306px] text-[13px] font-light leading-[1.35] md:text-[14px]">Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies.</p></div>
                <PillLink href="/refrigeration/discover-sub-zero">Explore Sub-Zero</PillLink>
              </div>
              <div className="relative min-h-[360px] overflow-hidden md:min-h-[649px]"><Image src={assets.subZero} alt="Sub-Zero refrigeration integrated into an outdoor kitchen" fill sizes="(min-width: 768px) 75vw, 100vw" className="object-cover" /></div>
            </article>
            <div className="grid gap-1 md:grid-cols-2 md:gap-2">
              <DiscoveryCard title="Effortless control, flawless flavor" copy="Wolf equips cooks of every level with the confidence to create exquisite meals time and time again." cta="Explore Wolf" href="/cooking/discover-wolf" image={assets.wolf} />
              <DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove's intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/dishwashing/discover-cove" image={assets.cove} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
