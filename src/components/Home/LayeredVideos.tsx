"use client";

import { ArrowDown, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type LayeredVideoSlide = {
  title: string;
  description?: string;
  video: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const slides: LayeredVideoSlide[] = [
  {
    title: "Born of innovation",
    description: "Discover the story of the world's most exceptional appliances.",
    video: "/assets/subzero/video-sec5/foresight-innovation.mp4",
    primaryHref: "/our-story",
    primaryLabel: "Play film",
    secondaryHref: "/our-story",
    secondaryLabel: "Read our story",
  },
  {
    title: "Engineered to exacting standards",
    video: "/assets/subzero/video-sec5/foresight-engineering.mp4",
    primaryHref: "/our-story",
    primaryLabel: "Play film",
  },
  {
    title: "Legendary longevity",
    video: "/assets/subzero/video-sec5/longevity.mp4",
    primaryHref: "/our-story",
    primaryLabel: "Play film",
  },
  {
    title: "Impeccable service",
    video: "/assets/subzero/video-sec5/service.mp4",
    primaryHref: "/our-story",
    primaryLabel: "Play film",
    secondaryHref: "/showroom",
    secondaryLabel: "Visit a showroom",
  },
];

export function LayeredVideos() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const slideCount = slides.length;
  const slidePosition = scrollProgress * (slideCount - 1);

  useEffect(() => {
    let frameId = 0;

    function updateProgress() {
      const video = videoRefs.current[activeIndex];

      if (video?.duration) {
        setProgress(video.currentTime / video.duration);
      }

      frameId = window.requestAnimationFrame(updateProgress);
    }

    frameId = window.requestAnimationFrame(updateProgress);

    return () => window.cancelAnimationFrame(frameId);
  }, [activeIndex]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        if (!isPaused) void video.play();
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isPaused]);

  useEffect(() => {
    let frameId = 0;

    function updateScrollPosition() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollRange = Math.max(rect.height - viewportHeight, 1);
      const nextProgress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      const nextIndex = Math.min(
        slideCount - 1,
        Math.max(0, Math.round(nextProgress * (slideCount - 1))),
      );

      setScrollProgress((currentProgress) => {
        if (Math.abs(currentProgress - nextProgress) < 0.001) return currentProgress;
        return nextProgress;
      });
      setActiveIndex(nextIndex);
    }

    function scheduleUpdate() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateScrollPosition);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [slideCount]);

  function getSlideTransform(index: number) {
    const offset = Math.min(Math.max((index - slidePosition) * 110, -110), 110);
    return `translate3d(0, ${offset}%, 0)`;
  }

  function getSlideScale(index: number) {
    const distance = Math.min(Math.abs(index - slidePosition), 1);
    return 1 + distance * 0.15;
  }

  const caretTop = Math.min(scrollProgress * 96, 96);

  function toggleVideo() {
    const video = videoRefs.current[activeIndex];
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  }

  function skipSection() {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-[#fbf9f5]"
      style={{ minHeight: `${slideCount * 100}svh` }}
      aria-labelledby="layered-videos-title"
    >
      <div className="sticky top-0 h-[100svh] min-h-[680px] overflow-hidden">
        {slides.map((slide, index) => (
          <article
            key={slide.video}
            className="absolute inset-0 will-change-transform"
            style={{
              transform: getSlideTransform(index),
              zIndex: index === activeIndex ? 2 : 1,
            }}
            aria-hidden={index !== activeIndex}
          >
            <video
              ref={(element) => {
                videoRefs.current[index] = element;
              }}
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ transform: `scale(${getSlideScale(index)})` }}
              muted
              playsInline
              loop
              preload={index === 0 ? "auto" : "metadata"}
              aria-hidden="true"
            >
              <source src={slide.video} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.54)_23%,rgba(0,0,0,0.14)_58%,rgba(0,0,0,0.26)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.06)_48%,rgba(0,0,0,0.72)_100%)]" />

            <div className="relative z-10 flex h-full items-center px-5 md:px-6">
              <div className="max-w-[620px]">
                <h2
                  id={index === 0 ? "layered-videos-title" : undefined}
                  className="font-serif text-[46px] leading-[1.08] md:text-[64px]"
                >
                  {slide.title}
                </h2>
                {slide.description ? (
                  <p className="mt-5 max-w-[520px] font-serif text-[26px] leading-[1.18] md:text-[33px]">
                    {slide.description}
                  </p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href={slide.primaryHref}
                    tabIndex={index === activeIndex ? undefined : -1}
                    aria-hidden={index === activeIndex ? undefined : true}
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-stone-200"
                  >
                    <Play size={16} fill="currentColor" />
                    {slide.primaryLabel}
                  </Link>
                  {slide.secondaryHref && slide.secondaryLabel ? (
                    <Link
                      href={slide.secondaryHref}
                      tabIndex={index === activeIndex ? undefined : -1}
                      aria-hidden={index === activeIndex ? undefined : true}
                      className="inline-flex h-10 items-center rounded-full border border-white px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                    >
                      {slide.secondaryLabel}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}

        <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 items-start gap-1.5 md:flex">
          <span className="mt-1 rounded-full bg-[#263335]/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur">
            Video {activeIndex + 1} / {slideCount}
          </span>
          <div
            aria-hidden="true"
            className="relative h-[100px] w-5 rounded-full"
          >
            <span className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 rounded-full bg-[#263335]/65" />
            <span
              className="absolute left-1/2 h-6 w-1 -translate-x-1/2 rounded-full bg-white transition-all"
              style={{ top: `${caretTop}%` }}
            />
          </div>
        </div>

        <div className="absolute bottom-8 right-6 z-20 flex items-center gap-4 md:bottom-10 md:right-10">
          <button
            type="button"
            onClick={toggleVideo}
            aria-label={isPaused ? "Play story video" : "Pause story video"}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full text-white"
          >
            <VideoProgressRing progress={progress} />
            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 transition group-hover:bg-white group-hover:text-black">
              {isPaused ? <Play size={17} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
            </span>
          </button>
          <button
            type="button"
            onClick={skipSection}
            aria-label="Skip story videos"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white hover:text-black"
          >
            <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function VideoProgressRing({ progress }: { progress: number }) {
  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg
      viewBox="0 0 48 48"
      className="absolute inset-0 h-full w-full -rotate-90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke="rgba(251,249,245,0.30)"
        strokeWidth="2"
      />
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke="#FBF9F5"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
}
