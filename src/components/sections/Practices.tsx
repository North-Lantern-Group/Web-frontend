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
    desc: "Reports leadership doesn't trust. Dashboards nobody opens. Three sources of truth for the same number. The real metric lives in someone's tab order. Definitions written after the chart. We rebuild the layer underneath the dashboard: semantic model, metric catalog, refresh SLAs, lineage, and row-level access, feeding Power BI, Tableau, or Atlassian Analytics on the Data Lake. Then we hand leadership a number they can quote without a caveat.",
    caps: [
      { k: "Model", v: "Semantic layer, entity definitions, metric grain" },
      { k: "Source", v: "Warehouse pipelines, Delta shares, data quality checks" },
      { k: "Govern", v: "Metric ownership, refresh SLAs, change control" },
      { k: "Publish", v: "Executive dashboards in Power BI, Tableau, or Atlassian Analytics" },
      { k: "Document", v: "Metric catalog and lineage the next analyst can read" },
    ],
    refusal:
      `Won't do: dashboards without a named owner, metrics defined after the chart, or BI "modernization" that's just a prettier version of the same broken model.`,
    cta: "How we rebuild reporting",
  },
  {
    id: "automation",
    icon: <IconWorkflow size={28} />,
    title: "Automation and Integration",
    desc: "The work hiding between your systems. CRM to billing. Ticket to invoice. Slack to Jira. Afternoon hours burned because two systems don't talk and nobody scoped the integration. Brittle webhooks, a script on someone's laptop, a Zap that silently stopped firing. We build cross-system integrations, operational automations, and AI-assisted internal tooling on n8n, native platforms, or custom code. Every rule ships with a named owner and a rollback path.",
    caps: [
      { k: "Integrate", v: "Cross-system APIs, webhooks, and event streams" },
      { k: "Automate", v: "Operational workflows with branching, retries, and human-in-the-loop" },
      { k: "Augment", v: "AI-assisted internal tooling, MCP servers, approval-gated agents" },
      { k: "Govern", v: "SSO, audit logs, rollback paths, and secret management" },
      { k: "Document", v: "Runbook for every workflow with a named owner" },
    ],
    refusal:
      `Won't do: automation rules without named owners, AI tooling that fires without an audit log, or "agentic" demos that never survive a production week.`,
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
