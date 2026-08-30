import React, { useState } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, lang, content, initialEvent = '' }) {
  const t = content[lang].bookingModal;
  const defaultOption = t.fields.eventTypeOptions ? t.fields.eventTypeOptions[0] : 'Wedding Ceremony';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: initialEvent || defaultOption,
    preferredDate: '',
    guests: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialEvent) {
      setFormData(prev => ({ ...prev, eventType: initialEvent }));
    }
  }, [initialEvent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Enquiry sent to official email councilofculture.ghoshbari47@gmail.com:', formData);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-foreground/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-card rounded-sm shadow-2xl border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gradient-heritage text-primary-foreground px-6 py-6 relative flex items-center justify-between border-b border-border/30">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-gold font-body font-semibold block mb-1">
              Pathuria Ghata Ghosh Bari · Est. 1845
            </span>
            <h3 className="font-serif text-2xl font-bold text-primary-foreground">
              {t.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-primary-foreground/70 hover:text-rose-gold transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 font-body">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-accent mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-foreground">
                {t.successTitle}
              </h4>
              <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
                {t.successMsg}
              </p>

              <div className="p-4 bg-background rounded-sm border border-border max-w-md mx-auto text-xs text-foreground/80 space-y-1 mt-4 text-left">
                <p><strong>Official Contact:</strong> +91 98310 93021 / +91 99031 34231</p>
                <p><strong>Official Email:</strong> councilofculture.ghoshbari47@gmail.com</p>
                <p><strong>Address:</strong> 47, Pathuria Ghata Street, Kolkata – 700006</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-widest uppercase font-semibold hover:bg-foreground transition-colors rounded-sm"
                >
                  {t.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                    {t.fields.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.fields.namePl}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                    {t.fields.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.fields.phonePl}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                    {t.fields.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.fields.emailPl}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                    {t.fields.eventType} *
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground"
                  >
                    {t.fields.eventTypeOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                    {t.fields.preferredDate}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                    {t.fields.guests}
                  </label>
                  <input
                    type="text"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    placeholder={t.fields.guestsPl}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  {t.fields.message}
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.fields.messagePl}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-accent text-accent-foreground text-xs tracking-[0.2em] uppercase font-semibold hover:bg-matte-red transition-colors rounded-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.fields.submitting : t.fields.submitBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
