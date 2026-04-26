interface ContactLeadEmailData {
  leadId: string;
  submittedAt: string;
  fullName: string;
  company: string;
  companySize?: string;
  email: string;
  phone?: string;
  serviceDisplay: string;
  message: string;
  marketingConsentLabel: string;
  privacyAccepted: boolean;
  sourcePage?: string;
  referrer?: string;
}

interface EmailField {
  label: string;
  value: string;
  href?: string;
}

const NOT_PROVIDED = "Not provided";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function displayValue(value?: string) {
  const trimmed = value?.trim();
  return trimmed || NOT_PROVIDED;
}

function escapeMultiline(value: string) {
  return escapeHtml(displayValue(value)).replace(/\r?\n/g, "<br>");
}

function telHref(phone?: string) {
  const cleanPhone = phone?.replace(/[^\d+]/g, "");
  return cleanPhone ? `tel:${cleanPhone}` : undefined;
}

function safeHref(value?: string) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:" || url.protocol === "tel:") {
      return url.toString();
    }
  } catch {
    if (/^(mailto:|tel:)/i.test(value)) return value;
  }

  return undefined;
}

function formatSubmittedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Toronto",
    timeZoneName: "short",
  }).format(date);
}

function renderLinkedValue(field: EmailField) {
  const safeValue = escapeHtml(displayValue(field.value));
  const href = safeHref(field.href);
  if (!href) return safeValue;

  return `<a href="${escapeHtml(href)}" style="color:#007EA7;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px;word-break:break-word;overflow-wrap:anywhere;">${safeValue}</a>`;
}

function renderFieldRows(fields: EmailField[]) {
  return fields
    .map(
      (field) => `
        <tr>
          <td style="padding:15px 0;border-top:1px solid #E1E7EE;vertical-align:top;">
            <div style="color:#667789;font:700 11px/1.4 Arial, sans-serif;text-transform:uppercase;letter-spacing:0.11em;">
              ${escapeHtml(field.label)}
            </div>
            <div style="margin-top:6px;color:#142238;font:500 15px/1.55 Arial, sans-serif;word-break:break-word;overflow-wrap:anywhere;">
              ${renderLinkedValue(field)}
            </div>
          </td>
        </tr>`
    )
    .join("");
}

function textLine(label: string, value?: string) {
  return `${label}: ${displayValue(value)}`;
}

