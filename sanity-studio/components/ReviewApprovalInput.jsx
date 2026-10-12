import React, {useState} from 'react';
import {Button, Card, Flex, Stack, Text} from '@sanity/ui';
import {PatchEvent, set, useClient, useFormValue} from 'sanity';

export default function ReviewApprovalInput({value = false, onChange}) {
  const client = useClient({apiVersion: '2024-01-01'});
  const documentId = useFormValue(['_id']);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const updateVisibility = async (isApproved) => {
    setUpdating(true);
    setError('');
    onChange(PatchEvent.from(set(isApproved)));

    try {
      const publishedId = String(documentId || '').replace(/^drafts\./, '');
      if (!publishedId) throw new Error('Document ID is unavailable');
      await client.patch(publishedId).set({isApproved}).commit();
    } catch (updateError) {
      setError('Could not update the live website. Please retry.');
      console.error('Review visibility update failed:', updateError);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card padding={4} radius={3} border tone={value ? 'positive' : 'caution'}>
      <Stack space={3}>
        <Text size={2} weight="semibold">Review moderation</Text>
        <Text size={1}>{value ? 'Approved — this review is live on the website.' : 'Pending or rejected — this review is hidden from the website.'}</Text>
        <Flex gap={2} wrap="wrap">
          <Button
            text={value ? 'Approved — Currently Live' : 'Approve — Make Live'}
            tone="positive"
            mode={value ? 'default' : 'ghost'}
            loading={updating}
            disabled={updating}
            onClick={() => updateVisibility(true)}
          />
          <Button
            text={!value ? 'Rejected — Currently Hidden' : 'Reject — Remove from Website'}
            tone="critical"
            mode={!value ? 'default' : 'ghost'}
            disabled={updating}
            onClick={() => updateVisibility(false)}
          />
        </Flex>
        {error ? <Text size={1} tone="critical">{error}</Text> : null}
      </Stack>
    </Card>
  );
}
