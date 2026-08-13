/* eslint-disable @next/next/no-img-element */
"use client";

import { Download, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Product } from "@/lib/site-data";
import { referenceNewModels, referenceSubZeroProducts } from "./reference-products";
import styles from "./ProductSpecificationsPage.module.css";

type Brand = "Sub-Zero" | "Wolf" | "Cove";
type SpecificationProduct = {
  brand: Brand;
  category: string;
  href: string;
  image: string;
  model: string;
  name: string;
  price?: string;
};

const usa = "https://www.subzero-wolf.com";
const designGuides = [
  ["Sub-Zero design guide", "/-/media/files/united-states/product-downloads/sub-zero-wolf/design-guides/subzero-design-guide.pdf"],
  ["Wolf design guide", "/-/media/files/united-states/product-downloads/sub-zero-wolf/design-guides/wolf-design-guide.pdf"],
  ["Cove design guide", "/-/media/files/united-states/product-downloads/sub-zero-wolf/design-guides/CV_DG_NWS"],
] as const;
const cadFormats = ["3D Studio Max (3DS)", "2D AutoCad (DWG)", "3D AutoCad (DWG)", "AutoCad (DXF)", "ArchiCad (GSM)", "3D Studio Max (MAX)", "Wavefront 3D (OBJ)", "Revit Files (RFA)", "SketchUp (SKP)"];

const categories: Record<Brand, readonly string[]> = {
  "Sub-Zero": ["Refrigerator/Freezer", "All Refrigerator", "All Freezer", "Wine", "Ice Maker", "Wine/Refrigerator"],
  Wolf: ["Ranges", "Cooktops and Rangetops", "Built-in Ovens", "Microwaves", "Module Cooktops", "Ventilation", "Coffee Systems", "Warming Drawers", "Outdoor Grills", "Vacuum Seal Drawer"],
  Cove: ["Dishwashers"],
};
const subZeroStyles = ["Classic", "Designer", "PRO"] as const;
const subZeroTypeCounts: Record<string, number> = { "Refrigerator/Freezer": 49, "All Refrigerator": 27, "All Freezer": 11, Wine: 9, "Ice Maker": 2, "Wine/Refrigerator": 1 };
const subZeroStyleCounts: Record<string, number> = { Classic: 46, Designer: 22, PRO: 4 };
const allRefrigeratorModels = new Set(["CL3650R/O", "CL3650R/S", "CL3650RG/S", "CL3650RG/O", "CL3650RID/S", "DET3650RID", "CL3650RID/O", "DET3050RID", "DET3650R", "DET3050R", "DEC2450R", "DEC3050RID", "DEC3050R", "DEC3650RID", "DEC3650R", "DEU2450BG", "DEU2450R", "ID-24RO", "ID-27R", "ID-24R", "ID-30R", "ID-36R", "DEU2450R/ADA", "DEU1550BG", "DEU2450RO", "DEU2450BG/ADA", "DEU1550B"]);
const designerWineModels = new Set(["DET3050WR", "DEC3050W", "DEC2450W", "DEC1850W"]);

