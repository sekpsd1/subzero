"use client";

import { Search, X } from "lucide-react";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110] bg-black/80 px-6 pt-28 text-[#FBF9F5] backdrop-blur-2xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-8 top-8"
        aria-label="Close search"
      >
        <X />
      </button>
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.35em] text-stone-400">Search</p>
        <div className="mt-8 flex items-center gap-4 border-b border-white/30 pb-5">
          <Search className="text-stone-400" />
          <input
            autoFocus
            placeholder="Search products, showrooms, specifications"
            className="w-full bg-transparent font-serif text-3xl outline-none placeholder:text-stone-600 md:text-5xl"
          />
        </div>
      </div>
    </div>
  );
}
