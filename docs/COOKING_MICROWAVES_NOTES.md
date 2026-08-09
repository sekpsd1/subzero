# Wolf Microwaves Listing Notes

Updated: 2026-08-09

## Route and scope

- Implemented `/cooking/microwaves` as the dedicated canonical App Router page.
- Kept `/products/cooking/microwaves` as a permanent redirect for compatibility with the earlier URL.
- Metadata title: `Microwaves | Wolf`.
- Metadata description: `Browse Wolf microwaves, drawer microwaves, and built-in microwave options with refined design and everyday speed.`
- No unrelated Refrigeration, Cooking, header, footer, search, or menu behavior was changed.

## Navigation

- Updated Cooking > Microwaves navigation across the site to `/cooking/microwaves`.
- Added route-aware initialization in the desktop mega menu so Cooking and Microwaves are active and the microwave visual is shown.
- Added the same route-aware initialization to the mobile menu so it opens directly inside Cooking and marks Microwaves with `aria-current="page"` and an underline.

## Listing pattern and content

- Reused the established Coffee Systems and Ventilation listing structure: full-bleed Wolf hero, horizontally scrollable category strip, split category introduction, compact filter row, three-column desktop cards, one-column mobile cards, statement, CTAs, and Discover more.
- Product groups match the USA reference: Drop-Down Door (five models), Drawer (two models), and Side-Swing Door (two models).
- Cards use data arrays and include real AEM product imagery plus Width, Finish where applicable, Style, Door type, and a product-details CTA.

## USA comparison

- Compared the live USA listing in the in-app browser at desktop size before implementation.
- Refined against the supplied `03.png` reference and `04.png` local capture: corrected the hero to the USA Midnight Arches kitchen asset, reduced filters to Series/Width/Finish, restored compact Width/Finish product cards, stacked group descriptions beneath headings, tightened group spacing, and matched the USA convenience statement.
- Measured typography: 60px H1, 40px hero/group/statement headings, 24px desktop card titles, and 14px category/filter labels.
- Local desktop comparison confirmed the same key typography, section order, active category item, three-column card grid, and loaded hero/product assets.
- Local 390px mobile comparison confirmed a 46px H1, 34px hero statement, horizontally scrollable category navigation, single-column cards, correctly opened Cooking submenu, and no horizontal page overflow.

## Verification

- Scoped ESLint for the microwave route, component, and related navigation files: passed.
- `npm.cmd run lint`: did not complete within the five-minute command limit and reported no lint error before timeout.
- `npm.cmd run build`: passed with all 54 routes compiled/type-checked and `/cooking/microwaves` prerendered. The only warning is the pre-existing Turbopack AVIF warning for a French-door asset outside this page.
- Smoke test: `http://127.0.0.1:3000/cooking/microwaves` returned HTTP 200; the former `/products/cooking/microwaves` path returned HTTP 308 to the canonical URL.

## TODO

- Product-detail links currently resolve through the existing generic catalog fallback until dedicated model-detail pages are created.
