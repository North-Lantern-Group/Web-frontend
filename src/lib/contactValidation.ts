import { z } from "zod";

export const CONTACT_MESSAGE_MIN_LENGTH = 30;

const serviceValues = [
  "atlassian-platform",
  "bi-analytics",
  "automation-integration",
  "consultant-recovery",
  "general",
  "atlassian-systems",
  "bi-operational-reporting",
] as const;

const companySizeValues = [
  "",
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
] as const;

const optionalBoundedString = (max: number) => z.string().trim().max(max).optional();

export const contactSubmissionSchema = z
  .object({
    firstName: optionalBoundedString(80),
    lastName: optionalBoundedString(80),
    company: z.string().trim().min(1, "Company is required.").max(200),
    companySize: z.enum(companySizeValues).optional(),
    email: z
      .string()
      .trim()
      .min(1, "Work email is required.")
      .max(254)
      .email("Please enter a valid work email."),
    phone: optionalBoundedString(30),
    service: z.enum(serviceValues, {
      errorMap: () => ({ message: "Please pick what you need help with." }),
    }),
    message: z
      .string()
      .trim()
      .min(1, "Please describe what is broken or what you are planning.")
      .min(
        CONTACT_MESSAGE_MIN_LENGTH,
        `Please add at least ${CONTACT_MESSAGE_MIN_LENGTH} characters so we have enough context.`
      )
      .max(5000),
    captchaToken: z.string().trim().min(1).max(2048),
    website: optionalBoundedString(200),
    marketingConsent: z.boolean().optional().default(false),
    privacyAccepted: z.literal(true, {
      errorMap: () => ({ message: "Please accept the privacy statement to continue." }),
    }),
    sourcePage: optionalBoundedString(1000),
    referrer: optionalBoundedString(1000),
  })
  .strict();

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export type ContactField =
  | keyof ContactSubmission
  | "privacyAccepted";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export interface ContactValidationInput {
  company?: string;
  email?: string;
  service?: string;
  message?: string;
  privacyAccepted?: boolean;
}

const clientValidationSchema = contactSubmissionSchema.pick({
  company: true,
  email: true,
  service: true,
  message: true,
  privacyAccepted: true,
});

const defaultFieldMessages: Partial<Record<ContactField, string>> = {
  company: "Company is required.",
  email: "Work email is required.",
  service: "Please pick what you need help with.",
  message: "Please describe what is broken or what you are planning.",
  privacyAccepted: "Please accept the privacy statement to continue.",
};

export function getContactFieldErrors(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string") continue;
    if (errors[field as ContactField]) continue;

    errors[field as ContactField] =
      issue.message || defaultFieldMessages[field as ContactField] || "Invalid value.";
  }

  return errors;
}

export function validateContactSubmission(input: ContactValidationInput): ContactFieldErrors {
  const result = clientValidationSchema.safeParse(input);

  if (result.success) {
    return {};
  }

  return getContactFieldErrors(result.error);
}
