import { WolfRangeCategoryPage } from "./WolfRangeCategoryPage";

const range = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:20d8fcd5-f7c5-4f50-9e81-06ab4f317956/as/DF36450G_BK_P_SSBEZEL_REDKNOB_SH_comparison.avif?assetname=DF36450G_BK_P_SSBEZEL_REDKNOB_SH_comparison.png&width=900&max-quality=90";

export function DualFuelRangesPage() {
  return <WolfRangeCategoryPage selectedLabel="Dual Fuel Range" filterLabels={["Burner Configuration", "Width", "Finish"]} cards={[{ title: "Dual Fuel Range", image: range, count: "1 / 4", href: "/products/cooking/dual-fuel-range", specs: [{ label: "Width", values: ['30\"', '36\"', '48\"', '60\"'] }, { label: "Rangetop Configuration", values: ["All Burner", "Infrared Charbroiler", "Infrared Griddle", "French Top"] }, { label: "Fuel Type", values: ["Natural Gas", "Liquid Propane"] }] }]} confidenceCopy="Wolf Dual Fuel Ranges pair precise dual-stacked, sealed gas burners with an electric convection oven for consistent baking, roasting, and more." />;
}
