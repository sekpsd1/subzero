# Wolf Induction Ranges Notes

Updated: 2026-07-20

- Canonical route: `/cooking/ranges-induction`.
- Legacy redirect: `/products/cooking/induction-ranges` permanently redirects to the canonical route.
- Main component: `src/components/ProductPages/InductionRangesPage.tsx`.
- Rebuilt the former dark generic catalog scaffold as a USA-inspired Wolf Induction listing page.
- Uses the USA hero asset and real Transitional/Professional Induction Range product assets.
- Section flow: full-height hero, cooking category navigation, Ranges intro, selected Induction filter, two family cards, confidence statement, Discover more, global showroom CTA, and footer.
- USA measurements used: 40px hero title, 60px Ranges heading, 24px intro at approximately 574px width, and 24px product card titles.
- Mobile verification: 30px hero title, 327px-wide stacked cards, and zero horizontal overflow at a 390px viewport.
- Browser smoke test passed for `/cooking/ranges-induction`; both expected product families render.
- `npm.cmd run lint -- --ignore-pattern .next-codex/**`: passed. Full build was not repeated while the requested local dev server remained live; the existing workspace Prisma file-lock issue is documented in `docs/WORK_SUMMARY.md`.
