import { createHmac, randomUUID, timingSafeEqual } from "crypto";

type LeadEmailStatus = "sent" | "failed";

export interface LeadBackupInput {
  leadId: string;
  submittedAt: string;
  firstName: string;
  lastName: string;
  company: string;
  companySize: string;
  email: string;
  phone: string;
  service: string;
  serviceDisplay: string;
  message: string;
  marketingConsent: boolean;
  privacyAccepted: boolean;
  sourcePage: string;
  referrer: string;
  emailStatus: LeadEmailStatus;
  resendMessageId: string;
  emailError: string;
}

export interface LeadBackupResult {
  enabled: boolean;
  ok: boolean;
  status: "disabled" | "stored" | "duplicate" | "failed";
  rowNumber?: number;
  error?: string;
}

const BACKUP_SCHEMA_VERSION = 1;
const DEFAULT_TIMEOUT_MS = 4000;

export function createLeadId() {
  return `lead_${randomUUID()}`;
}

function getLeadBackupConfig() {
  const enabled = process.env.LEAD_BACKUP_ENABLED === "true";
  const url = process.env.LEAD_BACKUP_WEB_APP_URL?.trim();
  const secret = process.env.LEAD_BACKUP_HMAC_SECRET?.trim();
  const timeoutMs = Number(process.env.LEAD_BACKUP_TIMEOUT_MS || DEFAULT_TIMEOUT_MS);

  if (!enabled) {
    return { enabled: false as const };
  }

  if (!url || !secret) {
    return {
      enabled: true as const,
      configured: false as const,
      reason: "Lead backup is enabled but LEAD_BACKUP_WEB_APP_URL or LEAD_BACKUP_HMAC_SECRET is missing.",
    };
  }

  return {
    enabled: true as const,
    configured: true as const,
    url,
    secret,
    timeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : DEFAULT_TIMEOUT_MS,
  };
}

function signPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload, "utf8").digest("base64");
}

function safeErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Unknown lead backup error";
}

export async function persistLeadBackup(input: LeadBackupInput): Promise<LeadBackupResult> {
  const config = getLeadBackupConfig();

  if (!config.enabled) {
    return { enabled: false, ok: true, status: "disabled" };
  }

  if (!config.configured) {
    console.error(config.reason);
    return { enabled: true, ok: false, status: "failed", error: config.reason };
  }

  const payload = JSON.stringify({
    action: "lead.append",
    schemaVersion: BACKUP_SCHEMA_VERSION,
    sentAt: new Date().toISOString(),
    nonce: randomUUID(),
    source: "northlanterngroup.com/contact",
    lead: input,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        payload,
        signature: signPayload(payload, config.secret),
      }),
      signal: controller.signal,
      redirect: "follow",
    });

    const responseText = await response.text();
    let data: { ok?: boolean; status?: string; rowNumber?: number; error?: string } = {};

    try {
      data = JSON.parse(responseText);
    } catch {
      data = { ok: false, error: "Lead backup endpoint returned a non-JSON response." };
    }

    if (!response.ok || !data.ok) {
      return {
        enabled: true,
        ok: false,
        status: "failed",
        error: data.error || `Lead backup request failed with HTTP ${response.status}.`,
      };
    }

    return {
      enabled: true,
      ok: true,
      status: data.status === "duplicate" ? "duplicate" : "stored",
      rowNumber: data.rowNumber,
    };
  } catch (error) {
    return {
      enabled: true,
      ok: false,
      status: "failed",
      error: safeErrorMessage(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function compareSignatures(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);

  if (first.length !== second.length) {
    return false;
  }

  return timingSafeEqual(first, second);
}
