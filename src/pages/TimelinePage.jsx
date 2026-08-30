import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';

export default function TimelinePage({ lang, setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];

  const milestones = [
    {
      year: "1845",
      badge: lang === 'bn' ? "প্রতিষ্ঠা" : "Establishment",
      title: lang === 'bn' ? "খেলাৎ ভবনের প্রতিষ্ঠা" : "Founding of Khelat Bhawan",
      desc: lang === 'bn' ? "খেলাৎ ঘোষ বাংলা ঐতিহ্য সংরক্ষণের সাংস্কৃতিক কেন্দ্র হিসেবে খেলাৎ ভবন প্রতিষ্ঠা করেন।" : "Khelat Ghosh establishes Khelat Bhawan as a cultural center for Bengali heritage preservation.",
      image: "/images/SDP_0344.jpg"
    },
    {
      year: "1855",
      badge: lang === 'bn' ? "সাংস্কৃতিক" : "Cultural",
      title: lang === 'bn' ? "প্রথম দুর্গাপূজা" : "First Durga Puja Celebration",
      desc: lang === 'bn' ? "খেলাৎ ভবনে প্রথম আনুষ্ঠানিক দুর্গাপূজার সূচনা হয়—যে ঐতিহ্য আজও অব্যাহত।" : "The first formal Durga Puja celebration at Khelat Bhawan establishes a tradition that continues to this day.",
      image: "/images/unnamed_6.webp"
    },
    {
      year: "1881",
      badge: lang === 'bn' ? "আধ্যাত্মিক" : "Spiritual",
      title: lang === 'bn' ? "শ্রীরামকৃষ্ণ পরমহংসদেবের আগমন" : "Visit of Sri Ramakrishna Paramhansa",
      desc: lang === 'bn' ? "শ্রীরামকৃষ্ণ পরমহংসদেব খেলাৎ ভবনে এসে প্রাঙ্গণকে আশীর্বাদ করেন এবং এর আধ্যাত্মিক তাৎপর্য প্রতিষ্ঠা করেন।" : "Sri Ramakrishna Paramhansa visits Khelat Bhawan, blessing the premises and establishing its spiritual significance.",
      image: "/images/rk01.png"
    },
    {
      year: "1920",
      badge: lang === 'bn' ? "প্রশাসনিক" : "Administrative",
      title: lang === 'bn' ? "প্রথম ট্রাস্ট প্রতিষ্ঠা" : "Establishment of First Trust",
      desc: lang === 'bn' ? "ভবিষ্যৎ প্রজন্মের জন্য খেলাৎ ভবনের ঐতিহ্য রক্ষা ও সংরক্ষণে প্রথম আনুষ্ঠানিক ট্রাস্ট প্রতিষ্ঠিত হয়।" : "The first formal trust is established to protect and preserve the Khelat Bhawan heritage for future generations.",
      image: "/images/SDP_0299.jpg"
    },
    {
      year: "1947",
      badge: lang === 'bn' ? "ঐতিহাসিক" : "Historical",
      title: lang === 'bn' ? "স্বাধীনতা-পরবর্তী অভিযোজন" : "Independence Era Adaptations",
      desc: lang === 'bn' ? "সাংস্কৃতিক তাৎপর্য ও ঐতিহ্য বজায় রেখে খেলাৎ ভবন স্বাধীনতা-পরবর্তী সময়ের সঙ্গে মানিয়ে নেয়।" : "Khelat Bhawan adapts to the post-independence era while maintaining its cultural significance and heritage value.",
      image: "/images/SDP_0273.jpg"
    },
    {
      year: "1975",
      badge: lang === 'bn' ? "সংরক্ষণ" : "Preservation",
      title: lang === 'bn' ? "স্থাপত্য পুনরুদ্ধার ও সংস্কার" : "Major Architectural Conservation",
      desc: lang === 'bn' ? "একটি বিস্তৃত পুনরুদ্ধার প্রকল্প ভবিষ্যৎ প্রজন্মের জন্য খেলাৎ ভবনের স্থাপত্য অখণ্ডতা সংরক্ষণ করে।" : "A comprehensive restoration project preserves the architectural integrity of Khelat Bhawan for future generations.",
      image: "/images/SDP_0291.jpg"
    },
    {
      year: "1985",
      badge: lang === 'bn' ? "সাংস্কৃতিক" : "Cultural",
      title: lang === 'bn' ? "আর্টিস্ট নেকটার কাউন্সিল গঠন" : "Formation of Artist Nectar Council",
      desc: lang === 'bn' ? "বাংলা মঞ্চশিল্পের প্রসার এবং শিল্পীদের একটি মঞ্চ প্রদানের জন্য আর্টিস্ট নেকটার কাউন্সিল অফ কালচার গঠিত হয়।" : "The Artist Nectar Council of Culture is formed to promote Bengali performing arts and provide a platform for artists.",
      image: "/images/unnamed_12.webp"
    },
    {
      year: "2005",
      badge: lang === 'bn' ? "প্রযুক্তি" : "Technological",
      title: lang === 'bn' ? "ডিজিটাল আর্কাইভ উদ্যোগ" : "Digital Archives Initiative",
      desc: lang === 'bn' ? "ঐতিহাসিক নিদর্শন ও নথি সংরক্ষণের জন্য একটি বিস্তৃত ডিজিটাল আর্কাইভ উদ্যোগ শুরু হয়।" : "A digital archiving initiative is launched to document and preserve historical artifacts and records.",
      image: "/images/SDP_0305.jpg"
    },
    {
      year: "2015",
      badge: lang === 'bn' ? "পর্যটন" : "Tourism",
      title: lang === 'bn' ? "হেরিটেজ ট্যুরিজম কর্মসূচি" : "Heritage Tourism Program",
      desc: lang === 'bn' ? "খেলাৎ ভবন হেরিটেজ পর্যটনের জন্য উন্মুক্ত হয়, যাতে দর্শনার্থীরা এর সাংস্কৃতিক ঐতিহ্য অনুভব করতে পারেন।" : "Khelat Bhawan opens for heritage tourism, allowing visitors to experience its cultural heritage firsthand.",
      image: "/images/SDP_0359.jpg"
    },
    {
      year: "2020",
      badge: lang === 'bn' ? "ডিজিটাল" : "Digital",
      title: lang === 'bn' ? "ভার্চুয়াল অভিজ্ঞতার সূচনা" : "Virtual Experience Launch",
      desc: lang === 'bn' ? "ভার্চুয়াল ট্যুর ও ডিজিটাল অভিজ্ঞতার সূচনায় এই ঐতিহ্য বিশ্বব্যাপী আরও সহজলভ্য হয়।" : "Virtual tours and digital experiences are launched, making the heritage accessible globally.",
      image: "/images/SDP_0344.jpg"
    },
    {
      year: "2023",
      badge: lang === 'bn' ? "কৌশলগত" : "Strategic",
      title: lang === 'bn' ? "ভবিষ্যৎ দৃষ্টিভঙ্গি উদ্যোগ" : "Future Vision Initiative",
      desc: lang === 'bn' ? "বাংলার ঐতিহ্যের জন্য টেকসই সংরক্ষণ মডেল ও বিশ্বব্যাপী সচেতনতা কর্মসূচি বাস্তবায়িত হয়।" : "Sustainable preservation models and global awareness campaigns for Bengali heritage are implemented.",
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
