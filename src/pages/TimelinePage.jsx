import React from 'react';
import { Calendar, Sparkles, Clock, MapPin, ChevronRight } from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';

export default function TimelinePage({ lang, setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];

  const milestones = [
    {
      year: "1845",
      badge: "Foundation of Khelat Bhawan",
      title: "Establishment of Pathuria Ghata Ghosh Bari",
      desc: "Babu Khelat Ghosh laid the foundation of this majestic heritage mansion at 47 Pathuria Ghata Street, designing a grand estate blending classical neoclassical columns with traditional Bengali courtyard architecture.",
      detail: "The foundation stone marked the beginning of seven generations of cultural patronship, music, and philanthropy in North Kolkata.",
      image: "/images/SDP_0344.jpg"
    },
    {
      year: "1855",
      badge: "170+ Years Continuous Tradition",
      title: "Inauguration of the Sacred Durga Puja",
      desc: "The Ghosh family initiated the annual Durga Puja and Jagadhatri Puja with traditional rituals, establishing a sacred tradition that continues uninterrupted to this day.",
      detail: "The family deities Lakshmi Narayan, Gopal, and Radha Krishna were enshrined, initiating daily Nitya Seva under the dedicated trust.",
      image: "/images/unnamed_6.webp"
    },
    {
      year: "1881",
      badge: "Divine Sanctification",
      title: "Sri Ramakrishna Paramhansa's Historic Visit",
      desc: "The revered mystic and saint Sri Ramakrishna Paramhansa visited and blessed Khelat Bhawan with his divine presence, forever consecrating the house as a sacred spiritual landmark.",
      detail: "This historic visit elevated the spiritual prominence of Khelat Bhawan, attracting devotees and scholars across Bengal.",
      image: "/images/rk01.png"
    },
    {
      year: "1950s",
      badge: "Patronage of Classical Music",
      title: "Establishment of Khelat Ghosh Memorial Trust",
      desc: "The family formalized the Khelat Ghosh Memorial Trust to institutionalize support for classical Hindustani musicians, organize baithaks and concerts, and preserve archival musical recordings.",
      detail: "The trust established annual awards and stipends for master artists, preserving Bengal's rich musical heritage.",
      image: "/images/SDP_0273.jpg"
    },
    {
      year: "2000+",
      badge: "Arts & Community Welfare",
      title: "Formation of Artist Nectar Council of Culture",
      desc: "To expand cultural reach, the sixth generation established the Artist Nectar Council of Culture, focusing on performing arts, social service, children's education, and community healthcare awareness.",
      detail: "The council opened the mansion's halls to collaborative performances, workshops, and charitable initiatives.",
      image: "/images/unnamed_12.webp"
    },
    {
      year: "Present",
      badge: "Living Heritage",
      title: "Contemporary Custodianship & Global Preservation",
      desc: "Today, under the seventh generation, Khelat Bhawan stands as an active cultural hub, hosting auspicious wedding ceremonies, period cinema shoots, classical concerts, and heritage visitors while maintaining strict authenticity.",
      detail: "Continuous digital archiving and sustainable conservation ensure the 175-year legacy remains vibrant for generations to come.",
      image: "/images/unnamed_3.webp"
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5]">
      {/* Header */}
      <section className="py-16 bg-burgundy-950 text-white relative overflow-hidden border-b-2 border-rosegold-500/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,125,101,0.15)_0%,_transparent_75%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-900 border border-rosegold-400/50 text-rosegold-300 text-xs font-semibold uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />
            <span>Chronicle of 175+ Years</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.nav.timeline}
          </h1>

          <AlpanaDivider light={true} className="my-2" />

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-rosegold-200/90 font-light leading-relaxed">
            Journey through 175+ years of cultural preservation, spiritual devotion, and community service in North Kolkata.
          </p>
        </div>
      </section>

      {/* Timeline Journey */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical Central Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rosegold-300 via-rosegold-500 to-rosegold-300 opacity-60" />

          <div className="space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Box */}
                  <div className="w-full md:w-5/12 mb-6 md:mb-0">
                    <div className="bg-white rounded-2xl p-6 border border-rosegold-200 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                      <div className="h-48 rounded-xl overflow-hidden mb-4 bg-stone-100 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => onOpenLightbox({
                            type: 'image',
                            title: `${item.year} — ${item.title}`,
                            desc: item.desc,
                            src: item.image
                          })}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-burgundy-900 text-rosegold-200 border border-rosegold-400">
                            {item.badge}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-rosegold-600 font-serif font-bold text-2xl mb-1">
                        <span>{item.year}</span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-burgundy-900 mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {item.desc}
                      </p>

                      <div className="p-3 bg-rosegold-50/80 rounded-lg border-l-2 border-rosegold-400 text-[11px] text-stone-700 italic">
                        {item.detail}
                      </div>
                    </div>
                  </div>

                  {/* Center Year Badge (Desktop) */}
                  <div className="hidden md:flex w-2/12 justify-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-burgundy-900 border-2 border-rosegold-400 flex items-center justify-center text-rosegold-200 shadow-xl text-xs font-serif font-bold">
                      {item.year.includes("+") ? "2000" : item.year === "Present" ? "NOW" : item.year.slice(2)}
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation Link */}
        <div className="text-center pt-16 mt-12 border-t border-rosegold-200">
          <button
            onClick={() => setActiveTab('founder')}
            className="px-8 py-3.5 rounded-lg bg-burgundy-900 hover:bg-burgundy-950 text-white font-semibold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            Read About Founder Babu Khelat Ghosh
          </button>
        </div>
      </section>
    </div>
  );
}
