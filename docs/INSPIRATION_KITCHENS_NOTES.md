# Inspiration Gallery / Kitchens

Updated: 2026-08-12

## Implementation

- Added the completed gallery to both `/inspiration` and `/inspiration/kitchens`, using the same component and metadata.
- The desktop mega-menu Inspiration destination is `/inspiration`; Inspiration initializes active for `/inspiration/*`.
- Replaced the old `/inspiration` placeholder so the primary navigation no longer opens the scaffold page.

## Reference and data

- Reference URL: `https://www.subzero-wolf.com/inspiration/kitchens#numberOfResults=20`.
- The supplied `111.png` capture and saved USA gallery HTML were used for the visual composition. A connected USA browser session then exposed the public Coveo response used to import all 83 gallery records and exact facet fields.
- The local dataset is stored in `src/data/kitchen-gallery.ts`. It is intentionally static so the site does not depend on the USA site's temporary Coveo token at runtime; re-import it when the USA gallery changes.
- Pagination matches the source hash behavior: 20 results per page, `first` offsets, five numbered pages, next, and `numberOfResults=100` for `VIEW ALL 83`.

## Type and layout

- H1: 38px mobile / 54px desktop.
- Subheading: 19px mobile / 22px desktop.
- Intro: 14px mobile / 16px desktop.
- Card captions: 14px.
- Desktop uses a 258px filter rail plus a three-column gallery; mobile uses collapsible filters and a responsive one/two-column grid.

## Verification

- Browser QA passed for the 83-record dataset: initial state shows results 1-20 with pages 1-5 and `VIEW ALL 83`; page 2 shows results 21-40 with the correct hash; View all renders all 83; Contemporary returns the exact source count of 47; no loaded images were broken.
- `/inspiration` and `/inspiration/kitchens` render the same gallery, and the desktop mega-menu initializes Inspiration active on both routes.
- `npm.cmd run lint` and `npm.cmd run build` passed on 2026-08-12. The build retains one existing Turbopack AVIF warning from the unrelated refrigeration category asset.
