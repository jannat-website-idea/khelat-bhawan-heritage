export default {
  name: 'trustee',
  title: 'Trusts & Trustees',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Trustee / Custodian Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Name', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'bn', title: 'Bengali Name', type: 'string' }
      ]
    },
    {
      name: 'role',
      title: 'Designation / Trust Role',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Designation (e.g. Managing Trustee, Custodian)', type: 'string' },
        { name: 'bn', title: 'Bengali Designation', type: 'string' }
      ]
    },
    {
      name: 'orderRank',
      title: 'Display Priority Order (e.g. 1, 2, 3)',
      type: 'number',
      initialValue: 10
    },
    {
      name: 'photo',
      title: 'Photograph',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'bio',
      title: 'Trustee Profile / Bio',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Biography', type: 'text', rows: 4 },
        { name: 'bn', title: 'Bengali Biography', type: 'text', rows: 4 }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'role.en',
      media: 'photo'
    }
  }
};
