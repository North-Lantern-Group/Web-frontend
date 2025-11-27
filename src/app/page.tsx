"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ParticleCompass from "@/components/ParticleCompass";
import FloatingParticles from "@/components/FloatingParticles";
import InteractiveGlobe from "@/components/Globe";
import CloudBackground from "@/components/CloudBackground";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Rocket,
  RefreshCw,
  Shield,
  Globe,
  Zap,
  ShieldCheck,
  BarChart3,
  Database,
  FileText,
  Cloud,
  Clock,
  DollarSign,
  Users,
  Headphones,
  CheckCircle,
  Layers,
  Settings,
  Target,
  Sun,
  Moon,
} from "lucide-react";
import Xarrow from "react-xarrows";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    service: "atlassian",
  });

  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [servicesVisible, setServicesVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal animation observer
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
    // Trigger once on mount
    revealOnScroll();

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('load', revealOnScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@northlantern.com?subject=Inquiry from ${formData.name}&body=Name: ${formData.name}%0D%0ACompany: ${formData.company}%0D%0AEmail: ${formData.email}%0D%0AService Interest: ${formData.service}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDarkMode ? 'dark bg-neutral-950' : 'light bg-white'}`}>
      {/* Fixed Theme Toggle Button - Bottom Right */}
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

      {/* Header with Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-[4%] flex justify-between items-center transition-all duration-400 ${scrolled ? (isDarkMode ? 'py-3 md:py-4 bg-neutral-950/95 backdrop-blur-[20px] border-b border-white/10' : 'py-3 md:py-4 bg-white/95 backdrop-blur-[20px] border-b border-black/10') : 'py-4 md:py-6'}`}>
        <nav className="w-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="North Lantern Group"
              width={500}
              height={125}
              className="h-14 md:h-24 w-auto"
            />
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

      {/* Hero Section */}
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

      {/* Transition gradient between hero and stats - only needed for dark mode */}
      {isDarkMode && (
        <div className="w-full h-32 bg-gradient-to-b from-black to-neutral-950"></div>
      )}

      {/* Stats Section */}
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

      {/* Company Story & Mission Section */}
      <section id="about" className="py-16 md:py-32 bg-neutral-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
            {/* Left side - Story Content */}
            <div className="reveal-left">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 md:mb-12 leading-[1.2]">
                We build the systems<br />
                that power modern<br />
                enterprises
              </h2>

              <div className="space-y-6 md:space-y-8 text-gray-400 text-base md:text-xl leading-[1.8] md:leading-[1.9]">
                <p>
                  North Lantern Group emerged from a simple observation: organizations need more than implementation partners—they need strategic allies who understand both the technical complexities and business imperatives of digital transformation.
                </p>
                <p className="hidden md:block">
                  We recognized a critical gap in the market. Businesses weren&apos;t just looking for tool deployment. They needed architects who could design solutions that evolve with their organizations, providing both the infrastructure for collaboration and the intelligence layer for decision-making.
                </p>
                <p>
                  Today, we serve clients across diverse verticals, combining deep technical expertise in Atlassian ecosystems with advanced business intelligence capabilities—all delivered with startup speed and enterprise rigor.
                </p>
              </div>

              <a
                href="#services"
                className="inline-flex items-center gap-3 mt-8 md:mt-12 px-6 md:px-8 py-3 md:py-4 bg-neutral-800 border border-white/10 rounded-lg text-white text-base md:text-lg font-medium transition-all duration-300 hover:bg-neutral-700 hover:border-white/20"
              >
                Our Capabilities
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            {/* Right side - Our Mission Card */}
            <div className="flex justify-center md:justify-end items-start pt-0 md:pt-4 reveal-right">
              <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 border border-cyan-500/20 rounded-2xl p-6 md:p-10 w-full md:max-w-lg">
                {/* Icon */}
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 md:mb-8">
                  <Target className="w-6 md:w-8 h-6 md:h-8 text-white" />
                </div>

                <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">Our Mission</h3>
                <p className="text-neutral-300 text-base md:text-xl leading-[1.8] md:leading-[1.9]">
                  Empower organizations with tools, insights, and strategies that illuminate the path to sustainable growth. We don&apos;t just implement technology—we architect transformation that compounds value over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="pt-8 pb-16 md:pb-28 relative">
        {/* Section Header */}
        <div ref={servicesRef} className="text-center py-10 md:py-16 px-4">
          <h2 className={`text-2xl md:text-5xl font-bold text-white tracking-tight transition-all duration-700 hover:scale-[1.02] cursor-default ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Comprehensive solutions for every need.
          </h2>
          <p className={`text-base md:text-lg text-neutral-400 mt-3 md:mt-4 max-w-2xl mx-auto transition-all duration-700 delay-200 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Expert services designed to modernize and elevate your business operations.
          </p>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">

          {/* Services Cards */}
          <div className="grid lg:grid-cols-3 gap-0 border border-white/10 rounded-xl overflow-hidden reveal-stagger">
            {/* Atlassian Solutions */}
            <div className="p-6 md:p-8 lg:p-10 bg-neutral-900 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[500px] md:min-h-[900px] transition-all duration-300 hover:bg-neutral-800/50 group flex flex-col">
              <Layers className="w-8 md:w-10 h-8 md:h-10 text-cyan-400 mb-3 md:mb-4" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Atlassian Solutions</h3>
              <p className="text-neutral-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Expert guidance on Jira, Confluence, and more. We tailor implementations to fit your workflow and maximize efficiency.
              </p>

              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <img src="https://cdn.worldvectorlogo.com/logos/jira-1.svg" alt="Jira" className="w-5 h-5" />
                  <span className="text-sm text-neutral-200">Jira Integration</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <img src="https://cdn.worldvectorlogo.com/logos/confluence-1.svg" alt="Confluence" className="w-5 h-5" />
                  <span className="text-sm text-neutral-200">Confluence Setup</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <RefreshCw className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Workflow Customization</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <Users className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Team Collaboration</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <Shield className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Project Transparency</span>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-grow"></div>

              {/* Diagram 1 */}
              <div className="w-full h-48 md:h-56 flex items-center px-0 mt-2 mb-6 md:mb-8 relative hidden md:flex">
                {/* Left: Single column with 5 rows, top and bottom rounded */}
                <div className="flex flex-col">
                  {/* Row 1 - rounded top - Jira */}
                  <div className="w-12 h-13 border border-neutral-500 rounded-t-full flex items-center justify-center" style={{ height: '52px' }}>
                    <img src="/icons/Jira_icon.svg" alt="Jira" className="w-6 h-6" />
                  </div>
                  {/* Row 2 - Confluence */}
                  <div className="w-12 border-x border-b border-neutral-500 flex items-center justify-center" style={{ height: '52px' }}>
                    <img src="/icons/Confluence_icon.svg" alt="Confluence" className="w-6 h-6" />
                  </div>
                  {/* Row 3 - Projects */}
                  <div className="w-12 border-x border-b border-neutral-500 flex items-center justify-center" style={{ height: '52px' }}>
                    <img src="/icons/Projects_icon.svg" alt="Projects" className="w-6 h-6" />
                  </div>
                  {/* Row 4 - Statuspage */}
                  <div className="w-12 border-x border-b border-neutral-500 flex items-center justify-center" style={{ height: '52px' }}>
                    <img src="/icons/Statuspage_icon.svg" alt="Statuspage" className="w-6 h-6" />
                  </div>
                  {/* Row 5 - rounded bottom - Sourcetree */}
                  <div className="w-12 border-x border-b border-neutral-500 rounded-b-full flex items-center justify-center" style={{ height: '52px' }}>
                    <img src="/icons/Sourcetree_icon.svg" alt="Sourcetree" className="w-6 h-6" />
                  </div>
                </div>

                {/* Line from cylinder to center */}
                <div className="w-8 h-0.5 bg-neutral-500"></div>

                {/* Center: Atlassian logo in rounded square */}
                <div id="atlassian-center" className="w-12 h-12 border border-neutral-500 rounded-lg flex items-center justify-center">
                  <img src="/icons/Atlassian_icon.svg" alt="Atlassian" className="w-6 h-6" />
                </div>

                {/* Gap to push icons to the right */}
                <div className="flex-grow"></div>

                {/* Right: 4 icons representing Atlassian Solutions */}
                <div className="flex flex-col gap-6 mr-0">
                  <div id="layers-icon" className="w-10 h-10 border border-neutral-500 rounded flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div id="users-icon" className="w-10 h-10 border border-neutral-500 rounded flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div id="refresh-icon" className="w-10 h-10 border border-neutral-500 rounded flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div id="shield-icon" className="w-10 h-10 border border-neutral-500 rounded flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Curved lines connecting Atlassian logo to all 4 icons */}
                <Xarrow
                  start="atlassian-center"
                  end="layers-icon"
                  startAnchor={{ position: "right", offset: { y: -12 } }}
                  endAnchor="left"
                  color="#3b82f6"
                  strokeWidth={2}
                  path="smooth"
                  curveness={0.6}
                  showHead={false}
                />
                <Xarrow
                  start="atlassian-center"
                  end="users-icon"
                  startAnchor={{ position: "right", offset: { y: -4 } }}
                  endAnchor="left"
                  color="#ef4444"
                  strokeWidth={2}
                  path="smooth"
                  curveness={0.6}
                  showHead={false}
                />
                <Xarrow
                  start="atlassian-center"
                  end="refresh-icon"
                  startAnchor={{ position: "right", offset: { y: 4 } }}
                  endAnchor="left"
                  color="#eab308"
                  strokeWidth={2}
                  path="smooth"
                  curveness={0.6}
                  showHead={false}
                />
                <Xarrow
                  start="atlassian-center"
                  end="shield-icon"
                  startAnchor={{ position: "right", offset: { y: 12 } }}
                  endAnchor="left"
                  color="#14b8a6"
                  strokeWidth={2}
                  path="smooth"
                  curveness={0.6}
                  showHead={false}
                />
              </div>

            </div>

            {/* Cloud Migrations */}
            <div className="p-6 md:p-8 lg:p-10 bg-neutral-900 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[400px] md:min-h-[900px] transition-all duration-300 hover:bg-neutral-800/50 group flex flex-col">
              <Cloud className="w-8 md:w-10 h-8 md:h-10 text-cyan-400 mb-3 md:mb-4" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Cloud Migrations</h3>
              <p className="text-neutral-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Seamless transitions to cloud infrastructure with minimal disruption. We ensure your data is secure and accessible.
              </p>

              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <img src="/icons/aws-color.svg" alt="AWS" className="w-5 h-5" />
                  <span className="text-sm text-neutral-200">Amazon Web Services Migration</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <img src="/icons/azure-color.svg" alt="Azure" className="w-5 h-5" />
                  <span className="text-sm text-neutral-200">Microsoft Azure Migration</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <img src="/icons/googlecloud-color.svg" alt="Google Cloud" className="w-5 h-5" />
                  <span className="text-sm text-neutral-200">Google Cloud Migration</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <img src="https://cdn.brandfetch.io/idnq7H7qT0/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1668081507500" alt="Oracle" className="w-5 h-5" />
                  <span className="text-sm text-neutral-200">Oracle Cloud Migration</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <Shield className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Data Security</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <Zap className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Zero-Downtime Deployment</span>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-grow"></div>

              {/* Diagram 2 */}
              <div className="w-full h-48 md:h-56 items-center justify-center mt-2 mb-6 md:mb-8 relative hidden md:flex">
                {/* X pattern with 5 cloud logos */}
                <div className="relative" style={{ width: '232px', height: '232px' }}>
                  {/* Connecting lines from Azure outer ring to Vercel outer ring */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                    <defs>
                      <linearGradient id="azure-vercel-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 120, 212, 0.6)" />
                        <stop offset="100%" stopColor={isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(6, 182, 212, 0.6)"} />
                      </linearGradient>
                    </defs>
                    {/* Azure to Vercel (top-right to center) */}
                    <line
                      x1="175" y1="57"
                      x2="150" y2="82"
                      stroke="url(#azure-vercel-gradient)"
                      strokeWidth="1"
                    />
                    <line
                      x1="186" y1="68"
                      x2="161" y2="93"
                      stroke="url(#azure-vercel-gradient)"
                      strokeWidth="1"
                    />

                    {/* AWS to Vercel (top-left to center) */}
                    <linearGradient id="aws-vercel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255, 153, 0, 0.6)" />
                      <stop offset="100%" stopColor={isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(6, 182, 212, 0.6)"} />
                    </linearGradient>
                    <line
                      x1="57" y1="57"
                      x2="82" y2="82"
                      stroke="url(#aws-vercel-gradient)"
                      strokeWidth="1"
                    />
                    <line
                      x1="46" y1="68"
                      x2="71" y2="93"
                      stroke="url(#aws-vercel-gradient)"
                      strokeWidth="1"
                    />

                    {/* Google Cloud to Vercel (bottom-left to center) */}
                    <linearGradient id="gcp-vercel-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(66, 133, 244, 0.6)" />
                      <stop offset="100%" stopColor={isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(6, 182, 212, 0.6)"} />
                    </linearGradient>
                    <line
                      x1="57" y1="175"
                      x2="82" y2="150"
                      stroke="url(#gcp-vercel-gradient)"
                      strokeWidth="1"
                    />
                    <line
                      x1="46" y1="164"
                      x2="71" y2="139"
                      stroke="url(#gcp-vercel-gradient)"
                      strokeWidth="1"
                    />

                    {/* Oracle to Vercel (bottom-right to center) */}
                    <linearGradient id="oracle-vercel-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="rgba(199, 70, 52, 0.6)" />
                      <stop offset="100%" stopColor={isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(6, 182, 212, 0.6)"} />
                    </linearGradient>
                    <line
                      x1="175" y1="175"
                      x2="150" y2="150"
                      stroke="url(#oracle-vercel-gradient)"
                      strokeWidth="1"
                    />
                    <line
                      x1="186" y1="164"
                      x2="161" y2="139"
                      stroke="url(#oracle-vercel-gradient)"
                      strokeWidth="1"
                    />
                  </svg>
                  {/* Top-left - AWS (white/cyan top, orange bottom) */}
                  <div className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center">
                    <svg className="absolute w-16 h-16 animate-rotate-gradient" viewBox="0 0 64 64" fill="none">
                      <defs>
                        <linearGradient id="aws-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={isDarkMode ? "#FFFFFF" : "#06B6D4"} />
                          <stop offset="100%" stopColor="#FF9900" />
                        </linearGradient>
                      </defs>
                      <circle cx="32" cy="32" r="31" stroke="url(#aws-gradient-1)" strokeWidth="1" fill="none" />
                    </svg>
                    <svg className="absolute w-24 h-24 animate-rotate-gradient-slow" viewBox="0 0 96 96" fill="none">
                      <defs>
                        <linearGradient id="aws-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(6, 182, 212, 0.6)"} />
                          <stop offset="100%" stopColor="rgba(255, 153, 0, 0.6)" />
                        </linearGradient>
                      </defs>
                      <circle cx="48" cy="48" r="47" stroke="url(#aws-gradient-2)" strokeWidth="1" fill="none" />
                    </svg>
                    <img src="/icons/aws-color.svg" alt="AWS" className="w-7 h-7 object-contain relative z-10 icon-invert-light" />
                  </div>
                  {/* Top-right - Azure (blue) */}
                  <div className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center">
                    <div className="absolute w-16 h-16 rounded-full border animate-rotate-gradient" style={{ borderColor: '#0078D4' }}></div>
                    <div className="absolute w-24 h-24 rounded-full border animate-rotate-gradient-slow" style={{ borderColor: 'rgba(0, 120, 212, 0.6)' }}></div>
                    <img src="/icons/azure-color.svg" alt="Azure" className="w-6 h-6 object-contain relative z-10" />
                  </div>
                  {/* Center - Atlassian */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
                    <svg className="absolute w-16 h-16 animate-rotate-vercel-dashed" viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="32" r="31" className={isDarkMode ? "stroke-white" : "stroke-cyan-500"} strokeWidth="1" strokeDasharray="8 6" fill="none" />
                    </svg>
                    <div className={`absolute w-24 h-24 rounded-full border animate-rotate-gradient-slow ${isDarkMode ? 'border-white/60' : 'border-cyan-500/60'}`}></div>
                    <img src="/icons/Atlassian_icon.svg" alt="Atlassian" className={`w-7 h-7 object-contain relative z-10 ${isDarkMode ? '' : 'brightness-0'}`} />
                  </div>
                  {/* Bottom-left - Google Cloud (blue, red, yellow, green) */}
                  <div className="absolute bottom-0 left-0 w-12 h-12 flex items-center justify-center">
                    <svg className="absolute w-16 h-16 animate-rotate-gradient" viewBox="0 0 64 64" fill="none">
                      <defs>
                        <linearGradient id="gcp-gradient-1" gradientTransform="rotate(90)">
                          <stop offset="0%" stopColor="#4285F4" />
                          <stop offset="25%" stopColor="#EA4335" />
                          <stop offset="50%" stopColor="#FBBC05" />
                          <stop offset="75%" stopColor="#34A853" />
                          <stop offset="100%" stopColor="#4285F4" />
                        </linearGradient>
                      </defs>
                      <circle cx="32" cy="32" r="31" stroke="url(#gcp-gradient-1)" strokeWidth="1" fill="none" />
                    </svg>
                    <svg className="absolute w-24 h-24 animate-rotate-gradient-slow" viewBox="0 0 96 96" fill="none">
                      <defs>
                        <linearGradient id="gcp-gradient-2" gradientTransform="rotate(90)">
                          <stop offset="0%" stopColor="rgba(66, 133, 244, 0.6)" />
                          <stop offset="25%" stopColor="rgba(234, 67, 53, 0.6)" />
                          <stop offset="50%" stopColor="rgba(251, 188, 5, 0.6)" />
                          <stop offset="75%" stopColor="rgba(52, 168, 83, 0.6)" />
                          <stop offset="100%" stopColor="rgba(66, 133, 244, 0.6)" />
                        </linearGradient>
                      </defs>
                      <circle cx="48" cy="48" r="47" stroke="url(#gcp-gradient-2)" strokeWidth="1" fill="none" />
                    </svg>
                    <img src="/icons/googlecloud-color.svg" alt="Google Cloud" className="w-7 h-7 object-contain relative z-10" />
                  </div>
                  {/* Bottom-right - Oracle (red) */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 flex items-center justify-center">
                    <div className="absolute w-16 h-16 rounded-full border animate-rotate-gradient" style={{ borderColor: '#C74634' }}></div>
                    <div className="absolute w-24 h-24 rounded-full border animate-rotate-gradient-slow" style={{ borderColor: 'rgba(199, 70, 52, 0.6)' }}></div>
                    <img src="https://cdn.brandfetch.io/idnq7H7qT0/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1668081507500" alt="Oracle" className="w-8 h-8 object-contain relative z-10" />
                  </div>
                </div>
              </div>

            </div>

            {/* Data Analytics */}
            <div className="p-6 md:p-8 lg:p-10 bg-neutral-900 min-h-[400px] md:min-h-[900px] transition-all duration-300 hover:bg-neutral-800/50 group flex flex-col">
              <BarChart3 className="w-8 md:w-10 h-8 md:h-10 text-cyan-400 mb-3 md:mb-4" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Data Analytics Services</h3>
              <p className="text-neutral-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Transform raw data into actionable insights with advanced analytics and customized dashboards.
              </p>

              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" alt="Power BI" className="w-5 h-5" />
                  <span className="text-sm text-neutral-200">Power BI Dashboards</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <img src="https://cdn.worldvectorlogo.com/logos/tableau-software.svg" alt="Tableau" className="w-5 h-5" />
                  <span className="text-sm text-neutral-200">Tableau Analytics</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <BarChart3 className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Business Trend Analysis</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <FileText className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Custom Reporting</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <Database className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Data Insights</span>
                </div>
              </div>

              {/* Diagram 3 - Stacked Bar Chart */}
              <div className="w-full mt-auto">
                <svg width="100%" viewBox="0 0 100 96">
                  {/* Y-axis line */}
                  <line x1="12" y1="2" x2="12" y2="88" stroke="#525252" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                  {/* X-axis line */}
                  <line x1="12" y1="88" x2="100" y2="88" stroke="#525252" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />

                  {/* X-axis labels */}
                  <text x="12" y="94" fill="#737373" fontSize="3" textAnchor="middle">0</text>
                  <text x="30" y="94" fill="#737373" fontSize="3" textAnchor="middle">20</text>
                  <text x="50" y="94" fill="#737373" fontSize="3" textAnchor="middle">40</text>
                  <text x="70" y="94" fill="#737373" fontSize="3" textAnchor="middle">60</text>
                  <text x="90" y="94" fill="#737373" fontSize="3" textAnchor="middle">80</text>

                  {/* Y-axis labels */}
                  <text x="10" y="8" fill="#737373" fontSize="3" textAnchor="end">Jan</text>
                  <text x="10" y="15" fill="#737373" fontSize="3" textAnchor="end">Feb</text>
                  <text x="10" y="22" fill="#737373" fontSize="3" textAnchor="end">Mar</text>
                  <text x="10" y="29" fill="#737373" fontSize="3" textAnchor="end">Apr</text>
                  <text x="10" y="36" fill="#737373" fontSize="3" textAnchor="end">May</text>
                  <text x="10" y="43" fill="#737373" fontSize="3" textAnchor="end">Jun</text>
                  <text x="10" y="50" fill="#737373" fontSize="3" textAnchor="end">Jul</text>
                  <text x="10" y="57" fill="#737373" fontSize="3" textAnchor="end">Aug</text>
                  <text x="10" y="64" fill="#737373" fontSize="3" textAnchor="end">Sep</text>
                  <text x="10" y="71" fill="#737373" fontSize="3" textAnchor="end">Oct</text>
                  <text x="10" y="78" fill="#737373" fontSize="3" textAnchor="end">Nov</text>
                  <text x="10" y="85" fill="#737373" fontSize="3" textAnchor="end">Dec</text>

                  {/* Row 1 - Jan */}
                  <rect x="12" y="5" width="28" height="5" fill="#36213E" />
                  <rect x="40" y="5" width="20" height="5" fill="#554971" />
                  <rect x="60" y="5" width="15" height="5" fill="#63768D" />

                  {/* Row 2 - Feb */}
                  <rect x="12" y="12" width="35" height="5" fill="#36213E" />
                  <rect x="47" y="12" width="22" height="5" fill="#554971" />
                  <rect x="69" y="12" width="18" height="5" fill="#63768D" />

                  {/* Row 3 - Mar */}
                  <rect x="12" y="19" width="25" height="5" fill="#36213E" />
                  <rect x="37" y="19" width="28" height="5" fill="#554971" />
                  <rect x="65" y="19" width="12" height="5" fill="#63768D" />

                  {/* Row 4 - Apr */}
                  <rect x="12" y="26" width="38" height="5" fill="#36213E" />
                  <rect x="50" y="26" width="18" height="5" fill="#554971" />
                  <rect x="68" y="26" width="22" height="5" fill="#63768D" />

                  {/* Row 5 - May */}
                  <rect x="12" y="33" width="32" height="5" fill="#36213E" />
                  <rect x="44" y="33" width="25" height="5" fill="#554971" />
                  <rect x="69" y="33" width="14" height="5" fill="#63768D" />

                  {/* Row 6 - Jun */}
                  <rect x="12" y="40" width="40" height="5" fill="#36213E" />
                  <rect x="52" y="40" width="20" height="5" fill="#554971" />
                  <rect x="72" y="40" width="18" height="5" fill="#63768D" />

                  {/* Row 7 - Jul */}
                  <rect x="12" y="47" width="30" height="5" fill="#36213E" />
                  <rect x="42" y="47" width="24" height="5" fill="#554971" />
                  <rect x="66" y="47" width="20" height="5" fill="#63768D" />

                  {/* Row 8 - Aug */}
                  <rect x="12" y="54" width="42" height="5" fill="#36213E" />
                  <rect x="54" y="54" width="26" height="5" fill="#554971" />
                  <rect x="80" y="54" width="16" height="5" fill="#63768D" />

                  {/* Row 9 - Sep */}
                  <rect x="12" y="61" width="34" height="5" fill="#36213E" />
                  <rect x="46" y="61" width="22" height="5" fill="#554971" />
                  <rect x="68" y="61" width="18" height="5" fill="#63768D" />

                  {/* Row 10 - Oct */}
                  <rect x="12" y="68" width="39" height="5" fill="#36213E" />
                  <rect x="51" y="68" width="24" height="5" fill="#554971" />
                  <rect x="75" y="68" width="14" height="5" fill="#63768D" />

                  {/* Row 11 - Nov */}
                  <rect x="12" y="75" width="30" height="5" fill="#36213E" />
                  <rect x="42" y="75" width="28" height="5" fill="#554971" />
                  <rect x="70" y="75" width="20" height="5" fill="#63768D" />

                  {/* Row 12 - Dec */}
                  <rect x="12" y="82" width="45" height="5" fill="#36213E" />
                  <rect x="57" y="82" width="25" height="5" fill="#554971" />
                  <rect x="82" y="82" width="16" height="5" fill="#63768D" />
                </svg>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Why North Lantern Section */}
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
            <div className="aspect-square max-h-[400px] md:max-h-none flex items-center justify-center md:justify-end reveal-right">
              <InteractiveGlobe key="globe-rose" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-28 bg-neutral-950">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 reveal">
            <p className="text-xs md:text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 md:mb-4">Engagement Models</p>
            <h2 className="text-2xl md:text-5xl font-medium text-white tracking-tight mb-4 md:mb-6">Flexible Structures for Every Need</h2>
            <p className="text-sm md:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Choose the engagement model that aligns with your project scope, timeline, and organizational preferences. All models include senior consultant engagement and transparent communication.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 reveal-stagger">
            {/* Project-Based */}
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-2">
              <div className="text-3xl md:text-4xl mb-4 md:mb-6">📋</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Project-Based</h3>
              <p className="text-cyan-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">Fixed Scope</p>
              <p className="text-neutral-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Defined deliverables. Clear timeline. Predictable investment. Ideal for implementations with well-understood requirements.
              </p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base">
                  <span className="text-cyan-400">✦</span>
                  Comprehensive discovery phase
                </li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base">
                  <span className="text-cyan-400">✦</span>
                  Fixed scope and timeline
                </li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base">
                  <span className="text-cyan-400">✦</span>
                  Milestone-based delivery
                </li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base">
                  <span className="text-cyan-400">✦</span>
                  Detailed documentation
                </li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base hidden md:flex">
                  <span className="text-cyan-400">✦</span>
                  Knowledge transfer included
                </li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm md:text-base hidden md:flex">
                  <span className="text-cyan-400">✦</span>
                  Post-launch support period
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full py-3 md:py-4 px-6 text-center border border-white/20 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/5 hover:border-cyan-500/50 text-sm md:text-base"
              >
                Discuss Scope
              </a>
            </div>

            {/* Retainer - Featured */}
            <div className="bg-gradient-to-b from-cyan-900/30 to-teal-900/20 border border-cyan-500/30 rounded-2xl md:rounded-3xl p-6 md:p-8 relative transition-all duration-300 hover:-translate-y-2 md:scale-105">
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-teal-500 text-neutral-900 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-3xl md:text-4xl mb-4 md:mb-6 mt-2 md:mt-0">🔄</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Retainer</h3>
              <p className="text-cyan-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">Monthly Partnership</p>
              <p className="text-neutral-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Priority access. Continuous optimization. Strategic guidance month over month. For teams that need ongoing expert support.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Dedicated consultant hours
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Priority response times
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Proactive system optimization
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Monthly strategic advisory
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Flexible scope adjustments
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Preferential project rates
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full py-4 px-6 text-center bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg text-neutral-900 font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]"
              >
                Start Partnership
              </a>
            </div>

            {/* Value-Based */}
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-2">
              <div className="text-4xl mb-6">📈</div>
              <h3 className="text-2xl font-bold text-white mb-2">Value-Based</h3>
              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4">ROI-Aligned</p>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                Skin in the game. Pricing tied to the business value we create together. Our incentives match yours.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Performance-based components
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Shared success metrics
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Strategic partnership model
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Long-term value focus
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Aligned incentives
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <span className="text-cyan-400">✦</span>
                  Outcome guarantees
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full py-4 px-6 text-center border border-white/20 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/5 hover:border-cyan-500/50"
              >
                Explore Options
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          {/* Centered Header */}
          <div className="text-center mb-10 md:mb-16 reveal">
            <h2 className="text-2xl md:text-5xl font-medium text-white tracking-tight">Let&apos;s Start a Conversation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12 items-start max-w-5xl mx-auto">
            {/* Left side - Form */}
            <form onSubmit={handleSubmit} className="p-5 md:p-8 rounded-xl bg-neutral-900 border border-white/10 reveal-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-neutral-300">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-white/30 focus:outline-none transition-all text-white placeholder-neutral-600"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-neutral-300">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-white/30 focus:outline-none transition-all text-white placeholder-neutral-600"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-neutral-300">Company</label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-white/30 focus:outline-none transition-all text-white placeholder-neutral-600"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium mb-2 text-neutral-300">Company Size</label>
                  <select
                    id="companySize"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-white/30 focus:outline-none transition-all text-white"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-300">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-white/30 focus:outline-none transition-all text-white placeholder-neutral-600"
                  placeholder="john@acme.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-neutral-300">Phone</label>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  className="phone-input-dark"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="service" className="block text-sm font-medium mb-2 text-neutral-300">Primary Product Interest</label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-white/30 focus:outline-none transition-all text-white"
                >
                  <option value="atlassian">Atlassian Solutions</option>
                  <option value="bi">Business Intelligence</option>
                  <option value="cloud">Cloud Migration</option>
                  <option value="all">All Services</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="engagement" className="block text-sm font-medium mb-2 text-neutral-300">Preferred Engagement Model</label>
                <select
                  id="engagement"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-white/30 focus:outline-none transition-all text-white"
                >
                  <option value="">Select engagement type</option>
                  <option value="project-based">Project-Based (Fixed Scope)</option>
                  <option value="retainer">Retainer (Monthly Partnership)</option>
                  <option value="value-based">Value-Based (ROI-Aligned)</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-300">How can we help?</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-white/30 focus:outline-none transition-all text-white placeholder-neutral-600 resize-none"
                  placeholder="Tell us about your project or questions..."
                />
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-white/10 bg-black text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-neutral-400">
                    By submitting this form, I confirm that I have read and understood the North Lantern Group <a href="#" className="text-cyan-400 hover:underline">Privacy Statement</a>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 bg-white hover:bg-neutral-200 text-black font-medium rounded-lg transition-all"
              >
                Request Free Consultation
              </button>
            </form>

            {/* Right side - Sales message */}
            <div className="flex flex-col justify-center reveal-right">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-white font-medium mb-1">Get a custom demo.</p>
                    <p className="text-neutral-400">Discover the value of NLG for your enterprise and explore our custom plans and pricing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-white font-medium mb-1">Set up your Enterprise trial.</p>
                    <p className="text-neutral-400">See for yourself how North Lantern Group speeds up your workflow & impact.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <p className="text-white font-medium mb-1">Dedicated support team.</p>
                    <p className="text-neutral-400">Our experts are available 24/7 to help you achieve your business goals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-10 md:pt-16 pb-6 md:pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4 md:mb-6">
                <Image
                  src="/logo.png"
                  alt="North Lantern Group"
                  width={200}
                  height={60}
                  className="h-10 md:h-14 w-auto"
                />
              </div>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                Atlassian Cloud implementation and Business Intelligence solutions that illuminate the path to sustainable growth.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 md:w-10 h-9 md:h-10 bg-white/5 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-cyan-400 hover:text-neutral-900 transition-all text-sm"
                  aria-label="LinkedIn"
                >
                  in
                </a>
                <a
                  href="#"
                  className="w-9 md:w-10 h-9 md:h-10 bg-white/5 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-cyan-400 hover:text-neutral-900 transition-all text-sm"
                  aria-label="Twitter"
                >
                  𝕏
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-white font-semibold text-base md:text-lg mb-4 md:mb-6">Services</h4>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                <li><a href="#services" className="text-neutral-400 hover:text-cyan-400 transition-colors">Atlassian Cloud</a></li>
                <li><a href="#services" className="text-neutral-400 hover:text-cyan-400 transition-colors">Business Intelligence</a></li>
                <li><a href="#services" className="text-neutral-400 hover:text-cyan-400 transition-colors">Migrations</a></li>
                <li><a href="#services" className="text-neutral-400 hover:text-cyan-400 transition-colors">Strategic Advisory</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-semibold text-base md:text-lg mb-4 md:mb-6">Company</h4>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                <li><a href="#about" className="text-neutral-400 hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#approach" className="text-neutral-400 hover:text-cyan-400 transition-colors">Our Approach</a></li>
                <li><a href="#pricing" className="text-neutral-400 hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#contact" className="text-neutral-400 hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Resources Column - Hidden on mobile to save space */}
            <div className="hidden md:block">
              <h4 className="text-white font-semibold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-cyan-400 transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-cyan-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/5 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-xs md:text-sm">&copy; 2025 North Lantern Group. All rights reserved.</p>
            <div className="flex gap-6 md:gap-8">
              <a href="#" className="text-neutral-500 text-xs md:text-sm hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-500 text-xs md:text-sm hover:text-cyan-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
