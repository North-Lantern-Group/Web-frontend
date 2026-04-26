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
const DASHBOARD_LATEST_LEADS_LIMIT = 12;
const RAW_LEADS_FORMAT_ROWS = 1000;
const INDEX_FORMAT_ROWS = 1000;
const EVENTS_FORMAT_ROWS = 1000;

const LEAD_STATUS_VALUES = [
  'new',
  'reviewing',
  'contacted',
  'qualified',
  'proposal',
  'won',
  'lost',
  'not_fit',
  'archived',
];

const EMAIL_STATUS_VALUES = ['sent', 'failed', 'skipped'];
const BACKUP_STATUS_VALUES = ['stored'];
const YES_NO_VALUES = ['yes', 'no'];

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

/**
 * Applies the North Lantern Group visual system to the lead workbook.
 *
 * This is an operator/admin helper. It does not change the Web App intake
 * behavior and does not need a new Web App deployment. Run it manually after
 * setup, after creating a replacement workbook, or after adding new columns.
 */
function applyLeadIntakeWorkbookDesign() {
  const ss = getSpreadsheet_();
  const rawSheet = ensureSheet_(ss, getRawSheetName_(), RAW_HEADERS);
  const indexSheet = ensureSheet_(ss, getIndexSheetName_(), INDEX_HEADERS);
  const eventsSheet = ensureSheet_(ss, getEventsSheetName_(), EVENT_HEADERS);
  const dashboardSheet = ensureDashboardSheet_(ss);

  applyDashboardDesign_(dashboardSheet);
  applyRawLeadsDesign_(rawSheet);
  applyIndexDesign_(indexSheet);
  applyEventsDesign_(eventsSheet);
  arrangeLeadWorkbookSheets_(ss, dashboardSheet, rawSheet, indexSheet, eventsSheet);
  ss.toast('NLG lead workbook design applied. Dashboard is a fixed latest-12 view; Raw Leads remains the full register.', 'NLG Lead Intake', 7);
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

const NLG_SHEET_THEME = {
  bg0: '#05101F',
  bg1: '#0A1628',
  bg2: '#0E2135',
  bg3: '#12293F',
  tile: '#0C1E32',
  astronaut: '#00455F',
  chathams: '#115C89',
  cerulean: '#00AEEF',
  cyan: '#00EBF4',
  fg1: '#F1F6F9',
  fg2: '#C7D2DB',
  fg3: '#8B98A2',
  line: '#29445C',
  light: '#F7FAFC',
  lightAlt: '#EDF6FA',
  lightLine: '#D9E7EF',
  success: '#2E8B65',
  successBg: '#DDF3E8',
  warning: '#C97A17',
  warningBg: '#FFF1D9',
  danger: '#C0392B',
  dangerBg: '#FCE3DF',
};

function ensureDashboardSheet_(ss) {
  const existingDashboard = ss.getSheetByName('Dashboard');
  if (existingDashboard) return existingDashboard;

  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && sheet1.getLastRow() <= 1 && sheet1.getLastColumn() <= 1 && !sheet1.getRange('A1').getValue()) {
    sheet1.setName('Dashboard');
    return sheet1;
  }

  return ss.insertSheet('Dashboard', 0);
}

