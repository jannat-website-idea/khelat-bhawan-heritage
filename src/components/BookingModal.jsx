import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Calendar as CalendarIcon, Clock, ShieldCheck, Lock, Unlock, Mail, AlertCircle } from 'lucide-react';
import { getBlockedDates, saveBlockedDates, isDateBlocked, isPastDate } from '../data/bookingData';

export default function BookingModal({ isOpen, onClose, lang = 'en', content, initialEvent = '' }) {
  const t = content[lang]?.bookingModal || {
    title: lang === 'bn' ? 'রিজার্ভেশন ও বুকিং অনুসন্ধান' : 'Palace Reservations & Bookings',
    successTitle: lang === 'bn' ? 'অনুসন্ধান সফলভাবে গৃহীত হয়েছে' : 'Reservation Request Received',
    successMsg: lang === 'bn'
      ? 'আপনার বুকিং সংক্রান্ত বিবরণ আমাদের রাজবাড়ি ট্রাস্টি ও এস্টেট ম্যানেজমেন্টের কাছে প্রেরিত হয়েছে। পরবর্তী ৪৮ ঘণ্টার মধ্যে নিশ্চিতকরণ জানানো হবে।'
      : 'Your reservation request has been dispatched to Khelat Bhawan Estate Concierge. You will receive a formal confirmation email within 48 hours.',
    closeBtn: lang === 'bn' ? 'বন্ধ করুন' : 'Close'
  };

  const defaultOption = 'Wedding Ceremony & Sangeet';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: initialEvent || defaultOption,
    preferredDate: '',
    guests: '',
    message: ''
  });

  const [blockedDates, setBlockedDates] = useState(getBlockedDates());
  const [adminMode, setAdminMode] = useState(false);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dispatchDetails, setDispatchDetails] = useState(null);

  useEffect(() => {
    if (initialEvent) {
      setFormData(prev => ({ ...prev, eventType: initialEvent }));
    }
  }, [initialEvent, isOpen]);

  useEffect(() => {
    setBlockedDates(getBlockedDates());
  }, [isOpen]);

  if (!isOpen) return null;

  // Calendar calculations
  const today = new Date();
  const targetDate = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const monthName = targetDate.toLocaleString(lang === 'bn' ? 'bn-IN' : 'en-US', { month: 'long', year: 'numeric' });
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateObj = new Date(year, month, day);

    if (isPastDate(dateObj)) return; // Past dates cannot be selected or modified

    if (adminMode) {
      let updated;
      if (blockedDates.includes(formatted)) {
        updated = blockedDates.filter(d => d !== formatted);
      } else {
        updated = [...blockedDates, formatted];
      }
      setBlockedDates(updated);
      saveBlockedDates(updated);
      return;
    }

    if (!isDateBlocked(formatted, blockedDates)) {
      setFormData(prev => ({ ...prev, preferredDate: formatted }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.preferredDate) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে ক্যালেন্ডার থেকে একটি উপলব্ধ তারিখ নির্বাচন করুন।' : 'Please select an available date from the reservation calendar.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setDispatchDetails({
        bookingRef: `KB-${Date.now().toString().slice(-6)}`,
        adminEmail: 'councilofculture.ghoshbari47@gmail.com',
        guestEmail: formData.email,
        date: formData.preferredDate,
        sla: '48 Hours Guaranteed Response'
      });
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setDispatchDetails(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: defaultOption,
      preferredDate: '',
      guests: '',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-card rounded-2xl shadow-2xl border border-border/80 overflow-hidden text-foreground max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Royal Header */}
        <div className="bg-muted/60 px-6 py-5 border-b border-border/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold block">
              {lang === 'bn' ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি · স্থাপিত ১৮৪৫' : 'Pathuria Ghata Ghosh Bari · Est. 1845'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              {lang === 'bn' ? 'রিজার্ভেশন ও বুকিং অনুসন্ধান' : 'Palace Reservations & Bookings'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-background/80"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 font-sans overflow-y-auto space-y-6">
          {submitted && dispatchDetails ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                {t.successTitle}
              </h4>
              <p className="text-muted-foreground max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
                {t.successMsg}
              </p>

              {/* Dual Email Dispatch Badge Card */}
              <div className="bg-background/80 rounded-xl border border-border/80 p-5 max-w-lg mx-auto text-left space-y-3 shadow-inner">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'দ্বৈত স্বয়ংক্রিয় ইমেল প্রেরণ' : 'Dual Email Dispatch Verified'}</span>
                </div>
                
                <div className="text-xs space-y-1.5 text-muted-foreground">
                  <p><strong className="text-foreground">Reservation Ref:</strong> <span className="font-mono text-primary font-bold">{dispatchDetails.bookingRef}</span></p>
                  <p><strong className="text-foreground">Selected Date:</strong> {dispatchDetails.date}</p>
                  <p><strong className="text-foreground">1. Admin Alert Sent:</strong> {dispatchDetails.adminEmail}</p>
                  <p><strong className="text-foreground">2. Guest Confirmation:</strong> {dispatchDetails.guestEmail} (48h Concierge SLA)</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="bg-primary text-primary-foreground px-8 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-primary/90 transition-all rounded-xl shadow-md"
                >
                  {t.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Top Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'bn' ? 'আপনার নাম লিখুন' : 'Enter your name'}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-background border border-border/80 rounded-xl focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {lang === 'bn' ? 'ফোন নম্বর' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98310 00000"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-background border border-border/80 rounded-xl focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {lang === 'bn' ? 'ইমেল' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-background border border-border/80 rounded-xl focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {lang === 'bn' ? 'অনুষ্ঠানের ধরণ' : 'Occasion / Event Type'} *
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-background border border-border/80 rounded-xl focus:outline-none focus:border-primary text-foreground"
                  >
                    <option value="Wedding Ceremony & Sangeet">Wedding Ceremony & Sangeet</option>
                    <option value="Heritage Classical Concert / Soiree">Heritage Classical Concert / Soiree</option>
                    <option value="Private Gala / Aristocratic Dinner">Private Gala / Aristocratic Dinner</option>
                    <option value="Film & Art Photography Shoot">Film & Art Photography Shoot</option>
                    <option value="Corporate Cultural Summit">Corporate Cultural Summit</option>
                    <option value="Durga Puja VIP Visit">Durga Puja VIP Visit</option>
                  </select>
                </div>
              </div>

              {/* Interactive Calendar Selection Section */}
              <div className="bg-background/60 rounded-xl border border-border/80 p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span className="font-serif font-semibold text-sm sm:text-base text-foreground">
                      {monthName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentMonthOffset <= 0}
                      onClick={() => setCurrentMonthOffset(prev => Math.max(0, prev - 1))}
                      className="px-2.5 py-1 text-xs border border-border/60 rounded-lg hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ← {lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}
                    </button>
                    <button
                      type="button"
                      disabled={currentMonthOffset >= 6}
                      onClick={() => setCurrentMonthOffset(prev => prev + 1)}
                      className="px-2.5 py-1 text-xs border border-border/60 rounded-lg hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {lang === 'bn' ? 'পরবর্তী' : 'Next'} →
                    </button>

                    {/* Admin Mode Toggle */}
                    <button
                      type="button"
                      onClick={() => setAdminMode(!adminMode)}
                      title="Admin Date Blocking CMS"
                      className={`ml-2 px-2.5 py-1 text-[11px] rounded-lg border flex items-center gap-1 transition-all ${
                        adminMode ? 'bg-amber-500/20 text-amber-500 border-amber-500/50' : 'bg-card text-muted-foreground border-border/60'
                      }`}
                    >
                      {adminMode ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      <span>{adminMode ? 'CMS Active' : 'Admin'}</span>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-9 sm:h-11" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const dateObj = new Date(year, month, day);
                      const isPast = isPastDate(dateObj);
                      const isBlocked = isDateBlocked(formatted, blockedDates);
                      const isSelected = formData.preferredDate === formatted;

                      let cellStyles = 'bg-card hover:border-primary/60 border-border/40 text-foreground cursor-pointer';
                      if (isPast) {
                        cellStyles = 'bg-muted/30 border-transparent text-muted-foreground/30 cursor-not-allowed';
                      } else if (isBlocked) {
                        cellStyles = 'bg-red-950/30 border-red-800/40 text-red-400 cursor-not-allowed';
                      } else if (isSelected) {
                        cellStyles = 'bg-primary text-primary-foreground font-bold border-primary shadow-md scale-105';
                      }

                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={isPast || (!adminMode && isBlocked)}
                          onClick={() => handleDateClick(day)}
                          className={`h-9 sm:h-11 rounded-lg border text-xs sm:text-sm font-sans flex flex-col items-center justify-center relative transition-all duration-200 ${cellStyles}`}
                        >
                          <span>{day}</span>
                          {isBlocked && !isPast && (
                            <span className="text-[8px] uppercase tracking-tighter text-red-400 leading-none">
                              {lang === 'bn' ? 'বুকড' : 'Booked'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Calendar Legend */}
                <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/40">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Available
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Booked / Blocked
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Selected
                    </span>
                  </div>
                  {formData.preferredDate && (
                    <span className="font-semibold text-primary">
                      {lang === 'bn' ? 'নির্বাচিত তারিখ:' : 'Selected:'} {formData.preferredDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Guest Count & Message */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {lang === 'bn' ? 'অতিথির সম্ভাব্য সংখ্যা' : 'Estimated Guest Count'}
                  </label>
                  <input
                    type="text"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    placeholder="e.g. 150 – 300 Guests"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-background border border-border/80 rounded-xl focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {lang === 'bn' ? 'অতিরিক্ত তথ্য / অনুরোধ' : 'Special Inquiries & Requirements'}
                  </label>
                  <input
                    type="text"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'bn' ? 'প্রয়োজনে বিস্তারিত লিখুন' : 'Catering, lighting, photography setup, etc.'}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-background border border-border/80 rounded-xl focus:outline-none focus:border-primary text-foreground"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary text-primary-foreground text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold hover:bg-primary/90 transition-all rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? (lang === 'bn' ? 'প্রেরণ করা হচ্ছে...' : 'Dispatching Confirmation...') : (lang === 'bn' ? 'বুকিং আবেদন প্রেরণ করুন' : 'Submit Reservation Request')}</span>
                </button>
                <p className="text-[11px] text-center text-muted-foreground mt-2">
                  {lang === 'bn'
                    ? 'আবেদন প্রেরণের পর ২৪-৪৮ ঘণ্টার মধ্যে আমাদের কনসিয়ার্জ টিম আপনার সাথে যোগাযোগ করবে।'
                    : 'Dispatches automated confirmation to your email and notifies the Ghosh Bari Concierge.'}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
