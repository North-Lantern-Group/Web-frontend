---
title: North Lantern Group website MVP launch plan
owner: Principal Web Strategist, Information Architect, and Staff Engineer
status: draft-v1
created: 2026-04-24
source_audit_references:
  - Initial eight-layer website audit by Claude, covering positioning, copy, UI, conversion, technical, SEO, brand, and resilience findings.
  - Codex repo and live-site verification pass on 2026-04-24, covering source files, build behavior, npm audit output, live HTML, robots, sitemap, and brand assets.
chosen_output_path: docs/plans/website-mvp-plan.md
chosen_output_path_rationale: The repo already stores operating documents under docs/, and docs/plans/ keeps this launch plan beside existing infrastructure, copy, and brand notes without mixing it into source code.
---

# Executive Summary

The MVP enforces one decision: North Lantern Group stops presenting as a broad services shop and launches as a focused Canadian firm that fixes and extends Atlassian systems, reporting, and the integration layer between tools for teams that have outgrown the setup they already use. Everything else follows from that. The current site does not fail because the stack is weak. It fails because the live site carries claims the firm cannot defend tomorrow: Oracle services NLG does not sell, public metrics without proof, testimonial cards that read fabricated, dead links, thin metadata, and a lead path that routes to a personal Gmail.

This plan uses a credibility containment frame. Wave 1 removes every claim, link, dependency, and build behavior that can create buyer doubt before the buyer speaks to Hamza. The site gets safer before it gets more persuasive. Wave 2 rebuilds the homepage around the locked three-lane architecture: Atlassian Systems, BI and Operational Reporting, and Automation and Integration. Wave 3 adds proof only after it exists, through founder-level credibility, real names, LinkedIn links, and anonymized case studies that can survive a sales call.

Live-ready means the production site builds without production secrets, ships no fabricated proof, has no Oracle references, routes leads only to company-owned infrastructure, exposes real metadata, blocks non-production indexing, links only to real routes, and gives a qualified buyer a clear reason to book a scoping call. The MVP is not a new brand system, CMS migration, or pricing launch. It is a disciplined public reset.

# Verified State of the Repo

| Finding | Verified files and live evidence | Status |
|---|---|---|
| Oracle service appears in the Services section. NLG does not sell Oracle work. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Services.tsx:208-211` includes the Oracle service pill. `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Services.tsx:287-303` defines an Oracle gradient. `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Services.tsx:369-373` renders an Oracle diagram node. `curl -s https://www.northlanterngroup.com | rg "Oracle"` confirms production renders it. | Confirmed. Remove all Oracle references and supporting diagram code. |
| Unverified credibility metrics ship in Stats. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Stats.tsx:14-30` ships `60%`, `3x`, `92%`, and `60+`. `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/page.tsx:68` renders `<Stats />`. Production HTML includes the same values. | Confirmed. Remove the component usage from the live page. Leave no replacement metric strip until proof exists. |
| Testimonial cards read fabricated and ship in production. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Testimonials.tsx:16-160` contains nine named cards. `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/page.tsx:72` renders `<Testimonials />`. Production HTML includes `Michael Thompson`. | Confirmed. Remove the component and its usage. Do not add placeholder proof copy. |
| Contact route sends leads to a personal Gmail. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts:260-264` sends to `hamza@northlanterngroup.com`, `hello@northlanterngroup.com`, and `osaed.chundrigar@gmail.com`. | Confirmed. Replace with a company-owned alias before any CTA push. |
| Contact route constructs Resend at module import and fails a clean build without secrets. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts:5` calls `new Resend(process.env.RESEND_API_KEY)`. `npm run build` fails during page data collection with `Missing API key. Pass it to the constructor`. `RESEND_API_KEY=re_dummy npm run build` succeeds. | Confirmed. Lazy-create the Resend client inside `POST`. |
| Metadata is thin. Canonical, OG, Twitter, JSON-LD, robots, sitemap, and non-production noindex are missing. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/layout.tsx:12-23` defines title, description, keywords, and icons only. `rg --files | rg "robots|sitemap|middleware|vercel"` finds no app router metadata routes, middleware, or Vercel config. `curl -I https://www.northlanterngroup.com/robots.txt` returns `404`. `curl -I https://www.northlanterngroup.com/sitemap.xml` returns `404`. `curl -I https://web-three-sand-76.vercel.app` returns `200` with no `X-Robots-Tag`. | Confirmed. Add metadata routes, canonical, social metadata, JSON-LD, and conditional non-production noindex headers. |
| Footer ships dead links and one nonexistent section anchor. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Footer.tsx:54` links to `#approach`, which does not exist in the page. `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Footer.tsx:64-67` ships resource `href="#"` links. `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Footer.tsx:76-77` ships policy `href="#"` links. | Confirmed. Ship `/privacy`, remove dead resources, and keep only real links. |
| npm audit confirms dependency risk before cosmetic work. | `npm audit --json` reports ten total vulnerabilities: five moderate, four high, and one critical. The critical direct advisory is tied to `next`, currently declared in `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/package.json:14` as `^15.0.7`. High advisories also appear through `flatted`, `lodash`, `minimatch`, and `picomatch`. | Confirmed. Upgrade Next and clear critical and high findings before UI polish. |
| Floating theme toggle is unresolved product UI on a consulting site. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/page.tsx:47-58` renders a fixed bottom-right theme toggle. | Confirmed. MVP removes light mode and the floating toggle. Dark mode becomes the only public presentation until a tested light mode earns its place. |
| Third-party logo chips create unnecessary external dependencies. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Services.tsx:61`, `:65`, `:209`, `:390`, and `:394` render external logo assets. Existing local icons are present under `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/public/icons/`. | Confirmed. MVP removes external logo chips from service cards. Local icons stay available for later use after permission review. |
| Pricing copy avoids published prices but still uses emoji icons and soft tier language. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Pricing.tsx:22`, `:67`, and `:109` use emoji icons. The section contains no public price floor. | Confirmed. Keep numbers off the site. Rewrite the section around engagement shape and replace emojis with Lucide icons. |
| Why section carries unverified claims and generic copy. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/WhyNorthLantern.tsx:44` calls NLG a leading firm. `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/WhyNorthLantern.tsx:49-72` ships awards, support, years, project count, team size, and satisfaction claims. | Confirmed. Remove the claims and rewrite the section around founder-led scoping, senior delivery, and Canadian context. |
| Contact form copy and options no longer match the locked service architecture. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Contact.tsx:407-412` lacks the three-lane architecture and the forward-looking AI line. `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Contact.tsx:437` links privacy text to `#`. `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Contact.tsx:474` says `Request Free Consultation`. | Confirmed. Align options to the three lanes, link `/privacy`, and change the submit language. |

