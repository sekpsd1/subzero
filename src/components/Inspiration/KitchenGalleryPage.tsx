"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  kitchenProjects as projects,
  type KitchenGalleryProject,
} from "@/data/kitchen-gallery";

type FilterKey = "style" | "roomSize" | "layout" | "products" | "color" | "roomType";
type Selection = Record<FilterKey, string[]>;

const resultsPerPage = 20;

const filterGroups: { key: FilterKey; label: string; values: string[] }[] = [
  { key: "style", label: "Style", values: ["Contemporary", "Traditional", "Transitional", "Modern"] },
  { key: "roomSize", label: "Room Size", values: ["Small", "Medium", "Large"] },
  { key: "layout", label: "Layout", values: ["U-shape", "Other", "Single wall"] },
  {
    key: "products",
    label: "Products",
    values: [
      "Full-size refrigeration",
      "Built-in ovens",
      "Icemaker",
      "Cooktops and rangetops",
      "Undercounter refrigeration",
      "Ranges",
      "Outdoor grills",
      "Microwaves",
      "Warming drawers",
      "Module cooktops",
      "Ventilation",
      "Coffee system",
      "Wine storage",
    ],
  },
  {
    key: "color",
    label: "Color",
    values: ["White", "Wood Tones", "Brown", "Black", "Grey", "Beige", "Green", "Blue", "Pink"],
  },
  { key: "roomType", label: "Room Type", values: ["Kitchen", "Outdoor", "Bathroom"] },
];

const emptySelection: Selection = {
  style: [],
  roomSize: [],
  layout: [],
  products: [],
  color: [],
  roomType: [],
};

