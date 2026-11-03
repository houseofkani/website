#!/usr/bin/env node
/**
 * Derive every brand mark from the single supplied emblem:
 *   src/assets/house-of-kani-emblem-new.png  (1024², transparent ground)
 * Writes favicons, the touch icon, social avatars and their SVG wrappers.
 *
 * The emblem is trimmed of its transparent margin first, so the mark stays
 * legible at 16px in a browser tab.
 */
import { readFile, writeFile, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const SRC = path.join(root, "src", "assets", "house-of-kani-emblem-new.png");
const PUBLIC = path.join(root, "public");

const IVORY = "#f6f2e8";
const FOREST = "#253c32";

async function trimmedMark() {
  const buffer = await sharp(SRC).trim({ threshold: 12 }).toBuffer();
  const { width, height } = await sharp(buffer).metadata();
  if (!width || !height) throw new Error("emblem trim produced an empty image");
  return buffer;
}

/**
 * Flatten the artwork to its own gold. The master carries a white hairline
 * near the K swash plus white anti-alias fringes; both would read as glitches
 * on the forest icon ground. Alpha (the mark's shape) is untouched.
 */
async function goldened(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    out[i] = 159;
    out[i + 1] = 129;
    out[i + 2] = 65;
  }
  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

/** Square canvas + centred emblem occupying `coverage` of the width. */
async function squareIcon(mark, size, coverage, background) {
  const inner = Math.round(size * coverage);
  const emblem = await sharp(mark)
    .resize({ width: inner, height: inner, fit: "inside" })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: emblem, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function writeSvg(file, png, size) {
  const base64 = png.toString("base64");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <image width="${size}" height="${size}" href="data:image/png;base64,${base64}"/>
</svg>
`;
  await writeFile(file, svg);
  return (await stat(file)).size;
}

async function main() {
  await mkdir(PUBLIC, { recursive: true });
  const mark = await goldened(await trimmedMark());

  const favicon = await squareIcon(mark, 180, 0.76, IVORY);
  await writeFile(path.join(PUBLIC, "favicon.png"), favicon);

  const favicon32 = await squareIcon(mark, 32, 0.8, IVORY);
  await writeFile(path.join(PUBLIC, "favicon-32.png"), favicon32);

  await writeFile(path.join(PUBLIC, "apple-touch-icon.png"), favicon);

  const social = await squareIcon(mark, 512, 0.72, FOREST);
  await writeFile(path.join(PUBLIC, "house-of-kani-social.png"), social);

  // SVG wrappers keep the tab icon crisp while still shipping the real mark.
  const svgSmall = await squareIcon(mark, 128, 0.78, IVORY);
  const svgSize = await writeSvg(path.join(PUBLIC, "favicon.svg"), svgSmall, 64);

  const socialSvgSource = await squareIcon(mark, 256, 0.72, FOREST);
  const socialSvgSize = await writeSvg(
    path.join(PUBLIC, "house-of-kani-social.svg"),
    socialSvgSource,
    512,
  );

  const emblem = await readFile(SRC);
  console.log(`emblem master             ${(emblem.length / 1024).toFixed(0)} kB`);
  console.log(`favicon.png               ${(favicon.length / 1024).toFixed(1)} kB`);
  console.log(`favicon-32.png            ${(favicon32.length / 1024).toFixed(1)} kB`);
  console.log(`apple-touch-icon.png      ${(favicon.length / 1024).toFixed(1)} kB`);
  console.log(`house-of-kani-social.png  ${(social.length / 1024).toFixed(1)} kB`);
  console.log(`favicon.svg               ${(svgSize / 1024).toFixed(1)} kB`);
  console.log(`house-of-kani-social.svg  ${(socialSvgSize / 1024).toFixed(1)} kB`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