# Locked Scope

## In scope

- Remove every unprovable production claim from `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/page.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Stats.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Testimonials.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/WhyNorthLantern.tsx`, and `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Services.tsx`.
- Rebuild the homepage around three lanes: Atlassian Systems, BI and Operational Reporting, Automation and Integration.
- Ship `/privacy`, `robots.ts`, `sitemap.ts`, canonical metadata, OG metadata, Twitter metadata, JSON-LD, and non-production noindex headers.
- Fix the clean-build failure in `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts`.
- Upgrade Next and clear critical and high npm audit findings before cosmetic UI work.
- Move lead routing to a company-owned alias and add durable lead persistence.
- Install analytics and track one conversion event.
- Remove the floating theme toggle for MVP.
- Remove third-party logo chips from MVP service cards.
- Add real founder or team proof only where names and links can be verified.

## Out of scope

| Item | Reason | Trigger condition |
|---|---|---|
| Public partner-tier claim | NLG's listing is not verified in the Atlassian Partner Directory. | Founder provides a live directory URL that names NLG and the current tier. |
| Captur public launch | The app informs credibility, but Marketplace readiness is not confirmed. | Founder approves Marketplace readiness and supplies app page, screenshots, privacy terms, and support path. |
| Public pricing floor or rate card | Delivery economics and lead quality are not yet measured for this site. | Founder completes delivery-cost capture and reviews qualified lead quality after the first live MVP cycle. |
| Client logos and named testimonials | Current public proof cannot be defended. | A client signs written approval for logo, name, title, quote, and scope. |
| Full CMS migration | The current Next app can ship the MVP without adding content infrastructure. | The site reaches a content cadence that makes PR-based edits too slow. |
| Broad cloud-only service pages | NLG's confirmed cloud work is Atlassian Cloud transition, not general cloud programs. | NLG holds cloud certifications and has cloud-only case studies. |
| Full design system rebuild | The immediate failure is trust, not component architecture. | Repeated MVP edits expose shared styling debt that slows delivery. |

# Wave Plan

## Wave 1: Credibility containment (week 1)

