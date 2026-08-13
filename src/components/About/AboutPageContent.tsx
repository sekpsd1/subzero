"use client";

import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

const serif = {
  fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif',
};

const exploreItems = [
  {
    title: "Sustainability",
    image: "/assets/about/sustainability.avif",
    href: "/our-story",
    alt: "Green agricultural fields at sunset",
  },
  {
    title: "Press Room",
    image: "/assets/about/press-room.avif",
    href: "/journal",
    alt: "Sub-Zero and Wolf showroom exterior",
  },
  {
    title: "Foundation",
    image: "/assets/about/foundation.avif",
    href: "/our-story",
    alt: "Sub-Zero Group Foundation community event",
  },
] as const;

const contacts = [
  {
    title: "Customer care",
    image: "/assets/about/customer-care.avif",
    alt: "Customer care specialist working at a laptop",
    copy: "Seeking help with an existing product? Our knowledgeable customer care team is available Monday through Friday, 7:00am — 7:00pm CT and can provide owner resources and product support, including use and care questions, maintenance, troubleshooting, service referral, specifications, installation, part information, and more.",
    phone: "800-222-7820",
    tel: "tel:800-222-7820",
  },
  {
    title: "Product experts",
    image: "/assets/about/product-experts.avif",
    alt: "Sub-Zero and Wolf appliances in a kitchen consultation space",
    copy: "The expert consultants at our Wisconsin headquarters are here to help shoppers looking for appliances or planning a kitchen project. This team can provide product information and guidance as you navigate the product selection and sales process. Available Monday through Friday, 8:00am — 6:00pm CT.",
    phone: "800-444-7820",
    tel: "tel:800-444-7820",
  },
  {
    title: "Partner hotline",
    image: "/assets/about/partner-hotline.avif",
    alt: "Appliance professional consulting with a homeowner",
    copy: "Our partner hotline is available to help our professional partners, including, but not limited to: distributors, dealers, installers, and trade professionals. Available Monday through Friday, 7:00am — 7:00pm CT.",
    phone: "866-689-9653",
    tel: "tel:866-689-9653",
  },
] as const;

