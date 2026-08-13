# Sub-Zero Group Foundation

## Route and navigation

- Route: `/our-story/foundation`
- Menu path: `Our Story > Foundation`
- The existing Foundation menu href already pointed to `/our-story/foundation`; no shared navigation file was changed.

## Files added

- `src/app/our-story/foundation/page.tsx`
- `src/components/Foundation/FoundationPageContent.tsx`
- `public/assets/foundation/hero.avif`
- `public/assets/foundation/juvenile-diabetes.avif`
- `public/assets/foundation/food-security.avif`
- `public/assets/foundation/community-centers.avif`
- `public/assets/foundation/breakthrough-t1d.avif`
- `public/assets/foundation/matthew-25.avif`
- `public/assets/foundation/river-food-pantry.avif`
- `public/assets/foundation/ymca.avif`
- `public/assets/foundation/contact.avif`

## Page implementation

- Full-viewport food-ingredient hero with the shared transparent Header.
- Mission introduction and three structured funding-area items.
- Responsive impact carousel with four structured items, disabled boundary controls, live counter, focus styles, and reduced-motion handling.
- Accessible impact modal with initial focus, focus containment, Escape/backdrop/Close dismissal, body scroll lock, and trigger focus restoration.
- Foundation contact panel with the USA Microsoft Forms URL and safe external-link attributes.
- Existing `Footer` supplies the U.S. showroom CTA and the shared site footer.
- All page imagery is stored locally and rendered with `next/image`, meaningful alt text, responsive `sizes`, and stable aspect ratios.
- Mission and funding-card typography was refined against computed USA-reference values: 18px/25.2px mission copy, 16px/19.52px funding copy, weight 200, 24px content gaps, and the 1140px mission text measure.

## Validation

- Browser comparison against the USA reference at desktop dimensions, including computed heading sizes, spacing, image crop, carousel behavior, and modal behavior.
- Responsive checks: 1920px desktop, 1440px laptop, 768px tablet, and 390px mobile.
- No horizontal overflow at tested breakpoints.
- Follow-up screenshot alignment verified the Mission-to-funding transition, card-title and card-copy baselines, and funding-section height at the 1920px desktop viewport.
- Carousel verified from the first through final position on desktop and mobile; previous/next disabled states verified.
- Modal verified for opening, Escape dismissal, backdrop dismissal, scroll locking, and focus behavior.
- Contact image and all Foundation page assets loaded successfully during browser checks.
- Smoke test: `http://127.0.0.1:3000/our-story/foundation` returned HTTP 200.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed; `/our-story/foundation` was statically generated.

## Remaining work

- None for the requested Foundation route.
- The production build continues to report one pre-existing Turbopack AVIF optimization warning for `img-SUB-ZERO/french-doors/SZWC_Nashville_46077_R_RGB.avif`, outside this page.
