# Lead Intake Backup Architecture and SOP

Status: Active  
Owner: North Lantern Group  
Primary Google Workspace owner: hamza@northlanterngroup.com  
Backup Google Workspace/Vercel access: hello@northlanterngroup.com  
Last updated: 2026-04-26

## Purpose

North Lantern Group's website contact form already sends lead notifications
by email through Resend. Email alone is not a durable lead record: messages
can be missed, filtered, deleted, or become hard to audit later.

This architecture adds a second, company-owned backup record for every valid
contact form submission. The backup is intentionally simple: a restricted
Google Sheet receives one structured row per lead through a Google Apps Script
Web App. The public website browser never writes directly to Google Sheets.
Only the server-side Next.js contact route can create a valid signed request.

This gives the business:

- A readable lead register that non-technical operators can open in Google
  Sheets.
- A fallback record if Resend email delivery fails.
- A deduplicated lead ID that appears in both email and the Sheet.
- A low-maintenance setup using existing Google Workspace and Vercel accounts.
- No additional paid CRM or tracking subscription.

## Plain-English Summary

A visitor submits the website form. The website server checks spam protection,
validates the email, tries to send the lead email to
`leads@northlanterngroup.com`, then also sends a signed backup copy to Google.
Google Apps Script checks the signature and writes the lead to the private
Sheet. Operators use the `Dashboard` for a quick latest-leads view and `Raw
Leads` for the complete history. If the same lead is submitted twice with the
same lead ID, the Sheet does not get a duplicate raw lead row.

## What "Google Apps Script Web App" Means

Google Apps Script is Google's lightweight scripting layer for Google Workspace.
It can automate Sheets, Gmail, Drive, and related Workspace tools.

An Apps Script Web App is not a customer-facing app interface. In this setup it
is a private automation endpoint: a URL that accepts server-to-server POST
requests. The URL is public at the network layer because Google must be able to
receive the request, but it is not trusted by itself. A request is accepted only
when it includes a valid HMAC signature created by the website server using a
shared secret stored outside the repo.

## System Components

| Component | Purpose | Where it lives |
|-----------|---------|----------------|
| Public contact form | Collects visitor input, consent, CAPTCHA token, source page, and referrer | `src/components/sections/Contact.tsx` |
| Next.js contact API | Validates the submission, runs CAPTCHA/email checks, sends email, writes backup | `src/app/api/contact/route.ts` |
| Lead backup helper | Creates signed HMAC payloads and posts to Apps Script with timeout handling | `src/lib/leadBackup.ts` |
| Google Apps Script | Verifies signed requests, dedupes by lead ID, writes Sheet rows, logs events | `integrations/google-apps-script/lead-intake/Code.gs` |
| Google Sheet | Human-readable durable lead register | Google Workspace, owned by `hamza@` |
| Vercel env vars | Store runtime configuration and HMAC secret for the Next.js server | Vercel project under `hello@` |
| Apps Script properties | Store Sheet ID and matching HMAC secret for Apps Script | Apps Script project under `hamza@` |

## Data Flow

```mermaid
sequenceDiagram
  participant Visitor as Website visitor
  participant Browser as Browser contact form
  participant API as Next.js /api/contact
  participant Captcha as Google reCAPTCHA v3
  participant ZeroBounce as ZeroBounce
  participant Resend as Resend email
  participant Script as Google Apps Script Web App
  participant Sheet as NLG Website Leads Sheet

  Visitor->>Browser: Completes and submits form
  Browser->>API: POST form fields, CAPTCHA token, consent, source/referrer
  API->>Captcha: Verify CAPTCHA token
  Captcha-->>API: Human-risk score result
  API->>ZeroBounce: Validate email address
  ZeroBounce-->>API: Email status result
  API->>Resend: Send lead notification email with lead ID
  Resend-->>API: Sent ID or error
  API->>Script: POST signed backup payload
  Script->>Script: Verify HMAC, replay window, schema, lead ID
  Script->>Sheet: Append raw lead row and lead index row
  Script-->>API: stored or duplicate
  API-->>Browser: Success if email or backup path succeeded
```

