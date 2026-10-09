/**
 * Khelat Bhawan Reservation Enquiries & Calendar Allocation Store
 * Handles:
 * - Read-only view of all booking enquiries
 * - Approve (auto-blocks calendar date on website + sends polite acceptance email)
 * - Reject (sends polite rejection email)
 * - Cancel & Reallocate (frees the calendar date on website for others to book)
 */

import { getBlockedDates, saveBlockedDates } from './bookingData';

const ENQUIRIES_STORAGE_KEY = 'khelat_bhawan_reservation_enquiries_v1';

export const initialEnquiries = [
  {
    id: 'KB-88349102',
    reference: 'KB-88349102',
    name: 'Rajesh & Poulomi Gangopadhyay',
    email: 'rajesh.poulomi@example.com',
    phone: '+91 98301 23456',
    eventType: 'Royal Weddings & Banquets',
    preferredDate: '2026-11-28',
    guests: '350',
    message: 'We wish to host our traditional Bengali wedding ceremony at Thakur Dalan courtyard. Looking for catering setup and evening lighting details.',
    status: 'approved', // 'pending', 'approved', 'rejected', 'cancelled'
    receivedAt: '2026-10-08T14:20:00.000Z',
    notes: 'Approved by Estate Custodian. Date reserved on live calendar.'
  },
  {
    id: 'KB-77192044',
    reference: 'KB-77192044',
    name: 'Sunil Sen Productions',
    email: 'sunil.sen.films@example.com',
    phone: '+91 98319 87654',
    eventType: 'Period Cinema & Production Shoots',
    preferredDate: '2026-12-12',
    guests: '45 (Cast & Crew)',
    message: 'Feature film sequence requiring the 1845 Corinthian colonnades and antique library hall. 2-day daylight shoot requested.',
    status: 'pending',
    receivedAt: '2026-10-09T09:15:00.000Z',
    notes: 'Pending schedule verification with ritual calendar.'
  },
  {
    id: 'KB-66481093',
    reference: 'KB-66481093',
    name: 'Kolkata Classical Music Circle',
    email: 'classical.soiree.kol@example.com',
    phone: '+91 99033 11223',
    eventType: 'Classical Soirees & Cultural Evenings',
    preferredDate: '2027-01-16',
    guests: '150',
    message: 'Winter Sarod & Vocal Baithak featuring senior Ustads and emerging disciples in the sanctified courtyard.',
    status: 'pending',
    receivedAt: '2026-10-09T18:45:00.000Z',
    notes: 'Awaiting coordinator review.'
  },
  {
    id: 'KB-55902188',
    reference: 'KB-55902188',
    name: 'Global Heritage Forum',
    email: 'heritage.forum@example.com',
    phone: '+91 98300 99887',
    eventType: 'Corporate Conclaves & Heritage Dinners',
    preferredDate: '2026-10-20', // Clashes with Durga Puja
    guests: '100',
    message: 'Requesting exclusive banquet during the Durga Puja festival week.',
    status: 'rejected',
    receivedAt: '2026-10-06T11:00:00.000Z',
    notes: 'Declined due to sacred family Durga Puja ceremonies occurring on this date.'
  }
];

export function getEnquiries() {
  try {
    const saved = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Could not read enquiries from storage:', e);
  }
  return initialEnquiries;
}

export function saveEnquiriesList(list) {
  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('khelat_enquiries_updated', { detail: list }));
  } catch (e) {
    console.error('Could not save enquiries list:', e);
  }
}

export function recordNewEnquiry(enquiryData) {
  const reference = enquiryData.reference || `KB-${Date.now().toString().slice(-8)}`;
  const item = {
    id: reference,
    reference,
    name: enquiryData.name || 'Guest',
    email: enquiryData.email || '',
    phone: enquiryData.phone || '',
    eventType: enquiryData.eventType || enquiryData.visitType || 'Heritage Reservation',
    preferredDate: enquiryData.preferredDate || '',
    guests: enquiryData.guests || '1',
    message: enquiryData.message || '',
    status: 'pending',
    receivedAt: new Date().toISOString(),
    notes: 'Submitted via website reservation form.'
  };

  const current = getEnquiries();
  const updated = [item, ...current];
  saveEnquiriesList(updated);
  return item;
}

/**
 * Send automated email notification via FormSubmit
 */
