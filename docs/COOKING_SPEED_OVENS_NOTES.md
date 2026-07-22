# Wolf Speed Ovens Notes

Updated: 2026-07-22

## Route and scope

- Canonical route: `/cooking/built-in-ovens/convection-speed`
- Route file: `src/app/cooking/built-in-ovens/convection-speed/page.tsx`
- Page component: `src/components/ProductPages/SpeedOvensPage.tsx`
- Metadata title: `Speed Ovens | Wolf Built-In Ovens`
- Metadata description covers compact speed, convection, broil, and microwave versatility.

## Navigation and redirects

- Changed only Cooking > Built-in Ovens > Convection Speed in `src/lib/site-data.ts` to the canonical route.
- Cooking and Built-In Ovens initialize active through the existing pathname logic in `MegaMenu.tsx`; that shared logic was not changed.
- Added permanent redirects from:
  - `/cooking/view-all-cooking/built-in-ovens?default.mnseries=Speed+Oven`
  - `/cooking/built-in-ovens/speed`
  - `/products/cooking/convection-speed-ovens`
  - `/products/cooking/speed-ovens`

## Reused listing pattern

- Kept the same 1392px listing canvas, 1440px horizontal category strip, filter treatment, three-column desktop/two-column tablet/one-column mobile card grid, confidence statement, and Discover more cards used by the convection and convection-steam routes.
- Uses the exact USA `KDC_17-18_Canadian-Bay_Kirstyn-Lloyd_02` static hero image shown in the supplied markup and reference capture.
- The reference hero is an image rather than a playable video, so this listing intentionally has no pause/play control. The parent Built-In Ovens video component remains unchanged.

## USA reference match

- Reference structure checked: full-height Wolf kitchen media, cooking-category strip, Built-In Ovens intro, Series/Width/Finish controls, selected Speed Oven chip, five products, `Faster heat, better airflow`, and the two Discover more cards.
- Product order: SPO50CM, SPO50PE, SPO50PM, SPO50TE, SPO50TM.
- Product copy includes 24/30-inch widths, Black or Stainless Steel finishes, Convection Speed oven type, and convection/broil/microwave capability.
- Added the required `Convection Speed Ovens` group introduction and related links to Convection and Convection Steam.
- The live USA URL geo-redirected to the international landing page in Thailand, so visual measurements came from the supplied USA full-page capture; official product pages were used to confirm current model data.

## Typography and responsive checks

- Desktop: 60px Built-In Ovens title, 44px product group and confidence titles, 20px product-card titles, 13px filter controls.
- Mobile: 46px Built-In Ovens title, 30px hero statement, 20px card titles.
- Browser verification at 1440 x 900 and 390 x 844 confirmed five cards, loaded product images, and zero horizontal overflow.

## Verification

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: blocked during `prisma generate` by the existing Windows `node_modules/.prisma/client/index.js` file lock (`EPERM`).
- Direct `next build` with an isolated dist directory: application compilation passed; the project-wide TypeScript phase then stopped at the existing `src/lib/prisma.ts` error because the locked Prisma client has no generated `PrismaClient` export.
- Browser smoke tests passed for the canonical route, parent route, menu state, metadata, legacy redirects, desktop layout, and mobile overflow.

## TODO

- Retry the standard build after stopping the process that holds the Prisma client lock and regenerating the client.
