export default {
  name: 'event',
  title: 'Palace Events & Cultural Calendar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Title', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'bn', title: 'Bengali Title', type: 'string' }
      ]
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Date (e.g. October 18 – 22, 2026)', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'bn', title: 'Bengali Date (e.g. ১৮ – ২২ অক্টোবর, ২০২৬)', type: 'string' }
      ]
    },
    {
      name: 'time',
      title: 'Event Time',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Time (e.g. 5:30 PM – 9:30 PM or All Day)', type: 'string' },
        { name: 'bn', title: 'Bengali Time', type: 'string' }
      ]
    },
    {
      name: 'location',
      title: 'Location / Venue Hall',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Venue (e.g. Thakur Dalan, Khelat Bhawan)', type: 'string' },
        { name: 'bn', title: 'Bengali Venue', type: 'string' }
      ]
    },
    {
      name: 'image',
      title: 'Main Event Cover Banner',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'galleryImages',
      title: 'Additional Event Photos (Up to 3–4 Images)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ],
      validation: (Rule) => Rule.max(4).error('You can upload a maximum of 4 additional photographs.')
    },
    {
      name: 'badge',
      title: 'Category / Cultural Badge',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Badge (e.g. Flagship Cultural Festival, Musical Heritage)', type: 'string' },
        { name: 'bn', title: 'Bengali Badge', type: 'string' }
      ]
    },
    {
      name: 'desc',
      title: 'Event Overview & Full Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Description', type: 'text', rows: 5 },
        { name: 'bn', title: 'Bengali Description', type: 'text', rows: 5 }
      ]
    },
    {
      name: 'highlights',
      title: 'Key Highlights (Bullet Points)',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Highlights', type: 'array', of: [{ type: 'string' }] },
        { name: 'bn', title: 'Bengali Highlights', type: 'array', of: [{ type: 'string' }] }
      ]
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Inquiry Number',
      type: 'string',
      description: 'Default is 9831093021. You can enter a custom 10-digit number if needed.',
      initialValue: '9831093021'
    },
    {
      name: 'whatsappMessage',
      title: 'Pre-filled WhatsApp Enquiry Message',
      type: 'string',
      description: 'Text pre-filled when visitors tap "Click to Enquire" (e.g. Hello, I would like to enquire about attending the Durga Puja celebration at Khelat Bhawan.)'
    },
    {
      name: 'eventBrochure',
      title: 'Downloadable Event Brochure / Program PDF',
      type: 'file'
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'date.en',
      media: 'image'
    }
  }
};
