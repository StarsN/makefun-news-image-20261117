// Front-page layout for "one image, one day": Tuesday 17 November 2026.
// All facts are the verified list from the brief — nothing else is invented.
// Everything is drawn with plain geometry + the 5x7 bitmap font.

import { Canvas, drawText, drawTextCentered, drawTextWrapped, textWidth, type RGB } from "./raster.ts";

const W = 1024;
const H = 1024;

const PAPER: RGB = [246, 241, 230];
const INK: RGB = [22, 26, 34];
const NAVY: RGB = [24, 40, 72];
const NAVY2: RGB = [32, 54, 96];
const GOLD: RGB = [216, 176, 84];
const CREAM: RGB = [246, 241, 230];
const RED: RGB = [178, 34, 34];
const SKY1: RGB = [158, 198, 226];
const SKY2: RGB = [214, 230, 240];
const SEA: RGB = [28, 88, 128];
const SEA2: RGB = [20, 66, 100];
const DECK: RGB = [96, 102, 112];
const STEEL: RGB = [70, 76, 86];
const FIRE: RGB = [232, 108, 28];
const FLAME: RGB = [245, 190, 60];
const SMOKE: RGB = [120, 122, 118];
const PANEL: RGB = [255, 253, 247];
const RULE: RGB = [180, 172, 152];

function skyBand(cv: Canvas, x0: number, y0: number, x1: number, y1: number): void {
  // Simple vertical gradient in 8 steps.
  const steps = 8;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const c: RGB = [
      Math.round(SKY1[0] + (SKY2[0] - SKY1[0]) * t),
      Math.round(SKY1[1] + (SKY2[1] - SKY1[1]) * t),
      Math.round(SKY1[2] + (SKY2[2] - SKY1[2]) * t),
    ];
    const yA = y0 + Math.floor(((y1 - y0) * i) / steps);
    const yB = y0 + Math.floor(((y1 - y0) * (i + 1)) / steps);
    cv.rect(x0, yA, x1 - x0, Math.max(1, yB - yA), c);
  }
}

function drawBridge(cv: Canvas, x0: number, y0: number, x1: number, y1: number): void {
  // Sky, sea, a long bridge with its middle span collapsed, fire + smoke.
  skyBand(cv, x0, y0, x1, y1);
  const seaY = y0 + Math.floor((y1 - y0) * 0.72);
  cv.rect(x0, seaY, x1 - x0, y1 - seaY, SEA);
  cv.rect(x0, seaY, x1 - x0, 3, SEA2);
  // Wave dashes.
  for (let x = x0 + 14; x < x1 - 20; x += 46) {
    cv.rect(x, seaY + 22, 26, 3, [150, 200, 225]);
    cv.rect(x + 10, seaY + 44, 26, 3, [120, 175, 205]);
  }
  const deckY = y0 + Math.floor((y1 - y0) * 0.52);
  const gapL = x0 + Math.floor((x1 - x0) * 0.44);
  const gapR = x0 + Math.floor((x1 - x0) * 0.58);
  // Towers.
  const t1 = x0 + Math.floor((x1 - x0) * 0.24);
  const t2 = x0 + Math.floor((x1 - x0) * 0.76);
  for (const tx of [t1, t2]) {
    cv.rect(tx - 5, deckY - 86, 10, 86, STEEL);
    cv.rect(tx - 12, deckY - 94, 24, 8, STEEL);
  }
  // Cables from tower tops to the deck.
  cv.line(t1, deckY - 88, gapL, deckY, STEEL, 2);
  cv.line(t2, deckY - 88, gapR, deckY, STEEL, 2);
  cv.line(t1, deckY - 88, x0 + 8, deckY, STEEL, 2);
  cv.line(t2, deckY - 88, x1 - 8, deckY, STEEL, 2);
  // Intact deck left and right of the gap.
  cv.rect(x0, deckY, gapL - x0, 12, DECK);
  cv.rect(gapR, deckY, x1 - gapR, 12, DECK);
  cv.rect(x0, deckY + 12, gapL - x0, 4, STEEL);
  cv.rect(gapR, deckY + 12, x1 - gapR, 4, STEEL);
  // Collapsed span: two deck slabs tilted down into the water.
  const midX = Math.floor((gapL + gapR) / 2);
  cv.line(gapL, deckY + 6, midX - 12, seaY + 26, DECK, 9);
  cv.line(gapR, deckY + 6, midX + 12, seaY + 30, DECK, 9);
  // Debris blocks in the water.
  cv.rect(midX - 34, seaY + 18, 22, 8, STEEL);
  cv.rect(midX + 8, seaY + 26, 26, 8, DECK);
  // Fire at the break + flames licking up.
  cv.circle(gapL + 10, deckY - 4, 16, FIRE);
  cv.circle(gapR - 10, deckY - 2, 13, FIRE);
  cv.circle(midX, seaY + 8, 18, FIRE);
  cv.triangle(gapL - 6, deckY - 6, gapL + 8, deckY - 52, gapL + 22, deckY - 6, FLAME);
  cv.triangle(gapR - 20, deckY - 4, gapR - 6, deckY - 44, gapR + 8, deckY - 4, FLAME);
  cv.triangle(midX - 14, seaY + 4, midX, seaY - 34, midX + 14, seaY + 4, FLAME);
  // Smoke columns rising from the fire at the gap.
  cv.circle(midX - 16, deckY - 58, 13, SMOKE);
  cv.circle(midX + 2, deckY - 84, 17, SMOKE);
  cv.circle(midX + 20, deckY - 56, 11, SMOKE);
  cv.circle(midX + 8, deckY - 106, 15, SMOKE);
}

