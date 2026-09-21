import React from 'react';
import { Heart, Music, Users, Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';
import AlpanaMotif from '../components/AlpanaMotif';

export default function TrusteesPage({ lang = 'en', setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];
  const isBn = lang === 'bn';

  const trusts = [
    {
      id: "trust-1",
      num: "01",
      est: "1855 / 1920",
      name: "Lakshmi Narayan Gopal Radha Krishna Jew Trust",
      category: isBn ? "ভক্তি ও আধ্যাত্মিক ঐতিহ্য" : "Religious & Spiritual Devotion",
      icon: Heart,
      desc: isBn
        ? "১৮৫৫ সাল থেকে খেলাৎ ভবনের পুণ্য ধর্মীয় ঐতিহ্য, বিশেষত ঐতিহাসিক দুর্গাপূজা, জগদ্ধাত্রী পূজা পরিচালনা এবং পারিবারিক বিগ্রহের নিত্যসেবায় নিয়োজিত।"
        : "Dedicated to preserving the spiritual essence of Bengali culture through daily devotional practices, sacred deity veneration, and the 171-year continuous Durga Puja.",
      achievements: isBn 
        ? ["১৭১+ বছর ধরে নিরবচ্ছিন্ন দুর্গাপূজা", "১৮৮১ সালে শ্রীরামকৃষ্ণের পুণ্য আগমন ও আশীর্বাদ", "১০৮ পদ্মের ঐতিহ্যবাহী সন্ধিপূজা ও মহাপ্রসাদ বিতরণ", "নিত্য দেবসেবা ও আধ্যাত্মিক দিকনির্দেশনা"]
        : ["171+ years of unbroken traditional Durga Puja", "Blessed by Sri Ramakrishna Paramhansa in 1881", "Traditional 108 lotus Sandhi Puja and community Prasad distribution", "Daily Nitya Seva for Lakshmi Narayan, Gopal, and Radha Krishna deities"],
      initiatives: isBn 
        ? ["১৮৫৫ সাল থেকে দুর্গাপূজা মহোৎসব", "ঐতিহ্যবাহী রীতিতে জগদ্ধাত্রী পূজা", "দৈনিক নিত্যসেবা ও আরতি", "আধ্যাত্মিক আলোচনা ও ভক্তিমূলক সঙ্গীত"]
        : ["Durga Puja celebration since 1855", "Jagadhatri Puja with ancestral rituals", "Daily Nitya Seva and Sandhya Aarti", "Spiritual discourses and devotional kirtans"],
      image: "/images/SDP_0368.jpg"
    },
    {
      id: "trust-2",
      num: "02",
      est: "1950s / 1975",
      name: "Khelat Ghosh Memorial Trust",
      category: isBn ? "শাস্ত্রীয় সঙ্গীত ও সংস্কৃতি" : "Classical Music & Cultural Patronage",
      icon: Music,
      desc: isBn
        ? "প্রতিষ্ঠাতা বাবু খেলাৎ ঘোষের সঙ্গীতানুরাগকে চিরস্মরণীয় রাখতে ভারতীয় মার্গ সঙ্গীতের চর্চা, ঐতিহ্যবাহী সঙ্গীতশিল্পীদের সহায়তা ও রাজবাড়ি স্থাপত্য সংরক্ষণে নিবেদিত।"
        : "Promoting Indian classical music, Dhrupad, Khayal, and Sitar traditions while stewarding the structural preservation of the 19th-century palace estate.",
      achievements: isBn 
        ? ["১০০+ শাস্ত্রীয় সঙ্গীতশিল্পীকে সম্মাননা ও সহায়তা", "ঐতিহাসিক বাৎসরিক মার্গ সঙ্গীত সম্মেলন", "১৯৭৫ সালে রাজপ্রাসাদের প্রধান স্থাপত্য পুনরুদ্ধার", "তরুণ উচ্চাঙ্গ সঙ্গীত শিল্পীদের প্রশিক্ষণ ও অনুদান"]
        : ["Supported 100+ classical maestros and performers", "Pioneered historic classical music conferences", "1975 comprehensive palace architectural restoration", "Mentorship and grants for young classical vocalists and sitarists"],
      initiatives: isBn 
        ? ["শাস্ত্রীয় সঙ্গীতানুষ্ঠান ও বৈঠক", "ঐতিহ্যবাহী সঙ্গীতশিল্পীদের পৃষ্ঠপোষকতা", "সংগীত সম্মেলন ও সেমিনার", "ঐতিহাসিক স্থাপত্যের সযত্ন সংস্কার"]
        : ["Classical baithaks and soirees", "Support for heritage musicians", "Annual music festivals & academic seminars", "Ongoing structural preservation of Khelat Bhawan"],
      image: "/images/SDP_0282.jpg"
    },
    {
      id: "trust-3",
      num: "03",
      est: "1985 / 2000+",
      name: "Artist Nectar Council of Culture",
      category: isBn ? "মঞ্চশিল্প ও সমাজকল্যাণ" : "Performing Arts, Education & Social Welfare",
      icon: Users,
      desc: isBn
        ? "মঞ্চনাটক, শিল্পীদের কল্যাণ, সমাজসেবা, সুবিধাবঞ্চিত শিশুদের শিক্ষাদান ও স্বাস্থ্য সচেতনতা কর্মসূচিতে নিবেদিত সাংস্কৃতিক পরিষদ।"
        : "Focused on performing arts residencies, theater productions, community education, healthcare camps, and youth heritage engagement.",
      achievements: isBn 
        ? ["২০০+ সুবিধাবঞ্চিত শিশুকে শিক্ষাবৃত্তি", "৫০+ বিনামূল্যে স্বাস্থ্য ও চক্ষু পরীক্ষা শিবির", "৩০০+ সাংস্কৃতিক ও নাট্য পরিবেশনা", "যুব ঐতিহ্য সংরক্ষণ ফেলোশিপ"]
        : ["Educated 200+ underprivileged children", "Conducted 50+ free healthcare & eye screening camps", "Organized 300+ cultural and theatrical productions", "Youth heritage preservation fellowships"],
      initiatives: isBn 
        ? ["মঞ্চশিল্প কর্মশালা ও নাট্যোৎসব", "সুবিধাবঞ্চিত শিশুদের শিক্ষা সহায়তা", "বিনামূল্যে স্বাস্থ্য সচেতনতা শিবির", "ডিজিটাল সংস্কৃতি আর্কাইভ উদ্যোগ"]
        : ["Performing arts workshops & theater festivals", "Educational scholarships for underprivileged youth", "Community healthcare awareness drives", "Digital youth cultural archive initiatives"],
      image: "/images/unnamed_12.webp"
    }
  ];

  const trusteeTimeline = [
    { period: '1920–1945', name: isBn ? 'প্রথম ট্রাস্টি' : 'First Generation Trustees', desc: isBn ? 'ভবিষ্যৎ প্রজন্মের জন্য খেলাৎ ভবনের ঐতিহ্য রক্ষায় আনুষ্ঠানিক ট্রাস্ট কাঠামো প্রতিষ্ঠা করেন।' : 'Established the formal trust structure to protect the Khelat Bhawan heritage for future generations.' },
    { period: '1945–1970', name: isBn ? 'দ্বিতীয় ট্রাস্টি' : 'Second Generation Trustees', desc: isBn ? 'ভারতের স্বাধীনতা ও পরিবর্তিত সামাজিক প্রেক্ষাপটে ঐতিহ্য সংরক্ষণ করেন।' : "Navigated the trust through India's independence and the changing social landscape while preserving traditions." },
    { period: '1970–1995', name: isBn ? 'তৃতীয় ট্রাস্টি' : 'Third Generation Trustees', desc: isBn ? 'সাংস্কৃতিক ও আধ্যাত্মিক গুরুত্ব বজায় রেখে ট্রাস্টের কার্যক্রম আধুনিকীকরণ করেন।' : 'Modernized trust operations while maintaining the cultural essence and spiritual significance.' },
    { period: '1995–2020', name: isBn ? 'চতুর্থ ট্রাস্টি' : 'Fourth Generation Trustees', desc: isBn ? 'ঐতিহ্যবাহী মূল্যবোধ ও সমকালীন প্রয়োজনের মধ্যে সেতুবন্ধন গড়ে বৃহত্তর পরিচিতির পথ খুলে দেন।' : 'Bridged traditional values with contemporary needs, opening the heritage to wider appreciation.' },
    { period: isBn ? '২০২০–বর্তমান' : '2020–Present', name: isBn ? 'বর্তমান ট্রাস্টি মণ্ডলী' : 'Current Governing Board', desc: isBn ? 'দৃশ্যমান ও অদৃশ্য ঐতিহ্য সংরক্ষণ নিশ্চিত করে ট্রাস্টকে ডিজিটাল যুগে এগিয়ে নিয়ে যাচ্ছেন।' : 'Leading the trust into the digital age while ensuring the preservation of tangible and intangible heritage.' }
  ];

  return (
    <main className="pt-28 md:pt-36 pb-24 bg-background min-h-screen text-foreground">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <SectionHeader
          title={isBn ? 'সাংস্কৃতিক ট্রাস্ট ও ট্রাস্টি মণ্ডলী' : 'Cultural Trusts & Custodian Governance'}
          subtitle={isBn
            ? 'খেলাৎ ভবনের আধ্যাত্মিক ভক্তি, সঙ্গীত ও সমাজসেবার ঐতিহ্য রক্ষায় তিনটি সক্রিয় ট্রাস্টের মহতী ভূমিকা'
            : 'Three dedicated trusts united in spiritual devotion, classical Indian music, and community service'}
        />

        {/* 3 Active Trust Cards */}
        <div className="space-y-16">
          {trusts.map((trust) => {
            const Icon = trust.icon;

            return (
              <div
                key={trust.id}
                className="bg-card/70 rounded-3xl border border-border/80 overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-500 backdrop-blur-sm"
              >
                {/* Header Strip */}
                <div className="bg-muted/60 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-primary font-sans font-semibold block">
                        Trust {trust.num} · {trust.est}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-0.5">
                        {trust.name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-sans">
                        {trust.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-sans font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isBn ? 'সক্রিয় ট্রাস্ট সনদ' : 'Active Charter'}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-5 space-y-4 text-left">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-black shadow-lg border border-border/60">
                      <img
                        src={getAssetUrl(trust.image)}
                        alt={trust.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => onOpenLightbox({
                          type: 'image',
                          title: trust.name,
                          desc: trust.desc,
                          src: trust.image
                        })}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                      {trust.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div>
                      <h4 className="font-serif text-base font-bold text-foreground mb-3 pb-2 border-b border-border/40">
                        {isBn ? 'প্রধান অর্জন ও ঐতিহ্য সংরক্ষণ' : 'Key Achievements & Heritage Preservation'}
                      </h4>
                      <div className="space-y-2">
                        {trust.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 font-sans">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif text-base font-bold text-foreground mb-3 pb-2 border-b border-border/40">
                        {isBn ? 'চলমান কর্মসূচি ও জনকল্যাণ' : 'Active Programs & Community Service'}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {trust.initiatives.map((init, i) => (
                          <div key={i} className="p-3 bg-background/80 border border-border/70 text-xs font-sans text-foreground/80 rounded-xl flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            <span>{init}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trustee Lineage Section */}
        <section className="trustee-lineage-section my-24" aria-labelledby="trustee-lineage-heading">
          <div className="trustee-lineage-section__header text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold">
              {isBn ? 'আনুষ্ঠানিক তত্ত্বাবধান' : 'Formal Custodianship'}
            </span>
            <h2 id="trustee-lineage-heading" className="font-serif text-3xl md:text-5xl font-bold mt-2">
              {isBn ? 'ট্রাস্টি সময়রেখা ও ধারাবাহিকতা' : 'Trustee Lineage & Continuity'}
            </h2>
            <p className="text-sm sm:text-base mt-3 font-sans leading-relaxed">
              {isBn 
                ? '১৯২০ থেকে বর্তমান পর্যন্ত খেলাৎ ভবনের ট্রাস্ট বোর্ডের প্রাতিষ্ঠানিক দায়িত্বভার।' 
                : 'Generational stewardship safeguarding spiritual, architectural, and musical heritage since 1920.'}
            </p>
          </div>

          <div className="trustee-lineage">
            <span className="lineage-alpana-rail lineage-alpana-rail--left" aria-hidden="true" />
            <span className="lineage-alpana-rail lineage-alpana-rail--right" aria-hidden="true" />
            {trusteeTimeline.map((trustee) => (
              <article key={trustee.period} className="trustee-lineage__item">
                <div className="trustee-lineage__seal" aria-hidden="true">
                  <AlpanaMotif />
                </div>
                <div>
                  <span>{trustee.period}</span>
                  <h3>{trustee.name}</h3>
                  <p>{trustee.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Governance Quote */}
        <div className="bg-primary text-primary-foreground p-10 md:p-14 rounded-3xl text-center my-16 shadow-2xl space-y-4">
          <blockquote className="font-serif italic text-xl md:text-2xl text-primary-foreground/95 max-w-3xl mx-auto leading-relaxed">
            "{isBn 
              ? 'আনুষ্ঠানিক ট্রাস্ট ব্যবস্থার মাধ্যমে আমরা নিশ্চিত করি যে খেলাৎ ভবনের পুণ্য ঐতিহ্য ও সঙ্গীতধারা আগামী বহু শতাব্দী পর্যন্ত সুরক্ষিত থাকবে।'
              : 'Through formal trusts, we ensure that our living heritage, sacred devotion, and musical legacy remain protected and accessible for centuries to come.'}"
          </blockquote>
          <span className="text-[11px] uppercase tracking-widest text-amber-300 font-sans font-semibold block">
            Pathuria Ghata Ghosh Bari Trust Governance
          </span>
        </div>

      </div>
    </main>
  );
}
