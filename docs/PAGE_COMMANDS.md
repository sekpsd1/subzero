# Page Commands

Use this file to continue page-by-page work quickly. Each page entry lists the route, main files, current state, and the fastest safe checks.

## Page Work Template

When the user asks for a specific page:

1. Read this page's entry.
2. Read the route file and the main component.
3. Change only that page unless the request is clearly global.
4. Run `npm run lint`.
5. Run `npm run build` at the end or before deploy.
6. For visual/scroll behavior, verify in browser at desktop and mobile.

## Global Shell

Route scope: all public pages

Main files:

- `src/components/Header/Header.tsx`
- `src/components/Footer/Footer.tsx`
- `src/components/MegaMenu/MegaMenu.tsx`
- `src/components/MobileMenu/MobileMenu.tsx`
- `src/components/SearchOverlay/SearchOverlay.tsx`
- `src/lib/site-data.ts`

Use when:

- The request mentions header, menu, search, footer, navigation, global CTA, or sitemap structure.

Checks:

```powershell
npm run lint
npm run build
```

Do not use this scope for page-only spacing/image requests.

## Home

Route: `/`

Main files:

- `src/app/page.tsx`
- `src/components/Hero/Hero.tsx`
- `src/components/Home/TriBrandShowcase.tsx`
- `src/components/Home/ShowroomJourney.tsx`
- `src/components/Home/IceMakerFeature.tsx`
- `src/components/Home/LayeredVideos.tsx`
- `src/components/Home/TrustedByBest.tsx`
- `src/components/Home/DesignedWithYou.tsx`
- `src/components/Home/ExperienceMore.tsx`

State:

- Main luxury landing page scaffold is built.
- Uses shared home sections that may also be referenced by product pages.

Fast check:

```text
http://localhost:3000/
```

## Discover Sub-Zero

Route: `/refrigeration/discover-sub-zero`

Main files:

- `src/app/refrigeration/discover-sub-zero/page.tsx`
- `src/components/ProductPages/DiscoverSubZeroPage.tsx`

State:

- Strong reference page for refrigeration storytelling.
- Contains layered image behavior, immersive series, product comparison, and design inspiration carousel.
- Good source pattern for future refrigeration pages.

Fast check:

```text
http://localhost:3000/refrigeration/discover-sub-zero
```

## Classic Series

Route: `/refrigeration/classic-series`

Main files:

- `src/app/refrigeration/classic-series/page.tsx`
- `src/components/ProductPages/ClassicSeriesPage.tsx`

State:

- Polished product-series page.
- Contains hero video, intro, sticky showroom CTA, hotspot feature, fading media/copy, design gallery, model gallery, expanding media, and related discovery.

Fast check:

```text
http://localhost:3000/refrigeration/classic-series
```

## Designer Series

Route: `/refrigeration/designer-series`

Main files:

- `src/app/refrigeration/designer-series/page.tsx`
- `src/components/ProductPages/DesignerSeriesPage.tsx`

State:

- Polished product-series page.
- Recent prior work focused on:
  - `Integrated door hinge`
  - `Designed to fit your vision`
  - color palette / wheel behavior
- Treat as sensitive: small visual changes can require browser verification.

Fast check:

```text
http://localhost:3000/refrigeration/designer-series
```

## PRO Series

Route: `/refrigeration/pro-series`

Main files:

- `src/app/refrigeration/pro-series/page.tsx`
- `src/components/ProductPages/ProSeriesPage.tsx`

State:

- Polished product-series page.
- Contains hero video, parallax media, features, hotspot feature, model gallery, expanding image, compare series, and discovery sections.

Fast check:

```text
http://localhost:3000/refrigeration/pro-series
```

## Wine Storage

Route: `/refrigeration/wine-storage`

Main files:

- `src/app/refrigeration/wine-storage/page.tsx`
- `src/components/ProductPages/WineStoragePage.tsx`

State:

- Latest and most detailed page.
- Current reference for page-specific visual implementation because it has repeated browser-verified tuning.
- Includes:
  - hero video
  - intro
  - sticky showroom CTA
  - two-slide layered images
  - `Crafted for connoisseurs`
  - feature rows
  - two-image media break with `Complements any space`
  - Wine Storage-specific showroom card
  - tension zoom expanding media
  - Wine Storage model carousel
  - design gallery
  - two-tile `Complete your kitchen`
  - `More to discover`

