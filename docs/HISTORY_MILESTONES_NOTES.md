# History and Milestones

Updated: 2026-08-13

## Scope

- Canonical route: `/our-story/history-milestones`
- Reference: `https://www.subzero-wolf.com/our-story/history-milestones`
- Shared composition: existing `Header` and `Footer` with the Our Story showroom treatment.

## Implementation

- Full-viewport autoplaying, muted, looping history hero with a poster, a 60px circular pause/play control whose progress ring follows the real video timeline, and reduced-motion pause behavior.
- Reference introduction copy and responsive 80px desktop heading.
- Reference-matched 1392px desktop content width, serif introduction copy, 692px paired timeline imagery, 8px card gaps, and 1344px feature media.
- Structured timeline data mapped into editorial two-column and wide-image layouts, with year and copy aligned horizontally beneath paired desktop images.
- Includes 1926, 1930s, 1943, 1945, 1950s, 1960s, 1970s, 1980s, 1990, 1999, 2000, 2003, 2008, 2012, 2013, 2018, 2020, 2023, and 2025.
- 1945 and 2012 are large visual milestones between timeline groups.
- All reference media is stored locally in `public/assets/history-milestones/`; only the hero poster is eager via the video element and timeline imagery uses `next/image` lazy loading.

## Files

- `src/app/our-story/history-milestones/page.tsx`
- `src/components/HistoryMilestones/HistoryMilestonesPage.tsx`
- `public/assets/history-milestones/*`
- `docs/HISTORY_MILESTONES_NOTES.md`

## Validation

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed; the only build warning is the existing unrelated Turbopack AVIF warning from the Refrigeration category asset.
- HTTP smoke test: route returned 200 and server-rendered `History and milestones` content.
- Browser QA: passed at 1904px, 1440px, 1024px tablet, and 390px mobile; the desktop geometry matches the reference within browser subpixel rounding.
- Confirmed the 80px / 81.6px desktop H1, 52px mobile H1, correct chronological heading order, loaded timeline imagery, and no horizontal overflow.
- Pause/play toggled the real hero video state in both directions. No page runtime errors or failed assets were found; browser output contains only existing shared-image development warnings.
- Remaining work: none in the requested page scope.
