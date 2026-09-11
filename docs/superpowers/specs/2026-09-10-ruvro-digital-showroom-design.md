# Ruvro Digital Showroom — Design Specification

## Objective

Build a production-minded PT-BR digital showroom for Ruvro & Co that bridges Instagram discovery and private conversion through the official Ruvro WhatsApp community. The experience must feel like access to private watch curation, not a conventional marketplace.

The MVP may use clearly identified demonstration content because official inventory, product media, legal copy, and direct sales contact are not yet available. Demonstration data must never imply real availability, pricing, provenance, authenticity guarantees, partnerships, or commercial terms.

## Experience Thesis

The journey is **Desire → Context → Confidence → Private Access**. The creative concept is **The Curator's Light**: a hero watch remains the narrative subject while scroll progressively reveals its form, details, and material character. The product leads; interface chrome and effects remain restrained.

The experience is a hybrid of cinematic scroll storytelling and editorial, image-first commerce. True 3D is not required for the MVP. The media system must support a progressive hierarchy: approved 3D, frame sequence, controlled video, multi-angle photography, then an art-directed static fallback.

## Visual System

- Art direction: restrained editorial luxury, controlled asymmetry, generous negative space, macro product imagery, metal, crystal, dial, and reflections.
- Palette: graphite/near-black, warm porcelain, neutral paper, brushed steel, and restrained champagne accents. Avoid formulaic black-and-gold luxury, glassmorphism, SaaS gradients, bento grids, and decorative particles.
- Typography: a sophisticated editorial serif paired with a highly legible grotesk, with licensed web fonts that support PT-BR and watch-reference numerals.
- Grid: twelve columns on desktop with intentionally re-art-directed mobile layouts.
- Components: discreet geometry, thin dividers, precise spacing, visible focus states, and minimal surface framing.

## Information Architecture

### `/`

1. Access: brand, watch macro, immediate actions.
2. The Curator's Light: persistent central hero watch driven by scroll.
3. Curation, not inventory: transition from singular object to the collection idea.
4. Featured watches: editorial composition using demonstration status explicitly.
5. Trust/detail: only confirmed statements.
6. Ruvro Private: early access, private curation, community privacy, official community CTA.
7. People behind the curation: Pedro Gabriel Favro de Lima and Rubens Gabriel Vasconcellos Marcondes, without invented titles or biographies.
8. Private conversion: WhatsApp community primary, Instagram secondary.

### `/collection`

An editorial catalogue supporting `available`, `reserved`, `sold`, `private`, and `demo` states. The initial dataset uses only `demo`, is visibly labelled, and lives in a central replaceable data module. Filters appear only when useful for the supplied data volume.

### `/watch/[slug]`

Identification, guided inspection, factual context/curator note, free gallery, optional piece data, validated trust information, and private conversion. Optional fields are omitted when absent; no empty labels or invented values are rendered.

### `/private`

Editorial explanation of Ruvro Private and confirmed benefits, with the official community link. No authentication in the MVP.

### `/about`

Brand positioning and confirmed founder names. Unconfirmed company history, roles, portraits, and biographies are excluded.

### Legal and system routes

Minimal privacy and terms pages marked as informational drafts pending legal review, plus a designed 404 state.

## Approved Copy

- Hero: “Curadoria privada. Acesso em primeira mão.”
- Hero support: “Relógios e oportunidades para clientes e colecionadores que valorizam exclusividade e confiança.”
- Primary actions: “Explorar a curadoria” and “Entrar na comunidade”.
- Private: “Ruvro Private” and “Acesso em primeira mão aos relógios, curadoria privada e oportunidades da Ruvro.”

“Private Watch Curators”, “Peças escolhidas. Acesso reservado.”, direct curator contact, guarantee, authenticity, sourcing, nationwide delivery, showroom, and price claims are excluded until explicitly approved or confirmed.

## Signature Interaction

On desktop, the hero watch stays near the center through a bounded pinned sequence. Native scroll advances and reverses conceptual states: silhouette, reveal, dial, material/case, crown/profile, curator context, full piece, and transition to collection. Rotations are deliberate and small, typically 8–20 degrees between states, with no continuous spin.

