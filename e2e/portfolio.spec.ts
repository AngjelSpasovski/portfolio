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

  expect(publishedProjects).toHaveLength(4);
  expect(publishedProjects.map((project) => project.id)).toContain("portfolio");
  for (const project of publishedProjects) {
    expect(project.featuredTechnologies.length).toBeGreaterThanOrEqual(5);
    expect(project.featuredTechnologies.length).toBeLessThanOrEqual(7);
    expect(Object.values(project.caseStudy).every((field) => field.en && field.mk)).toBe(true);
  }
});

test("desktop project cards keep their visual and content rows aligned", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/");

  const cards = page.locator("[data-project-card]");
  await expect(cards).toHaveCount(4);
  await cards.first().scrollIntoViewIfNeeded();

  const firstRowMetrics = await cards.evaluateAll((items) =>
    items.slice(0, 2).map((card) => {
      const cardRect = card.getBoundingClientRect();
      const offset = (selector: string) => {
        const element = card.querySelector(selector);
        if (!element) throw new Error(`Missing project-card element: ${selector}`);
        return element.getBoundingClientRect().top - cardRect.top;
      };

      return {
        height: cardRect.height,
        previewHeight: card.querySelector("[data-project-preview]")?.getBoundingClientRect().height,
        heading: offset("[data-project-heading]"),
        stack: offset("[data-project-stack]"),
        actions: offset("[data-project-actions]"),
      };
    }),
  );

  const [first, second] = firstRowMetrics;
  expect(Math.abs(first.height - second.height)).toBeLessThan(1);
  expect(Math.abs((first.previewHeight ?? 0) - (second.previewHeight ?? 0))).toBeLessThan(1);
  expect(Math.abs(first.heading - second.heading)).toBeLessThan(1);
  expect(Math.abs(first.stack - second.stack)).toBeLessThan(1);
  expect(Math.abs(first.actions - second.actions)).toBeLessThan(1);
});

test("canonical certifications keep the complete chronological inventory", () => {
  expect(portfolioData.certifications).toHaveLength(15);

  const chatGptCredential = portfolioData.certifications.find(
    (certification) => certification.id === "chatgpt-generative-ai",
  );
  expect(chatGptCredential).toMatchObject({
    courseUrl:
      "https://www.udemy.com/course/chatgpt-bard-bing-complete-guide-to-chatgpt-openai-apis/",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-6f5305ed-5b45-490c-843c-5b736101c6b9/",
  });

  const angularCredential = portfolioData.certifications.find(
    (certification) => certification.id === "angular-front-to-back",
  );
  expect(angularCredential).toMatchObject({
    courseUrl: "https://www.udemy.com/course/angular-4-front-to-back/",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-bd6170e8-56df-4d96-bb37-5d1dff080af6/",
  });

  const javascriptCredential = portfolioData.certifications.find(
    (certification) => certification.id === "javascript-complete-guide",
  );
  expect(javascriptCredential).toMatchObject({
    courseUrl:
      "https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-0ea9e58a-cd60-4dad-bdd9-9bf028204239/",
  });

  const weirdPartsCredential = portfolioData.certifications.find(
    (certification) => certification.id === "javascript-weird-parts",
  );
  expect(weirdPartsCredential).toMatchObject({
    courseUrl: "https://www.udemy.com/course/understand-javascript/",
    credentialUrl: "https://www.udemy.com/certificate/UC-MAEVF7RN/",
  });

  const angularJsCredential = portfolioData.certifications.find(
    (certification) => certification.id === "learn-understand-angularjs",
  );
  expect(angularJsCredential).toMatchObject({
    courseUrl: "https://www.udemy.com/course/learn-angularjs/",
    credentialUrl: "https://www.udemy.com/certificate/UC-ZI1987X1/",
  });

  const auth0Credential = portfolioData.certifications.find(
    (certification) => certification.id === "angularjs-authentication-auth0",
  );
  expect(auth0Credential).toMatchObject({
    courseUrl: "https://www.udemy.com/course/angularjs-authentication-with-auth0/",
    credentialUrl: "https://www.udemy.com/certificate/UC-D46S7WOE/",
  });

  const newCredentials = portfolioData.certifications.filter((certification) =>
    [
      "docker-containers-essentials",
      "software-containerization-docker",
      "getting-started-angular-2",
    ].includes(certification.id),
  );
  expect(newCredentials).toEqual([
    expect.objectContaining({
      id: "docker-containers-essentials",
      issuedYear: 2018,
      courseUrl: "https://www.udemy.com/course/docker-and-containers-the-essentials/",
      credentialUrl: "https://www.udemy.com/certificate/UC-ZQS98R78/",
    }),
    expect.objectContaining({
      id: "software-containerization-docker",
      issuedYear: 2018,
      courseUrl: "https://www.udemy.com/course/draft/1094674/",
      credentialUrl: "https://www.udemy.com/certificate/UC-TX7G9K1Y/",
    }),
    expect.objectContaining({
      id: "getting-started-angular-2",
      issuedYear: 2018,
      courseUrl: "https://www.udemy.com/course/getting-started-with-angular-2/",
      credentialUrl: "https://www.udemy.com/certificate/UC-VA2JL80P/",
    }),
  ]);

  const years = portfolioData.certifications
    .map((certification) => certification.issuedYear)
    .sort((a, b) => b - a);
  expect(years).toEqual([
    2024, 2022, 2022, 2018, 2018, 2018, 2017, 2017, 2017, 2014, 2011, 2011, 2011, 2011, 2010,
  ]);
});

