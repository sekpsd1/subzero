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
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    let previous = window.scrollY;

    function handleScroll() {
      const latest = window.scrollY;
      setGlass(latest > 20);
      setHidden(latest > previous && latest > 120);
      previous = latest;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        onMouseEnter={() => setGlass(true)}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] h-[68px] text-[#FBF9F5] transition duration-500 md:h-[78px]",
          hidden && !menuOpen ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
          glass || menuOpen
            ? "bg-black/[0.58] shadow-[0_18px_40px_rgba(0,0,0,0.20)] backdrop-blur-[14px]"
            : "bg-transparent shadow-none backdrop-blur-0",
        )}
      >
        <nav className="relative flex h-full items-center justify-between px-3.5 md:px-6">
          <div className="relative z-10 flex min-w-0 items-center gap-3 md:min-w-[260px] md:gap-[22px]">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="group flex h-[46px] w-[46px] flex-col items-center justify-center gap-1 rounded-full border border-[#FBF9F5] bg-transparent text-white transition hover:shadow-[inset_0_0_0_1px_#FBF9F5] md:h-[50px] md:w-[50px]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={cn(
                  "h-px w-[18px] bg-white transition",
                  menuOpen ? "translate-y-[5px] rotate-45" : "group-hover:w-6",
                )}
              />
              <span
                className={cn(
                  "h-px w-[18px] bg-white transition",
                  menuOpen ? "opacity-0" : "group-hover:w-6",
                )}
              />
              <span
                className={cn(
                  "h-px w-[18px] bg-white transition",
                  menuOpen ? "-translate-y-[5px] -rotate-45" : "group-hover:w-6",
                )}
              />
            </button>
            <Link
              href="/showroom/appointment"
              className="hidden whitespace-nowrap text-[15px] font-semibold leading-none text-white hover:underline hover:underline-offset-4 md:inline"
            >
              Visit a showroom
            </Link>
          </div>
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 text-center"
            aria-label="Home"
          >
            <BrandMarks />
          </Link>
          <div className="relative z-10 flex min-w-0 items-center justify-end gap-3 md:min-w-[260px] md:gap-[26px]">
            <Link
              href="/showroom/dealers"
              aria-label="Locations and dealers"
              className="hidden transition hover:-translate-y-px hover:text-white sm:inline-flex"
            >
              <MapPin size={21} strokeWidth={1.45} />
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FBF9F5] bg-transparent text-white transition hover:-translate-y-px hover:shadow-[inset_0_0_0_1px_#FBF9F5] md:h-[50px] md:w-[50px]"
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

function BrandMarks() {
  return (
    <span className="flex items-center justify-center gap-[5px] md:gap-2" aria-label="Wolf Sub-Zero">
      <Image
        src="/assets/subzero/white-logo-wolf-2.png"
        alt="Wolf"
        width={82}
        height={24}
        priority
        className="h-auto w-[62px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:w-[88px]"
      />
      <Image
        src="/assets/subzero/white-logo-sub-zero.png"
        alt="Sub-Zero"
        width={128}
        height={24}
        priority
        className="h-auto w-[92px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:w-[134px]"
      />
    </span>
  );
}
