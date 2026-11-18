// Minimal raster canvas + a hand-defined 5x7 bitmap font.
// All glyphs below were typed out by hand in this file; no font files,
// no external assets, no network.

export type RGB = [number, number, number];

export class Canvas {
  readonly width: number;
  readonly height: number;
  readonly data: Uint8Array; // RGB, row-major

  constructor(width: number, height: number, bg: RGB = [244, 239, 228]) {
    this.width = width;
    this.height = height;
    this.data = new Uint8Array(width * height * 3);
    this.fill(bg);
  }

  fill(c: RGB): void {
    for (let i = 0; i < this.data.length; i += 3) {
      this.data[i] = c[0];
      this.data[i + 1] = c[1];
      this.data[i + 2] = c[2];
    }
  }

  set(x: number, y: number, c: RGB): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const i = (y * this.width + x) * 3;
    this.data[i] = c[0];
    this.data[i + 1] = c[1];
    this.data[i + 2] = c[2];
  }

  rect(x: number, y: number, w: number, h: number, c: RGB): void {
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) this.set(xx, yy, c);
    }
  }

  // Filled rectangle with a 1px border drawn in `border`.
  frame(x: number, y: number, w: number, h: number, fill: RGB, border: RGB): void {
    this.rect(x, y, w, h, border);
    this.rect(x + 1, y + 1, w - 2, h - 2, fill);
  }

  line(x0: number, y0: number, x1: number, y1: number, c: RGB, thick = 1): void {
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    let x = x0;
    let y = y0;
    for (;;) {
      this.rect(x - Math.floor(thick / 2), y - Math.floor(thick / 2), thick, thick, c);
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y += sy;
      }
    }
  }

  circle(cx: number, cy: number, r: number, c: RGB): void {
    for (let y = -r; y <= r; y++) {
      for (let x = -r; x <= r; x++) {
        if (x * x + y * y <= r * r) this.set(cx + x, cy + y, c);
      }
    }
  }

  triangle(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, c: RGB): void {
    const minX = Math.min(x0, x1, x2);
    const maxX = Math.max(x0, x1, x2);
    const minY = Math.min(y0, y1, y2);
    const maxY = Math.max(y0, y1, y2);
    const d = (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
    if (d === 0) return;
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const a = ((x1 - x) * (y2 - y) - (y1 - y) * (x2 - x)) / d;
        const b = ((x2 - x) * (y0 - y) - (y2 - y) * (x0 - x)) / d;
        const g = 1 - a - b;
        if (a >= 0 && b >= 0 && g >= 0) this.set(x, y, c);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 5x7 bitmap font. Each glyph is 7 rows of 5 characters ('#' = on, '.' = off).
// Covers A-Z, 0-9 and common punctuation. Text is upper-cased before drawing.
// ---------------------------------------------------------------------------

const FONT: Record<string, string[]> = {
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  B: ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."],
  C: [".####", "#....", "#....", "#....", "#....", "#....", ".####"],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  F: ["#####", "#....", "#....", "####.", "#....", "#....", "#...."],
  G: [".####", "#....", "#....", "#.###", "#...#", "#...#", ".###."],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
  J: ["..###", "...#.", "...#.", "...#.", "...#.", "#..#.", ".##.."],
  K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
  L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
  M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
  N: ["#...#", "##..#", "##..#", "#.#.#", "#..##", "#..##", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  Q: [".###.", "#...#", "#...#", "#...#", "#.#.#", "#..#.", ".##.#"],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."],
  W: ["#...#", "#...#", "#...#", "#.#.#", "#.#.#", "##.##", "#...#"],
  X: ["#...#", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "#...#"],
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
  Z: ["#####", "....#", "...#.", "..#..", ".#...", "#....", "#####"],
  "0": [".###.", "#..##", "#.#.#", "##..#", "#...#", "#...#", ".###."],
  "1": ["..#..", ".##..", "..#..", "..#..", "..#..", "..#..", ".###."],
  "2": [".###.", "#...#", "....#", "...#.", "..#..", ".#...", "#####"],
  "3": ["####.", "....#", "....#", ".###.", "....#", "....#", "####."],
  "4": ["...#.", "..##.", ".#.#.", "#..#.", "#####", "...#.", "...#."],
  "5": ["#####", "#....", "####.", "....#", "....#", "#...#", ".###."],
  "6": [".###.", "#....", "#....", "####.", "#...#", "#...#", ".###."],
  "7": ["#####", "....#", "...#.", "..#..", "..#..", "..#..", "..#.."],
  "8": [".###.", "#...#", "#...#", ".###.", "#...#", "#...#", ".###."],
  "9": [".###.", "#...#", "#...#", ".####", "....#", "....#", ".###."],
  " ": [".....", ".....", ".....", ".....", ".....", ".....", "....."],
  ".": [".....", ".....", ".....", ".....", ".....", ".##..", ".##.."],
  ",": [".....", ".....", ".....", ".....", ".##..", ".##..", ".#..."],
  "-": [".....", ".....", ".....", ".###.", ".....", ".....", "....."],
  ":": [".....", ".##..", ".##..", ".....", ".##..", ".##..", "....."],
  "!": ["..#..", "..#..", "..#..", "..#..", "..#..", ".....", "..#.."],
  "/": ["....#", "....#", "...#.", "..#..", ".#...", "#....", "#...."],
  "(": ["...##", "..#..", ".#...", ".#...", ".#...", "..#..", "...##"],
  ")": ["##...", "..#..", "...#.", "...#.", "...#.", "..#..", "##..."],
  "&": [".###.", "#...#", "#...#", ".#.#.", "#.#..", "#.#.#", ".##.#"],
  "%": ["##..#", "##.#.", "...#.", "..#..", ".#...", "#.##.", "#..##"],
  $: ["..#..", ".####", "#.#..", ".###.", "..#.#", "####.", "..#.."],
  "+": [".....", "..#..", "..#..", "#####", "..#..", "..#..", "....."],
  "?": [".###.", "#...#", "....#", "...#.", "..#..", ".....", "..#.."],
  "'": ["..#..", "..#..", ".#...", ".....", ".....", ".....", "....."],
  '"': [".#.#.", ".#.#.", ".#.#.", ".....", ".....", ".....", "....."],
  ";": [".....", ".##..", ".##..", ".....", ".##..", ".##..", ".#..."],
  "=": [".....", ".....", "#####", ".....", "#####", ".....", "....."],
  "*": [".....", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "....."],
  _: [".....", ".....", ".....", ".....", ".....", ".....", "#####"],
};

const BLANK = [".....", ".....", ".....", ".....", ".....", ".....", "....."];

export const GLYPH_W = 5;
export const GLYPH_H = 7;

/** Width in pixels of `text` drawn at integer scale `s` (1px gap between glyphs). */
export function textWidth(text: string, s: number): number {
  const t = text.toUpperCase();
  if (t.length === 0) return 0;
  return t.length * (GLYPH_W + 1) * s - s;
}

/** Draw one line of text at (x, y) — the top-left of the glyph box. */
export function drawText(cv: Canvas, text: string, x: number, y: number, s: number, c: RGB): void {
  const t = text.toUpperCase();
  let cx = x;
  for (const ch of t) {
    const g = FONT[ch] ?? BLANK;
    for (let row = 0; row < GLYPH_H; row++) {
      for (let col = 0; col < GLYPH_W; col++) {
        if (g[row][col] === "#") {
          cv.rect(cx + col * s, y + row * s, s, s, c);
        }
      }
    }
    cx += (GLYPH_W + 1) * s;
  }
}

/** Draw text horizontally centered in [x0, x0+w). */
export function drawTextCentered(cv: Canvas, text: string, x0: number, w: number, y: number, s: number, c: RGB): void {
  const tw = textWidth(text, s);
  drawText(cv, text, x0 + Math.max(0, Math.floor((w - tw) / 2)), y, s, c);
}

/** Word-wrap `text` into lines that fit `maxW` pixels at scale `s`. */
export function wrapText(text: string, s: number, maxW: number): string[] {
  const words = text.toUpperCase().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const trial = cur ? cur + " " + w : w;
    if (textWidth(trial, s) <= maxW || !cur) {
      cur = trial;
    } else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Draw wrapped text starting at (x, y); returns the y just below the last line. */
export function drawTextWrapped(
  cv: Canvas,
  text: string,
  x: number,
  y: number,
  s: number,
  maxW: number,
  c: RGB,
  lineGap = 4,
): number {
  const lines = wrapText(text, s, maxW);
  let yy = y;
  for (const line of lines) {
    drawText(cv, line, x, yy, s, c);
    yy += GLYPH_H * s + lineGap;
  }
  return yy;
}
