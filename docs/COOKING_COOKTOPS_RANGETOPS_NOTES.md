# Wolf Cooktops and Rangetops

## Route and navigation

- Canonical route: `/cooking/cooktops-rangetops`
- Legacy route: `/products/cooking/cooktops-rangetops` (308 permanent redirect)
- Updated Cooking > Cooktops & Rangetops in `src/lib/site-data.ts`.
- Added a direct overview entry inside the mobile Cooktops & Rangetops submenu.
- The desktop mega menu now opens with Cooking > Cooktops & Rangetops selected on this route and shows the overview/product-family image cards immediately.
- Updated the matching footer product link.

## USA reference comparison

The page follows the supplied USA capture and live page content in this order:

1. Wolf video hero and centered Cooktops and Rangetops introduction
2. Red Wolf flame scroll marker
3. Gas Rangetops with All Burner, Charbroiler, Griddle, and Wok Burner options
4. Gas Cooktops
5. Induction Cooktops
6. Wolf Cooktops and Rangetops overview
7. Showroom journey
8. Kitchen inspiration gallery with Contemporary, Traditional, and Transitional image sets
9. More to savor editorial cards
10. Complete your kitchen product cards

The live USA page redirects to the international landing page for the Thailand browser region, so the supplied USA screenshot was the visual source of truth. Product copy and AEM assets were taken from the USA page response.

## Video and imagery

- Hero video uses the USA AEM Cooktops & Rangetops MP4.
- The USA induction-kitchen image is the video poster/fallback.
- The desktop hero fills the viewport height like the other Wolf video landing pages; mobile uses a shorter 70svh presentation.
- The lower-right play/pause control matches the other Wolf video pages, including the circular playback progress ring, 44px on mobile and 48px on desktop.
- Browser verification confirmed the video control remains visible on mobile and does not overlap the headline or CTA.
- Gas Rangetop, Gas Cooktop, Induction Cooktop, configuration icons, showroom journey, all gallery categories, More to savor, and Complete your kitchen use the matching Wolf/Sub-Zero USA assets.

## Typography

- Desktop hero H1: 60px
- Desktop family H2: 42px
- Desktop overview H2: 44px
- Mobile hero H1: 42px
- Mobile family and overview H2: 36px
- CTA and link text: 12–13px
- Body copy: 14–15px

These values intentionally stay below the oversized typography used on earlier project pages and align with the supplied USA capture.

## Verification

- Desktop browser: page structure, media, metadata, imagery, and typography checked.
- Mobile browser at 390px: no horizontal overflow, no broken images, and the video button is fully visible.
- Cooking mobile menu: canonical overview entry and product-family children checked.
- Lint passed with generated Next directories excluded from the scan.
- Production build passed. The only warning is the existing unrelated Turbopack AVIF optimization warning from the French Door refrigeration asset.

## TODO

- No page-specific blockers remain. A local poster is already configured if the remote video cannot autoplay or is unavailable.
