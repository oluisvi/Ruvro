import { watches } from "@/data/watches";

export function getWatchBySlug(slug: string) {
  return watches.find((watch) => watch.slug === slug);
}