const wolfLegacy = [
  ["Outdoor Grills", "Outdoor Grills"], ["Drop-Down Door Microwave Oven", "Drop-Down Door Microwave Oven"], ["Speed Oven", "Speed Oven"], ["Electric Cooktops (CE Models)", "Electric Cooktops CE"], ["Electric Cooktops (CT Models)", "electric-cooktops"], ["Electric Grill Module (IG Model)", "Electric Grill Module"], ["Electric Grill Module (GM Model)", "Electric Grill Module GM"], ["Fryer Module (IF Model)", "Fryer Module"], ["Fryer Module (FM Model)", "Fryer Module FM"], ["Steamer Module (IS Model)", "Steamer Module"], ["Steamer Module (SM Model)", "Steamer Module SM"], ["M Series Ovens", "M Series Ovens"], ["Cup Warming Drawer", "Cup Warming Drawer"], ["SO24 E Series Oven", "SO24 E Series Oven"], ["Under-Cabinet Hood Insert", "Under-Cabinet Hood Insert"], ["Transitional Teppanyaki Module", "Transitional Teppanyaki Module"], ["Coffee System", "Coffee System"], ["Dual Fuel Ranges", "Dual Fuel Ranges"], ["Induction Ranges", "Induction Ranges"], ["Induction Ranges (50 Series)", "Induction Ranges 50 Series"], ["E Series Ovens (Starting with serial 17000000)", "E Series Ovens"], ["E Series Ovens (Prior to serial 17000000)", "e-series-ovens"], ["Convection Steam Ovens (Knob Control)", "convection-steam-ovens-knob"], ["Convection Steam Ovens (Touch Control)", "convection-steam-ovens-touch"], ["Cooktop Chimney Hoods", "Cooktop-Chimney-Hoods"], ["Cooktop Low Profile Hoods", "Cooktop-Low-Profile-Hoods"], ["L Series Ovens", "L-Series-Ovens"], ["Multi-Function Module", "module-cooktops"], ["Gas Ranges (Sealed Burner Models)", "Gas Ranges Sealed Burner Models"], ["Gas Ranges (Open Burner Models)", "Open-Burner-Gas-Ranges"], ["Gas Rangetops (Open Burner Models)", "Open-Burner-Gas-Rangetops"], ["Gas Cooktops", "Gas-Cooktops"], ["Induction Cooktops (CI Models)", "Induction Cooktops"], ["Induction Cooktops (CT Models)", "Induction-Cooktops"], ["Cooktop Downdrafts 9\" Rise", "Cooktop-Downdrafts-9-Inch-Rise"], ["Drawer Microwaves", "Drawer-Microwaves"], ["MS/MC Microwaves (without door lock)", "Standard and Convection Microwaves"], ["MW/MWC Microwaves", "Standard-and-Convection-Microwaves"], ["BBQ Grills", "BBQ-Grills"], ["Warming Drawer", "Warming Drawer"],
] as const;
const subZeroLegacy = [
  ["Classic Series", "Classic Series"], ["UW/BW Wine Storage", "Classic Series Wine"], ["UC15IP Ice Maker", "UC15IP Ice Maker"], ["Designer Series", "Designer Series"], ["Designer Series Wine", "Designer Series Wine"], ["PRO 48 Refrigeration", "PRO-48-Refrigeration"], ["700 Series Refrigeration", "700-Series-Refrigeration"], ["600 Series Refrigeration", "600-Series-Refrigeration"], ["Undercounter Refrigeration", "Undercounter Refrigeration"], ["500 Series Refrigeration", "500-Series-Refrigeration"], ["400 Series Wine Storage", "400-Series-Wine-Storage"], ["315I Ice Maker", "315I-Ice-Maker"], ["315W Wine Storage", "315W-Wine-Storage"],
] as const;
const coveLegacy = [["Dishwasher", "Dishwasher"]] as const;

function parseHash(): { query: string; brand: Brand; category: string; page: number; types: string[]; styles: string[]; viewAll: boolean } {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const brand = params.get("brand");
  return {
    query: params.get("search") ?? "",
    brand: brand === "Wolf" || brand === "Cove" ? brand : "Sub-Zero",
    category: params.get("category") ?? "",
    page: Math.max(1, Number(params.get("page")) || 1),
    types: params.get("type")?.split("|").filter(Boolean) ?? [],
    styles: params.get("style")?.split("|").filter(Boolean) ?? [],
    viewAll: params.get("numberOfResults") === "100",
  };
}

function categoryMatches(product: Pick<Product, "category" | "series" | "type">, category: string) {
  const value = `${product.category} ${product.series} ${product.type}`.toLowerCase();
  const terms: Record<string, string[]> = {
    "Refrigerator/Freezer": ["refrigeration", "refrigerator", "freezer", "side-by-side", "over-and-under", "french door"],
    "All Refrigerator": ["refrigerator", "refrigeration", "over-and-under", "french door"], "All Freezer": ["freezer"], Wine: ["wine"], "Ice Maker": ["ice maker"], "Wine/Refrigerator": ["wine storage with refrigerator"],
    Ranges: ["range"], "Cooktops and Rangetops": ["cooktop", "rangetop"], "Built-in Ovens": ["oven", "steam"], Microwaves: ["microwave"], "Module Cooktops": ["module"], Ventilation: ["hood", "ventilation"], "Coffee Systems": ["coffee"], "Warming Drawers": ["warming drawer"], "Outdoor Grills": ["outdoor grill"], "Vacuum Seal Drawer": ["vacuum"], Dishwashers: ["dishwasher"],
  };
  return (terms[category] ?? [category.toLowerCase()]).some((term) => value.includes(term));
}

