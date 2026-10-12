import {createClient} from '@sanity/client';

const json = (response, status, body) => {
  response.status(status).setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(body));
};

const clean = (value, max = 2000) => String(value || '').trim().slice(0, max);
const countWords = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const countCharacters = (value) => value.trim().length;
const validEmail = (value) => value.length <= 254 && !value.includes('..') && /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);
const validPhone = (value) => {
  const raw = value.trim();
  let digits = raw.replace(/\D/g, '');
  if ((raw.startsWith('+91') || raw.startsWith('0091')) && digits.length === 12) digits = digits.slice(-10);
  return /^\d{10,11}$/.test(digits) && !/^(\d)\1+$/.test(digits);
};

export default async function handler(request, response) {
  if (request.method !== 'POST') return json(response, 405, {error: 'Method not allowed'});

  const payload = request.body || {};
  if (payload.company) return json(response, 200, {ok: true}); // Honeypot.

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 180);
  const phone = clean(payload.phone, 60);
  const message = clean(payload.message, 4000);
  const source = clean(payload.source, 80) || 'Website enquiry';
  const eventType = clean(payload.eventType, 180);
  const preferredDate = clean(payload.preferredDate, 20);
  const guestText = clean(payload.guests, 8);
  const guestCount = /^\d+$/.test(guestText) ? Number(guestText) : undefined;
  const isReservation = source.toLowerCase().includes('reservation');
  const isFeedback = source.toLowerCase().includes('feedback');
  const messageIsValid = isReservation ? countCharacters(message) >= 30 : countWords(message) >= 20;

  const guestCountIsValid = !isReservation || (Number.isInteger(guestCount) && guestCount >= 1 && guestCount <= 150);

  if (!name || !validEmail(email) || !validPhone(phone) || !messageIsValid || !guestCountIsValid) {
    return json(response, 400, {error: 'Please complete all required fields.'});
  }

  const reference = `KB-${Date.now().toString().slice(-8)}`;
  const receivedAt = new Date().toISOString();
  try {
    const token = process.env.SANITY_WRITE_TOKEN;
    if (!token) throw new Error('SANITY_WRITE_TOKEN is not configured');

    const sanity = createClient({
      projectId: process.env.SANITY_PROJECT_ID || '4w2m42ab',
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      token,
      useCdn: false,
    });

    const documentId = `${isFeedback ? 'feedback' : 'reservation'}-${reference.toLowerCase()}`;
    const document = isFeedback
      ? {
          _id: documentId,
          _type: 'feedback',
          name,
          rating: Math.min(5, Math.max(1, Number.parseInt(payload.rating, 10) || 5)),
          visitType: eventType || 'Website visitor',
          review: message,
          isApproved: false,
        }
      : {
          _id: documentId,
          _type: 'reservationEnquiry',
          reference,
          name,
          email,
          phone,
          ...(preferredDate ? {preferredDate} : {}),
          eventType: eventType || source,
          ...(guestCount ? {guests: String(guestCount)} : {}),
          message,
          status: 'pending',
          receivedAt,
        };

    await sanity.createIfNotExists(document);

    return json(response, 200, {
      ok: true,
      reference,
      receivedAt,
      source,
      eventType,
      preferredDate,
      guestCount,
      cmsDocumentId: documentId,
    });
  } catch (error) {
    console.error('Enquiry submission failed:', error);
    return json(response, 500, {error: 'We could not send your enquiry. Please try again or contact us by phone.'});
  }
}
