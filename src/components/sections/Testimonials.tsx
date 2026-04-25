"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PracticeArea =
  | "GOVERNED DELIVERY"
  | "ATLASSIAN SYSTEMS"
  | "REPORTING AND KNOWLEDGE"
  | "AUTOMATION AND OPERATING RHYTHM";

type Attestation = {
  id: string;
  name: string;
  title: string;
  initials: string;
  practiceArea: PracticeArea;
  pullQuote: string;
  outcomeMetric: string;
  fullQuote: string;
  engagementType: string;
  durationWeeks: number;
  monthsPostHandover: number;
};

const ATTESTATIONS: Attestation[] = [
  {
    id: "theresa-halloran",
    name: "Theresa Halloran",
    title: "Director of IT Operations",
    initials: "TH",
    practiceArea: "ATLASSIAN SYSTEMS",
    pullQuote: "Our agents actually want to use the system. That had not been true in years.",
    outcomeMetric: "40% MORE TICKET CAPACITY",
    fullQuote:
      "The North Lantern Group team rebuilt our Jira Service Management instance from the ground up after we had inherited eight years of accumulated customizations from a previous provider. What I appreciated most was their discipline around scope. They told us upfront which problems they would solve in the engagement and which ones we would need to address ourselves with their guidance. Six months later, our service desk handles roughly forty percent more tickets per quarter with the same team size, and our agents actually want to use the system. That had not been true in years.",
    engagementType: "JSM REBUILD",
    durationWeeks: 14,
    monthsPostHandover: 6,
  },
  {
    id: "marcus-weatherall",
    name: "Marcus Weatherall",
    title: "COO",
    initials: "MW",
    practiceArea: "REPORTING AND KNOWLEDGE",
    pullQuote: "Our internal documentation is now something our team genuinely uses.",
    outcomeMetric: "ONE USABLE KNOWLEDGE BASE",
    fullQuote:
      "We hired North Lantern Group to consolidate three Confluence instances into one and did not expect them to engage as deeply with our content strategy as they did. They sat with our department heads and worked through which knowledge actually needed to be preserved, which needed to be rewritten, and which needed to be retired. The migration itself ran smoothly, but the lasting value came from the structure they helped us put in place. Our internal documentation is now something our team genuinely uses. I would recommend North Lantern Group to any organization carrying years of accumulated technical debt.",
    engagementType: "CONFLUENCE CONSOLIDATION",
    durationWeeks: 10,
    monthsPostHandover: 7,
  },
  {
    id: "stefan-krzeminski",
    name: "Stefan Krzeminski",
    title: "VP Technology Operations",
    initials: "SK",
    practiceArea: "GOVERNED DELIVERY",
    pullQuote: "The documentation has held up.",
    outcomeMetric: "MAINTAINABLE PERMISSION MODEL",
    fullQuote:
      "North Lantern Group has been our partner on Atlassian governance for the past year. We came to them with a specific problem: our access controls had drifted significantly across multiple client tenants. They delivered a permission architecture that closed the gaps and a runbook our internal admins can maintain without external help. The engagement lead stayed close to the work and was responsive throughout. The work was completed far ahead of schedule and the documentation has held up. We have since expanded the relationship to include our reporting and analytics workstream.",
    engagementType: "ATLASSIAN GOVERNANCE",
    durationWeeks: 8,
    monthsPostHandover: 12,
  },
  {
    id: "rachel-forsythe-tan",
    name: "Rachel Forsythe-Tan",
    title: "Director of Customer Operations",
    initials: "RF",
    practiceArea: "ATLASSIAN SYSTEMS",
    pullQuote: "The eventual rebuild reflected our operational reality rather than a generic best-practice template.",
    outcomeMetric: "3X FASTER RESOLUTION TIMES",
    fullQuote:
      "I have worked with several Atlassian solution providers over the course of my career and North Lantern Group is the one I would recommend most often to peers. Their approach is research first, then propose, which sounds obvious but is genuinely rare. When we engaged them on our service desk redesign, they spent the first two weeks understanding how our team actually worked before they made a single recommendation. The eventual rebuild reflected our operational reality rather than a generic best-practice template. Our resolution times improved three times over and our team's satisfaction with the tool is dramatically higher.",
    engagementType: "SERVICE DESK REDESIGN",
    durationWeeks: 12,
    monthsPostHandover: 9,
  },
  {
    id: "andre-boucher",
    name: "Andre Boucher",
    title: "CFO",
    initials: "AB",
    practiceArea: "REPORTING AND KNOWLEDGE",
    pullQuote: "The foundation underneath is what makes this engagement stand out.",
    outcomeMetric: "ONE METRIC LAYER",
    fullQuote:
      "We engaged North Lantern Group to help us design and build out reporting capabilities across our operations. The team approached the work as a true business intelligence engagement rather than a dashboard delivery. They worked with our finance and operations leads to define our metrics consistently, built the semantic layer that ensures our numbers tell the same story regardless of which dashboard you open, and trained our internal analysts to extend the model themselves. The dashboards are excellent, but the foundation underneath is what makes this engagement stand out.",
    engagementType: "BI FOUNDATION",
    durationWeeks: 11,
    monthsPostHandover: 8,
  },
  {
    id: "mateo-aldridge",
    name: "Mateo Aldridge",
    title: "President",
    initials: "MA",
    practiceArea: "GOVERNED DELIVERY",
    pullQuote: "That kind of judgment is what we look for in our consulting partners.",
    outcomeMetric: "SCOPED WITH JUDGMENT",
    fullQuote:
      "Our company runs lean, and engaging an outside firm was not a decision we took lightly. North Lantern Group was recommended to us by a peer in our industry and they exceeded our expectations. The engagement was scoped tightly, delivered on schedule, and priced fairly. More importantly, the engagement lead was direct and transparent throughout. When we asked for additions to scope, the team was clear about the tradeoffs and helped us decide rather than just selling us more work. That kind of judgment is what we look for in our consulting partners.",
    engagementType: "OPERATING SYSTEM REVIEW",
    durationWeeks: 6,
    monthsPostHandover: 5,
  },
  {
    id: "steve-whitcombe",
    name: "Steve Whitcombe",
    title: "IT Director",
    initials: "SW",
    practiceArea: "AUTOMATION AND OPERATING RHYTHM",
    pullQuote: "Six months in, the system is running reliably.",
    outcomeMetric: "RELIABLE SIX MONTHS IN",
    fullQuote:
      "North Lantern Group delivered our automation and integration project on time and substantially exceeded our expectations on quality. The communication was excellent throughout, from initial scoping through deployment and handover. They worked very closely with our internal team to ensure the integrations would be maintained internally after the engagement closed. Six months in, the system is running reliably and our internal team is trained on the knowledge to extend it.",
    engagementType: "AUTOMATION BUILD",
    durationWeeks: 9,
    monthsPostHandover: 6,
  },
  {
    id: "janelle-kowalczyk-reid",
    name: "Janelle Kowalczyk-Reid",
    title: "Head of Operations",
    initials: "JK",
    practiceArea: "GOVERNED DELIVERY",
    pullQuote: "Their work passed our internal compliance review without comment.",
    outcomeMetric: "PASSED COMPLIANCE REVIEW",
    fullQuote:
      "We are a regulated business and our last consulting engagement with a different firm had ended badly because governance and documentation gaps surfaced during an audit. We came to North Lantern Group wary. They earned our trust quickly with their direct approach. Their delivery process is documented, their handover materials are thorough, and their work passed our internal compliance review without comment. I want to specifically credit the project lead for the work on this engagement. She was responsive, technically sharp, and her communication with our team was outstanding.",
    engagementType: "CONTROLLED HANDOVER",
    durationWeeks: 10,
    monthsPostHandover: 7,
  },
  {
    id: "petra-obrien",
    name: "Petra O'Brien",
    title: "VP Engineering",
    initials: "PO",
    practiceArea: "AUTOMATION AND OPERATING RHYTHM",
    pullQuote: "The friction we had accepted as normal for years is no longer there.",
    outcomeMetric: "NORMALIZED FRICTION REMOVED",
    fullQuote:
      "I recommend North Lantern Group highly. We engaged them on what we thought was a straightforward Jira cleanup and the work expanded into a broader operational improvement initiative as they uncovered structural issues with our workflows. They scoped the additional work transparently, delivered it within our budget, and the cumulative impact has been significant. Our project teams are running faster, our reporting is more accurate, and the friction we had accepted as normal for years is no longer there.",
    engagementType: "WORKFLOW REBUILD",
    durationWeeks: 13,
    monthsPostHandover: 8,
  },
  {
    id: "kwame-ofori-davies",
    name: "Kwame Ofori-Davies",
    title: "Senior Director of Engineering Systems",
    initials: "KO",
    practiceArea: "ATLASSIAN SYSTEMS",
    pullQuote: "They care about the long-term health of what they build.",
    outcomeMetric: "PRIMARY ATLASSIAN PARTNER",
    fullQuote:
      "North Lantern Group is now our primary consulting partner for everything Atlassian. Over the past year they have supported us through three separate engagements: a JSM redesign, a governance audit, and a reporting build. The quality has been consistent across all three. The engagement lead is professional, candid, and the team's work product is exceptional. What sets them apart in my experience is that they care about the long-term health of what they build rather than just the deliverable in front of them. Our internal team has grown more capable through working with them.",
    engagementType: "MULTI-ENGAGEMENT PARTNER",
    durationWeeks: 44,
    monthsPostHandover: 12,
  },
  {
    id: "adaeze-okoye",
    name: "Adaeze Okoye",
    title: "Chief Information Officer",
    initials: "AO",
    practiceArea: "REPORTING AND KNOWLEDGE",
    pullQuote: "They proposed a phased approach that matched our internal change capacity.",
    outcomeMetric: "CHANGE CAPACITY MATCHED",
    fullQuote:
      "When we set out to modernize our reporting, we evaluated four firms and selected North Lantern Group based on the quality of their initial proposal. They had clearly read our materials, understood our specific challenges, and proposed a phased approach that matched our internal change capacity rather than overloading us. The engagement delivered everything they committed to and the relationship has been excellent throughout. The engagement lead is a thoughtful operator and the team is one of the strongest I have worked with on Atlassian and BI projects.",
    engagementType: "REPORTING MODERNIZATION",
    durationWeeks: 12,
    monthsPostHandover: 6,
  },
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useDecodedText(text: string, active: boolean, reducedMotion: boolean) {
  const [value, setValue] = useState(text);

  useEffect(() => {
    if (!active || reducedMotion) {
      setValue(text);
      return;
    }

    let frame = 0;
    const maxFrames = Math.ceil((text.length * 15 + 260) / 30);
    const timer = window.setInterval(() => {
      frame += 1;
      setValue(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            const startFrame = Math.floor((index * 15) / 30);
            if (frame < startFrame) return "";
            if (frame > startFrame + 7) return char;
            const n = (frame + index * 7) % SCRAMBLE_CHARS.length;
            return SCRAMBLE_CHARS[n] ?? char;
          })
          .join(""),
      );

      if (frame >= maxFrames) {
        window.clearInterval(timer);
        setValue(text);
      }
    }, 30);

    return () => window.clearInterval(timer);
  }, [active, reducedMotion, text]);

  return value;
}

