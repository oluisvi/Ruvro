# Ruvro Motion and Curated Rail Design

## Goal

Refine the existing digital showroom with a restrained motion language, smaller secondary imagery, and an accessible auto-flowing curated watch rail. The site header and the complete hero/banner implementation are protected and must not change.

## Scope

- Extend motion to content below the hero and to internal pages.
- Preserve content visibility without JavaScript and with reduced motion.
- Replace only the home featured-watch grid with a continuous horizontal rail.
- Add six supplied product photographs as demonstrative visual references.
- Reduce secondary image scale on the home detail scene, collection grid, and watch detail pages.
- Update durable project context and the asset ledger.

## Protected Areas

No edits to `SiteHeader.tsx`, `CuratorsLightHero.tsx`, or existing `.hero-*` behavior. The current hero watch, composition, LCP strategy, scroll timeline, and responsive fallback remain unchanged.

## Motion Language

The motion principle is **silent precision**: short, deliberate movement that establishes hierarchy without turning every element into an effect.

- Reading units reveal through small vertical offsets, opacity, and occasional line masks.
- Related elements use restrained stagger; complete sections never fade as one block.
- Cards use minimal hover/focus movement.
- Internal page content receives the same reveal vocabulary.
- Motion uses CSS and the existing observer controller; no new animation dependency.
- `prefers-reduced-motion` removes displacement, parallax, autoplay, and decorative movement.
- Header and hero are excluded from all new selectors and controllers.

## Curated Watch Rail

The home featured section becomes a dedicated client component with a continuous, linear track inspired by physical watch display stands.

- Six unique items appear in a deliberate dark-to-color rhythm.
- One duplicated visual set creates a seamless loop; duplicate items are hidden from assistive technology and keyboard navigation.
- Autoplay pauses on hover, focus, pointer interaction, tab invisibility, and when the rail leaves the viewport.
- Users can scroll or swipe the rail directly.
- A compact play/pause control communicates and controls motion state.
- Reduced-motion users receive a manual scroll-snap rail with no autoplay.
- The collection route remains a conventional grid and uses the same source data without cloned entries.

## Assets and Content Integrity

Use the clean supplied files rather than Instagram interface screenshots:

- Tudor Pelagos LHD Hawkeye
- Rolex Sky-Dweller blue dial
- Audemars Piguet Royal Oak chronograph
- Rolex Submariner Hulk
- Rolex GMT-Master II Batman
- Rolex GMT-Master II Pepsi

Images are copied into `public/media/curation`, encoded at high quality without upscaling, rendered through `next/image`, and constrained to their useful source resolution. Duplicate files are excluded.

Only visually identifiable model names may be used. The supplied screenshots do not authorize claims about price, availability, condition, warranty, provenance, year, or exact reference. Every new item remains explicitly demonstrative and directs users to private consultation.

## Image Scale

- Home rail media: approximately 280–340 px on desktop and 70–78vw on mobile.
- Home detail image: approximately 52–56% of desktop width and 42–48vh on mobile.
- Collection: centered grid with a narrower maximum width and smaller cards.
- Watch detail: balanced media/copy split with reduced desktop and mobile media height.
- No permanent transform scaling that softens raster imagery; dimensions and object fitting control presentation.

## Data and Component Boundaries

- Extend the central watch schema only as needed for real supplied imagery.
- Keep `HomeScenes` server-rendered and introduce a focused client rail component.
- Keep `WatchCard` reusable, with an explicit compact/rail variant if necessary.
- Keep motion orchestration in `SiteMotion` and CSS rather than adding page-specific global listeners.
- Preserve static watch routes and sitemap generation.

## Accessibility and Performance

- All rail controls are keyboard accessible and visibly focused.
- Autoplay never blocks manual navigation.
- Cloned rail items are non-interactive for assistive technology.
- Essential content remains visible without JavaScript.
- Below-fold images lazy-load with stable dimensions and responsive `sizes`.
- Animations prefer opacity and transforms; observers/listeners are disconnected when inactive.
- Mobile has no new parallax or pinned scene.

## Validation

- Lint, TypeScript, unit tests, production build, and focused Playwright tests.
- Desktop and mobile rendered review for scale, crop, continuity, overflow, and text contrast.
- Rail tests cover autoplay progression, pause/focus behavior, reduced motion, manual navigation, and usable links.
- Regression checks confirm the header and hero markup/behavior remain unchanged.

## Durable Context Updates

Update `RUVRO_CO_PROJECT_CONTEXT.md` only with the implemented stack/status and durable decisions from this design. Update `docs/asset-ledger.md` with supplied asset origin and demonstrative status. Do not record implementation timings or speculative commercial details.
