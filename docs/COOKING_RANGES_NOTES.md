# Wolf Ranges Notes

Updated: 2026-07-20

- Canonical route: `/cooking/ranges`.
- Page component: `src/components/ProductPages/WolfRangesPage.tsx`.
- Navigation updates: Cooking menu, Discover Wolf range links, and footer now use the canonical route.
- Permanent legacy redirects: `/products/cooking/ranges` and `/products/cooking/dual-fuel-ranges` both resolve directly to `/cooking/ranges`.
- USA comparison: desktop hero H1 measured at 80px, section headings at 60px, and intro at 18px with a 912px content width. The local page follows those values and scales down on mobile.
- Added the measured compact `The showroom experience` image-and-copy card, and set the intro CTA to `Explore the Wolf Range`.
- Visual assets are real Wolf/AEM range, showroom, product, and top-down configuration assets.
- Verified section order, CTA labels, desktop layout, and mobile hero/category/cards without horizontal overflow.
- Refined against the supplied full-page USA capture: light warm palette, alternating top-down family sections, three-column comparison overview, compact showroom and 48-inch induction cards, inspiration collage, editorial cards, and complete-kitchen grid.
- Hero now uses the local `Wolf - Ranges - Animation (1).mp4` asset, published as `/assets/subzero/wolf-ranges-animation.mp4` for reliable local delivery.
- Added an accessible circular Pause/Play control at the lower-right of the Hero video, matching the USA reference treatment.
- The Hero control now reuses the exact homepage treatment: 44/48px responsive button, 21px progress-ring radius, 2.4px progress stroke, Lucide Pause/Play icons, and the same hover behavior.
- Intro and family layout refined to the supplied USA capture: showroom CTA, 160px red guide with flame mark, 1556px family canvas, 718px top-down product image, and centered serif family copy.
- The centered bottom `Visit a showroom` CTA is now viewport-sticky: hidden throughout the Hero video, revealed once the page reaches the Ranges intro, and retained through the following content.
- Dual Fuel now mirrors the USA product-with-modal composition more closely: exact USA copy, real burner-option SVGs, selected option treatment, burner description, plus-icon CTA, and the measured 718px/486px desktop columns with a 177px gap.
- Induction now uses the full USA paragraph, omits the non-reference width-option row, and restores the alternating desktop composition with a 718px product image.
- Gas now matches the USA content treatment with exact copy, real configuration SVGs, selected All burner card, supporting burner description, and the plus-icon CTA.
- Wolf Ranges overview now uses the USA comparison copy and full data-driven specification rows, with the measured wider three-column layout, vertical linked values, and reference-sized controls.
- Comparison color rows now include USA-style swatches, Induction finish `NEW` labels, ordering footnotes, and row-specific heights matching the supplied lower-table capture.
- Each Wolf Ranges overview column now receives the USA-style warm-gray background on hover and keyboard focus-within, extended 24px beyond both column edges without shifting table content.
- The showroom and featured Induction cards now use the USA desktop canvas: 1392px content parent, 1120px showroom card, 426px showroom image, exact USA copy, and 160px separation before the featured range.
- The 48-inch Professional Induction Range spotlight now matches the USA 1392×696px split card, square image crop, Product spotlight label, exact copy, and 54px CTAs.
- The kitchen inspiration section now uses the exact USA copy, functional Contemporary/Traditional/Transitional tabs, a 918px/459px gallery split, 696px image height, the exact three USA asset groups, a mobile snap carousel, and an accessible image lightbox. The Gladwyne image uses its working AEM delivery URL because its Scene7 alias returns 403.
- “More to savor” now uses the complete USA editorial copy, `View recipes` CTA, 434px desktop imagery, 40px card headings, 16px body copy, and 52px outline buttons.
- “Complete your kitchen” now matches the USA two-card dynamic carousel: square desktop cards, exact plural labels and view-all paths, mobile snap scrolling, bottom gradient, and hover/focus chevron treatment.

## Verification (2026-07-20)

- Changed: `src/components/ProductPages/WolfRangesPage.tsx`, `src/app/products/[...slug]/page.tsx`, `docs/WORK_SUMMARY.md`, `docs/PAGE_COMMANDS.md`, and this note.
- Browser/CDP: USA measured at 80px hero H1, 60px main section headings, 18px intro, and 912px intro width. Local now returns the same desktop values; mobile returns 56px/42px with zero horizontal overflow.
- Smoke tests passed for `/cooking/ranges` and the legacy `/products/cooking/dual-fuel-ranges` redirect to `/cooking/ranges`.
- `npm.cmd run lint -- --ignore-pattern .next-codex/**`: passed. Plain `npm.cmd run lint` scans the generated `.next-codex` directory and reports generated-code errors.
- `npm.cmd run build`: blocked during `prisma generate` by a Windows `EPERM` lock in `node_modules/.prisma`. Direct `npx.cmd next build` compiled the application successfully, then type-check stopped at `src/lib/prisma.ts` because the locked Prisma client could not be regenerated.
- TODO: rerun the standard build after the external Prisma file lock is released; no page-specific visual TODO remains.
