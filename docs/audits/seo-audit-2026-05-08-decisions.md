---
title: SEO Audit Decisions Register — northlanterngroup.com (2026-05-08 audit)
owner: Hamza Chundrigar
audit_reference:
  file: docs/audits/seo-audit-2026-05-08.md
  commit: 8aa08f7
branch: feature/WEB-33-landing-page-clarity
date_created: 2026-05-09
status: active
document_type: Architectural Decision Record (ADR) — append-only
intended_executor: Codex (code generation agent) operating with autonomy
no_live_execution_yet: true
---

# How to read this document

This file is the decisions register paired with the SEO audit at `docs/audits/seo-audit-2026-05-08.md` (commit `8aa08f7`). The audit is the immutable point-in-time finding set. This document records what the founder decided for each finding.

A future implementation agent (Codex per founder direction) is expected to operate **autonomously on the how**. Codex chooses the implementation approach, file structure, tooling, and validation steps. What Codex does not have latitude on is **the what**: the decisions are locked, the design and behavior of the live site is locked, and the locked context constraints are non-negotiable.

This document gives Codex three things per finding:
1. **The decision** — what NLG has chosen to do (Accepted, Modified, Rejected, Deferred, Resolved).
2. **The rationale** — why the decision was taken, so Codex can apply judgment when an edge case appears.
3. **The boundary** — what must be preserved while implementing the change.

Codex should treat this document as a contract, not a script. If Codex finds a better implementation path that respects the decisions, the design alignment, and the locked context, take it. If Codex finds an ambiguity that cannot be resolved within those constraints, escalate to Hamza rather than improvise outside the spec.

---

# Non-negotiable design and behavior alignment

The live production site at `https://www.northlanterngroup.com/` represents the visual design, brand voice, interaction patterns, accessibility posture, and build hygiene NLG has chosen to ship. Every change below MUST preserve those. Implementation latitude is broad on *how* a change ships. It is zero on *whether* the result matches the existing site's character.

Specifically preserve, in spirit and in detail:

