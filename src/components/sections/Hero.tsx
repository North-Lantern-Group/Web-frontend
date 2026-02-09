"use client";

import ParticleCompass from "@/components/ParticleCompass";
import FloatingParticles from "@/components/FloatingParticles";
import CloudBackground from "@/components/CloudBackground";

interface HeroProps {
  isDarkMode: boolean;
}

export default function Hero({ isDarkMode }: HeroProps) {
  return (
    <section className={`relative min-h-screen w-full flex items-center ${isDarkMode ? 'bg-black' : 'bg-sky-100'}`}>
      {/* Background - Dark mode: Particle Compass, Light mode: Clouds */}
      {isDarkMode ? (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <ParticleCompass />
          </div>
          <FloatingParticles />
        </>
      ) : (
        <CloudBackground />
      )}


      <div className="relative container mx-auto px-4 md:px-[4%] pt-20 md:pt-24 z-20">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 border px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm mb-6 md:mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] ${isDarkMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-cyan-600/10 border-cyan-600/40 text-cyan-700'}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'}`}></span>
            Atlassian Cloud & Business Intelligence
          </div>

          <h1 className={`font-serif text-[clamp(2rem,7vw,5rem)] font-bold leading-[1.15] mb-4 md:mb-6 tracking-[-0.01em] opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards] ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            Transform Your Infrastructure.{" "}
            <span className="bg-gradient-to-br from-cyan-500 to-teal-600 bg-clip-text text-transparent">
              Unlock Intelligence.
            </span>
          </h1>

          <p className={`text-[clamp(0.95rem,2vw,1.35rem)] max-w-[650px] mx-auto mb-8 md:mb-10 leading-[1.7] md:leading-[1.8] px-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            We architect Atlassian ecosystems and business intelligence solutions that don&apos;t just work—they accelerate decisions, streamline operations, and scale with your ambitions.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards] px-4 sm:px-0">
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-cyan-400 to-teal-600 text-[#0a0f1a] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_50px_rgba(0,212,255,0.4)]"
            >
              Start Discovery
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a
              href="#services"
              className={`inline-flex items-center justify-center gap-2 bg-transparent border px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/5 ${isDarkMode ? 'border-gray-500 text-white' : 'border-gray-400 text-gray-700'}`}
            >
              Explore Solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
