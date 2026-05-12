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
intended_executor: Codex (code generation agent) per founder direction
no_live_execution_yet: true
---

# How to read this document

This file is the implementation contract paired with the SEO audit at `docs/audits/seo-audit-2026-05-08.md` (commit `8aa08f7`). The audit is the immutable point-in-time finding set. This document records what was accepted, modified, rejected, deferred, and what is implementation-pending.

A future implementation agent (Codex per founder direction) should treat THIS document, not the audit, as the actionable scope. Every finding in the audit has a corresponding entry below stamped with the same finding ID (`BRAND-01`, `CONTENT-01`, etc.). Each entry contains: the audit source line, the original audit recommendation, the founder's feedback, the resulting decision, implementation notes precise enough to execute without further input, and validation steps.

No source files are edited as part of this audit cycle. The implementation work is staged for a follow-on engagement. When ready to ship, the implementation agent should:

1. Read this document end-to-end.
2. Implement only items marked `Decision: Accepted` or `Decision: Modified` with `Implementation status: Not started`.
3. Skip items marked `Deferred`, `Rejected`, or `Resolved`.
4. Process items in the order listed within each category; categories themselves can run in any order except where a `Depends on` line is specified.
5. Verify each item against its `Validation` step before marking it `Done`.

Severity tags from the audit are preserved verbatim. Where the founder rejected or deferred a Critical or High finding, the residual risk is recorded explicitly under the entry's `Rationale` field for traceability.

# Locked operating context applied to every relevant finding

The following constraints govern all decisions in this document. Quoting verbatim from the source-of-truth tier 1 (locked business context provided at the start of the audit):

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

Pattern 3 anonymization applies to all testimonials: role + sector descriptor, no names, no initials, plus a methodology note at the section top stating that names and identifying details are anonymized at clients' request and engagement details are available under NDA.

`CONTEXT-CORRECTION-01` (recorded during intake): the audit's "sole-staffed by Hamza Chundrigar" framing was an incorrect input. NLG mobilizes contractors and bench resources as engagements require. This recasts the rationale for `BRAND-01` (anonymization is for client confidentiality, not fabrication remediation) and resolves `BRAND-04`.

# Decisions Register

Entries below are sorted by category, then by ID within category. Within each entry: `Source` lists the audit anchor; `Original recommendation` summarizes what the audit proposed; `Founder feedback` records the founder's verbatim or paraphrased response; `Decision` is one of Accepted, Modified, Rejected, Deferred, or Resolved; `Implementation notes for Codex` provides everything needed to ship the change without asking the founder a single follow-up.

---

## Top 5 Actions

### [ACTION-01] Anonymize the eleven testimonials, ship the SSR-emit fix, retain the BuyerQualifier Deloitte line verbatim

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 39–63 (committed at `8aa08f7`)
**Original recommendation**: Remove the eleven fabricated testimonials and the Deloitte name-drop before next deploy. Audit treated both as Critical Brand-integrity violations.
**Founder feedback**: Testimonials are real engagements, not fabricated; anonymize per Pattern 3 instead of removing. Deloitte line stays verbatim as deliberate brand voice; founder direct decision, residual risk acknowledged.
**Decision**: Modified
**Modification details**: Scope changes from delete-and-replace to anonymize-and-retain. Drops the BuyerQualifier edit entirely. Implements `BRAND-01`, `BRAND-03` only.
**Rationale**: With `CONTEXT-CORRECTION-01` recorded, the underlying engagements are real but anonymized at clients' request. Client confidentiality, not fabrication remediation, is the binding constraint. The Deloitte residual risk is recorded but accepted as a founder commercial-judgment call.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- See the "Testimonials anonymization plan" section below for the per-row table of changes.
- File: `src/components/sections/Testimonials.tsx`
  - Drop the `name` field from every row of the `ATTESTATIONS` array (lines 26–184).
  - Drop the `initials` field from every row.
  - Add a new field `attribution: string` to the `Attestation` type at lines 11–24. Populate per the per-row table below.
  - Drop the `Attestation` type's `name` and `initials` fields.
  - Update any consumer of `name` or `initials` inside the rendered JSX to read from `attribution` instead.
  - Change the section status-bar text at line 534 from `"11 CLIENT TESTIMONIALS // 4 SERVICE AREAS // POST-HANDOVER RESULTS"` to `"Engagements across Atlassian, BI, and automation."`
  - Above the section's status bar, add a methodology note. Suggested copy: `"Names and identifying details are anonymized at clients' request. Engagement details available under NDA on request."` Position it inside the existing `<header>` block at line 527 or as a separate `<p>` immediately above the status bar.
  - Implement the `BRAND-03` SSR-emit fix: ensure every `fullQuote` string in the `ATTESTATIONS` array renders in SSR HTML in a screen-reader-accessible form. The current pattern uses an `nlg-sr-only` span at lines 561–563 for the displayed attestation only. Replace that with a server-rendered `<div>` containing all eleven `fullQuote` strings concatenated (each within its own `<p>` or `<span>`), wrapped in `aria-hidden="true"` or `nlg-sr-only`. The visible carousel can continue to read from `displayIndex` for the interactive UI; the SSR pool is purely for crawlability.
- File: `src/components/sections/BuyerQualifier.tsx`
  - No changes. Line 6 stays verbatim including the Deloitte string.
- Validation:
  - `grep -E "Halloran|Weatherall|Krzeminski|Forsythe-Tan|Boucher|Aldridge|Whitcombe|Kowalczyk|Petra|Ofori|Okoye" /tmp/nlg-audit/index.html` returns zero matches after deploy.
  - The string `"Engagements across Atlassian, BI, and automation."` appears in the rendered HTML.
  - All eleven `fullQuote` strings appear in raw SSR HTML (`curl -sSL https://www.northlanterngroup.com/ | grep -c "<sr-only-or-similar>"` returns 11 distinct quote-body matches).
  - The Deloitte string stays present.
  - `next build` exits 0.

### [ACTION-02] Title tag rewrite

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 66–84
**Original recommendation**: Rewrite to `"Atlassian, BI and Automation Consulting in Ontario | NLG"` (~56 chars).
**Founder feedback**: Replace geographic positioning. Use `Senior-led` differentiator. Use `Analytics` instead of `BI` for SERP keyword matching per cross-agent research convergence.
**Decision**: Modified
**Modification details**: Final title is `Senior-led Atlassian, Analytics & Automation Consulting | NLG` (60 chars).
**Rationale**: Three-agent research consensus on length sweet spot (50–60 chars), keyword positioning (Atlassian front-loaded), and competitor convention (capability-led, not geo-led). `Analytics` outperforms `BI` and `Business Intelligence` for both SERP keyword density and CTR in the surveyed competitor inventory. `Senior-led` is the locked differentiator and survives Google's rewrite rules per Backlinko 2025 and Zyppy 2022.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/layout.tsx` line 28
- Old: `title: "North Lantern Group | Results that endure.",`
- New: `title: "Senior-led Atlassian, Analytics & Automation Consulting | NLG",`
- The `og:title` and `twitter:title` (lines 36, 43) inherit through the Metadata API; no further edits required.
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -oE '<title>[^<]*</title>'` returns the new string.
  - Character count is 60.
  - Google Search Console "Performance" report shows non-branded impressions on `/` for queries containing `atlassian consultant`, `bi consultant`, `analytics consultant`, or `automation consultant` after 4 to 6 weeks of crawl + indexation.

### [ACTION-03] Meta description rewrite

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 88–106
**Original recommendation**: Rewrite to `"Ontario consulting firm rebuilding Atlassian estates..."` (~148 chars).
**Founder feedback**: Drop Ontario lock-in. Stop tailoring to brand-internal vocabulary (no "named owners," "runbooks," etc.). Use plain-language B2B-buyer copy informed by elite competitor inventory.
**Decision**: Modified
**Modification details**: Final meta description is `Atlassian, analytics, and automation consulting for IT and operations teams. Modernize workflows, unify reporting, and integrate disconnected systems.` (149 chars).
**Rationale**: Length sits inside Backlinko's measured 140–150 sweet spot. Front-loads the locked title's keyword triplet for SERP-to-landing coherence. Defines the audience plainly. Uses three concrete outcome verbs that mirror the title's three-noun service list one-to-one. No CTA (research found CTAs in meta descriptions are defensible best practice but not proven lift; three of the five elite competitors close without one).
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/layout.tsx` line 29
- Old: `description: "North Lantern Group designs, improves and implements Atlassian, business intelligence, and automation systems so teams can see the work clearly, own it internally, and scale without piling on manual effort.",`
- New: `description: "Atlassian, analytics, and automation consulting for IT and operations teams. Modernize workflows, unify reporting, and integrate disconnected systems.",`
- The `og:description` and `twitter:description` (lines 38, 45) inherit through the Metadata API; no further edits required.
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -oE '<meta name="description"[^/]*'` returns the new string.
  - Character count is 149.

### [ACTION-04] H1 rewrite

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 110–130
**Original recommendation**: Rewrite to `"Fix the Atlassian, BI and automation systems your Ontario team has outgrown."`
**Founder feedback**: Drop Ontario. Switch BI to Analytics to match the new title.
**Decision**: Modified
**Modification details**: Final H1 is `Fix the Atlassian, analytics and automation systems your team has outgrown.` (75 chars). Preserves the existing `<span className="accent">outgrown.</span>` styling on the last word.
**Rationale**: Mirrors the locked title's keyword triplet for SERP-to-landing coherence (Zyppy 2022 found H1-to-title alignment reduces Google's rewrite rate "often dramatically"). The H1 verb `Fix` differs from the meta description's three verbs (`Modernize`, `unify`, `integrate`) so H1 and meta reinforce keywords without duplicating verbs.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/components/sections/HeroV2.tsx` lines 27–29
- Old:
  ```tsx
  <h1 className="nlg-h1">
    Fix the workflows, reports, and systems your team has <span className="accent">outgrown.</span>
  </h1>
  ```
