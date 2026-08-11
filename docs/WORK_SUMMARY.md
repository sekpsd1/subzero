# Work Summary

Updated: 2026-08-11

## Latest Focus: Outdoor Warming Drawers

- Added `/outdoor/warming-drawers` as the canonical Wolf Outdoor Warming Drawer listing for WWDO / WWD30O.
- Added the selected Warming Drawer filter, compact WWDO / WWD30O product card, outdoor statement, and Discover more content.
- Updated only Outdoor > Warming Drawers navigation; desktop and mobile menus now open Outdoor on this route and mark Warming Drawers current.
- `/products/outdoor?default.categories=outdoor%2Fwarming-drawers` and `/products/outdoor/warming-drawers` permanently redirect to the canonical route. Indoor `/products/cooking/drawers` continues to redirect independently to `/cooking/drawers`.
- The live USA page geo-routed the Thailand browser session to the international selector, so the supplied brief and the established USA-matched Outdoor listing pattern were used as the reference fallback. Browser QA passed at desktop and 390px mobile with loaded imagery and no horizontal overflow; lint and production build passed.
- Detailed notes are in `docs/OUTDOOR_WARMING_DRAWERS_NOTES.md`.
- Refined against the supplied `555.png` reference and `666.png` local capture: removed the extra category strip, product-group intro, model label, extended specifications, and card CTAs; the single WWDO card now starts at the left edge and follows the compact USA filtered-listing composition.

## Latest Focus: Outdoor Ventilation

- Added `/outdoor/ventilation` as the canonical Outdoor listing for the Wolf Outdoor Pro Wall Hood family in 36, 48, and 60-inch widths.
- Updated only Outdoor > Ventilation navigation; desktop and mobile menus now open Outdoor on this route and mark Ventilation current.
- Refined against the supplied `333.png` USA capture: the page now uses `All Outdoor`, Series/Width filters, one family card with a `1 / 3` counter and all three widths, the outdoor statement, and Discover more; the extra category strip, feature band, and related-category section were removed.
- `/products/outdoor?default.categories=outdoor%2Fventilation` and `/products/outdoor/ventilation` permanently redirect to the canonical route; unfiltered `/products/outdoor` and indoor `/cooking/ventilation` remain independent.
- The live USA page geo-routed the Thailand browser session to the international selector, so the supplied content brief plus the already USA-matched Outdoor listing implementations were used as the first-pass reference. Detailed QA status is in `docs/OUTDOOR_VENTILATION_NOTES.md`.

## Latest Focus: Outdoor Side Burners

- Added `/outdoor/side-burners` as the canonical Outdoor listing for Wolf Side Burner and Built-In Burner Module products.
- Added only Outdoor > Side Burners navigation; desktop and mobile menus now open Outdoor on this route and mark Side Burners current.
- Reused the reference-matched Outdoor Grills composition with the exact outdoor-kitchen hero, compact filters, BM13/SB13 AEM product cutouts, USA-matched Width/Fuel Type summaries, outdoor statement, and three-brand Discover more grid.
- `/products/outdoor?default.mnseries=Burner+Module%2CSide+Burner` and `/products/outdoor/side-burners` permanently redirect to the canonical route; the unfiltered `/products/outdoor` behavior remains unchanged.
- Browser QA confirmed the USA-reference type scale (60px H1, 40px group heading, 24px card titles), loaded product imagery, and no horizontal overflow at desktop or 390px mobile. ESLint and the production build passed; protected Outdoor/Cooking sibling routes remain 200.
- Detailed notes are in `docs/OUTDOOR_SIDE_BURNERS_NOTES.md`.

## Latest Focus: Outdoor Gas Grills

- Added `/outdoor/grills` as the canonical filtered Outdoor Gas Grill listing.
- Updated only Outdoor > Grilling to target the new route; desktop and mobile menus now open Outdoor on this route, with Grilling selected.
- Reused the established Outdoor listing composition: full outdoor-kitchen hero, `All Outdoor` introduction, selected Outdoor Gas Grill filter, Wolf grill card, outdoor statement, and three-brand Discover more grid.
- The existing `/cooking/outdoor`, `/outdoor/refrigeration`, and `/outdoor/discover-outdoor` routes remain unchanged.
- Browser QA passed at desktop and 390px mobile: Grilling points to `/outdoor/grills`, initializes current, imagery loads above the fold, and the page has no horizontal overflow. ESLint and the production build passed.
- Refined the page against `111.png`/`222.png` and the live USA page: the exact USA hero asset is now used, and the desktop product card, statement, and Discover more positions match the reference within roughly 1px. Mobile remains overflow-free; lint and build still pass.

## Latest Focus: Outdoor Refrigeration Navigation

