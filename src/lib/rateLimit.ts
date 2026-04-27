import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type CheckRateLimitResult = {
  allowed: boolean;
  retryAfter?: number;
};

type Limiters = {
  minute: Ratelimit;
  hour: Ratelimit;
};

let cachedLimiters: Limiters | null = null;

class RateLimitConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitConfigurationError";
  }
}

function isProduction() {
  return process.env.VERCEL_ENV === "production";
}

function logStructuredWarning(reason: string, error?: unknown) {
  const message = error instanceof Error
    ? error.message
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
      .replace(/https?:\/\/\S+/g, "[url]")
      .slice(0, 200)
    : undefined;
  console.warn(
    JSON.stringify({
      level: "warn",
      service: "rate_limit",
      reason,
      ...(message ? { errorMessage: message } : {}),
    })
  );
}

function getLimiters(): Limiters | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (isProduction()) {
      throw new RateLimitConfigurationError("Upstash Redis is not configured.");
    }

    logStructuredWarning("missing_upstash_env");
    return null;
  }

  if (!cachedLimiters) {
    const redis = new Redis({ url, token });
    cachedLimiters = {
      minute: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "60 s"),
        prefix: "contact:ip:60s",
      }),
      hour: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, "3600 s"),
        prefix: "contact:ip:3600s",
      }),
    };
  }

  return cachedLimiters;
}

export async function checkRateLimit(ip: string): Promise<CheckRateLimitResult> {
  if (process.env.CONTACT_RATE_LIMIT_ENABLED === "false") {
    return { allowed: true };
  }

  const limiters = getLimiters();
  if (!limiters) {
    return { allowed: true };
  }

  try {
    const [minute, hour] = await Promise.all([
      limiters.minute.limit(ip),
      limiters.hour.limit(ip),
    ]);

    if (minute.success && hour.success) {
      return { allowed: true };
    }

    const reset = Math.max(minute.reset, hour.reset);
    const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));

    return { allowed: false, retryAfter };
  } catch (error) {
    if (isProduction()) {
      throw error;
    }

    logStructuredWarning("upstash_check_failed", error);
    return { allowed: true };
  }
}
