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
- `src/app/api/contact/route.ts` - Contact form API (Resend email + ZeroBounce + reCAPTCHA)
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
- `src/components/sections/Contact.tsx` - Contact form (form state is local)
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

### Known Issues & Future Work
- **Website copy is draft quality:** The current text content is not finalized. Testimonials
  appear fabricated (AI-generated names/companies) and are a credibility risk. All copy
  needs to be reviewed and rewritten with real content.
- **No branch protection:** Anyone with repo access can push directly to main (production).
  See `docs/INFRASTRUCTURE.md` for details.
- **Branch strategy resolved (Feb 9, 2026):** `main` is the single source of truth and production branch. All feature work branches from main, PRs merge back to main. The `dev` and `feature/issue-5-refactor` branches have been fully merged into main.
- **Jira project tracking:** WEB project at northlanterngroup.atlassian.net. 4 Epics (WEB-1 through WEB-4) with 23 tasks for contact form redesign, visual alignment, reCAPTCHA v3 migration, and Privacy Policy page creation.

## Git & Deployment Workflow

- **Production branch:** `main` (Vercel auto-deploys to northlanterngroup.com)
- **Feature branches:** Create from `main` (e.g., `feature/WEB-5-make-phone-optional`)
- **Preview URLs:** Vercel auto-creates for every non-main branch push
- **Merging:** Open PR to `main`, review via Preview URL, merge when approved
- **Never manually promote** non-main deployments to Production in Vercel
- **Vercel project:** `web` under team `north-lantern-group-admins-projects` (hello@northlanterngroup.com)
- **GitHub repo:** `North-Lantern-Group/Web-frontend` (public)

## Jira Project

- **Board:** https://northlanterngroup.atlassian.net/jira/software/c/projects/WEB/boards/67
- **API access:** `hamza@northlanterngroup.com` with API token at `~/.atlassian-api-token`
- **Epics:**
  - WEB-1: Contact Form — UX & Content Updates (9 tasks)
  - WEB-2: Contact Form — Visual & Brand Alignment (3 tasks)
  - WEB-3: Contact Form — reCAPTCHA v3 Migration (6 tasks)
  - WEB-4: Privacy Policy Page — Creation & Compliance (5 tasks)
- **Key completed task:** WEB-22 (Investigate reCAPTCHA) — documented current v2 implementation
- **Key completed task:** WEB-28 (Branch strategy) — reconciled all branches, resolved

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
