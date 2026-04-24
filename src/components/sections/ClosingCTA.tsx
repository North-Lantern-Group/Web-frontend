import { IconArrow, IconCalendar, IconMail } from "@/components/icons/PracticeIcons";

export default function ClosingCTA() {
  return (
    <section className="nlg-cta" id="cta">
      <div className="nlg-wrap">
        <h2 className="nlg-cta-text nlg-reveal">
          Tell us what is broken, or what you are planning.
          <span className="nlg-dim">
            We reply within one business day, with a short note. Not a 47-slide proposal deck.
          </span>
        </h2>
        <div className="nlg-cta-actions nlg-reveal">
          <a
            className="nlg-btn nlg-btn-primary nlg-btn-lg"
            href="#cta"
            data-note="cal.com-pending"
          >
            <IconCalendar size={16} /> Book a call
          </a>
          <a className="nlg-text-link" href="mailto:hello@northlanterngroup.com">
            <IconMail size={14} /> Email us directly <IconArrow size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
