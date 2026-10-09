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
      name: 'image',
      title: 'Photograph / Image File (Upload, Change, or Delete)',
      description: 'Upload high-resolution photograph. Click browse to upload new image or change/delete existing.',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette', 'dimensions']
      }
    },
    {
      name: 'videoFile',
      title: 'Heritage Film / Video File (Upload MP4 / MOV)',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    },
    {
      name: 'videoUrl',
      title: 'Video Stream URL (Optional fallback or embed)',
      type: 'url'
    },
    {
      name: 'previewImage',
      title: 'Video Poster / Thumbnail Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'desc',
      title: 'Caption / Historical Story',
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
      title: 'Year (e.g. 1845 or 2026)',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'category',
      media: 'image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Untitled Media',
        subtitle: subtitle ? `Category: ${subtitle}` : '',
        media: media
      };
    }
  }
};
