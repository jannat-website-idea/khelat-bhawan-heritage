import React, { useEffect, useState } from 'react';
import { Globe2, Menu, X } from 'lucide-react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab, onOpenBooking, content, ready = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[lang].nav;

  useEffect(() => {
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

      {mobileMenuOpen && (
        <div className="heritage-nav__drawer" role="dialog" aria-modal="true" aria-label="Navigation Menu">
          <div className="heritage-nav__drawer-top">
            <span className="heritage-nav__drawer-title">
              {lang === 'bn' ? 'সূচিপত্র' : 'INDEX / MENU'}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="heritage-nav__drawer-close"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="heritage-nav__drawer-pattern" aria-hidden="true" />
          <nav className="heritage-nav__drawer-list" aria-label="Mobile Navigation Menu">
            {navItems.map((item, index) => (
              <button 
                key={item.id} 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(item.id);
                }} 
                className={activeTab === item.id ? 'is-active' : ''}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
