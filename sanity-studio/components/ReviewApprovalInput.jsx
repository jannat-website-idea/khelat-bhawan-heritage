import React from 'react';
import {Button, Card, Flex, Stack, Text} from '@sanity/ui';
import {PatchEvent, set} from 'sanity';

export default function ReviewApprovalInput({value = false, onChange}) {
  return (
    <Card padding={4} radius={3} border tone={value ? 'positive' : 'caution'}>
      <Stack space={3}>
        <Text size={2} weight="semibold">Website visibility</Text>
        <Text size={1}>{value ? 'Approved — this review is live on the website.' : 'Hidden — this review remains a draft.'}</Text>
        <Flex gap={2} wrap="wrap">
          <Button text="Approved — Live on Website" tone="positive" disabled={value} onClick={() => onChange(PatchEvent.from(set(true)))} />
          <Button text="Hidden — Keep as Draft" tone="caution" disabled={!value} onClick={() => onChange(PatchEvent.from(set(false)))} />
        </Flex>
      </Stack>
    </Card>
  );
}
