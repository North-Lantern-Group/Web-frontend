"use client";

import { memo, useState, useEffect, useRef } from "react";
import InteractiveGlobe from "@/components/Globe";

interface WhyNorthLanternProps {
  isDarkMode: boolean;
}

function WhyNorthLantern({ isDarkMode }: WhyNorthLanternProps) {
  const [aboutVisible, setAboutVisible] = useState(false);
  const aboutRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setAboutVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" className="py-16 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Content */}
          <div className="reveal-left">
            <p ref={aboutRef} className={`text-lg md:text-2xl font-semibold tracking-normal text-cyan-400 mb-3 md:mb-4 relative inline-block ${aboutVisible ? 'who-we-are-visible' : ''}`}>
              <span>Why North Lantern</span>
              <span className="absolute bottom-0 left-0 h-[2px] bg-cyan-400 who-we-are-underline"></span>
            </p>
            <h2 className="text-2xl md:text-5xl font-medium mb-6 md:mb-8 text-white tracking-tight">Dedicated to Elevating Business Excellence Through Tailored Solutions</h2>
            <p className="text-base md:text-lg text-neutral-400 mb-4 md:mb-6">
              North Lantern Group is a leading professional services firm specializing in innovative technology solutions. Founded to enhance collaboration and governance workflows, NLG offers tailored Atlassian solutions, seamless cloud migrations, and powerful data analytics services.
            </p>

            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-neutral-800 border border-amber-400/30 rounded-full">
                <span className="text-xs md:text-sm text-amber-400">5+ Global Awards</span>
              </div>
              <div className="inline-flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-neutral-800 border border-teal-400/30 rounded-full">
                <span className="text-xs md:text-sm text-teal-400">24/7 Support</span>
              </div>
              <div className="inline-flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-neutral-800 border border-emerald-400/30 rounded-full">
                <span className="text-xs md:text-sm text-emerald-400">12+ Years Exp</span>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
              {/* Labels row */}
              <div className="flex-1 flex flex-col items-start">
                <div className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-wider">Projects</div>
                <div className="text-xl md:text-2xl font-medium text-rose-400">60+</div>
              </div>
              <div className="flex-1 flex flex-col items-start">
                <div className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-wider">Team</div>
                <div className="text-xl md:text-2xl font-medium text-violet-400">25+</div>
              </div>
              <div className="flex-1 flex flex-col items-start">
                <div className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-wider">Satisfaction</div>
                <div className="text-xl md:text-2xl font-medium text-cyan-400">92%</div>
              </div>
            </div>

            <div className="hidden md:flex items-end gap-4 mt-4">
              {/* 60+ Projects Delivered */}
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap-reverse content-start gap-[5px] mb-3 justify-end w-full">
                  {Array.from({ length: 67 }).map((_, i) => (
                    <div key={i} className="w-[10px] h-[10px] rounded-full bg-rose-400"></div>
                  ))}
                </div>
                <div className="h-[1px] bg-white w-full"></div>
              </div>

              {/* 25+ Team Members */}
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap-reverse content-start gap-[5px] mb-3 justify-end w-full">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="w-[10px] h-[10px] rounded-full bg-violet-400"></div>
                  ))}
                </div>
                <div className="h-[1px] bg-white w-full"></div>
              </div>

              {/* 92% Client Satisfaction */}
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap-reverse content-start gap-[5px] mb-3 justify-end w-full">
                  {Array.from({ length: 92 }).map((_, i) => (
                    <div key={i} className="w-[10px] h-[10px] rounded-full bg-cyan-400"></div>
                  ))}
                </div>
                <div className="h-[1px] bg-white w-full"></div>
              </div>
            </div>
          </div>

          {/* Right side - Interactive Globe */}
          <div className="w-full h-[280px] sm:h-[350px] md:h-auto md:aspect-square flex items-center justify-center reveal-right order-first md:order-last">
            <InteractiveGlobe key="globe-rose" isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(WhyNorthLantern);
