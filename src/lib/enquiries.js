import {validateEnquiry} from './enquiryValidation';

export async function submitEnquiry(payload) {
  const validationErrors = validateEnquiry(payload);
  if (Object.keys(validationErrors).length) {
    const error = new Error(Object.values(validationErrors)[0]);
    error.validationErrors = validationErrors;
    throw error;
  }

  const response = await fetch('/api/enquiry', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Unable to send your enquiry. Please try again.');

  const details = [
    `Reference: ${result.reference}`,
    `Source: ${payload.source || 'Website enquiry'}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not supplied'}`,
    payload.eventType ? `Event / enquiry type: ${payload.eventType}` : '',
    payload.preferredDate ? `Preferred date: ${payload.preferredDate}` : '',
    payload.guests ? `Estimated guests: ${payload.guests}` : '',
    '',
    'Message:',
    payload.message,
  ].filter(Boolean).join('\n');

  const emailResponse = await fetch('https://formsubmit.co/ajax/domainname.03@gmail.com', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: details,
      _subject: `New Khelat Bhawan enquiry — ${result.reference}`,
      _template: 'table',
      _captcha: 'false',
      _autoresponse: `Thank you for contacting Khelat Bhawan. We have received your enquiry (${result.reference}). A member of the Khelat Bhawan team will connect with you within 48 hours.`,
    }),
  });

  if (!emailResponse.ok) throw new Error('Your enquiry was recorded, but the email notification could not be sent. Please call us if it is urgent.');
  return result;
}
