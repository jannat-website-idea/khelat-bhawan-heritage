import React from 'react';
import {Grid, Stack, Text, TextArea, TextInput} from '@sanity/ui';

const fields = [
  {name: 'name', label: 'Guest or organisation name', maxLength: 120},
  {name: 'eventType', label: 'Event or occasion', maxLength: 180},
  {name: 'email', label: 'Guest email', type: 'email', maxLength: 254},
  {name: 'phone', label: 'Guest phone', type: 'tel', maxLength: 30},
  {name: 'guests', label: 'Estimated guest count', type: 'number', min: 1, max: 1500},
];

export default function StaffBookingFields({details, setDetails, disabled, idPrefix}) {
  const change = (name) => (event) => {
    const value = event.currentTarget.value;
    setDetails((previous) => ({...previous, [name]: value}));
  };

  return (
    <Stack space={4}>
      <Text size={1} muted>Booking details are optional and visible to signed-in CMS users.</Text>
      <Grid columns={[1, 1, 2]} gap={3}>
        {fields.map(({name, label, ...options}) => {
          const inputId = `${idPrefix}-${name}`;
          return (
            <Stack key={name} space={2}>
              <Text as="label" htmlFor={inputId} size={1} weight="semibold">{label}</Text>
              <TextInput {...options} id={inputId} disabled={disabled} value={details[name] || ''} onChange={change(name)} />
            </Stack>
          );
        })}
      </Grid>
      <Stack space={2}>
        <Text as="label" htmlFor={`${idPrefix}-notes`} size={1} weight="semibold">Booking notes</Text>
        <TextArea id={`${idPrefix}-notes`} rows={3} maxLength={4000} disabled={disabled} value={details.notes || ''} onChange={change('notes')} />
      </Stack>
    </Stack>
  );
}
