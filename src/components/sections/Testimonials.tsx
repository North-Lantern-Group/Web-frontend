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
  metricSingleLine?: boolean;
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
    outcomeMetric: "EIGHT YEARS OF DEBT,\nCLEARED IN FOURTEEN WEEKS.",
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
    outcomeMetric: "DOCUMENTATION PEOPLE USE",
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
    outcomeMetric: "ACCESS GOVERNANCE MODEL,\nFINALLY UNDER CONTROL.",
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
    outcomeMetric: "CLEAR NUMBERS. BETTER DECISIONS.",
    metricSingleLine: true,
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
    outcomeMetric: "CLEAR SCOPE. STRAIGHT ANSWERS.",
    metricSingleLine: true,
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
    outcomeMetric: "INTEGRATIONS THAT KEEP RUNNING",
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
    outcomeMetric: "LESS FRICTION, FASTER TEAMS",
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
    outcomeMetric: "ATLASSIAN WORK THAT LASTS",
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
    outcomeMetric: "BUILT AROUND HOW WE ACTUALLY WORK",
    metricSingleLine: true,
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
            if (char === " " || char === "\n") return char;
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

function renderHighlightedQuote(fullQuote: string, pullQuote: string) {
  const matchIndex = fullQuote.indexOf(pullQuote);
  if (matchIndex === -1) return fullQuote;

  const before = fullQuote.slice(0, matchIndex);
  const after = fullQuote.slice(matchIndex + pullQuote.length);

  return (
    <>
      {before}
      <mark>{pullQuote}</mark>
      {after}
    </>
  );
}

