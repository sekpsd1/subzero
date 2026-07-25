"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyShowroomButton({
  triggerId,
  tone = "dark",
}: {
  triggerId: string;
  tone?: "dark" | "gray";
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    const updateVisibility = () => {
      setIsVisible(window.scrollY >= trigger.offsetTop);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [triggerId]);

  return (
    <div
      className={`fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition duration-300 md:bottom-6 ${isVisible ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"}`}
      aria-hidden={!isVisible}
    >
      <Link
        href="/showroom/appointment"
        className={`inline-flex min-h-11 whitespace-nowrap items-center justify-center rounded-full px-6 text-[13px] font-bold text-white shadow-[0_3px_12px_rgba(0,0,0,0.2)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 ${
          tone === "gray" ? "bg-[#77746e] hover:bg-[#5f5c57]" : "bg-[#171715] hover:bg-[#393834]"
        }`}
        tabIndex={isVisible ? 0 : -1}
      >
        Visit a showroom
      </Link>
    </div>
  );
}
