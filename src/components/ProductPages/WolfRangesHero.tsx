"use client";

import { Pause, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function WolfRangesHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showShowroomCta, setShowShowroomCta] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const video = videoRef.current;
      if (video?.duration) setProgress(video.currentTime / video.duration);
      frame = window.requestAnimationFrame(updateProgress);
    };

    frame = window.requestAnimationFrame(updateProgress);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowShowroomCta(!entry.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <>
      <section ref={heroRef} className="relative h-[70svh] min-h-[560px] overflow-hidden bg-[#d6d1c5] md:h-[100svh] md:min-h-[680px]">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover object-center" aria-label="Wolf range animation">
          <source src="/assets/subzero/wolf-ranges-animation.mp4" type="video/mp4" />
        </video>
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={paused ? "Play Wolf range animation" : "Pause Wolf range animation"}
          className="group absolute bottom-8 right-6 flex h-11 w-11 items-center justify-center rounded-full text-stone-50 transition md:bottom-10 md:right-10 md:h-12 md:w-12"
        >
          <VideoProgressRing progress={progress} />
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 transition group-hover:bg-white group-hover:text-black">
            {paused ? <Play size={17} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
          </span>
        </button>
      </section>
      <Link
        href="/showroom"
        aria-hidden={!showShowroomCta}
        tabIndex={showShowroomCta ? 0 : -1}
        className={`fixed bottom-6 left-1/2 z-40 inline-flex min-h-10 -translate-x-1/2 items-center rounded-full bg-[#77746e] px-5 text-sm font-bold text-white shadow-sm transition duration-300 before:absolute before:bottom-full before:left-1/2 before:h-5 before:w-px before:-translate-x-1/2 before:bg-white/90 hover:bg-[#5f5c57] ${showShowroomCta ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        Visit a showroom
      </Link>
    </>
  );
}

function VideoProgressRing({ progress }: { progress: number }) {
  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]" aria-hidden="true">
      <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(251,249,245,0.34)" strokeWidth="2" />
      <circle cx="24" cy="24" r={radius} fill="none" stroke="#FBF9F5" strokeWidth="2.4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} />
    </svg>
  );
}
