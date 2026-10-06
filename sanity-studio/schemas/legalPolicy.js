export default {
  name: 'legalPolicy',
  title: 'Terms & Privacy Policies',
  type: 'document',
  fields: [
    {
      name: 'privacyTitle',
      title: 'Privacy Policy Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Title', type: 'string', initialValue: 'Privacy Policy — Khelat Bhawan Heritage Estate' },
        { name: 'bn', title: 'Bengali Title', type: 'string', initialValue: 'গোপনীয়তা নীতি — খেলাৎ ভবন হেরিটেজ এস্টেট' }
      ]
    },
    {
      name: 'privacyContent',
      title: 'Privacy Policy Full Text (Markdown/Text)',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Content', type: 'text', rows: 12 },
        { name: 'bn', title: 'Bengali Content', type: 'text', rows: 12 }
      ]
    },
    {
      name: 'termsTitle',
      title: 'Terms of Use Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Title', type: 'string', initialValue: 'Terms of Use & Heritage Estate Protocol' },
        { name: 'bn', title: 'Bengali Title', type: 'string', initialValue: 'ব্যবহারের শর্তাবলী ও এস্টেট নীতিমালা' }
      ]
    },
    {
      name: 'termsContent',
      title: 'Terms of Use Full Text (Markdown/Text)',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Content', type: 'text', rows: 12 },
        { name: 'bn', title: 'Bengali Content', type: 'text', rows: 12 }
      ]
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated Date Label (e.g. October 2026)',
      type: 'string',
      initialValue: 'October 2026'
    }
  ],
  preview: {
    select: {
      title: 'privacyTitle.en',
      subtitle: 'lastUpdated'
    },
    prepare({ title, subtitle }) {
      return {
        title: '📜 Terms & Privacy Policies',
        subtitle: subtitle ? `Updated: ${subtitle}` : 'Legal governance'
      };
    }
  }
};
