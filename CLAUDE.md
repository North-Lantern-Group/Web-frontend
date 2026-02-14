# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Self-Annealing Principle

This project follows a 3-layer architecture for AI-assisted development:

1. **Directives** (`directives/`) — Task SOPs in markdown. Before starting a task, check if
   a directive exists. After completing a task, update or create the relevant directive.
2. **Orchestration** — The AI agent (Claude Code). Makes decisions, reads directives, calls tools.
3. **Execution** (`execution/`) — Deterministic scripts for repeatable tasks. Not yet created
   for this project (no need for a marketing site), but add this layer when automation is needed.

**When you fix an error:** update the tool/script that caused it, test the fix, then update
the directive so the system gets stronger over time. Directives are living documents, not
write-once artifacts.

## Documentation

- `docs/INFRASTRUCTURE.md` - Infrastructure guide (accounts, environments, deployments, access)
- `docs/BRAND-ALIGNMENT.md` - Brand guidelines to code mapping (fonts, colors, logos, components)
- `docs/COPY-DECK.md` - Editable copy deck of all website text (for Hamza to edit, Claude Code to apply)
- `docs/COPY-DECK-VISUAL-GUIDE.md` - Visual wireframe guide showing each section's layout
- `directives/refactor-page.md` - SOP for component extraction pattern used in page.tsx refactor

## Brand Source of Truth

The authoritative brand guidelines are in:
`/05 - Marketing & Brand/Brand Assets/NLG-Brand-Guidelines.html` (Brand System v1.0, January 2026)

