# Ruvro — Rail autoplay + card alignment fix

Escopo intencionalmente restrito ao carrossel/cards.

## Alterações
- `src/components/home/CuratedWatchRail.tsx`
- `src/styles/motion-enhancements.css`
- `tests/e2e/rail.spec.ts` (novo teste focado)

Não altera hero 3D, viewer 360, detail-scene, copy, cores ou outras seções.

## Aplicar
```bash
git apply --check ruvro-rail-cards-fix.patch
git apply ruvro-rail-cards-fix.patch
```

## Validar no projeto
```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```
