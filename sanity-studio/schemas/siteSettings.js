export default {
  name: 'siteSettings',
  title: 'Contact, Hours & Estate Information',
  type: 'document',
  fields: [
    {
      name: 'phonePrimary',
      title: 'Primary Phone Number',
      type: 'string',
      initialValue: '+91 98310 93021'
    },
    {
      name: 'phoneSecondary',
      title: 'Secondary Phone Number',
      type: 'string',
      initialValue: '+91 99031 34231'
    },
    {
      name: 'email',
      title: 'Official Estate Email',
      type: 'string',
      initialValue: 'councilofculture.ghoshbari47@gmail.com'
    },
    {
      name: 'address',
      title: 'Physical Address',
      type: 'string',
      initialValue: '47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India'
    },
    {
      name: 'visitingHoursEn',
      title: 'Visiting Hours (English)',
      type: 'string',
      initialValue: 'Daily: 11:00 AM – 7:00 PM (Prior appointment recommended for heritage tours & meetings)'
    },
    {
      name: 'visitingHoursBn',
      title: 'Visiting Hours (Bengali)',
      type: 'string',
      initialValue: 'প্রতিদিন: সকাল ১১:০০ – সন্ধ্যা ৭:০০ (হেরিটেজ ট্যুর ও সাক্ষাতের জন্য পূর্বানুমতি আবশ্যক)'
    }
  ]
};
