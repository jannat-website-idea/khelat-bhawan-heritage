import React from 'react';
import { Award, Music, Sparkles, Building, HeartHandshake, ChevronRight } from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';

export default function FounderPage({ lang, setActiveTab, onOpenLightbox, content }) {
  const t = content[lang];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5]">
      {/* Header */}
      <section className="py-16 bg-burgundy-950 text-white relative overflow-hidden border-b-2 border-rosegold-500/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,125,101,0.15)_0%,_transparent_75%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-900 border border-rosegold-400/50 text-rosegold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Archival Historical Profile</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.founder.name}
          </h1>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rosegold-300">
            {t.founder.years} • {t.founder.role}
          </p>

          <AlpanaDivider light={true} className="my-2" />
        </div>
      </section>

      {/* Main Profile Article */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Portrait & Stats Card */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white p-3 rounded-2xl border-2 border-rosegold-300 shadow-xl overflow-hidden">
              <img
                src={t.founder.image}
                alt={t.founder.name}
                className="w-full h-[400px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                onClick={() => onOpenLightbox({
                  type: 'image',
                  title: t.founder.name,
                  desc: 'Archival portrait of Babu Khelat Ghosh, founder of Khelat Bhawan.',
                  src: t.founder.image
                })}
              />
              <div className="p-4 text-center">
                <h3 className="font-serif text-xl font-bold text-burgundy-900">
                  {t.founder.name}
                </h3>
                <p className="text-xs text-rosegold-700 uppercase tracking-widest mt-0.5">
                  1775 – 1845
                </p>
                <p className="text-xs text-stone-600 mt-2 italic">
                  Founder & Patriarch of Pathuria Ghata Ghosh Bari
                </p>
              </div>
            </div>

            {/* Factual Highlights Box */}
            <div className="bg-burgundy-900 text-rosegold-100 p-6 rounded-2xl border border-rosegold-400/40 space-y-3 text-xs">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-rosegold-700/60 pb-2">
                Historical Attributes
              </h4>
              <div className="flex items-start space-x-2">
                <Building className="w-4 h-4 text-rosegold-400 flex-shrink-0 mt-0.5" />
                <span>Established Khelat Bhawan at 47 Pathuria Ghata Street in 1845</span>
              </div>
              <div className="flex items-start space-x-2">
                <Music className="w-4 h-4 text-rosegold-400 flex-shrink-0 mt-0.5" />
                <span>Eminent patron of classical Hindustani music and traditional arts</span>
              </div>
              <div className="flex items-start space-x-2">
                <HeartHandshake className="w-4 h-4 text-rosegold-400 flex-shrink-0 mt-0.5" />
                <span>Distinguished philanthropist of 19th-century Bengal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Biography */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-600 block mb-1">
                The Visionary Founder
              </span>
              <h2 className="font-serif text-3xl font-bold text-burgundy-900 leading-tight">
                Architect of a 175-Year Cultural Legacy
              </h2>
            </div>

            <AlpanaDivider className="justify-start py-1" />

            <p className="text-stone-700 text-sm md:text-base leading-relaxed">
              Babu Khelat Ghosh was a prominent 19th-century Bengali aristocrat, successful merchant, and philanthropist who contributed significantly to the socio-cultural fabric of Kolkata during the early Bengal Renaissance.
            </p>

            <p className="text-stone-700 text-sm md:text-base leading-relaxed">
              In 1845, he envisioned and built Khelat Bhawan on Pathuria Ghata Street as a grand family estate that would not only house his family but also serve as a thriving sanctuary for Indian classical music, Sanskrit scholarship, and spiritual devotion.
            </p>

            <div className="p-6 rounded-2xl bg-white border border-rosegold-300 shadow-md">
              <h3 className="font-serif font-bold text-burgundy-900 text-lg mb-2">
                Cultural & Musical Patronage
              </h3>
              <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                Known for his deep appreciation of Hindustani music, Babu Khelat Ghosh hosted legendary ustads, pandits, and classical vocalists at Khelat Bhawan. This rich tradition inspired the subsequent formation of the <em>Khelat Ghosh Memorial Trust</em>, which continues to award and support traditional musicians.
              </p>
            </div>

            <blockquote className="p-6 rounded-2xl bg-rosegold-50 border-l-4 border-rosegold-500 font-serif italic text-burgundy-900 text-base md:text-lg">
              "{t.founder.quote}"
            </blockquote>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-10 border-t border-rosegold-200">
          <button
            onClick={() => setActiveTab('trustees')}
            className="px-8 py-3.5 rounded-lg bg-burgundy-900 hover:bg-burgundy-950 text-white font-semibold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            View Cultural Trusts & Governance
          </button>
        </div>
      </section>
    </div>
  );
}
