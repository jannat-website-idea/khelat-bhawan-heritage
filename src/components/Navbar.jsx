import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Globe } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Aristocratic Details Bar */}
      <div className="bg-navy-deep text-white/90 text-[11px] font-body py-1.5 px-6 hidden lg:block border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="tel:+919831093021" className="hover:text-rose-gold transition-colors flex items-center gap-1.5 font-medium">
              <Phone className="w-3 h-3 text-rose-gold" />
              <span>+91 98310 93021</span>
            </a>
            <a href="mailto:councilofculture.ghoshbari47@gmail.com" className="hover:text-rose-gold transition-colors flex items-center gap-1.5 font-medium">
              <Mail className="w-3 h-3 text-rose-gold" />
              <span>councilofculture.ghoshbari47@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3 h-3 text-rose-gold" />
              <span>47, Pathuria Ghata Street, Kolkata – 700006</span>
            </span>
            <span className="text-rose-gold font-body tracking-wider uppercase font-semibold text-[10px] pl-3 border-l border-white/20">
              Est. 1845
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`transition-all duration-500 ${
          scrolled 
            ? 'bg-card/95 backdrop-blur-xl shadow-lg border-b border-border py-3.5 text-foreground' 
            : 'bg-black/55 backdrop-blur-md border-b border-white/15 py-4 text-white'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Brand */}
          <button onClick={() => handleNavClick('home')} className="flex flex-col text-left group">
            <span className={`font-serif text-2xl md:text-3xl font-bold tracking-wide transition-colors ${
              scrolled ? 'text-foreground group-hover:text-accent' : 'text-white group-hover:text-rose-gold'
            }`}>
              {lang === 'bn' ? 'খেলাৎ ভবন রাজবাড়ি' : 'Khelat Bhavan'}
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-rose-gold font-body font-semibold">
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
                  className={`text-xs tracking-[0.18em] uppercase font-body font-bold transition-all duration-200 ${
                    isActive
                      ? scrolled
                        ? 'text-accent border-b-2 border-accent pb-0.5'
                        : 'text-rose-gold border-b-2 border-rose-gold pb-0.5'
                      : scrolled
                        ? 'text-foreground/90 hover:text-accent'
                        : 'text-white/90 hover:text-rose-gold drop-shadow-sm'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase font-body font-bold border rounded-sm transition-colors ${
                scrolled
                  ? 'border-border text-foreground hover:border-accent hover:text-accent'
                  : 'border-white/40 text-white hover:border-rose-gold hover:text-rose-gold bg-black/20'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-rose-gold" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Book Event CTA Button */}
            <button
              onClick={onOpenBooking}
              className="bg-accent text-accent-foreground px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-body font-bold hover:bg-matte-red transition-all shadow-md rounded-sm hover:scale-[1.02]"
            >
              {t.bookCta}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 xl:hidden">
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className={`px-2.5 py-1 text-xs tracking-wider uppercase font-body font-bold border rounded-sm sm:hidden ${
                scrolled ? 'border-border text-foreground' : 'border-white/50 text-white'
              }`}
            >
              {lang === 'en' ? 'বাংলা' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors ${scrolled ? 'text-foreground hover:text-accent' : 'text-white hover:text-rose-gold'}`}
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
            <div className="text-center pb-4 border-b border-primary-foreground/15">
              <span className="font-serif text-3xl font-bold tracking-wide text-white">
                Khelat Bhavan
              </span>
              <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mt-1 font-semibold">
                Rajbari · Pathuriaghata
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`py-3.5 px-4 text-left text-sm tracking-[0.2em] uppercase font-body font-semibold transition-colors rounded-sm ${
                      isActive ? 'bg-accent text-accent-foreground font-bold shadow-md' : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-primary-foreground/15 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 bg-accent text-accent-foreground text-xs tracking-[0.2em] uppercase font-body font-bold hover:bg-matte-red transition-colors text-center rounded-sm shadow-md"
            >
              {t.bookCta}
            </button>

            <div className="text-center text-xs text-white/70 space-y-1">
              <p>councilofculture.ghoshbari47@gmail.com</p>
              <p>+91 98310 93021 / +91 99031 34231</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
