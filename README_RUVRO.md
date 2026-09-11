<div align="center">

# RUVRO & CO

### Digital Showroom · Private Watch Curation

**Uma experiência editorial e cinematográfica para transformar descoberta em desejo, contexto, confiança e acesso privado.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_Testing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

[**Preview**](https://ruvro.vercel.app) · [**Instagram**](https://www.instagram.com/ruvro.co/) · [**Comunidade Ruvro**](https://chat.whatsapp.com/F3DqtNoP60aGmq4B88B3ob)

</div>

---

## Visão do projeto

A Ruvro & Co opera no universo de relógios com uma proposta baseada em **curadoria privada, acesso em primeira mão, exclusividade e confiança**.

Este projeto transforma essa lógica em uma casa digital própria: menos e-commerce convencional, mais **boutique editorial + showroom digital + private access**.

A jornada central é:

> **Desire → Context → Confidence → Private Access**

O website foi concebido para ocupar o espaço entre a descoberta no Instagram e a conversão privada no WhatsApp.

---

## Status atual

> **Estado:** MVP funcional / production-minded demo  
> **Branch principal:** `main`  
> **Deploy configurado:** `https://ruvro.vercel.app`  
> **Conteúdo comercial:** demonstrativo — ainda não aprovado para lançamento oficial

| Área | Status | Observação |
|---|:---:|---|
| Fundação técnica | ✅ | Next.js App Router + React + TypeScript |
| Direção visual | ✅ | Conceito **The Curator's Light** definido |
| Home editorial | ✅ | Estrutura principal implementada |
| Coleção | ✅ | Catálogo editorial com estados de produto |
| Página de relógio | ✅ | Rota dinâmica `/watch/[slug]` |
| Ruvro Private | ✅ | Página dedicada à comunidade privada |
| About | ✅ | Estrutura institucional sem inventar biografias |
| Legal / sistema | ✅ | Privacy, Terms e 404 estruturados |
| SEO técnico básico | ✅ | Metadata, canonical base, sitemap e robots |
| Responsividade | ✅ / refinamento | Mobile tratado como experiência própria |
| Reduced motion | ✅ | Fallback acessível previsto no sistema |
| Testes unitários | ✅ | Vitest + Testing Library |
| Testes E2E | ✅ | Playwright configurado |
| Inventário real | ⛔ | Aguardando dados oficiais da Ruvro |
| Assets oficiais | ⛔ | Aguardando fotos/vídeos/logo aprovados |
| Copy legal final | ⛔ | Precisa de revisão/aprovação |
| Checkout / pagamentos | 🚫 Fora do MVP | Não faz parte da fase atual |
| CMS / admin | 🚫 Fora do MVP | Estrutura preparada para evolução futura |
| Autenticação | 🚫 Fora do MVP | `Ruvro Private` ainda não é área logada |
| 3D real | 🚫 Não necessário no MVP | Só entra com asset e justificativa aprovados |

---

## Conceito criativo — The Curator's Light

O relógio é o protagonista da experiência.

Na home, o produto permanece como objeto narrativo central enquanto o scroll revela progressivamente:

1. silhueta;
2. forma;
3. dial;
4. material e caixa;
5. coroa / perfil;
6. contexto de curadoria;
7. peça completa;
8. transição para a coleção.

A intenção é criar uma sensação de descoberta controlada — como observar uma peça sob a luz de um curador — sem transformar o site em uma demo tecnológica gratuita.

### Princípios visuais

- luxo editorial e contido;
- fotografia macro e produto em escala generosa;
- assimetria controlada;
- muito espaço negativo;
- metal, cristal, dial e reflexos como linguagem visual;
- graphite / near-black + porcelana quente + paper neutrals + aço + champagne pontual;
- serif editorial + grotesk altamente legível;
- motion subordinado ao produto;
- nada de “luxo genérico preto + dourado”.

---

## Arquitetura atual

```text
src/
├── app/
│   ├── about/
│   ├── collection/
│   ├── private/
│   ├── privacy/
│   ├── terms/
│   ├── watch/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── common/
│   ├── home/
│   ├── layout/
│   └── watch/
│
├── content/
├── data/
├── lib/
└── styles/

docs/
├── asset-ledger.md
├── concepts/
│   └── ruvro-home-concept.png
└── superpowers/
    ├── plans/
    └── specs/
```

A arquitetura mantém **conteúdo, dados, apresentação e motion separados**, para permitir trocar o material demonstrativo por inventário real sem redesenhar o produto inteiro.

---

## Rotas

| Rota | Função |
|---|---|
| `/` | Experiência principal / showroom editorial |
| `/collection` | Coleção editorial de relógios |
| `/watch/[slug]` | Detalhe de uma peça |
| `/private` | Ruvro Private / comunidade |
| `/about` | Marca e fundadores |
| `/privacy` | Política informativa provisória |
| `/terms` | Termos informativos provisórios |
| `404` | Estado de erro desenhado |

---

## Stack

### Core

- **Next.js 16.3.4**
- **React 19.3.0**
- **React DOM 19.3.0**
- **TypeScript**

### Qualidade

- **ESLint**
- **Vitest**
- **Testing Library**
- **jsdom**
- **Playwright**

### Abordagem de motion

A base atual evita dependências pesadas sem necessidade.

Prioridade de implementação:

1. CSS nativo;
2. browser APIs;
3. `IntersectionObserver`;
4. `requestAnimationFrame`;
5. dependências externas apenas se o conceito aprovado realmente exigir.

True 3D / WebGL não é requisito do MVP.

---

## Conteúdo: regra de verdade

> **Nenhum dado demonstrativo deve parecer inventário comercial real.**

O projeto foi deliberadamente estruturado para não inventar:

- disponibilidade;
- preço;
- procedência;
- autenticidade;
- garantia;
- parceria;
- showroom;
- condição comercial;
- cargo ou biografia dos fundadores;
- entrega nacional;
- sourcing;
- contato direto de vendas.

Enquanto os dados oficiais não forem fornecidos, o catálogo permanece identificado como **demo**.

### Fontes que precisam ser substituídas antes do lançamento

- `src/data/watches.ts`
- `public/media/`
- copies comerciais ainda não validadas
- termos e política de privacidade provisórios

---

## O que já está definido como NÃO fazer

Para preservar a estratégia da marca e evitar feature creep, o MVP **não inclui**:

- checkout;
- pagamento online;
- carrinho;
- autenticação;
- CMS;
- painel administrativo;
- inventário em tempo real;
- journal/blog;
- mensagem direta para vendedor ainda não confirmado;
- 3D/WebGL sem asset e propósito claros;
- scroll-jacking;
- loader longo;
- áudio automático;
- custom cursor obrigatório;
- múltiplos canvases pesados;
- experiência que dependa de hover ou hardware high-end.

---

## Conversão

A conversão principal do MVP preserva o modelo atual da Ruvro:

```text
Instagram
    ↓
Website / Showroom
    ↓
Desejo + contexto + confiança
    ↓
Ruvro Private / WhatsApp
    ↓
Relacionamento privado
```

### Canais oficiais utilizados no projeto

- Instagram: `https://www.instagram.com/ruvro.co/`
- Comunidade: `https://chat.whatsapp.com/F3DqtNoP60aGmq4B88B3ob`

Não existe URL de vendedor direto cadastrada até o momento.

---

## Acessibilidade e performance

O projeto trata performance e acessibilidade como parte da direção de design.

### Acessibilidade

- landmarks semânticos;
- skip link;
- headings organizados;
- navegação por teclado;
- focus visível;
- controles rotulados;
- touch targets adequados;
- status não dependente apenas de cor;
- suporte a `prefers-reduced-motion`;
- conversão nunca dependente da animação.

### Performance

Ordem de prioridade de carregamento:

```text
HTML / layout / navegação / CTA
→ mídia crítica do hero
→ coleção
→ motion enhancements
→ experiências opcionais de maior custo
```

Mobile não é apenas desktop reduzido: a experiência deve ser re-art-directed para menor GPU, memória, largura e interação por toque.

---

## Rodando localmente

### Requisitos

- Node.js compatível com Next.js 16
- npm

### Instalação

```bash
git clone https://github.com/oluisvi/Ruvro.git
cd Ruvro
npm install
npm run dev
```

Abra:

```text
http://localhost:3000
```

---

## Scripts

```bash
npm run dev        # ambiente de desenvolvimento
npm run build      # build de produção
npm run start      # servidor de produção
npm run lint       # lint completo
npm run typecheck  # TypeScript sem emitir arquivos
npm test           # Vitest
npm run test:e2e   # Playwright
```

### Gate recomendado antes de merge / deploy

```bash
npm test -- --run
npm run typecheck
npm run lint
npm run test:e2e
npm run build
```

---

## Variáveis de ambiente

O domínio base de metadata pode ser sobrescrito por:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

Fallback atual:

```text
https://ruvro.vercel.app
```

---

## Bloqueadores para lançamento oficial

O código pode evoluir e ser refinado sem esses itens, mas **publicação comercial oficial** depende da Ruvro fornecer ou aprovar:

- [ ] identidade oficial / arquivos de marca;
- [ ] direitos de uso dos assets de produto;
- [ ] hero media final;
- [ ] catálogo real;
- [ ] disponibilidade real das peças;
- [ ] dados comerciais permitidos;
- [ ] canal direto de vendas, se houver;
- [ ] processo de compra;
- [ ] política de autenticidade e procedência;
- [ ] política de garantia;
- [ ] confirmação sobre showroom/endereço;
- [ ] roles e bios dos fundadores;
- [ ] depoimentos / prova social autorizada;
- [ ] política de privacidade revisada;
- [ ] termos revisados;
- [ ] domínio oficial.

---

## Próximas etapas recomendadas

### 01 · Client truth

Fechar as lacunas comerciais e receber inventário + assets reais.

### 02 · Content integration

Substituir demonstrações por conteúdo aprovado sem alterar a arquitetura central.

### 03 · High-end refinement

Refino final de:

- proporção;
- ritmo editorial;
- typography scale;
- macro imagery;
- transições;
- choreography;
- estados responsive;
- performance real com assets finais.

### 04 · QA de lançamento

- desktop;
- laptop;
- tablet;
- mobile;
- landscape;
- keyboard;
- reduced motion;
- links externos;
- metadata;
- canonical;
- sitemap;
- 404;
- console;
- performance;
- conteúdo comercial.

### 05 · Launch

Configurar domínio oficial, analytics somente se aprovados, smoke test em produção e publicação.

---

## Evoluções futuras possíveis

Somente depois de validar necessidade de negócio:

- CMS de relógios;
- wishlist;
- request a watch;
- sourcing;
- catálogo privado;
- autenticação de clientes;
- drops exclusivos;
- status `available / reserved / sold / private` alimentado por backend;
- histórico editorial de peças vendidas;
- journal;
- reserva ou sinal online;
- experiências 3D com assets reais.

---

## Documentação interna

A fonte de verdade de design atual está em:

```text
docs/superpowers/specs/2026-09-10-ruvro-digital-showroom-design.md
```

Conceito visual disponível em:

```text
docs/concepts/ruvro-home-concept.png
```

Ledger de assets:

```text
docs/asset-ledger.md
```

---

## Princípio do projeto

> **O produto lidera. A interface enquadra. O motion revela. A confiança converte.**

O objetivo não é fazer “um site bonito de relógios”.

É criar uma experiência que pareça **nativa da Ruvro**, preserve o caráter privado da operação e dê à marca uma presença digital à altura do produto que ela quer representar.

---

<div align="center">

### Ruvro & Co — Digital Showroom

**Private curation · Early access · Trust · Collectors**

`MVP IN PROGRESS / DEMO CONTENT`

</div>
