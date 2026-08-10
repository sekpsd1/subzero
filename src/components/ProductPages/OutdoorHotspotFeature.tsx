"use client";

import Image from "next/image";
import { useState } from "react";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const hotspots = [
  {
    title: "Gourmet grilling",
    copy: "The same precise cooking control and consistency Wolf is known for, in a sleek, modern design built for years of outdoor use.",
    image: `${aem}5bbe8b65-0760-4fd2-a73f-7a2cbb9aea56/as/SM_SLG_042919_1b.avif?assetname=SM_SLG_042919_1b.jpg&width=640&max-quality=90`,
    alt: "Man adjusting controls on a Wolf outdoor grill",
    left: "41.2%",
    top: "14%",
  },
  {
    title: "Smart storage",
    copy: "Keep your outdoor kitchen organized with convenient drawers and bin storage that fits seamlessly with cooking and refrigeration products.",
    image: `${aem}75f9cad7-95fd-4d0b-b42e-ca93c20cd221/as/MD_TCS_091818_8.avif?assetname=MD_TCS_091818_8.jpg&width=640&max-quality=90`,
    alt: "Wolf outdoor grill with open stainless steel storage cabinets",
    left: "62%",
    top: "44.5%",
  },
  {
    title: "Refined refrigeration",
    copy: "Refreshing beverages are always at hand with Sub-Zero outdoor appliances that stand up to any weather.",
    image: `${aem}06214498-60d9-4f00-bd7f-20e24eac1bf8/as/SM_TCS_PIER52_2.avif?assetname=SM_TCS_PIER52_2.jpg&width=640&max-quality=90`,
    alt: "Sub-Zero outdoor refrigerator open beside a Wolf grill",
    left: "32.8%",
    top: "62%",
  },
] as const;

function Indicator({ open }: { open: boolean }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 text-[22px] font-light leading-none text-white/85" aria-hidden="true">
      {open ? "−" : "+"}
    </span>
  );
}

function HotspotCard({ index, open, onToggle, mobile = false }: { index: number; open: boolean; onToggle: () => void; mobile?: boolean }) {
  const item = hotspots[index];

  return (
    <article
      className={`${mobile ? "w-full" : "absolute w-[327px]"} overflow-hidden rounded-[3px] bg-[rgba(48,46,44,0.96)] text-white shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-[height] duration-300 ${open ? "z-20" : "z-10"}`}
      style={mobile ? undefined : { left: item.left, top: item.top }}
    >
      <button type="button" aria-expanded={open} onClick={onToggle} className="flex min-h-[61px] w-full items-center justify-between gap-5 px-4 text-left">
        <span className="font-serif text-[22px] font-light leading-tight md:text-[25px]">{item.title}</span>
        <Indicator open={open} />
      </button>
      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 overflow-hidden">
          <p className="px-4 pb-3 text-[15px] font-light leading-[1.28] text-white/60 md:text-[16px]">{item.copy}</p>
          <div className="relative mx-3 mb-3 aspect-[303/189] overflow-hidden">
            <Image src={item.image} alt={item.alt} fill sizes="303px" className="object-cover" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function OutdoorHotspotFeature({ background }: { background: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => setOpenIndex((current) => current === index ? null : index);

  return (
    <>
      <div className="relative h-[410px] md:h-[835px]">
        <Image src={background} alt="Sub-Zero and Wolf outdoor kitchen" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 hidden md:block">
          {hotspots.map((item, index) => <HotspotCard key={item.title} index={index} open={openIndex === index} onToggle={() => toggle(index)} />)}
        </div>
      </div>
      <div className="grid gap-px bg-[#cbc7bd] md:hidden">
        {hotspots.map((item, index) => <HotspotCard key={item.title} index={index} open={openIndex === index} onToggle={() => toggle(index)} mobile />)}
      </div>
    </>
  );
}
