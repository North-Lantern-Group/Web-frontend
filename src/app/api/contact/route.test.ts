import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const routeMocks = vi.hoisted(() => ({
  resendSend: vi.fn(),
  createLeadId: vi.fn(),
  persistLeadBackup: vi.fn(),
  renderContactLeadEmail: vi.fn(),
  fetch: vi.fn(),
  recaptchaResponse: {
    success: true,
    score: 0.9,
    action: "contact_form_submit",
    hostname: "www.northlanterngroup.com",
  },
  zeroBounceResponse: { status: "valid" },
}));

const upstashState = vi.hoisted(() => ({
  buckets: new Map<string, { count: number; reset: number }>(),
  redisConfigs: [] as unknown[],
}));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: routeMocks.resendSend,
    },
  })),
}));

vi.mock("@/lib/leadBackup", () => ({
  createLeadId: routeMocks.createLeadId,
  persistLeadBackup: routeMocks.persistLeadBackup,
}));

vi.mock("@/lib/contactEmail", () => ({
  renderContactLeadEmail: routeMocks.renderContactLeadEmail,
}));

vi.mock("@upstash/redis", () => ({
  Redis: class MockRedis {
    constructor(config: unknown) {
      upstashState.redisConfigs.push(config);
    }
  },
}));

vi.mock("@upstash/ratelimit", () => {
  function windowMs(value: string) {
    if (value === "3600 s") return 3_600_000;
    if (value === "60 s") return 60_000;
    throw new Error(`Unexpected window: ${value}`);
  }

  class MockRatelimit {
    private readonly limitCount: number;
    private readonly window: number;
    private readonly prefix: string;

    static slidingWindow(tokens: number, window: string) {
      return { tokens, window };
    }

    constructor(config: { limiter: { tokens: number; window: string }; prefix: string }) {
      this.limitCount = config.limiter.tokens;
      this.window = windowMs(config.limiter.window);
      this.prefix = config.prefix;
    }

    async limit(identifier: string) {
      const key = `${this.prefix}:${identifier}`;
      const now = Date.now();
      const existing = upstashState.buckets.get(key);
      const bucket =
        existing && existing.reset > now
          ? existing
          : { count: 0, reset: now + this.window };

      bucket.count += 1;
      upstashState.buckets.set(key, bucket);

      return {
        success: bucket.count <= this.limitCount,
        limit: this.limitCount,
        remaining: Math.max(0, this.limitCount - bucket.count),
        reset: bucket.reset,
      };
    }
  }

  return { Ratelimit: MockRatelimit };
});

const validSubmission = {
  firstName: "Ada",
  lastName: "Lovelace",
  company: "Audit Synthetic Test",
  companySize: "11-50",
  email: "audit@northlanterngroup.com",
  phone: "+14165550123",
  service: "general",
  message: "Read-only audit verification probe; safe to delete.",
  captchaToken: "captcha-token",
  website: "",
  marketingConsent: false,
  privacyAccepted: true,
  sourcePage: "https://www.northlanterngroup.com/",
  referrer: "https://www.northlanterngroup.com/",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function resetEnv() {
  for (const key of [
    "VERCEL_ENV",
    "CONTACT_RATE_LIMIT_ENABLED",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RECAPTCHA_SECRET_KEY",
    "RESEND_API_KEY",
    "ZEROBOUNCE_API_KEY",
    "DEBUG_RECAPTCHA",
  ]) {
    delete process.env[key];
  }

  process.env.VERCEL_ENV = "preview";
  process.env.CONTACT_RATE_LIMIT_ENABLED = "true";
  process.env.UPSTASH_REDIS_REST_URL = "https://upstash.test";
  process.env.UPSTASH_REDIS_REST_TOKEN = "upstash-token";
  process.env.RECAPTCHA_SECRET_KEY = "recaptcha-secret";
  process.env.RESEND_API_KEY = "resend-key";
  process.env.ZEROBOUNCE_API_KEY = "zerobounce-key";
}

function makeRequest(body: unknown = validSubmission, headers: Record<string, string> = {}) {
  return new Request("https://www.northlanterngroup.com/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.10, 198.51.100.10",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

async function loadPost() {
  const mod = await import("./route");
  return mod.POST;
}

async function post(body: unknown = validSubmission, headers: Record<string, string> = {}) {
  const POST = await loadPost();
  return POST(makeRequest(body, headers));
}

beforeEach(() => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-04-27T12:00:00.000Z"));
  resetEnv();
  upstashState.buckets.clear();
  upstashState.redisConfigs.length = 0;
  routeMocks.resendSend.mockReset();
  routeMocks.resendSend.mockResolvedValue({ data: { id: "email_123" }, error: null });
  routeMocks.createLeadId.mockReset();
  routeMocks.createLeadId.mockReturnValue("lead_test");
  routeMocks.persistLeadBackup.mockReset();
  routeMocks.persistLeadBackup.mockResolvedValue({
    enabled: true,
    ok: true,
    status: "stored",
  });
  routeMocks.renderContactLeadEmail.mockReset();
  routeMocks.renderContactLeadEmail.mockReturnValue({ text: "text", html: "<p>html</p>" });
  routeMocks.recaptchaResponse = {
    success: true,
    score: 0.9,
    action: "contact_form_submit",
    hostname: "www.northlanterngroup.com",
  };
  routeMocks.zeroBounceResponse = { status: "valid" };
  routeMocks.fetch.mockReset();
  routeMocks.fetch.mockImplementation(async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("google.com/recaptcha")) {
      return jsonResponse(routeMocks.recaptchaResponse);
    }
    if (url.includes("zerobounce.net")) {
      return jsonResponse(routeMocks.zeroBounceResponse);
    }
    throw new Error(`Unexpected fetch: ${url}`);
  });
  vi.stubGlobal("fetch", routeMocks.fetch);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
  vi.spyOn(console, "log").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("POST /api/contact body cap", () => {
  it("returns 413 when content-length is 16385", async () => {
    const response = await post(validSubmission, { "content-length": "16385" });

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({ error: "Request body too large." });
  });

  it("proceeds when content-length is 16384", async () => {
    const response = await post(validSubmission, { "content-length": "16384" });

    expect(response.status).toBe(200);
  });

  it("proceeds when content-length is missing", async () => {
    const response = await post();

    expect(response.status).toBe(200);
  });
});

describe("POST /api/contact rate limiting", () => {
  it("allows 5 requests within 60 seconds and rejects the 6th", async () => {
    for (let i = 0; i < 5; i += 1) {
      const response = await post();
      expect(response.status).toBe(200);
    }

    const response = await post();

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBeTruthy();
    await expect(response.json()).resolves.toEqual({
      error: "Too many requests. Please wait and try again.",
    });
  });

  it("rejects the 21st request within 3600 seconds", async () => {
    for (let i = 0; i < 20; i += 1) {
      const response = await post();
      expect(response.status).toBe(200);
      if ((i + 1) % 5 === 0) {
        vi.advanceTimersByTime(61_000);
      }
    }

    const response = await post();

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBeTruthy();
  });

  it("bypasses rate limiting when CONTACT_RATE_LIMIT_ENABLED is false", async () => {
    process.env.CONTACT_RATE_LIMIT_ENABLED = "false";
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const response = await post();

    expect(response.status).toBe(200);
    expect(upstashState.redisConfigs).toHaveLength(0);
  });

  it("fails closed when Upstash env is missing in production", async () => {
    process.env.VERCEL_ENV = "production";
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const response = await post();

    expect(response.status).toBe(500);
  });

  it("warns and proceeds when Upstash env is missing outside production", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const response = await post();

    expect(response.status).toBe(200);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('"reason":"missing_upstash_env"')
    );
  });
});

