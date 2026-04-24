"use client";

import { useEffect, useRef, useState } from "react";

type System = { name: string; id: string; status: "ok" | "amber" };
type Glyph = { x: number; y: number; w: number; h: number };

const SYSTEMS: System[] = [
  { name: "jira.04", id: "a7c2", status: "ok" },
  { name: "conf.ops", id: "b391", status: "ok" },
  { name: "jsm.queue", id: "c5d0", status: "ok" },
  { name: "crm.sync", id: "d2f7", status: "amber" },
  { name: "bi.ws01", id: "e9a4", status: "ok" },
];

const GLYPHS: Glyph[] = [
  { x: 40, y: 46, w: 34, h: 18 },
  { x: 110, y: 68, w: 34, h: 18 },
  { x: 186, y: 46, w: 34, h: 18 },
  { x: 258, y: 72, w: 34, h: 18 },
  { x: 70, y: 118, w: 34, h: 18 },
  { x: 146, y: 142, w: 34, h: 18 },
  { x: 228, y: 122, w: 34, h: 18 },
  { x: 296, y: 146, w: 34, h: 18 },
];

const SPARK_PATHS = [
  "M2,14 L8,8 L14,11 L20,5 L26,9 L32,4",
  "M2,10 L8,13 L14,6 L20,9 L26,4 L32,8",
  "M2,6 L8,10 L14,4 L20,11 L26,7 L32,12",
  "M2,11 L8,4 L14,9 L20,6 L26,12 L32,7",
];

const GRID_COLS = 11;
const GRID_ROWS = 6;
const GRID_X = 50;
const GRID_Y = 440;
const GRID_CELL = 24;

