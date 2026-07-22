# Wolf Convection Ovens Listing Notes

Updated: 2026-07-22

## Route and scope

- Canonical route: `/cooking/built-in-ovens/convection`
- Legacy redirect: `/products/cooking/convection-ovens` permanently redirects to the canonical route.
- Parent editorial landing page remains `/cooking/built-in-ovens`.
- Only Cooking > Built-in Ovens > Convection navigation and its corresponding parent-page CTA were changed.

## USA reference comparison

The supplied USA and local full-page PDF captures were rendered to PNG and compared visually. The implementation now follows the USA filtered listing order:

1. Full-height oven media hero with `Faster heat, better airflow` at the lower left.
2. Cooking category strip with Built-in ovens selected.
3. Built-In Ovens category heading and intro.
4. Series (2), Width, and Finish filters with Single Oven and Double Oven selected.
5. Exactly 10 convection models in a three-column desktop grid, ordered to match the PDF capture.
6. Light `Faster heat, better airflow` statement.
7. Two-card `Discover more` section followed by the shared pre-footer and footer.

Convection Steam and Convection Speed product groups were removed from this route because the supplied USA capture shows the Single Oven + Double Oven filtered result only.

## Hero media

- The full-height hero uses the exact USA AEM image `KDC_17-18_Canadian-Bay_Kirstyn-Lloyd_02` supplied in the reference markup.
- The reference hero is a static picture, so page-specific play/pause and mute controls were removed.
- The hero title remains anchored at the lower left with a restrained dark gradient for legibility.

## Typography

- Category title: 46px mobile / 54px desktop.
- Hero statement: 34px mobile / 44px desktop.
- Product model titles: 20px.
- Filter and category labels: 13px.
- CTA labels: 12px.

This keeps hero-scale typography confined to the category introduction and prevents listing cards from appearing oversized.

## Verification

- `npm.cmd run lint`: passed on 2026-07-22.
- `npm.cmd run build`: blocked during `prisma generate` by the existing Windows `EPERM` lock on `node_modules/.prisma/client/index.js`, before Next compilation begins.
- Direct `next build` with an isolated dist directory: Next compilation passed; the project-wide type-check remains blocked by the existing missing `PrismaClient` export from the locked generated client.
- Browser desktop check after PDF refinement: passed with a full-height hero, one 60px H1, 10 product cards, a 1392px three-column grid, a 1440px category strip, and no horizontal overflow.
- Browser 390px mobile check after PDF refinement: passed with an 844px hero, one 46px H1, 10 product cards, and no horizontal overflow.
- Mega menu opened with Cooking and Built-In Ovens selected; the Convection tile resolves to `/cooking/built-in-ovens/convection`.
- Parent `/cooking/built-in-ovens` rendered successfully.
- Legacy `/products/cooking/convection-ovens` returned a 308 and resolved to the canonical route with the expected metadata title.

## TODO

- Replace shared family artwork with individual model renders if localized SEA product imagery becomes available.
