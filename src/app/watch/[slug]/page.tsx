import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommunityCta } from "@/components/common/CommunityCta";
import { watches } from "@/data/watches";
import { getWatchBySlug } from "@/lib/watches";
import { CatalogWatch360 } from "@/components/watch/CatalogWatch360";
import { WatchGallery } from "@/components/watch/WatchGallery";
export function generateStaticParams(){return watches.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const watch=getWatchBySlug(slug);return watch?{title:watch.name,description:watch.note}:{title:"Peça não encontrada"}}
export default async function WatchPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const watch=getWatchBySlug(slug);if(!watch)notFound();const hasSpin=Boolean(watch.spinFrames&&watch.spinFrames.length>=4);return <main id="conteudo" className="catalog-detail"><div className="catalog-detail__hero"><div className="catalog-detail__media">{hasSpin?<CatalogWatch360 frames={watch.spinFrames!} name={watch.name} alt={watch.alt}/>:<div className="catalog-detail__static"><Image src={watch.image} alt={watch.alt} fill preload sizes="(max-width: 900px) 100vw, 58vw"/></div>}</div><article className="catalog-detail__copy"><p className="section-kicker">{watch.edition}</p><h1>{watch.name}</h1><p>{watch.note}</p>{watch.sourceLabel?<p className="catalog-detail__source">{watch.sourceLabel}</p>:null}{watch.facts?.length?<dl className="fact-list">{watch.facts.map(f=><div className="fact-row" key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>:null}<p className="demo-notice">As imagens documentam a curadoria. Disponibilidade, preço, referência, procedência e especificações devem ser confirmados diretamente com a Ruvro.</p><CommunityCta/><br/><Link className="text-link dark-link" href="/collection">Voltar à curadoria</Link></article></div>{watch.gallery?.length?<WatchGallery images={watch.gallery} alt={watch.alt}/>:null}</main>}
