import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const rawDir = path.resolve("docs/demo-raw");
fs.mkdirSync(rawDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  slowMo: 180,
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  recordVideo: {
    dir: rawDir,
    size: { width: 1440, height: 900 },
  },
});

const page = await context.newPage();

async function hideDevOverlay() {
  await page.addStyleTag({
    content: `
      nextjs-portal,
      [data-next-badge-root],
      #nextjs-dev-indicator {
        display: none !important;
      }
    `,
  });
}

async function pause(ms) {
  await page.waitForTimeout(ms);
}

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await hideDevOverlay();
await pause(2200);

await page.getByRole("link", { name: "Applications" }).click();
await hideDevOverlay();
await pause(1600);
await page.getByRole("button", { name: "Pending" }).click();
await pause(1400);
await page.getByRole("button", { name: "All" }).click();
await pause(1200);

await page.getByRole("link", { name: "Review Queue" }).click();
await hideDevOverlay();
await pause(1800);

const accept = page.getByRole("button", { name: "Accept" }).first();
await accept.click();
await pause(900);
await page.getByRole("button", { name: "Confirm", exact: true }).click();
await pause(1800);

await page.getByRole("link", { name: "Shared Blocklist" }).click();
await hideDevOverlay();
await pause(1800);

await page.getByRole("link", { name: "Dashboard" }).click();
await hideDevOverlay();
await pause(2400);

await context.close();
await browser.close();

const recorded = fs
  .readdirSync(rawDir)
  .filter((file) => file.endsWith(".webm"))
  .map((file) => path.join(rawDir, file))
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];

if (!recorded) {
  throw new Error("Playwright did not write a video file.");
}

const dest = path.resolve("docs/demo.webm");
fs.copyFileSync(recorded, dest);
console.log(`Wrote ${dest}`);
