"use client";

import { useState, memo } from "react";
import PhoneInput from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import { getExampleNumber } from "libphonenumber-js/mobile";
import examples from "libphonenumber-js/mobile/examples";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Clock, MapPin, UserCheck } from "lucide-react";

function getPhoneFormatHint(country: Country | undefined): string {
  if (!country) return "";
  const example = getExampleNumber(country, examples);
  if (!example) return "";
  // Use international format and strip the "+{code} " prefix so the hint
  // matches what users type after the country code in the input.
  const intl = example.formatInternational(); // e.g. "+971 50 123 4567"
  const withoutCode = intl.replace(/^\+\d+\s/, ""); // e.g. "50 123 4567"
  return withoutCode.replace(/\d/g, "X");
}

interface ContactProps {
  isDarkMode: boolean;
}

// Inner component that uses the reCAPTCHA hook
const ContactForm = memo(function ContactForm({ isDarkMode }: ContactProps) {
  const fieldClass = "w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:shadow-[0_0_0_6px_rgba(0,212,255,0.12)] transition-all duration-[160ms] text-white placeholder-neutral-600";
  const selectClass = "w-full px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:shadow-[0_0_0_6px_rgba(0,212,255,0.12)] transition-all duration-[160ms] text-white";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    companySize: "",
    email: "",
    service: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>("US");
  const [emailError, setEmailError] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // reCAPTCHA v3 hook
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Country code to expected phone length range [min, max] (digits after country code)
  // Sorted by code length (longest first) to match more specific codes first
  const countryPhoneLengths: [string, number, number][] = [
    // 4-digit country codes
    ['1684', 7, 7],   // American Samoa
    ['1670', 7, 7],   // Northern Mariana Islands
    ['1671', 7, 7],   // Guam
    ['1787', 7, 7],   // Puerto Rico
    ['1939', 7, 7],   // Puerto Rico alt
    ['1340', 7, 7],   // US Virgin Islands
    // 3-digit country codes
    ['971', 8, 9],    // UAE
    ['966', 8, 9],    // Saudi Arabia
    ['965', 7, 8],    // Kuwait
    ['974', 7, 8],    // Qatar
    ['973', 7, 8],    // Bahrain
    ['968', 7, 8],    // Oman
    ['962', 8, 9],    // Jordan
    ['961', 7, 8],    // Lebanon
    ['964', 10, 10],  // Iraq
    ['963', 8, 9],    // Syria
    ['852', 8, 8],    // Hong Kong
    ['853', 8, 8],    // Macau
    ['886', 9, 9],    // Taiwan
    ['880', 10, 10],  // Bangladesh
    ['234', 10, 10],  // Nigeria
    ['254', 9, 9],    // Kenya
    ['255', 9, 9],    // Tanzania
    ['256', 9, 9],    // Uganda
    ['251', 9, 9],    // Ethiopia
    ['233', 9, 9],    // Ghana
    ['212', 9, 9],    // Morocco
    ['213', 9, 9],    // Algeria
    ['216', 8, 8],    // Tunisia
    ['218', 9, 9],    // Libya
    ['353', 9, 9],    // Ireland
    ['354', 7, 7],    // Iceland
    ['358', 9, 10],   // Finland
    ['372', 7, 8],    // Estonia
    ['370', 8, 8],    // Lithuania
    ['371', 8, 8],    // Latvia
    ['380', 9, 9],    // Ukraine
    ['375', 9, 9],    // Belarus
    ['373', 8, 8],    // Moldova
    ['374', 8, 8],    // Armenia
    ['994', 9, 9],    // Azerbaijan
    ['995', 9, 9],    // Georgia
    ['998', 9, 9],    // Uzbekistan
    // 2-digit country codes
    ['92', 10, 10],   // Pakistan
    ['91', 10, 10],   // India
    ['90', 10, 10],   // Turkey
    ['86', 11, 11],   // China
    ['84', 9, 10],    // Vietnam
    ['82', 9, 10],    // South Korea
    ['81', 10, 10],   // Japan
    ['66', 9, 9],     // Thailand
    ['65', 8, 8],     // Singapore
    ['64', 8, 9],     // New Zealand
    ['63', 10, 10],   // Philippines
    ['62', 9, 12],    // Indonesia
    ['61', 9, 9],     // Australia
    ['60', 9, 10],    // Malaysia
    ['58', 10, 10],   // Venezuela
    ['57', 10, 10],   // Colombia
    ['56', 9, 9],     // Chile
    ['55', 10, 11],   // Brazil
    ['54', 10, 10],   // Argentina
    ['53', 8, 8],     // Cuba
    ['52', 10, 10],   // Mexico
    ['51', 9, 9],     // Peru
    ['49', 10, 11],   // Germany
    ['48', 9, 9],     // Poland
    ['47', 8, 8],     // Norway
    ['46', 9, 9],     // Sweden
    ['45', 8, 8],     // Denmark
    ['44', 10, 10],   // UK
    ['43', 10, 11],   // Austria
    ['41', 9, 9],     // Switzerland
    ['40', 9, 9],     // Romania
    ['39', 9, 10],    // Italy
    ['36', 9, 9],     // Hungary
    ['34', 9, 9],     // Spain
    ['33', 9, 9],     // France
    ['32', 8, 9],     // Belgium
    ['31', 9, 9],     // Netherlands
    ['30', 10, 10],   // Greece
    ['27', 9, 9],     // South Africa
    ['20', 10, 10],   // Egypt
    ['7', 10, 10],    // Russia, Kazakhstan
    ['1', 10, 10],    // US, Canada, Caribbean
  ];

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';

    // Comprehensive email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    // Check for common typos in domain
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain) {
      const invalidDomains = ['gmail.con', 'gmial.com', 'gmal.com', 'hotmail.con', 'yahoo.con', 'outlok.com'];
      if (invalidDomains.includes(domain)) {
        return 'Please check your email domain for typos';
      }
    }

    return '';
  };

  const validatePhone = (phone: string | undefined): string => {
    if (!phone) return ''; // Phone is optional

    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');

    // Check minimum length
    if (digitsOnly.length < 10) {
      return 'Phone number is too short';
    }

    // Check maximum length (no phone number should be more than 15 digits per E.164)
    if (digitsOnly.length > 15) {
      return 'Phone number is too long';
    }

    // Check if it's all the same digit (e.g., 0000000000, 1111111111)
    if (/^(\d)\1+$/.test(digitsOnly)) {
      return 'Please enter a valid phone number';
    }

    // Check for obvious fake patterns
    if (/^0{5,}|^1234567890$|^0123456789$/.test(digitsOnly)) {
      return 'Please enter a valid phone number';
    }

    // Validate based on country code (check longest codes first)
    for (const [countryCode, minLength, maxLength] of countryPhoneLengths) {
      if (digitsOnly.startsWith(countryCode)) {
        const numberWithoutCode = digitsOnly.slice(countryCode.length);

        if (numberWithoutCode.length < minLength) {
          return `Please enter at least ${minLength} digits after +${countryCode}`;
        }
        if (numberWithoutCode.length > maxLength) {
          return `Too many digits. Enter at most ${maxLength} digits after +${countryCode}`;
        }
        return '';
      }
    }

    // For unknown country codes, just enforce reasonable max length
    if (digitsOnly.length > 15) {
      return 'Phone number is too long (max 15 digits)';
    }

    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormMessage('');
    setEmailError('');
    setPhoneError('');

    // Validate email
    const emailValidationError = validateEmail(formData.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      setFormStatus('idle');
      return;
    }

    // Validate phone
    const phoneValidationError = validatePhone(phoneValue);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      setFormStatus('idle');
      return;
    }

    // Check privacy policy acceptance
    if (!privacyAccepted) {
      setFormMessage('Please accept the Privacy Statement to continue');
      setFormStatus('error');
      return;
    }

    // Execute reCAPTCHA v3 and get token
    if (!executeRecaptcha) {
      setFormMessage('reCAPTCHA not ready. Please refresh and try again.');
      setFormStatus('error');
      return;
    }

    try {
      // Execute reCAPTCHA with action name for better security
      const captchaToken = await executeRecaptcha('contact_form_submit');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, phone: phoneValue, captchaToken, website: honeypot }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormMessage('Thank you. We will respond within one business day in Canadian working hours.');
        setFormData({ firstName: '', lastName: '', company: '', companySize: '', email: '', service: '', message: '' });
        setPhoneValue(undefined);
        setPrivacyAccepted(false);
      } else {
        setFormStatus('error');
        // Show the actual error from the API
        setFormMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setFormStatus('error');
      setFormMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    /* Contact Section */
    <section id="contact" className="py-16 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        {/* Centered Header */}
        <div className="text-center mb-10 md:mb-16 reveal">
          <h2 className="text-2xl md:text-5xl font-medium text-white tracking-tight">Tell us what needs fixing.</h2>
          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            We respond within one business day in Canadian working hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-neutral-900/60 p-4 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-400" strokeWidth={1.5} />
              <span>Atlassian consulting · Canada</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-cyan-400" strokeWidth={1.5} />
              <span>Senior delivery · No handoffs after scoping</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" strokeWidth={1.5} />
              <span>Response within one business day</span>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="p-5 md:p-8 rounded-xl bg-neutral-900 border border-white/10 reveal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-neutral-300">First name</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={fieldClass}
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-neutral-300">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={fieldClass}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2 text-neutral-300">Company <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={fieldClass}
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label htmlFor="companySize" className="block text-sm font-medium mb-2 text-neutral-300">Company Size</label>
                <select
                  id="companySize"
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className={selectClass}
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

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-300">Work email <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setEmailError('');
                }}
                className={`${fieldClass} ${emailError ? 'border-red-500/50' : ''}`}
                placeholder="john@acme.com"
              />
              {emailError && (
                <p className="mt-1 text-xs text-red-400">{emailError}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-2 text-neutral-300">Phone</label>
              <PhoneInput
                international
                defaultCountry="US"
                flags={flags}
                value={phoneValue}
                onChange={(value) => {
                  setPhoneValue(value);
                  setPhoneError('');
                }}
                onCountryChange={(country) => {
                  if (country) setSelectedCountry(country);
                }}
                className={`phone-input-dark ${phoneError ? 'phone-input-error' : ''}`}
              />
              {phoneError && (
                <p className="mt-1 text-xs text-red-400">
                  {phoneError}
                  {getPhoneFormatHint(selectedCountry) && (
                    <span>, format: {getPhoneFormatHint(selectedCountry)}</span>
                  )}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="service" className="block text-sm font-medium mb-2 text-neutral-300">Area of Interest <span className="text-red-500">*</span></label>
              <select
                id="service"
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className={selectClass}
              >
                <option value="" disabled>Select an area</option>
                <option value="atlassian-systems">Atlassian Systems</option>
                <option value="bi-operational-reporting">BI and Operational Reporting</option>
                <option value="automation-integration">Automation and Integration</option>
                <option value="consultant-recovery">Our last consultant left us worse off</option>
                <option value="general">General inquiry</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-300">What needs fixing? <span className="text-red-500">*</span></label>
              <textarea
                id="message"
                rows={4}
                required
                minLength={30}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${fieldClass} resize-none`}
                placeholder="Tell us what is broken, what changed, and what a useful first conversation needs to cover."
              />
            </div>

            <div className="mb-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-white/10 bg-black text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                />
                <span className="text-sm text-neutral-400">
                  By submitting this form, I confirm that I have read and understood the North Lantern Group <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Statement</a>. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Honeypot field - hidden from real users, catches bots that auto-fill */}
            <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* reCAPTCHA v3 is invisible - no checkbox needed */}
            {/* Protected by reCAPTCHA badge shown automatically */}

            {formMessage && (
              <div className={`mb-4 p-4 rounded-lg text-sm ${
                formStatus === 'success'
                  ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}>
                {formMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="nlg-shimmer-button relative w-full overflow-hidden py-4 px-8 bg-gradient-to-br from-cyan-400 to-teal-600 text-neutral-950 font-semibold rounded-lg transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.35)] focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{formStatus === 'submitting' ? 'Sending...' : 'Send message'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

// Wrapper component that provides the reCAPTCHA context
const Contact = memo(function Contact({ isDarkMode }: ContactProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // If no site key in dev, render form without reCAPTCHA
  if (!siteKey) {
    return <ContactForm isDarkMode={isDarkMode} />;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      <ContactForm isDarkMode={isDarkMode} />
    </GoogleReCaptchaProvider>
  );
});

export default Contact;
