# North Lantern Group - Brand Alignment Guide

> **Last Updated:** February 9, 2026
> **Source of Truth:** `NLG-Brand-Guidelines.html` (Brand System v1.0, January 2026)
> **Location:** `05 - Marketing & Brand/Brand Assets/NLG-Brand-Guidelines.html`

---

## Purpose

This document maps the authoritative NLG brand guidelines to the website codebase.
It identifies what is currently aligned, what is misaligned, and what changes are
needed to bring the website into full compliance with the brand system.

The Brand Guidelines HTML file (v1.0, January 2026) is the **single source of truth**
for all branding decisions. The older Typography Reference PNG and Color System Reference
PNG in the same folder are superseded versions and should not be used for new decisions.

---

## Source of Truth Hierarchy

| Priority | Document | Version | Status |
|----------|----------|---------|--------|
| 1 (Authoritative) | `NLG-Brand-Guidelines.html` | v1.0, January 2026 | Active source of truth |
| 2 (Superseded) | `NLG-Color-System-Reference.png` | Undated | Superseded by v1.0 guidelines |
| 3 (Superseded) | `NLG-Typography-Reference.png` | v2.0, November 2025 | Superseded by v1.0 guidelines |

---

## Typography

### Brand Standard (Source of Truth)

**Primary Typeface: Montserrat**
- Source: Google Fonts (fonts.google.com/specimen/Montserrat)
- Single typeface system (Montserrat for all uses)
- Geometric, modern, highly legible

**Type Scale:**

| Level | Name | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| 1 | Display | 56px | Bold (700) | 1.1 |
| 2 | Heading 1 | 42px | Bold (700) | 1.2 |
| 3 | Heading 2 | 32px | SemiBold (600) | 1.25 |
| 4 | Heading 3 | 24px | SemiBold (600) | 1.3 |
| 5 | Body Large | 18px | Regular (400) | 1.6 |
| 6 | Body | 16px | Regular (400) | 1.6 |
| 7 | Body Small | 14px | Regular (400) | 1.5 |
| 8 | Caption | 12px | Medium (500) | 1.4 |

**Available Weights:** Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)

### Current Website State

| Element | Brand Standard | Current Code | Aligned? |
|---------|---------------|-------------|----------|
| Font family | Montserrat | Geist (Vercel system font) | No |
| Heading weight | Bold (700) / SemiBold (600) | Mixed | Partial |
| Body weight | Regular (400) | Regular (400) | Yes |
| Line heights | 1.1 - 1.6 per scale | Varies | Partial |

### Required Change

Replace Geist with Montserrat in:
- `src/app/layout.tsx` (font import and CSS variable)
- `tailwind.config.ts` (fontFamily configuration)

**Implementation:**
```typescript
// layout.tsx
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})
```

```typescript
// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
}
```

---

## Color System

### Brand Standard (Source of Truth)

**Primary Brand Colors:**

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Astronaut Blue | `#00304B` | 0, 48, 75 | Primary dark, text on light backgrounds |
| Teal | `#0096B4` | 0, 150, 180 | Primary accent, links, interactive elements |
| Deep Ocean | `#1B4965` | 27, 73, 101 | Secondary dark, gradient midpoint |
| Dark Navy | `#0A1628` | 10, 22, 40 | Deepest background, gradient endpoint |

**Brand Gradient:**
```css
background: linear-gradient(135deg, #0096B4 0%, #1B4965 50%, #0A1628 100%);
```

**Neutral Palette:**

| Name | Hex |
|------|-----|
| White | `#FFFFFF` |
| Light Gray | `#F5F7FA` |
| Medium Gray | `#E1E5EB` |
| Gray | `#8896A6` |
| Dark Gray | `#4A5568` |
| Near Black | `#1A202C` |

**Semantic Colors:**

| Purpose | Name | Hex |
|---------|------|-----|
| Success | Emerald | `#10B981` |
| Warning | Amber | `#F59E0B` |
| Error | Red | `#EF4444` |
| Info | Teal | `#0096B4` |

### Current Website State

The website's Tailwind config uses a different color palette from the brand guidelines:

| Role | Brand Standard | Current `tailwind.config.ts` | Aligned? |
|------|---------------|------------------------------|----------|
| Primary dark | Astronaut Blue `#00304B` | nlg-navy `#1B2838` | No |
| Primary accent | Teal `#0096B4` | nlg-cyan `#00D4FF` | No |
| Deep background | Dark Navy `#0A1628` | nlg-deep-navy `#0F1922` | Close but not exact |
| Mid-tone blue | Deep Ocean `#1B4965` | (not defined) | Missing |
| Green accent | (not in brand primary) | nlg-hunter-green `#355E3B` | N/A |
| Teal secondary | (not in brand primary) | nlg-teal `#00A8A8` | N/A |

