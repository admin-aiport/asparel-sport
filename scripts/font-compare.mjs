// Renders candidate fonts next to the logo lettering so the closest match can be picked by eye.
import { chromium } from "playwright";

const candidates = [
  ["Montserrat", 800],
  ["Poppins", 700],
  ["Plus Jakarta Sans", 800],
  ["Archivo", 800],
  ["Raleway", 800],
  ["Nunito Sans", 800],
  ["Figtree", 800],
  ["Syne", 800],
];

const families = candidates
  .map(([f, w]) => `family=${f.replace(/ /g, "+")}:wght@${w}`)
  .join("&");

const rows = candidates
  .map(
    ([family, weight]) => `
  <div class="row">
    <div class="label">${family} ${weight}</div>
    <div class="mark" style="font-family:'${family}';font-weight:${weight}">
      <div class="name"><span class="asp">ASP</span><span class="arel">AREL</span></div>
      <div class="sub"><span class="asp">SPOR</span><span class="arel">&nbsp;KULÜBÜ</span></div>
    </div>
  </div>`,
  )
  .join("");

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${families}&display=block">
<style>
  body { margin:0; padding:24px; background:#fff; font-family:system-ui; }
  .row { display:flex; align-items:center; gap:24px; padding:10px 0; border-top:1px solid #eee; }
  .label { width:210px; font-size:13px; color:#666; }
  .name { font-size:56px; letter-spacing:0.06em; line-height:1; text-transform:uppercase; }
  .sub  { font-size:42px; letter-spacing:0.045em; line-height:1; text-transform:uppercase; margin-top:4px; }
  .asp { color:#5b9bd5; }
  .arel { color:#1b4f9c; }
  .reference { padding:10px 0 20px; }
  .reference img { height:150px; }
</style></head><body>
<div class="reference"><img src="LOGOSRC" alt=""></div>
${rows}
</body></html>`;

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1100, height: 1400 }, deviceScaleFactor: 2 });
await page.setContent(html.replace("LOGOSRC", process.argv[2]), { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.screenshot({ path: ".next/font-compare.png", fullPage: true });
await browser.close();
