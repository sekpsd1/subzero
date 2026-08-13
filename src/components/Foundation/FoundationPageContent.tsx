"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };
const sans = { fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' };
const assetRoot = "/assets/foundation";

const fundingAreas = [
  { title: "Juvenile diabetes", copy: "We are committed to investing in research and programs dedicated to Type 1 Juvenile Diabetes (T1D).", image: `${assetRoot}/juvenile-diabetes.avif`, alt: "A child practicing archery at a community program" },
  { title: "Food security", copy: "Focuses on increasing access to nutritious foods through partnerships with pantries, and investing in healthy food programs.", image: `${assetRoot}/food-security.avif`, alt: "Volunteers serving food at a community gathering" },
  { title: "Community centers", copy: "We support programs that encourage healthy lifestyles, nutrition, and youth education and foster lifelong health.", image: `${assetRoot}/community-centers.avif`, alt: "Children learning to prepare fresh food together" },
] as const;

const impactItems = [
  { title: "Breakthrough T1D Madison", copy: "The Foundation supports Breakthrough T1D Madison and its work to accelerate life-changing breakthroughs for people living with type 1 diabetes.", image: `${assetRoot}/breakthrough-t1d.avif`, alt: "A young child holding up an event number beside an adult at a Breakthrough T1D gathering" },
  { title: "Matthew 25 Cedar Rapids", copy: "Matthew 25 strengthens neighborhoods through access to fresh food, youth education, and hands-on community programs in Cedar Rapids.", image: `${assetRoot}/matthew-25.avif`, alt: "Children harvesting fresh vegetables in a community garden" },
  { title: "The River Food Pantry Madison", copy: "The River Food Pantry helps provide reliable access to nutritious food for families throughout the Madison community.", image: `${assetRoot}/river-food-pantry.avif`, alt: "Volunteers beside a donation box filled with food at The River Food Pantry" },
  { title: "YMCA Cedar Rapids", copy: "The YMCA of the Cedar Rapids Metropolitan Area creates welcoming spaces and programs that support youth development, healthy living, and social responsibility.", image: `${assetRoot}/ymca.avif`, alt: "The exterior of a YMCA community center in Cedar Rapids" },
] as const;

type ImpactItem = (typeof impactItems)[number];

export function FoundationPageContent() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [activeItem, setActiveItem] = useState<ImpactItem | null>(null);
  const [slide, setSlide] = useState(0);
  const [pageCount, setPageCount] = useState(2);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    function updatePageCount() {
      setPageCount((carousel?.clientWidth ?? 0) < 640 ? 4 : 2);
      setSlide(0);
    }
    updatePageCount();
    const observer = new ResizeObserver(updatePageCount);
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeItem) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    function handleDialogKeys(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveItem(null);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", handleDialogKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleDialogKeys);
      lastTriggerRef.current?.focus();
    };
  }, [activeItem]);

  function openImpact(item: ImpactItem, trigger: HTMLButtonElement) {
    lastTriggerRef.current = trigger;
    setActiveItem(item);
  }

  return (
    <main style={sans} className="overflow-hidden bg-[#f0eee7] text-[#181817]">
      <section aria-labelledby="foundation-title" className="relative h-[100svh] min-h-[620px] text-white">
        <Image src={`${assetRoot}/hero.avif`} alt="Fresh vegetables, olive oil, and herbs arranged on a dark wooden table" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.10)_0%,rgba(0,0,0,.02)_45%,rgba(0,0,0,.52)_100%)]" />
        <h1 id="foundation-title" style={serif} className="absolute bottom-5 left-5 right-5 text-[32px] font-normal leading-[1.1] md:bottom-8 md:left-6 md:text-[40px] md:leading-[44px]">Sub-Zero Group Foundation</h1>
      </section>

      <section aria-labelledby="mission-title" className="px-5 py-16 text-center md:px-8">
        <div className="mx-auto max-w-[1140px]">
          <h2 id="mission-title" style={serif} className="text-[46px] font-extralight leading-[1.02] tracking-[-1px] md:text-[64px] xl:text-[80px] xl:leading-[81.6px] xl:tracking-[-2px]">Our mission</h2>
          <div className="mx-auto mt-6 max-w-[1140px] space-y-6 text-[15px] font-extralight leading-[1.4] md:text-[18px]">
            <p>The mission of the Sub-Zero Group Foundation is to foster innovation in the food ecosystem by increasing access to quality foods and investing in organizations that contribute to lifelong health.</p>
            <p>With this mission serving as our guiding principle, the foundation has identified three primary funding areas, focusing support on nonprofit 501(c)(3) organizations near our manufacturing facilities in Wisconsin, Arizona, and Iowa.</p>
          </div>
        </div>
      </section>

      <section aria-label="Primary funding areas" className="bg-[#d9d6cd] px-5 py-16 md:px-8 md:pb-[67px] md:pt-[72px]">
        <div className="mx-auto grid max-w-[1392px] gap-10 md:grid-cols-3 md:gap-2">
          {fundingAreas.map((area) => (
            <article key={area.title}>
              <div className="relative aspect-[1.6/1] overflow-hidden bg-[#cbc7bc]"><Image src={area.image} alt={area.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div>
              <div className="min-h-[168px] bg-[#faf9f5] px-6 pb-7 pt-6">
                <h3 style={serif} className="text-[27px] font-extralight leading-[1.15] lg:text-[30px] lg:leading-[36px]">{area.title}</h3>
                <p className="mt-6 text-[14px] font-extralight leading-[1.22] md:text-[16px] md:leading-[19.52px]">{area.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="impact-title" className="px-5 py-16 md:px-8 md:py-[72px] lg:pb-[108px]">
        <div className="mx-auto max-w-[1392px]">
          <h2 id="impact-title" style={serif} className="text-[43px] font-normal leading-[1.04] md:text-[60px] md:leading-[66px]">Explore our impact</h2>
          <div ref={carouselRef} className="mt-7 overflow-hidden md:mt-8">
            <div className="flex gap-2 transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `translateX(calc(-${slide} * (var(--impact-step) + 2.67px)))` }}>
              {impactItems.map((item) => (
                <button key={item.title} type="button" onClick={(event) => openImpact(item, event.currentTarget)} className="group relative aspect-[.75/1] min-w-full overflow-hidden bg-[#312f2b] text-left text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#181817] sm:min-w-[calc(50%-4px)] lg:min-w-[calc(33.333%-5.34px)]">
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transition-none" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                  <span style={serif} className="absolute bottom-5 left-5 right-5 text-[30px] leading-[1.02] md:text-[34px] lg:text-[40px] lg:leading-[44px]">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
          <style>{`:root { --impact-step: 33.333%; } @media (max-width: 1023px) { :root { --impact-step: 50%; } } @media (max-width: 639px) { :root { --impact-step: 100%; } }`}</style>
          <div className="mt-8 flex items-center justify-end gap-7 md:gap-10">
            <p aria-live="polite" className="min-w-[48px] text-center text-[14px]">{slide + 1} / {pageCount}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setSlide((current) => Math.max(0, current - 1))} disabled={slide === 0} aria-label="Previous impact slide" className="grid h-11 w-11 place-items-center rounded-full border border-[#181817]/50 transition hover:bg-[#181817] hover:text-white disabled:cursor-not-allowed disabled:opacity-25 md:h-8 md:w-8"><ArrowLeft size={15} strokeWidth={1.5} /></button>
              <button type="button" onClick={() => setSlide((current) => Math.min(pageCount - 1, current + 1))} disabled={slide === pageCount - 1} aria-label="Next impact slide" className="grid h-11 w-11 place-items-center rounded-full border border-[#181817]/50 transition hover:bg-[#181817] hover:text-white disabled:cursor-not-allowed disabled:opacity-25 md:h-8 md:w-8"><ArrowRight size={15} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="foundation-contact-title" className="px-5 pb-24 pt-10 md:px-8 md:pb-[108px] md:pt-[58px]">
        <div className="mx-auto grid max-w-[1120px] bg-[#faf9f5] p-5 md:grid-cols-[426px_1fr] md:p-6">
          <div className="relative aspect-square overflow-hidden bg-[#d7d3ca]"><Image src={`${assetRoot}/contact.avif`} alt="Volunteers organizing canned goods and supplies in a warehouse" fill sizes="(min-width: 768px) 426px, 100vw" className="object-cover" /></div>
          <div className="flex flex-col justify-center px-2 py-10 md:py-0 md:pl-[104px] md:pr-10">
            <h2 id="foundation-contact-title" style={serif} className="text-[36px] font-normal leading-[1.1] md:max-w-[455px] md:text-[40px] md:leading-[44px]">Connect with our foundation</h2>
            <p className="mt-6 text-[15px] leading-[1.35] md:max-w-[455px] md:text-[16px]">If your organization&rsquo;s mission aligns with our investment areas and you would like to connect with the Sub-Zero Group Foundation, we invite you to reach out to us.</p>
            <a href="https://forms.office.com/pages/responsepage.aspx?id=v-6ZEyHtKkukte3NI-f3pkIXkfHIypREn2_5sOLbDC5UNjNIQVpQUlBORENaRlE0R0lURUVZU1pOWC4u&route=shorturl" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex h-12 w-fit items-center rounded-full bg-[#181817] px-8 text-[14px] font-semibold text-white transition hover:bg-black/75 md:h-[52px]">Contact us</a>
          </div>
        </div>
      </section>

      {activeItem ? (
        <div role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setActiveItem(null); }} className="fixed inset-0 z-[200] grid place-items-center bg-black/65 px-5 py-8 backdrop-blur-[2px]">
          <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="impact-modal-title" className="relative max-h-full w-full max-w-[720px] overflow-auto bg-[#faf9f5] p-7 text-[#181817] shadow-2xl md:p-12">
            <button ref={closeButtonRef} type="button" onClick={() => setActiveItem(null)} aria-label="Close impact details" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-[#181817]/40 transition hover:bg-[#181817] hover:text-white"><X size={20} strokeWidth={1.5} /></button>
            <div className="relative mt-12 aspect-[1.6/1] overflow-hidden md:mt-6"><Image src={activeItem.image} alt="" fill sizes="(min-width: 768px) 620px, 100vw" className="object-cover" /></div>
            <h2 id="impact-modal-title" style={serif} className="mt-7 pr-8 text-[34px] font-normal leading-[1.08] md:text-[40px] md:leading-[44px]">{activeItem.title}</h2>
            <p className="mt-5 text-[15px] leading-[1.5] md:text-[16px]">{activeItem.copy}</p>
            <button type="button" onClick={() => setActiveItem(null)} className="mt-7 inline-flex h-12 items-center rounded-full bg-[#181817] px-8 text-[14px] font-semibold text-white transition hover:bg-black/75">Close</button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
