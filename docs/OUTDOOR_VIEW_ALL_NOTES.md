# All Outdoor Listing Notes

Updated: 2026-08-12

## Route and composition

- Canonical route: `/outdoor/view-all-outdoor`.
- Route file: `src/app/outdoor/view-all-outdoor/page.tsx`.
- Page component: `src/components/ProductPages/OutdoorViewAllPage.tsx`.
- Metadata title: `All Outdoor Appliances | Sub-Zero and Wolf`.
- The listing follows the supplied USA `777.png` reference: shared outdoor hero, `All Outdoor` intro, six linked category labels, grouped compact product cards with specification summaries, the Designer Ice Maker promo, outdoor statement, and Discover more.
- Product groups and cards are data-driven to keep the page concise and reduce repeated markup.

## Navigation and redirects

- Changed only the top-level Outdoor navigation destination to `/outdoor/view-all-outdoor`.
- Desktop Mega Menu opens at Outdoor on the canonical route. Its `View all outdoor` CTA points to the page and is marked current.
- Mobile Menu opens directly in Outdoor on the canonical route and includes a current `View all outdoor` link.
- `/products/outdoor` and `/products/outdoor/view-all-outdoor` permanently redirect to `/outdoor/view-all-outdoor`.
- `/products/outdoor?default.categories=outdoor%2Fcooking-grilling` still redirects to `/cooking/outdoor`, preserving the separate Wolf Outdoor Cooking listing.
- `/outdoor/discover-outdoor`, `/outdoor/grills`, `/outdoor/refrigeration`, and `/cooking/outdoor` were smoke-tested and remain available.

## Reference and typography

- The live USA URL geo-routed the Thailand Browser session to the international selector, so the supplied `777.png` capture is the authoritative visual reference.
- Existing Outdoor pages previously matched to USA were reused for the hero, editorial assets, maximum content width, colors, and Discover more composition.
- Desktop Browser measurements: 60px H1, 36px group headings, 20px product-card titles, and 11–13px category/spec labels.
- 390px mobile measurements: 46px H1, 30px group headings, 18px card titles, 390px client/scroll width, and no horizontal page overflow. Category navigation scrolls horizontally within its own row.
- Browser checks confirmed all six groups, correct section order, product/spec content, the ice-maker promo, and loaded product imagery.

## Verification

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed after Prisma client generation was rerun outside the sandbox because Windows denied access to the locked generated client file.
- Next.js generated `/outdoor/view-all-outdoor` as a static route. The only build warning is the existing unrelated French-door AVIF warning.
- Both legacy All Outdoor URLs return 308 to the canonical route; protected sibling routes return 200.

## TODO

- None for the first reference-matched pass.
