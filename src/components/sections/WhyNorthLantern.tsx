"use client";

import { memo, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Clock, MapPin, UserCheck } from "lucide-react";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto aspect-square w-full max-w-[420px] rounded-full border border-white/10 bg-black/20" />
  ),
});

const promises = [
  {
    icon: Clock,
    text: "Response within one business day, in Canadian working hours.",
  },
  {
    icon: UserCheck,
    text: "Founder-led scoping, senior delivery from start to finish.",
  },
  {
    icon: MapPin,
    text: "Canada-based delivery, data resident in Canada when clients require it.",
  },
];

function WhyNorthLantern() {
  const promiseRef = useRef<HTMLDivElement>(null);
  const promisesInView = useInView(promiseRef, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();

  return (
    <section id="why-us" className="py-16 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="reveal-left">
            <p className="mb-3 inline-block text-lg font-semibold tracking-normal text-cyan-400 md:mb-4 md:text-2xl">
              Why North Lantern
            </p>
            <h2 className="mb-6 text-2xl font-medium tracking-tight text-white md:mb-8 md:text-5xl">
              A Canadian consultancy that delivers the way it scopes.
            </h2>
            <p className="mb-4 text-base text-neutral-400 md:mb-6 md:text-lg">
              We are a small, Ontario-incorporated firm with a deliberately narrow delivery bench. Every engagement runs senior-only. The consultant who scopes the work is the consultant who signs off on the delivery.
            </p>

            <div ref={promiseRef} className="mt-6 grid gap-3 md:mt-8 md:gap-4">
              {promises.map((promise, index) => {
                const PromiseIcon = promise.icon;
                return (
                  <motion.div
                    key={promise.text}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                    animate={promisesInView ? { opacity: 1, x: 0 } : undefined}
                    transition={{
                      duration: reducedMotion ? 0.2 : 0.5,
                      delay: reducedMotion ? 0 : index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-neutral-900/80 p-4"
                  >
                    <PromiseIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" strokeWidth={1.5} />
                    <p className="text-sm text-neutral-300 md:text-base">{promise.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="reveal-right order-first md:order-last">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900 p-6 md:p-8">
              <Globe />
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">How we work</p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-400 md:text-base">
                  Adoption is not a separate service. Every engagement includes rollout, governance, and documentation. If the team cannot operate the system after launch, the work is not finished.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(WhyNorthLantern);
