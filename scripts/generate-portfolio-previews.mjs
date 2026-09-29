import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "public/images/projects/portfolio");
const sourceUrl = process.env.PORTFOLIO_PREVIEW_URL ?? "http://127.0.0.1:3100/en/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });

async function saveSection(name, sectionId) {
  await page.evaluate((id) => {
    const section = document.getElementById(id);
    if (!section) throw new Error(`Missing preview section: ${id}`);
    const top = section.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
  }, sectionId);
  await page.waitForTimeout(1_200);
  const screenshot = await page.screenshot({ type: "png" });
  await sharp(screenshot)
    .resize(1400, 720, { fit: "cover", position: "top" })
    .webp({ quality: 84 })
    .toFile(path.join(outputDir, `${name}.webp`));
}

await mkdir(outputDir, { recursive: true });

try {
  await page.goto(sourceUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1_200);
  await saveSection("home", "home");
  await saveSection("experience", "experience");
  await saveSection("certifications", "certifications");
} finally {
  await browser.close();
}

console.log(`Generated portfolio previews in ${outputDir}`);
