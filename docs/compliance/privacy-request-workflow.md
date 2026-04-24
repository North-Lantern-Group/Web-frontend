# NLG Privacy Request Workflow

**Intake:** privacy@northlanterngroup.com
**Owner:** North Lantern Group Privacy Office
**Last reviewed:** April 24, 2026

This is the operating runbook for any request, complaint, or incident
that arrives at `privacy@northlanterngroup.com`. It is designed to
support NLG's obligations under PIPEDA. It is not legal advice.

## 1. Inbox setup

- `privacy@northlanterngroup.com` is a Google Workspace group.
- Monitored by at least **two** trusted internal people (so vacation and
  illness do not stall the SLA).
- External posting: **enabled** (anyone must be able to reach us).
- External conversation viewing: **disabled**.
- External people joining the group: **disabled**.
- Inbox retention: inherit default, but do **not** auto-delete on a
  short rotation — privacy request evidence must be retained.

## 2. Request types we accept

| Type | What it means |
|------|---------------|
| Access | "Tell me what personal information you hold about me." |
| Correction | "Update information you hold that is inaccurate or incomplete." |
| Deletion | "Delete the personal information you hold about me." |
| Consent withdrawal | "Stop processing my personal information based on prior consent." |
| Unsubscribe | "Remove me from commercial electronic messages." Handled within 10 business days per CASL. |
| Complaint | "I think NLG mishandled my personal information." |
| Incident / security report | Third-party security researcher or individual reporting a suspected breach, misdirected message, exposed data, or phishing abuse. |

## 3. Service levels

| Stage | Target | Source |
|-------|--------|--------|
| Acknowledge receipt | 5 business days | Internal SLA |
| Substantive response | 30 days from receipt, with a documented extension only where reasonably required under PIPEDA | PIPEDA §8 |
| Unsubscribe | 10 business days | CASL |
| Breach notification (if RROSH) | As soon as feasible | PIPEDA §10.1 |

## 4. Step-by-step

### 4.1 Triage (day 0 — day 1)

1. Open the message.
2. Classify the request type.
3. Acknowledge receipt with a templated reply that:
   - Confirms NLG has received the request.
   - Gives a request ID (see §5).
   - States the 30-day target (or 10 business days for unsubscribe).
   - Asks for any information needed to verify identity, but only the
     minimum needed.
4. Log the request (see §5).

### 4.2 Verify identity

- For requests involving specific personal information (access,
  correction, deletion): verify that the requester is the individual
  the information is about. Acceptable verification varies — for a
  contact form submitter, matching the email address they submitted is
  typically enough. If doubt remains, ask for independently
  verifiable details rather than requesting government ID.
- For complaints on behalf of another individual, require reasonable
  authorization.

### 4.3 Investigate

- For **access** requests: enumerate mailboxes, systems, and backups
  that may hold information about the requester. Export what we find.
  Redact information about third parties before disclosure.
- For **correction** requests: make the change, propagate if the record
  was shared with a service provider, confirm to the requester.
- For **deletion** requests: confirm whether we have a legal reason to
  retain (tax, engagement records, CASL suppression list). Delete what
  is not legally required; explain what we keep and why.
- For **consent withdrawal**: stop the specific processing the consent
  covered. Keep the withdrawal evidence itself (to prove we honored it).

### 4.4 Respond

- Reply from `privacy@northlanterngroup.com` (do not reply from a
  personal mailbox).
- Explain what we did, what we kept and why, and how to escalate.
- Close the log entry with the decision and the completion date.

### 4.5 Escalation

- If the request cannot be handled within 30 days: notify the requester
  **before** the 30-day deadline, give a reason, and commit to a new
  date.
- If the request implies a breach: open an incident (see §6).
- If the requester is unsatisfied: direct them to the Office of the
  Privacy Commissioner of Canada at priv.gc.ca.

## 5. Log template

Maintain the log inside NLG's internal shared drive, not in this repo
(the repo is public / semi-public and must not contain personal data).

```
Request ID:          NLG-PR-YYYY-###
Received:            2026-MM-DD HH:MM America/Toronto
Channel:             privacy@northlanterngroup.com
Requester:           <email> (<company if known>)
Type:                Access | Correction | Deletion | Withdrawal |
                     Unsubscribe | Complaint | Incident
Owner:               <name / role>
Verification:        Method + date
Systems searched:    <Google Workspace mailboxes, CRM if any, etc.>
Decision:            Granted / Partially granted / Denied with reason
Sent:                2026-MM-DD
Completed:           2026-MM-DD
Notes:
```

## 6. Incident workflow (triggers: suspected breach)

See `website-compliance-checklist.md` §9 for the timeline. Key points:

1. Contain first, investigate second.
2. Preserve logs.
3. Apply the RROSH test (Real Risk Of Significant Harm). Factors:
   sensitivity of data, probability of misuse.
4. If RROSH is plausible: notify OPC, notify affected individuals.
5. Record the breach in the breach register for **24 months** minimum,
   whether or not it required notification (PIPEDA §10.3).

## 7. What we do **not** do

- Share personal information with a third party asking about an
  individual unless we have clear authorization from that individual.
- Confirm or deny the existence of a record over email to an
  unverified requester.
- Auto-forward `privacy@` to a single person's inbox. Two people
  minimum, so the SLA survives one person being unavailable.
- Treat a commercial email unsubscribe the same as a PIPEDA consent
  withdrawal. They may overlap; they are not identical.

## 8. Changes

Changes to this workflow are logged here.

| Date | Change | Reviewer |
|------|--------|----------|
| 2026-04-24 | Initial version | NLG Privacy Office (draft) |