| ID | Task | Files | Acceptance Criteria | Verification | Owner | Effort | Dependencies |
|---|---|---|---|---|---|---|---|
| W1-01 | Remove Oracle from the Services section. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Services.tsx` | No Oracle copy, image source, gradient, node, or arrow remains in source or production HTML. | `rg -n "Oracle|oracle" src public` returns no matches. `curl -s https://www.northlanterngroup.com | rg "Oracle|oracle"` returns no matches after deploy. | Codex | XS | None |
| W1-02 | Remove Stats from the live page. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/page.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Stats.tsx` | `<Stats />` is not rendered. No replacement metric strip ships. | `rg -n "60%|3x|92%|60\\+|Faster Delivery|Team Efficiency|Client Satisfaction|Implementations" src` returns no public copy matches. | Codex | XS | None |
| W1-03 | Remove Testimonials from the live page and delete the component from the public flow. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/page.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Testimonials.tsx` | No testimonial section, placeholder proof, fabricated names, quote cards, or "client stories in progress" copy ships. | `rg -n "Testimonials|Michael Thompson|Emma Johnson|James Anderson|Sarah Williams|David Chen|Maria Garcia|Robert Kim|Lisa Mueller|Ahmed Hassan|client stories in progress" src` returns no public copy matches. | Codex | XS | None |
| W1-04 | Strip unverified claims from Why. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/WhyNorthLantern.tsx` | Awards, support, years, project count, team size, satisfaction claims, and "leading" language are gone. | `rg -n "Global Awards|24/7|Years Exp|60\\+|25\\+|92%|leading professional services" src/components/sections/WhyNorthLantern.tsx` returns no matches. | Codex | XS | W1-02 |
| W1-05 | Fix Resend lazy initialization so the app builds without secrets. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts` | Resend is constructed only inside `POST` after `RESEND_API_KEY` is checked. Missing key returns a controlled server error at request time, not build time. | `env -u RESEND_API_KEY npm run build` succeeds. `rg -n "new Resend\\(process.env.RESEND_API_KEY\\)" src/app/api/contact/route.ts` returns no matches. | Codex | S | None |
| W1-06 | Resolve critical and high npm audit findings. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/package.json`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/package-lock.json` | `next` is upgraded to a patched version. Critical and high advisories are gone. The app still builds and lints. | `npm audit --audit-level=high` exits clean. `npm run build` succeeds. `npm run lint` succeeds or reports existing warnings only. | Codex | M | None |
| W1-07 | Move lead destination off personal Gmail. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts` | Recipient array contains only `leads@northlanterngroup.com`. Personal Gmail does not appear anywhere in the route. | `rg -n "gmail.com|osaed.chundrigar" src/app/api/contact/route.ts` returns no matches. Test submission lands in `leads@northlanterngroup.com`. | Codex | XS | Google Group created |
| W1-08 | Ship real `/privacy` page and link it from Contact and Footer. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/privacy/page.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Contact.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Footer.tsx` | `/privacy` returns 200. It names `North Lantern Group Inc.` and the full registered office address. Contact privacy text links to `/privacy`. Footer has a real privacy link and no policy `#` links. | `npm run build` succeeds. `curl -I http://localhost:3000/privacy` returns 200 during local verification. `rg -n "North Lantern Group Inc.|400 Slater St.|href=\"#\"" src/app/privacy/page.tsx src/components/sections/Contact.tsx src/components/sections/Footer.tsx` confirms address copy and no dead links. | Codex, Founder | S | Founder legal input received |
| W1-09 | Replace thin metadata and ship discovery files. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/layout.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/robots.ts`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/sitemap.ts` | Canonical, OG, Twitter, JSON-LD, robots, and sitemap ship. Metadata uses no partner-tier claim and no unproved metrics. | `curl -s http://localhost:3000 | rg "canonical|og:title|twitter:card|application/ld\\+json"`. `curl -s http://localhost:3000/robots.txt`. `curl -s http://localhost:3000/sitemap.xml`. | Codex | S | Privacy route for sitemap entry |
| W1-10 | Add non-production noindex headers. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/next.config.ts` | Non-production deployments send `X-Robots-Tag: noindex, nofollow`. Production does not send that header by default. | `VERCEL_ENV=preview npm run build` succeeds. Preview curl after deploy shows `X-Robots-Tag`. Production curl does not show it. | Codex | S | None |
| W1-11 | Remove footer dead resources and nonexistent anchors. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Footer.tsx` | Footer links only to shipped routes or real in-page anchors. Resource column is removed until real resource routes exist. | `rg -n "href=\"#\"|#approach|Resources" src/components/sections/Footer.tsx` returns no dead link matches. Manual click check reaches every footer destination. | Codex | XS | W1-08 |

## Wave 2: Positioning rebuild (weeks 2-4)

