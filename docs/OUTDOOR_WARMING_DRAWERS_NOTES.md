# Outdoor Warming Drawers Notes

Updated: 2026-08-11

## Implementation

- Canonical route: `/outdoor/warming-drawers`.
- Route metadata: `Outdoor Warming Drawers | Wolf` with the requested outdoor-rated construction description.
- Listing composition: shared premium outdoor-kitchen hero, `All Outdoor` intro, selected Warming Drawer filter, one compact WWDO / WWD30O card with Width, outdoor statement, and Discover more.
- Product imagery uses the existing Wolf AEM WWDO asset already used by the Outdoor Cooking implementation. The shared hero and Discover more assets follow the existing USA-matched Outdoor pages.

## Navigation and redirects

- Changed only Outdoor > Warming Drawers to `/outdoor/warming-drawers` in `src/lib/site-data.ts`.
- Desktop Mega Menu initializes Outdoor with Warming Drawers active on the canonical route.
- Mobile Menu initializes Outdoor and marks Warming Drawers current on the canonical route.
- `/products/outdoor?default.categories=outdoor%2Fwarming-drawers` permanently redirects to the canonical route before the unfiltered `/products/outdoor` fallback.
- `/products/outdoor/warming-drawers` permanently redirects to the canonical route.
- Indoor `/products/cooking/drawers` remains independent and still redirects to `/cooking/drawers`.

## Reference and visual QA

- The requested live USA filtered page geo-routed the Thailand Browser session to the international selector. The supplied content brief plus the already USA-matched Outdoor Grills, Side Burners, Refrigeration, and Ventilation implementations were used as the fallback reference.
- Desktop Browser check: 60px `All Outdoor` H1, 40px Warming Drawer group heading, 24px product-card title, 13px filters; all product/editorial images loaded and the page had no horizontal overflow.
- Mobile Browser/CDP check at 390 x 844: 46px H1, 36px group heading, 20px card title, no horizontal overflow, Warming Drawers current in the mobile menu, and the 1024px WWDO source image loaded.
- Desktop and mobile captures are stored at the project root as `outdoor-warming-drawers-desktop.png`, `outdoor-warming-drawers-mobile-top.png`, `outdoor-warming-drawers-mobile-menu.png`, and `outdoor-warming-drawers-mobile-card.png`.

## Verification

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed after rerunning outside the sandbox so Prisma could regenerate its Windows-locked client. Next.js compiled, type-checked, and prerendered all 65 pages.
- Existing non-blocking Turbopack warning remains for an unrelated French-door AVIF asset.
- Smoke checks returned 200 for the canonical page and existing Outdoor Grills, Side Burners, Refrigeration, and Ventilation pages. `/products/cooking/drawers` still resolves to `/cooking/drawers` with 200.

## TODO

- No known page-specific TODO for the first reference-aligned pass.

## 555 / 666 refinement

- Compared supplied `555.png` (USA reference) with `666.png` (local).
- Removed the local-only Outdoor category strip and Warming Drawer group intro.
- Simplified the WWDO card to the USA listing form: product image, title, and Width only. Removed the model label, extended specification rows, and card CTA pills.
- Returned the product card to the left edge of the listing grid and reduced the excess vertical space before the outdoor statement.
