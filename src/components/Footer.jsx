import React from 'react';
import { Phone, Mail, MapPin, Clock, Heart, Shield, Award } from 'lucide-react';
import AlpanaDivider from './AlpanaDivider';

export default function Footer({ lang, setActiveTab, onOpenBooking, content }) {
  const t = content[lang];

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-burgundy-950 text-rosegold-100 relative border-t-2 border-rosegold-500/40 overflow-hidden">
      {/* Background Subtle Alpana Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(184,125,101,0.12)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <AlpanaDivider light={true} className="mb-10 opacity-75" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-rosegold-900/80">
          {/* Column 1: Identity & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-rosegold-400 bg-burgundy-900 flex items-center justify-center font-serif font-bold text-rosegold-300">
                KB
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-rosegold-200 tracking-wider">
                  {t.nav.brand}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-rosegold-400">
                  Est. 1845 • Pathuria Ghata
                </p>
              </div>
            </div>

            <p className="text-xs text-rosegold-300/80 leading-relaxed font-light">
              {t.footer.tagline}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 rounded bg-rosegold-500 hover:bg-rosegold-600 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
              >
                {t.nav.bookCta}
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-rosegold-200 tracking-wide border-b border-rosegold-800/60 pb-2">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs text-rosegold-300">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('heritage')} className="hover:text-white transition-colors">
                  {t.nav.heritage}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('timeline')} className="hover:text-white transition-colors">
                  {t.nav.timeline}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('founder')} className="hover:text-white transition-colors">
                  {t.nav.founder} (Babu Khelat Ghosh)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('trustees')} className="hover:text-white transition-colors">
                  {t.nav.trustees}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors">
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rental')} className="hover:text-white transition-colors">
                  {t.nav.rental}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Three Cultural Trusts */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-rosegold-200 tracking-wide border-b border-rosegold-800/60 pb-2">
              {t.footer.trustsTitle}
            </h4>
            <div className="space-y-3 text-xs text-rosegold-300">
              <div className="p-2.5 rounded bg-burgundy-900/60 border border-rosegold-800/40">
                <span className="text-[10px] text-rosegold-400 font-semibold block uppercase">Est. 1855</span>
                <p className="font-serif text-rosegold-200 font-medium text-xs">
                  Lakshmi Narayan Gopal Radha Krishna Jew Trust
                </p>
              </div>
              <div className="p-2.5 rounded bg-burgundy-900/60 border border-rosegold-800/40">
                <span className="text-[10px] text-rosegold-400 font-semibold block uppercase">Est. 1950s</span>
                <p className="font-serif text-rosegold-200 font-medium text-xs">
                  Khelat Ghosh Memorial Trust
                </p>
              </div>
              <div className="p-2.5 rounded bg-burgundy-900/60 border border-rosegold-800/40">
                <span className="text-[10px] text-rosegold-400 font-semibold block uppercase">Est. 2000+</span>
                <p className="font-serif text-rosegold-200 font-medium text-xs">
                  Artist Nectar Council of Culture
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Official Contact & Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-rosegold-200 tracking-wide border-b border-rosegold-800/60 pb-2">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-rosegold-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-rosegold-400 mt-0.5 flex-shrink-0" />
                <span>47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-rosegold-400 flex-shrink-0" />
                <a href="tel:+919831093021" className="hover:text-white transition-colors">
                  +91 98310 93021 / +91 99031 34231
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-rosegold-400 flex-shrink-0" />
                <a href="mailto:councilofculture.ghoshbari47@gmail.com" className="hover:text-white transition-colors truncate">
                  councilofculture.ghoshbari47@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-2 pt-1 border-t border-rosegold-900/60">
                <Clock className="w-4 h-4 text-rosegold-400 mt-0.5 flex-shrink-0" />
                <span className="text-[11px] text-rosegold-300">Daily: 6:00 AM – 10:00 PM (Prior appointment recommended)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-rosegold-400/80 space-y-3 sm:space-y-0">
          <p>© 1845 – {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="italic font-serif text-rosegold-400">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
