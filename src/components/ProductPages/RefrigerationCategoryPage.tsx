import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import frenchDoorHero from "../../../img-SUB-ZERO/french-doors/SZWC_Nashville_46077_R_RGB.avif";
import { DetailedProductCard } from "@/components/ProductPages/DetailedProductCard";
import { products, type Product } from "@/lib/site-data";

const aem = (id: string, file: string, width = 1920) =>
  `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:${id}/as/${file}&width=${width}&max-quality=90`;

const assets = {
  hero: frenchDoorHero,
  frenchDoorModel: aem(
    "08c9cf5e-239e-45e8-b4c4-57f6bb518c1d",
    "22-SUBZ-BI-CLASSIC-SILOS_FRENCH-DOOR_CL4250UFD_S_P_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_FRENCH-DOOR_CL4250UFD_S_P_SH.png",
    1200,
  ),
  sideBySideModel: aem(
    "4b42adb4-3afe-48f2-97b0-86febbcf389f",
    "image.avif?assetname=image.png",
    1280,
  ),
  pro48SolidModel:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:e6762f9c-1392-4272-bdeb-0f968ad29cd9/as/image.avif?width=1280&quality=90",
  pro48GlassModel:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:7cc61522-d7c3-42ec-a2b9-3a423419e74b/as/image.avif?width=1280&quality=90",
  overUnderModel: aem(
    "3eb82e9a-e475-4f10-9d0e-9e93e69ca45f",
    "22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_P_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_P_R_SH.png",
    1280,
  ),
  classicOverUnderGlass:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:d588e559-ff10-4cd6-a6d6-632c71c0134c/as/22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_T_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_T_R_SH.png&width=1280&max-quality=90",
  designerOverUnderRefrigerator: aem(
    "f1fc6aee-91ae-4261-8581-ae3ed36ca3ce",
    "DET3050R_R-CUSTOM_SH.avif?assetname=DET3050R_R-CUSTOM_SH.png",
    1280,
  ),
  designerOverUnderFreezer: aem(
    "98ac4d20-9a8c-43ba-b63a-5aec33ab76c7",
    "DEC2450FI_R-CUSTOM_SH.avif?assetname=DEC2450FI_R-CUSTOM_SH.png",
    1280,
  ),
  designerOverUnderCombo: aem(
    "08d37139-fb2e-4518-9166-dfadb8ed57cc",
    "DET3650R_R_SH.avif?assetname=DET3650R_R_SH.png",
    1280,
  ),
  pro36SolidModel: aem(
    "742887fc-53b0-4fd5-ace0-aea6b43b0df7",
    "SILO_PRO3650-RH_PIK_120618_SH.avif?assetname=SILO_PRO3650-RH_PIK_120618_SH.png",
    1280,
  ),
  pro36GlassModel: aem(
    "60963683-cc5a-44b9-b673-e0ab8cdf2bc3",
    "SUB_SILO_PRO3650G_RH_SS_F_SH.avif?assetname=SUB_SILO_PRO3650G_RH_SS_F_SH.png",
    1280,
  ),
  columnRefrigerationModel: aem(
    "0874947b-b523-488c-8f42-4ae36441d07e",
    "22-SUBZ-BI-CLASSIC-SILOS_COLUMNS_CL3650F_S_P_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_COLUMNS_CL3650F_S_P_R_SH.png",
    1280,
  ),
  classicColumnGlass:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:d588e559-ff10-4cd6-a6d6-632c71c0134c/as/22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_T_R_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_OVER-UNDER_CL3650U_S_T_R_SH.png&width=1280&max-quality=90",
  designerColumnRefrigerator: "/assets/subzero/discover/DET3650R_R_SH.avif",
  columnFreezerModel: aem(
    "93a4f04d-050f-4498-8871-f06558d22f0b",
    "Column-Freezer.svg?assetname=Column%20Freezer.svg",
    900,
  ),
  outdoorModel: aem(
    "abb61ac1-66b7-4185-9acf-1df361661f75",
    "Outdoor.svg?assetname=Outdoor.svg",
    900,
  ),
  discoverWolf: aem(
    "0b25fcce-e900-446e-aad3-a02309cbca8a",
    "SZWC_Seattle_1359_4021FC_A_ADOBERGB.avif?assetname=SZWC_Seattle_1359_4021FC_A_ADOBERGB.tif",
    1400,
  ),
  discoverCove: aem(
    "390cad36-9e50-4e66-9ae9-feb55e0bd553",
    "cove-dishwashing.avif?assetname=cove-dishwashing.jpg",
    1000,
  ),
  discoverOutdoor: aem(
    "8a2967b8-7d3d-4ab9-b324-5f4ca6f950bc",
    "LG_SLG_042919_3.avif?assetname=LG_SLG_042919_3.tif",
    1000,
  ),
  categoryColumnRefrigeration:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:640e7e31-3a61-4ba8-8c7c-f33269dbb3b0/renditions/original/as/Column-Refrigeration.svg?assetname=Column%20Refrigeration.svg",
  categoryColumnFreezer:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:93a4f04d-050f-4498-8871-f06558d22f0b/renditions/original/as/Column-Freezer.svg?assetname=Column%20Freezer.svg",
  categoryOverUnder:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3f9421fd-c669-4492-ac3c-a1b4286eb7d7/renditions/original/as/Over-and-Under.svg?assetname=Over-and-Under.svg",
  categorySideBySide:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:85466422-77aa-4c53-ab1f-f26ea58833df/renditions/original/as/Side-by-Side.svg?assetname=Side-by-Side.svg",
  categoryFrenchDoor:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:82ae348a-0830-437a-8164-99bb624af6e1/renditions/original/as/French-Door.svg?assetname=French%20Door.svg",
  categoryWine:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:d78ebc4a-be59-49a8-8020-a5605eb48954/renditions/original/as/Wine-Storage.svg?assetname=Wine%20Storage.svg",
  categoryUndercounter:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:eaa9787b-5f84-46d7-9371-e20817c72080/renditions/original/as/Undercounter.svg?assetname=Undercounter.svg",
  categoryIceMaker:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:b90480bb-ea65-4790-816f-5abc157306e3/renditions/original/as/Ice-Makers.svg?assetname=Ice%20Makers.svg",
  categoryDrawer:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:e5cd5e14-f847-4d7a-931a-dab275effc3e/renditions/original/as/Drawers.svg?assetname=Drawers.svg",
  categoryOutdoor:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:abb61ac1-66b7-4185-9acf-1df361661f75/renditions/original/as/Outdoor.svg?assetname=Outdoor.svg",
};

