"use client";

import { useState, useEffect } from "react";
import NLGLogo from "@/components/brand/NLGLogo";

interface HeaderProps {
  isDarkMode: boolean;
}

export default function Header({ isDarkMode }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-[4%] flex justify-between items-center transition-all duration-400 ${scrolled ? (isDarkMode ? 'py-3 md:py-4 bg-neutral-950/95 backdrop-blur-[20px] border-b border-white/10' : 'py-3 md:py-4 bg-white/95 backdrop-blur-[20px] border-b border-black/10') : 'py-4 md:py-6'}`}>
      <nav className="w-full flex items-center justify-between">
        {/* Logo — h-10 (40px) mobile, h-12 (48px) desktop per brand sizing analysis */}
        <a href="#" className="flex items-center">
          <div className="relative h-10 md:h-12 w-auto">
            <NLGLogo
              variant="white"
              className={`h-10 md:h-12 w-auto absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
            />
            <NLGLogo
              variant="primary"
              className={`h-10 md:h-12 w-auto transition-opacity duration-500 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
        </a>

        {/* Navigation Links - Desktop */}
        <ul className="hidden lg:flex items-center gap-10 list-none">
          <li>
            <a href="#about" className={`text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 hover:text-cyan-500 relative group ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              About
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#services" className={`text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 hover:text-cyan-500 relative group ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Services
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#why-us" className={`text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 hover:text-cyan-500 relative group ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Why Us
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#pricing" className={`text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 hover:text-cyan-500 relative group ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Pricing
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#contact" className={`text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 hover:text-cyan-500 relative group ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Contact
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>

        {/* CTA Button - Desktop */}
        <a
          href="#contact"
          className="hidden md:inline-flex bg-gradient-to-br from-cyan-400 to-teal-600 text-[#0a0f1a] px-5 lg:px-7 py-2.5 lg:py-3 rounded-lg font-semibold text-sm lg:text-[0.95rem] transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,212,255,0.2)] hover:shadow-[0_0_50px_rgba(0,212,255,0.4)]"
        >
          Start a Project
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/10'}`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`absolute top-full left-0 right-0 lg:hidden ${isDarkMode ? 'bg-neutral-950/98 border-b border-white/10' : 'bg-white/98 border-b border-black/10'} backdrop-blur-[20px]`}>
          <nav className="container mx-auto px-4 py-6">
            <ul className="flex flex-col gap-4">
              <li>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className={`block py-2 text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'}`}>About</a>
              </li>
              <li>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className={`block py-2 text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'}`}>Services</a>
              </li>
              <li>
                <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className={`block py-2 text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'}`}>Why Us</a>
              </li>
              <li>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className={`block py-2 text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'}`}>Pricing</a>
              </li>
              <li>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className={`block py-2 text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'}`}>Contact</a>
              </li>
              <li className="pt-4">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-br from-cyan-400 to-teal-600 text-[#0a0f1a] px-6 py-3 rounded-lg font-semibold"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