- New:
  ```tsx
  <h1 className="nlg-h1">
    Fix the Atlassian, analytics and automation systems your team has <span className="accent">outgrown.</span>
  </h1>
  ```
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -oE '<h1[^>]*>[^<]+'` returns text containing `Fix the Atlassian, analytics and automation systems your team has`.
  - Character count 75 excluding the span tags.

### [ACTION-05] Schema enrichment (founder dropped per CONTEXT-CORRECTION-01 and founder-deferral)

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 134–200
**Original recommendation**: Add `founder`, `foundingDate`, `slogan`, and `hasOfferCatalog` to the `ProfessionalService` JSON-LD block.
**Founder feedback**: Defer `founder` field. Keep `foundingDate`, `slogan`, and `hasOfferCatalog`.
**Decision**: Modified
**Modification details**: Schema enrichment ships three fields; `founder` deferred until `/about` ships (see `EEAT-01`).
**Rationale**: Founder identification is a discoverability risk while founder is concurrently employed elsewhere. `foundingDate`, `slogan`, and `hasOfferCatalog` carry meaningful SEO value (Knowledge Panel formation, service-level rich results) without identifying the founder.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/layout.tsx` lines 65–94
- Insert these properties into the `professionalServiceJsonLd` object before its closing brace at line 93:
  ```ts
  foundingDate: "2025",
  slogan: "Results that endure.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "North Lantern Group services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Atlassian Platform",
          description: "Rebuild Jira, Confluence, JSM and the governance layer so a non-specialist team can run it after we leave.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "BI and Analytics",
          description: "Rebuild the semantic model, metric catalog, refresh SLAs, and lineage feeding Power BI, Tableau, or Atlassian Analytics.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automation and Integration",
          description: "Cross-system integrations and operational automations on n8n, native platforms, or custom code, every rule with a named owner.",
        },
      },
    ],
  },
  ```
- Do NOT add `founder`. Do NOT add `Review`. Do NOT add `AggregateRating`. Do NOT add `priceRange`.
- Update `areaServed` (see `INDEX-08` / Geo signaling below). The schema's `areaServed` shifts from `["Canada", "Global markets"]` to `["North America", "Latin America", "Europe", "Middle East"]`.
- Validation:
  - Google Rich Results Test on the deployed `/` URL returns zero errors and lists the new `OfferCatalog`.
  - `curl -sSL https://www.northlanterngroup.com/ | python3 -c 'import sys,re,json; m=re.search(r"<script type=\"application/ld\\+json\">(.+?)</script>", sys.stdin.read()); d=json.loads(m.group(1)); print("founder" in d, "foundingDate" in d, "slogan" in d, "hasOfferCatalog" in d)'` returns `False True True True`.

---

## CONTENT findings

### [CONTENT-01] Title tag — implemented via ACTION-02

**Source**: `docs/audits/seo-audit-2026-05-08.md` line 208
**Decision**: Accepted (via `ACTION-02`).
**Implementation notes for Codex**: See `ACTION-02`. No separate work item.

### [CONTENT-02] Meta description — implemented via ACTION-03

**Source**: `docs/audits/seo-audit-2026-05-08.md` line 214
**Decision**: Accepted (via `ACTION-03`).
**Implementation notes for Codex**: See `ACTION-03`. No separate work item.

### [CONTENT-03] H1 — implemented via ACTION-04

**Source**: `docs/audits/seo-audit-2026-05-08.md` line 219
**Decision**: Accepted (via `ACTION-04`).
**Implementation notes for Codex**: See `ACTION-04`. No separate work item.

### [CONTENT-04] Geographic relevance density

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 224–228
**Original recommendation**: Seed body copy with `Ontario` mentions in Hero subhead, Practices subhead, and Belief opening.
**Founder feedback**: Reject the Ontario lock-in. Multiple markets served (North America, Latin America, Europe, Middle East). Carry the reach signal in schema (machine-readable) plus a single Footer line (human-readable). Keep all body copy geo-free.
**Decision**: Modified
**Modification details**: Update schema `areaServed` to `["North America", "Latin America", "Europe", "Middle East"]`. Add a single visible reach line in the Footer immediately below the existing tagline: `"Engagements across North America, Latin America, Europe, and the Middle East."` No changes to HeroV2, Belief, Practices, or Contact body copy.
**Rationale**: Title, meta, and H1 are all locked geo-free. Adding any geo mention to body copy creates a perceived-reach contradiction. Schema's `areaServed` carries the SEO signal; Footer carries the human-readable trust signal. Single mention in Footer matches the standard B2B coverage-disclosure pattern.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/layout.tsx`
  - In the `professionalServiceJsonLd` object at lines 65–94, change `areaServed: ["Canada", "Global markets"],` to `areaServed: ["North America", "Latin America", "Europe", "Middle East"],`.
- File: `src/components/sections/Footer.tsx`
  - Immediately below the existing tagline (currently at line 14, the `<p className="nlg-footer-tag">` element containing `"Senior-led consulting. Atlassian, BI, and automation work that sticks after we leave."`), add a new sibling element with the regional reach line:
    ```tsx
    <p className="nlg-footer-reach">
      Engagements across North America, Latin America, Europe, and the Middle East.
    </p>
    ```
  - Add a corresponding CSS rule in `globals.css` (or wherever footer styles live) for `.nlg-footer-reach`. Suggested styling: same color and size family as `nlg-footer-tag`, slightly muted via opacity or a less-bright foreground token. Verify against the existing footer layout in dev.
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -c "North America, Latin America, Europe, and the Middle East"` returns at least 1.
  - JSON-LD `areaServed` array contains exactly four strings, all matching the spec.
  - No additional `Ontario` or `Canada` references in HeroV2, Belief, Practices, or Contact body copy.

### [CONTENT-05] Contact section H2 wraps an 86-word paragraph

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 230–234
**Original recommendation**: Split the second sentence out of the H2 into a sibling `<p>` element.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: The H2 currently contains 86 words because a follow-up sentence sits inside a child span. Search engines extract the full H2 string; splitting the inner text out keeps the H2 short and the paragraph still visible.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/components/sections/Contact.tsx` around lines 543–549
- Find the existing `<h2 className="nlg-cta-text nlg-reveal">` element. It currently looks like:
  ```tsx
  <h2 className="nlg-cta-text nlg-reveal">
    Tell us what is broken, or what you are planning.
    <span className="nlg-dim">
      We reply within one business day, with a short note. Not a 47-slide proposal deck.
    </span>
  </h2>
  ```
- Refactor to:
  ```tsx
  <h2 className="nlg-cta-text nlg-reveal">
    Tell us what is broken, or what you are planning.
  </h2>
  <p className="nlg-cta-subtext nlg-reveal nlg-dim">
    We reply within one business day, with a short note. Not a 47-slide proposal deck.
  </p>
  ```
