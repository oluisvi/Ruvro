import { expect, test } from "@playwright/test";

test("film loads on view, plays once and uses the responsive file", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const video = page.locator(".detail-film video");
  await expect(video).not.toHaveAttribute("src");
  await page.locator(".detail-film").scrollIntoViewIfNeeded();
  await expect(video).toHaveAttribute("src", isMobile ? "/media/detail-film-mobile.mp4" : "/media/detail-film.mp4");
  await expect(page.locator(".detail-film")).toHaveAttribute("data-film-ready", "true");
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.ended), { timeout: 15000 }).toBe(true);
  await page.locator(".final-cta").scrollIntoViewIfNeeded();
  await page.locator(".detail-film").scrollIntoViewIfNeeded();
  expect(await video.evaluate((node: HTMLVideoElement) => node.ended && node.paused)).toBe(true);
});

test("reduced motion never downloads a film and responds live", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => { if (request.url().includes(".mp4")) requests.push(request.url()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const film = page.locator(".detail-film");
  const video = film.locator("video");
  await film.scrollIntoViewIfNeeded();
  await expect(film.locator("img")).toBeVisible();
  await expect(video).not.toHaveAttribute("src");
  expect(requests).toEqual([]);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(video).toHaveAttribute("src", /\.mp4$/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(video).not.toHaveAttribute("src");
  await expect(film).not.toHaveAttribute("data-film-ready");
  expect(await video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
});

test("film falls back on network failure", async ({ page }) => {
  await page.route("**/*.mp4", (route) => route.abort());
  await page.goto("/");
  const film = page.locator(".detail-film");
  await film.scrollIntoViewIfNeeded();
  await expect.poll(() => film.locator("video").evaluate((node: HTMLVideoElement) => Boolean(node.error))).toBe(true);
  await expect(film).not.toHaveAttribute("data-film-ready");
  await expect(film.locator("img")).toBeVisible();
});

test("data saver keeps the static study", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", { value: Object.assign(new EventTarget(), { saveData: true }) });
  });
  await page.goto("/");
  await page.locator(".detail-film").scrollIntoViewIfNeeded();
  await expect(page.locator(".detail-film video")).not.toHaveAttribute("src");
  await expect(page.locator(".detail-film img")).toBeVisible();
});