| ID | Task | Files | Acceptance Criteria | Verification | Owner | Effort | Dependencies |
|---|---|---|---|---|---|---|---|
| W2-01 | Rewrite Hero around the locked badge, H1, subhead, and CTAs. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Hero.tsx` | Badge says `Atlassian consulting · Canada`. H1 and subhead match the locked hero block in this plan. Primary CTA points to `#contact`. Secondary CTA points to `#services`. | `rg -n "Atlassian consulting · Canada|We rebuild the Atlassian stack your team has outgrown|And the reporting layer on top|Book a scoping call|How we work" src/components/sections/Hero.tsx`. Manual click check lands on correct sections. | Codex | S | Wave 1 complete |
| W2-02 | Rewrite About around founder-led scoping and senior delivery. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/About.tsx` | Copy names broken Jira, Confluence, reporting, founder-led scoping, and senior delivery. It contains no unproved stats or partner-tier claim. | `rg -n "partner-tier|60|92|award|junior|generic consulting" src/components/sections/About.tsx` returns no matches except allowed context if present in comments. | Codex | S | W2-01 |
| W2-03 | Rebuild Services as three lanes. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Services.tsx` | Services show only Atlassian Systems, BI and Operational Reporting, and Automation and Integration. Atlassian Cloud transition sits inside Atlassian Systems. AI-assisted internal tooling sits inside Automation and Integration. Cloud is not a standalone lane. | `rg -n "Cloud Migrations|Oracle|five capabilities|partner-tier|Adoption[[:space:]]+and[[:space:]]+Automation|Workflow[[:space:]]+Automation" src/components/sections/Services.tsx` returns no matches. Manual desktop and mobile check confirms three lanes. | Codex | M | W1-01, W2-01 |
| W2-04 | Remove external logo chips from MVP service cards. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Services.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/public/icons/` | Service cards use text and Lucide icons only. No external image hosts remain in Services. Existing local icons stay untouched for later permission review. | `rg -n "https://|worldvectorlogo|wikimedia|brandfetch|cdn\\." src/components/sections/Services.tsx` returns no matches. `npm run lint` shows no new image warnings from service logos. | Codex | S | W2-03 |
| W2-05 | Rewrite Why around Canadian operating proof and a Canada-focused globe. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/WhyNorthLantern.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/Globe.tsx` | Why section contains no global proof theater and no unverified claims. It states Canada context, founder-led scoping, senior delivery, and response within one business day in Canadian working hours. The right column uses a Canada-focused globe with Canadian markers. | `rg -n "Global Awards|24/7|Years Exp|60\\+|25\\+|92%" src/components/sections/WhyNorthLantern.tsx` returns no matches. Manual visual check confirms the globe uses Canadian markers. | Codex, Founder | S | Google Group created |
| W2-06 | Rewrite Pricing around engagement shape, not public prices. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Pricing.tsx` | Section explains scoping-led project work, advisory retainers, and outcome-aligned terms without prices, floors, rates, discounts, or guarantees NLG cannot defend. Emojis are replaced with Lucide icons. | `rg -n "💻|📋|🔄|📈|\\$|CAD|rate|guarantee|Most Popular" src/components/sections/Pricing.tsx` returns no matches unless founder-approved text creates a needed non-price term. | Codex | S | Pricing decision remains locked: no public numbers |
| W2-07 | Rewrite Contact around the three lanes and remove "free consultation" language. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Contact.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts` | Dropdown maps to the three lanes and a recovery option. Submit button says `Send message` or `Request a scoping call`. Privacy links to `/privacy`. | `rg -n "Free Consultation|Request Free|href=\"#\"|Oracle|partner-tier" src/components/sections/Contact.tsx src/app/api/contact/route.ts` returns no matches. | Codex | S | W1-08, W1-07 |
| W2-08 | Remove the floating theme toggle for MVP. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/page.tsx` | The public site renders one stable dark presentation. Floating bottom-right toggle is gone. Existing dark-mode props stay only where they keep component branches stable. | `rg -n "setIsDarkMode|Sun|Moon|toggle" src/app/page.tsx src/components` returns no public toggle implementation. Manual page check shows no floating toggle. | Codex | M | Wave 1 complete |
| W2-09 | Install analytics and one conversion event. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/package.json`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/layout.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Contact.tsx` | Analytics load on production. A successful contact submission records one named conversion event. | Browser network check shows analytics request. Test submission records event in chosen analytics dashboard. `npm run build` succeeds. | Codex, Founder | S | DR-05 |
| W2-10 | Add durable lead persistence. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts`, `.env.example` | Every valid lead writes to a company-owned durable store. Email delivery and persistence are independent so one failure does not erase the other path. | Submit test lead. Confirm alias email arrives. Confirm durable row exists. Simulate persistence failure and verify email still sends. | Codex, Founder | M | DR-02 |
| W2-11 | Refresh `.env.example` and operational docs for new integrations. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/.env.example`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/docs/INFRASTRUCTURE.md` | Required env vars for contact, analytics, and persistence are documented without secrets. Ownership notes match the account map. | `rg -n "LEAD_|ANALYTICS|RESEND|ZEROBOUNCE|RECAPTCHA" .env.example docs/INFRASTRUCTURE.md` returns expected entries. | Codex, Founder | S | W2-09, W2-10 |

## Wave 3: Proof and polish (weeks 5-8)

| ID | Task | Files | Acceptance Criteria | Verification | Owner | Effort | Dependencies |
|---|---|---|---|---|---|---|---|
| W3-01 | Produce two anonymized case studies with founder-supplied facts. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/work/[slug]/page.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/work/page.tsx`, content files if added under `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/content/` | Each case study includes client category, starting problem, tools involved, work performed, decision impact, and proof status. No client name appears without written approval. | Founder fact sheet exists for each story. `npm run build` succeeds. Manual review confirms no client names, unproved metrics, or partner-tier claims. | Founder, External, Codex | L | Wave 2 live and founder fact sheets |
| W3-02 | Ship a founder or team proof section with real names and LinkedIn links. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/About.tsx` or `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/team/page.tsx` | At least Hamza appears with real role, short delivery-specific bio, and verified LinkedIn URL. No team size claim ships. | Click every LinkedIn link. `rg -n "25\\+|team of|award|partner-tier" src/app src/components` returns no proof-risk matches. | Founder, Codex | M | Founder supplies approved profile copy and URL |
| W3-03 | Decide Captur Labs disposition. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/labs/page.tsx` if approved, otherwise no public file | Captur remains absent from public nav unless founder approves a private Labs page with clear non-marketplace status. | `rg -n "Captur|TimeBridge|Labs" src app public` returns no public references unless DR-08 approves them. | Founder | S | DR-08 |
| W3-04 | Split focused SEO pages only after proof exists. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/services/atlassian-systems/page.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/services/bi-operational-reporting/page.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/services/automation-integration/page.tsx` | Service pages ship only with proof blocks from W3-01 or founder proof from W3-02. No thin duplicate pages go live. | `curl -s http://localhost:3000/sitemap.xml` includes the new routes only after page content exists. Manual review confirms each page has unique copy and one proof block. | Codex, Founder, External | L | W3-01 or W3-02 |
| W3-05 | Add a real OG image using existing brand assets. | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/public/brand/og/nlg-og-1200x630.png`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/layout.tsx` | OG image exists, matches brand assets, contains no unproved claims, and renders in link previews. | `file public/brand/og/nlg-og-1200x630.png` confirms PNG. LinkedIn Post Inspector shows image. `npm run build` succeeds. | External, Codex | S | Existing brand assets |
| W3-06 | Run mobile and desktop QA across the MVP. | All public routes | No overlapping text, broken links, console errors, missing metadata, or blank visual regions on key viewports. | Browser QA on homepage, `/privacy`, and shipped Wave 3 routes. `npm run build` and `npm run lint` pass. | Codex | M | W3 tasks complete |

