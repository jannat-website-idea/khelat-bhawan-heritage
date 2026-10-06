export default {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'headlineFirstLine',
      title: 'Headline — First Line',
      type: 'string',
      initialValue: 'Khelat Bhawan'
    },
    {
      name: 'headlineSecondLine',
      title: 'Headline — Second Line / Tagline',
      type: 'string',
      initialValue: 'Living Heritage of Pathuria Ghata Ghosh Bari'
    },
    {
      name: 'headlineBn',
      title: 'Bengali Headline',
      type: 'string',
      initialValue: 'পাথুরিয়াঘাটা ঘোষ বাড়ির জীবন্ত ঐতিহ্য'
    },
    {
      name: 'subheadlineEn',
      title: 'Sub-headline / Narrative (English)',
      type: 'text',
      rows: 3,
      initialValue: 'An imperial 19th-century palace where timeless Bengali aristocracy, grand Corinthian colonnades, and 171 years of continuous Durga Puja live on.'
    },
    {
      name: 'subheadlineBn',
      title: 'Sub-headline / Narrative (Bengali)',
      type: 'text',
      rows: 3,
      initialValue: 'ঊনবিংশ শতাব্দীর এক রাজকীয় ঐতিহ্যবাহী প্রাসাদ—যেখানে করিন্থিয়ান স্থাপত্য, সুরের মূর্ছনা এবং ১৭১ বছরের ঐতিহ্যবাহী দুর্গাপূজা আজও বহমান।'
    },
    {
      name: 'heroVideoUrl',
      title: 'Hero Background Video URL',
      type: 'url',
      description: 'URL to high-definition estate background video or cinematic reel.'
    },
    {
      name: 'heroPosterImage',
      title: 'Hero Poster / Fallback Photograph',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'primaryCtaText',
      title: 'Primary CTA Button Text',
      type: 'string',
      initialValue: 'Explore Heritage'
    },
    {
      name: 'secondaryCtaText',
      title: 'Secondary CTA Button Text',
      type: 'string',
      initialValue: 'Book Heritage Rental'
    }
  ],
  preview: {
    select: {
      title: 'headlineFirstLine',
      subtitle: 'headlineSecondLine'
    }
  }
};
