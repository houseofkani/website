/**
 * Rasterises the brand marks:
 * - src/brand/monogram-royal.svg → apple icon, SEO logo and profile picture
 * - src/brand/monogram-small.svg → favicon
 * Run: node scripts/render-monogram.mjs
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FOREST = "#17261F";

const royal = await readFile(path.join(root, "src/brand/monogram-royal.svg"), "utf8");
const small = await readFile(path.join(root, "src/brand/monogram-small.svg"), "utf8");
const royalGroup = royal.match(/<g[\s\S]*<\/g>/)?.[0];

if (!royalGroup) throw new Error("Could not read the royal monogram group.");

function svgDoc({ background, scale = 1 } = {}) {
  const bg = background ? `<rect width="120" height="120" fill="${background}"/>` : "";
  const offset = (120 - 120 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" fill="none">
  ${bg}
  <g transform="translate(${offset} ${offset}) scale(${scale})">${royalGroup}</g>
</svg>`;
}

async function rasterize(svg, size, dest) {
  await sharp(Buffer.from(svg), { density: 1200 })
    .resize(size, size)
    .png()
    .toFile(path.join(root, dest));
}

await rasterize(small, 32, "public/favicon.png");
await rasterize(svgDoc({ background: FOREST, scale: 0.9 }), 180, "public/apple-icon.png");
await rasterize(svgDoc(), 1024, "public/images/house-of-kani-logo-v2.png");
await rasterize(svgDoc({ background: FOREST, scale: 0.86 }), 1024, "public/images/house-of-kani-profile.png");

console.log("Rendered favicon, apple-icon, SEO logo and profile picture.");
