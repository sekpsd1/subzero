# Wolf Ventilation Listing Notes

## Route and scope

- Route: `/products/cooking/ventilation`
- Added a dedicated static page over the existing `/products/[...slug]` fallback so other product and category routes remain unchanged.
- Added `WolfVentilationPage` as a data-driven listing component.

## Navigation

- The existing Cooking > Ventilation href already pointed to `/products/cooking/ventilation`.
- Mega-menu route initialization now opens Cooking and marks Ventilation active on this path.
- No other menu category paths were changed.

## USA comparison

- Captured and inspected the live USA page at `/cooking/view-all-cooking/ventilation` before implementation.
- Matched the full-width dark hood hero, horizontal Cooking category strip, split title/intro layout, compact filter row, group order, one/two/three-column card behavior, and final extraction statement.
- Refined the supplied full-page comparison by removing local-only model labels and per-card CTA rows, allowing the USA card proportions to determine row height, restoring the complete extraction copy, and adding the reference `Discover more` section before the shared showroom band.
- Matched the supplied above-the-fold capture by sizing the desktop hero to the larger of the viewport or its 16:9 media ratio, while positioning the hero statement relative to the viewport so it remains visible at the same lower-edge position as USA.
- Product groups: Downdraft, Ceiling-Mounted Hood, Island Hood, Wall Hood, and Hood Liner.
- Cards use the live USA AEM hero and product assets for DD, VC, VI, PI3418, PW2210, PW2418, PW2718, PWC2418, PWO3318, VW, PL1912, and PL2212.

## Typography

- USA desktop measurements: 60px H1, 40px group and statement headings, 24px product-card titles, and 14px filters.
- Mobile scales to 46px H1, 36px group headings, and 22px card titles to prevent wrapping and overflow.

## Verification

- Scoped ESLint passed for the new route/component and the updated mega menu.
- Full `npm.cmd run lint` is blocked by existing generated `.next-built-in-ovens` artifacts being included in the lint scan.
- Standard `npm.cmd run build` is blocked before compilation by the existing Windows Prisma client file lock (`EPERM` on `node_modules/.prisma/client/index.js`).
- Direct Next compilation completed successfully; the project-wide type-check then stopped on the existing missing `PrismaClient` export in `src/lib/prisma.ts`.
- Browser smoke tests passed at desktop and 390px mobile: metadata, 12 product cards, all AEM images, section order, CTA links, menu active state, and zero horizontal overflow were verified.

## TODO

- Product detail hrefs currently use the corresponding USA-style local slugs and will fall through to the existing product detail scaffold until dedicated product pages are implemented.
