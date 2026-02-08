# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation

- `docs/INFRASTRUCTURE.md` - Infrastructure guide (accounts, environments, deployments, access)
- `docs/BRAND-ALIGNMENT.md` - Brand guidelines to code mapping (fonts, colors, logos, components)

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
- **Deployment**: Vercel (auto-deploys from GitHub)

### Project Structure
- `src/app/page.tsx` - Main landing page (~1,400 lines, client component with form state)
- `src/app/api/contact/route.ts` - Contact form API (Resend email + ZeroBounce + reCAPTCHA)
- `src/app/layout.tsx` - Root layout with font configuration and metadata
- `src/app/globals.css` - Global styles, scroll animations, light/dark mode overrides
- `src/components/Globe.tsx` - Interactive 3D globe (cobe library)
- `src/components/ParticleCompass.tsx` - Mouse-following gradient canvas (dark mode hero)
- `src/components/FloatingParticles.tsx` - Animated floating particles (dark mode hero)
- `src/components/CloudBackground.tsx` - Parallax cloud animation (light mode hero)
- `tailwind.config.ts` - Custom NLG color palette configuration
- `docs/INFRASTRUCTURE.md` - Full infrastructure and environment documentation
- `docs/BRAND-ALIGNMENT.md` - Brand guidelines alignment and checklist

### NLG Color System (Current - Needs Migration)
Custom Tailwind colors currently prefixed with `nlg-`:
- Primary (60%): `nlg-navy` (#1B2838), `nlg-cyan` (#00D4FF), `nlg-white`
- Secondary (30%): `nlg-hunter-green`, `nlg-teal`, `nlg-light-gray`, `nlg-charcoal`
- Tertiary (10%): `nlg-deep-navy`, `nlg-pine-green`, `nlg-emerald`, `nlg-coral`

These need to be migrated to the brand guideline colors. See `docs/BRAND-ALIGNMENT.md`.

### Environment Variables
Four env vars are required for the contact form to function. See `docs/INFRASTRUCTURE.md`
for the full list. Without them, the site renders normally but form submissions will fail.

### Key Patterns
- Dark mode is the default; light mode toggle available via Sun/Moon button
- All sections use scroll-reveal animations (`.reveal`, `.reveal-left`, `.reveal-right`)
- The hero section renders different backgrounds based on dark/light mode
- Service diagrams use `react-xarrows` for SVG connection lines
- Phone input uses `react-phone-number-input` with country-specific validation

### Known Issues & Future Work
- **Monolithic page.tsx:** The entire site (~1,400 lines) lives in a single file. This should
  be refactored into separate section components (Hero, Services, Contact, etc.).
- **Website copy is draft quality:** The current text content is not finalized. Testimonials
  appear fabricated (AI-generated names/companies) and are a credibility risk. All copy
  needs to be reviewed and rewritten with real content.
- **No branch protection:** Anyone with repo access can push directly to main (production).
  See `docs/INFRASTRUCTURE.md` for details.

## Working with Hamza (Project Owner)

- **Always explain before acting.** Hamza wants to understand and approve changes before
  they are pushed. Don't push to any branch without explicit approval.
- **The dark mode aesthetic is intentional and liked.** Preserve the dark mode look and feel
  during any redesign work.
- **Keep language clear and direct.** Avoid jargon-heavy explanations without context.
  Hamza is technically capable but deployment/DevOps concepts should be explained plainly.
- **Never use `hamza@ion8.net`** — that is a separate work email for an unrelated employer.
  GitHub is tied to `hamzachundrigar@gmail.com`. Vercel is tied to `hamza@northlanterngroup.com`.
