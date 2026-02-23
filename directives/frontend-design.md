# Frontend Design Directive — North Lantern Group

> **Auto-activates** on any frontend UI task (component creation, styling changes,
> layout work, responsive adjustments, visual polish). No manual invocation needed.
> This directive is referenced from CLAUDE.md and loaded into context automatically.
>
> **Last Updated:** February 23, 2026
> **Self-Annealing:** Append refinements at the bottom after each session.

---

## Identity

**North Lantern Group** is a B2B professional services firm specializing in Atlassian
solutions, cloud migrations, and business intelligence. The audience is CTOs, IT directors,
and operations managers at mid-market companies. Every design decision must build **trust**,
communicate **competence**, and feel **premium** — not flashy, not startup-playful, not
crypto-experimental. Think: McKinsey's authority meets Vercel's engineering polish.

**Brand Pillars:** Illumination, Trust, Innovation
**Tagline:** Results that endure.
**Design Tone:** Confident, clean, spacious, quietly impressive.

---

## Design Philosophy

### Premium Dark-Mode Supremacy

Dark mode is the default and intentional. It is not an afterthought toggle — it is the
primary experience. Every element is designed dark-first, then adapted for light mode.

**Why dark mode:** Reduces visual noise, focuses attention on content, conveys technical
sophistication, and aligns with the audience's environment (developers, IT professionals
who live in dark IDEs and terminals all day).

**The premium feel comes from:**
- **Depth, not flatness** — use subtle gradients, layered shadows, and glassmorphism
  to create visual hierarchy without heavy borders
- **Light as accent** — glows, luminous highlights, and soft radiance on interactive
  elements. Light should feel like it's emanating from the brand, not illuminating it
- **Breathing room** — generous whitespace (darkspace). Premium = space. Cramped = cheap.
  When in doubt, add more padding.
- **Restraint** — one accent color moment per viewport. Not everything can glow.

### Every Pixel Builds Trust

B2B buyers make high-stakes decisions. A misaligned element, a janky animation, or a
blurry logo signals: "This company doesn't pay attention to details — will they pay
attention to my infrastructure?" Every visual choice either builds or erodes trust.

---

## Brand Design Tokens

### Colors (Source: NLG Brand Guidelines v1.0, January 2026)

```
Primary Brand Colors:
  Astronaut Blue   #00304B  — Primary dark, text on light backgrounds
  Teal             #0096B4  — Primary accent, links, interactive elements
  Deep Ocean       #1B4965  — Secondary dark, gradient midpoint
  Dark Navy        #0A1628  — Deepest background, gradient endpoint

Brand Gradient:
  background: linear-gradient(135deg, #0096B4 0%, #1B4965 50%, #0A1628 100%);

Accent (Digital):
  Cyan             #00B4D8  — N letterform gradient start, used for digital emphasis
  Bright Cyan      #00D4FF  — Current website accent (higher contrast on dark bg)

Neutral Palette:
  White            #FFFFFF
  Light Gray       #F5F7FA
  Medium Gray      #E1E5EB
  Gray             #8896A6
  Dark Gray        #4A5568
  Near Black       #1A202C

Semantic Colors:
  Success          #10B981  (Emerald)
  Warning          #F59E0B  (Amber)
  Error            #EF4444  (Red)
  Info             #0096B4  (Teal)

Dark Mode Surfaces:
  Body background  #000000  (true black — the site uses this)
  Surface 1        neutral-950 (~#0a0a0a) — header, cards
  Surface 2        neutral-900 (~#171717) — elevated elements
  Border subtle    white/10 — dividers, card edges
  Border hover     white/20 — interactive states
```

### Typography (Source: Brand Guidelines + WEB-34 migration)

```
Font Family:    Montserrat (Google Fonts, self-hosted via next/font)
                Loaded weights: 300 (Light), 400 (Regular), 500 (Medium),
                600 (SemiBold), 700 (Bold)
CSS Variable:   var(--font-montserrat)
Tailwind:       font-sans (configured in tailwind.config.ts)

Type Scale (Brand Guidelines):
  Display     56px  Bold (700)      leading-[1.1]
  Heading 1   42px  Bold (700)      leading-[1.2]
  Heading 2   32px  SemiBold (600)  leading-[1.25]
  Heading 3   24px  SemiBold (600)  leading-[1.3]
  Body Large  18px  Regular (400)   leading-[1.6]
  Body        16px  Regular (400)   leading-[1.6]
  Body Small  14px  Regular (400)   leading-[1.5]
  Caption     12px  Medium (500)    leading-[1.4]

Logo Text:
  Montserrat SemiBold (600), letter-spacing: -0.32px
  (from Figma lockup node 3325:104)
```

