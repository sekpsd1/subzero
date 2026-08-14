# Work Summary

Updated: 2026-08-14

## Latest Focus: Continuing Education Units

- Added `/trade-resources/continuing-education` with the USA-reference breadcrumb, 54px desktop title, course CTA, representative search form, association partners, responsive layout, and the existing trade-resources Header/Footer.
- Added accessible radio controls and 5-digit U.S. ZIP validation. The project has no representative-search API, so valid submissions show an explicit unavailable state and do not fabricate people or results.
- Added the exact AIA, NKBA, and IDCEC reference crops under `public/assets/trade-resources/continuing-education/`; all external destinations open in a new tab with `noopener noreferrer`.
- Updated the Professionals desktop/mobile navigation destination to the canonical route. No COVE logo or wordmark is rendered; the word “Cove” remains only in the supplied body copy.
- Browser QA passed for desktop/mobile layout, empty and invalid validation, one-at-a-time radio selection, Enter submission, safe external links, loaded partner images, and zero COVE logo matches. Captures: `docs/screenshots/continuing-education-reference-desktop.png`, `continuing-education-reference-mobile.png`, `continuing-education-local-desktop.png`, `continuing-education-local-mobile.png`, and `continuing-education-local-partners.png`.
- `npm.cmd run lint -- --no-cache` and `npm.cmd run build` passed. Build retains the existing unrelated Turbopack AVIF warning from `RefrigerationCategoryPage.tsx`.

## Latest Focus: Product Specifications Library

- Added `/trade-resources/product-specifications#numberOfResults=20`, matching the USA resource-page structure with popular resources, all 98 current Sub-Zero results, working pagination/View All, typed local product search, source-accurate Type/Style facets and counts, brand/category filtering, legacy product links, and the help CTA.
- Professionals > Product Specification Library now targets the canonical route. Search/filter/page state is preserved in the URL hash and restores on reload and browser history navigation.
- Product results use the existing `src/lib/site-data.ts` catalog. The project has no product-document or CAD data model, so unavailable states are explicit and no download records are fabricated.
- Detailed implementation and validation notes are in `docs/PRODUCT_SPECIFICATIONS_NOTES.md`.

## Latest Focus: Trade Resources

- Added `/trade-resources` with the USA-reference structure, local imagery, eight functional shortcuts, professional tools, validated product and representative forms, installation content, Kitchen Design Contest gallery, professional links, and association partners.
- Updated only the Professionals > Trade Resources destination to `/trade-resources`; existing `/trade` scaffold and unrelated pages remain unchanged.
- Product search forwards valid queries to the specification route, while the representative form provides an honest unavailable state because no representative backend exists. No results or business records are fabricated.
- Reference typography was measured at 1920px and responsive browser checks covered desktop, tablet, and 390px mobile. Details are in `docs/TRADE_RESOURCES_NOTES.md`.

## Latest Focus: About Sub-Zero Group

- Added the dedicated `/about` page, matching the USA About structure with two locally stored videos, reference imagery, responsive editorial/contact cards, and the shared showroom/footer composition.
- The existing Our Story > About Sub-Zero Group menu destination already targets `/about`; no unrelated navigation or page was changed for this work.
- Added accessible pause/play controls, reduced-motion behavior, semantic headings, telephone links, responsive image crops, and overflow-safe layouts for 1920px desktop through 390px mobile.
- Reference and local QA captures are stored in `docs/screenshots/about-*.png`; validation status is recorded in `docs/ABOUT_PAGE_NOTES.md`.

## Latest Focus: Lifestyle Innovation

