import NLGLogo from "@/components/brand/NLGLogo";

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
                <a href="#how-we-work">How we work</a>
              </li>
              <li>
                <a href="#belief">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="nlg-footer-col">
            <h4>Writing</h4>
            <ul>
              <li>
                <span className="nlg-placeholder">Index pending first essay</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="nlg-legal">
          <span>
            North Lantern Group Inc. · Ontario, Canada · <a href="/privacy">Privacy</a> · © 2026
          </span>
          <span>hello@northlanterngroup.com</span>
        </div>
      </div>
    </footer>
  );
}
