"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ClipboardList, Repeat2, TrendingUp } from "lucide-react";
import TiltCard from "@/components/motion/TiltCard";

const cards = [
  {
    icon: ClipboardList,
    title: "Project-based",
    eyebrow: "Fixed scope",
    body: "Defined outcome, fixed scope, clear owner. The right model when the problem is known and the path is clear enough to commit to before starting.",
    pills: [
      "Scoping before build",
      "Fixed scope and timeline",
      "Milestone-based delivery",
      "Documentation included",
      "Knowledge transfer included",
      "Post-launch handoff",
    ],
    cta: "Discuss scope",
    featured: false,
  },
  {
    icon: Repeat2,
    title: "Retainer",
    eyebrow: "Ongoing senior access",
    body: "Reserved senior capacity for teams that need a steady owner on Atlassian, reporting, or integration work. The right model when scope evolves month to month.",
    pills: [
      "Reserved senior capacity",
      "Planned response rhythm",
      "System governance",
      "Monthly operating review",
      "Scope queue management",
      "Delivery backlog control",
    ],
    cta: "Start a retainer",
    featured: true,
  },
  {
    icon: TrendingUp,
    title: "Outcome-aligned",
    eyebrow: "Measured work",
    body: "A portion of the engagement fee is tied to measurable outcomes agreed at scoping. The right model when outcomes are quantifiable and both sides accept upside and downside.",
    pills: [
      "Outcome definition",
      "Measurement plan",
      "Executive checkpoints",
      "Risk boundaries",
      "Engagement structure review",
      "Founder-led scoping",
    ],
    cta: "Explore an outcome deal",
    featured: false,
  },
];

function Pricing() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="pricing" className="bg-neutral-950 py-16 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal mb-10 text-center md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400 md:mb-4 md:text-sm">How we engage</p>
          <h2 className="mb-4 text-2xl font-medium tracking-tight text-white md:mb-6 md:text-5xl">Three ways to work with us.</h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-neutral-400 md:text-lg">
            Every engagement starts with a paid scoping call. We define the lane, the risk, the operating owner, and the work that has to stick after launch. Recommendation and fit assessment are complimentary; scoping work is billed.
          </p>
        </div>

        <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((card) => {
            const CardIcon = card.icon;
            return (
              <div key={card.title}>
                <TiltCard
                  maxTilt={4}
                  glow="0 0 90px rgba(0,212,255,0.18)"
                  className={`h-full rounded-2xl border p-6 md:rounded-3xl md:p-8 ${
                    card.featured
                      ? "border-cyan-500/30 bg-gradient-to-b from-cyan-900/30 to-teal-900/20"
                      : "border-white/10 bg-neutral-900/50"
                  }`}
                >
                  {card.featured && (
                    <motion.div
                      animate={reducedMotion ? undefined : { scale: [1, 1.04, 1] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute right-5 top-5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300"
                    >
                      Most Popular
                    </motion.div>
                  )}

                  <CardIcon className="mb-4 h-9 w-9 text-cyan-400 md:mb-6" strokeWidth={1.5} />
                  <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">{card.title}</h3>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-400 md:mb-4 md:text-sm">{card.eyebrow}</p>
                  <p className="mb-6 text-sm leading-relaxed text-neutral-400 md:mb-8 md:text-base">
                    {card.body}
                  </p>
                  <ul className="mb-6 space-y-3 md:mb-8 md:space-y-4">
                    {card.pills.map((pill) => (
                      <li key={pill} className="flex items-center gap-3 text-sm text-neutral-300 md:text-base">
                        <Check className="h-4 w-4 shrink-0 text-cyan-400" strokeWidth={2} />
                        {pill}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`block w-full rounded-lg px-6 py-3 text-center text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-neutral-950 md:py-4 md:text-base ${
                      card.featured
                        ? "bg-gradient-to-r from-cyan-400 to-teal-500 text-neutral-900 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]"
                        : "border border-white/20 text-white hover:border-cyan-500/50 hover:bg-white/5"
                    }`}
                  >
                    {card.cta}
                  </a>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(Pricing);
