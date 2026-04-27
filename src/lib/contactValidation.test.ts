import { describe, expect, it } from "vitest";
import {
  contactSubmissionSchema,
  getContactFieldErrors,
  validateContactSubmission,
} from "./contactValidation";

const validSubmission = {
  firstName: "Ada",
  lastName: "Lovelace",
  company: "Analytical Engines Inc.",
  companySize: "11-50",
  email: "audit@northlanterngroup.com",
  phone: "+14165550123",
  service: "general",
  message: "We need help improving a production workflow.",
  captchaToken: "captcha-token",
  website: "",
  marketingConsent: false,
  privacyAccepted: true,
  sourcePage: "https://www.northlanterngroup.com/",
  referrer: "https://www.northlanterngroup.com/",
};

describe("contactSubmissionSchema", () => {
  it.each(["company", "email", "service", "message", "captchaToken", "privacyAccepted"] as const)(
    "returns a field-specific error when %s is missing",
    (field) => {
      const submission = { ...validSubmission };
      delete submission[field];

      const result = contactSubmissionSchema.safeParse(submission);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(getContactFieldErrors(result.error)).toHaveProperty(field);
      }
    }
  );

  it.each([
    ["firstName", "a".repeat(81)],
    ["lastName", "a".repeat(81)],
    ["company", "a".repeat(201)],
    ["email", `${"a".repeat(250)}@x.com`],
    ["phone", "1".repeat(31)],
    ["message", "a".repeat(5001)],
    ["captchaToken", "a".repeat(2049)],
    ["website", "a".repeat(201)],
    ["sourcePage", "a".repeat(1001)],
    ["referrer", "a".repeat(1001)],
  ] as const)("returns a field-specific error when %s exceeds its max length", (field, value) => {
    const result = contactSubmissionSchema.safeParse({
      ...validSubmission,
      [field]: value,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(getContactFieldErrors(result.error)).toHaveProperty(field);
    }
  });

  it("rejects an unknown service enum value", () => {
    const result = contactSubmissionSchema.safeParse({
      ...validSubmission,
      service: "made-up-service",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(getContactFieldErrors(result.error)).toHaveProperty("service");
    }
  });

  it("accepts legacy service enum values", () => {
    const result = contactSubmissionSchema.safeParse({
      ...validSubmission,
      service: "atlassian-systems",
    });

    expect(result.success).toBe(true);
  });

  it("rejects privacyAccepted false", () => {
    const result = contactSubmissionSchema.safeParse({
      ...validSubmission,
      privacyAccepted: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(getContactFieldErrors(result.error)).toHaveProperty("privacyAccepted");
    }
  });

  it("rejects unknown extra fields", () => {
    const result = contactSubmissionSchema.safeParse({
      ...validSubmission,
      extra: "not allowed",
    });

    expect(result.success).toBe(false);
  });

  it("keeps the frontend helper limited to visible contact fields", () => {
    expect(
      validateContactSubmission({
        company: "Analytical Engines Inc.",
        email: "audit@northlanterngroup.com",
        service: "general",
        message: "We need help improving a production workflow.",
        privacyAccepted: true,
      })
    ).toEqual({});
  });
});
