import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer({ lang, setActiveTab, onOpenBooking, content }) {
  const t = content[lang];

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="gradient-heritage text-primary-foreground border-t border-border/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="font-serif text-2xl font-bold tracking-wide text-primary-foreground">
              {lang === 'bn' ? 'খেলাৎ ভবন রাজবাড়ি' : 'Khelat Bhavan'}
            </h3>
            <p className="text-xs tracking-[0.3em] uppercase text-rose-gold font-body">
              {lang === 'bn' ? 'রাজবাড়ি · পাথুরিয়াঘাটা' : 'Rajbari · Pathuriaghata'}
            </p>
            <p className="text-sm text-primary-foreground/65 font-body leading-relaxed pt-1">
              {lang === 'bn' 
                ? '১৮৪৫ সাল থেকে উত্তর কলকাতার বুকে আভিজাত্য, শাস্ত্রীয় সঙ্গীত ও আধ্যাত্মিক ভক্তি সংরক্ষণের এক জীবন্ত ঐতিহ্য।' 
                : 'A majestic 19th-century heritage estate in the heart of Kolkata, preserving centuries of Bengali aristocratic grandeur, classical music, and sacred devotion.'}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-accent text-accent-foreground px-5 py-2 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-matte-red transition-colors rounded-sm"
              >
                {t.nav.bookCta}
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-rose-gold">
              {t.footer.quickLinksTitle}
            </h4>
            <div className="flex flex-col gap-2 font-body text-sm text-primary-foreground/60">
              <button onClick={() => handleNav('home')} className="text-left hover:text-rose-gold transition-colors">
                {t.nav.home}
              </button>
              <button onClick={() => handleNav('heritage')} className="text-left hover:text-rose-gold transition-colors">
                {t.nav.heritage}
              </button>
              <button onClick={() => handleNav('timeline')} className="text-left hover:text-rose-gold transition-colors">
                {t.nav.timeline}
              </button>
              <button onClick={() => handleNav('founder')} className="text-left hover:text-rose-gold transition-colors">
                {t.nav.founder}
              </button>
              <button onClick={() => handleNav('trustees')} className="text-left hover:text-rose-gold transition-colors">
                {t.nav.trustees}
              </button>
              <button onClick={() => handleNav('gallery')} className="text-left hover:text-rose-gold transition-colors">
                {t.nav.gallery}
              </button>
              <button onClick={() => handleNav('rental')} className="text-left hover:text-rose-gold transition-colors">
                {t.nav.rental}
              </button>
              <button onClick={() => handleNav('contact')} className="text-left hover:text-rose-gold transition-colors">
                {t.nav.contact}
              </button>
            </div>
          </div>

          {/* Col 3: The Three Cultural Trusts */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-rose-gold">
              {t.footer.trustsTitle}
            </h4>
            <div className="flex flex-col gap-3 font-body text-xs text-primary-foreground/75">
              <div className="p-2.5 rounded-sm bg-white/5 border border-white/10">
                <span className="text-[10px] text-rose-gold block uppercase tracking-wider font-semibold">Est. 1855</span>
                <p className="font-serif text-primary-foreground font-medium text-xs mt-0.5">
                  Lakshmi Narayan Gopal Radha Krishna Jew Trust
                </p>
              </div>
              <div className="p-2.5 rounded-sm bg-white/5 border border-white/10">
                <span className="text-[10px] text-rose-gold block uppercase tracking-wider font-semibold">Est. 1950s</span>
                <p className="font-serif text-primary-foreground font-medium text-xs mt-0.5">
                  Khelat Ghosh Memorial Trust
                </p>
              </div>
              <div className="p-2.5 rounded-sm bg-white/5 border border-white/10">
                <span className="text-[10px] text-rose-gold block uppercase tracking-wider font-semibold">Est. 2000+</span>
                <p className="font-serif text-primary-foreground font-medium text-xs mt-0.5">
                  Artist Nectar Council of Culture
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-rose-gold">
              {t.footer.contactTitle}
            </h4>
            <div className="flex flex-col gap-3 text-xs font-body text-primary-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-gold mt-0.5 flex-shrink-0" />
                <span>47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-gold flex-shrink-0" />
                <a href="tel:+919831093021" className="hover:text-rose-gold transition-colors">
                  +91 98310 93021 / +91 99031 34231
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-gold flex-shrink-0" />
                <a href="mailto:councilofculture.ghoshbari47@gmail.com" className="hover:text-rose-gold transition-colors break-all">
                  councilofculture.ghoshbari47@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-white/10">
                <Clock className="w-4 h-4 text-rose-gold mt-0.5 flex-shrink-0" />
                <span>Daily: 6:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-primary-foreground/50 font-body gap-4">
          <p>© 1845 – {new Date().getFullYear()} Khelat Bhavan Rajbari. All rights reserved.</p>
          <p className="font-serif italic text-rose-gold">
            Official digital heritage archive of Pathuria Ghata Ghosh Bari.
          </p>
        </div>
      </div>
    </footer>
  );
}
