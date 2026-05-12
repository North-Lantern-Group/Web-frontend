import { IconArrow, IconCalendar, IconLinkedIn, IconMail } from "@/components/icons/PracticeIcons";
import { BOOKING_URL, LINKEDIN_URL, EMAIL_GENERAL } from "@/config/site";
import ContactFormMount from "@/components/sections/ContactFormMount";

export default function Contact() {
  return (
    <section className="nlg-contact" id="contact">
      <div className="nlg-wrap nlg-contact-grid">
        <div className="nlg-contact-left">
          <h2 className="nlg-cta-text nlg-reveal">
            Tell us what is broken, or what you are planning.
          </h2>
          <p className="nlg-cta-subtext nlg-reveal">
            We reply within one business day, with a short note. Not a 47-slide proposal deck.
          </p>
          <div className="nlg-contact-alt">
            <a
              className="nlg-btn nlg-btn-primary nlg-btn-lg"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconCalendar size={16} /> Book a call
            </a>
            <a className="nlg-text-link" href={`mailto:${EMAIL_GENERAL}`}>
              <IconMail size={14} /> Email us directly <IconArrow size={14} />
            </a>
            <a
              className="nlg-text-link"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconLinkedIn size={14} /> Connect on LinkedIn <IconArrow size={14} />
            </a>
          </div>
        </div>
        <div className="nlg-contact-right nlg-reveal">
          <ContactFormMount />
        </div>
      </div>
    </section>
  );
}
