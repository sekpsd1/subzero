import { WolfRangeCategoryPage } from "./WolfRangeCategoryPage";

const gasRange = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3c808fea-a83e-42ce-9889-38f54e7bff74/as/image.avif?width=900&quality=95";

export function GasRangesPage() {
  return <WolfRangeCategoryPage selectedLabel="Gas Range" filterLabels={["Series (1)", "Burner Configuration", "Width"]} cards={[{ title: "Gas Range", series: "GR Series", image: gasRange, count: "1 / 4", href: "/products/cooking/gas-range-gr", specs: [{ label: "Width", values: ['30\"', '36\"', '48\"', '60\"'] }, { label: "Burner Configuration", values: ["All Burner", "Infrared Charbroiler", "Infrared Griddle", "Double Griddle"] }, { label: "Fuel Type", values: ["Natural Gas", "Liquid Propane"] }, { label: "Finish", values: ["Stainless Steel"] }, { label: "Oven", values: ["Dependable gas convection"] }] }]} confidenceCopy="Dual-stacked, sealed gas burners deliver power and control at every temperature, while the dependable gas oven produces consistent results for baking, roasting, and more. Built for Wolf durability and professional performance." />;
}