## Inputs

The form/API handles these visitor-provided fields:

- First name
- Last name
- Company
- Company size
- Email
- Phone
- Area of interest
- Message
- Optional marketing consent
- Required privacy acknowledgement

The API also handles operational metadata:

- Lead ID generated server-side
- Submission timestamp generated server-side
- Resend message ID when email succeeds
- Email failure reason when Resend fails
- Source page and referrer

Source page/referrer are sanitized server-side. Arbitrary query strings and URL
fragments are removed before backup. Only standard UTM attribution parameters
are preserved.

## Processing Rules

1. The API rejects missing required fields.
2. The API rejects submissions without privacy acknowledgement.
3. The honeypot field blocks basic automated spam.
4. reCAPTCHA v3 runs server-side verification.
5. ZeroBounce email validation blocks clearly invalid, spamtrap, and disposable
   addresses.
6. The API generates a unique lead ID in `lead_<uuid>` format.
7. Resend email is sent to `leads@northlanterngroup.com` with the lead ID as
   the idempotency key, the submitter email as `replyTo`, and the lead ID in
   the email body.
8. The backup helper builds an exact JSON payload string and signs it with
   HMAC-SHA256.
9. Apps Script verifies the signature before trusting the payload.
10. Apps Script rejects expired signed payloads using a replay window.
11. Apps Script deduplicates by lead ID through the `Lead Index` sheet.
12. Apps Script writes accepted leads to `Raw Leads`, adds the lead ID to
    `Lead Index`, and records operational events in `Integration Events`.
13. If email failed but the Sheet backup succeeds, Apps Script can send a
    fallback alert to `ALERT_EMAIL`.

## Outputs

### Email Output

The `leads@northlanterngroup.com` inbox receives the lead notification when
Resend succeeds. The email is sent from the verified NLG sending domain through
Resend, uses the submitter email as `replyTo`, and includes the lead ID so
operators can match it to the Google Sheet row.

### Sheet Output

The Google Sheet contains four operating tabs:

- `Dashboard`: branded operating view with lead counts, the latest 12 leads,
  data health, and usage notes. It is intentionally bounded so it never grows
  into the lower operating blocks. It is not the database.
- `Raw Leads`: the full source-of-truth register, with one row per accepted
  lead and all intake fields, delivery status, follow-up fields, and
  `retention_until`.
- `Lead Index`: internal dedupe/index data keyed by lead ID. It maps each lead
  ID to its raw row and should normally be left alone.
- `Integration Events`: storage, duplicate, rejection, and fallback-alert
  events. This is the append-only audit/debug log.

The `Dashboard` latest-leads block is capped at 12 rows by design. When a 13th
lead arrives, the oldest dashboard row drops out of the dashboard view, but it
remains in `Raw Leads`. The dashboard table is bounded to the latest-leads area
and should not spill into the lower operating notes or data-health blocks.

The workbook design helper pre-formats the operating tabs through 1000 rows and
adds dropdown validation to the `Raw Leads` consent/status columns. If the Sheet
eventually approaches that row count, rerun `applyLeadIntakeWorkbookDesign()` or
extend the helper before relying on rows beyond the formatted range.

### API Output

The browser receives a generic success response when at least one durable path
succeeds:

- Email succeeded, backup succeeded.
- Email succeeded, backup failed.
- Email failed, backup succeeded.

The browser receives an error only when both email and backup paths fail.

## Failure Behavior

| Condition | User sees | Operator impact |
|-----------|-----------|-----------------|
| Email succeeds, backup succeeds | Success | Normal state |
| Email succeeds, backup fails | Success | Email still contains lead; server logs backup error |
| Email fails, backup succeeds | Success | Sheet contains lead marked `email_status=failed`; Apps Script can send fallback alert |
| Email fails, backup fails | Error | No durable lead path succeeded; server logs error |
| Duplicate signed request | Success | Apps Script returns `duplicate`; no duplicate raw lead row |
| Invalid signature | Failed Apps Script response | No raw lead row is written; a best-effort `rejected` event is logged |
| Expired signed request | Failed Apps Script response | No raw lead row is written; a best-effort `rejected` event is logged |
| Fallback alert fails | Success if backup stored | Lead remains in `Raw Leads`; `fallback_alert_failed` is logged |

