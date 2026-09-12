import { describe, expect, it } from "vitest";
import { featuredWatches, watches } from "@/data/watches";
import { getWatchBySlug } from "./watches";

describe("demonstration catalogue", () => {
  it("keeps every seed entry explicitly demonstrative", () => {
    expect(watches.every((watch) => watch.status === "demo")).toBe(true);
  });

  it("uses unique slugs and returns undefined for unknown pieces", () => {
    expect(new Set(watches.map((watch) => watch.slug)).size).toBe(watches.length);
    expect(getWatchBySlug("inexistente")).toBeUndefined();
  });

  it("includes six unique supplied references in the featured curation", () => {
    expect(featuredWatches.map((watch) => watch.slug)).toEqual([
      "vacheron-constantin-222",
      "breitling-navitimer",
      "iwc-pilots-watch-chronograph",
      "omega-aqua-terra-worldtimer",
      "rolex-cosmograph-daytona",
      "audemars-piguet-royal-oak-offshore",
    ]);
    expect(new Set(featuredWatches.map((watch) => watch.image)).size).toBe(6);
  });
});
