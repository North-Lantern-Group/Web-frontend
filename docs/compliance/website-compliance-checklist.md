# North Lantern Group — Website Compliance Checklist

**Scope:** northlanterngroup.com and the Next.js codebase in this repo.
**Owner:** North Lantern Group Privacy Office — privacy@northlanterngroup.com
**Last reviewed:** April 26, 2026
**Status:** Internal working document. Requires legal counsel review before
launch and on any material change. Not a certification and not legal advice.

This document exists so that a procurement review, a future privacy
regulator, or a replacement owner can see (1) what we have done, (2) what
still needs a human decision, and (3) what the operating workflow looks
like if someone exercises their privacy rights.

The labels below describe what the website is designed to support. They
do not assert that NLG is "fully compliant," "certified," or "legally
approved." All of those require human sign-off.

---

## 1. Canadian minimum website compliance baseline

| # | Item | Status | File / Source |
|---|------|--------|---------------|
| 1.1 | Privacy Policy published at /privacy with: legal name, Privacy Office contact, last-updated date, data types, purposes, consent, service providers, cross-border, retention, safeguards, rights, complaints, OPC escalation | ✅ Done | `src/app/privacy/page.tsx` |
| 1.2 | Terms of Use published at /terms covering: informational use, no engagement, no guarantees, IP, prohibited uses, disclaimers, limitation of liability, governing law (Ontario) | ✅ Done | `src/app/terms/page.tsx` |
| 1.3 | Privacy contact (privacy@northlanterngroup.com) used consistently on Privacy Policy, Terms, Footer, Contact form footer | ✅ Done in code | Privacy, Terms, Footer, Contact |
| 1.4 | Contact form links to /privacy and /terms before submission | ✅ Done | `Contact.tsx` (checkbox label) |
| 1.5 | Privacy consent checkbox on contact form — required, unchecked by default | ✅ Done | `Contact.tsx` |
| 1.6 | Marketing consent — separate, optional, unchecked by default (CASL express-consent capture, not bundled with service consent) | ✅ Done | `Contact.tsx` |
| 1.7 | reCAPTCHA v3 use disclosed on the form with links to Google privacy and terms | ✅ Done | `Contact.tsx` |
| 1.8 | ZeroBounce email validation disclosed on the form | ✅ Done | `Contact.tsx` |
| 1.9 | Honeypot + server-side reCAPTCHA verification + ZeroBounce + signed Google Sheets backup in the API route | ✅ Done in code; live workbook verified | `src/app/api/contact/route.ts`, `integrations/google-apps-script/lead-intake/Code.gs` |
| 1.10 | No advertising cookies, no analytics trackers, no third-party marketing pixels | ✅ Verified | Repo grep: clean |
| 1.11 | External links use `rel="noopener noreferrer"` | ✅ Verified | Footer, Contact |
| 1.12 | Working legal nav in the footer: /privacy, /terms, privacy contact | ✅ Done | `Footer.tsx` |
| 1.13 | No broken placeholder legal links (`href="#"` etc.) | ✅ Verified | Repo grep: clean |
| 1.14 | Sitemap includes /privacy and /terms | ✅ Done | `src/app/sitemap.ts` |
| 1.15 | Privacy contact inbox is monitored by at least two trusted internal people, external posting enabled, external conversation viewing disabled, external joining disabled | ⚠️ **TODO — company confirmation** | Google Workspace group setting |
| 1.16 | "We do not sell personal information" statement on Privacy Policy | ✅ Done | Privacy §4 |
| 1.17 | Consent withdrawal mechanism documented on Privacy Policy | ✅ Done | Privacy §5 |
| 1.18 | Cross-border processing disclosure on Privacy Policy | ✅ Done | Privacy §7 |
| 1.19 | Retention framework disclosed on Privacy Policy | ✅ Done | Privacy §8 |
| 1.20 | Complaint escalation to OPC disclosed on Privacy Policy | ✅ Done | Privacy §11 |

---

## 2. Recommended compliance items

