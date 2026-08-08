# Wolf Cooktops and Rangetops View All

Updated: 2026-08-08

## Route and navigation

- Canonical route: `/cooking/cooktops-rangetops/gas-rangetops`.
- Editorial parent remains `/cooking/cooktops-rangetops`.
- Cooking > Cooktops & Rangetops > Gas Rangetops points to the canonical route in `src/lib/site-data.ts`.
- Added 308 permanent redirects from the former `/cooking/cooktops-rangetops/view-all`, misspelled `/cooking/cooktops-rangetops/das-rangetops`, and `/products/cooking/cooktops-rangetops/view-all` paths.
- Existing Mega Menu pathname handling already activates Cooking and Cooktops & Rangetops for nested routes; no Header, Footer, Search, or menu-state logic changed.

## Listing pattern and USA comparison

- Reused the existing Gas Cooktops/Wolf listing hierarchy: media hero, 1440px category strip, split category introduction, compact filter row, grouped product cards, statement, CTAs, and Discover more.
- The live USA URL redirects Thailand visitors to the international landing page, matching the limitation already recorded for the parent route. The supplied USA structure/copy and the established USA-measured listing proportions were therefore the source of truth.
- Product groups and model families: Gas Rangetops (SRT), Gas Cooktops (CGP, CGTF, CGT, CGC, MMTF), and Induction Cooktops (CI60C, CI60T, CITF).
- Reused real Wolf AEM kitchen and product imagery already present in the Cooktops & Rangetops implementation.
- Typography: 60px desktop/46px mobile H1, 44px desktop/38px mobile group and statement headings, 20px card headings, and 13px filter labels.
- Refined against the supplied full-page USA/local captures: replaced the bright hero with an official Wolf dark-stone kitchen image, shortened product media areas, added USA carousel counts, corrected SRT/MMTF and induction specifications, and removed listing-only text/statement buttons absent from the USA capture.

## Verification

- Browser desktop/mobile checks confirmed metadata, content order, all nine product groups, all visible/lazy-loaded product assets, horizontal category navigation, CTAs, and no horizontal overflow.
- Desktop and mobile menus expose the canonical Gas Rangetops link; the desktop Mega Menu initializes Cooking and Cooktops & Rangetops on the nested route.
- Parent route and both legacy parent/view-all redirects were smoke tested.
- Scoped ESLint passed for all changed source files.
- `npm.cmd run lint` reported no diagnostics before timing out after 120 seconds while scanning existing generated folders.
- `npm.cmd run build` remains blocked before compilation by the existing Windows Prisma client file lock (`node_modules/.prisma/client/index.js`).
- Direct `npx.cmd next build` compiled successfully, then the existing missing `PrismaClient` export stopped the project-wide type-check in `src/lib/prisma.ts`.

## TODO

- No page-specific functional TODO remains. Product detail destinations remain the project’s generic product-route scaffold until dedicated PDPs are implemented.
