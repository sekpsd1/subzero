"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const heroVideo =
  "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:559a0d25-9f74-4313-8083-97380940c028/renditions/original/as/Wolf%20-%20Cooktop%20%26%20Rangetops.mp4#t=0.001";
const heroPoster =
  "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:5f4186ae-0d91-4db3-ac46-c9175d6ac670/as/25-SUBZERO_CI36560TS_INDUCTION-COOKTOP.avif?assetname=25-SUBZERO_CI36560TS_INDUCTION-COOKTOP.jpg";

export function WolfCooktopsHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const syncVideoState = () => {
      const video = videoRef.current;
      if (video) {
        setPaused(video.paused);
        setProgress(video.duration ? video.currentTime / video.duration : 0);
      }
      frame = window.requestAnimationFrame(syncVideoState);
    };

    frame = window.requestAnimationFrame(syncVideoState);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setPaused(true));
    } else {
      video.pause();
    }
  }

  return (
    <section className="relative h-[70svh] min-h-[500px] overflow-hidden bg-[#272421] md:h-[100svh] md:min-h-[680px]">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroPoster}
        className="h-full w-full object-cover object-center"
        aria-label="Wolf cooktop in a professionally designed kitchen"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/10" />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={paused ? "Play cooktops and rangetops video" : "Pause cooktops and rangetops video"}
        aria-pressed={!paused}
        className="group absolute bottom-8 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full text-stone-50 outline-none transition focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 md:bottom-10 md:right-10 md:h-12 md:w-12"
      >
        <VideoProgressRing progress={progress} />
        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 transition group-hover:bg-white group-hover:text-black">
          {paused ? <Play size={17} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
        </span>
      </button>
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
      <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(251,249,245,0.34)" strokeWidth="2" />
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
