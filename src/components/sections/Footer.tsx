"use client";

import { memo } from "react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="border-t border-white/5 pt-10 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 md:mb-6">
              <Image
                src="/logo.png"
                alt="North Lantern Group"
                width={200}
                height={60}
                className="h-10 md:h-14 w-auto"
              />
            </div>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
              Canadian consultancy rebuilding Atlassian, reporting, and the integration layer between the tools your team depends on.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/northlanterngroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 md:w-10 h-9 md:h-10 bg-white/5 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-cyan-400 hover:text-neutral-900 transition-all text-sm"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold text-base md:text-lg mb-4 md:mb-6">Services</h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><a href="#services" className="text-neutral-400 hover:text-cyan-400 transition-colors">Atlassian Systems</a></li>
              <li><a href="#services" className="text-neutral-400 hover:text-cyan-400 transition-colors">BI and Operational Reporting</a></li>
              <li><a href="#services" className="text-neutral-400 hover:text-cyan-400 transition-colors">Automation and Integration</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold text-base md:text-lg mb-4 md:mb-6">Company</h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><a href="#about" className="text-neutral-400 hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="#why-us" className="text-neutral-400 hover:text-cyan-400 transition-colors">How we work</a></li>
              <li><a href="#pricing" className="text-neutral-400 hover:text-cyan-400 transition-colors">Engagements</a></li>
              <li><a href="#contact" className="text-neutral-400 hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-xs md:text-sm">&copy; 2026 North Lantern Group Inc. All rights reserved.</p>
          <div className="flex gap-6 md:gap-8">
            <a href="/privacy" className="text-neutral-500 text-xs md:text-sm hover:text-cyan-400 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
