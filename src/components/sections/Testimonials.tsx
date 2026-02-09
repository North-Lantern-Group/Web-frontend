"use client";

import { memo } from "react";

function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        {/* Centered Header */}
        <div className="text-center mb-10 md:mb-16 reveal">
          <p className="text-lg md:text-2xl font-semibold tracking-normal text-cyan-400 mb-3 md:mb-4">What Our Clients Say</p>
          <h2 className="text-2xl md:text-5xl font-medium text-white tracking-tight">Hear from Our Satisfied Clients</h2>
        </div>

        {/* Testimonial Bubbles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 reveal-stagger-slow">
          {/* Bubble 1 */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold text-base md:text-lg">
                MT
              </div>
              <div>
                <p className="text-white font-semibold">Michael Thompson</p>
                <p className="text-neutral-500 text-sm">New York, USA</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              &quot;<span className="text-white font-medium">North Lantern Group transformed our workflow</span> and enhanced our collaboration significantly. Their expertise is truly commendable.&quot;
            </p>
          </div>

          {/* Bubble 2 */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                EJ
              </div>
              <div>
                <p className="text-white font-semibold">Emma Johnson</p>
                <p className="text-neutral-500 text-sm">London, UK</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              &quot;The team at NLG provided insights that <span className="text-white font-medium">reshaped our data strategy</span>, helping us achieve greater operational efficiency.&quot;
            </p>
          </div>

          {/* Bubble 3 */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                JA
              </div>
              <div>
                <p className="text-white font-semibold">James Anderson</p>
                <p className="text-neutral-500 text-sm">Toronto, Canada</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              &quot;With NLG&apos;s cloud migration services, our transition was seamless, and <span className="text-white font-medium">our productivity has skyrocketed</span> since!&quot;
            </p>
          </div>

          {/* Bubble 4 */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                SW
              </div>
              <div>
                <p className="text-white font-semibold">Sarah Williams</p>
                <p className="text-neutral-500 text-sm">Sydney, Australia</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              &quot;Thanks to North Lantern Group, <span className="text-white font-medium">our governance workflows are much smoother</span>. Their dedication to client success is outstanding!&quot;
            </p>
          </div>

          {/* Bubble 5 */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-lg">
                DC
              </div>
              <div>
                <p className="text-white font-semibold">David Chen</p>
                <p className="text-neutral-500 text-sm">Singapore</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              &quot;The Atlassian implementation was flawless. <span className="text-white font-medium">Our teams now collaborate 3x faster</span> than before.&quot;
            </p>
          </div>

          {/* Bubble 6 */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                MG
              </div>
              <div>
                <p className="text-white font-semibold">Maria Garcia</p>
                <p className="text-neutral-500 text-sm">Dubai, UAE</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              &quot;NLG&apos;s Power BI dashboards gave us <span className="text-white font-medium">real-time visibility into our operations</span>. Game-changing for our decision making.&quot;
            </p>
          </div>

          {/* Bubble 7 */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-white font-bold text-lg">
                RK
              </div>
              <div>
                <p className="text-white font-semibold">Robert Kim</p>
                <p className="text-neutral-500 text-sm">Tokyo, Japan</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              &quot;Switching to AWS with NLG&apos;s guidance <span className="text-white font-medium">reduced our infrastructure costs by 40%</span>. Exceptional service.&quot;
            </p>
          </div>

          {/* Bubble 8 */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                LM
              </div>
              <div>
                <p className="text-white font-semibold">Lisa Mueller</p>
                <p className="text-neutral-500 text-sm">Berlin, Germany</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              &quot;The team&apos;s expertise in Confluence helped us <span className="text-white font-medium">centralize our entire knowledge base</span> in just weeks.&quot;
            </p>
          </div>

          {/* Bubble 9 */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                AH
              </div>
              <div>
                <p className="text-white font-semibold">Ahmed Hassan</p>
                <p className="text-neutral-500 text-sm">Abu Dhabi, UAE</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              &quot;NLG delivered exactly what we needed. <span className="text-white font-medium">Professional, responsive, and results-driven</span>. Highly recommend.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Testimonials);
