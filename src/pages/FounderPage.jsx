import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';

export default function FounderPage({ lang, setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeader
          title={t.founder.name}
          subtitle={lang === 'bn' 
            ? '১৮৪৫ সালে খেলাৎ ভবনের দূরদর্শী প্রতিষ্ঠাতা ও বিশিষ্ট সমাজহিতৈষী' 
            : `${t.founder.years} · Founder & Aristocratic Visionary`}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start my-16">
          <div className="md:col-span-5 text-center">
            <div className="p-3 bg-card rounded-sm border border-border inline-block shadow-md">
              <img
                src={getAssetUrl(t.founder.image)}
                alt={t.founder.name}
                className="w-full h-[400px] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                onClick={() => onOpenLightbox({
                  type: 'image',
                  title: t.founder.name,
                  desc: 'Archival portrait of Babu Khelat Ghosh, founder of Khelat Bhavan.',
                  src: t.founder.image
                })}
              />
            </div>
            <div className="mt-4">
              <h4 className="font-serif text-xl font-bold text-foreground">{t.founder.name}</h4>
              <p className="text-xs uppercase tracking-widest text-accent font-body mt-0.5">1775 – 1845</p>
              <p className="text-xs text-muted-foreground font-body mt-1">Founder · Pathuria Ghata Ghosh Bari</p>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-body font-semibold">
              Historical Archival Profile
            </span>

            <h3 className="font-serif text-3xl font-bold text-foreground leading-tight">
              {lang === 'bn' ? 'এক অমর সাংস্কৃতিক ঐতিহ্যের পথিকৃৎ' : 'The Beginning of a 175-Year Heritage'}
            </h3>

            <p className="text-foreground/80 font-body text-base leading-relaxed font-light">
              {t.founder.bio1}
            </p>

            <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
              {t.founder.bio2}
            </p>

            <div className="p-6 rounded-sm bg-card border-l-2 border-accent">
              <h4 className="font-serif font-bold text-foreground text-base mb-1">
                {lang === 'bn' ? 'উচ্চাঙ্গ সঙ্গীত ও সংস্কৃতির পৃষ্ঠপোষকতা' : 'Patron of Hindustani Classical Music'}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
                {lang === 'bn'
                  ? 'বাবু খেলাৎ ঘোষের উচ্চাঙ্গ সঙ্গীতের প্রতি গভীর অনুরাগ খেলাৎ ভবনকে ভারতীয় মার্গ সঙ্গীতের এক পীঠস্থানে পরিণত করে, যা আজও ট্রাস্টের মাধ্যমে অক্ষুণ্ণ রয়েছে।'
                  : 'Known for his deep appreciation of Hindustani classical music, Babu Khelat Ghosh welcomed leading maestros, laying the groundwork for the enduring Khelat Ghosh Memorial Trust.'}
              </p>
            </div>

            <blockquote className="p-6 rounded-sm bg-card/60 border border-border italic font-serif text-foreground text-base">
              "{t.founder.quote}"
            </blockquote>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('trustees')}
                className="bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-foreground transition-colors rounded-sm"
              >
                {lang === 'bn' ? 'সাংস্কৃতিক ট্রাস্টসমূহ দেখুন' : 'Explore Cultural Trusts'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
