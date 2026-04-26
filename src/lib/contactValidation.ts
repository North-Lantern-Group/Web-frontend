export const CONTACT_MESSAGE_MIN_LENGTH = 30;

export type ContactField = "company" | "email" | "service" | "message" | "privacyAccepted";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export interface ContactValidationInput {
  company?: string;
  email?: string;
  service?: string;
  message?: string;
  privacyAccepted?: boolean;
}

export function validateContactSubmission(input: ContactValidationInput): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const message = input.message?.trim() || "";

  if (!input.company?.trim()) {
    errors.company = "Company is required.";
  }

  if (!input.email?.trim()) {
    errors.email = "Work email is required.";
  }

  if (!input.service?.trim()) {
    errors.service = "Please pick what you need help with.";
  }

  if (!message) {
    errors.message = "Please describe what is broken or what you are planning.";
  } else if (message.length < CONTACT_MESSAGE_MIN_LENGTH) {
    errors.message = `Please add at least ${CONTACT_MESSAGE_MIN_LENGTH} characters so we have enough context.`;
  }

  if (!input.privacyAccepted) {
    errors.privacyAccepted = "Please accept the privacy statement to continue.";
  }

  return errors;
}
