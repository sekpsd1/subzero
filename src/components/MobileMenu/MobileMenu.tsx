"use client";

import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { mainNavigation, type NavItem } from "@/lib/site-data";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [active, setActive] = useState<NavItem | null>(null);
  const items = active?.children ?? mainNavigation;

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[95] bg-[#0F0F0F] text-[#FBF9F5] lg:hidden">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
        <button
          type="button"
          onClick={() => setActive(null)}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="Back"
        >
          {active ? <ChevronLeft size={22} /> : null}
        </button>
        <Link href="/" className="font-serif text-lg uppercase tracking-[0.28em]">
          SZ Wolf SEA
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="Close mobile menu"
        >
          <X size={22} />
        </button>
      </div>
      <div key={active?.title ?? "root"} className="px-6 py-8">
        <p className="mb-8 text-xs uppercase tracking-[0.35em] text-stone-500">
          {active?.title ?? "Menu"}
        </p>
        <div className="space-y-1">
          {items.map((item) =>
            item.children?.length ? (
              <button
                type="button"
                key={item.title}
                onClick={() => setActive(item)}
                className="flex w-full items-center justify-between border-b border-white/10 py-5 text-left font-serif text-2xl"
              >
                {item.title}
                <span>+</span>
              </button>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                onClick={onClose}
                className="block border-b border-white/10 py-5 font-serif text-2xl"
              >
                {item.title}
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
