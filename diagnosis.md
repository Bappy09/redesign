# Diagnosis — Chambers Financial Ltd

## Key design decisions (and why)

Financial planning is bought on **trust, calm and competence** — not visual noise. So this
redesign adopts an editorial, "private-wealth" aesthetic: generous whitespace, a confident
serif + clean sans pairing, and the brand's azure→navy gradient used sparingly as accent over a
near-white canvas, with slow, restrained motion. The single most important visitor action is
**booking the free consultation**, so every section funnels to one persistent CTA (book / call /
WhatsApp). I deliberately aim above the typical IFA competitor — most look like dated template
sites — by treating Chambers like a boutique advisory brand and surfacing its real credibility
(independent status, FCA regulation, 10+ years' experience) high on the page.

> Note on sources: the requested `/original/` screenshot folder was not present on disk. The only
> genuine brand asset found was `Logo of chambers-financial.avif`. All business facts in this
> redesign were therefore taken **verbatim from the live site** (chambers-financial.co.uk) and the
> logo. Nothing has been invented; missing items (testimonials, email) are marked `[PLACEHOLDER]`.

## What's wrong with the current site

1. **No clear CTA hierarchy.** "Get in Touch" and "Book your free consultation" compete with each
   other, and the phone/WhatsApp number is not persistently visible. Visitors aren't pushed toward
   one obvious next step.
2. **Thin, content-light pages.** Services are single-line descriptions with no depth; "Who We
   Help" and the 4-step process exist but aren't structured visually to build confidence.
3. **Trust signals are buried.** FCA regulation, "Independent" status and the director's decade of
   experience — the things that actually win a finance client — are not used as credibility above
   the fold.
4. **No social proof.** There are no testimonials or client reviews anywhere on the site.
5. **Generic, dated visual treatment.** Template feel, weak type scale, no distinct brand voice;
   the strong logo is underused.
6. **Responsiveness & legibility.** Typical of the template — small body text and layouts that
   don't adapt cleanly to mobile.
7. **High-friction contact.** WhatsApp-only contact, no email, no booking mechanism shown.
8. **No evident accessibility/performance rigor** — contrast, semantic structure and image weight.

## The direction taken

- **Layout:** editorial asymmetric hero; sticky header with persistent "Book consultation" + tel;
  long-scroll homepage with clear anchored sections.
- **Type:** display serif (Fraunces) for headlines = considered, trustworthy; Inter for body. Large
  type scale, generous line-height.
- **Color:** near-white `#FBFCFD` canvas, navy ink `#16233F`, azure accent `#1F8FD6`, plus a
  restrained azure→navy gradient. Adjusted for WCAG AA contrast.
- **Spacing:** 8pt rhythm, wide section padding — premium calm.
- **Imagery:** brand-blue gradient fields + tasteful abstract/financial visuals; no cheesy stock.
- **Motion:** subtle scroll reveals and soft hovers; honours `prefers-reduced-motion`.
- **Components:** service cards, process timeline, client personas, FCA/trust strip, FAQ, sticky
  CTA, and a testimonial slot marked `[PLACEHOLDER]` until real reviews are supplied.

## Real business facts preserved

- Chambers Financial Ltd — "A Holistic Approach to Financial Advice"
- Michael Chambers, Director (10+ years in financial services)
- Independent financial advice firm
- 12 Lea Avenue, Rye, East Sussex, TN31 7BH
- Phone / WhatsApp: 07341616657
- FCA reference 1016681; Appointed Representative of ValidPath Limited (FCA ref 197107)
- Company No. 15522460 (England & Wales)
- Services: Retirement Planning, Tax Optimisation, Investment Management, Estate Planning,
  Pension Review, Cashflow Planning
- Who we help: Entrepreneurs & Professionals; Preparing for Retirement; In Retirement
- Process: Initial Meeting → Planning → Action → Review
- Values: Honesty & Integrity, Transparency, Independence, Expert Advice, Personal Approach,
  Competitive Pricing
