export default {
  name: 'feedback',
  title: 'Guest Reflections & Reviews Moderation',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'rating',
      title: 'Star Rating (1 - 5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).required()
    },
    {
      name: 'visitType',
      title: 'Visit / Occasion Type',
      type: 'string'
    },
    {
      name: 'review',
      title: 'Review / Reflections Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required()
    },
    {
      name: 'isApproved',
      title: 'Approved for Website Display',
      type: 'boolean',
      description: 'Turn ON to publish this review on the public website testimonials section',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'review',
      isApproved: 'isApproved'
    },
    prepare(selection) {
      const { title, subtitle, isApproved } = selection;
      return {
        title: `${title} ${isApproved ? '✅ (Live)' : '⏳ (Pending Approval)'}`,
        subtitle: subtitle
      };
    }
  }
};