- Add a CSS rule in `globals.css` for `.nlg-cta-subtext` if styling needs to match the prior `.nlg-dim` inside-H2 rendering. Likely a small font-size adjustment plus margin-top.
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -oE '<h2[^>]*class="nlg-cta-text[^"]*"[^>]*>[^<]+</h2>'` returns the H2 with just the single sentence.
  - The subtext sentence appears immediately after the H2 in a separate `<p>` element.

### [CONTENT-06] Writing section ships three placeholder essays

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 236–240
**Original recommendation**: Remove the Writing section, or ship the placeholders as real 200+ word public notes at `/notes/<slug>`.
**Founder feedback**: Remove the Writing section from the homepage until the first real essay or case study ships.
**Decision**: Accepted
**Rationale**: Aligns with the deferred `/about` page, deferred Insights nav item (`8b`), and deferred lane-page split (`7`). Three "Coming 2026 / in progress" placeholder cards send a thin-content signal that competes for visual real estate on the homepage. "Coming 2026" is already mildly anachronistic given the current date.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/page.tsx`
  - Remove the `Writing` import at line 8: `import Writing from "@/components/sections/Writing";`
  - Remove the `<Writing />` JSX node from the main element. Currently appears at approximately line 19; verify.
- File: `src/components/sections/Writing.tsx`
  - Do NOT delete the file. Keep it in the repo for later use when the first essay ships.
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -c "Coming 2026"` returns 0.
  - `curl -sSL https://www.northlanterngroup.com/ | grep -c "Essays coming"` returns 0.
  - `curl -sSL https://www.northlanterngroup.com/ | grep -c 'id="writing"'` returns 0.
  - `next build` exits 0.

### [CONTENT-07] Second `<title>Canada</title>` from phone-input flag SVG

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 242–246
**Original recommendation**: Defer the phone-input flag rendering until the country dropdown receives focus.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: Hygiene only. Crawl tools (Screaming Frog, Sitebulb) flag the SVG-scoped `<title>` as a duplicate even though Google reads only the head-level document title. Removing it reduces audit-tool noise.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/components/sections/Contact.tsx` around lines 4–10 (phone-input imports) and the `PhoneInput` component usage further down.
- Option A (lowest effort): set `flags={undefined}` on the `PhoneInput` component so the country flag SVG is not rendered. Country names still appear in the dropdown as text.
- Option B (preferred for UX): wrap the `PhoneInput` component in a Suspense boundary that only mounts on first field focus. Implement with `next/dynamic({ ssr: false })` plus an intersection or focus trigger.
- Option C: replace the `react-phone-number-input/flags` import with a static PNG flag set.
- Codex should choose Option A first as the minimum-risk fix. If the visual cost is too high, escalate to Option B.
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -c '<title>Canada</title>'` returns 0.
  - Phone input still functions correctly on the Contact form.

---

## INDEX findings (Technical Indexability)

### [INDEX-01] Canonical drift between source and SSR

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 250–254
**Original recommendation**: Align all surfaces on no-trailing-slash form, or override via hand-written canonical to keep the trailing slash.
**Founder feedback**: Accept default. Align on no-slash form (matches Next.js Metadata API normalization).
**Decision**: Accepted
**Rationale**: Next.js Metadata API normalizes `alternates.canonical` by stripping path-only trailing slashes for the apex. Source declares `https://www.northlanterngroup.com/` (with slash); SSR emits without slash; sitemap and JSON-LD use slash. Picking the no-slash form aligns three of four artifacts with what Next.js actually emits.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/layout.tsx` line 31
  - Old: `canonical: "https://www.northlanterngroup.com/",`
  - New: `canonical: "https://www.northlanterngroup.com",`
- File: `src/app/sitemap.ts` line 7
  - Old: `url: "https://www.northlanterngroup.com/",`
  - New: `url: "https://www.northlanterngroup.com",`
- File: `src/app/robots.ts` (already drops `host` field per `INDEX-04`, so no further change needed here).
- File: `src/app/layout.tsx` lines 65–94 (`professionalServiceJsonLd`)
  - Old: `url: "https://www.northlanterngroup.com/",`
  - New: `url: "https://www.northlanterngroup.com",`
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -oE '<link rel="canonical"[^>]*>'` shows `href="https://www.northlanterngroup.com"` (no trailing slash).
  - `curl -sSL https://www.northlanterngroup.com/sitemap.xml | grep '<loc>'` shows the homepage entry without trailing slash.
  - `curl -sSL https://www.northlanterngroup.com/ | grep -oE '"url":"https://www.northlanterngroup.com[^"]*"'` shows the no-slash form.

### [INDEX-02] Sitemap `lastmod` regenerates on every request

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 256–260
**Original recommendation**: Replace `new Date()` with a stable build-time timestamp.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: Google has stated it discounts `<lastmod>` values that update on every request without content changes. Stable per-page timestamps are the corrective.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/sitemap.ts`
- Replace `const lastModified = new Date();` with:
  ```ts
  const lastModified = process.env.VERCEL_GIT_COMMIT_DATE
    ? new Date(process.env.VERCEL_GIT_COMMIT_DATE)
    : new Date("2026-05-01");
  ```
- This uses the commit-date env var set by Vercel when available, with a hard-coded fallback for local builds.
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/sitemap.xml | grep '<lastmod>'` shows a stable timestamp across consecutive requests.
  - The timestamp matches the most recent commit that touched homepage content (or the hardcoded fallback if env var is unset).

### [INDEX-03] Apex returns 307 not 308

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 262–278
**Original recommendation**: Add `vercel.json` with a permanent 308 redirect from apex to www.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: 307 is a temporary redirect; 308 is the permanent equivalent. Google has stated 301/302 differences are small but 308 is the correct semantic for the apex-to-www canonical-consolidation hop.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `vercel.json` (new file at repo root)
- Content:
  ```json
  {
    "redirects": [
      {
        "source": "/(.*)",
        "has": [{ "type": "host", "value": "northlanterngroup.com" }],
        "destination": "https://www.northlanterngroup.com/$1",
        "permanent": true
      }
    ]
  }
  ```
- `permanent: true` in `vercel.json` produces a 308 (Vercel docs).
- Validation:
  - `curl -sI https://northlanterngroup.com` shows `HTTP/2 308` (or `301`, both acceptable; not 307).
  - `Location` header points to `https://www.northlanterngroup.com/`.

### [INDEX-04] Non-standard `Host:` directive in robots.txt

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 280–284
**Original recommendation**: Drop the `host` field from `robots.ts`.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: Only Yandex ever supported the `Host:` directive. Google ignores it. Some crawlers flag it as unrecognized.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/robots.ts`
- Remove the `host: "https://www.northlanterngroup.com",` line from the returned object.
- Final shape:
  ```ts
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://www.northlanterngroup.com/sitemap.xml",
  };
  ```
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/robots.txt` does not contain `Host:`.
  - `curl -sSL https://www.northlanterngroup.com/robots.txt` still contains the `User-Agent: *`, `Allow: /`, `Disallow: /api/`, and `Sitemap:` lines.

### [INDEX-05] Conditional X-Robots-Tag deploy-time footgun

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 286–290
**Original recommendation**: Add a post-deploy CI smoke check that fails if `X-Robots-Tag` is present on the production root URL.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: `next.config.ts` lines 64–71 add `X-Robots-Tag: noindex, nofollow` whenever `VERCEL_ENV !== "production"`. A misconfigured deploy with `VERCEL_ENV` unset would silently de-index the entire site. A smoke check prevents silent regression.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- Create a new file at `scripts/post-deploy-smoke.sh` (or equivalent):
  ```bash
  #!/usr/bin/env bash
  set -euo pipefail
  URL="${SMOKE_URL:-https://www.northlanterngroup.com/}"
  HEADER=$(curl -sI "$URL" | grep -i 'x-robots-tag' || true)
  if [ -n "$HEADER" ]; then
    echo "FAIL: X-Robots-Tag present on production:"
    echo "$HEADER"
    exit 1
  fi
  echo "PASS: production root has no X-Robots-Tag header."
  ```
- Make the script executable: `chmod +x scripts/post-deploy-smoke.sh`.
- Wire the script into the Vercel deployment lifecycle either as a post-deploy hook or as a GitHub Actions workflow triggered on successful Vercel deployment.
- Validation:
  - Running the script against the current production URL returns `PASS`.
  - Running the script against a Vercel preview URL returns `FAIL` (the preview correctly emits `X-Robots-Tag: noindex, nofollow`).
- `DRIFT-03` resolves via this same fix; no separate work item.