# Information Architecture

| Route | Wave | Purpose | Primary CTA | Proof elements | Required copy blocks |
|---|---|---|---|---|---|
| `/` | Wave 1 and Wave 2 | Convert qualified buyers from search, referral, and direct outreach into a scoping call or message. | `Book a scoping call` to `#contact` | Founder-led scoping claim, senior delivery claim, Canada-based context, shipped case-study links only after Wave 3. | Locked hero, About, three-lane Services, Why, engagement-shape Pricing, Contact. |
| `/privacy` | Wave 1 | Give buyers and form submitters a real privacy destination before they share data. | `Contact North Lantern Group` via `#contact` or mailto if route context requires it. | Legal entity, privacy contact, tool list, retention wording approved by founder. | Collection, use, storage, access, deletion request path, cookies and analytics, security summary. |
| `/work` | Wave 3 | House anonymized case studies after proof exists. | `Book a scoping call` | Case-study cards with client category and founder-approved facts. | Work index intro, filters by lane if content volume requires it, case cards. |
| `/work/[slug]` | Wave 3 | Show buyer proof without inventing logos or named claims. | `Talk through a similar problem` | Client category, starting state, work performed, tools involved, decision impact, proof status. | Problem, constraints, what changed, what the buyer can inspect, next-step CTA. |
| `/team` | Wave 3 if the section outgrows homepage | Make senior delivery real with names and public profiles. | `Book a scoping call` | Real names, roles, headshots if available, LinkedIn links. | Founder profile, delivery principles, no junior handoff claim if defensible. |
| `/services/atlassian-systems` | Wave 3 | Target high-intent Atlassian cleanup and Cloud transition searches after proof exists. | `Book a scoping call` | Case-study link or founder proof. | Jira cleanup, Confluence cleanup, governance, administration, Cloud transition. |
| `/services/bi-operational-reporting` | Wave 3 | Target reporting and analytics buyers after proof exists. | `Book a scoping call` | Case-study link or founder proof. | Reporting problems, Power BI, Tableau, Atlassian Data Lake, leadership decision flow. |
| `/services/automation-integration` | Wave 3 | Explain cross-system integration, operational automation, and AI-assisted internal tooling as scoped engineering work. | `Scope an automation pilot` | Pilot terms, integration boundaries, no track record claims unless a shipped example exists. | Cross-system integrations, AI-assisted internal tooling, operational automation beyond Atlassian, internal tool builds, automation governance. |

# Copy Direction

## Locked hero block

Badge:

```text
Atlassian consulting · Canada
```

H1:

```text
We rebuild the Atlassian stack your team has outgrown.
```

Subhead:

```text
A Canadian consultancy for mid-market and enterprise teams. Jira, Confluence, JSM, and the BI layer that sits on them. Founder-led scoping. Senior delivery end to end.
```

Primary CTA:

```text
Book a scoping call
```

Secondary CTA:

```text
How we work
```

## Voice and tone guardrails

- Write like a practitioner who has opened the broken Jira workflow, not a consultant describing a market category.
- Name the buyer's actual problem: messy Jira, Confluence nobody trusts, reporting that produces arguments, adoption that falls apart after launch.
- Use NLG's confirmed tools only: Jira, Confluence, Jira Service Management, Power BI, Tableau, Atlassian Data Lake, n8n if founder approves it for public copy.
- Keep the edge controlled. The buyer must be able to forward the page to a CFO without explaining the tone.
- Repeat the three-lane architecture everywhere: Atlassian Systems, BI and Operational Reporting, Automation and Integration.
- Use the boundary rule in scoping and copy: if automation runs inside Atlassian and stops at the Atlassian boundary, it belongs in Atlassian Systems. If it crosses a system boundary or brings in a non-Atlassian tool, including an LLM provider, it belongs in Automation and Integration.
- Treat adoption as a delivery standard across every lane. Do not sell it as a separate product lane. Say that every engagement includes rollout, governance, and documentation work that makes the change stick.
- Do not create a fourth public lane for cloud migration.
- Use `Results that Endure.` only in reserved brand placements.

## Banned language and claims

- No partner-tier claim until NLG's directory listing is verified.
- No Oracle.
- No fabricated testimonials.
- No unproved numbers, awards, team size, years in market, satisfaction claims, implementation counts, or logo proof.
- No em dashes.
- No public pricing floor, rates, project minimum, or retainer minimum.
- No broad consulting phrases that make NLG sound like a generic firm.
- No "client stories in progress" placeholder copy.

## Permitted claim patterns

- `Founder-led scoping` is permitted if Hamza runs scoping.
- `Senior delivery` is permitted if delivery is handled by senior operators and no junior handoff occurs.
- `Canada-based` is permitted because North Lantern Group Inc. is a Canadian corporation with a registered office in Canada.
- `Atlassian consulting · Canada` is permitted because it describes the work and geography without a partner-tier claim.
- The registered office address belongs in `/privacy` and JSON-LD. Do not market the firm as Ottawa-based or Hamilton-based.
- Public service-area language may say NLG works with teams in Canada and global markets where remote delivery fits. Do not call NLG a global firm until proof exists beyond availability to serve.
- `Within one business day in Canadian working hours` is permitted because the lead Google Group now exists and the response standard has been accepted.
- `Cloud transition` is permitted inside Atlassian Systems when it refers to Atlassian Data Center to Cloud work.
- `AI-assisted internal tooling pilots` is permitted when copy makes the scope exploratory and avoids outcome claims.
- `Automation and Integration` is permitted as Lane 3 because it names cross-system work, production engineering, and operational automation without dating the category.

