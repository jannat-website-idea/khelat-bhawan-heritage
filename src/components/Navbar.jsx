import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab, onOpenBooking, content }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = content[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'heritage', label: t.heritage },
    { id: 'timeline', label: t.timeline },
    { id: 'founder', label: t.founder },
    { id: 'trustees', label: t.trustees },
    { id: 'gallery', label: t.gallery },
    { id: 'rental', label: t.rental },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Aristocratic Details Bar */}
      <div className="bg-navy-deep text-primary-foreground/80 text-[11px] font-body py-1.5 px-4 hidden lg:block border-b border-border/20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="tel:+919831093021" className="hover:text-rose-gold transition-colors flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-rose-gold" />
              <span>+91 98310 93021</span>
            </a>
            <a href="mailto:councilofculture.ghoshbari47@gmail.com" className="hover:text-rose-gold transition-colors flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-rose-gold" />
              <span>councilofculture.ghoshbari47@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-primary-foreground/70">
              <MapPin className="w-3 h-3 text-rose-gold" />
              <span>47, Pathuria Ghata Street, Kolkata – 700006</span>
            </span>
            <span className="text-rose-gold font-body tracking-wider uppercase font-semibold text-[10px] pl-3 border-l border-border/30">
              Est. 1845
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Nav */}
      <nav className={`transition-all duration-500 ${scrolled ? 'glass-nav-scrolled shadow-sm border-b border-border/40 py-3.5' : 'glass-nav py-4'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Brand */}
          <button onClick={() => handleNavClick('home')} className="flex flex-col text-left group">
            <span className="font-serif text-xl md:text-2xl font-bold text-foreground tracking-wide group-hover:text-accent transition-colors">
              {lang === 'bn' ? 'খেলাৎ ভবন রাজবাড়ি' : 'Khelat Bhavan'}
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-rose-gold font-body">
              {lang === 'bn' ? 'রাজবাড়ি · পাথুরিয়াঘাটা' : 'Rajbari · Pathuriaghata'}
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs tracking-[0.18em] uppercase font-body font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-accent border-b-2 border-accent pb-0.5'
                      : 'text-foreground/80 hover:text-accent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase font-body font-medium border border-border/80 hover:border-accent rounded-sm text-foreground transition-colors"
            >
              <Globe className="w-3 h-3 text-rose-gold" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Book Event CTA Button */}
            <button
              onClick={onOpenBooking}
              className="bg-accent text-accent-foreground px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-body font-semibold hover:bg-matte-red transition-all shadow-sm rounded-sm"
            >
              {t.bookCta}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 xl:hidden">
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-2.5 py-1 text-xs tracking-wider uppercase font-body border border-border text-foreground rounded-sm sm:hidden"
            >
              {lang === 'en' ? 'বাংলা' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground hover:text-accent transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[65px] md:top-[85px] gradient-heritage text-primary-foreground p-6 flex flex-col justify-between overflow-y-auto animate-fade-in z-40">
          <div className="space-y-4 pt-4">
            <div className="text-center pb-4 border-b border-primary-foreground/10">
              <span className="font-serif text-2xl font-bold tracking-wide text-primary-foreground">
                Khelat Bhavan
              </span>
              <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mt-1">
                Rajbari · Pathuriaghata
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`py-3 px-4 text-left text-sm tracking-[0.2em] uppercase font-body transition-colors rounded-sm ${
                      isActive ? 'bg-accent text-accent-foreground font-semibold' : 'text-primary-foreground/80 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-primary-foreground/10 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-accent text-accent-foreground text-xs tracking-[0.2em] uppercase font-body font-semibold hover:bg-matte-red transition-colors text-center"
            >
              {t.bookCta}
            </button>

            <div className="text-center text-xs text-primary-foreground/60 space-y-1">
              <p>councilofculture.ghoshbari47@gmail.com</p>
              <p>+91 98310 93021 / +91 99031 34231</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
