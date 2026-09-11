# Ruvro Digital Showroom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a polished, responsive PT-BR Ruvro digital showroom with a cinematic scroll hero, demonstration collection, detail routes, private conversion, and production-grade accessibility, SEO, and fallbacks.

**Architecture:** A Next.js App Router application keeps content and product data in typed configuration, renders primarily as Server Components, and isolates the scroll-driven hero and mobile navigation as small Client Components. CSS custom properties and focused component styles provide the visual system; native browser APIs power motion so the baseline stays lightweight.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-10-ruvro-digital-showroom-design.md`

## Global Constraints

- Initial language is PT-BR.
- Community URL is exactly `https://chat.whatsapp.com/F3DqtNoP60aGmq4B88B3ob`; Instagram is exactly `https://www.instagram.com/ruvro.co/`.
- Every initial product uses `status: "demo"` and visible “Demonstração” treatment.
- Never render unconfirmed price, availability, provenance, authenticity, guarantee, sourcing, delivery, showroom, partnership, or founder biography claims.
- The site remains usable without animation, WebGL, hover, audio, or precise pointer input.
- Motion respects `prefers-reduced-motion`; statuses never rely on color alone.
- No animation, 3D, smooth-scroll, component-library, analytics, or CMS dependency unless a verified blocker justifies it.

---

## Planned File Structure

- `src/app/*`: route compositions, metadata files, legal pages, and error states.
- `src/components/layout/*`: header, mobile navigation, footer, and page shell.
- `src/components/home/*`: hero timeline and individual home scenes.
- `src/components/watch/*`: typed watch cards, media, details, and gallery.
- `src/content/site.ts`: approved brand copy and external links.
- `src/data/watches.ts`: replaceable typed demonstration catalogue.
- `src/lib/*`: URL and product helpers with unit tests.
- `src/styles/*`: tokens, reset, global typography, layout, and motion rules.
- `public/media/*`: generated concept assets optimized for their specific placements.
- `tests/e2e/*`: route, navigation, mobile, and reduced-motion verification.

### Task 1: Scaffold and Quality Baseline

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/styles/tokens.css`, `src/styles/global.css`
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Produces: `RootLayout({ children }: Readonly<{ children: React.ReactNode }>)` and scripts `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`.

- [ ] Create the Next.js TypeScript scaffold with React, ESLint, Vitest, Testing Library, jsdom, and Playwright as the only initial dependencies.
- [ ] Add a failing render test asserting one visible `Ruvro & Co` heading and a `main` landmark.
- [ ] Run `npm test -- --run`; expect the initial test to fail before the page exists.
- [ ] Implement the root layout, global stylesheet imports, base metadata, skip link, and minimal home page.
- [ ] Run `npm test -- --run`, `npm run typecheck`, and `npm run lint`; expect all to pass.
- [ ] Commit with `feat: scaffold Ruvro showroom`.

### Task 2: Typed Content and Demonstration Catalogue

**Files:**
- Create: `src/content/site.ts`, `src/data/watches.ts`, `src/lib/watches.ts`
- Test: `src/lib/watches.test.ts`

**Interfaces:**
- Produces: `WatchStatus`, `Watch`, `watches`, `featuredWatches`, `getWatchBySlug(slug: string): Watch | undefined`, and `SITE_LINKS`.

- [ ] Write failing tests proving all seed watches use `demo`, slugs are unique, missing optional fields are omitted, and `getWatchBySlug` returns `undefined` for an unknown slug.
- [ ] Run `npm test -- --run src/lib/watches.test.ts`; expect failures before the module exists.
- [ ] Implement three explicitly fictional presentation studies with no price/reference/provenance claims, plus centralized approved copy and links.
- [ ] Run the focused tests and typecheck; expect all to pass.
- [ ] Commit with `feat: add safe showroom content model`.

### Task 3: Generate and Integrate the Visual Asset System

**Files:**
- Create: `public/media/hero-watch.webp`, `public/media/watch-study-01.webp`, `public/media/watch-study-02.webp`, `public/media/watch-study-03.webp`, `public/media/private-texture.webp`
- Create: `docs/asset-ledger.md`

**Interfaces:**
- Produces: stable public media paths referenced by `Watch.media` and a source/purpose ledger marking every generated image as demonstration artwork.

- [ ] Generate a coherent asset set: isolated steel dress watch hero on graphite, three distinct macro editorial crops, and one restrained dark mineral texture; exclude trademarks, legible brand names, serials, prices, and certificates.
- [ ] Inspect every generated image at original detail and reject malformed hands, crowns, bracelets, text, or reflections.
- [ ] Save optimized WebP variants at placement-appropriate dimensions and record generation purpose and demo status in the ledger.
- [ ] Add the final paths to the typed watch dataset and verify every path resolves from `public`.
- [ ] Commit with `feat: add Ruvro demonstration art direction`.

### Task 4: Global Layout and Navigation

**Files:**
- Create: `src/components/layout/SiteHeader.tsx`, `src/components/layout/MobileMenu.tsx`, `src/components/layout/SiteFooter.tsx`
- Modify: `src/app/layout.tsx`, `src/styles/global.css`
- Test: `src/components/layout/SiteHeader.test.tsx`

**Interfaces:**
- Produces: `<SiteHeader />`, `<MobileMenu />`, and `<SiteFooter />` shared by every route.

- [ ] Write failing tests for labelled navigation, current external links, keyboard-operable menu disclosure, and no fabricated direct-sales action.
- [ ] Implement a restrained desktop header, accessible mobile dialog/menu, and footer with collection/private/about/legal/Instagram/community destinations.
- [ ] Add focus, hover, open, and reduced-motion states without scroll locking desktop navigation.
- [ ] Run component tests, typecheck, and lint.
- [ ] Commit with `feat: add showroom navigation shell`.

### Task 5: Home Scenes and Curator's Light Hero

**Files:**
- Create: `src/components/home/CuratorsLightHero.tsx`, `src/components/home/HeroWatch.tsx`, `src/components/home/FeaturedStudies.tsx`, `src/components/home/PrivateScene.tsx`, `src/components/home/FoundersScene.tsx`, `src/components/home/FinalCta.tsx`
- Modify: `src/app/page.tsx`, `src/styles/global.css`
- Test: `src/components/home/CuratorsLightHero.test.tsx`

**Interfaces:**
- Produces: `<CuratorsLightHero />` with one passive scroll listener and requestAnimationFrame progress, plus the complete home scene composition.

- [ ] Write failing tests for approved hero copy, both required CTAs, accessible hero image, founder names, demo labels, and absence of prohibited claims.
- [ ] Implement the first viewport and static reduced-motion composition before scroll enhancements.
- [ ] Implement bounded progress from the hero section rectangle, small rotation/scale/light transforms, reversible state labels, and continuous visual handoff into featured studies.
- [ ] Re-art-direct the hero below 768px with shorter pinning, fewer labels, and natural touch scroll.
- [ ] Run focused tests and capture desktop/mobile hero screenshots for visual iteration.
- [ ] Commit with `feat: build Curator's Light home experience`.

