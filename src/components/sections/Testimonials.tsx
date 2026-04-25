type Testimonial = {
  quote: string;
  name: string;
  role: string;
  work: string;
  result: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The North Lantern Group team rebuilt our Jira Service Management instance from the ground up after we had inherited eight years of accumulated customizations from a previous provider. What I appreciated most was their discipline around scope. Six months later, our service desk handles roughly forty percent more tickets per quarter with the same team size, and our agents actually want to use the system.",
    name: "Theresa Halloran",
    role: "Director of IT Operations",
    work: "JSM rebuild",
    result: "40 percent more ticket capacity",
  },
  {
    quote:
      "We hired North Lantern Group to consolidate three Confluence instances into one and did not expect them to engage as deeply with our content strategy as they did. The migration ran smoothly, but the lasting value came from the structure they helped us put in place. Our internal documentation is now something our team genuinely uses.",
    name: "Marcus Weatherall",
    role: "COO",
    work: "Confluence consolidation",
    result: "One usable knowledge base",
  },
  {
    quote:
      "North Lantern Group has been our partner on Atlassian governance for the past year. We came to them with access controls that had drifted across multiple client tenants. They delivered a permission architecture that closed the gaps and a runbook our internal admins can maintain without external help. The engagement lead stayed close to the work throughout.",
    name: "Stefan Krzeminski",
    role: "VP Technology Operations",
    work: "Atlassian governance",
    result: "Maintainable permissions",
  },
  {
    quote:
      "I have worked with several Atlassian solution providers over the course of my career, and North Lantern Group is the one I would recommend most often to peers. Their approach is research first, then propose. The eventual rebuild reflected our operational reality rather than a generic best-practice template. Our resolution times improved three times over.",
    name: "Rachel Forsythe-Tan",
    role: "Director of Customer Operations",
    work: "Service desk redesign",
    result: "3x faster resolution",
  },
  {
    quote:
      "We engaged North Lantern Group to design and build reporting capabilities across our operations. They approached the work as a true business intelligence engagement rather than a dashboard delivery. The dashboards are excellent, but the semantic layer and metric foundation underneath are what make the engagement stand out.",
    name: "Andre Boucher",
    role: "CFO",
    work: "BI foundation",
    result: "One metric layer",
  },
  {
    quote:
      "Our company runs lean, and engaging an outside firm was not a decision we took lightly. North Lantern Group scoped tightly, delivered on schedule, and priced fairly. When we asked for additions to scope, the engagement lead was clear about the tradeoffs and helped us decide rather than just selling us more work.",
    name: "Mateo Aldridge",
    role: "President",
    work: "Operational advisory",
    result: "Scoped with judgment",
  },
  {
    quote:
      "North Lantern Group delivered our automation and integration project on time and substantially exceeded our expectations on quality. Communication was excellent from initial scoping through deployment and handover. Six months in, the system is running reliably and our internal team is trained to extend it.",
    name: "Steve Whitcombe",
    role: "IT Director",
    work: "Automation and integration",
    result: "Reliable six months in",
  },
  {
    quote:
      "We are a regulated business and our last consulting engagement with a different firm ended badly because governance and documentation gaps surfaced during an audit. North Lantern Group earned our trust quickly with a direct approach. Their delivery process is documented, their handover materials are thorough, and their work passed our internal compliance review without comment.",
    name: "Janelle Kowalczyk-Reid",
    role: "Head of Operations",
    work: "Governed delivery",
    result: "Passed compliance review",
  },
  {
    quote:
      "We engaged North Lantern Group on what we thought was a straightforward Jira cleanup. The work expanded into a broader operational improvement initiative as they uncovered structural issues with our workflows. They scoped the additional work transparently, delivered it within budget, and the cumulative impact has been significant.",
    name: "Petra O'Brien",
    role: "VP Engineering",
    work: "Workflow rebuild",
    result: "Less operational friction",
  },
  {
    quote:
      "North Lantern Group is now our primary consulting partner for everything Atlassian. Over the past year they supported us through three separate engagements: a JSM redesign, a governance audit, and a reporting build. What sets them apart is that they care about the long-term health of what they build, not just the deliverable in front of them.",
    name: "Kwame Ofori-Davies",
    role: "Senior Director of Engineering Systems",
    work: "Multi-engagement partnership",
    result: "Stronger internal capability",
  },
  {
    quote:
      "When we set out to modernize our reporting, we evaluated four firms and selected North Lantern Group based on the quality of their initial proposal. They had clearly read our materials, understood our specific challenges, and proposed a phased approach that matched our internal change capacity rather than overloading us.",
    name: "Adaeze Okoye",
    role: "Chief Information Officer",
    work: "Reporting modernization",
    result: "Phased change capacity",
  },
];

function pickTestimonials(...indexes: number[]): Testimonial[] {
  return indexes
    .map((index) => TESTIMONIALS[index])
    .filter((testimonial): testimonial is Testimonial => testimonial !== undefined);
}

const TESTIMONIAL_ROWS = [
  {
    label: "Atlassian systems",
    direction: "left",
    items: pickTestimonials(0, 2, 3, 9),
  },
  {
    label: "Reporting and knowledge",
    direction: "right",
    items: pickTestimonials(1, 4, 7, 10),
  },
  {
    label: "Automation and operating rhythm",
    direction: "left",
    items: pickTestimonials(5, 6, 8),
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="nlg-testimonial-card">
      <div className="nlg-testimonial-card-top">
        <span className="nlg-testimonial-work">{testimonial.work}</span>
        <span className="nlg-testimonial-signal" aria-hidden="true"></span>
      </div>
      <blockquote>
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption>
        <span className="nlg-testimonial-name">{testimonial.name}</span>
        <span className="nlg-testimonial-role">{testimonial.role}</span>
      </figcaption>
      <div className="nlg-testimonial-result">{testimonial.result}</div>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="nlg-section nlg-testimonials" id="work" aria-labelledby="testimonials-heading">
      <div className="nlg-wrap">
        <div className="nlg-section-head nlg-testimonials-head nlg-reveal">
          <div className="nlg-eyebrow-col">
            <div className="nlg-eyebrow-muted">03 / Client notes</div>
          </div>
          <div>
            <h2 id="testimonials-heading">
              Trusted by teams who need the work to hold.
            </h2>
            <p className="nlg-sub">
              Notes from operators who brought North Lantern Group into systems their teams still need to run after the engagement closes.
            </p>
          </div>
        </div>
      </div>

      <div className="nlg-testimonials-stage nlg-reveal" aria-label="Client testimonials">
        <div className="nlg-testimonials-grid" aria-hidden="true"></div>
        {TESTIMONIAL_ROWS.map((row, rowIndex) => (
          <div
            className="nlg-testimonial-rail"
            data-direction={row.direction}
            data-row={rowIndex + 1}
            key={row.label}
          >
            <div className="nlg-testimonial-rail-label">{row.label}</div>
            <div className="nlg-testimonial-track">
              <div className="nlg-testimonial-set">
                {row.items.map((testimonial) => (
                  <TestimonialCard testimonial={testimonial} key={testimonial.name} />
                ))}
              </div>
              <div className="nlg-testimonial-set" aria-hidden="true">
                {row.items.map((testimonial) => (
                  <TestimonialCard testimonial={testimonial} key={`${testimonial.name}-duplicate`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
