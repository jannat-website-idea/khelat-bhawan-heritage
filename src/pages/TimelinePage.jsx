import React, { useState } from 'react';
import { getAssetUrl } from '../utils/assetHelper';
import { familyTreeData } from '../data/familyTreeData';
import { Clock, Users, Calendar, ArrowRight, Sparkles, CheckCircle2, Landmark, Heart, Music, Shield, BookOpen, Film, Flame } from 'lucide-react';

export default function TimelinePage({ lang = 'en', setActiveTab, onOpenLightbox, content }) {
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' | 'family-tree'
  const [expandedGen, setExpandedGen] = useState(1);
  const [activeHoverNode, setActiveHoverNode] = useState(null);

  const isBn = lang === 'bn';

  const milestones = [
    {
      year: "1845",
      badge: isBn ? "স্থাপত্য ও প্রাসাদ প্রতিষ্ঠা" : "ESTATE FOUNDATION",
      title: isBn ? "খেলাৎ ভবনের প্রতিষ্ঠা ও রাজপ্রাসাদ নির্মাণ" : "Founding of Khelat Bhawan Palace",
      desc: isBn 
        ? "বাবু খেলাৎ চন্দ্র ঘোষ উত্তর কলকাতার পাথুরিয়াঘাটায় গ্র্যান্ড করিন্থিয়ান স্তম্ভ, মার্বেল চত্বর এবং বেলজিয়ান ঝাড়বাতি শোভিত এই ঐতিহাসিক প্রাসাদ নির্মাণ করেন।"
        : "Babu Khelat Chandra Ghosh commissions the monumental palatial mansion at 47 Pathuria Ghata Street, synthesizing Doric and Corinthian classical architecture with traditional Bengali courtyards.",
      image: "/images/SDP_0344.jpg",
      caption: isBn ? "পাথুরিয়াঘাটা, ১৮৪৫" : "Pathuria Ghata, c. 1845",
      actionLabel: isBn ? "আর্কাইভ দেখুন" : "EXPLORE ARCHIVES",
      quote: isBn ? "“ঐতিহ্যের এক অমর আলয়।”" : "“A home for tradition.”",
      icon: Landmark
    },
    {
      year: "1855",
      badge: isBn ? "দুর্গাপূজার সূচনা" : "DURGA PUJA INAUGURATION",
      title: isBn ? "প্রথম দুর্গাপূজা ও নিত্য দেবসেবার সূচনা" : "Inauguration of Historic Durga Puja",
      desc: isBn 
        ? "খেলাৎ ভবনে প্রথম আনুষ্ঠানিক একচালা ডাকের সাজের দেবী দুর্গাপূজার সূচনা হয়—যে পবিত্র ঐতিহ্য ১৭১ বছর ধরে আজ পর্যন্ত অব্যাহত।"
        : "The first formal Durga Puja celebration is consecrated at Thakur Dalan. An unbroken 171-year sacred ritual begins with traditional Ekchala Daker Saaj idol and 108 lotus sandhi puja.",
      image: "/images/unnamed_6.webp",
      caption: isBn ? "খেলাৎ ভবনে ঐতিহাসিক দুর্গাপূজা" : "Durga Puja at Khelat Bhawan",
      actionLabel: isBn ? "গ্যালারি দেখুন" : "VIEW GALLERY",
      quote: isBn ? "“একত্রিত ভক্তির চিরন্তন সুর।”" : "“A tradition that unites.”",
      icon: Heart
    },
    {
      year: "1881",
      badge: isBn ? "আধ্যাত্মিক আশীর্বাদ" : "SPIRITUAL VISITATION",
      title: isBn ? "শ্রীরামকৃষ্ণ পরমহংসদেবের ঐতিহাসিক আগমন" : "Historic Visit of Sri Ramakrishna",
      desc: isBn 
        ? "শ্রীরামকৃষ্ণ পরমহংসদেব খেলাৎ ভবনে শুভাগমন করেন, সঙ্গীত ও ভক্তিমূলক আলোচনায় অংশ নেন এবং প্রাঙ্গণকে চিরতরে পবিত্র করেন।"
        : "Sri Ramakrishna Paramhansa sanctifies Khelat Bhawan with his presence in 1881, as chronicled in the Ramakrishna Kathamrita, blessing the household's devotion and cultural patronage.",
      image: "/images/rk01.png",
      caption: isBn ? "শ্রীশ্রী রামকৃষ্ণ পরমহংসদেব" : "Sri Ramakrishna Paramhansa",
      actionLabel: isBn ? "বিস্তারিত পড়ুন" : "READ MORE",
      quote: isBn ? "“চিরন্তন আশীর্বাদের পুণ্য ধারা।”" : "“Blessings that endure.”",
      icon: Sparkles
    },
    {
      year: "1920",
      badge: isBn ? "বিধিবদ্ধ ট্রাস্ট প্রশাসন" : "LEGAL TRUST FORMALIZATION",
      title: isBn ? "প্রথম আনুষ্ঠানিক হেরিটেজ ট্রাস্ট প্রতিষ্ঠা" : "Formalization of First Heritage Trusts",
      desc: isBn 
        ? "পারিবারিক দেবসেবা, শিক্ষাবৃত্তি এবং দানশীল সমাজকল্যাণ স্থায়ী করতে প্রথম বিধিবদ্ধ ট্রাস্ট দলিল সম্পাদিত হয়।"
        : "The family establishes formal legal trusts to permanently safeguard the estate properties, ritual endowments, and ongoing philanthropic commitments.",
      image: "/images/SDP_0299.jpg",
      caption: isBn ? "পারিবারিক ট্রাস্ট মহাফেজখানা, ১৯২০" : "Family Trust Archives, 1920",
      actionLabel: isBn ? "ট্রাস্ট তথ্য দেখুন" : "VIEW TRUSTEES",
      quote: isBn ? "“অবিচ্ছিন্ন সেবার পবিত্র অঙ্গীকার।”" : "“An unbroken sacred flame.”",
      icon: Shield
    },
    {
      year: "1947",
      badge: isBn ? "স্বাধীনতা যুগ ও নবজাগরণ" : "INDEPENDENCE ERA",
      title: isBn ? "স্বাধীনতা-পরবর্তী সাংস্কৃতিক রূপান্তর" : "Post-Independence Cultural Renaissance",
      desc: isBn 
        ? "স্বাধীন ভারতের রূপান্তরের সাথে সামঞ্জস্য রেখে পরিবারের উত্তরসূরিগণ উত্তর কলকাতার ভারতীয় ধ্রুপদী সঙ্গীত ও সমাজসেবাকে এগিয়ে নিয়ে যান।"
        : "Khelat Bhawan navigates the transition of post-independence Bengal while expanding support for classical Indian vocalists, sitarists, and vernacular literature.",
      image: "/images/SDP_0273.jpg",
      caption: isBn ? "প্রাসাদের অভ্যন্তরীণ সঙ্গীত সভা" : "Inner Courtyard & Music Salons",
      actionLabel: isBn ? "মার্গসঙ্গীত জানুন" : "EXPLORE PATRONAGE",
      quote: isBn ? "“সময়ের পরিবর্তনেও অক্ষুণ্ণ ঐতিহ্য।”" : "“Through changing times.”",
      icon: Music
    },
    {
      year: "1975",
      badge: isBn ? "ঐতিহাসিক স্থাপত্য সংরক্ষণ" : "ARCHITECTURAL CONSERVATION",
      title: isBn ? "ঐতিহাসিক অট্টালিকার প্রধান সংরক্ষণ ও সংস্কার" : "Major Estate Conservation & Restoration",
      desc: isBn 
        ? "প্রাসাদের করিন্থিয়ান থাম, কাঠের অলঙ্কৃত বারান্দা এবং মার্বেল প্রাঙ্গণকে সযত্নে সংস্কার করে স্থাপত্য অক্ষুণ্ণ রাখা হয়।"
        : "Comprehensive structural conservation safeguards the antique teak woodwork, cast-iron railings, marble courtyard, and sanctified alcoves for upcoming generations.",
      image: "/images/SDP_0291.jpg",
      caption: isBn ? "কাষ্ঠশিল্প ও অলঙ্কৃত রেলিং সংরক্ষণ" : "Courtyard Teak & Iron Conservation",
      actionLabel: isBn ? "সংরক্ষণ দেখুন" : "VIEW RESTORATION",
      quote: isBn ? "“পাথরে খোদাই করা স্থাপত্য স্মৃতি।”" : "“Preserving the sacred stone.”",
      icon: Landmark
    },
    {
      year: "1985",
      badge: isBn ? "সাংস্কৃতিক পরিষদ" : "PERFORMING ARTS COUNCIL",
      title: isBn ? "আর্টিস্ট নেকটার কাউন্সিল অফ কালচার প্রতিষ্ঠা" : "Foundation of Artist Nectar Council",
      desc: isBn 
        ? "বাংলা নাটক, মার্গ সঙ্গীত ও যুব শিল্পীদের উৎসাহ দিতে আর্টিস্ট নেকটার কাউন্সিল প্রতিষ্ঠিত হয়।"
        : "Formation of Artist Nectar Council of Culture to mentor emerging classical musicians, host cultural workshops, and organize heritage theatrical productions.",
      image: "/images/unnamed_12.webp",
      caption: isBn ? "শাস্ত্রীয় সঙ্গীত ও কলা সম্মিলনী" : "Classical Music Conclave",
      actionLabel: isBn ? "পরিষদ জানুন" : "READ ARCHIVE",
      quote: isBn ? "“সুরের ঝর্ণাধারা রাজদরবারে।”" : "“Melodies in the grand salon.”",
      icon: Flame
    },
    {
      year: "2005",
      badge: isBn ? "ডিজিটাল মহাফেজখানা" : "ARCHIVAL DIGITIZATION",
      title: isBn ? "পারিবারিক পান্ডুলিপি ও ডিজিটাল আর্কাইভ উদ্যোগ" : "Manuscript & Photography Digital Archives",
      desc: isBn 
        ? "ঊনবিংশ শতাব্দীর দুষ্প্রাপ্য দলিল, ছবি ও সঙ্গীত পাণ্ডুলিপি সংরক্ষণের জন্য ডিজিটাল আর্কাইভ চালু হয়।"
        : "Launch of specialized digital preservation initiative documenting 19th-century royal family portraits, ancestral records, and vintage Calcutta photography.",
      image: "/images/SDP_0305.jpg",
      caption: isBn ? "সংরক্ষিত দুর্লভ পান্ডুলিপি" : "Preserved 19th-Century Records",
      actionLabel: isBn ? "আর্কাইভ অনুসন্ধান" : "EXPLORE RECORDS",
      quote: isBn ? "“কালির রেখা ও জীবন্ত স্মৃতি।”" : "“Ink, archives & living memory.”",
      icon: BookOpen
    },
    {
      year: "2015",
      badge: isBn ? "ঐতিহ্য পরিক্রমা ও চলচ্চিত্র" : "HERITAGE TOURISM & CINEMA",
      title: isBn ? "হেরিটেজ ট্যুর ও কালচারাল ফিল্ম শুটিং এর সূচনা" : "Curated Heritage Tours & Period Productions",
      desc: isBn 
        ? "আন্তর্জাতিক ও জাতীয় চলচ্চিত্রের শুটিং এবং ঐতিহ্যপ্রেমীদের জন্য নিয়ন্ত্রিত হেরিটেজ ট্যুরের দ্বার উন্মুক্ত হয়।"
        : "Opening of Khelat Bhawan for curated heritage walks, architectural studies, prestigious period cinema filming, and aristocratic celebrations.",
      image: "/images/SDP_0359.jpg",
      caption: isBn ? "ঐতিহ্যবাহী স্তম্ভশ্রেণি ও নাটমন্দির" : "Grand Colonnade Heritage Walk",
      actionLabel: isBn ? "ইভেন্ট দেখুন" : "VIEW EVENTS",
      quote: isBn ? "“শিল্পের অঙ্গন সবার জন্য উন্মুক্ত।”" : "“Courtyards of classical arts.”",
      icon: Film
    },
    {
      year: "2026",
      badge: isBn ? "বর্তমান ও ভবিষ্যৎ রূপরেখা" : "PRESENT & FUTURE",
      title: isBn ? "১৭১তম বার্ষিক মহোৎসব ও গ্লোবাল হেরিটেজ পোর্টাল" : "171st Festive Gala & Global Heritage Stewardship",
      desc: isBn 
        ? "ডিজিটাল বুকিং, আন্তর্জাতিক সাংস্কৃতিক সম্মেলন এবং বাংলার সমৃদ্ধ আভিজাত্য সংরক্ষণের টেকসই আধুনিক মডেল।"
        : "Unveiling modern digital reservations, high-definition visual chronicles, interactive family archives, and sustainable global heritage outreach.",
      image: "/images/SDP_0368.jpg",
      caption: isBn ? "আজকের জীবন্ত ঐতিহ্য" : "The Living Monument Today",
      actionLabel: isBn ? "আজই পরিদর্শন করুন" : "EXPERIENCE TODAY",
      quote: isBn ? "“যুগে যুগে প্রবহমান এক জীবন্ত ঐতিহ্য।”" : "“A living monument for generations.”",
      icon: Sparkles
    }
  ];

  const handleCardClick = (item) => {
    onOpenLightbox({
      type: 'image',
      title: `${item.year} — ${item.title}`,
      desc: item.desc,
      src: item.image
    });
  };

  return (
    <main className="heritage-timeline-page pt-28 md:pt-36 pb-24 min-h-screen text-foreground relative overflow-hidden">
      {/* =========================================================================
          CONTINUOUS FULL-HEIGHT KHELAT BHAWAN ARCHITECTURAL BACKDROP
          Dissolves seamlessly down the entire timeline canvas across 4 zones
         ========================================================================= */}
      <div className="heritage-timeline-full-backdrop" aria-hidden="true">
        {/* Zone 1 (Top / Hero): Grand Facade & Colonnade */}
        <div className="heritage-backdrop-zone heritage-backdrop-zone--top">
          <img
            src={getAssetUrl('/images/SDP_0282.jpg')}
            alt=""
            className="heritage-backdrop-img heritage-backdrop-img--facade"
          />
          <span className="heritage-backdrop-script">Heritage Lives On</span>
          <div className="heritage-backdrop-stamp">
            <span>1845</span>
            <small>TO</small>
            <span>PRESENT</span>
          </div>
        </div>

        {/* Zone 2 (Upper-Mid): Inner Courtyard Arches */}
        <div className="heritage-backdrop-zone heritage-backdrop-zone--mid-upper">
          <img
            src={getAssetUrl('/images/SDP_0273.jpg')}
            alt=""
            className="heritage-backdrop-img heritage-backdrop-img--courtyard"
          />
          <div className="heritage-backdrop-watermark-lotus" />
        </div>

        {/* Zone 3 (Lower-Mid): Balcony Teak & Classical Pillars */}
        <div className="heritage-backdrop-zone heritage-backdrop-zone--mid-lower">
          <img
            src={getAssetUrl('/images/SDP_0359.jpg')}
            alt=""
            className="heritage-backdrop-img heritage-backdrop-img--pillars"
          />
        </div>

        {/* Zone 4 (Bottom): Living Heritage Courtyard Panorama */}
        <div className="heritage-backdrop-zone heritage-backdrop-zone--bottom">
          <img
            src={getAssetUrl('/images/SDP_0368.jpg')}
            alt=""
            className="heritage-backdrop-img heritage-backdrop-img--panoramic"
          />
        </div>
      </div>
      
      {/* =========================================================================
          1. HERO / INTRODUCTION
         ========================================================================= */}
      <section className="heritage-timeline-hero relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pb-14 text-left z-10">
        <div className="max-w-2xl space-y-3.5">
          <span className="heritage-timeline-hero__eyebrow">
            {isBn ? 'সময়ের পরিক্রমায়' : 'A JOURNEY THROUGH TIME'}
          </span>
          <h1 className="heritage-timeline-hero__title">
            {isBn ? 'ইতিহাস সময়রেখা' : 'History Timeline'}
          </h1>
          <p className="heritage-timeline-hero__desc">
            {isBn 
              ? '১৮৪৫ সাল থেকে বর্তমান পর্যন্ত ভক্তি, শিল্প, সংস্কৃতি এবং ঐতিহ্যবাহী অভিভাবকত্বের গৌরবময় পথচলা।' 
              : 'Key milestones from 1845 to the present, preserving a legacy of devotion, art, culture and community.'}
          </p>

          {/* Compact View Switcher Controls */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3">
            <button
              onClick={() => setActiveView('timeline')}
              className={`heritage-timeline-toggle-btn ${activeView === 'timeline' ? 'is-active' : ''}`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isBn ? 'ঐতিহাসিক সময়রেখা (১৮৪৫ – ২০২৬)' : 'Chronological Milestones (1845–2026)'}</span>
            </button>

            <button
              onClick={() => setActiveView('family-tree')}
              className={`heritage-timeline-toggle-btn ${activeView === 'family-tree' ? 'is-active' : ''}`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{isBn ? '৭ প্রজন্মের পারিবারিক বংশতালিকা' : '7-Generation Family Tree'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VIEW 1: EDITORIAL OVERLAPPING TIMELINE (MATCHING REFERENCE EXACTLY)
         ========================================================================= */}
      {activeView === 'timeline' && (
        <section className="heritage-timeline-editorial-stage max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          {/* Continuous Antique-Gold Central Line */}
          <div className="heritage-timeline-gold-track" aria-hidden="true" />

          {/* Alternating Wide Editorial Story Panels */}
          <div className="heritage-timeline-story-list">
            {milestones.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const IconComponent = item.icon || Calendar;

              return (
                <div
                  key={item.year}
                  data-reveal
                  onMouseEnter={() => setActiveHoverNode(idx)}
                  onMouseLeave={() => setActiveHoverNode(null)}
                  className={`heritage-timeline-entry ${isLeft ? 'heritage-timeline-entry--left' : 'heritage-timeline-entry--right'}`}
                >
                  {/* Left Side: Either the Large Story Card (if isLeft) OR the Quote (if isRight) */}
                  {isLeft ? (
                    <article
                      onClick={() => handleCardClick(item)}
                      className="heritage-timeline-panel heritage-timeline-panel--left"
                    >
                      <div className="heritage-timeline-panel__media">
                        <img
                          src={getAssetUrl(item.image)}
                          alt={item.title}
                          loading="lazy"
                          className="heritage-timeline-panel__img"
                        />
                        <div className="heritage-timeline-panel__caption">
                          <span>{item.caption}</span>
                        </div>
                      </div>

                      <div className="heritage-timeline-panel__body">
                        <div className="heritage-timeline-panel__pill">
                          <IconComponent className="w-3 h-3" />
                          <span>{item.badge}</span>
                        </div>
                        <div className="heritage-timeline-panel__year">{item.year}</div>
                        <h3 className="heritage-timeline-panel__title">{item.title}</h3>
                        <p className="heritage-timeline-panel__desc">{item.desc}</p>
                        <div className="heritage-timeline-panel__action">
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  ) : (
                    <div className="heritage-timeline-side-quote heritage-timeline-side-quote--left">
                      <p className="heritage-timeline-quote-text">{item.quote}</p>
                      <span className="heritage-timeline-quote-line" />
                    </div>
                  )}

                  {/* Center Node Marker (Positioned directly on the continuous gold track) */}
                  <div className="heritage-timeline-center-node" aria-hidden="true">
                    <div className={`heritage-timeline-node-dot ${activeHoverNode === idx ? 'is-active' : ''}`}>
                      <span className="heritage-timeline-node-core" />
                    </div>
                  </div>

                  {/* Right Side: Either the Quote (if isLeft) OR the Large Story Card (if isRight) */}
                  {!isLeft ? (
                    <article
                      onClick={() => handleCardClick(item)}
                      className="heritage-timeline-panel heritage-timeline-panel--right"
                    >
                      <div className="heritage-timeline-panel__body">
                        <div className="heritage-timeline-panel__pill">
                          <IconComponent className="w-3 h-3" />
                          <span>{item.badge}</span>
                        </div>
                        <div className="heritage-timeline-panel__year">{item.year}</div>
                        <h3 className="heritage-timeline-panel__title">{item.title}</h3>
                        <p className="heritage-timeline-panel__desc">{item.desc}</p>
                        <div className="heritage-timeline-panel__action">
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>

                      <div className="heritage-timeline-panel__media">
                        <img
                          src={getAssetUrl(item.image)}
                          alt={item.title}
                          loading="lazy"
                          className="heritage-timeline-panel__img"
                        />
                        <div className="heritage-timeline-panel__caption">
                          <span>{item.caption}</span>
                        </div>
                      </div>
                    </article>
                  ) : (
                    <div className="heritage-timeline-side-quote heritage-timeline-side-quote--right">
                      <p className="heritage-timeline-quote-text">{item.quote}</p>
                      <span className="heritage-timeline-quote-line" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Central Timeline Terminal: Present Day */}
          <div className="heritage-timeline-terminal text-center pt-16 pb-4">
            <div className="heritage-timeline-terminal__seal" aria-hidden="true">
              <span>✦</span>
            </div>
            <div className="heritage-timeline-terminal__label">
              <span className="heritage-timeline-terminal__rule" />
              <span>{isBn ? 'বর্তমান ও ভবিষ্যৎ' : 'PRESENT DAY'}</span>
              <span className="heritage-timeline-terminal__rule" />
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          VIEW 2: 7-GENERATION INTERACTIVE FAMILY TREE
         ========================================================================= */}
      {activeView === 'family-tree' && (
        <section className="my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300 relative z-10">
          <div className="bg-card/50 rounded-2xl p-6 border border-border/60 text-center max-w-3xl mx-auto mb-10">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              {isBn ? 'সাত প্রজন্মের অবিচ্ছিন্ন তত্ত্বাবধান' : 'Seven Generations of Unbroken Custodianship'}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed">
              {isBn
                ? '১৮৪৫ সাল থেকে বর্তমান পর্যন্ত পরিবার ও ট্রাস্টি মণ্ডলীর বংশানুক্রমিক অভিভাবকত্ব ও অবদান।'
                : 'Explore the genealogical stewardship of Babu Khelat Chandra Ghosh and his successors across 170+ years of Bengali cultural leadership.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyTreeData.map((gen) => {
              const isSelected = expandedGen === gen.gen;

              return (
                <div
                  key={gen.gen}
                  onClick={() => setExpandedGen(gen.gen)}
                  className={`bg-card rounded-3xl border p-6 sm:p-8 shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/40 shadow-2xl scale-[1.02]'
                      : 'border-border/70 hover:border-primary/50'
                  }`}
                >
                  <div>
                    {/* Badge & Generation Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/40">
                      <span className="text-xs uppercase tracking-widest font-semibold text-primary">
                        {gen.generationLabel[lang] || gen.generationLabel.en}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-mono font-bold">
                        Gen #{gen.gen}
                      </span>
                    </div>

                    {/* Portrait */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 mb-4 border border-border/50">
                      <img
                        src={getAssetUrl(gen.image)}
                        alt={gen.name[lang] || gen.name.en}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] text-white font-mono">
                        {gen.years}
                      </div>
                    </div>

                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-1">
                      {gen.name[lang] || gen.name.en}
                    </h4>
                    <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">
                      {gen.title[lang] || gen.title.en}
                    </p>

                    <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed mb-4">
                      {gen.bio[lang] || gen.bio.en}
                    </p>
                  </div>

                  {/* Contributions List */}
                  <div className="pt-4 border-t border-border/40">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-foreground mb-2">
                      {isBn ? 'মূল অবদানসমূহ:' : 'Key Contributions:'}
                    </p>
                    <ul className="space-y-1.5">
                      {(gen.contributions[lang] || gen.contributions.en).map((c, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom Exploration CTAs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 border-t border-border/40 mt-16 flex flex-wrap justify-center gap-4 relative z-10">
        <button
          onClick={() => setActiveTab('founder')}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-primary/90 transition-all duration-300 rounded-full shadow-lg"
        >
          <span>{isBn ? 'প্রতিষ্ঠাতা বাবু খেলাৎ ঘোষ সম্পর্কে জানুন' : 'Read Founder Babu Khelat Ghosh Biography'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => setActiveTab('trustees')}
          className="inline-flex items-center gap-2 bg-card text-foreground border border-border/80 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-background transition-all duration-300 rounded-full shadow-md"
        >
          <span>{isBn ? 'ট্রাস্ট ও ট্রাস্টি মণ্ডলী' : 'Explore Current Trustees'}</span>
        </button>
      </div>
    </main>
  );
}
