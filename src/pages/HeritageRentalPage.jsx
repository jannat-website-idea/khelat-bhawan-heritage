import React from 'react';
import { Sparkles, Calendar, Check, Camera, Music, Heart, Building, Phone, Mail } from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';

export default function HeritageRentalPage({ lang, onOpenBooking, onOpenLightbox, content }) {
  const t = content[lang];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5]">
      {/* Header */}
      <section className="py-16 bg-burgundy-950 text-white relative overflow-hidden border-b-2 border-rosegold-500/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,125,101,0.15)_0%,_transparent_75%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-900 border border-rosegold-400/50 text-rosegold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Heritage Venue Services</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.rental.heading}
          </h1>

          <AlpanaDivider light={true} className="my-2" />

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-rosegold-200/90 font-light leading-relaxed">
            {t.rental.desc}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {t.rental.services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl overflow-hidden border border-rosegold-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-64 overflow-hidden relative bg-stone-100">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                    onClick={() => onOpenLightbox({
                      type: 'image',
                      title: srv.title,
                      desc: srv.desc,
                      src: srv.image
                    })}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-burgundy-950/90 text-rosegold-200 border border-rosegold-400/60 backdrop-blur-md">
                      {srv.pricing}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-burgundy-900 leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="pt-4 border-t border-stone-100 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-burgundy-900 block mb-2">
                      Estate Inclusions & Highlights:
                    </span>
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-rosegold-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-xl bg-rosegold-500 hover:bg-rosegold-600 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Enquire For This Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Official Coordination Note */}
        <div className="mt-16 p-8 rounded-2xl bg-[#F4ECE0] border border-rosegold-300 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-burgundy-900">
              Need Tailored Scheduling or a Site Visit?
            </h4>
            <p className="text-xs md:text-sm text-stone-600">
              Our estate managers are available to coordinate heritage visits and dates.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+919831093021"
              className="px-5 py-2.5 rounded-lg bg-burgundy-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-burgundy-800 transition-colors flex items-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5 text-rosegold-300" />
              <span>+91 98310 93021</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-lg bg-rosegold-500 text-white text-xs font-semibold uppercase tracking-wider hover:bg-rosegold-600 transition-colors"
            >
              Make Enquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
