# NLG Lead Intake Apps Script

This folder is the source copy for the Google Apps Script Web App that backs up website contact submissions into a company-owned Google Sheet.

Full architecture, setup, validation, rotation, and incident SOP:
`docs/operations/lead-intake-backup-architecture-and-sop.md`

Production deployment model:

- Owner account: `hamza@northlanterngroup.com`
- Backup editor/admin access: `hello@northlanterngroup.com`
- Caller: server-side Next.js route at `/api/contact`
- Browser access: none. The public form does not call Apps Script directly.

Required Apps Script properties:

```txt
SPREADSHEET_ID=<Google Sheet ID>
HMAC_SECRET=<same value as LEAD_BACKUP_HMAC_SECRET in Vercel>
ALERT_EMAIL=leads@northlanterngroup.com
RETENTION_MONTHS=24
REPLAY_WINDOW_SECONDS=600
RAW_SHEET_NAME=Raw Leads
INDEX_SHEET_NAME=Lead Index
EVENTS_SHEET_NAME=Integration Events
```

Deploy settings:

- Type: Web app
- Execute as: Me
- Who has access: Anyone

The public URL is safe to expose only because every write must include a signed HMAC payload created by the server-side Next.js route. Do not call this endpoint from client-side code.

Admin helpers:

- `setupLeadIntakeWorkbook()`: creates/repairs the required functional tabs and headers.
- `applyLeadIntakeWorkbookDesign()`: applies the NLG dashboard, tab order, column widths, filters, freeze panes, and conditional formatting. This is visual/operational polish only; it does not change the intake endpoint behavior.
