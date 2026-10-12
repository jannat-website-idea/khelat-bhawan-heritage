import React, {useEffect, useMemo, useState} from 'react';
import {Box, Card, Flex, Stack, Text} from '@sanity/ui';
import {PatchEvent, set, unset, useClient} from 'sanity';

const calendarQuery = `{
  "reservationDates": *[_type == "reservationEnquiry" && status == "approved" && defined(preferredDate)].preferredDate,
  "eventRanges": *[_type == "event" && defined(date)]{"start": date.start, "end": coalesce(date.end, date.start), "label": date.en}
}`;

const expandRange = (start, end = start) => {
  if (!start) return [];
  const first = new Date(`${start}T00:00:00`);
  const last = new Date(`${end || start}T00:00:00`);
  const result = [];
  const cursor = new Date(first);
  while (cursor <= last && result.length < 370) {
    const y = cursor.getFullYear();
    const m = String(cursor.getMonth() + 1).padStart(2, '0');
    const d = String(cursor.getDate()).padStart(2, '0');
    result.push(`${y}-${m}-${d}`);
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
};

const parseLegacyLabel = (label = '') => {
  const text = String(label).trim().replace(/–|—/g, '-');
  const range = text.match(/^([A-Za-z]+)\s+(\d{1,2})\s*-\s*(\d{1,2}),?\s+(\d{4})$/);
  if (range) {
    const [, month, startDay, endDay, year] = range;
    const first = new Date(`${month} ${startDay}, ${year}`);
    const last = new Date(`${month} ${endDay}, ${year}`);
    const iso = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return Number.isNaN(first.getTime()) || Number.isNaN(last.getTime()) ? [] : expandRange(iso(first), iso(last));
  }
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return [];
  return [`${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`];
};

const formatEnglish = (start, end) => {
  if (!start) return '';
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  const first = new Date(`${start}T00:00:00`).toLocaleDateString('en-GB', options);
  if (!end || end === start) return first;
  const last = new Date(`${end}T00:00:00`).toLocaleDateString('en-GB', options);
  return `${first} – ${last}`;
};

export default function EventDateRangeInput({value = {}, onChange}) {
  const client = useClient({apiVersion: '2024-01-01'});
  const initialDate = value.start ? new Date(`${value.start}T00:00:00`) : new Date();
  const [month, setMonth] = useState(initialDate.getMonth());
  const [year, setYear] = useState(initialDate.getFullYear());
  const [blockedDates, setBlockedDates] = useState(new Set());
  const preview = useMemo(
    () => formatEnglish(value.start, value.end),
    [value.start, value.end],
  );

  const update = (key, nextValue) => {
    const next = {start: value.start, end: value.end, [key]: nextValue};
    if (key === 'start' && next.end && next.end < nextValue) next.end = nextValue;
    next.en = formatEnglish(next.start, next.end);
    onChange(PatchEvent.from(next.start ? set(next) : unset()));
  };

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      const data = await client.fetch(calendarQuery);
      if (!active) return;
      const dates = new Set(data?.reservationDates || []);
      (data?.eventRanges || []).forEach((event) => {
        const eventDates = event.start ? expandRange(event.start, event.end) : parseLegacyLabel(event.label);
        eventDates.forEach((date) => dates.add(date));
      });
      setBlockedDates(dates);
    };
    refresh().catch(console.error);
    const subscription = client.listen('*[_type in ["event", "reservationEnquiry"]]', {}, {visibility: 'query'}).subscribe({
      next: () => refresh().catch(console.error),
      error: console.error,
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [client]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-GB', {month: 'long', year: 'numeric'});
  const selectedDates = new Set(expandRange(value.start, value.end || value.start));

  const moveMonth = (step) => {
    const next = new Date(year, month + step, 1);
    setMonth(next.getMonth());
    setYear(next.getFullYear());
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
            <Text size={2}>{preview || 'Choose a start date'}</Text>
          </Stack>
        </Card>
        <Card padding={3} radius={2} border>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <button type="button" onClick={() => moveMonth(-1)} aria-label="Previous month" style={{border: '1px solid #d8d8d8', borderRadius: 6, background: 'transparent', padding: '6px 10px', cursor: 'pointer'}}>←</button>
              <Text size={2} weight="semibold">{monthLabel}</Text>
              <button type="button" onClick={() => moveMonth(1)} aria-label="Next month" style={{border: '1px solid #d8d8d8', borderRadius: 6, background: 'transparent', padding: '6px 10px', cursor: 'pointer'}}>→</button>
            </Flex>
            <Box style={{display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 5}}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <Text key={day} size={0} muted align="center">{day}</Text>)}
              {Array.from({length: firstDay}).map((_, index) => <Box key={`empty-${index}`} />)}
              {Array.from({length: daysInMonth}).map((_, index) => {
                const day = index + 1;
                const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const selected = selectedDates.has(iso);
                const booked = blockedDates.has(iso);
                return (
                  <Box key={iso} style={{padding: '7px 2px', textAlign: 'center', borderRadius: 6, border: `1px solid ${selected ? '#87651b' : booked ? '#dc2626' : '#dedede'}`, background: selected ? '#f4df9b' : booked ? '#fee2e2' : 'transparent', color: booked ? '#991b1b' : 'inherit'}}>
                    <Text size={1} weight={selected || booked ? 'semibold' : 'regular'}>{day}</Text>
                    {booked ? <div style={{fontSize: 8, marginTop: 2}}>BOOKED</div> : null}
                  </Box>
                );
              })}
            </Box>
            <Text size={1} muted>Red dates are blocked by an approved booking or a published event. The selected event range is highlighted in gold.</Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
}