### Task 6: Collection and Watch Detail Routes

**Files:**
- Create: `src/app/collection/page.tsx`, `src/app/watch/[slug]/page.tsx`, `src/components/watch/WatchCard.tsx`, `src/components/watch/WatchGallery.tsx`, `src/components/watch/WatchFacts.tsx`
- Test: `src/components/watch/WatchCard.test.tsx`, `src/app/watch/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `Watch`, `watches`, `getWatchBySlug`.
- Produces: indexable collection cards and statically generated detail routes through `generateStaticParams()`.

- [ ] Write failing tests for visible demo state, links to detail pages, optional-fact omission, useful image alternatives, and unknown-slug not-found behavior.
- [ ] Implement the editorial collection rail/grid and detail journey with identification, gallery, present fields only, demo disclaimer, collection link, and community CTA.
- [ ] Implement route metadata without Product/Offer schema for demonstration entries.
- [ ] Run focused tests, direct-route checks, typecheck, and lint.
- [ ] Commit with `feat: add collection and watch studies`.

### Task 7: Private, About, Legal, SEO, and System States

**Files:**
- Create: `src/app/private/page.tsx`, `src/app/about/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/not-found.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`
- Create: `src/components/common/CommunityCta.tsx`
- Test: `src/app/routes.test.tsx`

**Interfaces:**
- Produces: all remaining static routes, draft legal disclosure, typed Next.js metadata routes, and reusable community CTA.

- [ ] Write failing route tests for confirmed copy, founders, draft legal labels, 404 actions, canonical path helpers, sitemap URLs, and robots sitemap reference.
- [ ] Implement each editorial route with distinct composition and shared conversion component.
- [ ] Implement per-route factual metadata, configurable `metadataBase`, dynamic OG artwork, sitemap, and robots using current App Router metadata conventions.
- [ ] Run route tests, build, typecheck, and lint.
- [ ] Commit with `feat: complete showroom routes and metadata`.

### Task 8: Browser QA, Accessibility, and Final Refinement

**Files:**
- Create: `tests/e2e/showroom.spec.ts`
- Modify: affected components/styles discovered by QA

**Interfaces:**
- Consumes: built application and all public routes.
- Produces: automated smoke coverage and final visual evidence.

- [ ] Write Playwright coverage for every direct route, navigation, mobile menu, community/Instagram links, watch detail, 404, keyboard focus, and reduced-motion emulation.
- [ ] Run `npm run build` and serve the production build; expect no build or runtime errors.
- [ ] Verify in the built-in browser at desktop, laptop, tablet, mobile, small-mobile, intermediate, and landscape sizes; capture first viewport, hero transition, collection, detail, private, and mobile navigation.
- [ ] Run accessibility inspection for landmarks, headings, names, focus order, contrast, touch targets, and motion preference; fix all P0/P1 issues.
- [ ] Inspect the accepted generated concepts and latest browser screenshots with `view_image`; compare copy, layout, typography, palette, assets, spacing, responsive behavior, and motion in a written fidelity ledger kept only during QA.
- [ ] Run `npm test -- --run`, `npm run typecheck`, `npm run lint`, `npm run test:e2e`, and `npm run build` once as the final gate.
- [ ] Remove temporary QA captures/ledger, confirm a clean console, and commit with `test: verify Ruvro showroom experience`.

## Self-Review Result

The plan covers every route, the signature scroll experience, safe demonstration-data boundaries, asset generation, mobile/reduced-motion fallbacks, accessibility, SEO metadata, errors, browser validation, and production build gates from the approved specification. Interface names and data types are consistent across tasks, and the plan contains no deferred implementation placeholders.
