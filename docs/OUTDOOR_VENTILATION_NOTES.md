# Outdoor Ventilation Notes

Updated: 2026-08-11

## Scope

- Canonical route: `/outdoor/ventilation`
- Route file: `src/app/outdoor/ventilation/page.tsx`
- Page component: `src/components/ProductPages/OutdoorVentilationPage.tsx`
- Metadata title: `Outdoor Ventilation | Wolf`
- Metadata description: `Browse Wolf outdoor pro wall hoods with stainless construction, blower options, LED lighting, and heat safety sensors for outdoor kitchens.`

## Navigation and legacy paths

- Updated only Outdoor > Ventilation in `src/lib/site-data.ts` to target `/outdoor/ventilation`.
- Desktop `MegaMenu` and `MobileMenu` initialize with Outdoor open on the canonical route; desktop selects Ventilation from the Outdoor submenu.
- `/products/outdoor?default.categories=outdoor%2Fventilation` permanently redirects to `/outdoor/ventilation`.
- `/products/outdoor/ventilation` permanently redirects to `/outdoor/ventilation`.
- Unfiltered `/products/outdoor` continues to `/cooking/outdoor`, and indoor `/cooking/ventilation` remains independent.

## Reference and implementation

- The live USA filtered and fallback URLs geo-routed the Thailand browser session to the international selector. The supplied content brief and the already USA-reference-matched Outdoor Grills, Side Burners, Refrigeration, and Wolf Outdoor Cooking implementations were therefore used as the first-pass visual and spacing baseline.
- Reused the established outdoor-kitchen hero and the existing AEM Outdoor Pro Wall Hood product cutout.
- The first pass used three separate model cards. The supplied `333.png` reference clarified that the USA filtered PLP uses one Outdoor Pro Wall Hood family card with 36, 48, and 60-inch widths and a `1 / 3` image counter, so the page now follows that structure.
- The reference refinement changed the H1 to `All Outdoor`, reduced filters to Series and Width, and removed the extra category strip, Ventilation group heading/copy, feature band, card CTA/spec rows, and related-category section.
- The remaining sequence now matches the reference: hero, `All Outdoor` intro, filters and selected Ventilation chip, one family card, `Viewing 1 of 1`, outdoor statement, and the shared Discover more composition.

## Typography and browser QA

- Desktop H1: 60px.
- Product group and statement headings: 40px.
- Desktop product card titles: 24px.
- Category and filter labels: 13px.
- Browser QA used full CDP measurements plus viewport screenshots at desktop and 390px mobile.
- Desktop measured 1265px client/scroll width; mobile measured 390px client/scroll width, so neither viewport had horizontal page overflow.
- The original CDP pass confirmed the 60px desktop H1, 24px desktop card title, selected Ventilation state, and loaded product imagery. A new browser comparison is recorded after the `333.png` refinement.
- Post-refinement CDP confirmed `All Outdoor`, exactly one product-family card, the `1 / 3` counter, widths 36/48/60 inches, `Viewing 1 of 1`, and the reference section order. It also confirmed the removed sections are absent.
- The refined desktop measured 1425px client/scroll width with a 60px H1 and 24px card title. The 390px mobile override measured 375px client/scroll width with a 46px H1 and 20px card title; the product image loaded and neither viewport overflowed horizontally.
- The refined page produced no browser console errors.
- Desktop mega menu opened at Outdoor with the Ventilation visual/link; mobile opened directly in Outdoor and marked Ventilation current at `/outdoor/ventilation`.
- Both legacy URLs returned 308 with `location: /outdoor/ventilation`.
- Protected sibling routes returned 200: `/outdoor/grills`, `/outdoor/side-burners`, `/outdoor/refrigeration`, and `/cooking/ventilation`.

## Verification

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed after Prisma generation was permitted to update its client files in `node_modules`.
- Build produced the `/outdoor/ventilation` static route. The only build warning was the existing unsupported AVIF optimization warning for the unrelated French Door asset.

## TODO

- None for the first reference-matched pass.