Fast check:

```text
http://localhost:3000/refrigeration/wine-storage
```

Extra visual checks:

- Layered titles stay two lines.
- Tension zoom border collapses while scrolling.
- Showroom card uses the Wine-specific implementation, not shared `ShowroomJourney`.
- `Complete your kitchen` has exactly two tiles.

## Undercounter

Route: `/refrigeration/undercounter`

Main files:

- `src/app/refrigeration/undercounter/page.tsx`
- `src/components/ProductPages/UndercounterPage.tsx`

State:

- Dedicated Sub-Zero Undercounter page exists.
- Treat as a product-family page, not a shared listing page.

Fast check:

```text
http://localhost:3000/refrigeration/undercounter
```

## Ice Makers

Route: `/refrigeration/ice-makers`

Main files:

- `src/app/refrigeration/ice-makers/page.tsx`
- `src/components/ProductPages/DesignerIceMakerPage.tsx`

State:

- Dedicated Designer Undercounter Ice Maker page exists.
- Reference target is the USA Designer Ice Maker page.

Fast check:

```text
http://localhost:3000/refrigeration/ice-makers
```

## Refrigeration Category Listing Pattern

Routes:

- `/refrigeration/french-door`
- `/refrigeration/side-by-side`
- `/refrigeration/over-and-under`
- `/refrigeration/column-refrigeration`
- `/refrigeration/column-freezer`
- `/refrigeration/outdoor`

Main files:

- `src/components/ProductPages/RefrigerationCategoryPage.tsx`
- `src/components/ProductPages/DetailedProductCard.tsx`
- `src/components/ProductPages/FrenchDoorPage.tsx`
- `src/app/refrigeration/french-door/page.tsx`
- `src/app/refrigeration/side-by-side/page.tsx`
- `src/app/refrigeration/over-and-under/page.tsx`
- `src/app/refrigeration/column-refrigeration/page.tsx`
- `src/app/refrigeration/column-freezer/page.tsx`
- `src/app/refrigeration/outdoor/page.tsx`
- `src/lib/site-data.ts`

State:

- French Door is the baseline category/listing pattern.
- The five sibling routes reuse the same `RefrigerationCategoryPage` data-driven component.
- Navigation paths in `src/lib/site-data.ts` now point to `/refrigeration/...` for these category routes.
- `npm.cmd run lint` and `npm.cmd run build` passed on 2026-07-19.

Fast checks:

```text
http://localhost:3000/refrigeration/french-door
http://localhost:3000/refrigeration/side-by-side
http://localhost:3000/refrigeration/over-and-under
http://localhost:3000/refrigeration/column-refrigeration
http://localhost:3000/refrigeration/column-freezer
http://localhost:3000/refrigeration/outdoor
```

Next pass:

- Browser-check these routes against `/refrigeration/french-door` first.
- Compare with USA filtered category references only for category content and product-card direction.
- Keep this as a listing/category pattern, not a cinematic storytelling page.
- Avoid editing Classic, Designer, PRO, Discover, Wine, Undercounter, or Ice Makers while tuning this batch.

## Products Catalog

Route: `/products`

Main files:

- `src/app/products/page.tsx`
- `src/components/ProductGrid/ProductGrid.tsx`
- `src/components/ProductCard/ProductCard.tsx`
- `src/lib/site-data.ts`

State:

- Catalog scaffold exists.
- Public pricing intentionally hidden.
- Uses static seed products from `site-data.ts`.

Fast check:

```text
http://localhost:3000/products
```

## Product Or Category Detail

Route: `/products/[...slug]`

Main file:

- `src/app/products/[...slug]/page.tsx`

State:

- Dynamic route scaffold exists.
- Redirects some old refrigeration product paths to dedicated routes.
- Shows framework for hero, specs, filters, related products.

Fast checks:

```text
http://localhost:3000/products/refrigeration/undercounter
http://localhost:3000/products/icbcl3650rid
```

Next.js caution:

- This file uses async `params`. Read local Next.js route/metadata docs before changing params, `generateMetadata`, `redirect`, or routing behavior.

## Wolf Ventilation Listing

Route: `/cooking/ventilation`

Main files:

