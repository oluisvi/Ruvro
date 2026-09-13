import { expect, test } from "@playwright/test";

test("home publishes six real curated cards and keeps the final CTA intact", async ({ page }) => {
  await page.goto("/");
  const originals = page.locator('[data-rail-set="original"] > .watch-card');
  await expect(originals).toHaveCount(6);
  await expect(originals.first().getByRole("link")).toHaveAttribute("href", "/watch/vacheron-constantin-222");
  const collectionCta = page.getByRole("link", { name: /ver toda a curadoria/i });
  await expect(collectionCta).toHaveClass(/button-dark/);
  const ctaBox = await collectionCta.boundingBox();
  expect(ctaBox).not.toBeNull();
  expect(Math.abs((ctaBox!.x + ctaBox!.width / 2) - (await page.evaluate(() => innerWidth / 2)))).toBeLessThan(2);
  const cta = page.locator(".final-cta");
  await expect(cta).toContainText("O tempo certo");
  await expect(cta.getByRole("img", { name: /curadoria ruvro/i })).toBeVisible();
  await expect(cta.getByRole("link", { name: "@ruvro.co" })).toBeVisible();
});

test("watch detail exposes the supplied multi-angle viewer", async ({ page }) => {
  await page.goto("/watch/vacheron-constantin-222");
  const viewer = page.getByRole("region", { name: /visualização 360/i });
  await expect(viewer).toBeVisible();
  await expect(page.getByRole("region", { name: "Galeria fotográfica" })).toHaveCount(0);
  await expect(viewer).toContainText("01 / 06");
  await viewer.getByRole("button", { name: /próximo ângulo/i }).click();
  await expect(viewer).toContainText("02 / 06");
  await viewer.press("ArrowLeft");
  await expect(viewer).toContainText("01 / 06");
});

test("watch detail falls back to a static photograph without enough spin frames", async ({ page }) => {
  await page.goto("/watch/estudo-nocturne");
  await expect(page.getByRole("region", { name: /visualização 360/i })).toHaveCount(0);
  await expect(page.getByRole("img", { name: /estudo visual/i })).toBeVisible();
});

test("detail experience has no horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/watch/breitling-navitimer");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.getByRole("region", { name: /visualização 360/i })).toBeVisible();
});