## Security Controls

- The browser never receives the Apps Script HMAC secret.
- The real Apps Script deployment URL and HMAC secret are not committed to Git.
- Vercel stores the website-side environment variables.
- Apps Script stores the Google-side script properties.
- Requests are signed with HMAC-SHA256 over the exact JSON payload string.
- Signed payloads expire through a replay window.
- Apps Script uses `LockService` before writing rows to reduce concurrent write
  race conditions.
- Apps Script sanitizes values that begin with spreadsheet formula characters
  (`=`, `+`, `-`, `@`) to reduce spreadsheet formula injection risk.
- Lead source/referrer metadata strips arbitrary query strings and fragments.
- The Sheet is restricted to company-controlled accounts.

## Runtime Configuration

### Vercel Environment Variables

Set these in the Vercel project under `hello@northlanterngroup.com`.

| Variable | Value |
|----------|-------|
| `LEAD_BACKUP_ENABLED` | `true` in environments where backup should run |
| `LEAD_BACKUP_WEB_APP_URL` | Apps Script Web App deployment URL |
| `LEAD_BACKUP_HMAC_SECRET` | Long random shared secret; same value as Apps Script `HMAC_SECRET` |
| `LEAD_BACKUP_TIMEOUT_MS` | `4000` unless there is a measured reason to change it |

These variables should be marked sensitive.

### Apps Script Properties

Set these in Apps Script project settings.

| Property | Value |
|----------|-------|
| `SPREADSHEET_ID` | ID of the private NLG lead Sheet |
| `HMAC_SECRET` | Same value as Vercel `LEAD_BACKUP_HMAC_SECRET` |
| `ALERT_EMAIL` | `leads@northlanterngroup.com` |
| `RETENTION_MONTHS` | `24` |
| `REPLAY_WINDOW_SECONDS` | `600` |
| `RAW_SHEET_NAME` | `Raw Leads` unless changed intentionally |
| `INDEX_SHEET_NAME` | `Lead Index` unless changed intentionally |
| `EVENTS_SHEET_NAME` | `Integration Events` unless changed intentionally |

Never commit real secret values, real deployment URLs, or raw Sheet IDs unless
the repository has been explicitly approved for that internal data.

## Setup SOP

Use this only when rebuilding the integration or moving ownership.

1. Create or open the private Google Sheet under the chosen Workspace owner.
2. Name the Sheet `NLG Website Leads`.
3. Share the Sheet with the backup/admin account as editor.
4. Open Extensions -> Apps Script from that Sheet.
5. Replace the script contents with
   `integrations/google-apps-script/lead-intake/Code.gs`.
6. Save the Apps Script project.
7. Add the script properties listed above.
8. Run `setupLeadIntakeWorkbook()` once from Apps Script.
9. Complete Google's authorization flow as the Workspace owner.
10. Run `applyLeadIntakeWorkbookDesign()` once from Apps Script to create the
    branded `Dashboard`, reorder tabs, apply formatting, pre-format operating
    rows, and add lightweight dropdown validation for operational status fields.
11. Confirm the Sheet has `Dashboard`, `Raw Leads`, `Lead Index`, and
    `Integration Events`.
12. Deploy as a Web App:
    - Execute as: Me
    - Who has access: Anyone
13. Copy the Web App URL into Vercel as `LEAD_BACKUP_WEB_APP_URL`.
14. Generate a long random HMAC secret and set the same value in Vercel and Apps
    Script properties.
15. Set `LEAD_BACKUP_ENABLED=true` in Vercel.
16. Redeploy the Vercel site so the new env vars are visible to the runtime.
17. Run the validation checklist below.

