"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    <header
      className={`fixed z-50 flex justify-between items-center transition-all duration-500 ease-out ${
        scrolled
          ? `top-3 md:top-4 left-3 right-3 md:left-[3%] md:right-[3%] rounded-2xl px-5 md:px-6 lg:px-8 py-3 md:py-3.5 ${
              isDarkMode
                ? 'bg-[#0A1628]/85 backdrop-blur-xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,20,40,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]'
                : 'bg-[#F7FAFC]/88 backdrop-blur-xl border border-[#E1E5EB]/60 shadow-[0_8px_32px_rgba(0,48,75,0.06)]'
            }`
          : 'top-0 left-0 right-0 rounded-none px-5 md:px-[5%] lg:px-[6%] py-5 md:py-7'
      }`}
    >
      <nav className="w-full flex items-center justify-between">
        {/* Logo with icon and text lockup. Scales down when scrolled for compact floating header. */}
        <Link href="/" className="flex items-center" aria-label="North Lantern Group home">
          <div className={`relative ${scrolled ? 'h-11 md:h-14' : 'h-14 md:h-[4.5rem]'} w-auto transition-all duration-500 ${isDarkMode ? 'drop-shadow-[0_0_24px_rgba(0,150,180,0.3)]' : ''}`}>
            <NLGLogo
              variant="white"
              hideTextOnMobile
              className={`${scrolled ? 'h-11 md:h-14' : 'h-14 md:h-[4.5rem]'} w-auto absolute inset-0 transition-all duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
            />
            <NLGLogo
              variant="primary"
              hideTextOnMobile
              className={`${scrolled ? 'h-11 md:h-14' : 'h-14 md:h-[4.5rem]'} w-auto transition-all duration-500 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
        </Link>

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
          Book a scoping call
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
        <div className={`absolute top-full left-0 right-0 lg:hidden ${
          scrolled ? 'mt-2 rounded-2xl border' : 'border-b'
        } ${
          isDarkMode
            ? `bg-[#0A1628]/92 ${scrolled ? 'border-white/[0.06] shadow-[0_8px_32px_rgba(0,20,40,0.5)]' : 'border-white/10'}`
            : `bg-[#F7FAFC]/95 ${scrolled ? 'border-[#E1E5EB]/60 shadow-[0_8px_32px_rgba(0,48,75,0.06)]' : 'border-black/10'}`
        } backdrop-blur-xl`}>
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
                  Book a scoping call
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
