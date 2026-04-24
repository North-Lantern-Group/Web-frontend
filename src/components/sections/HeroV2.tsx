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
            The <span className="accent">senior team</span> your Atlassian, BI, and automation work deserves.
          </h1>

          <p className="nlg-hero-sub">
            Senior operators for Atlassian, BI, and operational automation. Same team from first call to handover.
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
            <a className="nlg-btn nlg-btn-secondary nlg-btn-lg" href="#how-we-work">
              How we work
            </a>
          </div>
        </div>

        <OperationsConsole />
      </div>
    </section>
  );
}
