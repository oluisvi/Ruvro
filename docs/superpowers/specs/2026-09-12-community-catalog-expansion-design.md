# Expansao da Curadoria e Experiencia 360

## Objetivo

Transformar o acervo fotografico fornecido pela Ruvro em uma curadoria editorial real, mantendo intactos o hero, sua narrativa e os componentes protegidos.

## Direcao aprovada

- A home preserva sua ordem e comportamento; a vitrine passa a exibir exatamente seis pecas escolhidas por slug.
- A colecao recebe as demais pecas identificadas com nomenclatura conservadora e sem inventar referencia, ano, preco ou disponibilidade.
- Cada pagina de relogio combina fotografia real, galeria e uma experiencia 360 quando houver pelo menos quatro quadros.
- As 16 pranchas fornecidas em `ruvro_360_gerados` serao recortadas em seis quadros WebP por relogio. O visualizador ficara limitado a uma area compativel com a resolucao nativa dos quadros.
- O CTA final da home ganha uma fotografia editorial real, sem alterar texto, links ou coreografia existente.

## Pecas em destaque

Vacheron Constantin 222, Breitling Navitimer, IWC Pilot's Watch Chronograph, Omega Seamaster Aqua Terra Worldtimer, Rolex Cosmograph Daytona e Audemars Piguet Royal Oak Offshore.

## Interacao 360

O componente `CatalogWatch360` oferece arraste horizontal, gesto de toque, botoes anterior/proximo, setas do teclado, contador e indicador 360. A reproducao automatica e lenta, pausa durante hover, foco e arraste, retoma depois da interacao e fica desativada com `prefers-reduced-motion`.

## Responsividade e desempenho

Layout em uma coluna no mobile e composicao editorial em duas areas no desktop. Imagens de galeria usam carregamento tardio e `sizes`; somente o primeiro quadro 360 recebe prioridade de carregamento. Nenhuma imagem e ampliada alem de sua resolucao util.

## Limites

Nao alterar os arquivos protegidos, seletores `.hero-*`, comportamento do rail, card, motion global ou arquivos atuais de `public/media/watch360`. A correcao do desaparecimento do relogio do hero em mobile fica explicitamente adiada para uma etapa posterior solicitada pelo usuario.

## Validacao

Testes cobrem selecao explicita de seis destaques, rotas dos cards, viewer e fallback, botoes, teclado, movimento reduzido, CTA real e guarda de escopo. A entrega exige lint, typecheck, build, E2E e inspecao visual desktop/mobile.
