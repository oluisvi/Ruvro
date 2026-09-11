import { describe, expect, it } from "vitest";
import { watches } from "@/data/watches";
import { getWatchBySlug } from "./watches";

describe("demonstration catalogue", () => {
  it("keeps every seed entry explicitly demonstrative", () => {
    expect(watches.every((watch) => watch.status === "demo")).toBe(true);
  });

  it("uses unique slugs and returns undefined for unknown pieces", () => {
    expect(new Set(watches.map((watch) => watch.slug)).size).toBe(watches.length);
    expect(getWatchBySlug("inexistente")).toBeUndefined();
  });
});
