# Logo Upgrade — Terminal CLI Prompt

> Copy everything below the line into a Claude Code terminal CLI session.
> This prompt is self-contained with all context needed.

---

You are resuming work as a Senior Web/Full Stack Developer on the North Lantern Group company website. The project is at:

```
/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend/
```

BEFORE DOING ANYTHING:
1. Read CLAUDE.md (has all project conventions, workflow rules, brand standards)
2. Read docs/BRAND-ALIGNMENT.md (has brand-to-code mapping)
3. Read docs/INFRASTRUCTURE.md (has deployment workflow)

## YOUR TASK: Replace the broken logo in the website header

### The Problem

The website header currently uses `/public/logo.png` — a 324KB white-background PNG that:
- Has NO transparency (shows white rectangle on the dark website background)
- Is an OLD brand version (wrong gradients, wrong N letterform, missing sparkle element)
- Is a raster image that blurs on retina displays
- Is 1536×1024 pixels being displayed at ~96px tall (massive waste)

The current implementation in `src/components/layout/Header.tsx` (lines 26-34):
```tsx
<a href="#" className="flex items-center gap-3">
  <Image
    src="/logo.png"
    alt="North Lantern Group"
    width={500}
    height={125}
    className="h-14 md:h-24 w-auto"
  />
</a>
```

### The Solution

Replace the PNG `<Image>` with inline SVG that uses the correct brand assets. The website already has the correct brand SVGs at `public/brand/logos/`.

### Brand Logo System (from NLG-Brand-Guidelines.html)

Three logo variants exist:
1. **Primary (Full Color)** — Gradient fill, for light backgrounds
2. **Monochrome (Astronaut Blue #00304B)** — Single color, for single-color applications
3. **Reversed (White)** — White fill, for dark backgrounds ← THIS IS WHAT WE NEED FOR DARK MODE

The logo structure is:
- **Broken frame**: An open-cornered square (bottom-left corner is open) — represents openness
- **"N" letterform**: Centered inside the frame — anchors the brand
- **Sparkle/star element**: 8-pointed star in the bottom-left gap — reinforces "lantern" illumination
- **"North Lantern Group" text**: Horizontal lockup to the right of the icon

### The Exact SVG Source Files (already in the project)

**For dark mode (default)** — use the White Reversed horizontal logo:
`public/brand/logos/reversed/svg/NLG-Logo-Horizontal-White.svg`

This SVG is 600×200 viewBox, contains:
- White frame path (stroke)
- White "N" letterform (fill)
- Sparkle element with a cyan-to-white gradient
- "North Lantern Group" text paths in white

**For light mode** — use the Primary (Full Color) horizontal logo:
`public/brand/logos/primary/svg/NLG-Logo-Horizontal.svg`

This SVG is 600×200 viewBox, contains:
- Frame path with brand gradient stroke (#0096B4 → #1B4965 → #0A1628)
- "N" letterform with gradient fill (#00B4D8 → #1B4965 → #03071E)
- Sparkle element with teal-to-navy gradient
- "North Lantern Group" text paths with gradient fill

### Implementation Requirements

1. **Use the Figma MCP to analyze the brand kit** at:
   `https://www.figma.com/design/GruAqLCND4Ub1uHPZTXXBX/North-Lantern-Brand-Kit?node-id=3311-2&p=f&t=OIQ7S057L6gwuzoH-0`

   Use `get_screenshot` and `get_design_context` on the logo nodes to verify the exact design intent. This will give you pixel-perfect reference for sizing, spacing, and visual treatment.

2. **Create an inline SVG React component** (`src/components/brand/NLGLogo.tsx`) that:
   - Accepts `variant` prop: `'white'` (dark backgrounds) or `'primary'` (light backgrounds)
   - Accepts `className` prop for sizing
   - Renders the horizontal lockup (icon + "North Lantern Group" text)
   - Uses proper SVG with linear gradient definitions
   - Is infinitely scalable (no raster artifacts ever)

3. **Update Header.tsx** to:
   - Remove the `import Image from "next/image"` (if no longer needed)
   - Import the new `NLGLogo` component
   - Switch variant based on `isDarkMode` prop (already available in Header)
   - Size: approximately `h-8 md:h-10` (32-40px tall) — the current h-14/h-24 is WAY too big
   - The logo should feel premium, proportional, and refined — not oversized

4. **Brand guidelines sizing rules:**
   - Minimum size: 32px (digital)
   - Clear space: Equal to the height of the "N" on all sides
   - Below 48px: Remove the sparkle element for clarity

5. **The dark mode aesthetic MUST be preserved.** Dark mode is the default and intentional.

6. **Performance requirements:**
   - SVG inline = 0 extra HTTP requests (better than any image)
   - Remove the old logo.png from the `<Image>` component (but don't delete the file yet)
   - Total SVG weight should be under 15KB

### Brand Colors Reference

| Name | Hex | Usage in logo |
|------|-----|---------------|
| Astronaut Blue | #00304B | Frame, sparkle gradient endpoint |
| Teal | #0096B4 | Frame gradient start, sparkle gradient start |
| Deep Ocean | #1B4965 | Gradient midpoint |
| Dark Navy | #0A1628 | Gradient endpoint |
| Cyan accent | #00B4D8 | N letterform gradient start |

### Workflow Rules (CRITICAL)

- **NEVER push without Hamza's explicit approval.** Explain what changed and why first.
- **Branch naming:** `feature/WEB-XX-description` (get or create a Jira ticket)
- **Commit messages:** Start with the Jira issue key in uppercase (e.g., `WEB-35 Replace logo with inline SVG`)
- **Workflow:** feature branch → PR to `dev` → test on staging → PR to `main` → production
- **Git email:** `hamzachundrigar@gmail.com` (NEVER use hamza@ion8.net)
- Check if a Jira ticket exists for logo work. The Jira board is at northlanterngroup.atlassian.net, project WEB. API access via `hamza@northlanterngroup.com` with token at `~/.atlassian-api-token`. Use `/rest/api/3/search/jql` endpoint.
- The epic for site-wide brand alignment is WEB-33.

### Quality Bar

This is the hero element of the website — it's the FIRST thing visitors see. The logo must look:
- **Razor-sharp** at every screen size (SVG guarantees this)
- **Professional** — clean, refined, appropriate spacing
- **Correctly branded** — exact colors, exact gradients, exact geometry from the brand guidelines
- **Properly responsive** — scales gracefully from mobile to desktop
- **Mode-aware** — white on dark, gradient on light, with smooth transitions

### What SUCCESS Looks Like

When done, the header logo should:
1. Be an inline SVG (not an image tag)
2. Show the white reversed logo on dark backgrounds
3. Show the primary gradient logo on light backgrounds
4. Be crisp and sharp at all resolutions including 3x retina
5. Be properly sized (not the giant bloated version currently)
6. Have the correct brand identity (broken frame + N + sparkle + "North Lantern Group" text)
7. Transition smoothly when toggling dark/light mode
8. Be committed to a feature branch with proper Jira linking

After implementing, show me the changes and explain what you did before pushing anything.
