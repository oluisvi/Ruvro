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
  {
    slug: "tudor-pelagos-hawkeye",
    name: "Pelagos LHD Hawkeye",
    edition: "Tudor · referência visual",
    status: "demo",
    image: "/media/curation/tudor-pelagos-hawkeye.jpeg",
    alt: "Relógio Tudor Pelagos LHD Hawkeye com mostrador preto em composição escura",
    tone: "graphite",
    note: "Registro visual de curadoria fornecido pela Ruvro. Disponibilidade e informações comerciais devem ser confirmadas diretamente com a equipe.",
  },
  {
    slug: "rolex-sky-dweller-blue",
    name: "Sky-Dweller Blue",
    edition: "Rolex · referência visual",
    status: "demo",
    image: "/media/curation/rolex-sky-dweller-blue.jpeg",
    alt: "Relógio Rolex Sky-Dweller com mostrador azul sobre expositor claro",
    tone: "graphite",
    note: "Registro visual de curadoria fornecido pela Ruvro. Disponibilidade e informações comerciais devem ser confirmadas diretamente com a equipe.",
  },
  {
    slug: "ap-royal-oak-panda",
    name: "Royal Oak Panda",
    edition: "Audemars Piguet · referência visual",
    status: "demo",
    image: "/media/curation/ap-royal-oak-panda.jpeg",
    alt: "Relógio Audemars Piguet Royal Oak com mostrador claro e três submostradores escuros",
    tone: "graphite",
    note: "Registro visual de curadoria fornecido pela Ruvro. Disponibilidade e informações comerciais devem ser confirmadas diretamente com a equipe.",
  },
  {
    slug: "rolex-submariner-hulk",
    name: "Submariner Hulk",
    edition: "Rolex · referência visual",
    status: "demo",
    image: "/media/curation/rolex-submariner-hulk.jpeg",
    alt: "Relógio Rolex Submariner com mostrador e aro verdes sobre expositor claro",
    tone: "graphite",
    note: "Registro visual de curadoria fornecido pela Ruvro. Disponibilidade e informações comerciais devem ser confirmadas diretamente com a equipe.",
  },
  {
    slug: "rolex-gmt-batman",
    name: "GMT-Master II Batman",
    edition: "Rolex · referência visual",
    status: "demo",
    image: "/media/curation/rolex-gmt-batman.jpeg",
    alt: "Relógio Rolex GMT-Master II com aro azul e preto sobre expositor claro",
    tone: "graphite",
    note: "Registro visual de curadoria fornecido pela Ruvro. Disponibilidade e informações comerciais devem ser confirmadas diretamente com a equipe.",
  },
  {
    slug: "rolex-gmt-pepsi",
    name: "GMT-Master II Pepsi",
    edition: "Rolex · referência visual",
    status: "demo",
    image: "/media/curation/rolex-gmt-pepsi.jpeg",
    alt: "Relógio Rolex GMT-Master II com aro azul e vermelho sobre expositor claro",
    tone: "graphite",
    note: "Registro visual de curadoria fornecido pela Ruvro. Disponibilidade e informações comerciais devem ser confirmadas diretamente com a equipe.",
  },
] as const;

export const featuredWatches: ReadonlyArray<Watch> = watches.slice(3);
