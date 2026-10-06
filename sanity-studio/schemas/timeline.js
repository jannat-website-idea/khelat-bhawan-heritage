export default {
  name: 'timeline',
  title: 'History & Timeline Milestones',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year / Period (e.g. 1845, 1855, 1881)',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'era',
      title: 'Era Label',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Era (e.g. Foundation Era, Spiritual Milestone)', type: 'string' },
        { name: 'bn', title: 'Bengali Era', type: 'string' }
      ]
    },
    {
      name: 'title',
      title: 'Milestone Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Title', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'bn', title: 'Bengali Title', type: 'string' }
      ]
    },
    {
      name: 'desc',
      title: 'Historical Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Narrative', type: 'text', rows: 4 },
        { name: 'bn', title: 'Bengali Narrative', type: 'text', rows: 4 }
      ]
    },
    {
      name: 'image',
      title: 'Archival Photograph / Portrait',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'title.en',
      media: 'image'
    }
  }
};
