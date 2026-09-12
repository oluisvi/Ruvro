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

test("featured curation pauses on hover and resumes when the pointer leaves", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const rail = page.getByRole("region", { name: "Curadoria em destaque" });
  await rail.scrollIntoViewIfNeeded();
  await expect(rail.getByRole("button", { name: /reproduzir|pausar movimento/i })).toHaveCount(0);
  await page.mouse.move(1, 1);
  await expect(rail).toHaveAttribute("data-autoplay", "running");

  const box = await rail.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + Math.min(40, box!.height / 2));
  await expect(rail).toHaveAttribute("data-autoplay", "paused");
  await page.mouse.move(1, 1);
  await expect(rail).toHaveAttribute("data-autoplay", "running");
});

test("featured curation advances automatically at the refined speed", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const rail = page.getByRole("region", { name: "Curadoria em destaque" });
  await rail.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await expect(rail).toHaveAttribute("data-autoplay", "running");

  const viewport = rail.locator(".watch-rail-viewport");
  const initialPosition = await viewport.evaluate((element) => element.scrollLeft);
  await expect
    .poll(() => viewport.evaluate((element) => element.scrollLeft), { timeout: 1_500 })
    .toBeGreaterThan(initialPosition + 24);
});

test("featured curation has previous and next controls without disabling autoplay", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const rail = page.getByRole("region", { name: "Curadoria em destaque" });
  await rail.scrollIntoViewIfNeeded();
  const viewport = rail.locator(".watch-rail-viewport");
  const next = rail.getByRole("button", { name: /próximo relógio/i });
  const previous = rail.getByRole("button", { name: /relógio anterior/i });
  await expect(next).toBeVisible();
  await expect(previous).toBeVisible();

  await page.mouse.move(1, 1);
  const beforeNext = await viewport.evaluate((element) => element.scrollLeft);
  await next.click();
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(beforeNext + 40);
  await page.mouse.move(1, 1);
  await expect(rail).toHaveAttribute("data-autoplay", "running");

  const beforePrevious = await viewport.evaluate((element) => element.scrollLeft);
  await previous.click();
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft)).toBeLessThan(beforePrevious - 40);
  await page.mouse.move(1, 1);
  await expect(rail).toHaveAttribute("data-autoplay", "running");
});

test("detail scene uses the integrated 360 watch viewer", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const viewer = page.getByRole("region", { name: /visualizador 360 do relógio/i });
  await viewer.scrollIntoViewIfNeeded();
  await expect(viewer).toBeVisible();
  await expect(page.locator(".detail-watch")).toHaveCount(0);
  const frame = viewer.locator("[data-watch-frame]");
  const first = await frame.getAttribute("data-watch-frame");
  await viewer.getByRole("button", { name: /próximo ângulo/i }).click();
  await expect.poll(() => frame.getAttribute("data-watch-frame")).not.toBe(first);
});

test("home motion reveals reading units instead of whole sections", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".manifesto > .section-kicker")).toHaveAttribute("data-motion", "reveal");
  await expect(page.locator(".manifesto > h2")).toHaveAttribute("data-motion-variant", "title");
  await expect(page.locator(".manifesto > h2")).toHaveCSS("transition-duration", /0\.72|0\.9|0\.92|720ms|920ms/);
  await expect(page.locator(".detail-lines > span").first()).toHaveAttribute("data-motion-variant", "line");
  await expect(page.locator('[data-rail-set="original"] > .watch-card').first()).toHaveAttribute("data-motion-variant", "card");
  await expect(page.locator(".hero-timeline")).not.toHaveAttribute("data-motion");
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
