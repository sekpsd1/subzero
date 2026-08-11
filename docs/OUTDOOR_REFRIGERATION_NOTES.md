# Outdoor Refrigeration Notes

Updated: 2026-08-11

## Route and navigation

- Canonical route: `/outdoor/refrigeration`.
- Outdoor > Refrigeration points to the canonical route and initializes active in desktop and mobile menus.
- `/refrigeration/outdoor` remains the existing generic Sub-Zero category route and was not changed.

## Reference refinement

- Used supplied `111.png` as the target and `222.png` as the previous local state.
- Replaced the generic refrigeration hero and category selector with the Outdoor listing structure.
- Added the USA outdoor-kitchen hero and `Masterful performance` caption.
- Added the `All Outdoor` intro, compact filters, selected Refrigeration chip, and two outdoor refrigeration product cards.
- Replaced the generic preservation statement with the outdoor culinary statement.
- Rebuilt Discover more with a large Sub-Zero feature followed by Wolf and Cove cards.
- Typography baseline: 60px desktop listing title, 40px statement title, 22px desktop product titles, and 13px filters.

## Verification

- Browser QA passed at 1440px desktop and 390px mobile.
- Confirmed `All Outdoor`, both product cards, outdoor statement, Discover more order, loaded key imagery, and no mobile horizontal overflow.
- Full ESLint passed after generated `.next-*` output directories were excluded from lint.
- The production build passed, including TypeScript and static generation of all 61 routes.