// --- small-story icons (simple geometry, drawn in a ~64x44 box) ---

function iconTanker(cv: Canvas, x: number, y: number): void {
  cv.rect(x + 2, y + 22, 60, 12, [150, 40, 30]);
  cv.rect(x + 8, y + 12, 30, 10, [150, 40, 30]);
  cv.rect(x + 44, y + 6, 6, 16, [90, 90, 90]);
  cv.circle(x + 47, y + 2, 5, SMOKE);
  cv.rect(x, y + 36, 64, 4, SEA);
}

function iconCarrier(cv: Canvas, x: number, y: number): void {
  cv.rect(x + 2, y + 26, 60, 8, [70, 76, 86]);
  cv.rect(x + 40, y + 14, 12, 12, [90, 96, 106]);
  cv.line(x + 8, y + 26, x + 22, y + 8, [90, 96, 106], 2);
  cv.rect(x, y + 38, 64, 3, SEA);
}

function iconFlags(cv: Canvas, x: number, y: number): void {
  const cols: RGB[] = [
    [178, 34, 34],
    [24, 40, 72],
    [30, 110, 60],
  ];
  for (let i = 0; i < 3; i++) {
    const fx = x + i * 22;
    cv.line(fx + 2, y + 2, fx + 2, y + 38, STEEL, 2);
    cv.rect(fx + 4, y + 4, 16, 11, cols[i]);
    cv.rect(fx + 4, y + 15, 16, 3, CREAM);
  }
}

function iconGate(cv: Canvas, x: number, y: number): void {
  cv.rect(x + 4, y + 4, 4, 34, STEEL);
  cv.rect(x + 56, y + 4, 4, 34, STEEL);
  for (let i = 0; i < 5; i++) {
    cv.rect(x + 12 + i * 9, y + 8, 3, 30, [150, 40, 30]);
  }
  cv.rect(x + 4, y + 6, 56, 4, STEEL);
  cv.rect(x + 4, y + 22, 56, 3, STEEL);
}

function iconRocket(cv: Canvas, x: number, y: number): void {
  cv.triangle(x + 32, y + 2, x + 22, y + 18, x + 42, y + 18, RED);
  cv.rect(x + 22, y + 18, 20, 16, [220, 222, 226]);
  cv.rect(x + 16, y + 22, 6, 10, STEEL);
  cv.rect(x + 42, y + 22, 6, 10, STEEL);
  cv.triangle(x + 26, y + 34, x + 32, y + 44, x + 38, y + 34, FLAME);
  cv.circle(x + 12, y + 8, 3, GOLD);
  cv.circle(x + 52, y + 14, 3, GOLD);
}

function iconBank(cv: Canvas, x: number, y: number): void {
  cv.triangle(x + 4, y + 14, x + 32, y + 2, x + 60, y + 14, NAVY);
  cv.rect(x + 8, y + 16, 48, 4, NAVY);
  for (let i = 0; i < 4; i++) {
    cv.rect(x + 10 + i * 12, y + 22, 6, 16, NAVY);
  }
  cv.rect(x + 6, y + 40, 52, 4, NAVY);
}

