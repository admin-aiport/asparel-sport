// Renders crest-style 2-column wordmark at high DPI.
import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  .wm {
    display: inline-flex;
    gap: 14px;
    padding: 24px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", "Arial Black", sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 0.92;
    -webkit-font-smoothing: antialiased;
  }
  .col { display: flex; flex-direction: column; align-items: stretch; min-width: max-content; }
  .name { font-size: 200px; display: block; white-space: nowrap; }
  .sub {
    font-size: 120px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    white-space: nowrap;
  }
  .sub--spor { width: 88%; align-self: flex-start; }
  .asp { color: #6cb4ee; -webkit-text-stroke: 1px #3a7ab0; }
  .arel { color: #1a529b; -webkit-text-stroke: 1px #0d2f5c; }
</style>
</head>
<body>
  <div class="wm" id="wm">
    <div class="col">
      <span class="asp name">ASP</span>
      <span class="asp sub sub--spor"><span>S</span><span>P</span><span>O</span><span>R</span></span>
    </div>
    <div class="col">
      <span class="arel name">AREL</span>
      <span class="arel sub"><span>K</span><span>U</span><span>L</span><span>Ü</span><span>B</span><span>Ü</span></span>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({
  deviceScaleFactor: 3,
  viewport: { width: 2200, height: 900 },
});
await page.setContent(html, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(200);
const buf = await page.locator("#wm").screenshot({ type: "png", omitBackground: true });
await browser.close();

const trimmed = await sharp(buf)
  .trim({ threshold: 0 })
  .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
  .toBuffer({ resolveWithObject: true });

await writeFile("public/brand/wordmark.png", trimmed.data);
console.log(
  `wordmark.png ${trimmed.info.width}x${trimmed.info.height} ${Math.round(trimmed.data.length / 1024)} kB`,
);
