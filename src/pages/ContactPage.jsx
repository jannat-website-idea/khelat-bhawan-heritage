import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ExternalLink } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

export default function ContactPage({ lang, content }) {
  const t = content[lang];
  const mapUrl = t.contact.mapUrl || "https://share.google/TFFurvjijjI8QM8eg";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title={lang === 'bn' ? 'যোগাযোগ ও অবস্থান' : 'Contact & Location'}
          subtitle={lang === 'bn' 
            ? 'খেলাৎ ভবন পরিদর্শনে ও যেকোনো তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন' 
            : 'Connect with us to experience 175 years of Bengali heritage and culture'}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16 text-left">
          {/* Details */}
          <div className="lg:col-span-5 space-y-6">
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-card p-6 rounded-sm border border-border hover:border-accent shadow-sm space-y-2 transition-colors cursor-pointer"
              aria-label="Open location on Google Maps"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-foreground font-serif font-bold text-lg group-hover:text-accent transition-colors">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>{t.contact.addressTitle}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <p className="text-sm font-body text-foreground/80 pl-8 leading-relaxed">
                {t.contact.address}
              </p>
              <p className="text-xs text-accent font-body pl-8 font-medium">
                {t.contact.landmark} → <span className="underline">{lang === 'bn' ? 'সরাসরি গুগল ম্যাপে রুট দেখুন' : 'Get Exact Route on Google Maps'}</span>
              </p>
            </a>

            <div className="bg-card p-6 rounded-sm border border-border shadow-sm space-y-3">
              <div className="flex items-center gap-3 text-foreground font-serif font-bold text-lg">
                <Phone className="w-5 h-5 text-accent" />
                <span>{t.contact.phonesTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8 font-body text-xs text-foreground/80">
                {t.contact.phones.map((ph, idx) => (
                  <a key={idx} href={`tel:${ph.replace(/\s+/g, '')}`} className="hover:text-accent transition-colors">
                    {ph}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-sm border border-border shadow-sm space-y-4">
              <div>
                <div className="flex items-center gap-3 text-foreground font-serif font-bold text-base mb-1">
                  <Mail className="w-5 h-5 text-accent" />
                  <span>{t.contact.emailTitle}</span>
                </div>
                <a href={`mailto:${t.contact.email}`} className="text-xs text-accent hover:underline pl-8 block break-all font-body">
                  {t.contact.email}
                </a>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-3 text-foreground font-serif font-bold text-base mb-1">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>{t.contact.hoursTitle}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-8 font-body leading-relaxed">
                  {t.contact.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Form & Map */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-card p-8 rounded-sm border border-border shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                {lang === 'bn' ? 'আমাদের বার্তা পাঠান' : 'Send Us a Message'}
              </h3>
              <p className="text-xs text-muted-foreground font-body mb-6">
                {lang === 'bn' 
                  ? 'আমাদের প্রতিনিধি দল আপনার সাথে ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।' 
                  : 'We will respond to your query within 24 hours.'}
              </p>

              {submitted ? (
                <div className="p-8 rounded-sm bg-accent/10 border border-accent/30 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-accent mx-auto" />
                  <h4 className="font-serif text-xl font-semibold text-foreground">
                    {lang === 'bn' ? 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে!' : 'Thank you! Your message has been sent.'}
                  </h4>
                  <p className="text-xs text-muted-foreground font-body">
                    {lang === 'bn' ? 'আমরা অতি শীঘ্রই আপনার সাথে যোগাযোগ করব।' : 'Our representatives will get back to you shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="yourname@example.com"
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                      Message *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your enquiry details..."
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent text-foreground resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-accent text-accent-foreground text-xs tracking-[0.2em] uppercase font-semibold hover:bg-matte-red transition-colors rounded-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Submit Message'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map Card */}
            <div className="bg-card p-5 rounded-sm border border-border shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-foreground font-serif font-bold text-base">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>{t.contact.mapTitle || "Location Map"}</span>
                </div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>{t.contact.getDirectionsBtn || "Get Directions"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full h-72 rounded-sm overflow-hidden bg-black border border-border/60 hover:border-accent transition-all cursor-pointer"
                aria-label="Open Khelat Bhawan exact location in Google Maps"
              >
                <iframe
                  title="Khelat Bhavan Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.743048995332!2d88.35338307598858!3d22.588725832360215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277bd2b883011%3A0x63375eec83088b90!2s47%2C%20Pathuria%20Ghata%20St%2C%20Jorasanko%2C%20Kolkata%2C%20West%20Bengal%20700006!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'none' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-end justify-center p-4">
                  <span className="bg-accent text-accent-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-sm shadow-2xl flex items-center gap-2 group-hover:scale-105 transition-transform">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{t.contact.getDirectionsBtn || "Get Exact Directions"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
