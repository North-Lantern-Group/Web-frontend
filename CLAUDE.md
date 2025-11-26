# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 15 B2B marketing website for North Lantern Group using the App Router pattern.

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom NLG color system
- **Fonts**: Open Sans (body) and Merriweather (headings) via next/font/google

### Project Structure
- `src/app/page.tsx` - Main landing page (client component with form state)
- `src/app/layout.tsx` - Root layout with font configuration and metadata
- `src/app/globals.css` - Global styles and Tailwind imports
- `tailwind.config.ts` - Custom NLG color palette configuration

### NLG Color System
Custom Tailwind colors are prefixed with `nlg-`:
- Primary (60%): `nlg-navy`, `nlg-cyan`, `nlg-white`
- Secondary (30%): `nlg-hunter-green`, `nlg-teal`, `nlg-light-gray`, `nlg-charcoal`
- Tertiary (10%): `nlg-deep-navy`, `nlg-pine-green`, `nlg-emerald`, `nlg-coral`

### Typography
- Headings: Merriweather (serif) via `font-serif` class
- Body: Open Sans via `font-sans` class
- CSS variables: `--font-merriweather`, `--font-open-sans`