- `src/app/cooking/ventilation/page.tsx`
- `src/app/products/cooking/ventilation/page.tsx` (permanent redirect)
- `src/components/ProductPages/WolfVentilationPage.tsx`
- `src/components/MegaMenu/MegaMenu.tsx`

State:

- Dedicated Wolf Ventilation category/listing page using the established Cooking listing pattern.
- Includes the USA hero, category navigation, Series/Width/Finish filter row, five ventilation groups, twelve real product cards, the extraction statement, and showroom/brochure CTAs.
- Cooking and Ventilation initialize as the active mega-menu path on this route.
- Typography baseline measured from USA: 60px category heading, 40px group/statement headings, 24px product-card titles, and 14px filter labels.

Fast check:

```text
http://127.0.0.1:3000/cooking/ventilation
```

## Wolf Built-In Ovens

Route: `/cooking/built-in-ovens`

Main files:

- `src/app/cooking/built-in-ovens/page.tsx`
- `src/components/ProductPages/WolfBuiltInOvensPage.tsx`

State:

- USA-reference editorial landing page with real Wolf video and image assets.
- The overview has eight specification rows per oven family and the inspiration tabs use Built-In Ovens-specific USA assets.
- Uses the shared Footer pre-footer only; do not add a second page-level CTA band.
- Cooking > Built-in Ovens initializes as the active mega-menu branch.
- Legacy `/products/cooking/built-in-ovens` permanently redirects to the canonical route.

Fast check:

```text
http://127.0.0.1:3000/cooking/built-in-ovens
```

## Wolf Convection Ovens Listing

Route: `/cooking/built-in-ovens/convection`

Main files:

- `src/app/cooking/built-in-ovens/convection/page.tsx`
- `src/components/ProductPages/ConvectionOvensPage.tsx`
- `src/lib/site-data.ts`
- `src/app/products/[...slug]/page.tsx`

State:

- Canonical filtered listing for Wolf Single Oven and Double Oven convection models.
- Matches the supplied USA full-page capture with a full-height oven hero, category strip, Series/Width/Finish filters, exactly 10 product cards in a three-column desktop grid, the light confidence statement, and Discover more cards.
- Hero uses the exact USA AEM kitchen image supplied with the reference markup; it is intentionally static and has no video controls.
- Cooking > Built-in Ovens > Convection points to this route.
- Legacy `/products/cooking/convection-ovens` permanently redirects here.
- Typography baseline: 54px desktop category heading, 20px model titles, and 13px filter controls.

Fast checks:

```text
http://127.0.0.1:3000/cooking/built-in-ovens/convection
http://127.0.0.1:3000/cooking/built-in-ovens
http://127.0.0.1:3000/products/cooking/convection-ovens
```

## Wolf Convection Steam Ovens Listing

Route: `/cooking/built-in-ovens/convection-steam`

Main files:

- `src/app/cooking/built-in-ovens/convection-steam/page.tsx`
- `src/components/ProductPages/ConvectionSteamOvensPage.tsx`
- `src/components/ProductPages/BuiltInOvensHero.tsx`
- `src/lib/site-data.ts`
- `src/app/products/[...slug]/page.tsx`

State:

- Canonical filtered listing for five Wolf Convection Steam Oven models.
- Uses the Convection listing hierarchy and dimensions with the exact static USA `Faster heat, better airflow` hero image.
- Selected filter is Convection Steam Oven; cards summarize 24/30-inch widths, convection steam oven type, finish, and plumbed optional.
- Cooking > Built-in Ovens > Convection Steam points to this route.
- Legacy `/products/cooking/convection-steam-ovens` permanently redirects here.
- Typography baseline: 60px desktop/46px mobile category heading, 20px model titles, and 13px filters.

Fast checks:

```text
http://127.0.0.1:3000/cooking/built-in-ovens/convection-steam
http://127.0.0.1:3000/cooking/built-in-ovens
http://127.0.0.1:3000/products/cooking/convection-steam-ovens
```

## Wolf Speed Ovens Listing

Route: `/cooking/built-in-ovens/convection-speed`

Main files:

- `src/app/cooking/built-in-ovens/convection-speed/page.tsx`
- `src/components/ProductPages/SpeedOvensPage.tsx`
- `src/components/ProductPages/BuiltInOvensHero.tsx`
- `src/lib/site-data.ts`
- `src/app/products/[...slug]/page.tsx`

