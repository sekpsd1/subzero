import { referenceNewModels, referenceSubZeroProducts } from "@/components/ProductSpecifications/reference-products";
import { referenceWolfCoveProducts } from "./reference-wolf-cove-products";

export type BrochureProduct = {
  id: string;
  brand: "Sub-Zero" | "Wolf" | "Cove";
  category: string;
  image: string;
  isNew: boolean;
  model: string;
  name: string;
};

export type BrochureCategory = {
  label: string;
  products: readonly BrochureProduct[];
};

export type BrochureBrand = {
  brand: BrochureProduct["brand"];
  heading: string;
  categories: readonly BrochureCategory[];
};

const subZeroCategoryMap = new Map([
  ["Classic Series Refrigeration", "Classic Refrigeration"],
  ["Designer Series Refrigeration", "Designer Refrigeration"],
  ["PRO Series Refrigeration", "PRO Series Refrigeration"],
  ["Undercounter Refrigeration", "Undercounter Refrigeration"],
  ["Wine Storage", "Wine Storage"],
]);

const subZeroProducts: BrochureProduct[] = referenceSubZeroProducts.flatMap((product) => {
  const category = subZeroCategoryMap.get(product.category);
  if (!category) return [];

  return [{
    id: `sub-zero:${product.model}`,
    brand: "Sub-Zero" as const,
    category,
    image: product.image,
    isNew: referenceNewModels.has(product.model),
    model: product.model,
    name: product.name,
  }];
});

const wolfProducts = referenceWolfCoveProducts.filter((product) => product.brand === "Wolf");
const coveProducts = referenceWolfCoveProducts.filter((product) => product.brand === "Cove");

function categories(labels: readonly string[], products: readonly BrochureProduct[]): BrochureCategory[] {
  return labels.map((label) => ({
    label,
    products: products.filter((product) => product.category === label),
  }));
}

const subZeroLabels = [
  "Classic Refrigeration",
  "Designer Refrigeration",
  "PRO Series Refrigeration",
  "Undercounter Refrigeration",
  "Wine Storage",
] as const;

const wolfLabels = [
  "Dual Fuel Ranges",
  "Gas Ranges",
  "Induction Ranges",
  "Rangetops",
  "Induction Cooktops",
  "Gas Cooktops",
  "Module Cooktops",
  "Range Hoods & Ventilation",
  "M Series Built-In Ovens",
  "E Series Built-In Ovens",
  "Convection Steam Ovens",
  "Speed Ovens",
  "Microwaves",
  "Coffee Systems",
  "Outdoor Grills",
  "Warming Drawers",
  "Vacuum Seal Drawers",
] as const;

export const brochureBrands: readonly BrochureBrand[] = [
  {
    brand: "Sub-Zero",
    heading: "Sub-Zero products",
    categories: categories(subZeroLabels, subZeroProducts),
  },
  {
    brand: "Wolf",
    heading: "Wolf products",
    categories: categories(wolfLabels, wolfProducts),
  },
  {
    brand: "Cove",
    heading: "Cove products",
    categories: categories(["Dishwashers"], coveProducts),
  },
];
