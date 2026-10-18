import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { defaultEventsData, isPastEvent, getWhatsAppLink } from '../data/eventsData';
import { getCMSData } from '../data/cmsStore';
import { EVENTS_QUERY } from '../sanity/queries';
import { useSanityLiveQuery } from '../sanity/useSanityLiveQuery';
import { Calendar, Clock, MapPin, Sparkles, MessageCircle, ArrowRight, X, CheckCircle2, Layers, History, CalendarCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

const localizedText = (value, lang, fallback = '') => {
  if (value == null) return fallback;
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value.en ?? Object.values(value).find((entry) => typeof entry === 'string') ?? fallback;
  }
  return String(value);
};

const localizedList = (value, lang) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'object') {
    const list = value[lang] ?? value.en ?? Object.values(value).find(Array.isArray);
    return Array.isArray(list) ? list.filter(Boolean) : [];
  }
  return [];
};

const EventsPage = ({ lang = 'en' }) => {
  const isBn = lang === 'bn';
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'upcoming', 'past'
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const localEvents = (() => {
    const cms = getCMSData();
    return cms?.events && cms.events.length > 0 ? cms.events : defaultEventsData;
  })();
  const {data: sanityEvents, loaded: eventsLoaded} = useSanityLiveQuery(EVENTS_QUERY, []);
  const eventsList = eventsLoaded && Array.isArray(sanityEvents) ? sanityEvents : localEvents;

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!activeModalEvent) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalEvent(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalEvent]);

  // Categorize events dynamically based on current date
  const upcomingEvents = eventsList.filter((event) => !isPastEvent(event));
  const pastEvents = eventsList.filter((event) => isPastEvent(event));

  const categories = [
    { 
      id: 'all', 
      label: { en: 'All Events', bn: 'সকল অনুষ্ঠান' },
      count: eventsList.length,
      icon: Layers
    },
    { 
      id: 'upcoming', 
      label: { en: 'Upcoming', bn: 'আসন্ন অনুষ্ঠান' },
      count: upcomingEvents.length,
      icon: CalendarCheck
    },
    { 
      id: 'past', 
      label: { en: 'Past', bn: 'পূর্ববর্তী' },
      count: pastEvents.length,
      icon: History
    }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? eventsList 
    : selectedCategory === 'upcoming' 
      ? upcomingEvents 
      : pastEvents;

  return (
    <div className="pt-28 pb-20 bg-background text-foreground min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-border/40">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs tracking-[0.2em] uppercase font-sans mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'সাংস্কৃতিক অনুষ্ঠান ও উৎসব' : 'Cultural Gatherings & Festivities'}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground tracking-wide mb-4">
          {isBn ? 'রাজবাড়ির বিশেষ ইভেন্ট ও অনুষ্ঠান' : 'Palace Events & Cultural Calendar'}
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          {isBn
            ? 'খেলাৎ ভবনের দেড় শতাব্দীরও প্রাচীন প্রাঙ্গণে অনুষ্ঠিত শাস্ত্রীয় সঙ্গীত সন্ধ্যা, বাৎসরিক দুর্গাপূজা এবং হেরিটেজ ট্যুরের বিস্তারিত সময়সূচি।'
            : 'Experience 180+ years of living tradition through our curated classical soirees, sacred annual Durga Puja, and exclusive architectural heritage tours.'}
        </p>

        {/* Action Controls: All Events, Upcoming, Past */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-full bg-card/80 border border-border/70 shadow-lg backdrop-blur-md gap-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-md font-bold scale-102'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{cat.label[lang] || cat.label.en}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 px-4 bg-card/40 rounded-2xl border border-border/40 max-w-xl mx-auto">
            <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              {selectedCategory === 'upcoming'
                ? (isBn ? 'বর্তমানে কোনো আসন্ন অনুষ্ঠান তালিকাভুক্ত নেই' : 'No Upcoming Events Scheduled')
                : (isBn ? 'কোনো পূর্ববর্তী অনুষ্ঠান পাওয়া যায়নি' : 'No Past Events Found')}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const isPast = isPastEvent(event);
              const titleText = localizedText(event.title, lang, isBn ? 'শিরোনাম শীঘ্রই আসছে' : 'Event details coming soon');
              const dateText = localizedText(event.date, lang, isBn ? 'তারিখ শীঘ্রই ঘোষণা করা হবে' : 'Date to be announced');
              const timeText = localizedText(event.time, lang, isBn ? 'সময় শীঘ্রই ঘোষণা করা হবে' : 'Time to be announced');
              const locationText = localizedText(event.location, lang, isBn ? 'খেলাৎ ভবন' : 'Khelat Bhawan');
              const badgeText = localizedText(event.badge, lang, isBn ? 'রাজবাড়ির অনুষ্ঠান' : 'Palace Event');
              const descText = localizedText(event.desc, lang, isBn ? 'বিস্তারিত শীঘ্রই যোগ করা হবে।' : 'More information will be added soon.');

              return (
                <div
                  key={event._id || event.id}
                  className={`group bg-card/60 rounded-2xl border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between backdrop-blur-sm ${
                    isPast 
                      ? 'border-border/60 opacity-90 hover:opacity-100 hover:border-stone-500/60' 
                      : 'border-border/50 hover:border-primary/40'
                  }`}
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      {event.image ? (
                        <img
                          src={getAssetUrl(event.image)}
                          alt={titleText}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#4a171b] via-[#2a100e] to-[#100807]" aria-hidden="true" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      {/* Left Badge: Cultural Category */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full bg-primary text-primary-foreground shadow-md backdrop-blur-sm">
                          {badgeText}
                        </span>
                      </div>

                      {/* Right Status Badge: Strictly "PAST" or "UPCOMING" */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {isPast ? (
                          <span className="px-3 py-1 text-[11px] uppercase tracking-wider font-bold rounded-full bg-stone-800/95 text-stone-200 border border-stone-500/50 shadow-md backdrop-blur-md">
                            {isBn ? 'পূর্ববর্তী ইভেন্ট' : 'Past'}
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-[11px] uppercase tracking-wider font-bold rounded-full bg-emerald-800/90 text-emerald-100 border border-emerald-500/40 shadow-md backdrop-blur-md">
                            {isBn ? 'আসন্ন ইভেন্ট' : 'Upcoming'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-col gap-2 mb-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 shrink-0 ${isPast ? 'text-stone-400' : 'text-primary'}`} />
                          <span className={isPast ? 'text-stone-300' : 'text-foreground font-medium'}>{dateText}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary shrink-0" />
                          <span>{timeText}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span>{locationText}</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-foreground font-semibold line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                        {titleText}
                      </h3>

                      <p className="text-muted-foreground text-xs sm:text-sm font-sans line-clamp-3 leading-relaxed mb-4">
                        {descText}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 pt-0 border-t border-border/30 flex items-center justify-between gap-3 mt-auto">
                    <button
                      onClick={() => setActiveModalEvent(event)}
                      className="text-xs uppercase tracking-wider text-primary font-semibold hover:underline flex items-center gap-1 py-2 cursor-pointer"
                    >
                      {isBn ? 'বিস্তারিত দেখুন' : 'View Details'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {!isPast ? (
                      <a
                        href={getWhatsAppLink(event.whatsappNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-sans font-semibold tracking-wide transition-all shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{isBn ? 'হোয়াটসঅ্যাপ অনুসন্ধান' : 'Click to Enquire'}</span>
                      </a>
                    ) : (
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-sans font-medium px-2 py-1">
                        {isBn ? 'অনুষ্ঠান সমাপ্ত' : 'Event Concluded'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Event Details Modal mounted cleanly via Portal */}
      {activeModalEvent && createPortal(
        <div 
          className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalEvent(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#140b08] text-[#f5efe6] border border-[#d8ae62]/50 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Floating Close Button */}
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#761628] hover:bg-[#8a2034] text-white border border-[#d8ae62] flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 hover:rotate-90 active:scale-95 cursor-pointer"
              aria-label="Close modal"
              title="Close Event Details"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
              {activeModalEvent.image ? (
                <img
                  src={getAssetUrl(activeModalEvent.image)}
                  alt={localizedText(activeModalEvent.title, lang, 'Event')}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#4a171b] via-[#2a100e] to-[#100807]" aria-hidden="true" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#140b08] via-transparent to-black/50" />
              
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full bg-[#8a2034] text-white border border-[#d8ae62]/40 shadow-md">
                  {localizedText(activeModalEvent.badge, lang, isBn ? 'রাজবাড়ির অনুষ্ঠান' : 'Palace Event')}
                </span>
                {isPastEvent(activeModalEvent) ? (
                  <span className="px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-full bg-stone-800 text-stone-200 border border-stone-500/50 shadow-md">
                    {isBn ? 'পূর্ববর্তী ইভেন্ট' : 'Past Event'}
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-full bg-emerald-800 text-emerald-100 border border-emerald-500/50 shadow-md">
                    {isBn ? 'আসন্ন ইভেন্ট' : 'Upcoming'}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-wide">
                {localizedText(activeModalEvent.title, lang, isBn ? 'অনুষ্ঠান' : 'Event')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/5 border border-[#d8ae62]/30 text-xs text-[#d8ae62]">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#d8ae62] shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#f0e8d8]/60 font-medium">
                      {isBn ? 'তারিখ' : 'Date'}
                    </div>
                    <div className="text-white font-semibold">
                      {localizedText(activeModalEvent.date, lang, isBn ? 'ঘোষণা করা হবে' : 'To be announced')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#d8ae62] shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#f0e8d8]/60 font-medium">
                      {isBn ? 'সময়' : 'Time'}
                    </div>
                    <div className="text-white font-semibold">
                      {localizedText(activeModalEvent.time, lang, isBn ? 'ঘোষণা করা হবে' : 'To be announced')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d8ae62] shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#f0e8d8]/60 font-medium">
                      {isBn ? 'স্থান' : 'Location'}
                    </div>
                    <div className="text-white font-semibold">
                      {localizedText(activeModalEvent.location, lang, isBn ? 'খেলাৎ ভবন' : 'Khelat Bhawan')}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider font-sans font-semibold text-[#d8ae62] mb-2">
                  {isBn ? 'অনুষ্ঠানের বিবরণ' : 'Event Overview'}
                </h3>
                <p className="text-[#e2d5c3] text-sm sm:text-base leading-relaxed font-sans">
                  {localizedText(activeModalEvent.desc, lang, isBn ? 'বিস্তারিত শীঘ্রই যোগ করা হবে।' : 'More information will be added soon.')}
                </p>
              </div>

              {localizedList(activeModalEvent.highlights, lang).length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-sans font-semibold text-[#d8ae62] mb-3">
                    {isBn ? 'মূল আকর্ষণসমূহ' : 'Key Highlights'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {localizedList(activeModalEvent.highlights, lang).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#f5efe6]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalEvent.galleryImages && activeModalEvent.galleryImages.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-sans font-semibold text-[#d8ae62] mb-3">
                    {isBn ? 'অনুষ্ঠানের আলোকচিত্র ও মহাফেজখানা' : 'Event Photography & Venue Highlights'}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {activeModalEvent.galleryImages.slice(0, 4).map((imgUrl, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden border border-white/20 bg-black/40">
                        <img src={getAssetUrl(imgUrl)} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/15">
                <p className="text-xs text-[#f0e8d8]/70 text-center sm:text-left">
                  {!isPastEvent(activeModalEvent)
                    ? (isBn ? 'আসন সংরক্ষণের জন্য আমাদের হোয়াটসঅ্যাপ হেল্পডেস্কে যোগাযোগ করুন (+91 98310 93021)।' : 'For invitations, reservations, or bespoke inquiries, connect via WhatsApp (+91 98310 93021).')
                    : (isBn ? 'এই অনুষ্ঠানটি সম্পন্ন হয়েছে। আর্কাইভ এবং স্মারক তথ্যের জন্য আমাদের সাথে যোগাযোগ করতে পারেন।' : 'This event has concluded. For archival inquiries, please contact estate management.')}
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setActiveModalEvent(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-all border border-white/20 cursor-pointer"
                  >
                    {isBn ? 'বন্ধ করুন' : 'Close'}
                  </button>
                  {!isPastEvent(activeModalEvent) && (
                    <a
                      href={getWhatsAppLink(activeModalEvent.whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isBn ? 'হোয়াটসঅ্যাপ' : 'Click to Enquire'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default EventsPage;
