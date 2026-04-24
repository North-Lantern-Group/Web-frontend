import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Terms of Use | North Lantern Group",
  description:
    "Terms of use for the North Lantern Group Inc. website. Informational only. No professional advice or client relationship is created by visiting this site.",
  alternates: {
    canonical: "https://www.northlanterngroup.com/terms",
  },
};

const LAST_UPDATED = "April 24, 2026";

export default function TermsPage() {
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
            Website Terms of Use
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            Terms of use.
          </h1>
          <p className="mt-6 text-sm text-neutral-500">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            These terms govern your use of northlanterngroup.com, operated
            by North Lantern Group Inc. (&quot;NLG,&quot; &quot;we,&quot;
            &quot;us&quot;). By using this website you agree to these
            terms. If you do not agree, please do not use the website.
            These terms are not legal advice and do not replace any written
            agreement between NLG and a client.
          </p>
        </div>

        <div className="mt-10 space-y-10 text-neutral-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Informational use only
            </h2>
            <p className="mt-4 leading-relaxed">
              The content on this website is provided for general
              informational purposes only. It describes the services that
              NLG offers and how we work. It is not professional, legal,
              financial, tax, security, accounting, compliance,
              architectural, or implementation advice for any specific
              situation.
            </p>
            <p className="mt-4 leading-relaxed">
              You should not act or refrain from acting on the basis of
              anything on this website without obtaining advice appropriate
              to your circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. No engagement is created by visiting this site
            </h2>
            <p className="mt-4 leading-relaxed">
              Visiting the website, reading our material, submitting the
              contact form, exchanging introductory emails, or booking an
              introductory call does not create a client relationship, a
              contract of services, or any obligation on NLG to perform
              work. A client engagement exists only when NLG and the
              client have signed a written engagement agreement, statement
              of work, or order form that expressly creates one.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. No guarantee of outcomes
            </h2>
            <p className="mt-4 leading-relaxed">
              The website describes our delivery model, practices, and
              beliefs about how work should be done. It does not promise a
              specific business, operational, financial, or performance
              outcome. Any results described in connection with an
              engagement depend on facts, inputs, and decisions that are
              the client&apos;s responsibility and that are confirmed in
              the engagement agreement rather than on the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Intellectual property
            </h2>
            <p className="mt-4 leading-relaxed">
              The website, including its text, graphics, logos,
              illustrations, icons, layout, and code, is owned by NLG or
              its licensors and is protected by Canadian and international
              intellectual property laws.
            </p>
            <p className="mt-4 leading-relaxed">
              The North Lantern Group name, the NLG word mark, and the
              stylized &quot;N&quot; lantern mark are trademarks of North
              Lantern Group Inc. Third-party names and logos displayed on
              this website belong to their respective owners and appear
              only to identify the platforms and tools we work with.
            </p>
            <p className="mt-4 leading-relaxed">
              You may view and share individual pages of the website for
              your own non-commercial reference. You may not copy,
              republish, distribute, modify, or create derivative works
              from the website without our prior written permission, except
              as permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Permitted and prohibited uses
            </h2>
            <p className="mt-4 leading-relaxed">You agree not to:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Use the website in a way that violates any applicable law
                or regulation
              </li>
              <li>
                Submit false, misleading, defamatory, or infringing
                information through the contact form
              </li>
              <li>
                Attempt to probe, scan, or test the vulnerability of the
                website or circumvent any security or authentication
                measures
              </li>
              <li>
                Interfere with the availability of the website or with
                other users&apos; ability to access it
              </li>
              <li>
                Use automated systems to scrape content at a scale that
                degrades service, or to bypass the reCAPTCHA and related
                anti-spam protections
              </li>
              <li>
                Impersonate any person or organization when submitting
                information
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Third-party services and links
            </h2>
            <p className="mt-4 leading-relaxed">
              The website relies on third-party services, including a
              hosting provider, an email delivery provider, an email
              validation provider, an anti-bot service, and corporate email
              infrastructure. Links to external websites, including our
              LinkedIn page and third-party documentation, are provided for
              convenience. NLG does not control and is not responsible for
              the content, policies, or practices of third-party services
              or websites. Visiting them is at your own risk and subject to
              their own terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Disclaimers
            </h2>
            <p className="mt-4 leading-relaxed">
              The website is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis. To the fullest extent permitted by
              law, NLG disclaims all express and implied warranties in
              respect of the website, including implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement. We do not warrant that the website will be
              uninterrupted, error-free, secure, or free of harmful
              components, or that the information on it is current,
              complete, or correct for your specific situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Limitation of liability
            </h2>
            <p className="mt-4 leading-relaxed">
              To the maximum extent permitted by law, NLG and its
              directors, officers, employees, contractors, and agents will
              not be liable for any indirect, incidental, special,
              consequential, punitive, or exemplary damages, or for any
              loss of profits, revenue, data, goodwill, or business
              opportunity, arising out of or relating to your use of this
              website, even if advised of the possibility of such damages.
              Nothing in these terms limits or excludes any liability that
              cannot be limited or excluded under applicable law. Our total
              liability arising out of or relating to your use of this
              website is limited to the greater of CAD $100 or the amount
              actually paid by you to NLG (if any) for access to the
              website in the twelve months before the claim arose. This
              section does not affect the terms of any separate written
              engagement agreement between NLG and a client, which governs
              liability for services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Indemnity
            </h2>
            <p className="mt-4 leading-relaxed">
              You agree to indemnify and hold NLG harmless from third-party
              claims, losses, and expenses, including reasonable legal
              fees, arising out of your breach of these terms, your misuse
              of the website, or your violation of applicable law in
              connection with the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Changes to these terms
            </h2>
            <p className="mt-4 leading-relaxed">
              We may update these terms from time to time. The &quot;last
              updated&quot; date at the top of this page reflects the most
              recent version. Continued use of the website after an update
              means you accept the updated terms. Material changes will be
              highlighted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              11. Governing law
            </h2>
            <p className="mt-4 leading-relaxed">
              These terms are governed by the laws of the Province of
              Ontario and the federal laws of Canada applicable in Ontario,
              without regard to conflict of law rules. Subject to
              applicable law, the courts located in Ottawa, Ontario have
              jurisdiction over any dispute arising out of or relating to
              these terms or your use of the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              12. Contact
            </h2>
            <p className="mt-4 leading-relaxed">
              Questions about these terms:{" "}
              <a
                href="mailto:hello@northlanterngroup.com"
                className="text-cyan-400 hover:text-cyan-300"
              >
                hello@northlanterngroup.com
              </a>
              <br />
              Privacy questions:{" "}
              <a
                href="mailto:privacy@northlanterngroup.com"
                className="text-cyan-400 hover:text-cyan-300"
              >
                privacy@northlanterngroup.com
              </a>
            </p>
            <p className="mt-4 leading-relaxed">
              North Lantern Group Inc.
              <br />
              400 Slater St., Ottawa, ON K1R 7S7, Canada
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