State:

- Canonical filtered listing for five Wolf Convection Speed Oven model families.
- Uses the exact static USA `Faster heat, better airflow` hero image and the established convection/steam listing proportions.
- Selected filter is Speed Oven; cards summarize width, oven type, finish, and convection/broil/microwave capability.
- Cooking > Built-in Ovens > Convection Speed points to this route.
- Legacy `/cooking/view-all-cooking/built-in-ovens?default.mnseries=Speed+Oven`, `/cooking/built-in-ovens/speed`, `/products/cooking/convection-speed-ovens`, and `/products/cooking/speed-ovens` permanently redirect here.
- Typography baseline: 60px desktop/46px mobile category heading, 44px desktop product-group heading, 20px model titles, and 13px filters.

Fast checks:

```text
http://127.0.0.1:3000/cooking/built-in-ovens/convection-speed
http://127.0.0.1:3000/cooking/built-in-ovens
http://127.0.0.1:3000/cooking/view-all-cooking/built-in-ovens?default.mnseries=Speed+Oven
http://127.0.0.1:3000/products/cooking/convection-speed-ovens
http://127.0.0.1:3000/products/cooking/speed-ovens
```

## Wolf Ranges

Route: `/cooking/ranges`

Main files:

- `src/app/cooking/ranges/page.tsx`
- `src/components/ProductPages/WolfRangesPage.tsx`
- `src/lib/site-data.ts`

State:

- Wolf Ranges landing/category page modeled on the USA `/cooking/ranges` reference.
- Old `/products/cooking/ranges` and `/products/cooking/dual-fuel-ranges` paths permanently redirect to the canonical route.
- Primary menu/CTA wording is `Explore the Wolf Range`.
- Includes the compact USA-style `The showroom experience` visual card after the intro.

Fast check:

```text
http://localhost:3000/cooking/ranges
```

## Wolf Dual Fuel Ranges

Route: `/cooking/ranges/dual-fuel`

Main files:

- `src/app/cooking/ranges/dual-fuel/page.tsx`
- `src/components/ProductPages/DualFuelRangesPage.tsx`
- `src/lib/site-data.ts`
- `src/components/MegaMenu/MegaMenu.tsx`
- `src/app/products/[...slug]/page.tsx`

State:

- USA-inspired range listing/filter page with real Wolf assets and one aggregate Dual Fuel family card matching the filtered USA result structure.
- Cooking > Ranges > Dual Fuel menu path points to the canonical route.
- The Dual Fuel listing remains at this route, while legacy `/products/cooking/dual-fuel-ranges` redirects to the main `/cooking/ranges` landing page.
- Typography baseline: 40px hero title, 24px card title, and 14px filters/specs.

Fast checks:

```text
http://localhost:3000/cooking/ranges/dual-fuel
http://localhost:3000/cooking/ranges
http://localhost:3000/products/cooking/dual-fuel-ranges
```

## Wolf Induction Ranges

Route: `/cooking/ranges-induction`

Main files:

- `src/app/cooking/ranges-induction/page.tsx`
- `src/components/ProductPages/InductionRangesPage.tsx`
- `src/lib/site-data.ts`
- `src/app/products/[...slug]/page.tsx`

State:

- Dedicated USA-inspired Wolf Induction listing with real hero and product assets.
- Includes selected Induction filtering, Transitional and Professional family cards, confidence copy, and Discover more content.
- Cooking menu and Wolf Ranges Induction CTAs point to the canonical route.
- Legacy `/products/cooking/induction-ranges` permanently redirects to `/cooking/ranges-induction`.
- Detailed measurements and verification are recorded in `docs/COOKING_INDUCTION_RANGES_NOTES.md`.

Fast checks:

```text
http://localhost:3000/cooking/ranges-induction
http://localhost:3000/products/cooking/induction-ranges
```

## Wolf Gas Ranges

Route: `/cooking/ranges/gas`

Main files:

- `src/app/cooking/ranges/gas/page.tsx`
- `src/components/ProductPages/GasRangesPage.tsx`
- `src/components/ProductPages/WolfRangeCategoryPage.tsx`
- `src/lib/site-data.ts`
- `src/app/products/[...slug]/page.tsx`

State:

