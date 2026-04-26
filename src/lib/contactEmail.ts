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
const NLG_ICON_URL = "https://www.northlanterngroup.com/brand/icons/primary/png/NLG-Icon.png";

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

  return `<a href="${escapeHtml(href)}" style="color:#006F8F;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px;word-break:break-word;overflow-wrap:anywhere;">${safeValue}</a>`;
}

function renderFieldRows(fields: EmailField[]) {
  return fields
    .map(
      (field) => `
        <tr>
          <td style="padding:16px 0;border-top:1px solid #DEE7EF;vertical-align:top;">
            <div style="color:#53687A;font:700 11px/1.4 Arial, sans-serif;text-transform:uppercase;letter-spacing:0.11em;">
              ${escapeHtml(field.label)}
            </div>
            <div style="margin-top:6px;color:#0A1628;font:500 16px/1.55 Arial, sans-serif;word-break:break-word;overflow-wrap:anywhere;">
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
    <style>
      @media only screen and (max-width: 480px) {
        .nlg-email-shell { padding: 20px 0 !important; }
        .nlg-email-panel { width: 100% !important; max-width: 100% !important; border-left: 0 !important; border-right: 0 !important; border-radius: 0 !important; }
        .nlg-email-section { padding-left: 24px !important; padding-right: 24px !important; }
        .nlg-email-title { font-size: 28px !important; line-height: 1.18 !important; }
        .nlg-email-card-cell { padding-left: 20px !important; padding-right: 20px !important; }
      }
    </style>
    <title>New website inquiry from ${safeFullName}</title>
  </head>
  <body style="margin:0;padding:0;background:#EDF4FA;color:#0A1628;font-family:Arial, Helvetica, sans-serif;-webkit-font-smoothing:antialiased;word-break:break-word;overflow-wrap:anywhere;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      New inquiry from ${safeFullName} at ${safeCompany} about ${safeService}.
    </div>

    <div class="nlg-email-shell" style="background:#EDF4FA;padding:28px 12px;box-sizing:border-box;width:100%;">
      <div style="width:100%;max-width:680px;margin:0 auto;box-sizing:border-box;">
          <table class="nlg-email-panel" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF" style="width:100%;max-width:680px;border-collapse:separate;border-spacing:0;background:#FFFFFF;border:1px solid #D7E2EA;border-radius:14px;overflow:hidden;table-layout:fixed;box-sizing:border-box;">
            <tr>
              <td style="height:6px;line-height:6px;font-size:0;background:#0096B4;background-image:linear-gradient(90deg,#0096B4 0%,#00AEEF 48%,#1B4965 100%);">&nbsp;</td>
            </tr>

            <tr>
              <td class="nlg-email-section" style="padding:30px 34px 28px;background:#FFFFFF;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;table-layout:fixed;">
                  <tr>
                    <td style="vertical-align:middle;width:66px;">
                      <img src="${NLG_ICON_URL}" width="54" height="54" alt="North Lantern Group" style="display:block;width:54px;height:54px;border:0;outline:none;text-decoration:none;">
                    </td>
                    <td style="vertical-align:middle;">
                      <div style="color:#0A1628;font:700 18px/1.2 Arial, sans-serif;letter-spacing:-0.01em;">North Lantern Group</div>
                      <div style="padding-top:5px;color:#007EA7;font:700 11px/1.4 Arial, sans-serif;text-transform:uppercase;letter-spacing:0.14em;">Website lead intake</div>
                    </td>
                  </tr>
                </table>

                <h1 class="nlg-email-title" style="margin:28px 0 0;color:#0A1628;font:700 30px/1.18 Arial, sans-serif;letter-spacing:-0.02em;">
                  New website inquiry
                </h1>
                <p style="margin:10px 0 0;color:#3D4F60;font:500 16px/1.6 Arial, sans-serif;">
                  Reply directly to this email to reach the lead. A backup copy has also been sent to the lead intake log.
                </p>
              </td>
            </tr>

            <tr>
              <td class="nlg-email-section" style="padding:0 34px 0;background:#FFFFFF;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F6FAFD" style="border-collapse:separate;border-spacing:0;background:#F6FAFD;border:1px solid #D7E2EA;border-radius:12px;table-layout:fixed;">
                  <tr>
                    <td class="nlg-email-card-cell" style="padding:22px 24px 0;">
                      <div style="color:#53687A;font:700 11px/1.4 Arial, sans-serif;text-transform:uppercase;letter-spacing:0.12em;">Lead snapshot</div>
                      <div style="margin-top:8px;color:#0A1628;font:700 22px/1.25 Arial, sans-serif;letter-spacing:-0.02em;">${safeFullName}</div>
                      <div style="margin-top:6px;color:#3D4F60;font:500 15px/1.55 Arial, sans-serif;">${safeCompany} &middot; ${safeService}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="nlg-email-card-cell" style="padding:18px 24px 22px;">
                      <a href="${escapeHtml(replyHref)}" style="display:block;background:#00304B;background-image:linear-gradient(135deg,#00304B 0%,#00455F 42%,#006F8F 72%,#0096B4 100%);color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF;border:1px solid #00455F;border-radius:7px;padding:16px 20px;font:800 17px/1 Arial, sans-serif;text-decoration:none;text-align:center;letter-spacing:0.01em;">Reply to lead</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="nlg-email-section" style="padding:28px 34px 0;background:#FFFFFF;">
                <h2 style="margin:0 0 12px;color:#0A1628;font:700 16px/1.35 Arial, sans-serif;letter-spacing:-0.01em;">Contact details</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;table-layout:fixed;">
                  ${renderFieldRows(leadFields)}
                </table>
              </td>
            </tr>

            <tr>
              <td class="nlg-email-section" style="padding:28px 34px 0;background:#FFFFFF;">
                <h2 style="margin:0 0 12px;color:#0A1628;font:700 16px/1.35 Arial, sans-serif;letter-spacing:-0.01em;">Message</h2>
                <div style="background:#F6FAFD;border:1px solid #D7E2EA;border-left:4px solid #0096B4;border-radius:10px;padding:20px 22px;color:#0A1628;font:500 16px/1.7 Arial, sans-serif;word-break:break-word;overflow-wrap:anywhere;">
                  ${safeMessage}
                </div>
              </td>
            </tr>

            <tr>
              <td class="nlg-email-section" style="padding:28px 34px 30px;background:#FFFFFF;">
                <h2 style="margin:0 0 12px;color:#0A1628;font:700 16px/1.35 Arial, sans-serif;letter-spacing:-0.01em;">Operational details</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;table-layout:fixed;">
                  ${renderFieldRows(metadataFields)}
                </table>
              </td>
            </tr>

            <tr>
              <td class="nlg-email-section" style="padding:18px 34px 24px;background:#F1F6F9;border-top:1px solid #D7E2EA;color:#53687A;font:500 12px/1.6 Arial, sans-serif;word-break:break-word;overflow-wrap:anywhere;">
                This internal notification was generated by northlanterngroup.com. Keep lead details inside approved NLG systems.
              </td>
            </tr>
          </table>
      </div>
    </div>
  </body>
</html>
  `.trim();

  return { text, html };
}
