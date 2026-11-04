// Re-enable this flag when the client is ready to accept new reservations.
export const RESERVATIONS_ENABLED = false;

export const RESERVATIONS_PAUSED_NOTICE = {
  en: 'Reservations are temporarily unavailable while this section is being updated. New requests are currently paused.',
  bn: 'এই বিভাগটি আপডেট করা হচ্ছে। আপাতত নতুন রিজার্ভেশন ও বুকিং আবেদন গ্রহণ বন্ধ রয়েছে।',
};

export function isReservationEnquiry(payload = {}) {
  return /reservation|booking/i.test(String(payload.source || '')) ||
    Boolean(String(payload.preferredDate || '').trim()) ||
    Boolean(String(payload.guests ?? '').trim());
}
