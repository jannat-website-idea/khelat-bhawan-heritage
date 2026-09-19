import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';
import { ArrowRight, Music, Landmark, Sparkles, BookOpen, HeartHandshake, Users, ShieldCheck } from 'lucide-react';

export default function FounderPage({ lang = 'en', setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];
  const bn = lang === 'bn';

  return (
    <main className="pt-28 md:pt-36 pb-24 bg-background min-h-screen text-foreground">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <SectionHeader
          title={t.founder.name}
          subtitle={bn 
            ? '১৮৪৫ সালে খেলাৎ ভবনের দূরদর্শী প্রতিষ্ঠাতা, বিশিষ্ট দানশীল ও বাঙালি সংস্কৃতির অমর অভিভাবক' 
            : `${t.founder.years} · Founder, Philanthropist & Cultural Patriarch of Pathuria Ghata Ghosh Bari`}
        />

        {/* Hero Archival Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative p-6 bg-card/95 rounded-3xl border border-primary/40 shadow-2xl backdrop-blur-md overflow-hidden group">
              <div className="rounded-2xl overflow-hidden bg-black/60 shadow-xl border border-primary/30 w-full aspect-[4/5]">
                <img
                  src={getAssetUrl(t.founder.image)}
                  alt={t.founder.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                  onClick={() => onOpenLightbox({
                    type: 'image',
                    title: t.founder.name,
                    desc: 'Official archival marble bust of Babu Khelat Ghosh, founder of Khelat Bhawan.',
                    src: t.founder.image
                  })}
                />
              </div>

              <div className="mt-5 pt-4 border-t border-border/40 text-center space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-sans font-bold block">
                  {bn ? 'ঐতিহাসিক মার্বেল ভাস্কর্য প্রতিকৃতি' : 'Historical Sculptural Archival Portrait'}
                </span>
                <h4 className="font-serif text-2xl font-bold text-foreground">{t.founder.name}</h4>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">1775 – 1845</p>
              </div>
            </div>
          </div>

          {/* Biography Intro Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs tracking-[0.2em] uppercase font-sans font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{bn ? 'ঐতিহাসিক প্রামাণ্য বিবরণ' : 'Historical Archival Profile'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {bn ? 'এক অমর সাংস্কৃতিক ঐতিহ্যের পথিকৃৎ' : 'The Patriarch of a 175-Year Living Legacy'}
            </h2>

            <p className="text-foreground/90 font-sans text-base leading-relaxed font-light">
              {t.founder.bio1}
            </p>

            <p className="text-muted-foreground font-sans text-sm leading-relaxed">
              {t.founder.bio2}
            </p>

            {/* Quote Box */}
            <blockquote className="relative p-6 rounded-2xl bg-card border border-primary/30 italic font-serif text-foreground text-base shadow-sm">
              <span className="text-4xl text-primary/40 absolute top-2 left-4 font-serif leading-none">“</span>
              <p className="relative z-10 pl-4">{t.founder.quote}</p>
            </blockquote>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('trustees')}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-primary/90 transition-all rounded-full shadow-lg"
              >
                <span>{bn ? 'সাংস্কৃতিক ট্রাস্টসমূহ দেখুন' : 'Explore Cultural Trusts'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('heritage')}
                className="inline-flex items-center gap-2 bg-card text-foreground border border-border/80 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-background transition-all rounded-full shadow-sm"
              >
                <span>{bn ? '৭ প্রজন্মের ঐতিহ্য' : 'Seven Generations Lineage'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 COMPREHENSIVE SECTIONS (Item 10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/50">
          
          {/* Pillar 1: Life & Vision */}
          <div className="bg-card/70 p-8 sm:p-10 rounded-3xl border border-border/80 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <Landmark className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-primary font-semibold block">
                {bn ? '১. জীবন ও দূরদৃষ্টি' : '1. Life & Vision'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {bn ? 'স্থাপত্য প্রতিষ্ঠা ও রাজবাড়ির দূরদৃষ্টি' : 'Architectural Founding & Grand Vision'}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed">
                {bn
                  ? '১৮৪৫ সালে বাবু খেলাৎ চন্দ্র ঘোষ উত্তর কলকাতার পাথুরিয়াঘাটায় ইউরোপীয় ও প্রাচ্য রীতির সমন্বয়ে এই অনন্য প্রাসাদ গড়ে তোলেন। শুধু একটি পারিবারিক বাসস্থান নয়, এটিকে বাংলার সাংস্কৃতিক ও আধ্যাত্মিক কেন্দ্র হিসেবে গড়ে তোলাই ছিল তাঁর দূরদর্শী লক্ষ্য।'
                  : 'In 1845, Babu Khelat Ghosh commissioned the grand mansion synthesizing Greco-Roman Corinthian columns with traditional Bengali courtyard layouts. Designed not merely as an aristocratic mansion, but as a perpetual sanctuary for devotion, arts, and community gatherings.'}
              </p>
            </div>
          </div>

          {/* Pillar 2: Family & Ancestral Lineage */}
          <div className="bg-card/70 p-8 sm:p-10 rounded-3xl border border-border/80 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-primary font-semibold block">
                {bn ? '২. বংশানুক্রমিক আভিজাত্য' : '2. Family & Ancestral Lineage'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {bn ? 'পাথুরিয়াঘাটা ঘোষ বংশের সাবেকি ঐতিহ্য' : 'Ancestral Heritage of the Ghosh Dynasty'}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed">
                {bn
                  ? 'উত্তর কলকাতার অন্যতম সম্ভ্রান্ত কায়স্থ পরিবার হিসেবে ঘোষ বংশ বাণিজ্য, বিদ্যাচর্চা ও সমাজকল্যাণে অসামান্য ভূমিকা পালন করেছে। পরবর্তী সাত প্রজন্ম ধরে তাঁর প্রতিষ্ঠিত আদর্শ ও পারিবারিক পূজা-পার্বণ অব্যাহত রয়েছে।'
                  : 'One of the foremost aristocratic families of North Calcutta, the Ghosh lineage played a pivotal role in trade, education, and social reform. Across seven generations, his descendants have preserved the ancestral rituals and public service without compromise.'}
              </p>
            </div>
          </div>

          {/* Pillar 3: Contributions to Bengali Society */}
          <div className="bg-card/70 p-8 sm:p-10 rounded-3xl border border-border/80 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-primary font-semibold block">
                {bn ? '৩. সমাজে ঐতিহাসিক অবদান' : '3. Contributions to Bengali Society'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {bn ? 'নবজাগরণ ও সমাজকল্যাণমূলক কর্মকাণ্ড' : 'Philanthropy & Bengal Renaissance Leadership'}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed">
                {bn
                  ? 'বাবু খেলাৎ ঘোষ শিক্ষার প্রসারে বিদ্যায়তন স্থাপন, দুর্ভিক্ষ ও মহামারীতে ত্রাণ বিতরণ এবং দরিদ্রদের চিকিৎসায় প্রভূত অর্থ দান করেছিলেন। ১৮৮১ সালে শ্রীরামকৃষ্ণদেবের শুভাগমন পরিবারের সামাজিক ও আধ্যাত্মিক উচ্চতাকে শীর্ষবিন্দুতে পৌঁছে দেয়।'
                  : 'Babu Khelat Ghosh endowed educational initiatives, distributed extensive relief during famines, and supported public healthcare clinics. The household was sanctified in 1881 by the visit of Sri Ramakrishna Paramhansa, permanently embedding spiritual philanthropy into the family charter.'}
              </p>
            </div>
          </div>

          {/* Pillar 4: Patronage of Classical Music & Literature */}
          <div className="bg-card/70 p-8 sm:p-10 rounded-3xl border border-border/80 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <Music className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-primary font-semibold block">
                {bn ? '৪. সঙ্গীত ও সাহিত্যের পৃষ্ঠপোষকতা' : '4. Music & Literature Preservation'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {bn ? 'ভারতীয় মার্গসঙ্গীত ও পাণ্ডুলিপির পীঠস্থান' : 'Hindustani Classical Sangeet & Archival Salon'}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed">
                {bn
                  ? 'তাঁর আমলে খেলাৎ ভবন ছিল ভারতের শীর্ষস্থানীয় ধ্রুপদ, খেয়াল, পাখোয়াজ ও সেতার শিল্পীদের অন্যতম প্রধান বৈঠকখানা। এই ঐতিহ্যই পরবর্তীকালে অল ইন্ডিয়া মিউজিক কনফারেন্স এবং বর্তমানের খেলাৎ ঘোষ মেমোরিয়াল ট্রাস্টের ভিত্তি স্থাপন করে।'
                  : 'Under his patronage, Khelat Bhawan became the premier salon for eminent ustads and pandits of Dhrupad, Khayal, and Sitar. This musical lineage paved the way for North Calcutta\'s famed music conferences and today\'s Khelat Ghosh Memorial Trust.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
