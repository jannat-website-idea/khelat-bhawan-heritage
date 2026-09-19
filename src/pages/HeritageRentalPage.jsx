import React, { useState } from 'react';
import { Check, Calendar as CalendarIcon, Clock, Mail, ShieldCheck, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { getAssetUrl } from '../utils/assetHelper';
import { getBlockedDates, isDateBlocked, isPastDate } from '../data/bookingData';

export default function HeritageRentalPage({ lang = 'en', onOpenBooking, onOpenLightbox, content }) {
  const t = content[lang];
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const blockedDates = getBlockedDates();

  const today = new Date();
  const targetDate = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const monthName = targetDate.toLocaleString(lang === 'bn' ? 'bn-IN' : 'en-US', { month: 'long', year: 'numeric' });
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen text-foreground">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <SectionHeader
          title={lang === 'bn' ? 'রিজার্ভেশন ও হেরিটেজ বুকিং' : 'Reservations & Heritage Bookings'}
          subtitle={lang === 'bn'
            ? 'আপনার বিশেষ মুহূর্ত ও স্মরণীয় অনুষ্ঠানকে রাজকীয় রূপ দিতে ১৭০ বছরেরও প্রাচীন ঐতিহ্যবাহী বাঙালি আভিজাত্যের স্থান'
            : 'Experience the grandeur of 170+ years of living heritage for aristocratic soirees, weddings, and cultural celebrations'}
        />

        {/* Live Reservation Calendar Preview Section */}
        <section className="my-12 p-6 sm:p-8 bg-card/60 border border-border/70 rounded-3xl backdrop-blur-sm shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs uppercase tracking-widest font-sans font-semibold">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'লাইভ বুকিং ক্যালেন্ডার' : 'Live Availability Calendar'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                {lang === 'bn' ? 'উপলব্ধ তারিখ ও বুকিং অবস্থা' : 'Check Available Dates & Reserve'}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed">
                {lang === 'bn'
                  ? 'লাল রঙের চিহ্নিত তারিখগুলি সংরক্ষিত বা উৎসবের কারণে ব্লক করা। যে কোনো উপলব্ধ তারিখের জন্য এখনই অনুসন্ধান পাঠান।'
                  : 'Dates highlighted in red are reserved or blocked for estate festivals. Click below to initiate your formal reservation with our concierge team.'}
              </p>
              
              <div className="space-y-2 pt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'bn' ? '৪৮ ঘণ্টার মধ্যে নিশ্চিতকরণ প্রতিক্রিয়া' : 'Guaranteed 48-hour response SLA'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{lang === 'bn' ? 'দ্বৈত ইমেল নোটিফিকেশন সিস্টেম' : 'Dual automated email dispatch system'}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase hover:bg-primary/90 transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>{lang === 'bn' ? 'তারিখ বুক করুন' : 'Book a Date Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Calendar */}
            <div className="lg:col-span-7 bg-background/80 p-5 rounded-2xl border border-border/80 shadow-inner">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/40">
                <span className="font-serif text-base sm:text-lg font-semibold text-foreground">
                  {monthName}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentMonthOffset <= 0}
                    onClick={() => setCurrentMonthOffset(prev => Math.max(0, prev - 1))}
                    className="px-2.5 py-1 text-xs border border-border/60 rounded-lg hover:bg-card disabled:opacity-30"
                  >
                    ← {lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}
                  </button>
                  <button
                    disabled={currentMonthOffset >= 6}
                    onClick={() => setCurrentMonthOffset(prev => prev + 1)}
                    className="px-2.5 py-1 text-xs border border-border/60 rounded-lg hover:bg-card disabled:opacity-30"
                  >
                    {lang === 'bn' ? 'পরবর্তী' : 'Next'} →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`cal-empty-${i}`} className="h-8 sm:h-10" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dateObj = new Date(year, month, day);
                  const isPast = isPastDate(dateObj);
                  const isBlocked = isDateBlocked(formatted, blockedDates);

                  let badgeColor = 'bg-card border-border/40 text-foreground hover:border-primary/60';
                  if (isPast) {
                    badgeColor = 'bg-muted/20 border-transparent text-muted-foreground/30';
                  } else if (isBlocked) {
                    badgeColor = 'bg-red-950/30 border-red-800/40 text-red-400';
                  }

                  return (
                    <div
                      key={`cal-day-${day}`}
                      onClick={() => !isPast && !isBlocked && onOpenBooking()}
                      className={`h-8 sm:h-10 rounded-lg border text-xs font-sans flex flex-col items-center justify-center transition-all cursor-pointer ${badgeColor}`}
                    >
                      <span>{day}</span>
                      {isBlocked && !isPast && (
                        <span className="text-[7px] uppercase tracking-tighter text-red-400 leading-none">
                          {lang === 'bn' ? 'বুকড' : 'Booked'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-3 mt-2 border-t border-border/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Booked / Festivities
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
          {t.rental.services.map((srv) => (
            <div
              key={srv.id}
              className="bg-card/70 rounded-3xl border border-border/60 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-sm"
            >
              <div>
                <div className="h-64 sm:h-72 overflow-hidden bg-black relative group">
                  <img
                    src={getAssetUrl(srv.image)}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                    onClick={() => onOpenLightbox({
                      type: 'image',
                      title: srv.title,
                      desc: srv.desc,
                      src: srv.image
                    })}
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 text-primary text-xs uppercase font-sans font-semibold tracking-wider rounded-full border border-primary/30">
                    {srv.pricing}
                  </div>
                </div>

                <div className="p-8 space-y-4 text-left">
                  <h3 className="font-serif text-2xl font-bold text-foreground leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="pt-4 border-t border-border/40 space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-sans font-semibold block mb-2">
                      Estate Inclusions:
                    </span>
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-foreground/80 font-sans">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={() => onOpenBooking(srv.title)}
                  className="w-full py-3.5 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-primary/90 transition-all rounded-xl text-center shadow-md"
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
