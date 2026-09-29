#!/usr/bin/env node
/**
 * Export native-resolution WebP masters (no upscaling).
 * Clarity comes from source pixels; size savings from WebP + next/image AVIF.
 */
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src", "assets");
const outDir = path.join(root, "public", "images");

const WEBP_QUALITY = 92;

const SKIP = new Set([
  "authentic-drape.jpg",
  "authentic-hero.jpg",
  "authentic-loom.jpg",
  "authentic-threads.jpg",
  "hok-monogram.png.asset.json",
]);

async function optimizeOne(file) {
  if (SKIP.has(file)) return null;
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const base = path.basename(file, ext);
  const input = path.join(srcDir, file);
  const meta = await sharp(input).rotate().metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  const webpPath = path.join(outDir, `${base}.webp`);
  await rm(path.join(outDir, `${base}.avif`), { force: true });

  // Preserve native pixels — never upscale. Only convert to high-quality WebP.
  await sharp(input)
    .rotate()
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(webpPath);

  const webpStat = await stat(webpPath);
  return {
    base,
    size: `${width}x${height}`,
    webpKb: Math.round(webpStat.size / 1024),
  };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  sharp.cache(false);

  const files = await readdir(srcDir);
  const results = [];
  for (const file of files) {
    process.stdout.write(`Converting ${file}…\n`);
    const result = await optimizeOne(file);
    if (result) results.push(result);
  }
  results.sort((a, b) => b.webpKb - a.webpKb);
  console.table(results);
  console.log(`Native WebP masters (no upscale): ${results.length} → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
