"use client";

import { useState, useEffect, useRef } from "react";
import Xarrow from "react-xarrows";
import { Layers, Cloud, BarChart3, RefreshCw, Shield, Zap, Users, Database, FileText } from "lucide-react";

interface ServicesProps {
  isDarkMode: boolean;
}

export default function Services({ isDarkMode }: ServicesProps) {
  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setServicesVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
      /* Services Section */
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
  );
}
