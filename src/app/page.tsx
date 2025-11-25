"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    service: "atlassian",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@northlantern.com?subject=Inquiry from ${formData.name}&body=Name: ${formData.name}%0D%0ACompany: ${formData.company}%0D%0AEmail: ${formData.email}%0D%0AService Interest: ${formData.service}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-nlg-navy">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-nlg-navy/80 backdrop-blur-lg border-b border-nlg-charcoal/20">
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-nlg-cyan to-nlg-teal flex items-center justify-center">
                <span className="text-nlg-navy font-bold text-sm">NL</span>
              </div>
              <span className="text-base font-semibold text-nlg-white">North Lantern Group</span>
            </a>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm text-nlg-light-gray hover:text-nlg-white transition-colors">Services</a>
              <a href="#about" className="text-sm text-nlg-light-gray hover:text-nlg-white transition-colors">About</a>
              <a href="#contact" className="text-sm text-nlg-light-gray hover:text-nlg-white transition-colors">Contact</a>
            </div>
          </div>

          <a
            href="#contact"
            className="px-4 py-2 bg-nlg-cyan hover:bg-nlg-cyan/90 text-nlg-navy text-sm font-medium rounded-md transition-all"
          >
            Get an Audit
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-nlg-cyan/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nlg-teal/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Illuminating the Path to{" "}
              <span className="bg-gradient-to-r from-nlg-cyan via-nlg-teal to-nlg-cyan bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-nlg-light-gray mb-12 leading-relaxed">
              Expert solutions in Atlassian, Business Intelligence, and Cloud Migration.
              <br />Transform your business with proven enterprise technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-nlg-cyan hover:bg-nlg-cyan/90 text-nlg-navy font-medium rounded-md transition-all text-base"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="px-6 py-3 bg-transparent border border-nlg-charcoal hover:border-nlg-cyan text-nlg-white font-medium rounded-md transition-all text-base"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-nlg-deep-navy to-nlg-navy">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-nlg-light-gray max-w-2xl mx-auto">
              Comprehensive enterprise solutions designed to accelerate your digital transformation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Atlassian Solutions */}
            <div className="group p-8 rounded-xl bg-nlg-charcoal/20 border border-nlg-charcoal/50 hover:border-nlg-cyan/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-nlg-cyan/10 border border-nlg-cyan/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-nlg-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Atlassian Solutions</h3>
                <p className="text-nlg-light-gray mb-6 leading-relaxed">
                  Streamline workflows and reduce chaos with expert Atlassian implementation and optimization
                </p>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-nlg-light-gray">
                  <span className="text-nlg-cyan">→</span>
                  Jira Service Management
                </li>
                <li className="flex items-center gap-2 text-nlg-light-gray">
                  <span className="text-nlg-cyan">→</span>
                  Workflow Optimization
                </li>
                <li className="flex items-center gap-2 text-nlg-light-gray">
                  <span className="text-nlg-cyan">→</span>
                  Licensing & Support
                </li>
              </ul>
            </div>

            {/* Business Intelligence */}
            <div className="group p-8 rounded-xl bg-nlg-charcoal/20 border border-nlg-charcoal/50 hover:border-nlg-teal/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-nlg-teal/10 border border-nlg-teal/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-nlg-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Business Intelligence</h3>
                <p className="text-nlg-light-gray mb-6 leading-relaxed">
                  Gain clarity and make data-driven decisions with powerful analytics and executive dashboards
                </p>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-nlg-light-gray">
                  <span className="text-nlg-teal">→</span>
                  Power BI Dashboards
                </li>
                <li className="flex items-center gap-2 text-nlg-light-gray">
                  <span className="text-nlg-teal">→</span>
                  Data Warehousing
                </li>
                <li className="flex items-center gap-2 text-nlg-light-gray">
                  <span className="text-nlg-teal">→</span>
                  Executive Reporting
                </li>
              </ul>
            </div>

            {/* Cloud Migration */}
            <div className="group p-8 rounded-xl bg-nlg-charcoal/20 border border-nlg-charcoal/50 hover:border-nlg-hunter-green/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-nlg-hunter-green/10 border border-nlg-hunter-green/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-nlg-hunter-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Cloud Migration</h3>
                <p className="text-nlg-light-gray mb-6 leading-relaxed">
                  Achieve security and speed with seamless cloud migration to AWS and Azure platforms
                </p>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-nlg-light-gray">
                  <span className="text-nlg-hunter-green">→</span>
                  AWS & Azure Migration
                </li>
                <li className="flex items-center gap-2 text-nlg-light-gray">
                  <span className="text-nlg-hunter-green">→</span>
                  Zero-Downtime Deployment
                </li>
                <li className="flex items-center gap-2 text-nlg-light-gray">
                  <span className="text-nlg-hunter-green">→</span>
                  Cost Optimization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-nlg-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Why Choose North Lantern Group</h2>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-nlg-cyan text-4xl font-bold mb-2">95+</div>
                <div className="text-nlg-light-gray text-sm">Performance Score</div>
              </div>
              <div className="text-center">
                <div className="text-nlg-teal text-4xl font-bold mb-2">24/7</div>
                <div className="text-nlg-light-gray text-sm">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-nlg-hunter-green text-4xl font-bold mb-2">100%</div>
                <div className="text-nlg-light-gray text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-nlg-deep-navy to-nlg-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started Today</h2>
              <p className="text-lg text-nlg-light-gray">
                Schedule a free consultation to discuss your digital transformation needs
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-nlg-charcoal/20 border border-nlg-charcoal/50">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-nlg-light-gray">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-md bg-nlg-deep-navy/50 border border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-1 focus:ring-nlg-cyan/50 transition-all text-nlg-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-nlg-light-gray">Company</label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-md bg-nlg-deep-navy/50 border border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-1 focus:ring-nlg-cyan/50 transition-all text-nlg-white"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-nlg-light-gray">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md bg-nlg-deep-navy/50 border border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-1 focus:ring-nlg-cyan/50 transition-all text-nlg-white"
                  placeholder="john@acme.com"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="service" className="block text-sm font-medium mb-2 text-nlg-light-gray">Service Interest</label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md bg-nlg-deep-navy/50 border border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-1 focus:ring-nlg-cyan/50 transition-all text-nlg-white"
                >
                  <option value="atlassian">Atlassian Solutions</option>
                  <option value="bi">Business Intelligence</option>
                  <option value="cloud">Cloud Migration</option>
                  <option value="all">All Services</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-nlg-cyan hover:bg-nlg-cyan/90 text-nlg-navy font-medium rounded-md transition-all"
              >
                Request Free Consultation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nlg-deep-navy border-t border-nlg-charcoal/30 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-nlg-cyan to-nlg-teal flex items-center justify-center">
                  <span className="text-nlg-navy font-bold text-sm">NL</span>
                </div>
                <span className="font-semibold text-nlg-white">North Lantern Group</span>
              </div>
              <p className="text-sm text-nlg-light-gray">
                Illuminating your path to digital excellence
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-nlg-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-nlg-light-gray">
                <li><a href="#services" className="hover:text-nlg-cyan transition-colors">Atlassian Solutions</a></li>
                <li><a href="#services" className="hover:text-nlg-cyan transition-colors">Business Intelligence</a></li>
                <li><a href="#services" className="hover:text-nlg-cyan transition-colors">Cloud Migration</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-nlg-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-nlg-light-gray">
                <li><a href="#about" className="hover:text-nlg-cyan transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-nlg-cyan transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-nlg-white mb-4">Contact</h3>
              <p className="text-sm text-nlg-light-gray">
                info@northlantern.com
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
