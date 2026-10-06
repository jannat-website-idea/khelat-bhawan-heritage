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
        { 
          name: 'en', 
          title: 'English Biography', 
          type: 'text', 
          rows: 6,
          initialValue: 'Babu Khelat Chandra Ghosh was an illustrious 19th-century philanthropist, cultural guardian, and prominent scion of North Calcutta. He founded Khelat Bhawan in 1845 and initiated the historic Durga Puja in 1855. A revered patron of Indian classical music, he fostered generations of eminent vocalists and instrument masters in his palace darbar.'
        },
        { 
          name: 'bn', 
          title: 'Bengali Biography', 
          type: 'text', 
          rows: 6,
          initialValue: 'বাবু খেলাৎ চন্দ্র ঘোষ ঊনবিংশ শতাব্দীর এক প্রাতঃস্মরণীয় দানবীর, সমাজসেবক ও সংস্কৃতিপ্রেমী ব্যক্তিত্ব। ১৮৪৫ সালে তিনি পাথুরিয়াঘাটার এই রাজপ্রাসাদ প্রতিষ্ঠা করেন এবং ১৮৫৫ সালে ঐতিহ্যবাহী পারিবারিক দুর্গাপূজার সূচনা করেন। ভারতীয় মার্গসঙ্গীত ও শিক্ষার একনিষ্ঠ পৃষ্ঠপোষক হিসেবে তাঁর অবদান অবিস্মরণীয়।'
        }
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