function iconChip(cv: Canvas, x: number, y: number): void {
  cv.rect(x + 14, y + 10, 36, 28, [30, 110, 60]);
  cv.rect(x + 22, y + 18, 20, 12, [200, 220, 205]);
  for (let i = 0; i < 4; i++) {
    cv.rect(x + 18 + i * 9, y + 4, 4, 6, STEEL);
    cv.rect(x + 18 + i * 9, y + 38, 4, 6, STEEL);
    cv.rect(x + 8, y + 14 + i * 8, 6, 4, STEEL);
    cv.rect(x + 50, y + 14 + i * 8, 6, 4, STEEL);
  }
}

type Small = { title: string; sub: string; icon: (cv: Canvas, x: number, y: number) => void };

const SMALLS: Small[] = [
  {
    title: "TANKER FIRE IN HORMUZ STRAIT",
    sub: "MINE HITS TANKER; IRAN DRONE HITS US RADAR; 3RD US CARRIER IN",
    icon: iconTanker,
  },
  {
    title: "TRUMP IN MANILA, THEN SHENZHEN",
    sub: "ASEAN SUMMIT, THEN APEC; XI-TRUMP-PUTIN TALKS SET FOR THURSDAY",
    icon: iconFlags,
  },
  {
    title: "ESTONIA SHUTS RUSSIA BORDER",
    sub: "ALL CROSSINGS CLOSE DEC 1 AFTER ARSON PLOT FOILED",
    icon: iconGate,
  },
  {
    title: "VULCAN ROCKET FAILS",
    sub: "40 AMAZON LEO INTERNET SATELLITES LOST",
    icon: iconRocket,
  },
  {
    title: "JPMORGAN: OUTAGE WAS A BUG",
    sub: "MONDAY BANK BLACKOUT NOT A CYBERATTACK",
    icon: iconBank,
  },
  {
    title: "NVIDIA REPORTS AFTER BELL",
    sub: "FIRST RESULTS SINCE HUANG STEPPED DOWN",
    icon: iconChip,
  },
];

export function drawScene(): Canvas {
  const cv = new Canvas(W, H, PAPER);

  // ---- masthead ----
  cv.rect(0, 0, W, 152, NAVY);
  cv.rect(0, 152, W, 4, GOLD);
  drawTextCentered(cv, "THE WORLD IN ONE IMAGE", 0, W, 18, 4, CREAM);
  cv.rect(232, 66, 560, 3, GOLD);
  drawTextCentered(cv, "TUESDAY 17 NOVEMBER 2026", 0, W, 84, 5, GOLD);
  drawTextCentered(cv, "ONE DAY, ONE IMAGE - WORLD NEWS", 0, W, 126, 2, [190, 198, 214]);

  // ---- main story ----
  const mx = 16;
  const mw = W - 32;
  const my = 168;
  const mh = 384;
  cv.frame(mx, my, mw, mh, PANEL, INK);
  drawText(cv, "UKRAINE WAR - TOP STORY", mx + 16, my + 14, 2, RED);
  drawText(cv, "KERCH BRIDGE HIT", mx + 16, my + 40, 6, INK);
  drawTextWrapped(
    cv,
    "ROAD SPAN COLLAPSES; RUSSIA HITS TWO KYIV BRIDGES",
    mx + 16,
    my + 96,
    2,
    mw - 32,
    [60, 64, 74],
  );
  drawBridge(cv, mx + 12, my + 132, mx + mw - 12, my + mh - 12);

  // ---- small stories: 3 x 2 grid ----
  const gx = 16;
  const gy = 568;
  const gw = 320;
  const gh = 168;
  const gap = 8;
  for (let i = 0; i < SMALLS.length; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = gx + col * (gw + gap);
    const y = gy + row * (gh + gap);
    const s = SMALLS[i];
    cv.frame(x, y, gw, gh, PANEL, INK);
    s.icon(cv, x + Math.floor((gw - 64) / 2), y + 8);
    drawTextWrapped(cv, s.title, x + 12, y + 58, 3, gw - 24, INK, 3);
    drawTextWrapped(cv, s.sub, x + 12, y + 112, 2, gw - 24, [70, 74, 84], 3);
  }

  // ---- footer strip ----
  cv.rect(0, 928, W, 96, NAVY);
  cv.rect(0, 928, W, 3, GOLD);
  drawTextCentered(cv, "ALSO: FIVE EU NATIONS PLAN RWANDA RETURNS CENTRE", 0, W, 948, 3, CREAM);
  drawTextCentered(cv, "GERMANY - DENMARK - AUSTRIA - GREECE - NETHERLANDS", 0, W, 984, 2, [190, 198, 214]);

  void textWidth; // (kept for clarity; textWidth is used via draw helpers)
  return cv;
}