function useTypewriter(text: string, active: boolean, reducedMotion: boolean, delay = 120) {
  const [value, setValue] = useState(text);
  const [complete, setComplete] = useState(true);

  useEffect(() => {
    if (!active || reducedMotion) {
      setValue(text);
      setComplete(true);
      return;
    }

    setValue("");
    setComplete(false);
    let index = 0;
    let timer: number | undefined;

    const delayTimer = window.setTimeout(() => {
      timer = window.setInterval(() => {
        index += 1;
        setValue(text.slice(0, index));
        if (index >= text.length) {
          if (timer) window.clearInterval(timer);
          setComplete(true);
        }
      }, 18);
    }, delay);

    return () => {
      window.clearTimeout(delayTimer);
      if (timer) window.clearInterval(timer);
    };
  }, [active, delay, reducedMotion, text]);

  return { value, complete };
}

function useTypedSegments(segments: string[], active: boolean, reducedMotion: boolean, delay: number) {
  const [values, setValues] = useState(segments);

  useEffect(() => {
    if (!active || reducedMotion) {
      setValues(segments);
      return;
    }

    setValues(segments.map(() => ""));
    const timers: number[] = [];

    segments.forEach((segment, segmentIndex) => {
      let charIndex = 0;
      const startTimer = window.setTimeout(() => {
        const typeTimer = window.setInterval(() => {
          charIndex += 1;
          setValues((current) => {
            const next = [...current];
            next[segmentIndex] = segment.slice(0, charIndex);
            return next;
          });
          if (charIndex >= segment.length) {
            window.clearInterval(typeTimer);
          }
        }, 12);
        timers.push(typeTimer);
      }, delay + segmentIndex * 80);
      timers.push(startTimer);
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [active, delay, reducedMotion, segments]);

  return values;
}

function BracketCorners({ className = "" }: { className?: string }) {
  return (
    <span className={`nlg-attestation-brackets ${className}`} aria-hidden="true">
      <span className="nlg-attestation-corner tl"></span>
      <span className="nlg-attestation-corner tr"></span>
      <span className="nlg-attestation-corner bl"></span>
      <span className="nlg-attestation-corner br"></span>
    </span>
  );
}

function mod(value: number, length: number) {
  return ((value % length) + length) % length;
}

function getAttestation(index: number): Attestation {
  return ATTESTATIONS[index] ?? ATTESTATIONS[0]!;
}

export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement | null>(null);
  const primaryRef = useRef<HTMLDivElement | null>(null);
  const rosterRef = useRef<HTMLDivElement | null>(null);
  const rosterButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const autoTimerRef = useRef<number | undefined>(undefined);
  const resumeTimerRef = useRef<number | undefined>(undefined);
  const transitionTimersRef = useRef<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [phase, setPhase] = useState<"idle" | "out" | "decode">("decode");
  const [linePhase, setLinePhase] = useState<"idle" | "retract" | "draw">("draw");
  const [path, setPath] = useState("");

  const displayed = getAttestation(displayIndex);
  const metaSegments = useMemo(
    () => [
      `ENGAGEMENT // ${displayed.engagementType}`,
      `DURATION // ${displayed.durationWeeks} WEEKS`,
      `VERIFIED // ${displayed.monthsPostHandover} MO POST-HANDOVER`,
    ],
    [displayed],
  );
  const quoteDelay = reducedMotion ? 0 : 180;
  const typedQuote = useTypewriter(displayed.pullQuote, phase === "decode", reducedMotion, quoteDelay);
  const decodedMetric = useDecodedText(displayed.outcomeMetric, phase === "decode", reducedMotion);
  const typedMeta = useTypedSegments(
    metaSegments,
    phase === "decode",
    reducedMotion,
    quoteDelay + displayed.pullQuote.length * 18 + 160,
  );

  const clearTransitionTimers = useCallback(() => {
    transitionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    transitionTimersRef.current = [];
  }, []);

  const clearAutoTimer = useCallback(() => {
    if (autoTimerRef.current) {
      window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = undefined;
    }
  }, []);

  const updatePath = useCallback((index = activeIndex) => {
    const panel = panelRef.current;
    const primary = primaryRef.current;
    const row = rosterButtonRefs.current[index];
    if (!panel || !primary || !row) return;

    const panelRect = panel.getBoundingClientRect();
    const primaryRect = primary.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    const startX = rowRect.left - panelRect.left;
    const startY = rowRect.top + rowRect.height / 2 - panelRect.top;
    const endX = primaryRect.right - panelRect.left;
    const endY = primaryRect.top + primaryRect.height * 0.58 - panelRect.top;
    const controlX = endX + (startX - endX) * 0.48;
    setPath(`M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`);
  }, [activeIndex]);

  const scrollRosterToActive = useCallback((index: number) => {
    const roster = rosterRef.current;
    const row = rosterButtonRefs.current[index];
    if (!roster || !row) return;

    const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
    if (window.matchMedia("(max-width: 767px)").matches) {
      const rowLeft = row.offsetLeft;
      const rowRight = rowLeft + row.offsetWidth;
      const viewLeft = roster.scrollLeft;
      const viewRight = viewLeft + roster.clientWidth;
      const gutter = 12;

      if (rowLeft < viewLeft) {
        roster.scrollTo({ left: Math.max(0, rowLeft - gutter), behavior });
      } else if (rowRight > viewRight) {
        roster.scrollTo({ left: rowRight - roster.clientWidth + gutter, behavior });
      }
      return;
    }

    row.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior,
    });
  }, [reducedMotion]);

  const runTransition = useCallback((nextIndex: number) => {
    const next = mod(nextIndex, ATTESTATIONS.length);
    if (next === activeIndex) return;

    clearTransitionTimers();

    if (reducedMotion) {
      setActiveIndex(next);
      setDisplayIndex(next);
      setPhase("decode");
      setLinePhase("idle");
      window.requestAnimationFrame(() => updatePath(next));
      scrollRosterToActive(next);
      return;
    }

    setPhase("out");
    setLinePhase("idle");

    transitionTimersRef.current.push(window.setTimeout(() => setLinePhase("retract"), 180));
    transitionTimersRef.current.push(window.setTimeout(() => setActiveIndex(next), 240));
    transitionTimersRef.current.push(
      window.setTimeout(() => {
        setDisplayIndex(next);
        setPhase("decode");
        setLinePhase("draw");
        updatePath(next);
        scrollRosterToActive(next);
      }, 300),
    );
    transitionTimersRef.current.push(window.setTimeout(() => setLinePhase("idle"), 520));
  }, [activeIndex, clearTransitionTimers, reducedMotion, scrollRosterToActive, updatePath]);

  const pausePanel = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
  }, []);

  const resumePanel = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), 1500);
  }, []);

  useEffect(() => {
    clearAutoTimer();
    if (!isPaused) {
      autoTimerRef.current = window.setTimeout(() => runTransition(activeIndex + 1), 7000);
    }
    return clearAutoTimer;
  }, [activeIndex, clearAutoTimer, isPaused, runTransition]);

  useEffect(() => {
    updatePath(activeIndex);
    const onResize = () => updatePath(activeIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex, updatePath]);

  useEffect(() => () => {
    clearAutoTimer();
    clearTransitionTimers();
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  }, [clearAutoTimer, clearTransitionTimers]);

  const handleRosterKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      rosterButtonRefs.current[mod(index + 1, ATTESTATIONS.length)]?.focus();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      rosterButtonRefs.current[mod(index - 1, ATTESTATIONS.length)]?.focus();
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      runTransition(index);
    }
    if (event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  return (
    <section
      ref={panelRef}
      className="nlg-section nlg-attestation-console nlg-reveal"
      id="work"
      aria-label="Client attestations console"
      onPointerEnter={pausePanel}
      onPointerLeave={resumePanel}
      onFocusCapture={pausePanel}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) resumePanel();
      }}
    >
      <div className="nlg-attestation-frame">
        <BracketCorners />
        <svg
          className="nlg-attestation-line"
          aria-hidden="true"
          data-line-phase={linePhase}
          focusable="false"
        >
          <defs>
            <filter id="nlg-attestation-line-glow" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path className="nlg-attestation-line-glow" d={path} pathLength={1} />
          <path className="nlg-attestation-line-solid" d={path} pathLength={1} />
        </svg>

        <header className="nlg-attestation-status">
          <div className="nlg-eyebrow-muted nlg-attestation-index">03 / CLIENT NOTES</div>
          <div>
            <h2>Trusted by teams who need the work to hold.</h2>
            <p>
              Notes from operators who brought North Lantern Group into systems their teams still need to run after the engagement closes.
            </p>
            <div className="nlg-attestation-meta-strip">
              11 ATTESTATIONS // 4 DELIVERY SIGNALS // VERIFIED POST-HANDOVER
            </div>
            <div className="nlg-attestation-dots" role="tablist" aria-label="Choose attestation">
              {ATTESTATIONS.map((attestation, index) => (
                <button
                  aria-label={`${attestation.practiceArea}: ${attestation.name}`}
                  aria-selected={index === activeIndex}
                  className="nlg-attestation-dot"
                  data-active={index === activeIndex}
                  data-tooltip={`${attestation.practiceArea} // ${attestation.name}`}
                  key={attestation.id}
                  onClick={() => runTransition(index)}
                  role="tab"
                  type="button"
                />
              ))}
            </div>
          </div>
        </header>

        <div className="nlg-attestation-body">
          <div
            ref={primaryRef}
            className="nlg-attestation-primary"
            data-phase={phase}
            aria-live="polite"
          >
            <div className="nlg-sr-only">
              {displayed.name}, {displayed.title}. {displayed.fullQuote}
            </div>
            <div className="nlg-attestation-metric" aria-hidden="true">
              {decodedMetric}
            </div>
            <p className="nlg-attestation-quote" aria-hidden="true">
              {typedQuote.value}
              {!typedQuote.complete && <span className="nlg-attestation-caret" aria-hidden="true"></span>}
            </p>
            <div className="nlg-attestation-divider" aria-hidden="true"></div>
            <div className="nlg-attestation-person" aria-hidden="true">
              <span>{displayed.name}</span>
              <span>{displayed.title}</span>
            </div>
            <div className="nlg-attestation-readout-meta" aria-hidden="true">
              {typedMeta.map((segment, index) => (
                <span key={`meta-${index}`}>{segment}</span>
              ))}
            </div>
            <div className="nlg-attestation-rec" aria-hidden="true">
              <span></span>
              REC
            </div>
          </div>

          <div ref={rosterRef} className="nlg-attestation-roster" role="group" aria-label="Attestation roster">
            <div className="nlg-attestation-roster-head">ATTESTATION ROSTER</div>
            {ATTESTATIONS.map((attestation, index) => (
              <button
                aria-pressed={index === activeIndex}
                className="nlg-attestation-row"
                data-active={index === activeIndex}
                key={attestation.id}
                onClick={() => runTransition(index)}
                onKeyDown={(event) => handleRosterKeyDown(event, index)}
                ref={(node) => {
                  rosterButtonRefs.current[index] = node;
                }}
                type="button"
              >
                <span className="nlg-attestation-initials">{attestation.initials}</span>
                <span className="nlg-attestation-row-person">
                  <span>{attestation.name}</span>
                  <span>{attestation.title}</span>
                </span>
                <span className="nlg-attestation-practice">{attestation.practiceArea}</span>
                <BracketCorners className="row" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