function applyDashboardDesign_(sheet) {
  const theme = NLG_SHEET_THEME;
  const rawLeadIdRange = rawColumnRange_('lead_id');
  const rawEmailStatusRange = rawColumnRange_('email_status');
  const rawBackupStatusRange = rawColumnRange_('backup_status');
  const rawLeadStatusRange = rawColumnRange_('lead_status');
  const rawMarketingConsentRange = rawColumnRange_('marketing_consent');
  const eventTypeRange = eventsColumnRange_('event');

  sheet.clear();
  sheet.getRange('A1:J38').breakApart();
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(theme.cerulean);
  sheet.setFrozenRows(0);
  sheet.setFrozenColumns(0);
  sheet.setRowHeights(1, 38, 28);
  sheet.setColumnWidths(1, 10, 120);
  sheet.setColumnWidth(1, 34);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 160);
  sheet.setColumnWidth(4, 160);
  sheet.setColumnWidth(5, 160);
  sheet.setColumnWidth(6, 160);
  sheet.setColumnWidth(7, 160);
  sheet.setColumnWidth(8, 160);
  sheet.setColumnWidth(9, 160);
  sheet.setColumnWidth(10, 160);

  sheet.getRange('A1:J38')
    .setBackground(theme.bg0)
    .setFontFamily('Montserrat')
    .setFontColor(theme.fg2)
    .setVerticalAlignment('middle');

  sheet.getRange('A1:J1').setBackground(theme.bg1);
  sheet.getRange('B2:C5')
    .merge()
    .setValue('N')
    .setBackground(theme.astronaut)
    .setFontColor(theme.fg1)
    .setFontSize(38)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, theme.cyan, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  sheet.getRange('D2:J2')
    .merge()
    .setValue('North Lantern Group');
  sheet.getRange('D3:J3')
    .merge()
    .setValue('Website Lead Intake');
  sheet.getRange('D4:J5')
    .merge()
    .setValue('Durable backup and operating register for inbound website inquiries.');

  sheet.getRange('D2:J2')
    .setFontColor(theme.cyan)
    .setFontSize(12)
    .setFontWeight('bold')
    .setHorizontalAlignment('left');
  sheet.getRange('D3:J3')
    .setFontColor(theme.fg1)
    .setFontSize(28)
    .setFontWeight('bold')
    .setHorizontalAlignment('left');
  sheet.getRange('D4:J5')
    .setFontColor(theme.fg3)
    .setFontSize(11)
    .setWrap(true)
    .setHorizontalAlignment('left');

  const cards = [
    ['B7:C10', 'TOTAL LEADS', `=COUNTIFS(${rawLeadIdRange},"<>")`, 'accepted submissions'],
    ['D7:E10', 'NEW', `=COUNTIFS(${rawLeadIdRange},"<>",${rawLeadStatusRange},"new")`, 'not yet triaged'],
    ['F7:G10', 'EMAIL SENT', `=COUNTIFS(${rawLeadIdRange},"<>",${rawEmailStatusRange},"sent")`, 'Resend accepted'],
    ['H7:I10', 'BACKUP STORED', `=COUNTIFS(${rawLeadIdRange},"<>",${rawBackupStatusRange},"stored")`, 'Sheet durable rows'],
  ];

  cards.forEach(([rangeA1, label, formula, caption]) => {
    const range = sheet.getRange(rangeA1);
    range
      .setBackground(theme.tile)
      .setBorder(true, true, true, true, false, false, theme.line, SpreadsheetApp.BorderStyle.SOLID)
      .setVerticalAlignment('middle')
      .setHorizontalAlignment('left')
      .setWrap(true);

    const [start, end] = rangeA1.split(':');
    const startCell = sheet.getRange(start);
    const row = startCell.getRow();
    const col = startCell.getColumn();
    sheet.getRange(row, col, 1, 2)
      .merge()
      .setValue(label)
      .setFontColor(theme.cyan)
      .setFontSize(9)
      .setFontWeight('bold')
      .setHorizontalAlignment('left');
    sheet.getRange(row + 1, col, 2, 2)
      .merge()
      .setFormula(formula)
      .setFontColor(theme.fg1)
      .setFontSize(28)
      .setFontWeight('bold')
      .setHorizontalAlignment('left');
    sheet.getRange(row + 3, col, 1, 2)
      .merge()
      .setValue(caption)
      .setFontColor(theme.fg3)
      .setFontSize(9)
      .setHorizontalAlignment('left');
  });

  sheet.getRange('B12:I12')
    .merge()
    .setValue(`Latest ${DASHBOARD_LATEST_LEADS_LIMIT} leads`)
    .setBackground(theme.bg2)
    .setFontColor(theme.fg1)
    .setFontWeight('bold')
    .setFontSize(13)
    .setBorder(true, true, true, true, false, false, theme.line, SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange('B13:I13')
    .setValues([['Created', 'Company', 'Email', 'Area', 'Email', 'Status', 'Owner', 'Next action']])
    .setBackground(theme.astronaut)
    .setFontColor(theme.fg1)
    .setFontSize(10)
    .setFontWeight('bold')
    .setHorizontalAlignment('left');

  sheet.getRange('B14')
    .setFormula(`=IFERROR(SORTN(FILTER({'Raw Leads'!A2:A,'Raw Leads'!F2:F,'Raw Leads'!H2:H,'Raw Leads'!J2:J,'Raw Leads'!Q2:Q,'Raw Leads'!U2:U,'Raw Leads'!V2:V,'Raw Leads'!W2:W},'Raw Leads'!B2:B<>""),${DASHBOARD_LATEST_LEADS_LIMIT},0,1,FALSE),"No leads yet")`);
  sheet.getRange('B14:I25')
    .setBackground(theme.bg1)
    .setFontColor(theme.fg2)
    .setFontSize(10)
    .setWrap(true)
    .setBorder(true, true, true, true, true, true, theme.line, SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange('B27:E27')
    .merge()
    .setValue('Operating notes')
    .setBackground(theme.bg2)
    .setFontColor(theme.fg1)
    .setFontSize(13)
    .setFontWeight('bold');
  sheet.getRange('B28:E34')
    .merge()
    .setValue([
      '1. Raw Leads is the source register for valid website submissions.',
      '2. Lead Index supports dedupe and should normally stay unchanged.',
      '3. Integration Events records storage, duplicate, and rejection events.',
      `4. Dashboard intentionally shows the latest ${DASHBOARD_LATEST_LEADS_LIMIT} leads only; use Raw Leads for the full register.`,
      '5. Use owner, next_action, lead_status, and notes for lightweight follow-up.',
      '6. Retain no-engagement leads for 24 months unless policy changes.',
    ].join('\n'))
    .setBackground(theme.tile)
    .setFontColor(theme.fg2)
    .setFontSize(10)
    .setWrap(true)
    .setBorder(true, true, true, true, false, false, theme.line, SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange('G27:I27')
    .merge()
    .setValue('Data health')
    .setBackground(theme.bg2)
    .setFontColor(theme.fg1)
    .setFontSize(13)
    .setFontWeight('bold');
  sheet.getRange('G28:I34')
    .merge()
    .setFormula(`="Failed email rows: "&COUNTIFS(${rawLeadIdRange},"<>",${rawEmailStatusRange},"failed")&CHAR(10)&"Rejected events: "&COUNTIF(${eventTypeRange},"rejected")&CHAR(10)&"Duplicate events: "&COUNTIF(${eventTypeRange},"duplicate")&CHAR(10)&"Marketing opt-ins: "&COUNTIFS(${rawLeadIdRange},"<>",${rawMarketingConsentRange},"yes")`)
    .setBackground(theme.tile)
    .setFontColor(theme.fg2)
    .setFontSize(10)
    .setWrap(true)
    .setBorder(true, true, true, true, false, false, theme.line, SpreadsheetApp.BorderStyle.SOLID);
}

function rawColumnRange_(headerName) {
  return sheetColumnRange_(getRawSheetName_(), RAW_HEADERS, headerName);
}

function eventsColumnRange_(headerName) {
  return sheetColumnRange_(getEventsSheetName_(), EVENT_HEADERS, headerName);
}

function sheetColumnRange_(sheetName, headers, headerName) {
  const columnIndex = headers.indexOf(headerName) + 1;
  if (columnIndex < 1) {
    throw new Error(`Unknown column header: ${headerName}`);
  }

  const column = columnLetter_(columnIndex);
  return `${formulaSheetName_(sheetName)}!${column}2:${column}`;
}

function formulaSheetName_(sheetName) {
  return `'${String(sheetName).replace(/'/g, "''")}'`;
}

function columnLetter_(columnIndex) {
  let index = columnIndex;
  let letters = '';

  while (index > 0) {
    const remainder = (index - 1) % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    index = Math.floor((index - 1) / 26);
  }

  return letters;
}

function applyRawLeadsDesign_(sheet) {
  const theme = NLG_SHEET_THEME;
  const lastColumn = RAW_HEADERS.length;
  ensureSheetSize_(sheet, RAW_LEADS_FORMAT_ROWS, lastColumn);
  const lastRow = Math.max(sheet.getLastRow(), RAW_LEADS_FORMAT_ROWS);

  sheet.setHiddenGridlines(true);
  sheet.setTabColor(theme.cyan);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
  sheet.getRange(1, 1, 1, lastColumn).setValues([RAW_HEADERS]);

  sheet.getRange(1, 1, 1, lastColumn)
    .setBackground(theme.bg1)
    .setFontColor(theme.fg1)
    .setFontWeight('bold')
    .setFontSize(10)
    .setWrap(true)
    .setHorizontalAlignment('left')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, theme.cyan, SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange(2, 1, lastRow - 1, lastColumn)
    .setBackground(theme.light)
    .setFontColor('#162636')
    .setFontSize(10)
    .setVerticalAlignment('middle')
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
    .setBorder(true, true, true, true, true, true, theme.lightLine, SpreadsheetApp.BorderStyle.SOLID);

  for (let row = 2; row <= lastRow; row += 2) {
    sheet.getRange(row, 1, 1, lastColumn).setBackground(theme.lightAlt);
  }

  sheet.setRowHeight(1, 46);
  sheet.setRowHeights(2, lastRow - 1, 34);

  const widths = [155, 280, 80, 120, 120, 210, 130, 250, 130, 170, 150, 360, 130, 130, 260, 220, 120, 170, 240, 120, 120, 130, 220, 130, 260];
  widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));

  ensureFilter_(sheet, 1, 1, lastRow, lastColumn);
  applyRawDataValidation_(sheet, lastRow);
  applyRawConditionalRules_(sheet, lastRow);
}