export function AboutPageContent() {
  const heroVideo = useRef<HTMLVideoElement>(null);
  const storyVideo = useRef<HTMLVideoElement>(null);
  const storySection = useRef<HTMLElement>(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const [storyPaused, setStoryPaused] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [storyZoomProgress, setStoryZoomProgress] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    heroVideo.current?.pause();
    storyVideo.current?.pause();
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateStoryZoom = () => {
      const section = storySection.current;
      if (!section || window.innerWidth < 768) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      setStoryZoomProgress(Math.min(1, Math.max(0, -rect.top / travel)));
    };

    const requestStoryZoomUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateStoryZoom);
    };

    requestStoryZoomUpdate();
    window.addEventListener("scroll", requestStoryZoomUpdate, { passive: true });
    window.addEventListener("resize", requestStoryZoomUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestStoryZoomUpdate);
      window.removeEventListener("resize", requestStoryZoomUpdate);
    };
  }, []);

  function toggleVideo(ref: RefObject<HTMLVideoElement | null>, paused: boolean, setPaused: (value: boolean) => void) {
    const video = ref.current;
    if (!video) return;
    if (paused) void video.play().then(() => setPaused(false)).catch(() => setPaused(true));
    else {
      video.pause();
      setPaused(true);
    }
  }

  function syncProgress(video: HTMLVideoElement, setProgress: (value: number) => void) {
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    setProgress(duration ? video.currentTime / duration : 0);
  }

  const storyBorderSize = `${Math.max(0, 2.1 - storyZoomProgress * 2.1)}vw`;
  const storyVideoScale = 1.035 - storyZoomProgress * 0.035;

  return (
    <main className="overflow-x-clip bg-[#f2f0e9] text-[#181817]">
      <section className="relative h-[100svh] min-h-[640px] max-md:h-[225px] max-md:min-h-0" aria-labelledby="about-title">
        <video ref={heroVideo} autoPlay muted loop playsInline preload="metadata" poster="/assets/about/hero-poster.avif" onLoadedMetadata={(event) => syncProgress(event.currentTarget, setHeroProgress)} onTimeUpdate={(event) => syncProgress(event.currentTarget, setHeroProgress)} onPause={() => setHeroPaused(true)} onPlay={() => setHeroPaused(false)} className="absolute inset-0 h-full w-full object-cover">
          <source src="/assets/about/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08)_48%,rgba(0,0,0,.62)_100%)]" />
        <h1 id="about-title" style={serif} className="absolute bottom-6 left-6 text-[40px] font-normal leading-[1.1] text-[#fbf9f5] max-md:bottom-4 max-md:left-4 max-md:text-[32px]">
          About us
        </h1>
        <VideoControl paused={heroPaused} progress={heroProgress} onClick={() => toggleVideo(heroVideo, heroPaused, setHeroPaused)} className="bottom-6 right-6 max-md:bottom-4 max-md:right-4" />
      </section>

      <section className="px-4 pb-[55px] pt-10 text-center md:px-8 md:pb-[96px] md:pt-[64px]">
        <div className="mx-auto max-w-[1140px]">
          <h2 style={serif} className="text-[52px] font-normal leading-[1.02] md:text-[80px]">
            Icons of design and paragons of performance for more than 80 years
          </h2>
          <p className="mx-auto mt-8 max-w-[980px] text-[16px] leading-[1.42] md:text-[18px]">
            Sub-Zero, Wolf, and Cove are the refrigeration, cooking, and dishwashing specialists found in the world&rsquo;s most luxurious homes. We are dedicated to helping you create the functional, flexible, and beautiful kitchen of your dreams.
          </p>
        </div>
      </section>

      <section
        ref={storySection}
        className="section expanding-media-container relative mb-[30px] h-auto bg-[#f2f0e9] md:mb-[72px] md:h-[155svh]"
        data-section-status="loaded"
        data-palette="stone--dark"
        role="region"
        aria-label="Sub-Zero, Wolf, and Cove brand story video"
        style={{
          "--about-story-border": storyBorderSize,
          "--about-story-scale": storyVideoScale,
        } as CSSProperties}
      >
        <div className="expanding-media-wrapper relative mx-auto aspect-[343/243] w-[calc(100%-32px)] overflow-hidden md:sticky md:top-0 md:h-[100svh] md:min-h-[640px] md:w-full md:aspect-auto">
          <div className="expanding-media block relative h-full" data-block-name="expanding-media" data-block-status="loaded">
            <div className="tension-zoom relative h-full overflow-hidden">
              <div className="media-item-wrapper expanding-media-media-element relative h-full w-full" data-aem-asset-id="3e87eb94-3fee-472d-b5b7-2ff03f91c375" role="group" aria-label="Sub-Zero, Wolf, and Cove brand story video">
                <video ref={storyVideo} autoPlay muted loop playsInline preload="metadata" poster="/assets/about/hero-poster.avif" onLoadedMetadata={(event) => syncProgress(event.currentTarget, setStoryProgress)} onTimeUpdate={(event) => syncProgress(event.currentTarget, setStoryProgress)} onPause={() => setStoryPaused(true)} onPlay={() => setStoryPaused(false)} className="absolute inset-0 h-full w-full object-cover will-change-transform md:[transform:scale(var(--about-story-scale))]">
                  <source src="/assets/about/story.mp4" type="video/mp4" />
                </video>
                <VideoControl paused={storyPaused} progress={storyProgress} onClick={() => toggleVideo(storyVideo, storyPaused, setStoryPaused)} className="bottom-5 right-5 md:bottom-[calc(var(--about-story-border)+20px)] md:right-[calc(var(--about-story-border)+20px)]" />
              </div>
              <div className="tension-zoom-border tension-zoom-block tension-zoom-top pointer-events-none absolute left-0 top-0 hidden w-full bg-[#f2f0e9] will-change-[height] md:block" style={{ height: storyBorderSize }} />
              <div className="tension-zoom-border tension-zoom-inline tension-zoom-right pointer-events-none absolute right-0 top-0 hidden h-full bg-[#f2f0e9] will-change-[width] md:block" style={{ width: storyBorderSize }} />
              <div className="tension-zoom-border tension-zoom-block tension-zoom-bottom pointer-events-none absolute bottom-0 left-0 hidden w-full bg-[#f2f0e9] will-change-[height] md:block" style={{ height: storyBorderSize }} />
              <div className="tension-zoom-border tension-zoom-inline tension-zoom-left pointer-events-none absolute left-0 top-0 hidden h-full bg-[#f2f0e9] will-change-[width] md:block" style={{ width: storyBorderSize }} />
              <div className="trigger-line pointer-events-none absolute top-[55%] w-full" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-[112px] md:px-8">
        <div className="mx-auto max-w-[1376px]">
          <h2 style={serif} className="mb-8 text-[42px] font-normal leading-[1.1] md:text-[60px]">
            Elevating every moment in the kitchen and beyond
          </h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-2">
            <EditorialCard title="Careers" image="/assets/about/careers.avif" alt="Sub-Zero Group colleagues collaborating in a bright office" copy="We look for leaders who are driven by innovation and excellence, striving to serve our customers by doing what is right—with integrity, teamwork, and accountability. If you are interested in joining us, start here." href="/about" cta="Learn more" />
            <EditorialCard title="Showrooms" image="/assets/about/showrooms.jpg" alt="Sub-Zero and Wolf showroom with working kitchens" copy="Ready to embark on your kitchen journey? We’ll tailor an engaging experience just for you in one of our stunning kitchen appliance showrooms—so you’ll leave with the confidence that your dream kitchen will become a reality." href="/showroom" cta="Visit a showroom" />
          </div>
        </div>
      </section>

      <section className="px-4 pb-[112px] md:px-8">
        <div className="mx-auto max-w-[1376px]">
          <h2 style={serif} className="mb-8 text-[42px] font-normal leading-[1.1] md:text-[60px]">Contact our team of experts</h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-2">
            {contacts.map((contact) => (
              <article key={contact.title} className="flex min-h-[590px] flex-col bg-[#fbfaf6] md:min-h-0">
                <div className="relative h-[260px] md:h-[287px]">
                  <Image src={contact.image} alt={contact.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:min-h-[330px]">
                  <h3 style={serif} className="text-[32px] font-normal leading-[1.1] md:text-[40px]">{contact.title}</h3>
                  <p className="mt-6 text-[15px] leading-[1.23] md:text-[16px]">{contact.copy}</p>
                  <a href={contact.tel} className="mt-auto inline-flex min-h-[52px] w-fit items-center gap-3 rounded-full border border-[#181817] px-7 text-[15px] font-semibold transition hover:bg-[#181817] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3">
                    <Phone size={17} strokeWidth={1.5} aria-hidden="true" /> {contact.phone}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d8d6cd] px-4 py-[72px] md:px-8 md:pb-[96px] md:pt-[64px]">
        <div className="mx-auto max-w-[1392px]">
          <h2 style={serif} className="mb-[96px] text-[42px] font-normal leading-[1.1] md:mb-8 md:text-[60px]">Explore more</h2>
          <div className="flex snap-x gap-2 overflow-x-auto pb-5 max-md:[scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
            {exploreItems.map((item) => (
              <Link key={item.title} href={item.href} className="group relative aspect-[458/612] min-w-full snap-start overflow-hidden md:min-w-0">
                <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,.78)_100%)]" />
                <span style={serif} className="absolute inset-x-6 bottom-6 flex items-center justify-between text-[34px] leading-none text-white md:text-[40px]">
                  {item.title}<ArrowRight className="md:hidden" size={22} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 md:hidden" aria-hidden="true"><span className="h-[3px] w-1/3 bg-[#181817]" /><span className="h-px flex-1 bg-[#181817]" /><span className="text-sm">1 / 3</span></div>
        </div>
      </section>
    </main>
  );
}

function EditorialCard({ title, image, alt, copy, href, cta }: { title: string; image: string; alt: string; copy: string; href: string; cta: string }) {
  return (
    <article className="bg-[#fbfaf6]">
      <div className="relative aspect-[692/433]"><Image src={image} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
      <div className="grid min-h-[260px] p-6 md:grid-cols-[minmax(190px,1fr)_1fr] md:gap-8">
        <h3 style={serif} className="text-[32px] font-normal leading-[1.1] md:text-[40px]">{title}</h3>
        <p className="mt-6 text-[15px] leading-[1.23] md:mt-0 md:text-[16px]">{copy}</p>
        <Link href={href} className="mt-8 inline-flex min-h-[52px] w-fit items-center rounded-full border border-[#181817] px-8 text-[15px] font-semibold transition hover:bg-[#181817] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 md:col-span-2">{cta}</Link>
      </div>
    </article>
  );
}

function VideoControl({ paused, progress, onClick, className }: { paused: boolean; progress: number; onClick: () => void; className: string }) {
  const circumference = 2 * Math.PI * 24;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <button type="button" onClick={onClick} aria-label={paused ? "Play" : "Pause"} aria-pressed={!paused} className={`group absolute z-10 grid h-[60px] w-[60px] place-items-center rounded-full text-white outline-none ${className}`}>
      <svg className="h-[60px] w-[60px] overflow-visible" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="30" cy="30" r="24" stroke="rgba(255,255,255,.42)" strokeWidth="3" fill="none" />
        <circle
          cx="30"
          cy="30"
          r="24"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="origin-center -rotate-90 transition-[stroke-dashoffset] duration-200"
        />
        <circle cx="30" cy="30" r="20" fill="rgba(21,21,20,.8)" className="transition group-hover:fill-white" />
        {paused ? (
          <path d="M25 20L39 30L25 40V20Z" fill="currentColor" className="transition group-hover:text-[#181817]" />
        ) : (
          <g className="transition group-hover:text-[#181817]">
            <rect x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
            <rect x="33" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
          </g>
        )}
        <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 transition group-focus-visible:opacity-100" />
      </svg>
      <span className="sr-only">Video</span>
    </button>
  );
}
