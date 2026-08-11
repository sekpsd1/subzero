# Outdoor Gas Grills

- Canonical route: `/outdoor/grills`.
- Outdoor > Grilling now links directly to the canonical route. Desktop and mobile menus initialize at Outdoor, with Grilling current on that route.
- The former menu query URL was replaced at the navigation-data level; no redirects or behavior changes were added to unrelated product routes.
- The page follows the supplied USA listing capture and the existing Outdoor Refrigeration implementation for its section order, spacing, restrained typography, selected filter, single product card, statement, and Discover more grid.
- Key desktop sizes follow the established Outdoor baseline: 60px H1, 40px statement, 22px product-card title, and 13px filters.
- Existing Outdoor Discover, Outdoor Refrigeration, and Wolf Outdoor Cooking pages were not changed.
- Browser QA passed at desktop and 390px mobile. Outdoor and Grilling initialize active, the Grilling link resolves to `/outdoor/grills`, above-the-fold imagery loads, and mobile horizontal overflow is 0px.
- `npm.cmd run lint` and `npm.cmd run build` passed on 2026-08-11. The build retains one unrelated Turbopack warning for the existing French Doors AVIF import.
- Refined against the supplied `111.png`/`222.png` comparison: replaced the hero with the exact USA `outdoor-carousel-1` asset and aligned the 1920px intro, filter, product card, statement, and Discover more geometry to the live USA page. Key section positions now track the reference within roughly 1px; the shared site header/footer remain unchanged.
