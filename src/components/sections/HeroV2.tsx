"use client";

import dynamic from "next/dynamic";
import { IconArrow } from "@/components/icons/PracticeIcons";
import { BOOKING_URL } from "@/config/site";

const OperationsConsole = dynamic(() => import("@/components/OperationsConsole"), {
  ssr: false,
  loading: () => (
    <div className="nlg-console-wrap">
      <div
        className="nlg-console"
        aria-hidden="true"
        style={{ minHeight: 520 }}
      />
    </div>
  ),
});

export default function HeroV2() {
  return (
    <section className="nlg-hero" id="top">
      <div className="nlg-wrap nlg-hero-grid">
        <div className="nlg-hero-left">
          <div className="nlg-hero-eyebrow nlg-eyebrow">Results that endure.</div>

          <h1 className="nlg-h1">
            Fix the systems your team has <span className="accent">outgrown.</span>
          </h1>

          <p className="nlg-hero-sub">
            North Lantern Group is a full-cycle operations and implementation consulting firm that designs, improves, and implements Atlassian platforms, business intelligence systems, and workflow automations that reduce manual work, create reporting leaders can trust, and make operations easier to scale.
          </p>

          <div className="nlg-hero-actions">
            <a
              className="nlg-btn nlg-btn-primary nlg-btn-lg"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call <IconArrow size={16} />
            </a>
            <a className="nlg-btn nlg-btn-secondary nlg-btn-lg" href="#process">
              How we work
            </a>
          </div>
        </div>

        <OperationsConsole />
      </div>
    </section>
  );
}