### [INDEX-06] `<html lang="en">` should be `lang="en-CA"`

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 292–296
**Original recommendation**: Change `<html lang="en">` to `<html lang="en-CA">`.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: Aligns with `og:locale: en_CA`, `addressCountry: CA` in JSON-LD, and the firm's Canadian incorporation. Accessibility benefit for assistive tech that uses locale-specific pronunciation.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/layout.tsx` line 102
- Old: `<html lang="en" className={...}>`
- New: `<html lang="en-CA" className={...}>`
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -oE '<html [^>]*>'` shows `lang="en-CA"`.

### [INDEX-07] apple-touch-icon, manifest, theme-color

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 298–302
**Original recommendation**: Add a 180x180 apple-touch-icon PNG, a `manifest.webmanifest`, and `themeColor` to metadata.
**Founder feedback**: Make the call yourself. Direct execution to follow up later.
**Decision**: Accepted (with concrete spec; see Implementation notes)
**Rationale**: Of the three pieces, only `apple-touch-icon` is a real trust hit (partners pinning the site to iOS home screen render an unreadable screenshot fallback otherwise). `theme-color` is a cosmetic mobile win on Chrome Android and Safari iOS (eliminates the white-strip seam over the dark hero). `manifest.webmanifest` is mostly audit-tool-silencing but cheap to ship; using `display: "browser"` keeps NLG honest about not being a PWA.

Source assets exist: `public/brand/icons/primary/png/NLG-Icon.png` (400x400), `NLG-Icon@2x.png` (800x800), `NLG-Icon@3x.png` (1200x1200). Brand background color is `#05101F` (the actual page background, `--bg-0` from `globals.css`).

**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:

Step 1: Generate three icon assets.
- `public/apple-touch-icon.png` — 180x180 PNG. Source: downscale `public/brand/icons/primary/png/NLG-Icon@3x.png` (1200x1200) using an ImageMagick or sharp pipeline. Background must be opaque navy `#05101F`. Do NOT pre-round corners; iOS applies its own rounded-rectangle mask. The NLG mark should occupy roughly the inner 70% of the canvas with the navy background fully covering the remainder.
- `public/icon-192.png` — 192x192 PNG. Same source. Transparent background is acceptable. NLG mark centered.
- `public/icon-512.png` — 512x512 PNG. Same source. Transparent background is acceptable. NLG mark centered.

Suggested ImageMagick recipe (Codex may substitute any equivalent tool):
```bash
# apple-touch-icon: 180x180, opaque navy bg, no rounded corners
magick public/brand/icons/primary/png/NLG-Icon@3x.png \
  -resize 144x144 \
  -background "#05101F" \
  -gravity center \
  -extent 180x180 \
  public/apple-touch-icon.png

# icon-192: 192x192, transparent bg ok
magick public/brand/icons/primary/png/NLG-Icon@3x.png \
  -resize 192x192 \
  public/icon-192.png

# icon-512: 512x512, transparent bg ok
magick public/brand/icons/primary/png/NLG-Icon@3x.png \
  -resize 512x512 \
  public/icon-512.png
```

Step 2: Create `public/manifest.webmanifest` with these contents verbatim:
```json
{
  "name": "North Lantern Group",
  "short_name": "NLG",
  "description": "Senior-led Atlassian, Analytics and Automation consulting.",
  "start_url": "/",
  "scope": "/",
  "display": "browser",
  "background_color": "#05101F",
  "theme_color": "#05101F",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" }
  ]
}
```
`display: "browser"` is deliberate; NLG is not a PWA, do not promote install prompts. Do NOT add maskable icons. Do NOT add a service worker.

Step 3: Update `src/app/layout.tsx` to register the new icons and ship `theme-color` via the viewport export.

Add an import for `Viewport` alongside the existing `Metadata` import:
```ts
import type { Metadata, Viewport } from "next";
```

Add a new top-level export (before or after `export const metadata`):
```ts
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#05101F" },
    { media: "(prefers-color-scheme: dark)", color: "#05101F" },
  ],
};
```
Both light and dark map to the same `#05101F` because NLG's site is dark-only; Chrome on Android will tint the address bar to match the hero.

Extend `metadata.icons` to add the apple field:
```ts
icons: {
  icon: [
    { url: "/favicon.svg", type: "image/svg+xml" },
    { url: "/brand/favicons/NLG-Favicon-32.png", sizes: "32x32", type: "image/png" },
    { url: "/brand/favicons/NLG-Favicon-16.png", sizes: "16x16", type: "image/png" },
  ],
  apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
},
```

Add `manifest` to the metadata object:
```ts
manifest: "/manifest.webmanifest",
```

Step 4: Validation.
- `curl -sSL https://www.northlanterngroup.com/ | grep -oE '<link rel="apple-touch-icon"[^>]*>'` returns a link to `/apple-touch-icon.png`.
- `curl -sSL https://www.northlanterngroup.com/ | grep -oE '<link rel="manifest"[^>]*>'` returns a link to `/manifest.webmanifest`.
- `curl -sSL https://www.northlanterngroup.com/manifest.webmanifest` returns the JSON content above with HTTP 200 and `content-type: application/manifest+json` (or `application/json` acceptable).
- `curl -sSL https://www.northlanterngroup.com/apple-touch-icon.png` returns HTTP 200 with `content-type: image/png` and dimensions confirmable via `file` command at 180x180.
- `curl -sSL https://www.northlanterngroup.com/ | grep -oE '<meta name="theme-color"[^>]*>'` returns two meta tags, one for each prefers-color-scheme query, both with `content="#05101F"`.
- Lighthouse PWA section reports zero errors on apple-touch-icon, manifest, and theme-color checks.

### [INDEX-08] Geo signaling (new ID, derived from CONTENT-04 and EEAT-02 implementation)

**Source**: Derived from `CONTENT-04` (geographic relevance) and intake decision in Bucket 2 item 4.
**Decision**: Accepted
**Implementation notes for Codex**: See `CONTENT-04` for footer change and `ACTION-05` for schema `areaServed` change. Single ID created here for cross-reference completeness.

---

## SCHEMA findings (Structured Data and Social Surface)

### [SCHEMA-01] ProfessionalService lacks recommended properties — implemented via ACTION-05

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 306–310
**Decision**: Modified (founder field deferred, see `ACTION-05`).
**Implementation notes for Codex**: See `ACTION-05`.

### [SCHEMA-02] JSON-LD address verifiability

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 312–316
**Original recommendation**: Verify the 400 Slater St. address against the federal/Ontario registered records before publishing.
**Founder feedback**: Confirmed. 400 Slater St. is the legitimate official registered address for North Lantern Group Inc.
**Decision**: Resolved
**Rationale**: Founder verified the address is correct. No code change required. The schema declaration matches reality.
**Implementation status**: Done (verification only, no code change)
**Implementation notes for Codex**: No work item.

### [SCHEMA-03] Twitter image runtime export broken via re-export

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 318–327
**Original recommendation**: Redefine `runtime` inline in `twitter-image.tsx` instead of re-exporting from `opengraph-image.tsx`.
**Founder feedback**: Accept default. Combined with `SCHEMA-04` (drop edge runtime), this simplifies.
**Decision**: Accepted (combined with `SCHEMA-04`)
**Rationale**: With `SCHEMA-04` dropping the `runtime = "edge"` line from `opengraph-image.tsx`, the re-export issue disappears entirely. Both files will run on the default Node runtime and pre-render statically.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**: See `SCHEMA-04`. Single combined fix.

### [SCHEMA-04] OG image edge runtime disables static generation

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 329–333
**Original recommendation**: Remove the `export const runtime = "edge";` line from `opengraph-image.tsx` so the image pre-renders once at build instead of regenerating on every social-card crawl.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: The OG image is constant. Edge runtime adds per-request cold-start latency with zero benefit for a static marketing site.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/opengraph-image.tsx`
- Remove the line: `export const runtime = "edge";`
- File: `src/app/twitter-image.tsx`
- The current re-export `export { default, alt, size, contentType, runtime } from "./opengraph-image";` should be updated to drop `runtime` from the re-export list:
  ```ts
  export { default, alt, size, contentType } from "./opengraph-image";
  ```
- Validation:
  - `next build` log shows `/opengraph-image` and `/twitter-image` as `○` (Static), not `ƒ` (Dynamic).
  - The three "Next.js can't recognize the exported `runtime` field" warnings disappear from build output.
  - `curl -sI https://www.northlanterngroup.com/opengraph-image` returns HTTP 200 with `content-type: image/png`.

### [SCHEMA-05] OG `og:url` and canonical trailing slash mismatch

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 335–338
**Decision**: Resolved (via `INDEX-01`).
**Implementation notes for Codex**: No separate work item; the `INDEX-01` canonical alignment removes this drift.

