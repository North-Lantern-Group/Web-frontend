"use client";

import { useEffect } from "react";
import Beacon from "@/components/Beacon";

export default function Belief() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-belief-beat]");
    let active: string | null = null;

    const handler = () => {
      const triggerY = window.innerHeight * 0.42;
      let next: string | null = null;
      nodes.forEach((n) => {
        const rect = n.getBoundingClientRect();
        if (rect.top < triggerY && rect.bottom > 0) {
          next = n.getAttribute("data-belief-beat");
        }
      });
      if (next && next !== active) {
        active = next;
        window.dispatchEvent(new CustomEvent("nlg-belief-beat", { detail: next }));
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section className="nlg-section nlg-belief-section" id="belief">
      <div className="nlg-wrap nlg-belief">
        <div className="nlg-eyebrow-col">
          <div className="nlg-eyebrow-muted">01 / Belief</div>
        </div>

        <div className="nlg-belief-body nlg-reveal">
          <h2
            className="nlg-belief-headline"
            data-belief-beat="hook"
          >
            Your systems cost more to tolerate than to fix.
          </h2>

          <p className="nlg-belief-p nlg-belief-hook" data-belief-beat="hook">
            The dashboard loads. The workflow runs. The automation fires. And still, someone exports the data to Excel, pings the one person who knows the real process, and sends leadership a number with a caveat.
          </p>

          <p
            className="nlg-belief-p nlg-belief-transition"
            data-belief-beat="transition"
          >
            Most teams have three versions of this running at once.
          </p>

          <p className="nlg-belief-version" data-belief-beat="atlassian">
            <span className="nlg-belief-lead">Atlassian that grew without anyone in charge of it.</span>{" "}
            <span className="nlg-belief-body-fragment">
              Projects nobody wants to audit. Permission schemes that haven&apos;t been reviewed in two years. Workflows patched by four people, documented by none. Confluence full of pages that stopped being trusted around the time the last admin left.
            </span>
          </p>

          <p className="nlg-belief-version" data-belief-beat="reporting">
            <span className="nlg-belief-lead">Reporting leadership can&apos;t fully believe.</span>{" "}
            <span className="nlg-belief-body-fragment">
              Dashboards that load on time and still come with a caveat. Three sources of truth for the same number. The real number lives in someone&apos;s tab order, rebuilt by hand on Thursday mornings.
            </span>
          </p>

          <p className="nlg-belief-version" data-belief-beat="automation">
            <span className="nlg-belief-lead">Manual work between systems that nobody scoped for.</span>{" "}
            <span className="nlg-belief-body-fragment">
              CRM to billing, ticket to invoice, Slack to Jira. The work that fills up someone&apos;s afternoon because two systems don&apos;t talk and nobody has had the budget to make them.
            </span>
          </p>

          <p
            className="nlg-belief-p nlg-belief-solution"
            data-belief-beat="rebuilt"
          >
            NLG rebuilds the operational layer underneath. Atlassian, reporting, workflows, automations, integrations, and the governance that keeps it from drifting again. We stay until your team can run it without us.
          </p>

          <p
            className="nlg-belief-p nlg-belief-close"
            data-belief-beat="refusal"
          >
            No decks masquerading as delivery. No staff augmentation dressed up as expertise. No juniors shipping what seniors sold.
          </p>
        </div>

        <div className="nlg-belief-visual">
          <Beacon />
        </div>
      </div>
    </section>
  );
}
