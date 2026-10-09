/**
 * Khelat Bhawan In-App CMS Store
 * Provides real-time reactive state management for all editable website sections.
 */

import { defaultEventsData } from './eventsData';

const CMS_STORAGE_KEY = 'khelat_estate_cms_data_v1';

export const initialCMSData = {
  // 1. Site Settings & Hero
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

  // 2. Events & Celebrations (Pre-loaded with all curated events)
  events: defaultEventsData,

  // 3. Reservations & Heritage Rental Packages
  rentals: [
    {
      id: "wedding",
      title: { en: "Royal Weddings & Banquets", bn: "রাজকীয় বিবাহ ও উৎসব" },
      category: "Weddings & Celebrations",
      capacity: "100 – 600 Guests",
      image: "/images/SDP_0282.jpg",
      desc: {
        en: "Host timeless wedding ceremonies in the illuminated Thakur Dalan courtyard and grand ballroom suites.",
        bn: "ঐতিহাসিক ঠাকুর দালান প্রাঙ্গণ ও রাজকীয় মহলে স্মরণীয় বিবাহ ও অনুষ্ঠান আয়োজন।"
      },
      features: [
        "Exclusive Access to Thakur Dalan Courtyard",
        "Bridal Suite & Royal Dressing Chambers",
        "Heritage Chandelier & Courtyard Lighting",
        "Dedicated Estate Hospitality Liaison"
      ]
    },
    {
      id: "cinema",
      title: { en: "Period Cinema & Production Shoots", bn: "চলচ্চিত্র ও ফটোশুট" },
      category: "Cinematography",
      capacity: "Cast & Crew Setup",
      image: "/images/SDP_0344.jpg",
      desc: {
        en: "Authentic 19th-century architectural backdrops for national and international period cinema, documentaries, and editorial fashion shoots.",
        bn: "চলচ্চিত্র ও তথ্যচিত্রের জন্য উনিশ শতকের দুর্লভ ঐতিহ্যবাহী প্রাসাদের দৃশ্যপট।"
      },
      features: [
        "1845 Corinthian Colonnade Architecture",
        "Uninterrupted Daylight Courtyard Access",
        "3-Phase Power & Production Green Rooms",
        "Historic Marble Halls & Period Furniture"
      ]
    },
    {
      id: "concert",
      title: { en: "Classical Soirees & Cultural Evenings", bn: "মার্গ সঙ্গীত ও সান্ধ্য জলসা" },
      category: "Cultural Soiree",
      capacity: "50 – 250 Guests",
      image: "/images/SDP_0365.jpg",
      desc: {
        en: "Acoustically rich classical Indian concerts, baithaks, poetry recitals, and intellectual literary conclaves.",
        bn: "শাস্ত্রীয় উচ্চাঙ্গ সঙ্গীত ও সাহিত্য সন্ধ্যার জন্য অনুপম মার্বেল প্রাঙ্গণ।"
      },
      features: [
        "Acoustically Reverberant Historic Courtyard",
        "Platform Stage for Classical Virtuosos",
        "Traditional Carpet & Gaddi Seating Layouts",
        "Archival Audio & Ambient Illumination"
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
    }
  ],

  // 5. Visual Gallery & Films
  gallery: [
    {
      id: "gal-1",
      title: { en: "Classical Corinthian Capital Details", bn: "করিন্থিয়ান স্তম্ভ ও কারুকার্য" },
      mediaType: "image",
      category: "architecture",
      src: "/images/SDP_0282.jpg",
      photographer: "Heritage Architecture Survey",
      year: "1845",
      desc: { en: "Intricate architectural plaster reliefs and Corinthian fluted capitals.", bn: "ঊনবিংশ শতকের সূক্ষ্ম প্লাস্টার কারুকাজ ও করিন্থিয়ান শৈলীর স্তম্ভ।" }
    },
    {
      id: "gal-2",
      title: { en: "Durga Puja Thakur Dalan Illumination", bn: "শারদোৎসব ও ঠাকুর দালান" },
      mediaType: "image",
      category: "festivals",
      src: "/images/unnamed_6.webp",
      photographer: "Estate Cultural Archives",
      year: "2026",
      desc: { en: "Sacred courtyard illuminated during the 171-year-old family Durga Puja.", bn: "ঐতিহাসিক ঠাকুর দালানে ১৭১ বছরের প্রাচীন শারদোৎসব।" }
    },
    {
      id: "gal-3",
      title: { en: "Sanctified Chamber of Sri Ramakrishna", bn: "শ্রীরামকৃষ্ণ স্মারক কক্ষ" },
      mediaType: "image",
      category: "cultural",
      src: "/images/rk01.png",
      photographer: "Devotional Archives",
      year: "1881",
      desc: { en: "Room blessed by Bhagavan Sri Ramakrishna Paramhansa in 1881.", bn: "১৮৮১ সালে শ্রীরামকৃষ্ণদেবের পদধূলিতে পবিত্র স্থান।" }
    },
    {
      id: "gal-4",
      title: { en: "Grand Colonnade Corridor", bn: "প্রাসাদের অলিন্দ" },
      mediaType: "image",
      category: "architecture",
      src: "/images/khelat-bhawan-colonnade-corridor.jpg",
      photographer: "Architectural Archives",
      year: "1845",
      desc: { en: "Long perspective view through marble-floored colonnade corridors.", bn: "মার্বেল চত্বর এবং গ্র্যান্ড অলিন্দ।" }
    },
    {
      id: "gal-5",
      title: { en: "Palace Cinematography Film", bn: "হেরিটেজ চলচ্চিত্র" },
      mediaType: "video",
      category: "cinema",
      src: "/Videos/hero-palace-film.mp4",
      photographer: "Cinematography Unit",
      year: "2026",
      desc: { en: "Cinematic tour capturing the architectural soul of Khelat Bhawan.", bn: "খেলাৎ ভবনের জীবন্ত রাজকীয় ঐতিহ্যের চিত্রায়ন।" }
    }
  ],

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
