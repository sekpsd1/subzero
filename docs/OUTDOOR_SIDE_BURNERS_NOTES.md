# Outdoor Side Burners Notes

Updated: 2026-08-11

## Scope

- Canonical route: `/outdoor/side-burners`
- Route file: `src/app/outdoor/side-burners/page.tsx`
- Page component: `src/components/ProductPages/OutdoorSideBurnersPage.tsx`
- Metadata title: `Side Burners and Burner Modules | Wolf Outdoor`
- Metadata description: `Browse Wolf outdoor side burners and built-in burner modules for complete outdoor cooking stations.`

## Navigation and legacy paths

- Added only Outdoor > Side Burners in `src/lib/site-data.ts`, targeting `/outdoor/side-burners`.
- Desktop `MegaMenu` and `MobileMenu` initialize with Outdoor open and Side Burners current on the canonical route.
- `/products/outdoor?default.mnseries=Burner+Module%2CSide+Burner` permanently redirects to `/outdoor/side-burners`.
- `/products/outdoor/side-burners` permanently redirects to `/outdoor/side-burners`.
- The existing unfiltered `/products/outdoor` redirect to `/cooking/outdoor` is unchanged.

## Reference and implementation

- Primary visual reference: supplied `111.png` USA capture.
- The live USA filtered and fallback URLs geo-routed the Thailand browser session to the international landing, so the supplied capture and the already reference-matched `/outdoor/grills` implementation were used as the authoritative structure and spacing baseline.
- Reused the exact outdoor hero and existing AEM product assets already used by `WolfOutdoorCookingPage` for BM13 and SB13.
- Product cards are data-driven and match the USA PLP with only Width and Fuel Type rows; the card titles remain product-detail links.
- The Outdoor statement and Sub-Zero/Wolf/Cove Discover more composition follow the established Outdoor listing pattern.

## Typography and browser QA

- Desktop H1: 60px.
- Product group heading: 40px.
- Desktop product card titles: 24px.
- Filter and navigation labels: 11-13px.
- Browser QA confirmed loaded BM13/SB13 imagery, 1265px desktop client width with no overflow, and a 390px mobile client width with no overflow.
- Protected sibling routes returned 200: `/outdoor/grills`, `/outdoor/refrigeration`, `/outdoor/discover-outdoor`, and `/cooking/outdoor`.
- Both legacy paths returned 308 with `location: /outdoor/side-burners`.

## Verification

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed after Prisma generation was allowed to update its client files in `node_modules`.
- Production smoke assertions found BM13, SB13, and both product titles.

## TODO

- None for the first reference-matched pass.
