import React from 'react';
import { Check, Calendar } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

export default function HeritageRentalPage({ lang, onOpenBooking, onOpenLightbox, content }) {
  const t = content[lang];

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title={lang === 'bn' ? 'ঐতিহাসিক প্রাঙ্গণ ও ভেন্যু পরিষেবা' : 'Heritage Venue Rental'}
          subtitle={lang === 'bn'
            ? 'আপনার বিশেষ মুহূর্ত ও স্মরণীয় অনুষ্ঠানকে রাজকীয় রূপ দিতে ১৭৫ বছরের প্রাচীন বাঙালি আভিজাত্যের স্থান'
            : 'Experience the grandeur of 175-year-old Bengali heritage for your special occasions'}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16">
          {t.rental.services.map((srv) => (
            <div
              key={srv.id}
              className="bg-card/70 rounded-sm border border-border hover:border-accent transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="h-60 overflow-hidden bg-black relative">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                    onClick={() => onOpenLightbox({
                      type: 'image',
                      title: srv.title,
                      desc: srv.desc,
                      src: srv.image
                    })}
                  />
                  <div className="absolute top-3 right-3 bg-navy/85 backdrop-blur-md px-3.5 py-1 text-rose-gold text-xs uppercase font-body font-semibold tracking-wider rounded-sm">
                    {srv.pricing}
                  </div>
                </div>

                <div className="p-8 space-y-4 text-left">
                  <h3 className="font-serif text-2xl font-bold text-foreground leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="pt-4 border-t border-border space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-body font-semibold block mb-2">
                      Estate Inclusions:
                    </span>
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-foreground/80 font-body">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 bg-accent text-accent-foreground text-xs tracking-[0.2em] uppercase font-body font-semibold hover:bg-matte-red transition-colors rounded-sm text-center"
                >
                  {lang === 'bn' ? 'বুকিং অনুসন্ধান পাঠান' : 'Enquire For This Venue'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
