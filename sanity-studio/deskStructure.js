export const deskStructure = (S) =>
  S.list()
    .title('Khelat Bhawan CMS')
    .items([
      // 1. Website content folder (like Mindrhythm)
      S.listItem()
        .title('📁 Website content')
        .child(
          S.list()
            .title('Website content')
            .items([
              S.listItem()
                .title('✨ Hero section')
                .child(
                  S.document()
                    .schemaType('heroSection')
                    .documentId('heroSection')
                    .title('Hero section')
                ),
              S.listItem()
                .title('🏛️ About & palace story')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('About & palace story')
                ),
              S.listItem()
                .title('👑 Founder (Babu Khelat Ghosh)')
                .child(
                  S.document()
                    .schemaType('founder')
                    .documentId('founder')
                    .title('Founder (Babu Khelat Ghosh)')
                ),
              S.listItem()
                .title('📍 Contact information & visiting hours')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Contact information & visiting hours')
                ),
            ])
        ),

      // 2. Events & Celebrations
      S.listItem()
        .title('🎪 Events & Celebrations')
        .schemaType('event')
        .child(
          S.documentTypeList('event')
            .title('Events & Celebrations')
        ),

      // 3. Reservations & Heritage Rental
      S.listItem()
        .title('🏰 Reservations & Heritage Rental')
        .schemaType('rentalPackage')
        .child(
          S.documentTypeList('rentalPackage')
            .title('Reservations & Heritage Rental')
        ),

      // 4. History Timeline
      S.listItem()
        .title('⏳ History Timeline (1845 – Present)')
        .schemaType('timeline')
        .child(
          S.documentTypeList('timeline')
            .title('History Timeline (1845 – Present)')
            .defaultOrdering([{ field: 'year', direction: 'asc' }])
        ),

      // 5. Visual Gallery & Films
      S.listItem()
        .title('🖼️ Visual Gallery & Films')
        .schemaType('galleryItem')
        .child(
          S.documentTypeList('galleryItem')
            .title('Visual Gallery & Films')
        ),

      // 6. Trusts & Trustees
      S.listItem()
        .title('👥 Trusts & Trustees')
        .schemaType('trustee')
        .child(
          S.documentTypeList('trustee')
            .title('Trusts & Trustees')
            .defaultOrdering([{ field: 'orderRank', direction: 'asc' }])
        ),

      // 7. Guest Reviews Moderation
      S.listItem()
        .title('⭐ Guest Reviews Moderation')
        .schemaType('feedback')
        .child(
          S.documentTypeList('feedback')
            .title('Guest Reviews Moderation')
        ),

      S.divider(),

      // 8. Privacy policy & Terms of conditions
      S.listItem()
        .title('📜 Privacy policy & Terms of use')
        .schemaType('legalPolicy')
        .child(
          S.document()
            .schemaType('legalPolicy')
            .documentId('legalPolicy')
            .title('Privacy policy & Terms of use')
        ),
    ]);