- Completed `/the-living-kitchen/innovation` using `https://lifestyle.subzero-wolf.com/innovation` and the supplied `333.png` capture as visual references.
- Added the `Inspired innovation` hero and the ten-story Innovation editorial grid with the reference AEM imagery, magazine typography, and responsive crops.
- Updated only the desktop/mobile Living Kitchen `Innovation` destination so the new route is reachable; other Lifestyle routes and pages remain unchanged.
- Files added: `src/app/the-living-kitchen/innovation/page.tsx` and `src/components/Lifestyle/LifestyleInnovationPage.tsx`. Related navigation was updated in `src/components/MegaMenu/MegaMenu.tsx` and `src/lib/site-data.ts`.
- Validation: `npm.cmd run lint` passed. `npm.cmd run build` passed after Prisma generation was allowed outside the sandbox; the only warning is the existing unrelated Turbopack AVIF warning from the Refrigeration category asset.
- Browser smoke checks passed at 1920px desktop and 390px mobile: correct H1, all 11 page images loaded, no horizontal overflow, and responsive hero/card crops. Captures are in `docs/screenshots/lifestyle-innovation-*.png` alongside the saved reference capture.
- Follow-up: verify production AEM image availability and final copy destinations if the Lifestyle CMS is localized for SEA later.

## Latest Focus: Inspiration Gallery / Kitchens

- Added the image-first Inspiration Gallery to both `/inspiration` and `/inspiration/kitchens`, matching the supplied USA reference structure with its title, intro, filters, and complete 83-project dataset.
- Added functional Style, Room Size, Layout, Products, Color, and Room Type filtering, 20-result pagination with five pages, next-page navigation, `VIEW ALL 83`, source-compatible hash state, and responsive desktop/mobile layouts.
- Kept the desktop mega-menu Inspiration link at `/inspiration`, replaced that route's old placeholder with the completed gallery, and retained `/inspiration/kitchens` as a gallery-specific route.
- The live USA page geo-routed Thailand to the international selector, so the supplied capture and saved USA gallery HTML were used as the reference source.
- Browser QA passed at 1440px desktop and 390px mobile with loaded imagery, functional filters, active Inspiration navigation, and no horizontal overflow. ESLint and the production build passed.
- Full-data QA also passed: 1-20 of 83 initially, 21-40 on page 2, all 83 in View all, and 47 Contemporary results matching the live source facet count.
- Detailed notes are in `docs/INSPIRATION_KITCHENS_NOTES.md`.

## Latest Focus: All Outdoor Listing

- Added `/outdoor/view-all-outdoor` as the canonical All Outdoor listing/category overview, following the supplied USA `777.png` reference.
- Added the full outdoor hero and intro, six linked category groups, compact product/spec cards, Designer Ice Maker promo, outdoor statement, and shared Discover more composition.
- Outdoor now opens active on this route; desktop and mobile `View all outdoor` links target the canonical page and expose the current-page state.
- Unfiltered `/products/outdoor` and `/products/outdoor/view-all-outdoor` permanently redirect to the new canonical route. The existing outdoor cooking query continues to `/cooking/outdoor`.
- Browser QA passed at desktop and 390px mobile with 60/46px H1, 36/30px group headings, 20/18px card titles, loaded imagery, and no horizontal overflow. ESLint and the production build passed.
- Detailed notes are in `docs/OUTDOOR_VIEW_ALL_NOTES.md`.

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

## Lifestyle Design

- Completed `/the-living-kitchen/design`, based on `https://lifestyle.subzero-wolf.com/design` and the supplied `444.png` reference capture.
- Added a full-screen luxury-interior hero with the heading `Explore luxurious living spaces`, followed by a restrained magazine-style Design story grid, two feature stories, and the existing global footer.
- Added `src/app/the-living-kitchen/design/page.tsx` and `src/components/Lifestyle/LifestyleDesignPage.tsx`; the desktop and mobile `Design` menu links now use the same route.
- Browser smoke tests passed at 1920px desktop and 390px mobile: correct H1, ten editorial stories, loaded imagery, and no horizontal overflow. Captures are in `docs/screenshots/lifestyle-design-desktop-top.png` and `docs/screenshots/lifestyle-design-mobile.png`.
- `npm.cmd run lint` passed. `npm.cmd run build` passed; the only warning is the existing unrelated Turbopack AVIF warning from the Refrigeration category asset.
- Refined the page against the supplied `111.png` reference and `222.png` local capture: replaced the hero and six provisional/repeated images with the exact current AEM Design assets, updated the hero title to `Exceptional design`, and aligned the visible article excerpts and destinations with the source index.
- Matched the latest close-up comparison by increasing feature-story height to 650px, reducing its text inset to 24px, and changing three-column story media to the reference-like 1.75:1 crop.
- Matched all `Read …` links to the supplied close-up: 14px medium text with a visible underline and 25% underline offset.