function applyIndexDesign_(sheet) {
  const theme = NLG_SHEET_THEME;
  const lastColumn = INDEX_HEADERS.length;
  ensureSheetSize_(sheet, INDEX_FORMAT_ROWS, lastColumn);
  const lastRow = Math.max(sheet.getLastRow(), INDEX_FORMAT_ROWS);

  sheet.setHiddenGridlines(true);
  sheet.setTabColor(theme.chathams);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, lastColumn).setValues([INDEX_HEADERS]);
  sheet.getRange(1, 1, 1, lastColumn)
    .setBackground(theme.astronaut)
    .setFontColor(theme.fg1)
    .setFontWeight('bold')
    .setFontSize(10)
    .setWrap(true);
  sheet.getRange(2, 1, lastRow - 1, lastColumn)
    .setBackground('#F4F8FB')
    .setFontColor('#203243')
    .setFontSize(10)
    .setBorder(true, true, true, true, true, true, theme.lightLine, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(1, 42);
  sheet.setColumnWidths(1, lastColumn, 170);
  sheet.setColumnWidth(1, 280);
  sheet.setColumnWidth(4, 250);
  ensureFilter_(sheet, 1, 1, lastRow, lastColumn);
}

function applyEventsDesign_(sheet) {
  const theme = NLG_SHEET_THEME;
  const lastColumn = EVENT_HEADERS.length;
  ensureSheetSize_(sheet, EVENTS_FORMAT_ROWS, lastColumn);
  const lastRow = Math.max(sheet.getLastRow(), EVENTS_FORMAT_ROWS);

  sheet.setHiddenGridlines(true);
  sheet.setTabColor(theme.warning);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, lastColumn).setValues([EVENT_HEADERS]);
  sheet.getRange(1, 1, 1, lastColumn)
    .setBackground(theme.bg1)
    .setFontColor(theme.fg1)
    .setFontWeight('bold')
    .setFontSize(10)
    .setWrap(true);
  sheet.getRange(2, 1, lastRow - 1, lastColumn)
    .setBackground('#FFFDF8')
    .setFontColor('#22313F')
    .setFontSize(10)
    .setWrap(true)
    .setBorder(true, true, true, true, true, true, '#EADDCB', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(1, 42);
  sheet.setColumnWidth(1, 165);
  sheet.setColumnWidth(2, 290);
  sheet.setColumnWidth(3, 135);
  sheet.setColumnWidth(4, 520);
  ensureFilter_(sheet, 1, 1, lastRow, lastColumn);
  applyEventConditionalRules_(sheet, lastRow);
}

