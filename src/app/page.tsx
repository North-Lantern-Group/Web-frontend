"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyNorthLantern from "@/components/sections/WhyNorthLantern";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Global scroll reveal animation observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger, .reveal-stagger-slow');

    const revealOnScroll = () => {
      reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll();

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('load', revealOnScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDarkMode ? 'dark bg-neutral-950' : 'light bg-white'}`}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isDarkMode
            ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-white/10'
            : 'bg-white hover:bg-gray-100 text-neutral-800 border border-gray-200 shadow-xl'
        }`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="w-5 h-5 md:w-6 md:h-6" /> : <Moon className="w-5 h-5 md:w-6 md:h-6" />}
      </button>

      <Header isDarkMode={isDarkMode} />
      <Hero isDarkMode={isDarkMode} />

      {/* Transition gradient between hero and stats */}
      {isDarkMode && (
        <div className="w-full h-32 bg-gradient-to-b from-black to-neutral-950"></div>
      )}

      <Stats isDarkMode={isDarkMode} />
      <About />
      <Services isDarkMode={isDarkMode} />
      <WhyNorthLantern isDarkMode={isDarkMode} />
      <Testimonials />
      <Pricing />
      <Contact isDarkMode={isDarkMode} />
      <Footer />
    </div>
  );
}