## Lifestyle Places

- Completed `/the-living-kitchen/places` using `https://lifestyle.subzero-wolf.com/places` and the supplied `111.png` capture as visual references.
- Added the full-bleed `Extraordinary destinations` hero and the ten-story Places editorial layout using the current reference AEM imagery and article sequence.
- Files added: `src/app/the-living-kitchen/places/page.tsx` and `src/components/Lifestyle/LifestylePlacesPage.tsx`. Updated the desktop/mobile Places menu path in `src/components/MegaMenu/MegaMenu.tsx` and `src/lib/site-data.ts`.
- Validation passed: `npm.cmd run lint`, `npm.cmd run build`, and desktop/mobile Browser smoke checks. The route renders ten editorial stories, all article imagery loads after scrolling, the 40px/36px hero title matches the reference scale, and no horizontal overflow was found at 1920px or 390px.
- Follow-up: confirm remote AEM and lifestyle article imagery remains available in the SEA deployment environment.

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

## Our Story

- Completed `/our-story` using `https://www.subzero-wolf.com/our-story` and the supplied reference HTML as the source of truth.
- Replaced the former placeholder hero with the full premium heritage page: reference hero video and headline, brand introduction and timeline CTA, unified-brand statement, three brand cards, functional film modal, American innovation/factory story, and lifetime-support story.
- Reused the existing global Header and Footer without changing unrelated pages. Reference AEM imagery and the USA tri-brand foresight film are used for the editorial sections.
- Files changed: `src/app/our-story/page.tsx`, `src/components/OurStory/OurStoryPageContent.tsx`, and `docs/WORK_SUMMARY.md`.
- Validation passed: `npm.cmd run lint`, `npm.cmd run build`, and desktop/mobile Browser smoke tests at `http://127.0.0.1:3000/our-story`. The film modal opens and closes correctly, all visible page imagery loads, and no horizontal overflow was found at desktop or 390px mobile widths.
- Browser captures: `docs/screenshots/our-story-reference.png`, `docs/screenshots/our-story-desktop.png`, `docs/screenshots/our-story-brands-desktop.png`, `docs/screenshots/our-story-film-modal.png`, and `docs/screenshots/our-story-mobile.png`.
- Follow-up refinement: added the missing 60px hero Pause/Play control beside the down-arrow control, reusing the existing page pattern with a live SVG progress ring, inner media circle, and reference-style pause bars. Browser checks confirmed the ring advances with playback, pause/play state changes work, and desktop overflow remains zero; capture: `docs/screenshots/our-story-hero-controls.png`.
- Intro/layered-image refinement: rebuilt the post-hero `Our story` block on the reference off-white palette with centered 80px editorial heading, sans-serif introduction, dark pill CTA, and reference-matched spacing into the first 1320px image. Replaced the former dark static/split sections with the supplied two-image sticky scroll sequence, animated slide/title states, and vertical progress rail; mobile falls back to two clean stacked editorial images. Browser captures: `docs/screenshots/our-story-intro-refined.png`, `docs/screenshots/our-story-layered-second.png`, and `docs/screenshots/our-story-intro-mobile-refined.png`.
- Progress rail correction: matched the USA `layered-images-progress-controls` structure and measured geometry exactly—742.5px controls region, centered 1x100px bar, two 16x50px hotspots, and a 3px caret whose height grows with scroll progress instead of a moving dot. Both `Image 1 / 2` and `Image 2 / 2` hotspots now navigate to their states. Capture: `docs/screenshots/our-story-progress-rail.png`.
- Brand-card refinement: matched the USA off-white continuation and measured desktop geometry—297.6px centered copy block, 40/44px serif heading, 24/28.8px serif subcopy, 1392px grid with 8px gaps, 458.66x286.66px (1.6:1) imagery, and 211px content panels. Removed the incorrect dark card backdrop and tall square media treatment. Capture: `docs/screenshots/our-story-brand-cards-refined.png`.
- Film-section refinement: replaced the mismatched local background film with the exact USA AEM tri-brand foresight asset and matched the full-viewport layout, 60/66px half-width heading, 40px film CTA, left/bottom shading, 18x100px video rail, 48px playback progress control, and next-section control. Pause/play and modal open/close interactions passed at desktop; the 390px mobile layout has no horizontal overflow. Captures: `docs/screenshots/our-story-film-section-refined.jpg` and `docs/screenshots/our-story-film-section-mobile.jpg`.
- Closing-story refinement: changed `Exceptional starts here` and `A lifetime commitment` from the incorrect dark compact grid to the USA off-white alternating layout. Desktop measurements now match the reference 1440px block, 820.8/619.2px columns, 709px image height, 64px copy padding, 40/44px headings, and 18/25.2px body copy. Mobile stacks cleanly with no horizontal overflow. Capture: `docs/screenshots/our-story-details-refined.jpg`.
- Final-boundary refinement: added an `/our-story`-only Footer variant so the showroom banner matches the USA 1440px editorial grid without changing other pages. Its desktop geometry now uses a 64px inner inset, 421/405/405px columns, 40px gaps, 30/33px lead heading, 24/26.4px card headings, 16/19.52px copy, and 52px CTAs. The final story blocks also use the reference-exact 709.4375px desktop height. Capture: `docs/screenshots/our-story-lifetime-footer-refined.jpg`.
- Follow-up: confirm remote AEM and Scene7 imagery remains available in the SEA production environment.
# Latest Focus: Lifestyle / The Living Kitchen

