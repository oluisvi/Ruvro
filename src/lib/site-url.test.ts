import { describe, expect, it } from "vitest";
import { siteUrl } from "./site-url";

describe("site URL", () => {
  it("uses the public production address as the safe fallback", () => {
    expect(siteUrl).toBe("https://ruvro.vercel.app");
  });
});
