import React, { useState, useEffect } from 'react';
import { getStoredEvents, saveStoredEvents, resetStoredEvents, isPastEvent, getWhatsAppLink } from '../data/eventsData';
import { Calendar, Clock, MapPin, Sparkles, MessageCircle, ArrowRight, X, CheckCircle2, Sliders, History, CalendarCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';
import EventManagerModal from '../components/EventManagerModal';

const EventsPage = ({ lang = 'en', setActiveTab, onOpenBooking }) => {
  const isBn = lang === 'bn';
  const [eventsList, setEventsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('upcoming'); // 'upcoming' or 'past'
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  // Load events from storage on mount
  useEffect(() => {
    setEventsList(getStoredEvents());
  }, []);

  const handleSaveEvent = (savedEvent) => {
    setEventsList((prevEvents) => {
      const exists = prevEvents.some((e) => e.id === savedEvent.id);
      let updated;
      if (exists) {
        updated = prevEvents.map((e) => (e.id === savedEvent.id ? savedEvent : e));
      } else {
        updated = [savedEvent, ...prevEvents];
      }
      saveStoredEvents(updated);
      return updated;
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEventsList((prevEvents) => {
      const updated = prevEvents.filter((e) => e.id !== eventId);
      saveStoredEvents(updated);
      return updated;
    });
  };

  const handleResetDefaults = () => {
    const defaults = resetStoredEvents();
    setEventsList(defaults);
  };

  // Categorize events dynamically based on their date
  const upcomingEvents = eventsList.filter((event) => !isPastEvent(event));
  const pastEvents = eventsList.filter((event) => isPastEvent(event));

  const categories = [
    { 
      id: 'upcoming', 
      label: { en: 'Upcoming Events', bn: 'আসন্ন অনুষ্ঠান' },
      count: upcomingEvents.length,
      icon: CalendarCheck
    },
    { 
      id: 'past', 
      label: { en: 'Past Events', bn: 'পূর্ববর্তী অনুষ্ঠান' },
      count: pastEvents.length,
      icon: History
    }
  ];

  const filteredEvents = selectedCategory === 'upcoming' ? upcomingEvents : pastEvents;

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
            : 'Experience over 170 years of living tradition through our curated classical soirees, sacred annual Durga Puja, and exclusive architectural heritage tours.'}
        </p>

        {/* Action Controls & Two Primary Sections (Upcoming / Past) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <div className="inline-flex p-1.5 rounded-full bg-card/80 border border-border/70 shadow-lg backdrop-blur-md">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans tracking-wider transition-all duration-300 ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-md font-bold scale-102'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label[lang] || cat.label.en}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Client Admin Event Management Trigger */}
          <button
            onClick={() => setIsManagerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-sans tracking-wider bg-card/80 hover:bg-[#8a2034] text-[#d8ae62] hover:text-white border border-[#d8ae62]/50 transition-all shadow-md hover:scale-105"
            title="Manage, Edit, Add or Delete Events"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isBn ? 'ইভেন্ট ম্যানেজমেন্ট (অ্যাডমিন)' : 'Manage Events (Admin)'}</span>
          </button>
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
            <p className="text-muted-foreground text-xs sm:text-sm mb-6">
              {isBn
                ? 'নতুন ইভেন্ট যোগ করতে উপরের "ইভেন্ট ম্যানেজমেন্ট" বাটনে ক্লিক করুন।'
                : 'Click "Manage Events (Admin)" above to add new events or update the cultural calendar.'}
            </p>
            <button
              onClick={() => setIsManagerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'নতুন ইভেন্ট যোগ করুন' : '+ Add New Event'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const isPast = isPastEvent(event);
              const titleText = typeof event.title === 'object' ? (event.title[lang] || event.title.en) : event.title;
              const dateText = typeof event.date === 'object' ? (event.date[lang] || event.date.en) : event.date;
              const timeText = typeof event.time === 'object' ? (event.time[lang] || event.time.en) : event.time;
              const locationText = typeof event.location === 'object' ? (event.location[lang] || event.location.en) : event.location;
              const badgeText = typeof event.badge === 'object' ? (event.badge[lang] || event.badge.en) : event.badge;
              const descText = typeof event.desc === 'object' ? (event.desc[lang] || event.desc.en) : event.desc;

              return (
                <div
                  key={event.id}
                  className={`group bg-card/60 rounded-2xl border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between backdrop-blur-sm ${
                    isPast 
                      ? 'border-border/60 opacity-90 hover:opacity-100 hover:border-stone-500/60' 
                      : 'border-border/50 hover:border-primary/40'
                  }`}
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={getAssetUrl(event.image)}
                        alt={titleText}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      {/* Left Badge */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full bg-primary text-primary-foreground shadow-md backdrop-blur-sm">
                          {badgeText}
                        </span>
                      </div>

                      {/* Right Status Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {isPast ? (
                          <span className="px-3 py-1 text-[11px] uppercase tracking-wider font-bold rounded-full bg-stone-800/95 text-stone-200 border border-stone-500/50 shadow-md backdrop-blur-md">
                            {isBn ? 'অনুষ্ঠিত ইভেন্ট' : 'Past Event'}
                          </span>
                        ) : event.featured ? (
                          <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold rounded-full bg-amber-500 text-black shadow-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {isBn ? 'বিশেষ উৎসব' : 'Featured'}
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold rounded-full bg-emerald-800/90 text-emerald-100 border border-emerald-500/40 shadow-md">
                            {isBn ? 'আসন্ন' : 'Upcoming'}
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
                      className="text-xs uppercase tracking-wider text-primary font-semibold hover:underline flex items-center gap-1 py-2"
                    >
                      {isBn ? 'বিস্তারিত দেখুন' : 'View Details'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {!isPast ? (
                      <a
                        href={getWhatsAppLink(event.whatsappMessage)}
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

      {/* Event Details Modal */}
      {activeModalEvent && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="bg-card border border-border/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-muted">
              <img
                src={getAssetUrl(activeModalEvent.image)}
                alt={typeof activeModalEvent.title === 'object' ? (activeModalEvent.title[lang] || activeModalEvent.title.en) : activeModalEvent.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full bg-primary text-primary-foreground shadow-md">
                  {typeof activeModalEvent.badge === 'object' ? (activeModalEvent.badge[lang] || activeModalEvent.badge.en) : activeModalEvent.badge}
                </span>
                {isPastEvent(activeModalEvent) && (
                  <span className="px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-full bg-stone-800 text-stone-200 border border-stone-500/50 shadow-md">
                    {isBn ? 'অনুষ্ঠিত ইভেন্ট' : 'Past Event'}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-semibold mb-4">
                {typeof activeModalEvent.title === 'object' ? (activeModalEvent.title[lang] || activeModalEvent.title.en) : activeModalEvent.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-background/50 border border-border/40 mb-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {isBn ? 'তারিখ' : 'Date'}
                    </div>
                    <div className="text-foreground font-medium">
                      {typeof activeModalEvent.date === 'object' ? (activeModalEvent.date[lang] || activeModalEvent.date.en) : activeModalEvent.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {isBn ? 'সময়' : 'Time'}
                    </div>
                    <div className="text-foreground font-medium">
                      {typeof activeModalEvent.time === 'object' ? (activeModalEvent.time[lang] || activeModalEvent.time.en) : activeModalEvent.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {isBn ? 'স্থান' : 'Location'}
                    </div>
                    <div className="text-foreground font-medium">
                      {typeof activeModalEvent.location === 'object' ? (activeModalEvent.location[lang] || activeModalEvent.location.en) : activeModalEvent.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider font-sans font-semibold text-primary mb-2">
                  {isBn ? 'অনুষ্ঠানের বিবরণ' : 'Event Overview'}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {typeof activeModalEvent.desc === 'object' ? (activeModalEvent.desc[lang] || activeModalEvent.desc.en) : activeModalEvent.desc}
                </p>
              </div>

              {activeModalEvent.highlights && (
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-wider font-sans font-semibold text-primary mb-3">
                    {isBn ? 'মূল আকর্ষণসমূহ' : 'Key Highlights'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(activeModalEvent.highlights[lang] || activeModalEvent.highlights.en || activeModalEvent.highlights).map((h, i) => (
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
                  {!isPastEvent(activeModalEvent)
                    ? (isBn ? 'আসন সংরক্ষণের জন্য আমাদের হোয়াটসঅ্যাপ হেল্পডেস্কে যোগাযোগ করুন।' : 'For invitations, reservations, or bespoke inquiries, please connect via WhatsApp.')
                    : (isBn ? 'এই অনুষ্ঠানটি সম্পন্ন হয়েছে। আর্কাইভ এবং স্মারক তথ্যের জন্য আমাদের সাথে যোগাযোগ করতে পারেন।' : 'This event has concluded. For archival inquiries, please contact estate management.')}
                </p>
                {!isPastEvent(activeModalEvent) && (
                  <a
                    href={getWhatsAppLink(activeModalEvent.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isBn ? 'সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন' : 'Click to Enquire (WhatsApp)'}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Event Manager Modal */}
      <EventManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        events={eventsList}
        onSaveEvent={handleSaveEvent}
        onDeleteEvent={handleDeleteEvent}
        onResetDefaults={handleResetDefaults}
        lang={lang}
      />
    </div>
  );
};

export default EventsPage;
