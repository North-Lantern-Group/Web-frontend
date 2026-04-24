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
    desc: "Atlassian that drifted. Jira instances that grew without rules. Confluence spaces nobody searches. JSM queues with inconsistent SLAs. Admin left, runbooks didn't. We rebuild the structure across the Atlassian stack: Jira, Confluence, JSM, and the governance, identity, discovery, and AI layers Atlassian has built on top. Then we hand back a system your team actually understands.",
    caps: [
      { k: "Rebuild", v: "Project, schema, and permission refactor" },
      { k: "Install", v: "JSM queues, SLAs, escalation rules" },
      { k: "Extend", v: "Guard, Rovo, JPD, Compass where they fit" },
      { k: "Migrate", v: "Data Center to Cloud, or instance consolidation" },
      { k: "Document", v: "Admin runbook for the next owner" },
    ],
    refusal:
      `Won't do: junior-staffed admin work, migrations we cannot make stick, or "health checks" that turn out to be sales calls.`,
    cta: "How we rebuild Atlassian",
  },
  {
    id: "bi",
    icon: <IconChart size={28} />,
    title: "BI and Analytics",
    desc: "Reporting leadership can't fully believe. Dashboards nobody opens. Three sources of truth for the same number. The real metric lives in someone's tab order. We model the data, define the metrics before anyone renders a chart, and ship a reporting layer leadership can read without a caveat, in Power BI, Tableau, or the Atlassian Data Lake.",
    caps: [
      { k: "Model", v: "Semantic layer, metric definitions, refresh ownership" },
      { k: "Pipe", v: "Source system integration and data quality" },
      { k: "Ship", v: "Executive view in Power BI, Tableau, or Atlassian Data Lake" },
      { k: "Govern", v: "Metric ownership, refresh cadence, change control" },
    ],
    refusal:
      "Won't do: dashboards without a named owner, metrics defined after the chart, or BI rebuilds that skip the data layer underneath.",
    cta: "How we wire reporting",
  },
  {
    id: "automation",
    icon: <IconWorkflow size={28} />,
    title: "Automation and Integration",
    desc: "The work hiding between your systems. CRM to billing. Ticket to invoice. Slack to Jira. Afternoon work that fills up because two systems don't talk and nobody scoped the integration. We build cross-system integrations, operational automations, and AI-assisted internal tooling that land with a named owner on day one.",
    caps: [
      { k: "Wire", v: "Cross-system integrations and webhooks" },
      { k: "Build", v: "Operational internal tooling, n8n, native, or custom" },
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
              We rebuild Atlassian estates, reporting layers, and the automations between them. Every engagement ships with the named owner who runs it after we leave.
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
            Adoption is a delivery principle, not a fourth practice. Every engagement lists the named owner on the client side, the runbook they will inherit, and the operating review they will run without us.
          </p>
        </div>
      </div>
    </section>
  );
}
