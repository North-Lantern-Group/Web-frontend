"use client";

interface StatsProps {
  isDarkMode: boolean;
}

export default function Stats({ isDarkMode }: StatsProps) {
  return (
    <section className={`py-16 md:py-28 ${isDarkMode ? 'bg-neutral-950' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 reveal-stagger">
          {/* Stat 1 - Faster Delivery */}
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2 md:mb-3">60%</div>
            <div className="text-xs md:text-base text-neutral-400 uppercase tracking-wider md:tracking-widest">Faster Delivery</div>
          </div>
          {/* Stat 2 - Team Efficiency */}
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2 md:mb-3">3x</div>
            <div className="text-xs md:text-base text-neutral-400 uppercase tracking-wider md:tracking-widest">Team Efficiency</div>
          </div>
          {/* Stat 3 - Client Satisfaction */}
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2 md:mb-3">92%</div>
            <div className="text-xs md:text-base text-neutral-400 uppercase tracking-wider md:tracking-widest">Client Satisfaction</div>
          </div>
          {/* Stat 4 - Implementations */}
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2 md:mb-3">60+</div>
            <div className="text-xs md:text-base text-neutral-400 uppercase tracking-wider md:tracking-widest">Implementations</div>
          </div>
        </div>
      </div>
    </section>
  );
}