| # | Item | Status | Notes |
|---|------|--------|-------|
| 2.1 | Security headers: HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, Cross-Origin-Opener-Policy | ✅ Done | `next.config.ts` |
| 2.2 | Content-Security-Policy in report-only mode | ✅ Done | `next.config.ts` |
| 2.3 | Content-Security-Policy switched from report-only to enforcing after observation window | ⚠️ Follow-up | After 30+ days observation in production with no genuine violations |
| 2.4 | Canonical URL metadata on all public pages | ✅ Done | Home, Privacy, Terms |
| 2.5 | Sitemap and robots.txt live | ✅ Done | `src/app/sitemap.ts`, `src/app/robots.ts` |
| 2.6 | No indexing of preview deployments | ✅ Done | `X-Robots-Tag: noindex, nofollow` on non-production |
| 2.7 | JSON-LD (Organization / ProfessionalService) with consistent NAP data | ✅ Done | `src/app/layout.tsx` |
| 2.8 | `prefers-reduced-motion` respected globally | ✅ Done | `globals.css` global guard + component-local handling |
| 2.9 | Focus-visible styles on all interactive controls | ✅ Done | `globals.css` |
| 2.10 | Form labels, error messages, aria-describedby wired up | ✅ Done | `Contact.tsx` |
| 2.11 | Phone number input keeps phone optional | ✅ Kept | `Contact.tsx` |
| 2.12 | WCAG 2.2 AA audit using an automated tool (axe, Lighthouse a11y) | ⚠️ **TODO** | Run `npx @axe-core/cli` or Lighthouse against /, /privacy, /terms |
| 2.13 | Manual keyboard-only walkthrough (tab order, focus traps, skip links) | ⚠️ **TODO** | Before launch |
| 2.14 | OG preview image is accessible and represents current brand (not a stale v1 logo) | ✅ Done | `src/app/opengraph-image.tsx` |
| 2.15 | `npm audit` reviewed; high/critical vulnerabilities addressed | ⚠️ **Tracked** | As of 2026-04-24: three moderate advisories in the transitive chain `resend → svix → uuid < 14.0.0` (GHSA-w5hq-g745-h8pq: missing buffer bounds check in uuid v3/v5/v6 when `buf` is provided). NLG code path uses `resend.emails.send()` only, which does not exercise the vulnerable code path, so runtime exposure is low. Remediation path: wait for svix to upgrade its uuid dep, or downgrade to `resend@6.1.3`. Re-run `npm audit` quarterly. |
| 2.16 | Third-party dependency minimization | ✅ Ongoing | Only Resend, ZeroBounce, Google reCAPTCHA as runtime dependencies |

---

## 3. CASL checklist — for any future commercial electronic message (CEM)

Canada's Anti-Spam Legislation applies to any commercial electronic
message sent to an electronic address in Canada. NLG does not currently
send marketing email from this website. When we begin, every CEM must
meet **every** item below.

### 3.1 Consent

- [ ] Express consent obtained and logged, with date, method, and the
      exact wording the recipient agreed to. Pre-checked boxes are not
      acceptable.