type TransitionSource = "auto" | "dot" | "roster" | "keyboard";

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
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<"idle" | "out" | "decode">("decode");

  const displayed = getAttestation(displayIndex);
  const metaSegments = useMemo(
    () => [
      `ENGAGEMENT // ${displayed.engagementType}`,
      `DURATION // ${displayed.durationWeeks} WEEKS`,
      `VERIFIED // ${displayed.monthsPostHandover} MO POST-HANDOVER`,
    ],
    [displayed],
  );
  const decodedMetric = useDecodedText(displayed.outcomeMetric, phase === "decode", reducedMotion);
  const typedMeta = useTypedSegments(
    metaSegments,
    phase === "decode",
    reducedMotion,
    620,
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

  // Scrolls only the roster container — never walks ancestors, never moves the document.
  // No-op for `auto` source so the 7s auto-cycle cannot pull the viewport.
  const scrollRosterToActive = useCallback((index: number, source: TransitionSource) => {
    if (source === "auto") return;
    const roster = rosterRef.current;
    const row = rosterButtonRefs.current[index];
    if (!roster || !row) return;

    const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
    const gutter = 12;

    if (window.matchMedia("(max-width: 767px)").matches) {
      const rowLeft = row.offsetLeft;
      const rowRight = rowLeft + row.offsetWidth;
      const viewLeft = roster.scrollLeft;
      const viewRight = viewLeft + roster.clientWidth;

      if (rowLeft < viewLeft) {
        roster.scrollTo({ left: Math.max(0, rowLeft - gutter), behavior });
      } else if (rowRight > viewRight) {
        roster.scrollTo({ left: rowRight - roster.clientWidth + gutter, behavior });
      }
      return;
    }

    const rowTop = row.offsetTop;
    const rowBottom = rowTop + row.offsetHeight;
    const viewTop = roster.scrollTop;
    const viewBottom = viewTop + roster.clientHeight;

    if (rowTop < viewTop) {
      roster.scrollTo({ top: Math.max(0, rowTop - gutter), behavior });
    } else if (rowBottom > viewBottom) {
      roster.scrollTo({ top: rowBottom - roster.clientHeight + gutter, behavior });
    }
  }, [reducedMotion]);

  // Mobile-only convenience after explicit user activation; never on auto-cycle.
  const scrollPrimaryIntoView = useCallback((source: TransitionSource) => {
    if (source === "auto") return;
    const primary = primaryRef.current;
    if (!primary || !window.matchMedia("(max-width: 767px)").matches) return;

    primary.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [reducedMotion]);

  const runTransition = useCallback((nextIndex: number, source: TransitionSource) => {
    const next = mod(nextIndex, ATTESTATIONS.length);
    if (next === activeIndex) return;

    clearTransitionTimers();
    const userInitiated = source !== "auto";

    if (reducedMotion) {
      setActiveIndex(next);
      setDisplayIndex(next);
      setPhase("decode");
      if (userInitiated) {
        scrollRosterToActive(next, source);
        if (source !== "keyboard") scrollPrimaryIntoView(source);
      }
      return;
    }

    setPhase("out");

    transitionTimersRef.current.push(window.setTimeout(() => setActiveIndex(next), 220));
    transitionTimersRef.current.push(
      window.setTimeout(() => {
        setDisplayIndex(next);
        setPhase("decode");
        if (userInitiated) {
          scrollRosterToActive(next, source);
          if (source !== "keyboard") scrollPrimaryIntoView(source);
        }
      }, 260),
    );
  }, [activeIndex, clearTransitionTimers, reducedMotion, scrollPrimaryIntoView, scrollRosterToActive]);

  const pausePanel = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
  }, []);

  const resumePanel = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), 1500);
  }, []);

  // Pause auto-cycle when the section is not meaningfully on screen,
  // so a 7s timer cannot fire while the visitor is reading something else.
  useEffect(() => {
    const node = panelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setIsVisible(entry.intersectionRatio >= 0.3);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.75, 1] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    clearAutoTimer();
    if (!isPaused && isVisible) {
      autoTimerRef.current = window.setTimeout(() => runTransition(activeIndex + 1, "auto"), 7000);
    }
    return clearAutoTimer;
  }, [activeIndex, clearAutoTimer, isPaused, isVisible, runTransition]);

  useEffect(() => () => {
    clearAutoTimer();
    clearTransitionTimers();
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  }, [clearAutoTimer, clearTransitionTimers]);

  const handleRosterKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      const nextIdx = mod(index + 1, ATTESTATIONS.length);
      rosterButtonRefs.current[nextIdx]?.focus({ preventScroll: true });
      scrollRosterToActive(nextIdx, "keyboard");
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIdx = mod(index - 1, ATTESTATIONS.length);
      rosterButtonRefs.current[prevIdx]?.focus({ preventScroll: true });
      scrollRosterToActive(prevIdx, "keyboard");
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      runTransition(index, "keyboard");
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

        <header className="nlg-attestation-status">
          <div className="nlg-eyebrow-muted nlg-attestation-index">03 / CLIENT TESTIMONIALS</div>
          <div>
            <h2>Trusted by teams who need the work to hold.</h2>
            <p>
              Full testimonials from leaders who hired North Lantern Group for Atlassian, BI, automation, and governed delivery work their teams rely on every day.
            </p>
            <div className="nlg-attestation-meta-strip">
              11 CLIENT TESTIMONIALS // 4 SERVICE AREAS // POST-HANDOVER RESULTS
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
                  onClick={() => runTransition(index, "dot")}
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
            <div
              className={`nlg-attestation-metric${
                displayed.metricSingleLine
                  ? " nlg-metric-single-line"
                  : displayed.outcomeMetric.includes("\n")
                    ? " nlg-metric-multi-line"
                    : ""
              }`}
              aria-hidden="true"
            >
              {decodedMetric}
            </div>
            <blockquote className="nlg-attestation-quote" aria-hidden="true">
              {renderHighlightedQuote(displayed.fullQuote, displayed.pullQuote)}
            </blockquote>
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

          <div className="nlg-attestation-roster" role="group" aria-label="Client testimonial index">
            <div className="nlg-attestation-roster-head">TESTIMONIAL INDEX</div>
            <div ref={rosterRef} className="nlg-attestation-roster-list">
              {ATTESTATIONS.map((attestation, index) => (
                <button
                  aria-pressed={index === activeIndex}
                  className="nlg-attestation-row"
                  data-active={index === activeIndex}
                  key={attestation.id}
                  onClick={() => runTransition(index, "roster")}
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
      </div>
    </section>
  );
}
