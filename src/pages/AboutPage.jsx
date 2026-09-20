import React, { useState } from 'react';
import { Compass, Award, ArrowRight, Download, FileText, Sparkles, User, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';
import AlpanaDivider from '../components/AlpanaDivider';

export default function AboutPage({ lang = 'en', setActiveTab, onOpenBooking, onOpenLightbox, content }) {
  const [activeGen, setActiveGen] = useState(1);
  const t = content[lang];
  const isBn = lang === 'bn';

  return (
    <main className="pt-28 md:pt-36 pb-24 bg-background min-h-screen text-foreground">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* SECTION 1: LEGACY OF KHELAT BHAWAN */}
        <section id="legacy-origins" className="space-y-8">
          <SectionHeader
            title={isBn ? 'খেলাৎ ভবন ও রাজবাড়ির ঐতিহাসিক উত্তরাধিকার' : 'The Imperial Legacy of Khelat Bhawan'}
            subtitle={isBn 
              ? '১৮৪৫ সাল থেকে উত্তর কলকাতায় বাঙালি সংস্কৃতি, শাস্ত্রীয় সঙ্গীত ও আধ্যাত্মিক ভক্তি সংরক্ষণের দেড় শতাব্দীরও প্রাচীন গৌরব' 
              : 'A 175-year journey of preserving Bengali aristocratic heritage, sacred traditions, and classical arts'}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-sans font-semibold">
                {isBn ? 'স্থাপিত ১৮৪৫ · পাথুরিয়াঘাটা' : 'Established 1845 · Pathuria Ghata'}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-snug">
                {isBn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ির ইতিহাস' : 'Pathuria Ghata Ghosh Bari'}
              </h3>
              <p className="text-foreground/85 font-sans text-base leading-relaxed">
                {t.intro.p1}
              </p>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                {t.intro.p2}
              </p>

              <div className="p-6 rounded-2xl bg-card border-l-4 border-primary shadow-lg">
                <h4 className="font-serif font-bold text-foreground text-base md:text-lg mb-1.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>{isBn ? 'শ্রী শ্রী রামকৃষ্ণ পরমহংসদেবের পুণ্য পদার্পণ (১৮৮১)' : 'Sanctified by Sri Ramakrishna Paramhansa (1881)'}</span>
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground font-sans leading-relaxed">
                  {isBn
                    ? '১৮৮১ সালে যুগাবতার শ্রীশ্রীরামকৃষ্ণ পরমহংসদেবের পুণ্য শুভাগমনে এই ভবন ধন্য ও পবিত্র হয়, যা এর আধ্যাত্মিক মর্যাদাকে চিরন্তন রূপ দেয়।'
                    : 'In 1881, the great mystic and saint Sri Ramakrishna Paramhansa visited and blessed Khelat Bhawan, elevating its status as a sacred cultural haven chronicled in Sri Ramakrishna Kathamrita.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-black border border-primary/30 group">
                <img
                  src={getAssetUrl('/images/SDP_0282.jpg')}
                  alt="Colonnaded Arches of Khelat Bhawan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onClick={() => onOpenLightbox({
                    type: 'image',
                    title: 'Colonnaded Arches of Khelat Bhawan',
                    desc: 'The historic 19th-century architecture of Pathuria Ghata Ghosh Bari.',
                    src: '/images/SDP_0282.jpg'
                  })}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: HERITAGE ARCHITECTURAL OVERVIEW */}
        <section id="heritage-overview" className="bg-card/50 rounded-3xl border border-border/70 p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold font-sans">
              {isBn ? 'স্থাপত্য ও বৈভব' : 'Architectural Grandeur'}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {isBn ? 'হেরিটেজ স্থাপত্য ও বিশেষ বৈশিষ্ট্য' : 'Heritage Overview & Architectural Elements'}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed">
              {isBn
                ? 'ইউরোপীয় করিন্থিয়ান স্তম্ভ ও ঐতিহ্যবাহী বাঙালি ঠাকুর দালানের এক অপূর্ব সংমিশ্রণ।'
                : 'A grand confluence of classical Doric and Corinthian colonnades, open-to-sky central courtyards, cast-iron filigree balconies, and hand-cut Belgian chandeliers.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-background rounded-2xl border border-border/60 space-y-3 text-center">
              <span className="text-3xl font-serif font-bold text-primary block">1845</span>
              <h4 className="font-serif text-lg font-semibold text-foreground">{isBn ? 'ক্লাসিকাল কলোনেড' : 'Classical Colonnades'}</h4>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {isBn ? 'সুউচ্চ করিন্থিয়ান স্তম্ভ ও কারুকার্যখচিত খিলান।' : 'Grand Greco-Roman columns supporting soaring multi-tier balconies.'}
              </p>
            </div>
            <div className="p-6 bg-background rounded-2xl border border-border/60 space-y-3 text-center">
              <span className="text-3xl font-serif font-bold text-primary block">171+</span>
              <h4 className="font-serif text-lg font-semibold text-foreground">{isBn ? 'পবিত্র ঠাকুর দালান' : 'Sacred Thakur Dalan'}</h4>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {isBn ? '১৮৫৫ সাল থেকে অবিচ্ছিন্ন একচালা দুর্গোৎসব ও নিত্যসেবা।' : 'The sanctum for the unbroken annual Durga Puja and deity veneration.'}
              </p>
            </div>
            <div className="p-6 bg-background rounded-2xl border border-border/60 space-y-3 text-center">
              <span className="text-3xl font-serif font-bold text-primary block">3 Trusts</span>
              <h4 className="font-serif text-lg font-semibold text-foreground">{isBn ? 'সক্রিয় ট্রাস্ট বোর্ড' : 'Active Custodian Trusts'}</h4>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {isBn ? 'আধ্যাত্মিক, সাংস্কৃতিক ও সেবামূলক কর্মকাণ্ডের অভিভাবকত্ব।' : 'Permanent institutional bodies stewarding rituals, arts, and education.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SEVEN GENERATIONS HIERARCHY */}
        <section id="seven-generations" className="space-y-8">
          <SectionHeader
            title={t.lineage.heading}
            subtitle={t.lineage.desc}
          />

          <div className="royal-family-tree mt-8" aria-label={isBn ? 'সাত প্রজন্মের পারিবারিক বৃক্ষ' : 'Seven-generation family tree'}>
            <p className="royal-family-tree__eyebrow">
              {isBn ? 'প্রতিষ্ঠাতা থেকে বর্তমান অভিভাবক · বিস্তারিত দেখতে যেকোনো প্রজন্মে ক্লিক করুন' : 'From founder to present guardians · Click any generation to focus'}
            </p>
            {t.lineage.generations.map((gen, idx) => {
              const genNum = idx + 1;
              const isActive = activeGen === genNum;
              const hasActive = activeGen !== null && activeGen !== undefined;
              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => setActiveGen(activeGen === genNum ? null : genNum)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveGen(activeGen === genNum ? null : genNum);
                    }
                  }}
                  className={`royal-family-tree__generation royal-family-tree__generation--${genNum} ${
                    isActive ? 'is-active-gen' : hasActive ? 'is-inactive-gen' : ''
                  }`}
                  style={{
                    '--tier-width': `${46 + (idx * 9)}%`,
                    '--mobile-tier-width': `${82 + (idx * 3)}%`
                  }}
                >
                  <div className="royal-family-tree__card">
                    <span className="royal-family-tree__number" aria-hidden="true">{String(genNum).padStart(2, '0')}</span>
                    <div className="royal-family-tree__copy">
                      <span className="royal-family-tree__label">{gen.gen}</span>
                      <h4>{gen.name}</h4>
                      <p className="royal-family-tree__role">{gen.role}</p>
                      <p className="royal-family-tree__description">{gen.desc}</p>
                    </div>
                    <span className="royal-family-tree__period">{gen.period}</span>
                  </div>
                </div>
              );
            })}
            <div className="royal-family-tree__foundation" aria-hidden="true">
              <span />
              <i>1845</i>
              <span />
            </div>
          </div>
        </section>

        {/* SECTION 4: FOUNDER'S BRIEF */}
        <section id="founder-brief" className="bg-card/70 rounded-3xl border border-primary/30 p-8 sm:p-12 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="w-44 h-44 sm:w-52 sm:h-52 mx-auto lg:mx-0 rounded-full overflow-hidden border-2 border-primary/50 shadow-2xl bg-black">
                <img
                  src={getAssetUrl('/images/babu_khelat_ghosh_bust.png')}
                  alt="Babu Khelat Chandra Ghosh"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs uppercase font-sans font-semibold tracking-widest">
                <User className="w-3.5 h-3.5" />
                <span>{isBn ? 'প্রতিষ্ঠাতা ও সমাজহিতৈষী' : 'Founder & Cultural Patriarch'}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
                {isBn ? 'বাবু খেলাৎ চন্দ্র ঘোষ (১৭৭৫ – ১৮৪৫)' : 'Babu Khelat Chandra Ghosh (1775 – 1845)'}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed">
                {isBn
                  ? 'ঊনবিংশ শতকের বাংলার নবজাগরণের এক অগ্রণী ব্যক্তিত্ব, যিনি মার্গসঙ্গীতের পৃষ্ঠপোষকতা, দাতব্য চিকিৎসালয় এবং শিক্ষা প্রসারে ঐতিহাসিক অবদান রেখে গেছেন।'
                  : 'A towering figure of 19th-century Calcutta Renaissance. Babu Khelat Ghosh was a visionary entrepreneur, benevolent philanthropist, and the foremost patron of Indian classical Dhrupad, Khayal, and Sitar traditions.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('founder')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary hover:underline"
                >
                  <span>{isBn ? 'প্রতিষ্ঠাতা সম্পর্কে বিস্তারিত জীবনী পড়ুন' : 'Read Full Founder Biography'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: MISSION & VISION */}
        <section id="mission-vision" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-primary text-primary-foreground p-8 sm:p-10 rounded-3xl shadow-xl space-y-4">
            <Compass className="w-8 h-8 text-amber-300 mb-2" />
            <h3 className="font-serif text-2xl font-bold">
              {isBn ? 'আমাদের লক্ষ্য' : 'Our Mission'}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-primary-foreground/90 leading-relaxed font-light">
              {isBn
                ? 'ধর্মীয় ভক্তি, শাস্ত্রীয় শিল্পকলা ও সমাজসেবার মাধ্যমে বাংলা সাংস্কৃতিক ঐতিহ্য ও তার ১৭৫ বছরের সাবেকি পরম্পরা সংরক্ষণ করা।'
                : 'To preserve, promote, and perpetuate Bengali cultural heritage through religious devotion, classical arts, and community service while maintaining the sanctity and traditions of our 175-year legacy.'}
            </p>
          </div>

          <div className="bg-card p-8 sm:p-10 rounded-3xl border border-border/80 shadow-xl space-y-4">
            <Award className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-serif text-2xl font-bold text-foreground">
              {isBn ? 'আমাদের দৃষ্টিভঙ্গি' : 'Our Vision'}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
              {isBn
                ? 'ঐতিহ্য ও আধুনিকতার সেতুবন্ধন রচনা করে নতুন প্রজন্মকে স্বীয় ঐতিহ্যে অনুপ্রাণিত করা এবং সমাজে ঐক্য, ভক্তি ও শৈল্পিক শ্রেষ্ঠত্ব বজায় রাখা।'
                : 'To be a beacon of Bengali culture that bridges tradition with modernity, inspiring future generations to embrace their heritage while fostering unity, devotion, and artistic excellence in our community.'}
            </p>
          </div>
        </section>

        {/* SECTION 6: DOWNLOADABLE HERITAGE EBOOK / PDF (Item 9) */}
        <section id="heritage-ebook" className="bg-card rounded-3xl border border-primary/40 p-8 sm:p-12 shadow-2xl text-center max-w-4xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/30 shadow-md">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold font-sans block mb-2">
              {isBn ? 'ডিজিটাল আর্কাইভ ও পুস্তিকা' : 'Official Publication'}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {isBn ? 'খেলাৎ ভবন হেরিটেজ ই-বুক ডাউনলোড করুন' : 'Download the Khelat Bhawan Heritage Guide & eBook'}
            </h3>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
            {isBn
              ? 'খেলাৎ ভবনের ১৭৫+ বছরের পূর্ণাঙ্গ ইতিহাস, স্থাপত্যের নিদর্শন, ঐতিহাসিক দুর্গাপূজা ও পারিবারিক বংশলতিকার বিশদ বিবরণ সম্বলিত অফিসিয়াল ই-বুক (PDF)।'
              : 'Download the comprehensive archival monograph detailing over 175 years of architectural history, spiritual sanctity, classical musical patronage, and seven generations of custodianship.'}
          </p>
          <div className="pt-2">
            <a
              href="/Khelat_Bhawan_Heritage_eBook.pdf"
              download="Khelat_Bhawan_Heritage_eBook.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase hover:bg-primary/90 transition-all shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>{isBn ? 'হেরিটেজ ই-বুক ডাউনলোড করুন (PDF)' : 'Download Heritage eBook (PDF)'}</span>
            </a>
          </div>
        </section>

        {/* SECTION 7: VISIT / CONTACT INFORMATION & CTA */}
        <section id="heritage-contact-cta" className="p-8 sm:p-12 bg-card/60 rounded-3xl border border-border/80 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold font-sans">
              {isBn ? 'পরিদর্শন ও এস্টেট যোগাযোগ' : 'Visiting & Official Enquiries'}
            </span>
            <h3 className="font-serif text-3xl font-bold text-foreground">
              {isBn ? 'খেলাৎ ভবনে আপনাকে স্বাগতম' : 'Plan Your Visit & Cultural Enquiries'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-muted-foreground">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block text-foreground mb-1">{isBn ? 'ঠিকানা:' : 'Address:'}</strong>
                <span>47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block text-foreground mb-1">{isBn ? 'ফোন নম্বর:' : 'Phone Numbers:'}</strong>
                <span>+91 98310 93021 / +91 99031 34231</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block text-foreground mb-1">{isBn ? 'অফিসিয়াল ইমেল:' : 'Official Email:'}</strong>
                <span>councilofculture.ghoshbari47@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('rental')}
              className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase hover:bg-primary/90 transition-all shadow-md"
            >
              {isBn ? 'রিজার্ভেশন ও বুকিং পৃষ্ঠা' : 'Explore Reservations & Bookings'}
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className="px-8 py-3.5 rounded-full bg-card text-foreground border border-border/80 text-xs font-semibold tracking-widest uppercase hover:bg-background transition-all shadow-sm"
            >
              {isBn ? 'ইভেন্ট ও উৎসব সূচি' : 'Cultural Events & Festivals'}
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}
