"use client";

import { ArrowUp, ChevronDown, Globe2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type FooterLink = [label: string, href: string];

type FooterColumn = {
  heading?: string;
  links: FooterLink[];
};

type FooterRow = {
  title: string;
  columns: FooterColumn[];
};

const footerRows: FooterRow[] = [
  {
    title: "Products",
    columns: [
      {
        heading: "Sub-Zero Refrigeration",
        links: [
          ["Discover Sub-Zero", "/products/refrigeration/discover-sub-zero"],
          ["Classic Series", "/products/refrigeration/classic-series"],
          ["Designer Series", "/products/refrigeration/designer-series"],
          ["PRO Series", "/products/refrigeration/pro-series"],
          ["Wine Storage", "/products/refrigeration/wine-storage"],
          ["Undercounter", "/products/refrigeration/undercounter"],
        ],
      },
      {
        heading: "Wolf Cooking",
        links: [
          ["Discover Wolf", "/products/cooking/discover-wolf"],
          ["Ranges", "/products/cooking/ranges"],
          ["Built-In Ovens", "/products/cooking/built-in-ovens"],
          ["Cooktops & Rangetops", "/products/cooking/cooktops-rangetops"],
          ["Ventilation", "/products/cooking/ventilation"],
          ["Coffee Systems", "/products/cooking/coffee-systems"],
        ],
      },
      {
        heading: "Outdoor",
        links: [
          ["Discover Outdoor", "/products/outdoor/discover-outdoor"],
          ["Outdoor Gas Grills", "/products/outdoor/outdoor-gas-grills"],
          ["Outdoor Modules", "/products/outdoor/outdoor-modules"],
          ["Side Burners", "/products/outdoor/side-burners"],
          ["Built-In Burner Modules", "/products/outdoor/built-in-burner-modules"],
        ],
      },
      {
        heading: "More Products",
        links: [
          ["Ice Makers - NEW", "/products/refrigeration/ice-makers"],
          ["Microwaves", "/products/cooking/microwaves"],
          ["Drawers", "/products/cooking/drawers"],
          ["Accessories", "/support/accessories"],
          ["View All Products", "/products"],
        ],
      },
    ],
  },
  {
    title: "Professionals",
    columns: [
      {
        links: [
          ["Specification Library", "/trade/specification-library"],
          ["Brochure", "/trade/brochure"],
          ["A Higher Standard", "/trade/a-higher-standard"],
        ],
      },
      {
        links: [
          ["Design Possibilities", "/trade/design-possibilities"],
          ["Future Products", "/trade/future-products"],
          ["Kitchen Design Contest", "/trade/kitchen-design-contest"],
        ],
      },
    ],
  },
  {
    title: "Owner Support",
    columns: [
      {
        heading: "Resources",
        links: [
          ["Product Information", "/support/product-information"],
          ["Use and Care Videos", "/support/videos"],
          ["Owner Technique Guide", "/support/owner-technique-guide"],
        ],
      },
      {
        heading: "Service",
        links: [
          ["Warranty Information", "/support/warranty"],
          ["Product Support", "/support/product-support"],
          ["Customer Care", "/support/customer-care"],
        ],
      },
      {
        heading: "Shop",
        links: [
          ["Accessories", "/support/accessories"],
          ["Recipes", "/journal/recipes"],
        ],
      },
    ],
  },
  {
    title: "About Us",
    columns: [
      {
        links: [
          ["Our Story", "/our-story"],
          ["Company Milestones", "/our-story/company-milestones"],
          ["Sustainability", "/our-story/sustainability"],
        ],
      },
      {
        links: [
          ["Showroom Appointment", "/showroom/appointment"],
          ["Dealers", "/showroom/dealers"],
          ["Contact", "/contact"],
        ],
      },
    ],
  },
];

const legalLinks = [
  "Notice at Collection",
  "Privacy Policy",
  "Do Not Sell or Share My Personal Information",
  "Terms of Use",
  "Important Recall Information",
  "Cookie Settings",
  "Product Sitemap",
];

export function Footer() {
  const [openRow, setOpenRow] = useState<string | null>(null);

  return (
    <footer className="bg-[#121211] text-[#f8f5ee]">
      <section className="bg-[#77756e] px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-[1176px] gap-10 lg:grid-cols-[1.05fr_1fr_1fr]">
          <h2 className="max-w-[390px] font-serif text-[28px] leading-[1.04]">
            You&rsquo;re one step closer to creating your future kitchen. Let us guide
            you there.
          </h2>

          <div>
            <h3 className="font-serif text-[21px] leading-tight">Why start in a showroom?</h3>
            <p className="mt-2 max-w-[360px] text-sm leading-[1.18]">
              Explore design and innovation side by side with expert guidance to help
              you move forward with clarity.
            </p>
            <Link
              href="/showroom"
              className="mt-6 inline-flex h-12 min-w-[246px] items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-[#11110f] transition hover:bg-[#ece9df]"
            >
              Learn about our showrooms
            </Link>
          </div>

          <div>
            <h3 className="font-serif text-[21px] leading-tight">Plan a personalized visit</h3>
            <p className="mt-2 max-w-[340px] text-sm leading-[1.18]">
              Locate one of our stunning SEA showrooms and request a consultation.
            </p>
            <Link
              href="/showroom/appointment"
              className="mt-6 inline-flex h-12 min-w-[196px] items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-[#11110f] transition hover:bg-[#ece9df]"
            >
              Find your showroom
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#356078] px-5 md:px-8">
        <div className="mx-auto max-w-[1728px]">
          <div className="grid border-b border-white/15 lg:grid-cols-[365px_1fr]">
            <div className="flex min-h-[365px] flex-col justify-between border-white/15 py-11 lg:border-r lg:px-14">
              <div>
                <div className="flex items-center gap-1">
                  <Image
                    src="/assets/subzero/white-logo-wolf-2.png"
                    alt="Wolf"
                    width={58}
                    height={18}
                    className="h-auto w-[58px]"
                  />
                  <Image
                    src="/assets/subzero/white-logo-sub-zero.png"
                    alt="Sub-Zero"
                    width={84}
                    height={18}
                    className="h-auto w-[84px]"
                  />
                </div>
                <p className="mt-2 font-serif text-sm italic">A Higher Standard</p>
              </div>

              <p className="text-sm text-[#c9c5bb]">&copy;2026 Sub-Zero Group, Inc.</p>
            </div>

            <div className="py-11 lg:px-16">
              <div className="space-y-0">
                {footerRows.map((row) => {
                  const isOpen = openRow === row.title;

                  return (
                    <div key={row.title} className="border-b border-white/30">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenRow(isOpen ? null : row.title)}
                        className="flex h-[43px] w-full items-center justify-between text-left text-xs uppercase tracking-[0.27em] text-[#f8f5ee]"
                      >
                        <span>{row.title}</span>
                        <ChevronDown
                          size={17}
                          strokeWidth={1.5}
                          className={isOpen ? "rotate-180 transition-transform" : "transition-transform"}
                        />
                      </button>

                      {isOpen ? (
                        <div className="grid gap-x-14 gap-y-7 pb-8 pt-5 text-sm text-[#d8d4cb] sm:grid-cols-2 xl:grid-cols-4">
                          {row.columns.map((column, columnIndex) => (
                            <div key={`${row.title}-${column.heading ?? columnIndex}`}>
                              {column.heading ? (
                                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                                  {column.heading}
                                </p>
                              ) : null}
                              <div className="grid gap-3">
                                {column.links.map(([label, href]) => (
                                  <Link
                                    key={label}
                                    href={href}
                                    className="leading-tight transition hover:text-white"
                                  >
                                    {label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-14 flex items-center justify-between gap-8">
                <div className="inline-flex items-center gap-7 rounded-full bg-white/[0.04] px-8 py-4 text-white">
                  <span className="text-lg font-bold leading-none">f</span>
                  <YoutubeMark />
                  <InstagramMark />
                  <LinkedinMark />
                </div>

                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  aria-label="Back to top"
                  className="hidden h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] text-white transition hover:bg-white/10 md:flex"
                >
                  <ArrowUp size={19} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-10 py-11 md:grid-cols-2 lg:grid-cols-4 lg:px-14">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em]">Email Sign-Up</h3>
              <p className="mt-5 max-w-[250px] text-sm leading-[1.35]">
                Don&rsquo;t miss out on the latest updates- keep reading to stay in the loop.
              </p>
              <Link href="#" className="mt-4 inline-block text-sm font-semibold">
                Sign up
              </Link>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em]">Customer Care</h3>
              <p className="mt-5 text-sm">Monday-Friday 7am-7pm CT</p>
              <Link href="tel:8002227820" className="mt-4 inline-block text-sm font-semibold">
                800-222-7820
              </Link>
            </div>

            <FooterPromo
              title="Request Brochure"
              body="Get the latest brochure digitally or in print."
              cta="Request brochure"
              image="/assets/subzero/dice-unveil-cut-wr.avif"
            />

            <FooterPromo
              title="Special Offers"
              body="Explore our current promotions and offers."
              cta="View promotions"
              image="/assets/subzero/home-hero.avif"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0d0d0c] px-5 py-9 text-xs text-[#d0ccc2] md:px-8">
        <div className="mx-auto flex max-w-[1728px] flex-wrap items-center justify-between gap-8">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {legalLinks.map((link) => (
              <Link key={link} href={link === "Product Sitemap" ? "/sitemap.xml" : "#"}>
                {link}
              </Link>
            ))}
          </div>

          <Link href="#" className="inline-flex items-center gap-2 text-white underline underline-offset-4">
            <Globe2 size={20} strokeWidth={1.5} />
            International
          </Link>
        </div>
      </section>
    </footer>
  );
}

function InstagramMark() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.7" cy="7.3" r="1.2" fill="currentColor" />
    </svg>
  );
}

function YoutubeMark() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M21.5 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.4.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.4.5 7.4.5s5.6 0 7.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.5-4.8ZM10 15.4V8.6l5.8 3.4L10 15.4Z" />
    </svg>
  );
}

function LinkedinMark() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M5.2 8.8h3.1V19H5.2V8.8Zm1.6-5A1.8 1.8 0 1 1 6.8 7.4a1.8 1.8 0 0 1 0-3.6ZM10.3 8.8h3v1.4h.1a3.3 3.3 0 0 1 3-1.7c3.2 0 3.8 2.1 3.8 4.8V19h-3.1v-5c0-1.2 0-2.8-1.7-2.8s-1.9 1.3-1.9 2.7V19h-3.1V8.8Z" />
    </svg>
  );
}

function FooterPromo({
  title,
  body,
  cta,
  image,
}: {
  title: string;
  body: string;
  cta: string;
  image: string;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.24em]">{title}</h3>
      <div className="mt-5 flex gap-4">
        <div className="relative h-[82px] w-16 shrink-0 overflow-hidden bg-white/10">
          <Image src={image} alt="" fill sizes="64px" className="object-cover" />
        </div>
        <div>
          <p className="max-w-[220px] text-sm leading-[1.25]">{body}</p>
          <Link href="#" className="mt-4 inline-block text-sm font-semibold">
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