- [ ] Implied consent only used where legally available (existing
      business relationship within 2 years of a purchase, within 6 months
      of an inquiry, conspicuous publication of a business address that
      is relevant to the recipient's role, etc.). Each implied-consent
      basis documented per recipient.
- [ ] B2B-to-B2B exemption relied on **only** where both organizations
      have an established relationship and the message concerns the
      recipient organization's activities. Documented per list.

### 3.2 Identification (every message must include)

- [ ] Sender legal name: **North Lantern Group Inc.**
- [ ] NLG mailing address: **400 Slater St., Ottawa, ON K1R 7S7, Canada**
- [ ] A contact method (email, phone, or web form) valid for at least 60 days
- [ ] If sent on behalf of another organization, identify that
      organization too

### 3.3 Unsubscribe

- [ ] Functioning unsubscribe mechanism in every message
- [ ] Mechanism must be simple, no-cost, and at least as easy as
      subscribing
- [ ] Valid for at least 60 days after the message was sent
- [ ] Unsubscribe requests processed within 10 business days
- [ ] Suppression list maintained centrally — no marketing email sent to
      any address on the list

### 3.4 Records

- [ ] Evidence of consent retained for 3+ years (Canadian regulator
      guidance; extend per retention schedule)
- [ ] Unsubscribe timestamps logged

---

## 4. CAN-SPAM readiness — for any future US-facing commercial email

| Item | Requirement |
|------|-------------|
| Accurate header information | "From," "To," "Reply-To," and routing must identify the sender |
| Honest subject lines | No deceptive subject lines |
| Identify message as an ad | If promotional, must be clearly identifiable (context or disclosure) |
| Physical postal address | Include a valid physical address in every message |
| Opt-out mechanism | Functioning opt-out; honor within 10 business days; no payment to unsubscribe |
| Monitor what others do on our behalf | NLG remains responsible if a third party sends on our behalf |

Ensure every future US-facing CEM satisfies both CASL (stricter) and
CAN-SPAM. CASL satisfaction typically satisfies CAN-SPAM.

---

## 5. Vendor / data map

Names confirmed from this repository and from published public policy.
Locations are provider-stated jurisdictions and may change; verify before
relying on them for a procurement response.

| Provider | Function | Personal data categories | Location (provider-stated) | Contract basis |
|----------|----------|--------------------------|----------------------------|----------------|
| Vercel Inc. | Hosting, edge network, build, logs | Request metadata, IP, user agent | Global (primary US) | Vercel DPA (TODO: confirm acceptance) |
| Resend | Transactional email delivery (contact form) | Submitter name, email, phone (if provided), company, message body | US | Resend DPA (TODO: confirm acceptance) |
| ZeroBounce | Email address validation | Submitter email address only | US | ZeroBounce DPA (TODO: confirm acceptance) |
| Google reCAPTCHA v3 | Bot-score risk signal | IP, browser signals, request context | Global (Google infrastructure) | Google Terms & Privacy |
| Google Workspace | Corporate email and restricted Google Sheets lead backup | Full submission contents, source page/referrer with arbitrary query strings stripped, delivery status | Global (Google infrastructure) | Google Workspace MSA + DPA |

**TODOs:**
- [ ] Confirm executed DPA (data processing agreement) is on file for Vercel, Resend, ZeroBounce.
- [ ] Confirm Google Workspace data protection terms are accepted.
- [ ] When adding any new provider, update this table and the Privacy Policy §6.

---

## 6. Personal information inventory

What personal information the website actually handles.

| Data element | Collected from | Collected via | Purpose | Lawful basis | Retention |
|--------------|----------------|---------------|---------|--------------|-----------|
| First / last name | Visitor | Contact form | Respond, route | Consent (form submission) | 24 months if no engagement; then delete/anonymize |
| Company, company size | Visitor | Contact form | Qualify, route | Consent | 24 months if no engagement |
| Work email | Visitor | Contact form | Respond | Consent | 24 months if no engagement |
| Phone (optional) | Visitor | Contact form | Respond | Consent | 24 months if no engagement |
| Area of interest, message body | Visitor | Contact form | Respond, route | Consent | 24 months if no engagement |
| Marketing consent flag | Visitor | Contact form | CASL proof of consent if we later begin sending CEMs | Consent | As long as consent remains valid (plus 3 years for evidentiary retention once withdrawn) |
| Source page / referrer with arbitrary query strings stripped | Visitor browser | Contact form metadata | Submission provenance and troubleshooting | Legitimate operational interest | 24 months if no engagement |
| IP address, user agent, request metadata | Visitor | Automatic (server logs) | Security, abuse prevention | Legitimate operational interest | Rolling 30–90 days depending on provider |
| reCAPTCHA signals | Visitor | Automatic (Google SDK) | Spam prevention | Legitimate operational interest | Retained by Google per their policy |

**TODO — confirm:** inbox retention policies in Google Workspace (how
long the received submission email actually lives in `leads@` and
`privacy@` before it is archived, exported to a CRM, or deleted).

---

## 7. Retention schedule

| Record type | Retention | Trigger for deletion / review |
|-------------|-----------|-------------------------------|
| Contact form email, no engagement | 24 months | Age out + quarterly inbox review |
| Google Sheets lead backup, no engagement | 24 months | Age out + quarterly Sheet review |
| Contact form email, became engagement | Per engagement agreement + CRA records retention (6 years for tax-relevant business records) | End of retention window |
| Marketing consent record | Until consent is withdrawn + 3 years | Evidence of compliance with CASL |
| Suppression / unsubscribe list | Indefinitely | Required to honor opt-outs |
| Privacy request log | 3 years | Year + 1 review |
| Server access logs | Provider default (Vercel) | Provider policy |
| reCAPTCHA logs | Provider default (Google) | Provider policy |

**TODO — company decision:** confirm whether NLG wants a shorter contact-
form retention (e.g., 12 months) for privacy-forward posture, or the 24
months currently documented in the Privacy Policy.

---

## 8. Privacy request workflow

### Intake channel
`privacy@northlanterngroup.com` — monitored by the NLG Privacy Office.
At least two trusted internal people must have access to this inbox.

### Request types accepted
- Access ("what do you hold about me")
- Correction
- Deletion
- Consent withdrawal
- Unsubscribe (also processed from any CEM footer once CEMs exist)
- Complaint about our handling of personal information
- Security / privacy incident report

### Service levels
| Stage | Target |
|-------|--------|
| Acknowledge receipt | Within 5 business days |
| Substantive response | Within 30 days of receipt, unless more time is reasonably required under PIPEDA. If extension is needed, notify the requester with the reason and the expected date. |
| Unsubscribe | Within 10 business days (CASL) |

### Log fields (maintain for every request)
| Field | Example |
|-------|---------|
| Request ID | NLG-PR-2026-001 |
| Received date | 2026-04-24 |
| Requester identifier | email, name |
| Request type | Access |
| Assigned owner | Privacy Office lead |
| Verification step completed? | Y/N |
| Decision | Granted / partially granted / denied with reason |
| Completion date | 2026-05-18 |
| Notes | |

### Escalation
- Internal: Founder / executive lead if response period must be extended
  or if the request indicates a possible breach.
- External: Office of the Privacy Commissioner of Canada (priv.gc.ca) if
  the requester is not satisfied with our response.

---

## 9. Breach / incident workflow

PIPEDA requires organizations to (a) report breaches of security
safeguards involving real risk of significant harm (RROSH) to the OPC
as soon as feasible, (b) notify affected individuals, and (c) keep a
record of every breach for 24 months.

### First hour
1. Contain the incident (rotate keys, revoke access, take affected
   systems offline if needed).
2. Open an incident ticket and assign an incident commander.
3. Preserve logs.

### First 24 hours
4. Identify the data elements, number of individuals, and likelihood of
   misuse.
5. Assess whether a "real risk of significant harm" test is met.
6. Draft preliminary communication to affected individuals.

### Within days
7. If RROSH: file OPC breach report, notify affected individuals,
   notify other relevant regulators.
8. Post-incident review: root cause, corrective actions, update this
   playbook.

### Always
- Maintain a breach register for 24 months (even for breaches not
  requiring notification).

**TODO — company confirmation:** assign an incident commander (role, not
a person, to avoid single-point dependency). Confirm the out-of-hours
contact path.

---

## 10. Marketing claim substantiation register

The public website is currently free of numeric/statistical claims. The
only recurring marketing claims to track are operational commitments:

| Claim | Where it appears | Substantiation category | Substantiation status |
|-------|------------------|-------------------------|-----------------------|
| "Senior operators, no pass-downs" | Hero, TrustStrip, footer tag | Operating commitment | Substantiated by engagement model (same team scoping, building, handing back). Add a brief in the compliance folder if asked. |
| "Same team from first call to handover" | Hero sub, TrustStrip, footer tag | Operating commitment | Substantiated by engagement model |
| "Work that sticks after handover" | TrustStrip | Operating commitment | Substantiated by handover runbook + review cadence in HowWeWork |
| "We reply within one business day" | Contact form status / privacy page | Operating commitment | Substantiated by inbox SLA — **TODO — formalize SLA internally** |
| Three practices and the capabilities listed under each | Practices section | Descriptive | Substantiated by current engagement experience. No numbers claimed. |
| Writing section "Coming 2026" essays | Writing section | Forward-looking | Clearly labelled as upcoming; no claim made about volume or frequency. |

### Rule for future content
Before adding any of the following to the public site, file a
substantiation note in this register:
- Percentages, counts, multipliers ("x faster," "2x fewer incidents")
- Superlatives ("leading," "best," "fastest")
- Client names, testimonials, case studies, logos
- Guarantees of a specific outcome, timeline, or dollar value
- Security or privacy certifications (SOC 2, ISO 27001, Cyber Essentials,
  etc.) — must be current and auditor-issued
- Any use of the word "guaranteed," "certified," or "proven" in a
  marketing context

If a claim cannot be substantiated from NLG-controlled evidence, don't
publish it. Competition Bureau Canada enforces false-or-misleading
representations under the Competition Act.

---

## 11. Accessibility

Target: WCAG 2.2 AA as a recommended professional baseline. AODA
(Accessibility for Ontarians with Disabilities Act) may impose formal
obligations depending on NLG's size and status — confirm with counsel
and, if applicable, file the required accessibility compliance report.

| Item | Status |
|------|--------|
| Keyboard navigation works across all interactive controls | ✅ Spot-checked; full manual audit **TODO before launch** |
| Focus-visible styling | ✅ globals.css |
| Form labels, required marking, error messaging | ✅ Contact form |
| Colour contrast against NLG dark surfaces | ⚠️ **TODO** — automated contrast audit with axe / Lighthouse |
| `prefers-reduced-motion` support | ✅ Global guard + component-local |
| Screen reader names on icon-only buttons (menu, LinkedIn) | ✅ aria-label present |
| Skip-to-content link | ⚠️ **TODO — add** if manual audit surfaces keyboard traps |
| Automated a11y audit | ⚠️ **TODO** — run axe / Lighthouse, capture results in this folder |

---

## 12. Open questions for legal counsel

These are the items we do **not** want to assume on our own:

1. Confirm whether the JSON-LD address (400 Slater St., Ottawa, ON K1R
   7S7) is the appropriate address to publish on privacy / terms / CASL
   footer, or whether a different registered-office or mailing address
   should be used.
2. Confirm "Ontario, Canada" is the correct governing law for the
   website terms. If NLG is incorporated federally, confirm whether a
   broader "Canada" choice-of-law is preferable or whether Ontario
   specifically is acceptable.
3. Confirm the limitation-of-liability cap structure in §8 of /terms
   (CAD $100 or amount paid) is acceptable and does not conflict with
   Ontario Consumer Protection Act principles for any B2C adjacent
   traffic.
4. Confirm that NLG does not currently, and does not plan to, monitor
   or target individuals in the EU/UK to the extent that GDPR / UK GDPR
   apply. If targeting changes (marketing campaigns, EU office, EU
   clients with data subjects), revise this baseline upward (lawful
   basis, data subject rights, DPA, possible DPO).
5. Confirm the 24-month retention for non-converting inquiries is
   acceptable, or adjust.
6. Confirm whether a separate "candidate / careers" data flow should be
   anticipated (the site does not currently have a careers page).
7. Confirm whether any current or planned sub-processor (Vercel, Resend,
   ZeroBounce, Google) has executed the standard contractual safeguards
   expected by Canadian privacy regulators for cross-border processing.
8. Confirm whether AODA website compliance reporting applies to NLG
   based on employee count and organizational status, and, if so, when
   the next filing is due.
9. Confirm whether a statement about automated decision-making is
   required (Law 25 §12.1 for Quebec residents). The form is
   human-reviewed; reCAPTCHA produces a risk score but does not
   auto-reject users.
10. Before launching any future commercial electronic message program,
    run the CASL checklist (§3) past counsel.

---

## 13. Deployment checklist (pre-go-live)

Run through this list before flipping the site to production, and every
time material content changes.

- [ ] `npm ci`
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Manual QA: submit the contact form from a real email, confirm
      delivery to `leads@`, confirm a Google Sheets backup row exists,
      confirm Privacy Policy + Terms links open,
      confirm marketing-consent checkbox renders and is unchecked by
      default
- [ ] Confirm `privacy@northlanterngroup.com` is a live inbox monitored
      by at least two people
- [ ] Confirm Privacy Policy "Last updated" date reflects today
- [ ] Confirm Terms "Last updated" date reflects today
- [ ] Confirm OG preview (LinkedIn Post Inspector, Facebook Sharing
      Debugger, Slack unfurl) shows the current dark v2 image
- [ ] Response headers on production include HSTS, X-Content-Type-
      Options, Referrer-Policy, Permissions-Policy, X-Frame-Options,
      CSP-Report-Only
- [ ] robots.txt not blocking production, preview deployments are
      `noindex, nofollow`
- [ ] `npm audit --omit=dev` reviewed; no unaddressed high / critical
- [ ] Compliance checklist (this document) re-signed by a human owner

---

## Reference

- Office of the Privacy Commissioner of Canada — https://www.priv.gc.ca
- PIPEDA fair information principles — https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda_brief/
- CRTC CASL landing page — https://crtc.gc.ca/eng/internet/anti.htm
- CASL FAQ — https://crtc.gc.ca/eng/com500/faq500.htm
- Quebec CAI (Commission d'accès à l'information) — https://www.cai.gouv.qc.ca
- Competition Bureau Canada — https://competition-bureau.canada.ca
- WCAG 2.2 — https://www.w3.org/TR/WCAG22/