- USA-inspired Wolf Gas Range listing/filter page with the real Wolf hero and Gas Range product asset.
- Includes the selected Gas Range filter, GR Series aggregate card, widths, burner configurations, fuel, finish, gas oven summary, and showroom/brochure CTAs.
- Cooking > Ranges > Gas Ranges points to the canonical route.
- Legacy `/products/cooking/gas-ranges` permanently redirects to `/cooking/ranges/gas`.
- Typography baseline: 60px category heading, 24px card title, and 14px filters.

Fast checks:

```text
http://localhost:3000/cooking/ranges/gas
http://localhost:3000/cooking/ranges
http://localhost:3000/products/cooking/gas-ranges
```

## Showroom

Route: `/showroom`

Main file:

- `src/app/showroom/page.tsx`

State:

- Regional Experience scaffold.

Fast check:

```text
http://localhost:3000/showroom
```

## Showroom Appointment

Route: `/showroom/appointment`

Main file:

- `src/app/showroom/appointment/page.tsx`

State:

- Static form scaffold exists.
- Needs real validation, persistence, country routing, and notification flow.

Fast check:

```text
http://localhost:3000/showroom/appointment
```

Backend-related files for future work:

- `prisma/schema.prisma`
- `src/app/api/showrooms/route.ts`
- future appointment API route to be created.

## Dealers

Route: `/showroom/dealers`

Main file:

- `src/app/showroom/dealers/page.tsx`

State:

- Dealers scaffold exists.
- Needs country/city dealer data and filters.

Fast check:

```text
http://localhost:3000/showroom/dealers
```

## Admin

Route: `/admin`

Main files:

- `src/app/admin/page.tsx`
- `src/lib/site-data.ts`
- `prisma/schema.prisma`

State:

- Static admin dashboard scaffold exists.
- Shows modules for posts, products, inventory, appointments, SEO/AEO, users.
- Not yet protected by authentication.
- Not yet connected to database.

Fast check:

```text
http://localhost:3000/admin
```

System checks before real admin work:

```powershell
npx prisma validate
npm run lint
npm run build
```

## Journal

Route: `/journal`

Main files:

- `src/app/journal/page.tsx`
- `src/lib/site-data.ts`

State:

- Journal/Culinary scaffold exists.
- Uses static seed post data.
- Needs post detail pages, categories, tags, and CMS connection.

Fast check:

```text
http://localhost:3000/journal
```

## Inspiration

Route: `/inspiration`

Main file:

- `src/app/inspiration/page.tsx`

State:

- Scaffold exists.
- Needs final content and imagery.

Fast check:

```text
http://localhost:3000/inspiration
```

## Our Story

Route: `/our-story`

Main file:

- `src/app/our-story/page.tsx`

State:

- Scaffold exists.
- Needs Sub-Zero story, milestones, and sustainability subpage expansion.

Fast check:

```text
http://localhost:3000/our-story
```

## Owner Resources

Route: `/support`

Main file:

- `src/app/support/page.tsx`

State:

- Owner Resources scaffold exists.
- Needs Product Information, Accessories, Recipes, Use and Care Videos, Warranty, Product Support, Owner Technique Guide, and Customer Care subpages.

Fast check:

```text
http://localhost:3000/support
```

## Professionals

Route: `/trade`

Main file:

- `src/app/trade/page.tsx`

State:

- Professionals scaffold exists.
- Needs Specification Library, Brochure, Future Products, and Kitchen Design Contest flows.

Fast check:

```text
http://localhost:3000/trade
```

## API Routes

Routes:

- `/api/journal`
- `/api/products`
- `/api/showrooms`

Main files:

- `src/app/api/journal/route.ts`
- `src/app/api/products/route.ts`
- `src/app/api/showrooms/route.ts`

State:

- Static route handlers exist.
- Future work should connect Prisma/MySQL once DB provider and migration flow are final.

Fast check:

```text
http://localhost:3000/api/products
http://localhost:3000/api/journal
http://localhost:3000/api/showrooms
```

Next.js caution:

- Read local route handler docs before changing request/response behavior.

## Wolf Cooktops and Rangetops

Route: `/cooking/cooktops-rangetops`

Main files:

