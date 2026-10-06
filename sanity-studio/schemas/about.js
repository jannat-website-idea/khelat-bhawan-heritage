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
        { 
          name: 'en', 
          title: 'English Subtitle', 
          type: 'text', 
          rows: 2,
          initialValue: '175 Years of Sacred Tradition, Architectural Brilliance & Cultural Patronage'
        },
        { 
          name: 'bn', 
          title: 'Bengali Subtitle', 
          type: 'text', 
          rows: 2,
          initialValue: '১৭৫ বছরের পবিত্র ঐতিহ্য, স্থাপত্যকলার উৎকর্ষ ও সাংস্কৃতিক উত্তরাধিকার'
        }
      ]
    },
    {
      name: 'historyOverview',
      title: 'Estate History Overview',
      type: 'object',
      fields: [
        { 
          name: 'en', 
          title: 'English History Narrative', 
          type: 'text', 
          rows: 5,
          initialValue: 'Built in 1845 by Babu Khelat Ghosh, Khelat Bhawan stands as one of the most magnificent neoclassical heritage estates of Pathuria Ghata in North Kolkata. Adorned with monumental Corinthian pillars, antique Belgian chandeliers, and a sanctified Thakur Dalan hosting 171 continuous years of Durga Puja.'
        },
        { 
          name: 'bn', 
          title: 'Bengali History Narrative', 
          type: 'text', 
          rows: 5,
          initialValue: '১৮৪৫ সালে বাবু খেলাৎ চন্দ্র ঘোষ কর্তৃক প্রতিষ্ঠিত উত্তর কলকাতার পাথুরিয়াঘাটার এই ঐতিহাসিক রাজবাড়ি এক অনন্য স্থাপত্যকীর্তি। বিশাল করিন্থিয়ান থাম, বেলজিয়ান ঝাড়বাতি এবং ১৭১ বছরের ধারাবাহিক দুর্গাপূজার পবিত্র ঠাকুর দালান নিয়ে এটি আজও বাঙালির জীবন্ত গৌরব।'
        }
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