- **Visual design language**: the dark navy palette anchored at `#05101F` (`--bg-0`), the cyan brand accent (`#00AEEF` / `--brand`), the Montserrat / Inter / JetBrains font stack served via `next/font/google`, the eyebrow-numbered section pattern (`01 / Belief`, `02 / Practices`, etc.), the section spacing rhythm, the rounded buttons, the bracket-and-corner motif used in Testimonials.
- **Brand voice**: the direct builder voice. The "Won't do" refusal pattern. The use of `engagements`, `handover`, `senior operators`, `runbook`, `named owner` as native NLG vocabulary inside the site copy (the audit's no-insider-jargon rule applied only to the SERP-facing meta description; the on-page copy keeps the existing voice intact). The no-em-dash convention in NLG-branded copy.
- **Interaction patterns**: the `ScrollReveal` reveal animation, the Belief section's scroll-driven beats with the Beacon visual sync, the Testimonials carousel's auto-cycle (7-second interval), keyboard navigation, IntersectionObserver pause when offscreen, the decoded-text effect on outcome metrics, the BuyerQualifier typewriter, the OperationsConsole dashboard (Cobe-free), the Header's scrolled-state styling, the mobile menu open/close pattern, the contact form's reCAPTCHA flow.
- **Accessibility posture**: `aria-label`, `aria-hidden`, `prefers-reduced-motion` respect, `nlg-sr-only` screen-reader spans, semantic heading hierarchy, focus-visible behavior, no breaking the keyboard-navigable Testimonials roster.
- **Build hygiene**: `next build` must continue to exit zero. No new TypeScript errors. No new ESLint errors. No new console warnings in dev or build beyond what already exists in the captured baseline build log.
- **Bundle posture**: changes that increase `/` First Load JS without a stated justification should be rejected by Codex's own judgment. The audit's `PERF-01` and `PERF-02` are explicit decreases; the rest should be size-neutral.
- **URL stability**: no new top-level routes except where this document explicitly authorizes one. No anchor renames except the two specified in the Header navigation plan. No changes to `/`, `/privacy`, `/terms`, `/api/contact`, `/opengraph-image`, `/twitter-image`, `/robots.txt`, `/sitemap.xml`. Existing redirects continue to behave.

Things Codex should NOT do, even if it would technically improve the site:

- Introduce a new font family.
- Introduce a new animation library. Note: `framer-motion` is being uninstalled per `PERF-02` precisely because nothing on the site uses it; do not re-add it or substitute another animation lib.
- Introduce new design tokens, new section archetypes, or new component primitives that do not match the existing pattern.
- Restructure the file layout under `src/components/` beyond what is necessary to land the documented decisions.
- Reword on-page copy beyond what this document explicitly authorizes. The meta description and title use SERP-tuned language; the on-page body copy stays in the existing brand voice.
- Add Review or AggregateRating schema. Add `priceRange` to schema. Surface a founder bio, founder photo, or founder name in either the visible site or the schema.

---

# Locked operating context

The following constraints govern every decision in this document. Quoted verbatim from the audit's source-of-truth tier 1:

> North Lantern Group is a boutique consulting firm based in Ontario, Canada.
>
> Service architecture is three lanes:
> 1. Atlassian Systems (Jira, Confluence, JSM cleanup, governance, Cloud transition)
> 2. BI and Operational Reporting
> 3. Adoption and Automation
>
> Hard claim bans:
> - The phrase "Atlassian Solution Partner" must not appear anywhere on the site until the Atlassian Partner Directory listing is independently verified.
> - No fabricated client logos, testimonials, headcount, years-in-market, project counts, or rating numbers.
> - No pricing floor, rate card, or engagement minimum should be published.
>
> Proof discipline rule: if NLG cannot prove a claim in a sales call tomorrow, it does not belong on the site today.

Pattern 3 anonymization applies to all testimonials: role + sector descriptor, no names, no initials, plus a methodology note at the section top.

`CONTEXT-CORRECTION-01` (recorded during intake): the audit's "sole-staffed by Hamza Chundrigar" framing was an incorrect input. NLG mobilizes contractor and bench resources as engagements require. This recasts `BRAND-01` rationale (anonymization is for client confidentiality, not fabrication remediation) and resolves `BRAND-04` (plural-team framing is accurate).

---

# How decisions are stated below

Each finding entry contains:

- **Audit reference**: the finding ID and the audit line range where the original finding lives.
- **Decision**: Accepted, Modified, Rejected, Deferred, or Resolved.
- **What to accomplish**: the outcome the change must achieve. This is the deliverable.
- **Why**: the rationale. Where the audit's recommendation was modified or rejected, the reason is captured.
- **Constraints**: what to preserve while implementing.
- **Out of scope**: what Codex should NOT do under this finding.

Codex picks the file paths, the tooling, the validation method, and the implementation approach. Where a specific string (title text, meta text, status-bar copy, sector descriptor) is the deliverable, the string is given verbatim because the string itself is the decision.

---

# Decisions Register

## Top 5 Actions

### `ACTION-01` — Anonymize the testimonials, ship the SSR-emit fix, leave BuyerQualifier verbatim

**Audit reference**: `seo-audit-2026-05-08.md` lines 39–63
**Decision**: Modified
**What to accomplish**:
1. Anonymize the eleven testimonial entries per the per-row plan in the Testimonials Anonymization Plan section below.
2. Replace the section's status-bar text from `"11 CLIENT TESTIMONIALS // 4 SERVICE AREAS // POST-HANDOVER RESULTS"` to `"Engagements across Atlassian, BI, and automation."`
3. Add a methodology note at the section top: `"Names and identifying details are anonymized at clients' request. Engagement details available under NDA on request."` Codex chooses the styling and exact placement so it matches the existing eyebrow / caption pattern.
4. Make all eleven `fullQuote` strings present in server-rendered HTML so search engines can index them, not just the active attestation. The visible interactive carousel keeps its current UX; only the underlying SSR pool changes.
5. Do not edit `BuyerQualifier.tsx`. The Deloitte line stays verbatim per `BRAND-02`.

**Why**: Testimonials are real engagements per the founder; anonymization satisfies client confidentiality. The status bar's numeric claim was a fabricated proof signal even with real underlying engagements; reframing keeps the breadth signal honest. The methodology note signals professionalism and transparency about anonymization. The SSR fix corrects a render-pipeline gap where only the active carousel quote was crawlable.

**Constraints**:
- Preserve the Testimonials section's existing visual design: bracket corners, decoded-metric animation, typed metadata strip, dot navigation, roster with practice-area badges, keyboard navigation, IntersectionObserver auto-cycle pause, prefers-reduced-motion respect.
- The `PracticeArea` type retains all four current labels including `GOVERNED DELIVERY` as a documented exception.
- The `name` and `initials` fields can be removed from the `Attestation` type; a sector-descriptor field replaces them. Codex picks the field name and decides whether to repurpose the existing `name` field or add a new one.
- Keep all `pullQuote`, `fullQuote`, `outcomeMetric`, `engagementType`, `durationWeeks`, `monthsPostHandover` content verbatim.

**Out of scope**:
- Removing the Testimonials section.
- Editing `BuyerQualifier.tsx`.
- Changing the carousel's auto-cycle timing, the decode animation, or the keyboard navigation behavior.

### `ACTION-02` — Title tag rewrite

**Audit reference**: lines 66–84
**Decision**: Modified
**What to accomplish**: Set the homepage title to:

> Senior-led Atlassian, Analytics & Automation Consulting | NLG

60 characters. The Open Graph title and Twitter title inherit from the same Metadata API field and should follow the new value automatically.

**Why**: Drops the original audit's Ontario lock per founder direction (NLG serves multiple regions). Uses `Analytics` instead of `BI` per cross-agent research convergence — competing firms have moved away from "BI" in titles. `Senior-led` is the locked differentiator. 60 characters lands inside the Backlinko-measured display sweet spot.

**Constraints**: Title lives wherever the existing site's metadata for `/` is defined. Codex updates that surface and confirms `og:title` and `twitter:title` reflect the new value.

**Out of scope**: Rewording. The string is the deliverable.

### `ACTION-03` — Meta description rewrite

**Audit reference**: lines 88–106
**Decision**: Modified
**What to accomplish**: Set the homepage meta description to:

> Atlassian, analytics, and automation consulting for IT and operations teams. Modernize workflows, unify reporting, and integrate disconnected systems.

149 characters. Open Graph and Twitter descriptions inherit.

**Why**: SERP-tuned for IT/operations buyer vocabulary. Front-loads the title's keyword triplet. Three concrete outcome verbs (modernize, unify, integrate) mirror the title's three-noun service list. No insider jargon, no geo lock-in, no CTA — three of the five elite competitor descriptions surveyed close without one.

**Constraints**: This is the SERP-facing copy, not on-page copy. The on-page body copy stays in the existing brand voice.

**Out of scope**: Rewording. The string is the deliverable.

### `ACTION-04` — H1 rewrite

**Audit reference**: lines 110–130
**Decision**: Modified
**What to accomplish**: Set the homepage H1 to:

> Fix the Atlassian, analytics and automation systems your team has outgrown.

Preserve the existing `<span className="accent">outgrown.</span>` styling on the last word, with the period inside the span as it is today.

**Why**: Mirrors the locked title's keyword triplet (Atlassian, analytics, automation) for SERP-to-landing coherence; H1-to-title alignment reduces Google's rewrite rate per Zyppy 2022. Keeps the `outgrown` framing that names buyer pain. Uses a different lead verb (`Fix`) than the meta's three verbs so H1 and meta reinforce keywords without verb duplication.

**Constraints**: Preserve the accent span, the H1's class, and its position in the Hero section. Do not touch the Hero subhead, the CTAs, or the OperationsConsole dashboard.

**Out of scope**: Reformatting the Hero layout.

### `ACTION-05` — Schema enrichment (founder field deferred)

**Audit reference**: lines 134–200
**Decision**: Modified
**What to accomplish**: Extend the existing `ProfessionalService` JSON-LD block with three additional properties:

- `foundingDate`: `"2025"`
- `slogan`: `"Results that endure."`
- `hasOfferCatalog`: an `OfferCatalog` containing three `Service` items named exactly:
  - "Atlassian Platform" with a description matching the existing on-site Practices copy for the Atlassian lane.
  - "BI and Analytics" with a description matching the existing Practices copy for the BI lane.
  - "Automation and Integration" with a description matching the existing Practices copy for the Automation lane.

Also update the existing `areaServed` from `["Canada", "Global markets"]` to `["North America", "Latin America", "Europe", "Middle East"]` as part of the same edit (geo signaling, see `CONTENT-04`).

**Why**: Knowledge Panel formation and service-level rich results without identifying the founder. The four named regions match NLG's actual market reach and replace the vague "Global markets" claim.

**Constraints**: Do NOT add a `founder` field. Do NOT add `Review`, `AggregateRating`, `priceRange`, or anything that names an individual.

**Out of scope**: Restructuring the existing schema fields. New schema types beyond `OfferCatalog` and `Service`.

---

## CONTENT findings

### `CONTENT-01` — Title tag — implemented via `ACTION-02`
**Decision**: Accepted.

### `CONTENT-02` — Meta description — implemented via `ACTION-03`
**Decision**: Accepted.

### `CONTENT-03` — H1 — implemented via `ACTION-04`
**Decision**: Accepted.

### `CONTENT-04` — Geographic relevance density

**Audit reference**: lines 224–228
**Decision**: Modified
**What to accomplish**:
1. Schema `areaServed` updates to four named regions (implemented inside `ACTION-05`).
2. Add a single visible reach line to the Footer's brand area, immediately below the existing tagline: `"Engagements across North America, Latin America, Europe, and the Middle East."` Codex matches the styling to the existing tagline so the two lines read as a pair.

**Why**: Founder rejected the audit's Ontario seeding. Schema and a single Footer line carry the reach signal; body copy stays geo-free.

**Constraints**: No `Ontario`, `Canada`, or other geographic mentions in HeroV2, Belief, Practices, Contact, or any other body section. Existing Footer copyright line stays; the new reach line is additive.

**Out of scope**: Adding geo signals to any body copy.

### `CONTENT-05` — Contact section H2 wraps a paragraph

**Audit reference**: lines 230–234
**Decision**: Accepted
**What to accomplish**: The Contact section's H2 currently wraps a second sentence inside a child span. Split the second sentence out so the H2 is a single sentence and the second sentence renders as a sibling paragraph element directly below the H2.

**Why**: Search engines extract the entire H2 string; the current 86-word H2 dilutes the heading signal.

**Constraints**: Preserve the visual presentation. Codex matches the styling so visitors see the same layout they see today. Preserve the `nlg-reveal` reveal-animation class behavior on both elements.

**Out of scope**: Rewording either sentence.

### `CONTENT-06` — Writing section ships placeholder essays

**Audit reference**: lines 236–240
**Decision**: Accepted
**What to accomplish**: Remove the Writing section from the homepage's rendered output. The section's source file can stay in the repo for later use.

**Why**: Three placeholder essay cards labeled "Coming 2026 / in progress" are a thin-content signal; the dates are already stale. Re-entry trigger: the first real essay shipping at a real URL.

**Constraints**: Do not delete the section's source file. Do not touch the existing essay teaser content; it stays in the source for future re-introduction.

**Out of scope**: Writing essay content. Adding a new Insights or Notes page route.

### `CONTENT-07` — Phone-input flag SVG title

**Audit reference**: lines 242–246
**Decision**: Accepted
**What to accomplish**: The Contact form's phone-input library renders inline SVG flags with `<title>` elements. The Canadian flag's `<title>Canada</title>` appears in the initial SSR HTML. Make the flag rendering not appear in initial SSR HTML.

**Why**: Crawl tools flag the SVG-scoped title as a duplicate document title; removing it cleans up audit-tool noise.

**Constraints**: Phone input must continue to function. Country selection must still work. Codex picks the approach: dropping the flag prop, lazy-mounting the phone input on focus, switching to a static flag set, or a different equivalent fix.

**Out of scope**: Replacing the phone-input library.

---

## INDEX findings (Technical Indexability)

### `INDEX-01` — Canonical drift

**Audit reference**: lines 250–254
**Decision**: Accepted
**What to accomplish**: Align canonical, sitemap loc, JSON-LD `url`, and any other URL-of-self surfaces on a single form. The Next.js Metadata API normalizes to the no-trailing-slash form for the apex; align the other surfaces on the same form.

**Why**: Google treats `/` and the no-slash form as distinct; consistent signaling consolidates PageRank.

**Constraints**: Apply only to the homepage URL-of-self. Privacy and Terms canonicals already match each other; leave them alone.

### `INDEX-02` — Sitemap `lastmod` regenerates per request

**Audit reference**: lines 256–260
**Decision**: Accepted
**What to accomplish**: Make `lastmod` stable per build instead of recomputing on every request. Codex picks the source of truth (Vercel commit-date env, hardcoded per-page timestamp, file mtime, or similar).

**Why**: Google discounts `<lastmod>` values that update without content changes.

**Constraints**: The timestamp should reflect when each URL's content actually changed, not the build itself if that diverges meaningfully.

### `INDEX-03` — Apex returns 307 not 308

**Audit reference**: lines 262–278
**Decision**: Accepted
**What to accomplish**: Configure the apex-to-www redirect (and HTTP-to-HTTPS where applicable) as a permanent redirect (308 or 301) instead of the current 307. Codex picks the configuration surface (`vercel.json`, project domain settings, or other), provided the result returns a permanent status.

**Why**: 307 is a temporary redirect; the apex hop should be permanent so Google consolidates canonical signals consistently.

### `INDEX-04` — `Host:` directive in robots.txt

**Audit reference**: lines 280–284
**Decision**: Accepted
**What to accomplish**: Remove the `Host:` line from the generated `robots.txt`. Sitemap declaration, allow rules, and disallow rules stay.

**Why**: Only Yandex ever supported `Host:`. Google ignores it. Some validators flag it as unrecognized.

### `INDEX-05` — Conditional X-Robots-Tag deploy-time footgun

**Audit reference**: lines 286–290
**Decision**: Accepted
**What to accomplish**: Add an automated check that detects if `X-Robots-Tag: noindex` is ever served from the production root URL. The check can live as a post-deploy hook, a CI job, or a scheduled task. The failure mode must be loud (deploy fails, alert fires, or equivalent).

**Why**: The current logic adds `noindex` whenever `VERCEL_ENV` is not `production`. A misconfigured deploy could silently de-index the site. A guard prevents silent regression.

**Constraints**: Do not change the current `next.config.ts` conditional behavior; the guard is additive.

### `INDEX-06` — `<html lang="en">` should be `lang="en-CA"`

**Audit reference**: lines 292–296
**Decision**: Accepted
**What to accomplish**: Change the html element's lang attribute to `en-CA`.

**Why**: Aligns with `og:locale: en_CA` and the JSON-LD `addressCountry: CA`. Accessibility consistency for assistive tech.

### `INDEX-07` — apple-touch-icon, manifest, theme-color

**Audit reference**: lines 298–302
**Decision**: Accepted
**What to accomplish**:
1. Ship a 180x180 PNG apple-touch-icon derived from the existing NLG master icon assets in `public/brand/icons/`. Opaque background using the site's primary background color (the navy anchor at `--bg-0`, `#05101F`). Do not pre-round corners (iOS applies its own mask).
2. Ship 192x192 and 512x512 PNG icons for the manifest.
3. Ship a `manifest.webmanifest` registering the firm's name, short name, the icons above, the site's background and theme colors, and `display: "browser"` (NLG is not a PWA; do not promote install).
4. Register the apple-touch-icon and manifest with Next.js so the appropriate `<link>` tags appear in the head of every page.
5. Ship a `theme-color` signal via the Next.js Viewport export. Both the light and dark media-query variants resolve to the site's actual background color since the site is dark-only.

**Why**: Real Trust hit if a partner pins the site to iOS home screen — without an apple-touch-icon the home-screen tile renders a screenshot of the page. theme-color eliminates the white address-bar seam over the dark hero on Chrome Android and Safari iOS. Manifest is cheap insurance and silences Lighthouse PWA audit noise.

**Constraints**:
- Source assets exist as PNGs at `public/brand/icons/primary/png/NLG-Icon.png` (400x400), `NLG-Icon@2x.png` (800x800), `NLG-Icon@3x.png` (1200x1200). Use these or the SVG masters under `public/brand/icons/primary/svg/`. Match the existing NLG mark; do not introduce a new logo treatment.
- Brand background hex: `#05101F` (the actual page background `--bg-0` from `globals.css`).
- Codex picks the icon-generation tooling, the file locations under `public/` or the Next.js app-icons file conventions, and the manifest delivery (static file vs `manifest.ts` route).
- Do not add maskable icons. Do not ship a service worker. Do not add `display: "standalone"`. Do not add install prompts.

**Out of scope**: PWA features beyond the manifest itself. New brand logo work.

---

## SCHEMA findings (Structured Data and Social Surface)

### `SCHEMA-01` — Schema enrichment — implemented via `ACTION-05`
**Decision**: Modified (founder field deferred). See `ACTION-05`.

### `SCHEMA-02` — Address verifiability
**Audit reference**: lines 312–316
**Decision**: Resolved. Founder confirmed `400 Slater St., Ottawa, ON K1R 7S7` is NLG's official registered address. No code change.

### `SCHEMA-03` — Twitter image runtime export
**Audit reference**: lines 318–327
**Decision**: Accepted (combined with `SCHEMA-04`)
**What to accomplish**: Fix the twitter-image build warning by either restructuring the re-export or dropping the edge runtime entirely from both image routes. Codex picks the cleaner of the two and ensures both `/opengraph-image` and `/twitter-image` build without warnings.

### `SCHEMA-04` — OG image edge runtime disables static generation
**Audit reference**: lines 329–333
**Decision**: Accepted
**What to accomplish**: Switch both `/opengraph-image` and `/twitter-image` off the edge runtime so they pre-render at build time. The image content is constant; edge runtime adds cold-start latency with zero benefit.

**Constraints**: The image content stays identical. Codex does not touch the `ImageResponse` JSX or any visual element of the OG image.

### `SCHEMA-05` — `og:url` and canonical trailing slash drift
**Decision**: Resolved via `INDEX-01`.

---

## ARCH findings (Internal Architecture)

### `ARCH-01` — Single-page architecture caps lane ranking
**Audit reference**: lines 342–348
**Decision**: Deferred
**Re-entry trigger**: First three real engagements close, sufficient per-lane content exists, OR specific buyer-demand signal for a lane-specific URL.
**What to accomplish this cycle**: Nothing. Do not split the homepage into lane pages.
**Why**: Three thin pages without unique content is worse than one strong homepage. The schema's `hasOfferCatalog` from `ACTION-05` gives Google service-level signal without requiring three URLs.

### `ARCH-02` — Header navigation
**Audit reference**: lines 350–354
**Decision**: Modified
**What to accomplish**: See the Header Navigation Plan section below for the full final shape and the rationale per item.

### `ARCH-03` — Footer "Field notes" column
**Audit reference**: lines 356–359
**Decision**: Accepted
**What to accomplish**: Remove the entire "Field notes" footer column. Footer becomes three columns instead of four. Codex picks how the remaining three columns rebalance visually.
**Constraints**: Match the existing Footer's tone and spacing. Preserve the legal line, the brand block, the LinkedIn link, the social treatment.

---

## BRAND findings (Banned-claim integrity)

### `BRAND-01` — Eleven anonymized testimonials — implemented via `ACTION-01`
**Decision**: Modified.

### `BRAND-02` — Deloitte name-drop
**Audit reference**: lines 369–373
**Decision**: Rejected. Keep the line verbatim.
**Why**: Founder direct decision; retained as deliberate brand voice differentiator. Locked context does not bar named-competitor disparagement.
**Residual risk recorded** (per the audit's no-softening rule): named-competitor copy in indexable text invites legal reach-out, can complicate any future Big-Four sub-contract or referral path. Audit rated this Critical / Brand integrity / Confidence Medium-High; that rating stands as the documented residual risk alongside the founder's accepted-trade-off rationale.
**What to accomplish**: Nothing. Codex does NOT edit `BuyerQualifier.tsx`.

### `BRAND-03` — Render-vs-SSR delta — implemented via `ACTION-01`
**Decision**: Modified.

### `BRAND-04` — Plural-team framing
**Audit reference**: lines 393–397
**Decision**: Rejected. Premise invalidated by `CONTEXT-CORRECTION-01`.
**Why**: The audit assumed sole-staffed delivery. NLG uses contractors and bench resources as engagements require. Plural-team framing is accurate.
**What to accomplish**: Nothing. Codex does NOT edit TrustStrip, Footer tagline, or Practices "team" wording.

---

## EEAT findings (Author, About, Contact, Trust, NAP)

### `EEAT-01` — Founder bio and /about page
**Audit reference**: lines 381–385
**Decision**: Deferred. Both the visible /about page AND the hidden JSON-LD founder declaration.
**Re-entry trigger**: Founder's concurrent-employment timing changes, OR the first three real engagements close and content readiness justifies an /about page.
**What to accomplish this cycle**: Nothing. Codex must NOT add a `founder` field to the JSON-LD schema (already excluded from `ACTION-05`). Codex must NOT scaffold an `/about` route.
**Constraints (when re-entering later)**: When the page eventually ships, it is firm-led, not founder-bio-led. Defer founder identification until explicit founder approval.

### `EEAT-02` — Schema vs Footer NAP drift
**Audit reference**: lines 387–391
**Decision**: Accepted (Option B — reveal the street address in the footer)
**What to accomplish**: The Footer's legal line currently reads `"North Lantern Group Inc. · Ontario, Canada · ..."`. Change the location portion to include the full registered street address: `"North Lantern Group Inc. · 400 Slater St., Ottawa, ON K1R 7S7 · ..."`. Keep the rest of the legal line (privacy link, terms link, privacy email, copyright) intact.

**Why**: NAP unification across schema, footer, privacy page, and terms page. Founder confirmed the address is the legitimate registered office.

**Constraints**: Match the existing Footer typography and rhythm. Do not restructure the legal line beyond the location replacement.

### `EEAT-03` — First-hand experience signals
**Audit reference**: lines 399–403
**Decision**: Accepted (no additional work)
**What to accomplish**: Nothing extra. After `ACTION-01` ships, the anonymized engagements section carries an honest Experience signal; the "Won't do" refusals in Practices carry it concretely; Privacy/Terms pages carry Trust. Codex does not add new experience content this cycle.

---

## PERF findings (Performance)

### `PERF-01` — First Load JS for `/` is heavy
**Audit reference**: lines 407–411
**Decision**: Accepted
**What to accomplish**: Defer-load the Contact section so its phone-input, libphonenumber, and reCAPTCHA dependencies do not land in the homepage hydration bundle. Codex picks the approach (Next dynamic import with `ssr: false`, intersection-gated mount, or equivalent) and ensures the form still functions when the visitor scrolls into it.

**Why**: Current First Load JS is ~267 kB; the form sits below the fold but its deps load up front. Expected savings ~30-60 kB compressed.

**Constraints**:
- The form must continue to render and submit identically.
- The reCAPTCHA flow must still gate submission.
- Layout space for the section must be reserved so visitors do not experience CLS when the form mounts.
- The form's accessibility (labels, error handling, aria attributes) stays intact.

### `PERF-02` — Dead deps `cobe` and `framer-motion`
**Audit reference**: lines 413–416
**Decision**: Accepted (verified)
**What to accomplish**: Uninstall `cobe` and `framer-motion`. Both verified unused (zero imports anywhere under `src/`). Confirm `next build` still passes after removal.

**Constraints**: If any test, story, or non-`src/` file references either package, Codex investigates before deletion.

### `PERF-03` — No preconnect to reCAPTCHA origins
**Audit reference**: lines 418–428
**Decision**: Accepted
**What to accomplish**: Add preconnect link tags for `https://www.google.com` and `https://www.gstatic.com` so the reCAPTCHA handshake is faster on first form interaction.

**Constraints**: Place the preconnect hints in the document head. Codex picks how (raw `<link>` in the root layout, a Next.js head convention, or equivalent). Do not preconnect to origins that are not actually used.

### `PERF-04` — npm audit moderates
**Audit reference**: lines 430–434
**Decision**: Accepted (passive — wait for upstream)
**What to accomplish**: Do not force-resolve. Monitor for the next minor `next` release that bumps the transitive `postcss` dependency. Re-run `npm audit` after each `next` update.

### `PERF-05` — Stale browserslist data
**Audit reference**: lines 436–439
**Decision**: Accepted
**What to accomplish**: Update `caniuse-lite` via `update-browserslist-db` and bump `baseline-browser-mapping` to current. Commit the updated lockfile.

---

## DRIFT findings (Repo-vs-Production Drift)

### `DRIFT-01` — Stale local branches
**Audit reference**: lines 443–447
**Decision**: Accepted (with founder verification of current state)
**Verified state**:
- Six local-only branches have ZERO unique commits versus `main`: `codex/wave-1-copy-v2-motion-upgrade`, `codex/wave-1-credibility-containment`, `dev`, `feature/WEB-32-github-jira-docs`, `feature/WEB-34-docs-update`, `feature/WEB-34-montserrat-font`.
- One local-only branch has two commits not in `main`: `feature/WEB-54-harden-contact-form`. The work may already be squash-merged; verify with a diff before deleting.
- The current working branch (`feature/WEB-33-landing-page-clarity`) holds the audit and decisions commits; keep until merged.

**What to accomplish**: Delete the six no-diff branches. For `feature/WEB-54-harden-contact-form`, diff against `main` first; delete only if the diff is effectively empty. If non-empty, escalate to Hamza.

**Constraints**: Git hygiene only. No code change.

### `DRIFT-02` — Vercel cache age
**Audit reference**: lines 449–453
**Decision**: Resolved (observation only). Refreshes automatically on next deploy.

### `DRIFT-03` — X-Robots-Tag fragility
**Decision**: Resolved via `INDEX-05`.

---

## Audit's open Decision Register items

- `DECISION-01` Single-page vs lane URLs — Deferred via `ARCH-01`.
- `DECISION-02` Plural-team copy reframe — Rejected via `BRAND-04`.
- `DECISION-03` priceRange in JSON-LD — Rejected. Do not add `priceRange`. Locked context bars published pricing floor.
- `DECISION-04` Founder-bylined /about — Deferred via `EEAT-01`. When re-entering: ship firm-led.
- `DECISION-05` OG image runtime — Accepted (Node default) via `SCHEMA-04`.
- `DECISION-06` Title-tag exact wording — Resolved via `ACTION-02`.

---

# Testimonials Anonymization Plan

The decision is per-row. The eleven rows in the current `ATTESTATIONS` array transform as follows. The `attribution` column gives the new public-facing byline that replaces `name` and `initials`. Practice tag stays as-is (including the three rows that keep `GOVERNED DELIVERY` as a documented exception). Outcome metric and full quote stay verbatim.

| Row | Title (kept) | Attribution (new public byline) | Practice tag | Outcome metric (verbatim) | Full quote |
|---|---|---|---|---|---|
| 0 | Director of IT Operations | North American managed services provider | `ATLASSIAN SYSTEMS` | EIGHT YEARS OF DEBT, CLEARED IN FOURTEEN WEEKS. | verbatim |
| 1 | COO | Mid-market professional services firm | `REPORTING AND KNOWLEDGE` | DOCUMENTATION PEOPLE USE | verbatim |
| 2 | VP Technology Operations | Multi-tenant managed services provider | `GOVERNED DELIVERY` (exception) | ACCESS GOVERNANCE MODEL, FINALLY UNDER CONTROL. | verbatim |
| 3 | Director of Customer Operations | B2B SaaS company | `ATLASSIAN SYSTEMS` | 3X FASTER RESOLUTION TIMES | verbatim, including the "Atlassian solution providers" phrase |
| 4 | CFO | Mid-market operations and services firm | `REPORTING AND KNOWLEDGE` | CLEAR NUMBERS. BETTER DECISIONS. | verbatim |
| 5 | President | Lean B2B services firm | `GOVERNED DELIVERY` (exception) | CLEAR SCOPE. STRAIGHT ANSWERS. | verbatim |
| 6 | IT Director | Mid-market services organization | `AUTOMATION AND OPERATING RHYTHM` | INTEGRATIONS THAT KEEP RUNNING | verbatim |
| 7 | Head of Operations | Regulated financial-services firm | `GOVERNED DELIVERY` (exception) | PASSED COMPLIANCE REVIEW | verbatim, including the "She" pronoun in the credit sentence (refers to a real contractor per `CONTEXT-CORRECTION-01`) |
| 8 | VP Engineering | B2B software company | `AUTOMATION AND OPERATING RHYTHM` | LESS FRICTION, FASTER TEAMS | verbatim |
| 9 | Senior Director of Engineering Systems | Enterprise software company | `ATLASSIAN SYSTEMS` | ATLASSIAN WORK THAT LASTS | verbatim, including the "primary consulting partner" and 44-week and three-engagements framing |
| 10 | CIO | Mid-market enterprise services firm | `REPORTING AND KNOWLEDGE` | BUILT AROUND HOW WE ACTUALLY WORK | verbatim |

**Methodology note** to add at the top of the Testimonials section:

> Names and identifying details are anonymized at clients' request. Engagement details available under NDA on request.

**Status bar replacement** (the line that currently reads "11 CLIENT TESTIMONIALS // 4 SERVICE AREAS // POST-HANDOVER RESULTS"):

> Engagements across Atlassian, BI, and automation.

**SSR-emit fix**: every row's `fullQuote` must appear in server-rendered HTML, not just the active carousel entry. The visible interactive carousel keeps current behavior; the SSR pool changes so search engines can index all eleven quotes. Codex picks the technique (hidden accessible block, expanded screen-reader-only pool, or equivalent) that preserves the carousel's visual UX and the section's existing accessibility patterns.

---

# Header Navigation Plan

The final header shape:

> **Practices** (with sub-menu) | **Engagements** | **Process** | **About** | **Book a call**

Five items, zero word repetition, single solo CTA.

## Per-item decisions

- **Practices** keeps its current top-level position and section anchor. New: a sub-menu (hover on desktop, expanded inline on mobile) listing the three lanes individually:
  - Atlassian Platform → links to the Atlassian section anchor
  - BI and Analytics → links to the BI section anchor
  - Automation and Integration → links to the Automation section anchor
  - Codex picks the sub-menu interaction pattern that matches the existing site's design language (hover-reveal, click-reveal, or a hybrid that gracefully handles touch). The sub-menu reads as a quiet extension of the existing header, not as a new visual archetype.
- **Engagements** replaces the current `Work` label. The label change carries through to the section's anchor: the section currently anchored as `#work` is renamed to `#engagements`. Codex finds every reference (Header link, Footer link, any in-page CTA) and updates them.
- **Process** replaces the current `How we work` label. Same anchor rename: the HowWeWork section's anchor changes from `#how-we-work` to `#process`. Same global anchor-reference update across Header, Footer, and any in-page link.
- **About** stays as `About` linking to the existing Belief section anchor.
- **Book a call** stays as the solo header CTA, linking to the existing booking URL. The current `Contact` button is removed from the header; the contact form remains reachable from the Practices card CTAs, the Hero secondary button, and the Footer.
- **Insights** is NOT added this cycle. Re-entry trigger: first real essay ships at a real URL.

## Constraints on the implementation

- Match the existing header's typography, height, spacing, scrolled-state behavior, and brand mark treatment.
- The mobile menu's open/close pattern, animations, and aria-attributes stay as they are. The new sub-menu integrates into that pattern, not around it.
- Anchor renames must update everywhere they appear. No 404 on click. Codex greps the codebase to confirm completeness.
- No new color tokens, no new font sizes for the sub-menu — derive from existing tokens.

---

# Open process items

These are not code changes. They are flags for Hamza's awareness.

1. **Documented client consent for testimonial publication.** Anonymization is the founder's chosen path for this cycle. Anonymization without documented consent does not eliminate PIPEDA Principle 4.3 exposure if the underlying data was originally collected with clients identifiable. Recorded once per the audit's no-softening rule; not a code item.
2. **Operational founder-identity leak surfaces.** Codex does not touch these; they are Hamza's to verify:
   - The cal.com booking page (does it show name/headshot to strangers?).
   - The whois record for `northlanterngroup.com` (is domain privacy enabled?).
   - The LinkedIn company page admin information visibility.
   - The reply signature on `hello@northlanterngroup.com` emails.

---

# Conflicts with locked context

None taken. `CONTEXT-CORRECTION-01` is a correction of an inaccurate intake input, not an override of locked context. `BRAND-02` (Deloitte) is the only Critical finding rejected; the residual risk is recorded in that entry and the decision falls outside locked context scope (locked context does not bar named-competitor disparagement).

---

# Decision provenance

This decisions register was populated during a single intake session on 2026-05-08 to 2026-05-09 between Hamza Chundrigar and Claude (Anthropic, model 4.7 1M-context, ultrathink mode). The intake spanned five phases:

- **Phase 0**: Acquisition of repo state and full read of audit + `Testimonials.tsx`.
- **Phase 1**: Finding-ID stamping for all 42 findings. Accepted as proposed.
- **Phase 2**: Testimonials intake — five blocks (sector descriptors, outcome metric disposition, company-identifying phrasing scan, counts, consent) plus a casing-format follow-up that locked sentence-case sector descriptors.
- **Phase 3**: Remaining findings intake spanning 30+ findings, 6 audit Decision Register items, and 3 direct calls (INDEX-07, PERF-02, DRIFT-01) made by Claude under founder direction with full investigation and parallel-agent research.
- **Phase 4**: Decisions doc generation (this file).
- **Phase 5**: ID-stamping the audit additively and atomic commit.

The intake used parallel research subagents at multiple points:

- Original audit Stage 1: seven parallel specialist agents (on-page content, technical indexability, structured data, internal architecture, E-E-A-T, performance, repo-vs-production drift).
- Title tag decision: three parallel agents (keyword research, title-tag best practices 2026, competitor inventory).
- Meta description decision: two parallel agents (competitor meta description harvesting, B2B meta best practices).
- Header navigation rename decision: five parallel agents (deep competitor inventory, pre-traction positioning, UX/IA research, SEO research, NLG brand voice synthesis).
- `INDEX-07` apple-touch-icon / manifest / theme-color: one focused agent on 2026 PWA manifest best practices.

All research outputs cited authoritative sources where possible (Google Search Central, Backlinko 2025 4M-result update, Zyppy title-rewrite study, Nielsen Norman Group, Wynter, Gartner, web.dev, Next.js docs, schema.org). Quantitative claims trace to those sources; subjective recommendations are flagged in the original audit and the entries above.

The founder explicitly directed that the implementation work will be handed to Codex (a code-generation agent operating with autonomy) after this document is complete. This document is the contract: decisions are locked, design alignment with the live site is locked, locked context is locked, and how Codex ships the work is Codex's call. If a decision and a design constraint appear to conflict during implementation, Codex escalates to Hamza rather than improvising outside the spec.
