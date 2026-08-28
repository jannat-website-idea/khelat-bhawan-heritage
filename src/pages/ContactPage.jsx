import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Sparkles,
  Compass,
  MessageSquare
} from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';

export default function ContactPage({ lang, content }) {
  const t = content[lang];
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
      console.log('Contact form submitted to councilofculture.ghoshbari47@gmail.com:', formData);
    }, 700);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5]">
      {/* Header */}
      <section className="py-16 bg-burgundy-950 text-white relative overflow-hidden border-b-2 border-rosegold-500/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,125,101,0.15)_0%,_transparent_75%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-900 border border-rosegold-400/50 text-rosegold-300 text-xs font-semibold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            <span>North Kolkata Heritage Precinct</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.nav.contact}
          </h1>

          <AlpanaDivider light={true} className="my-2" />

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-rosegold-200/90 font-light leading-relaxed">
            {t.contact.desc}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-600 block mb-1">
                {t.contact.eyebrow}
              </span>
              <h2 className="font-serif text-3xl font-bold text-burgundy-900 leading-tight">
                {t.contact.heading}
              </h2>
            </div>

            <AlpanaDivider className="justify-start py-1" />

            {/* Address Box */}
            <div className="bg-white p-6 rounded-2xl border border-rosegold-200 shadow-md space-y-2">
              <div className="flex items-center space-x-3 text-burgundy-900 font-serif font-bold text-lg">
                <div className="w-8 h-8 rounded-full bg-rosegold-100 flex items-center justify-center text-rosegold-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{t.contact.addressTitle}</span>
              </div>
              <p className="text-stone-700 text-sm pl-11 leading-relaxed">
                {t.contact.address}
              </p>
              <p className="text-xs text-rosegold-700 font-medium pl-11">
                {t.contact.landmark}
              </p>
            </div>

            {/* Phone Numbers Box */}
            <div className="bg-white p-6 rounded-2xl border border-rosegold-200 shadow-md space-y-3">
              <div className="flex items-center space-x-3 text-burgundy-900 font-serif font-bold text-lg">
                <div className="w-8 h-8 rounded-full bg-rosegold-100 flex items-center justify-center text-rosegold-700">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{t.contact.phonesTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-11">
                {t.contact.phones.map((ph, idx) => (
                  <a
                    key={idx}
                    href={`tel:${ph.replace(/\s+/g, '')}`}
                    className="text-xs font-medium text-stone-700 hover:text-rosegold-700 transition-colors block py-1"
                  >
                    {ph}
                  </a>
                ))}
              </div>
            </div>

            {/* Email & Hours */}
            <div className="bg-white p-6 rounded-2xl border border-rosegold-200 shadow-md space-y-4">
              <div>
                <div className="flex items-center space-x-3 text-burgundy-900 font-serif font-bold text-base mb-1">
                  <div className="w-8 h-8 rounded-full bg-rosegold-100 flex items-center justify-center text-rosegold-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{t.contact.emailTitle}</span>
                </div>
                <a
                  href={`mailto:${t.contact.email}`}
                  className="text-xs text-rosegold-700 hover:text-burgundy-900 font-medium pl-11 block break-all"
                >
                  {t.contact.email}
                </a>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <div className="flex items-center space-x-3 text-burgundy-900 font-serif font-bold text-base mb-1">
                  <div className="w-8 h-8 rounded-full bg-rosegold-100 flex items-center justify-center text-rosegold-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>{t.contact.hoursTitle}</span>
                </div>
                <p className="text-xs text-stone-600 pl-11 leading-relaxed">
                  {t.contact.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form & Map */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-rosegold-300 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-burgundy-900 mb-2">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                Our estate coordinator will respond to your query within 24 hours.
              </p>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-rosegold-600 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-burgundy-900">
                    Message Received
                  </h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Thank you. Your message has been sent to the official Khelat Bhawan council desk.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
                    }}
                    className="px-4 py-2 rounded bg-burgundy-900 text-white text-xs font-semibold uppercase mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 text-heritage-charcoal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 text-heritage-charcoal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@example.com"
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 text-heritage-charcoal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 text-heritage-charcoal"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Heritage Rental / Wedding">Heritage Rental / Wedding</option>
                        <option value="Film / Photography Shoot">Film / Photography Shoot</option>
                        <option value="Classical Music / Cultural Event">Classical Music / Cultural Event</option>
                        <option value="Trusts & Puja Rituals">Trusts & Puja Rituals</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-burgundy-900 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your enquiry details here..."
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-rosegold-200 rounded-lg focus:outline-none focus:border-rosegold-500 text-heritage-charcoal resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-rosegold-500 hover:bg-rosegold-600 text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Google Maps Location Card */}
            <div className="bg-white p-6 rounded-3xl border border-rosegold-200 shadow-md space-y-4">
              <h4 className="font-serif text-lg font-bold text-burgundy-900 flex items-center space-x-2">
                <Compass className="w-5 h-5 text-rosegold-600" />
                <span>{t.contact.mapTitle}</span>
              </h4>
              <div className="w-full h-64 rounded-xl overflow-hidden border border-rosegold-200">
                <iframe
                  title="Khelat Bhawan Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.743048995332!2d88.35338307598858!3d22.588725832360215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277bd2b883011%3A0x63375eec83088b90!2s47%2C%20Pathuria%20Ghata%20St%2C%20Jorasanko%2C%20Kolkata%2C%20West%20Bengal%20700006!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="text-[11px] text-stone-500 italic text-center">
                Located on Pathuria Ghata Street in the historic heritage heart of North Kolkata.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
