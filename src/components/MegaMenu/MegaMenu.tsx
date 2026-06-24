"use client";

import { MapPin, Store, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { imageLibrary, mainNavigation, type NavItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

const previewImages: Record<string, string> = {
  Refrigeration: imageLibrary.refrigeration,
  Cooking: imageLibrary.cooking,
  Outdoor: imageLibrary.outdoor,
  Owners: imageLibrary.kitchenDark,
  Professionals: imageLibrary.showroom,
  "Journal & Culinary": imageLibrary.wine,
  "Regional Experience": imageLibrary.showroom,
  "Our Story": imageLibrary.kitchenDark,
};

const utilityItems: NavItem[] = [
  {
    title: "Showroom Appointment",
    href: "/showroom/appointment",
    description: "It all starts in our showrooms.",
  },
  {
    title: "Dealers",
    href: "/showroom/dealers",
    description: "Authorized dealers by country.",
  },
];

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const [activeItem, setActiveItem] = useState<NavItem | null>(null);
  const [activeChild, setActiveChild] = useState<NavItem | undefined>();

  const previewImage = useMemo(() => {
    return activeItem ? previewImages[activeItem.title] ?? imageLibrary.kitchenDark : imageLibrary.kitchenDark;
  }, [activeItem]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] hidden overflow-hidden bg-transparent font-sans text-[#FBF9F5] lg:flex">
      <aside className="relative h-screen w-[370px] shrink-0 overflow-hidden border-r border-[#FBF9F5]/20 bg-[rgba(18,18,18,0.82)] px-6 pb-0 pt-6 backdrop-blur-[18px]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#FBF9F5] text-white transition hover:shadow-[inset_0_0_0_1px_#FBF9F5]"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={1.45} />
          </button>
          <span className="text-xs uppercase tracking-[0.5em] text-stone-300">
            Close
          </span>
        </div>

        <nav className="mt-[60px] space-y-0">
          {mainNavigation.slice(0, 3).map((item) => (
            <MenuButton
              key={item.title}
              item={item}
              active={activeItem?.title === item.title}
              onActivate={() => {
                setActiveItem(item);
                setActiveChild(item.children?.[0]);
              }}
            />
          ))}
        </nav>

        <nav className="absolute inset-x-6 bottom-[122px] flex flex-col items-start gap-[17px] border-t border-white/15 pt-8">
          {mainNavigation.slice(3).map((item) => (
            <MenuButton
              key={item.title}
              item={item}
              active={activeItem?.title === item.title}
              compact
              onActivate={() => {
                setActiveItem(item);
                setActiveChild(item.children?.[0]);
              }}
            />
          ))}
        </nav>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 border-t border-[#FBF9F5]/20 px-6 py-6">
          <UtilityLink
            href="/showroom/appointment"
            icon={<Store size={15} strokeWidth={1.45} />}
            label="Visit a showroom"
            onClick={onClose}
          />
          <UtilityLink
            href="/showroom/dealers"
            icon={<MapPin size={15} strokeWidth={1.45} />}
            label="Locations"
            onClick={onClose}
          />
        </div>
      </aside>

      {activeItem ? (
        <>
          <section className="relative flex h-screen w-[360px] shrink-0 flex-col overflow-hidden border-r border-[#FBF9F5]/20 bg-[rgba(18,18,18,0.74)] px-6 pb-6 pt-7 backdrop-blur-[18px]">
        <div>
          {activeItem.title === "Refrigeration" ? (
            <Image
              src="/assets/subzero/white-logo-sub-zero.png"
              alt="Sub-Zero"
              width={156}
              height={32}
              className="mb-[25px] h-auto w-[126px]"
            />
          ) : activeItem.title === "Cooking" || activeItem.title === "Outdoor" ? (
            <Image
              src="/assets/subzero/white-logo-wolf-2.png"
              alt="Wolf"
              width={112}
              height={32}
              className="mb-[26px] h-auto w-[104px]"
            />
          ) : (
            <h2 className="mb-[26px] font-serif text-[28px] leading-tight text-white">
              {activeItem.title}
            </h2>
          )}
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-col">
            {(activeItem.children ?? utilityItems).map((child) => {
              const hasChildMenu = Boolean(child.children?.length);

              return (
                <Link
                  key={child.title}
                  href={child.href}
                  onMouseEnter={() => setActiveChild(child)}
                  onFocus={() => setActiveChild(child)}
                  onClick={(event) => {
                    if (hasChildMenu) {
                      event.preventDefault();
                      setActiveChild(child);
                      return;
                    }

                    onClose();
                  }}
                  className={cn(
                    "group relative w-fit font-serif text-[26px] leading-[1.55] transition",
                    hasChildMenu ? "inline-flex items-center gap-6" : "block",
                    activeChild?.title === child.title
                      ? "text-white"
                      : "text-[#FBF9F5]/55 hover:text-white",
                  )}
                >
                  <span>{child.title}</span>
                  {hasChildMenu ? (
                    <span
                      className={cn(
                        "text-[30px] leading-none transition",
                        activeChild?.title === child.title
                          ? "translate-x-0 opacity-100"
                          : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100",
                      )}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>

          <Link
            href={activeItem.href}
            onClick={onClose}
            className="mt-auto inline-flex h-9 min-w-[166px] items-center justify-center self-start rounded-full border border-[#FBF9F5]/95 px-[18px] text-xs uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
          >
            View all {activeItem.title}
          </Link>
        </div>
      </section>

          <section className="relative h-screen min-w-0 flex-1 overflow-hidden bg-[rgba(18,18,18,0.58)] backdrop-blur-[18px]">
            {activeChild?.children?.length ? (
              <div className="relative z-10 flex h-full w-[360px] flex-col border-r border-[#FBF9F5]/20 bg-[rgba(18,18,18,0.62)] px-6 pb-6 pt-7 backdrop-blur-[18px]">
                <h3 className="mb-[26px] font-serif text-[28px] leading-tight text-white">
                  {activeChild.title}
                </h3>
                <div className="flex flex-col">
                  {activeChild.children.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={onClose}
                      className="font-serif text-[26px] leading-[1.55] text-[#FBF9F5]/55 transition hover:text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div
                  key={`${activeItem.title}-${activeChild?.title}`}
                  className="absolute inset-0 scale-105 bg-cover bg-center opacity-100 brightness-95 transition-[opacity,transform,filter] duration-700"
                  style={{ backgroundImage: `url(${previewImage})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.30)_42%,rgba(0,0,0,0.08)_100%)]" />
                <div className="absolute bottom-8 left-8 max-w-xl">
                  <p className="text-xs uppercase tracking-[0.4em] text-stone-300">
                    {activeItem.title}
                  </p>
                  <h2 className="mt-5 font-serif text-[42px] leading-[1.1] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                    {activeChild?.title ?? activeItem.title}
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-7 text-stone-200">
                    {activeChild?.description ??
                      "Explore the product world, specifications, inspiration, and regional next steps."}
                  </p>
                </div>
              </>
            )}
      </section>
        </>
      ) : (
        <section className="relative h-screen min-w-0 flex-1 overflow-hidden bg-black">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center opacity-75 blur-md brightness-75"
            style={{ backgroundImage: `url(${previewImage})` }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </section>
      )}
    </div>
  );
}

function MenuButton({
  item,
  active,
  compact,
  onActivate,
}: {
  item: NavItem;
  active: boolean;
  compact?: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onClick={onActivate}
      className={cn(
        "group relative w-full text-left transition",
        compact
          ? "w-fit pr-[18px] text-sm leading-[1.2]"
          : "font-serif text-[40px] leading-[1.28]",
        active
          ? "text-white"
          : compact
            ? "text-[#FBF9F5]/75 hover:text-white"
            : "text-[#FBF9F5]/50 hover:text-white",
      )}
    >
      <span>{item.title}</span>
      <span
        className={cn(
          "absolute text-white transition",
          compact
            ? "right-0 top-1/2 -translate-y-1/2 text-lg"
            : "right-1.5 top-[-1px] text-[32px]",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
        aria-hidden="true"
      >
        ›
      </span>
    </button>
  );
}

function UtilityLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group inline-flex w-fit items-center gap-3 text-[15px] leading-none text-[#FBF9F5]/85 transition hover:text-white"
    >
      <span className="inline-flex h-[15px] w-[15px] shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="group-hover:underline group-hover:underline-offset-4">{label}</span>
    </Link>
  );
}
