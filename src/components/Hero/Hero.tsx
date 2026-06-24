"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const homeHeroVideo = "/assets/subzero/home-hero.mp4";
const homeHeroPoster = "/assets/subzero/home-hero.avif";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    function updateProgress() {
      const video = videoRef.current;

      if (video?.duration) {
        setProgress(video.currentTime / video.duration);
      }

      frameId = window.requestAnimationFrame(updateProgress);
    }

    frameId = window.requestAnimationFrame(updateProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  }

  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-black">
      <video
        ref={videoRef}
        aria-label="Sub-Zero Wolf cinematic kitchen hero"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={homeHeroPoster}
      >
        <source src={homeHeroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.08)_34%,rgba(0,0,0,0.20)_68%,rgba(0,0,0,0.58)_100%)]" />
      <div className="relative z-10 flex h-full items-end justify-start px-5 pb-5 text-left md:px-6 md:pb-6">
        <h1 className="font-serif text-[38px] leading-none text-[#FBF9F5] drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] md:text-[42px]">
          Welcome
        </h1>
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={isPaused ? "Play hero video" : "Pause hero video"}
          className="group absolute bottom-8 right-6 flex h-11 w-11 items-center justify-center rounded-full text-stone-50 transition md:bottom-10 md:right-10 md:h-12 md:w-12"
        >
          <VideoProgressRing progress={progress} />
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 transition group-hover:bg-white group-hover:text-black">
            {isPaused ? <Play size={17} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
          </span>
        </button>
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
        stroke="rgba(251,249,245,0.34)"
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