- Completed the new `/lifestyle` route using `https://lifestyle.subzero-wolf.com/` and the supplied `222.png` capture as the visual references.
- Added a full-bleed “The art of living well” hero, The Living Kitchen identity and supplied magazine copy, category pills, and a restrained editorial article grid using the reference AEM photography.
- Reused the existing fixed Header and full Footer/pre-footer without changing global navigation or unrelated pages.
- Files added: `src/app/lifestyle/page.tsx` and `src/components/Lifestyle/LifestylePage.tsx`. This summary was updated in `docs/WORK_SUMMARY.md`.
- Browser checks passed at desktop and 390px mobile: hero crop, 40px/34px H1 sizing, loaded editorial imagery, footer flow, and zero horizontal overflow. Captures are in `docs/screenshots/`.
- `npm.cmd run lint` passed. `npm.cmd run build` passed after Prisma generation was allowed outside the sandbox; the only warning is the existing unrelated Turbopack AVIF warning from the Refrigeration category asset.
- Linked the desktop and mobile menus’ `The Living Kitchen` parent and `All Stories` entry to `/lifestyle`, and made the desktop panel initialize as active when opened from the Lifestyle page.
- Refined the page against the supplied `333.png` local capture and `222.png` USA reference: full-viewport desktop hero, 1392px editorial canvas, reference-like grouped category tabs, 40px story titles, taller card copy areas, and feature-story proportions closer to the USA layout.
- Aligned the hero title with the latest side-by-side captures: it now sits at the USA-style 24px desktop left/bottom inset instead of following the centered editorial canvas.
- Matched the latest intro/feature comparison: shifted the magazine copy to the USA column start, aligned the intro vertical spacing, and widened feature-story text columns so `An Artist’s Abode` follows the reference single-line treatment at 1920px.
- Matched the supplied article-grid close-up with 8px desktop column gutters and 16px row/section gutters, replacing the compressed 4px spacing between editorial cards.
- Matched the final-results close-up by giving the two closing images the taller USA proportion, tightening their copy panels, and changing the CTA label to `View more results`.
- Matched all `Read …` links to the reference styling: 14px, medium weight, visible underline, and 25% underline offset; verified in the browser and lint passed.