- `src/app/cooking/cooktops-rangetops/page.tsx`
- `src/components/ProductPages/WolfCooktopsRangetopsPage.tsx`
- `src/components/ProductPages/WolfCooktopsHero.tsx`
- `src/lib/site-data.ts`
- `src/app/products/[...slug]/page.tsx`

State:

- USA-inspired Wolf landing page with video hero, compact type scale, showroom content, three product families, rangetop configuration options, overview cards, and inspiration gallery.
- Cooking navigation and footer use the canonical route.
- Legacy `/products/cooking/cooktops-rangetops` permanently redirects to the canonical route.

Fast checks:

```text
http://localhost:3000/cooking/cooktops-rangetops
http://localhost:3000/products/cooking/cooktops-rangetops
```

## Wolf Cooktops and Rangetops View All

Route: `/cooking/cooktops-rangetops/gas-rangetops`

Main files:

- `src/app/cooking/cooktops-rangetops/gas-rangetops/page.tsx`
- `src/app/cooking/cooktops-rangetops/das-rangetops/page.tsx` (legacy typo redirect)
- `src/app/cooking/cooktops-rangetops/view-all/page.tsx` (legacy redirect)
- `src/components/ProductPages/CooktopsRangetopsViewAllPage.tsx`
- `src/lib/site-data.ts`
- `src/app/products/[...slug]/page.tsx`

State:

- Canonical all-model Wolf Cooktops & Rangetops listing; the parent editorial landing remains `/cooking/cooktops-rangetops`.
- Includes Gas Rangetops (SRT), Gas Cooktops (CGP, CGTF, CGT, CGC, MMTF), and Induction Cooktops (CI60C, CI60T, CITF).
- Cooking > Cooktops & Rangetops > Gas Rangetops points to this route.
- Legacy `/cooking/cooktops-rangetops/view-all`, `/cooking/cooktops-rangetops/das-rangetops`, and `/products/cooking/cooktops-rangetops/view-all` permanently redirect here.
- Typography baseline: 60px desktop/46px mobile category title, 44px desktop/38px mobile product-group headings, 20px card titles, and 13px filter labels.

Fast checks:

```text
http://127.0.0.1:3000/cooking/cooktops-rangetops/gas-rangetops
http://127.0.0.1:3000/cooking/cooktops-rangetops/das-rangetops
http://127.0.0.1:3000/cooking/cooktops-rangetops/view-all
http://127.0.0.1:3000/cooking/cooktops-rangetops
http://127.0.0.1:3000/products/cooking/cooktops-rangetops
http://127.0.0.1:3000/products/cooking/cooktops-rangetops/view-all
```

## Wolf Gas Cooktops Listing

Route: `/cooking/cooktops-rangetops/gas-cooktops`

Main files:

- `src/app/cooking/cooktops-rangetops/gas-cooktops/page.tsx`
- `src/components/ProductPages/GasCooktopsPage.tsx`
- `src/lib/site-data.ts`
- `src/app/products/[...slug]/page.tsx`

State:

- Canonical filtered listing for Wolf Gas Cooktops.
- Uses the established Wolf listing structure with compact filters, selected Gas Cooktop chip, four reference-matched model-group cards, detailed specifications, statement, and Discover more.
- Cooking > Cooktops & Rangetops > Gas Cooktops points to this route.
- Legacy `/products/cooking/gas-cooktops` permanently redirects here.
- Typography baseline: 60px desktop/46px mobile category heading, 44px product-group and statement headings, 20px model titles, and 13px filters.

Fast checks:

```text
http://127.0.0.1:3000/cooking/cooktops-rangetops/gas-cooktops
http://127.0.0.1:3000/cooking/cooktops-rangetops
http://127.0.0.1:3000/products/cooking/gas-cooktops
```

## Wolf Induction Cooktops Listing

Route: `/cooking/cooktops-rangetops/induction-cooktops`

Main files:

- `src/app/cooking/cooktops-rangetops/induction-cooktops/page.tsx`
- `src/components/ProductPages/InductionCooktopsPage.tsx`
- `src/lib/site-data.ts`
- `src/app/products/[...slug]/page.tsx`

State:

