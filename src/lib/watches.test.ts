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
      "tudor-pelagos-hawkeye",
      "rolex-sky-dweller-blue",
      "ap-royal-oak-panda",
      "rolex-submariner-hulk",
      "rolex-gmt-batman",
      "rolex-gmt-pepsi",
    ]);
    expect(new Set(featuredWatches.map((watch) => watch.image)).size).toBe(6);
  });
});
