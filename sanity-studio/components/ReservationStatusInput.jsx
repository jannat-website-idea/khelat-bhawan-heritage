import React, {useState} from 'react';
import {Button, Card, Flex, Stack, Text} from '@sanity/ui';
import {PatchEvent, set, useClient, useFormValue} from 'sanity';

const actions = [
  {value: 'approved', label: 'Approve & Block Date', tone: 'positive'},
  {value: 'rejected', label: 'Reject Enquiry', tone: 'critical'},
  {value: 'cancelled', label: 'Cancel Booking & Reallocate Slot', tone: 'caution'},
];

export default function ReservationStatusInput({value = 'pending', onChange}) {
  const client = useClient({apiVersion: '2024-01-01'});
  const documentId = useFormValue(['_id']);
  const [updating, setUpdating] = useState('');
  const [error, setError] = useState('');

  const updateStatus = async (nextStatus) => {
    setUpdating(nextStatus);
    setError('');
    onChange(PatchEvent.from(set(nextStatus)));

    try {
      const publishedId = String(documentId || '').replace(/^drafts\./, '');
      if (!publishedId) throw new Error('Document ID is unavailable');
      await client.patch(publishedId).set({status: nextStatus}).commit();
    } catch (updateError) {
      setError('Could not update the live calendar. Please retry.');
      console.error('Reservation status update failed:', updateError);
    } finally {
      setUpdating('');
    }
  };

  return (
    <Card padding={4} radius={3} border>
      <Stack space={4}>
        <Stack space={2}>
          <Text size={2} weight="semibold">Booking decision</Text>
          <Text size={1} muted>Guest information above is read-only. Each action updates the enquiry and live website calendar immediately.</Text>
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
              mode={value === action.value ? 'default' : 'ghost'}
              loading={updating === action.value}
              disabled={Boolean(updating) || value === action.value || (value === 'approved' && action.value === 'rejected')}
              onClick={() => updateStatus(action.value)}
            />
          ))}
        </Flex>
        {error ? <Text size={1} tone="critical">{error}</Text> : null}
      </Stack>
    </Card>
  );
}
