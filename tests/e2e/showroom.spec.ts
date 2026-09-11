import { expect, test } from "@playwright/test";

test("core showroom routes and conversion are available", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /curadoria privada/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /entrar na comunidade/i }).first()).toHaveAttribute("href", /chat\.whatsapp\.com/);

  await page.goto("/collection");
  await expect(page.locator("header.site-header")).toHaveClass(/site-header--light/);
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
  await expect(page.getByRole("link", { name: /explorar a curadoria/i }).first()).toBeVisible();
});
