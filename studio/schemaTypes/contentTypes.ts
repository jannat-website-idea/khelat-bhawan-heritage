import {defineArrayMember, defineField, defineType} from 'sanity'

const required = (rule: any) => rule.required()

export const localizedText = defineType({
  name: 'localizedText',
  title: 'English and Bengali text',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'text', rows: 3, validation: required}),
    defineField({name: 'bn', title: 'Bengali (optional)', type: 'text', rows: 3}),
  ],
})

export const cmsGuide = defineType({
  name: 'cmsGuide',
  title: 'Start Here — CMS Guide',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Dashboard title', type: 'string', readOnly: true}),
    defineField({name: 'instructions', title: 'How to update the website', type: 'array', readOnly: true, of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'publishingNote', title: 'Publishing reminder', type: 'text', readOnly: true}),
  ],
  preview: {prepare: () => ({title: 'Start Here — CMS Guide', subtitle: 'Instructions for safely updating the website'})},
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website Settings',
  type: 'document',
  groups: [
    {name: 'contact', title: 'Contact details', default: true},
    {name: 'social', title: 'Social links'},
    {name: 'seo', title: 'Search and sharing'},
  ],
  fields: [
    defineField({name: 'siteName', title: 'Website name', type: 'string', group: 'contact', validation: required, description: 'Displayed as the official website name.'}),
    defineField({name: 'enquiryEmail', title: 'Enquiry notification email', type: 'email', group: 'contact', validation: required, description: 'Every enquiry notification will be delivered to this address.'}),
    defineField({name: 'phoneNumbers', title: 'Official phone numbers', type: 'array', group: 'contact', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'whatsappNumber', title: 'WhatsApp number', type: 'string', group: 'contact', description: 'Include country code, for example 9198XXXXXXXX.'}),
    defineField({name: 'address', title: 'Official address', type: 'text', rows: 3, group: 'contact'}),
    defineField({name: 'responseHours', title: 'Promised response time', type: 'number', group: 'contact', initialValue: 48, validation: (rule) => rule.required().min(1).max(168)}),
    defineField({name: 'facebookUrl', title: 'Facebook URL', type: 'url', group: 'social'}),
    defineField({name: 'instagramUrl', title: 'Instagram URL', type: 'url', group: 'social'}),
    defineField({name: 'youtubeUrl', title: 'YouTube URL', type: 'url', group: 'social'}),
    defineField({name: 'seoTitle', title: 'Default search title', type: 'string', group: 'seo'}),
    defineField({name: 'seoDescription', title: 'Default search description', type: 'text', rows: 3, group: 'seo'}),
    defineField({name: 'shareImage', title: 'Social sharing image', type: 'image', options: {hotspot: true}, group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Website Settings', subtitle: 'Contact, social links and SEO'})},
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({name: 'heroTitle', title: 'Hero title', type: 'localizedText', validation: required}),
    defineField({name: 'heroSubtitle', title: 'Hero subtitle', type: 'localizedText'}),
    defineField({name: 'heroPoster', title: 'Hero poster image', type: 'image', options: {hotspot: true}, description: 'Shown immediately while the hero video loads.'}),
    defineField({name: 'heroVideo', title: 'Hero video', type: 'file', options: {accept: 'video/*'}, description: 'Upload an optimized MP4. Recommended maximum: 15 MB.'}),
    defineField({name: 'heritageHeading', title: 'Heritage introduction heading', type: 'localizedText'}),
    defineField({name: 'heritageCopy', title: 'Heritage introduction text', type: 'localizedText'}),
    defineField({name: 'heritageImage', title: 'Heritage introduction image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'showReviews', title: 'Show Google reviews section', type: 'boolean', initialValue: true}),
  ],
  preview: {prepare: () => ({title: 'Home Page', subtitle: 'Hero and homepage content'})},
})

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({name: 'page', title: 'Page', type: 'string', validation: required, options: {list: [
      {title: 'Heritage & About', value: 'heritage'},
      {title: 'Founder', value: 'founder'},
      {title: 'Trusts & Trustees introduction', value: 'trustees'},
      {title: 'Events introduction', value: 'events'},
      {title: 'Reservations introduction', value: 'reservations'},
      {title: 'Feedback introduction', value: 'feedback'},
      {title: 'Contact introduction', value: 'contact'},
    ]}}),
    defineField({name: 'eyebrow', title: 'Small heading', type: 'localizedText'}),
    defineField({name: 'title', title: 'Main heading', type: 'localizedText', validation: required}),
    defineField({name: 'body', title: 'Description', type: 'localizedText'}),
    defineField({name: 'featuredImage', title: 'Featured image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'seoTitle', title: 'Search title', type: 'string'}),
    defineField({name: 'seoDescription', title: 'Search description', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title.en', subtitle: 'page', media: 'featuredImage'}},
})

export const generation = defineType({
  name: 'generation',
  title: 'Family Tree Generation',
  type: 'document',
  fields: [
    defineField({name: 'generationNumber', title: 'Generation number', type: 'number', validation: (rule) => rule.required().min(1).max(20)}),
    defineField({name: 'name', title: 'Name', type: 'localizedText', validation: required}),
    defineField({name: 'role', title: 'Role or legacy title', type: 'localizedText'}),
    defineField({name: 'years', title: 'Years', type: 'string', description: 'Example: 1775 — 1845'}),
    defineField({name: 'summary', title: 'Short family-tree summary', type: 'localizedText'}),
    defineField({name: 'biography', title: 'Full biography', type: 'localizedText'}),
    defineField({name: 'portrait', title: 'Portrait or generation image', type: 'image', options: {hotspot: true}, validation: required}),
    defineField({name: 'contributions', title: 'Key heritage contributions', type: 'array', of: [defineArrayMember({type: 'localizedText'})]}),
    defineField({name: 'isVisible', title: 'Show on website', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Generation order', name: 'generationAsc', by: [{field: 'generationNumber', direction: 'asc'}]}],
  preview: {select: {title: 'name.en', generation: 'generationNumber', media: 'portrait'}, prepare: ({title, generation, media}) => ({title: `${generation || '—'} · ${title || 'Untitled generation'}`, subtitle: 'Family lineage', media})},
})

export const timelineEntry = defineType({
  name: 'timelineEntry',
  title: 'History Timeline Entry',
  type: 'document',
  fields: [
    defineField({name: 'year', title: 'Year', type: 'number', validation: required}),
    defineField({name: 'title', title: 'Milestone title', type: 'localizedText', validation: required}),
    defineField({name: 'description', title: 'Milestone description', type: 'localizedText'}),
    defineField({name: 'image', title: 'Milestone image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'isVisible', title: 'Show on website', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Year, oldest first', name: 'yearAsc', by: [{field: 'year', direction: 'asc'}]}],
  preview: {select: {title: 'title.en', year: 'year', media: 'image'}, prepare: ({title, year, media}) => ({title: `${year || '—'} · ${title || 'Untitled milestone'}`, media})},
})

export const trustee = defineType({
  name: 'trustee',
  title: 'Trust or Trustee',
  type: 'document',
  fields: [
    defineField({name: 'order', title: 'Display order', type: 'number', validation: required}),
    defineField({name: 'name', title: 'Name', type: 'localizedText', validation: required}),
    defineField({name: 'category', title: 'Category', type: 'string', options: {list: ['Trust', 'Trustee', 'Committee']}}),
    defineField({name: 'period', title: 'Period or founding year', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'localizedText'}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'achievements', title: 'Achievements', type: 'array', of: [defineArrayMember({type: 'localizedText'})]}),
    defineField({name: 'programs', title: 'Active programs', type: 'array', of: [defineArrayMember({type: 'localizedText'})]}),
    defineField({name: 'isVisible', title: 'Show on website', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name.en', subtitle: 'category', media: 'image'}},
})

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Photo or Film',
  type: 'document',
  fields: [
    defineField({name: 'order', title: 'Display order', type: 'number', validation: required}),
    defineField({name: 'mediaType', title: 'Media type', type: 'string', validation: required, options: {layout: 'radio', list: [{title: 'Photo', value: 'image'}, {title: 'Film', value: 'video'}]}}),
    defineField({name: 'title', title: 'Title', type: 'localizedText', validation: required}),
    defineField({name: 'category', title: 'Category label', type: 'localizedText'}),
    defineField({name: 'description', title: 'Description', type: 'localizedText'}),
    defineField({name: 'image', title: 'Photograph', type: 'image', options: {hotspot: true}, hidden: ({parent}) => parent?.mediaType === 'video'}),
    defineField({name: 'video', title: 'Film file', type: 'file', options: {accept: 'video/*'}, hidden: ({parent}) => parent?.mediaType !== 'video', description: 'Use an optimized MP4. Recommended maximum: 50 MB.'}),
    defineField({name: 'poster', title: 'Film poster image', type: 'image', options: {hotspot: true}, hidden: ({parent}) => parent?.mediaType !== 'video'}),
    defineField({name: 'credit', title: 'Photographer or archive credit', type: 'string'}),
    defineField({name: 'isVisible', title: 'Show on website', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title.en', subtitle: 'mediaType', image: 'image', poster: 'poster'}, prepare: ({title, subtitle, image, poster}) => ({title, subtitle: subtitle === 'video' ? 'Film' : 'Photograph', media: image || poster})},
})

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [{name: 'details', title: 'Event details', default: true}, {name: 'enquiries', title: 'Enquiry settings'}],
  fields: [
    defineField({name: 'title', title: 'Event title', type: 'localizedText', group: 'details', validation: required}),
    defineField({name: 'description', title: 'Description', type: 'localizedText', group: 'details'}),
    defineField({name: 'startDate', title: 'Start date and time', type: 'datetime', group: 'details', validation: required}),
    defineField({name: 'endDate', title: 'End date and time', type: 'datetime', group: 'details'}),
    defineField({name: 'venue', title: 'Venue', type: 'localizedText', group: 'details'}),
    defineField({name: 'image', title: 'Event image', type: 'image', options: {hotspot: true}, group: 'details'}),
    defineField({name: 'status', title: 'Availability', type: 'string', group: 'enquiries', initialValue: 'enquiries-open', options: {list: [
      {title: 'Enquiries open', value: 'enquiries-open'},
      {title: 'Sold out', value: 'sold-out'},
      {title: 'Postponed', value: 'postponed'},
      {title: 'Cancelled', value: 'cancelled'},
    ]}}),
    defineField({name: 'acceptEnquiries', title: 'Allow enquiry button', type: 'boolean', group: 'enquiries', initialValue: true}),
    defineField({name: 'isFeatured', title: 'Feature this event', type: 'boolean', group: 'details', initialValue: false}),
    defineField({name: 'isVisible', title: 'Show on website', type: 'boolean', group: 'details', initialValue: true}),
  ],
  orderings: [{title: 'Upcoming first', name: 'dateAsc', by: [{field: 'startDate', direction: 'asc'}]}],
  preview: {select: {title: 'title.en', date: 'startDate', status: 'status', media: 'image'}, prepare: ({title, date, status, media}) => ({title, subtitle: `${date ? new Date(date).toLocaleDateString() : 'No date'} · ${status || 'No status'}`, media})},
})

export const unavailableDate = defineType({
  name: 'unavailableDate',
  title: 'Unavailable Reservation Date',
  type: 'document',
  fields: [
    defineField({name: 'date', title: 'Date', type: 'date', validation: required}),
    defineField({name: 'status', title: 'Status', type: 'string', validation: required, initialValue: 'booked', options: {list: [
      {title: 'Booked / sold out', value: 'booked'},
      {title: 'Provisionally held', value: 'held'},
      {title: 'Closed / unavailable', value: 'closed'},
    ]}}),
    defineField({name: 'internalNote', title: 'Internal note', type: 'text', rows: 3, description: 'Visible only in the CMS.'}),
  ],
  orderings: [{title: 'Date, soonest first', name: 'dateAsc', by: [{field: 'date', direction: 'asc'}]}],
  preview: {select: {title: 'date', subtitle: 'status'}},
})

export const review = defineType({
  name: 'review',
  title: 'Google Review',
  type: 'document',
  fields: [
    defineField({name: 'reviewerName', title: 'Reviewer name', type: 'string', validation: required}),
    defineField({name: 'rating', title: 'Star rating', type: 'number', validation: (rule) => rule.required().min(1).max(5)}),
    defineField({name: 'reviewText', title: 'Original review text', type: 'text', rows: 6, validation: required, description: 'Copy the review exactly as it appears on Google.'}),
    defineField({name: 'reviewDateLabel', title: 'Date label', type: 'string', description: 'Example: 7 months ago'}),
    defineField({name: 'googleUrl', title: 'Direct link to this exact Google review', type: 'url', validation: required}),
    defineField({name: 'isFeatured', title: 'Feature on website', type: 'boolean', initialValue: true}),
    defineField({name: 'order', title: 'Display order', type: 'number'}),
  ],
  preview: {select: {title: 'reviewerName', rating: 'rating'}, prepare: ({title, rating}) => ({title, subtitle: `${rating || 0} stars · Google review`})},
})

export const enquiry = defineType({
  name: 'enquiry',
  title: 'Website Enquiry',
  type: 'document',
  fields: [
    defineField({name: 'reference', title: 'Enquiry reference', type: 'string', readOnly: true}),
    defineField({name: 'receivedAt', title: 'Received at', type: 'datetime', readOnly: true}),
    defineField({name: 'source', title: 'Source form', type: 'string', readOnly: true}),
    defineField({name: 'name', title: 'Visitor name', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Visitor email', type: 'email', readOnly: true}),
    defineField({name: 'phone', title: 'Visitor phone', type: 'string', readOnly: true}),
    defineField({name: 'eventType', title: 'Event or enquiry type', type: 'string', readOnly: true}),
    defineField({name: 'preferredDate', title: 'Preferred date', type: 'date', readOnly: true}),
    defineField({name: 'guestCount', title: 'Estimated guests', type: 'number', readOnly: true}),
    defineField({name: 'message', title: 'Message', type: 'text', rows: 6, readOnly: true}),
    defineField({name: 'status', title: 'Follow-up status', type: 'string', initialValue: 'new', options: {list: [
      {title: 'New — action required', value: 'new'},
      {title: 'Contacted', value: 'contacted'},
      {title: 'Closed', value: 'closed'},
    ]}}),
    defineField({name: 'internalNote', title: 'Private follow-up note', type: 'text', rows: 4}),
  ],
  orderings: [{title: 'Newest first', name: 'receivedDesc', by: [{field: 'receivedAt', direction: 'desc'}]}],
  preview: {select: {title: 'name', reference: 'reference', receivedAt: 'receivedAt', status: 'status'}, prepare: ({title, reference, receivedAt, status}) => ({title: `${status === 'new' ? '● ' : ''}${title || 'Website visitor'}`, subtitle: `${reference || 'No reference'} · ${receivedAt ? new Date(receivedAt).toLocaleString() : 'No date'}`} )},
})