export function KitchenGalleryPage() {
  const [selection, setSelection] = useState<Selection>(emptySelection);
  const [page, setPage] = useState(0);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    function applyHashState() {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const requestedCount = Number(params.get("numberOfResults") ?? resultsPerPage);
      const firstResult = Number(params.get("first") ?? 0);

      if (requestedCount >= projects.length) {
        setViewAll(true);
        setPage(0);
        return;
      }

      setViewAll(false);
      setPage(Math.max(0, Math.floor(firstResult / resultsPerPage)));
    }

    applyHashState();
    window.addEventListener("hashchange", applyHashState);
    return () => window.removeEventListener("hashchange", applyHashState);
  }, []);

  const visibleProjects = useMemo(
    () =>
      projects.filter((project) =>
        filterGroups.every(({ key }) => {
          const chosen = selection[key];
          if (!chosen.length) return true;
          return chosen.some((value) => project[key].includes(value));
        }),
      ),
    [selection],
  );

  const pageCount = Math.max(1, Math.ceil(visibleProjects.length / resultsPerPage));
  const safePage = Math.min(page, pageCount - 1);
  const displayedProjects = viewAll
    ? visibleProjects
    : visibleProjects.slice(safePage * resultsPerPage, (safePage + 1) * resultsPerPage);
  const resultStart = visibleProjects.length ? (viewAll ? 1 : safePage * resultsPerPage + 1) : 0;
  const resultEnd = viewAll
    ? visibleProjects.length
    : Math.min((safePage + 1) * resultsPerPage, visibleProjects.length);
  const activeFilterCount = Object.values(selection).reduce(
    (total, values) => total + values.length,
    0,
  );

  function syncHash(nextPage: number, nextViewAll: boolean) {
    const hash = nextViewAll
      ? "#numberOfResults=100"
      : nextPage
        ? `#first=${nextPage * resultsPerPage}&numberOfResults=${resultsPerPage}`
        : `#numberOfResults=${resultsPerPage}`;

    window.history.pushState(null, "", hash);
  }

  function selectPage(nextPage: number) {
    setPage(nextPage);
    setViewAll(false);
    syncHash(nextPage, false);
    document.getElementById("kitchen-gallery-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function showAll() {
    setPage(0);
    setViewAll(true);
    syncHash(0, true);
  }

  function resetPaging() {
    setPage(0);
    setViewAll(false);
    syncHash(0, false);
  }

  function toggleFilter(key: FilterKey, value: string) {
    setSelection((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
    resetPaging();
  }

  function clearFilters() {
    setSelection(emptySelection);
    resetPaging();
  }

  const filters = <FilterList selection={selection} onToggle={toggleFilter} />;

  return (
    <main className="bg-white text-[#202020]">
      <div className="mx-auto max-w-[1200px] px-5 pb-5 pt-5 text-[13px] text-[#555] md:px-8 md:text-[14px]">
        <Link href="/" className="underline underline-offset-2">Home</Link>
        <span className="mx-2">›</span>
        <span>Kitchen Design Gallery</span>
      </div>

      <section className="mx-auto max-w-[1200px] px-5 pb-16 pt-9 text-center md:px-8 md:pb-12 md:pt-12">
        <h1 className="font-serif text-[38px] font-normal leading-none md:text-[54px]">Inspiration Gallery</h1>
        <div className="mx-auto mt-7 h-px w-[150px] bg-[#d7d7d7] md:mt-[37px]" />
        <p className="mt-6 text-[19px] font-light tracking-[0.01em] text-[#555] md:mt-[33px] md:text-[22px]">
          Stunning, inspiring, and award-winning.
        </p>
        <p className="mx-auto mt-7 max-w-[1070px] text-[14px] leading-[1.45] text-[#555] md:text-[16px] md:leading-5">
          Gain inspiration from hundreds of beautiful, functional kitchens. All are winners of the prestigious Kitchen Design Contest (KDC) and represent the best of the best in the industry. And of course, all feature Sub-Zero, Wolf, and Cove appliances: the luxury standard in refrigeration, cooking, and dishwashing.
        </p>
      </section>

      <section id="kitchen-gallery-results" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-24 md:px-8 md:pb-32">
        <details className="mb-7 border-y border-[#d8d8d8] py-4 lg:hidden">
          <summary className="cursor-pointer list-none text-[15px] font-medium">
            Filters{activeFilterCount ? ` (${activeFilterCount})` : ""}
          </summary>
          <div className="pt-4">{filters}</div>
        </details>

        <div className="grid items-start gap-8 lg:grid-cols-[258px_minmax(0,1fr)] lg:gap-[30px]">
          <aside className="hidden lg:block">{filters}</aside>

          <div>
            <div className="mb-5 flex flex-col gap-3 border-b border-[#d8d8d8] pb-3 text-[13px] text-[#555] sm:flex-row sm:items-center sm:justify-between">
              <span aria-live="polite">
                Results {resultStart}-{resultEnd} of {visibleProjects.length}
              </span>
              <GalleryPagination
                page={safePage}
                pageCount={pageCount}
                totalItems={visibleProjects.length}
                viewAll={viewAll}
                onPageChange={selectPage}
                onViewAll={showAll}
              />
            </div>

            {activeFilterCount ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mb-4 text-[12px] underline underline-offset-4"
              >
                Clear filters
              </button>
            ) : null}

            {displayedProjects.length ? (
              <div className="grid grid-cols-1 gap-x-[30px] gap-y-[30px] sm:grid-cols-2 md:grid-cols-3">
                {displayedProjects.map((project) => (
                  <GalleryCard key={project.href} project={project} />
                ))}
              </div>
            ) : (
              <div className="border border-[#d6d6d6] px-6 py-20 text-center">
                <p className="font-serif text-2xl">No kitchens match these filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 text-sm underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            )}

            {visibleProjects.length ? (
              <div className="mt-9 flex justify-end">
                <GalleryPagination
                  page={safePage}
                  pageCount={pageCount}
                  totalItems={visibleProjects.length}
                  viewAll={viewAll}
                  onPageChange={selectPage}
                  onViewAll={showAll}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function GalleryCard({ project }: { project: KitchenGalleryProject }) {
  return (
    <article className="border border-[#d6d6d6] bg-white p-4 pb-0">
      <Link href={`https://www.subzero-wolf.com${project.href}`} className="group block">
        <div className="relative aspect-[1.5/1] overflow-hidden bg-[#eee]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 263px, (min-width: 640px) 31vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.025]"
          />
        </div>
        <h2 className="flex min-h-[49px] items-center justify-center px-2 py-3 text-center text-[14px] font-medium leading-[1.25] group-hover:underline">
          {project.title}
        </h2>
      </Link>
    </article>
  );
}

function GalleryPagination({
  page,
  pageCount,
  totalItems,
  viewAll,
  onPageChange,
  onViewAll,
}: {
  page: number;
  pageCount: number;
  totalItems: number;
  viewAll: boolean;
  onPageChange: (page: number) => void;
  onViewAll: () => void;
}) {
  return (
    <nav className="flex items-center gap-3 text-[14px]" aria-label="Gallery pagination">
      {Array.from({ length: pageCount }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onPageChange(index)}
          aria-label={`Page ${index + 1}`}
          aria-current={!viewAll && page === index ? "page" : undefined}
          className={
            !viewAll && page === index
              ? "flex h-5 w-5 items-center justify-center border border-[#5ba6cf] text-[#2478a8]"
              : "flex h-5 w-5 items-center justify-center"
          }
        >
          {index + 1}
        </button>
      ))}
      {!viewAll && page < pageCount - 1 ? (
        <button type="button" onClick={() => onPageChange(page + 1)} aria-label="Next page">
          &gt;
        </button>
      ) : null}
      <button
        type="button"
        onClick={onViewAll}
        aria-pressed={viewAll}
        className={
          viewAll
            ? "border border-[#5ba6cf] px-1.5 py-0.5 text-[#2478a8]"
            : "border border-[#999] px-1.5 py-0.5"
        }
      >
        VIEW ALL {totalItems}
      </button>
    </nav>
  );
}

function FilterList({
  selection,
  onToggle,
}: {
  selection: Selection;
  onToggle: (key: FilterKey, value: string) => void;
}) {
  return (
    <div className="grid gap-0 sm:grid-cols-2 sm:gap-x-8 lg:block">
      {filterGroups.map((group) => (
        <fieldset key={group.key} className="border-t border-[#d8d8d8] pb-4 pt-4 first:pt-3">
          <legend className="float-left w-full pb-3 text-[20px] font-normal leading-8">{group.label}</legend>
          <div className="clear-both flex flex-wrap gap-x-3 gap-y-3">
            {group.values.map((value) => (
              <label key={value} className="flex cursor-pointer items-start gap-2 text-[15px] leading-5 text-[#4b4b4b]">
                <input
                  type="checkbox"
                  checked={selection[group.key].includes(value)}
                  onChange={() => onToggle(group.key, value)}
                  className="mt-px h-[14px] w-[14px] appearance-none border border-[#cfcfcf] bg-white checked:border-[#222] checked:bg-[#222] checked:shadow-[inset_0_0_0_3px_white]"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
