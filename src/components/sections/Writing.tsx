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

export default function Writing() {
  return (
    <section className="nlg-section" id="writing" style={{ paddingTop: 40 }}>
      <div className="nlg-wrap">
        <div className="nlg-section-head nlg-reveal">
          <div className="nlg-eyebrow-col">
            <div className="nlg-eyebrow-muted">04 / Writing</div>
          </div>
          <div>
            <h2>Writing.</h2>
            <p className="nlg-sub">Long pieces on what we see, one argument each.</p>
          </div>
        </div>

        <div className="nlg-essays">
          {ESSAYS.map((e, i) => (
            <article
              className="nlg-essay-card nlg-reveal"
              key={e.title}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="nlg-essay-meta">
                <span>{e.date}</span>
                <span className="nlg-dot" aria-hidden="true"></span>
                <span>{e.read}</span>
              </div>
              <h3 className="nlg-essay-title">{e.title}</h3>
              <p className="nlg-essay-teaser">{e.teaser}</p>
              <div className="nlg-essay-footer">
                <span>ESSAY.0{i + 1}</span>
                <span aria-hidden="true">· in progress</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