export default function Beacon() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ tiltX: 0, tiltY: 0, scrollY: 0, glow: 0 });
  const current = useRef({ tiltX: 0, tiltY: 0, scrollY: 0, glow: 0 });
  const timestampRef = useRef<SVGTextElement>(null);
  const runIdRef = useRef<SVGTextElement>(null);
  const startRef = useRef(0);

  const [visible, setVisible] = useState(false);
  const [beat, setBeat] = useState<string>("");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    startRef.current = Date.now();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (!detail) return;
      setBeat(detail);
      const id = window.setTimeout(() => setBeat(""), 2000);
      return () => window.clearTimeout(id);
    };
    window.addEventListener("nlg-belief-beat", handler as EventListener);
    return () => window.removeEventListener("nlg-belief-beat", handler as EventListener);
  }, []);

  // Live timestamp counter via direct DOM update (no React re-render)
  useEffect(() => {
    if (reduceMotion) {
      if (timestampRef.current) timestampRef.current.textContent = "t+0000.0s";
      if (runIdRef.current) runIdRef.current.textContent = "RUN 4832";
      return;
    }
    let runId = 4832;
    let lastRunCycle = 0;
    const id = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      if (timestampRef.current) {
        timestampRef.current.textContent = `t+${elapsed.toFixed(1).padStart(7, "0")}s`;
      }
      const cycle = Math.floor(elapsed / 14);
      if (cycle > lastRunCycle) {
        runId += 1;
        lastRunCycle = cycle;
        if (runIdRef.current) runIdRef.current.textContent = `RUN ${runId}`;
      }
    }, 250);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // RAF loop for tilt + scroll parallax + glow lerp
  useEffect(() => {
    if (reduceMotion) {
      if (ref.current) {
        ref.current.style.transform = "";
        ref.current.style.setProperty("--beacon-glow", "1");
      }
      return;
    }
    const animate = () => {
      const lerp = 0.14;
      current.current.tiltX += (target.current.tiltX - current.current.tiltX) * lerp;
      current.current.tiltY += (target.current.tiltY - current.current.tiltY) * lerp;
      current.current.scrollY += (target.current.scrollY - current.current.scrollY) * lerp;
      current.current.glow += (target.current.glow - current.current.glow) * 0.08;

      if (ref.current) {
        ref.current.style.transform = `translate3d(0, ${current.current.scrollY.toFixed(2)}px, 0) perspective(1400px) rotateX(${current.current.tiltY.toFixed(2)}deg) rotateY(${current.current.tiltX.toFixed(2)}deg)`;
        ref.current.style.setProperty("--beacon-glow", current.current.glow.toFixed(3));
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  // Scroll parallax
  useEffect(() => {
    if (reduceMotion) return;
    const handler = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (viewportCenter - elementCenter) * 0.055;
      target.current.scrollY = Math.max(-38, Math.min(38, offset));
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [reduceMotion]);

  // Magnetic hover proximity: beacon tilts toward cursor when nearby, brightens on approach
  useEffect(() => {
    if (reduceMotion) return;
    const handler = (e: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const proximityRadius = 320;
      if (dist < proximityRadius) {
        const t = 1 - dist / proximityRadius;
        const insideX = e.clientX >= rect.left && e.clientX <= rect.right;
        const insideY = e.clientY >= rect.top && e.clientY <= rect.bottom;
        const inside = insideX && insideY;
        const multiplier = inside ? 3.2 : 2.0 * t;

        const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
        const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)));
        target.current.tiltX = nx * multiplier;
        target.current.tiltY = -ny * multiplier;
        target.current.glow = 0.5 + t * 0.5;
      } else {
        target.current.tiltX = 0;
        target.current.tiltY = 0;
        target.current.glow = 0.5;
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className={`nlg-beacon ${visible ? "nlg-beacon-visible" : ""} ${beat ? `nlg-beacon-beat-${beat}` : ""}`}
      aria-hidden="true"
    >
      <div className="nlg-beacon-halo" />
      <div className="nlg-beacon-frame">
        <div className="nlg-beacon-noise" />

        <svg
          className="nlg-beacon-svg"
          viewBox="0 0 380 640"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="beacon-zone-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 235, 244, 0.09)" />
              <stop offset="100%" stopColor="rgba(0, 235, 244, 0.02)" />
            </linearGradient>
            <linearGradient id="beacon-zone-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 174, 239, 0.04)" />
              <stop offset="100%" stopColor="rgba(0, 174, 239, 0.08)" />
            </linearGradient>
            <radialGradient id="beacon-zone-res" cx="50%" cy="95%" r="75%">
              <stop offset="0%" stopColor="rgba(0, 235, 244, 0.35)" />
              <stop offset="40%" stopColor="rgba(0, 174, 239, 0.2)" />
              <stop offset="80%" stopColor="rgba(0, 69, 95, 0.12)" />
              <stop offset="100%" stopColor="rgba(0, 69, 95, 0)" />
            </radialGradient>
            <linearGradient id="beacon-scan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0, 235, 244, 0)" />
              <stop offset="30%" stopColor="rgba(0, 235, 244, 0.6)" />
              <stop offset="50%" stopColor="rgba(0, 235, 244, 0.95)" />
              <stop offset="70%" stopColor="rgba(0, 235, 244, 0.6)" />
              <stop offset="100%" stopColor="rgba(0, 235, 244, 0)" />
            </linearGradient>
            <radialGradient id="beacon-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0, 235, 244, 1)" />
              <stop offset="40%" stopColor="rgba(0, 235, 244, 0.55)" />
              <stop offset="100%" stopColor="rgba(0, 235, 244, 0)" />
            </radialGradient>
            <pattern id="beacon-midlines" x="0" y="0" width="380" height="5" patternUnits="userSpaceOnUse">
              <line x1="0" y1="2" x2="380" y2="2" stroke="rgba(0, 174, 239, 0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="380" height="205" fill="url(#beacon-zone-top)" />
          <rect x="0" y="205" width="380" height="180" fill="url(#beacon-zone-mid)" />
          <rect x="0" y="205" width="380" height="180" fill="url(#beacon-midlines)" className="beacon-midlines" />
          <rect x="0" y="385" width="380" height="255" fill="url(#beacon-zone-res)" />

          <g className="beacon-chrome">
            <text className="beacon-caption beacon-mono" x="190" y="22" textAnchor="middle">NLG.LAYER</text>
            <text
              ref={timestampRef}
              className="beacon-timestamp beacon-mono"
              x="358"
              y="22"
              textAnchor="end"
            >
              t+0000.0s
            </text>
            <text
              ref={runIdRef}
              className="beacon-run beacon-mono"
              x="22"
              y="22"
            >
              RUN 4832
            </text>
          </g>

          <g className="beacon-zone-labels beacon-mono">
            <text x="22" y="200" className="beacon-zone-label">01 · SURFACES</text>
            <text x="22" y="380" className="beacon-zone-label">02 · SYSTEMS</text>
            <text x="22" y="414" className="beacon-zone-label beacon-zone-label-active">03 · FOUNDATION</text>
          </g>

          <g className="beacon-glyphs">
            {GLYPHS.map((g, i) => (
              <g
                key={i}
                transform={`translate(${g.x}, ${g.y})`}
                className={`beacon-glyph beacon-glyph-p${i % 5}`}
              >
                <rect
                  x="0"
                  y="0"
                  width={g.w}
                  height={g.h}
                  fill="rgba(0, 174, 239, 0.04)"
                  stroke="rgba(0, 174, 239, 0.28)"
                  strokeWidth="0.5"
                  rx="1"
                />
                <path
                  d={SPARK_PATHS[i % SPARK_PATHS.length]}
                  stroke="rgba(0, 235, 244, 0.55)"
                  strokeWidth="0.75"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ))}
          </g>

          <g className="beacon-systems beacon-mono">
            {SYSTEMS.map((s, i) => {
              const y = 238 + i * 24;
              return (
                <g key={s.id} className={`beacon-system beacon-system-p${i}`}>
                  <circle
                    cx="52"
                    cy={y}
                    r="2.5"
                    className={`beacon-system-dot beacon-system-dot-${s.status}`}
                  />
                  <text x="62" y={y + 3} className="beacon-system-name">{s.name}</text>
                  <line
                    x1="130"
                    y1={y}
                    x2="280"
                    y2={y}
                    stroke="rgba(0, 174, 239, 0.1)"
                    strokeWidth="0.5"
                    strokeDasharray="1 3"
                  />
                  <text x="325" y={y + 3} className="beacon-system-id" textAnchor="end">{s.id}</text>
                </g>
              );
            })}
          </g>

          <g className="beacon-grid">
            {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
              const col = i % GRID_COLS;
              const row = Math.floor(i / GRID_COLS);
              const x = GRID_X + col * GRID_CELL;
              const y = GRID_Y + row * GRID_CELL;
              const centerDist = Math.sqrt(
                Math.pow(col - (GRID_COLS - 1) / 2, 2) + Math.pow(row - (GRID_ROWS - 1) / 2, 2),
              );
              const phase = (col * 3 + row * 5) % 8;
              const nearCenter = centerDist < 2;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={nearCenter ? 1.6 : 1.2}
                  className={`beacon-node beacon-node-p${phase}${nearCenter ? " beacon-node-core-adj" : ""}`}
                />
              );
            })}
          </g>

          <g className="beacon-core-group" transform="translate(190, 528)">
            <circle r="26" fill="url(#beacon-core)" className="beacon-core-halo" />
            <circle r="16" fill="none" stroke="rgba(0, 235, 244, 0.35)" strokeWidth="0.75" className="beacon-core-ring-outer" />
            <circle r="10" fill="none" stroke="rgba(0, 235, 244, 0.55)" strokeWidth="0.75" className="beacon-core-ring-inner" />
            <circle r="2.5" fill="rgba(0, 235, 244, 0.95)" className="beacon-core-dot" />
          </g>

          <g className="beacon-edge-labels beacon-mono">
            <text x="70" y="425" className="beacon-edge-label">governance</text>
            <text x="188" y="425" textAnchor="middle" className="beacon-edge-label">rbac</text>
            <text x="320" y="425" textAnchor="end" className="beacon-edge-label">contracts</text>
            <text x="190" y="620" textAnchor="middle" className="beacon-edge-label">lifecycle · runbooks · review</text>
          </g>

          <g className="beacon-spine">
            <line
              x1="190"
              y1="36"
              x2="190"
              y2="390"
              stroke="rgba(0, 174, 239, 0.22)"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
          </g>

          <g className="beacon-rings">
            <line
              x1="16"
              y1="205"
              x2="364"
              y2="205"
              stroke="rgba(0, 174, 239, 0.5)"
              strokeWidth="1"
            />
            <line
              x1="12"
              y1="385"
              x2="368"
              y2="385"
              stroke="rgba(0, 174, 239, 0.78)"
              strokeWidth="1.4"
              className="beacon-ring-lower"
            />
          </g>

          <g className="beacon-scan-group">
            <line
              x1="20"
              y1="0"
              x2="360"
              y2="0"
              stroke="url(#beacon-scan)"
              strokeWidth="1"
              className="beacon-scan-line"
            />
          </g>

          <g className="beacon-bottom-chrome beacon-mono">
            <text x="22" y="626" className="beacon-coord">4A.2E</text>
            <text x="358" y="626" textAnchor="end" className="beacon-coord">1B.7F</text>
            <text x="190" y="634" textAnchor="middle" className="beacon-serial">
              LNT-03 · REV 2.4.1 · 2026
            </text>
          </g>
        </svg>

        <div className="nlg-beacon-packet nlg-beacon-packet-1" />
        <div className="nlg-beacon-packet nlg-beacon-packet-2" />
        <div className="nlg-beacon-packet nlg-beacon-packet-3" />

        <div className="nlg-beacon-corner nlg-beacon-corner-tl" />
        <div className="nlg-beacon-corner nlg-beacon-corner-tr" />
        <div className="nlg-beacon-corner nlg-beacon-corner-bl" />
        <div className="nlg-beacon-corner nlg-beacon-corner-br" />

        <div className="nlg-beacon-edge" />
      </div>
    </div>
  );
}
