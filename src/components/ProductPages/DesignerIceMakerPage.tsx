"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent } from "react";

const aem = (id: string, file: string, width = 1920) =>
  `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:${id}/as/${file}&width=${width}&max-quality=90`;

const assets = {
  hero: "/assets/subzero/dice-unveil-cut-wr.avif",
  heroVideo: "/assets/subzero/ice-makers/ice-maker.mp4",
  cheersVideo: "/assets/subzero/ice-makers/cheers-to-the-freshest-ice.mp4",
  ultraQuietVideo: "/assets/subzero/ice-makers/ultra-quiet.mp4",
  readyVideo: "/assets/subzero/ice-makers/ready-when-you-need-it.mp4",
  hotspot: "/assets/subzero/ice-makers/SZ_SPO3050TE_DEU1550IP_031325_01b.avif",
  hotspotConvenience: aem(
    "509e9fe0-d1e2-47f6-bcda-3ffcd5262d6e",
    "SZ_DEU1550I_031325_12a.avif?assetname=SZ_DEU1550I_031325_12a.jpg",
    900,
  ),
  hotspotCleaning: aem(
    "997b7b3d-a557-4c38-8ade-51e6920462e8",
    "cleaning-drawer.avif?assetname=cleaning-drawer.jpg",
    900,
  ),
  hotspotPerformance: aem(
    "f3ef5fdd-7ad3-4058-abef-ef9564d4f327",
    "SUB_TableTop_Ice_062425_Close3_001.avif?assetname=SUB_TableTop_Ice_062425_Close3_001.jpg",
    900,
  ),
  galleryOne: aem(
    "7f9928d7-8666-4c23-b4bf-9f10552467fc",
    "SZ_DEU155OI_Boho_Outdoor_Kitchen_5345.avif?assetname=SZ_DEU155OI_Boho_Outdoor_Kitchen_5345.jpg",
    1280,
  ),
  galleryTwo: aem(
    "deeafd53-9c51-4973-adc7-874aedbf7fff",
    "SZWC_IR_Hype_56242_Foreground_R_RGB.avif?assetname=SZWC_IR_Hype_56242_Foreground_R_RGB.jpg",
    1280,
  ),
  galleryThree: aem(
    "5f070c54-8b17-4fe2-9d61-2d101bf22575",
    "COV_DEU1550I_ClayKitchen_Overall.avif?assetname=COV_DEU1550I_ClayKitchen_Overall.jpg",
    1280,
  ),
  showroom: "/assets/subzero/discover/SZG_Miami_Showroom_51876.avif",
  bar: aem(
    "5488f716-14a4-4750-ae3b-c651be4d0b32",
    "SZ_Elemental_TCS_091323_14.avif?assetname=SZ_Elemental_TCS_091323_14.tif",
    1440,
  ),
  entertaining: aem(
    "ab3b753d-7f07-45d0-89bf-6e578bb28803",
    "LG_SLG_LIVINGRM_DEU_2.avif?assetname=LG_SLG_LIVINGRM_DEU_2.tif",
    1440,
  ),
  product: aem(
    "22dedbba-0e49-4360-88e7-34582c824d91",
    "21-SUBZERO_DEU-UNDERCOUNTER-PRODUCT_2_CAMEO-A_(F02).avif?assetname=21-SUBZERO_DEU-UNDERCOUNTER-PRODUCT_2_CAMEO-A_%28F02%29.png",
    1440,
  ),
  kitchen: aem(
    "29f35cec-ee46-4248-999d-04a7112aeb02",
    "Minimal_European_Kitchen_Mid_06_2.avif?assetname=Minimal_European_Kitchen_Mid_06_2.jpg",
    1440,
  ),
  outdoor: aem(
    "8087b6ca-7f7d-451c-8196-e766d449ec06",
    "SM_OG30_WWD30_TCS_020316_1.avif?assetname=SM_OG30_WWD30_TCS_020316_1.jpg",
    1200,
  ),
  overview: aem(
    "45bd0bf4-1368-4015-931d-34c45d46e1e4",
    "SZWC_PA_0342_4021FC_A_GraCol2006.avif?assetname=SZWC_PA_0342_4021FC_A_GraCol2006.jpg",
    900,
  ),
  beverage: aem("fc3a3c26-5add-4d29-8f6b-8e9f0e335c59", "image.avif?assetname=image.png", 900),
  wine: aem(
    "c47bb99b-a487-49a0-bdea-b1f24e7f9542",
    "DEC3050W_L-CUSTOM_SH.avif?assetname=DEC3050W_L-CUSTOM_SH.png",
    900,
  ),
  undercounter: "/assets/subzero/discover/discover-sub-zero-006b.avif",
  completeBeverage: aem(
    "f01e7ee0-d7d9-4a6d-9353-738bc25cfd6b",
    "Minimal_European_Kitchen_SocialMedia_01.avif?assetname=Minimal_European_Kitchen_SocialMedia_01.tif",
    1440,
  ),
  completeWine: aem(
    "9ecce1c5-771a-4613-8239-149a29ff69d2",
    "SM_SLG_070221_10.avif?assetname=SM_SLG_070221_10.png",
    1440,
  ),
  completeRefrigeration: aem(
    "35b9b83e-b7d6-4cf7-bf01-6ca05932d8a8",
    "SM_SLG_063021_10.avif?assetname=SM_SLG_063021_10.jpg",
    1440,
  ),
  completeDrawers: aem(
    "dd8863f5-6592-4269-9130-08c734f03bef",
    "SM_ID-24R_TCS_020516_4.avif?assetname=SM_ID-24R_TCS_020516_4.png",
    1440,
  ),
};

