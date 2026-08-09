# Cooking Accessories Notes

Updated: 2026-08-09

## Routes

- Canonical: `/cooking/accessories`
- Legacy: `/support/accessories` returns a permanent redirect to the canonical route.

## Implementation

- Added `src/app/cooking/accessories/page.tsx` with route-specific metadata.
- Added `src/components/ProductPages/AccessoriesPage.tsx` for the light catalog/support page.
- Recreated the live store hierarchy: breadcrumb, four category tabs, 36px page title, 15px category links, three line-art category illustrations, registered-product placeholder, model search, promotion, and factory-certified parts/service.
- Reused the shared Header and Footer and a real local kitchen asset for the promotion visual.
- Kept search, login, promotion, and service actions as safe UI/navigation placeholders; no checkout, payment, account, or registration backend was introduced.

## Navigation

- Updated Accessories hrefs in `src/lib/site-data.ts`, the shared Footer, and Owner Resources to `/cooking/accessories`.
- Added route-aware Cooking/Accessories state for desktop and mobile menus.

## Reference comparison

- Browser inspection of the live USA `/store` page measured a 36px H1, 18px reference category headings, restrained 11px tabs, and an approximately 1070px desktop content canvas at 1280px.
- Local Browser QA passed at 1280px desktop and 390px mobile.
- Verified canonical metadata, all local images, no console errors, no horizontal overflow, correct menu href, and the legacy redirect.

## Verification

- Scoped ESLint for all touched source files: passed.
- Full `npm.cmd run lint`: timed out after 120 seconds without reporting a source error.
- `npm.cmd run build`: blocked during `prisma generate` by the existing Windows lock on `node_modules/.prisma/client/default.js`.
- Direct `next build` with an isolated dist directory: application compilation passed, then the existing `src/lib/prisma.ts` / missing `PrismaClient` export stopped the type-check.

## Remaining work

- Connect search, login, promotions, and regional service destinations when their backend/content is available.
- Re-run the standard production build after the existing Prisma client lock/generation issue is repaired.
