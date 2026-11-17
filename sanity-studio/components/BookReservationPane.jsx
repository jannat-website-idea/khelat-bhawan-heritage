import React, {useState} from 'react';
import {Box, Button, Card, Stack, Text, TextInput} from '@sanity/ui';
import {useClient} from 'sanity';
import {MANUAL_BOOKING_PREFIX, bookingErrorMessage, isReservationDate, reserveDate} from '../reservationCalendar.js';

export default function BookReservationPane() {
  const client = useClient({apiVersion: '2024-01-01', useCdn: false});
  const [date, setDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const bookDate = async (event) => {
    event.preventDefault();
    if (saving || !isReservationDate(date)) return;
    setSaving(true);
    setConfirmation('');
    setError('');

    try {
      const id = crypto.randomUUID();
      const bookingId = `${MANUAL_BOOKING_PREFIX}${id}`;
      const reference = `KB-${id.slice(0, 8).toUpperCase()}`;
      await reserveDate(client, date, bookingId, (transaction) => transaction.create({
        _id: bookingId,
        _type: 'reservationEnquiry',
        name: 'Staff reservation',
        reference,
        preferredDate: date,
        status: 'approved',
        receivedAt: new Date().toISOString(),
      }));
      setConfirmation(`${date} is booked (${reference}). Open Booking & Enquiries to manage it.`);
      setDate('');
    } catch (bookingError) {
      setError(bookingErrorMessage(bookingError, 'Could not book the date. Please try again.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box padding={4} overflow="auto" style={{flex: '1 1 auto'}}>
      <Card padding={4} radius={3} border style={{maxWidth: 480}}>
        <form onSubmit={bookDate}>
          <Stack space={4}>
            <Text size={1} muted>Reserve an available date and mark it as booked on the website calendar.</Text>
            <Stack space={2}>
              <Text as="label" htmlFor="staff-reservation-date" size={1} weight="semibold">Reservation date</Text>
              <TextInput
                id="staff-reservation-date"
                type="date"
                required
                value={date}
                disabled={saving}
                onChange={(event) => setDate(event.currentTarget.value)}
              />
            </Stack>
            <Button text="Book & Block Date" type="submit" tone="positive" loading={saving} disabled={saving || !isReservationDate(date)} />
            {error && <Text size={1} tone="critical" role="alert">{error}</Text>}
            {confirmation && <Text size={1} tone="positive" role="status">{confirmation}</Text>}
          </Stack>
        </form>
      </Card>
    </Box>
  );
}
