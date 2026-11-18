// Entry point: render the 17 November 2026 front page and write entry.png.
// Deterministic: no clock, no randomness, no network. Run twice -> same bytes.
// Usage: MAKEFUN_OUTPUT_DIR=out node main.ts
// (Node 22+ can run TypeScript directly; only node built-ins are used.)

import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { drawScene } from "./src/scene.ts";
import { encodePng } from "./src/png.ts";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });

const canvas = drawScene();
const png = encodePng(canvas.width, canvas.height, canvas.data);
const outPath = join(outDir, "entry.png");
writeFileSync(outPath, png);
const sha = createHash("sha256").update(png).digest("hex");

console.log(`wrote ${outPath} (${canvas.width}x${canvas.height}, ${png.length} bytes)`);
console.log(`sha256 ${sha}`);