export type RefrigerationCategorySlug =
  | "french-door"
  | "side-by-side"
  | "over-and-under"
  | "column-refrigeration"
  | "column-freezer"
  | "outdoor";

type CategoryConfig = {
  slug: RefrigerationCategorySlug;
  title: string;
  filterLabel: string;
  productType: string;
  productModels?: string[];
  productCards?: ProductCardConfig[];
  fallbackTitle: string;
  fallbackCopy: string;
  resultTitle: string;
  widths: string;
  finish: string[];
  features: string;
  modelImage: string;
};

type ProductCardConfig = {
  model: string;
  title: string;
  image: string;
  images?: string[];
  widths: string;
  finish: string[];
  features: string | string[];
  countLabel?: string | null;
  imageSizes?: string;
};

export const refrigerationCategoryConfigs: Record<RefrigerationCategorySlug, CategoryConfig> = {
  "french-door": {
    slug: "french-door",
    title: "French Door Refrigeration",
    filterLabel: "French Doors",
    productType: "French Door",
    productModels: ["ICBCL4250UFD"],
    productCards: [
      {
        model: "ICBCL4250UFD",
        title: "Classic French Door Refrigerator/Freezer",
        image: assets.frenchDoorModel,
        images: [assets.frenchDoorModel],
        widths: '36" 42" 48"',
        finish: ["Panel Ready", "Stainless Steel"],
        features: "Internal Water Dispenser",
        countLabel: null,
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
    ],
    fallbackTitle: "French Door catalog data is ready for import.",
    fallbackCopy: "Add model records to show live French Door products here.",
    resultTitle: "Classic French Door Refrigerator/Freezer",
    widths: '36" 42" 48"',
    finish: ["Panel Ready", "Stainless Steel"],
    features: "Internal Water Dispenser",
    modelImage: assets.frenchDoorModel,
  },
  "side-by-side": {
    slug: "side-by-side",
    title: "Side-by-Side Refrigeration",
    filterLabel: "Side-by-Side",
    productType: "Side-by-Side",
    productModels: ["ICBCL4850SID", "ICBPRO4850", "ICBPRO4850G"],
    productCards: [
      {
        model: "ICBCL4850SID",
        title: "Classic Side-by-Side Refrigerator/Freezer",
        image: assets.sideBySideModel,
        images: [assets.sideBySideModel, assets.pro48SolidModel],
        widths: '42" 48"',
        finish: ["Panel Ready", "Stainless Steel"],
        features: ["Ice and Water Dispenser", "Internal Water Dispenser"],
        countLabel: "2 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBPRO4850",
        title: "PRO Refrigerator/Freezer",
        image: assets.pro48SolidModel,
        widths: '48"',
        finish: ["Stainless Steel"],
        features: "",
        countLabel: null,
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBPRO4850G",
        title: "PRO Refrigerator/Freezer with Glass Door",
        image: assets.pro48GlassModel,
        widths: '48"',
        finish: ["Stainless Steel"],
        features: "",
        countLabel: null,
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
    ],
    fallbackTitle: "Side-by-Side catalog data is ready for import.",
    fallbackCopy: "Add model records to show live Side-by-Side products here.",
    resultTitle: "Classic Side-by-Side Refrigerator/Freezer",
    widths: '42" 48"',
    finish: ["Panel Ready", "Stainless Steel"],
    features: "Internal Water Dispenser",
    modelImage: assets.sideBySideModel,
  },
  "over-and-under": {
    slug: "over-and-under",
    title: "Over-and-Under Refrigeration",
    filterLabel: "Over-and-Under",
    productType: "Over-and-Under",
    productModels: [
      "ICBCL3650U",
      "ICBCL3650UG",
      "ICBDET3650RID",
      "ICBDEC3050FI",
      "ICBDET3050R",
      "ICBPRO3650",
      "ICBPRO3650G",
    ],
    productCards: [
      {
        model: "ICBCL3650U",
        title: "Classic Over-and-Under Refrigerator/Freezer",
        image: assets.overUnderModel,
        images: [assets.overUnderModel, assets.classicOverUnderGlass],
        widths: '30" 36"',
        finish: ["Panel Ready", "Stainless Steel"],
        features: "Internal Water Dispenser",
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBCL3650UG",
        title: "Classic Over-and-Under Refrigerator/Freezer with Glass Door",
        image: assets.classicOverUnderGlass,
        images: [assets.classicOverUnderGlass, assets.overUnderModel],
        widths: '30" 36"',
        finish: ["Panel Ready", "Stainless Steel"],
        features: "",
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBDET3650RID",
        title: "Designer Over-and-Under Refrigerator/Freezer",
        image: assets.designerOverUnderCombo,
        images: [assets.designerOverUnderCombo, assets.designerOverUnderRefrigerator],
        widths: '36"',
        finish: ["Panel Ready"],
        features: ["Ice Maker", "Internal Water Dispenser or Ice Maker"],
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBDEC3050FI",
        title: "Designer Over-and-Under Freezer",
        image: assets.designerOverUnderFreezer,
        widths: '30"',
        finish: ["Panel Ready"],
        features: "Ice Maker",
        countLabel: null,
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBDET3050R",
        title: "Designer Over-and-Under Refrigerator",
        image: assets.designerOverUnderRefrigerator,
        images: [assets.designerOverUnderRefrigerator, assets.designerOverUnderCombo],
        widths: '30" 36"',
        finish: ["Panel Ready"],
        features: "Internal Water Dispenser",
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBPRO3650",
        title: "PRO Refrigerator/Freezer",
        image: assets.pro36SolidModel,
        widths: '36"',
        finish: ["Stainless Steel"],
        features: "",
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBPRO3650G",
        title: "PRO Refrigerator/Freezer with Glass Door",
        image: assets.pro36GlassModel,
        widths: '36"',
        finish: ["Stainless Steel"],
        features: "",
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
    ],
    fallbackTitle: "Over-and-Under catalog data is ready for import.",
    fallbackCopy: "Add model records to show live Over-and-Under products here.",
    resultTitle: "Classic Over-and-Under Refrigerator/Freezer",
    widths: '30" 36"',
    finish: ["Panel Ready", "Stainless Steel"],
    features: "Freezer Drawer",
    modelImage: assets.overUnderModel,
  },
  "column-refrigeration": {
    slug: "column-refrigeration",
    title: "Column Refrigeration",
    filterLabel: "Column Refrigeration",
    productType: "Column Refrigeration",
    productModels: ["ICBCL3650RID", "ICBCL3650RG", "ICBDET3650R"],
    productCards: [
      {
        model: "ICBCL3650RID",
        title: "Classic Refrigerator",
        image: assets.columnRefrigerationModel,
        images: [assets.columnRefrigerationModel, assets.classicColumnGlass],
        widths: '36"',
        finish: ["Panel Ready", "Stainless Steel"],
        features: "Internal Water Dispenser",
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBCL3650RG",
        title: "Classic Refrigerator with Glass Door",
        image: assets.classicColumnGlass,
        images: [assets.classicColumnGlass, assets.columnRefrigerationModel],
        widths: '36"',
        finish: ["Panel Ready", "Stainless Steel"],
        features: "",
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBDET3650R",
        title: "Designer Column Refrigerator",
        image: assets.designerColumnRefrigerator,
        images: [assets.designerColumnRefrigerator, assets.designerOverUnderCombo, assets.designerOverUnderRefrigerator],
        widths: '24" 30" 36"',
        finish: ["Panel Ready"],
        features: "Internal Water Dispenser",
        countLabel: "1 / 3",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
    ],
    fallbackTitle: "Column Refrigeration catalog data is ready for import.",
    fallbackCopy: "Add model records to show live Column Refrigeration products here.",
    resultTitle: "Designer Column Refrigerator",
    widths: '24" 30" 36"',
    finish: ["Panel Ready", "Stainless Steel"],
    features: "All-Refrigerator",
    modelImage: assets.columnRefrigerationModel,
  },
  "column-freezer": {
    slug: "column-freezer",
    title: "Column Freezer",
    filterLabel: "Column Freezer",
    productType: "Column Freezer",
    productModels: ["ICBCL3650F", "ICBDEC3050FI"],
    productCards: [
      {
        model: "ICBCL3650F",
        title: "Classic Freezer",
        image: assets.columnRefrigerationModel,
        images: [assets.columnRefrigerationModel, assets.classicColumnGlass],
        widths: '36"',
        finish: ["Panel Ready", "Stainless Steel"],
        features: "",
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBDEC3050FI",
        title: "Designer Column Freezer",
        image: assets.designerOverUnderFreezer,
        images: [assets.designerOverUnderFreezer, assets.designerColumnRefrigerator],
        widths: '18" 24" 30" 36"',
        finish: ["Panel Ready"],
        features: "Ice Maker",
        countLabel: "1 / 4",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
    ],
    fallbackTitle: "Column Freezer catalog data is ready for import.",
    fallbackCopy: "Add model records to show live Column Freezer products here.",
    resultTitle: "Designer Column Freezer",
    widths: '18" 24" 30" 36"',
    finish: ["Panel Ready", "Stainless Steel"],
    features: "Automatic Ice Maker",
    modelImage: assets.columnFreezerModel,
  },
  outdoor: {
    slug: "outdoor",
    title: "Outdoor Refrigeration",
    filterLabel: "Outdoor Refrigeration",
    productType: "Outdoor Refrigeration",
    productModels: ["ICBDEU2450RO", "ICBID24RO"],
    productCards: [
      {
        model: "ICBDEU2450RO",
        title: "Outdoor Undercounter Refrigerator",
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:561e1204-2ab3-4f54-8eb5-5c012eae3b59/as/image.avif?width=408&quality=90",
        images: [
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:561e1204-2ab3-4f54-8eb5-5c012eae3b59/as/image.avif?width=408&quality=90",
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:89d0c822-ff61-486c-9f9d-970aa7b75766/as/image.avif?width=408&quality=90",
        ],
        widths: '24"',
        finish: ["Panel Ready"],
        features: "",
        countLabel: "1 / 2",
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
      {
        model: "ICBID24RO",
        title: "Designer Outdoor Refrigerator Drawers",
        image:
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:136a1175-9218-48d4-b0e1-e5359ed7ffb4/as/image.avif?width=408&quality=90",
        images: [
          "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:136a1175-9218-48d4-b0e1-e5359ed7ffb4/as/image.avif?width=408&quality=90",
        ],
        widths: '24"',
        finish: ["Panel Ready"],
        features: "",
        countLabel: null,
        imageSizes: "(min-width: 1280px) 408px, (min-width: 768px) 33vw, 90vw",
      },
    ],
    fallbackTitle: "Outdoor Refrigeration catalog data is ready for import.",
    fallbackCopy: "Add model records to show live Outdoor Refrigeration products here.",
    resultTitle: "Outdoor Refrigerator",
    widths: '24"',
    finish: ["Stainless Steel"],
    features: "Outdoor Rated",
    modelImage: assets.outdoorModel,
  },
};

export const refrigerationCategoryMetadata = {
  "french-door": {
    title: "French Door Refrigeration | Sub-Zero",
    description:
      "Browse Sub-Zero French Door refrigeration models, preservation features, widths, finishes, and related refrigeration categories.",
  },
  "side-by-side": {
    title: "Side-by-Side Refrigeration | Sub-Zero",
    description:
      "Browse Sub-Zero Side-by-Side refrigeration models, preservation features, widths, finishes, and related refrigeration categories.",
  },
  "over-and-under": {
    title: "Over-and-Under Refrigeration | Sub-Zero",
    description:
      "Browse Sub-Zero Over-and-Under refrigeration models, preservation features, widths, finishes, and related refrigeration categories.",
  },
  "column-refrigeration": {
    title: "Column Refrigeration | Sub-Zero",
    description:
      "Browse Sub-Zero Column Refrigeration models, preservation features, widths, finishes, and related refrigeration categories.",
  },
  "column-freezer": {
    title: "Column Freezer | Sub-Zero",
    description:
      "Browse Sub-Zero Column Freezer models, preservation features, widths, finishes, and related refrigeration categories.",
  },
  outdoor: {
    title: "Outdoor Refrigeration | Sub-Zero",
    description:
      "Browse Sub-Zero Outdoor Refrigeration models, preservation features, widths, finishes, and related refrigeration categories.",
  },
} satisfies Record<RefrigerationCategorySlug, { title: string; description: string }>;

const categoryNav = [
  { slug: "column-refrigeration", title: "Column", image: assets.categoryColumnRefrigeration },
  { slug: "over-and-under", title: "Over-and-Under", image: assets.categoryOverUnder },
  { slug: "side-by-side", title: "Side-by-Side", image: assets.categorySideBySide },
  { slug: "french-door", title: "French Door", image: assets.categoryFrenchDoor },
  { slug: "wine-storage", title: "Wine", image: assets.categoryWine },
  { slug: "undercounter", title: "Undercounter", image: assets.categoryUndercounter },
  { slug: "ice-makers", title: "Ice Maker", image: assets.categoryIceMaker },
  { slug: "drawers", title: "Drawer", image: assets.categoryDrawer },
  { slug: "outdoor", title: "Outdoor", image: assets.categoryOutdoor },
];

function categoryHref(slug: string) {
  if (slug === "drawers") return "/products/refrigeration/drawers";
  return `/refrigeration/${slug}`;
}

function productsForConfig(config: CategoryConfig) {
  if (config.productModels) {
    return config.productModels
      .map((model) => products.find((product) => product.model === model && product.category === "Refrigeration"))
      .filter((product): product is Product => Boolean(product));
  }

  return products.filter(
    (product) =>
      product.category === "Refrigeration" &&
      (product.type === config.productType || product.type === config.filterLabel),
  );
}

function displayForProduct(config: CategoryConfig, product: Product): ProductCardConfig {
  return (
    config.productCards?.find((card) => card.model === product.model) ?? {
      model: product.model,
      title: config.resultTitle,
      image: config.modelImage,
      widths: config.widths,
      finish: config.finish,
      features: config.features,
    }
  );
}

function ProductResultCard({
  config,
  product,
  count,
  index,
}: {
  config: CategoryConfig;
  product?: Product;
  count: number;
  index: number;
}) {
  if (!product) {
    return (
      <div className="mt-8 max-w-[360px] border border-[#d8d2c8] bg-[#fbfaf7] p-7">
        <h2 className="font-serif text-[1.35rem] leading-tight">{config.fallbackTitle}</h2>
        <p className="mt-4 text-sm leading-6 text-[#5d564d]">{config.fallbackCopy}</p>
      </div>
    );
  }

  const display = displayForProduct(config, product);
  const detailedCard = Boolean(config.productCards);

  if (detailedCard) {
    return (
      <DetailedProductCard
        title={display.title}
        images={display.images ?? [display.image]}
        imageSizes={display.imageSizes}
        widths={display.widths}
        finish={display.finish}
        features={display.features}
        countLabel={display.countLabel}
        fallbackCountLabel={`${index + 1} / ${count}`}
        priority={index === 0}
      />
    );
  }

  return (
    <Link
      href="#"
      className={`group block h-full border border-[#d2cdc1] transition hover:bg-[#fbfaf7] ${
        detailedCard ? "bg-transparent p-6" : "bg-[#fbfaf7]"
      }`}
    >
      <div className={detailedCard ? "relative w-full overflow-hidden bg-transparent" : "relative mx-auto mt-12 h-[340px] w-[240px]"}>
        <div className={detailedCard ? "aspect-[4/5] w-full" : "h-full w-full"}>
          <Image
            src={display.image}
            alt={display.title}
            fill
            sizes={display.imageSizes ?? "240px"}
            className="object-contain"
            priority={index === 0}
          />
        </div>
      </div>
      <div className={`${detailedCard ? "min-h-[44px] px-0 py-3 text-[0.9rem] font-light" : "min-h-10 px-6 py-3 text-xs"} flex justify-end text-[#171715]`}>
        {display.countLabel === null ? null : (display.countLabel ?? `${index + 1} / ${count}`)}
      </div>
      <div className={detailedCard ? "pb-3" : "p-6 pt-3"}>
        <h2 className={`${detailedCard ? "min-h-[74px] max-w-[360px] text-[clamp(1.75rem,1.65vw,2rem)] leading-[1.08] group-hover:underline group-focus-visible:underline" : "max-w-[250px] text-[1.35rem] leading-tight"} font-serif underline-offset-4`}>
          {display.title}
        </h2>
        <dl className={`${detailedCard ? "mt-3 text-[0.8125rem] leading-[1.4]" : "mt-5 text-xs"} border-t border-[#d8d2c8]`}>
          <div className={`${detailedCard ? "grid-cols-2 py-2" : "grid-cols-[90px_1fr] py-2 md:grid-cols-[minmax(90px,1fr)_minmax(0,1fr)]"} grid border-b border-[#d8d2c8]`}>
            <dt className="text-[#6f695f]">Width:</dt>
            <dd>{display.widths}</dd>
          </div>
          <div className={`${detailedCard ? "grid-cols-2 py-2" : "grid-cols-[90px_1fr] py-2 md:grid-cols-[minmax(90px,1fr)_minmax(0,1fr)]"} grid border-b border-[#d8d2c8]`}>
            <dt className="text-[#6f695f]">Finish:</dt>
            <dd className="space-y-1">
              {display.finish.map((finish) => (
                <span key={finish} className="flex items-center gap-2">
                  <span
                    className={`h-4 w-4 rounded-full border border-[#a7a196] ${
                      finish === "Panel Ready" ? "bg-[#5f5d57]" : "bg-[#9d9b95]"
                    }`}
                    aria-hidden="true"
                  />
                  {finish}
                </span>
              ))}
            </dd>
          </div>
          <div className={`${detailedCard ? "grid-cols-2 py-2" : "grid-cols-[90px_1fr] py-2 md:grid-cols-[minmax(90px,1fr)_minmax(0,1fr)]"} grid min-h-[36px]`}>
            <dt className="text-[#6f695f]">Features:</dt>
            <dd className="space-y-1">
              {Array.isArray(display.features)
                ? display.features.map((feature) => (
                    <span key={feature} className="block">
                      {feature}
                    </span>
                  ))
                : display.features}
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

function ProductListing({ config }: { config: CategoryConfig }) {
  const matchingProducts = productsForConfig(config);

  return (
    <section className="bg-[#f4f2ec] px-6 pb-18 pt-4 text-[#171715] md:px-12 md:pb-24">
      <div className="mx-auto max-w-[1392px]">
        <p className="font-serif text-[1.65rem] leading-none">Select your category</p>
        <div className="mt-8 grid grid-cols-2 border-l border-t border-[#d2cdc1] sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
          {categoryNav.map((category) => {
            const active = category.slug === config.slug;

            return (
              <Link
                key={category.slug}
                href={categoryHref(category.slug)}
                className={`group relative flex min-h-[226px] flex-col items-center justify-between border-b border-r border-[#d2cdc1] px-3 pb-5 pt-4 text-center text-[0.92rem] transition hover:bg-white ${
                  active ? "bg-white" : "bg-[#f4f2ec]"
                }`}
              >
                {active ? (
                  <span className="absolute right-3 top-3 text-2xl leading-none text-[#514b43]" aria-hidden="true">
                    x
                  </span>
                ) : null}
                <span className="relative mt-2 h-[138px] w-full max-w-[92px]" aria-hidden="true">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="92px"
                    className="object-contain transition group-hover:opacity-80"
                  />
                </span>
                <span className={active ? "font-bold" : ""}>{category.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-b border-[#d8d2c8] pb-4 text-xs">
          <div className="flex flex-wrap gap-8">
            {["Series", "Width", "Finish"].map((label) => (
              <button key={label} type="button" className="inline-flex items-center gap-2">
                {label}
                <span aria-hidden="true">v</span>
              </button>
            ))}
          </div>
          <div className="flex gap-10">
            <span>All filters (3)</span>
            <span>Sort by v</span>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em]">Selected filters (1)</p>
          <div className="mt-3 flex items-center gap-4 text-xs">
            <span className="rounded-full border border-[#bfb7aa] px-3 py-1.5">{config.filterLabel} x</span>
            <Link href="/products/refrigeration" className="underline underline-offset-2">
              Clear all
            </Link>
          </div>
        </div>

        <div className={`mt-8 grid max-w-[1392px] ${config.productCards ? "gap-2 md:grid-cols-3" : "md:grid-cols-3"}`}>
          {matchingProducts.length ? (
            matchingProducts.map((product, index) => (
              <ProductResultCard
                key={product.model}
                config={config}
                product={product}
                count={matchingProducts.length}
                index={index}
              />
            ))
          ) : (
            <ProductResultCard config={config} count={1} index={0} />
          )}
        </div>
        <p className="mt-12 text-center text-xs font-bold">
          Viewing {matchingProducts.length ? `${matchingProducts.length} of ${matchingProducts.length}` : "0 of 0"}
        </p>
      </div>
    </section>
  );
}

function PreservationStatement() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-16 text-[#171715] md:px-12 md:pb-24">
      <div className="mx-auto grid max-w-[1392px] gap-10 border-t border-transparent lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
        <h2 className="font-serif text-[clamp(2rem,2.6vw,3rem)] leading-tight">
          The pinnacle of food preservation
        </h2>
        <p className="max-w-[520px] text-[1rem] leading-snug">
          With revolutionary dual refrigeration, air purification, and vacuum-sealed doors, our products help keep your
          fruits bright and flavorful, your vegetables crisp, and your proteins in their prime longer.
        </p>
      </div>
    </section>
  );
}

function DiscoverMore() {
  return (
    <section className="bg-[#d3d0c5] px-6 py-20 text-[#171715] md:px-12 md:py-28">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="mb-10 font-serif text-[clamp(3rem,3.5vw,4rem)] leading-none">Discover more</h2>

        <div className="grid gap-2 bg-[#d3d0c5]">
          <article className="grid bg-[#fbfaf6] md:grid-cols-[0.255fr_0.745fr]">
            <div className="flex min-h-[385px] flex-col justify-between p-7 md:min-h-[540px] md:p-8">
              <div>
                <h3 className="max-w-[300px] font-serif text-[2.55rem] leading-[1.08]">
                  <span className="block whitespace-nowrap">Effortless control,</span>
                  <span className="block whitespace-nowrap">flawless flavor</span>
                </h3>
                <p className="mt-8 max-w-[295px] text-[0.95rem] leading-tight">
                  Wolf equips cooks of every level with the confidence to create exquisite meals time and time again.
                </p>
              </div>
              <Link
                href="/products/cooking"
                className="inline-flex min-h-[34px] w-fit items-center justify-center rounded-full border border-[#171715] px-5 text-xs font-bold transition hover:bg-[#171715] hover:text-white"
              >
                Explore Wolf
              </Link>
            </div>
            <div className="relative min-h-[385px] overflow-hidden md:min-h-[540px]">
              <Image
                src={assets.discoverWolf}
                alt="Wolf range with red knobs in a bright kitchen."
                fill
                sizes="1035px"
                className="object-cover"
              />
            </div>
          </article>

          <div className="grid gap-2 md:grid-cols-2">
            {[
              {
                title: "A pristine and peaceful clean",
                copy: "Your silent partner in the kitchen, Cove's intuitive, customizable features offer a worry-free wash and dry.",
                cta: "Explore Cove",
                href: "/products",
                image: assets.discoverCove,
                alt: "Open Cove dishwasher with dishes loaded inside.",
              },
              {
                title: "Exceptional outdoor living",
                copy: "Entertain confidently outdoors with the same superior refrigeration and cooking technologies you trust from Sub-Zero and Wolf.",
                cta: "Explore Outdoor",
                href: "/products/outdoor",
                image: assets.discoverOutdoor,
                alt: "Outdoor kitchen and dining space with premium appliances.",
              },
            ].map((item) => (
              <article key={item.title} className="bg-[#fbfaf6]">
                <div className="relative min-h-[285px] overflow-hidden md:min-h-[365px]">
                  <Image src={item.image} alt={item.alt} fill sizes="696px" className="object-cover" />
                </div>
                <div className="grid min-h-[175px] gap-7 p-7 md:grid-cols-[0.47fr_0.53fr] md:p-8">
                  <div className="flex flex-col justify-between gap-5">
                    <h3 className="font-serif text-[clamp(2.05rem,2.4vw,2.75rem)] leading-[0.98]">
                      {item.title}
                    </h3>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[34px] w-fit items-center justify-center rounded-full border border-[#171715] px-5 text-xs font-bold transition hover:bg-[#171715] hover:text-white"
                    >
                      {item.cta}
                    </Link>
                  </div>
                  <p className="text-[0.9rem] leading-tight">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RefrigerationCategoryPage({
  category,
  heroImage = assets.hero,
}: {
  category: RefrigerationCategorySlug;
  heroImage?: StaticImageData;
}) {
  const config = refrigerationCategoryConfigs[category];

  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <section className="relative h-[100svh] min-h-[720px] overflow-hidden bg-[#171715] text-white">
        <Image
          src={heroImage}
          alt="Bright kitchen with Sub-Zero refrigeration."
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/4 to-black/0" />
        <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-black/78 via-black/34 to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-12">
          <h2
            id="find-your-distinctive-sub-zero-style"
            className="font-serif text-[2.5rem] leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:text-[2.5rem]"
          >
            Find your distinctive Sub-Zero style
          </h2>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1392px] gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,0.95fr)]">
          <h1 className="font-serif text-[clamp(3.2rem,4.2vw,5rem)] leading-tight">Refrigeration</h1>
          <p className="max-w-[560px] text-[1rem] leading-snug">
            Our refrigerators and freezers elevate preservation, extending the life of every ingredient with precision
            and care. Crafted to the highest standards, they reflect a brand where exceptional quality and deep respect
            for food go hand in hand.
          </p>
        </div>
      </section>

      <ProductListing config={config} />
      <PreservationStatement />
      <DiscoverMore />
    </main>
  );
}