# Technical Remediation Plan

| Finding | File path | Current behavior | Target behavior | Proposed diff shape | Verification command | Rollback note |
|---|---|---|---|---|---|---|
| Resend build blocker | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts` | `new Resend(process.env.RESEND_API_KEY)` executes at import and breaks `npm run build` without secrets. | Build succeeds without production secrets. POST checks for the key and constructs the client inside request scope. | Remove top-level client. Add a small helper inside the route module that reads `RESEND_API_KEY`, throws a controlled error if missing, and returns a Resend instance from inside `POST`. | `env -u RESEND_API_KEY npm run build` | Revert only this route file if POST behavior regresses. Keep any package upgrades intact. |
| Critical and high audit findings | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/package.json`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/package-lock.json` | `npm audit --json` reports ten vulnerabilities, including a critical direct `next` advisory. | Critical and high advisories are cleared. Moderate advisories get tracked if they remain in transitive packages. | Upgrade `next` to a patched compatible release. Run install. Re-test React compatibility, build, lint, and contact route bundling. | `npm audit --audit-level=high && npm run build && npm run lint` | Restore package files from git if the upgrade breaks rendering, then patch via the smallest safe compatible version. |
| Metadata and canonical gap | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/layout.tsx` | Metadata has title, description, keywords, and icons only. | Metadata includes canonical, OG, Twitter, robots object, and JSON-LD using no unproved claims. Keywords meta is removed. | Replace the metadata object. Add JSON-LD in `RootLayout` for `ProfessionalService` with Canada context and the structured registered office address: `400 Slater St.`, `Ottawa`, `ON`, `K1R 7S7`, `CA`. Use existing logo asset path only if it exists. | `curl -s http://localhost:3000 | rg "canonical|og:title|twitter:card|application/ld\\+json|400 Slater St.|K1R 7S7"` | Revert metadata only if build fails. Keep robots and sitemap routes live. |
| Missing robots and sitemap | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/robots.ts`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/sitemap.ts` | Production returns 404 for both. | `/robots.txt` and `/sitemap.xml` return 200 and include homepage plus `/privacy`. | Add App Router metadata route files. Disallow `/api/`. Add sitemap host for `https://www.northlanterngroup.com`. | `curl -I http://localhost:3000/robots.txt && curl -I http://localhost:3000/sitemap.xml` | Remove route files if they break build, then ship static files as a temporary fallback. |
| Preview indexing risk | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/next.config.ts` | Vercel default URL returns 200 with production HTML and no noindex header. | Non-production Vercel deployments send `X-Robots-Tag: noindex, nofollow`. | Add `headers()` that returns the header when `process.env.VERCEL_ENV !== "production"`. Keep production header list empty. | Preview curl shows `X-Robots-Tag`. Production curl does not show it. | Remove the `headers()` addition if production receives noindex by mistake. |
| Contact recipient risk | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts` | Leads go to two company addresses plus personal Gmail. | Leads go only to `leads@northlanterngroup.com`. | Replace the recipient array with `['leads@northlanterngroup.com']`. Keep sender and reply-to behavior intact. | `rg -n "leads@northlanterngroup.com|gmail.com|osaed.chundrigar" src/app/api/contact/route.ts` | Revert only if the Google Group test fails. Do not restore personal Gmail in production. |
| Lead loss risk | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/api/contact/route.ts`, `.env.example` | Lead data exists only in email delivery. | Each valid lead writes to a company-owned durable store and sends email. One path failing does not block the other path. | Add a `persistLead()` function selected by DR-02. Use a single env var namespace. Wrap persistence and email in separate try/catch blocks and return a clear error only when both fail or validation fails. | Submit test lead and verify alias email plus durable row. Temporarily break persistence URL and verify email still sends. | Disable persistence with env config while keeping email live. |
| Analytics gap | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/package.json`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/app/layout.tsx`, `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Contact.tsx` | No analytics package or conversion event is visible in source. | Page views and one successful form submission event are visible in the chosen analytics tool. | Install the selected analytics package, mount it in layout, and send one event after contact success. Avoid tracking message body or personal data. | Production dashboard shows page view and test conversion event. `npm run build` succeeds. | Remove analytics package and component if privacy review rejects the tool. |
| External image handling | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/src/components/sections/Services.tsx` | Service cards load logos from third-party hosts and trigger lint warnings for raw image use. | MVP service cards use no external logo chips. | Remove logo chip arrays and image tags from service cards. Use Lucide icons and plain product names in copy where needed. | `rg -n "https://|worldvectorlogo|wikimedia|brandfetch|cdn\\." src/components/sections/Services.tsx` | Restore local icons only after permission review and local asset path verification. |
| Security headers | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/next.config.ts` | No custom security headers are configured. | Production sends baseline headers without breaking reCAPTCHA, Resend, or analytics. | Add HSTS, nosniff, referrer policy, permissions policy, and a conservative CSP after testing third-party scripts. Start with report-only if CSP blocks required scripts. | `curl -I http://localhost:3000` and browser console check after deploy. | Remove CSP first if any required script breaks. Keep non-CSP security headers where safe. |

# Backup and Operational Resilience

