import { describe, expect, it } from "vitest";
import { featuredWatches, watches } from "./watches";

const expectedFeatured = [
  "vacheron-constantin-222",
  "breitling-navitimer",
  "iwc-pilots-watch-chronograph",
  "omega-aqua-terra-worldtimer",
  "rolex-cosmograph-daytona",
  "audemars-piguet-royal-oak-offshore",
];

describe("community catalog", () => {
  it("publishes exactly the six explicitly curated watches", () => {
    expect(featuredWatches.map(({ slug }) => slug)).toEqual(expectedFeatured);
  });

  it("gives every supplied watch a real gallery and a usable 360 sequence", () => {
    const community = watches.filter((watch) => watch.sourceLabel === "Acervo da comunidade Ruvro");
    expect(community).toHaveLength(16);
    for (const watch of community) {
      expect(watch.gallery?.length).toBeGreaterThanOrEqual(1);
      expect(watch.spinFrames).toHaveLength(6);
      expect(watch.gallery?.every((path) => path.endsWith(".webp"))).toBe(true);
      expect(watch.spinFrames?.every((path) => path.endsWith(".webp"))).toBe(true);
    }
  });

  it("keeps every route slug unique", () => {
    const slugs = watches.map(({ slug }) => slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
