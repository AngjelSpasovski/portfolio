import { expect, test } from "@playwright/test";

import { portfolioData } from "../src/data/portfolio-data";

test.describe("localized portfolio routes", () => {
  test("redirects the root entry point to English", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.getByRole("heading", { level: 1, name: "Angjel Spasovski" })).toBeVisible();
  });

  test("renders both locale routes without URL fragments", async ({ page }) => {
    await page.goto("/en/");
    await expect(page).toHaveTitle("Angjel Spasovski - Software Engineer");
    await expect(page).toHaveURL(/\/en\/$/);

    await page.goto("/mk/");
    await expect(page).toHaveTitle("Анѓел Спасовски - Софтверски инженер");
    await expect(page).toHaveURL(/\/mk\/$/);
  });
});

test.describe("section-aware locale navigation", () => {
  test("keeps Projects visible and active after changing language", async ({ page }) => {
    await page.goto("/en/");
    await page.locator("#projects").scrollIntoViewIfNeeded();

    const projectsLink = page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("button", { name: "Projects" });
    await expect(projectsLink).toHaveAttribute("aria-current", "location");

    await page.getByRole("link", { name: "Switch language to Macedonian" }).click();

    await expect(page).toHaveURL(/\/mk\/$/);
    await expect(page.locator("#proekti")).toBeInViewport();
    await expect(
      page
        .getByRole("navigation", { name: "Главна навигација" })
        .getByRole("button", { name: "Проекти" }),
    ).toHaveAttribute("aria-current", "location");
  });

  test("maps Home and Certifications to their translated sections", async ({ page }) => {
    await page.goto("/en/");
    await page.getByRole("link", { name: "Switch language to Macedonian" }).click();
    await expect(page.locator("#pochetok")).toBeInViewport();

    await page.locator("#sertifikati").scrollIntoViewIfNeeded();
    await page.getByRole("link", { name: "Промени го јазикот на англиски" }).click();

    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator("#certifications")).toBeInViewport();
  });
});

test("case-study dialog traps and restores focus", async ({ page }) => {
  await page.goto("/en/");
  await page.locator("#projects").scrollIntoViewIfNeeded();

  const trigger = page.getByRole("button", { name: "View case study" }).first();
  await trigger.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "DB Store" })).toBeVisible();
  await expect(dialog.getByText("FULL TECHNOLOGY STACK")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close project details" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("canonical projects satisfy the presentation contract", () => {
  const publishedProjects = portfolioData.projects.filter((project) => project.status === "published");

  expect(publishedProjects).toHaveLength(3);
  for (const project of publishedProjects) {
    expect(project.featuredTechnologies.length).toBeGreaterThanOrEqual(5);
    expect(project.featuredTechnologies.length).toBeLessThanOrEqual(7);
    expect(Object.values(project.caseStudy).every((field) => field.en && field.mk)).toBe(true);
  }
});

test("canonical certifications keep the complete inventory and a compact public selection", () => {
  expect(portfolioData.certifications).toHaveLength(12);
  expect(portfolioData.certifications.filter((certification) => certification.featured)).toHaveLength(4);
});

test("canonical experience derives six companies and includes the DB Store part-time role", () => {
  expect(new Set(portfolioData.experience.map((item) => item.company)).size).toBe(6);

  const dbStoreRole = portfolioData.experience.find((item) => item.id === "dbstore-software-engineer");
  expect(dbStoreRole).toMatchObject({
    company: "DB Store",
    current: true,
    employmentType: { en: "Part-time", mk: "Part-time" },
    period: { en: "2025 - Present", mk: "2025 - Сега" },
  });
});

test("locale is present in the initial HTML", async ({ request }) => {
  for (const locale of ["en", "mk"]) {
    const response = await request.get(`/${locale}/`);
    expect(response.ok()).toBe(true);
    expect(await response.text()).toMatch(new RegExp(`<html[^>]*lang="${locale}"`));
  }
});

for (const width of [390, 1440]) {
  test(`back-to-top and timeline alignment at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/");
    await expect(page.getByRole("button", { name: "Back to top", exact: true })).toBeHidden();
    await page.locator("#experience").scrollIntoViewIfNeeded();
    const timeline = page.locator("[data-timeline]");
    const error = await timeline.evaluate((element) => {
      const line = getComputedStyle(element, "::before");
      const axis = element.getBoundingClientRect().left + parseFloat(line.left);
      return Math.max(...Array.from(element.querySelectorAll("[data-timeline-marker]")).map((marker) => {
        const rect = marker.getBoundingClientRect();
        return Math.abs(rect.left + rect.width / 2 - axis);
      }));
    });
    expect(error).toBeLessThan(1);
    await page.locator("[data-timeline-marker]").first().scrollIntoViewIfNeeded();
    await expect(page.locator("[data-timeline]").locator(":scope > div").first()).toHaveCSS("opacity", "1");
    await page.screenshot({ path: testInfo.outputPath("experience.png") });
    await page.getByRole("button", { name: "Back to top", exact: true }).click();
    await expect(page.locator("#home")).toBeInViewport();
    await expect(page).toHaveURL(/\/en\/$/);
    await page.getByRole("link", { name: "Switch language to Macedonian" }).click();
    await page.locator("#proekti").scrollIntoViewIfNeeded();
    await expect(page.locator("#proekti").getByText("Личен проект", { exact: true })).toBeVisible();
    await expect(page.locator("#proekti").getByText("Клиентски проект", { exact: true })).toBeAttached();
    await page.getByRole("button", { name: "Врати се на почеток", exact: true }).click();
    await expect(page.locator("#pochetok")).toBeInViewport();
    await expect(page).toHaveURL(/\/mk\/$/);
  });
}
