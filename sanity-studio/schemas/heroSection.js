export default {
  name: 'heroSection',
  title: 'Hero Section & Banners',
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
      name: 'heroImage',
      title: 'Hero Background / Main Banner Image (Upload, Change, or Delete)',
      description: 'Upload high-resolution landscape photograph for the main website hero section.',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette', 'dimensions']
      }
    },
    {
      name: 'heroVideoFile',
      title: 'Hero Background Video File (Upload MP4)',
      description: 'Upload high-definition cinematic background video loop.',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    },
    {
      name: 'heroVideoUrl',
      title: 'Hero Video Stream URL (Alternative or CDN Link)',
      type: 'url'
    },
    {
      name: 'heroBanners',
      title: 'Additional Hero Slider Banners / Rotating Images',
      description: 'Add multiple hero background images for rotating slider or seasonal events.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'bannerImage',
              title: 'Banner Image',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'caption',
              title: 'Caption / Overlay Title',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'bannerImage'
            },
            prepare({ title, media }) {
              return {
                title: title || 'Hero Banner Image',
                media
              };
            }
          }
        }
      ]
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
      subtitle: 'headlineSecondLine',
      media: 'heroImage'
    }
  }
};
