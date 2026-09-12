# Ruvro — Viewer 360 + Motion + Carousel

Baseado no `main` em `039ef8fbd6a93f7930708debe2701c7693e01f58`.

## Aplicar

Na raiz do projeto:

```bash
git apply --check ruvro-viewer-motion-carousel.patch
git apply ruvro-viewer-motion-carousel.patch
```

O patch inclui os 6 frames WebP binários do viewer.

## Validar

```bash
npm test -- --run
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

## Escopo

- Não altera `CuratorsLightHero.tsx`.
- Não altera nenhuma regra `.hero-*` existente.
- Substitui somente a imagem estática da `detail-scene` pelo viewer 360.
- Remove o play/pause manual do rail; o rail corre continuamente e pausa durante interação.
- Refina easing/reveal e cards do catálogo/rail.
