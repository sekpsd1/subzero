# About Page Notes

Route: `/about`

## Files

- `src/app/about/page.tsx`
- `src/components/About/AboutPageContent.tsx`
- `public/assets/about/*`
- `docs/screenshots/about-*.png`

## Sections

1. Full-viewport desktop / compact mobile video hero with transparent shared Header
2. Brand introduction
3. Brand-story video with functional pause/play control and desktop tension-zoom expansion from a 2.1vw inset frame to full viewport width
4. Careers and Showrooms blocks
5. Customer care, Product experts, and Partner hotline cards
6. Explore more cards
7. Shared showroom CTA and Footer

## Assets

The hero/story MP4 files and page imagery were downloaded from the USA page's Adobe AEM/Scene7 asset inventory and stored locally under `public/assets/about` to avoid runtime hotlink dependency.

## Navigation

The existing Mega Menu item `Our Story > About Sub-Zero Group` already used `/about`, so no shared navigation edit was necessary. Explore links target existing local routes only.

## Validation

- Browser comparison: USA and local at 1920px desktop and 390px mobile
- Video controls: hero and brand-story pause/play
- Responsive overflow and image loading checks
- Console and failed-request checks
- `npm.cmd run lint`
- `npm.cmd run build`
- Smoke test: `http://127.0.0.1:3000/about`