## Lifestyle Food

- Completed `/the-living-kitchen/food` using `https://lifestyle.subzero-wolf.com/food` and the supplied `444.png` capture as references.
- Added a full-bleed culinary hero with `Culinary artistry`, followed by the Food feature stories and editorial article grid using the reference AEM photography.
- Files added: `src/app/the-living-kitchen/food/page.tsx` and `src/components/Lifestyle/LifestyleFoodPage.tsx`; the Food navigation links previously targeting `/journal/food` now use `/the-living-kitchen/food`.
- `npm.cmd run lint` passed. `npm.cmd run build` passed; the only warning is the existing unrelated Turbopack AVIF warning from the Refrigeration category asset.
- Browser smoke checks passed at 1920px desktop and 390px mobile: correct H1, ten editorial stories, loaded imagery, and no horizontal overflow. Captures are in `docs/screenshots/lifestyle-food-reference.png`, `docs/screenshots/lifestyle-food-desktop.png`, and `docs/screenshots/lifestyle-food-mobile.png`.
- Refined against the supplied `444.png` reference and `555.png` local capture: matched the reference 40px desktop story typography, aligned the hero heading to the 24px desktop inset, and replaced shortened card excerpts with the current reference copy.
- Matched the latest hero close-up by changing the H1 and metadata title from `Discover culinary artistry` to the reference wording `Culinary artistry`.
- Matched the latest feature-card close-up by increasing category labels to 13px, excerpts to 16px/1.22, restoring the reference 24px excerpt spacing, and matching the 300px regular / 281px wide copy-panel heights.
- Follow-up: confirm remote AEM imagery remains available in the SEA deployment environment.

## Lifestyle Category

- Completed `/the-living-kitchen/lifestyle` using `https://lifestyle.subzero-wolf.com/lifestyle` and the supplied `666.png` capture as visual references.
- Added the reference-matched `Elevated living` hero and the current Lifestyle editorial sequence covering hosting, wellness, travel, community, and refined living; the page deliberately avoids product-catalog patterns.
- Files added: `src/app/the-living-kitchen/lifestyle/page.tsx` and `src/components/Lifestyle/LifestyleCategoryPage.tsx`. Updated the desktop/mobile Lifestyle menu destinations in `src/components/MegaMenu/MegaMenu.tsx` and `src/lib/site-data.ts`.
- `npm.cmd run lint` passed. `npm.cmd run build` passed; the only warning is the existing unrelated Turbopack AVIF warning from a Refrigeration category asset.
- Browser smoke checks passed at 1920px desktop and 390px mobile: correct H1, all 11 editorial images loaded after scrolling, no horizontal overflow, and responsive hero/card crops. Captures are in `docs/screenshots/lifestyle-category-desktop.png` and `docs/screenshots/lifestyle-category-mobile.png`.
- Follow-up: confirm remote AEM and lifestyle article imagery remains available in the SEA deployment environment.
- Refined the desktop proportions against `666.png` and the supplied local `777.png`: corrected the 1440px feature-card breakpoint, matched the reference 1.6:1 card crops, tightened results-section bottom spacing, restored the reference pre-footer breathing room, and applied reference CTA copy through a Lifestyle-only footer variant.
- Post-refinement validation passed: `npm.cmd run lint`, `npm.cmd run build`, 1920px desktop Browser comparison, and 390px mobile smoke test. All 11 images loaded and no horizontal overflow was found. Updated captures: `docs/screenshots/lifestyle-category-refined.png` and `docs/screenshots/lifestyle-category-mobile-refined.png`.
- Updated the hero H1 from `The art of living beautifully` to the current USA reference wording `Elevated living` after the latest direct hero comparison.
- Desktop hero verification at 1920×946 confirmed the reference-like 40px heading at a 24px left inset with no horizontal overflow. Capture: `docs/screenshots/lifestyle-hero-elevated-living.png`.

