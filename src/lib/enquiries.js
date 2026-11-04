import {validateEnquiry} from './enquiryValidation';
import { recordNewEnquiry } from '../data/enquiriesStore';
import {isReservationEnquiry, RESERVATIONS_ENABLED, RESERVATIONS_PAUSED_NOTICE} from '../config/reservations.js';

export async function submitEnquiry(payload) {
  if (!RESERVATIONS_ENABLED && isReservationEnquiry(payload)) {
    throw new Error(RESERVATIONS_PAUSED_NOTICE.en);
  }
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

  // Email dispatch happens in the server endpoint so page navigation, browser
  // privacy settings, and FormSubmit's AJAX autoresponse limitation cannot
  // interrupt the visitor acknowledgement.
  if (!result.emailDelivered) {
    console.warn('The enquiry is safely stored in Sanity, but email delivery was not confirmed.');
  }
  return result;
}
