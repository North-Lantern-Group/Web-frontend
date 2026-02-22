"use client";

import { memo } from "react";
import { Target } from "lucide-react";

function About() {
  return (
    <section id="about" className="py-16 md:py-32 bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
          {/* Left side - Story Content */}
          <div className="reveal-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 md:mb-12 leading-[1.2]">
              We build the systems<br />
              that power modern<br />
              enterprises
            </h2>

            <div className="space-y-6 md:space-y-8 text-gray-400 text-base md:text-xl leading-[1.8] md:leading-[1.9]">
              <p>
                North Lantern Group emerged from a simple observation: organizations need more than implementation partners—they need strategic allies who understand both the technical complexities and business imperatives of digital transformation.
              </p>
              <p className="hidden md:block">
                We recognized a critical gap in the market. Businesses weren&apos;t just looking for tool deployment. They needed architects who could design solutions that evolve with their organizations, providing both the infrastructure for collaboration and the intelligence layer for decision-making.
              </p>
              <p>
                Today, we serve clients across diverse verticals, combining deep technical expertise in Atlassian ecosystems with advanced business intelligence capabilities—all delivered with startup speed and enterprise rigor.
              </p>
            </div>

            <a
              href="#services"
              className="inline-flex items-center gap-3 mt-8 md:mt-12 px-6 md:px-8 py-3 md:py-4 bg-neutral-800 border border-white/10 rounded-lg text-white text-base md:text-lg font-medium transition-all duration-300 hover:bg-neutral-700 hover:border-white/20"
            >
              Our Capabilities
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/* Right side - Our Mission Card */}
          <div className="flex justify-center md:justify-end items-start pt-0 md:pt-4 reveal-right">
            <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 border border-cyan-500/20 rounded-2xl p-6 md:p-10 w-full md:max-w-lg">
              {/* Icon */}
              <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 md:mb-8">
                <Target className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>

              <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">Our Mission</h3>
              <p className="text-neutral-300 text-base md:text-xl leading-[1.8] md:leading-[1.9]">
                Empower organizations with tools, insights, and strategies that illuminate the path to sustainable growth. We don&apos;t just implement technology—we architect transformation that compounds value over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(About);
