import { IconArrow } from "@/components/icons/PracticeIcons";

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

export default function HowWeWork() {
  return (
    <section className="nlg-section" id="how-we-work" style={{ paddingTop: 40 }}>
      <div className="nlg-wrap">
        <div className="nlg-section-head nlg-reveal">
          <div className="nlg-eyebrow-col">
            <div className="nlg-eyebrow-muted">03 / Process</div>
          </div>
          <div>
            <h2>How engagements run.</h2>
            <p className="nlg-sub">
              Three phases. One team across all three. No delivery pod you meet in week two.
            </p>
          </div>
        </div>

        <div className="nlg-steps">
          {STEPS.map((s, i) => (
            <div
              className="nlg-step nlg-reveal"
              key={s.title}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="nlg-step-num">{s.n}</div>
              <h3 className="nlg-step-title">{s.title}</h3>
              <p className="nlg-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="nlg-delivery-commitment">
          The operators who scope the work are the ones who build and hand it back. No split pitch-and-delivery team.
        </p>

        <div className="nlg-steps-link">
          <a className="nlg-text-link" href="#cta">
            Full engagement model <IconArrow size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
