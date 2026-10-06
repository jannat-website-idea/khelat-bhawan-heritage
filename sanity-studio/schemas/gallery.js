export default {
  name: 'galleryItem',
  title: 'Visual Gallery & Films',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Title', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'bn', title: 'Bengali Title', type: 'string' }
      ]
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photograph (Image)', value: 'image' },
          { title: 'Heritage Film (Video)', value: 'video' }
        ],
        layout: 'radio'
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category Filter',
      type: 'string',
      options: {
        list: [
          { title: 'Architecture & Courtyards', value: 'architecture' },
          { title: 'Rituals & Durga Puja', value: 'festivals' },
          { title: 'Classical Soirees & Cultural', value: 'cultural' },
          { title: 'Royal Film Shoots & Cinema', value: 'cinema' }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'mediaFile',
      title: 'Photograph or Video File',
      type: 'file'
    },
    {
      name: 'previewImage',
      title: 'Cover / Thumbnail Poster Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'desc',
      title: 'Caption / Story',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Caption', type: 'text', rows: 2 },
        { name: 'bn', title: 'Bengali Caption', type: 'text', rows: 2 }
      ]
    },
    {
      name: 'photographer',
      title: 'Photographer / Archivist Credit',
      type: 'string'
    },
    {
      name: 'year',
      title: 'Year (e.g. 2026)',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'category',
      media: 'previewImage'
    }
  }
};
