"use client";

import { useEffect, useRef, useState } from "react";

const FULL_TEXT =
  "We work with teams of 5 to 500 that actually want the thing fixed. If you're looking for transformation theatre, 27 discovery workshops, a partner who says 'synergies' like it's a medical condition, and slide decks heavier than your laptop. We're probably not the right fit for you. But we hear Deloitte is accepting meetings. Tell them we said hi. We'll be here when you want it actually built.";

function getCharDelay(ch: string | undefined): number {
  if (!ch) return 20;
  if (ch === "." || ch === "?" || ch === "!") return 140;
  if (ch === ",") return 60;
  if (ch === ";" || ch === ":") return 80;
  if (ch === " ") return 14 + Math.random() * 8;
  return 18 + Math.random() * 10;
}

export default function BuyerQualifier() {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayed(FULL_TEXT);
      setDone(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let i = 0;

    const advance = () => {
      if (cancelled) return;
      if (i >= FULL_TEXT.length) {
        setDone(true);
        return;
      }
      const ch = FULL_TEXT[i];
      i++;
      setDisplayed(FULL_TEXT.slice(0, i));
      timeoutId = setTimeout(advance, getCharDelay(ch));
    };

    advance();
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [started]);

  return (
    <section className="nlg-buyer-qualifier" aria-label="Who we work with">
      <div className="nlg-wrap" ref={ref}>
        <p className="nlg-bq-text" aria-label={FULL_TEXT}>
          <span className="nlg-sr-only">{FULL_TEXT}</span>
          <span className="nlg-bq-prompt" aria-hidden="true">
            {">"}
          </span>
          <span className="nlg-bq-typed" aria-hidden="true">
            {displayed}
            <span className={`nlg-bq-caret ${done ? "nlg-bq-caret-idle" : ""}`} aria-hidden="true">
              ▌
            </span>
          </span>
        </p>
      </div>
    </section>
  );
}
