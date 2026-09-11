import type { MetadataRoute } from "next";import { watches } from "@/data/watches";import { siteUrl } from "@/lib/site-url";
export default function sitemap():MetadataRoute.Sitemap{return ["","/collection","/private","/about","/privacy","/terms",...watches.map(w=>`/watch/${w.slug}`)].map(url=>({url:`${siteUrl}${url}`,changeFrequency:"monthly" as const,priority:url===""?1:.7}))}
