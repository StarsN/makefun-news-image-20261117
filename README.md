# news-image-20261117 — One Image, One Day

[![make.fun · news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/StarsN/makefun-news-image-20261117/rank.svg)](https://make.fun/bounty/news-image-20261117/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/StarsN/makefun-news-image-20261117/reward.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)

A newspaper front page for **Tuesday 17 November 2026**, drawn from scratch
by a small Node program — no libraries, no network, no fonts, no images.
Every pixel is computed at run time from a hand-written 5×7 bitmap font and
plain geometry, so the output is fully deterministic.

## The image

- **Top story:** the Kerch Bridge in Crimea is hit and a road span collapses;
  Russian missiles strike the two bridges over the Dnipro in Kyiv.
- **Also in the picture:** a tanker fire near the Strait of Hormuz (a third US
  carrier reaches the Middle East; an Iranian drone hits a US radar site in
  Bahrain), Trump in Manila then Shenzhen with Xi–Trump–Putin talks set for
  Thursday, Estonia closing its Russia border from 1 December, the failed ULA
  Vulcan launch (40 Amazon Leo satellites lost), JPMorgan's Monday outage
  (a software bug, not a cyberattack), Nvidia's first results since Huang
  stepped down — and five EU nations planning a returns centre in Rwanda.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

Writes `out/entry.png` — 1024×1024, deterministic (run it twice, the bytes
are identical). Requires Node 22+ (TypeScript runs directly, standard
library only).

## Layout

- `main.ts` — entry point, writes `entry.png`
- `src/png.ts` — hand-written PNG encoder (zlib via Node built-ins)
- `src/raster.ts` — canvas, shapes, and the hand-defined 5×7 bitmap font
- `src/scene.ts` — the front-page composition: masthead, bridge art, story grid

## License

MIT — see [LICENSE](LICENSE).