test("certifications show five recent items before expanding the full inventory", async ({ page }) => {
  await page.goto("/en/");
  await page.locator("#certifications").scrollIntoViewIfNeeded();

  await expect(
    page.getByRole("link", { name: "View course: ChatGPT & Generative AI - The Complete Guide" }),
  ).toHaveAttribute("href", /chatgpt-bard-bing-complete-guide-to-chatgpt-openai-apis/);
  await expect(
    page.getByRole("link", { name: "View course: Angular Front To Back" }),
  ).toHaveAttribute("href", /angular-4-front-to-back/);
  await expect(
    page.getByRole("link", { name: "View course: Docker and Containers: The Essentials" }),
  ).toHaveAttribute("href", /docker-and-containers-the-essentials/);

  const credentialLinks = page.getByRole("link", { name: "View credential" });
  await expect(page.locator("#certifications-list h3")).toHaveText([
    "ChatGPT & Generative AI - The Complete Guide",
    "Angular Front To Back",
    "JavaScript - The Complete Guide (Beginner + Advanced)",
    "Docker and Containers: The Essentials",
    "Beginners' guide to software containerization and Docker",
  ]);
  await expect(credentialLinks).toHaveCount(5);
  await expect(credentialLinks.nth(0)).toHaveAttribute(
    "href",
    /UC-6f5305ed-5b45-490c-843c-5b736101c6b9/,
  );
  await expect(credentialLinks.nth(1)).toHaveAttribute(
    "href",
    /UC-bd6170e8-56df-4d96-bb37-5d1dff080af6/,
  );
  await expect(credentialLinks.nth(2)).toHaveAttribute(
    "href",
    /UC-0ea9e58a-cd60-4dad-bdd9-9bf028204239/,
  );
  await expect(credentialLinks.nth(3)).toHaveAttribute("href", /UC-ZQS98R78/);
  await expect(credentialLinks.nth(4)).toHaveAttribute("href", /UC-TX7G9K1Y/);

  const showAllButton = page.getByRole("button", { name: "View all certificates" });
  await expect(showAllButton).toHaveAttribute("aria-expanded", "false");
  await showAllButton.click();

  await expect(page.getByRole("button", { name: "Show fewer certificates" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(page.locator("#certifications-list h3")).toHaveText([
    "ChatGPT & Generative AI - The Complete Guide",
    "Angular Front To Back",
    "JavaScript - The Complete Guide (Beginner + Advanced)",
    "Docker and Containers: The Essentials",
    "Beginners' guide to software containerization and Docker",
    "Getting Started with Angular 2+",
    "Learn and Understand AngularJS",
    "JavaScript: Understanding the Weird Parts",
    "AngularJS Authentication: Secure Your App with Auth0",
    "Microsoft YouthSpark",
    "CCNA Exploration: Network Fundamentals",
    "CCNA Exploration: Routing Protocols and Concepts",
    "CCNA Exploration: LAN Switching and Wireless",
    "CCNA Exploration: Accessing the WAN",
    "Fundamentals of Wireless LANS",
  ]);
  await expect(
    page.getByRole("link", {
      name: "View course: JavaScript - The Complete Guide (Beginner + Advanced)",
    }),
  ).toHaveAttribute("href", /javascript-the-complete-guide-2020-beginner-advanced/);
  await expect(
    page.getByRole("link", {
      name: "View course: AngularJS Authentication: Secure Your App with Auth0",
    }),
  ).toHaveAttribute("href", /angularjs-authentication-with-auth0/);
  await expect(credentialLinks).toHaveCount(9);
  await expect(credentialLinks.nth(5)).toHaveAttribute("href", /UC-VA2JL80P/);
  await expect(credentialLinks.nth(8)).toHaveAttribute("href", /UC-D46S7WOE/);
});

test("certification card titles and metadata share consistent row positions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  await page.locator("#certifications").scrollIntoViewIfNeeded();

  const titleOffsets = await page.locator("[data-certification-title]").evaluateAll((titles) =>
    titles.map((title) => title.getBoundingClientRect().top),
  );
  const metadataOffsets = await page.locator("[data-certification-meta]").evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().top),
  );

  expect(Math.max(...titleOffsets) - Math.min(...titleOffsets)).toBeLessThan(1);
  expect(Math.max(...metadataOffsets) - Math.min(...metadataOffsets)).toBeLessThan(1);
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
    await expect(
      page.locator("#proekti").getByText("Личен проект", { exact: true }).first(),
    ).toBeVisible();
    await expect(page.locator("#proekti").getByText("Клиентски проект", { exact: true })).toBeAttached();
    await page.getByRole("button", { name: "Врати се на почеток", exact: true }).click();
    await expect(page.locator("#pochetok")).toBeInViewport();
    await expect(page).toHaveURL(/\/mk\/$/);
  });
}
