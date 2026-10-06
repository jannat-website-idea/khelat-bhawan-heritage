export default {
  name: 'rentalPackage',
  title: 'Reservations & Heritage Rental Packages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Experience / Rental Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Title (e.g. Royal Wedding, Period Cinema Shoot)', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'bn', title: 'Bengali Title', type: 'string' }
      ]
    },
    {
      name: 'category',
      title: 'Rental Category',
      type: 'string',
      options: {
        list: [
          { title: 'Weddings & Royal Banquets', value: 'wedding' },
          { title: 'Cinematography & Period Shoots', value: 'cinema' },
          { title: 'Cultural Soirees & Classical Concerts', value: 'concert' },
          { title: 'Corporate Conclaves & Heritage Dinners', value: 'corporate' }
        ]
      }
    },
    {
      name: 'coverImage',
      title: 'Cover Photograph',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'guestCapacity',
      title: 'Guest Capacity (e.g. 50 – 500 Guests)',
      type: 'string'
    },
    {
      name: 'desc',
      title: 'Description & Inclusions',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Description', type: 'text', rows: 4 },
        { name: 'bn', title: 'Bengali Description', type: 'text', rows: 4 }
      ]
    },
    {
      name: 'features',
      title: 'Key Features / Highlights',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'guestCapacity',
      media: 'coverImage'
    }
  }
};