- Added `/outdoor/refrigeration` as the canonical menu destination for Outdoor > Refrigeration, reusing the established Sub-Zero outdoor refrigeration listing.
- Desktop and mobile menus now open Outdoor automatically on this route and mark Refrigeration active.
- The refrigeration category selector now links Outdoor to the canonical route; `/refrigeration/outdoor` remains available as the existing route.
- Browser QA passed at desktop and 390px mobile, including a real menu click from Discover Outdoor to the canonical route. Full ESLint and the production build passed after generated `.next-*` output directories were excluded from lint and Prisma generation was run outside the sandbox.
- Refined the canonical page against the supplied `111.png` reference: it now has the outdoor-kitchen hero, `All Outdoor` intro, compact Refrigeration filter, two outdoor product cards, outdoor-specific statement, and the Sub-Zero/Wolf/Cove Discover more composition. The legacy `/refrigeration/outdoor` page remains unchanged.

## Latest Focus: Discover Outdoor

- Added the Outdoor brand/story landing at canonical `/outdoor/discover-outdoor`; legacy `/products/outdoor/discover-outdoor` permanently redirects to it.
- Recreated the USA editorial sequence with the outdoor-kitchen hero, feature highlights, Sub-Zero/Wolf product stories, inspiration, showroom, category overview, and Discover more cards using the USA AEM imagery.
- Updated only Outdoor > Discover Outdoor navigation and the related footer link. Desktop and mobile menus initialize with Outdoor open and Discover Outdoor active; View all outdoor continues to `/cooking/outdoor`.
- Browser QA at 1920px and 390px confirmed the measured USA type hierarchy (80px H1, 60px section headings, 40px feature headings), loaded imagery, and no horizontal overflow. The legacy redirect returns 308 while `/cooking/outdoor` and `/refrigeration/outdoor` remain independent 200 routes.
- Refined against the supplied `111.png`/`222.png` comparison: desktop media positions and sizes now track the USA capture within a few pixels, the first inspiration slide and right-edge preview are restored, category tiles use the original outline assets, and the Discover Wolf card uses the reference split layout.
- Detailed notes are in `docs/OUTDOOR_DISCOVER_NOTES.md`.

## Latest Focus: Cooking Accessories

- Added the reference-matched accessories landing page at canonical `/cooking/accessories`; legacy `/support/accessories` permanently redirects to it.
- Recreated the store tabs, three illustrated accessory categories, registered-product placeholder, model search, promotion, and certified parts/service sections without checkout or account logic.
- Updated only Accessories links across desktop/mobile navigation, Owner Resources, and the footer; the Cooking mega menu now initializes with Accessories active on the canonical route.
- Browser QA passed at 1280px desktop and 390px mobile with loaded imagery, no horizontal overflow, correct metadata, and a verified legacy redirect.
- Scoped ESLint passed. The direct Next production compile passed, then the existing broken/locked Prisma client stopped type-check; full details are in `docs/COOKING_ACCESSORIES_NOTES.md`.

## Latest Focus: Wolf Outdoor Cooking

- Added the dedicated Wolf Outdoor Cooking listing at canonical `/cooking/outdoor`; `/products/outdoor` permanently redirects to it while `/refrigeration/outdoor` remains the separate Sub-Zero category.
- Matched the USA structure with the outdoor-kitchen hero, active Cooking category strip, compact filters, Grills and Burners, Drawers, and Ventilation product groups, five real AEM product cards, reference statement, and Discover more cards.
- Updated only Cooking > Outdoor navigation and route-aware desktop/mobile menu state. Typography follows the measured USA baseline: 60px H1, 40px group/statement headings, 24px desktop card titles, and 14px filters.
- Verification status is recorded in `docs/COOKING_OUTDOOR_NOTES.md`.

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

## Latest Focus: Wolf Drawers

- Added the dedicated Wolf Drawers listing at canonical `/cooking/drawers`; `/products/cooking/drawers` now permanently redirects to it.
- Matched the live USA structure with the warming-drawer hero, active Cooking category strip, Series/Width filters, Warming Drawers and Vacuum Seal Drawers groups, three real AEM product cards, the reference statement, and Discover more cards.
- Updated Drawers links in the Cooking navigation, listing category strips, and footer to the canonical path. Desktop and mobile menus initialize at Cooking > Drawers on this route.
- Browser QA passed at 1920px desktop and 390px mobile with loaded imagery and no horizontal overflow. Reference typography is 60px H1, 40px group/statement headings, 24px desktop card titles, and 14px filters.
- Scoped ESLint and the Next.js production build passed on 2026-08-09. Full unscoped ESLint remains blocked by existing generated `.next-built-in-ovens` artifacts that are not excluded by the root ESLint configuration.

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

## Latest Focus: Wolf Microwaves

