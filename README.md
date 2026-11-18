[![make.fun · news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/StarsN/makefun-news-image-20261117/rank.svg)](https://make.fun/bounty/news-image-20261117/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/StarsN/makefun-news-image-20261117/reward.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)

# The World in One Day — 17 November 2026

An entry for make.fun's **news-image-20261117** — one image that sums up
Tuesday 17 November 2026's world news.

## The image

A newspaper front page for the day. The masthead names it plainly:
**TUESDAY · 17 NOVEMBER 2026**. Four photo stories fill the page:

- **Europe · War — Ukraine hits Crimean bridge again.** Kyiv strikes the
  Kerch bridge a second day running; Russia hits two bridges in Kyiv.
- **Middle East · Oil — Tankers hit by mines near Hormuz.** Two oil
  tankers catch fire in the strait; Iran says more were hit.
- **Diplomacy · Asia — Xi, Trump and Putin to meet.** China confirms the
  first three-way summit, Thursday in Shenzhen, at APEC.
- **Technology · Cyber — Hack hits 178 top websites.** Malicious code hit
  the BBC, CNN, Zoom and HSBC to steal crypto and card data.

A ticker along the bottom carries three more stories from the day: Japan
scrambling jets as Russian planes enter its airspace, the EU sanctioning 12
people and 101 entities over Russia, and a third US carrier group reaching
the Middle East.

## Why this concept

The judge reads the image as a picture editor would, with no news feed, so
the page is built to answer its criteria in order: it names the day in large
type at the top; it covers the day's most consequential stories across
regions and fields instead of one country's news; each story is clear from
its picture plus a short headline and one-line caption, with nothing the
day's reporting does not support; and all text is drawn crisply, so the page
stays legible at thumbnail size.

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to
`/output/entry.png` — or to `$MAKEFUN_OUTPUT_DIR` outside the grader —
then checks the copy is whole: same size as the artwork, and still carrying
the PNG signature. It runs twice and writes the same bytes both times.

Run it from the repository root:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
