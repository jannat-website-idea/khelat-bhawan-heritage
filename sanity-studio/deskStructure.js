export const deskStructure = (S) =>
  S.list()
    .title('Khelat Bhawan Content Dashboard')
    .items([
      // 1. Heritage & About
      S.listItem()
        .title('🏛️ Heritage & About')
        .schemaType('aboutPage')
        .child(
          S.documentTypeList('aboutPage')
            .title('Heritage & About Content')
        ),

      // 2. History Timeline
      S.listItem()
        .title('⏳ History Timeline (1845 – Present)')
        .schemaType('timeline')
        .child(
          S.documentTypeList('timeline')
            .title('Milestones & Eras')
            .defaultOrdering([{ field: 'year', direction: 'asc' }])
        ),

      // 3. Founder
      S.listItem()
        .title('👑 Founder (Babu Khelat Ghosh)')
        .schemaType('founder')
        .child(
          S.documentTypeList('founder')
            .title('Founder Biography & Archives')
        ),

      // 4. Trusts & Trustees
      S.listItem()
        .title('📜 Trusts & Trustees')
        .schemaType('trustee')
        .child(
          S.documentTypeList('trustee')
            .title('Board of Trustees & Custodians')
            .defaultOrdering([{ field: 'orderRank', direction: 'asc' }])
        ),

      // 5. Visual Gallery & Films
      S.listItem()
        .title('🖼️ Visual Gallery & Films')
        .schemaType('galleryItem')
        .child(
          S.documentTypeList('galleryItem')
            .title('Photographs & Cinema Videos')
        ),

      // 6. Events & Celebrations
      S.listItem()
        .title('🎪 Events & Celebrations')
        .schemaType('event')
        .child(
          S.documentTypeList('event')
            .title('Upcoming & Past Events')
        ),

      // 7. Reservations & Heritage Rental
      S.listItem()
        .title('🏰 Reservations & Heritage Rental')
        .schemaType('rentalPackage')
        .child(
          S.documentTypeList('rentalPackage')
            .title('Rental Packages & Experiences')
        ),

      S.divider(),

      // 8. Guest Feedback Moderation
      S.listItem()
        .title('⭐ Guest Reviews Moderation')
        .schemaType('feedback')
        .child(
          S.documentTypeList('feedback')
            .title('Guest Reflections & Approval')
        ),

      // 9. Terms of Use & Privacy Policy
      S.listItem()
        .title('📜 Terms of Use & Privacy Policy')
        .schemaType('legalPolicy')
        .child(
          S.document()
            .schemaType('legalPolicy')
            .documentId('legalPolicy')
            .title('Terms of Use & Privacy Policy Content')
        ),

      // 10. Site Settings & Contact Info
      S.listItem()
        .title('⚙️ Site Settings & Contact Info')
        .schemaType('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Visiting Hours, Phones & Email')
        ),
    ]);
