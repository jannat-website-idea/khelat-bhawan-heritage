/**
 * Comprehensive Content Seeder for Khelat Bhawan Sanity CMS
 * Populates all initial website documents into Sanity.
 */

import { createClient } from '@sanity/client';
import { defaultEventsData } from '../src/data/eventsData.js';

const token = process.env.SANITY_AUTH_TOKEN;
const projectId = process.env.SANITY_PROJECT_ID || '4w2m42ab';
const dataset = process.env.SANITY_DATASET || 'production';

if (!token) {
  console.error('\n⚠️ SANITY_AUTH_TOKEN is required to write data to Sanity.');
  console.log('To get your token:');
  console.log('1. Go to: https://sanity.io/manage/project/' + projectId + '/api');
  console.log('2. Click "+ Add API token" -> select "Editor" role.');
  console.log('3. Run: SANITY_AUTH_TOKEN="your_token" node scripts/seedAllContent.js\n');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function runSeeder() {
  console.log(`🚀 Seeding complete Khelat Bhawan content to Sanity (${projectId} / ${dataset})...\n`);

  // 1. Site Settings
  console.log('📦 Seeding Site Settings...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    phonePrimary: '+91 98310 93021',
    phoneSecondary: '+91 99031 34231',
    email: 'councilofculture.ghoshbari47@gmail.com',
    address: '47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India',
    visitingHoursEn: 'Mon – Sat: 11:00 AM – 7:00 PM (Prior appointment recommended for heritage tours & meetings)',
    visitingHoursBn: 'সোম – শনিবার: সকাল ১১:০০ – সন্ধ্যা ৭:০০ (হেরিটেজ ট্যুর ও সাক্ষাতের জন্য পূর্বানুমতি আবশ্যক)',
    googleMapsUrl: 'https://share.google/TFFurvjijjI8QM8eg'
  });
  console.log('✅ Site Settings seeded.');

  // 2. Terms of Use & Privacy Policy
  console.log('📦 Seeding Legal Policies...');
  await client.createOrReplace({
    _id: 'legalPolicy',
    _type: 'legalPolicy',
    privacyTitle: {
      en: 'Privacy Policy — Khelat Bhawan Heritage Estate',
      bn: 'গোপনীয়তা নীতি — খেলাৎ ভবন হেরিটেজ এস্টেট'
    },
    privacyContent: {
      en: `### 1. Overview & Heritage Custodianship\nKhelat Bhawan (Pathuria Ghata Ghosh Bari), established in 1845 and administered under the perpetual trusts (*Lakshmi Narayan Gopal Radha Krishna Jew Trust, Khelat Ghosh Memorial Trust, and Artist Nectar Council of Culture*), is committed to safeguarding the digital privacy and personal data of our visitors, patrons, scholars, and event guests.\n\n### 2. Information We Collect\nWe collect only essential details necessary to facilitate official communications, heritage visits, and estate reservations:\n- **Contact Inquiries:** Name, email address, phone number, and event specifications.\n- **Automated Logging:** Anonymous analytics to optimize heritage exhibition rendering.\n\n### 3. Purpose of Processing\nYour data is used strictly for responding to reservations within our 48-hour Concierge SLA. Commercial sale or third-party brokering is strictly prohibited.`,
      bn: `### ১. পরিচিতি ও ঐতিহ্য সংরক্ষণ\n১৮৪৫ সালে প্রতিষ্ঠিত খেলাৎ ভবন (পাথুরিয়াঘাটা ঘোষ বাড়ি) তার সম্মানিত অতিথি, গবেষক ও দর্শনার্থীদের ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষায় সম্পূর্ণ অঙ্গীকারবদ্ধ।\n\n### ২. তথ্যের ব্যবহার\nহেরিটেজ বুকিং এবং যোগাযোগের উদ্দেশ্যে সংগৃহীত তথ্যাদি সম্পূর্ণ সুরক্ষিত রাখা হয় এবং কোনো অবস্থাতেই তৃতীয় পক্ষের কাছে হস্তান্তর করা হয় না।`
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
  console.log('✅ Terms & Privacy Policy seeded.');

  // 3. Heritage & About
  console.log('📦 Seeding Heritage & About Page...');
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: {
      en: 'The Imperial Legacy of Khelat Bhawan',
      bn: 'খেলাৎ ভবন ও রাজবাড়ির ঐতিহাসিক উত্তরাধিকার'
    },
    subtitle: {
      en: 'A 175-year journey of preserving Bengali aristocratic heritage, sacred traditions, and classical arts',
      bn: '১৮৪৫ সাল থেকে উত্তর কলকাতায় বাঙালি সংস্কৃতি, শাস্ত্রীয় সঙ্গীত ও আধ্যাত্মিক ভক্তি সংরক্ষণের দেড় শতাব্দীরও প্রাচীন গৌরব'
    },
    historyOverview: {
      en: 'Khelat Bhawan stands as an immortal monument of 19th-century Bengal renaissance architecture, established in 1845 by Babu Khelat Chandra Ghosh at Pathuria Ghata, North Kolkata.',
      bn: 'খেলাৎ ভবন উত্তর কলকাতার পাথুরিয়াঘাটায় ১৮৪৫ সালে বাবু খেলাৎ চন্দ্র ঘোষ কর্তৃক প্রতিষ্ঠিত ঊনবিংশ শতাব্দীর এক অনুপম ঐতিহাসিক রাজপ্রাসাদ।'
    }
  });
  console.log('✅ Heritage & About seeded.');

  // 4. Founder
  console.log('📦 Seeding Founder Profile...');
  await client.createOrReplace({
    _id: 'founder',
    _type: 'founder',
    name: {
      en: 'Babu Khelat Chandra Ghosh',
      bn: 'বাবু খেলাৎ চন্দ্র ঘোষ'
    },
    years: '1775 – 1845',
    biography: {
      en: 'Babu Khelat Chandra Ghosh was a visionary aristocrat, legendary philanthropist, and esteemed cultural patriarch of 19th-century Calcutta.',
      bn: 'বাবু খেলাৎ চন্দ্র ঘোষ ছিলেন ঊনবিংশ শতাব্দীর কলকাতার এক প্রাতঃস্মরণীয় দূরদর্শী ব্যক্তিত্ব, বিশিষ্ট দানশীল সমাজসেবক ও মার্গ সঙ্গীতের পৃষ্ঠপোষক।'
    }
  });
  console.log('✅ Founder seeded.');

  // 5. Events
  console.log('📦 Seeding Palace Events...');
  for (const event of defaultEventsData) {
    await client.createOrReplace({
      _id: `event-${event.id}`,
      _type: 'event',
      id: event.id,
      category: event.category || 'upcoming',
      featured: Boolean(event.featured),
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      badge: event.badge,
      desc: event.desc,
      highlights: event.highlights,
      whatsappNumber: '9831093021'
    });
    console.log(`   ✓ Event: ${event.title.en}`);
  }

  // 6. History Timeline Milestones
  console.log('📦 Seeding History Timeline Milestones...');
  const timelineMilestones = [
    { year: '1845', eraEn: 'ESTATE FOUNDATION', eraBn: 'স্থাপত্য ও প্রাসাদ প্রতিষ্ঠা', titleEn: 'Founding of Khelat Bhawan Palace', titleBn: 'খেলাৎ ভবনের প্রতিষ্ঠা ও রাজপ্রাসাদ নির্মাণ', descEn: 'Khelat Bhawan was established as a grand Bengali heritage mansion by Babu Khelat Chandra Ghosh.', descBn: 'বাবু খেলাৎ চন্দ্র ঘোষ উত্তর কলকাতার পাথুরিয়াঘাটায় গ্র্যান্ড করিন্থিয়ান স্তম্ভ ও মার্বেল চত্বর শোভিত এই ঐতিহাসিক প্রাসাদ নির্মাণ করেন।' },
    { year: '1855', eraEn: 'DURGA PUJA INAUGURATION', eraBn: 'দুর্গাপূজার সূচনা', titleEn: 'Inauguration of Historic Durga Puja', titleBn: 'প্রথম দুর্গাপূজা ও নিত্য দেবসেবার সূচনা', descEn: 'The first formal Durga Puja celebration at Khelat Bhawan established an unbroken 171-year sacred tradition.', descBn: 'খেলাৎ ভবনে প্রথম আনুষ্ঠানিক একচালা ডাকের সাজের দেবী দুর্গাপূজার সূচনা হয়।' },
    { year: '1881', eraEn: 'SPIRITUAL VISITATION', eraBn: 'আধ্যাত্মিক আশীর্বাদ', titleEn: 'Historic Visit of Sri Ramakrishna', titleBn: 'শ্রীরামকৃষ্ণ পরমহংসদেবের ঐতিহাসিক আগমন', descEn: 'Sri Ramakrishna sanctified Khelat Bhawan with his divine presence and musical discourse.', descBn: 'শ্রীরামকৃষ্ণ পরমহংসদেব খেলাৎ ভবনে শুভাগমন করেন এবং প্রাঙ্গণকে চিরতরে পবিত্র করেন।' },
    { year: '1920', eraEn: 'LEGAL TRUST FORMALIZATION', eraBn: 'বিধিবদ্ধ ট্রাস্ট প্রশাসন', titleEn: 'Formalization of First Heritage Trusts', titleBn: 'প্রথম আনুষ্ঠানিক হেরিটেজ ট্রাস্ট প্রতিষ্ঠা', descEn: 'Formal legal trusts established to safeguard the estate and cultural endowments permanently.', descBn: 'পারিবারিক দেবসেবা ও দানশীল সমাজকল্যাণ স্থায়ী করতে বিধিবদ্ধ ট্রাস্ট দলিল সম্পাদিত হয়।' },
    { year: '1985', eraEn: 'PERFORMING ARTS COUNCIL', eraBn: 'সাংস্কৃতিক পরিষদ', titleEn: 'Foundation of Artist Nectar Council', titleBn: 'আর্টিস্ট নেকটার কাউন্সিল অফ কালচার প্রতিষ্ঠা', descEn: 'Formation of Artist Nectar Council of Culture to mentor classical musicians.', descBn: 'মার্গ সঙ্গীত ও যুব শিল্পীদের উৎসাহ দিতে আর্টিস্ট নেকটার কাউন্সিল প্রতিষ্ঠিত হয়।' },
    { year: '2026', eraEn: 'LIVING MONUMENT TODAY', eraBn: 'বর্তমান ও ভবিষ্যৎ', titleEn: 'A Living Monument of Bengal Heritage', titleBn: 'বাংলার জীবন্ত ঐতিহ্য ও সাংস্কৃতিক আলয়', descEn: 'Khelat Bhawan continues as an active cultural sanctuary celebrating music, heritage walks, and sacred rituals.', descBn: 'খেলাৎ ভবন আজ এক জীবন্ত সাংস্কৃতিক মহাতীর্থ হিসেবে দেড় শতাব্দীরও বেশি সময় ধরে প্রবহমান।' }
  ];

  for (const m of timelineMilestones) {
    await client.createOrReplace({
      _id: `timeline-${m.year}`,
      _type: 'timeline',
      year: m.year,
      era: { en: m.eraEn, bn: m.eraBn },
      title: { en: m.titleEn, bn: m.titleBn },
      desc: { en: m.descEn, bn: m.descBn }
    });
    console.log(`   ✓ Timeline Milestone: ${m.year} — ${m.titleEn}`);
  }

  // 7. Reservations & Heritage Rental Packages
  console.log('📦 Seeding Rental Packages...');
  const rentalPackages = [
    {
      id: 'wedding',
      orderRank: 1,
      titleEn: 'Wedding Ceremony & Sangeet',
      titleBn: 'ওয়েডিং সিরিমনি ও সঙ্গীত (Wedding Ceremony & Sangeet)',
      category: 'wedding',
      guestCapacity: 'Up to 1,500 Guests',
      descEn: 'Host timeless royal wedding ceremonies, grand receptions, and vibrant sangeet celebrations in the illuminated Thakur Dalan courtyard and grand ballroom suites.',
      descBn: 'ঐতিহাসিক ঠাকুর দালান প্রাঙ্গণ ও রাজকীয় মহলে স্মরণীয় বিবাহ, সাড়ম্বর সংবর্ধনা ও আনন্দমুখর সঙ্গীত অনুষ্ঠান আয়োজন।'
    },
    {
      id: 'concert',
      orderRank: 2,
      titleEn: 'Heritage Classical Concert / Soiree',
      titleBn: 'মার্গ সঙ্গীত ও সান্ধ্য জলসা (Heritage Classical Concert / Soiree)',
      category: 'concert',
      guestCapacity: 'Up to 1,500 Guests',
      descEn: 'Acoustically rich classical Indian concerts, baithaks, poetry recitals, and intimate musical soirees in a 170-year-old aristocratic ambiance.',
      descBn: 'শাস্ত্রীয় উচ্চাঙ্গ সঙ্গীত, বাচিক অনুষ্ঠান, সাহিত্য সভা ও সঙ্গীত সন্ধ্যার জন্য অনুপম মার্বেল প্রাঙ্গণ।'
    },
    {
      id: 'gala',
      orderRank: 3,
      titleEn: 'Private Gala / Aristocratic Dinner',
      titleBn: 'অভিজাত নৈশভোজ ও গালা (Private Gala / Aristocratic Dinner)',
      category: 'gala',
      guestCapacity: 'Up to 1,500 Guests',
      descEn: 'Distinguished private banquets, royal feasts, and aristocratic gala dinners under antique Belgian glass chandeliers and illuminated heritage arches.',
      descBn: 'বেলজিয়াম কাচের ঝাড়বাতি ও সাবেকি আলোয় সজ্জিত মহলে বিশিষ্ট সান্ধ্যভোজ, রাজকীয় ভোজসভা ও গালা ডিনার।'
    },
    {
      id: 'cinema',
      orderRank: 4,
      titleEn: 'Film & Art Photography Shoot',
      titleBn: 'চলচ্চিত্র ও আর্ট ফটোশুট (Film & Art Photography Shoot)',
      category: 'cinema',
      guestCapacity: 'Cast & Production Crew (Up to 1,500)',
      descEn: 'Authentic 19th-century architectural backdrops for national and international period cinema, documentaries, and editorial fashion shoots.',
      descBn: 'ঐতিহাসিক চলচ্চিত্র, তথ্যচিত্র ও ফ্যাশন ফটোশুটের জন্য উনিশ শতকের দুর্লভ ঐতিহ্যবাহী প্রাসাদের দৃশ্যপট।'
    },
    {
      id: 'corporate',
      orderRank: 5,
      titleEn: 'Corporate Cultural Summit',
      titleBn: 'কর্পোরেট কালচারাল সামিট (Corporate Cultural Summit)',
      category: 'corporate',
      guestCapacity: 'Up to 1,500 Guests',
      descEn: 'Prestigious executive conclaves, corporate summits, flagship product unveilings, and institutional galas amidst 170+ years of aristocratic stature.',
      descBn: 'ফ্ল্যাগশিপ প্রডাক্ট লঞ্চ, উচ্চপর্যায়ের সম্মেলন ও প্রাতিষ্ঠানিক সমাবেশের জন্য আধুনিক সুবিধা ও ১৭০ বছরের আভিজাত্যের রাজকীয় পরিবেশ।'
    }
  ];

  for (const r of rentalPackages) {
    await client.createOrReplace({
      _id: `rental-${r.id}`,
      _type: 'rentalPackage',
      orderRank: r.orderRank,
      title: { en: r.titleEn, bn: r.titleBn },
      category: r.category,
      guestCapacity: r.guestCapacity,
      desc: { en: r.descEn, bn: r.descBn }
    });
    console.log(`   ✓ Rental Package: ${r.titleEn}`);
  }

  console.log('\n🎉 ALL WEBSITE CONTENT SUCCESSFULLY PRE-POPULATED IN SANITY CMS!');
}

runSeeder().catch((err) => {
  console.error('\n❌ Seeding error:', err.message);
});
