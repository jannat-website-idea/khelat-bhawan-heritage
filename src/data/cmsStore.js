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

  // 2. Events & Celebrations (Pre-loaded with all 5 curated events)
  events: defaultEventsData,

  // 3. History Timeline (Pre-loaded with all milestones)
  timeline: [
    {
      year: "1845",
      badge: { en: "ESTATE FOUNDATION", bn: "স্থাপত্য ও প্রাসাদ প্রতিষ্ঠা" },
      title: { en: "Founding of Khelat Bhawan Palace", bn: "খেলাৎ ভবনের প্রতিষ্ঠা ও রাজপ্রাসাদ নির্মাণ" },
      desc: {
        en: "Babu Khelat Chandra Ghosh constructed this grand classical mansion at Pathuria Ghata, North Kolkata with Corinthian colonnades, marble courtyards, and Belgian crystal chandeliers.",
        bn: "বাবু খেলাৎ চন্দ্র ঘোষ উত্তর কলকাতার পাথুরিয়াঘাটায় গ্র্যান্ড করিন্থিয়ান স্তম্ভ, মার্বেল চত্বর এবং বেলজিয়ান ঝাড়বাতি শোভিত এই ঐতিহাসিক প্রাসাদ নির্মাণ করেন।"
      },
      image: "/images/SDP_0344.jpg"
    },
    {
      year: "1855",
      badge: { en: "DURGA PUJA INAUGURATION", bn: "দুর্গাপূজার সূচনা" },
      title: { en: "Inauguration of Historic Durga Puja", bn: "প্রথম দুর্গাপূজা ও নিত্য দেবসেবার সূচনা" },
      desc: {
        en: "The first formal Durga Puja celebration at Khelat Bhawan established an unbroken 171-year sacred tradition with traditional Ekchala Daker Saaj idol and Sandhi Puja.",
        bn: "খেলাৎ ভবনে প্রথম আনুষ্ঠানিক একচালা ডাকের সাজের দেবী দুর্গাপূজার সূচনা হয়—যে পবিত্র ঐতিহ্য ১৭১ বছর ধরে আজ পর্যন্ত অব্যাহত।"
      },
      image: "/images/unnamed_6.webp"
    },
    {
      year: "1881",
      badge: { en: "SPIRITUAL VISITATION", bn: "আধ্যাত্মিক আশীর্বাদ" },
      title: { en: "Historic Visit of Sri Ramakrishna", bn: "শ্রীরামকৃষ্ণ পরমহংসদেবের ঐতিহাসিক আগমন" },
      desc: {
        en: "Sri Ramakrishna Paramhansa sanctified Khelat Bhawan with his presence in 1881, as chronicled in the Ramakrishna Kathamrita, blessing the household's devotion and cultural patronage.",
        bn: "শ্রীরামকৃষ্ণ পরমহংসদেব খেলাৎ ভবনে শুভাগমন করেন, সঙ্গীত ও ভক্তিমূলক আলোচনায় অংশ নেন এবং প্রাঙ্গণকে চিরতরে পবিত্র করেন।"
      },
      image: "/images/rk01.png"
    },
    {
      year: "1920",
      badge: { en: "LEGAL TRUST FORMALIZATION", bn: "বিধিবদ্ধ ট্রাস্ট প্রশাসন" },
      title: { en: "Formalization of First Heritage Trusts", bn: "প্রথম আনুষ্ঠানিক হেরিটেজ ট্রাস্ট প্রতিষ্ঠা" },
      desc: {
        en: "The family establishes formal legal trusts to permanently safeguard the estate properties, ritual endowments, and ongoing philanthropic commitments.",
        bn: "পারিবারিক দেবসেবা, শিক্ষাবৃত্তি এবং দানশীল সমাজকল্যাণ স্থায়ী করতে প্রথম বিধিবদ্ধ ট্রাস্ট দলিল সম্পাদিত হয়।"
      },
      image: "/images/SDP_0299.jpg"
    },
    {
      year: "1985",
      badge: { en: "PERFORMING ARTS COUNCIL", bn: "সাংস্কৃতিক পরিষদ" },
      title: { en: "Foundation of Artist Nectar Council", bn: "আর্টিস্ট নেকটার কাউন্সিল অফ কালচার প্রতিষ্ঠা" },
      desc: {
        en: "Formation of Artist Nectar Council of Culture to mentor emerging classical musicians, host cultural workshops, and organize heritage theatrical productions.",
        bn: "বাংলা নাটক, মার্গ সঙ্গীত ও যুব শিল্পীদের উৎসাহ দিতে আর্টিস্ট নেকটার কাউন্সিল প্রতিষ্ঠিত হয়।"
      },
      image: "/images/unnamed_12.webp"
    },
    {
      year: "2026",
      badge: { en: "LIVING MONUMENT TODAY", bn: "বর্তমান ও ভবিষ্যৎ" },
      title: { en: "A Living Monument of Bengal Heritage", bn: "বাংলার জীবন্ত ঐতিহ্য ও সাংস্কৃতিক আলয়" },
      desc: {
        en: "Khelat Bhawan continues as an active cultural sanctuary celebrating music, heritage walks, period cinema, and sacred festivals for global admirers.",
        bn: "খেলাৎ ভবন আজ এক জীবন্ত সাংস্কৃতিক মহাতীর্থ হিসেবে দেড় শতাব্দীরও বেশি সময় ধরে প্রবহমান।"
      },
      image: "/images/SDP_0368.jpg"
    }
  ],

  // 4. Heritage & About
  about: {
    title: {
      en: "The Imperial Legacy of Khelat Bhawan",
      bn: "খেলাৎ ভবন ও রাজবাড়ির ঐতিহাসিক উত্তরাধিকার"
    },
    subtitle: {
      en: "A 175-year journey of preserving Bengali aristocratic heritage, sacred traditions, and classical arts",
      bn: "১৮৪৫ সাল থেকে উত্তর কলকাতায় বাঙালি সংস্কৃতি, শাস্ত্রীয় সঙ্গীত ও আধ্যাত্মিক ভক্তি সংরক্ষণের দেড় শতাব্দীরও প্রাচীন গৌরব"
    },
    historyOverview: {
      en: "Khelat Bhawan stands as an immortal monument of 19th-century Bengal renaissance architecture, established in 1845 by Babu Khelat Chandra Ghosh at Pathuria Ghata, North Kolkata.",
      bn: "খেলাৎ ভবন উত্তর কলকাতার পাথুরিয়াঘাটায় ১৮৪৫ সালে বাবু খেলাৎ চন্দ্র ঘোষ কর্তৃক প্রতিষ্ঠিত ঊনবিংশ শতাব্দীর এক অনুপম ঐতিহাসিক রাজপ্রাসাদ।"
    }
  },

  // 5. Founder
  founder: {
    name: {
      en: "Babu Khelat Chandra Ghosh",
      bn: "বাবু খেলাৎ চন্দ্র ঘোষ"
    },
    years: "1775 – 1845",
    image: "/images/khelat-ghosh-portrait-clean.png",
    biography: {
      en: "Babu Khelat Chandra Ghosh was a visionary aristocrat, legendary philanthropist, and esteemed cultural patriarch of 19th-century Calcutta who established Khelat Bhawan in 1845.",
      bn: "বাবু খেলাৎ চন্দ্র ঘোষ ছিলেন ঊনবিংশ শতাব্দীর কলকাতার এক প্রাতঃস্মরণীয় দূরদর্শী ব্যক্তিত্ব, বিশিষ্ট দানশীল সমাজসেবক ও মার্গ সঙ্গীতের পৃষ্ঠপোষক।"
    }
  },

  // 6. Rental Packages
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
      }
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
      }
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
      }
    }
  ],

  // 7. Terms & Privacy Policy
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
