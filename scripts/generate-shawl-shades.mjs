#!/usr/bin/env node
/**
 * Recolour the pashmina master photograph into House of Kani shade-card colours.
 *
 * The Flipkart "Try the shade on" approach (grayscale plate × colour, masked with
 * `source-in`) assumes an accurate alpha mask. The supplied master mask is not: it is a
 * coarse polygon inset 20–40 px inside the fabric with stepped edges, so compositing
 * through it leaves an untinted cream rim and a jagged silhouette on every shade.
 *
 * This script keeps the supplied mask only as a solid-interior floor and derives the
 * real matte from the photograph's own chroma (fabric is warm, the backdrop is neutral),
 * then tints in linear light so the shade is exact at the fabric's mid-tone and the fold
 * shadows stay proportional.
 *
 * Usage (from `website/`):
 *   node scripts/generate-shawl-shades.mjs                 # curated 12-shade sample set
 *   node scripts/generate-shawl-shades.mjs --codes 54,34   # named shades
 *   node scripts/generate-shawl-shades.mjs --chapter lake  # one chapter
 *   node scripts/generate-shawl-shades.mjs --all           # all 279
 *   node scripts/generate-shawl-shades.mjs --webp          # also write WebP
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { shadeChapters, shades, shadesInChapter } from "../src/lib/shades.ts";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const DEFAULT_SRC = path.join(ROOT, "assets/shawl-masters");
const DEFAULT_OUT = path.join(ROOT, "assets/shawl-shades");

const SAMPLE_CODES = [
  "55-LL", // Off White  — near-no-op light extreme
  "32-L", // Light Grey
  "56", // Gold
  "154", // Terracotta
  "192", // Rose Red
  "147-D", // Dark Purple
  "49", // Blue
  "54", // Navy
  "103", // Green
  "13", // Deep Green
  "112", // Dark Brown
  "34", // Charcoal — darkest
];

/* ---------------------------------------------------------------- arguments */

function parseArgs(argv) {
  const opts = {
    src: DEFAULT_SRC,
    out: DEFAULT_OUT,
    width: 1122,
    webp: false,
    sheet: true,
    gamma: 0.85,
    ambient: 0.05,
    maxGain: 1.25,
  };
  const codes = [];
  let mode = "samples";
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      const value = argv[i + 1];
      if (value === undefined) throw new Error(`${arg} needs a value`);
      i += 1;
      return value;
    };
    if (arg === "--src") opts.src = path.resolve(next());
    else if (arg === "--out") opts.out = path.resolve(next());
    else if (arg === "--width") opts.width = Number(next());
    else if (arg === "--gamma") opts.gamma = Number(next());
    else if (arg === "--ambient") opts.ambient = Number(next());
    else if (arg === "--max-gain") opts.maxGain = Number(next());
    else if (arg === "--codes")
      codes.push(
        ...next()
          .split(",")
          .map((c) => c.trim()),
      );
    else if (arg === "--chapter") {
      mode = "chapter";
      opts.chapter = next();
    } else if (arg === "--all") mode = "all";
    else if (arg === "--samples") mode = "samples";
    else if (arg === "--webp") opts.webp = true;
    else if (arg === "--no-sheet") opts.sheet = false;
    else if (arg === "--help" || arg === "-h") {
      console.log(
        "generate-shawl-shades [--samples|--all|--chapter ID|--codes A,B] [--src DIR] [--out DIR]\n" +
          "                      [--width PX] [--webp] [--no-sheet] [--gamma 0.85] [--ambient 0.05]",
      );
      process.exit(0);
    } else throw new Error(`unknown argument ${arg}`);
  }
  return { ...opts, codes, mode };
}

/* ------------------------------------------------------------ colour helpers */

const srgbToLinear = new Float64Array(256);
for (let i = 0; i < 256; i += 1) {
  const v = i / 255;
  srgbToLinear[i] = v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

const LUT_SIZE = 4096;
const linearToSrgb = new Uint8Array(LUT_SIZE + 1);
for (let i = 0; i <= LUT_SIZE; i += 1) {
  const v = i / LUT_SIZE;
  const s = v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055;
  linearToSrgb[i] = Math.max(0, Math.min(255, Math.round(s * 255)));
}
const encodeLinear = (v) => linearToSrgb[Math.max(0, Math.min(LUT_SIZE, Math.round(v * LUT_SIZE)))];

function parseHex(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => srgbToLinear[Number.parseInt(value.slice(i, i + 2), 16)]);
}

