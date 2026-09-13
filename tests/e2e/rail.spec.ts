import { expect, test } from "@playwright/test";

test("curation rail keeps flowing while hovered", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const rail = page.getByRole("region", { name: "Curadoria em destaque" });
  const viewport = rail.locator(".watch-rail-viewport");
  await rail.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await expect(rail).toHaveAttribute("data-autoplay", "running");

  const initial = await viewport.evaluate((element) => element.scrollLeft);
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft), { timeout: 1_500 })
    .toBeGreaterThan(initial + 24);

  const box = await rail.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + Math.min(80, box!.height / 2));
  await expect(rail).toHaveAttribute("data-autoplay", "running");
  const hoveredAt = await viewport.evaluate((element) => element.scrollLeft);
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft), { timeout: 1_200 })
    .toBeGreaterThan(hoveredAt + 12);
});

test("rail arrows move one card and continuous flow resumes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const rail = page.getByRole("region", { name: "Curadoria em destaque" });
  const viewport = rail.locator(".watch-rail-viewport");
  await rail.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);

  const before = await viewport.evaluate((element) => element.scrollLeft);
  await rail.getByRole("button", { name: /próximo relógio/i }).click();
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(before + 40);

  await page.mouse.move(1, 1);
  await expect(rail).toHaveAttribute("data-autoplay", "running");
  const resumedAt = await viewport.evaluate((element) => element.scrollLeft);
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft), { timeout: 1_200 })
    .toBeGreaterThan(resumedAt + 12);
});

test("watch cards keep aligned metadata and the same card motion language", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const railCards = page.locator('[data-rail-set="original"] > .watch-card');
  await railCards.first().scrollIntoViewIfNeeded();
  const railMetaHeights = await railCards.locator(".watch-card-meta").evaluateAll((nodes) =>
    nodes.slice(0, 4).map((node) => node.getBoundingClientRect().height),
  );
  expect(Math.max(...railMetaHeights) - Math.min(...railMetaHeights)).toBeLessThan(2);
  await expect(railCards.first()).toHaveAttribute("data-motion-variant", "card");

  await page.goto("/collection");
  const catalogCards = page.locator(".watch-grid > .watch-card");
  const catalogMetaHeights = await catalogCards.locator(".watch-card-meta").evaluateAll((nodes) =>
    nodes.slice(0, 4).map((node) => node.getBoundingClientRect().height),
  );
  expect(Math.max(...catalogMetaHeights) - Math.min(...catalogMetaHeights)).toBeLessThan(2);
  await expect(catalogCards.first()).toHaveAttribute("data-motion-variant", "card");
});