async function sendStatusEmail({ toEmail, guestName, reference, status, date, reason }) {
  if (!toEmail || toEmail.includes('@example.com')) return;

  let subject = '';
  let bodyMessage = '';

  if (status === 'approved') {
    subject = `Reservation Confirmed — Khelat Bhawan Heritage Estate [${reference}]`;
    bodyMessage = `Dear ${guestName},\n\nWe are pleased to inform you that your reservation request (Reference: ${reference}) for ${date || 'the requested date'} at Khelat Bhawan Heritage Palace has been APPROVED.\n\nThe requested date has been officially reserved for your event on our estate calendar.\n\nOur Estate Concierge Liaison will contact you shortly regarding contractual formalities, security guidelines, and access timings.\n\nWarm regards,\nEstate Custodian Council\nKhelat Bhawan Heritage Estate\n47 Pathuria Ghata Street, Kolkata – 700006\nPhone: +91 98310 93021`;
  } else if (status === 'rejected') {
    subject = `Reservation Update — Khelat Bhawan Heritage Estate [${reference}]`;
    bodyMessage = `Dear ${guestName},\n\nThank you for your interest in Khelat Bhawan Heritage Palace (Reference: ${reference}).\n\nAfter reviewing our architectural conservation protocols and ceremonial schedule, we regret to inform you that we are unable to accommodate your reservation request for ${date || 'the requested date'}.\n\nReason: ${reason || 'Date conflict with existing heritage traditions or maintenance works.'}\n\nYou are welcome to submit an alternative date or connect with our concierge directly at +91 98310 93021.\n\nRespectfully,\nEstate Administration\nKhelat Bhawan Heritage Estate`;
  } else if (status === 'cancelled') {
    subject = `Reservation Cancelled & Released — Khelat Bhawan [${reference}]`;
    bodyMessage = `Dear ${guestName},\n\nThis is to confirm that your reservation (Reference: ${reference}) for ${date || 'the scheduled date'} at Khelat Bhawan has been cancelled, and the date has been released.\n\nShould you wish to reschedule in the future, please do not hesitate to reach out to us.\n\nWarm regards,\nKhelat Bhawan Concierge`;
  }

  try {
    await fetch('https://formsubmit.co/ajax/domainname.03@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        guestEmail: toEmail,
        guestName,
        _subject: subject,
        message: bodyMessage,
        _template: 'box',
        _captcha: 'false'
      })
    });
  } catch (err) {
    console.warn('Automated email dispatch error:', err);
  }
}

/**
 * APPROVE RESERVATION:
 * 1. Mark status as 'approved'
 * 2. Block the date on the website live calendar
 * 3. Send automated polite approval email
 */
export async function approveReservation(enquiryId) {
  const current = getEnquiries();
  const index = current.findIndex(e => e.id === enquiryId || e.reference === enquiryId);
  if (index === -1) return false;

  const item = current[index];
  const updatedItem = {
    ...item,
    status: 'approved',
    approvedAt: new Date().toISOString(),
    notes: 'Approved by Admin. Date blocked on live website calendar.'
  };

  current[index] = updatedItem;
  saveEnquiriesList(current);

  // Automatically block date on live calendar if provided
  if (item.preferredDate) {
    const blocked = getBlockedDates();
    if (!blocked.includes(item.preferredDate)) {
      const updatedBlocked = [...blocked, item.preferredDate];
      saveBlockedDates(updatedBlocked);
      window.dispatchEvent(new CustomEvent('khelat_blocked_dates_updated', { detail: updatedBlocked }));
    }
  }

  // Send polite approval email
  await sendStatusEmail({
    toEmail: item.email,
    guestName: item.name,
    reference: item.reference,
    status: 'approved',
    date: item.preferredDate
  });

  return true;
}

/**
 * REJECT RESERVATION:
 * 1. Mark status as 'rejected'
 * 2. If date was blocked, release it
 * 3. Send polite rejection email
 */
export async function rejectReservation(enquiryId, rejectionReason = '') {
  const current = getEnquiries();
  const index = current.findIndex(e => e.id === enquiryId || e.reference === enquiryId);
  if (index === -1) return false;

  const item = current[index];
  const updatedItem = {
    ...item,
    status: 'rejected',
    rejectedAt: new Date().toISOString(),
    notes: rejectionReason || 'Declined by Administrator.'
  };

  current[index] = updatedItem;
  saveEnquiriesList(current);

  // If date was previously blocked, release it
  if (item.preferredDate) {
    const blocked = getBlockedDates();
    const updatedBlocked = blocked.filter(d => d !== item.preferredDate);
    saveBlockedDates(updatedBlocked);
    window.dispatchEvent(new CustomEvent('khelat_blocked_dates_updated', { detail: updatedBlocked }));
  }

  // Send polite rejection email
  await sendStatusEmail({
    toEmail: item.email,
    guestName: item.name,
    reference: item.reference,
    status: 'rejected',
    date: item.preferredDate,
    reason: rejectionReason
  });

  return true;
}

/**
 * CANCEL & REALLOCATE BOOKING:
 * 1. Mark status as 'cancelled'
 * 2. Free up the date on the website live calendar so someone else can book it!
 * 3. Send notification email
 */
export async function cancelAndReallocateReservation(enquiryId) {
  const current = getEnquiries();
  const index = current.findIndex(e => e.id === enquiryId || e.reference === enquiryId);
  if (index === -1) return false;

  const item = current[index];
  const updatedItem = {
    ...item,
    status: 'cancelled',
    cancelledAt: new Date().toISOString(),
    notes: 'Booking cancelled by Admin. Date slot freed and reallocated for new bookings.'
  };

  current[index] = updatedItem;
  saveEnquiriesList(current);

  // Release the date from the live calendar so other guests can book it!
  if (item.preferredDate) {
    const blocked = getBlockedDates();
    const updatedBlocked = blocked.filter(d => d !== item.preferredDate);
    saveBlockedDates(updatedBlocked);
    window.dispatchEvent(new CustomEvent('khelat_blocked_dates_updated', { detail: updatedBlocked }));
  }

  // Send cancellation email
  await sendStatusEmail({
    toEmail: item.email,
    guestName: item.name,
    reference: item.reference,
    status: 'cancelled',
    date: item.preferredDate
  });

  return true;
}
