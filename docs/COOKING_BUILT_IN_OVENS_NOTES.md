# Wolf Built-In Ovens Notes

Updated: 2026-07-22

## Scope

- Canonical route: `/cooking/built-in-ovens`
- Legacy redirect: `/products/cooking/built-in-ovens` -> `/cooking/built-in-ovens` (permanent)
- Route component: `src/app/cooking/built-in-ovens/page.tsx`
- Page component: `src/components/ProductPages/WolfBuiltInOvensPage.tsx`

## USA Reference Pass

- Kept the supplied full-page capture order: hero and intro, Convection, Convection Steam, Convection Speed, E/M Series, overview, showroom journey, inspiration, editorial cards, Complete Your Kitchen, and pre-footer.
- Used the supplied Adobe AEM Wolf oven video/poster and product imagery from the USA markup.
- Added the USA-style 60px hero video play/pause control with a live circular progress ring and accessible pressed/label states.
- The live USA URL redirected the Thailand browser session to the international selector, so the supplied full-page capture and HTML were used as the authoritative page reference.
- Added all eight USA comparison rows for each oven family instead of a shortened four-row overview.
- The second 1920px comparison pass removed the extra early showroom card and duplicate page-level CTA band, widened the lower editorial canvas from 1120px to 1392px, and replaced the generic Wolf Range gallery with all nine Built-In Ovens gallery assets from the supplied markup.

## Navigation

- `src/lib/site-data.ts` already had the canonical `/cooking/built-in-ovens` href, so no seed-data change was needed.
- `src/components/MegaMenu/MegaMenu.tsx` now initializes Cooking and Built-in Ovens as active for the canonical route.

## Typography

- Desktop hero title: 76px.
- Oven-family headings: 44px desktop, 38px mobile.
- E/M promo headings: 30px.
- Overview product headings: 28px.
- CTA labels: 13px.
- Larger 52px serif headings are limited to major editorial sections.

## Verification

- Desktop at 1920px: route renders at 11,132px tall versus the 11,565px USA capture, with 16 loaded page images, eight overview rows per column, correct section order, and zero horizontal overflow.
- Mobile at 390px: verified 52px hero title, 38px oven-family headings, correct stacking, and zero horizontal overflow.
- Mega menu: verified the canonical Built-in Ovens link, active Cooking/Built-in Ovens panel, and Convection/Steam/Speed destinations. The mobile Cooking > Built-in Ovens branch also exposes the correct destinations.
- Legacy redirect: verified `/products/cooking/built-in-ovens` resolves to `/cooking/built-in-ovens` with the expected page title.
- Source-only ESLint passed for the new route/component and touched navigation/redirect files.
- Full `npm.cmd run lint` is blocked by the existing ESLint ignore gap for the active `.next-codex` cache; it reports generated bundle findings rather than source findings.
- Standard `npm.cmd run build` is blocked before compilation by the existing Windows Prisma client lock. A direct Next build using an isolated dist directory compiled successfully, then stopped at the known missing generated `PrismaClient` export during project-wide type checking.
