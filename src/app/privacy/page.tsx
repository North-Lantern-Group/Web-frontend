import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | North Lantern Group",
  description: "Privacy policy for North Lantern Group Inc. website inquiries and contact form submissions.",
  alternates: {
    canonical: "https://www.northlanterngroup.com/privacy",
  },
};

const serviceProviders = [
  "Resend for email delivery",
  "ZeroBounce for email validation",
  "Google reCAPTCHA v3 for spam protection",
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">
          Back to North Lantern Group
        </Link>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            How we handle website inquiries.
          </h1>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            This policy covers personal information submitted through the North Lantern Group website contact form.
            We collect what we need to respond, qualify the request, and route the work into the right engagement lane.
          </p>
        </div>

        <div className="mt-10 space-y-10 text-neutral-300">
          <section>
            <h2 className="text-xl font-semibold text-white">Organization responsible for the data</h2>
            <address className="mt-4 not-italic leading-relaxed text-neutral-300">
              North Lantern Group Inc.<br />
              400 Slater St.<br />
              Ottawa, ON K1R 7S7<br />
              Canada
            </address>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">What we collect</h2>
            <p className="mt-4 leading-relaxed">
              When you submit the contact form, we collect the information you provide: name, company, company size,
              email address, phone number if provided, area of interest, and message content. We also process technical
              signals needed to protect the form from spam.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Why we collect it</h2>
            <p className="mt-4 leading-relaxed">
              We use your submission to respond to the inquiry, understand the fit, and route the request into one of
              three lanes: Atlassian Systems, BI and Operational Reporting, or Automation and Integration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">How the form is processed</h2>
            <p className="mt-4 leading-relaxed">
              Contact form submissions are sent to leads@northlanterngroup.com. Members respond within one business day
              in Canadian working hours.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {serviceProviders.map((provider) => (
                <li key={provider}>{provider}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Retention</h2>
            <p className="mt-4 leading-relaxed">
              We keep inquiry data only as long as needed to respond, manage the relationship, and meet legal or
              operational obligations. If the inquiry becomes an engagement, the relevant records move into the client
              file.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Access, correction, and deletion</h2>
            <p className="mt-4 leading-relaxed">
              To request access, correction, or deletion of information submitted through the website, email
              {" "}
              <a href="mailto:leads@northlanterngroup.com" className="text-cyan-400 hover:text-cyan-300">
                leads@northlanterngroup.com
              </a>
              . We will respond within one business day in Canadian working hours and route the request to the right
              person.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Updates</h2>
            <p className="mt-4 leading-relaxed">
              We will update this page when the website data flow changes, including analytics, lead storage, or new
              form processing tools.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
