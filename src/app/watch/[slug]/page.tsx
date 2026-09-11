import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommunityCta } from "@/components/common/CommunityCta";
import { watches } from "@/data/watches";
import { getWatchBySlug } from "@/lib/watches";
export function generateStaticParams(){return watches.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const watch=getWatchBySlug(slug);return watch?{title:watch.name,description:watch.note}:{title:"Peça não encontrada"}}
export default async function WatchPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const watch=getWatchBySlug(slug);if(!watch)notFound();return <main id="conteudo" className="watch-detail"><div className="watch-detail-media"><Image src={watch.image} alt={watch.alt} fill priority sizes="(max-width: 900px) 100vw, 65vw"/></div><article className="watch-detail-copy"><p className="section-kicker">{watch.edition} · Demonstração</p><h1>{watch.name}</h1><p>{watch.note}</p>{watch.facts?.length?<dl className="fact-list">{watch.facts.map(f=><div className="fact-row" key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>:null}<p className="demo-notice">Este é um estudo visual de proposta. Não representa disponibilidade, preço, referência, procedência ou especificação de uma peça real.</p><CommunityCta/><br/><Link className="text-link dark-link" href="/collection">Voltar à curadoria</Link></article></main>}
