"use client";

import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MegaMenu } from "@/components/MegaMenu/MegaMenu";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";
import { SearchOverlay } from "@/components/SearchOverlay/SearchOverlay";
import { cn } from "@/lib/utils";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [glass, setGlass] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    let previous = window.scrollY;

    function handleScroll() {
      const latest = window.scrollY;
      const pastHero = latest > Math.max(window.innerHeight - 90, 420);

      setSolid(pastHero);
      setGlass(latest > 20 && !pastHero);
      setHidden(latest > previous && latest > 120);
      previous = latest;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const solidHeader = solid && !menuOpen;
  const headerTone = solidHeader ? "text-[#171715]" : "text-[#FBF9F5]";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] h-[68px] overflow-visible transition duration-500 md:h-[78px]",
          headerTone,
          hidden && !menuOpen ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
          solidHeader
            ? "bg-[#f4f2ec] shadow-[0_1px_0_rgba(23,23,21,0.10)]"
            : menuOpen
              ? "bg-black/[0.68] backdrop-blur-[14px]"
              : "bg-transparent",
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-[152px] transition-opacity duration-500",
            "bg-[linear-gradient(180deg,rgba(12,12,12,0.52)_0%,rgba(12,12,12,0.36)_24%,rgba(12,12,12,0.18)_55%,rgba(12,12,12,0.00)_100%)]",
            solidHeader ? "opacity-0" : glass || menuOpen ? "opacity-100" : "opacity-90",
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-px",
            solidHeader ? "bg-[#171715]/10" : "bg-white/20",
          )}
        />
        <nav className="relative z-10 flex h-full items-center justify-between px-3.5 md:px-6">
          <div className="relative z-10 flex min-w-0 items-center gap-3 md:min-w-[260px] md:gap-[22px]">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="group flex h-[46px] w-[46px] flex-col items-center justify-center gap-1 rounded-full border border-current bg-transparent text-current transition hover:shadow-[inset_0_0_0_1px_currentColor] md:h-[50px] md:w-[50px]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={cn(
                  "h-px w-[18px] bg-current transition",
                  menuOpen ? "translate-y-[5px] rotate-45" : "group-hover:w-6",
                )}
              />
              <span
                className={cn(
                  "h-px w-[18px] bg-current transition",
                  menuOpen ? "opacity-0" : "group-hover:w-6",
                )}
              />
              <span
                className={cn(
                  "h-px w-[18px] bg-current transition",
                  menuOpen ? "-translate-y-[5px] -rotate-45" : "group-hover:w-6",
                )}
              />
            </button>
            <Link
              href="/showroom/appointment"
              className="hidden whitespace-nowrap text-[15px] font-semibold leading-none text-current hover:underline hover:underline-offset-4 md:inline"
            >
              Visit a showroom
            </Link>
          </div>
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 text-center"
            aria-label="Home"
          >
            <BrandMarks solid={solidHeader} />
          </Link>
          <div className="relative z-10 flex min-w-0 items-center justify-end gap-3 md:min-w-[260px] md:gap-[26px]">
            <Link
              href="/showroom/dealers"
              aria-label="Locations and dealers"
              className="hidden transition hover:-translate-y-px sm:inline-flex"
            >
              <MapPin size={21} strokeWidth={1.45} />
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-current bg-transparent text-current transition hover:-translate-y-px hover:shadow-[inset_0_0_0_1px_currentColor] md:h-[50px] md:w-[50px]"
            >
              <Search size={21} strokeWidth={1.45} />
            </button>
          </div>
        </nav>
      </header>
      {menuOpen ? <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} /> : null}
      {menuOpen ? <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} /> : null}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function BrandMarks({ solid }: { solid: boolean }) {
  return (
    <span className="flex items-center justify-center gap-[5px] md:gap-2" aria-label="Wolf Sub-Zero">
      <Image
        src={solid ? "/assets/subzero/wolf-logo.svg" : "/assets/subzero/white-logo-wolf-2.png"}
        alt="Wolf"
        width={82}
        height={24}
        priority
        className={cn(
          "h-auto w-[62px] md:w-[88px]",
          solid ? "drop-shadow-none" : "drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]",
        )}
      />
      <Image
        src={solid ? "/assets/subzero/sub-zero-logo.svg" : "/assets/subzero/white-logo-sub-zero.png"}
        alt="Sub-Zero"
        width={128}
        height={24}
        priority
        className={cn(
          "h-auto w-[92px] md:w-[134px]",
          solid ? "drop-shadow-none" : "drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]",
        )}
      />
    </span>
  );
}
