export default {
  name: 'founder',
  title: 'Founder (Babu Khelat Ghosh)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Founder Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Name', type: 'string', initialValue: 'Babu Khelat Chandra Ghosh' },
        { name: 'bn', title: 'Bengali Name', type: 'string', initialValue: 'বাবু খেলাৎ চন্দ্র ঘোষ' }
      ]
    },
    {
      name: 'years',
      title: 'Lifespan Era (e.g. 1775 – 1845)',
      type: 'string',
      initialValue: '1775 – 1845'
    },
    {
      name: 'portrait',
      title: 'Archival Portrait / Marble Bust Photograph',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'biography',
      title: 'Biography & Historical Contribution',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Biography', type: 'text', rows: 6 },
        { name: 'bn', title: 'Bengali Biography', type: 'text', rows: 6 }
      ]
    },
    {
      name: 'patronageHighlights',
      title: 'Cultural, Classical Music & Spiritual Patronage',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titleEn', title: 'Milestone Title (EN)', type: 'string' },
            { name: 'titleBn', title: 'Milestone Title (BN)', type: 'string' },
            { name: 'descEn', title: 'Description (EN)', type: 'text', rows: 3 },
            { name: 'descBn', title: 'Description (BN)', type: 'text', rows: 3 }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'years',
      media: 'portrait'
    }
  }
};
