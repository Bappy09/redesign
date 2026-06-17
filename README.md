# Chambers Financial — concept redesign

An **unsolicited draft concept** showing what a modern site could look like for
Chambers Financial Ltd. It is *not* a production site, not owner-approved, and contains
no tracking or data collection. Branding is used privately for this demo only.

The live build is in [`/dist`](dist) — plain HTML, CSS and vanilla JS, no build step.

---

## What I changed (and why)

| # | Change | Why |
|---|--------|-----|
| 1 | **One clear primary action everywhere** — sticky "Book a consultation" in the header, a persistent mobile call/book bar, and a "£0 first consultation" trust card. | The original split attention between "Get in Touch" and "Book your free consultation" and hid the phone number. Finance sites convert on one obvious next step. |
| 2 | **Trust surfaced above the fold** — Independent · FCA regulated · 10+ years, plus a regulation strip (FCA ref, ValidPath, company no.). | Regulation and independence are the deciding factors for an advice client; they were buried before. |
| 3 | **Editorial "private-wealth" design** — Fraunces serif headlines + Inter body, generous whitespace, restrained azure→navy gradient on a near-white canvas. | Lifts the brand above typical template-y IFA competitors; signals calm competence. |
| 4 | **Depth added to thin content** — service cards, a 4-step process timeline, three client personas, an FAQ, and a values list. | The original pages were one-liners; this builds confidence without inventing facts. |
| 5 | **Fully responsive** — tested at 375 / 768 / 1280px (real device emulation, full-page). | Mobile-first; hamburger nav, single-column stacking, sticky CTA. |
| 6 | **Accessibility** — semantic landmarks, skip link, keyboard-operable nav/FAQ, alt text, visible focus rings, `prefers-reduced-motion`, and **WCAG AA contrast verified** (button gradient darkened so white text passes ≥4.5:1). |
| 7 | **Performance** — ~81 KB total, no framework, SVG visuals, deferred JS, `font-display: swap`. Should comfortably score Lighthouse 90+. |

## What was preserved (real business info — nothing invented)

- **Chambers Financial Ltd** — "A holistic approach to financial advice"
- **Michael Chambers, Director** (10+ years in financial services)
- Independent financial advice firm
- **12 Lea Avenue, Rye, East Sussex, TN31 7BH**
- **Phone / WhatsApp: 07341 616657**
- FCA reference **1016681**; Appointed Representative of **ValidPath Limited** (FCA 197107)
- Company No. **15522460** (England & Wales)
- The 6 services, 3 client personas, 4-step process and 6 values from the live site
- The original **logo** (`dist/assets/img/logo.png`, converted from the supplied `.avif`)

## Marked `[PLACEHOLDER]` (do not ship without real content)

- **Testimonials** — none exist on the current site, so three slots are clearly marked rather
  than faked. Replace with genuine, permissioned quotes (or embed Google / VouchedFor reviews).
- **Adviser photo** — a monogram stands in for Michael's portrait.
- **Email address** — the site lists none; the contact link is a placeholder.
- A couple of FAQ answers flag details to confirm (fee minimums, remote meetings).

> Note: the requested `/original/` screenshot folder wasn't present on disk. Facts were taken
> verbatim from the live site (chambers-financial.co.uk) plus the supplied logo. See
> [`diagnosis.md`](diagnosis.md) for the full diagnosis and design rationale.

---

## Preview locally

No build step. Any static server works — for example:

```bash
# from the project root
npx serve dist
# or
python -m http.server -d dist 8080   # if you have a real Python
```

Then open the printed URL. You can also just double-click `dist/index.html`
(it uses relative paths, so it works straight from the file system).

## Deploy (drag-and-drop)

The `dist` folder is self-contained and uses relative paths only.

- **Netlify:** drag the `dist` folder onto <https://app.netlify.com/drop>.
- **Cloudflare Pages:** create a project → upload assets → select `dist`.
- **GitHub Pages:** push `dist` contents to a `gh-pages` branch / `docs` folder.

The only external request is Google Fonts (Fraunces + Inter). Everything else is local.
To make the site 100% offline/self-hosted, download those two font families into
`dist/assets/fonts/` and swap the `<link>` in `index.html` for a local `@font-face` block.

## Project structure

```
chambers-redesign/
├── dist/                     ← deploy this folder
│   ├── index.html
│   └── assets/
│       ├── css/style.css
│       ├── js/main.js
│       └── img/  (logo.png, logo.avif, favicon.svg, og.svg)
├── diagnosis.md              ← diagnosis + design decisions
├── README.md                 ← this file
├── original/                 ← supplied logo (avif) + converted png
└── review/                   ← self-review screenshots + capture scripts
```

---

*Concept by an independent designer. Not affiliated with or approved by Chambers Financial Ltd.*
