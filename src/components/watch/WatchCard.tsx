import Image from "next/image";
import Link from "next/link";
import type { Watch } from "@/data/watches";

export function WatchCard({ watch, index }: { watch: Watch; index: number }) {
  return (
    <article className={`watch-card tone-${watch.tone}`}>
      <Link href={`/watch/${watch.slug}`} className="watch-image-wrap" aria-label={`Ver ${watch.name}`}>
        <span className="watch-index">0{index + 1}</span>
        <Image src={watch.image} alt={watch.alt} width={900} height={1200} className="watch-card-image" />
      </Link>
      <div className="watch-card-meta"><div><p>{watch.edition}</p><h3>{watch.name}</h3></div><span className="demo-label">Demonstração</span></div>
    </article>
  );
}
