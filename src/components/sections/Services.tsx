"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BarChart3, Bot, Cloud, Database, FileText, GitBranch, Layers, Link2, Settings2, ShieldCheck, Workflow } from "lucide-react";
import TiltCard from "@/components/motion/TiltCard";

interface ServicesProps {
  isDarkMode: boolean;
}

const lanes = [
  {
    icon: Layers,
    title: "Atlassian Systems",
    body: "Jira, Confluence, and JSM drift faster than most admin models can keep up with. We clean up the configuration, rebuild the projects and spaces that matter, migrate to Cloud when the estate is ready, and write the runbooks your internal admin will still understand in eighteen months.",
    capabilities: [
      { icon: Settings2, label: "Jira rebuild and admin governance" },
      { icon: FileText, label: "Confluence consolidation" },
      { icon: Workflow, label: "JSM triage and workflow design" },
      { icon: Cloud, label: "Data Center to Cloud transition" },
      { icon: ShieldCheck, label: "Marketplace app review" },
    ],
  },
  {
    icon: BarChart3,
    title: "BI and Operational Reporting",
    body: "Dashboards fail when the source systems disagree. We connect Atlassian data, finance data, support signals, and operational context into a reporting layer leadership can read without a side conversation to explain every chart.",
    capabilities: [
      { icon: BarChart3, label: "Power BI reporting" },
      { icon: Database, label: "Tableau modeling" },
      { icon: Database, label: "Atlassian Data Lake" },
      { icon: GitBranch, label: "Operational KPI mapping" },
      { icon: ShieldCheck, label: "Executive reporting governance" },
    ],
  },
  {
    icon: Link2,
    title: "Automation and Integration",
    body: "The layer between your systems is where manual work hides. We build cross-system integrations, AI-assisted internal tooling, operational automations, and internal apps that land with a clean " + "ownership model on day one.",
    capabilities: [
      { icon: Link2, label: "Atlassian to CRM and finance integration" },
      { icon: Bot, label: "AI-assisted internal tools" },
      { icon: Workflow, label: "Workflow automation (n8n, native, custom)" },
      { icon: Settings2, label: "Internal app builds" },
      { icon: ShieldCheck, label: "Automation lifecycle and governance" },
    ],
  },
];

function ServiceCard({ lane }: { lane: (typeof lanes)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const LaneIcon = lane.icon;

  return (
    <TiltCard
      maxTilt={3}
      className="h-full rounded-xl border border-white/10 bg-neutral-900 p-6 md:p-8 lg:p-10"
    >
      <div ref={ref} className="flex min-h-[520px] flex-col">
        <LaneIcon className="mb-4 h-8 w-8 text-cyan-400 md:h-10 md:w-10" strokeWidth={1.5} />
        <h3 className="mb-4 text-xl font-bold text-white md:text-2xl">{lane.title}</h3>
        <p className="mb-8 text-sm leading-relaxed text-neutral-400 md:text-base">
          {lane.body}
        </p>

        <div className="flex flex-col gap-2">
          {lane.capabilities.map((capability, index) => {
            const CapabilityIcon = capability.icon;
            return (
              <motion.div
                key={capability.label}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.4,
                  delay: reducedMotion ? 0 : index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-flex w-fit cursor-default items-center gap-2 rounded-full border border-white/10 bg-neutral-800 px-3 py-1.5 transition-colors duration-200 hover:bg-neutral-700"
              >
                <CapabilityIcon className="h-5 w-5 text-neutral-300" strokeWidth={1.5} />
                <span className="text-sm text-neutral-200">{capability.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </TiltCard>
  );
}

export default function Services({ isDarkMode }: ServicesProps) {
  return (
    <section id="services" className={`relative pt-8 pb-16 md:pb-28 ${isDarkMode ? "bg-black" : "bg-sky-100"}`}>
      <div className="reveal px-4 py-10 text-center md:py-16">
        <p className="mb-3 text-sm font-semibold tracking-wide text-cyan-400 md:text-base">
          What we do
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-5xl">
          Three lanes. One operating system.
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-neutral-400 md:mt-4 md:text-lg">
          We rebuild the tools your team already depends on, wire the reporting layer around them, and build the automations that remove the manual work hiding between systems.
        </p>
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="reveal-stagger grid gap-5 lg:grid-cols-3">
          {lanes.map((lane) => (
            <div key={lane.title}>
              <ServiceCard lane={lane} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
