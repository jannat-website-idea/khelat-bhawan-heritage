import {validateEnquiry} from './enquiryValidation';
import { recordNewEnquiry } from '../data/enquiriesStore';

export async function submitEnquiry(payload) {
  const validationErrors = validateEnquiry(
    payload,
    payload.source === 'Reservation enquiry' ? {minMessageCharacters: 30} : {},
  );
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

  // Automatically record enquiry into CMS enquiries store
  try {
    recordNewEnquiry({
      ...payload,
      reference: result.reference || `KB-${Date.now().toString().slice(-8)}`
    });
  } catch (err) {
    console.warn('Could not record to local enquiries store:', err);
  }

  if (result.emailDelivered === false) {
    console.warn('The enquiry was saved, but the email provider did not confirm delivery.');
  }
  return result;
}