Key brand standards:
- **Font:** Montserrat (Google Fonts) - all weights 300-700. Single typeface system.
- **Primary Colors:** Astronaut Blue (#00304B), Teal (#0096B4), Deep Ocean (#1B4965), Dark Navy (#0A1628)
- **Brand Gradient:** linear-gradient(135deg, #0096B4 0%, #1B4965 50%, #0A1628 100%)
- **Brand Pillars:** Illumination, Trust, Innovation

NOTE: The current codebase uses Geist font and a different color palette (nlg-cyan #00D4FF,
nlg-navy #1B2838). These are misaligned with the brand guidelines and need to be updated.
See `docs/BRAND-ALIGNMENT.md` for the full alignment checklist.

## Build & Development Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 15 B2B marketing website for North Lantern Group using the App Router pattern.
It is a single-page application with a contact form API route.

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom NLG color system
- **Fonts**: Currently Geist (to be migrated to Montserrat per brand guidelines)
- **Deployment**: Vercel (auto-deploys `main` branch to Production; other branches get Preview URLs)

### Project Structure
- `src/app/page.tsx` - Thin shell (~80 lines) composing section components
- `src/app/api/contact/route.ts` - Contact form API (Resend email + ZeroBounce + reCAPTCHA v3)
- `src/app/layout.tsx` - Root layout with font configuration and metadata
- `src/app/globals.css` - Global styles, scroll animations, light/dark mode overrides
- `src/components/layout/Header.tsx` - Nav bar, mobile menu, logo
- `src/components/sections/Hero.tsx` - Hero with dark/light mode backgrounds
- `src/components/sections/Stats.tsx` - Stat counters
- `src/components/sections/About.tsx` - About / mission section
- `src/components/sections/Services.tsx` - Service cards with xarrows diagrams
- `src/components/sections/WhyNorthLantern.tsx` - Value propositions
- `src/components/sections/Testimonials.tsx` - Client testimonials
- `src/components/sections/Pricing.tsx` - Pricing tiers
- `src/components/sections/Contact.tsx` - Contact form (reCAPTCHA v3 provider + form state)
- `src/components/sections/Footer.tsx` - Footer with links and copyright
- `src/components/Globe.tsx` - Interactive 3D globe (cobe library)
- `src/components/ParticleCompass.tsx` - Mouse-following gradient canvas (dark mode hero)
- `src/components/FloatingParticles.tsx` - Animated floating particles (dark mode hero)
- `src/components/CloudBackground.tsx` - Parallax cloud animation (light mode hero)
- `tailwind.config.ts` - Custom NLG color palette configuration
- `directives/` - Task SOPs for AI-assisted development (see Self-Annealing Principle)
- `docs/INFRASTRUCTURE.md` - Full infrastructure and environment documentation
- `docs/BRAND-ALIGNMENT.md` - Brand guidelines alignment and checklist

### NLG Color System (Current - Needs Migration)
Custom Tailwind colors currently prefixed with `nlg-`:
- Primary (60%): `nlg-navy` (#1B2838), `nlg-cyan` (#00D4FF), `nlg-white`
- Secondary (30%): `nlg-hunter-green`, `nlg-teal`, `nlg-light-gray`, `nlg-charcoal`
- Tertiary (10%): `nlg-deep-navy`, `nlg-pine-green`, `nlg-emerald`, `nlg-coral`

These need to be migrated to the brand guideline colors. See `docs/BRAND-ALIGNMENT.md`. Note: The color migration is tracked in Epic WEB-2.

### Environment Variables
Four env vars are required for the contact form to function. See `docs/INFRASTRUCTURE.md`
for the full list. The env vars are: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `RESEND_API_KEY`, `ZEROBOUNCE_API_KEY`. All 4 are set in Vercel for Production, Preview, and Development environments. Without them, the site renders normally but form submissions will fail.

### Key Patterns
- Dark mode is the default; light mode toggle available via Sun/Moon button
- All sections use scroll-reveal animations (`.reveal`, `.reveal-left`, `.reveal-right`)
- The hero section renders different backgrounds based on dark/light mode
- Service diagrams use `react-xarrows` for SVG connection lines
- Phone input uses `react-phone-number-input` with country-specific validation
- reCAPTCHA v3 (invisible) — `GoogleReCaptchaProvider` wraps Contact form, token generated on submit via `executeRecaptcha('contact_form_submit')`. Backend verifies with score threshold 0.5. No visible CAPTCHA widget.
- Contact component uses a wrapper pattern: `Contact` (provider) → `ContactForm` (inner with hook)

### Known Issues & Future Work
- **Website copy is draft quality:** The current text content is not finalized. Testimonials
  appear fabricated (AI-generated names/companies) and are a credibility risk. All copy
  needs to be reviewed and rewritten with real content. A copy deck (`docs/COPY-DECK.md`)
  has been prepared for Hamza to edit — once complete, Claude Code will apply the changes.
- **No branch protection:** Anyone with repo access can push directly to main (production).
  See `docs/INFRASTRUCTURE.md` for details.
- **reCAPTCHA v3 migration (Feb 9, 2026):** Osaed migrated from v2 (checkbox) to v3 (invisible)
  in commit 36e6f42. Frontend and backend both updated. Currently in QA (WEB-24, WEB-25)
  pending Hamza's manual end-user testing. The old `react-google-recaptcha` package has been
  removed; `react-google-recaptcha-v3` is now used. Minor code issue: `useCallback` imported
  but unused in Contact.tsx.
- **Jira project tracking:** WEB project at northlanterngroup.atlassian.net. 4 Epics (WEB-1
  through WEB-4). Current task count: 24+ tasks. Latest: WEB-30 (Cal.com booking page embed).

## Git & Deployment Workflow

**Agreed workflow (Feb 9, 2026 — Hamza, Arryan, Osaed):**

```
feature/WEB-XX  ──PR──▶  dev (staging)  ──PR──▶  main (production)
                            │                        │
                   test.northlanterngroup.com    northlanterngroup.com
```

### Workflow Rules
1. **Feature branches** branch off `main` (e.g., `feature/WEB-24-recaptcha-v3`)
2. **Feature PRs merge into `dev`** — not directly into `main`
3. **`dev` is the staging/integration branch** — test combined features here, use `test.northlanterngroup.com` for review
4. **When an epic's features are validated on `dev`**, open a PR from `dev` → `main` to release to production
5. **After every merge to `main`**, rebase or fast-forward `dev` to match `main` to prevent drift
6. **Never manually promote** non-main deployments to Production in Vercel

### Deployment URLs
- **Production:** `main` → northlanterngroup.com (auto-deployed by Vercel)
- **Staging:** `dev` → test.northlanterngroup.com (auto-deployed by Vercel)
- **Preview:** any other branch → auto-generated Vercel URL per commit

### Key Details
- **Vercel project:** `web` under team `north-lantern-group-admins-projects` (hello@northlanterngroup.com)
- **GitHub repo:** `North-Lantern-Group/Web-frontend` (public)
- **Claude Code must always follow this workflow** — never push directly to `main`, always go through `dev` first

## GitHub for Jira Integration

The NLG Jira instance (`northlanterngroup.atlassian.net`) is connected to the GitHub org
(`North-Lantern-Group`) via the **GitHub for Atlassian** app. This integration was set up
in February 2026 and is actively syncing development data from GitHub into Jira.

**How it works:** The integration scans branch names, commit messages, and PR titles for
Jira issue keys (e.g., `WEB-24`). When it finds a match, it links that GitHub activity
to the Jira ticket's Development panel. This is a one-way sync — GitHub data flows into
Jira. Nothing in the repo or GitHub is changed by the integration.

### Rules for Claude Code

**These rules are mandatory for every branch, commit, and PR:**

1. **Always include the Jira issue key in branch names:**
   `feature/WEB-24-recaptcha-v3` — the `WEB-24` part is what triggers the link.

2. **Always include the Jira issue key in commit messages:**
   `WEB-24 Add reCAPTCHA v3 provider wrapper` — start the message with the key.
   Without it, the commit will NOT appear on the Jira ticket.

3. **Always include the Jira issue key in PR titles:**
   `WEB-24: Add reCAPTCHA v3 to contact form` — this links the PR to the ticket.

4. **Issue keys MUST be uppercase.** `WEB-24` works. `web-24` does not. The integration
   only recognizes the standard Jira format: two or more uppercase letters, a hyphen,
   then a number.

5. **When working on multiple tickets in one commit**, include all keys:
   `WEB-24 WEB-25 Complete reCAPTCHA migration frontend and backend`

### Smart Commits (Optional)

Smart Commits let you trigger Jira actions from commit messages. These are optional but
useful. There are exactly three commands:

```bash
# Add a comment to the ticket
git commit -m "WEB-24 #comment Fixed token refresh issue on form submit"

# Log time against the ticket
git commit -m "WEB-24 #time 2h Implemented provider wrapper"

# Transition the ticket to a different status (e.g., move to Done)
git commit -m "WEB-24 #done"

# Combine multiple commands
git commit -m "WEB-24 #time 3h #comment Completed reCAPTCHA migration #done"
```

**Smart Commit requirements:**
- The committer's Git email must match their Jira account email (see email matching
  note in `docs/INFRASTRUCTURE.md` under "GitHub for Jira" section)
- Commands must be on a single line (no multi-line)
- Transition names must match Jira workflow status names exactly
- Avoid `git push --force` on branches with Smart Commits (rewritten commits can
  cause duplicate command execution)

### What the Integration Shows in Jira

When you open a Jira ticket (e.g., WEB-24), the Development panel on the right shows:
- **Branches** linked to this ticket (with direct GitHub links)
- **Commits** that reference this ticket (with author, message, timestamp)
- **Pull Requests** linked to this ticket (with OPEN / MERGED / DECLINED status)

This means Hamza can see development progress on any ticket without leaving Jira.

### Integration Details

- **App:** GitHub for Atlassian (free, installed from Atlassian Marketplace)
- **Connected Org:** North-Lantern-Group (all repos — Web-frontend and Captur)
- **Backfill:** Completed (historical data from Aug 14, 2025 onward)
- **Permissions:** Full access (read/write on contents and PRs for branch creation
  from Jira and link unfurling)
- **Confluence guide:** Full setup and usage guide at
  `Tech Stack + Guides > Development & DevOps > GitHub for Jira — Integration Guide for NLG`

## Jira Project

- **Board:** https://northlanterngroup.atlassian.net/jira/software/c/projects/WEB/boards/67
- **API access:** `hamza@northlanterngroup.com` with API token at `~/.atlassian-api-token`
- **API note:** Use `/rest/api/3/search/jql` (not `/rest/api/3/search` — that endpoint was removed)
- **Epics:**
  - WEB-1: Contact Form — UX & Content Updates (10 tasks, includes WEB-30 Cal.com embed)
  - WEB-2: Contact Form — Visual & Brand Alignment (3 tasks)
  - WEB-3: Contact Form — reCAPTCHA v3 Migration (6 tasks)
  - WEB-4: Privacy Policy Page — Creation & Compliance (5 tasks)
- **Key completed tasks:**
  - WEB-22 (Investigate reCAPTCHA) — Done, Hamza
  - WEB-23 (Generate v3 keys) — Done, Osaed
  - WEB-28 (Branch strategy) — Done, reconciled all branches
- **Key in-progress tasks:**
  - WEB-24 (v3 frontend) — QA, Osaed (code complete, awaiting Hamza's manual testing)
  - WEB-25 (v3 backend) — QA, Osaed (code complete, awaiting Hamza's manual testing)
  - WEB-27 (E2E testing) — In Progress, Hamza
  - WEB-30 (Cal.com booking embed) — Backlog

## Working with Hamza (Project Owner)

- **Always explain before acting.** Hamza wants to understand and approve changes before
  they are pushed. Don't push to any branch without explicit approval.
- **The dark mode aesthetic is intentional and liked.** Preserve the dark mode look and feel
  during any redesign work.
- **Keep language clear and direct.** Avoid jargon-heavy explanations without context.
  Hamza is technically capable but deployment/DevOps concepts should be explained plainly.
- **Never use `hamza@ion8.net`** — that is a separate work email for an unrelated employer.
  GitHub is tied to `hamzachundrigar@gmail.com`. Vercel CLI is authenticated as `hello@northlanterngroup.com` (team: `north-lantern-group-admins-projects`).
- **Vercel account for the website is `hello@northlanterngroup.com`** (team: `north-lantern-group-admins-projects`). Hamza also has a personal Vercel account at `hamza@northlanterngroup.com` but the website project is NOT on that account.