## Current backup state

- Code lives in GitHub under the website repo and can be restored by cloning `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend`.
- Public website assets under `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/public/` are versioned with the repo.
- Infrastructure notes exist in `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/docs/INFRASTRUCTURE.md`.
- Brand implementation notes exist in `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/docs/BRAND-ALIGNMENT.md`.
- Lead submissions are not durably backed up today because the route sends email only.
- Vercel environment variables are not proven to exist outside Vercel.
- Registrar, Resend, reCAPTCHA, ZeroBounce, analytics, and any future persistence provider need founder-owned credentials stored outside this repo.

## Single points of failure

- Personal Gmail in the contact route until W1-07 ships.
- Vercel env vars if they are not exported into a company-owned password vault.
- Third-party accounts listed as "to confirm" in `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/docs/INFRASTRUCTURE.md`.
- Domain renewal if Namecheap expiry and billing are not tracked in a company calendar.
- No durable lead store until W2-10 ships.
- No branch protection or CI gate is visible in repo files. Founder must confirm GitHub settings.

## Restore-from-scratch SOP

1. Open the company password vault entry named `NLG Website Production`.
2. Confirm it contains GitHub admin access, Vercel team access, Namecheap access, Google Workspace admin, Resend, reCAPTCHA, ZeroBounce, analytics, and lead persistence credentials.
3. On a clean workstation, run `git clone <repo-url>` and enter `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend` or the equivalent local path.
4. Run `npm ci`.
5. Create `.env.local` from `.env.example` using vault values.
6. Run `env -u RESEND_API_KEY npm run build` to confirm the app no longer needs production secrets at build time.
7. Run `npm run lint`.
8. Log into Vercel, link the repo, and confirm Production, Preview, and Development env vars.
9. Confirm Vercel domains: `www.northlanterngroup.com`, `northlanterngroup.com`, and staging if retained.
10. Log into Namecheap and confirm apex, `www`, and staging records point to Vercel. Do not change Google Workspace MX, SPF, DKIM, or DMARC records during website recovery.
11. Deploy a preview branch and submit a test contact form.
12. Confirm the company alias receives the email.
13. Confirm the durable lead store records the same test lead.
14. Confirm analytics records a page view and conversion event.
15. Merge to production only after the preview passes all checks in the Definition of Live-Ready.

## Account ownership map

| Account | Current source | Required MVP owner | Required action |
|---|---|---|---|
| GitHub repo | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/docs/INFRASTRUCTURE.md` | Founder-owned organization with at least two controlled admins | Confirm branch protection, admin list, and emergency access. |
| Vercel | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/docs/INFRASTRUCTURE.md` | Company-owned Vercel team | Export env vars to vault and confirm preview protection. |
| Namecheap | `/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/docs/INFRASTRUCTURE.md` | Company-owned registrar account | Confirm renewal date, billing, two-factor auth, and backup codes. |
| Resend | Contact route and infrastructure notes | Company-owned account | Rotate key if ownership is unclear and store in vault. |
| reCAPTCHA | `.env.example` and contact route | Company-owned Google account | Confirm hostnames and key ownership. |
| ZeroBounce | `.env.example` and contact route | Company-owned account | Confirm credits, billing, and key ownership. |
| Analytics | Not installed | Founder-selected company-owned account | Decide in DR-05 and document access. |
| Lead persistence | Not installed | Founder-selected company-owned account | Decide in DR-02 and document retention. |
| Lead Google Group | Founder confirmed created on 2026-04-24 | `leads@northlanterngroup.com` | Use as the only contact route recipient in Wave 1. |

# Decision Register

| ID | Question | Options | Inputs needed | Recommended option and reasoning |
|---|---|---|---|---|
| DR-01 | What company-owned alias receives website leads? | Resolved: `leads@northlanterngroup.com` | Google Group exists with Hamza as owner and `hello@northlanterngroup.com` as monitoring member | Use `leads@northlanterngroup.com` as the only route recipient. It separates website-qualified inbound from general mail and gives future CRM, SLA, and analytics work a clean source. |
| DR-02 | What durable lead store ships in Wave 2? | Airtable; Google Sheets through Apps Script; lightweight database | Founder comfort, privacy review, export needs, admin ownership | Use Airtable if the founder wants a usable lead table without custom admin work. Use Google Sheets only if Workspace simplicity beats lead workflow. Do not add a database for MVP. |
| DR-03 | What happens to the theme toggle? | Remove light mode for MVP; move toggle into header; rebuild full theme system | Visual QA findings, brand preference, maintenance appetite | Remove light mode for MVP. The current floating toggle adds product UI noise and makes every section carry extra state. Dark mode already carries the brand better. |
| DR-04 | What happens to third-party logo chips? | Remove all logo chips; self-host approved icons; keep external URLs | Permission status, local asset inventory, design need | Remove all logo chips from MVP service cards. The tools can be named in copy without depending on external hosts or logo permissions. |
| DR-05 | What analytics stack ships? | Vercel Analytics; Plausible; GA4 | Privacy preference, dashboard ownership, marketing needs | Use Vercel Analytics for MVP if the goal is fast deployment and basic conversion signal. Move to a fuller stack only when campaign attribution demands it. |
| DR-06 | Which case studies get built first? | Atlassian cleanup; Atlassian Cloud transition; BI reporting; Automation and Integration pilot | Founder fact sheets, client approval boundaries, sales relevance | Build one Atlassian Systems case and one BI and Operational Reporting case first. They support the core positioning and avoid making AI carry credibility before proof exists. |
| DR-07 | How does NLG verify partner directory status? | Founder supplies live directory URL; founder supplies Atlassian account screenshot for internal use; claim stays banned | Atlassian account access, public listing status | Keep the claim banned until a public directory URL exists. A screenshot may guide internal planning, but public copy needs public proof. |
| DR-08 | What is the Captur Labs disposition? | Keep absent; private Labs page; public product teaser | Marketplace readiness, support path, privacy terms, screenshots | Keep Captur absent for MVP. It can strengthen positioning later, but a half-ready product page creates support and credibility drag. |
| DR-09 | What privacy wording governs form data? | Founder-approved plain policy; counsel-reviewed policy; temporary minimal notice | Resolved inputs: `North Lantern Group Inc.`, `400 Slater St.`, `Ottawa`, `ON`, `K1R 7S7`, `Canada`; remaining input: retention preference | Ship founder-approved plain policy in Wave 1 and get counsel review before paid acquisition. The policy must include the full registered office address and the tools that process form data. |

