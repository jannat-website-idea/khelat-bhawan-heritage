import React from 'react';
import {Button, Card, Flex, Stack, Text} from '@sanity/ui';
import {PatchEvent, set} from 'sanity';

const actions = [
  {value: 'approved', label: 'Approve & Block Date', tone: 'positive'},
  {value: 'rejected', label: 'Reject Enquiry', tone: 'critical'},
  {value: 'cancelled', label: 'Cancel Booking & Reallocate Slot', tone: 'caution'},
  {value: 'pending', label: 'Return to Pending', tone: 'default'},
];

export default function ReservationStatusInput({value = 'pending', onChange}) {
  return (
    <Card padding={4} radius={3} border>
      <Stack space={4}>
        <Stack space={2}>
          <Text size={2} weight="semibold">Booking decision</Text>
          <Text size={1} muted>Guest information above is read-only. Use one action below to update availability and the live booking status.</Text>
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
              disabled={value === action.value}
              onClick={() => onChange(PatchEvent.from(set(action.value)))}
            />
          ))}
        </Flex>
      </Stack>
    </Card>
  );
}
