import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';
import AlpanaMotif from '../components/AlpanaMotif';
import { ArrowRight, Music, Landmark, Sparkles } from 'lucide-react';

export default function FounderPage({ lang, setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];
  const bn = lang === 'bn';

  return (
    <main className="pt-28 md:pt-36 pb-24 bg-background min-h-screen">
      <div className="w-full max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <SectionHeader
          title={t.founder.name}
          subtitle={bn 
            ? '১৮৪৫ সালে খেলাৎ ভবনের দূরদর্শী প্রতিষ্ঠাতা, বিশিষ্ট দানশীল ও বাঙালি সংস্কৃতির অমর অভিভাবক' 
            : `${t.founder.years} · Founder & Aristocratic Visionary of Pathuria Ghata Ghosh Bari`}
        />

        {/* Main Archival Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch my-12 md:my-16">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative p-4 sm:p-6 bg-card/95 rounded-2xl border-2 border-accent/40 shadow-2xl backdrop-blur-md overflow-hidden group flex flex-col justify-between h-full">
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-accent/70" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-accent/70" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-accent/70" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-accent/70" />
              
              {/* Bust Image */}
              <div className="rounded-xl overflow-hidden bg-black/60 shadow-xl border border-accent/30 w-full">
                <img
                  src={getAssetUrl(t.founder.image)}
                  alt={t.founder.name}
                  className="w-full h-[420px] sm:h-[500px] lg:h-[540px] object-cover object-top transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                  onClick={() => onOpenLightbox({
                    type: 'image',
                    title: t.founder.name,
                    desc: 'Official archival marble bust of Babu Khelat Ghosh, founder of Khelat Bhawan.',
                    src: t.founder.image
                  })}
                />
              </div>

              {/* Founder Details on Left */}
              <div className="mt-5 pt-4 border-t border-accent/30 text-center space-y-3">
                <div>
                  <span className="text-[10.5px] uppercase tracking-[0.25em] text-accent font-body font-bold block">
                    {bn ? 'ঐতিহাসিক মার্বেল ভাস্কর্য প্রতিকৃতি' : 'Historical Sculptural Archival Portrait'}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-1">{t.founder.name}</h4>
                  <p className="text-xs uppercase tracking-widest text-accent font-body mt-0.5 font-semibold">1775 – 1845</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left bg-background/60 p-3 rounded-lg border border-border/70 text-xs">
                  <div>
                    <span className="text-[9.5px] uppercase tracking-wider text-accent block font-semibold">
                      {bn ? 'উপাধি ও ভূমিকা' : 'Title & Role'}
                    </span>
                    <span className="text-foreground/90 font-medium">
                      {bn ? 'প্রতিষ্ঠাতা ও অভিজাত ব্যক্তিত্ব' : 'Founder & Aristocratic Visionary'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9.5px] uppercase tracking-wider text-accent block font-semibold">
                      {bn ? 'ঐতিহাসিক এস্টেট' : 'Historic Estate'}
                    </span>
                    <span className="text-foreground/90 font-medium">
                      {bn ? '৪৭ পাথুরিয়াঘাটা স্ট্রিট' : '47 Pathuria Ghata St, Kolkata'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground font-body italic">
                  {bn 
                    ? 'বাংলার নবজাগরণের অন্যতম শ্রেষ্ঠ মানবহিতৈষী ও উচ্চাঙ্গ সঙ্গীতের পৃষ্ঠপোষক।' 
                    : 'Visionary patriarch who established Khelat Bhawan in 1845 and shaped its enduring legacy.'}
                </p>
              </div>
            </div>
          </div>

          {/* Biography & Vision Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs tracking-[0.2em] uppercase font-body font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{bn ? 'ঐতিহাসিক প্রামাণ্য বিবরণ' : 'Historical Archival Profile'}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {bn ? 'এক অমর সাংস্কৃতিক ঐতিহ্যের পথিকৃৎ' : 'The Beginning of a 175-Year Heritage'}
            </h3>

            <p className="text-foreground/90 font-body text-base md:text-lg leading-relaxed font-light">
              {t.founder.bio1}
            </p>

            <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
              {t.founder.bio2}
            </p>

            {/* Classical Music Callout */}
            <div className="p-6 rounded-xl bg-card/80 border-l-4 border-accent shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <Music className="w-5 h-5 text-accent" />
                <h4 className="font-serif font-bold text-foreground text-lg">
                  {bn ? 'উচ্চাঙ্গ সঙ্গীত ও সংস্কৃতির পৃষ্ঠপোষকতা' : 'Patron of Hindustani Classical Music'}
                </h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
                {bn
                  ? 'বাবু খেলাৎ ঘোষের উচ্চাঙ্গ সঙ্গীতের প্রতি গভীর অনুরাগ খেলাৎ ভবনকে ভারতীয় মার্গ সঙ্গীতের এক পীঠস্থানে পরিণত করে, যা আজও ট্রাস্টের মাধ্যমে অক্ষুণ্ণ রয়েছে।'
                  : 'Known for his deep appreciation of Hindustani classical music, Babu Khelat Ghosh welcomed leading maestros, laying the groundwork for the enduring Khelat Ghosh Memorial Trust.'}
              </p>
            </div>

            {/* Quote Box */}
            <blockquote className="relative p-6 sm:p-8 rounded-xl bg-accent/10 border border-accent/30 italic font-serif text-foreground text-base md:text-lg shadow-sm">
              <span className="text-4xl text-accent/40 absolute top-2 left-4 font-serif leading-none">“</span>
              <p className="relative z-10 pl-4">{t.founder.quote}</p>
            </blockquote>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('trustees')}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-body font-semibold hover:bg-foreground transition-all duration-300 rounded-full shadow-lg hover:scale-105"
              >
                <span>{bn ? 'সাংস্কৃতিক ট্রাস্টসমূহ দেখুন' : 'Explore Cultural Trusts'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('heritage')}
                className="inline-flex items-center gap-2 bg-transparent text-foreground border border-accent/50 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-body font-semibold hover:bg-accent/15 transition-all duration-300 rounded-full shadow-sm"
              >
                <span>{bn ? '৭ প্রজন্মের ঐতিহ্য' : 'Seven Generations Lineage'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Archival Legacy Pillars */}
        <div className="mt-16 pt-12 border-t border-accent/25 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border/80 shadow-md">
            <Landmark className="w-7 h-7 text-accent mb-3" />
            <h4 className="font-serif font-bold text-lg text-foreground mb-1.5">
              {bn ? '১৮৪৫ স্থাপত্যের প্রতিষ্ঠা' : '1845 Architectural Founding'}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
              {bn
                ? '৪৭ পাথুরিয়াঘাটা স্ট্রিটে মার্বেল দালান ও ঐতিহ্যবাহী বাংলা প্রাসাদের নান্দনিক নকশায় খেলাৎ ভবনের প্রতিষ্ঠা।'
                : 'Founded at 47 Pathuria Ghata Street with classical colonnades, marble courtyards, and grand Bengal Renaissance architecture.'}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/80 shadow-md">
            <Music className="w-7 h-7 text-accent mb-3" />
            <h4 className="font-serif font-bold text-lg text-foreground mb-1.5">
              {bn ? 'মার্গ সঙ্গীতের বৈঠক' : 'Classical Sangeet Baithaks'}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
              {bn
                ? 'ভারতের প্রথিতযশা উচ্চাঙ্গ সঙ্গীত শিল্পীদের নিয়মিত সমাগম ও সঙ্গীতের অমর ঐতিহ্যের লালন।'
                : 'A revered salon hosting celebrated maestros of Hindustani classical music, preserving authentic traditions.'}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/80 shadow-md">
            <Sparkles className="w-7 h-7 text-accent mb-3" />
            <h4 className="font-serif font-bold text-lg text-foreground mb-1.5">
              {bn ? 'অবিচ্ছিন্ন ট্রাস্ট ধারা' : 'Unbroken Trust Continuity'}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
              {bn
                ? 'তিনটি সক্রিয় ট্রাস্টের মাধ্যমে ৭ প্রজন্ম ধরে ভক্তি, শিল্পকলা ও সমাজসেবার অক্ষুণ্ণ ধারা।'
                : 'Institutionalized across three dedicated trusts safeguarding spiritual worship, classical arts, and social service.'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
