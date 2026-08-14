"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./RevealPageContent.module.css";

export function RevealVideo() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (playing) {
    return (
      <div className={styles.videoFrame}>
        {failed ? (
          <p className={styles.videoError} role="alert">
            The video could not be loaded.{" "}
            <a href="https://www.youtube.com/watch?v=gRCH8FvxnAc">
              Watch it on YouTube
            </a>
            .
          </p>
        ) : (
          <>
            {!loaded && <span className={styles.videoLoading}>Loading video…</span>}
            <iframe
              src="https://www.youtube-nocookie.com/embed/gRCH8FvxnAc?autoplay=1&modestbranding=1&controls=1&rel=0"
              title="Reveal cabinetry specification tool demonstration"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <button
      className={`${styles.videoFrame} ${styles.videoPoster}`}
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play the Reveal cabinetry specification tool demonstration"
    >
      <Image
        src="/assets/reveal/reveal-video.jpg"
        alt="See how simple appliance specification can be"
        fill
        sizes="(max-width: 767px) 100vw, 945px"
      />
      <span className={styles.playButton} aria-hidden="true">
        <span />
      </span>
    </button>
  );
}
