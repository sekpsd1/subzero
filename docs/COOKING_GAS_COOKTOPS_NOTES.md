# Wolf Gas Cooktops Listing

Updated: 2026-08-08

## Route and scope

- Canonical route: `/cooking/cooktops-rangetops/gas-cooktops`
- Route file: `src/app/cooking/cooktops-rangetops/gas-cooktops/page.tsx`
- Page component: `src/components/ProductPages/GasCooktopsPage.tsx`
- Legacy `/products/cooking/gas-cooktops` permanently redirects to the canonical route.

## Navigation

- Updated only Cooking > Cooktops & Rangetops > Gas Cooktops in `src/lib/site-data.ts`.
- Updated the matching Gas Cooktops links on the parent Cooktops & Rangetops page.
- Existing Mega Menu pathname handling already initializes Cooking and Cooktops & Rangetops for nested `/cooking/cooktops-rangetops/...` routes, so no menu logic changed.

## Listing pattern and USA comparison

- Reused the established Wolf Convection Steam/Speed listing hierarchy: media hero, 1440px category strip, split category introduction, compact filters, selected-filter chip, three-column product grid, statement, and Discover more.
- Added the four Gas Cooktop model groups shown in the supplied Wolf listing: CGC, CGP, CGT, and CGTF, with width, burner configuration, stainless finish, and fuel type summaries.
- Compared the supplied USA reference captures with the supplied localhost captures, then matched the darker USA induction-kitchen hero, listing order, card proportions, six-pixel desktop column gutters, filter spacing, split-introduction alignment, and direct-to-grid layout.
- Product-card details follow the supplied live markup: 24px desktop titles, 13px specification tables with 50/50 columns, stacked burner values, title-case `Fuel Type`, and no redundant detail CTA because the complete card is already a link.
- The lower statement matches the reference without showroom/brochure buttons, and the unrelated-category block was removed so `Discover more` follows immediately.
- `Discover more` uses the exact images and Cove destination from the live `/fragments/common/discover-brands-sz-c` fragment.
- Product media for CGC, CGP, CGT, and CGTF uses the exact Adobe AEM asset identifiers supplied from the live Wolf product-grid markup; the legacy CSS enlargement was removed for these assets.
- The MMTF card was removed because it is absent from both the supplied four-product markup and the visual reference.
- The live USA URL displayed its international-region interstitial from Thailand, so the supplied full-page USA capture and product-grid markup remained the primary references.
- Desktop typography baseline: 60px category title, 44px product-group and statement headings, 20px product-card titles, and 13px filter labels.
- Mobile uses a 46px category title, 38px statement headings, 20px card titles, a fixed-height cropped hero, and responsive one/two-column cards without oversized text.

## Verification

- `npm.cmd run lint -- --ignore-pattern '.next*/**' --ignore-pattern '.tmp/**'` passed. The unqualified lint command still scans old generated `.next-*` output and reports generated-code violations.
- Standard `npm.cmd run build` is blocked before compilation by the existing Windows Prisma client file lock (`node_modules/.prisma/client/default.js`).
- Direct `npx.cmd next build` compiled the application successfully, then the existing missing `PrismaClient` export stopped the project-wide type-check in `src/lib/prisma.ts`.
- Browser checks passed at 1920px desktop and 390px mobile with no horizontal overflow. Measured typography is 60px/46px for the category title, 44px/38px for the statement heading, 20px for card titles, and 13px for filters.
- Browser smoke tests verified all four model groups, loaded visible product media, active Cooking and Cooktops & Rangetops mega-menu states, the canonical parent link, metadata, and the legacy redirect.
