import Image from "next/image";
import Link from "next/link";
import type { Watch } from "@/data/watches";

export function WatchCard({ watch, index, interactive = true, compact = false }: { watch: Watch; index: number; interactive?: boolean; compact?: boolean }) {
  const media = <>
    <span className="watch-index">{String(index + 1).padStart(2, "0")}</span>
    <Image src={watch.image} alt={interactive ? watch.alt : ""} width={900} height={1200} sizes={compact ? "(max-width: 600px) 78vw, 320px" : "(max-width: 600px) 320px, (max-width: 900px) 42vw, 290px"} className="watch-card-image" />
  </>;

  return (
    <article className={`watch-card tone-${watch.tone}${compact ? " watch-card--compact" : ""}`}>
      {interactive ? <Link href={`/watch/${watch.slug}`} className="watch-image-wrap" aria-label={`Ver ${watch.name}`}>{media}</Link> : <div className="watch-image-wrap">{media}</div>}
      <div className="watch-card-meta"><div><p>{watch.edition}</p><h3>{watch.name}</h3></div><span className="demo-label">Demonstração</span></div>
    </article>
  );
}