function arrangeLeadWorkbookSheets_(ss, dashboardSheet, rawSheet, indexSheet, eventsSheet) {
  const theme = NLG_SHEET_THEME;
  ss.setActiveSheet(dashboardSheet);
  ss.moveActiveSheet(1);
  ss.setActiveSheet(rawSheet);
  ss.moveActiveSheet(2);
  ss.setActiveSheet(indexSheet);
  ss.moveActiveSheet(3);
  ss.setActiveSheet(eventsSheet);
  ss.moveActiveSheet(4);
  dashboardSheet.setTabColor(theme.cerulean);
  rawSheet.setTabColor(theme.cyan);
  indexSheet.setTabColor(theme.chathams);
  eventsSheet.setTabColor(theme.warning);
  ss.setActiveSheet(dashboardSheet);
}

function ensureFilter_(sheet, row, column, numRows, numColumns) {
  const existingFilter = sheet.getFilter();
  if (existingFilter) existingFilter.remove();
  sheet.getRange(row, column, numRows, numColumns).createFilter();
}

function ensureSheetSize_(sheet, minRows, minColumns) {
  if (sheet.getMaxRows() < minRows) {
    sheet.insertRowsAfter(sheet.getMaxRows(), minRows - sheet.getMaxRows());
  }

  if (sheet.getMaxColumns() < minColumns) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), minColumns - sheet.getMaxColumns());
  }
}