---

## ARCH findings (Internal Architecture)

### [ARCH-01] Single-page architecture caps each lane's ranking surface

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 342–348
**Original recommendation**: Split into `/practices/atlassian-platform`, `/practices/bi-and-analytics`, `/practices/automation-and-integration`, each with its own metadata and longer-form content; or accept the single-page architecture.
**Founder feedback**: Defer the lane-page split. Build later when per-lane case studies and methodology playbooks exist.
**Decision**: Deferred
**Trigger to revisit**: After first three real engagements close OR sufficient per-lane content exists to justify three independent pages without thin-content risk.
**Rationale**: Three thin pages with overlapping copy is a worse SEO signal than a single strong homepage. The schema's `hasOfferCatalog` (shipping via `ACTION-05`) gives Google the service-level signal without requiring three URLs. Lane-page split is multi-week work that blocks the rest of the audit fixes; deferring lets the high-leverage content ship later.
**Implementation status**: Won't do (this cycle)
**Owner**: Hamza Chundrigar (decides re-entry)
**Implementation notes for Codex**: No work item this cycle.

### [ARCH-02] Header primary nav surfaces only "Practices"

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 350–354
**Original recommendation**: Add a hover/click sub-menu under "Practices" with three items linking to the lane anchors.
**Founder feedback**: Lock the sub-menu. Plus header redesign confirmed: drop the Contact button (keep `Book a call` as the solo CTA), defer the Insights item, rename `Work` to `Engagements` and `How we work` to `Process`.
**Decision**: Modified
**Modification details**: Full header redesign (see Header navigation plan section below). Final shape: `Practices` (with sub-menu) | `Engagements` | `Process` | `About` | `Book a call`.
**Rationale**: Five-agent research convergence on:
- Drop one of the two header CTAs (single-CTA pages convert 1.6x higher per First Page Sage 2026).
- Defer `Insights` until the first essay ships (linking to an empty hub is worse than linking to nothing).
- Rename `Work` to `Engagements` because three of five agents picked it, it echoes the site's existing `engagementType` and "How engagements run" vocabulary, and it does not promise a named client roster (which NLG cannot show).
- Rename `How we work` to `Process` to remove the `work / how we work` scanning friction and match B2B-standard label conventions.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**: See the Header navigation plan section below for full diff and per-file changes.

### [ARCH-03] Footer "Field notes" column doing very little work

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 356–359
**Original recommendation**: Retire the column until the first essay ships, or seed it now with three planned essay slugs.
**Founder feedback**: Remove the column until the first real essay ships.
**Decision**: Accepted
**Rationale**: Aligns with `CONTENT-06` (Writing section removal). The single placeholder link "Essays coming 2026" becomes pointless once the Writing section is removed.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/components/sections/Footer.tsx` around lines 67–74
- Remove the entire `<div className="nlg-footer-col">` block containing `<h4>Field notes</h4>` and its single `<li>` child link to `#writing`.
- Verify the footer grid layout still renders cleanly with three columns instead of four. May require a CSS adjustment in `globals.css` for the `.nlg-footer-grid` rule. Three-column footer is the new layout.
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -c "Field notes"` returns 0.
  - `curl -sSL https://www.northlanterngroup.com/ | grep -c "Essays coming"` returns 0.
  - Footer renders with three columns: brand block, Practices, Firm.

---

## BRAND findings (Banned-claim integrity)

### [BRAND-01] Eleven anonymized testimonials — implemented via ACTION-01

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 363–367
**Decision**: Modified (anonymize per Pattern 3, retain content). See `ACTION-01` and the Testimonials anonymization plan below.

