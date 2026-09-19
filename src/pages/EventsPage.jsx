import React, { useState } from 'react';
import { eventsData, getWhatsAppLink } from '../data/eventsData';
import { Calendar, Clock, MapPin, Sparkles, MessageCircle, ArrowRight, X, CheckCircle2 } from 'lucide-react';

const EventsPage = ({ lang = 'en', setActiveTab, onOpenBooking }) => {
  const language = lang;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const categories = [
    { id: 'all', label: { en: 'All Events', bn: 'সকল অনুষ্ঠান' } },
    { id: 'upcoming', label: { en: 'Upcoming', bn: 'আসন্ন অনুষ্ঠান' } },
    { id: 'featured', label: { en: 'Featured Galas', bn: 'বিশেষ উৎসব' } },
    { id: 'past', label: { en: 'Past Archives', bn: 'পূর্ববর্তী স্মৃতি' } }
  ];

  const filteredEvents = eventsData.filter((event) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'featured') return event.featured;
    return event.category === selectedCategory;
  });

  return (
    <div className="pt-28 pb-20 bg-background text-foreground min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-border/40">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs tracking-[0.2em] uppercase font-sans mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'সাংস্কৃতিক অনুষ্ঠান ও উৎসব' : 'Cultural Gatherings & Festivities'}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground tracking-wide mb-4">
          {language === 'bn' ? 'রাজবাড়ির বিশেষ ইভেন্ট ও অনুষ্ঠান' : 'Palace Events & Cultural Calendar'}
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          {language === 'bn'
            ? 'খেলাৎ ভবনের দেড় শতাব্দীরও প্রাচীন প্রাঙ্গণে অনুষ্ঠিত শাস্ত্রীয় সঙ্গীত সন্ধ্যা, বাৎসরিক দুর্গাপূজা এবং হেরিটেজ ট্যুরের বিস্তারিত সময়সূচি।'
            : 'Experience over 170 years of living tradition through our curated classical soirees, sacred annual Durga Puja, and exclusive architectural heritage tours.'}
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-md font-semibold'
                  : 'bg-card/70 border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {cat.label[language] || cat.label.en}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-card/60 rounded-2xl border border-border/50 overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-500 flex flex-col justify-between backdrop-blur-sm"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={event.image}
                    alt={event.title[language] || event.title.en}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full bg-primary text-primary-foreground shadow-md backdrop-blur-sm">
                      {event.badge[language] || event.badge.en}
                    </span>
                  </div>
                  {event.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-full bg-amber-500 text-black shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {language === 'bn' ? 'বিশেষ উৎসব' : 'Featured'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-col gap-2 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span>{event.date[language] || event.date.en}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span>{event.time[language] || event.time.en}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>{event.location[language] || event.location.en}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-foreground font-semibold line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                    {event.title[language] || event.title.en}
                  </h3>

                  <p className="text-muted-foreground text-xs sm:text-sm font-sans line-clamp-3 leading-relaxed mb-4">
                    {event.desc[language] || event.desc.en}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-border/30 flex items-center justify-between gap-3 mt-auto">
                <button
                  onClick={() => setActiveModalEvent(event)}
                  className="text-xs uppercase tracking-wider text-primary font-medium hover:underline flex items-center gap-1 py-2"
                >
                  {language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppLink(event.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-sans tracking-wide transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ অনুসন্ধান' : 'Click to Enquire'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Details Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-card border border-border/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-muted">
              <img
                src={activeModalEvent.image}
                alt={activeModalEvent.title[language] || activeModalEvent.title.en}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full bg-primary text-primary-foreground">
                  {activeModalEvent.badge[language] || activeModalEvent.badge.en}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-semibold mb-4">
                {activeModalEvent.title[language] || activeModalEvent.title.en}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-background/50 border border-border/40 mb-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {language === 'bn' ? 'তারিখ' : 'Date'}
                    </div>
                    <div className="text-foreground font-medium">{activeModalEvent.date[language] || activeModalEvent.date.en}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {language === 'bn' ? 'সময়' : 'Time'}
                    </div>
                    <div className="text-foreground font-medium">{activeModalEvent.time[language] || activeModalEvent.time.en}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {language === 'bn' ? 'স্থান' : 'Location'}
                    </div>
                    <div className="text-foreground font-medium">{activeModalEvent.location[language] || activeModalEvent.location.en}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider font-sans font-semibold text-primary mb-2">
                  {language === 'bn' ? 'অনুষ্ঠানের বিবরণ' : 'Event Overview'}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {activeModalEvent.desc[language] || activeModalEvent.desc.en}
                </p>
              </div>

              {activeModalEvent.highlights && (
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-wider font-sans font-semibold text-primary mb-3">
                    {language === 'bn' ? 'মূল আকর্ষণসমূহ' : 'Key Highlights'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(activeModalEvent.highlights[language] || activeModalEvent.highlights.en).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40">
                <p className="text-xs text-muted-foreground text-center sm:text-left">
                  {language === 'bn'
                    ? 'আসন সংরক্ষণের জন্য আমাদের হোয়াটসঅ্যাপ হেল্পডেস্কে যোগাযোগ করুন।'
                    : 'For invitations, reservations, or bespoke inquiries, please connect via WhatsApp.'}
                </p>
                <a
                  href={getWhatsAppLink(activeModalEvent.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন' : 'Click to Enquire (WhatsApp)'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