- Canonical filtered listing for Wolf Induction Cooktops.
- Uses the established Wolf listing structure with compact filters, selected Induction Cooktop chip, three USA-matched model-group cards, detailed specifications, reference-matched statement, and Discover more cards.
- Cooking > Cooktops & Rangetops > Induction Cooktops points to this route.
- Legacy `/products/cooking/induction-cooktops`, `/products/cooking/contemporary-induction-cooktops`, and `/products/cooking/transitional-induction-cooktops` permanently redirect here.
- Typography baseline measured from USA: 60px desktop/46px mobile category heading, 40px group and statement headings, 24px desktop/20px mobile model titles, and 13px filters.

Fast checks:

```text
http://127.0.0.1:3000/cooking/cooktops-rangetops/induction-cooktops
http://127.0.0.1:3000/cooking/cooktops-rangetops
http://127.0.0.1:3000/products/cooking/induction-cooktops
```

## Wolf Coffee Systems Listing

Route: `/cooking/coffee-systems`

Main files:

- `src/components/ProductPages/WolfCoffeeSystemsPage.tsx`
- `src/app/cooking/coffee-systems/page.tsx`
- `src/app/products/[...slug]/page.tsx`
- `src/components/MegaMenu/MegaMenu.tsx`
- `src/components/MobileMenu/MobileMenu.tsx`

State:

- Dedicated USA-reference Wolf Coffee Systems listing at the canonical Cooking route.
- Includes the real AEM coffee hero, Cooking category navigation, Series/Width/Finish filters, five USA-height M/E Series product cards with Width/Finish summaries, the reference coffee statement, and Discover more.
- Cooking and Coffee Systems initialize active in the desktop mega menu; the mobile menu opens directly to Cooking and marks Coffee Systems current.
- The former `/products/cooking/coffee-systems` route permanently redirects to the canonical path.
- Typography baseline measured from USA: 60px desktop/46px mobile category heading, 40px hero and statement headings, 24px desktop/21px mobile card titles, and 14px filters.

Fast check:

```text
http://127.0.0.1:3000/cooking/coffee-systems
http://127.0.0.1:3000/products/cooking/coffee-systems
```
# Wolf Microwaves listing

- Route: `/cooking/microwaves`
- Page: `src/app/cooking/microwaves/page.tsx`
- Component: `src/components/ProductPages/WolfMicrowavesPage.tsx`
- Navigation: Cooking > Microwaves uses `/cooking/microwaves` and initializes active in desktop and mobile menus; `/products/cooking/microwaves` redirects permanently.
- Pattern: Wolf Cooking hero, horizontal category navigation, compact filters, grouped product cards, specification rows, statement/CTAs, Discover more.
- Reference: `https://www.subzero-wolf.com/cooking/view-all-cooking/microwaves`

## Wolf Drawers Listing

- Route: `/cooking/drawers`
- Legacy redirect: `/products/cooking/drawers`
- Page: `src/app/cooking/drawers/page.tsx`
- Component: `src/components/ProductPages/WolfDrawersPage.tsx`
- Navigation: Cooking > Drawers uses `/cooking/drawers` and initializes active in desktop and mobile menus.
- Pattern: Wolf Cooking hero, horizontal category navigation, Series/Width filters, grouped WWD/WWDO/VS cards, width summaries, reference statement, shared showroom/brochure CTAs, and Discover more.
- Reference: `https://www.subzero-wolf.com/cooking/view-all-cooking/drawers`

Fast checks:

```text
http://127.0.0.1:3000/cooking/drawers
http://127.0.0.1:3000/products/cooking/drawers
```

## Wolf Outdoor Cooking Listing

- Route: `/cooking/outdoor`
- Legacy redirect: `/products/outdoor`
- Page: `src/app/cooking/outdoor/page.tsx`
- Component: `src/components/ProductPages/WolfOutdoorCookingPage.tsx`
- Navigation: Cooking > Outdoor uses `/cooking/outdoor` and initializes active in desktop and mobile menus.
- Pattern: Wolf outdoor hero, horizontal Cooking category navigation, compact filters, grouped grill/burner, drawer, and ventilation cards, specification rows, reference statement, and Discover more.
- Important: `/refrigeration/outdoor` remains the separate Sub-Zero outdoor refrigeration listing.
- Reference: `https://www.subzero-wolf.com/cooking/view-all-cooking/outdoor`

Fast checks:

```text
http://127.0.0.1:3000/cooking/outdoor
http://127.0.0.1:3000/products/outdoor
http://127.0.0.1:3000/refrigeration/outdoor
```