### Spacing (Brand Guidelines: 8px base unit)

```
  xs    4px     (gap between inline elements)
  sm    8px     (tight padding)
  md    16px    (standard padding)
  lg    24px    (section internal padding)
  xl    32px    (between related sections)
  2xl   48px    (between distinct sections)
  3xl   64px    (major section separators)

Rule: All spacing values must be multiples of 8px (or 4px for tight contexts).
When something feels cramped, step UP one level on the scale.
```

### Shadows (Brand Guidelines)

```
  sm    0 1px 2px rgba(0,48,75,0.05)     — Subtle lift
  md    0 4px 8px rgba(0,48,75,0.08)     — Cards, dropdowns
  lg    0 8px 24px rgba(0,48,75,0.12)    — Modals, popovers
  xl    0 16px 48px rgba(0,48,75,0.16)   — Floating elements

Dark mode: Use rgba(0,150,180,0.15) (teal-tinted) for accent shadows
           Use rgba(0,0,0,0.5) for depth shadows
```

### Border Radius (Brand Guidelines)

```
  sm    4px     — Small elements (tags, chips)
  md    8px     — Buttons, inputs
  lg    12px    — Cards
  xl    16px    — Large cards, modals
  2xl   24px    — Hero elements
  full  9999px  — Pills, avatars
```

---

## Logo System (from Figma Brand Kit analysis, Feb 23 2026)

### Horizontal Lockup Specs (Figma node 3325:81)

```
ViewBox:         600 x 200
Internal padding: 30px all sides
Icon:            140 x 140px
Icon-to-text gap: 18px
Text:            Montserrat SemiBold 32px, letter-spacing -0.32px
Aspect ratio:    3:1

Variants:
  White (reversed) — for dark backgrounds
  Primary (gradient) — for light backgrounds
  Monochrome (Astronaut Blue) — for single-color applications

Brand rules:
  Minimum digital size: 32px tall
  Clear space: equal to height of "N" on all sides
  Below 48px: remove sparkle element
  At/above 48px: show sparkle
```

### Current Implementation

```
Component:  src/components/brand/NLGLogo.tsx
Header use: h-12 md:h-14 (48px mobile, 56px desktop)
Glow:       drop-shadow(0 0 20px rgba(0,150,180,0.25)) on dark mode
Transition: 500ms opacity crossfade between variants on mode toggle
Sparkle:    visible (both sizes >= 48px threshold)
```

---

## Component Patterns

### Buttons (Brand Guidelines)

```
Primary:    bg-[#00304B] text-white rounded-md px-6 py-3
Secondary:  bg-transparent text-[#00304B] border border-[#00304B] rounded-md
Ghost:      bg-transparent text-[#00304B] hover:bg-[#00304B]/5
Gradient:   bg-gradient-to-br from-cyan-400 to-teal-600 text-[#0a0f1a] rounded-lg
            shadow-[0_0_30px_rgba(0,212,255,0.2)]
            hover:shadow-[0_0_50px_rgba(0,212,255,0.4)]

Hover: Always include a transition (300ms). Subtle lift (-translate-y-0.5) for CTAs.
Focus: Visible ring (ring-2 ring-offset-2 ring-[#0096B4]) for accessibility.
```

### Cards

```
Dark mode:  bg-neutral-950/80 border border-white/10 rounded-xl
            hover:border-white/20 transition-all duration-300
Light mode: bg-white border border-[#E1E5EB] rounded-xl shadow-md
Accent:     Add a gradient top border (2px) using brand gradient for featured cards
```

### Header / Navigation

```
Glassmorphism (scrolled):
  Dark:  bg-neutral-950/95 backdrop-blur-[20px] border-b border-white/10
  Light: bg-white/95 backdrop-blur-[20px] border-b border-black/10

Padding:
  Horizontal: px-5 md:px-[5%] lg:px-[6%]
  Vertical:   py-5 md:py-7 (default) → py-4 md:py-5 (scrolled)
  Transition: duration-400 on all properties

Nav links: text-[0.95rem] font-medium tracking-[0.01em]
           Underline animation on hover (2px cyan bar, left-to-right)
```

### Glow Effects (Premium Dark-Mode Polish)

```
Logo glow:      drop-shadow-[0_0_20px_rgba(0,150,180,0.25)]
CTA glow:       shadow-[0_0_30px_rgba(0,212,255,0.2)]
CTA hover glow: shadow-[0_0_50px_rgba(0,212,255,0.4)]
Card accent:    shadow-[0_0_40px_rgba(0,150,180,0.1)] on hover
Section divider: Horizontal gradient line, brand gradient, opacity 30%

Rule: Glow is SUBTLE. It should feel like moonlight on water, not a neon sign.
      Maximum one glowing element per viewport at rest. Hover glows are additive.
```

