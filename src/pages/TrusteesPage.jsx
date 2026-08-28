import React from 'react';
import { Heart, Music, Users, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

export default function TrusteesPage({ lang, setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];

  const trusts = [
    {
      id: "trust-1",
      num: "01",
      est: "1855",
      name: "Lakshmi Narayan Gopal Radha Krishna Jew Trust",
      category: lang === 'bn' ? "ভক্তি ও আধ্যাত্মিক ঐতিহ্য" : "Religious & Spiritual Devotion",
      icon: Heart,
      desc: lang === 'bn'
        ? "১৮৫৫ সাল থেকে খেলাৎ ভবনের পুণ্য ধর্মীয় ঐতিহ্য, বিশেষত ঐতিহাসিক দুর্গাপূজা ও জগদ্ধাত্রী পূজা পরিচালনা ও নিত্যসেবায় নিয়োজিত।"
        : "Dedicated to preserving the spiritual essence and sacred rituals of Khelat Bhavan. Operates the unbroken tradition of Durga Puja since 1855, Jagadhatri Puja, and daily Nitya Seva of the family deities.",
      achievements: [
        "170+ continuous years of sacred Durga Puja celebration",
        "Preservation of traditional Ekchala idol crafting & aristocratic rituals",
        "Sanctified in 1881 by the divine visit of Sri Ramakrishna Paramhansa",
        "Daily Nitya Seva and upkeep of the historic Thakur Dalan shrine"
      ],
      initiatives: [
        "Daily puja and devotional offerings",
        "Annual Jagadhatri and Lakshmi Puja rituals",
        "Spiritual discourse and community unity",
        "Sanctuary maintenance & heritage altar preservation"
      ],
      image: "/images/SDP_0368.jpg"
    },
    {
      id: "trust-2",
      num: "02",
      est: "1950s",
      name: "Khelat Ghosh Memorial Trust",
      category: lang === 'bn' ? "শাস্ত্রীয় সঙ্গীত ও সংস্কৃতি" : "Classical Music & Cultural Patronage",
      icon: Music,
      desc: lang === 'bn'
        ? "প্রতিষ্ঠাতা বাবু খেলাৎ ঘোষের সঙ্গীতানুরাগকে চিরস্মরণীয় রাখতে ভারতীয় উচ্চাঙ্গ সঙ্গীতের চর্চা ও ঐতিহ্যবাহী সঙ্গীতশিল্পীদের সহায়তা প্রদানে নিবেদিত।"
        : "Established in memory of founder Babu Khelat Ghosh to sustain and promote Hindustani classical music, preserve ancestral musical recordings, and support traditional performing artists.",
      achievements: [
        "Seven decades of patronizing classical Indian vocal and instrumental maestros",
        "Institution of prestigious cultural awards for excellence in classical music",
        "Preservation of rare archival musical documentation and compositions",
        "Organization of traditional heritage baithaks in Khelat Bhavan halls"
      ],
      initiatives: [
        "Annual classical music conferences and baithaks",
        "Artist financial support and scholarship stipends",
        "Youth classical music appreciation workshops",
        "Archival preservation of vintage Indian classical recordings"
      ],
      image: "/images/SDP_0282.jpg"
    },
    {
      id: "trust-3",
      num: "03",
      est: "2000+",
      name: "Artist Nectar Council of Culture",
      category: lang === 'bn' ? "মঞ্চশিল্প ও সমাজকল্যাণ" : "Performing Arts, Education & Social Welfare",
      icon: Users,
      desc: lang === 'bn'
        ? "মঞ্চনাটক, শিল্পীদের কল্যাণ, সমাজসেবা, শিশুদের শিক্ষাদান ও স্বাস্থ্য সচেতনতা কর্মসূচিতে নিবেদিত এক আধুনিক সাংস্কৃতিক পরিষদ।"
        : "A progressive cultural institution focused on holistic artist welfare, community theater and performing arts, youth heritage education, and community healthcare awareness programs.",
      achievements: [
        "Created collaborative platforms for theater and contemporary performing arts",
        "Organized community healthcare and eye-care awareness camps",
        "Implemented educational assistance initiatives for underprivileged children",
        "Facilitated heritage workshops and cultural exchange programs"
      ],
      initiatives: [
        "Comprehensive artist welfare and health support",
        "Children's cultural and educational development drives",
        "Free medical and health awareness camps",
        "Heritage awareness seminars and cultural exhibitions"
      ],
      image: "/images/unnamed_12.webp"
    }
  ];

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title={lang === 'bn' ? 'সাংস্কৃতিক ট্রাস্ট ও ট্রাস্টি' : 'Trusts & Trustees'}
          subtitle={lang === 'bn'
            ? 'খেলাৎ ভবনের আধ্যাত্মিক, সঙ্গীত ও সামাজিক উত্তরাধিকার রক্ষায় তিনটি সক্রিয় ট্রাস্ট'
            : 'Three dedicated trusts united in devotion, classical arts, and community service'}
        />

        <div className="space-y-16 my-16">
          {trusts.map((trust) => {
            const Icon = trust.icon;

            return (
              <div
                key={trust.id}
                className="bg-card/70 rounded-sm border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Header Strip */}
                <div className="gradient-heritage text-primary-foreground p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-sm bg-white/10 border border-white/20 flex items-center justify-center text-rose-gold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-rose-gold font-body font-semibold block">
                        Trust {trust.num} · {trust.est}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mt-0.5">
                        {trust.name}
                      </h3>
                      <p className="text-xs text-primary-foreground/70 font-body">
                        {trust.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-5 space-y-4 text-left">
                    <div className="h-60 rounded-sm overflow-hidden bg-black shadow-inner">
                      <img
                        src={trust.image}
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
                    <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
                      {trust.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div>
                      <h4 className="font-serif text-base font-bold text-foreground mb-3 pb-2 border-b border-border">
                        {lang === 'bn' ? 'প্রধান অর্জন ও ঐতিহ্য সংরক্ষণ' : 'Key Achievements & Heritage Preservation'}
                      </h4>
                      <div className="space-y-2">
                        {trust.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-foreground/80 font-body">
                            <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif text-base font-bold text-foreground mb-3 pb-2 border-b border-border">
                        {lang === 'bn' ? 'চলমান কর্মসূচি ও সেবা' : 'Active Programs & Initiatives'}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {trust.initiatives.map((init, i) => (
                          <div key={i} className="p-3 bg-background border border-border/80 text-xs font-body text-foreground/80 rounded-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
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

        {/* Governance Quote */}
        <div className="gradient-heritage text-primary-foreground p-10 md:p-12 rounded-sm text-center my-16 shadow-lg">
          <blockquote className="font-serif italic text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto my-3">
            "{lang === 'bn' 
              ? 'আনুষ্ঠানিক ট্রাস্ট ব্যবস্থার মাধ্যমে আমরা নিশ্চিত করি যে খেলাৎ ভবনের পুণ্য ঐতিহ্য ও সঙ্গীতধারা আগামী বহু শতাব্দী পর্যন্ত সুরক্ষিত থাকবে।'
              : 'Through structured formal trusts and dedicated custodianship, we ensure that the soul, music, and sanctity of Khelat Bhavan remain protected for centuries to come.'}"
          </blockquote>
          <span className="text-[10px] uppercase tracking-widest text-rose-gold font-body font-semibold">
            Pathuria Ghata Ghosh Bari Trust Governance
          </span>
        </div>
      </div>
    </main>
  );
}
