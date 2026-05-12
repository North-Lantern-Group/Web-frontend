"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NLGLogo from "@/components/brand/NLGLogo";
import { BOOKING_URL } from "@/config/site";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nlg-nav ${scrolled ? "nlg-scrolled" : ""}`}>
      <div className="nlg-nav-in">
        <Link href="/" className="nlg-nav-brand" aria-label="North Lantern Group home">
          <NLGLogo variant="white" className="h-9 md:h-10" hideTextOnMobile />
        </Link>

        <ul className="nlg-nav-links" aria-label="Primary">
          <li className="nlg-nav-item nlg-nav-has-menu">
            <a href="#practices">Practices</a>
            <div className="nlg-nav-submenu" aria-label="Practice areas">
              <a href="#atlassian">Atlassian Platform</a>
              <a href="#bi">BI and Analytics</a>
              <a href="#automation">Automation and Integration</a>
            </div>
          </li>
          <li>
            <a href="#engagements">Engagements</a>
          </li>
          <li>
            <a href="#process">Process</a>
          </li>
          <li>
            <a href="#belief">About</a>
          </li>
        </ul>

        <div className="nlg-nav-right">
          <a
            className="nlg-btn nlg-btn-primary"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nlg-nav-mobile-toggle"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="nlg-mobile-nav"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="nlg-mobile-nav" className="nlg-mobile-nav">
          <nav aria-label="Mobile navigation">
            <ul>
              <li>
                <a href="#practices" onClick={() => setMobileMenuOpen(false)}>Practices</a>
                <ul className="nlg-mobile-subnav" aria-label="Practice areas">
                  <li>
                    <a href="#atlassian" onClick={() => setMobileMenuOpen(false)}>Atlassian Platform</a>
                  </li>
                  <li>
                    <a href="#bi" onClick={() => setMobileMenuOpen(false)}>BI and Analytics</a>
                  </li>
                  <li>
                    <a href="#automation" onClick={() => setMobileMenuOpen(false)}>Automation and Integration</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#engagements" onClick={() => setMobileMenuOpen(false)}>Engagements</a>
              </li>
              <li>
                <a href="#process" onClick={() => setMobileMenuOpen(false)}>Process</a>
              </li>
              <li>
                <a href="#belief" onClick={() => setMobileMenuOpen(false)}>About</a>
              </li>
              <li className="nlg-mobile-cta">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="nlg-btn nlg-btn-primary"
                >
                  Book a call
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
