const OWNER_EMAIL = 'domainname.03@gmail.com';

function doPost(event) {
  try {
    const data = JSON.parse((event && event.postData && event.postData.contents) || '{}');
    const configuredSecret = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');
    if (!configuredSecret || data.secret !== configuredSecret) {
      return jsonResponse_({ok: false, error: 'Unauthorized'});
    }

    const email = clean_(data.email, 254);
    const name = clean_(data.name, 120);
    const reference = clean_(data.reference, 40);
    if (!validEmail_(email) || !name || !reference) {
      return jsonResponse_({ok: false, error: 'Invalid enquiry data'});
    }

    const details = [
      ['Reference', reference],
      ['Source', clean_(data.source, 100)],
      ['Name', name],
      ['Email', email],
      ['Phone', clean_(data.phone, 40)],
      ['Event / enquiry type', clean_(data.eventType, 180)],
      ['Preferred date', clean_(data.preferredDate, 30)],
      ['Estimated guests', clean_(data.guestCount, 10)],
    ].filter(function (row) { return row[1]; });

    const tableRows = details.map(function (row) {
      return '<tr><th style="padding:8px 12px;text-align:left;background:#f7f1e7;border:1px solid #e4d7c5">' + escapeHtml_(row[0]) + '</th><td style="padding:8px 12px;border:1px solid #e4d7c5">' + escapeHtml_(row[1]) + '</td></tr>';
    }).join('');
    const message = escapeHtml_(clean_(data.message, 4000)).replace(/\n/g, '<br>');

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      replyTo: email,
      name: 'Khelat Bhawan Website',
      subject: 'New Khelat Bhawan enquiry — ' + reference,
      htmlBody: '<div style="font-family:Arial,sans-serif;color:#3b1915"><h2>New website enquiry</h2><table style="border-collapse:collapse;width:100%;max-width:680px">' + tableRows + '</table><h3>Message</h3><p style="line-height:1.6">' + message + '</p></div>',
    });

    MailApp.sendEmail({
      to: email,
      replyTo: OWNER_EMAIL,
      name: 'Khelat Bhawan',
      subject: 'We have received your enquiry — ' + reference,
      htmlBody: '<div style="font-family:Georgia,serif;color:#3b1915;max-width:640px;margin:auto"><div style="border-top:6px solid #6f1720;padding:28px;background:#fbf7ef"><h1 style="font-size:28px;margin:0 0 18px">Khelat Bhawan</h1><p>Dear ' + escapeHtml_(name) + ',</p><p style="line-height:1.7">Thank you for contacting Khelat Bhawan. We have received your enquiry and our team will connect with you within 48 hours.</p><p><strong>Reference:</strong> ' + escapeHtml_(reference) + '</p><p style="line-height:1.7">Please keep this reference for future communication.</p><div style="margin:24px 0;padding:16px 18px;border:1px solid #e4d7c5;background:#fff"><strong>Official contact</strong><br><a href="mailto:domainname.03@gmail.com" style="color:#6f1720">domainname.03@gmail.com</a><br><a href="tel:+919831093021" style="color:#6f1720">+91 98310 93021</a></div><p style="margin-top:28px">Warm regards,<br><strong>Khelat Bhawan Team</strong><br>Pathuria Ghata, Kolkata</p></div></div>',
    });

    return jsonResponse_({ok: true});
  } catch (error) {
    console.error(error);
    return jsonResponse_({ok: false, error: 'Unable to send email'});
  }
}

function clean_(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength || 2000);
}

function validEmail_(value) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);
}

function escapeHtml_(value) {
  return String(value || '').replace(/[&<>"']/g, function (character) {
    return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character];
  });
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
