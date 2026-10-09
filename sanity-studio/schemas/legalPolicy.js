export default {
  name: 'legalPolicy',
  title: 'Terms & Privacy Policy',
  type: 'document',
  fields: [
    {
      name: 'lastUpdated',
      title: 'Last Updated Label (e.g. October 2026)',
      type: 'string',
      initialValue: 'October 2026'
    },

    // 1. TERMS OF USE
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
      name: 'termsPdf',
      title: 'Upload Terms of Use PDF / Document (Official Printable Document)',
      description: 'Upload official Terms & Conditions document (PDF, DOCX, etc.). Visitors will be able to view and download this directly from the website. You can upload, replace, or remove this document at any time.',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx'
      }
    },
    {
      name: 'termsContent',
      title: 'Terms of Use Body Text (Full Policy Content)',
      description: 'Edit the text visible directly in the website terms popup.',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Content', type: 'text', rows: 14 },
        { name: 'bn', title: 'Bengali Content', type: 'text', rows: 14 }
      ]
    },

    // 2. PRIVACY POLICY
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
      name: 'privacyPdf',
      title: 'Upload Privacy Policy PDF / Document',
      description: 'Upload official Privacy Policy PDF. You can upload, replace, or remove this file at any time.',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx'
      }
    },
    {
      name: 'privacyContent',
      title: 'Privacy Policy Body Text',
      description: 'Edit the privacy policy text displayed on the website.',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Content', type: 'text', rows: 14 },
        { name: 'bn', title: 'Bengali Content', type: 'text', rows: 14 }
      ]
    },

    // 3. ADDITIONAL LEGAL / BOOKING DOCUMENTS
    {
      name: 'additionalDocuments',
      title: 'Additional Legal & Booking Documents (PDFs / Forms / Guidelines)',
      description: 'Upload additional forms (e.g. Booking Agreement, Filming Consent Form, Heritage Code of Conduct).',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Document',
          fields: [
            {
              name: 'title',
              title: 'Document Title (e.g. Heritage Rental Agreement Form)',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'file',
              title: 'Upload File (PDF / DOCX)',
              type: 'file',
              validation: (Rule) => Rule.required(),
              options: {
                accept: '.pdf,.doc,.docx'
              }
            },
            {
              name: 'desc',
              title: 'Short Description',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'desc'
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'termsTitle.en',
      subtitle: 'lastUpdated'
    },
    prepare({ title, subtitle }) {
      return {
        title: '📜 Terms & Privacy Policy (Documents & Content)',
        subtitle: subtitle ? `Last Updated: ${subtitle}` : 'Legal & Trust Governance'
      };
    }
  }
};