# Open Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Partner directory ambiguity creates accidental overclaiming. | Medium | High | Ban partner-tier wording in copy, metadata, schema, alt text, and proposals until DR-07 produces a public listing. |
| Founder capacity delays case study production. | High | High | Use a structured fact sheet and external editor in Wave 3. Do not block Wave 1 or Wave 2 on case studies. |
| Copy drift appears between website and sales conversations. | Medium | High | Add a copy proof review before each deploy. Reject any site claim the founder cannot defend in a sales call tomorrow. |
| SEO risk from non-production noindex posture gets misapplied to production. | Low | High | Verify production headers after every deploy. Add live-ready checklist item for `X-Robots-Tag` absence on production. |
| Next upgrade introduces visual or runtime regression. | Medium | Medium | Upgrade before cosmetic work, run build and lint, then run manual homepage and contact QA. |
| Durable lead persistence creates privacy obligations. | Medium | Medium | Document retention in `/privacy`, store only form fields, and avoid tracking message contents in analytics. |
| Removing testimonials and metrics makes the page feel sparse. | High | Medium | Replace fabricated proof with specific problem language, founder-led delivery, real process clarity, and Wave 3 case studies. Do not use placeholder proof. |
| Logo removal makes service cards less visual. | Medium | Low | Use typography, layout, and Lucide icons. Tool names in copy carry enough buyer recognition for MVP. |

# Definition of Live-Ready

1. `env -u RESEND_API_KEY npm run build` succeeds.
2. `npm audit --audit-level=high` exits clean.
3. `npm run lint` exits with no new warnings caused by MVP changes.
4. `rg -n "Oracle|oracle" src public` returns no matches.
5. `rg -n "Michael Thompson|Emma Johnson|James Anderson|Sarah Williams|David Chen|Maria Garcia|Robert Kim|Lisa Mueller|Ahmed Hassan" src` returns no matches.
6. `rg -n "60%|3x|92%|60\\+|25\\+|Global Awards|Years Exp|Client Satisfaction|Team Efficiency|Faster Delivery" src` returns no public proof matches.
7. `rg -n "gmail.com|osaed.chundrigar" src/app/api/contact/route.ts` returns no matches.
8. A test form submission reaches the company-owned alias.
9. A test form submission writes to the durable lead store after W2-10 ships.
10. `/privacy` returns 200 locally and in production.
11. `curl -I https://www.northlanterngroup.com/robots.txt` returns 200 after deploy.
12. `curl -I https://www.northlanterngroup.com/sitemap.xml` returns 200 after deploy.
13. Production HTML includes canonical, OG, Twitter, and JSON-LD metadata.
14. Production response does not include `X-Robots-Tag: noindex`.
15. Preview response includes `X-Robots-Tag: noindex, nofollow`.
16. Footer has no `href="#"` links and no anchor to a nonexistent section.
17. Homepage public copy contains no partner-tier claim.
18. Homepage public copy contains no public pricing floor, rate, or engagement minimum.
19. Homepage public copy uses exactly three service lanes.
20. The floating theme toggle is not visible.
21. Services section contains no external logo image URLs.
22. Contact submit copy contains no `Free Consultation` wording.
23. The locked hero block appears on the homepage.
24. Analytics records a page view and one successful contact conversion after W2-09 ships.
25. Manual mobile and desktop QA confirms no overlapping text, blank major sections, broken CTAs, or console errors on `/` and `/privacy`.

# Appendix A: Source Audit References

The first audit pass identified the core trust failures: Oracle service copy, unverified metrics, fabricated-looking testimonials, dead footer links, personal Gmail in the contact route, thin SEO metadata, preview URL indexing risk, and weak operational resilience. It also established the original eight-layer frame across positioning, copy, UI, conversion, technical, SEO, brand, and backup.

The second verification pass grounded those findings in this repo and in production behavior. It confirmed current source line numbers, ran `npm audit --json`, reproduced the clean-build failure caused by top-level Resend construction, proved that production renders the risk content, confirmed `robots.txt` and `sitemap.xml` return 404, confirmed the Vercel default URL returns production HTML, and inspected existing public brand and icon assets. This plan consolidates both passes into a three-wave MVP that removes credibility risk first, rebuilds positioning second, and adds proof only after the founder can defend it.
