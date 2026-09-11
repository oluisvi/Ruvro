export type WatchStatus = "available" | "reserved" | "sold" | "private" | "demo";

export type Watch = {
  slug: string;
  name: string;
  edition: string;
  status: WatchStatus;
  image: string;
  alt: string;
  tone: "graphite" | "steel" | "porcelain";
  note: string;
  facts?: ReadonlyArray<{ label: string; value: string }>;
};

export const watches: ReadonlyArray<Watch> = [
  {
    slug: "estudo-nocturne",
    name: "Nocturne",
    edition: "Estudo 01",
    status: "demo",
    image: "/media/hero-watch.png",
    alt: "Estudo visual de um relógio de aço com mostrador grafite, sem marca",
    tone: "graphite",
    note: "Um estudo de luz, proporção e presença. Conteúdo visual demonstrativo; não representa uma peça em estoque.",
    facts: [
      { label: "Material visual", value: "Aço escovado" },
      { label: "Direção", value: "Mostrador grafite" },
    ],
  },
  {
    slug: "estudo-meridian",
    name: "Meridian",
    edition: "Estudo 02",
    status: "demo",
    image: "/media/hero-watch.png",
    alt: "Estudo editorial de um relógio de aço sob luz clara, sem marca",
    tone: "steel",
    note: "Uma leitura mais clara da mesma matéria: superfície, ritmo e precisão em primeiro plano.",
    facts: [{ label: "Tratamento visual", value: "Aço e luz fria" }],
  },
  {
    slug: "estudo-atelier",
    name: "Atelier",
    edition: "Estudo 03",
    status: "demo",
    image: "/media/hero-watch.png",
    alt: "Estudo visual minimalista de um relógio de aço sem marca",
    tone: "porcelain",
    note: "Uma composição editorial criada para demonstrar a futura linguagem da curadoria Ruvro.",
  },
] as const;

export const featuredWatches = watches;
