import React, { useEffect, useState } from 'react';
import { Globe2, Menu, X } from 'lucide-react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab, onOpenBooking, content }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'heritage', label: t.heritage },
    { id: 'timeline', label: t.timeline },
    { id: 'founder', label: t.founder },
    { id: 'trustees', label: t.trustees },
    { id: 'gallery', label: t.gallery },
    { id: 'contact', label: t.contact },
  ];

  const navigate = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`heritage-nav ${scrolled ? 'heritage-nav--scrolled' : ''}`}>
      <div className="heritage-nav__inner">
        <button className="heritage-brand" onClick={() => navigate('home')} aria-label="Khelat Bhawan home">
          <strong>{lang === 'bn' ? 'খেলাৎ ভবন' : 'KHELAT BHAWAN'}</strong>
          <span>{lang === 'bn' ? 'পাথুরিয়াঘাটা · প্রতিষ্ঠিত ১৮৪৫' : 'PATHURIA GHATA · EST. 1845'}</span>
        </button>

        <nav className="heritage-nav__links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} className={activeTab === item.id ? 'is-active' : ''}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="heritage-nav__actions">
          <button className="heritage-language" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} aria-label="Change language">
            <Globe2 aria-hidden="true" />
            <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>
          <button className="heritage-nav__book" onClick={onOpenBooking}>{t.bookCta}</button>
          <button className="heritage-menu" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="heritage-nav__drawer">
          <div className="heritage-nav__drawer-pattern" aria-hidden="true" />
          {navItems.map((item, index) => (
            <button key={item.id} onClick={() => navigate(item.id)} className={activeTab === item.id ? 'is-active' : ''}>
              <span>{String(index + 1).padStart(2, '0')}</span>{item.label}
            </button>
          ))}
          <button className="heritage-nav__drawer-book" onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}>
            {t.bookCta}
          </button>
        </div>
      )}
    </header>
  );
}
