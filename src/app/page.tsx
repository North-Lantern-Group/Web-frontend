"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ParticleCompass from "@/components/ParticleCompass";
import InteractiveGlobe from "@/components/Globe";
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
} from "lucide-react";
import Xarrow from "react-xarrows";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    service: "atlassian",
  });

  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false);
  const [showPricingMenu, setShowPricingMenu] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [servicesVisible, setServicesVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLParagraphElement>(null);

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
    <div className="min-h-screen bg-neutral-950 font-sans">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-lg">
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <div className="h-8 overflow-hidden rounded-lg w-fit">
                <Image
                  src="/logo.png"
                  alt="North Lantern Group"
                  width={180}
                  height={50}
                  className="h-12 w-auto -mt-2"
                />
              </div>
            </a>

            {/* Navigation Links with Dropdowns */}
            <div className="hidden md:flex items-center gap-8">
              {/* Solutions Dropdown */}
              <div className="relative"
                   onMouseEnter={() => setShowSolutionsMenu(true)}
                   onMouseLeave={() => setShowSolutionsMenu(false)}>
                <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                  Solutions
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showSolutionsMenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-neutral-900 border border-white/10 rounded-lg shadow-xl py-2">
                    <a href="#services" className="block px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                      <div className="font-medium">Atlassian Solutions</div>
                      <div className="text-xs text-neutral-500">Jira, Confluence & More</div>
                    </a>
                    <a href="#services" className="block px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                      <div className="font-medium">Business Intelligence</div>
                      <div className="text-xs text-neutral-500">Power BI & Analytics</div>
                    </a>
                    <a href="#services" className="block px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                      <div className="font-medium">Cloud Migration</div>
                      <div className="text-xs text-neutral-500">AWS & Azure</div>
                    </a>
                  </div>
                )}
              </div>

              {/* Pricing Dropdown */}
              <div className="relative"
                   onMouseEnter={() => setShowPricingMenu(true)}
                   onMouseLeave={() => setShowPricingMenu(false)}>
                <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                  Pricing
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showPricingMenu && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-neutral-900 border border-white/10 rounded-lg shadow-xl py-2">
                    <a href="#contact" className="block px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                      <div className="font-medium">Starter Package</div>
                      <div className="text-xs text-neutral-500">For small teams</div>
                    </a>
                    <a href="#contact" className="block px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                      <div className="font-medium">Enterprise</div>
                      <div className="text-xs text-neutral-500">Custom solutions</div>
                    </a>
                    <a href="#contact" className="block px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                      <div className="font-medium">Request Quote</div>
                      <div className="text-xs text-neutral-500">Get custom pricing</div>
                    </a>
                  </div>
                )}
              </div>

              <a href="#about" className="text-sm text-neutral-400 hover:text-white transition-colors">About</a>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black text-sm font-medium rounded-full transition-all"
          >
            Get Started
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="relative min-h-[85vh] flex items-center overflow-hidden rounded-3xl bg-black">
          {/* Particle Compass Background */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <ParticleCompass />
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/3 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-8 leading-[1.1] tracking-tight text-white">
              <span className="inline-block opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">Transformative</span>{" "}
              <span className="inline-block opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">Solutions</span>{" "}
              <span className="inline-block opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">for</span>{" "}
              <span className="group relative inline-block cursor-pointer opacity-0 animate-[fadeInUp_0.6s_ease-out_0.7s_forwards]" style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #00D4FF 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Modern Businesses
                <span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500 ease-out group-hover:w-full group-hover:left-0"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-4xl mx-auto opacity-0 animate-[fadeInUp_0.6s_ease-out_0.9s_forwards]">
              Empower your organization with comprehensive Atlassian solutions and data analytics to drive collaboration and operational excellence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_1.1s_forwards]">
              <a
                href="#contact"
                className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black font-medium rounded-full smooth-transition hover:scale-105 text-base"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="px-6 py-2.5 bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-medium rounded-full smooth-transition hover:scale-105 text-base"
              >
                View Services
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="pt-8 pb-28 relative">
        {/* Section Header */}
        <div ref={servicesRef} className="text-center py-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-white tracking-tight transition-all duration-700 hover:scale-[1.02] cursor-default ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Comprehensive solutions for every need.
          </h2>
          <p className={`text-lg text-neutral-400 mt-4 max-w-2xl mx-auto transition-all duration-700 delay-200 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Expert services designed to modernize and elevate your business operations.
          </p>
        </div>

        <div className="container mx-auto px-6 relative">

          {/* Services Cards */}
          <div className="grid lg:grid-cols-4 gap-0 border border-white/10 rounded-xl overflow-hidden">
            {/* Atlassian Solutions */}
            <div className="p-6 lg:p-8 bg-neutral-900 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[850px] transition-all duration-300 hover:bg-neutral-800/50 group flex flex-col">
              <Layers className="w-8 h-8 text-cyan-400 mb-3" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-3 text-white">Atlassian Solutions</h3>
              <p className="text-neutral-400 mb-6 leading-relaxed text-sm">
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
              <div className="w-full h-56 flex items-center px-0 mt-2 mb-8 relative">
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
            <div className="p-6 lg:p-8 bg-neutral-900 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[850px] transition-all duration-300 hover:bg-neutral-800/50 group flex flex-col">
              <Cloud className="w-8 h-8 text-cyan-400 mb-3" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-3 text-white">Cloud Migrations</h3>
              <p className="text-neutral-400 mb-6 leading-relaxed text-sm">
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
              <div className="w-full h-56 flex items-center justify-center mt-2 mb-8 relative">
                {/* X pattern with 5 cloud logos */}
                <div className="relative" style={{ width: '232px', height: '232px' }}>
                  {/* Connecting lines from Azure outer ring to Vercel outer ring */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                    <defs>
                      <linearGradient id="azure-vercel-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 120, 212, 0.6)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
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
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
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
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
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
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
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
                  {/* Top-left - AWS (white top, orange bottom) */}
                  <div className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center">
                    <svg className="absolute w-16 h-16 animate-rotate-gradient" viewBox="0 0 64 64" fill="none">
                      <defs>
                        <linearGradient id="aws-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="100%" stopColor="#FF9900" />
                        </linearGradient>
                      </defs>
                      <circle cx="32" cy="32" r="31" stroke="url(#aws-gradient-1)" strokeWidth="1" fill="none" />
                    </svg>
                    <svg className="absolute w-24 h-24 animate-rotate-gradient-slow" viewBox="0 0 96 96" fill="none">
                      <defs>
                        <linearGradient id="aws-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                          <stop offset="100%" stopColor="rgba(255, 153, 0, 0.6)" />
                        </linearGradient>
                      </defs>
                      <circle cx="48" cy="48" r="47" stroke="url(#aws-gradient-2)" strokeWidth="1" fill="none" />
                    </svg>
                    <img src="/icons/aws-color.svg" alt="AWS" className="w-7 h-7 object-contain relative z-10" />
                  </div>
                  {/* Top-right - Azure (blue) */}
                  <div className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center">
                    <div className="absolute w-16 h-16 rounded-full border animate-rotate-gradient" style={{ borderColor: '#0078D4' }}></div>
                    <div className="absolute w-24 h-24 rounded-full border animate-rotate-gradient-slow" style={{ borderColor: 'rgba(0, 120, 212, 0.6)' }}></div>
                    <img src="/icons/azure-color.svg" alt="Azure" className="w-6 h-6 object-contain relative z-10" />
                  </div>
                  {/* Center - Vercel (white) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
                    <svg className="absolute w-16 h-16 animate-rotate-vercel-dashed" viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="32" r="31" stroke="white" strokeWidth="1" strokeDasharray="8 6" fill="none" />
                    </svg>
                    <div className="absolute w-24 h-24 rounded-full border animate-rotate-gradient-slow" style={{ borderColor: 'rgba(255, 255, 255, 0.6)' }}></div>
                    <img src="/icons/vercel-color.svg" alt="Vercel" className="w-7 h-7 object-contain relative z-10 -mt-1" />
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
            <div className="p-6 lg:p-8 bg-neutral-900 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[850px] transition-all duration-300 hover:bg-neutral-800/50 group flex flex-col">
              <BarChart3 className="w-8 h-8 text-cyan-400 mb-3" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-3 text-white">Data Analytics Services</h3>
              <p className="text-neutral-400 mb-6 leading-relaxed text-sm">
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

            {/* Operational Transformations */}
            <div className="p-6 lg:p-8 bg-neutral-900 min-h-[850px] transition-all duration-300 hover:bg-neutral-800/50 group flex flex-col">
              <Settings className="w-8 h-8 text-cyan-400 mb-3" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-3 text-white">Operational Transformations</h3>
              <p className="text-neutral-400 mb-6 leading-relaxed text-sm">
                Optimize processes and improve efficiency with tailored strategies aligned to your objectives.
              </p>

              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <RefreshCw className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Process Optimization</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <Zap className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Workflow Automation</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <Users className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Team Productivity</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <Rocket className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Business Growth</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <CheckCircle className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Best Practices</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-full w-fit transition-all duration-200 hover:bg-neutral-700 cursor-default">
                  <Globe className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                  <span className="text-sm text-neutral-200">Change Management</span>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-grow"></div>

              {/* Diagram 4 */}
              <div className="w-full flex flex-col items-center justify-end mt-auto mb-12 relative">
                {/* Box 0 (top) - 10% smaller */}
                <div className="w-[65.61%] bg-neutral-800 border border-neutral-600 rounded-lg px-2 py-2 flex items-center opacity-[0.656] mb-0">
                  {/* Traffic light buttons */}
                  <div className="flex items-center gap-1">
                    <div className="w-[6.56px] h-[6.56px] rounded-full bg-red-500"></div>
                    <div className="w-[6.56px] h-[6.56px] rounded-full bg-yellow-500"></div>
                    <div className="w-[6.56px] h-[6.56px] rounded-full bg-green-500"></div>
                  </div>

                  {/* Spacer to push content to the right */}
                  <div className="flex-grow"></div>

                  {/* Right: domain text */}
                  <span className="text-neutral-300 font-mono" style={{ fontSize: '9.85px' }}>team.domain.com</span>
                </div>

                {/* Box 1 - 10% smaller */}
                <div className="w-[72.9%] bg-neutral-800 border border-neutral-600 rounded-lg px-2.5 py-2.5 flex items-center opacity-[0.729] mb-0">
                  {/* Traffic light buttons */}
                  <div className="flex items-center gap-1">
                    <div className="w-[7.29px] h-[7.29px] rounded-full bg-red-500"></div>
                    <div className="w-[7.29px] h-[7.29px] rounded-full bg-yellow-500"></div>
                    <div className="w-[7.29px] h-[7.29px] rounded-full bg-green-500"></div>
                  </div>

                  {/* Spacer to push content to the right */}
                  <div className="flex-grow"></div>

                  {/* Right: domain text */}
                  <span className="text-neutral-300 font-mono" style={{ fontSize: '10.94px' }}>admin.domain.com</span>
                </div>

                {/* Box 2 - 10% smaller */}
                <div className="w-[81%] bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2.5 flex items-center opacity-[0.81] mb-0">
                  {/* Traffic light buttons */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-[8.1px] h-[8.1px] rounded-full bg-red-500"></div>
                    <div className="w-[8.1px] h-[8.1px] rounded-full bg-yellow-500"></div>
                    <div className="w-[8.1px] h-[8.1px] rounded-full bg-green-500"></div>
                  </div>

                  {/* Spacer to push content to the right */}
                  <div className="flex-grow"></div>

                  {/* Right: domain text */}
                  <span className="text-neutral-300 font-mono" style={{ fontSize: '12.15px' }}>project.domain.com</span>
                </div>

                {/* Box 3 - 10% smaller, 10% less opacity */}
                <div className="w-[90%] bg-neutral-800 border border-neutral-600 rounded-lg px-3.5 py-2.5 flex items-center opacity-[0.90] mb-0">
                  {/* Traffic light buttons */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-[9px] h-[9px] rounded-full bg-red-500"></div>
                    <div className="w-[9px] h-[9px] rounded-full bg-yellow-500"></div>
                    <div className="w-[9px] h-[9px] rounded-full bg-green-500"></div>
                  </div>

                  {/* Spacer to push content to the right */}
                  <div className="flex-grow"></div>

                  {/* Right: domain text */}
                  <span className="text-neutral-300 font-mono" style={{ fontSize: '13.5px' }}>customer.domain.com</span>
                </div>

                {/* Browser-style title bar - Box 4 (bottom) */}
                <div className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 flex items-center">
                  {/* Traffic light buttons */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>

                  {/* Spacer to push content to the right */}
                  <div className="flex-grow"></div>

                  {/* Right: domain text */}
                  <span className="text-neutral-300 font-mono" style={{ fontSize: '15px' }}>organization.domain.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <p ref={aboutRef} className={`text-2xl font-semibold tracking-normal text-cyan-400 mb-4 relative inline-block ${aboutVisible ? 'who-we-are-visible' : ''}`}>
                <span>Who We Are</span>
                <span className="absolute bottom-0 left-0 h-[2px] bg-cyan-400 who-we-are-underline"></span>
              </p>
              <h2 className="text-4xl md:text-5xl font-medium mb-8 text-white tracking-tight">Dedicated to Elevating Business Excellence</h2>
              <p className="text-lg text-neutral-400 mb-6">
                North Lantern Group is a leading professional services firm specializing in innovative technology solutions. Founded to enhance collaboration and governance workflows, NLG offers tailored Atlassian solutions, seamless cloud migrations, and powerful data analytics services.
              </p>

              <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-amber-400/30 rounded-full">
                  <span className="text-sm text-amber-400">5+ Global Awards</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-teal-400/30 rounded-full">
                  <span className="text-sm text-teal-400">24/7 Support Available</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-emerald-400/30 rounded-full">
                  <span className="text-sm text-emerald-400">12+ Years of Experience</span>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                {/* Labels row */}
                <div className="flex-1 flex flex-col items-start">
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Projects Delivered</div>
                  <div className="text-2xl font-medium text-rose-400">60+</div>
                </div>
                <div className="flex-1 flex flex-col items-start">
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Team Members</div>
                  <div className="text-2xl font-medium text-violet-400">25+</div>
                </div>
                <div className="flex-1 flex flex-col items-start">
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Client Satisfaction</div>
                  <div className="text-2xl font-medium text-cyan-400">92%</div>
                </div>
              </div>

              <div className="flex items-end gap-4 mt-4">
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
            <div className="aspect-square flex items-center justify-end">
              <InteractiveGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          {/* Centered Header */}
          <div className="text-center mb-16">
            <p className="text-2xl font-semibold tracking-normal text-cyan-400 mb-4">What Our Clients Say</p>
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight">Hear from Our Satisfied Clients</h2>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 border-t border-l border-white/10 grid-rows-3 testimonial-grid">
            {/* Row 1 */}
            <div className="testimonial-cell p-10 border-r border-b flex flex-col">
              <p className="text-cyan-400 font-semibold mb-4">Michael Thompson</p>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                &quot;<span className="text-neutral-200 font-medium">North Lantern Group transformed our workflow</span> and enhanced our collaboration significantly. Their expertise is truly commendable.&quot;
              </p>
              <p className="text-neutral-500 text-sm mt-8">New York, United States</p>
              <p className="text-neutral-600 text-base font-mono font-light mt-1">40.7128° N, 74.0060° W</p>
              <a href="#" className="text-neutral-400 text-sm mt-4 flex items-center gap-2 hover:text-white transition-colors">
                Read the full story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="testimonial-cell p-10 border-r border-b flex flex-col">
              <p className="text-cyan-400 font-semibold mb-4">Emma Johnson</p>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                &quot;The team at NLG provided insights that <span className="text-neutral-200 font-medium">reshaped our data strategy</span>, helping us achieve greater operational efficiency.&quot;
              </p>
              <p className="text-neutral-500 text-sm mt-8">London, United Kingdom</p>
              <p className="text-neutral-600 text-base font-mono font-light mt-1">51.5074° N, 0.1278° W</p>
              <a href="#" className="text-neutral-400 text-sm mt-4 flex items-center gap-2 hover:text-white transition-colors">
                Read the case study
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="testimonial-cell p-10 border-r border-b flex flex-col">
              <p className="text-cyan-400 font-semibold mb-4">James Anderson</p>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                &quot;With NLG&apos;s cloud migration services, our transition was seamless, and <span className="text-neutral-200 font-medium">our productivity has skyrocketed</span> since!&quot;
              </p>
              <p className="text-neutral-500 text-sm mt-8">Toronto, Canada</p>
              <p className="text-neutral-600 text-base font-mono font-light mt-1">43.6532° N, 79.3832° W</p>
              <a href="#" className="text-neutral-400 text-sm mt-4 flex items-center gap-2 hover:text-white transition-colors">
                Explore their journey
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>

            {/* Row 2 */}
            <div className="testimonial-cell p-10 border-r border-b flex flex-col">
              <p className="text-cyan-400 font-semibold mb-4">Sarah Williams</p>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                &quot;Thanks to North Lantern Group, <span className="text-neutral-200 font-medium">our governance workflows are much smoother</span>. Their dedication to client success is outstanding!&quot;
              </p>
              <p className="text-neutral-500 text-sm mt-8">Sydney, Australia</p>
              <p className="text-neutral-600 text-base font-mono font-light mt-1">33.8688° S, 151.2093° E</p>
              <a href="#" className="text-neutral-400 text-sm mt-4 flex items-center gap-2 hover:text-white transition-colors">
                See the transformation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="testimonial-cell p-10 border-r border-b flex flex-col">
              <p className="text-cyan-400 font-semibold mb-4">David Chen</p>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                &quot;The Atlassian implementation was flawless. <span className="text-neutral-200 font-medium">Our teams now collaborate 3x faster</span> than before.&quot;
              </p>
              <p className="text-neutral-500 text-sm mt-8">Singapore</p>
              <p className="text-neutral-600 text-base font-mono font-light mt-1">1.3521° N, 103.8198° E</p>
              <a href="#" className="text-neutral-400 text-sm mt-4 flex items-center gap-2 hover:text-white transition-colors">
                Read the full article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="testimonial-cell p-10 border-r border-b flex flex-col">
              <p className="text-cyan-400 font-semibold mb-4">Maria Garcia</p>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                &quot;NLG&apos;s Power BI dashboards gave us <span className="text-neutral-200 font-medium">real-time visibility into our operations</span>. Game-changing for our decision making.&quot;
              </p>
              <p className="text-neutral-500 text-sm mt-8">Dubai, United Arab Emirates</p>
              <p className="text-neutral-600 text-base font-mono font-light mt-1">25.2048° N, 55.2708° E</p>
              <a href="#" className="text-neutral-400 text-sm mt-4 flex items-center gap-2 hover:text-white transition-colors">
                Discover the impact
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>

            {/* Row 3 */}
            <div className="testimonial-cell p-10 border-r border-b flex flex-col">
              <p className="text-cyan-400 font-semibold mb-4">Robert Kim</p>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                &quot;Switching to AWS with NLG&apos;s guidance <span className="text-neutral-200 font-medium">reduced our infrastructure costs by 40%</span>. Exceptional service.&quot;
              </p>
              <p className="text-neutral-500 text-sm mt-8">Tokyo, Japan</p>
              <p className="text-neutral-600 text-base font-mono font-light mt-1">35.6762° N, 139.6503° E</p>
              <a href="#" className="text-neutral-400 text-sm mt-4 flex items-center gap-2 hover:text-white transition-colors">
                Read the success story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="testimonial-cell p-10 border-r border-b flex flex-col">
              <p className="text-cyan-400 font-semibold mb-4">Lisa Mueller</p>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                &quot;The team&apos;s expertise in Confluence helped us <span className="text-neutral-200 font-medium">centralize our entire knowledge base</span> in just weeks.&quot;
              </p>
              <p className="text-neutral-500 text-sm mt-8">Berlin, Germany</p>
              <p className="text-neutral-600 text-base font-mono font-light mt-1">52.5200° N, 13.4050° E</p>
              <a href="#" className="text-neutral-400 text-sm mt-4 flex items-center gap-2 hover:text-white transition-colors">
                View the details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="testimonial-cell p-10 border-r border-b flex flex-col">
              <p className="text-cyan-400 font-semibold mb-4">Ahmed Hassan</p>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                &quot;NLG delivered exactly what we needed. <span className="text-neutral-200 font-medium">Professional, responsive, and results-driven</span>. Highly recommend.&quot;
              </p>
              <p className="text-neutral-500 text-sm mt-8">Abu Dhabi, United Arab Emirates</p>
              <p className="text-neutral-600 text-base font-mono font-light mt-1">24.4539° N, 54.3773° E</p>
              <a href="#" className="text-neutral-400 text-sm mt-4 flex items-center gap-2 hover:text-white transition-colors">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28">
        <div className="container mx-auto px-6">
          {/* Centered Header */}
          <div className="text-center mb-16">
            <p className="text-2xl font-semibold tracking-normal text-cyan-400 mb-4">Get in Touch</p>
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight">Let&apos;s Start a Conversation</h2>
          </div>

          <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start max-w-5xl mx-auto">
            {/* Left side - Form */}
            <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-neutral-900 border border-white/10">
              <div className="grid grid-cols-2 gap-4 mb-4">
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

              <div className="grid grid-cols-2 gap-4 mb-4">
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
            <div className="flex flex-col justify-center">
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
      <footer className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="h-12 overflow-hidden rounded-xl mb-4 w-fit">
                <Image
                  src="/logo.png"
                  alt="North Lantern Group"
                  width={200}
                  height={60}
                  className="h-16 w-auto -mt-2"
                />
              </div>
              <p className="text-base text-neutral-500 leading-relaxed">
                Illuminating your path to digital excellence
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4 text-lg">Services</h3>
              <ul className="space-y-2 text-base text-neutral-500">
                <li><a href="#services" className="hover:text-white transition-colors">Atlassian Solutions</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Business Intelligence</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Cloud Migration</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4 text-lg">Company</h3>
              <ul className="space-y-2 text-base text-neutral-500">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4 text-lg">Contact</h3>
              <p className="text-base text-neutral-500">
                <a href="mailto:info@northlantern.com" className="hover:text-white transition-colors">
                  info@northlantern.com
                </a>
              </p>
            </div>
          </div>

          <div className="pt-8 text-center text-base text-neutral-600">
            <p>&copy; 2026 North Lantern Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
