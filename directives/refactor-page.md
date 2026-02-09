# Directive: Refactor Monolithic page.tsx

**Version:** 1.0
**Last updated:** 2026-02-08
**Status:** Complete (retrospective SOP)

## Purpose

This directive documents the pattern used to refactor `src/app/page.tsx` from a ~1,400-line
monolithic client component into a thin shell (~78 lines) that composes discrete section
components. Use this as the reference pattern for any future component extraction work.

## When to Use

- Extracting a large section of markup/logic from page.tsx into its own component
- Adding a new page section to the site
- Deciding how to handle shared state across sections

## Procedure

### 1. Identify extraction boundaries

Each visual section of the page (Hero, Services, Contact, etc.) becomes its own component.
The boundaries are the top-level `<section>` or semantic wrapper elements.

**Checklist for a clean boundary:**
- The section has a clear visual start and end on the page
- Internal state (e.g., form fields, accordion toggles) does not leak to other sections
- Shared state (dark mode, scroll position) is passed via props from the parent

### 2. Create the component file

Place section components in `src/components/sections/` and layout components in
`src/components/layout/`.

**Naming convention:**
- File name matches the component name: `Hero.tsx`, `Services.tsx`, `Footer.tsx`
- PascalCase for both file and export name
- One component per file

**Component template:**
```tsx
"use client";

import { /* dependencies */ } from "...";

interface SectionNameProps {
  isDarkMode: boolean;
  // other props this section needs
}

export default function SectionName({ isDarkMode }: SectionNameProps) {
  // section-internal state here (form fields, toggles, etc.)

  return (
    <section id="section-name" className="...">
      {/* section content */}
    </section>
  );
}
```

### 3. Handle state management

**Principle: lift only what must be shared; keep everything else local.**

| State | Where it lives | Passed as |
|-------|---------------|-----------|
| Dark mode toggle | `page.tsx` (root) | `isDarkMode` prop to every section |
| Scroll-reveal observer | `page.tsx` useEffect | Global (reads DOM classes) |
| Form fields, validation | `Contact.tsx` | Local useState inside Contact |
| Accordion/tab state | Respective section | Local useState |
| Mobile menu open/close | `Header.tsx` | Local useState |

The dark mode boolean is the only prop that flows from page.tsx to all children. This was
a deliberate decision to avoid introducing a context provider for a single boolean.

### 4. Move the markup

1. Cut the section's JSX from page.tsx
2. Paste into the new component's return statement
3. Move any `useState`, `useEffect`, handler functions that are used **only** by this section
4. Convert any references to parent state into props
5. Add the import in page.tsx and render the component

### 5. Verify

Run through this checklist after each extraction:

- [ ] `npm run build` passes with no errors
- [ ] `npm run lint` passes with no errors
- [ ] Dev server renders the section identically to before
- [ ] Dark mode toggle still works for the section
- [ ] Scroll-reveal animations still fire on the section
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No console errors in the browser

### 6. Final structure achieved

```
src/app/page.tsx                          # Thin shell (~78 lines)
src/components/layout/Header.tsx          # Nav bar, mobile menu, logo
src/components/sections/Hero.tsx          # Hero with dark/light backgrounds
src/components/sections/Stats.tsx         # Stat counters
src/components/sections/About.tsx         # About / mission section
src/components/sections/Services.tsx      # Service cards with xarrows diagrams
src/components/sections/WhyNorthLantern.tsx  # Value propositions
src/components/sections/Testimonials.tsx  # Client testimonials
src/components/sections/Pricing.tsx       # Pricing tiers
src/components/sections/Contact.tsx       # Contact form (form state is local)
src/components/sections/Footer.tsx        # Footer with links and copyright
```

Visual effect components remain at `src/components/` root level:
- `Globe.tsx`, `ParticleCompass.tsx`, `FloatingParticles.tsx`, `CloudBackground.tsx`

## Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| Props over Context for dark mode | Single boolean, only one level deep. Context adds complexity for no benefit here. |
| `"use client"` on every section | All sections use browser APIs (scroll, intersection, mouse events) or have internal state. Server components were not viable. |
| Scroll observer stays in page.tsx | It queries all `.reveal` classes globally. Moving it into each section would duplicate the observer. |
| No barrel exports (`index.ts`) | With only ~10 components, direct imports are clearer and tree-shaking is unaffected. |

## Self-Annealing Notes

If you run this refactor pattern again (e.g., extracting sub-components from a section):
1. After fixing any errors, update this directive with the new lesson
2. If a verification step is missing, add it to the checklist in step 5
3. If a new state-sharing pattern emerges, add it to the table in step 3
