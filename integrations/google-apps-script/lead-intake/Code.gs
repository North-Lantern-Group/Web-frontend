/**
 * North Lantern Group website lead intake endpoint.
 *
 * Deploy this file as a Google Apps Script Web App under a company Workspace
 * account. The public website never calls this URL directly; the Next.js
 * /api/contact route signs a server-side payload and POSTs it here.
 */

const RAW_SHEET_NAME_DEFAULT = 'Raw Leads';
const INDEX_SHEET_NAME_DEFAULT = 'Lead Index';
const EVENTS_SHEET_NAME_DEFAULT = 'Integration Events';

const RAW_HEADERS = [
  'created_at_utc',
  'lead_id',
  'schema_version',
  'first_name',
  'last_name',
  'company',
  'company_size',
  'email',
  'phone',
  'area_of_interest',
  'area_of_interest_key',
  'message',
  'marketing_consent',
  'privacy_accepted',
  'source_page',
  'referrer',
  'email_status',
  'resend_message_id',
  'email_error',
  'backup_status',
  'lead_status',
  'owner',
  'next_action',
  'retention_until',
  'notes',
];

const INDEX_HEADERS = [
  'lead_id',
  'raw_row_number',
  'created_at_utc',
  'email',
  'company',
  'area_of_interest_key',
  'email_status',
];

const EVENT_HEADERS = [
  'created_at_utc',
  'lead_id',
  'event',
  'detail',
];

function doGet() {
  return json_({
    ok: true,
    service: 'nlg-lead-intake',
  });
}

function doPost(e) {
  try {
    const payload = verifyEnvelope_(e);
    const result = appendLead_(payload);
    return json_(result);
  } catch (error) {
    const message = safeError_(error);
    logEventBestEffort_('', 'rejected', message);
    return json_({
      ok: false,
      status: 'failed',
      error: message,
    });
  }
}

function setupLeadIntakeWorkbook() {
  const ss = getSpreadsheet_();
  ensureSheet_(ss, getRawSheetName_(), RAW_HEADERS);
  ensureSheet_(ss, getIndexSheetName_(), INDEX_HEADERS);
  ensureSheet_(ss, getEventsSheetName_(), EVENT_HEADERS);
}

function appendLead_(payload) {
  if (payload.action !== 'lead.append') {
    throw new Error('Unsupported action.');
  }

  if (payload.schemaVersion !== 1) {
    throw new Error('Unsupported schema version.');
  }

  const lead = payload.lead || {};
  const leadId = cleanString_(lead.leadId, 120);

  if (!leadId) {
    throw new Error('Missing lead ID.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const ss = getSpreadsheet_();
    const rawSheet = ensureSheet_(ss, getRawSheetName_(), RAW_HEADERS);
    const indexSheet = ensureSheet_(ss, getIndexSheetName_(), INDEX_HEADERS);
    const eventsSheet = ensureSheet_(ss, getEventsSheetName_(), EVENT_HEADERS);

    const existing = findLeadIndex_(indexSheet, leadId);
    if (existing) {
      logEvent_(eventsSheet, leadId, 'duplicate', 'Duplicate lead_id accepted idempotently.');
      return {
        ok: true,
        status: 'duplicate',
        leadId,
        rowNumber: existing.rowNumber,
      };
    }

    const rawRow = buildRawRow_(lead);
    const rowNumber = rawSheet.getLastRow() + 1;
    rawSheet.getRange(rowNumber, 1, 1, rawRow.length).setValues([rawRow]);

    const indexRow = [
      leadId,
      rowNumber,
      cleanString_(lead.submittedAt, 80),
      cleanString_(lead.email, 254),
      cleanString_(lead.company, 200),
      cleanString_(lead.service, 120),
      cleanString_(lead.emailStatus, 40),
    ];
    indexSheet.getRange(indexSheet.getLastRow() + 1, 1, 1, indexRow.length).setValues([indexRow]);

    logEvent_(eventsSheet, leadId, 'stored', `Stored in ${getRawSheetName_()} row ${rowNumber}.`);
    notifyOnEmailFailure_(lead, rowNumber);

    return {
      ok: true,
      status: 'stored',
      leadId,
      rowNumber,
    };
  } finally {
    lock.releaseLock();
  }
}

function buildRawRow_(lead) {
  const retentionUntil = retentionDate_(lead.submittedAt);

  return [
    cleanString_(lead.submittedAt, 80),
    cleanString_(lead.leadId, 120),
    1,
    cleanString_(lead.firstName, 120),
    cleanString_(lead.lastName, 120),
    cleanString_(lead.company, 200),
    cleanString_(lead.companySize, 80),
    cleanString_(lead.email, 254),
    cleanString_(lead.phone, 80),
    cleanString_(lead.serviceDisplay, 160),
    cleanString_(lead.service, 120),
    cleanString_(lead.message, 5000),
    Boolean(lead.marketingConsent) ? 'yes' : 'no',
    Boolean(lead.privacyAccepted) ? 'yes' : 'no',
    cleanString_(lead.sourcePage, 500),
    cleanString_(lead.referrer, 500),
    cleanString_(lead.emailStatus, 40),
    cleanString_(lead.resendMessageId, 160),
    cleanString_(lead.emailError, 300),
    'stored',
    'new',
    '',
    '',
    retentionUntil,
    '',
  ];
}

function verifyEnvelope_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing request body.');
  }

  let envelope;
  try {
    envelope = JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error('Invalid JSON envelope.');
  }

  const payloadText = String(envelope.payload || '');
  const suppliedSignature = String(envelope.signature || '');

  if (!payloadText || !suppliedSignature) {
    throw new Error('Missing payload or signature.');
  }

  const secret = getRequiredProperty_('HMAC_SECRET');
  const expectedSignature = hmacBase64_(payloadText, secret);

  if (!safeCompare_(suppliedSignature, expectedSignature)) {
    throw new Error('Invalid signature.');
  }

  let payload;
  try {
    payload = JSON.parse(payloadText);
  } catch (error) {
    throw new Error('Invalid signed payload.');
  }

  const sentAt = Date.parse(payload.sentAt);
  const replayWindowSeconds = Number(getOptionalProperty_('REPLAY_WINDOW_SECONDS', '600'));
  const windowMs = Number.isFinite(replayWindowSeconds) && replayWindowSeconds > 0
    ? replayWindowSeconds * 1000
    : 600000;

  if (!sentAt || Math.abs(Date.now() - sentAt) > windowMs) {
    throw new Error('Expired signed payload.');
  }

  return payload;
}

