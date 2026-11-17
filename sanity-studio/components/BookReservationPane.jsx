import React, {useState} from 'react';
import {Box, Button, Card, Stack, Text, TextInput} from '@sanity/ui';
import {useClient} from 'sanity';
import {bookingErrorMessage, createStaffBooking, isReservationDate} from '../reservationCalendar.js';
import StaffBookingFields from './StaffBookingFields';

export default function BookReservationPane() {
  const client = useClient({apiVersion: '2024-01-01', useCdn: false});
  const [date, setDate] = useState('');
  const [details, setDetails] = useState({});
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
      const reference = await createStaffBooking(client, date, details);
      setConfirmation(`${date} is booked (${reference}). Open Booking & Enquiries to manage it.`);
      setDate('');
      setDetails({});
    } catch (bookingError) {
      setError(bookingErrorMessage(bookingError, 'Could not book the date. Please try again.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box padding={4} overflow="auto" style={{flex: '1 1 auto'}}>
      <Card padding={4} radius={3} border style={{maxWidth: 640}}>
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
            <StaffBookingFields details={details} setDetails={setDetails} disabled={saving} idPrefix="new-staff-booking" />
            <Button text="Book & Block Date" type="submit" tone="positive" loading={saving} disabled={saving || !isReservationDate(date)} />
            {error && <Text size={1} tone="critical" role="alert">{error}</Text>}
            {confirmation && <Text size={1} tone="positive" role="status">{confirmation}</Text>}
          </Stack>
        </form>
      </Card>
    </Box>
  );
}
