import Link from "next/link";
import Image from "next/image";
import { founders, SITE_LINKS } from "@/content/site";
import { featuredWatches } from "@/data/watches";
import { CommunityCta } from "@/components/common/CommunityCta";
import { CuratedWatchRail } from "@/components/home/CuratedWatchRail";
import { Watch360Viewer } from "@/components/home/Watch360Viewer";

export function HomeScenes() {
  return <>
    <section className="manifesto section-pad"><p className="section-kicker">A curadoria</p><h2>Não é sobre ter mais.<br /><em>É sobre escolher melhor.</em></h2><p>A Ruvro nasce do olhar: atenção ao detalhe, respeito pelo tempo e relações construídas com discrição.</p></section>
    <section className="featured section-pad" id="featured"><div className="section-heading"><div><p className="section-kicker">Estudos de direção</p><h2>Seis leituras.<br />Um mesmo propósito.</h2></div><p>As imagens abaixo demonstram a linguagem visual proposta. Não representam peças disponíveis.</p></div><CuratedWatchRail watches={featuredWatches} /><Link className="text-link dark-link" href="/collection">Ver toda a curadoria <span aria-hidden="true">→</span></Link></section>
    <section className="detail-scene"><Watch360Viewer /><div className="detail-copy"><p className="section-kicker">O olhar do curador</p><h2>O detalhe muda tudo.</h2><p>Material, proporção e presença são observados antes de qualquer narrativa. Informação clara ocupa o mesmo espaço que o desejo.</p><div className="detail-lines"><span>01 · Contexto</span><span>02 · Clareza</span><span>03 · Discrição</span></div></div></section>
    <section className="private-scene section-pad"><div><p className="section-kicker">Acesso reservado</p><h2>Ruvro Private</h2><p>Acesso em primeira mão aos relógios, curadoria privada e oportunidades da Ruvro.</p><CommunityCta inverse /></div><aside><span>Privacidade</span><p>Os membros da comunidade ficam ocultos.</p></aside></section>
    <section className="founders section-pad"><p className="section-kicker">Por trás da curadoria</p><div className="founder-layout"><h2>{founders[0]}<br /><em>&amp;</em><br />{founders[1]}</h2><div><p>Dois nomes confirmados. Uma marca construída em torno de relógios, exclusividade e confiança.</p><Link className="text-link dark-link" href="/about">Conhecer a Ruvro <span aria-hidden="true">→</span></Link></div></div></section>
    <section className="final-cta section-pad"><div className="final-cta__media"><Image src="/media/community/vacheron-constantin-222/gallery-04.webp" alt="Relógio da curadoria Ruvro em detalhe editorial" fill sizes="(max-width: 700px) 88vw, 46vw" /></div><p className="section-kicker">O próximo capítulo</p><h2>O tempo certo<br />começa com acesso.</h2><CommunityCta inverse /><a href={SITE_LINKS.instagram} target="_blank" rel="noreferrer" className="instagram-link">@ruvro.co</a></section>
  </>;
}