## Brochure Maker — Select Products

- Added `/trade-resources/brochure-maker/product-select`, matching the USA Brochure Maker structure with breadcrumb, 54px desktop heading, intro, four-step progress, three brand columns, accordion categories, Continue area, and responsive single-column mobile layout.
- Added `/trade/brochure` as a menu-friendly alias that reuses the same route implementation.
- Reused the existing Header/Footer and real project data: the Sub-Zero reference catalog plus Wolf entries from `src/lib/site-data.ts`. No product models, names, or images were invented; missing category data uses an explicit empty state.
- Product rows render only for open accordions and include lazy images, accessible checkboxes, hover/focus/selected states, model, name, and real New badges.
- Multi-select state persists through reload/back navigation in `sessionStorage`. Continue is disabled with no selection, enables after selection, and navigates to `/trade-resources/brochure-maker/product-configuration`; steps 2–4 are non-navigable before validation.
- Browser checks passed at 1920×946 and 390×844: no horizontal overflow, no broken visible images, correct collapsed initial state, selection persistence, and correct Continue URL. Captures: `docs/screenshots/brochure-maker-desktop.png` and `docs/screenshots/brochure-maker-mobile.png`.
- `npm.cmd run lint -- --no-cache` passed. `npm.cmd run build` passed; the only build warning is the existing unrelated Turbopack AVIF warning from `RefrigerationCategoryPage.tsx`.
- Remaining scope: product-configuration and later wizard steps were intentionally not created.
- CTA refinement: matched the live USA Continue button at 165×46px, 14px/500 text, `#e3e3e2` fill, black 1px border, 100px radius, and 67px/100px container spacing. The disabled state remains functionally disabled while retaining the reference black text/border appearance, and the non-reference selection-count label was removed.
- Completed the previously missing Wolf/Cove brochure catalog from the supplied USA HTML: 177 Wolf products across all 17 Wolf categories and 4 Cove dishwashers. The page still renders zero product cards initially, then renders only the opened category; Browser verification returned 11 Gas Ranges, 4 Dishwashers, and no empty-state message.

## Installation Videos

- Added `/trade/installation-videos` as the menu-facing route and retained `/trade-resources/installation-videos` as a compatible route. Both render the same USA-reference page: breadcrumb, 54px desktop heading, intro, four alternating 300x200 image/text rows, dividers, outline pill CTAs, and Additional resources section.
- Added `src/app/trade/installation-videos/page.tsx`, `src/app/trade-resources/installation-videos/page.tsx`, `src/components/InstallationVideos/InstallationVideosPageContent.tsx`, and its scoped CSS module. The menu-facing route reuses the existing implementation without duplicating UI. Reused the owner-resources Header/Footer and Typekit font setup without changing shared behavior.
- Reused the four exact USA reference crops in `public/assets/trade-resources/installation-videos/`; the first image loads eagerly for LCP and the three below-fold images remain lazy-loaded.
- Browser checks passed at 1600x1000 and 390x844: all images load, desktop alternation/mobile stacking are correct, all six destinations were verified, and horizontal overflow is zero. No console or hydration errors were found; remaining console warnings come from the existing shared header/root setup.
- `npm.cmd run lint -- --no-cache` and `npm.cmd run build` passed. Build retains the existing unrelated Turbopack AVIF warning from `RefrigerationCategoryPage.tsx`.
- Remaining scope: the four linked installation-video detail pages were intentionally not created.
