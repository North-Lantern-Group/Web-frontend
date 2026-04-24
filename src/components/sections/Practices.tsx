import type { ReactNode } from "react";
import {
  IconArrow,
  IconChart,
  IconLayers,
  IconWorkflow,
} from "@/components/icons/PracticeIcons";

type Practice = {
  id: string;
  icon: ReactNode;
  title: string;
  desc: string;
  caps: Array<{ k: string; v: string }>;
  refusal: string;
  cta: string;
};

const PRACTICES: Practice[] = [
  {
    id: "atlassian",
    icon: <IconLayers size={28} />,
    title: "Atlassian Platform",
    desc: "Your Jira instance grew without rules. Your admin left. Your automation fires twice. We rebuild the structure and hand back a system your team actually understands.",
    caps: [
      { k: "Rebuild", v: "Project, schema, and permission refactor" },
      { k: "Install", v: "JSM queue, SLAs, escalation rules" },
      { k: "Document", v: "Admin runbook for the next owner" },
    ],
    refusal:
      "Won't do: junior-staffed admin work, migrations we cannot make stick, or 'Atlassian health checks' that turn out to be sales calls.",
    cta: "How we rebuild Atlassian",
  },
  {
    id: "bi",
    icon: <IconChart size={28} />,
    title: "BI and Analytics",
    desc: "Dashboards nobody opens. Reports leadership does not trust. We wire the reporting layer onto systems that agree with each other, and we define the metrics before we render the chart.",
    caps: [
      { k: "Model", v: "Revenue and delivery semantic layer" },
      { k: "Ship", v: "Power BI or Tableau executive view" },
      { k: "Govern", v: "Metric definitions and refresh owner" },
    ],
    refusal:
      "Won't do: dashboards nobody opens twice, or metric definitions without a named owner.",
    cta: "How we wire reporting",
  },
  {
    id: "automation",
    icon: <IconWorkflow size={28} />,
    title: "Automation and Integration",
    desc: "The layer between your systems is where manual work hides. We build cross-system integrations, AI-assisted internal tooling, and operational automations that land with defined ownership from day one.",
    caps: [
      { k: "Wire", v: "Cross-system integrations and webhooks" },
      { k: "Build", v: "Operational internal tooling" },
      { k: "Assign", v: "Named owner for every automation rule" },
    ],
    refusal:
      "Won't do: automation rules without named owners, or AI tooling that fires without an audit log.",
    cta: "How we ship automations",
  },
];

export default function Practices() {
  return (
    <section className="nlg-section" id="practices" style={{ paddingTop: 40 }}>
      <div className="nlg-wrap">
        <div className="nlg-section-head nlg-reveal">
          <div className="nlg-eyebrow-col">
            <div className="nlg-eyebrow-muted">02 / Practices</div>
          </div>
          <div>
            <h2>Three practices. One delivery standard.</h2>
            <p className="nlg-sub">
              We take on instances, warehouses, and integration layers that have drifted. Every engagement ships with adoption: the people who own the work after we leave.
            </p>
          </div>
        </div>

        <div className="nlg-practices">
          {PRACTICES.map((p, i) => {
            const num = `NO. 0${i + 1}`;
            return (
              <article
                className="nlg-practice-card nlg-reveal"
                key={p.id}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="nlg-practice-num" aria-hidden="true">
                  {num}
                </span>
                <div className="nlg-practice-icon">{p.icon}</div>
                <h3 className="nlg-practice-title">{p.title}</h3>
                <p className="nlg-practice-desc">{p.desc}</p>
                <ul className="nlg-practice-caps">
                  {p.caps.map((c) => (
                    <li key={c.k}>
                      <span className="nlg-k">{c.k}</span>
                      <span>{c.v}</span>
                    </li>
                  ))}
                </ul>
                <div className="nlg-practice-constraint">
                  <div className="nlg-constraint-eyebrow">CONSTRAINT</div>
                  <p className="nlg-practice-refusal">{p.refusal}</p>
                </div>
                <a className="nlg-practice-link" href={`#${p.id}`}>
                  {p.cta} <IconArrow size={14} />
                </a>
              </article>
            );
          })}
        </div>

        <div className="nlg-adoption-note nlg-reveal">
          <div className="nlg-tag">Adoption</div>
          <p className="nlg-txt">
            Adoption is a delivery principle, not a fourth practice. Every engagement lists the named owner on the client side, the runbook they will inherit, and the operating review they will run without us by the closing week.
          </p>
        </div>
      </div>
    </section>
  );
}