---

## Process for Every Frontend Task

### 1. Read Before Writing

- Read the file(s) you're modifying first. Understand existing patterns.
- Check `docs/BRAND-ALIGNMENT.md` for alignment status.
- Check if a Figma node exists for the element — use Figma MCP to verify.

### 2. Design Check

Before writing code, verify against these questions:
- Does the spacing follow the 8px grid?
- Are colors from the brand token list (not arbitrary hex values)?
- Does text follow the type scale (size, weight, line-height)?
- Is there enough breathing room? (When in doubt: more padding)
- On dark mode: does it feel premium, or just dark?
- On light mode: does the adaptation maintain the same visual weight?
- Is contrast WCAG 4.5:1 minimum for body text, 3:1 for large text?

### 3. Interaction Quality

- All interactive elements need visible hover states (color shift or lift)
- Transitions: 300ms for color/opacity, 400ms for layout shifts, 500ms for mode toggles
- Focus states: visible ring for keyboard navigation (WCAG requirement)
- No janky animations. If an animation doesn't feel smooth, remove it.

### 4. Performance Awareness

- Inline SVGs over image tags for icons and logos (0 HTTP requests)
- Lazy-load below-fold images
- Avoid layout shift (set explicit dimensions on media)
- CSS transitions over JavaScript animations where possible
- Target: under 2s First Contentful Paint

### 5. Mobile First

- Design for mobile viewport first, then enhance for desktop
- Touch targets: minimum 44px (per WCAG 2.5.5)
- Test that nothing overflows horizontally on 320px viewport
- Navigation collapses to hamburger below `lg` breakpoint (1024px)

---

## Anti-Patterns (Never Do These)

1. **Don't use arbitrary colors.** Every color must trace back to the brand token list.
   If you need a new shade, derive it from an existing brand color with opacity.
2. **Don't use `!important`.** Fix the specificity instead.
3. **Don't animate layout properties** (width, height, top, left). Use transform/opacity.
4. **Don't add decorative elements without purpose.** Every visual element must serve
   either brand recognition, visual hierarchy, or user guidance.
5. **Don't sacrifice readability for aesthetics.** If text is hard to read, the design
   has failed regardless of how good it looks.
6. **Don't use pure white (#FFFFFF) text on dark mode.** Use #E9ECEF or gray-200 for
   body text. Pure white is only for headings and emphasis.
7. **Don't forget the light mode.** Every dark-mode element needs a light-mode counterpart.
   Light mode is secondary but must still feel intentional, not broken.

---

## Figma Integration

The NLG Brand Kit is at:
```
File: GruAqLCND4Ub1uHPZTXXBX (North-Lantern-Brand-Kit)
Key nodes:
  3311:2    — Logo Master (full brand kit canvas)
  3325:81   — Lockup-Horizontal (primary gradient)
  3327:7    — Lockup-Horizontal-White (reversed)
  3324:19   — Icon-Clean [Main] (standalone icon)
  3334:138  — Color System
  3348:59   — LinkedIn Cover Photo (real-world usage reference)
  3334:71   — Favicon-32 (small-scale reference)
```

When implementing any brand element, **always check Figma first** using `get_screenshot`
and `get_design_context` to verify the exact design intent before coding.

---

## Current Codebase Reference

```
Framework:    Next.js 15 (App Router), React 19, TypeScript
Styling:      Tailwind CSS 3.x with custom NLG color system
Fonts:        Montserrat via next/font/google (var --font-montserrat)
Dark mode:    Manual toggle (isDarkMode prop), dark is default
Animations:   CSS-based (.reveal, .reveal-left, .reveal-right)
3D:           cobe (globe), custom canvas (ParticleCompass, FloatingParticles)
Icons:        lucide-react
```

---

## Evolutionary Notes (Self-Annealing Log)

### Session — Feb 23, 2026 (Initial Creation)
- Created directive from Figma brand kit deep-dive (11 nodes analyzed)
- Established logo sizing rules: h-12 md:h-14 with cyan glow on dark mode
- Defined glow effect philosophy: "moonlight on water, not neon sign"
- Sparkle responsive rule: visible at >= 48px, hidden below
- Header padding increased for premium breathing room
- Jira epic WEB-45 created for broader premium polish pass (WEB-46 through WEB-53)
- Reference site: igloo.inc — took the premium dark-mode philosophy,
  rejected the crypto aesthetic. NLG tone = authoritative + refined.
