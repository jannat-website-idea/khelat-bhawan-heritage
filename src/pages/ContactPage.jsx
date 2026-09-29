import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ExternalLink } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

export default function ContactPage({ lang, content }) {
  const t = content[lang];
  const isBn = lang === 'bn';
  const mapUrl = t.contact.mapUrl || 'https://share.google/TFFurvjijjI8QM8eg';
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 600);
  };

  const contactCards = [
    { icon: MapPin, title: t.contact.addressTitle, body: t.contact.address, href: mapUrl, external: true },
    { icon: Phone, title: t.contact.phonesTitle, body: t.contact.phones.join(' · '), href: `tel:${t.contact.phones[0].replace(/\s+/g, '')}` },
    { icon: Mail, title: t.contact.emailTitle, body: t.contact.email, href: `mailto:${t.contact.email}` }
  ];

  return (
    <main className="contact-page pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader title={isBn ? 'যোগাযোগ ও অবস্থান' : 'Contact & Location'} subtitle={isBn ? 'খেলাৎ ভবন পরিদর্শনে ও যেকোনো তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন' : 'Connect with us to experience 175 years of Bengali heritage and culture'} />

        <section className="contact-page__official" aria-label={isBn ? 'অফিসিয়াল যোগাযোগ' : 'Official contact details'}>
          {contactCards.map(({ icon: Icon, title, body, href, external }) => (
            <a key={title} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="contact-page__official-card">
              <Icon />
              <span><strong>{title}</strong><small>{body}</small></span>
              {external && <ExternalLink className="contact-page__external" />}
            </a>
          ))}
        </section>

        <div className="contact-page__hours"><Clock /><span><strong>{t.contact.hoursTitle}</strong> · {t.contact.hours}</span></div>

        <section className="contact-page__lower">
          <div className="contact-page__form-card">
            <p className="heritage-kicker">{isBn ? 'সরাসরি অনুসন্ধান' : 'Direct enquiry'}</p>
            <h2>{isBn ? 'আমাদের বার্তা পাঠান' : 'Send Us a Message'}</h2>
            <p>{isBn ? 'আমাদের প্রতিনিধি দল আপনার সাথে ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।' : 'Our team will respond to your enquiry within 24 hours.'}</p>
            {submitted ? (
              <div className="contact-page__success"><CheckCircle /><h3>{isBn ? 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে!' : 'Thank you! Your message has been sent.'}</h3></div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="contact-page__field-row">
                  <label>{isBn ? 'নাম' : 'Name'} *<input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></label>
                  <label>{isBn ? 'ফোন' : 'Phone'} *<input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></label>
                </div>
                <label>{isBn ? 'ইমেল' : 'Email address'} *<input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></label>
                <label>{isBn ? 'বার্তা' : 'Message'} *<textarea rows="5" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} /></label>
                <button type="submit" disabled={isSubmitting}><Send />{isSubmitting ? (isBn ? 'পাঠানো হচ্ছে…' : 'Sending…') : (isBn ? 'বার্তা পাঠান' : 'Submit Message')}</button>
              </form>
            )}
          </div>

          <div className="contact-page__map-card">
            <div className="contact-page__map-heading"><span><MapPin />{t.contact.mapTitle || 'Location Map'}</span><a href={mapUrl} target="_blank" rel="noopener noreferrer">{t.contact.getDirectionsBtn || 'Get Directions'} <ExternalLink /></a></div>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="contact-page__map">
              <iframe title="Khelat Bhavan Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.743048995332!2d88.35338307598858!3d22.588725832360215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277bd2b883011%3A0x63375eec83088b90!2s47%2C%20Pathuria%20Ghata%20St%2C%20Jorasanko%2C%20Kolkata%2C%20West%20Bengal%20700006!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <span>{t.contact.getDirectionsBtn || 'Get Exact Directions'} <ExternalLink /></span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