function applyRawDataValidation_(sheet, lastRow) {
  const emailStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(EMAIL_STATUS_VALUES, true)
    .setAllowInvalid(true)
    .build();
  const backupStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(BACKUP_STATUS_VALUES, true)
    .setAllowInvalid(true)
    .build();
  const leadStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(LEAD_STATUS_VALUES, true)
    .setAllowInvalid(true)
    .build();
  const yesNoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(YES_NO_VALUES, true)
    .setAllowInvalid(true)
    .build();

  sheet.getRange(2, 13, lastRow - 1, 2).setDataValidation(yesNoRule);
  sheet.getRange(2, 17, lastRow - 1, 1).setDataValidation(emailStatusRule);
  sheet.getRange(2, 20, lastRow - 1, 1).setDataValidation(backupStatusRule);
  sheet.getRange(2, 21, lastRow - 1, 1).setDataValidation(leadStatusRule);
}

function applyRawConditionalRules_(sheet, lastRow) {
  const theme = NLG_SHEET_THEME;
  const rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('failed')
      .setBackground(theme.dangerBg)
      .setFontColor(theme.danger)
      .setRanges([sheet.getRange(2, 17, lastRow - 1, 1)])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('sent')
      .setBackground(theme.successBg)
      .setFontColor(theme.success)
      .setRanges([sheet.getRange(2, 17, lastRow - 1, 1)])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('stored')
      .setBackground(theme.successBg)
      .setFontColor(theme.success)
      .setRanges([sheet.getRange(2, 20, lastRow - 1, 1)])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('new')
      .setBackground('#DDF8FB')
      .setFontColor(theme.astronaut)
      .setRanges([sheet.getRange(2, 21, lastRow - 1, 1)])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('yes')
      .setBackground(theme.successBg)
      .setFontColor(theme.success)
      .setRanges([sheet.getRange(2, 13, lastRow - 1, 2)])
      .build(),
  ];
  sheet.setConditionalFormatRules(rules);
}

function applyEventConditionalRules_(sheet, lastRow) {
  const theme = NLG_SHEET_THEME;
  const rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('rejected')
      .setBackground(theme.dangerBg)
      .setFontColor(theme.danger)
      .setRanges([sheet.getRange(2, 3, lastRow - 1, 1)])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('duplicate')
      .setBackground(theme.warningBg)
      .setFontColor(theme.warning)
      .setRanges([sheet.getRange(2, 3, lastRow - 1, 1)])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('stored')
      .setBackground(theme.successBg)
      .setFontColor(theme.success)
      .setRanges([sheet.getRange(2, 3, lastRow - 1, 1)])
      .build(),
  ];
  sheet.setConditionalFormatRules(rules);
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