### Notes on Color Alignment

The current website was built with a more vibrant, higher-contrast palette than the brand
guidelines specify. This is a deliberate decision point:

- The brand guidelines Teal (`#0096B4`) is more muted than the website's Cyan (`#00D4FF`)
- The brand guidelines prioritize a deep, professional ocean palette
- The website currently uses a more tech-forward, high-energy cyan

The brand guidelines (v1.0, January 2026) are the source of truth. When updating the
website colors, the Tailwind config should be updated to match the brand guidelines colors.
However, the dark mode website may need "digital variant" adjustments for adequate contrast
on dark backgrounds. Any such adjustments should be documented and approved.

### Required Changes

Update `tailwind.config.ts` to align with brand guidelines:

```typescript
colors: {
  // Primary Brand Colors (from Brand Guidelines v1.0)
  'nlg-astronaut': '#00304B',
  'nlg-teal': '#0096B4',
  'nlg-deep-ocean': '#1B4965',
  'nlg-dark-navy': '#0A1628',

  // Neutral Palette
  'nlg-white': '#FFFFFF',
  'nlg-light-gray': '#F5F7FA',
  'nlg-medium-gray': '#E1E5EB',
  'nlg-gray': '#8896A6',
  'nlg-dark-gray': '#4A5568',
  'nlg-near-black': '#1A202C',

  // Semantic Colors
  'nlg-success': '#10B981',
  'nlg-warning': '#F59E0B',
  'nlg-error': '#EF4444',
  'nlg-info': '#0096B4',
}
```

---

## Logo System

### Brand Standard

**Core Design Concept:**
- Broken frame suggests openness
- "N" letter anchors the brand
- Sparkle element reinforces "lantern" illumination concept

**Three Icon Variants:**

| Variant | Use Case | Frame/N Color | Sparkle Color |
|---------|----------|--------------|---------------|
| Gradient | Light backgrounds | Brand gradient (Teal to Dark Navy) | Teal `#0096B4` |
| Astronaut Blue | Single color applications | `#00304B` | `#00304B` |
| White (Reversed) | Dark backgrounds | `#FFFFFF` | `#FFFFFF` |

**Horizontal Lockups:** Logo + "North Lantern Group" text
- Light background: Gradient logo + gradient text
- Dark background: White logo + white text

**Clear Space:** Equal to height of "N" on all sides
**Minimum Size:** 32px digital, 0.5in (48px) print. Remove sparkle below 48px.

### Current Website State

| Element | Brand Standard | Current Code | Aligned? |
|---------|---------------|-------------|----------|
| Logo file | Brand asset variants | `/public/logo.png` | To verify |
| Clear space | N-height on all sides | Via CSS padding | Approximate |
| Dark bg variant | White reversed | Used in header | Yes |

### Logo Assets Available Locally

```
05 - Marketing & Brand/Brand Assets/
  Logos/
    Primary (Full Color)/    - SVG + PNG @1x, @2x, @3x (Horizontal & Stacked)
    Reversed (White)/        - SVG + PNG @1x, @2x, @3x (Horizontal & Stacked)
    Monochrome (Ast. Blue)/  - SVG + PNG @1x, @2x, @3x (Horizontal & Stacked)
  Icons/
    Primary (Full Color)/    - SVG + PNG @1x, @2x, @3x
    Reversed (White)/        - SVG + PNG @1x, @2x, @3x
    Monochrome (Ast. Blue)/  - SVG + PNG @1x, @2x, @3x
  Favicons/
    16px/                    - SVG + PNG
    32px/                    - SVG + PNG
```

---

## Component Patterns

### Brand Standard

**Button Variants:**

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | Astronaut Blue `#00304B` | White | None |
| Secondary | Transparent | Astronaut Blue | Astronaut Blue |
| Ghost | Transparent | Astronaut Blue | None |
| Gradient | Brand gradient | White | None |
| Success | Emerald `#10B981` | White | None |
| Warning | Amber `#F59E0B` | White | None |
| Danger | Red `#EF4444` | White | None |
| Disabled | Medium Gray `#E1E5EB` | Gray `#8896A6` | None |

**Card Variants:**
1. Default - Subtle border (`#E1E5EB`)
2. Elevated - Box shadow (lg scale)
3. Accent - Gradient top border bar

