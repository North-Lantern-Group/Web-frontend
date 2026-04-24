/* Page sections */

const { useState: useStateS, useEffect: useEffectS } = React;

/* ───────── Nav ───────── */
function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="nav-brand" href="#top">
          <img src="assets/logo-icon.svg" alt=""/>
          <span>North Lantern</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#practices">Practices</a>
          <a href="#how-we-work">How we work</a>
          <a href="#writing">Writing</a>
          <a href="#about">About</a>
        </nav>
        <div className="nav-right">
          <a className="btn btn-ghost" href="mailto:hello@northlanterngroup.com">Contact</a>
          <a className="btn btn-primary" href="#cta">Book a call</a>
        </div>
      </div>
    </header>
  );
}

/* ───────── Hero ───────── */
const H1_VARIANTS = [
  {
    key: "A",
    lines: (
      <>The <span className="accent">senior team</span> your Atlassian, BI, and automation work deserves.</>
    ),
  },
  {
    key: "B",
    lines: (
      <>We inherit the Atlassian instances <span className="accent">that went wrong.</span></>
    ),
  },
  {
    key: "C",
    lines: (
      <>Senior operators. No pass-downs. <span className="accent">Work that sticks.</span></>
    ),
  },
];

function Hero({ heroMode, variantKey, onVariantChange }) {
  const variant = H1_VARIANTS.find(v => v.key === variantKey) || H1_VARIANTS[0];
  return (
    <section className={`hero ${heroMode === 'fallback' ? 'fallback' : ''}`} id="top">
      <div className="wrap hero-grid">
        <div className="hero-left">
          <div className="hero-eyebrow eyebrow">Results that endure.</div>

          <div className="h1-switcher">
            <h1 className="h1-variant">{variant.lines}</h1>
          </div>

          <p className="hero-sub">
            Senior operators for Atlassian, BI, and operational automation. Same team from first call to handover.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#cta">
              Book a call <IconArrow size={16}/>
            </a>
            <a className="btn btn-secondary btn-lg" href="#how-we-work">How we work</a>
          </div>

          <div className="variant-picker" role="group" aria-label="Headline variant">
            <span className="variant-picker-label">H1 variant</span>
            {H1_VARIANTS.map(v => (
              <button key={v.key}
                      className={`variant-btn ${variantKey === v.key ? 'active' : ''}`}
                      onClick={() => onVariantChange(v.key)}
                      aria-pressed={variantKey === v.key}>
                {v.key}
              </button>
            ))}
          </div>
        </div>

        {heroMode === 'console' && <OperationsConsole/>}
      </div>
    </section>
  );
}

/* ───────── Trust strip ───────── */
function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="How we operate">
      <div className="wrap trust-strip-in">
        <div className="trust-item">Senior operators. No junior handoffs.</div>
        <div className="trust-item">Same team, scope to handover.</div>
        <div className="trust-item">Work that sticks after handover.</div>
      </div>
    </section>
  );
}

