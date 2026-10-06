export default {
  name: 'aboutPage',
  title: 'Heritage & About Estate',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Title', type: 'string', initialValue: 'The Imperial Legacy of Khelat Bhawan' },
        { name: 'bn', title: 'Bengali Title', type: 'string', initialValue: 'খেলাৎ ভবন ও রাজবাড়ির ঐতিহাসিক উত্তরাধিকার' }
      ]
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle / Tagline',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Subtitle', type: 'text', rows: 2 },
        { name: 'bn', title: 'Bengali Subtitle', type: 'text', rows: 2 }
      ]
    },
    {
      name: 'historyOverview',
      title: 'Estate History Overview',
      type: 'object',
      fields: [
        { name: 'en', title: 'English History Narrative', type: 'text', rows: 5 },
        { name: 'bn', title: 'Bengali History Narrative', type: 'text', rows: 5 }
      ]
    },
    {
      name: 'architectureHighlights',
      title: 'Architectural Heritage Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'featureTitleEn', title: 'Feature Title (EN)', type: 'string' },
            { name: 'featureTitleBn', title: 'Feature Title (BN)', type: 'string' },
            { name: 'featureDescEn', title: 'Description (EN)', type: 'text', rows: 3 },
            { name: 'featureDescBn', title: 'Description (BN)', type: 'text', rows: 3 },
            { name: 'image', title: 'Photograph', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title.en'
    },
    prepare({ title }) {
      return {
        title: title || 'Heritage & About Content'
      };
    }
  }
};
