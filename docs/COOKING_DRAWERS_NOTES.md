# Wolf Drawers Listing Notes

Updated: 2026-08-09

## Routes

- Canonical listing: `/cooking/drawers`
- Legacy route: `/products/cooking/drawers` (308 permanent redirect)
- Metadata title: `Drawers | Wolf`
- Metadata description: `Browse Wolf warming drawers and vacuum seal drawers for refined preparation, serving, storage, and sous vide support.`

## Implementation

- Added `src/components/ProductPages/WolfDrawersPage.tsx` using the established Wolf Cooking listing pattern.
- Uses the live USA AEM hero and product imagery for WWD, WWDO, and VS model groups.
- Includes the active Cooking category strip, Series/Width filter row, Warming Drawers and Vacuum Seal Drawers product groups, the `Expands any cook's repertoire` statement, and Discover more cards.
- Shared footer supplies the showroom, appointment, and brochure CTAs.

## Navigation

- Cooking > Drawers now points to `/cooking/drawers` in `src/lib/site-data.ts`.
- Matching Cooking category strips and the footer use the same canonical path.
- Desktop mega menu recognizes `/cooking/drawers`, opens Cooking, selects Drawers, and uses the drawer hero visual.
- Mobile menu opens directly to Cooking and marks Drawers current.

## USA Comparison

- Compared against `https://www.subzero-wolf.com/cooking/view-all-cooking/drawers` at desktop width and the supplied full-page reference.
- Matched section order, hero crop, nine-item category strip, two filter labels, two warming cards, one vacuum seal card, statement layout, and Discover more placement.
- Typography measured from the USA page and used locally: 60px H1, 40px group/statement headings, 24px desktop card titles, and 14px filters. Mobile H1 is 46px.
- Browser QA at 1920px desktop and 390px mobile found no broken loaded images or horizontal page overflow.

## Verification

- Scoped ESLint passed for the new route/component and touched navigation files.
- `npm.cmd run build` passed; all 56 pages compiled and prerendered.
- Build retains one unrelated existing Turbopack warning for an AVIF asset used by `RefrigerationCategoryPage.tsx`.
- Full `npm.cmd run lint` remains blocked by thousands of existing generated-artifact diagnostics under `.next-built-in-ovens`; scoped lint is the completed source result for this task.

## TODO

- No Drawers-specific follow-up is required for this pass.