function hmacBase64_(value, secret) {
  const signature = Utilities.computeHmacSha256Signature(value, secret, Utilities.Charset.UTF_8);
  return Utilities.base64Encode(signature);
}

function safeCompare_(a, b) {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function findLeadIndex_(sheet, leadId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  for (let i = 0; i < values.length; i += 1) {
    if (String(values[i][0]) === leadId) {
      return {
        rowNumber: Number(values[i][1]) || null,
      };
    }
  }
  return null;
}

function notifyOnEmailFailure_(lead, rowNumber) {
  if (String(lead.emailStatus) !== 'failed') return;

  const alertEmail = getOptionalProperty_('ALERT_EMAIL', '');
  if (!alertEmail) return;

  try {
    const ss = getSpreadsheet_();
    MailApp.sendEmail({
      to: alertEmail,
      subject: `Website lead stored, Resend failed: ${cleanString_(lead.company || lead.email, 120)}`,
      body: [
        'A website lead was stored in Google Sheets, but the Resend email path failed.',
        '',
        `Lead ID: ${cleanString_(lead.leadId, 120)}`,
        `Company: ${cleanString_(lead.company, 200)}`,
        `Email: ${cleanString_(lead.email, 254)}`,
        `Area: ${cleanString_(lead.serviceDisplay, 160)}`,
        `Raw Leads row: ${rowNumber}`,
        `Spreadsheet: ${ss.getUrl()}`,
        '',
        'Please review the row and follow up manually.',
      ].join('\n'),
    });
  } catch (error) {
    logEventBestEffort_(cleanString_(lead.leadId, 120), 'fallback_alert_failed', safeError_(error));
  }
}

function retentionDate_(submittedAt) {
  const base = Date.parse(submittedAt) || Date.now();
  const retentionMonths = Number(getOptionalProperty_('RETENTION_MONTHS', '24'));
  const date = new Date(base);
  date.setMonth(date.getMonth() + (Number.isFinite(retentionMonths) ? retentionMonths : 24));
  return Utilities.formatDate(date, 'Etc/UTC', 'yyyy-MM-dd');
}

function ensureSheet_(ss, name, headers) {
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  const existingHeaders = headerRange.getValues()[0];
  const needsHeaders = headers.some((header, index) => existingHeaders[index] !== header);

  if (needsHeaders) {
    headerRange.setValues([headers]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function logEventBestEffort_(leadId, event, detail) {
  try {
    const ss = getSpreadsheet_();
    const eventsSheet = ensureSheet_(ss, getEventsSheetName_(), EVENT_HEADERS);
    logEvent_(eventsSheet, leadId, event, detail);
  } catch (error) {
    console.error(safeError_(error));
  }
}

function logEvent_(sheet, leadId, event, detail) {
  const row = [
    Utilities.formatDate(new Date(), 'Etc/UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    cleanString_(leadId, 120),
    cleanString_(event, 80),
    cleanString_(detail, 500),
  ];
  sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);
}

function cleanString_(value, maxLength) {
  let text = value == null ? '' : String(value);
  text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ').trim();

  if (text.length > maxLength) {
    text = text.slice(0, maxLength);
  }

  if (/^[\s]*[=+\-@]/.test(text)) {
    return `'${text}`;
  }

  return text;
}

function getSpreadsheet_() {
  return SpreadsheetApp.openById(getRequiredProperty_('SPREADSHEET_ID'));
}

function getRawSheetName_() {
  return getOptionalProperty_('RAW_SHEET_NAME', RAW_SHEET_NAME_DEFAULT);
}

function getIndexSheetName_() {
  return getOptionalProperty_('INDEX_SHEET_NAME', INDEX_SHEET_NAME_DEFAULT);
}

function getEventsSheetName_() {
  return getOptionalProperty_('EVENTS_SHEET_NAME', EVENTS_SHEET_NAME_DEFAULT);
}

function getRequiredProperty_(key) {
  const value = getOptionalProperty_(key, '');
  if (!value) {
    throw new Error(`Missing script property: ${key}`);
  }
  return value;
}

function getOptionalProperty_(key, fallback) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  return value == null ? fallback : value;
}

function json_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeError_(error) {
  if (error && error.message) return String(error.message).slice(0, 500);
  return 'Unknown error';
}
