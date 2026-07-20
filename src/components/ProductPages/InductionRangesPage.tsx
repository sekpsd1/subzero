import { WolfRangeCategoryPage } from "./WolfRangeCategoryPage";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";
const cards = [
  { title: "Transitional Induction Range", image: `${aem}24242e56-7ea3-4a44-adb0-b25633317d0b/as/image.avif?width=900&quality=90`, count: "1 / 2", href: "/products/transitional-induction-range-ir50t/ir50t", specs: [{ label: "Width", values: ['30\"', '36\"'] }, { label: "Finish", values: ["Stainless Steel"] }] },
  { title: "Professional Induction Range", image: `${aem}0b4fe1c0-0d56-4528-b76a-9bed9bbc204a/as/image.avif?width=900&quality=90`, count: "1 / 3", href: "/products/professional-induction-range-ir51p/ir51p", specs: [{ label: "Width", values: ['30\"', '36\"', '48\"'] }, { label: "Finish", values: ["Black", "Stainless Steel", "White"] }] },
] as const;

export function InductionRangesPage() {
  return <WolfRangeCategoryPage selectedLabel="Induction Range" filterLabels={["Series (1)", "Width", "Finish"]} cards={cards} confidenceCopy="Wolf Induction Ranges deliver lightning-fast response, precise temperature control, and powerful electric convection for consistently exceptional results." />;
}
