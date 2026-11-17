import React, {useState} from 'react';
import {Button, Card, Flex, Stack, Text} from '@sanity/ui';
import {useClient, useEditState, useFormValue} from 'sanity';
import {MANUAL_BOOKING_PREFIX, bookingErrorMessage, isReservationDate, reserveDate} from '../reservationCalendar.js';
import StaffBookingDetails from './StaffBookingDetails';

const actions = [
  {value: 'approved', label: 'Approve & Block Date', tone: 'positive'},
  {value: 'rejected', label: 'Reject Enquiry', tone: 'critical'},
  {value: 'cancelled', label: 'Cancel Booking & Reallocate Slot', tone: 'caution'},
];

function canUpdateStatus(booking, nextStatus) {
  if (!booking || booking.status === nextStatus || booking.status === 'cancelled') return false;
  if (nextStatus === 'cancelled') return booking.status === 'approved';
  if (nextStatus === 'approved') return isReservationDate(booking.preferredDate);
  return booking.status !== 'approved';
}

export default function ReservationStatusInput() {
  const client = useClient({apiVersion: '2024-01-01', useCdn: false});
  const documentId = String(useFormValue(['_id']) || '').replace(/^drafts\./, '');
  const isStaffBooking = documentId.startsWith(MANUAL_BOOKING_PREFIX);
  const {published} = useEditState(documentId, 'reservationEnquiry');
  const value = published?.status || 'pending';
  const [updating, setUpdating] = useState('');
  const [error, setError] = useState('');

  const updateStatus = async (nextStatus) => {
    setUpdating(nextStatus);
    setError('');

    try {
      const [booking, draft] = await client.getDocuments([documentId, `drafts.${documentId}`]);
      if (!canUpdateStatus(booking, nextStatus)) throw new Error('This action is no longer available.');

      const updateBooking = (transaction) => {
        transaction.patch(booking._id, (patch) => patch.ifRevisionId(booking._rev).set({status: nextStatus}));
        if (draft) {
          transaction.patch(draft._id, (patch) => patch.ifRevisionId(draft._rev).set({status: nextStatus}));
        }
        return transaction;
      };

      if (nextStatus === 'approved') {
        await reserveDate(client, booking.preferredDate, booking._id, updateBooking);
      } else {
        await updateBooking(client.transaction()).commit({visibility: 'sync'});
      }
    } catch (updateError) {
      setError(bookingErrorMessage(updateError, 'Could not update the live calendar. Please retry.'));
    } finally {
      setUpdating('');
    }
  };

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} border>
        <Stack space={4}>
          <Stack space={2}>
            <Text size={2} weight="semibold">Booking decision</Text>
            <Text size={1} muted>Each action updates the booking and the live website calendar immediately.</Text>
          </Stack>
          <Card padding={3} radius={2} tone={value === 'approved' ? 'positive' : value === 'rejected' ? 'critical' : value === 'cancelled' ? 'caution' : 'primary'}>
            <Text size={1} weight="semibold">CURRENT STATUS: {value.toUpperCase()}</Text>
          </Card>
          <Flex gap={2} wrap="wrap">
            {actions.map((action) => (
              <Button
                key={action.value}
                text={action.label}
                tone={action.tone}
                type="button"
                mode={value === action.value ? 'default' : 'ghost'}
                loading={updating === action.value}
                disabled={Boolean(updating) || !canUpdateStatus(published, action.value)}
                onClick={() => updateStatus(action.value)}
              />
            ))}
          </Flex>
          {error ? <Text size={1} tone="critical">{error}</Text> : null}
        </Stack>
      </Card>
      {isStaffBooking && <StaffBookingDetails key={documentId} bookingId={documentId} client={client} />}
    </Stack>
  );
}
