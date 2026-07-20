# Cooking Gas Ranges Notes

Updated: 2026-07-20

## Route and navigation

- Canonical route: `/cooking/ranges/gas`.
- Cooking > Ranges > Gas Ranges links to the canonical route on desktop and mobile.
- Legacy `/products/cooking/gas-ranges` permanently redirects to the canonical route.
- Header, footer, search, and menu behavior were not changed; only the relevant navigation href was updated.

## USA reference comparison

- Compared in Browser against the USA filtered Ranges listing with `Gas Range` selected at a 1440px desktop viewport.
- Matched the full-height Wolf range hero, nine-item cooking category bar, two-column Ranges intro, compact filter row, selected-filter chip, and one aggregate product-family card.
- Reused the current USA Gas Range AEM product image and hero asset.
- Added the GR Series label, 30/36/48/60-inch widths, burner configurations, natural gas/liquid propane, stainless finish, and gas convection oven summary.
- Added `View product details`, `Visit a showroom`, `Request a brochure`, and related range-category CTAs.

## Typography measurements

- USA/local desktop category heading: 60px.
- USA/local product-card title: 24px.
- USA/local filter controls: 14px.
- Mobile keeps the hero title at 30px and stacks filters/cards without horizontal page overflow.

## Verification

- Desktop Browser screenshot and DOM checks passed for the hero, category bar, filter state, and product card.
- Mobile Browser check passed at 390 x 844; document width matched viewport width and the Cooking > Ranges > Gas Ranges menu link was present.
- Smoke checks passed for `/cooking/ranges/gas`, `/cooking/ranges`, and the legacy redirect.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: blocked during `prisma generate` by `EPERM` on `node_modules/.prisma/client/default.js` before application compilation.
- Direct `next build`: Next application compilation passed; the known locked Prisma client remains the environment limitation.

## TODO

- Replace provisional regional model availability and the aggregate product-detail destination when the final SEA Gas Range catalog feed is available.
