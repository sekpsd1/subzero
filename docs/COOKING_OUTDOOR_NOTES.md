# Wolf Outdoor Cooking Notes

- Canonical route: `/cooking/outdoor`.
- Legacy `/products/outdoor` uses a permanent server redirect to the canonical route.
- `/refrigeration/outdoor` was not changed and remains the Sub-Zero outdoor refrigeration category.
- Cooking > Outdoor now links to the canonical route; desktop and mobile menus initialize at Cooking with Outdoor current.
- The page reuses the established Wolf Cooking listing pattern from Drawers: media hero, category strip, compact filters, data-driven groups/cards, statement, Discover more, and shared footer CTAs.
- USA reference comparison confirmed section order, five product families, exact product imagery, and 60px / 40px / 24px / 14px desktop typography for H1 / group headings / card titles / filters.
- Metadata title: `Outdoor Cooking | Wolf`.
- Browser QA passed at 1440 x 900 desktop and 390 x 844 mobile: no page overflow, typography and section order match the reference, product imagery loads as sections enter view, and Cooking > Outdoor is current in both menus.
- `/products/outdoor` resolves to `/cooking/outdoor`; `/refrigeration/outdoor` still renders `Outdoor Refrigeration | Sub-Zero` independently.
- Scoped source lint passed with existing generated output folders excluded. The full lint command was stopped after it continued scanning existing generated artifacts without producing results.
- Production build passed after Prisma client generation was allowed outside the sandbox. The only warning is the existing unrelated Turbopack AVIF warning from the Refrigeration category asset.
- Screenshot refinement against `001.png`/`002.png`: scoped the page to Times/Segoe UI fallbacks to better approximate Chronicle Display/Museo Sans without changing global typography; matched USA 18px/25.2px product-group copy, 696px copy width, product-media heights, 104px inter-group rhythm, 248px statement section, and the 96px Discover-title offset. Fuel variants now stack like the reference and the filter count shows 25.
- Focused refinement against the lower-section comparison: removed the extra statement divider and used a lighter editorial serif fallback only for the statement and Discover content, preserving the already-matched product-list geometry.
- TODO: none for the first reference-matched pass.
