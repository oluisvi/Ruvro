# Community Catalog Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar a curadoria fotografica fornecida pela Ruvro com paginas de detalhe responsivas, galerias reais e visualizacao 360 acessivel.

**Architecture:** `src/data/watches.ts` permanece a fonte tipada do catalogo e passa a referenciar galerias e quadros opcionais. A pagina dinamica compoe dois novos componentes focados, enquanto a home recebe somente dados novos e a fotografia real do CTA. Todo estilo novo fica isolado em `content-refresh.css`.

**Tech Stack:** Next.js 16.3.4, React 19.3, TypeScript, next/image, Vitest, Testing Library e Playwright.

**Spec:** `docs/superpowers/specs/2026-09-12-community-catalog-expansion-design.md`

## Global Constraints

- Nao alterar hero, arquivos protegidos, rail, card ou motion existente.
- Usar exclusivamente as imagens fornecidas; nao inventar informacao comercial.
- Exibir exatamente seis destaques escolhidos explicitamente por slug.
- Respeitar movimento reduzido, teclado, toque, resolucao nativa e carregamento seletivo.

---

### Task 1: Catalog contract and curated data

**Files:**
- Modify: `src/data/watches.ts`
- Test: `tests/unit/watches.test.ts`
- Create: `public/media/community/**`

**Interfaces:**
- Produces: `Watch.gallery?: readonly string[]`, `Watch.spinFrames?: readonly string[]`, `Watch.sourceLabel?: string`, `featuredWatches`.

- [ ] Write tests asserting six explicit featured slugs, valid media arrays and route-safe unique slugs.
- [ ] Run the focused test and confirm failure because the new contract/data do not exist.
- [ ] Process supplied originals and 360 sheets into WebP assets without upscaling.
- [ ] Add the typed catalog and explicit featured selection.
- [ ] Run the focused test until green and commit.

### Task 2: Accessible catalog 360 viewer and gallery

**Files:**
- Create: `src/components/watch/CatalogWatch360.tsx`
- Create: `src/components/watch/WatchGallery.tsx`
- Test: `tests/unit/CatalogWatch360.test.tsx`

**Interfaces:**
- Consumes: `frames: readonly string[]`, `alt: string`, `name: string`.
- Produces: accessible drag/touch/keyboard viewer and lazy gallery.

- [ ] Write component tests for buttons, ArrowLeft/ArrowRight, frame counter and reduced-motion autoplay suppression.
- [ ] Run them and confirm failure because the viewer is absent.
- [ ] Implement the smallest accessible viewer and gallery satisfying those behaviors.
- [ ] Run focused tests until green and commit.

### Task 3: Detail-page composition

**Files:**
- Modify: `src/app/watch/[slug]/page.tsx`
- Create: `src/styles/content-refresh.css`
- Modify: `src/app/layout.tsx`
- Test: `tests/e2e/catalog-experience.spec.ts`

**Interfaces:**
- Consumes: optional `gallery` and `spinFrames` from `Watch`.
- Produces: 360 experience for 4+ frames and a static fallback otherwise.

- [ ] Write route tests for viewer presence, fallback, navigation controls and responsive media structure.
- [ ] Run them and confirm the new behavior is absent.
- [ ] Compose the detail page and responsive CSS, importing the new stylesheet last.
- [ ] Run unit, typecheck and focused E2E until green and commit.

### Task 4: Home content refresh within protected scope

**Files:**
- Modify: `src/components/home/HomeScenes.tsx`
- Modify: `src/styles/content-refresh.css`
- Test: `tests/e2e/catalog-experience.spec.ts`

**Interfaces:**
- Consumes: `featuredWatches` and one real editorial image.
- Produces: unchanged rail behavior and final CTA with real media.

- [ ] Add failing tests for six originals, preserved copy/links and a real final-CTA image.
- [ ] Add only the CTA image element and scoped styling; do not edit protected components.
- [ ] Run focused tests until green and commit.

### Task 5: Final acceptance and release

**Files:**
- Verify all files changed in Tasks 1-4.

- [ ] Run unit tests, lint, typecheck, build and the complete E2E suite.
- [ ] Inspect desktop and mobile renders, including overflow, touch targets, keyboard focus and reduced motion.
- [ ] Verify protected-file diffs are empty and review `git diff --name-only` plus `git diff --stat`.
- [ ] Commit any validation-only corrections, push `main`, verify deployment and report the asset inventory and test evidence.
