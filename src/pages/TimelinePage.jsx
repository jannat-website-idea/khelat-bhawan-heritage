import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';

export default function TimelinePage({ lang, setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];

  const milestones = [
    {
      year: "1845",
      badge: "Foundation",
      title: lang === 'bn' ? "খেলাৎ ভবনের প্রতিষ্ঠা" : "Establishment of Khelat Bhavan",
      desc: lang === 'bn' 
        ? "বাবু খেলাৎ ঘোষ ৪৭ পাথুরিয়াঘাটা স্ট্রিটে এই সুবিশাল ঐতিহ্যবাহী প্রাসাদ প্রতিষ্ঠা করেন।"
        : "Babu Khelat Ghosh laid the foundation of this majestic heritage mansion at 47 Pathuria Ghata Street, designing a grand estate blending classical neoclassical columns with traditional Bengali courtyard architecture.",
      image: "/images/SDP_0344.jpg"
    },
    {
      year: "1855",
      badge: "Durga Puja",
      title: lang === 'bn' ? "দুর্গাপূজা পরম্পরার সূচনা" : "Inauguration of the Sacred Durga Puja",
      desc: lang === 'bn'
        ? "বার্ষিক সাবেকি পারিবারিক দুর্গোৎসব ও জগদ্ধাত্রী পূজার সূচনা, যা আজ ১৭০+ বছর ধরে নিরবচ্ছিন্নভাবে চলছে।"
        : "The Ghosh family initiated the annual Durga Puja and Jagadhatri Puja with traditional rituals, establishing a sacred tradition that continues uninterrupted for over 170 continuous years.",
      image: "/images/unnamed_6.webp"
    },
    {
      year: "1881",
      badge: "Divine Blessing",
      title: lang === 'bn' ? "শ্রীরামকৃষ্ণ পরমহংসদেবের শুভাগমন" : "Sri Ramakrishna Paramhansa's Historic Visit",
      desc: lang === 'bn'
        ? "যুগাবতার শ্রীশ্রীরামকৃষ্ণ পরমহংসদেব খেলাৎ ভবনে শুভাগমন করে সমগ্র প্রাঙ্গণকে পবিত্র ও মহিমান্বিত করেন।"
        : "The revered mystic and saint Sri Ramakrishna Paramhansa visited and blessed Khelat Bhavan with his divine presence, forever consecrating the house as a sacred spiritual landmark.",
      image: "/images/rk01.png"
    },
    {
      year: "1920",
      badge: "First Formal Trust",
      title: lang === 'bn' ? "প্রথম প্রাতিষ্ঠানিক ট্রাস্ট গঠন" : "First Formal Heritage Trust",
      desc: lang === 'bn'
        ? "পারিবারিক ঐতিহ্য ও দেবোত্তর সম্পত্তি সুরক্ষার জন্য প্রথম আনুষ্ঠানিক ট্রাস্ট দলিল সম্পাদন।"
        : "The Ghosh family formalized the first trust governance framework to protect Khelat Bhavan's heritage and devotional sanctity.",
      image: "/images/SDP_0299.jpg"
    },
    {
      year: "1950s",
      badge: "Classical Music",
      title: lang === 'bn' ? "খেলাৎ ঘোষ মেমোরিয়াল ট্রাস্ট" : "Khelat Ghosh Memorial Trust",
      desc: lang === 'bn'
        ? "উচ্চাঙ্গ সঙ্গীত আসর, গুণী শিল্পীদের সহায়তা ও সঙ্গীত সংরক্ষণে প্রাতিষ্ঠানিক ট্রাস্ট প্রতিষ্ঠা।"
        : "Formal trust established to institutionalize support for classical Hindustani musicians, organize heritage baithaks, and preserve rare archival recordings.",
      image: "/images/SDP_0273.jpg"
    },
    {
      year: "1975",
      badge: "Restoration",
      title: lang === 'bn' ? "স্থাপত্য পুনরুদ্ধার ও সংস্কার" : "Major Architectural Conservation",
      desc: lang === 'bn'
        ? "ঐতিহাসিক ঠাকুর দালান ও মার্বেল হলঘরের ঐতিহ্যবাহী সংরক্ষণ কাজ সম্পন্ন।"
        : "Comprehensive restoration project preserving the 19th-century woodwork, Corinthian columns, and courtyard masonry.",
      image: "/images/SDP_0291.jpg"
    },
    {
      year: "2000+",
      badge: "Arts & Welfare",
      title: lang === 'bn' ? "আর্টিস্ট নেকটার কাউন্সিল অফ কালচার" : "Artist Nectar Council of Culture",
      desc: lang === 'bn'
        ? "মঞ্চশিল্প, সমাজসেবা, শিশুদের শিক্ষা ও স্বাস্থ্য সচেতনতা বিষয়ক বহুমুখী উদ্যোগের বিস্তার।"
        : "Establishment of the Artist Nectar Council of Culture focusing on performing arts, social service, children's education, and healthcare awareness.",
      image: "/images/unnamed_12.webp"
    },
    {
      year: "Present",
      badge: "Living Heritage",
      title: lang === 'bn' ? "জীবন্ত ঐতিহ্য ও সাংস্কৃতিক কেন্দ্র" : "Contemporary Living Heritage",
      desc: lang === 'bn'
        ? "সপ্তম প্রজন্মের অভিভাবকত্বে ঐতিহ্য রক্ষা, সাংস্কৃতিক অনুষ্ঠান ও শুটিংয়ের জন্য সংরক্ষিত এক অনন্য পীঠস্থান।"
        : "Seven generations of custodians actively preserving traditions, opening heritage spaces for wedding ceremonies, cinema shoots, and classical recitals.",
      image: "/images/unnamed_3.webp"
    }
  ];

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeader
          title={lang === 'bn' ? 'ঐতিহ্যের সময়রেখা' : 'Heritage Timeline'}
          subtitle={lang === 'bn' 
            ? '১৮৪৫ সাল থেকে আজ পর্যন্ত খেলাৎ ভবনের ঐতিহাসিক পথচলা' 
            : 'Tracing over 175 years of grandeur, devotion, and cultural legacy'}
        />

        {/* Timeline Items */}
        <div className="space-y-12 my-16">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-card/60 p-6 md:p-8 rounded-sm border border-border hover:border-accent transition-all duration-300 shadow-sm"
            >
              <div className="md:col-span-3 text-left">
                <span className="text-[10px] uppercase tracking-widest text-accent font-body font-semibold block">
                  {item.badge}
                </span>
                <span className="font-serif text-3xl md:text-4xl font-bold text-foreground block mt-1">
                  {item.year}
                </span>
              </div>

              <div className="md:col-span-5 text-left space-y-2">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="h-44 rounded-sm overflow-hidden bg-black">
                  <img
                    src={getAssetUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => onOpenLightbox({
                      type: 'image',
                      title: `${item.year} — ${item.title}`,
                      desc: item.desc,
                      src: item.image
                    })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => setActiveTab('founder')}
            className="border border-foreground/20 text-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-foreground hover:text-background transition-colors rounded-sm"
          >
            {lang === 'bn' ? 'প্রতিষ্ঠাতা বাবু খেলাৎ ঘোষ সম্পর্কে জানুন' : 'Discover Founder Babu Khelat Ghosh'}
          </button>
        </div>
      </div>
    </main>
  );
}
