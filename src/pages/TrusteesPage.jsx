import React, { useState } from 'react';
import { 
  Shield, 
  Heart, 
  Music, 
  Users, 
  CheckCircle, 
  Sparkles, 
  ChevronRight, 
  Calendar,
  Award
} from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';

export default function TrusteesPage({ lang, setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];
  const [selectedTrust, setSelectedTrust] = useState('all');

  const trustsData = [
    {
      id: "trust-1",
      num: "01",
      est: "1855",
      name: "Lakshmi Narayan Gopal Radha Krishna Jew Trust",
      category: "Religious & Spiritual Devotion",
      icon: Heart,
      desc: "Dedicated to preserving the spiritual essence and sacred rituals of Khelat Bhawan. Operates the unbroken tradition of Durga Puja since 1855, Jagadhatri Puja, and daily Nitya Seva of the family deities.",
      keyAchievements: [
        "170+ continuous years of sacred Durga Puja celebration",
        "Preservation of traditional Ekchala idol crafting and aristocratic rituals",
        "Sanctified in 1881 by the divine visit of Sri Ramakrishna Paramhansa",
        "Daily Nitya Seva and upkeep of the historic Thakur Dalan shrine"
      ],
      initiatives: [
        "Daily puja and prasad distribution",
        "Annual Jagadhatri and Lakshmi Puja rituals",
        "Spiritual discourse and community unity programs",
        "Sanctuary maintenance and heritage altar preservation"
      ],
      image: "/images/SDP_0368.jpg"
    },
    {
      id: "trust-2",
      num: "02",
      est: "1950s",
      name: "Khelat Ghosh Memorial Trust",
      category: "Classical Music & Cultural Patronage",
      icon: Music,
      desc: "Established in memory of founder Babu Khelat Ghosh to sustain and promote Hindustani classical music, preserve ancestral musical recordings, and support traditional performing artists.",
      keyAchievements: [
        "Seven decades of patronizing classical Indian vocal and instrumental maestros",
        "Institution of prestigious cultural awards for excellence in classical music",
        "Preservation of rare archival musical documentation and compositions",
        "Organization of traditional heritage baithaks in Khelat Bhawan halls"
      ],
      initiatives: [
        "Annual classical music conferences and concerts",
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
      category: "Performing Arts, Education & Social Welfare",
      icon: Users,
      desc: "A progressive cultural institution focused on holistic artist welfare, community theater and performing arts, youth heritage education, and community healthcare awareness programs.",
      keyAchievements: [
        "Created collaborative platforms for theater and contemporary performing arts",
        "Organized community healthcare and eye-care awareness camps",
        "Implemented educational assistance initiatives for underprivileged children",
        "Facilitated heritage workshops and cultural exchange programs"
      ],
      initiatives: [
        "Comprehensive artist welfare and health support",
        "Children's cultural and education development drives",
        "Free medical and health awareness camps",
        "Heritage awareness seminars and cultural exhibitions"
      ],
      image: "/images/unnamed_12.webp"
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5]">
      {/* Header */}
      <section className="py-16 bg-burgundy-950 text-white relative overflow-hidden border-b-2 border-rosegold-500/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,125,101,0.15)_0%,_transparent_75%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-900 border border-rosegold-400/50 text-rosegold-300 text-xs font-semibold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>Governance & Custodianship</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.nav.trustees}
          </h1>

          <AlpanaDivider light={true} className="my-2" />

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-rosegold-200/90 font-light leading-relaxed">
            United in purpose and diverse in mission — three dedicated trusts safeguarding the spiritual, musical, and social heritage of Khelat Bhawan.
          </p>
        </div>
      </section>

      {/* Main Trusts Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {trustsData.map((trust) => {
            const Icon = trust.icon;

            return (
              <div
                key={trust.id}
                className="bg-white rounded-3xl overflow-hidden border border-rosegold-200 shadow-xl"
              >
                {/* Trust Top Header Banner */}
                <div className="bg-burgundy-900 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between border-b border-rosegold-500/40 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-burgundy-950 border border-rosegold-400/60 flex items-center justify-center text-rosegold-300 flex-shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-rosegold-300 font-semibold block">
                        Trust {trust.num} • Established {trust.est}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mt-0.5">
                        {trust.name}
                      </h3>
                      <p className="text-xs text-rosegold-200 mt-1 font-light">
                        {trust.category}
                      </p>
                    </div>
                  </div>

                  <div className="self-start md:self-auto px-4 py-2 rounded-xl bg-burgundy-950/80 border border-rosegold-400/30 text-xs text-rosegold-200 font-medium">
                    Est. {trust.est}
                  </div>
                </div>

                {/* Trust Content Grid */}
                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left Column: Description & Image */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="h-64 rounded-2xl overflow-hidden bg-stone-100 border border-rosegold-200 shadow-inner">
                      <img
                        src={trust.image}
                        alt={trust.name}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                        onClick={() => onOpenLightbox({
                          type: 'image',
                          title: trust.name,
                          desc: trust.desc,
                          src: trust.image
                        })}
                      />
                    </div>

                    <p className="text-stone-700 text-sm leading-relaxed">
                      {trust.desc}
                    </p>
                  </div>

                  {/* Right Column: Achievements & Key Initiatives */}
                  <div className="lg:col-span-7 space-y-8">
                    {/* Notable Achievements */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-burgundy-900 mb-4 flex items-center space-x-2 border-b border-rosegold-200 pb-2">
                        <Award className="w-4 h-4 text-rosegold-600" />
                        <span>Core Achievements & Heritage Preservation</span>
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {trust.keyAchievements.map((item, i) => (
                          <div key={i} className="flex items-start space-x-2.5 text-xs md:text-sm text-stone-700">
                            <CheckCircle className="w-4 h-4 text-rosegold-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Initiatives */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-burgundy-900 mb-4 flex items-center space-x-2 border-b border-rosegold-200 pb-2">
                        <Sparkles className="w-4 h-4 text-rosegold-600" />
                        <span>Active Programs & Initiatives</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {trust.initiatives.map((init, i) => (
                          <div 
                            key={i} 
                            className="p-3 rounded-xl bg-rosegold-50/60 border border-rosegold-200/80 text-xs text-stone-700 flex items-center space-x-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rosegold-500 flex-shrink-0" />
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

        {/* Governance Pull Quote Box */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-burgundy-950 text-white text-center border-2 border-rosegold-500/40 relative overflow-hidden">
          <AlpanaDivider light={true} />
          <blockquote className="font-serif italic text-2xl md:text-3xl text-rosegold-200 max-w-3xl mx-auto my-4 font-light">
            "Through formal trusts and dedicated custodianship, we ensure that the soul, music, and sanctity of Khelat Bhawan remain protected for centuries to come."
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-rosegold-400 font-semibold">
            Pathuria Ghata Ghosh Bari Trust Governance
          </p>
        </div>
      </section>
    </div>
  );
}
