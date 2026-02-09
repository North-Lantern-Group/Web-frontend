"use client";

import { memo } from "react";

function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-28 bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 reveal">
          <p className="text-xs md:text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 md:mb-4">Engagement Models</p>
          <h2 className="text-2xl md:text-5xl font-medium text-white tracking-tight mb-4 md:mb-6">Flexible Structures for Every Need</h2>
          <p className="text-sm md:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Choose the engagement model that aligns with your project scope, timeline, and organizational preferences. All models include senior consultant engagement and transparent communication.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 reveal-stagger">
          {/* Project-Based */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-2">
            <div className="text-3xl md:text-4xl mb-4 md:mb-6">📋</div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Project-Based</h3>
            <p className="text-cyan-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">Fixed Scope</p>
            <p className="text-neutral-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              Defined deliverables. Clear timeline. Predictable investment. Ideal for implementations with well-understood requirements.
            </p>
            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base">
                <span className="text-cyan-400">✦</span>
                Comprehensive discovery phase
              </li>
              <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base">
                <span className="text-cyan-400">✦</span>
                Fixed scope and timeline
              </li>
              <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base">
                <span className="text-cyan-400">✦</span>
                Milestone-based delivery
              </li>
              <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base">
                <span className="text-cyan-400">✦</span>
                Detailed documentation
              </li>
              <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base hidden md:flex">
                <span className="text-cyan-400">✦</span>
                Knowledge transfer included
              </li>
              <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base hidden md:flex">
                <span className="text-cyan-400">✦</span>
                Post-launch support period
              </li>
            </ul>
            <a
              href="#contact"
              className="block w-full py-3 md:py-4 px-6 text-center border border-white/20 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/5 hover:border-cyan-500/50 text-sm md:text-base"
            >
              Discuss Scope
            </a>
          </div>

          {/* Retainer - Featured */}
          <div className="bg-gradient-to-b from-cyan-900/30 to-teal-900/20 border border-cyan-500/30 rounded-2xl md:rounded-3xl p-6 md:p-8 relative transition-all duration-300 hover:-translate-y-2 md:scale-105">
            <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-teal-500 text-neutral-900 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold">
              Most Popular
            </div>
            <div className="text-3xl md:text-4xl mb-4 md:mb-6 mt-2 md:mt-0">🔄</div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Retainer</h3>
            <p className="text-cyan-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">Monthly Partnership</p>
            <p className="text-neutral-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              Priority access. Continuous optimization. Strategic guidance month over month. For teams that need ongoing expert support.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Dedicated consultant hours
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Priority response times
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Proactive system optimization
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Monthly strategic advisory
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Flexible scope adjustments
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Preferential project rates
              </li>
            </ul>
            <a
              href="#contact"
              className="block w-full py-4 px-6 text-center bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg text-neutral-900 font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]"
            >
              Start Partnership
            </a>
          </div>

          {/* Value-Based */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-2">
            <div className="text-4xl mb-6">📈</div>
            <h3 className="text-2xl font-bold text-white mb-2">Value-Based</h3>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4">ROI-Aligned</p>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              Skin in the game. Pricing tied to the business value we create together. Our incentives match yours.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Performance-based components
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Shared success metrics
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Strategic partnership model
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Long-term value focus
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Aligned incentives
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="text-cyan-400">✦</span>
                Outcome guarantees
              </li>
            </ul>
            <a
              href="#contact"
              className="block w-full py-4 px-6 text-center border border-white/20 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/5 hover:border-cyan-500/50"
            >
              Explore Options
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Pricing);
