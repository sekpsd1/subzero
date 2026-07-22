# Wolf Convection Steam Ovens Listing Notes

Updated: 2026-07-22

## Route and navigation

- Canonical route: `/cooking/built-in-ovens/convection-steam`
- Legacy redirect: `/products/cooking/convection-steam-ovens` permanently redirects to the canonical route.
- Updated only Cooking > Built-in Ovens > Convection Steam and the matching Convection Steam family links on the parent Built-In Ovens page.
- The mega menu initializes with Cooking and Built-in Ovens active on this route; its Convection Steam card uses the canonical path.

## Reused page pattern

- The page follows the established `/cooking/built-in-ovens/convection` listing order and its 1392px content canvas, 1440px category strip, compact filter controls, three-column desktop product grid, confidence statement, and `Discover more` cards.
- The hero uses the exact static USA AEM kitchen image and the `Faster heat, better airflow` lower-left headline from the supplied markup.
- The page remains a filtered product listing rather than an extended editorial landing page.

## Content and products

- Selected filter: Convection Steam Oven.
- Models: CSO50PM, CSO50TM, CSO50CM, CSO50PE, and CSO50TE.
- Card summaries include width, oven type, finish, and Plumbed optional.
- Cards are ordered Contemporary, E Professional, M Professional, E Transitional, and M Transitional to match the USA capture.
- The closing discovery cards match the USA Sub-Zero and Cove content.

## USA comparison and media

- The supplied full-page USA capture and hero markup were compared directly with the local capture.
- Removed the local-only product-group introduction, video controls, statement CTAs, and related-category cards because those elements were not present in the supplied USA reference.
- Section order, Series/Width/Finish filter row, selected-filter treatment, card order, 20px card titles, confidence statement, and `Discover more` layout now follow the supplied reference.

## Typography and responsive checks

- Category title: 60px desktop / 46px mobile.
- Product card titles: 20px.
- Filter controls: 13px.
- CTA labels: 11-12px.
- Browser checks passed at 1280px desktop and 390x844 mobile with five cards and zero horizontal overflow.

## Verification

- `npm.cmd run lint`: passed on 2026-07-22.
- Metadata title and description: verified in the browser.
- Parent `/cooking/built-in-ovens`: rendered successfully.
- Legacy redirect resolved to the canonical route with the correct title.
- `npm.cmd run build`: blocked before Next compilation by the existing Windows `EPERM` lock on `node_modules/.prisma/client/index.js` during `prisma generate`.
- Direct isolated Next build: Turbopack compilation passed; the project build then stopped during the existing project-wide type-check stage. Its only emitted warning was the pre-existing unsupported AVIF import in `RefrigerationCategoryPage.tsx`.

## TODO

- Replace shared Wolf AEM family renders with localized model-specific SEA imagery if it becomes available.
