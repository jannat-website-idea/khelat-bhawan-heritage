import { createClient } from '@sanity/client';
import { defaultEventsData } from '../src/data/eventsData.js';
import { photographyGalleryData, filmsGalleryData } from '../src/data/galleryData.js';

const client = createClient({
  projectId: 'ncesiy4k',
  dataset: 'production',
  token: 'skerYXQ5piYLH0KgBgzaQLS5jflTdxfzDmDxzp3vobEo78cEgDGQMD3ubgfrfiXVgxjSyfQPxToOsQmBm',
  apiVersion: '2024-01-01',
  useCdn: false
});

async function seedData() {
  console.log('🚀 Starting complete data seed for Khelat Bhawan CMS (ncesiy4k)...');

  // 1. SITE SETTINGS & VISITING HOURS
  console.log('📍 Seeding Contact & Site Settings...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    phonePrimary: '+91 98310 93021',
    phoneSecondary: '+91 99031 34231',
    email: 'councilofculture.ghoshbari47@gmail.com',
    address: '47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India',
    visitingHoursEn: 'Mon – Sat: 11:00 AM – 7:00 PM (Prior appointment recommended for heritage tours & meetings)',
    visitingHoursBn: 'সোম – শনিবার: সকাল ১১:০০ – সন্ধ্যা ৭:০০ (হেরিটেজ ট্যুর ও সাক্ষাতের জন্য পূর্বানুমতি আবশ্যক)'
  });

  // 2. TERMS & PRIVACY POLICY
  console.log('📜 Seeding Terms & Privacy Policy...');
  await client.createOrReplace({
    _id: 'legalPolicy',
    _type: 'legalPolicy',
    privacyTitle: {
      en: 'Privacy Policy — Khelat Bhawan Heritage Estate',
      bn: 'গোপনীয়তা নীতি — খেলাৎ ভবন হেরিটেজ এস্টেট'
    },
    privacyContent: {
      en: `### 1. Overview & Heritage Custodianship\nKhelat Bhawan (Pathuria Ghata Ghosh Bari), established in 1845 and administered under the perpetual trusts (*Lakshmi Narayan Gopal Radha Krishna Jew Trust, Khelat Ghosh Memorial Trust, and Artist Nectar Council of Culture*), is committed to safeguarding the digital privacy and personal data of our visitors, patrons, scholars, and event guests.\n\n### 2. Information We Collect\nWe collect only essential details necessary to facilitate official communications, heritage visits, and estate reservations:\n- **Contact Inquiries:** Name, email address, phone number, and event specifications.\n- **Automated Logging:** Anonymous analytics to optimize heritage exhibition rendering.\n\n### 3. Purpose of Processing\nYour data is used strictly for responding to reservations within our 48-hour Concierge SLA. Commercial sale or third-party brokering is strictly prohibited.`,
      bn: `### ১. পরিচিতি ও ঐতিহ্য সংরক্ষণ\n১৮৪৫ সালে প্রতিষ্ঠিত খেলাৎ ভবন তার সম্মানিত অতিথি, গবেষক ও দর্শনার্থীদের ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষায় সম্পূর্ণ অঙ্গীকারবদ্ধ।\n\n### ২. তথ্যের ব্যবহার\nহেরিটেজ বুকিং এবং যোগাযোগের উদ্দেশ্যে সংগৃহীত তথ্যাদি সম্পূর্ণ সুরক্ষিত রাখা হয় এবং কোনো অবস্থাতেই তৃতীয় পক্ষের কাছে হস্তান্তর করা হয় না।`
    },
    termsTitle: {
      en: 'Terms of Use & Heritage Estate Protocol',
      bn: 'ব্যবহারের শর্তাবলী ও এস্টেট নীতিমালা'
    },
    termsContent: {
      en: `### 1. Acceptance of Terms\nBy accessing the Khelat Bhawan digital archive and estate services, you agree to comply with all architectural conservation protocols, intellectual property guidelines, and reservation terms.\n\n### 2. Intellectual Property\nAll photographs, video recordings, archival documents, and family lineage chronicles are proprietary assets of the Khelat Bhawan Heritage Trust.\n\n### 3. Reservation & Concierge Protocol\nOnline reservation submissions will be reviewed by our estate coordinators within 48 hours.`,
      bn: `### ১. শর্তাবলীর সম্মতি\nখেলাৎ ভবনের ওয়েবসাইট ও প্রাঙ্গণ ব্যবহারের ক্ষেত্রে ঐতিহাসিক সংরক্ষণ নীতিমালা ও নিয়মাবলী মেনে চলা বাধ্যতামূলক।\n\n### ২. বৌদ্ধিক সম্পদ\nওয়েবসাইটের সমস্ত ছবি, ভিডিও ও তথ্য খেলাৎ ভবন ট্রাস্টের নিজস্ব সম্পত্তি।`
    },
    lastUpdated: 'October 2026'
  });

  // 3. EVENTS & CELEBRATIONS
  console.log('🎪 Seeding Events & Celebrations...');
  for (const ev of defaultEventsData) {
    const docId = `event-${ev.id}`;
    await client.createOrReplace({
      _id: docId,
      _type: 'event',
      title: ev.title,
      date: ev.date,
      time: ev.time,
      location: ev.location,
      badge: ev.badge,
      desc: typeof ev.desc === 'string' ? { en: ev.desc, bn: ev.desc } : ev.desc,
      highlights: {
        en: ev.highlights?.en || [],
        bn: ev.highlights?.bn || []
      },
      whatsappNumber: ev.whatsappNumber || '9831093021',
      whatsappMessage: ev.whatsappMessage || ''
    });
    console.log(`  ✓ Seeded Event: ${ev.title.en}`);
  }

  // 4. RESERVATIONS & HERITAGE RENTAL PACKAGES
  console.log('🏰 Seeding Reservation Packages...');
  const rentalPackages = [
    {
      id: 'wedding',
      title: { en: 'Royal Weddings & Banquets', bn: 'রাজকীয় বিবাহ ও উৎসব' },
      category: 'wedding',
      guestCapacity: '100 – 600 Guests',
      desc: {
        en: 'Host timeless wedding ceremonies in the illuminated Thakur Dalan courtyard and grand ballroom suites.',
        bn: 'ঐতিহাসিক ঠাকুর দালান প্রাঙ্গণ ও রাজকীয় মহলে স্মরণীয় বিবাহ ও অনুষ্ঠান আয়োজন।'
      },
      features: [
        'Exclusive Access to Thakur Dalan Courtyard',
        'Bridal Suite & Royal Dressing Chambers',
        'Heritage Chandelier & Courtyard Lighting',
        'Dedicated Estate Hospitality Liaison'
      ]
    },
    {
      id: 'cinema',
      title: { en: 'Period Cinema & Production Shoots', bn: 'চলচ্চিত্র ও ফটোশুট' },
      category: 'cinema',
      guestCapacity: 'Cast & Crew Setup',
      desc: {
        en: 'Authentic 19th-century architectural backdrops for national and international period cinema, documentaries, and editorial fashion shoots.',
        bn: 'চলচ্চিত্র ও তথ্যচিত্রের জন্য উনিশ শতকের দুর্লভ ঐতিহ্যবাহী প্রাসাদের দৃশ্যপট।'
      },
      features: [
        '1845 Corinthian Colonnade Architecture',
        'Uninterrupted Daylight Courtyard Access',
        '3-Phase Power & Production Green Rooms',
        'Historic Marble Halls & Period Furniture'
      ]
    },
    {
      id: 'concert',
      title: { en: 'Classical Soirees & Cultural Evenings', bn: 'মার্গ সঙ্গীত ও সান্ধ্য জলসা' },
      category: 'concert',
      guestCapacity: '50 – 250 Guests',
      desc: {
        en: 'Acoustically rich classical Indian concerts, baithaks, poetry recitals, and intellectual literary conclaves.',
        bn: 'শাস্ত্রীয় উচ্চাঙ্গ সঙ্গীত ও সাহিত্য সন্ধ্যার জন্য অনুপম মার্বেল প্রাঙ্গণ।'
      },
      features: [
        'Acoustically Reverberant Historic Courtyard',
        'Platform Stage for Classical Virtuosos',
        'Traditional Carpet & Gaddi Seating Layouts',
        'Archival Audio & Ambient Illumination'
      ]
    }
  ];

  for (const r of rentalPackages) {
    await client.createOrReplace({
      _id: `rental-${r.id}`,
      _type: 'rentalPackage',
      title: r.title,
      category: r.category,
      guestCapacity: r.guestCapacity,
      desc: r.desc,
      features: r.features
    });
    console.log(`  ✓ Seeded Rental Package: ${r.title.en}`);
  }

  // 5. GUEST REVIEWS & FEEDBACK
  console.log('⭐ Seeding Guest Reviews & Feedback...');
  const feedbackItems = [
    {
      id: 'fb-1',
      name: 'Dr. Ananya Mukherjee',
      rating: 5,
      visitType: 'Heritage Walk & Durga Puja',
      review: 'Stepping into Khelat Bhawan during Durga Puja felt like time travel to 19th century Kolkata. The Corinthian columns, Belgian glass chandeliers, and the warmth of the Ghosh family are unmatched.',
      isApproved: true
    },
    {
      id: 'fb-2',
      name: 'Sourav Ganguly',
      rating: 5,
      visitType: 'Classical Music Baithak',
      review: 'A magnificent treasure of Bengal\'s cultural renaissance. The acoustics of the Nat Mandir courtyard during the classical soiree were transcendent.',
      isApproved: true
    },
    {
      id: 'fb-3',
      name: 'Elena Rostova',
      rating: 5,
      visitType: 'Documentary Film Shoot',
      review: 'We filmed an international heritage documentary here. The architectural authenticity, preservation of heirlooms, and cooperative management made the shoot unforgettable.',
      isApproved: true
    },
    {
      id: 'fb-4',
      name: 'Prof. Debashis Sen',
      rating: 5,
      visitType: 'Architectural Research Study',
      review: 'An exceptional example of 19th-century Bengal renaissance neoclassical architecture. The library archives and marble courtyards are impeccably preserved.',
      isApproved: true
    },
    {
      id: 'fb-5',
      name: 'Shreya Roychowdhury',
      rating: 5,
      visitType: 'Family Heritage Tour',
      review: 'The evening atmosphere with the courtyard illuminated is breathtaking. A proud symbol of Kolkata\'s aristocratic history and living traditions.',
      isApproved: true
    }
  ];

  for (const fb of feedbackItems) {
    await client.createOrReplace({
      _id: `feedback-${fb.id}`,
      _type: 'feedback',
      name: fb.name,
      rating: fb.rating,
      visitType: fb.visitType,
      review: fb.review,
      isApproved: fb.isApproved
    });
    console.log(`  ✓ Seeded Review: ${fb.name}`);
  }

  // 6. VISUAL GALLERY & FILMS
  console.log('🖼️ Seeding Visual Gallery & Films (All 21+ items)...');
  for (const p of photographyGalleryData) {
    await client.createOrReplace({
      _id: `gallery-photo-${p.id}`,
      _type: 'galleryItem',
      title: p.title,
      mediaType: 'image',
      category: (p.category?.en || 'architecture').toLowerCase().includes('durga') ? 'festivals' : (p.category?.en || '').toLowerCase().includes('interior') ? 'cultural' : 'architecture',
      desc: p.desc,
      photographer: p.photographer || 'Estate Archives',
      year: p.year || '1845'
    });
    console.log(`  ✓ Seeded Photo: ${p.title.en}`);
  }

  for (const f of filmsGalleryData) {
    await client.createOrReplace({
      _id: `gallery-film-${f.id}`,
      _type: 'galleryItem',
      title: f.title,
      mediaType: 'video',
      category: 'cinema',
      desc: f.desc,
      photographer: f.photographer || 'Cinematography Unit',
      year: f.year || '2026'
    });
    console.log(`  ✓ Seeded Film: ${f.title.en}`);
  }

  console.log('🎉 ALL DATA SEEDED SUCCESSFULLY TO SANITY (ncesiy4k)!');
}

seedData().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
