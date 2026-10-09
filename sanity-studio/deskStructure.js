export const deskStructure = (S) =>
  S.list()
    .title('Khelat Bhawan CMS')
    .items([
      // 1. Events & Celebrations
      S.listItem()
        .title('🎪 Events & Celebrations')
        .schemaType('event')
        .child(
          S.documentTypeList('event')
            .title('Events & Celebrations')
        ),

      // 2. Reservations & Heritage Rental
      S.listItem()
        .title('🏰 Reservations & Heritage Rental')
        .schemaType('rentalPackage')
        .child(
          S.documentTypeList('rentalPackage')
            .title('Reservations & Heritage Rental')
        ),

      // 3. Guest Reviews & Feedback
      S.listItem()
        .title('⭐ Guest Reviews & Feedback')
        .schemaType('feedback')
        .child(
          S.documentTypeList('feedback')
            .title('Guest Reviews & Feedback')
        ),

      // 4. Visual Gallery & Films
      S.listItem()
        .title('🖼️ Visual Gallery & Films')
        .schemaType('galleryItem')
        .child(
          S.documentTypeList('galleryItem')
            .title('Visual Gallery & Films')
        ),

      // 5. Contact Information & Visiting Hours
      S.listItem()
        .title('📍 Contact Information & Visiting Hours')
        .schemaType('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Contact Information & Visiting Hours')
        ),

      // 6. Terms & Privacy Policy
      S.listItem()
        .title('📜 Terms & Privacy Policy')
        .schemaType('legalPolicy')
        .child(
          S.document()
            .schemaType('legalPolicy')
            .documentId('legalPolicy')
            .title('Terms & Privacy Policy')
        ),
    ]);