describe("POST /api/contact fail-closed behavior", () => {
  it("returns 500 when production is missing RECAPTCHA_SECRET_KEY", async () => {
    process.env.VERCEL_ENV = "production";
    delete process.env.RECAPTCHA_SECRET_KEY;

    const response = await post();

    expect(response.status).toBe(500);
  });

  it("returns 500 when production is missing RESEND_API_KEY", async () => {
    process.env.VERCEL_ENV = "production";
    delete process.env.RESEND_API_KEY;

    const response = await post();

    expect(response.status).toBe(500);
  });

  it("allows non-production submissions without RECAPTCHA_SECRET_KEY and logs a warning", async () => {
    delete process.env.RECAPTCHA_SECRET_KEY;

    const response = await post();

    expect(response.status).toBe(200);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('"reason":"missing_secret_key_non_production"')
    );
  });
});

describe("POST /api/contact captcha enforcement", () => {
  it("rejects action mismatch in production", async () => {
    process.env.VERCEL_ENV = "production";
    routeMocks.recaptchaResponse = {
      success: true,
      score: 0.9,
      action: "wrong_action",
      hostname: "www.northlanterngroup.com",
    };

    const response = await post();

    expect(response.status).toBe(400);
  });

  it("rejects hostname mismatch in production", async () => {
    process.env.VERCEL_ENV = "production";
    routeMocks.recaptchaResponse = {
      success: true,
      score: 0.9,
      action: "contact_form_submit",
      hostname: "preview.northlanterngroup.com",
    };

    const response = await post();

    expect(response.status).toBe(400);
  });

  it("rejects scores below 0.5", async () => {
    routeMocks.recaptchaResponse = {
      success: true,
      score: 0.1,
      action: "contact_form_submit",
      hostname: "www.northlanterngroup.com",
    };

    const response = await post();

    expect(response.status).toBe(400);
  });
});

describe("POST /api/contact validation and honeypot", () => {
  it("returns 400 for a 5001-character message", async () => {
    const response = await post({
      ...validSubmission,
      message: "a".repeat(5001),
    });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.fieldErrors).toHaveProperty("message");
  });

  it("returns 400 for an unknown service enum value", async () => {
    const response = await post({
      ...validSubmission,
      service: "made-up-service",
    });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.fieldErrors).toHaveProperty("service");
  });

  it("accepts legacy service values and maps them downstream", async () => {
    const response = await post({
      ...validSubmission,
      service: "atlassian-systems",
    });

    expect(response.status).toBe(200);
    expect(routeMocks.renderContactLeadEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        serviceDisplay: "Atlassian Platform",
      })
    );
  });

  it("returns silent success when website honeypot is filled", async () => {
    process.env.CONTACT_RATE_LIMIT_ENABLED = "false";

    const response = await post({
      ...validSubmission,
      website: "anything",
    });

    await expect(response.json()).resolves.toEqual({
      success: true,
      leadId: "lead_test",
      emailStatus: "sent",
      backupStatus: "stored",
    });
    expect(response.status).toBe(200);
  });

  it("does not call Resend, ZeroBounce, or lead backup when website honeypot is filled", async () => {
    process.env.CONTACT_RATE_LIMIT_ENABLED = "false";

    await post({
      ...validSubmission,
      website: "anything",
    });

    expect(routeMocks.resendSend).not.toHaveBeenCalled();
    expect(routeMocks.fetch).not.toHaveBeenCalled();
    expect(routeMocks.persistLeadBackup).not.toHaveBeenCalled();
  });
});
