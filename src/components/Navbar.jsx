import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Menu, 
  X, 
  Calendar, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab, onOpenBooking, content }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = content[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
      {/* Top Aristocratic Bar */}
      <div className="bg-burgundy-950 text-rosegold-200 border-b border-rosegold-800/30 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+919831093021" 
              className="flex items-center space-x-1.5 text-rosegold-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-rosegold-400" />
              <span>+91 98310 93021</span>
            </a>
            <a 
              href="mailto:councilofculture.ghoshbari47@gmail.com" 
              className="flex items-center space-x-1.5 text-rosegold-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-rosegold-400" />
              <span>councilofculture.ghoshbari47@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-rosegold-300">
              <MapPin className="w-3.5 h-3.5 text-rosegold-400" />
              <span>47, Pathuria Ghata Street, Kolkata</span>
            </span>
            <span className="text-rosegold-400 font-serif italic tracking-wider font-semibold border-l border-rosegold-800/60 pl-4">
              Est. 1845
            </span>

            {/* Language Switcher in Top Bar */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center space-x-1 px-2.5 py-0.5 rounded border border-rosegold-500/40 bg-burgundy-900/60 text-rosegold-200 hover:text-white hover:border-rosegold-400 transition-all text-[11px] font-medium"
            >
              <Globe className="w-3 h-3 text-rosegold-400" />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav
        className={`transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md border-rosegold-200/50 py-3' 
            : 'bg-[#FAF8F5]/90 backdrop-blur-sm border-rosegold-100/70 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group"
          >
            <div className="w-10 h-10 rounded-full border border-rosegold-400/80 bg-rosegold-50 flex items-center justify-center text-burgundy-900 shadow-inner group-hover:border-rosegold-500 transition-colors">
              <span className="font-serif font-bold text-lg text-rosegold-600">KB</span>
            </div>
            <div>
              <span className="block font-serif font-bold tracking-wider text-burgundy-900 text-lg md:text-xl leading-none group-hover:text-rosegold-700 transition-colors">
                {t.brand}
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-rosegold-700 uppercase font-sans font-medium mt-0.5">
                Pathuria Ghata Ghosh Bari
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide uppercase transition-all relative ${
                    isActive 
                      ? 'text-burgundy-900 font-semibold bg-rosegold-100/60' 
                      : 'text-heritage-charcoal hover:text-burgundy-900 hover:bg-rosegold-50/70'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-rosegold-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Switch Button for Tablet / Desktop */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded border border-rosegold-300 text-burgundy-900 hover:bg-rosegold-100/60 transition-all xl:hidden"
            >
              <Globe className="w-3.5 h-3.5 text-rosegold-600" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Booking CTA Button */}
            <button
              onClick={onOpenBooking}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-rosegold-500 hover:bg-rosegold-600 text-white text-xs font-semibold tracking-wider uppercase shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-rosegold-100" />
              <span>{t.bookCta}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 xl:hidden">
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-2 py-1 text-xs font-bold text-burgundy-900 border border-rosegold-300 rounded sm:hidden"
            >
              {lang === 'en' ? 'বাংলা' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-burgundy-900 hover:bg-rosegold-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[60px] md:top-[90px] bg-burgundy-950/98 backdrop-blur-xl z-40 text-rosegold-100 p-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
          <div className="space-y-4 pt-4">
            <div className="text-center pb-4 border-b border-rosegold-800/40">
              <span className="font-serif text-xl font-bold tracking-wider text-rosegold-300">
                {t.brand}
              </span>
              <p className="text-xs text-rosegold-400 mt-1">Est. 1845 • Pathuria Ghata</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between p-3 rounded-lg text-sm tracking-wide transition-all ${
                      isActive 
                        ? 'bg-rosegold-500 text-white font-semibold' 
                        : 'hover:bg-burgundy-900 text-rosegold-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rosegold-500'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-rosegold-800/40 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-lg bg-rosegold-500 text-white font-semibold text-sm tracking-wider uppercase shadow-lg text-center flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookCta}</span>
            </button>

            <div className="text-center text-xs text-rosegold-400 space-y-1">
              <p>councilofculture.ghoshbari47@gmail.com</p>
              <p>+91 98310 93021 / +91 99031 34231</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
