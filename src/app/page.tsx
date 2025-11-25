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
    // Using mailto as per plan (Option A)
    const mailtoLink = `mailto:info@northlantern.com?subject=Inquiry from ${formData.name}&body=Name: ${formData.name}%0D%0ACompany: ${formData.company}%0D%0AEmail: ${formData.email}%0D%0AService Interest: ${formData.service}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-nlg-navy">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-nlg-navy/95 backdrop-blur-sm border-b border-nlg-charcoal/30">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nlg-cyan to-nlg-teal flex items-center justify-center">
                <span className="text-nlg-navy font-bold text-lg">NL</span>
              </div>
              <span className="text-xl font-semibold text-nlg-white">North Lantern Group</span>
            </div>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-nlg-cyan text-nlg-navy font-semibold rounded-lg hover:bg-nlg-cyan/90 transition-all hover:shadow-lg hover:shadow-nlg-cyan/50 hover:-translate-y-0.5"
            >
              Get an Audit
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-nlg-deep-navy/50 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nlg-cyan/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nlg-teal/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-nlg-white via-nlg-cyan to-nlg-white bg-clip-text text-transparent animate-gradient">
              Illuminating the Path to Digital Excellence
            </h1>
            <p className="text-xl md:text-2xl text-nlg-light-gray mb-12 max-w-3xl mx-auto">
              Transform your business with expert Atlassian solutions, cutting-edge Business Intelligence, and seamless Cloud Migration.
            </p>

            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="group p-6 rounded-xl bg-nlg-charcoal/30 border border-nlg-charcoal hover:border-nlg-cyan/50 transition-all hover:shadow-lg hover:shadow-nlg-cyan/20 hover:-translate-y-1">
                <div className="text-nlg-cyan text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Performance First</h3>
                <p className="text-nlg-light-gray text-sm">Lightning-fast solutions optimized for your workflow</p>
              </div>

              <div className="group p-6 rounded-xl bg-nlg-charcoal/30 border border-nlg-charcoal hover:border-nlg-teal/50 transition-all hover:shadow-lg hover:shadow-nlg-teal/20 hover:-translate-y-1">
                <div className="text-nlg-teal text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold mb-2">Data-Driven Insights</h3>
                <p className="text-nlg-light-gray text-sm">Make informed decisions with powerful analytics</p>
              </div>

              <div className="group p-6 rounded-xl bg-nlg-charcoal/30 border border-nlg-charcoal hover:border-nlg-emerald/50 transition-all hover:shadow-lg hover:shadow-nlg-emerald/20 hover:-translate-y-1">
                <div className="text-nlg-emerald text-3xl mb-3">🔒</div>
                <h3 className="text-lg font-semibold mb-2">Secure & Scalable</h3>
                <p className="text-nlg-light-gray text-sm">Enterprise-grade security with cloud flexibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-nlg-navy to-nlg-deep-navy">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Services</h2>
            <p className="text-nlg-light-gray text-lg">Comprehensive solutions for modern businesses</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Atlassian Solutions */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-nlg-charcoal/40 to-nlg-charcoal/20 border border-nlg-charcoal hover:border-nlg-cyan transition-all duration-300 hover:shadow-2xl hover:shadow-nlg-cyan/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nlg-cyan/10 rounded-bl-full blur-2xl group-hover:bg-nlg-cyan/20 transition-all"></div>

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-nlg-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-nlg-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4">Atlassian Solutions</h3>
                <p className="text-nlg-light-gray mb-6 leading-relaxed">
                  Reduce chaos and streamline your workflows with expert Atlassian implementation and optimization.
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-nlg-cyan mt-1">▹</span>
                    <span className="text-sm">Jira Service Management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-nlg-cyan mt-1">▹</span>
                    <span className="text-sm">Workflow Optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-nlg-cyan mt-1">▹</span>
                    <span className="text-sm">Licensing & Support</span>
                  </li>
                </ul>

                <a href="#contact" className="inline-flex items-center gap-2 text-nlg-cyan hover:gap-3 transition-all">
                  Learn More
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Business Intelligence */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-nlg-charcoal/40 to-nlg-charcoal/20 border border-nlg-charcoal hover:border-nlg-teal transition-all duration-300 hover:shadow-2xl hover:shadow-nlg-teal/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nlg-teal/10 rounded-bl-full blur-2xl group-hover:bg-nlg-teal/20 transition-all"></div>

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-nlg-teal/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-nlg-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4">Business Intelligence</h3>
                <p className="text-nlg-light-gray mb-6 leading-relaxed">
                  Gain clarity and make data-driven decisions with powerful analytics and executive dashboards.
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-nlg-teal mt-1">▹</span>
                    <span className="text-sm">Power BI Dashboards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-nlg-teal mt-1">▹</span>
                    <span className="text-sm">Data Warehousing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-nlg-teal mt-1">▹</span>
                    <span className="text-sm">Executive Reporting</span>
                  </li>
                </ul>

                <a href="#contact" className="inline-flex items-center gap-2 text-nlg-teal hover:gap-3 transition-all">
                  Learn More
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Cloud Migration */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-nlg-charcoal/40 to-nlg-charcoal/20 border border-nlg-charcoal hover:border-nlg-emerald transition-all duration-300 hover:shadow-2xl hover:shadow-nlg-emerald/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nlg-emerald/10 rounded-bl-full blur-2xl group-hover:bg-nlg-emerald/20 transition-all"></div>

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-nlg-emerald/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-nlg-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4">Cloud Migration</h3>
                <p className="text-nlg-light-gray mb-6 leading-relaxed">
                  Achieve security and speed with seamless cloud migration to AWS and Azure platforms.
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-nlg-emerald mt-1">▹</span>
                    <span className="text-sm">AWS & Azure Migration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-nlg-emerald mt-1">▹</span>
                    <span className="text-sm">Zero-Downtime Deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-nlg-emerald mt-1">▹</span>
                    <span className="text-sm">Cost Optimization</span>
                  </li>
                </ul>

                <a href="#contact" className="inline-flex items-center gap-2 text-nlg-emerald hover:gap-3 transition-all">
                  Learn More
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-nlg-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Start Your Journey</h2>
              <p className="text-nlg-light-gray text-lg">Get a free consultation and discover how we can transform your business</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-nlg-charcoal/40 to-nlg-charcoal/20 p-8 md:p-12 rounded-2xl border border-nlg-charcoal">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-nlg-deep-navy border border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-2 focus:ring-nlg-cyan/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-nlg-deep-navy border border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-2 focus:ring-nlg-cyan/20 transition-all"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-nlg-deep-navy border border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-2 focus:ring-nlg-cyan/20 transition-all"
                  placeholder="john@acme.com"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="service" className="block text-sm font-medium mb-2">Service Interest</label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-nlg-deep-navy border border-nlg-charcoal focus:border-nlg-cyan focus:outline-none focus:ring-2 focus:ring-nlg-cyan/20 transition-all"
                >
                  <option value="atlassian">Atlassian Solutions</option>
                  <option value="bi">Business Intelligence</option>
                  <option value="cloud">Cloud Migration</option>
                  <option value="all">All Services</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-nlg-cyan to-nlg-teal text-nlg-navy font-semibold rounded-lg hover:shadow-lg hover:shadow-nlg-cyan/50 transition-all hover:-translate-y-0.5 text-lg"
              >
                Request Free Audit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nlg-deep-navy border-t border-nlg-charcoal/30 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-nlg-light-gray">
            <p className="mb-2">&copy; 2024 North Lantern Group. All rights reserved.</p>
            <p className="text-sm text-nlg-charcoal">Illuminating the path to digital excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
