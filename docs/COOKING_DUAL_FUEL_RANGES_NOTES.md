# Cooking Dual Fuel Ranges Notes

Updated: 2026-07-20

## Route and navigation

- Canonical route: `/cooking/ranges/dual-fuel`.
- Main range route remains `/cooking/ranges`.
- Cooking > Ranges child label is `Dual Fuel` and links to the canonical route.
- On `/cooking/ranges/...`, the desktop mega menu initializes with Cooking and Ranges active so the Dual Fuel tile is immediately available.
- Legacy `/products/cooking/dual-fuel-ranges` uses a permanent redirect to the canonical route.

## USA reference comparison

- Compared against the USA filtered listing and current Dual Fuel product configurator in Browser at a 1440px desktop viewport.
- Matched the light ivory listing mood, restrained rules, category navigation, selected-filter chip, and single family-card result.
- Reused live Wolf AEM hero, product, refrigeration, and dishwasher imagery.
- Included aggregate widths, fuel types, finishes, and rangetop configurations in the same result structure as the USA capture.

### Screenshot refinement — 2026-07-20

- Reworked the local page against the supplied full-page local/USA captures.
- Replaced the three individual model cards with the single USA-style `Dual Fuel Range` family card and aggregate width, configuration, finish, and fuel specifications.
- Removed the extra range-selector tiles, dark product CTA band, and three-card related-range section.
- Increased the hero to a full viewport presentation, reduced its title to 40px desktop, and restored all nine USA cooking-category tabs.
- Added the USA-style `Crafted for culinary confidence` statement and two-card `Discover more` section before the shared footer.

## Typography measurements

- USA category/listing heading: 40px, light weight.
- USA product-card title: 24px, light weight.
- USA filter labels: 14px, light weight.
- USA product configuration labels: 14–16px.
- Local page follows these sizes on desktop and scales only the hero and major editorial headings responsively.

## Verification

- Desktop Browser check passed for the listing layout, filter bar, cards, and mega-menu state.
- Refined desktop DOM check passed with one product family card, `Viewing 1 of 1`, the confidence statement, and two discovery cards.
- Mobile Browser/CDP check passed at 390 x 844 with a 390px document width and no horizontal overflow; the Cooking > Ranges > Dual Fuel path is available in the mobile menu.
- Smoke tests passed for `/cooking/ranges/dual-fuel`, `/cooking/ranges`, and the legacy redirect.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: blocked before compilation because Windows denied Prisma Client regeneration while `node_modules/.prisma/client` was locked.
- Direct `next build`: application compilation passed; type checking then failed because the locked Prisma client could not regenerate and therefore did not export `PrismaClient`. This is an environment/file-lock issue, not a page compilation error.

## TODO

- Replace provisional regional model availability with the final SEA catalog feed when it is available.
