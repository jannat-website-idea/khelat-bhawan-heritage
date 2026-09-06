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

      {/* Full-Screen Portal Navigation Overlay with Brand Royal Theme */}
      {mounted && mobileMenuOpen && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-[#160404]/98 text-[#f7f2e7] flex flex-col justify-between p-6 sm:p-10 md:py-12 md:px-16 backdrop-blur-3xl overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Full Navigation Index"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#c99a4a]/30 max-w-4xl w-full mx-auto">
            <div>
              <p className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.3em] text-[#d8ae62] font-body font-semibold">
                {lang === 'bn' ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি · স্থাপিত ১৮৪৫' : 'PATHURIA GHATA GHOSH BARI · EST. 1845'}
              </p>
              <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-[#fff9ee] mt-0.5">
                {lang === 'bn' ? 'খেলাৎ ভবন সূচিপত্র' : 'KHELAT BHAWAN INDEX'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 border border-[#c99a4a]/50 bg-[#280a0a]/50 text-[#d8ae62] hover:bg-[#d8ae62] hover:text-[#160404] transition-all rounded-sm text-xs font-semibold tracking-widest uppercase flex items-center gap-2"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
              <span>{lang === 'bn' ? 'বন্ধ' : 'CLOSE'}</span>
            </button>
          </div>

          {/* Traditional Alpana Pattern Rail */}
          <div className="h-3 my-2 max-w-4xl w-full mx-auto heritage-nav__drawer-pattern" aria-hidden="true" />

          {/* Single-Line Royal Navigation List */}
          <div className="my-auto py-4 max-w-4xl w-full mx-auto">
            <nav className="flex flex-col divide-y divide-[#c99a4a]/15" aria-label="Royal Directory">
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
                    className={`group flex items-center justify-between py-3.5 sm:py-4 px-2 sm:px-4 w-full text-left transition-all duration-300 ${
                      isActive 
                        ? 'text-[#d8ae62] pl-6 bg-[#250808]/70 border-l-2 border-l-[#d8ae62]' 
                        : 'text-[#f5eedf]/90 hover:text-[#d8ae62] hover:pl-5 hover:bg-[#250808]/40'
                    }`}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono text-[11px] sm:text-xs text-[#d8ae62]/75 font-semibold tracking-widest">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-wide">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[#d8ae62] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-body hidden sm:inline">
                        {lang === 'bn' ? 'প্রবেশ' : 'EXPLORE'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Royal Footer */}
          <div className="pt-5 border-t border-[#c99a4a]/30 max-w-4xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-[#e6decb]/70">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d8ae62] flex-shrink-0" />
              <a 
                href="https://share.google/TFFurvjijjI8QM8eg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d8ae62] transition-colors underline-offset-2 hover:underline"
              >
                47, Pathuria Ghata Street, Kolkata – 700006
              </a>
            </div>

            <div className="flex items-center gap-5 sm:gap-8">
              <a href="tel:+919831093021" className="hover:text-[#d8ae62] transition-colors flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#d8ae62]" />
                <span>+91 98310 93021</span>
              </a>
              <a href="mailto:councilofculture.ghoshbari47@gmail.com" className="hover:text-[#d8ae62] transition-colors flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-[#d8ae62]" />
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
