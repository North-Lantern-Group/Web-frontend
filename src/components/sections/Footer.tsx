import NLGLogo from "@/components/brand/NLGLogo";
import { IconLinkedIn } from "@/components/icons/PracticeIcons";

export default function Footer() {
  return (
    <footer className="nlg-footer">
      <div className="nlg-wrap">
        <div className="nlg-footer-grid">
          <div>
            <div className="nlg-footer-brand">
              <NLGLogo variant="white" className="h-8" />
            </div>
            <p className="nlg-footer-tag">
              Senior-led consulting. Atlassian, BI, and automation work that sticks after we leave.
            </p>
            <a
              href="https://www.linkedin.com/company/northlanterngroup/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow North Lantern Group on LinkedIn"
              className="nlg-footer-social"
            >
              <IconLinkedIn size={16} />
              <span>Follow on LinkedIn</span>
            </a>
          </div>
          <div className="nlg-footer-col">
            <h4>Practices</h4>
            <ul>
              <li>
                <a href="#atlassian">Atlassian Platform</a>
              </li>
              <li>
                <a href="#bi">BI and Analytics</a>
              </li>
              <li>
                <a href="#automation">Automation and Integration</a>
              </li>
            </ul>
          </div>
          <div className="nlg-footer-col">
            <h4>Firm</h4>
            <ul>
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#how-we-work">How we work</a>
              </li>
              <li>
                <a href="#belief">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/northlanterngroup/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="nlg-footer-col">
            <h4>Field notes</h4>
            <ul>
              <li>
                <a href="#writing">Essays coming 2026</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="nlg-legal">
          <span>
            North Lantern Group Inc. · Ontario, Canada ·{" "}
            <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> ·
            Privacy requests:{" "}
            <a href="mailto:privacy@northlanterngroup.com">
              privacy@northlanterngroup.com
            </a>{" "}
            · © 2026
          </span>
          <span>hello@northlanterngroup.com</span>
        </div>
      </div>
    </footer>
  );
}