The final hero state transforms continuously into the collection composition through scale and repositioning. The watch must not disappear abruptly. Text remains secondary and never obscures critical product details. CTAs remain usable without completing the animation.

Mobile uses a shorter central sequence, fewer simultaneous text layers, lower media cost, and native touch scrolling. Reduced-motion users receive a static hero with sequential editorial content and the same actions. The experience never depends on WebGL, hover, precise dragging, audio, or a custom cursor.

## Content and Data Boundaries

- Product, hero, navigation, links, and founder content are configuration/data rather than hardcoded across components.
- The official community URL is `https://chat.whatsapp.com/F3DqtNoP60aGmq4B88B3ob`.
- Instagram is `https://www.instagram.com/ruvro.co/`.
- No direct-sales URL is created until supplied.
- Image errors fall back to intentionally designed media surfaces.
- Product structured data is emitted only when the underlying data is real and complete enough to be truthful.

## Technical Architecture

Use Next.js App Router, TypeScript, React, and component-scoped/shared CSS foundations. Prefer native CSS, IntersectionObserver, requestAnimationFrame, and browser APIs for the first implementation. Add an animation or 3D dependency only if the accepted visual concept proves native tools insufficient.

Organize the application into route compositions, reusable layout/navigation primitives, home scene components, product components, central content/data, and focused motion/media utilities. The hero owns one centralized scroll-progress controller and exposes presentation progress to child layers; it must not scatter competing scroll listeners.

Use optimized responsive images, local or responsibly fetched fonts, semantic HTML, metadata, canonical URLs configurable by environment, Open Graph defaults, sitemap, and robots configuration. Deployment target remains platform-neutral until selected.

## Accessibility and Performance

- Semantic landmarks, skip link, logical headings, keyboard navigation, visible focus, labelled controls, useful alt text, and touch targets of at least 44px.
- Status is never communicated by color alone.
- `prefers-reduced-motion` removes scrubbed rotation, parallax, and complex transitions without removing content or conversion.
- Loading priority: HTML/layout/navigation/CTA, critical hero media, collection media, motion enhancements, then optional WebGL.
- No long loader, scroll-jacking, forced landscape, autoplay audio, multiple competing canvases, heavy blur stacks, or smooth-scroll dependency.
- Hero media, rendering frequency, and responsive DPR are adaptive; weak devices retain the same art direction with lower fidelity.

## Error and Empty States

- Empty collection: explain that the public selection is being prepared and direct visitors to the private community.
- Missing product: designed 404 with collection and community actions.
- Missing media: neutral product silhouette/material frame without pretending to show a specific watch.
- Animation/WebGL failure: static art-directed hero and fully functional page.

## Validation

- Direct navigation, refresh, browser history, metadata, sitemap, and 404 behavior work on every route.
- Hero progresses and reverses without jitter, keeps the watch dominant, preserves usable CTAs, and hands off continuously to the collection.
- Core links, navigation, mobile menu, gallery, product cards, and community/Instagram actions work.
- Desktop, laptop, tablet, mobile, small mobile, intermediate widths, and mobile landscape are visually checked.
- Keyboard and reduced-motion paths are verified.
- Demo content is visibly distinguished from real inventory and no unconfirmed commercial claim is rendered.
- Production build, type checking, linting, and available automated checks pass without console errors.
- Browser screenshots are compared directly with the approved visual concepts before handoff.

## Scope Boundaries

The MVP does not include checkout, payments, authentication, a CMS, admin tooling, real-time inventory, a journal, direct-sales messaging, or true 3D without approved assets. The structure should allow future replacement of demonstration data and media without redesigning the experience.

## Launch Blockers Outside This Build

Public launch still requires client approval or supply of: official identity assets, hero/product media rights, real catalogue data, direct sales contact, commercial process, authenticity/provenance/guarantee policy, showroom/address claims, founder biographies/roles, and reviewed legal copy. These gaps do not block a complete production-minded demonstration build.