/* ------------------------------------------------------------- image helpers */

const median = (values) => {
  const sorted = Float64Array.from(values).sort();
  return sorted[Math.floor(sorted.length / 2)];
};

/** 3×3 median, in place on a copy — removes chroma speckle before the alpha ramp. */
function median3(src, width, height) {
  const out = new Uint8Array(src.length);
  const window = new Uint8Array(9);
  const at = (x, y) =>
    src[
      (y < 0 ? 0 : y >= height ? height - 1 : y) * width + (x < 0 ? 0 : x >= width ? width - 1 : x)
    ];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let n = 0;
      for (let dy = -1; dy <= 1; dy += 1)
        for (let dx = -1; dx <= 1; dx += 1) window[n++] = at(x + dx, y + dy);
      // insertion sort of nine values
      for (let i = 1; i < 9; i += 1) {
        const value = window[i];
        let j = i - 1;
        while (j >= 0 && window[j] > value) {
          window[j + 1] = window[j];
          j -= 1;
        }
        window[j + 1] = value;
      }
      out[y * width + x] = window[4];
    }
  }
  return out;
}

/** Grayscale morphological close: dilate then erode, filling pinholes in the matte. */
function close(src, width, height, radius) {
  const dilate = (input) => {
    const out = new Uint8Array(input.length);
    for (let y = 0; y < height; y += 1)
      for (let x = 0; x < width; x += 1) {
        let value = 0;
        for (let dy = -radius; dy <= radius; dy += 1) {
          const yy = Math.min(height - 1, Math.max(0, y + dy));
          for (let dx = -radius; dx <= radius; dx += 1) {
            const xx = Math.min(width - 1, Math.max(0, x + dx));
            const candidate = input[yy * width + xx];
            if (candidate > value) value = candidate;
          }
        }
        out[y * width + x] = value;
      }
    return out;
  };
  const erode = (input) => {
    const out = new Uint8Array(input.length);
    for (let y = 0; y < height; y += 1)
      for (let x = 0; x < width; x += 1) {
        let value = 255;
        for (let dy = -radius; dy <= radius; dy += 1) {
          const yy = Math.min(height - 1, Math.max(0, y + dy));
          for (let dx = -radius; dx <= radius; dx += 1) {
            const xx = Math.min(width - 1, Math.max(0, x + dx));
            const candidate = input[yy * width + xx];
            if (candidate < value) value = candidate;
          }
        }
        out[y * width + x] = value;
      }
    return out;
  };
  return erode(dilate(src));
}

/** Fills enclosed low-alpha pockets without touching the background or the loop opening. */
function fillHoles(src, width, height, solid = 250) {
  const reached = new Uint8Array(src.length);
  const stack = [];
  const push = (i) => {
    if (reached[i] || src[i] >= solid) return;
    reached[i] = 1;
    stack.push(i);
  };
  for (let x = 0; x < width; x += 1) {
    push(x);
    push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    push(y * width);
    push(y * width + width - 1);
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % width;
    const y = (i - x) / width;
    if (x > 0) push(i - 1);
    if (x < width - 1) push(i + 1);
    if (y > 0) push(i - width);
    if (y < height - 1) push(i + width);
  }
  const out = Uint8Array.from(src);
  for (let i = 0; i < src.length; i += 1) if (!reached[i] && src[i] < solid) out[i] = 255;
  return out;
}

/** Separable Gaussian, radius 2, sigma 1 — anti-aliases the matte edge. */
function blur(src, width, height) {
  const kernel = [0.06136, 0.24477, 0.38774, 0.24477, 0.06136];
  const tmp = new Float32Array(src.length);
  const out = new Uint8Array(src.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let sum = 0;
      for (let k = -2; k <= 2; k += 1) {
        const xx = x + k < 0 ? 0 : x + k >= width ? width - 1 : x + k;
        sum += src[y * width + xx] * kernel[k + 2];
      }
      tmp[y * width + x] = sum;
    }
  }
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let sum = 0;
      for (let k = -2; k <= 2; k += 1) {
        const yy = y + k < 0 ? 0 : y + k >= height ? height - 1 : y + k;
        sum += tmp[yy * width + x] * kernel[k + 2];
      }
      out[y * width + x] = Math.max(0, Math.min(255, Math.round(sum)));
    }
  }
  return out;
}

/* --------------------------------------------------------------- the matte */

