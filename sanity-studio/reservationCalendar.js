import {INITIAL_BLOCKED_DATES} from '../src/data/bookingData.js';
import {CALENDAR_BLOCKS_QUERY} from '../src/sanity/queries.js';
import {collectBlockedDates} from '../src/utils/calendarBlocks.js';

export const MANUAL_BOOKING_PREFIX = 'reservation-staff-';

export function isReservationDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

export async function reserveDate(client, date, bookingId, addBooking) {
  if (!isReservationDate(date)) throw new Error('Choose a valid reservation date.');

  const lockId = `reservationDateLock.${date}`;
  const lock = await client.getDocument(lockId);
  // The document endpoint can see a previous booking before it reaches the query index.
  const owner = lock && await client.getDocument(lock.bookingId);
  const calendar = await client.fetch(CALENDAR_BLOCKS_QUERY, {}, {perspective: 'published'});
  const dateIsTaken = owner?.status === 'approved' && owner.preferredDate === date;
  if (dateIsTaken || collectBlockedDates(calendar, INITIAL_BLOCKED_DATES).includes(date)) {
    throw new Error('This date is already booked or blocked.');
  }

  // Both staff bookings and enquiry approvals claim the date in the same transaction.
  const transaction = client.transaction();
  if (lock) {
    transaction.patch(lockId, (patch) => patch.ifRevisionId(lock._rev).set({bookingId}));
  } else {
    transaction.create({_id: lockId, _type: 'reservationDateLock', bookingId});
  }
  addBooking(transaction);
  await transaction.commit({visibility: 'sync'});
}

export function bookingErrorMessage(error, fallback) {
  if (error.statusCode === 409) return 'The booking or calendar changed. Refresh and try again.';
  return error.statusCode ? fallback : error.message || fallback;
}
