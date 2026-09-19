import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';
import { familyTreeData } from '../data/familyTreeData';
import { Clock, Users, Calendar, ArrowRight, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function TimelinePage({ lang = 'en', setActiveTab, onOpenLightbox, content }) {
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' | 'family-tree'
  const [expandedGen, setExpandedGen] = useState(1);

  const isBn = lang === 'bn';

  const milestones = [
    {
      year: "1845",
      badge: isBn ? "প্রতিষ্ঠা" : "Estate Foundation",
      title: isBn ? "খেলাৎ ভবনের প্রতিষ্ঠা ও রাজপ্রাসাদ নির্মাণ" : "Founding of Khelat Bhawan Palace",
      desc: isBn 
        ? "বাবু খেলাৎ চন্দ্র ঘোষ উত্তর কলকাতার পাথুরিয়াঘাটায় গ্র্যান্ড করিন্থিয়ান স্তম্ভ, মার্বেল চত্বর এবং বেলজিয়ান ঝাড়বাতি শোভিত এই ঐতিহাসিক প্রাসাদ নির্মাণ করেন।"
        : "Babu Khelat Chandra Ghosh commissions the monumental palatial mansion at 47 Pathuria Ghata Street, synthesizing Doric and Corinthian classical architecture with traditional Bengali courtyards.",
      image: "/images/SDP_0344.jpg"
    },
    {
      year: "1855",
      badge: isBn ? "সাংস্কৃতিক ভক্তি" : "Durga Puja Inauguration",
      title: isBn ? "প্রথম দুর্গাপূজা ও নিত্য দেবসেবার সূচনা" : "Inauguration of Historic Durga Puja",
      desc: isBn 
        ? "খেলাৎ ভবনে প্রথম আনুষ্ঠানিক একচালা ডাকের সাজের দেবী দুর্গাপূজার সূচনা হয়—যে পবিত্র ঐতিহ্য ১৭১ বছর ধরে আজ পর্যন্ত অব্যাহত।"
        : "The first formal Durga Puja celebration is consecrated at Thakur Dalan. An unbroken 171-year sacred ritual begins with traditional Ekchala Daker Saaj idol and 108 lotus sandhi puja.",
      image: "/images/unnamed_6.webp"
    },
    {
      year: "1881",
      badge: isBn ? "আধ্যাত্মিক আশীর্বাদ" : "Spiritual Visitation",
      title: isBn ? "শ্রীরামকৃষ্ণ পরমহংসদেবের ঐতিহাসিক আগমন" : "Historic Visit of Sri Ramakrishna Paramhansa",
      desc: isBn 
        ? "শ্রীরামকৃষ্ণ পরমহংসদেব খেলাৎ ভবনে শুভাগমন করেন, সঙ্গীত ও ভক্তিমূলক আলোচনায় অংশ নেন এবং প্রাঙ্গণকে চিরতরে পবিত্র করেন।"
        : "Sri Ramakrishna Paramhansa sanctifies Khelat Bhawan with his presence in 1881, as chronicled in the Ramakrishna Kathamrita, blessing the household's devotion and cultural patronage.",
      image: "/images/rk01.png"
    },
    {
      year: "1920",
      badge: isBn ? "ট্রাস্ট প্রশাসন" : "Legal Trust Formalization",
      title: isBn ? "প্রথম আনুষ্ঠানিক হেরিটেজ ট্রাস্ট প্রতিষ্ঠা" : "Formalization of First Heritage Trusts",
      desc: isBn 
        ? "পারিবারিক দেবসেবা, শিক্ষাবৃত্তি এবং দানশীল সমাজকল্যাণ স্থায়ী করতে প্রথম বিধিবদ্ধ ট্রাস্ট দলিল সম্পাদিত হয়।"
        : "The family establishes formal legal trusts to permanently safeguard the estate properties, ritual endowments, and ongoing philanthropic commitments.",
      image: "/images/SDP_0299.jpg"
    },
    {
      year: "1947",
      badge: isBn ? "স্বাধীনতা যুগ" : "Independence Era",
      title: isBn ? "স্বাধীনতা-পরবর্তী সাংস্কৃতিক রূপান্তর" : "Post-Independence Cultural Renaissance",
      desc: isBn 
        ? "স্বাধীন ভারতের রূপান্তরের সাথে সামঞ্জস্য রেখে পরিবারের উত্তরসূরিগণ উত্তর কলকাতার ভারতীয় ধ্রুপদী সঙ্গীত ও সমাজসেবাকে এগিয়ে নিয়ে যান।"
        : "Khelat Bhawan navigates the transition of post-independence Bengal while expanding support for classical Indian vocalists, sitarists, and vernacular literature.",
      image: "/images/SDP_0273.jpg"
    },
    {
      year: "1975",
      badge: isBn ? "স্থাপত্য পুনরুদ্ধার" : "Architectural Conservation",
      title: isBn ? "ঐতিহাসিক অট্টালিকার প্রধান সংরক্ষণ ও সংস্কার" : "Major Estate Conservation & Restoration",
      desc: isBn 
        ? "প্রাসাদের করিন্থিয়ান থাম, কাঠের অলঙ্কৃত বারান্দা এবং মার্বেল প্রাঙ্গণকে সযত্নে সংস্কার করে স্থাপত্য অক্ষুণ্ণ রাখা হয়।"
        : "Comprehensive structural conservation safeguards the antique teak woodwork, cast-iron railings, marble courtyard, and sanctified alcoves for upcoming generations.",
      image: "/images/SDP_0291.jpg"
    },
    {
      year: "1985",
      badge: isBn ? "সাংস্কৃতিক প্রসার" : "Performing Arts Council",
      title: isBn ? "আর্টিস্ট নেকটার কাউন্সিল অফ কালচার প্রতিষ্ঠা" : "Foundation of Artist Nectar Council",
      desc: isBn 
        ? "বাংলা নাটক, মার্গ সঙ্গীত ও যুব শিল্পীদের উৎসাহ দিতে আর্টিস্ট নেকটার কাউন্সিল প্রতিষ্ঠিত হয়।"
        : "Formation of Artist Nectar Council of Culture to mentor emerging classical musicians, host cultural workshops, and organize heritage theatrical productions.",
      image: "/images/unnamed_12.webp"
    },
    {
      year: "2005",
      badge: isBn ? "ডিজিটাল সংরক্ষণ" : "Archival Digitization",
      title: isBn ? "পারিবারিক পান্ডুলিপি ও ডিজিটাল আর্কাইভ উদ্যোগ" : "Manuscript & Photography Digital Archives",
      desc: isBn 
        ? "ঊনবিংশ শতাব্দীর দুষ্প্রাপ্য দলিল, ছবি ও সঙ্গীত পাণ্ডুলিপি সংরক্ষণের জন্য ডিজিটাল আর্কাইভ চালু হয়।"
        : "Launch of specialized digital preservation initiative documenting 19th-century royal family portraits, ancestral records, and vintage Calcutta photography.",
      image: "/images/SDP_0305.jpg"
    },
    {
      year: "2015",
      badge: isBn ? "পর্যটন ও চলচ্চিত্রায়ন" : "Heritage Tourism & Cinema",
      title: isBn ? "হেরিটেজ ট্যুর ও কালচারাল ফিল্ম শুটিং এর সূচনা" : "Curated Heritage Tours & Period Productions",
      desc: isBn 
        ? "আন্তর্জাতিক ও জাতীয় চলচ্চিত্রের শুটিং এবং ঐতিহ্যপ্রেমীদের জন্য নিয়ন্ত্রিত হেরিটেজ ট্যুরের দ্বার উন্মুক্ত হয়।"
        : "Opening of Khelat Bhawan for curated heritage walks, architectural studies, prestigious period cinema filming, and aristocratic celebrations.",
      image: "/images/SDP_0359.jpg"
    },
    {
      year: "2026",
      badge: isBn ? "ভবিষ্যৎ দৃষ্টিভঙ্গি" : "Present & Future",
      title: isBn ? "১৭১তম বার্ষিক মহোৎসব ও গ্লোবাল হেরিটেজ পোর্টাল" : "171st Festive Gala & Global Heritage Stewardship",
      desc: isBn 
        ? "ডিজিটাল বুকিং, আন্তর্জাতিক সাংস্কৃতিক সম্মেলন এবং বাংলার সমৃদ্ধ আভিজাত্য সংরক্ষণের টেকসই আধুনিক মডেল।"
        : "Unveiling modern digital reservations, high-definition visual chronicles, interactive family archives, and sustainable global heritage outreach.",
      image: "/images/SDP_0368.jpg"
    }
  ];

  return (
    <main className="pt-28 md:pt-36 pb-24 bg-background min-h-screen text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={isBn ? 'ঐতিহ্যের ইতিহাস ও পারিবারিক বংশতালিকা' : 'Chronological Timeline & Family Tree'}
          subtitle={isBn 
            ? '১৮৪৫ সাল থেকে আজ পর্যন্ত খেলাৎ ভবনের গৌরবময় পথচলা এবং সাত প্রজন্মের ঐতিহ্যবাহী অভিভাবকত্ব' 
            : 'Tracing 175+ years of architectural splendor, spiritual sanctity, and 7 unbroken generations of custodianship'}
        />

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-3 my-8">
          <button
            onClick={() => setActiveView('timeline')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-sans tracking-wider uppercase transition-all duration-300 shadow-md ${
              activeView === 'timeline'
                ? 'bg-primary text-primary-foreground font-semibold ring-2 ring-primary/40'
                : 'bg-card text-muted-foreground border border-border/80 hover:text-foreground'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isBn ? 'ঐতিহাসিক সময়রেখা (১৮৪৫ – ২০২৬)' : 'Chronological Milestones (1845–2026)'}</span>
          </button>

          <button
            onClick={() => setActiveView('family-tree')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-sans tracking-wider uppercase transition-all duration-300 shadow-md ${
              activeView === 'family-tree'
                ? 'bg-primary text-primary-foreground font-semibold ring-2 ring-primary/40'
                : 'bg-card text-muted-foreground border border-border/80 hover:text-foreground'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isBn ? '৭ প্রজন্মের পারিবারিক বংশতালিকা' : '7-Generation Family Tree'}</span>
          </button>
        </div>

        {/* VIEW 1: STACKED CHRONOLOGICAL TIMELINE (Items 8, 16) */}
        {activeView === 'timeline' && (
          <div className="space-y-12 my-12 animate-in fade-in duration-300">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className="bg-card/70 border border-border/70 rounded-3xl p-6 sm:p-10 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-500 backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Prominent Year Badge & Metadata */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs uppercase font-sans font-semibold tracking-widest border border-primary/20">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.badge}</span>
                    </div>

                    {/* Prominent High-Contrast Year Badge (Item 16) */}
                    <div className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-primary tracking-tight">
                      {item.year}
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Middle Column: Narrative Description */}
                  <div className="lg:col-span-4 space-y-4">
                    <p className="text-muted-foreground text-xs sm:text-base font-sans leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="pt-2">
                      <span className="text-[11px] uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        {isBn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি আর্কাইভ' : 'Pathuria Ghata Ghosh Bari Archives'}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Archival Photography Card */}
                  <div className="lg:col-span-4">
                    <div
                      onClick={() => onOpenLightbox({
                        type: 'image',
                        title: `${item.year} — ${item.title}`,
                        desc: item.desc,
                        src: item.image
                      })}
                      className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-primary/30 shadow-lg cursor-pointer"
                    >
                      <img
                        src={getAssetUrl(item.image)}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-primary uppercase tracking-wider font-semibold border border-primary/20">
                        {isBn ? 'ছবি দেখুন' : 'View Archive ↗'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: 7-GENERATION INTERACTIVE FAMILY TREE (Item 8) */}
        {activeView === 'family-tree' && (
          <div className="my-12 space-y-8 animate-in fade-in duration-300">
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
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center pt-12 border-t border-border/40 mt-12 flex flex-wrap justify-center gap-4">
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
      </div>
    </main>
  );
}
