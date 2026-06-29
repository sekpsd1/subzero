"use client";

import { ChevronRight, MapPin, Store, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { imageLibrary, mainNavigation, type NavItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

const primaryMenuCount = 3;

const secondaryMenuItems: NavItem[] = [
  { title: "Inspiration", href: "/inspiration" },
  {
    title: "The Living Kitchen",
    href: "/journal",
    children: [
      { title: "All Stories", href: "/journal" },
      { title: "Design", href: "/journal/design" },
      { title: "Innovation", href: "/journal/innovation" },
      { title: "Food", href: "/journal/food" },
      { title: "Lifestyle", href: "/journal/lifestyle" },
      { title: "Places", href: "/journal/places" },
    ],
  },
  {
    title: "Our Story",
    href: "/our-story",
    children: [
      { title: "Discover Our Story", href: "/our-story" },
      { title: "About Sub-Zero Group", href: "/about" },
      { title: "History and Milestones", href: "/our-story/history-milestones" },
      { title: "Sustainability", href: "/our-story/sustainability" },
      { title: "Foundation", href: "/our-story/foundation" },
    ],
  },
  { title: "Owners", href: "/support" },
  {
    title: "Professionals",
    href: "/trade",
    children: [
      { title: "Trade Resources", href: "/trade" },
      { title: "Product Specification Library", href: "/trade/specification-library" },
      { title: "Reveal Cabinet Specs", href: "/trade/reveal" },
      { title: "Brochure Maker", href: "/trade/brochure" },
      { title: "Installation Videos", href: "/trade/installation-videos" },
      { title: "New and Future Products", href: "/trade/future-products" },
      { title: "Continuing Education (CEUs)", href: "/trade/continuing-education" },
      { title: "Kitchen Design Contest", href: "/trade/kitchen-design-contest" },
    ],
  },
];

const menuVisualImages: Record<string, string> = {
  Refrigeration: imageLibrary.refrigeration,
  "Discover Sub-Zero": imageLibrary.refrigeration,
  "Classic Series": imageLibrary.kitchenDark,
  "Designer Series": imageLibrary.showroom,
  "PRO Series": imageLibrary.refrigeration,
  "Wine Storage": imageLibrary.wine,
  Undercounter: "/assets/subzero/dice-unveil-cut-wr.avif",
  Cooking: imageLibrary.cooking,
  "Discover Wolf": imageLibrary.cooking,
  Ranges: imageLibrary.cooking,
  "Built-in Ovens": imageLibrary.kitchenDark,
  "Cooktops & Rangetops": imageLibrary.cooking,
  Outdoor: imageLibrary.outdoor,
  "Discover Outdoor": imageLibrary.outdoor,
  Owners: imageLibrary.kitchenDark,
  Professionals: imageLibrary.showroom,
  "Our Story": imageLibrary.kitchenDark,
};

const cardVisualImages = [
  imageLibrary.cooking,
  "/assets/subzero/home-hero.avif",
  imageLibrary.kitchenDark,
  imageLibrary.outdoor,
];

function getBrandMark(item: NavItem) {
  if (item.title === "Refrigeration") {
    return {
      src: "/assets/subzero/white-logo-sub-zero.png",
      alt: "Sub-Zero",
      className: "w-[126px]",
      width: 156,
    };
  }

  if (item.title === "Cooking") {
    return {
      src: "/assets/subzero/white-logo-wolf-2.png",
      alt: "Wolf",
      className: "w-[104px]",
      width: 112,
    };
  }

  return null;
}

function splitChildren(item: NavItem) {
  const children = item.children ?? [];
  const featured = children.filter((child) => child.featured);
  const secondary = children.filter((child) => !child.featured);
  const isSecondaryPanel = secondaryMenuItems.some((secondaryItem) => secondaryItem.title === item.title);

  if (isSecondaryPanel && !featured.length) {
    return {
      featured: secondary.slice(0, 1),
      secondary: secondary.slice(1),
    };
  }

  return {
    featured: featured.length ? featured : secondary.slice(0, 4),
    secondary: featured.length ? secondary : secondary.slice(4),
  };
}

function getMenuVisual(item?: NavItem | null, fallback?: NavItem | null) {
  const title = item?.title ?? fallback?.title ?? "";

  return {
    title: title || "Sub-Zero Wolf SEA",
    href: item?.href ?? fallback?.href ?? "/",
    image: menuVisualImages[title] ?? menuVisualImages[fallback?.title ?? ""] ?? imageLibrary.kitchenDark,
  };
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const [activeItem, setActiveItem] = useState<NavItem | null>(null);
  const [activeChild, setActiveChild] = useState<NavItem | undefined>();
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);

  if (!open) {
    return null;
  }

  const primaryItems = mainNavigation.slice(0, primaryMenuCount);
  const highlightedItem = hoveredItem ?? activeItem;
  const activeGroups = activeItem ? splitChildren(activeItem) : null;
  const activeBrand = activeItem ? getBrandMark(activeItem) : null;
  const activeChildHasMenu = Boolean(activeChild?.children?.length);
  const activeIsPrimary = activeItem ? primaryItems.some((item) => item.title === activeItem.title) : false;

  function activateItem(item: NavItem) {
    setActiveItem(item);
    setHoveredItem(item);
    setActiveChild(undefined);
  }

  return (
    <div className="fixed inset-0 z-[120] hidden overflow-hidden font-sans text-[#FBF9F5] lg:flex">
      <aside className="relative z-30 flex h-screen w-[364px] shrink-0 flex-col overflow-hidden border-r border-white/16 bg-[rgba(29,28,26,0.86)] px-5 pb-0 pt-[17px] shadow-[18px_0_50px_rgba(0,0,0,0.24)] backdrop-blur-[16px]">
        <div className="flex items-center gap-[22px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#FBF9F5] bg-transparent text-white transition hover:bg-white/8 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            aria-label="Close menu"
          >
            <X size={26} strokeWidth={1.15} />
          </button>
          <span className="text-[15px] leading-none text-white">Close</span>
        </div>

        <nav className="mt-[47px] flex flex-col items-start">
          {primaryItems.map((item) => (
            <MenuButton
              key={item.title}
              item={item}
              active={highlightedItem?.title === item.title}
              onHover={() => setHoveredItem(item)}
              onActivate={() => activateItem(item)}
            />
          ))}
        </nav>

        <nav className="mt-auto flex flex-col items-start gap-[17px] pb-[112px]">
          {secondaryMenuItems.map((item) =>
            item.children?.length ? (
              <MenuButton
                key={item.title}
                item={item}
                active={highlightedItem?.title === item.title}
                compact
                onHover={() => setHoveredItem(item)}
                onActivate={() => activateItem(item)}
              />
            ) : (
              <Link
                key={item.title}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item)}
                onFocus={() => setHoveredItem(item)}
                onClick={onClose}
                className={cn(
                  "max-w-[280px] py-0 text-[15px] leading-[1.15] transition focus:outline-none focus-visible:text-white",
                  highlightedItem?.title === item.title ? "text-white" : "text-white/78 hover:text-white",
                )}
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 border-t border-white/16 bg-[rgba(18,17,16,0.42)] px-5 py-[25px]">
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
        <section className="relative z-20 flex h-screen w-[368px] shrink-0 flex-col overflow-y-auto border-r border-white/18 bg-[rgba(29,28,26,0.84)] px-6 pb-8 pt-[31px] shadow-[18px_0_50px_rgba(0,0,0,0.18)] backdrop-blur-[16px]">
          {activeBrand ? (
            <Image
              src={activeBrand.src}
              alt={activeBrand.alt}
              width={activeBrand.width}
              height={32}
              className={cn("mb-[23px] h-auto", activeBrand.className)}
            />
          ) : (
            <h2 className="mb-[22px] font-serif text-[28px] leading-tight text-white">
              {activeItem.title}
            </h2>
          )}

          <div className="flex flex-col">
            {activeGroups?.featured.map((child) => (
              <PanelLink
                key={child.title}
                item={child}
                active={activeChild?.title === child.title}
                featured
                onActivate={() => setActiveChild(child)}
                onClose={onClose}
              />
            ))}
          </div>

          {activeGroups?.secondary.length ? (
            <div className="mt-6 border-t border-white/22 pt-5">
              <div className="flex flex-col">
                {activeGroups.secondary.map((child) => (
                  <PanelLink
                    key={child.title}
                    item={child}
                    active={activeChild?.title === child.title}
                    onActivate={() => setActiveChild(child)}
                    onClose={onClose}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {activeIsPrimary ? (
            <Link
              href={activeItem.href}
              onClick={onClose}
              className="mt-auto inline-flex h-9 min-w-[166px] items-center justify-center self-start rounded-full border border-white px-[18px] text-xs font-semibold text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              View all {activeItem.title.toLowerCase()}
            </Link>
          ) : null}
        </section>
      ) : null}

      {activeItem && activeChild ? (
        <MenuVisualPanel
          item={activeChild}
          fallback={activeItem}
          showCards={activeChildHasMenu}
          onClose={onClose}
        />
      ) : (
        <section className="relative h-screen min-w-0 flex-1 overflow-hidden bg-[rgba(44,38,31,0.12)] backdrop-blur-[12px]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,25,22,0.03)_0%,rgba(28,25,22,0.08)_48%,rgba(28,25,22,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,235,0.10)_0%,rgba(66,56,45,0.04)_58%,rgba(18,15,12,0.18)_100%)]" />
        </section>
      )}
    </div>
  );
}

function MenuVisualPanel({
  item,
  fallback,
  showCards,
  onClose,
}: {
  item: NavItem;
  fallback: NavItem;
  showCards: boolean;
  onClose: () => void;
}) {
  const visual = getMenuVisual(item, fallback);
  const cards = showCards ? item.children ?? [] : [];

  if (showCards && cards.length) {
    return (
      <section className="relative h-screen min-w-0 flex-1 overflow-y-auto bg-[#151412] px-6 py-[88px]">
        <div
          key={item.title}
          className="flex flex-col gap-6 animate-[menuVisualFade_520ms_ease_both]"
        >
          {cards.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              onClick={onClose}
              className="group relative block h-[315px] overflow-hidden bg-[#24211e] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              <Image
                src={menuVisualImages[card.title] ?? cardVisualImages[index % cardVisualImages.length]}
                alt={card.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.12)_52%,rgba(0,0,0,0.72)_100%)]" />
              <h3 className="absolute bottom-6 left-7 font-serif text-[40px] leading-none text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                {index === 0 ? `Explore the ${fallback.title === "Cooking" ? "Wolf " : ""}${item.title.replace(/s$/, "")}` : card.title}
              </h3>
            </Link>
          ))}
        </div>
        <style jsx global>{`
          @keyframes menuVisualFade {
            from {
              opacity: 0;
              transform: scale(1.012);
              filter: blur(8px);
            }
            to {
              opacity: 1;
              transform: scale(1);
              filter: blur(0);
            }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="relative h-screen min-w-0 flex-1 overflow-hidden bg-[#151412]">
      <Link
        key={visual.title}
        href={visual.href}
        onClick={onClose}
        className="group absolute inset-0 block animate-[menuVisualFade_560ms_ease_both] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
      >
        <Image
          src={visual.image}
          alt={visual.title}
          fill
          priority={false}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.05)_46%,rgba(0,0,0,0.58)_100%)]" />
        <h3 className="absolute bottom-7 left-8 font-serif text-[42px] leading-none text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
          {visual.title}
        </h3>
      </Link>
      <style jsx global>{`
        @keyframes menuVisualFade {
          from {
            opacity: 0;
            transform: scale(1.012);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}

function MenuButton({
  item,
  active,
  compact,
  onHover,
  onActivate,
}: {
  item: NavItem;
  active: boolean;
  compact?: boolean;
  onHover: () => void;
  onActivate: () => void;
}) {
  const hasChildren = Boolean(item.children?.length);

  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onActivate}
      className={cn(
        "group relative flex items-center text-left transition focus:outline-none focus-visible:text-white",
        compact
          ? "w-fit max-w-[280px] justify-start gap-2.5 py-0 text-[15px] leading-[1.15]"
          : "w-full justify-between gap-4 py-[3px] font-serif text-[40px] leading-[1.44]",
        active
          ? "text-white"
          : compact
            ? "text-white/78 hover:text-white"
            : "text-white/58 hover:text-white",
      )}
    >
      <span>{item.title}</span>
      {hasChildren ? (
        <ChevronRight
          size={compact ? 14 : 28}
          strokeWidth={1.25}
          className={cn(
            "shrink-0 transition",
            active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
          )}
          aria-hidden="true"
        />
      ) : null}
    </button>
  );
}

function PanelLink({
  item,
  active,
  featured,
  onActivate,
  onClose,
}: {
  item: NavItem;
  active: boolean;
  featured?: boolean;
  onActivate: () => void;
  onClose: () => void;
}) {
  const hasChildren = Boolean(item.children?.length);

  return (
    <Link
      href={item.href}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={(event) => {
        if (hasChildren) {
          event.preventDefault();
          onActivate();
          return;
        }

        onClose();
      }}
      className={cn(
        "group flex w-fit max-w-full items-center gap-5 transition focus:outline-none focus-visible:text-white",
        featured
          ? "py-[4px] font-serif text-[25px] leading-[1.42]"
          : "py-[6px] text-[17px] leading-[1.45]",
        active ? "text-white" : featured ? "text-white/60 hover:text-white" : "text-white/56 hover:text-white",
      )}
    >
      <span>{item.title}</span>
      {hasChildren ? (
        <ChevronRight
          size={featured ? 24 : 17}
          strokeWidth={1.25}
          className={cn(
            "shrink-0 transition",
            active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
          )}
          aria-hidden="true"
        />
      ) : null}
    </Link>
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
      className="group inline-flex w-fit items-center gap-3 text-[15px] leading-none text-white/86 transition hover:text-white focus:outline-none focus-visible:text-white"
    >
      <span className="inline-flex h-[15px] w-[15px] shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="group-hover:underline group-hover:underline-offset-4">{label}</span>
    </Link>
  );
}