### Spacing System

**Base unit: 8px**

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |

### Shadow Scale

| Level | Value | Use Case |
|-------|-------|----------|
| sm | `0 1px 2px rgba(0,48,75,0.05)` | Subtle lift |
| md | `0 4px 8px rgba(0,48,75,0.08)` | Cards, dropdowns |
| lg | `0 8px 24px rgba(0,48,75,0.12)` | Modals, popovers |
| xl | `0 16px 48px rgba(0,48,75,0.16)` | Floating elements |

### Border Radius Scale

| Token | Value |
|-------|-------|
| sm | 4px |
| md | 8px |
| lg | 12px |
| xl | 16px |
| 2xl | 24px |
| full | 9999px |

---

## Brand Essence

Three core pillars that should inform all website copy and design decisions:

1. **Illumination** - Guiding clients through complex technical challenges with clarity
   and expertise
2. **Trust** - Building lasting partnerships through reliable, professional service delivery
3. **Innovation** - Staying ahead with modern solutions and forward-thinking strategies

---

## Content Quality Issues

The website copy and content is **not finalized** and needs significant work:

- **Testimonials:** The 9 testimonials on the current site appear to be AI-generated with
  fabricated names and companies. This is a **credibility risk** and should be replaced with
  real client testimonials or removed entirely until genuine ones are available.
- **Service descriptions:** Draft quality, needs review for accuracy and tone.
- **Overall copy:** Needs to be rewritten to align with the brand pillars (Illumination,
  Trust, Innovation) and the professional, trustworthy tone the brand guidelines establish.

### Design Direction

- **Dark mode is the preferred aesthetic.** Hamza likes the current dark mode look and wants
  to preserve it. Any brand alignment work should maintain the dark mode as default.
- The current high-contrast cyan (#00D4FF) is more visually striking than the brand's Teal
  (#0096B4). When migrating colors, the dark mode may need "digital variant" adjustments
  to maintain adequate contrast and visual appeal on dark backgrounds.

---

## Alignment Checklist

Summary of all changes needed to align the website with brand guidelines:

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Replace Geist font with Montserrat | High | Pending | Affects layout.tsx, tailwind.config.ts |
| Update Tailwind color palette to brand colors | High | Pending | Affects tailwind.config.ts + all components |
| Update brand gradient in CSS | Medium | Pending | Multiple locations in page.tsx and globals.css |
| Verify logo assets match brand variants | Medium | Pending | Check /public/logo.png against brand assets |
| Add proper favicon from brand assets | Medium | Pending | Copy from brand assets to /public |
| Replace/remove fabricated testimonials | Medium | Pending | Credibility risk - decision needed in copy deck (replace with real, or remove section) |
| Review and rewrite website copy | Medium | In Progress | Copy deck (`docs/COPY-DECK.md`) prepared with all current text. Hamza editing. |
| Refactor page.tsx into components | Medium | ✅ Complete | Completed by Arryan (Feb 9, 2026). page.tsx split into 9 section components. |
| Update button styles to brand spec | Low | Pending | After color migration |
| Update card styles to brand spec | Low | Pending | After color migration |
| Implement shadow scale from brand | Low | Pending | After core alignment |
| Apply spacing system consistently | Low | Pending | After core alignment |
| reCAPTCHA v2 → v3 migration | High | 🔍 QA | Implemented by Osaed (Feb 9, 2026). v3 invisible/score-based. WEB-24/WEB-25 in QA, awaiting manual testing. |
| Create Privacy Policy page | High | Pending | Tracked in Epic WEB-4 (5 tasks). Currently links to # placeholder. |
| Contact form UX updates | High | Pending | Tracked in Epic WEB-1 (10 tasks incl. WEB-30 Cal.com embed). Field validation, dropdown, button text changes. |
| Review and edit website copy | High | In Progress | Copy deck created (`docs/COPY-DECK.md`). Hamza to edit, then Claude Code applies changes. |

---

## Document History

| Date | Author | Change |
|------|--------|--------|
| Feb 10, 2026 | Claude (AI) | Session 4: reCAPTCHA v3 status updated to QA, copy deck in progress, added Cal.com task reference |
| Feb 9, 2026 | Claude (AI) | Updated checklist: page refactor complete, added Jira epic tracking |
| Feb 8, 2026 | Hamza | Added content quality issues, design direction, expanded checklist |
| Feb 8, 2026 | Hamza | Initial creation from brand guidelines analysis |
