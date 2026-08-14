# Reveal Cabinetry Specifications

- Canonical route: `/trade-resources/reveal`.
- Menu: `Professionals > Reveal Cabinet Specs` targets `/trade-resources/reveal`.
- Page files: `src/app/trade-resources/reveal/page.tsx` and `src/components/Reveal/*`.
- Shell: the existing `Header` and `Footer` are reused with the professional/owner-resources treatment.
- Images: the locally stored USA hero image is `public/assets/reveal/reveal-hero.jpg`; the lazy video poster is `public/assets/reveal/reveal-video.jpg`.
- Video: YouTube `gRCH8FvxnAc`; the iframe is only created after the accessible poster button is activated, preserving a fixed 16:9 frame.
- Benefits: all five items render from structured data with the five extracted USA line-art SVGs, the reference 1170px grid, desktop column dividers, and the USA 3+2 desktop / single-column mobile layout.
- Launch behavior: the project has no local authentication implementation and no `/trade-resources/reveal/product-picker` route. All three `Launch Reveal` links therefore use the live USA product-picker URL, where the USA authentication and return-URL flow remains authoritative. No fake auth, configurator, product data, or local product-picker route was added.
- Learn more: uses the live USA Reveal answer URL because that assistance route is not available locally.
- Responsive QA passed at 1920px, 1440px, 768px tablet, and 390px mobile. No tested viewport has horizontal overflow; hero and video retain their source ratios and benefit content does not use viewport-derived font sizes.
- Browser smoke test: route returned 200, all local images loaded at their expected natural dimensions, all five benefits rendered, and the breadcrumb is hidden cleanly on mobile. Before interaction there is no iframe; activating the keyboard-accessible poster creates one YouTube privacy-enhanced iframe with the required title.
- Browser captures: `docs/screenshots/reveal-reference-desktop.png`, `reveal-local-desktop.png`, and `reveal-local-mobile.png`. Desktop and mobile computed-style measurements are reflected in the page CSS.
- Validation: full `npm.cmd run lint` passed. `npm.cmd run build` passed after Prisma generation was allowed to write its generated client outside the sandbox. The only build warning is the existing unrelated Turbopack AVIF warning from the Refrigeration category image.

## Remaining limitations

- A future localized product picker should replace the external Launch URL only after real authentication and configurator routes exist.
