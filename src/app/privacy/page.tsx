import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | North Lantern Group",
  description:
    "How North Lantern Group Inc. handles personal information submitted through its website. Our privacy practices, your rights, and how to contact the NLG Privacy Office.",
  alternates: {
    canonical: "https://www.northlanterngroup.com/privacy",
  },
};

const LAST_UPDATED = "April 24, 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
        >
          Back to North Lantern Group
        </Link>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            How we handle personal information.
          </h1>
          <p className="mt-6 text-sm text-neutral-500">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            This policy explains how North Lantern Group Inc. (&quot;NLG,&quot;
            &quot;we,&quot; &quot;us&quot;) handles personal information
            collected through northlanterngroup.com. It is designed to support
            our obligations under Canada&apos;s{" "}
            <em>
              Personal Information Protection and Electronic Documents Act
            </em>{" "}
            (PIPEDA) and related provincial privacy laws. It is not legal
            advice.
          </p>
        </div>

        <div className="mt-10 space-y-10 text-neutral-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Who is responsible for your information
            </h2>
            <p className="mt-4 leading-relaxed">
              North Lantern Group Inc. is the organization responsible for
              personal information collected through this website. Our Privacy
              Office is accountable for compliance with this policy and for
              responding to privacy questions, requests, and complaints.
            </p>
            <address className="mt-4 not-italic leading-relaxed text-neutral-300">
              North Lantern Group Privacy Office
              <br />
              North Lantern Group Inc.
              <br />
              400 Slater St.
              <br />
              Ottawa, ON K1R 7S7
              <br />
              Canada
              <br />
              Email:{" "}
              <a
                href="mailto:privacy@northlanterngroup.com"
                className="text-cyan-400 hover:text-cyan-300"
              >
                privacy@northlanterngroup.com
              </a>
            </address>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Scope of this policy
            </h2>
            <p className="mt-4 leading-relaxed">
              This policy applies to personal information we collect through
              northlanterngroup.com, including the contact form, and through
              email correspondence initiated from the website. It does not
              cover information collected under a signed client engagement
              agreement, which is governed by that agreement and any
              supporting data processing terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. What personal information we collect
            </h2>
            <p className="mt-4 leading-relaxed">
              We collect only what is needed to respond to inquiries, qualify
              the request, and route it to the right engagement lane.
            </p>
            <p className="mt-4 leading-relaxed font-medium text-white">
              Information you provide to us:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                Name (first, last), company, company size, work email, and
                phone number (optional)
              </li>
              <li>Area of interest and the content of your message</li>
              <li>
                Confirmation that you have read this Privacy Policy (required
                to submit the form)
              </li>
            </ul>
            <p className="mt-4 leading-relaxed font-medium text-white">
              Technical information collected automatically:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                IP address, browser and device signals, and request metadata
                used for spam prevention and security
              </li>
              <li>
                reCAPTCHA v3 risk signals provided by Google to help us
                distinguish humans from bots
              </li>
              <li>
                Standard web server logs generated by our hosting provider
              </li>
              <li>
                Source page and referrer information, with arbitrary query
                strings removed, used to understand where a form submission
                came from
              </li>
            </ul>
            <p className="mt-4 leading-relaxed">
              We do not use advertising cookies, analytics trackers, or
              third-party marketing pixels on this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Why we collect it and how we use it
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                To respond to your inquiry and schedule an initial
                conversation
              </li>
              <li>
                To understand fit and route the request into Atlassian
                Platform, BI and Analytics, or Automation and Integration
              </li>
              <li>
                To prevent spam, fraud, and abuse of our website and email
                channels
              </li>
              <li>
                To maintain records of inquiries in case the conversation
                becomes an engagement or a procurement process
              </li>
              <li>
                To meet our legal, accounting, security, and operational
                obligations
              </li>
            </ul>
            <p className="mt-4 leading-relaxed">
              We do not use the information you submit to train machine
              learning models, and we do not sell personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Consent and withdrawal of consent
            </h2>
            <p className="mt-4 leading-relaxed">
              By submitting the contact form, you consent to NLG collecting
              and using your information for the purposes described above.
              You may withdraw consent at any time, subject to legal or
              contractual restrictions and reasonable notice, by emailing{" "}
              <a
                href="mailto:privacy@northlanterngroup.com"
                className="text-cyan-400 hover:text-cyan-300"
              >
                privacy@northlanterngroup.com
              </a>
              . Withdrawing consent may affect our ability to respond to
              your inquiry.
            </p>
            <p className="mt-4 leading-relaxed">
              We do not send unsolicited marketing email from this website.
              If that changes, any commercial electronic messages will
              comply with Canada&apos;s Anti-Spam Legislation (CASL),
              including sender identification, a functioning unsubscribe
              mechanism, and a valid physical address.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Service providers we rely on
            </h2>
            <p className="mt-4 leading-relaxed">
              We use a small number of trusted service providers to operate
              the website and the contact form. Each provider processes
              personal information on our behalf, under contract, and only
              for the limited purposes described below.
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <span className="font-medium text-white">Vercel Inc.</span>{" "}
                hosts this website and generates server logs used for
                availability, security, and abuse prevention.
              </li>
              <li>
                <span className="font-medium text-white">Resend</span>{" "}
                delivers contact form submissions to our internal mailbox.
              </li>
              <li>
                <span className="font-medium text-white">ZeroBounce</span>{" "}
                checks that the email address you provide is deliverable,
                to reduce bounced mail and form abuse.
              </li>
              <li>
                <span className="font-medium text-white">
                  Google reCAPTCHA v3
                </span>{" "}
                scores each form submission for bot-like behaviour. Google
                may process the request IP and browser signals. Use is
                governed by Google&apos;s{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  privacy policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  terms of service
                </a>
                .
              </li>
              <li>
                <span className="font-medium text-white">
                  Google Workspace
                </span>{" "}
                stores our corporate email and a restricted Google Sheets
                backup of website contact submissions. Google Apps Script
                receives signed server-to-server backup requests from our
                website and writes them to that Sheet.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Additions and changes to this list will be reflected on this
              page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Where your information is processed
            </h2>
            <p className="mt-4 leading-relaxed">
              Our service providers may store and process personal
              information on servers located in Canada, the United States,
              or other countries where they or their subprocessors operate.
              When information is processed outside Canada, it may be
              subject to the laws of those countries, including lawful
              access requests by foreign authorities. We select providers
              that commit to security and privacy standards consistent with
              Canadian expectations, and we engage them under contractual
              safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. How long we keep it
            </h2>
            <p className="mt-4 leading-relaxed">
              We retain personal information only as long as needed for the
              purposes it was collected, or as required by law.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Contact form submissions that do not lead to an engagement
                are retained for up to 24 months and then deleted or
                anonymized.
              </li>
              <li>
                Inquiries that become client engagements move into the
                client file and are governed by the engagement agreement
                and our standard business record retention practices.
              </li>
              <li>
                Spam and abuse signals may be retained longer to protect
                the integrity of our systems.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. How we protect your information
            </h2>
            <p className="mt-4 leading-relaxed">
              We apply safeguards appropriate to the sensitivity of the
              information, including HTTPS transport encryption, access
              controls on internal mailboxes and lead records,
              least-privilege administrator access, multi-factor
              authentication on supporting accounts, signed server-to-server
              backup requests, and contracted obligations with our service
              providers. No system is perfectly secure, and we do not promise
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Your rights
            </h2>
            <p className="mt-4 leading-relaxed">
              Subject to applicable law, you may ask us to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Confirm whether we hold personal information about you</li>
              <li>Provide access to that information</li>
              <li>Correct information that is inaccurate or incomplete</li>
              <li>Delete information we no longer need to retain</li>
              <li>
                Withdraw consent or unsubscribe from any future
                communications
              </li>
              <li>Receive an explanation of our privacy practices</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Send the request to{" "}
              <a
                href="mailto:privacy@northlanterngroup.com"
                className="text-cyan-400 hover:text-cyan-300"
              >
                privacy@northlanterngroup.com
              </a>
              . We will acknowledge the request within five business days
              where practical and respond substantively within thirty days
              unless more time is reasonably required. We may need to
              verify your identity before acting on a request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              11. Complaints
            </h2>
            <p className="mt-4 leading-relaxed">
              If you believe we have handled your personal information
              improperly, please contact the NLG Privacy Office first so we
              can try to resolve the issue directly. You may also have the
              right to contact the Office of the Privacy Commissioner of
              Canada at{" "}
              <a
                href="https://www.priv.gc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300"
              >
                priv.gc.ca
              </a>{" "}
              or your provincial privacy regulator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              12. Changes to this policy
            </h2>
            <p className="mt-4 leading-relaxed">
              We will update this page when our data handling changes,
              including new service providers, new form processing tools,
              or any introduction of analytics, tracking, or marketing
              email. The date at the top of this page reflects the most
              recent update. Material changes will be highlighted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              13. Contact us
            </h2>
            <p className="mt-4 leading-relaxed">
              Privacy questions and requests:{" "}
              <a
                href="mailto:privacy@northlanterngroup.com"
                className="text-cyan-400 hover:text-cyan-300"
              >
                privacy@northlanterngroup.com
              </a>
              <br />
              General inquiries:{" "}
              <a
                href="mailto:hello@northlanterngroup.com"
                className="text-cyan-400 hover:text-cyan-300"
              >
                hello@northlanterngroup.com
              </a>
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
