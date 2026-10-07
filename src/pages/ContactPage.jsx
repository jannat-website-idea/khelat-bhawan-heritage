import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ExternalLink, Navigation } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { submitEnquiry } from '../lib/enquiries';
import { countWords, validateEnquiry } from '../lib/enquiryValidation';

export default function ContactPage({ lang, content }) {
  const t = content[lang];
  const isBn = lang === 'bn';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Khelat+Bhawan+47+Pathuria+Ghata+Street+Kolkata+700006';
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [reference, setReference] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateEnquiry(formData);
    setFieldErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const result = await submitEnquiry({...formData, source: 'Contact page'});
      setReference(result.reference);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message);
      if (error.validationErrors) setFieldErrors(error.validationErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenMaps = () => {
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const contactCards = [
    { icon: MapPin, title: t.contact.addressTitle, body: t.contact.address, href: googleMapsUrl, external: true },
    { icon: Phone, title: t.contact.phonesTitle, body: t.contact.phones.join(' · '), href: `tel:${t.contact.phones[0].replace(/\s+/g, '')}` },
    { icon: Mail, title: t.contact.emailTitle, body: t.contact.email, href: `mailto:${t.contact.email}` }
  ];

  return (
    <main className="contact-page pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-12">
        <SectionHeader 
          title={isBn ? 'যোগাযোগ ও অবস্থান' : 'Contact & Location'} 
          subtitle={isBn ? 'খেলাৎ ভবন পরিদর্শনে ও যেকোনো তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন' : 'Connect with us to experience 175 years of Bengali heritage and culture'} 
        />

        {/* Top 3 Official Contact Cards */}
        <section className="contact-page__official grid grid-cols-1 md:grid-cols-3 gap-6" aria-label={isBn ? 'অফিসিয়াল যোগাযোগ' : 'Official contact details'}>
          {contactCards.map(({ icon: Icon, title, body, href, external }) => (
            <a key={title} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="contact-page__official-card rounded-2xl">
              <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span className="space-y-1.5">
                <strong className="block text-lg font-serif">{title}</strong>
                <small className="block text-sm text-muted-foreground leading-relaxed">{body}</small>
              </span>
              {external && <ExternalLink className="contact-page__external w-4 h-4" />}
            </a>
          ))}
        </section>

        {/* Visiting Hours Banner */}
        <div className="contact-page__hours rounded-2xl bg-card border border-primary/20 py-4 px-6 flex items-center justify-center gap-3 text-sm text-foreground/90 shadow-sm">
          <Clock className="w-5 h-5 text-primary flex-shrink-0" />
          <span><strong>{t.contact.hoursTitle}</strong> · {t.contact.hours}</span>
        </div>

        {/* Form and Map Stacked Vertically with Full Left-to-Right Width */}
        <div className="contact-page__vertical-layout space-y-12 w-full">
          
          {/* 1. Full-Width Enquiry Form Card */}
          <section className="contact-page__form-card rounded-3xl w-full border border-primary/30 p-6 sm:p-10 md:p-12 shadow-2xl bg-card/95">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center sm:text-left space-y-2">
                <p className="heritage-kicker text-primary tracking-[0.2em] uppercase text-xs font-bold font-sans">
                  {isBn ? 'সরাসরি অনুসন্ধান' : 'DIRECT ESTATE INQUIRY'}
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                  {isBn ? 'আমাদের বার্তা পাঠান' : 'Send Us an Official Message'}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {isBn ? 'খেলাৎ ভবনের প্রতিনিধি দল আপনার সাথে ৪৮ ঘণ্টার মধ্যে যোগাযোগ করবে।' : 'The Khelat Bhawan administrative team will respond to your enquiry within 48 hours.'}
                </p>
              </div>

              {submitted ? (
                <div className="contact-page__success py-12 text-center space-y-4">
                  <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-serif text-foreground font-semibold">
                    {isBn ? 'আপনার বার্তা গৃহীত হয়েছে। আমরা ৪৮ ঘণ্টার মধ্যে যোগাযোগ করব।' : 'Thank you! Your enquiry was received. We will connect within 48 hours.'}
                  </h3>
                  {reference && <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Reference ID: {reference}</p>}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && <p role="alert" className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-sm font-sans">{submitError}</p>}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <label className="block space-y-2 text-xs font-bold uppercase tracking-widest text-foreground/80 font-sans">
                      <span>{isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'} *</span>
                      <input 
                        required 
                        placeholder={isBn ? 'আপনার নাম লিখুন' : 'e.g. Satyajit Ray'}
                        className="w-full px-4 py-3.5 rounded-xl border border-primary/20 bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground text-sm transition-all"
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      />
                    </label>

                    <label className="block space-y-2 text-xs font-bold uppercase tracking-widest text-foreground/80 font-sans">
                      <span>{isBn ? 'ফোন নম্বর' : 'Phone Number'} *</span>
                      <input 
                        type="tel" 
                        required 
                        inputMode="tel" 
                        placeholder="+91 98310 93021"
                        aria-invalid={!!fieldErrors.phone} 
                        className="w-full px-4 py-3.5 rounded-xl border border-primary/20 bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground text-sm transition-all"
                        value={formData.phone} 
                        onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setFieldErrors({...fieldErrors, phone: ''}); }} 
                      />
                      {fieldErrors.phone && <small className="text-red-500 block text-xs mt-1">{fieldErrors.phone}</small>}
                    </label>
                  </div>

                  <label className="block space-y-2 text-xs font-bold uppercase tracking-widest text-foreground/80 font-sans">
                    <span>{isBn ? 'ইমেল ঠিকানা' : 'Email Address'} *</span>
                    <input 
                      type="email" 
                      required 
                      placeholder="your.email@example.com"
                      aria-invalid={!!fieldErrors.email} 
                      className="w-full px-4 py-3.5 rounded-xl border border-primary/20 bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground text-sm transition-all"
                      value={formData.email} 
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFieldErrors({...fieldErrors, email: ''}); }} 
                    />
                    {fieldErrors.email && <small className="text-red-500 block text-xs mt-1">{fieldErrors.email}</small>}
                  </label>

                  <label className="block space-y-2 text-xs font-bold uppercase tracking-widest text-foreground/80 font-sans">
                    <span>{isBn ? 'বার্তা / বিস্তারিত অনুসন্ধান' : 'Message / Specific Inquiry'} *</span>
                    <textarea 
                      rows={6} 
                      required 
                      placeholder={isBn ? 'আপনার বার্তা লিখুন (ন্যূনতম ২০ শব্দ)...' : 'Describe your event, heritage inquiry, or appointment requirements (minimum 20 words)...'}
                      aria-invalid={!!fieldErrors.message} 
                      className="w-full px-4 py-3.5 rounded-xl border border-primary/20 bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground text-sm leading-relaxed transition-all"
                      value={formData.message} 
                      onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setFieldErrors({...fieldErrors, message: ''}); }} 
                    />
                    <div className="flex justify-between items-center text-xs pt-1">
                      <small className={countWords(formData.message) >= 20 ? 'text-emerald-500 font-medium' : 'text-muted-foreground'}>
                        {countWords(formData.message)} / 20 words minimum
                      </small>
                      {fieldErrors.message && <small className="text-red-500 font-medium">{fieldErrors.message}</small>}
                    </div>
                  </label>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-[#932738] via-[#741e30] to-[#5a1722] hover:from-[#a82d41] hover:to-[#741e30] text-[#fff8eb] font-sans font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? (isBn ? 'পাঠানো হচ্ছে…' : 'Submitting Message…') : (isBn ? 'বার্তা পাঠান' : 'Submit Official Message')}</span>
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* 2. Full-Width Grand Interactive Location Map Card at Bottom */}
          <section className="contact-page__map-card rounded-3xl w-full border border-primary/30 p-6 sm:p-8 md:p-10 shadow-2xl bg-card/95 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                    {isBn ? 'খেলাৎ ভবন রাজবাড়ি অবস্থান ও মানচিত্র' : 'Khelat Bhawan Palace Location & Map'}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India
                  </p>
                </div>
              </div>

              {/* Direct Open in Maps Action Button */}
              <button
                onClick={handleOpenMaps}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-sans text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>{isBn ? 'গুগল ম্যাপে খুলুন' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

            {/* Interactive Embedded Google Map pointing to 47 Pathuria Ghata St */}
            <div className="relative w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden mt-6 border border-primary/20 shadow-inner bg-black/40">
              <iframe 
                title="Khelat Bhavan Heritage Location Map" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.743048995332!2d88.35338307598858!3d22.588725832360215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277bd2b883011%3A0x63375eec83088b90!2s47%2C%20Pathuria%20Ghata%20St%2C%20Jorasanko%2C%20Kolkata%2C%20West%20Bengal%20700006!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin" 
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
              />
              
              {/* Bottom directions prompt overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-10 flex items-center justify-between gap-3 p-3.5 rounded-xl bg-card/90 backdrop-blur-md border border-primary/30 shadow-xl">
                <span className="text-xs font-sans text-foreground/90 font-medium">
                  {isBn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি (জোড়াসাঁকো)' : 'Pathuria Ghata Ghosh Bari (Jorasanko)'}
                </span>
                <button
                  onClick={handleOpenMaps}
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isBn ? 'দিকনির্দেশ পান' : 'Get Directions'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
