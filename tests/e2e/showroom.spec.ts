import { expect, test } from "@playwright/test";

test("core showroom routes and conversion are available", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /curadoria privada/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /entrar na comunidade/i }).first()).toHaveAttribute("href", /chat\.whatsapp\.com/);
  await expect(page.locator("main.home-gradient")).toHaveCSS("background-image", /linear-gradient/);
  await expect(page.locator(".manifesto")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(page.locator(".final-cta")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

  await page.goto("/collection");
  await expect(page.locator("header.site-header")).toHaveClass(/site-header--light/);
  await expect(page.locator(".page-intro > *").first()).toHaveAttribute("data-motion", "reveal");
  await expect(page.locator(".site-header")).not.toHaveAttribute("data-motion");
  await expect(page.getByRole("link", { name: /voltar ao início/i })).toBeVisible();
  await page.getByRole("link", { name: /voltar ao início/i }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/collection");
  await expect(page.getByText("Demonstração").first()).toBeVisible();
  await page.getByRole("link", { name: /ver nocturne/i }).click();
  await expect(page.getByRole("heading", { name: "Nocturne" })).toBeVisible();
});

test("mobile navigation opens with keyboard-operable links", async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation", { name: "Navegação móvel" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ruvro Private" }).last()).toBeVisible();
});

test("reduced motion keeps primary actions visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-timeline")).not.toHaveAttribute("data-motion");
  await expect(page.getByRole("link", { name: /explorar a curadoria/i }).first()).toBeVisible();
  const rail = page.getByRole("region", { name: "Curadoria em destaque" });
  await expect(rail).toHaveAttribute("data-autoplay", "paused");
  await expect(rail.locator('[data-rail-set="clone"] a')).toHaveCount(0);
});

test("featured curation is an accessible pausable rail", async ({ page }) => {
  await page.goto("/");
  const rail = page.getByRole("region", { name: "Curadoria em destaque" });
  await expect(rail).toBeVisible();
  const control = rail.getByRole("button", { name: /pausar movimento/i });
  await expect(control).toBeVisible();
  await control.click();
  await expect(rail).toHaveAttribute("data-autoplay", "paused");
  await expect(rail.getByRole("button", { name: /reproduzir movimento/i })).toBeVisible();
});

test("motion responds to preference changes and keyboard focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const card = page.locator(".watch-card").first();
  await card.locator("a").focus();
  await expect(card).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("body")).not.toHaveClass(/motion-ready/);
  await expect(page.locator(".hero-timeline")).not.toHaveAttribute("data-stage");
  await expect(page.locator(".final-cta .button")).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("body")).toHaveClass(/motion-ready/);
  await expect(card).toHaveCSS("opacity", "1");
});

test("compact hero separates copy, imagery and disclosure", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".hero-sticky")).toHaveCSS("position", "relative");
  await expect(page.locator(".hero-demo")).toBeVisible();
  const copy = await page.locator(".hero-copy").boundingBox();
  const watch = await page.locator(".hero-watch").boundingBox();
  expect(copy).not.toBeNull();
  expect(watch!.y).toBeGreaterThanOrEqual(copy!.y + copy!.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator(".hero-sticky")).toHaveCSS("position", "relative");
  await expect(page.locator(".hero-demo")).toBeVisible();
});

test("essential content and native menu work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".final-cta .button")).toHaveCSS("opacity", "1");
  await expect(page.locator(".watch-card").first()).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation", { name: "Navegação móvel" })).toBeVisible();
  await context.close();
});
