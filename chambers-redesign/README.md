# Chambers Financial — concept redesign

An **unsolicited draft concept** showing what a modern site could look like for
Chambers Financial Ltd. It is *not* a production site, not owner-approved, and contains
no tracking or data collection. Branding is used privately for this demo only.

The live build is in [`/dist`](dist) — plain HTML, CSS and vanilla JS, no build step.

---

## Design direction (v2)

A modern **fintech landing-page** aesthetic — bold display type, floating "live data" glass
cards, animated gradient mesh, a scroll-driven user journey, and a strong visual hierarchy that
guides the eye down the page. Kept Chambers' real brand blue (refined azure → navy, no green) and
all real business facts.

| # | Change | Why |
|---|--------|-----|
| 1 | **A clear user journey, top to bottom** — Hook (hero) → proof (stats) → who we help → what we do → *How it works* (animated 4-step timeline) → about → testimonials → FAQ → one big CTA. | The page now tells a story and funnels every section toward one action: **book the free consultation**. |
| 2 | **Bold, confident type** — Space Grotesk display + Inter body, large clamp scale, gradient-accented keywords. | The first draft read "calm corporate"; this matches award-winning fintech energy while staying trustworthy. |
| 3 | **Floating glass "plan" cards** in the hero (retirement projection, £0 first meeting, independent ring) — clearly tagged *Illustrative*. | The reference sites lead with tangible product UI; this gives Chambers the same instant "I get it" hook without faking client data. |
| 4 | **Trust surfaced everywhere** — hero checklist, a moving marquee of differentiators, an animated stats band (10+ yrs, 100% independent, 6 services, £0), and full FCA/ValidPath detail. | Regulation + independence win finance clients; they were buried on the original. |
| 5 | **Fully responsive** — verified at 375 / 768 / 1280px via real device emulation, full-page, **zero horizontal overflow**. | Mobile-first; hamburger nav, single-column stacking, persistent call/book bar. |
| 6 | **Accessibility** — semantic landmarks, skip link, keyboard-operable nav/FAQ, alt text, visible focus rings, full `prefers-reduced-motion` fallback, and **every text/background pair verified WCAG AA** (the bright-cyan CTA uses navy text at 8.1:1). |
| 7 | **Performance** — ~90 KB total, no framework/library, SVG visuals, deferred JS, GPU-friendly transforms, `font-display: swap`. Targets Lighthouse 90+. |

## Animation & motion (high-end, all vanilla JS)

- **Gradient mesh** with slow-drifting blobs behind the hero, journey and CTA sections
- **Floating glass cards** with idle bob + **group parallax** that follows the pointer and scroll
- **3D tilt** on persona/service cards (pointer-reactive, desktop only)
- **Magnetic** primary buttons
- **Count-up** stats that animate when scrolled into view
- **Scroll-driven journey timeline** — a progress rail fills and each step lights up as you scroll
- **Staggered reveal-on-scroll** for every section (IntersectionObserver)
- **Infinite marquee** of differentiators; **scroll-progress bar** at the very top
- Animated SVG (chart line draw, progress ring)
- Everything collapses to a static, fully legible layout under `prefers-reduced-motion`

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

## Imagery

All artwork is **original, hand-coded SVG** (no stock photos, no external image services, nothing
fabricated about a real person):

- `assets/img/advisor.svg` — a flat **illustration** of an adviser, used as the hero figure (with
  floating glass cards around it, like the reference sites) and in the About section. It is clearly
  captioned *“Illustration · replace with Michael’s photo”* so it never misrepresents a real photo.
- `assets/img/avatar.svg` — gradient avatar used on the testimonial cards.
- `assets/img/favicon.svg`, `og.svg` — brand mark + social card.
- `assets/img/logo.png` — the real Chambers logo (converted from the supplied `.avif`).

> Why illustration and not a photo: I can't fabricate a realistic photo of a real, named individual,
> and there's no image-generation service in this build. Swap `advisor.svg` for Michael's real
> headshot when available — the markup already sizes it.

## Marked `[PLACEHOLDER]` (do not ship without real content)

- **Adviser photo** — the SVG illustration stands in; replace with Michael's real headshot.
- **Testimonials** — none exist on the current site, so three slots are clearly marked rather
  than faked. Replace with genuine, permissioned quotes (or embed Google / VouchedFor reviews).
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

The only external request is Google Fonts (Space Grotesk + Inter). Everything else is local.
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