async function loadMasters(src) {
  const [plate, grayscale, mask] = await Promise.all([
    sharp(path.join(src, "plate.png")).removeAlpha().raw().toBuffer({ resolveWithObject: true }),
    sharp(path.join(src, "grayscale.png")).greyscale().raw().toBuffer({ resolveWithObject: true }),
    sharp(path.join(src, "mask.png")).greyscale().raw().toBuffer({ resolveWithObject: true }),
  ]);
  const { width, height } = plate.info;
  if (grayscale.info.width !== width || grayscale.info.height !== height)
    throw new Error(
      `grayscale is ${grayscale.info.width}×${grayscale.info.height}, plate is ${width}×${height}`,
    );
  if (mask.info.width !== width || mask.info.height !== height)
    throw new Error(`mask is ${mask.info.width}×${mask.info.height}, plate is ${width}×${height}`);
  return { plate: plate.data, grayscale: grayscale.data, mask: mask.data, width, height };
}

/**
 * Builds the alpha matte from the photograph.
 *
 * 1. Chroma ramp: the backdrop is neutral (blue − green ≈ −4), the fabric is warm (−22).
 *    Map that separation onto 0–1, so the real silhouette and its anti-aliasing survive.
 * 2. The supplied mask is a floor, never a ceiling: it keeps every interior fold fully
 *    opaque, including specular folds where chroma collapses.
 * 3. Median + Gaussian remove the salt-and-pepper chroma noise in the cast shadow.
 */
function buildMatte({ plate, mask, width, height }) {
  const border = [];
  const inset = 24;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (x >= inset && x < width - inset && y >= inset && y < height - inset) continue;
      const i = (y * width + x) * 3;
      border.push(plate[i + 2] - plate[i + 1]);
    }
  }
  const bgChroma = median(border);
  const t0 = bgChroma - 2; // alpha 0
  const t1 = bgChroma - 12; // alpha 1
  const span = t0 - t1;

  const fabric = [];
  for (let i = 0; i < width * height; i += 1) {
    if (mask[i] > 200) fabric.push(plate[i * 3 + 2] - plate[i * 3 + 1]);
  }
  const fabricChroma = median(fabric);
  if (t0 - fabricChroma < 6)
    throw new Error(
      `chroma separation too small (backdrop ${bgChroma}, fabric ${fabricChroma}); ` +
        "this matte needs a warm subject on a neutral ground",
    );

  const alpha = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i += 1) {
    const chroma = plate[i * 3 + 2] - plate[i * 3 + 1];
    const ramp = Math.max(0, Math.min(255, Math.round(((t0 - chroma) / span) * 255)));
    alpha[i] = Math.max(ramp, mask[i]);
  }
  const denoised = median3(median3(alpha, width, height), width, height);
  const cleaned = blur(fillHoles(close(denoised, width, height, 2), width, height), width, height);
  return { alpha: cleaned, bgChroma, fabricChroma };
}

/* ------------------------------------------------------------------ the tint */

function tintPlate({ plate, grayscale, width, height }, matte, shade, opts) {
  const shadeLinear = parseHex(shade.hex);
  const { alpha } = matte;

  const inside = [];
  for (let i = 0; i < width * height; i += 1) if (alpha[i] > 250) inside.push(grayscale[i]);
  const reference = srgbToLinear[median(inside)];
  const gamma = opts.gamma;
  const ambient = opts.ambient;
  const maxGain = opts.maxGain;

  const out = Buffer.alloc(width * height * 3);
  for (let i = 0; i < width * height; i += 1) {
    const a = alpha[i] / 255;
    const p = i * 3;
    if (a === 0) {
      out[p] = plate[p];
      out[p + 1] = plate[p + 1];
      out[p + 2] = plate[p + 2];
      continue;
    }
    const gain = Math.min(maxGain, Math.max(0, (srgbToLinear[grayscale[i]] / reference) ** gamma));
    const factor = ambient + (1 - ambient) * gain;
    for (let c = 0; c < 3; c += 1) {
      const tinted = encodeLinear(shadeLinear[c] * factor);
      out[p + c] = Math.round(plate[p + c] * (1 - a) + tinted * a);
    }
  }
  return out;
}

