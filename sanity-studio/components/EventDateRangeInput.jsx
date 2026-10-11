import React, {useMemo} from 'react';
import {Box, Card, Flex, Stack, Text} from '@sanity/ui';
import {PatchEvent, set, unset} from 'sanity';

const bengaliDigits = (value) => String(value).replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[Number(digit)]);

const formatEnglish = (start, end) => {
  if (!start) return '';
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  const first = new Date(`${start}T00:00:00`).toLocaleDateString('en-GB', options);
  if (!end || end === start) return first;
  const last = new Date(`${end}T00:00:00`).toLocaleDateString('en-GB', options);
  return `${first} – ${last}`;
};

const formatBengali = (start, end) => {
  if (!start) return '';
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  const first = new Date(`${start}T00:00:00`).toLocaleDateString('bn-IN', options);
  if (!end || end === start) return bengaliDigits(first);
  const last = new Date(`${end}T00:00:00`).toLocaleDateString('bn-IN', options);
  return `${bengaliDigits(first)} – ${bengaliDigits(last)}`;
};

export default function EventDateRangeInput({value = {}, onChange}) {
  const preview = useMemo(() => ({
    en: formatEnglish(value.start, value.end),
    bn: formatBengali(value.start, value.end),
  }), [value.start, value.end]);

  const update = (key, nextValue) => {
    const next = {...value, [key]: nextValue};
    if (key === 'start' && next.end && next.end < nextValue) next.end = nextValue;
    next.en = formatEnglish(next.start, next.end);
    next.bn = formatBengali(next.start, next.end);
    onChange(PatchEvent.from(next.start ? set(next) : unset()));
  };

  return (
    <Card padding={4} radius={3} border tone="primary">
      <Stack space={4}>
        <Box>
          <Text size={2} weight="semibold">Select event date or date range</Text>
          <Text size={1} muted style={{marginTop: 8, lineHeight: 1.5}}>
            Tap either field to use the month/year calendar and day grid. For a single-day event, use the same start and end date.
          </Text>
        </Box>
        <Flex gap={3} wrap="wrap">
          <Box flex={1} style={{minWidth: 210}}>
            <Text size={1} weight="medium">START DATE</Text>
            <input
              aria-label="Event start date"
              type="date"
              value={value.start || ''}
              onChange={(event) => update('start', event.currentTarget.value)}
              style={{boxSizing: 'border-box', marginTop: 8, width: '100%', minHeight: 44, padding: '8px 12px', border: '1px solid #c9b27c', borderRadius: 6, font: 'inherit'}}
            />
          </Box>
          <Box flex={1} style={{minWidth: 210}}>
            <Text size={1} weight="medium">END DATE</Text>
            <input
              aria-label="Event end date"
              type="date"
              min={value.start || undefined}
              value={value.end || ''}
              onChange={(event) => update('end', event.currentTarget.value)}
              style={{boxSizing: 'border-box', marginTop: 8, width: '100%', minHeight: 44, padding: '8px 12px', border: '1px solid #c9b27c', borderRadius: 6, font: 'inherit'}}
            />
          </Box>
        </Flex>
        <Card padding={3} radius={2} tone="positive">
          <Stack space={3}>
            <Text size={1} weight="semibold">AUTOMATIC WEBSITE DATE</Text>
            <Text size={2}>{preview.en || 'Choose a start date'}</Text>
            <Text size={2}>{preview.bn || 'শুরুর তারিখ নির্বাচন করুন'}</Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
}