function typeMatches(product: SpecificationProduct, type: string) {
  if (type === "Refrigerator/Freezer") return product.name.includes("Refrigerator/Freezer");
  if (type === "All Refrigerator") return allRefrigeratorModels.has(product.model);
  if (type === "All Freezer") return product.name.includes("Freezer") && !product.name.includes("Refrigerator/Freezer");
  if (type === "Wine") return product.name.includes("Wine");
  if (type === "Ice Maker") return product.model === "DEU1550IP" || product.model === "DEU1550I";
  if (type === "Wine/Refrigerator") return product.model === "DET3050WR";
  return categoryMatches({ category: product.category, series: product.name, type: product.category }, type);
}

function styleMatches(product: SpecificationProduct, style: string) {
  if (style === "Classic") return product.category === "Classic Series Refrigeration" || product.model === "CL3050W/O" || product.model === "CL3050W/S";
  if (style === "Designer") return product.category === "Designer Series Refrigeration" || designerWineModels.has(product.model);
  if (style === "PRO") return product.category === "PRO Refrigeration";
  return false;
}

function LegacySection({ id, title, items }: { id: string; title: string; items: readonly (readonly [string, string])[] }) {
  return <section id={id} className={styles.legacySection}><h3>{title}</h3><ul>{items.map(([label, slug]) => <li key={slug}><a href={`${usa}/trade-resources/legacy-product-specifications/legacy-product-specifications-detail/${encodeURIComponent(slug).replaceAll("%2F", "/")}`} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul></section>;
}

export function ProductSpecificationsPage({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [brand, setBrand] = useState<Brand>("Sub-Zero");
  const [category, setCategory] = useState("");
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [styleFilters, setStyleFilters] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);
  const [ready, setReady] = useState(false);
  const [cad, setCad] = useState("");
  const [legacyBrand, setLegacyBrand] = useState<"wolf" | "sub-zero" | "cove">("wolf");
  const perPage = 20;

  useEffect(() => {
    const restore = () => { const state = parseHash(); setQuery(state.query); setSubmittedQuery(state.query); setBrand(state.brand); setCategory(state.category); setTypeFilters(state.types); setStyleFilters(state.styles); setPage(state.page); setViewAll(state.viewAll); setReady(true); };
    restore(); window.addEventListener("hashchange", restore); return () => window.removeEventListener("hashchange", restore);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams(); params.set("numberOfResults", String(viewAll ? 100 : perPage));
    if (submittedQuery) params.set("search", submittedQuery); if (brand !== "Sub-Zero") params.set("brand", brand); if (category) params.set("category", category); if (typeFilters.length) params.set("type", typeFilters.join("|")); if (styleFilters.length) params.set("style", styleFilters.join("|")); if (page > 1) params.set("page", String(page));
    const next = `#${params}`; if (window.location.hash !== next) history.pushState(null, "", next);
  }, [ready, submittedQuery, brand, category, typeFilters, styleFilters, page, viewAll]);

  const localProducts = useMemo<SpecificationProduct[]>(() => products.map((product) => ({ brand: product.brand, category: product.category, href: "/products", image: product.image, model: product.model, name: product.series })), [products]);
  const filtered = useMemo(() => {
    const source = submittedQuery ? [...referenceSubZeroProducts, ...localProducts] : brand === "Sub-Zero" ? referenceSubZeroProducts : localProducts.filter((product) => product.brand === brand);
    return source.filter((product) => {
      const haystack = `${product.model} ${product.brand} ${product.category} ${product.name}`.toLowerCase();
      const taxonomy = { category: product.category, series: product.name, type: product.category };
      const matchesTypes = typeFilters.length === 0 || typeFilters.some((filter) => typeMatches(product, filter));
      const matchesStyles = styleFilters.length === 0 || styleFilters.some((filter) => styleMatches(product, filter));
      return (!submittedQuery || haystack.includes(submittedQuery.toLowerCase())) && (!category || categoryMatches(taxonomy, category)) && matchesTypes && matchesStyles;
    });
  }, [localProducts, submittedQuery, brand, category, typeFilters, styleFilters]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, pageCount);
  const visible = viewAll ? filtered : filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const isDefaultSubZero = brand === "Sub-Zero" && !submittedQuery && !category && typeFilters.length === 0 && styleFilters.length === 0;
  const displayedTotal = isDefaultSubZero ? 98 : filtered.length;

  function submit(event: FormEvent) { event.preventDefault(); setSubmittedQuery(query.trim()); setPage(1); setViewAll(false); }
  function selectBrand(next: Brand) { setBrand(next); setCategory(""); setTypeFilters([]); setStyleFilters([]); setPage(1); setViewAll(false); }
  function toggleFacet(value: string, setter: Dispatch<SetStateAction<string[]>>) { setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]); setPage(1); setViewAll(false); }
  function clearSearch() { setQuery(""); setSubmittedQuery(""); setPage(1); setViewAll(false); }
  function changePage(nextPage: number) { setViewAll(false); setPage(Math.min(Math.max(nextPage, 1), pageCount)); }
  function showAll() { setViewAll(true); setPage(1); }

  return <main className={styles.page} id="main-content">
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>›</span><Link href="/trade-resources">Trade Resources</Link><span>›</span><span>Product Specifications</span></nav>
    <header className={styles.intro}><h1>Product specifications and manuals</h1><p>Conveniently access popular resources, register products, and search for model-specific information.</p></header>

    <section className={styles.popular}><h2>Popular resources</h2><div className={styles.resourceGrid}>
      <div><h3>DESIGN GUIDES</h3><ul>{designGuides.map(([label, href]) => <li key={label}><a href={`${usa}${href}`} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul></div>
      <div><h3>REFERENCE GUIDES</h3></div>
      <div><h3>DOWNLOAD CAD LIBRARIES</h3><div className={styles.cadRow}><label className={styles.srOnly} htmlFor="cad-format">CAD format</label><select id="cad-format" value={cad} onChange={(e) => setCad(e.target.value)}><option value="">Select Format</option>{cadFormats.map((format) => <option key={format}>{format}</option>)}</select><button type="button" disabled title={cad ? "CAD integration unavailable" : "Select a CAD format"} aria-label="Download CAD library"><Download size={17} /></button></div>{cad && <p className={styles.unavailable}>CAD downloads are not available in the local catalog.</p>}</div>
    </div></section>

    <section className={styles.find}><h2>Find product guides and specifications</h2><p>Search for product specifications by entering the model number or name (for example: “BI30” or “M Series”), or by clicking your product&apos;s brand below.</p>
      <form onSubmit={submit} className={styles.searchForm}><button type="submit" aria-label="Search products"><Search size={17} /></button><input aria-label="Product name, model number" placeholder="Product name, model number" value={query} onChange={(e) => setQuery(e.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={clearSearch}><X size={18} /></button>}</form>
      <a className={styles.helper} href={`${usa}/-/media/files/united-states/product-downloads/sub-zero-wolf/misc/subzero_wolf_cove_serial_numbers_guide.pdf`} target="_blank" rel="noopener noreferrer">How to find your model and serial number</a>
      <div className={styles.catalog}>
        <aside className={styles.filters} aria-label="Product filters"><div className={styles.filterGroup}><h3>Brand</h3>{(["Sub-Zero", "Wolf", "Cove"] as Brand[]).map((item) => <button type="button" aria-pressed={brand === item} className={brand === item ? styles.selected : ""} onClick={() => selectBrand(item)} key={item}>{item.toUpperCase()}</button>)}</div>
          <div className={styles.filterGroup}><h3>{brand === "Sub-Zero" ? "Type" : "Product Category"}</h3><label className={styles.mobileCategory}>Category<select value={category || typeFilters[0] || styleFilters[0] || ""} onChange={(e) => { const value = e.target.value; if (brand === "Sub-Zero") { setCategory(""); if (subZeroStyles.includes(value as typeof subZeroStyles[number])) { setStyleFilters(value ? [value] : []); setTypeFilters([]); } else { setTypeFilters(value ? [value] : []); setStyleFilters([]); } } else { setCategory(value); } setPage(1); }}><option value="">Please Select...</option>{categories[brand].map((item) => <option key={item}>{item}</option>)}{brand === "Sub-Zero" && subZeroStyles.map((item) => <option key={item}>{item}</option>)}</select></label>{brand === "Sub-Zero" ? <div className={styles.desktopCategories}>{categories[brand].map((item) => <label key={item}><input type="checkbox" checked={typeFilters.includes(item)} onChange={() => toggleFacet(item, setTypeFilters)} /><span>{item}</span><span className={styles.facetCount}>{subZeroTypeCounts[item]}</span></label>)}</div> : <div className={styles.desktopCategories}>{categories[brand].map((item) => <label key={item}><input type="checkbox" checked={category === item} onChange={() => { setCategory(category === item ? "" : item); setPage(1); }} /><span>{item}</span></label>)}</div>}</div>
          {brand === "Sub-Zero" && <div className={`${styles.filterGroup} ${styles.desktopCategories}`}><h3>Style</h3>{subZeroStyles.map((item) => <label key={item}><input type="checkbox" checked={styleFilters.includes(item)} onChange={() => toggleFacet(item, setStyleFilters)} /><span>{item}</span><span className={styles.facetCount}>{subZeroStyleCounts[item]}</span></label>)}</div>}
        </aside>
        <div className={styles.results}><Pager page={currentPage} total={displayedTotal} viewAll={viewAll} onPageChange={changePage} onViewAll={showAll} /><p className={styles.resultCount} aria-live="polite">{filtered.length ? viewAll ? `Showing all ${displayedTotal} available results` : `Showing ${(currentPage - 1) * perPage + 1}–${Math.min(currentPage * perPage, filtered.length)} of ${displayedTotal} available results` : "No products matched your search."}</p><div className={styles.resultGrid}>{visible.map((product) => <article className={styles.card} key={product.model}>{referenceNewModels.has(product.model) && <span className={styles.newTag}>NEW</span>}<a href={product.href} target="_blank" rel="noopener noreferrer" className={styles.imageWrap}><img src={product.image} alt={product.name} /></a><div className={styles.productInfo}><h3><a href={product.href} target="_blank" rel="noopener noreferrer">{product.name}</a></h3><strong>{product.model}</strong>{product.price && <p>${product.price}</p>}</div></article>)}</div><Pager page={currentPage} total={displayedTotal} viewAll={viewAll} onPageChange={changePage} onViewAll={showAll} bottom /></div>
      </div>
    </section>

    <section className={styles.legacy}><h2>Legacy product specifications</h2><p>Access specifications, installation guides, use and care guides, and other helpful information for legacy Sub-Zero and Wolf products.</p><nav aria-label="Legacy brands"><button type="button" aria-pressed={legacyBrand === "wolf"} onClick={() => setLegacyBrand("wolf")}>Wolf</button><button type="button" aria-pressed={legacyBrand === "sub-zero"} onClick={() => setLegacyBrand("sub-zero")}>Sub-Zero</button><button type="button" aria-pressed={legacyBrand === "cove"} onClick={() => setLegacyBrand("cove")}>Cove</button></nav>{legacyBrand === "wolf" && <LegacySection id="wolf" title="Legacy Wolf Products" items={wolfLegacy} />}{legacyBrand === "sub-zero" && <LegacySection id="sub-zero" title="Legacy Sub-Zero Products" items={subZeroLegacy} />}{legacyBrand === "cove" && <LegacySection id="cove" title="Legacy Cove Products" items={coveLegacy} />}</section>
    <section className={styles.help}><h2>Finding answers online is quick and simple</h2><div className={styles.helpGrid}><span aria-hidden="true">〳</span><div><p>Use our online search tool and receive immediate assistance. Find answers for product related questions, ownership support, use and care tips and more.</p><a href={`${usa}/assistance/answers`} target="_blank" rel="noopener noreferrer">Find Answers</a></div></div></section>
  </main>;
}

function Pager({ page, total, viewAll, onPageChange, onViewAll, bottom = false }: { page: number; total: number; viewAll: boolean; onPageChange: (page: number) => void; onViewAll: () => void; bottom?: boolean }) {
  const pageCount = Math.ceil(total / 20);
  return <nav className={`${styles.compactPager} ${bottom ? styles.bottomPager : ""}`} aria-label={bottom ? "Results pages bottom" : "Results pages top"}>{Array.from({ length: Math.min(pageCount, 5) }, (_, index) => { const pageNumber = index + 1; return <button type="button" aria-current={!viewAll && page === pageNumber ? "page" : undefined} aria-label={`Page ${pageNumber}`} onClick={() => onPageChange(pageNumber)} key={pageNumber}>{pageNumber}</button>; })}{pageCount > 1 && <button type="button" aria-label="Next page" disabled={!viewAll && page >= pageCount} onClick={() => onPageChange(viewAll ? 2 : page + 1)}>›</button>}<button type="button" className={styles.viewAll} aria-pressed={viewAll} onClick={onViewAll}>VIEW ALL {total}</button></nav>;
}
