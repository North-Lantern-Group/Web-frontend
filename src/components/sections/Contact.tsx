"use client";

import { memo, useState } from "react";
import PhoneInput from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import { getExampleNumber } from "libphonenumber-js/mobile";
import examples from "libphonenumber-js/mobile/examples";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { IconArrow, IconCalendar, IconLinkedIn, IconMail } from "@/components/icons/PracticeIcons";
import { BOOKING_URL, LINKEDIN_URL, EMAIL_GENERAL } from "@/config/site";

function getPhoneFormatHint(country: Country | undefined): string {
  if (!country) return "";
  const example = getExampleNumber(country, examples);
  if (!example) return "";
  const intl = example.formatInternational();
  const withoutCode = intl.replace(/^\+\d+\s/, "");
  return withoutCode.replace(/\d/g, "X");
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const ContactForm = memo(function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    companySize: "",
    email: "",
    service: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>("CA");
  const [emailError, setEmailError] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const validateEmail = (email: string): string => {
    if (!email) return "Email is required";
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    const domain = email.split("@")[1]?.toLowerCase();
    if (domain) {
      const invalid = ["gmail.con", "gmial.com", "gmal.com", "hotmail.con", "yahoo.con", "outlok.com"];
      if (invalid.includes(domain)) return "Please check your email domain for typos";
    }
    return "";
  };

  const validatePhone = (phone: string | undefined): string => {
    if (!phone) return "";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) return "Phone number is too short";
    if (digits.length > 15) return "Phone number is too long";
    if (/^(\d)\1+$/.test(digits)) return "Please enter a valid phone number";
    if (/^0{5,}|^1234567890$|^0123456789$/.test(digits)) return "Please enter a valid phone number";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setFormMessage("");
    setEmailError("");
    setPhoneError("");

    const emailErr = validateEmail(formData.email);
    if (emailErr) {
      setEmailError(emailErr);
      setFormStatus("idle");
      return;
    }

    const phoneErr = validatePhone(phoneValue);
    if (phoneErr) {
      setPhoneError(phoneErr);
      setFormStatus("idle");
      return;
    }

    if (!privacyAccepted) {
      setFormMessage("Please accept the privacy statement to continue.");
      setFormStatus("error");
      return;
    }

    if (!executeRecaptcha) {
      setFormMessage("Security check not ready. Please refresh and try again.");
      setFormStatus("error");
      return;
    }

    try {
      const captchaToken = await executeRecaptcha("contact_form_submit");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: phoneValue,
          captchaToken,
          website: honeypot,
          marketingConsent,
          privacyAccepted,
          sourcePage: window.location.href,
          referrer: document.referrer,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setFormStatus("success");
        setFormMessage("Thank you. We will reply within one business day.");
        setFormData({
          firstName: "",
          lastName: "",
          company: "",
          companySize: "",
          email: "",
          service: "",
          message: "",
        });
        setPhoneValue(undefined);
        setPrivacyAccepted(false);
        setMarketingConsent(false);
      } else {
        setFormStatus("error");
        setFormMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("error");
      setFormMessage("Failed to send message. Please try again later.");
    }
  };

  return (
    <form className="nlg-form" onSubmit={handleSubmit} noValidate>
      <div className="nlg-form-row">
        <div className="nlg-field">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="First name"
          />
        </div>
        <div className="nlg-field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="nlg-form-row">
        <div className="nlg-field">
          <label htmlFor="company">
            Company <span className="nlg-req">*</span>
          </label>
          <input
            id="company"
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Company"
          />
        </div>
        <div className="nlg-field">
          <label htmlFor="companySize">Company size</label>
          <select
            id="companySize"
            value={formData.companySize}
            onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
          >
            <option value="">Select size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
      </div>

      <div className="nlg-field">
        <label htmlFor="email">
          Work email <span className="nlg-req">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            setEmailError("");
          }}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "email-error" : undefined}
          className={emailError ? "nlg-input-error" : ""}
          placeholder="you@company.com"
        />
        {emailError && (
          <p id="email-error" className="nlg-field-error">
            {emailError}
          </p>
        )}
      </div>

      <div className="nlg-field">
        <label htmlFor="phone">Phone (optional)</label>
        <PhoneInput
          international
          defaultCountry="CA"
          flags={flags}
          value={phoneValue}
          onChange={(v) => {
            setPhoneValue(v);
            setPhoneError("");
          }}
          onCountryChange={(c) => {
            if (c) setSelectedCountry(c);
          }}
          className={`nlg-phone ${phoneError ? "nlg-phone-error" : ""}`}
        />
        {phoneError && (
          <p className="nlg-field-error">
            {phoneError}
            {getPhoneFormatHint(selectedCountry) && (
              <span>, format: {getPhoneFormatHint(selectedCountry)}</span>
            )}
          </p>
        )}
      </div>

      <div className="nlg-field">
        <label htmlFor="service">
          What you need <span className="nlg-req">*</span>
        </label>
        <select
          id="service"
          required
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        >
          <option value="" disabled>
            Pick a practice
          </option>
          <option value="atlassian-platform">Atlassian Platform</option>
          <option value="bi-analytics">BI and Analytics</option>
          <option value="automation-integration">Automation and Integration</option>
          <option value="consultant-recovery">Our last consultant left us worse off</option>
          <option value="general">General inquiry</option>
        </select>
      </div>

      <div className="nlg-field">
        <label htmlFor="message">
          What is broken, or what are you planning? <span className="nlg-req">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          required
          minLength={30}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="What is broken, what changed, what a useful first conversation needs to cover."
        />
      </div>

      <div className="nlg-field nlg-privacy">
        <label>
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
          />
          <span>
            I have read the North Lantern Group{" "}
            <a href="/privacy">Privacy Policy</a> and{" "}
            <a href="/terms">Terms of Use</a>, and I consent to NLG
            processing the information I submit here to respond to my
            inquiry. <span className="nlg-req">*</span>
          </span>
        </label>
      </div>

      <div className="nlg-field nlg-privacy">
        <label>
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
          />
          <span>
            Optional: I would like to receive occasional NLG updates about
            Atlassian, BI, and automation practice. I can unsubscribe at any
            time.
          </span>
        </label>
      </div>

      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {formMessage && (
        <div className={`nlg-form-status nlg-form-status-${formStatus}`}>{formMessage}</div>
      )}

      <button
        type="submit"
        disabled={formStatus === "submitting"}
        className="nlg-btn nlg-btn-primary nlg-btn-lg nlg-form-submit"
      >
        {formStatus === "submitting" ? "Sending..." : "Send message"}
        <IconArrow size={16} />
      </button>

      <p className="nlg-form-captcha-note">
        This form is protected by invisible Google reCAPTCHA v3 and uses
        ZeroBounce to validate email addresses. Use is subject to
        Google&apos;s{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          terms of service
        </a>
        . For privacy questions, email{" "}
        <a href="mailto:privacy@northlanterngroup.com">
          privacy@northlanterngroup.com
        </a>
        .
      </p>
    </form>
  );
});

function Contact() {
  return (
    <section className="nlg-contact" id="contact">
      <div className="nlg-wrap nlg-contact-grid">
        <div className="nlg-contact-left">
          <h2 className="nlg-cta-text nlg-reveal">
            Tell us what is broken, or what you are planning.
            <span className="nlg-dim">
              We reply within one business day, with a short note. Not a 47-slide proposal deck.
            </span>
          </h2>
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
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

const ContactSection = memo(function ContactSection() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) return <Contact />;
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{ async: true, defer: true, appendTo: "head" }}
    >
      <Contact />
    </GoogleReCaptchaProvider>
  );
});

export default ContactSection;