## Validation Checklist

Before considering this integration healthy:

1. `npm run lint` passes.
2. `npm run build` passes.
3. A signed direct Apps Script smoke test returns `stored`.
4. Replaying the same signed payload returns `duplicate`.
5. An invalid signature returns `ok: false` and writes no raw lead row.
6. A real website form submission creates a lead email in `leads@`.
7. The same real submission creates a matching row in `Raw Leads`.
8. The lead ID in email matches the lead ID in the Sheet.
9. Vercel production deployment is complete after env changes.
10. The privacy policy still describes the actual vendors and data flow.
11. `Dashboard` shows `Latest 12 leads`, and the latest-leads table stays
    bounded above the lower operating blocks.
12. `Raw Leads`, `Lead Index`, and `Integration Events` have filters and
    pre-formatted operating rows beyond current data.
13. `Raw Leads` consent/status fields show dropdown validation.

## HMAC Secret Rotation SOP

Rotate the secret if it is exposed, if a staff/admin account is compromised, or
as part of a scheduled security hygiene review.

1. Generate a new long random secret.
2. Update Apps Script `HMAC_SECRET`.
3. Update Vercel `LEAD_BACKUP_HMAC_SECRET`.
4. Redeploy the Vercel site.
5. Run the signed smoke test.
6. Confirm invalid signatures still fail.
7. Record the date and reason for rotation in the internal operations log.

During rotation, submissions may fail backup writes briefly if Vercel and Apps
Script are temporarily out of sync. Keep the rotation window short.

## Schema Change SOP

When changing form fields, lead status fields, or Sheet columns:

1. Update `LeadBackupInput` in `src/lib/leadBackup.ts`.
2. Update the `/api/contact` payload in `src/app/api/contact/route.ts`.
3. Update `RAW_HEADERS`, `INDEX_HEADERS`, and `buildRawRow_()` in
   `integrations/google-apps-script/lead-intake/Code.gs`.
4. Increment `BACKUP_SCHEMA_VERSION` and Apps Script `schemaVersion` handling
   only if the new Apps Script can no longer understand old payloads.
5. Update this SOP.
6. Update `docs/INFRASTRUCTURE.md`.
7. Update `docs/compliance/website-compliance-checklist.md` if personal data,
   vendors, retention, or legal disclosures changed.
8. Deploy a new Apps Script version.
9. Deploy the website.
10. Run the validation checklist.

## Daily/Weekly Operating SOP

For normal operations:

1. Monitor `leads@northlanterngroup.com` for new submissions.
2. Check the `Raw Leads` Sheet when a lead email seems missing or when doing
   weekly lead review.
3. Use `Dashboard` as the normal first view for counts, the latest 12 leads,
   and data health. Use `Raw Leads` for the full history.
4. Use `lead_status`, `owner`, `next_action`, and `notes` in `Raw Leads` for light
   follow-up tracking until a dedicated CRM exists.
5. Treat the Sheet as a backup/lightweight intake register, not as a permanent
   full CRM.
6. Review rows older than the retention policy during quarterly privacy hygiene
   reviews.

## Manual Editing Rules

Operators may edit these `Raw Leads` fields during normal follow-up:

- `lead_status`
- `owner`
- `next_action`
- `notes`

Operators should not normally edit system-generated fields such as `lead_id`,
`created_at_utc`, `schema_version`, `email_status`, `resend_message_id`,
`email_error`, `backup_status`, or `retention_until`. Consent fields
(`marketing_consent` and `privacy_accepted`) should only be corrected with a
clear evidence trail because they are compliance records.

Do not manually edit `Dashboard` formulas or layout. If the dashboard is damaged
or stale, rerun `applyLeadIntakeWorkbookDesign()` from Apps Script. This updates
workbook formatting and dashboard formulas only; it does not deploy a new Web
App endpoint.

Do not manually edit `Lead Index` except during controlled cleanup or repair,
because it is the dedupe register. Do not manually edit `Integration Events`
except during controlled cleanup of known test data, because it is the
operational audit/debug log.

