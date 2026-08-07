import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Derives every favicon / app icon / social image from a single master logo.
// Usage: node scripts/generate-brand-assets.mjs [source-logo]
const SOURCE = process.argv[2] ?? "public/brand/logo.png";

const ROOT = process.cwd();
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

/** Source logo with transparent padding removed, so every output is tightly framed. */
const trimmed = await sharp(SOURCE).trim({ threshold: 0 }).png().toBuffer();
const { width, height } = await sharp(trimmed).metadata();
console.log(`trimmed source: ${width}x${height}`);

/** The artwork is flat vector-style colour, so a quantized palette keeps files small. */
const PNG_OUT = { compressionLevel: 9, palette: true, quality: 90, effort: 10 };

async function square(size, background) {
  return sharp(trimmed)
    .resize(size, size, { fit: "contain", background })
    .png(PNG_OUT)
    .toBuffer();
}

async function padded(size, background, paddingRatio) {
  const inner = Math.round(size * (1 - paddingRatio * 2));
  const art = await sharp(trimmed)
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: art, gravity: "center" }])
    .png(PNG_OUT)
    .toBuffer();
}

async function write(relPath, buffer) {
  const target = path.join(ROOT, relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, buffer);
  console.log(`${relPath} — ${(buffer.length / 1024).toFixed(1)} kB`);
}

/** ICO container holding one PNG per size; supported by every current browser. */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(0, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

await write(
  "public/brand/logo.png",
  await sharp(trimmed)
    .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
    .png(PNG_OUT)
    .toBuffer(),
);

await write("public/brand/logo-square.png", await square(512, TRANSPARENT));
// Maskable icons get cropped to the platform's shape, so keep art inside the 80% safe zone.
await write("public/brand/logo-maskable.png", await padded(512, WHITE, 0.2));
await write("src/app/icon.png", await square(512, TRANSPARENT));
await write("src/app/apple-icon.png", await padded(180, WHITE, 0.06));

const icoSizes = [16, 32, 48];
await write(
  "src/app/favicon.ico",
  buildIco(
    await Promise.all(
      icoSizes.map(async (size) => ({ size, data: await square(size, TRANSPARENT) })),
    ),
  ),
);

const ogArt = await sharp(trimmed)
  .resize(null, 520, { fit: "contain", background: TRANSPARENT })
  .toBuffer();
await write(
  "public/brand/og-image.png",
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: WHITE } })
    .composite([{ input: ogArt, gravity: "center" }])
    .png(PNG_OUT)
    .toBuffer(),
);
