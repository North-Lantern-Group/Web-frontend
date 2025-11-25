"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    service: "atlassian",
  });

  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false);
  const [showPricingMenu, setShowPricingMenu] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@northlantern.com?subject=Inquiry from ${formData.name}&body=Name: ${formData.name}%0D%0ACompany: ${formData.company}%0D%0AEmail: ${formData.email}%0D%0AService Interest: ${formData.service}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-nlg-navy font-sans">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-nlg-navy/95 backdrop-blur-lg border-b border-nlg-teal/20">
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Exact Logo from Image */}
            <a href="#" className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Lantern Frame */}
                <div className="absolute inset-0 border-2 border-nlg-cyan rounded-sm"></div>
                {/* N Letter */}
                <span className="font-serif text-2xl font-bold text-nlg-cyan relative z-10">N</span>
                {/* Sparkle */}
                <div className="absolute -right-1 -top-1">
                  <div className="w-1.5 h-1.5 bg-nlg-cyan rounded-full"></div>
                  <div className="absolute top-0 left-0 w-1.5 h-3 bg-nlg-cyan/40 blur-sm"></div>
                  <div className="absolute top-0 left-0 w-3 h-1.5 bg-nlg-cyan/40 blur-sm"></div>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-bold tracking-wide" style={{
                  background: 'linear-gradient(135deg, #00D4FF 0%, #00A8A8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  NORTH LANTERN
                </span>
                <span className="text-[10px] text-nlg-teal/80 tracking-[0.15em] font-semibold">GROUP</span>
              </div>
            </a>

            {/* Navigation Links with Dropdowns */}
            <div className="hidden md:flex items-center gap-8">
              {/* Solutions Dropdown */}
              <div className="relative"
                   onMouseEnter={() => setShowSolutionsMenu(true)}
                   onMouseLeave={() => setShowSolutionsMenu(false)}>
                <button className="text-sm text-nlg-light-gray hover:text-nlg-cyan transition-colors flex items-center gap-1">
                  Solutions
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showSolutionsMenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-nlg-charcoal/95 backdrop-blur-lg border border-nlg-teal/30 rounded-lg shadow-xl py-2">
                    <a href="#services" className="block px-4 py-2.5 text-sm text-nlg-light-gray hover:text-nlg-cyan hover:bg-nlg-teal/10 transition-colors">
                      <div className="font-semibold">Atlassian Solutions</div>
                      <div className="text-xs text-nlg-light-gray/70">Jira, Confluence & More</div>
                    </a>
                    <a href="#services" className="block px-4 py-2.5 text-sm text-nlg-light-gray hover:text-nlg-cyan hover:bg-nlg-teal/10 transition-colors">
                      <div className="font-semibold">Business Intelligence</div>
                      <div className="text-xs text-nlg-light-gray/70">Power BI & Analytics</div>
                    </a>
                    <a href="#services" className="block px-4 py-2.5 text-sm text-nlg-light-gray hover:text-nlg-cyan hover:bg-nlg-teal/10 transition-colors">
                      <div className="font-semibold">Cloud Migration</div>
                      <div className="text-xs text-nlg-light-gray/70">AWS & Azure</div>
                    </a>
                  </div>
                )}
              </div>

              {/* Pricing Dropdown */}
              <div className="relative"
                   onMouseEnter={() => setShowPricingMenu(true)}
                   onMouseLeave={() => setShowPricingMenu(false)}>
                <button className="text-sm text-nlg-light-gray hover:text-nlg-cyan transition-colors flex items-center gap-1">
                  Pricing
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showPricingMenu && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-nlg-charcoal/95 backdrop-blur-lg border border-nlg-teal/30 rounded-lg shadow-xl py-2">
                    <a href="#contact" className="block px-4 py-2.5 text-sm text-nlg-light-gray hover:text-nlg-cyan hover:bg-nlg-teal/10 transition-colors">
                      <div className="font-semibold">Starter Package</div>
                      <div className="text-xs text-nlg-light-gray/70">For small teams</div>
                    </a>
                    <a href="#contact" className="block px-4 py-2.5 text-sm text-nlg-light-gray hover:text-nlg-cyan hover:bg-nlg-teal/10 transition-colors">
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-xs text-nlg-light-gray/70">Custom solutions</div>
                    </a>
                    <a href="#contact" className="block px-4 py-2.5 text-sm text-nlg-light-gray hover:text-nlg-cyan hover:bg-nlg-teal/10 transition-colors">
                      <div className="font-semibold">Request Quote</div>
                      <div className="text-xs text-nlg-light-gray/70">Get custom pricing</div>
                    </a>
                  </div>
                )}
              </div>

              <a href="#about" className="text-sm text-nlg-light-gray hover:text-nlg-cyan transition-colors">About</a>
            </div>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 bg-nlg-hunter-green hover:bg-nlg-hunter-green/90 text-white text-sm font-semibold rounded-md transition-all shadow-lg shadow-nlg-hunter-green/30 hover:shadow-nlg-hunter-green/50"
          >
            Get Quote
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-nlg-cyan/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-nlg-teal/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-serif text-6xl md:text-8xl font-bold mb-8 leading-tight text-nlg-navy" style={{
              textShadow: '0 0 40px rgba(0, 212, 255, 0.3)'
            }}>
              Illuminating the Path to{" "}
              <span style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #00A8A8 50%, #355E3B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))'
              }}>
                Digital Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-nlg-light-gray mb-14 leading-relaxed max-w-3xl mx-auto">
              Expert solutions in Atlassian, Business Intelligence, and Cloud Migration.
              <br /><span className="text-nlg-cyan">Transform your business</span> with proven enterprise technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-nlg-cyan to-nlg-teal hover:from-nlg-cyan/90 hover:to-nlg-teal/90 text-nlg-navy font-bold rounded-lg transition-all text-lg shadow-2xl shadow-nlg-cyan/40 hover:shadow-nlg-cyan/60 hover:-translate-y-0.5"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="px-8 py-4 bg-transparent border-2 border-nlg-cyan hover:border-nlg-teal hover:bg-nlg-cyan/10 text-nlg-cyan hover:text-nlg-teal font-bold rounded-lg transition-all text-lg"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-28 bg-gradient-to-b from-nlg-deep-navy to-nlg-navy relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDIxMiwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-nlg-navy">Our Services</h2>
            <p className="text-xl text-nlg-light-gray max-w-3xl mx-auto">
              Comprehensive enterprise solutions designed to <span className="text-nlg-cyan font-semibold">accelerate</span> your digital transformation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Atlassian Solutions */}
            <div className="group p-10 rounded-2xl bg-gradient-to-br from-nlg-charcoal/40 to-nlg-charcoal/20 border-2 border-nlg-cyan/30 hover:border-nlg-cyan hover:shadow-2xl hover:shadow-nlg-cyan/30 transition-all duration-300">
              <div className="mb-8">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-nlg-cyan/20 to-nlg-cyan/10 border-2 border-nlg-cyan/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <svg className="w-8 h-8 text-nlg-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4 text-white">Atlassian Solutions</h3>
                <p className="text-nlg-light-gray mb-8 leading-relaxed text-base">
                  Streamline workflows and reduce chaos with expert Atlassian implementation and optimization
                </p>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-nlg-light-gray">
                  <span className="text-nlg-cyan text-lg font-bold">→</span>
                  <span>Jira Service Management</span>
                </li>
                <li className="flex items-center gap-3 text-nlg-light-gray">
                  <span className="text-nlg-cyan text-lg font-bold">→</span>
                  <span>Workflow Optimization</span>
                </li>
                <li className="flex items-center gap-3 text-nlg-light-gray">
                  <span className="text-nlg-cyan text-lg font-bold">→</span>
                  <span>Licensing & Support</span>
                </li>
              </ul>
            </div>

            {/* Business Intelligence */}
            <div className="group p-10 rounded-2xl bg-gradient-to-br from-nlg-charcoal/40 to-nlg-charcoal/20 border-2 border-nlg-teal/30 hover:border-nlg-teal hover:shadow-2xl hover:shadow-nlg-teal/30 transition-all duration-300">
              <div className="mb-8">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-nlg-teal/20 to-nlg-teal/10 border-2 border-nlg-teal/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <svg className="w-8 h-8 text-nlg-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4 text-white">Business Intelligence</h3>
                <p className="text-nlg-light-gray mb-8 leading-relaxed text-base">
                  Gain clarity and make data-driven decisions with powerful analytics and executive dashboards
                </p>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-nlg-light-gray">
                  <span className="text-nlg-teal text-lg font-bold">→</span>
                  <span>Power BI Dashboards</span>
                </li>
                <li className="flex items-center gap-3 text-nlg-light-gray">
                  <span className="text-nlg-teal text-lg font-bold">→</span>
                  <span>Data Warehousing</span>
                </li>
                <li className="flex items-center gap-3 text-nlg-light-gray">
                  <span className="text-nlg-teal text-lg font-bold">→</span>
                  <span>Executive Reporting</span>
                </li>
              </ul>
            </div>

            {/* Cloud Migration */}
            <div className="group p-10 rounded-2xl bg-gradient-to-br from-nlg-charcoal/40 to-nlg-charcoal/20 border-2 border-nlg-hunter-green/30 hover:border-nlg-hunter-green hover:shadow-2xl hover:shadow-nlg-hunter-green/30 transition-all duration-300">
              <div className="mb-8">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-nlg-hunter-green/20 to-nlg-hunter-green/10 border-2 border-nlg-hunter-green/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <svg className="w-8 h-8 text-nlg-hunter-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4 text-white">Cloud Migration</h3>
                <p className="text-nlg-light-gray mb-8 leading-relaxed text-base">
                  Achieve security and speed with seamless cloud migration to AWS and Azure platforms
                </p>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-nlg-light-gray">
                  <span className="text-nlg-hunter-green text-lg font-bold">→</span>
                  <span>AWS & Azure Migration</span>
                </li>
                <li className="flex items-center gap-3 text-nlg-light-gray">
                  <span className="text-nlg-hunter-green text-lg font-bold">→</span>
                  <span>Zero-Downtime Deployment</span>
                </li>
                <li className="flex items-center gap-3 text-nlg-light-gray">
                  <span className="text-nlg-hunter-green text-lg font-bold">→</span>
                  <span>Cost Optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 bg-nlg-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-12 text-center text-nlg-navy">Why Choose North Lantern Group</h2>

            <div className="grid md:grid-cols-3 gap-12 mt-16">
              <div className="text-center p-8 rounded-xl bg-nlg-charcoal/20 border border-nlg-cyan/20 hover:border-nlg-cyan/50 transition-all">
                <div className="text-nlg-cyan text-6xl font-bold mb-3 font-serif">95+</div>
                <div className="text-nlg-hunter-green text-sm font-semibold uppercase tracking-wider">Performance Score</div>
              </div>
              <div className="text-center p-8 rounded-xl bg-nlg-charcoal/20 border border-nlg-teal/20 hover:border-nlg-teal/50 transition-all">
                <div className="text-nlg-teal text-6xl font-bold mb-3 font-serif">24/7</div>
                <div className="text-nlg-hunter-green text-sm font-semibold uppercase tracking-wider">Support Available</div>
              </div>
              <div className="text-center p-8 rounded-xl bg-nlg-charcoal/20 border border-nlg-hunter-green/20 hover:border-nlg-hunter-green/50 transition-all">
                <div className="text-nlg-hunter-green text-6xl font-bold mb-3 font-serif">100%</div>
                <div className="text-nlg-hunter-green text-sm font-semibold uppercase tracking-wider">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 bg-gradient-to-b from-nlg-deep-navy to-nlg-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-nlg-navy">Get Started Today</h2>
              <p className="text-xl text-nlg-light-gray">
                Schedule a free consultation to discuss your <span className="text-nlg-cyan font-semibold">digital transformation</span> needs
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 rounded-2xl bg-nlg-charcoal/30 border-2 border-nlg-teal/30 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-3 text-nlg-light-gray">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-lg bg-nlg-deep-navy/70 border-2 border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-2 focus:ring-nlg-cyan/30 transition-all text-nlg-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold mb-3 text-nlg-light-gray">Company</label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-lg bg-nlg-deep-navy/70 border-2 border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-2 focus:ring-nlg-cyan/30 transition-all text-nlg-white"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold mb-3 text-nlg-light-gray">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-lg bg-nlg-deep-navy/70 border-2 border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-2 focus:ring-nlg-cyan/30 transition-all text-nlg-white"
                  placeholder="john@acme.com"
                />
              </div>

              <div className="mb-10">
                <label htmlFor="service" className="block text-sm font-semibold mb-3 text-nlg-light-gray">Service Interest</label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-lg bg-nlg-deep-navy/70 border-2 border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-2 focus:ring-nlg-cyan/30 transition-all text-nlg-white"
                >
                  <option value="atlassian">Atlassian Solutions</option>
                  <option value="bi">Business Intelligence</option>
                  <option value="cloud">Cloud Migration</option>
                  <option value="all">All Services</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 bg-gradient-to-r from-nlg-hunter-green to-nlg-hunter-green/90 hover:from-nlg-hunter-green/90 hover:to-nlg-hunter-green/80 text-white font-bold rounded-lg transition-all shadow-2xl shadow-nlg-hunter-green/40 hover:shadow-nlg-hunter-green/60 text-lg"
              >
                Request Free Consultation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nlg-deep-navy border-t-2 border-nlg-teal/20 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-nlg-cyan rounded-sm"></div>
                  <span className="font-serif text-xl font-bold text-nlg-cyan relative z-10">N</span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-nlg-white tracking-wide">NORTH LANTERN</span>
                  <span className="text-[9px] text-nlg-teal/80 tracking-[0.15em]">GROUP</span>
                </div>
              </div>
              <p className="text-sm text-nlg-light-gray leading-relaxed">
                Illuminating your path to digital excellence
              </p>
            </div>

            <div>
              <h3 className="font-serif font-bold text-nlg-white mb-5 text-lg">Services</h3>
              <ul className="space-y-3 text-sm text-nlg-light-gray">
                <li><a href="#services" className="hover:text-nlg-cyan transition-colors inline-block">Atlassian Solutions</a></li>
                <li><a href="#services" className="hover:text-nlg-cyan transition-colors inline-block">Business Intelligence</a></li>
                <li><a href="#services" className="hover:text-nlg-cyan transition-colors inline-block">Cloud Migration</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-bold text-nlg-white mb-5 text-lg">Company</h3>
              <ul className="space-y-3 text-sm text-nlg-light-gray">
                <li><a href="#about" className="hover:text-nlg-cyan transition-colors inline-block">About</a></li>
                <li><a href="#contact" className="hover:text-nlg-cyan transition-colors inline-block">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-bold text-nlg-white mb-5 text-lg">Contact</h3>
              <p className="text-sm text-nlg-light-gray">
                <a href="mailto:info@northlantern.com" className="hover:text-nlg-cyan transition-colors">
                  info@northlantern.com
                </a>
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-nlg-charcoal/30 text-center text-sm text-nlg-light-gray">
            <p>&copy; 2024 North Lantern Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
