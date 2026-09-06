import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Globe2, Menu, X, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab, onOpenBooking, content, ready = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = content[lang].nav;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'heritage', label: t.heritage },
    { id: 'timeline', label: t.timeline },
    { id: 'founder', label: t.founder },
    { id: 'trustees', label: t.trustees },
    { id: 'gallery', label: t.gallery },
    { id: 'rental', label: t.rental || (lang === 'bn' ? 'হেরিটেজ পরিসর' : 'Heritage Rental') },
    { id: 'feedback', label: t.feedback || (lang === 'bn' ? 'মতামত' : 'Feedback') },
    { id: 'contact', label: t.contact },
  ];

  const navigate = (id) => {
    setMobileMenuOpen(false);
    setActiveTab(id);
  };

  return (
    <>
      <header className={`heritage-nav ${activeTab === 'home' && !scrolled ? 'heritage-nav--hero' : ''} ${scrolled ? 'heritage-nav--scrolled' : ''} ${ready ? 'is-site-ready' : 'is-site-waiting'}`}>
        <div className="heritage-nav__inner">
          <button 
            type="button"
            className="heritage-brand" 
            onClick={(e) => {
              e.preventDefault();
              navigate('home');
            }} 
            aria-label="Khelat Bhawan home"
          >
            <strong>{lang === 'bn' ? 'খেলাৎ ভবন' : 'KHELAT BHAWAN'}</strong>
            <span>{lang === 'bn' ? 'পাথুরিয়াঘাটা · প্রতিষ্ঠিত ১৮৪৫' : 'PATHURIA GHATA · EST. 1845'}</span>
          </button>

          <nav className="heritage-nav__links" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.id);
                }} 
                className={activeTab === item.id ? 'is-active' : ''}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="heritage-nav__actions">
            <button 
              type="button"
              className="heritage-language" 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} 
              aria-label="Change language"
            >
              <Globe2 aria-hidden="true" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>
            <button 
              type="button"
              className="heritage-menu-btn" 
              onClick={() => setMobileMenuOpen((open) => !open)} 
              aria-label="Toggle navigation menu" 
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              <span>{mobileMenuOpen ? (lang === 'bn' ? 'বন্ধ' : 'CLOSE') : (lang === 'bn' ? 'মেনু' : 'MENU')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Portal Navigation Overlay (Never clipped by header transforms) */}
      {mounted && mobileMenuOpen && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-[#170505]/98 text-rose-50 flex flex-col justify-between p-6 sm:p-10 md:p-14 backdrop-blur-2xl overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Full Navigation Index"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/15">
            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-accent font-body font-semibold">
                {lang === 'bn' ? 'খেলাৎ ভবন রাজবাড়ি · স্থাপিত ১৮৪৫' : 'Khelat Bhawan Rajbari · Est. 1845'}
              </p>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                {lang === 'bn' ? 'সূচিপত্র ও পরিভ্রমণ' : 'Index & Exploration'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 border border-accent/40 rounded-sm text-xs font-semibold tracking-widest uppercase text-accent hover:bg-accent hover:text-black transition-all flex items-center gap-2"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
              <span>{lang === 'bn' ? 'বন্ধ করুন' : 'Close'}</span>
            </button>
          </div>

          {/* Nav Items Grid */}
          <div className="py-8 my-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 max-w-6xl mx-auto">
              {navItems.map((item, index) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.id);
                    }}
                    className={`group flex items-baseline gap-4 py-3 px-3 rounded-sm border-b border-white/10 text-left transition-all ${
                      isActive ? 'text-accent border-accent pl-5 bg-white/5' : 'text-white/85 hover:text-accent hover:pl-5 hover:border-accent/50'
                    }`}
                  >
                    <span className="font-mono text-xs text-accent/70 font-semibold tracking-widest">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-wide">
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body text-white/60">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
              <span>47, Pathuria Ghata Street, Kolkata – 700006</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:+919831093021" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>+91 98310 93021</span>
              </a>
              <a href="mailto:councilofculture.ghoshbari47@gmail.com" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>councilofculture.ghoshbari47@gmail.com</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
