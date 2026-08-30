import React from 'react';
import { Heart, Music, Users, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';
import AlpanaMotif from '../components/AlpanaMotif';

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
        : "Dedicated to preserving the spiritual essence of Bengali culture through devotional practices and religious ceremonies.",
      achievements: lang === 'bn' ? ["১৭০+ বছর ধরে নিরবচ্ছিন্ন দুর্গাপূজা", "১৮৮১ সালে শ্রীরামকৃষ্ণের আশীর্বাদ", "ঐতিহ্যবাহী আচার সংরক্ষণ", "সমাজে আধ্যাত্মিক দিকনির্দেশনা"] : ["170+ years of continuous Durga Puja", "Blessed by Sri Ramakrishna in 1881", "Traditional ritual preservation", "Community spiritual guidance"],
      initiatives: lang === 'bn' ? ["১৮৫৫ সাল থেকে দুর্গাপূজা", "ঐতিহ্যবাহী রীতিতে জগদ্ধাত্রী পূজা", "দৈনিক নিত্যসেবা ও প্রার্থনা", "আধ্যাত্মিক আলোচনা ও ভজন", "ধর্মীয় উৎসব আয়োজন"] : ["Durga Puja celebration since 1855", "Jagadhatri Puja with traditional rituals", "Daily Nitya Seva and prayers", "Spiritual discourse and bhajans", "Religious festival organization"],
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
        : "Promoting Bengali music, classical arts, and cultural initiatives to preserve our rich artistic heritage.",
      achievements: lang === 'bn' ? ["১০০+ শাস্ত্রীয় সঙ্গীতশিল্পীকে সহায়তা", "৫০০+ সাংস্কৃতিক অনুষ্ঠান আয়োজন", "ঐতিহ্যবাহী বাংলা সঙ্গীত সংরক্ষণ", "তরুণ শিল্পীদের পরামর্শদান"] : ["Supported 100+ classical musicians", "Organized 500+ cultural programs", "Preserved traditional Bengali music", "Mentored young artists"],
      initiatives: lang === 'bn' ? ["শাস্ত্রীয় সঙ্গীতানুষ্ঠান", "ঐতিহ্যবাহী সঙ্গীতশিল্পীদের সহায়তা", "বাংলা সাংস্কৃতিক অনুষ্ঠান", "সঙ্গীত শিক্ষা কর্মসূচি", "শিল্পী স্বীকৃতি পুরস্কার"] : ["Classical music concerts and recitals", "Support for traditional musicians", "Bengali cultural event organization", "Music education programs", "Artist recognition awards"],
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
        : "Focused on performing arts, social service, children's education, and healthcare awareness in the community.",
      achievements: lang === 'bn' ? ["২০০+ সুবিধাবঞ্চিত শিশুকে শিক্ষা", "৫০+ স্বাস্থ্য শিবির", "৩০০+ সাংস্কৃতিক পরিবেশনা", "সমাজকল্যাণ কর্মসূচি"] : ["Educated 200+ underprivileged children", "Conducted 50+ health camps", "Organized 300+ cultural performances", "Community welfare programs"],
      initiatives: lang === 'bn' ? ["মঞ্চশিল্প কর্মশালা ও অনুষ্ঠান", "সুবিধাবঞ্চিত শিশুদের শিক্ষা সহায়তা", "স্বাস্থ্য সচেতনতা প্রচার", "সমাজসেবা উদ্যোগ", "সাংস্কৃতিক সংরক্ষণ কর্মসূচি"] : ["Performing arts workshops and shows", "Educational support for underprivileged children", "Healthcare awareness campaigns", "Social service initiatives", "Cultural preservation programs"],
      image: "/images/unnamed_12.webp"
    }
  ];

  const trusteeTimeline = [
    { period: '1920–1945', name: lang === 'bn' ? 'প্রথম ট্রাস্টি' : 'First Trustee', desc: lang === 'bn' ? 'ভবিষ্যৎ প্রজন্মের জন্য খেলাৎ ভবনের ঐতিহ্য রক্ষায় আনুষ্ঠানিক ট্রাস্ট কাঠামো প্রতিষ্ঠা করেন।' : 'Established the formal trust structure to protect the Khelat Bhawan heritage for future generations.' },
    { period: '1945–1970', name: lang === 'bn' ? 'দ্বিতীয় ট্রাস্টি' : 'Second Trustee', desc: lang === 'bn' ? 'ভারতের স্বাধীনতা ও পরিবর্তিত সামাজিক প্রেক্ষাপটে ঐতিহ্য সংরক্ষণ করেন।' : "Navigated the trust through India's independence and the changing social landscape while preserving traditions." },
    { period: '1970–1995', name: lang === 'bn' ? 'তৃতীয় ট্রাস্টি' : 'Third Trustee', desc: lang === 'bn' ? 'সাংস্কৃতিক ও আধ্যাত্মিক গুরুত্ব বজায় রেখে ট্রাস্টের কার্যক্রম আধুনিকীকরণ করেন।' : 'Modernized trust operations while maintaining the cultural essence and spiritual significance.' },
    { period: '1995–2020', name: lang === 'bn' ? 'চতুর্থ ট্রাস্টি' : 'Fourth Trustee', desc: lang === 'bn' ? 'ঐতিহ্যবাহী মূল্যবোধ ও সমকালীন প্রয়োজনের মধ্যে সেতুবন্ধন গড়ে বৃহত্তর পরিচিতির পথ খুলে দেন।' : 'Bridged traditional values with contemporary needs, opening the heritage to wider appreciation.' },
    { period: lang === 'bn' ? '২০২০–বর্তমান' : '2020–Present', name: lang === 'bn' ? 'বর্তমান ট্রাস্টি' : 'Current Trustee', desc: lang === 'bn' ? 'দৃশ্যমান ও অদৃশ্য ঐতিহ্য সংরক্ষণ নিশ্চিত করে ট্রাস্টকে ডিজিটাল যুগে এগিয়ে নিয়ে যাচ্ছেন।' : 'Leading the trust into the digital age while ensuring the preservation of tangible and intangible heritage.' }
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

        <section className="my-24" aria-labelledby="trustee-lineage-heading">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-body font-semibold">{lang === 'bn' ? 'আনুষ্ঠানিক তত্ত্বাবধান' : 'Formal custodianship'}</span>
            <h2 id="trustee-lineage-heading" className="font-serif text-4xl md:text-5xl font-medium mt-3">{lang === 'bn' ? 'ট্রাস্টি সময়রেখা' : 'Trustee Timeline'}</h2>
            <p className="text-sm text-muted-foreground mt-4">{lang === 'bn' ? 'সরকারি ওয়েবসাইটে প্রকাশিত ট্রাস্টি পদবি ও সময়কাল। ব্যক্তিগত নাম প্রকাশিত না থাকায় এখানে অনুমান করা হয়নি।' : 'Trustee designations and periods published by the official website. Personal names are not inferred where they are not provided.'}</p>
          </div>
          <div className="trustee-lineage">
            <span className="lineage-alpana-rail lineage-alpana-rail--left" aria-hidden="true" />
            <span className="lineage-alpana-rail lineage-alpana-rail--right" aria-hidden="true" />
            {trusteeTimeline.map((trustee, index) => (
              <article key={trustee.period} className="trustee-lineage__item">
                <div className="trustee-lineage__seal" aria-hidden="true"><AlpanaMotif variant={index % 2 === 0 ? 'flower' : 'fish'} /></div>
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
        <div className="gradient-heritage text-primary-foreground p-10 md:p-12 rounded-sm text-center my-16 shadow-lg">
          <blockquote className="font-serif italic text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto my-3">
            "{lang === 'bn' 
              ? 'আনুষ্ঠানিক ট্রাস্ট ব্যবস্থার মাধ্যমে আমরা নিশ্চিত করি যে খেলাৎ ভবনের পুণ্য ঐতিহ্য ও সঙ্গীতধারা আগামী বহু শতাব্দী পর্যন্ত সুরক্ষিত থাকবে।'
              : 'Through formal trusts, we ensure that our heritage remains protected for centuries to come.'}"
          </blockquote>
          <span className="text-[10px] uppercase tracking-widest text-rose-gold font-body font-semibold">
            Pathuria Ghata Ghosh Bari Trust Governance
          </span>
        </div>
      </div>
    </main>
  );
}
