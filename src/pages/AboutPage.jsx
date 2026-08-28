import React from 'react';
import { 
  Sparkles, 
  Award, 
  Compass, 
  Heart, 
  ShieldCheck, 
  Clock, 
  MapPin,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';

export default function AboutPage({ lang, setActiveTab, onOpenBooking, onOpenLightbox, content }) {
  const t = content[lang];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5]">
      {/* Page Header */}
      <section className="py-16 bg-burgundy-950 text-white relative overflow-hidden border-b-2 border-rosegold-500/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,125,101,0.15)_0%,_transparent_75%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-900 border border-rosegold-400/50 text-rosegold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pathuria Ghata Ghosh Bari • Est. 1845</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.nav.heritage}
          </h1>

          <AlpanaDivider light={true} className="my-2" />

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-rosegold-200/90 font-light leading-relaxed">
            A 175-year journey of preserving Bengali heritage, classical arts, spiritual devotion, and community stewardship.
          </p>
        </div>
      </section>

      {/* Main Narrative & History */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-600 block mb-2">
                Our Origin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-900">
                The Legacy of Pathuria Ghata Ghosh Bari
              </h2>
            </div>

            <AlpanaDivider className="justify-start py-1" />

            <p className="text-stone-700 text-sm md:text-base leading-relaxed">
              Established in 1845 by the visionary businessman and philanthropist Babu Khelat Ghosh, Khelat Bhawan stands proudly in North Kolkata as a shining testament to 19th-century Bengali aristocracy and cultural patronage.
            </p>

            <p className="text-stone-700 text-sm md:text-base leading-relaxed">
              For over 175 years, this magnificent mansion has been the heart of cultural, religious, and musical activities in Kolkata. The estate was founded with a profound devotion to preserving Bengali classical arts, traditional festivities, and spiritual service.
            </p>

            <div className="p-5 rounded-xl bg-[#F4ECE0] border-l-4 border-rosegold-500">
              <h4 className="font-serif font-bold text-burgundy-900 text-base mb-1">
                Sanctified by Sri Ramakrishna Paramhansa (1881)
              </h4>
              <p className="text-xs md:text-sm text-stone-700 leading-relaxed">
                In 1881, the great mystic and saint Sri Ramakrishna Paramhansa visited and blessed Khelat Bhawan with his divine presence, forever elevating the spiritual sanctity of this historic house.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/SDP_0282.jpg"
                alt="Heritage Architecture"
                className="w-full h-[450px] object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                onClick={() => onOpenLightbox({
                  type: 'image',
                  title: 'Colonnaded Arches of Khelat Bhawan',
                  desc: 'The timeless 19th-century architecture of Pathuria Ghata Ghosh Bari.',
                  src: '/images/SDP_0282.jpg'
                })}
              />
            </div>
          </div>
        </div>

        {/* Seven Generations of Custodians */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-600 block mb-2">
              {t.lineage.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900">
              {t.lineage.heading}
            </h2>
            <AlpanaDivider className="my-3" />
            <p className="text-stone-600 text-sm md:text-base">
              {t.lineage.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {t.lineage.generations.map((gen, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-rosegold-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 rounded-xl overflow-hidden mb-4 bg-stone-100">
                    <img
                      src={gen.image}
                      alt={gen.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-rosegold-600 font-semibold mb-1">
                    <span>{gen.gen}</span>
                    <span className="text-stone-500">{gen.period}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-burgundy-900 mb-1">
                    {gen.name}
                  </h3>

                  <p className="text-xs font-semibold text-rosegold-700 mb-3">
                    {gen.role}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {gen.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-burgundy-950 text-white border-2 border-rosegold-500/40 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-rosegold-500/20 border border-rosegold-400 flex items-center justify-center text-rosegold-300 mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-rosegold-200 mb-3">
              Our Mission
            </h3>
            <p className="text-sm text-rosegold-100/90 leading-relaxed font-light">
              To preserve, promote, and perpetuate Bengali cultural heritage through religious devotion, classical arts, and community service while maintaining the sanctity and traditions of our 175-year legacy.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-rosegold-300 shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-rosegold-100 border border-rosegold-400 flex items-center justify-center text-rosegold-700 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-burgundy-900 mb-3">
              Our Vision
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              To be a beacon of Bengali culture that bridges tradition with modernity, inspiring future generations to embrace their heritage while fostering unity, devotion, and artistic excellence in our community.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t border-rosegold-200">
          <button
            onClick={() => setActiveTab('timeline')}
            className="px-8 py-3.5 rounded-lg bg-rosegold-500 hover:bg-rosegold-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            Explore Historical Timeline
          </button>
        </div>
      </section>
    </div>
  );
}
