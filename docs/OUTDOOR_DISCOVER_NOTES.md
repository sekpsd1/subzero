# Discover Outdoor Notes

Updated: 2026-08-09

## Scope

- Canonical page: `/outdoor/discover-outdoor`
- Legacy path: `/products/outdoor/discover-outdoor` permanently redirects to the canonical page.
- The page is an Outdoor brand/story landing, not a product listing.
- Wolf Outdoor Cooking remains `/cooking/outdoor`; Sub-Zero Outdoor Refrigeration remains `/refrigeration/outdoor`.

## Reference and layout

- Primary comparison: `https://www.subzero-wolf.com/outdoor/discover-outdoor`
- Supplied USA full-page capture was used to confirm order, crop, spacing, and visual emphasis.
- USA AEM assets were reused for the hero, hotspot feature, hosting story, product features, inspiration, showroom, and brand discovery cards.
- Implemented order: Exceptional outdoor living; Master the elements; Your outdoor oasis; drinks-to-dinner confidence; three product stories; inspiration; showroom; outdoor categories; Discover more.

## Navigation

- Outdoor > Discover Outdoor now uses `/outdoor/discover-outdoor` in desktop/mobile navigation and the footer.
- On the canonical route, the desktop mega menu initializes with Outdoor open and Discover Outdoor active.
- The mobile menu initializes inside Outdoor with Discover Outdoor marked current.
- View all outdoor targets the Wolf outdoor product listing at `/cooking/outdoor`.

## Typography

- Measured live USA desktop values: 80px hero H1, 60px major section headings, 40px feature/card headings.
- Local desktop uses those same values at the 1920px breakpoint.
- Mobile uses 46px H1, 42–44px major headings, and 32px feature headings to prevent crowding and overflow.

## Verification

- Browser desktop: 1920px wide, images loaded, metadata correct, no horizontal overflow.
- Browser mobile: 390px wide, 375px document width, no horizontal overflow; hero, copy, feature stories, CTA, and Discover more remain responsive.
- Menu: Outdoor and Discover Outdoor visible/active; canonical Discover Outdoor href and `/cooking/outdoor` View all href confirmed.
- Smoke: canonical 200; legacy 308 to canonical; `/cooking/outdoor` 200; `/refrigeration/outdoor` 200.
- Scoped ESLint for every touched source file passed.
- Full `npm.cmd run lint` reaches existing generated `.next-built-in-ovens` output and fails on generated `require`, `@ts-ignore`, and unused-expression rules; no page-source error was reported.
- Standard `npm.cmd run build` is blocked in Prisma generation by the existing locked `node_modules/.prisma/client/index.js` (`EPERM`). A direct Next build compiled successfully, then the existing invalid Prisma client stopped project-wide type-check because `PrismaClient` is not exported.

## TODO

- None for the first reference-matched pass.

## Screenshot refinement

- Compared the supplied `111.png` USA capture with `222.png` local capture at full desktop scale.
- Increased the desktop hero to the USA full-viewport height and reduced the intro gap so the hotspot image begins at the reference position.
- Matched the measured USA media geometry: 835px hotspot image, 1344×756 confidence image, 944×816 alternating product stories, and 784px inspiration carousel.
- Repositioned the three hotspot labels, restored the hero-first inspiration slide with the next slide peeking at right, enlarged the showroom card, and replaced placeholder category glyphs with the five original USA AEM outline assets.
- Changed the Discover Wolf card from a gradient overlay to the reference hard text/image split.
- Final desktop geometry: Discover Wolf image begins at y=9507 versus y=9508 in the USA capture; total local page height is 11851px versus 11899px reference.
- Mobile recheck at 390px remains free of horizontal overflow.

## Interactive hotspot refinement

- Rebuilt the static hotspot labels as an interactive client accordion based on the supplied USA `<details>` markup.
- All three cards are collapsed by default. Selecting a card opens it; selecting another closes the previous card, and selecting the open card again collapses it.
- Each expanded card includes the exact USA copy and its associated AEM image; plus/minus indicators and desktop positions follow the supplied reference.
- Desktop browser check: expanded card 327×356px, collapsed cards 327×61px, correct one-at-a-time state changes.
- Mobile browser check: full-width stacked accordion at 375px document width with no horizontal overflow or console errors.

## Product story refinement

- Product story rows use a 57/43 image-to-copy split with positive spacing between rows, matching the USA reference proportions without overlapping adjacent images.

## Inspiration carousel refinement

- Replaced the static two-image mockup with a five-slide client carousel using the supplied USA asset order.
- The desktop lead slide is 1291px wide at the 1392px content maximum, with the next 1220px slide continuing past the right viewport edge like the USA reference.
- Added functional previous/next controls, a live slide counter, wraparound navigation, and the featured-products menu affordance.
- The right-side preview keeps its 1220px source width but uses the shorter 580px USA reference height instead of matching the lead slide height.

## Category grid refinement

- Matched the USA reference with near-square desktop cards, 8px card gaps, centered 260px SVG bounds (accounting for whitespace inside the source artwork), full-opacity linework, and 32px category titles.
- Category names now use the corresponding product links from the supplied reference structure.