const featureRows = [
  {
    title: "Cheers to the freshest ice",
    copy: "Crafted with Sub-Zero's legendary quality and rigorously tested for decades of reliable performance, the new Designer Undercounter Ice Maker brings refreshing ice to any space in your home, indoors or out.",
    video: assets.cheersVideo,
    poster: assets.hero,
    alt: "Ice being poured into a cocktail shaker.",
  },
  {
    title: "Ultra-quiet production",
    copy: "No one wants to listen to a noisy ice maker. Ours is hardly noticeable and engineered to run more quietly.",
    video: assets.ultraQuietVideo,
    poster: assets.entertaining,
    alt: "Lounge with undercounter refrigeration for entertaining.",
    reverse: true,
  },
  {
    title: "Ready when you need it",
    copy: "Designed for gatherings large and small, it keeps a generous supply of clear ice close at hand.",
    video: assets.readyVideo,
    poster: assets.product,
    alt: "Sub-Zero designer undercounter product detail.",
  },
];

function StickyShowroomCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const intro = document.querySelector<HTMLElement>("[data-ice-maker-intro]");
      if (!intro) return;

      setVisible(window.scrollY >= intro.offsetTop - 12);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <Link
      href="/showroom"
      className={`fixed bottom-6 left-1/2 z-[90] hidden min-h-[38px] -translate-x-1/2 items-center justify-center rounded-full bg-[#74716a] px-5 text-[0.82rem] font-bold text-white shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition duration-300 hover:bg-[#56534e] md:inline-flex ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      Visit a showroom
    </Link>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const syncVideoState = () => {
    const video = videoRef.current;
    if (!video) return;

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    setIsPaused(video.paused);
    setProgress(duration ? video.currentTime / duration : 0);
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().then(syncVideoState).catch(syncVideoState);
      return;
    }

    video.pause();
    syncVideoState();
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#080808] text-white">
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center"
        poster={assets.hero}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Sub-Zero Designer Undercounter Ice Maker displayed on blocks of ice."
        onLoadedMetadata={syncVideoState}
        onTimeUpdate={syncVideoState}
        onPlay={syncVideoState}
        onPause={syncVideoState}
      >
        <source src={assets.heroVideo} type="video/mp4" />
      </video>
      <button
        type="button"
        aria-label={isPaused ? "Play" : "Pause"}
        aria-pressed={!isPaused}
        onClick={toggleVideo}
        className="absolute bottom-7 right-7 z-30 grid h-[60px] w-[60px] place-items-center rounded-full text-white outline-none transition focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg className="h-[60px] w-[60px]" viewBox="0 0 60 60" fill="none" aria-hidden="true">
          <circle cx="30" cy="30" r={radius} stroke="rgba(255,255,255,0.45)" strokeWidth="3" />
          <circle
            cx="30"
            cy="30"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
              transform: "rotate(-90deg)",
              transformOrigin: "30px 30px",
            }}
          />
          <circle cx="30" cy="30" r="20" fill="rgba(0,0,0,0.72)" />
          {isPaused ? (
            <path d="M25 20L40 30L25 40V20Z" fill="currentColor" />
          ) : (
            <>
              <rect x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
              <rect x="33" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
            </>
          )}
        </svg>
        <span className="sr-only">Video</span>
      </button>
    </section>
  );
}

function Intro() {
  return (
    <section
      data-ice-maker-intro
      className="bg-[#f4f2ec] px-6 pb-24 pt-14 text-[#171715] md:px-12 md:pb-32 md:pt-16"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em]">Sub-Zero</p>
        <h2 className="mt-3 max-w-[1120px] font-serif text-[clamp(3rem,6.2vw,5rem)] leading-[0.95] lg:whitespace-nowrap">
          Designer Undercounter Ice Maker
        </h2>
        <p className="mt-6 max-w-[800px] text-[1rem] leading-snug md:text-[1.08rem]">
          The future of ice making is here. Created for luxury homes where quiet, convenience, and
          performance matter, and guided by Sub-Zero&apos;s legacy of quality and innovation,
          it&apos;s a complete reinvention-purpose-built for discerning homeowners and unlike
          anything else on the market.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fice-maker"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171715] px-8 text-sm font-bold text-white transition hover:bg-[#34322e]"
          >
            View product
          </Link>
          <Link
            href="/showroom"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#171715] px-8 text-sm font-bold transition hover:bg-[#171715] hover:text-white"
          >
            Experience in a showroom
          </Link>
        </div>
        <div className="mt-16 flex flex-col items-center text-[#0081c6]" aria-hidden="true">
          <span className="h-40 w-px bg-[#0081c6]" />
          <SubZeroSnowflakeIcon className="mt-6 h-6 w-7" />
        </div>
      </div>
    </section>
  );
}

function SubZeroSnowflakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M25.3118 10.9216H20.5082L23.3528 6.00573H17.677L20.0788 1.85336L18.2003 0.768383L15.7985 4.92076L12.9539 0.00488281L10.1093 4.92076L7.70747 0.768383L5.82895 1.85336L8.23077 6.00573H2.55497L5.39958 10.9216H0.595947V13.0916H5.39958L2.55497 17.994H8.23077L5.82895 22.1464L7.70747 23.2314L10.1093 19.079L12.9539 23.9949L15.7985 19.079L18.2003 23.2314L20.0788 22.1464L17.677 17.994H23.3528L20.5082 13.0916H25.3118V10.9216ZM9.49206 15.8241H6.33883L7.90874 13.1049H11.062L9.49206 15.8241ZM7.92215 10.9216L6.35225 8.20247H9.49206L11.062 10.9216H7.92215ZM12.9539 19.6282L11.384 16.9091L12.9539 14.1899L14.5238 16.9091L12.9539 19.6282ZM12.9539 9.83663L11.384 7.1175L12.9539 4.39836L14.5238 7.1175L12.9539 9.83663ZM16.4023 15.8241L14.8324 13.1049H17.9856L19.5555 15.8241H16.4023ZM17.9856 10.9216H14.8324L16.4023 8.20247H19.5555L17.9856 10.9216Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HotspotFeature() {
  const hotspots = [
    {
      label: "Easy Care",
      value: "Simple cleaning system",
      description: "Easily accessible and effortless to use, so your ice is always at its freshest.",
      image: assets.hotspotCleaning,
      imageAlt: "Sub-Zero ice maker cleaning drawer.",
      top: "39%",
      left: "12%",
    },
    {
      label: "Convenience",
      value: "User-friendly features",
      description:
        "The specially designed scoop picks up more cubes in one motion, while intuitive controls are placed right where you need them.",
      image: assets.hotspotConvenience,
      imageAlt: "Sub-Zero ice maker scoop and blue cabinetry.",
      top: "13%",
      left: "58%",
    },
    {
      label: "Performance",
      value: "MaxQuiet™ technology",
      description:
        "Advanced design and engineering means operation in near silence-ideal for homes where tranquility matters.",
      image: assets.hotspotPerformance,
      imageAlt: "Clear ice cubes on a dark surface.",
      top: "65%",
      left: "58%",
    },
  ];

  return (
    <section className="bg-[#f4f2ec] px-0 pb-14 text-[#171715] md:pb-20">
      <div className="relative mx-auto max-w-[1920px]">
        <div className="relative flex min-h-[620px] items-center justify-center overflow-hidden bg-[#f4f2ec]">
          <Image
            src={assets.hotspot}
            alt="Blue bar cabinetry with Sub-Zero Designer Undercounter Ice Maker."
            width={1920}
            height={937}
            sizes="100vw"
            className="h-auto w-full"
          />
          {hotspots.map((spot) => (
            <div
              key={spot.label}
              className="group absolute z-20 hidden w-[330px] rounded-[3px] border border-white/35 bg-[#171715]/90 p-3 text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition-colors duration-300 hover:z-40 hover:border-[#8f8a7f] md:block"
              style={{ top: spot.top, left: spot.left }}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#c7c0b6]">
                    {spot.label}
                  </p>
                  <p className="mt-1 font-serif text-[1.45rem] leading-[1.02]">{spot.value}</p>
                </div>
                <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/70 text-xl leading-none">
                  <span className="transition group-hover:opacity-0">+</span>
                  <span className="absolute opacity-0 transition group-hover:opacity-100">-</span>
                </span>
              </div>
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-[310px] group-hover:opacity-100">
                <p className="mt-4 max-w-[300px] text-[1rem] leading-[1.12] text-[#bbb5ad]">
                  {spot.description}
                </p>
                <div className="relative mt-4 aspect-[1.58] overflow-hidden bg-[#0c0c0b]">
                  <Image
                    src={spot.image}
                    alt={spot.imageAlt}
                    fill
                    sizes="306px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaPlayButton() {
  return (
    <span className="absolute bottom-4 right-4 grid h-[46px] w-[46px] place-items-center rounded-full border-[3px] border-white/90 bg-black/45 text-white shadow-[0_4px_12px_rgba(0,0,0,0.28)]">
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="6" y="4.5" width="2.4" height="11" rx="1.2" fill="currentColor" />
        <rect x="11.6" y="4.5" width="2.4" height="11" rx="1.2" fill="currentColor" />
      </svg>
    </span>
  );
}

function FeatureRows() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-24 pt-8 text-[#171715] md:px-12 md:pb-36">
      <div className="mx-auto grid max-w-[1440px] gap-24 lg:gap-32">
        {featureRows.map((row) => (
          <article
            key={row.title}
            className={`grid items-center gap-10 lg:grid-cols-[minmax(0,820px)_minmax(360px,1fr)] lg:gap-16 xl:gap-20 ${
              row.reverse
                ? "lg:grid-cols-[minmax(360px,1fr)_minmax(0,820px)] lg:[&>div:first-child]:order-2"
                : ""
            }`}
          >
            <div className="relative aspect-[1.32] overflow-hidden bg-[#d8d2c8]">
              <video
                className="h-full w-full object-cover"
                poster={row.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={row.alt}
              >
                <source src={row.video} type="video/mp4" />
              </video>
              <MediaPlayButton />
            </div>
            <div>
              <h3 className="max-w-[520px] font-serif text-[2.5rem] leading-[1.1]">
                {row.title}
              </h3>
              <p className="mt-7 max-w-[520px] text-[1.05rem] leading-[1.34]">{row.copy}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#171715] px-8 text-[0.95rem] font-bold text-white"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M5 3.5v9l7-4.5-7-4.5Z" />
                  </svg>
                  Play video
                </Link>
                <Link
                  href="/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fice-maker"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#171715] px-8 text-[0.95rem] font-bold transition hover:bg-[#171715] hover:text-white"
                >
                  View product
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DesignInspiration() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-20 text-[#171715] md:px-12 md:pb-36">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="max-w-[760px] font-serif text-[3.75rem] leading-[1.1]">
          <span className="block">A welcome addition to any</span>
          <span className="block">indoor or outdoor space</span>
        </h2>
        <div className="mt-16 grid gap-4 md:h-[612px] md:grid-cols-[1.92fr_1fr]">
          <div className="relative aspect-[1.5] overflow-hidden bg-[#d8d2c8] md:aspect-auto md:h-full">
            <Image src={assets.galleryOne} alt="Outdoor kitchen with Sub-Zero ice maker." fill sizes="(min-width: 1024px) 920px, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[0.75] overflow-hidden bg-[#d8d2c8] md:aspect-auto md:h-full">
            <Image src={assets.galleryTwo} alt="Indoor entertaining bar with Designer Undercounter Ice Maker." fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="relative mt-4 aspect-[1.78] min-h-[560px] overflow-hidden bg-[#d8d2c8]">
          <Image src={assets.galleryThree} alt="Luxury bar area with Sub-Zero Designer Undercounter Ice Maker." fill sizes="(min-width: 1024px) 1392px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

function CompleteKitchen() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const drag = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: trackRef.current.scrollLeft,
    };
    trackRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !trackRef.current) return;
    const delta = event.clientX - drag.current.startX;
    drag.current.moved = Math.abs(delta) > 4;
    trackRef.current.scrollLeft = drag.current.scrollLeft - delta;
  };

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: trackRef.current.scrollLeft,
    };
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!drag.current.active || !trackRef.current) return;
    const delta = event.clientX - drag.current.startX;
    drag.current.moved = Math.abs(delta) > 4;
    trackRef.current.scrollLeft = drag.current.scrollLeft - delta;
  };

  const stopDrag = () => {
    drag.current.active = false;
  };

  const updateCurrentSlide = () => {
    const track = trackRef.current;
    if (!track) return;
    setCurrentSlide(track.scrollLeft > (track.scrollWidth - track.clientWidth) / 2 ? 2 : 1);
  };

  const scrollToSlide = (slide: 1 | 2) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: slide === 1 ? 0 : track.scrollWidth - track.clientWidth,
      behavior: "smooth",
    });
    setCurrentSlide(slide);
  };

  return (
    <section className="overflow-hidden bg-[#f4f2ec] px-6 pb-20 pt-16 text-[#171715] md:px-12 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="mb-7 font-serif text-[clamp(3.1rem,3.125vw,3.75rem)] leading-[1.1]">
          Complete your kitchen
        </h2>
        <div
          ref={trackRef}
          className="cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing md:w-[calc(100%+24px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onDragStart={(event) => event.preventDefault()}
          onMouseDown={handleMouseDown}
          onMouseLeave={stopDrag}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onPointerDown={handlePointerDown}
          onPointerLeave={stopDrag}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrag}
          onScroll={updateCurrentSlide}
        >
          <div className="flex gap-2">
            {[
            {
              title: "Beverage Center",
              href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fbeverage-centers",
              image: assets.completeBeverage,
            },
            { title: "Wine Storage", href: "/refrigeration/wine-storage", image: assets.completeWine },
            {
              title: "Refrigeration",
              href: "/refrigeration/discover-sub-zero",
              image: assets.completeRefrigeration,
            },
            {
              title: "Drawers",
              href: "/refrigeration/view-all-refrigeration?default.categories=refrigeration%2Fdesigner-drawers",
              image: assets.completeDrawers,
            },
          ].map((item) => (
            <Link
                key={item.title}
                href={item.href}
                draggable={false}
                onClick={(event) => {
                  if (drag.current.moved) event.preventDefault();
                }}
                className="group relative h-[520px] flex-[0_0_86%] overflow-hidden bg-[#d8d2c8] md:h-[612px] md:flex-[0_0_calc((100%_-_40px)/3)]"
              >
              <Image
                src={item.image}
                alt={item.title}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 464px, 86vw"
                className="select-none object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <h3 className="absolute bottom-7 left-7 font-serif text-[clamp(2.2rem,2.25vw,2.5rem)] leading-none text-white">
                {item.title}
              </h3>
            </Link>
            ))}
          </div>
        </div>
        <div className="mt-16 flex items-center justify-end gap-5">
          <span className="font-serif text-[1.15rem] leading-none text-[#171715]">{currentSlide} / 2</span>
          <button
            type="button"
            aria-label="Previous slide"
            disabled={currentSlide === 1}
            onClick={() => scrollToSlide(1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#171715]/25 text-[0px] text-[#171715] transition hover:border-[#171715] disabled:border-[#d8d2c8] disabled:text-[#d8d2c8]"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M10 12.6667 5.333 8 10 3.333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={currentSlide === 2}
            onClick={() => scrollToSlide(2)}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#171715] text-[0px] text-[#171715] transition hover:bg-[#171715] hover:text-white disabled:border-[#d8d2c8] disabled:text-[#d8d2c8] disabled:hover:bg-transparent"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M6 3.333 10.667 8 6 12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export function DesignerIceMakerPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <StickyShowroomCta />
      <Hero />
      <Intro />
      <HotspotFeature />
      <FeatureRows />
      <DesignInspiration />
      <CompleteKitchen />
    </main>
  );
}
