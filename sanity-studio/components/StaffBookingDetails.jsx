import React, {useEffect, useId, useState} from 'react';
import {Button, Card, Stack, Text} from '@sanity/ui';
import StaffBookingFields from './StaffBookingFields';
import {bookingErrorMessage, staffBookingDetailsDocument, staffBookingDetailsId} from '../reservationCalendar.js';

export default function StaffBookingDetails({client, bookingId}) {
  const inputId = useId();
  const detailsId = staffBookingDetailsId(bookingId);
  const [details, setDetails] = useState({});
  const [revision, setRevision] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    client.getDocument(detailsId).then((document) => {
      if (!active) return;
      setDetails(document || {});
      setRevision(document?._rev || null);
      setLoaded(true);
    }).catch(() => {
      if (active) setError('Could not load the booking details. Refresh and try again.');
    });
    return () => { active = false; };
  }, [client, detailsId]);

  const saveDetails = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!loaded || saving) return;
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const {_id, _type, ...fields} = staffBookingDetailsDocument(bookingId, details);
      const document = revision
        ? await client.patch(_id).ifRevisionId(revision).set(fields).commit()
        : await client.create({_id, _type, ...fields});
      setRevision(document._rev);
      setDetails(document);
      setSaved(true);
    } catch (updateError) {
      setError(bookingErrorMessage(updateError, 'Could not save the booking details. Please try again.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card padding={4} radius={3} border>
      <form onSubmit={saveDetails}>
        <Stack space={4}>
          <Text size={2} weight="semibold">Staff booking details</Text>
          {loaded && <StaffBookingFields details={details} setDetails={setDetails} disabled={saving} idPrefix={inputId} />}
          <Button type="submit" text="Save Booking Details" loading={saving} disabled={!loaded || saving} />
          {error && <Text size={1} tone="critical" role="alert">{error}</Text>}
          {saved && <Text size={1} tone="positive" role="status">Booking details saved.</Text>}
        </Stack>
      </form>
    </Card>
  );
}