/* ───────── Section 3: Belief ───────── */
function Belief() {
  return (
    <section className="section belief-section" id="belief">
      <div className="wrap belief reveal">
        <div className="eyebrow-col">
          <div className="eyebrow-muted">01 / Belief</div>
        </div>
        <div className="belief-body">
          <h2 className="belief-headline">
            <span>Your systems aren't broken.</span>
            <span>They're being tolerated.</span>
          </h2>
          <p className="belief-p muted">
            The dashboard loads. The workflow runs. The automation fires. And still, someone exports the data to Excel, pings the one person who knows the real process, and sends leadership a number with a caveat.
          </p>
          <p className="belief-p">
            North Lantern Group rebuilds the operational systems your team has learned to work around: Atlassian, reporting, workflows, automations, integrations, and the governance underneath. We stay until your team can run them without us.
          </p>
          <p className="belief-p belief-close">
            No decks masquerading as delivery. No staff augmentation dressed up as expertise. No juniors shipping what seniors sold.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────── Section 4: Practices ───────── */
const PRACTICES = [
  {
    id: "atlassian",
    icon: "layers",
    title: "Atlassian Platform",
    desc: "Your Jira instance grew without rules. Your admin left. Your automation fires twice. We rebuild the structure and hand back a system your team actually understands.",
    caps: [
      { k: "Rebuild", v: "Project, schema, and permission refactor" },
      { k: "Install", v: "JSM queue, SLAs, escalation rules" },
      { k: "Document", v: "Admin runbook for the next owner" },
    ],
    refusal: "Won't do: junior-staffed admin work, migrations we cannot make stick, or 'Atlassian health checks' that turn out to be sales calls.",
  },
  {
    id: "bi",
    icon: "chart",
    title: "BI and Analytics",
    desc: "Dashboards nobody opens. Reports leadership does not trust. We wire the reporting layer onto systems that agree with each other, and we define the metrics before we render the chart.",
    caps: [
      { k: "Model", v: "Revenue and delivery semantic layer" },
      { k: "Ship", v: "Power BI or Tableau executive view" },
      { k: "Govern", v: "Metric definitions and refresh owner" },
    ],
    refusal: "Won't do: dashboards nobody opens twice, or metric definitions without a named owner.",
  },
  {
    id: "automation",
    icon: "workflow",
    title: "Automation and Integration",
    desc: "The layer between your systems is where manual work hides. We build cross-system integrations, AI-assisted internal tooling, and operational automations that land with defined ownership from day one.",
    caps: [
      { k: "Wire", v: "Cross-system integrations and webhooks" },
      { k: "Build", v: "Operational internal tooling" },
      { k: "Assign", v: "Named owner for every automation rule" },
    ],
    refusal: "Won't do: automation rules without named owners, or AI tooling that fires without an audit log.",
  },
];

function PracticeIcon({ kind }) {
  if (kind === "layers")   return <IconLayers   size={28}/>;
  if (kind === "chart")    return <IconChart    size={28}/>;
  if (kind === "workflow") return <IconWorkflow size={28}/>;
  return null;
}

function Practices() {
  return (
    <section className="section" id="practices" style={{paddingTop: 40}}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow-col"><div className="eyebrow-muted">02 / Practices</div></div>
          <div>
            <h2>Three practices. One delivery standard.</h2>
            <p className="sub">
              We take on instances, warehouses, and integration layers that have drifted.
              Every engagement ships with adoption: the people who own the work after we leave.
            </p>
          </div>
        </div>

        <div className="practices">
          {PRACTICES.map((p, i) => {
            const nums = ["NO. 01", "NO. 02", "NO. 03"];
            const ctas = ["How we rebuild Atlassian", "How we wire reporting", "How we ship automations"];
            return (
              <article className="practice-card reveal" key={p.id} style={{transitionDelay: `${i * 60}ms`}}>
                <span className="practice-num" aria-hidden="true">{nums[i]}</span>
                <div className="practice-icon"><PracticeIcon kind={p.icon}/></div>
                <h3 className="practice-title">{p.title}</h3>
                <p className="practice-desc">{p.desc}</p>
                <ul className="practice-caps">
                  {p.caps.map((c, idx) => (
                    <li key={idx}>
                      <span className="k">{c.k}</span>
                      <span>{c.v}</span>
                    </li>
                  ))}
                </ul>
                <div className="practice-constraint">
                  <div className="constraint-eyebrow">CONSTRAINT</div>
                  <p className="practice-refusal">{p.refusal}</p>
                </div>
                <a className="practice-link" href={`#${p.id}`}>
                  {ctas[i]} <IconArrow size={14}/>
                </a>
              </article>
            );
          })}
        </div>

        <div className="adoption-note reveal">
          <div className="tag">Adoption</div>
          <p className="txt">
            Adoption is a delivery principle, not a fourth practice.
            Every engagement lists the named owner on the client side, the runbook they will inherit, and the operating review they will run without us by the closing week.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────── Section 5: How we work ───────── */
const STEPS = [
  {
    n: "01 / Scope",
    title: "Scope",
    desc: "You get a written plan naming the broken system, the owner after handover, and the weeks it will take. The senior operators who will do the build sit on the scoping call.",
  },
  {
    n: "02 / Build",
    title: "Build",
    desc: "You get working systems shipped in-instance, not slideware. The people who scoped it do the configuration, the data modelling, and the automation wiring themselves.",
  },
  {
    n: "03 / Hand back",
    title: "Hand back",
    desc: "You get a runbook, a named internal owner, and a review cadence your team runs without us. The same operators stay through the first two review cycles before leaving.",
  },
];

function HowWeWork() {
  return (
    <section className="section" id="how-we-work" style={{paddingTop: 40}}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow-col"><div className="eyebrow-muted">03 / Process</div></div>
          <div>
            <h2>How engagements run.</h2>
            <p className="sub">
              Three phases. One team across all three. No delivery pod you meet in week two.
            </p>
          </div>
        </div>

        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="step reveal" key={s.title} style={{transitionDelay: `${i * 80}ms`}}>
              <div className="step-num">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="delivery-commitment">The operators who scope the work are the ones who build and hand it back. No split pitch-and-delivery team.</p>

        <div className="steps-link">
          <a className="text-link" href="/how-we-work">
            Full engagement model <IconArrow size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────── Section 6: Writing ───────── */
const ESSAYS = [
  {
    date: "Coming 2026",
    read: "6 min read",
    title: "The Jira instance that ate itself, and the two rules that stopped it.",
    teaser: "Project sprawl is rarely a Jira problem. It is a permission problem nobody was paid to own.",
  },
  {
    date: "Coming 2026",
    read: "8 min read",
    title: "One metric layer, four source systems, zero arguments in the executive review.",
    teaser: "Dashboards do not fail on the rendering step. They fail three systems upstream, where definitions drift.",
  },
  {
    date: "Coming 2026",
    read: "5 min read",
    title: "Why the automation you shipped last year is the manual work of this year.",
    teaser: "Automations without named owners are technical debt with a cron schedule.",
  },
];

function Writing() {
  return (
    <section className="section" id="writing" style={{paddingTop: 40}}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow-col"><div className="eyebrow-muted">04 / Writing</div></div>
          <div>
            <h2>Writing.</h2>
            <p className="sub">Long pieces on what we see, one argument each.</p>
          </div>
        </div>

        <div className="essays">
          {ESSAYS.map((e, i) => (
            <article className="essay-card reveal" key={i} style={{transitionDelay: `${i * 80}ms`}}>
              <div className="essay-meta">
                <span>{e.date}</span>
                <span className="dot" aria-hidden="true"></span>
                <span>{e.read}</span>
              </div>
              <h3 className="essay-title">{e.title}</h3>
              <p className="essay-teaser">{e.teaser}</p>
              <div className="essay-footer">
                <span>ESSAY.0{i + 1}</span>
                <span aria-hidden="true">· draft</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Buyer qualifier ( above CTA ) ───────── */
function BuyerQualifier() {
  return (
    <section className="buyer-qualifier" aria-label="Who we work with">
      <div className="wrap">
        <p className="bq-text">
          We work with teams of 5 to 500 that actually want the thing fixed. If you're looking for transformation theatre, 27 discovery workshops, a partner who says “synergies” like it's a medical condition, and slide decks heavier than your laptop, we're probably not the right fit for you. But we hear Deloitte is accepting meetings. Tell them we said hi. We'll be here when you want the system built.
        </p>
      </div>
    </section>
  );
}

/* ───────── Section 7: CTA ───────── */
function ClosingCTA() {
  return (
    <section className="cta" id="cta">
      <div className="wrap">
        <h2 className="cta-text reveal">
          Tell us what is broken, or what you are planning.
          <span className="dim">We reply within one business day, with a short note. Not a 47-slide proposal deck.</span>
        </h2>
        <div className="cta-actions reveal">
          <a className="btn btn-primary btn-lg" href="#contact" data-note="cal.com-pending">
            <IconCalendar size={16}/> Book a call
          </a>
          <a className="text-link" href="mailto:hello@northlanterngroup.com">
            <IconMail size={14}/> Email us directly <IconArrow size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────── Section 8: Footer ───────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src="assets/logo-icon.svg" alt=""/>
              <span>North Lantern Group</span>
            </div>
            <p className="footer-tag">
              Senior-led consulting. Atlassian, BI, and automation work that sticks after we leave.
            </p>
          </div>
          <div className="footer-col">
            <h4>Practices</h4>
            <ul>
              <li><a href="#atlassian">Atlassian Platform</a></li>
              <li><a href="#bi">BI and Analytics</a></li>
              <li><a href="#automation">Automation and Integration</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Firm</h4>
            <ul>
              <li><a href="#how-we-work">How we work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="mailto:hello@northlanterngroup.com">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Writing</h4>
            <ul>
              <li><span className="placeholder">Index pending first essay</span></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>North Lantern Group Inc. · Ontario, Canada · <a href="#privacy">Privacy</a> · © 2026</span>
          <span>hello@northlanterngroup.com</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, TrustStrip, Belief, Practices, HowWeWork, Writing, BuyerQualifier, ClosingCTA, Footer });