## Smoke-Test/Fake Lead Cleanup SOP

Smoke-test leads are useful before launch, but fake records should not remain in
the production operating register. A complete cleanup removes the same fake lead
from all places where it was written:

1. Identify the fake lead by lead ID, test email, company, and timestamp.
2. Find the matching row in `Raw Leads`.
3. Find the matching row in `Lead Index`.
4. Find relevant rows in `Integration Events`, usually `stored`, `duplicate`,
   `rejected`, or `fallback_alert_failed` events tied to that test lead.
5. Confirm the selected rows are only smoke-test data and not real submissions.
6. Ask for explicit action-time confirmation before deleting any Sheet rows.
7. After confirmation, delete the matched rows from `Raw Leads`, `Lead Index`,
   and relevant `Integration Events` rows.
8. Recheck `Dashboard` and `Raw Leads` to confirm the fake lead no longer
   appears and no unrelated lead was removed.

Never delete cloud Sheet records as an implied cleanup step. The operator must
explicitly approve the exact deletion scope at action time.

## Incident SOP

If a lead reports a form issue or if operators suspect missing leads:

1. Check Vercel deployment status.
2. Check Vercel function logs for `/api/contact`.
3. Search `leads@northlanterngroup.com` by sender email, company, or lead ID.
4. Search the Google Sheet by lead ID, email, or company.
5. Review `Integration Events` for `rejected`, `stored`, `duplicate`, or
   `fallback_alert_failed` events.
6. If Apps Script rejects valid traffic, compare Vercel
   `LEAD_BACKUP_HMAC_SECRET` with Apps Script `HMAC_SECRET`.
7. If Resend fails but Sheet backup works, follow up manually from the Sheet and
   investigate Resend separately.
8. If both paths fail, disable `LEAD_BACKUP_ENABLED` only if the backup path is
   causing user-visible failures, then fix and redeploy.

## What Was Built on 2026-04-26

The following was implemented:

- Server-side backup helper with HMAC signing and timeout handling.
- Contact API changes to generate lead IDs, use Resend idempotency, enforce
  privacy acknowledgement server-side, and persist a backup lead record.
- Frontend contact form changes to send privacy acknowledgement, source page,
  and referrer metadata.
- Google Apps Script lead intake endpoint with HMAC verification, replay window,
  dedupe index, raw lead rows, event logs, fallback alert support, and formula
  injection hardening.
- Google Sheets workbook design helper that repurposes an empty `Sheet1` into a
  branded `Dashboard` and styles the functional intake tabs without changing
  intake behavior.
- Dashboard hardening so the latest-leads block shows only the latest 12 leads,
  while `Raw Leads` remains the full register.
- Pre-formatted operating rows and dropdown validation for the Sheet fields
  operators are most likely to review or update.
- Privacy policy updates to disclose the restricted Google Sheets backup and
  source/referrer metadata.
- Infrastructure and compliance documentation updates.
- Vercel environment variables for the backup integration.
- Live Apps Script smoke tests for stored, duplicate, and invalid-signature
  behavior.

## Current Known Limits

- This is a lightweight lead backup and operational register, not a full CRM.
- Google Apps Script quotas are sufficient for expected marketing-site volume,
  but it is not designed for high-volume event tracking.
- The Sheet is manually reviewed; there is no automated lead assignment workflow
  beyond the optional Sheet fields.
- Deleting or archiving old lead rows should follow the retention policy and be
  confirmed before bulk deletion.

## Future Improvements

Consider these only when the business need is clear:

- Add Vercel Web Analytics and Speed Insights with privacy policy updates.
- Add a `/thank-you` page for free pageview-based conversion tracking.
- Add a lightweight CRM later if lead volume or follow-up ownership outgrows the
  Sheet.
- Add a scheduled Apps Script retention review/report instead of manually
  scanning old rows.
- Add a second alert path if `fallback_alert_failed` events appear.