### [BRAND-02] Deloitte name-drop — Rejected

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 369–373
**Original recommendation**: Remove the Deloitte string from `BuyerQualifier.tsx:6`.
**Founder feedback**: Keep the line verbatim. Founder direct decision; deliberate brand voice differentiator.
**Decision**: Rejected
**Residual risk recorded** (per protocol's no-softening rule): named-competitor copy in indexable text invites legal reach-out, can complicate any future Big-Four sub-contract or referral path, and ages with whoever reads the SSR HTML next. Audit rated this Critical / Brand integrity / Confidence Medium-High; that rating stands as the documented residual risk alongside the founder's accepted-trade-off rationale.
**Rationale**: Founder commercial-judgment call. Locked context does not bar named-competitor disparagement (it bars Solution Partner claim, fabricated proof, and pricing floor only). Decision falls outside locked-context scope, so it stands without conflict.
**Implementation status**: Won't do
**Implementation notes for Codex**: Leave `src/components/sections/BuyerQualifier.tsx` line 6 verbatim. Do NOT edit.

### [BRAND-03] Render-vs-SSR delta on testimonials — implemented via ACTION-01

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 375–379
**Decision**: Modified (bundled into `ACTION-01`).
**Implementation notes for Codex**: See `ACTION-01` Step on `BRAND-03` SSR-emit fix.

### [BRAND-04] Plural-team framing on a sole-staffed firm

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 393–397
**Original recommendation**: Substitute "senior-led" or "your engagement lead" for "team" in TrustStrip and Footer tagline.
**Founder feedback**: Premise invalidated. NLG uses contractor and bench resources as engagements require. Plural-team framing is accurate.
**Decision**: Rejected (premise invalidated per `CONTEXT-CORRECTION-01`)
**Rationale**: The audit's framing assumed sole-staffed delivery. Founder corrected the input during intake: NLG mobilizes contractors and a bench. Plural-team framing is accurate because the actual delivery composition is plural. No copy edit required.
**Implementation status**: Won't do
**Implementation notes for Codex**: Leave `TrustStrip.tsx`, `Footer.tsx`, and `Practices.tsx` plural-team wording verbatim. Do NOT edit.

---

## EEAT findings (Author, About, Contact, Trust, NAP)

### [EEAT-01] No founder bio, no /about page

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 381–385
**Original recommendation**: Ship `/about` with founder bio + LinkedIn link + `Person` schema with `founder` relationship.
**Founder feedback**: Defer both the visible /about page and the hidden founder declaration in the page source. Founder is concurrently employed at another firm (INEAT) and wants to keep face and name off public surfaces and out of the page source until timing is right.
**Decision**: Deferred (both visible page and schema founder declaration)
**Trigger to revisit**: After the founder's concurrent-employment timing changes OR after the first three real client engagements close and content readiness justifies an /about page.
**Rationale**: Schema-side founder declaration is technically hidden but readable by anyone inspecting page source. There is no privacy advantage to "hidden but present." Deferring both achieves the founder's intent. Trust-building paths that do not require founder identification (the substantive Privacy/Terms pages, the "Won't do" refusals, anonymized engagements, Footer regional reach, methodology section) carry meaningful Trust without any individual identification.
**Implementation status**: Won't do (this cycle)
**Owner**: Hamza Chundrigar (decides re-entry)
**Implementation notes for Codex**: No work item this cycle. When re-entering, ship a firm-led `/about` (not founder-bio-led) that describes principles, contractor/bench model, engagement structure, and refusals. Defer founder identification in both the visible page and JSON-LD schema until the founder explicitly approves identity exposure.

### [EEAT-02] Schema-precise vs Footer-vague NAP drift

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 387–391
**Original recommendation**: Pick one canonical NAP and align. Either reveal the full street address in the footer or generalize the schema.
**Founder feedback**: Reveal the full street address in the footer (Option B). 400 Slater St. is the legitimate official registered address.
**Decision**: Accepted (Option B)
**Rationale**: NAP unification across all surfaces (footer, schema, privacy/terms pages). Trust signal for buyers who care about jurisdiction. Founder confirmed address is the registered office.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/components/sections/Footer.tsx`
- Current legal line (around line 81): `"North Lantern Group Inc. · Ontario, Canada · ..."`
- Change to: `"North Lantern Group Inc. · 400 Slater St., Ottawa, ON K1R 7S7 · ..."`
- Keep the rest of the legal line (privacy link, terms link, privacy email, copyright) intact. Only the location portion changes.
- The schema-side address in `src/app/layout.tsx` lines 73–80 stays unchanged at `400 Slater St., Ottawa, ON K1R 7S7`.
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -c "400 Slater St."` returns at least 2 (footer + schema).
  - All three surfaces (footer, schema, privacy page, terms page) use identical street-address phrasing.

### [EEAT-03] No first-hand experience signals beyond "Won't do" refusals

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 399–403
**Original recommendation**: Drop "trusted by teams" framing until anonymized engagement summaries with verifiable scope and duration ship.
**Founder feedback**: Accept the audit's stance. With `ACTION-01` (anonymize testimonials, ship SSR-emit fix), the section's signal becomes defensible.
**Decision**: Accepted
**Rationale**: The anonymized engagements section (post-`ACTION-01`) carries the Experience signal honestly. The "Won't do" refusals in `Practices.tsx` carry it concretely. Privacy/Terms pages carry additional Trust signal. No further work required this cycle.
**Implementation status**: Done (no code change beyond `ACTION-01`)
**Implementation notes for Codex**: No additional work item.

---

## PERF findings (Performance and Render Pipeline)

### [PERF-01] First Load JS for `/` is 267 kB

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 407–411
**Original recommendation**: Convert `Contact` to `next/dynamic({ ssr: false })` so its heavy deps load only when the form is needed.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: web.dev's mobile guidance puts the comfortable First Load JS budget at ~170 kB compressed; current `/` ships 267 kB. The Contact form's react-phone-number-input, libphonenumber-js, and react-google-recaptcha-v3 imports land in the homepage hydration bundle even though the form sits below the fold. Lazy-loading them via dynamic import shaves an estimated 30 to 60 kB compressed off the homepage's First Load JS without changing functionality.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/page.tsx`
- Replace the static import of `Contact` at line 10 with a dynamic import:
  ```ts
  import dynamic from "next/dynamic";
  const Contact = dynamic(() => import("@/components/sections/Contact"), {
    ssr: false,
    loading: () => <section id="contact" className="nlg-contact" />,
  });
  ```
- The `loading` placeholder reserves layout space to prevent CLS during hydration.
- Alternative: gate the dynamic import behind an `IntersectionObserver` so the Contact form only loads when scrolled into view. Codex may choose either approach; the simpler `ssr: false` works for the immediate bundle-size goal.
- Validation:
  - `next build` log shows `/` First Load JS below 240 kB (target: ~210 kB; measure and report).
  - The Contact form still functions when scrolled into view.
  - No CLS regression on the section (verify with Lighthouse).

### [PERF-02] Dead deps `cobe` and `framer-motion`

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 413–416
**Original recommendation**: Run `grep -rIn "cobe\|framer-motion" src/`; if unused, uninstall.
**Founder feedback**: Make the call yourself.
**Decision**: Accepted (with verified call: REMOVE BOTH)
**Rationale**: Direct verification shows zero usages in `src/` for either dependency:
- `grep -rIn "cobe" src/` returns zero matches.
- `grep -rIn "framer-motion" src/` returns zero matches.
Both are declared in `package.json` (cobe ^2.0.1, framer-motion ^12.38.0) but never imported. Combined estimated bundle savings: ~60–70 kB compressed. Significant for the 267 kB First Load JS budget.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- Run from the repo root:
  ```bash
  npm uninstall cobe framer-motion
  ```
- Verify `package.json` no longer contains either entry.
- Verify `package-lock.json` is updated.
- Run `npm run build`.
- Validation:
  - `next build` exits 0.
  - `package.json` does not list `cobe` or `framer-motion`.
  - First Load JS for `/` drops by ~60 kB compressed compared to pre-removal baseline (267 kB measured pre-removal; expect ~200–210 kB after `PERF-01` and `PERF-02` combined).
  - No TypeScript errors reference the removed modules.

### [PERF-03] No preconnect to reCAPTCHA origins

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 418–428
**Original recommendation**: Add `<link rel="preconnect">` for `www.google.com` and `www.gstatic.com` in the layout's `<head>`.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: When `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set, the contact form injects the reCAPTCHA v3 script. Preconnecting to its origins shaves ~100–200 ms off the first-form-interaction handshake.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- File: `src/app/layout.tsx`
- Add explicit `<link rel="preconnect">` tags inside the `<head>`. Next.js does not have a built-in metadata key for preconnect; the cleanest approach is to render them directly inside the layout's returned JSX, just before `{children}` in the `<body>`, using the `next/script` pattern is not appropriate (those are scripts, not links).
- The cleanest approach is to use a custom `<head>` element via the Next.js head conventions or directly inject in `RootLayout` return:
  ```tsx
  return (
    <html lang="en-CA" className={...}>
      <head>
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-nlg-bg-0 text-nlg-fg-1">
        ...existing children...
      </body>
    </html>
  );
  ```
- Note: Next.js App Router allows raw `<head>` elements inside the root layout's returned JSX. Verify this approach against the current Next.js version (15.5.15).
- Validation:
  - `curl -sSL https://www.northlanterngroup.com/ | grep -E '<link rel="preconnect"[^>]*google\.com'` returns the preconnect link.
  - `curl -sSL https://www.northlanterngroup.com/ | grep -E '<link rel="preconnect"[^>]*gstatic\.com'` returns the preconnect link.

### [PERF-04] npm audit reports 2 moderate vulnerabilities

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 430–434
**Original recommendation**: Wait for the next minor `next` bump. Do not force-resolve.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: The postcss <8.5.10 XSS is transitive through Next.js bundled tooling. Real-world exploit path is build-time CSS stringification, not runtime user-controlled CSS. Low real impact for a static marketing site. Force-resolving via `npm audit fix --force` would downgrade Next.js, which is unacceptable.
**Implementation status**: Not started (passive — wait for upstream)
**Owner**: Codex for execution (monitor)
**Implementation notes for Codex**:
- No immediate code change.
- Monitor: when `next` releases a minor or patch version that bumps its internal `postcss` to ≥8.5.10, run `npm update next` and verify `npm audit` reports zero remaining moderates.
- If three months pass without an upstream bump, escalate to founder for direction.

### [PERF-05] Stale browserslist and baseline-browser-mapping

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 436–439
**Original recommendation**: Run `npx update-browserslist-db@latest` and `npm i -D baseline-browser-mapping@latest`.
**Founder feedback**: Accept default.
**Decision**: Accepted
**Rationale**: Build hygiene only. Resolves the build-log warnings.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- Run from repo root:
  ```bash
  npx update-browserslist-db@latest
  npm i -D baseline-browser-mapping@latest
  ```
- Commit the updated `package.json` and `package-lock.json`.
- Validation:
  - `next build` log no longer shows "Browserslist: browsers data (caniuse-lite) is X months old" warning.
  - `next build` log no longer shows "[baseline-browser-mapping] The data in this module is over two months old" warning.

---

## DRIFT findings (Repo-vs-Production Drift)

### [DRIFT-01] Stale local branches

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 443–447
**Original recommendation**: Complete the SEO work, merge under WEB-33, delete the stale branch after merge.
**Founder feedback**: Make the call yourself.
**Decision**: Accepted (with verified call)
**Verified state**:
- Seven local-only branches (no remote tracking).
- Six of them have ZERO unique commits vs `main`: `codex/wave-1-copy-v2-motion-upgrade`, `codex/wave-1-credibility-containment`, `dev`, `feature/WEB-32-github-jira-docs`, `feature/WEB-34-docs-update`, `feature/WEB-34-montserrat-font`. These are safe to delete; they carry no work that is not already in `main`.
- One branch has two unique commits vs `main`: `feature/WEB-54-harden-contact-form` carries `6f7cbc7 WEB-54 Allow real reCAPTCHA token length` and `054da87 WEB-54 Harden contact form abuse controls`. The current branch (`feature/WEB-33-landing-page-clarity`) contains commit `8a43983 WEB-54: Harden /api/contact against abuse` which is likely a squash-merge of the same work. Verification required before deletion (compare diffs, not just commit SHAs).
- The current branch (`feature/WEB-33-landing-page-clarity`) holds the audit commit `8aa08f7`; keep until the audit lands in `main`.
- `main` stays.
**Rationale**: Cleanup hygiene. Reduces local repo noise. The six branches with no unique work are safe to delete unconditionally. The seventh requires a one-step verification.
**Implementation status**: Not started
**Owner**: Codex for execution
**Implementation notes for Codex**:
- Run from the website repo (not the worktree):
  ```bash
  git branch -d codex/wave-1-copy-v2-motion-upgrade
  git branch -d codex/wave-1-credibility-containment
  git branch -d dev
  git branch -d feature/WEB-32-github-jira-docs
  git branch -d feature/WEB-34-docs-update
  git branch -d feature/WEB-34-montserrat-font
  ```
- These six should delete cleanly with `git branch -d` (only-if-merged) because their tree state matches `main`.
- For `feature/WEB-54-harden-contact-form`:
  ```bash
  git diff main..feature/WEB-54-harden-contact-form
  ```
  - If the diff is empty (work is squash-merged into main), run `git branch -D feature/WEB-54-harden-contact-form`.
  - If the diff is NOT empty, escalate to founder. Do NOT delete.
- Validation:
  - `git branch | wc -l` shows three branches: current branch (whatever name it has at that point), `main`, and possibly `feature/WEB-54-harden-contact-form` if not yet deleted.

### [DRIFT-02] Vercel cache age ~11.25 days

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 449–453
**Original recommendation**: No action; observation only.
**Founder feedback**: Accept default.
**Decision**: Accepted (observation only)
**Rationale**: Will refresh automatically on the next deploy. Not a defect.
**Implementation status**: Resolves automatically on next deploy.

### [DRIFT-03] Conditional X-Robots-Tag fragility

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 455–458
**Decision**: Resolved (via `INDEX-05`).
**Implementation notes for Codex**: See `INDEX-05`.

---

## Audit's open Decision Register items

### [DECISION-01] Single-page vs lane URLs

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 500
**Decision**: Deferred (via `ARCH-01`).

### [DECISION-02] Plural-team copy reframe

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 501
**Decision**: Rejected (via `BRAND-04`, premise invalidated by `CONTEXT-CORRECTION-01`).

### [DECISION-03] priceRange in JSON-LD

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 502
**Decision**: Rejected (omit `priceRange`)
**Rationale**: Locked context bars published pricing floor. A `"$$"` placeholder leaks a positioning signal NLG has not authorized.
**Implementation notes for Codex**: Do NOT add `priceRange` to the JSON-LD `ProfessionalService` block. Confirmed in `ACTION-05` implementation spec.

### [DECISION-04] Founder-bylined /about vs anonymous-firm framing

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 503
**Decision**: Deferred (via `EEAT-01`). When re-entering, ship firm-led, not founder-led.

### [DECISION-05] OG image runtime edge vs Node default

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 504
**Decision**: Accepted (Node default, via `SCHEMA-04`).

### [DECISION-06] Title-tag exact wording

**Source**: `docs/audits/seo-audit-2026-05-08.md` lines 505
**Decision**: Resolved (via `ACTION-02`).

---

# Testimonials anonymization plan

This section is the row-level implementation contract for `ACTION-01`, `BRAND-01`, and `BRAND-03`. Codex should read this plan together with the implementation notes inside `ACTION-01` above.

## Final per-row state

| Row | Title (kept verbatim) | Attribution (new field, sentence case) | Practice tag | outcomeMetric (verbatim KEEP) | fullQuote treatment |
|---|---|---|---|---|---|
| 0 | Director of IT Operations | North American managed services provider | `ATLASSIAN SYSTEMS` | EIGHT YEARS OF DEBT, CLEARED IN FOURTEEN WEEKS. | KEEP verbatim |
| 1 | COO | Mid-market professional services firm | `REPORTING AND KNOWLEDGE` | DOCUMENTATION PEOPLE USE | KEEP verbatim |
| 2 | VP Technology Operations | Multi-tenant managed services provider | `GOVERNED DELIVERY` (documented exception, kept verbatim per founder direction) | ACCESS GOVERNANCE MODEL, FINALLY UNDER CONTROL. | KEEP verbatim |
| 3 | Director of Customer Operations | B2B SaaS company | `ATLASSIAN SYSTEMS` | 3X FASTER RESOLUTION TIMES | KEEP verbatim (including "Atlassian solution providers" phrase) |
| 4 | CFO | Mid-market operations and services firm | `REPORTING AND KNOWLEDGE` | CLEAR NUMBERS. BETTER DECISIONS. | KEEP verbatim |
| 5 | President | Lean B2B services firm | `GOVERNED DELIVERY` (exception) | CLEAR SCOPE. STRAIGHT ANSWERS. | KEEP verbatim |
| 6 | IT Director | Mid-market services organization | `AUTOMATION AND OPERATING RHYTHM` | INTEGRATIONS THAT KEEP RUNNING | KEEP verbatim |
| 7 | Head of Operations | Regulated financial-services firm | `GOVERNED DELIVERY` (exception) | PASSED COMPLIANCE REVIEW | KEEP verbatim. "She" pronoun in the credit sentence stays per `CONTEXT-CORRECTION-01` (contractor/bench reality). |
| 8 | VP Engineering | B2B software company | `AUTOMATION AND OPERATING RHYTHM` | LESS FRICTION, FASTER TEAMS | KEEP verbatim |
| 9 | Senior Director of Engineering Systems | Enterprise software company | `ATLASSIAN SYSTEMS` | ATLASSIAN WORK THAT LASTS | KEEP verbatim (including "primary consulting partner" and 44-week and three-engagements framing) |
| 10 | CIO | Mid-market enterprise services firm | `REPORTING AND KNOWLEDGE` | BUILT AROUND HOW WE ACTUALLY WORK | KEEP verbatim |

## Methodology note (insert at top of section)

Insert this copy as a small text element at the top of the Testimonials section, above or beside the status-bar reframe. Suggested element: a `<p>` styled as a small caption or eyebrow.

> Names and identifying details are anonymized at clients' request. Engagement details available under NDA on request.

## Status bar reframe

Change the existing status-bar line in `Testimonials.tsx` at line 534 from:

> 11 CLIENT TESTIMONIALS // 4 SERVICE AREAS // POST-HANDOVER RESULTS

To:

> Engagements across Atlassian, BI, and automation.

## TypeScript type changes

`Attestation` type in `Testimonials.tsx` lines 11–24:

```ts
// Old
type Attestation = {
  id: string;
  name: string;          // REMOVE
  title: string;
  initials: string;      // REMOVE
  practiceArea: PracticeArea;
  pullQuote: string;
  outcomeMetric: string;
  metricSingleLine?: boolean;
  fullQuote: string;
  engagementType: string;
  durationWeeks: number;
  monthsPostHandover: number;
};

// New
type Attestation = {
  id: string;
  attribution: string;   // NEW: holds the sector descriptor
  title: string;
  practiceArea: PracticeArea;
  pullQuote: string;
  outcomeMetric: string;
  metricSingleLine?: boolean;
  fullQuote: string;
  engagementType: string;
  durationWeeks: number;
  monthsPostHandover: number;
};
```

Update every reference to `name` or `initials` in JSX downstream to use `attribution` instead. The visible byline pattern in the rendered carousel should now read something like `{attribution} • {title}` (or stylistically equivalent).

## SSR-emit fix (BRAND-03)

The current pattern at `Testimonials.tsx` line 561 uses `nlg-sr-only` for the displayed attestation only. Replace with a server-rendered block containing all 11 `fullQuote` strings.

Recommended pattern: render a hidden `<div aria-hidden="true" className="nlg-sr-only">` (or equivalent visually-hidden styling) at the top of the section that iterates over all `ATTESTATIONS` and emits each `fullQuote` as a separate paragraph. The visible carousel can continue to read from `displayIndex` for interactive UI; the hidden block exists purely for crawlability.

Pseudocode:

```tsx
{ATTESTATIONS.map((a) => (
  <p key={`ssr-${a.id}`} className="nlg-sr-only" aria-hidden="true">
    {a.fullQuote}
  </p>
))}
```

Place this block early in the section so all 11 quotes appear in SSR HTML before any client-state-dependent rendering.

---

# Header navigation plan

This section is the implementation contract for `ARCH-02` (and bundles the locked decisions 8, 8a, 8b, 8c).

## Final header shape

`Practices` (with sub-menu) | `Engagements` | `Process` | `About` | `Book a call`

## Per-item changes

| Item | Current | New | Anchor / link |
|---|---|---|---|
| Practices | "Practices" | "Practices" with hover/click sub-menu | sub-menu items: Atlassian Platform → `#atlassian`, BI and Analytics → `#bi`, Automation and Integration → `#automation`. "Practices" itself still scrolls to `#practices`. |
| Engagements | "Work" (was anchored to `#work`) | "Engagements" | Anchored to the renamed section anchor `#engagements` (rename the anchor too; see below) |
| Process | "How we work" (was anchored to `#how-we-work`) | "Process" | Anchored to the renamed section anchor `#process` (rename the anchor too) |
| About | "About" | "About" | Anchored to `#belief` (unchanged) |
| Book a call (CTA) | `Book a call` button (filled) | `Book a call` button (filled) — solo CTA | External link to `BOOKING_URL` from `src/config/site.ts` (unchanged) |
| Contact (button) | `Contact` button (currently anchored to `#contact`) | REMOVED from header. Contact form stays reachable via Practices card CTAs, Hero secondary button, and Footer link. | n/a |
| Insights | — | DEFERRED. Add this item later when the first essay ships at a real URL. | n/a |

## Anchor renames

Rename two section anchors so the URL hash matches the new nav labels:

- `#work` → `#engagements` (Testimonials section). Update the `id` attribute on the `<section>` in `Testimonials.tsx` (currently `id="work"` at line 525 area) to `id="engagements"`. Update the Footer "Firm" column link from `href="#work"` to `href="#engagements"`. Verify no other anchor references to `#work` exist; if any, update them.
- `#how-we-work` → `#process` (HowWeWork section). Update the `id` attribute on the `<section>` in `HowWeWork.tsx` (currently `id="how-we-work"` at line 125 area) to `id="process"`. Update the Footer "Firm" column link from `href="#how-we-work"` to `href="#process"`. Verify no other anchor references.

## File-level changes

### `src/components/layout/Header.tsx`

- Remove the `Contact` button from the desktop nav area. The current code has both a "Contact" ghost button and a "Book a call" primary button inside `<div className="nlg-nav-right">`. Remove the Contact one; keep Book a call.
- Update the primary nav `<ul>` (currently around lines 28–39):
  - Change `<a href="#work">Work</a>` to `<a href="#engagements">Engagements</a>`.
  - Change `<a href="#how-we-work">How we work</a>` to `<a href="#process">Process</a>`.
  - The "Practices" item stays at `<a href="#practices">Practices</a>` but becomes the parent of a sub-menu (see below).
  - "About" stays at `<a href="#belief">About</a>` (unchanged).
- Add a Practices sub-menu:
  - On desktop: a hover (or click) dropdown that appears below the "Practices" link. Three items: "Atlassian Platform" → `#atlassian`, "BI and Analytics" → `#bi`, "Automation and Integration" → `#automation`.
  - On mobile: when the mobile menu opens, "Practices" expands inline to show the three sub-items underneath, indented.
- Mobile menu also drops the Contact button. Keep only the four nav items, sub-menu under Practices, and the Book a call CTA at the bottom.

### `src/components/sections/Testimonials.tsx`

- Change `id="work"` on the section's outer `<section>` element to `id="engagements"`.

### `src/components/sections/HowWeWork.tsx`

- Change `id="how-we-work"` on the section's outer `<section>` element to `id="process"`.

### `src/components/sections/Footer.tsx`

- Update the "Firm" column links:
  - Change `<a href="#work">Work</a>` to `<a href="#engagements">Engagements</a>`.
  - Change `<a href="#how-we-work">How we work</a>` to `<a href="#process">Process</a>`.
- "Practices" footer column items stay at `#atlassian`, `#bi`, `#automation` (unchanged).
- Remove the "Field notes" column entirely (see `ARCH-03` / `CONTENT-06`).

### Validation

- `curl -sSL https://www.northlanterngroup.com/ | grep -oE 'href="#(work|how-we-work)"'` returns zero matches.
- `curl -sSL https://www.northlanterngroup.com/ | grep -c 'id="engagements"'` returns at least 1.
- `curl -sSL https://www.northlanterngroup.com/ | grep -c 'id="process"'` returns at least 1.
- The header DOM contains exactly one CTA button ("Book a call") on the right.
- Desktop nav shows: Practices, Engagements, Process, About (in that order, left to right).
- The Practices hover sub-menu opens and contains three working links.

---

# Open process items

Items that are not copy or schema decisions but are process gaps surfaced during the intake.

1. **Documented consent for testimonial publication** — Founder explicitly dropped this from intake scope. Recorded once here per the protocol's no-softening rule: anonymization without documented client consent does not eliminate PIPEDA Principle 4.3 exposure if the underlying data was originally collected with clients identifiable. Not a code change; flagged for the founder's awareness only. No further action.

2. **Operational leak points for founder identity (audit-adjacent)** — Not part of this audit's scope, but flagged during intake of `EEAT-01` because the founder requested that face and name stay off public surfaces while concurrently employed elsewhere. Items worth verifying separately:
   - `cal.com/northlanterngroup/book-a-call` — verify what a stranger sees on the public booking page (name, headshot).
   - `whois` record for `northlanterngroup.com` — verify domain privacy is enabled at the registrar; without it, the registered owner's name, address, and phone are publicly visible.
   - LinkedIn company page admin information — verify what is publicly visible vs admin-only.
   - Email signature on replies from `hello@northlanterngroup.com` — verify the reply signature does not include the founder's name if the goal is name-off-public-surfaces.
   None of these are code changes. Founder follow-up only.

3. **Future re-entry on deferred items** — Track the following deferred items and their re-entry triggers in this register or a successor:
   - `EEAT-01` /about page + founder identification — trigger: founder approves identity exposure OR contractor/bench page replaces founder-led framing.
   - `ARCH-01` lane-page split — trigger: first three real engagements close, sufficient per-lane content exists.
   - Insights nav item — trigger: first real essay ships at a real URL.
   - `CONTENT-06` Writing section restoration — same trigger as Insights.
   - `ARCH-03` Footer "Field notes" column restoration — same trigger.

---

# Conflicts with locked context

`CONTEXT-CORRECTION-01` is a correction of the locked context input rather than an override, so it is not technically a conflict. It is recorded here for traceability anyway.

**`CONTEXT-CORRECTION-01`**: The audit's "founded and currently sole-staffed by Hamza Chundrigar" framing was based on an inaccurate input. NLG mobilizes contractor and bench resources as engagements require. This affects:
- `BRAND-01` rationale: anonymization is for client confidentiality, not fabrication remediation.
- `BRAND-04`: Rejected; plural-team framing is accurate.
- Row 7 of the testimonials: the "She" pronoun referring to the project lead stays verbatim because it refers to a real contractor.

No locked-context override decisions were taken; all decisions either accept the locked context or fall outside its scope. The `BRAND-02` Deloitte name-drop is the only Critical finding the founder rejected; the residual risk is recorded in the `BRAND-02` entry above, and the decision falls outside locked context (which does not bar named-competitor disparagement).

---

# Decision provenance

This decisions register was populated during a single intake session on 2026-05-08 to 2026-05-09 between Hamza Chundrigar and Claude (Anthropic, model 4.7 1M-context, sonnet tier, ultrathink mode). The intake spanned five phases:

- Phase 0: Acquisition of repo state, audit file at commit `8aa08f7`, and full read of `Testimonials.tsx`.
- Phase 1: Finding-ID stamping plan for all 42 findings in the audit. Accepted as proposed.
- Phase 2: Testimonials intake — five blocks (sector descriptors, outcome metric disposition, company-identifying phrasing scan, counts, consent) plus a casing-format follow-up that locked sentence-case sector descriptors. Locked per-row state in this document's "Testimonials anonymization plan" section.
- Phase 3: Remaining findings intake spanning 30+ findings, 6 audit Decision Register items, and 3 direct calls (INDEX-07, PERF-02, DRIFT-01) made by Claude under founder direction with full investigation and parallel-agent research. Final decisions locked.
- Phase 4: Decisions doc generation (this file).
- Phase 5: ID-stamping the audit additively and atomic commit.

The intake used parallel research subagents at multiple points:
- Original audit Stage 1 used seven parallel specialist agents (on-page content, technical indexability, structured data, internal architecture, E-E-A-T, performance, repo-vs-production drift).
- Title tag decision used three parallel agents (keyword research, title-tag best practices 2026, competitor inventory).
- Meta description decision used two parallel agents (competitor meta description harvesting, B2B meta best practices).
- Header navigation rename decision used five parallel agents (deep competitor inventory, pre-traction positioning, UX/IA research, SEO research, NLG brand voice synthesis).
- INDEX-07 (apple-touch-icon / manifest / theme-color) used one focused agent on 2026 PWA manifest best practices.

All research outputs cited authoritative sources where possible (Google Search Central, Backlinko 2025 4M-result update, Zyppy title-rewrite study, Nielsen Norman Group, Wynter, Gartner, web.dev, Next.js docs, schema.org). Quantitative claims trace to those sources; subjective recommendations are flagged in the original audit and the Decisions Register entries above.

The founder explicitly directed that the implementation work itself will be handed to Codex (a competing code-generation agent) after this document is complete. Implementation must therefore be possible from this document alone, without further founder input. Codex should treat any ambiguity as an escalation trigger back to the founder, not a license to improvise outside the spec.