/* --------------------------------------------------------------- contact sheet */

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function writeSheet(entries, outDir) {
  const columns = 4;
  const tile = 300;
  const gutter = 22;
  const margin = 44;
  const label = 62;
  const imageHeight = Math.round((tile * entries[0].height) / entries[0].width);
  const rows = Math.ceil(entries.length / columns);
  const width = margin * 2 + columns * tile + (columns - 1) * gutter;
  const header = 104;
  const height = header + margin + rows * (imageHeight + label) + (rows - 1) * gutter;

  const base = sharp({
    create: { width, height, channels: 3, background: "#F4F0E7" },
  });

  const composites = [];
  const text = [];
  for (const [index, entry] of entries.entries()) {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const x = margin + col * (tile + gutter);
    const y = header + row * (imageHeight + label + gutter);
    composites.push({
      input: await sharp(entry.buffer).resize(tile, imageHeight).toBuffer(),
      left: x,
      top: y,
    });
    const cx = x + tile / 2;
    text.push(
      `<text x="${cx}" y="${y + imageHeight + 24}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="19" fill="#1C1C1A">${escapeXml(entry.shade.code)} · ${escapeXml(entry.shade.name)}</text>`,
      `<text x="${cx}" y="${y + imageHeight + 44}" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#7A6A4F">${entry.shade.hex.toUpperCase()}</text>`,
    );
  }

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <text x="${margin}" y="56" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#1C1C1A">House of Kani — pashmina shade tests</text>
    <text x="${margin}" y="82" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#7A6A4F">matte from photograph chroma · linear-light tint · ${entries.length} shades</text>
    ${text.join("\n")}
  </svg>`;

  const sheet = await base
    .composite([...composites, { input: Buffer.from(overlay), left: 0, top: 0 }])
    .png()
    .toBuffer();
  const file = path.join(outDir, "contact-sheet.png");
  await writeFile(file, sheet);
  return file;
}

/* ---------------------------------------------------------------------- main */

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const masters = await loadMasters(opts.src);

  let selected;
  if (opts.codes.length) {
    selected = opts.codes.map((code) => {
      const shade = shades.find(
        (s) => s.code === code || s.code.toLowerCase() === code.toLowerCase(),
      );
      if (!shade) throw new Error(`no shade "${code}" in src/lib/shades.ts`);
      return shade;
    });
  } else if (opts.mode === "all") selected = [...shades];
  else if (opts.mode === "chapter") {
    if (!shadeChapters.some((c) => c.id === opts.chapter))
      throw new Error(
        `unknown chapter "${opts.chapter}"; expected one of ${shadeChapters.map((c) => c.id).join(", ")}`,
      );
    selected = shadesInChapter(opts.chapter);
  } else {
    selected = SAMPLE_CODES.map((code) => {
      const shade = shades.find((s) => s.code === code);
      if (!shade) throw new Error(`sample shade "${code}" is missing from src/lib/shades.ts`);
      return shade;
    });
  }

  const matte = buildMatte(masters);
  console.log(
    `matte: backdrop chroma ${matte.bgChroma.toFixed(1)}, fabric chroma ${matte.fabricChroma.toFixed(1)}, ` +
      `${masters.width}×${masters.height}`,
  );

  await mkdir(opts.out, { recursive: true });
  await writeFile(
    path.join(opts.out, "_matte.png"),
    await sharp(matte.alpha, { raw: { width: masters.width, height: masters.height, channels: 1 } })
      .png()
      .toBuffer(),
  );

  const entries = [];
  const width = Math.min(opts.width > 0 ? opts.width : masters.width, masters.width);
  for (const shade of selected) {
    const raw = tintPlate(masters, matte, shade, opts);
    const image = sharp(raw, {
      raw: { width: masters.width, height: masters.height, channels: 3 },
    }).resize(width, Math.round((width * masters.height) / masters.width));
    const file = path.join(opts.out, `${slugify(shade.code)}-${slugify(shade.name)}.png`);
    const buffer = await image.png({ compressionLevel: 9 }).toBuffer();
    await writeFile(file, buffer);
    if (opts.webp) {
      await writeFile(
        file.replace(/\.png$/, ".webp"),
        await sharp(buffer).webp({ quality: 88 }).toBuffer(),
      );
    }
    entries.push({ buffer, shade, width: masters.width, height: masters.height, file });
    console.log(`  ${shade.code.padEnd(6)} ${shade.hex}  ${shade.name}`);
  }

  if (opts.sheet && entries.length > 1 && entries.length <= 60) {
    const sheet = await writeSheet(entries, opts.out);
    console.log(`sheet: ${path.relative(process.cwd(), sheet)}`);
  } else if (opts.sheet && entries.length > 60) {
    console.log("sheet: skipped (more than 60 shades would make an unreadable contact sheet)");
  }
  console.log(`${entries.length} image(s) in ${path.relative(process.cwd(), opts.out)}`);
}

await main();
