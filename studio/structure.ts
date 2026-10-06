import type {StructureResolver} from 'sanity/structure'

const singleton = (S: any, title: string, schemaType: string, documentId: string) =>
  S.listItem().title(title).child(S.document().schemaType(schemaType).documentId(documentId))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Khelat Bhawan Website')
    .items([
      singleton(S, '📘 Start Here — Instructions', 'cmsGuide', 'cmsGuide'),
      S.divider(),
      S.listItem().title('📥 Enquiries').child(
        S.documentTypeList('enquiry').title('Website Enquiries').defaultOrdering([{field: 'receivedAt', direction: 'desc'}]),
      ),
      S.listItem().title('📅 Events & Availability').child(
        S.list().title('Events & Availability').items([
          S.documentTypeListItem('event').title('Events'),
          S.documentTypeListItem('unavailableDate').title('Unavailable Reservation Dates'),
        ]),
      ),
      S.divider(),
      S.listItem().title('🏠 Pages').child(
        S.list().title('Website Pages').items([
          singleton(S, 'Home Page', 'homePage', 'homePage'),
          S.documentTypeListItem('pageContent').title('Other Page Content'),
          singleton(S, 'Website Settings', 'siteSettings', 'siteSettings'),
          singleton(S, 'Terms & Policies', 'legalPolicies', 'legalPolicies'),
        ]),
      ),
      S.listItem().title('🏛️ Heritage Collections').child(
        S.list().title('Heritage Collections').items([
          S.documentTypeListItem('generation').title('Family Tree Generations'),
          S.documentTypeListItem('timelineEntry').title('History Timeline'),
          S.documentTypeListItem('trustee').title('Trusts & Trustees'),
        ]),
      ),
      S.listItem().title('🖼️ Media & Reviews').child(
        S.list().title('Media & Reviews').items([
          S.documentTypeListItem('galleryItem').title('Gallery Photos & Films'),
          S.documentTypeListItem('review').title('Google Reviews'),
        ]),
      ),
    ])