export function renderContactLeadEmail(data: ContactLeadEmailData) {
  const submittedAtDisplay = formatSubmittedAt(data.submittedAt);
  const replyHref = `mailto:${data.email}`;
  const phoneHref = telHref(data.phone);

  const leadFields: EmailField[] = [
    { label: "Name", value: data.fullName },
    { label: "Company", value: data.company },
    { label: "Company size", value: displayValue(data.companySize) },
    { label: "Email", value: data.email, href: replyHref },
    { label: "Phone", value: displayValue(data.phone), href: phoneHref },
    { label: "Area of interest", value: data.serviceDisplay },
    { label: "Marketing consent", value: data.marketingConsentLabel },
    { label: "Privacy accepted", value: data.privacyAccepted ? "Yes" : "No" },
  ];

  const metadataFields: EmailField[] = [
    { label: "Lead ID", value: data.leadId },
    { label: "Submitted", value: submittedAtDisplay },
    { label: "Source page", value: displayValue(data.sourcePage), href: data.sourcePage || undefined },
    { label: "Referrer", value: displayValue(data.referrer), href: data.referrer || undefined },
  ];

  const safeFullName = escapeHtml(displayValue(data.fullName));
  const safeCompany = escapeHtml(displayValue(data.company));
  const safeService = escapeHtml(displayValue(data.serviceDisplay));
  const safeMessage = escapeMultiline(data.message);

  const text = `
New website inquiry - North Lantern Group

Submitted: ${submittedAtDisplay}
Reply to: ${data.email}

Lead details
${textLine("Name", data.fullName)}
${textLine("Company", data.company)}
${textLine("Company size", data.companySize)}
${textLine("Email", data.email)}
${textLine("Phone", data.phone)}
${textLine("Area of interest", data.serviceDisplay)}
${textLine("Marketing consent", data.marketingConsentLabel)}
Privacy accepted: ${data.privacyAccepted ? "Yes" : "No"}

Message
${displayValue(data.message)}

Operational details
${textLine("Lead ID", data.leadId)}
${textLine("Source page", data.sourcePage)}
${textLine("Referrer", data.referrer)}
  `.trim();

  const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>New website inquiry from ${safeFullName}</title>
  </head>
  <body style="margin:0;padding:0;background:#05101F;color:#142238;font-family:Arial, Helvetica, sans-serif;-webkit-font-smoothing:antialiased;word-break:break-word;overflow-wrap:anywhere;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      New inquiry from ${safeFullName} at ${safeCompany} about ${safeService}.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;background:#05101F;table-layout:fixed;">
      <tr>
        <td align="center" style="padding:34px 16px;">
          <div style="width:100%;max-width:680px;margin:0 auto;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:separate;border-spacing:0;background:#F5F7FA;border:1px solid #D8E2EA;border-radius:14px;overflow:hidden;table-layout:fixed;">
            <tr>
              <td style="padding:30px 34px;background:#0A1628;background-image:linear-gradient(135deg,#00455F 0%,#0A1628 58%,#05101F 100%);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;table-layout:fixed;">
                  <tr>
                    <td style="vertical-align:middle;width:50px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td align="center" valign="middle" style="width:42px;height:42px;border:1px solid rgba(255,255,255,0.55);border-radius:10px;color:#FFFFFF;font:700 22px/42px Arial, sans-serif;">
                            N
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="vertical-align:middle;">
                      <div style="color:#FFFFFF;font:700 17px/1.2 Arial, sans-serif;letter-spacing:-0.01em;">North Lantern Group</div>
                      <div style="padding-top:5px;color:#9CEBFF;font:600 11px/1.4 Arial, sans-serif;text-transform:uppercase;letter-spacing:0.14em;">Website lead intake</div>
                    </td>
                  </tr>
                </table>

                <h1 style="margin:28px 0 0;color:#FFFFFF;font:700 30px/1.18 Arial, sans-serif;letter-spacing:-0.02em;">
                  New website inquiry
                </h1>
                <p style="margin:10px 0 0;color:#C7D2DB;font:400 15px/1.6 Arial, sans-serif;">
                  Reply directly to this email to reach the lead. A backup copy has also been sent to the lead intake log.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 34px 0;background:#F5F7FA;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;background:#FFFFFF;border:1px solid #DDE6EE;border-radius:12px;table-layout:fixed;">
                  <tr>
                    <td style="padding:22px 24px 0;">
                      <div style="color:#667789;font:700 11px/1.4 Arial, sans-serif;text-transform:uppercase;letter-spacing:0.12em;">Lead snapshot</div>
                      <div style="margin-top:8px;color:#0A1628;font:700 22px/1.25 Arial, sans-serif;letter-spacing:-0.02em;">${safeFullName}</div>
                      <div style="margin-top:6px;color:#4A5B6D;font:500 14px/1.55 Arial, sans-serif;">${safeCompany} · ${safeService}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:18px 24px 22px;">
                      <a href="${escapeHtml(replyHref)}" style="display:block;background:#00AEEF;color:#04141E;border-radius:7px;padding:13px 18px;font:700 14px/1 Arial, sans-serif;text-decoration:none;text-align:center;">Reply to lead</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:26px 34px 0;background:#F5F7FA;">
                <h2 style="margin:0 0 12px;color:#0A1628;font:700 16px/1.35 Arial, sans-serif;letter-spacing:-0.01em;">Contact details</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;table-layout:fixed;">
                  ${renderFieldRows(leadFields)}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:26px 34px 0;background:#F5F7FA;">
                <h2 style="margin:0 0 12px;color:#0A1628;font:700 16px/1.35 Arial, sans-serif;letter-spacing:-0.01em;">Message</h2>
                <div style="background:#FFFFFF;border:1px solid #DDE6EE;border-left:4px solid #00AEEF;border-radius:10px;padding:20px 22px;color:#142238;font:500 15px/1.7 Arial, sans-serif;word-break:break-word;">
                  ${safeMessage}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:26px 34px 30px;background:#F5F7FA;">
                <h2 style="margin:0 0 12px;color:#0A1628;font:700 16px/1.35 Arial, sans-serif;letter-spacing:-0.01em;">Operational details</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;table-layout:fixed;">
                  ${renderFieldRows(metadataFields)}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 34px 24px;background:#EAF0F5;border-top:1px solid #D8E2EA;color:#667789;font:500 12px/1.6 Arial, sans-serif;word-break:break-word;overflow-wrap:anywhere;">
                This internal notification was generated by northlanterngroup.com. Keep lead details inside approved NLG systems.
              </td>
            </tr>
          </table>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  return { text, html };
}