- Added the dedicated Wolf listing/category page at canonical `/cooking/microwaves`; the former `/products/cooking/microwaves` URL permanently redirects to it.
- Reused the established Wolf Cooking listing pattern: USA microwave hero, active Cooking category strip, compact filters, three product groups, nine reference models, specification summaries, showroom/brochure CTAs, statement, and Discover more cards.
- Updated only the related desktop/mobile navigation state so Cooking opens with Microwaves active; the existing Microwaves href already targeted the new page.
- Browser comparison used the live USA page at 1280px and the local page at desktop and 390px mobile. Verified 60px H1, 40px group headings, 24px desktop card titles, 14px category/filter labels, loaded product imagery, and no horizontal page overflow.
- The supplied 03/04 comparison was used for a focused refinement: the hero now uses the correct USA kitchen image and the product grid/filter/statement sections use the compact USA structure.
- Verification status: scoped lint passed; full lint and production build results are recorded in `docs/COOKING_MICROWAVES_NOTES.md`.

## Latest Focus: Wolf Coffee Systems

- Added the dedicated listing/category experience at canonical `/cooking/coffee-systems`; the former `/products/cooking/coffee-systems` URL permanently redirects to it.
- Reused the proven Wolf Cooking listing pattern: the USA coffee hero, Cooking category strip, compact filters, five reference-height AEM product cards with Width/Finish summaries, the USA coffee statement, and Discover more cards.
- Added route-specific metadata and initialized both desktop and mobile navigation at Cooking > Coffee Systems; only the related coffee menu visual/state was changed.
- Browser checks passed at 1280px desktop and 390px mobile with all six coffee images loaded and no horizontal overflow.
- USA typography measurements used: 60px H1, 40px hero/statement headings, 24px desktop card titles, and 14px filters.
- Project lint passed with generated output directories excluded. `npm.cmd run build` passed after running outside the sandbox so Prisma could regenerate its client; all 52 pages, including `/cooking/coffee-systems`, compiled and prerendered successfully.

## Latest Focus

Wolf Ventilation listing completed:

- Added `/cooking/ventilation` as the canonical Wolf category/listing page, with the previous `/products/cooking/ventilation` path redirecting permanently.
- Reused the established Cooking listing pattern with the USA hero, category strip, compact filters, five ventilation groups, twelve AEM product cards, specification summaries, extraction statement, and showroom/brochure CTAs.
- Updated the mega menu so Cooking and Ventilation initialize active on the route; the existing Ventilation href was already correct.
- Matched measured USA desktop typography: 60px category title, 40px group/statement headings, 24px card titles, and 14px filters.
- Scoped source lint and direct Next compilation passed; standard checks remain blocked by existing generated-artifact lint errors and the existing locked/broken Prisma client.
- The supplied USA/local full-page comparison was used for a focused refinement: USA-height cards no longer include extra model/CTA rows, and the missing two-card `Discover more` section now appears before the shared showroom band.
- Detailed notes are in `docs/COOKING_VENTILATION_NOTES.md`.

Wolf Induction Cooktops listing completed:

- Added `/cooking/cooktops-rangetops/induction-cooktops` as the canonical Wolf Induction Cooktops filtered listing.
- Reused the established Cooktops & Rangetops listing structure with the USA dark-stone induction hero, selected Induction Cooktop filter, three model-group cards, specification summaries, reference-matched statement, and Discover more cards.
- Updated only Cooking > Cooktops & Rangetops > Induction Cooktops navigation and the matching parent-page link.
- Added permanent redirects from the legacy induction category paths under `/products/cooking/...`.
- Measured the live USA desktop typography through browser developer tooling: 60px category title, 40px group/statement headings, 24px desktop card titles, and 13px filters.
- Detailed implementation and verification notes are in `docs/COOKING_INDUCTION_COOKTOPS_NOTES.md`.

Wolf Cooktops & Rangetops view-all listing completed:

- Added `/cooking/cooktops-rangetops/gas-rangetops` as the canonical listing while preserving `/cooking/cooktops-rangetops` as the editorial parent landing page; the former `/view-all` and misspelled `/das-rangetops` routes permanently redirect to the new path.
- Reused the established Wolf listing pattern for category navigation, compact filters, model-group cards, specification summaries, confidence statement, CTAs, and Discover more.
- Updated only Cooking > Cooktops & Rangetops > Gas Rangetops and the related legacy redirects to use the canonical `/gas-rangetops` path.
- Browser checks passed for desktop/mobile layout, nine loaded product images, menu paths, metadata, parent route, redirects, and no horizontal overflow.
- The supplied USA/local full-page comparison was used for a focused visual refinement of the dark hero, product-card proportions, model labels, carousel counts, and specification rows.
- Scoped lint passed; direct Next compilation passed before the existing Prisma client export issue stopped the project-wide type-check. Standard build remains blocked by the existing Windows Prisma client file lock.
- Detailed notes are in `docs/COOKING_COOKTOPS_RANGETOPS_VIEW_ALL_NOTES.md`.

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
