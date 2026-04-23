"use client";

import dynamic from "next/dynamic";
import CloudBackground from "@/components/CloudBackground";

const ParticleCompass = dynamic(() => import("@/components/ParticleCompass"), {
  ssr: false,
  loading: () => null,
});

const FloatingParticles = dynamic(() => import("@/components/FloatingParticles"), {
  ssr: false,
  loading: () => null,
});

interface HeroProps {
  isDarkMode: boolean;
}

export default function Hero({ isDarkMode }: HeroProps) {
  return (
    <section className={`relative min-h-screen w-full flex items-center ${isDarkMode ? 'bg-black' : 'bg-sky-100'}`}>
      {isDarkMode ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(0,212,255,0.16),transparent_42%),linear-gradient(180deg,#020617_0%,#000_100%)] md:hidden" />
          <div className="absolute inset-0 hidden overflow-hidden md:block">
            <ParticleCompass />
          </div>
          <div className="absolute inset-0 hidden opacity-60 pointer-events-none md:block">
            <FloatingParticles />
          </div>
        </>
      ) : (
        <CloudBackground />
      )}


      <div className="relative container mx-auto px-4 md:px-[4%] pt-20 md:pt-24 z-20">
        <div className="max-w-[900px] mx-auto text-center">
          <div
            className={`inline-flex items-center gap-2 border px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm mb-6 md:mb-8 ${isDarkMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-cyan-600/10 border-cyan-600/40 text-cyan-700'}`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'}`}></span>
            Atlassian consulting · Canada
          </div>

          <h1 className={`text-[clamp(2.45rem,7vw,5rem)] font-bold leading-[1.08] mb-4 md:mb-6 md:leading-[1.15] tracking-[-0.01em] ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            <span className="block">
              We rebuild the Atlassian stack your team has outgrown.
            </span>
            <span className="block">
              <span
                className="nlg-gradient-text bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #00D4FF 0%, #0096B4 50%, #00D4FF 100%)",
                }}
              >
                And the reporting layer on top.
              </span>
            </span>
          </h1>

          <p
            className={`text-[clamp(0.95rem,2vw,1.35rem)] max-w-[650px] mx-auto mb-8 md:mb-10 leading-[1.7] md:leading-[1.8] px-2 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}
          >
            A Canadian consultancy for mid-market and enterprise teams. Jira, Confluence, JSM, and the BI layer that sits on them. Founder-led scoping. Senior delivery end to end.
          </p>

          <div
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 px-4 sm:px-0"
          >
            <a
              href="#contact"
              className="nlg-cta-primary inline-flex items-center justify-center gap-2 bg-gradient-to-br from-cyan-400 to-teal-600 text-[#0a0f1a] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-[transform,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Book a scoping call
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a
              href="#services"
              className={`inline-flex items-center justify-center gap-2 bg-transparent border px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-colors duration-200 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${isDarkMode ? 'border-gray-500 text-white' : 'border-gray-400 text-gray-700'}`}
            >
              How we work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
