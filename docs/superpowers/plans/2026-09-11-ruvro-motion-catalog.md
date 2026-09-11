# Ruvro Motion and Curated Rail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained site-wide motion below the protected hero, a high-quality six-watch auto-flow rail, and smaller secondary imagery.

**Architecture:** Keep `HomeScenes` server-rendered and mount a focused client `CuratedWatchRail`. Extend the existing `SiteMotion` observer and CSS tokens without dependencies. Central watch data remains the source for collection/detail routes; the home receives an explicit featured subset.

**Tech Stack:** Next.js 16.3.4, React 19.3, TypeScript, CSS, IntersectionObserver, requestAnimationFrame, Next Image, Playwright, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-11-ruvro-motion-catalog-design.md`

## Global Constraints

- Do not edit `SiteHeader.tsx`, `CuratorsLightHero.tsx`, or `.hero-*` rules.
- Do not add dependencies or infer commercial claims from Instagram captures.
- Use only unique clean product images, without upscaling.
- Autoplay must pause and reduced motion must provide a manual rail.
- Preserve usable content without JavaScript.
- Commit and push each functional checkpoint.

---

### Task 1: High-quality curated assets and watch data

**Files:**
- Create: `public/media/curation/*.jpeg`
- Modify: `src/data/watches.ts`
- Modify: `src/lib/watches.test.ts`
- Modify: `docs/asset-ledger.md`

**Interfaces:**
- Produces: six unique `Watch` records and an explicit `featuredWatches: ReadonlyArray<Watch>`.
- Consumes: clean user-supplied JPEG files in `C:/Users/Home/Downloads`.

- [ ] **Step 1: Write failing data tests**

```ts
expect(watches.map((watch) => watch.slug)).toEqual(expect.arrayContaining([
  "tudor-pelagos-hawkeye", "rolex-sky-dweller-blue", "ap-royal-oak-panda",
  "rolex-submariner-hulk", "rolex-gmt-batman", "rolex-gmt-pepsi",
]));
expect(new Set(featuredWatches.map((watch) => watch.image)).size).toBe(6);
expect(watches.every((watch) => watch.status === "demo")).toBe(true);
```

- [ ] **Step 2: Run `npm test -- src/lib/watches.test.ts` and confirm the missing slugs fail.**
- [ ] **Step 3: Copy only `165957`, `165912`, `165849`, `165836`, `165819`, and `16581` into `public/media/curation` with descriptive filenames; retain source pixels and JPEG quality.**
- [ ] **Step 4: Add factual demonstrative records with neutral notes, unique slugs, alt text, and no price/availability/guarantee claims; make `featuredWatches` the six-item ordered subset.**
- [ ] **Step 5: Record each asset as user-supplied Instagram product photography in `docs/asset-ledger.md`.**
- [ ] **Step 6: Run unit tests, inspect decoded dimensions, then commit and push `Add curated watch references`.**

### Task 2: Accessible auto-flow home rail

**Files:**
- Create: `src/components/home/CuratedWatchRail.tsx`
- Modify: `src/components/home/HomeScenes.tsx`
- Modify: `src/components/watch/WatchCard.tsx`
- Modify: `src/styles/motion.css`
- Modify: `tests/e2e/showroom.spec.ts`

**Interfaces:**
- Consumes: `featuredWatches` and `WatchCard`.
- Produces: `<CuratedWatchRail watches={featuredWatches} />` with play/pause and manual scrolling.

- [ ] **Step 1: Add failing E2E assertions**

```ts
const rail = page.getByRole("region", { name: "Curadoria em destaque" });
await expect(rail).toBeVisible();
await expect(rail.getByRole("button", { name: /pausar movimento/i })).toBeVisible();
await expect(rail.locator('[data-rail-set="clone"] a')).toHaveCount(0);
```

- [ ] **Step 2: Add a reduced-motion test that verifies the track is paused and horizontally scrollable; run the focused test and confirm failure.**
- [ ] **Step 3: Implement a client rail with two visual sets, clone items rendered without links and with `aria-hidden`/`inert`, rAF movement only while visible, and cleanup for observers/listeners.**
- [ ] **Step 4: Pause on hover, focus-within, pointer interaction, hidden document, offscreen state, and explicit control; leave touch interaction paused until explicit resume.**
- [ ] **Step 5: Style 280–340px desktop cards and capped 70–78vw mobile cards, native horizontal scroll, stable 4:5 media, seamless transform loop, focus visibility, and reduced-motion scroll snap.**
- [ ] **Step 6: Replace only the home featured grid with the rail, run focused Playwright desktop/mobile tests, then commit and push `Add accessible curated watch rail`.**

### Task 3: Site motion and secondary image scale

**Files:**
- Modify: `src/components/common/SiteMotion.tsx`
- Modify: `src/styles/motion.css`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/showroom.spec.ts`

**Interfaces:**
- Consumes: existing `SiteMotion` pathname observer.
- Produces: `data-motion="reveal"` states for non-header, non-hero reading units across routes.

- [ ] **Step 1: Extend E2E coverage to assert internal page titles/card groups become visible, focused content reveals immediately, and `.site-header`/`.hero-timeline` receive no new `data-motion` attribute.**
- [ ] **Step 2: Run the focused tests and confirm missing internal motion coverage fails.**
- [ ] **Step 3: Expand selector groups for page intros, legal copy, private/about content, detail facts, and footer reading units; keep primary actions visible and exclude `.site-header` and `.hero-*`.**
- [ ] **Step 4: Add silent-precision reveal variants using opacity/translate/masks with 360–600ms tokens and short stagger; remove displacement in reduced motion.**
- [ ] **Step 5: Reduce collection grid to centered `minmax(220px,290px)`, home detail media to roughly 55%/under 70vh, and watch-detail media to roughly 48–52%/under 72vh; use contained product fitting and 52–58svh mobile detail media.**
- [ ] **Step 6: Run full unit, lint, typecheck, build, and showroom E2E checks; visually compare desktop/mobile, then commit and push `Refine showroom motion and image scale`.**

### Task 4: Durable context and final acceptance

**Files:**
- Modify: `RUVRO_CO_PROJECT_CONTEXT.md`
- Modify: `tests/e2e/showroom.spec.ts` only if acceptance coverage needs correction.

**Interfaces:**
- Consumes: implemented behavior and final QA evidence.
- Produces: concise durable handoff and clean synchronized `main`.

- [ ] **Step 1: Update only current stack/status, protected header/hero, silent-precision motion, smaller secondary imagery, accessible home rail, source-image limitations, and no-inferred-commercial-data policy.**
- [ ] **Step 2: Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npx playwright test tests/e2e/showroom.spec.ts`.**
- [ ] **Step 3: Capture desktop 1440×1000 and mobile 390×844 screenshots after scrolling; inspect crops, sharpness, overflow, contrast, rail controls, and unchanged hero.**
- [ ] **Step 4: Run independent visual, functional, performance/accessibility, and final read-only reviews; fix only in-scope findings and rerun invalidated checks.**
- [ ] **Step 5: Verify usage remaining, stage explicit files, inspect staged diff, commit `Complete motion and curated rail refinement`, push `main`, and confirm `main...origin/main` is clean.**
