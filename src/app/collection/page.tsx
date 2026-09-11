import type { Metadata } from "next";
import Link from "next/link";
import { WatchCard } from "@/components/watch/WatchCard";
import { watches } from "@/data/watches";

export const metadata: Metadata = { title: "Curadoria", description: "Estudos visuais para a futura curadoria Ruvro & Co." };

export default function CollectionPage() {
  return (
    <main id="conteudo" className="page-shell">
      <Link className="page-back-link" href="/" aria-label="Voltar ao início">
        <span aria-hidden="true">←</span> Voltar ao início
      </Link>
      <header className="page-intro">
        <div><p className="section-kicker">Curadoria</p><h1 className="page-title">Escolhas<br />com intenção.</h1></div>
        <p className="page-lede">Uma seleção editorial demonstrativa da linguagem Ruvro. Nenhum item abaixo representa estoque ou oferta comercial.</p>
      </header>
      <div className="watch-grid">{watches.map((w, i) => <WatchCard key={w.slug} watch={w} index={i} />)}</div>
    </main>
  );
}
