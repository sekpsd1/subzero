"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Sub-Zero and Wolf bring a level of craftsmanship, control, and permanence that makes a luxury kitchen feel truly considered.",
    name: "Mick De Giulio",
    role: "Designer",
    projectImage:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:7cccb0d1-50be-4bb8-aeb5-2c06622da415/as/de-Giulio_Lake-Geneva,-WI_02.avif?assetname=de+Giulio_Lake+Geneva%2C+WI_02.jpg",
    projectType: "image",
    portraitImage:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:0b8956c9-7bbf-49a4-94b3-78d4f2adeadf/as/Mick-Headshot_1x1.avif?assetname=Mick-Headshot_1x1.jpg",
  },
  {
    quote:
      "Great flavor starts with quality ingredients and precise control. Sub-Zero refrigeration keeps produce fresh and proteins perfect, while Wolf gives you the power to sear, simmer, and build layers of taste with ease. It's not about gadgets - it's about cooking without compromise.",
    name: "Joel Chesebro",
    role: "Corporate Executive Chef",
    projectImage: "/assets/subzero/testimonial-joel.mp4",
    projectType: "video",
    portraitImage:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:f66cfdb8-f8a3-4b84-836a-130a544d8cd6/as/Chef_Joel_665.avif?assetname=Chef_Joel_665.jpg",
  },
];

export function TrustedByBest() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const active = testimonials[activeIndex];

  useEffect(() => {
    let frameId = 0;

    function updateProgress() {
      const video = videoRef.current;

      if (video?.duration) {
        setVideoProgress(video.currentTime / video.duration);
      }

      frameId = window.requestAnimationFrame(updateProgress);
    }

    frameId = window.requestAnimationFrame(updateProgress);

    return () => window.cancelAnimationFrame(frameId);
  }, [activeIndex]);

  function goToPrevious() {
    setIsVideoPaused(false);
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  }

  function goToNext() {
    setIsVideoPaused(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }

  return (
    <section className="bg-[#f4f2ec] px-5 pb-20 pt-14 text-[#171715] md:px-8 md:pb-24 md:pt-16">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="font-serif text-[44px] font-normal leading-none md:text-[58px] lg:text-[62px]">
          Trusted by the best
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_350px]">
          <div className="relative aspect-[1.34] min-h-[420px] overflow-hidden bg-[#ddd9ce]">
            {active.projectType === "video" ? (
              <>
                <video
                  ref={videoRef}
                  key={active.projectImage}
                  className="absolute inset-0 h-full w-full object-cover"
                  muted
                  playsInline
                  loop
                  autoPlay={!isVideoPaused}
                  aria-label={`${active.name} testimonial video`}
                >
                  <source src={active.projectImage} type="video/mp4" />
                </video>
                <button
                  type="button"
                  onClick={() => {
                    const video = videoRef.current;
                    if (!video) return;

                    if (video.paused) {
                      void video.play().catch(() => undefined);
                      setIsVideoPaused(false);
                    } else {
                      video.pause();
                      setIsVideoPaused(true);
                    }
                  }}
                  aria-label={isVideoPaused ? "Play testimonial video" : "Pause testimonial video"}
                  aria-pressed={!isVideoPaused}
                  className="absolute bottom-4 right-4 flex h-[60px] w-[60px] items-center justify-center text-white drop-shadow-[0_8px_22px_rgba(0,0,0,0.36)] transition hover:scale-105"
                >
                  <TestimonialVideoButton paused={isVideoPaused} progress={videoProgress} />
                </button>
              </>
            ) : (
              <Image
                key={active.projectImage}
                src={active.projectImage}
                alt={`${active.name} project kitchen`}
                fill
                sizes="(min-width: 1280px) 1034px, (min-width: 1024px) calc(100vw - 430px), 100vw"
                className="object-cover"
                priority={false}
              />
            )}
          </div>

          <aside className="flex min-h-[610px] flex-col lg:min-h-0">
            <div className="relative aspect-[1.02] w-full overflow-hidden bg-[#d9d6cc]">
              <Image
                key={active.portraitImage}
                src={active.portraitImage}
                alt={active.name}
                fill
                sizes="350px"
                className="object-cover grayscale"
              />
            </div>

            <div
              key={activeIndex}
              className="animate-[testimonialCopyUp_560ms_cubic-bezier(0.22,1,0.36,1)_both]"
            >
              <blockquote className="mt-7 font-serif text-[25px] leading-[1.12] tracking-[-0.01em]">
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              <p className="mt-7 text-base text-[#4d4a43]">
                {active.name}, {active.role}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-end gap-3 pt-12">
              <span className="mr-2 text-base text-[#4d4a43]">
                {activeIndex + 1} / {testimonials.length}
              </span>
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#171715] text-[#171715] transition hover:bg-[#171715] hover:text-white"
              >
                <ChevronLeft size={18} strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#171715] text-[#171715] transition hover:bg-[#171715] hover:text-white"
              >
                <ChevronRight size={18} strokeWidth={1.4} />
              </button>
            </div>
          </aside>
        </div>
      </div>
      <style jsx global>{`
        @keyframes testimonialCopyUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}

function TestimonialVideoButton({
  paused,
  progress,
}: {
  paused: boolean;
  progress: number;
}) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg
      className="h-[60px] w-[60px]"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="30"
        cy="30"
        r={radius}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx="30"
        cy="30"
        r={radius}
        stroke="#ffffff"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        className="-rotate-90 origin-center transition-[stroke-dashoffset]"
      />
      <circle cx="30" cy="30" r="20" fill="rgba(40,40,36,0.72)" />
      {paused ? (
        <path d="M25 20.5L39 30L25 39.5V20.5Z" fill="currentColor" />
      ) : (
        <g>
          <rect x="24" y="20" width="3.4" height="20" fill="currentColor" rx="1.7" />
          <rect x="33" y="20" width="3.4" height="20" fill="currentColor" rx="1.7" />
        </g>
      )}
      <circle cx="30" cy="30" r="18" fill="none" stroke="rgba(255,255,255,0.62)" strokeWidth="1.5" />
    </svg>
  );
}
