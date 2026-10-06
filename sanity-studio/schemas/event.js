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
        { name: 'en', title: 'English Location (e.g. Thakur Dalan, Khelat Bhawan)', type: 'string' },
        { name: 'bn', title: 'Bengali Location', type: 'string' }
      ]
    },
    {
      name: 'image',
      title: 'Event Banner / Photograph',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'badge',
      title: 'Category / Cultural Badge',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Badge (e.g. Flagship Festival, Musical Heritage)', type: 'string' },
        { name: 'bn', title: 'Bengali Badge', type: 'string' }
      ]
    },
    {
      name: 'desc',
      title: 'Event Overview & Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Description', type: 'text', rows: 4 },
        { name: 'bn', title: 'Bengali Description', type: 'text', rows: 4 }
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
      name: 'whatsappMessage',
      title: 'Pre-filled WhatsApp Enquiry Message',
      type: 'string',
      description: 'Text pre-filled when visitors tap "Click to Enquire"'
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
