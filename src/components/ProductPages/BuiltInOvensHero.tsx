"use client";

import { useRef, useState } from "react";

export function BuiltInOvensHero({ videoSrc, poster }: { videoSrc: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  function syncVideoState() {
    const video = videoRef.current;
    if (!video) return;

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    setIsPaused(video.paused);
    setProgress(duration ? video.currentTime / duration : 0);
  }

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setIsPaused(true));
    } else {
      video.pause();
    }
  }

  return (
    <section className="relative h-screen h-[100svh] min-h-[390px] w-full overflow-hidden bg-[#262522]" aria-label="Wolf built-in ovens in a luxury kitchen">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        aria-label="Wolf built-in ovens animation"
        onLoadedMetadata={syncVideoState}
        onTimeUpdate={syncVideoState}
        onPlay={syncVideoState}
        onPause={syncVideoState}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="dynamic-media-video-button-wrapper flow absolute bottom-5 right-5 z-30 md:bottom-7 md:right-7">
        <button
          type="button"
          className="dynamic-media-video-button icon grid h-[60px] w-[60px] place-items-center rounded-full text-white outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
          aria-label={isPaused ? "Play" : "Pause"}
          aria-pressed={!isPaused}
          onClick={toggleVideo}
        >
          <VideoProgressButton isPaused={isPaused} progress={progress} />
          <span className="sr-only">Video</span>
        </button>
      </div>
    </section>
  );
}

function VideoProgressButton({ isPaused, progress }: { isPaused: boolean; progress: number }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg className="dynamic-media-progress-svg h-[60px] w-[60px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle className="dynamic-media-progress-bg" cx="30" cy="30" r={radius} stroke="rgba(255,255,255,0.48)" strokeWidth="3" fill="none" />
      <circle
        className="dynamic-media-progress-bar"
        cx="30"
        cy="30"
        r={radius}
        stroke="rgba(255,255,255,0.98)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset, transform: "rotate(-90deg)", transformOrigin: "30px 30px" }}
      />
      <circle className="dynamic-media-circle" cx="30" cy="30" r="20" fill="rgba(20,20,18,0.7)" fillOpacity="0.8" />
      {isPaused ? (
        <path d="M25 20L40 30L25 40V20Z" fill="currentColor" />
      ) : (
        <g className="dynamic-media-button-pause-play-icon">
          <rect className="dynamic-media-button-bar dynamic-media-button-bar-left" x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
          <rect className="dynamic-media-button-bar dynamic-media-button-bar-center" x="24" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
          <rect className="dynamic-media-button-bar dynamic-media-button-bar-right" x="33" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
        </g>
      )}
      <circle className="dynamic-media-focus-ring" cx="30" cy="30" r="18" fill="none" stroke="transparent" strokeWidth="2" />
    </svg>
  );
}
