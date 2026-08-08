# Wolf Induction Cooktops Listing

Updated: 2026-08-08

## Route and scope

- Canonical route: `/cooking/cooktops-rangetops/induction-cooktops`
- Route file: `src/app/cooking/cooktops-rangetops/induction-cooktops/page.tsx`
- Page component: `src/components/ProductPages/InductionCooktopsPage.tsx`
- Legacy `/products/cooking/induction-cooktops`, `/products/cooking/contemporary-induction-cooktops`, and `/products/cooking/transitional-induction-cooktops` permanently redirect to the canonical route.

## Navigation

- Updated only Cooking > Cooktops & Rangetops > Induction Cooktops in `src/lib/site-data.ts`.
- Updated the matching Induction Cooktops link on the parent Cooktops & Rangetops page.
- Existing Mega Menu pathname handling already opens Cooking and Cooktops & Rangetops for nested `/cooking/cooktops-rangetops/...` routes.
- The existing Induction Cooktops mega-menu visual already uses the correct black cooktop in a dark-stone Wolf kitchen, so no menu rendering logic or unrelated menu categories changed.

## Listing pattern and USA comparison

- Reused the established Wolf Cooktops & Rangetops listing hierarchy: dark media hero, 1440px category strip, split category introduction, compact filters, selected-filter chip, three-column product grid, statement, and Discover more.
- Product groups match the filtered USA listing: Contemporary Induction Cooktop (30/36 inches, 4/5 zones, black), Transitional Induction Cooktop (30/36 inches, 4/5 zones, stainless steel), and Transitional Framed Induction Cooktop (15/24/30/36 inches, 2/3/4/5 zones, stainless steel).
- Product and related-category visuals use Wolf Adobe AEM assets already established in the project.
- Browser developer tooling measured the live USA desktop typography at 60px for the category H1, 40px for group/statement headings, 24px for product-card titles, and 13px for filter controls. Mobile scales the H1 to 46px and card titles to 20px.
- The supplied USA/local comparison was used for a second refinement: removed the redundant visible product-group intro, card CTA buttons, and statement CTA buttons; changed the first filter to `Series (1)`; added the reference card-top breathing room; and restored the Sub-Zero/Cove `Discover more` section.

## Verification

- Scoped ESLint passed for every changed source file.
- The unqualified `npm.cmd run lint` remains blocked by pre-existing generated `.next-*` output that the project-level ESLint command scans; reported violations are in generated bundles, not the changed source files.
- `npm.cmd run build` remains blocked in the existing Prisma prebuild step by the Windows file lock on `node_modules/.prisma/client/index.js` (`EPERM`) before Next.js compilation begins.
- Browser checks passed at 1440px desktop and 390px mobile with no horizontal overflow.
- Browser checks verified the metadata, three product groups, all product and related-category images, desktop/mobile typography, parent route, legacy redirect, active Cooking/Cooktops & Rangetops menu hierarchy, and the canonical Induction Cooktops menu link.
