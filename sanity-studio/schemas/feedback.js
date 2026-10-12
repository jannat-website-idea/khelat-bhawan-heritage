import ReviewApprovalInput from '../components/ReviewApprovalInput';

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
      title: 'Review Approval / Rejection',
      type: 'boolean',
      description: 'Approve to show this review on the website. Reject to keep it hidden.',
      components: { input: ReviewApprovalInput },
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
        title: `${title} ${isApproved ? '✅ (Live)' : '⏳ (Pending / Hidden)'}`,
        subtitle: subtitle
      };
    }
  }
};
