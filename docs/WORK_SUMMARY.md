# Work Summary

Updated: 2026-07-19

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

Wolf Ranges landing page completed:

- Added `/cooking/ranges` with USA-reference hero, intro, showroom, Dual Fuel, Induction, Gas, top-down configurations, design options, Why Wolf, brochure, and showroom CTAs.
- Updated the Cooking menu, Wolf discovery page, and footer range links to `/cooking/ranges`.
- Added permanent redirects from `/products/cooking/ranges` and `/products/cooking/dual-fuel-ranges` to the canonical route.
- Matched the USA desktop typography measurements: 80px hero heading, 60px section headings, and 18px intro copy at approximately 912px width; mobile remains responsive without horizontal overflow.
- Refined the page against the supplied full-page USA capture with the light editorial layout, alternating top-down range families, comparison overview, compact showroom/product features, inspiration gallery, and related-content cards.

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
