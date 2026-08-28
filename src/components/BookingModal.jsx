import React, { useState } from 'react';
import { X, CheckCircle2, Send, Calendar, Users, Mail, Phone, User, MessageSquare, Tag } from 'lucide-react';
import AlpanaDivider from './AlpanaDivider';

export default function BookingModal({ isOpen, onClose, lang, content }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Heritage Rental — Wedding Ceremony',
    preferredDate: '',
    guests: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const t = content[lang].bookingModal;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending enquiry notification to councilofculture.ghoshbari47@gmail.com
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Enquiry logged to official email councilofculture.ghoshbari47@gmail.com:', formData);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: 'Heritage Rental — Wedding Ceremony',
      preferredDate: '',
      guests: '',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10 bg-burgundy-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-rosegold-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-burgundy-900 text-white px-6 py-6 border-b border-rosegold-500/40 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-burgundy-950/60 border border-rosegold-400/40 flex items-center justify-center text-rosegold-200 hover:text-white hover:border-rosegold-300 transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="pr-8">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-rosegold-300 font-semibold block mb-1">
              Pathuria Ghata Ghosh Bari • Est. 1845
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-bold">
              {t.title}
            </h3>
            <p className="text-rosegold-200 text-xs md:text-sm mt-1 font-light">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rosegold-100 border-2 border-rosegold-400 text-rosegold-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-burgundy-900">
                {t.successTitle}
              </h4>
              <p className="text-heritage-charcoal max-w-md mx-auto text-sm leading-relaxed">
                {t.successMsg}
              </p>

              <div className="p-4 bg-rosegold-50/80 rounded-xl border border-rosegold-200 max-w-md mx-auto text-xs text-rosegold-800 space-y-1 mt-4 text-left">
                <p><strong className="font-semibold text-burgundy-900">Official Contact:</strong> +91 98310 93021 / +91 99031 34231</p>
                <p><strong className="font-semibold text-burgundy-900">Official Email:</strong> councilofculture.ghoshbari47@gmail.com</p>
                <p><strong className="font-semibold text-burgundy-900">Address:</strong> 47, Pathuria Ghata Street, Kolkata – 700006</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-burgundy-900 text-white hover:bg-burgundy-800 font-medium text-sm transition-colors shadow"
                >
                  {t.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-600 italic border-l-2 border-rosegold-400 pl-3">
                {t.note}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                    {t.fields.name} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-rosegold-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.fields.namePl}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 focus:ring-1 focus:ring-rosegold-400 transition-all text-heritage-charcoal"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                    {t.fields.phone} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-rosegold-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.fields.phonePl}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 focus:ring-1 focus:ring-rosegold-400 transition-all text-heritage-charcoal"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                    {t.fields.email} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-rosegold-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.fields.emailPl}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 focus:ring-1 focus:ring-rosegold-400 transition-all text-heritage-charcoal"
                    />
                  </div>
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                    {t.fields.eventType} *
                  </label>
                  <div className="relative">
                    <Tag className="w-4 h-4 text-rosegold-500 absolute left-3 top-3 pointer-events-none" />
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 focus:ring-1 focus:ring-rosegold-400 transition-all text-heritage-charcoal appearance-none cursor-pointer"
                    >
                      {t.fields.eventTypeOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                    {t.fields.preferredDate}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-rosegold-500 absolute left-3 top-3" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 focus:ring-1 focus:ring-rosegold-400 transition-all text-heritage-charcoal"
                    />
                  </div>
                </div>

                {/* Estimated Guests */}
                <div>
                  <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                    {t.fields.guests}
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-rosegold-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder={t.fields.guestsPl}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 focus:ring-1 focus:ring-rosegold-400 transition-all text-heritage-charcoal"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                  {t.fields.message}
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-rosegold-500 absolute left-3 top-3" />
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.fields.messagePl}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 focus:ring-1 focus:ring-rosegold-400 transition-all text-heritage-charcoal resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg bg-rosegold-500 hover:bg-rosegold-600 text-white font-semibold text-sm tracking-wider uppercase shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
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
