/**
 * Khelat Bhawan In-App CMS Store
 * Provides real-time reactive state management for all editable website sections.
 */

import { defaultEventsData } from './eventsData';
import { photographyGalleryData, filmsGalleryData } from './galleryData';

const CMS_STORAGE_KEY = 'khelat_estate_cms_data_v2';

const initialGalleryData = [
  ...photographyGalleryData.map((p) => ({
    id: p.id,
    title: p.title,
    mediaType: 'image',
    category: (p.category?.en || 'architecture').toLowerCase().includes('durga') ? 'festivals' : (p.category?.en || '').toLowerCase().includes('interior') ? 'cultural' : 'architecture',
    src: p.src,
    photographer: p.photographer || 'Estate Archives',
    year: p.year || '1845',
    desc: p.desc
  })),
  ...filmsGalleryData.map((f) => ({
    id: f.id,
    title: f.title,
    mediaType: 'video',
    category: 'cinema',
    src: f.src,
    photographer: f.photographer || 'Cinematography Unit',
    year: f.year || '2026',
    desc: f.desc
  }))
];

export const initialCMSData = {
  // 1. Site Settings & Hero Video
  settings: {
    heroVideoUrl: '',
    heroPosterUrl: '/images/hero-staircase-poster.jpg',
    visitingHoursEn: 'Mon – Sat: 11:00 AM – 7:00 PM (Prior appointment recommended for heritage tours & meetings)',
    visitingHoursBn: 'সোম – শনিবার: সকাল ১১:০০ – সন্ধ্যা ৭:০০ (হেরিটেজ ট্যুর ও সাক্ষাতের জন্য পূর্বানুমতি আবশ্যক)',
    phonePrimary: '+91 98310 93021',
    phoneSecondary: '+91 99031 34231',
    email: 'councilofculture.ghoshbari47@gmail.com',
    address: '47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India',
    googleMapsUrl: 'https://share.google/TFFurvjijjI8QM8eg'
  },

  // 2. Events & Celebrations (All 5 Curated Events)
  events: defaultEventsData,

  // 3. Reservations & Heritage Rental Packages
  rentals: [
    {
      id: "wedding",
      title: { en: "Wedding Ceremony & Sangeet", bn: "ওয়েডিং সিরিমনি ও সঙ্গীত (Wedding Ceremony & Sangeet)" },
      category: "wedding",
      capacity: "Up to 1,500 Guests",
      image: "/images/SDP_0282.jpg",
      desc: {
        en: "Host timeless royal wedding ceremonies, grand receptions, and vibrant sangeet celebrations in the illuminated Thakur Dalan courtyard and grand ballroom suites.",
        bn: "ঐতিহাসিক ঠাকুর দালান প্রাঙ্গণ ও রাজকীয় মহলে স্মরণীয় বিবাহ, সাড়ম্বর সংবর্ধনা ও আনন্দমুখর সঙ্গীত অনুষ্ঠান আয়োজন।"
      },
      features: [
        "Capacity for up to 1,500 guests across grand courtyards",
        "Exclusive Access to Thakur Dalan Courtyard",
        "Bridal Suite & Royal Dressing Chambers",
        "Heritage Chandelier & Courtyard Lighting",
        "Dedicated Estate Hospitality Liaison"
      ]
    },
    {
      id: "concert",
      title: { en: "Heritage Classical Concert / Soiree", bn: "মার্গ সঙ্গীত ও সান্ধ্য জলসা (Heritage Classical Concert / Soiree)" },
      category: "concert",
      capacity: "Up to 1,500 Guests",
      image: "/images/SDP_0257.jpg",
      desc: {
        en: "Acoustically rich classical Indian concerts, baithaks, poetry recitals, and intimate musical soirees in a 170-year-old aristocratic ambiance.",
        bn: "শাস্ত্রীয় উচ্চাঙ্গ সঙ্গীত, বাচিক অনুষ্ঠান, সাহিত্য সভা ও সঙ্গীত সন্ধ্যার জন্য অনুপম মার্বেল প্রাঙ্গণ।"
      },
      features: [
        "Accommodates up to 1,500 attendees with traditional seating",
        "Acoustically Reverberant Historic Courtyard",
        "Platform Stage for Classical Virtuosos",
        "Traditional Carpet & Gaddi Seating Layouts",
        "Archival Audio & Ambient Illumination"
      ]
    },
    {
      id: "gala",
      title: { en: "Private Gala / Aristocratic Dinner", bn: "অভিজাত নৈশভোজ ও গালা (Private Gala / Aristocratic Dinner)" },
      category: "gala",
      capacity: "Up to 1,500 Guests",
      image: "/images/SDP_0365.jpg",
      desc: {
        en: "Distinguished private banquets, royal feasts, and aristocratic gala dinners under antique Belgian glass chandeliers and illuminated heritage arches.",
        bn: "বেলজিয়াম কাচের ঝাড়বাতি ও সাবেকি আলোয় সজ্জিত মহলে বিশিষ্ট সান্ধ্যভোজ, রাজকীয় ভোজসভা ও গালা ডিনার।"
      },
      features: [
        "Royal banquet and reception capacity up to 1,500 guests",
        "Grand Courtyard & Banquet Hall Setting",
        "Silver-Service Dining Coordination & Heritage Lounges",
        "Evening Heritage Chandelier & Architectural Lighting",
        "Estate Concierge & Valet Service Coordination"
      ]
    },
    {
      id: "cinema",
      title: { en: "Film & Art Photography Shoot", bn: "চলচ্চিত্র ও আর্ট ফটোশুট (Film & Art Photography Shoot)" },
      category: "cinema",
      capacity: "Cast & Production Crew (Up to 1,500)",
      image: "/images/SDP_0344.jpg",
      desc: {
        en: "Authentic 19th-century architectural backdrops for national and international period cinema, documentaries, and editorial fashion shoots.",
        bn: "ঐতিহাসিক চলচ্চিত্র, তথ্যচিত্র ও ফ্যাশন ফটোশুটের জন্য উনিশ শতকের দুর্লভ ঐতিহ্যবাহী প্রাসাদের দৃশ্যপট।"
      },
      features: [
        "1845 Corinthian Colonnade Architecture",
        "Uninterrupted Daylight Courtyard Access",
        "3-Phase Power & Production Green Rooms",
        "Historic Marble Halls & Period Furniture",
        "Dedicated Hair, Makeup & Wardrobe Chambers"
      ]
    },
    {
      id: "corporate",
      title: { en: "Corporate Cultural Summit", bn: "কর্পোরেট কালচারাল সামিট (Corporate Cultural Summit)" },
      category: "corporate",
      capacity: "Up to 1,500 Guests",
      image: "/images/SDP_0299.jpg",
      desc: {
        en: "Prestigious executive conclaves, corporate summits, flagship product unveilings, and institutional galas amidst 170+ years of aristocratic stature.",
        bn: "ফ্ল্যাগশিপ প্রডাক্ট লঞ্চ, উচ্চপর্যায়ের সম্মেলন ও প্রাতিষ্ঠানিক সমাবেশের জন্য আধুনিক সুবিধা ও ১৭০ বছরের আভিজাত্যের রাজকীয় পরিবেশ।"
      },
      features: [
        "Flexible summit and conference capacity up to 1,500 delegates",
        "Exclusive Heritage Licensing & High-Amperage Power",
        "VIP Executive Lounge & Breakout Colonnade Areas",
        "AV Presentation & Media Production Support",
        "Bespoke Catering Liaison & High-Protocol Security"
      ]
    }
  ],

  // 4. Guest Reviews & Feedback Moderation
  feedback: [
    {
      id: "fb-1",
      name: "Dr. Ananya Mukherjee",
      rating: 5,
      visitType: "Heritage Walk & Durga Puja",
      review: "Stepping into Khelat Bhawan during Durga Puja felt like time travel to 19th century Kolkata. The Corinthian columns, Belgian glass chandeliers, and the warmth of the Ghosh family are unmatched.",
      isApproved: true,
      date: "October 2026"
    },
    {
      id: "fb-2",
      name: "Sourav Ganguly",
      rating: 5,
      visitType: "Classical Music Baithak",
      review: "A magnificent treasure of Bengal's cultural renaissance. The acoustics of the Nat Mandir courtyard during the classical soiree were transcendent.",
      isApproved: true,
      date: "September 2026"
    },
    {
      id: "fb-3",
      name: "Elena Rostova",
      rating: 5,
      visitType: "Documentary Film Shoot",
      review: "We filmed an international heritage documentary here. The architectural authenticity, preservation of heirlooms, and cooperative management made the shoot unforgettable.",
      isApproved: true,
      date: "August 2026"
    },
    {
      id: "fb-4",
      name: "Prof. Debashis Sen",
      rating: 5,
      visitType: "Architectural Research Study",
      review: "An exceptional example of 19th-century Bengal renaissance neoclassical architecture. The library archives and marble courtyards are impeccably preserved.",
      isApproved: true,
      date: "July 2026"
    },
    {
      id: "fb-5",
      name: "Shreya Roychowdhury",
      rating: 5,
      visitType: "Family Heritage Tour",
      review: "The evening atmosphere with the courtyard illuminated is breathtaking. A proud symbol of Kolkata's aristocratic history and living traditions.",
      isApproved: true,
      date: "June 2026"
    }
  ],

  // 5. Visual Gallery & Films (All 21+ Curated Photographs & Films)
  gallery: initialGalleryData,

  // 6. Terms & Privacy Policy
  legal: {
    privacyTextEn: `# Privacy Policy — Khelat Bhawan Heritage Estate\n**Last Updated:** October 2026\n\n### 1. Overview & Heritage Custodianship\nKhelat Bhawan (Pathuria Ghata Ghosh Bari), established in 1845 and administered under the perpetual trusts (*Lakshmi Narayan Gopal Radha Krishna Jew Trust, Khelat Ghosh Memorial Trust, and Artist Nectar Council of Culture*), is committed to safeguarding the digital privacy and personal data of our visitors, patrons, scholars, and event guests.\n\n### 2. Information We Collect\nWe collect only essential details necessary to facilitate official communications, heritage visits, and estate reservations:\n- **Contact Inquiries:** Name, email address, phone number, and event specifications.\n- **Automated Logging:** Anonymous analytics to optimize heritage exhibition rendering.\n\n### 3. Purpose of Processing\nYour data is used strictly for responding to reservations within our 48-hour Concierge SLA. Commercial sale or third-party brokering is strictly prohibited.`,
    privacyTextBn: `# গোপনীয়তা নীতি — খেলাৎ ভবন হেরিটেজ এস্টেট\n**সর্বশেষ আপডেট:** অক্টোবর ২০২৬\n\n### ১. পরিচিতি ও ঐতিহ্য সংরক্ষণ\n১৮৪৫ সালে প্রতিষ্ঠিত খেলাৎ ভবন তার সম্মানিত অতিথি, গবেষক ও দর্শনার্থীদের ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষায় সম্পূর্ণ অঙ্গীকারবদ্ধ।\n\n### ২. তথ্যের ব্যবহার\nহেরিটেজ বুকিং এবং যোগাযোগের উদ্দেশ্যে সংগৃহীত তথ্যাদি সম্পূর্ণ সুরক্ষিত রাখা হয় এবং কোনো অবস্থাতেই তৃতীয় পক্ষের কাছে হস্তান্তর করা হয় না।`,
    termsTextEn: `# Terms of Use & Heritage Estate Protocol\n**Last Updated:** October 2026\n\n### 1. Acceptance of Terms\nBy accessing the Khelat Bhawan digital archive and estate services, you agree to comply with all architectural conservation protocols, intellectual property guidelines, and reservation terms.\n\n### 2. Intellectual Property\nAll photographs, video recordings, archival documents, and family lineage chronicles are proprietary assets of the Khelat Bhawan Heritage Trust.\n\n### 3. Reservation & Concierge Protocol\nOnline reservation submissions will be reviewed by our estate coordinators within 48 hours.`,
    termsTextBn: `# ব্যবহারের শর্তাবলী ও এস্টেট নীতিমালা\n**সর্বশেষ আপডেট:** অক্টোবর ২০২৬\n\n### ১. শর্তাবলীর সম্মতি\nখেলাৎ ভবনের ওয়েবসাইট ও প্রাঙ্গণ ব্যবহারের ক্ষেত্রে ঐতিহাসিক সংরক্ষণ নীতিমালা ও নিয়মাবলী মেনে চলা বাধ্যতামূলক।\n\n### ২. বৌদ্ধিক সম্পদ\nওয়েবসাইটের সমস্ত ছবি, ভিডিও ও তথ্য খেলাৎ ভবন ট্রাস্টের নিজস্ব সম্পত্তি।`
  }
};

export function getCMSData() {
  try {
    const local = localStorage.getItem(CMS_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      return { ...initialCMSData, ...parsed };
    }
  } catch (err) {
    console.warn('Could not read CMS local storage:', err);
  }
  return initialCMSData;
}

export function saveCMSData(data) {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('khelat_cms_updated', { detail: data }));
    return true;
  } catch (err) {
    console.error('Could not save CMS data:', err);
    return false;
  }
}

export function resetCMSData() {
  try {
    localStorage.removeItem(CMS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('khelat_cms_updated', { detail: initialCMSData }));
    return initialCMSData;
  } catch (err) {
    console.error('Could not reset CMS data:', err);
    return initialCMSData;
  }
}
