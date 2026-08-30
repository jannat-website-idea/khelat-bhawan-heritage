import React from 'react';
import { Compass, Award, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';

export default function AboutPage({ lang, setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={lang === 'bn' ? 'ঐতিহ্য ও উত্তরাধিকার' : 'Heritage & Legacy'}
          subtitle={lang === 'bn' 
            ? '১৮৪৫ সাল থেকে উত্তর কলকাতায় বাঙালি সংস্কৃতি, শাস্ত্রীয় সঙ্গীত ও আধ্যাত্মিক ভক্তি সংরক্ষণের যাত্রা' 
            : 'A 175-year journey of preserving Bengali heritage, culture, and spiritual traditions'}
        />

        {/* Origin Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto my-16">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-body font-semibold">
              Established 1845
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-snug">
              {lang === 'bn' ? 'পাথুরিয়াঘাটা ঘোষ বাড়ির ইতিহাস' : 'The Legacy of Pathuria Ghata Ghosh Bari'}
            </h3>
            <p className="text-foreground/80 font-body text-base leading-relaxed font-light">
              {t.intro.p1}
            </p>
            <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
              {t.intro.p2}
            </p>

            <div className="p-5 rounded-sm bg-card border-l-2 border-accent">
              <h4 className="font-serif font-bold text-foreground text-base mb-1">
                {lang === 'bn' ? 'শ্রী শ্রী রামকৃষ্ণ পরমহংসদেবের পুণ্য পদার্পণ (১৮৮১)' : 'Sanctified by Sri Ramakrishna Paramhansa (1881)'}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
                {lang === 'bn'
                  ? '১৮৮১ সালে যুগাবতার শ্রীশ্রীরামকৃষ্ণ পরমহংসদেবের পুণ্য শুভাগমনে এই ভবন ধন্য ও পবিত্র হয়, যা এর আধ্যাত্মিক মর্যাদাকে চিরন্তন রূপ দেয়।'
                  : 'In 1881, the great mystic and saint Sri Ramakrishna Paramhansa visited and blessed Khelat Bhavan, elevating its status as a sacred cultural haven.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-sm overflow-hidden shadow-xl aspect-[4/3] bg-black">
              <img
                src={getAssetUrl('/images/SDP_0282.jpg')}
                alt="Colonnaded Arches of Khelat Bhavan"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => onOpenLightbox({
                  type: 'image',
                  title: 'Colonnaded Arches of Khelat Bhavan',
                  desc: 'The historic 19th-century architecture of Pathuria Ghata Ghosh Bari.',
                  src: '/images/SDP_0282.jpg'
                })}
              />
            </div>
          </div>
        </div>

        {/* Seven Generations Lineage */}
        <div className="my-24 max-w-6xl mx-auto">
          <SectionHeader
            title={t.lineage.heading}
            subtitle={t.lineage.desc}
          />

          <div className="royal-family-tree mt-12" aria-label={lang === 'bn' ? 'সাত প্রজন্মের পারিবারিক বৃক্ষ' : 'Seven-generation family tree'}>
            <div className="royal-family-tree__crown" aria-hidden="true">✦</div>
            {t.lineage.generations.map((gen, idx) => (
              <div
                key={idx}
                className={`royal-family-tree__generation royal-family-tree__generation--${idx + 1}`}
              >
                <div className="royal-family-tree__medallion"><span>{idx + 1}</span></div>
                <div className="royal-family-tree__card">
                  <span>{gen.gen} · {gen.period}</span>
                  <h4>{gen.name}</h4>
                  <p className="royal-family-tree__role">{gen.role}</p>
                  <p>{gen.desc}</p>
                </div>
              </div>
            ))}
            <div className="royal-family-tree__roots" aria-hidden="true"><span /><span /><span /></div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto my-16">
          <div className="gradient-heritage text-primary-foreground p-8 rounded-sm shadow-md">
            <Compass className="w-8 h-8 text-rose-gold mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-3 text-primary-foreground">
              {lang === 'bn' ? 'আমাদের লক্ষ্য' : 'Our Mission'}
            </h3>
            <p className="text-sm font-body text-primary-foreground/80 leading-relaxed font-light">
              {lang === 'bn'
                ? 'ধর্মীয় ভক্তি, শাস্ত্রীয় শিল্পকলা ও সমাজসেবার মাধ্যমে বাংলা সাংস্কৃতিক ঐতিহ্য ও তার ১৭৫ বছরের সাবেকি পরম্পরা সংরক্ষণ করা।'
                : 'To preserve, promote, and perpetuate Bengali cultural heritage through religious devotion, classical arts, and community service while maintaining the sanctity and traditions of our 175-year legacy.'}
            </p>
          </div>

          <div className="bg-card p-8 rounded-sm border border-border shadow-sm">
            <Award className="w-8 h-8 text-accent mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
              {lang === 'bn' ? 'আমাদের দৃষ্টিভঙ্গি' : 'Our Vision'}
            </h3>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              {lang === 'bn'
                ? 'ঐতিহ্য ও আধুনিকতার সেতুবন্ধন রচনা করে নতুন প্রজন্মকে স্বীয় ঐতিহ্যে অনুপ্রাণিত করা এবং সমাজে ঐক্য, ভক্তি ও শৈল্পিক শ্রেষ্ঠত্ব বজায় রাখা।'
                : 'To be a beacon of Bengali culture that bridges tradition with modernity, inspiring future generations to embrace their heritage while fostering unity, devotion, and artistic excellence in our community.'}
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <button
            onClick={() => setActiveTab('timeline')}
            className="border border-foreground/20 text-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-foreground hover:text-background transition-colors rounded-sm"
          >
            {t.hero.timelineBtn}
          </button>
        </div>
      </div>
    </main>
  );
}
