# Wolf Coffee Systems Listing Notes

Updated: 2026-08-09

## Route and implementation

- Canonical route: `/cooking/coffee-systems`.
- The static Cooking route renders `WolfCoffeeSystemsPage`; the existing catch-all permanently redirects `/products/cooking/coffee-systems` to it while preserving all other fallback behavior.
- Metadata: `Coffee Systems | Wolf` with the requested espresso/cappuccino/latte description.
- The component uses the same data-array/card pattern and layout proportions as the completed Wolf Ventilation and Cooktops listings.

## Reference comparison

- Used the live USA Coffee Systems and Cooking pages with Browser/CDP inspection.
- Reused the exact USA AEM hero and five currently displayed Coffee Systems product images.
- Matched the reference section order: hero, category navigation, category intro, filters, product listing, statement, Discover more, shared showroom/footer.
- Measured USA desktop type: 60px H1, 40px hero/group/statement headings, 24px product titles, 14px filters.
- The local mobile pass uses 46px H1 and 21px card titles to avoid oversized or overflowing text.
- Refined against the supplied `01.png` USA and `02.png` local captures: removed the extra product-group intro, model labels, extended spec rows, and card CTAs; restored the USA intro and statement copy; and reduced card height to the reference Width/Finish structure.
- Corrected the wide-desktop hero from `max(100svh, 56.25vw)` to `100svh` so the hero headline remains visible at the bottom of a 1905x954 viewport like the supplied reference.

## Navigation

- All Cooking category, header, footer, and Discover Wolf links now use `/cooking/coffee-systems`.
- Desktop mega menu initializes Cooking and Coffee Systems active and uses the coffee hero for the Coffee Systems visual.
- Mobile menu initializes at the Cooking submenu on this route and marks Coffee Systems with `aria-current="page"`.
- No unrelated menu hrefs or category logic were changed.

## Verification

- Browser desktop: 1280x720, all coffee assets loaded, metadata correct, product cards and menu verified.
- Browser mobile: 390x844, no horizontal overflow, hero/category strip/cards/menu verified.
- Scoped ESLint for the changed Coffee Systems source: passed.
- Project lint passed with `.next`, `.next-*`, `.tmp`, and generated Plesk assets excluded.
- `npm.cmd run build`: passed after running outside the sandbox so Prisma could regenerate its client; Next compiled, type-checked, and generated all 52 pages successfully.
