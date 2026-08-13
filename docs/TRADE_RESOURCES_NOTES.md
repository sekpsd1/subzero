# Trade Resources

Updated: 2026-08-13

## Route and navigation

- Added the dedicated `/trade-resources` route.
- Updated `Professionals > Trade Resources` in the desktop mega menu to `/trade-resources`.
- Updated the shared Professionals navigation entry to `/trade-resources`; no unrelated page content was changed.

## Implementation

- Added `src/app/trade-resources/page.tsx`.
- Added `src/components/TradeResources/TradeResourcesPageContent.tsx` and its scoped CSS module.
- Added locally stored reference assets under `public/assets/trade-resources/`.
- Reused the existing Header and the compact Owner Resources footer/header presentation.
- Recreated the USA page structure: introduction, eight resource shortcuts, local resources, product specifications, three professional tools, representative finder, installation videos, Kitchen Design Contest gallery, professional links, and association logos.
- Refined the desktop top section against the supplied reference/local comparison: restored the Cove header mark, 1170px content divider, 970px shortcut grid, heading rules, breadcrumb alignment, and reference vertical rhythm.
- Refined the specification and Reveal sections against the second comparison: matched the 1140px dividers, search/helper spacing and persistent clear control, and the narrower reference text/image composition.
- Corrected the Kitchen Design Contest gallery to the reference order (Brighton House, Redwood Retreat, Texas Hill Country Home, Kenley Court Residence, Red Door Retreat, Centennial Park Residence) and matched its desktop gallery start offset.

## Navigation and forms

- Specification Library is a normal link. The remaining shortcuts smooth-scroll to focusable sections and respect `prefers-reduced-motion`; targets use `scroll-margin-top` so the fixed header does not cover them.
- Product search validates empty input, supports Enter, exposes accessible Search/Clear buttons, and sends valid queries to `/trade-resources/product-specifications?search=...`.
- The project has a static product API/catalog but no specification-document search backend. The page does not fabricate matches; the specification route is responsible for resolving the query.
- Representative search requires one representative type and a valid five-digit ZIP or ZIP+4. The project has no trade-representative locator backend, so a valid submission shows an honest unavailable state with the trade support phone number and a functional `Search Again` control. No representative records are fabricated.

## CTAs

- Local resources: `/locations`, `/locator#type=installer`.
- Tools: `/trade-resources/reveal`, `/trade-resources/brochure-maker/product-select`, `/trade-resources/specifications-app`.
- Installation and contest: `/trade-resources/installation-videos`, `/trade/kitchen-design-contest`.
- More resources: `/trade-resources/trade-shows`, `/trade-resources/continuing-education`, `/trade-resources/future-product-update`.
- The serial-number guide targets the USA reference PDF. Association links are external and use `noopener noreferrer`.

## Responsive and accessibility QA

- Reference measurements at 1920px: 54/54px H1, 36/42px section headings, and 18/22px shortcut headings. The local desktop page matches these values.
- Checked at 1920px, 1440px-equivalent desktop layout, 768px tablet, and 390px mobile. The mobile layout uses a two-column shortcut grid, stacked content rows, horizontally scrollable/snap-aligned contest gallery, and two-column association grid.
- Semantic headings, fieldsets/radios, live validation messages, meaningful image alt text, visible focus states, reduced-motion behavior, fixed image dimensions, responsive `sizes`, and lazy loading through `next/image` are present.
- Browser smoke test returned HTTP 200 at `http://127.0.0.1:3000/trade-resources`. Shortcut scrolling, empty product validation, Clear, representative-type validation, ZIP validation, unavailable state, and Search Again were exercised.
- Screenshots: `docs/screenshots/trade-resources-desktop-top.png` and `docs/screenshots/trade-resources-mobile-top.png`.

## Validation

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed; all 79 routes were generated, including `/trade-resources`. The only build warning is the pre-existing unrelated Turbopack AVIF warning for the Over-and-Under refrigeration asset.
- Backend limitation: specification search and representative lookup require production services not present in this repository.
