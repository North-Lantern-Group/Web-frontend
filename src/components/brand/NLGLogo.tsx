/**
 * NLGLogo — Brand lockup: inline SVG icon + HTML text
 *
 * Splits the horizontal lockup into independently-sized elements:
 *   - Icon SVG (broken frame + N letterform + sparkle) — scales with container
 *   - "North Lantern Group" as real HTML text — Montserrat SemiBold, independently sized
 *
 * This approach solves the text readability issue: in the original monolithic SVG,
 * the icon consumed ~93% of the vertical space, leaving text at ~7%. By splitting
 * them, the text can be sized for readability while the icon scales independently.
 *
 * Two variants:
 *   - "white"   — White icon + white text, for dark backgrounds (default)
 *   - "primary" — Brand gradient icon + gradient text, for light backgrounds
 *
 * Source of truth: NLG Brand Guidelines v1.0 (January 2026)
 * SVG icon paths from: public/brand/logos/{reversed,primary}/svg/NLG-Logo-Horizontal-*.svg
 */

interface NLGLogoProps {
  /** "white" for dark backgrounds, "primary" for light backgrounds */
  variant?: "white" | "primary";
  /** Tailwind / CSS classes — height controls icon size, text is independent */
  className?: string;
}

export default function NLGLogo({
  variant = "white",
  className = "",
}: NLGLogoProps) {
  if (variant === "primary") return <PrimaryLogo className={className} />;
  return <WhiteLogo className={className} />;
}

/* ────────────────────────────────────────────────────────────────────────────
 * White (Reversed) variant — for dark backgrounds
 * ──────────────────────────────────────────────────────────────────────────── */
function WhiteLogo({ className }: { className: string }) {
  return (
    <div className={`flex items-center gap-2.5 md:gap-3 ${className}`}>
      <svg
        viewBox="25 25 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nlg-w-sparkle" x1="47" y1="146" x2="47" y2="166" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00CCF5" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <clipPath id="nlg-w-clip">
            <rect width="140" height="140" fill="white" transform="translate(30 30)" />
          </clipPath>
        </defs>
        <g clipPath="url(#nlg-w-clip)">
          {/* Broken frame */}
          <path d="M37.1333 129.866V37.1333H165.533V165.533H72.7999" stroke="white" strokeWidth="12.4833" strokeLinecap="square" />
          {/* N letterform */}
          <path d="M78.5065 126.3V76.3665H88.0651L117.526 112.318H112.889V76.3665H124.302V126.3H114.815L85.2831 90.3477H89.9198V126.3H78.5065Z" fill="white" />
          {/* Sparkle */}
          <path d="M47 146L49.1213 153.879L57 156L49.1213 158.121L47 166L44.8787 158.121L37 156L44.8787 153.879L47 146Z" fill="url(#nlg-w-sparkle)" />
        </g>
      </svg>
      <span className="text-white font-semibold text-[0.9375rem] md:text-lg tracking-[-0.02em] whitespace-nowrap">
        North Lantern Group
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Primary (Full Color Gradient) variant — for light backgrounds
 * ──────────────────────────────────────────────────────────────────────────── */
function PrimaryLogo({ className }: { className: string }) {
  return (
    <div className={`flex items-center gap-2.5 md:gap-3 ${className}`}>
      <svg
        viewBox="25 25 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0"
        aria-hidden="true"
      >
        <defs>
          {/* Frame gradient: Teal → Deep Ocean → Dark Navy */}
          <linearGradient id="nlg-p-frame" x1="103.919" y1="35.5283" x2="103.919" y2="172.131" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0096B4" />
            <stop offset="0.5" stopColor="#1B4965" />
            <stop offset="1" stopColor="#0A1628" />
          </linearGradient>
          {/* N letterform gradient: Cyan → Deep Ocean → Near Black */}
          <linearGradient id="nlg-p-n" x1="101.404" y1="76.3665" x2="101.404" y2="126.3" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B4D8" />
            <stop offset="0.5" stopColor="#1B4965" />
            <stop offset="1" stopColor="#03071E" />
          </linearGradient>
          {/* Sparkle gradient: Teal → Astronaut Blue */}
          <linearGradient id="nlg-p-sparkle" x1="45.5" y1="146" x2="45.5" y2="166" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0098B6" />
            <stop offset="1" stopColor="#00304B" />
          </linearGradient>
          <clipPath id="nlg-p-clip">
            <rect width="140" height="140" fill="white" transform="translate(30 30)" />
          </clipPath>
        </defs>
        <g clipPath="url(#nlg-p-clip)">
          {/* Broken frame */}
          <path d="M37.1333 129.866V37.1333H165.533V165.533H72.7999" stroke="url(#nlg-p-frame)" strokeWidth="12.4833" strokeLinecap="square" />
          {/* N letterform */}
          <path d="M78.5065 126.3V76.3665H88.0651L117.526 112.318H112.889V76.3665H124.302V126.3H114.815L85.2831 90.3478H89.9198V126.3H78.5065Z" fill="url(#nlg-p-n)" />
          {/* Sparkle */}
          <path d="M45.5 146L47.3031 153.879L54 156L47.3031 158.121L45.5 166L43.6969 158.121L37 156L43.6969 153.879L45.5 146Z" fill="url(#nlg-p-sparkle)" />
        </g>
      </svg>
      <span className="font-semibold text-[0.9375rem] md:text-lg tracking-[-0.02em] whitespace-nowrap bg-gradient-to-b from-[#00B4D8] to-[#03071E] bg-clip-text text-transparent">
        North Lantern Group
      </span>
    </div>
  );
}
