# Work Summary

Updated: 2026-07-22

## Project State

- Project path: `C:\Codex projects\zub-zero`
- Stack: Next.js 16.2.9 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Prisma 7, MySQL.
- Public site language: English only.
- Deployment target in current notes: Plesk Node.js / Passenger with `app.js` as startup file.
- Main source documents:
  - `PROJECT_BRIEF.md`
  - `2002605_WIREFRAME NEW SUBZEROWOLF-SEA.COM.docx`
  - `บันทึก.md`
- Important rule: before changing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` because this repo uses Next.js 16 and the local docs are the source of truth.

## Current Implementation

- Global shell is in place:
  - `src/app/layout.tsx`
  - `src/components/Header/Header.tsx`
  - `src/components/Footer/Footer.tsx`
  - `src/components/MegaMenu/MegaMenu.tsx`
  - `src/components/MobileMenu/MobileMenu.tsx`
  - `src/components/SearchOverlay/SearchOverlay.tsx`
- Main home route exists at `/` with hero, brand showcase, showroom journey, videos, trust, design gallery, and experience sections.
- Refrigeration polished routes exist:
  - `/refrigeration/discover-sub-zero`
  - `/refrigeration/classic-series`
  - `/refrigeration/designer-series`
  - `/refrigeration/pro-series`
  - `/refrigeration/wine-storage`
  - `/refrigeration/undercounter`
  - `/refrigeration/ice-makers`
  - `/refrigeration/french-door`
  - `/refrigeration/side-by-side`
  - `/refrigeration/over-and-under`
  - `/refrigeration/column-refrigeration`
  - `/refrigeration/column-freezer`
  - `/refrigeration/outdoor`
- Catalog/admin scaffold exists:
  - `/products`
  - `/products/[...slug]`
  - `/admin`
  - API routes for journal, products, and showrooms.
- Static scaffold pages exist:
  - `/inspiration`
  - `/journal`
  - `/our-story`
  - `/showroom`
  - `/showroom/appointment`
  - `/showroom/dealers`
  - `/support`
  - `/trade`

## Latest Focus

Wolf Gas Cooktops listing completed:

- Added `/cooking/cooktops-rangetops/gas-cooktops` as the canonical Wolf Gas Cooktops filtered listing.
- Reused the established Wolf listing hierarchy with a dark Wolf cooking hero, Cooktops & Rangetops category strip, selected Gas Cooktop filter, four reference-matched model-group cards, specification summaries, confidence statement, and Discover more.
- Updated only Cooking > Cooktops & Rangetops > Gas Cooktops navigation and the matching parent-page links.
- Added a permanent redirect from `/products/cooking/gas-cooktops`.
- Typography baseline: 60px category heading, 44px product-group/statement headings, 20px card titles, and 13px filters.
- Scoped source lint passed; direct Next compilation passed before the existing Prisma client export issue stopped the project-wide type-check.
- Detailed implementation and verification notes are in `docs/COOKING_GAS_COOKTOPS_NOTES.md`.

Wolf Speed Ovens listing completed:

- Added `/cooking/built-in-ovens/convection-speed` as the canonical Wolf Convection Speed Oven filtered listing.
- Reused the established convection/steam listing hierarchy with the exact static USA `Faster heat, better airflow` hero image, category strip, selected Speed Oven filter, five model cards, confidence statement, related oven categories, and shared Discover more cards.
- Updated only Cooking > Built-in Ovens > Convection Speed navigation and added permanent redirects from the former query-string listing, `/cooking/built-in-ovens/speed`, `/products/cooking/convection-speed-ovens`, and `/products/cooking/speed-ovens`.
- Browser checks passed at 1440px desktop and 390px mobile: 60px category title, 44px group/statement titles, 20px card titles, 13px filters, five loaded product images, and no horizontal overflow.
- `npm.cmd run lint` passed. Standard build remains blocked before compilation by the existing Windows Prisma client lock; direct Next compilation passed, then the existing missing `PrismaClient` export stopped the project-wide type-check.
- Detailed implementation notes are in `docs/COOKING_SPEED_OVENS_NOTES.md`.

Wolf Convection Steam Ovens listing completed:

- Added `/cooking/built-in-ovens/convection-steam` as the canonical Wolf Convection Steam Oven filtered listing.
- Reused the established Convection listing proportions and now uses the exact static USA `Faster heat, better airflow` hero asset.
- Matched the supplied USA capture with the selected Convection Steam Oven filter, five cards in USA order, 24/30-inch widths, finish and plumbed-optional summaries, the confidence statement, and the shared Sub-Zero/Cove `Discover more` cards.
- Updated only Cooking > Built-in Ovens > Convection Steam navigation and the matching parent-page CTA.
- Added a permanent redirect from `/products/cooking/convection-steam-ovens`.
- Browser checks passed at desktop and 390px mobile with no horizontal overflow; metadata, parent route, mega-menu state, and the legacy redirect were verified.
- Detailed implementation notes are in `docs/COOKING_CONVECTION_STEAM_OVENS_NOTES.md`.

Wolf Built-In Ovens convection listing completed:

- Added `/cooking/built-in-ovens/convection` as the canonical filtered Wolf Built-In Ovens listing for Single Oven and Double Oven convection models.
- Refined the page against the supplied USA and local full-page PDF captures: full-height media hero, USA category strip and intro, Series/Width/Finish filters, exactly 10 convection product cards in a three-column desktop grid, the light confidence statement, and the two-card Discover more section.
- Updated only Cooking > Built-in Ovens > Convection navigation and the parent Built-In Ovens convection CTA to use the canonical route.
- Added a permanent redirect from `/products/cooking/convection-ovens` to the canonical route.
- Listing proportions now match the supplied 1905px reference: a 1392px listing canvas, 1440px category strip, 60px desktop category heading, 20px model titles, and enlarged product renders.
- Browser checks passed at desktop and 390px mobile with no horizontal overflow; the static USA hero asset, mega-menu state, parent route, metadata, and the 308 legacy redirect were verified.
- `npm.cmd run lint` passed. Standard build is blocked before compilation by the existing Windows Prisma client file lock; direct Next compilation completed successfully before the existing Prisma client export prevented the project-wide type-check.
- Detailed implementation and verification notes are in `docs/COOKING_CONVECTION_OVENS_NOTES.md`.

Wolf Built-In Ovens landing page completed:

- Added `/cooking/built-in-ovens` as the canonical Wolf editorial landing page with the USA-reference hero, three alternating oven-family stories, E/M Series promos, detailed comparison overview, Built-In Ovens inspiration gallery, related editorial content, complete-kitchen tiles, and shared pre-footer CTAs.
- Added a permanent redirect from `/products/cooking/built-in-ovens` and made the mega menu initialize with Cooking > Built-in Ovens active on the canonical route.
- Matched the restrained desktop type hierarchy used by the reference: 76px hero title, 44px oven-family headings, 30px promo headings, 28px comparison headings, and 13px CTA labels; responsive mobile checks keep the page free of horizontal overflow.
- Detailed page notes and verification status are recorded in `docs/COOKING_BUILT_IN_OVENS_NOTES.md`.
- Refined the page against the second 1920px comparison capture: removed the extra early showroom card and duplicate CTA band, expanded the comparison from four to eight specification rows, widened the editorial canvas to 1392px, and replaced the generic range gallery with the nine Built-In Ovens assets from the USA markup.

Wolf Gas Range listing completed:

- Added `/cooking/ranges/gas` as the canonical Wolf Gas Range listing/filter route.
- Added the USA-reference full-height hero, Ranges category strip, selected Gas Range filter, GR Series family card, aggregate specifications, confidence copy, showroom/brochure CTAs, and related discovery content.
- Extracted the repeated listing shell into `WolfRangeCategoryPage` so Gas, Dual Fuel, and Induction share the same visual and responsive pattern.
- Updated only Cooking > Ranges > Gas Ranges navigation and added a permanent redirect from `/products/cooking/gas-ranges`.
- Browser checks passed at desktop and 390px mobile with no horizontal overflow. Measured typography is 60px for the category heading, 24px for the product-card title, and 14px for filter controls.
- `npm.cmd run lint` passed. Standard build remains blocked before compilation by the existing Windows Prisma client file lock; direct Next compilation passed.

Wolf Dual Fuel Range listing completed:

- Added `/cooking/ranges/dual-fuel` as the canonical Wolf Dual Fuel listing/filter route.
- Added a USA-inspired full-height hero, cooking category navigation, restrained listing typography, 14px filter controls, a single aggregate Dual Fuel family card, product specification summary, confidence statement, and two-card Discover More section.
- Updated only the Cooking > Ranges > Dual Fuel navigation entry and made the mega menu initialize with Cooking and Ranges active on `/cooking/ranges/...` routes.
- Kept `/cooking/ranges/dual-fuel` as the canonical filtered listing, while the legacy `/products/cooking/dual-fuel-ranges` URL now returns to the main `/cooking/ranges` landing page.
- Reference measurements and implementation notes are recorded in `docs/COOKING_DUAL_FUEL_RANGES_NOTES.md`.

Wolf Ranges landing page completed:

- Added `/cooking/ranges` with USA-reference hero, intro, showroom, Dual Fuel, Induction, Gas, top-down configurations, design options, Why Wolf, brochure, and showroom CTAs.
- Updated the Cooking menu, Wolf discovery page, and footer range links to `/cooking/ranges`.
- Added permanent redirects from `/products/cooking/ranges` and `/products/cooking/dual-fuel-ranges` to the canonical route.
- Matched the USA desktop typography measurements: 80px hero heading, 60px section headings, and 18px intro copy at approximately 912px width; mobile remains responsive without horizontal overflow.
- Refined the page against the supplied full-page USA capture with the light editorial layout, alternating top-down range families, comparison overview, compact showroom/product features, inspiration gallery, and related-content cards.
- Latest Wolf Ranges pass added the compact USA showroom-experience card, changed the primary CTA to `Explore the Wolf Range`, and locked measured desktop typography to 80px/60px (mobile 56px/42px).
- Browser smoke tests passed for desktop, mobile, zero horizontal overflow, and the legacy redirect. Source lint passed with `.next-codex` excluded. The standard build remains blocked by a Windows lock in `node_modules/.prisma`; direct Next compilation succeeded, then type-check stopped because the locked Prisma client has no generated `PrismaClient` export.
- Added `/cooking/ranges-induction` as the dedicated Wolf Induction Ranges route. Replaced the generic dark catalog scaffold with the USA-inspired light listing, real Transitional/Professional product cards, filtering, confidence content, and Discover more. Updated the Cooking menu and Wolf Ranges Induction CTAs, with a permanent redirect from `/products/cooking/induction-ranges`.

Wolf Cooktops and Rangetops landing page completed:

- Added `/cooking/cooktops-rangetops` with the USA-reference video hero, showroom experience, Gas Rangetops options, Gas Cooktops, Induction Cooktops, comparison overview, showroom journey, and interactive inspiration gallery.
- Updated the Cooking menu and footer link to the canonical route; the mobile submenu also includes a direct overview link.
- Added a permanent redirect from `/products/cooking/cooktops-rangetops`.
- Browser checks passed at desktop and 390px mobile with no broken images or horizontal overflow. Typography is restrained to 60px/42px for the desktop hero/product headings and 42px/36px on mobile.
- The hero uses the USA AEM video and poster with a 44–48px accessible play/pause control that remains clear of the headline and CTA.
- `npm.cmd run lint -- --ignore-pattern '.next-*/**' --ignore-pattern '.tmp/**'` passed. `npm.cmd run build` passed; the only warning is the existing unrelated Turbopack AVIF optimization warning.
- Detailed notes are in `docs/COOKING_COOKTOPS_RANGETOPS_NOTES.md`.

The latest verified work closed the Refrigeration category batch:

- `/refrigeration/french-door`
- `/refrigeration/side-by-side`
- `/refrigeration/over-and-under`
- `/refrigeration/column-refrigeration`
- `/refrigeration/column-freezer`
- `/refrigeration/outdoor`

This batch uses `src/components/ProductPages/RefrigerationCategoryPage.tsx` as the shared category/listing pattern and `src/components/ProductPages/DetailedProductCard.tsx` for product cards. Navigation in `src/lib/site-data.ts` now points these menu items to `/refrigeration/...` paths.

Verification on 2026-07-19:

- `npm.cmd run lint` passed.
- `npm.cmd run build` passed.
- Build generated all current routes successfully.
- Build warning only: Turbopack does not optimize the imported local AVIF hero image, but it still emits successfully.

The previous detailed visual work focused on `/refrigeration/wine-storage` in `src/components/ProductPages/WineStoragePage.tsx`.

Completed there:

- Matched the page flow much more closely to the USA reference.
- Added two-slide layered image section:
  - `Exceptional preservation`
  - `Endless design possibilities`
- Tuned layered title size and locked titles to two lines.
- Reworked `Crafted for connoisseurs` section and feature row layout.
- Rebuilt `Complements any space` into a two-image overlapping media break with caption.
- Added a Wine Storage-specific showroom card so shared home/showroom components are not affected.
- Added scroll-driven expanding media / tension zoom section.
- Replaced static model cards with carousel-style Wine Storage model gallery.
- Matched `Enhance any space in your home`, `Complete your kitchen`, and `More to discover` sections to the reference flow.

Last recorded verification for Wine Storage:

- `npm run lint` passed.
- `npm run build` passed.
- Browser/DOM checks confirmed the expected layout, section order, image assets, scroll behavior, and card counts.

## Work Pattern To Preserve

- Work one page at a time unless the user explicitly asks for shared system work.
- Do not alter header/menu/shared components while tuning a single page unless the requested bug is global.
- Reuse a proven page pattern before inventing a new one:
  - Discover Sub-Zero layered images
  - Classic/Designer/Pro refrigerator model carousel
  - Wine Storage tension zoom
- Keep verification scoped:
  - For CSS/text/layout changes, run `npm run lint`.
  - Run `npm run build` after route/component changes or before deploy.
  - Use browser checks only for visual/scroll/interaction behavior.
- Avoid slow full-project exploration when a page target is known. Read that route file, its page component, shared components it imports, and relevant notes only.

## Open Work

- Browser-check the new Refrigeration category batch visually against the French Door pattern and USA category references.
- Fill real model data/assets for Refrigeration category cards where seed/config data is still provisional.
- Build real Cooking/Wolf pages.
- Build full Outdoor/Wolf cooking pages beyond the current Sub-Zero outdoor refrigeration category.
- Expand Owner Resources, Professionals, Journal/Culinary, and Regional Experience subpages.
- Convert scaffold forms/API into real persistence and validation.
- Connect Prisma/MySQL data to admin and public catalog.
- Define CSV import format for product data.
- Add authentication and role protection for `/admin`.
- Add real SEO/AEO management screens and structured data output.
