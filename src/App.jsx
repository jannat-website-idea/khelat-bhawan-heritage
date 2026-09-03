import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Lightbox from './components/Lightbox';
import HeritageLoader from './components/HeritageLoader';
import useHeritageMotion from './hooks/useHeritageMotion';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TimelinePage from './pages/TimelinePage';
import FounderPage from './pages/FounderPage';
import TrusteesPage from './pages/TrusteesPage';
import GalleryPage from './pages/GalleryPage';
import HeritageRentalPage from './pages/HeritageRentalPage';
import ContactPage from './pages/ContactPage';

import { siteData } from './data/content';
import { galleryData } from './data/galleryData';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingEvent, setBookingEvent] = useState('');
  const [lightboxItem, setLightboxItem] = useState(null);
  useHeritageMotion(activeTab, lang, loading);

  const handleOpenBooking = (eventName = '') => {
    setBookingEvent(typeof eventName === 'string' ? eventName : '');
    setIsBookingOpen(true);
  };

  // Sync hash routing so users can link directly to #gallery, #about, #timeline, etc.
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
      const validTabs = ['home', 'heritage', 'timeline', 'founder', 'trustees', 'gallery', 'rental', 'contact'];
      if (!rawHash || rawHash === 'home') {
        setActiveTab('home');
      } else if (validTabs.includes(rawHash)) {
        setActiveTab(rawHash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update hash and reset scroll when activeTab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#home') {
        try {
          history.pushState('', document.title, window.location.pathname + window.location.search);
        } catch {
          window.location.hash = 'home';
        }
      }
    } else {
      window.location.hash = tab;
    }
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Scroll to top whenever activeTab changes
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]);

  // Sync document title and html lang
  useEffect(() => {
    document.documentElement.lang = lang;
    const tabName = siteData[lang].nav[activeTab] || 'Heritage';
    document.title = lang === 'bn' 
      ? `খেলাৎ ভবন রাজবাড়ি | ${tabName}`
      : `Khelat Bhawan | ${tabName}`;
  }, [lang, activeTab]);

  useEffect(() => {
    if (loading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, wheelMultiplier: 0.85, touchMultiplier: 1.05 });
    window.__lenis = lenis;
    let frame;
    const animate = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [loading]);

  useEffect(() => {
    let observer;
    const frame = requestAnimationFrame(() => {
      const nodes = document.querySelectorAll('.heritage-section, .heritage-devotion > :not(.heritage-devotion__pattern), .heritage-booking__content');
      nodes.forEach((node) => node.classList.add('heritage-reveal'));
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
      nodes.forEach((node) => observer.observe(node));
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [activeTab, lang]);

  // Comprehensive gallery items for lightbox navigation
  const currentLightboxIndex = lightboxItem 
    ? galleryData.findIndex(i => i.id === lightboxItem.id) 
    : -1;

  const handleLightboxNext = () => {
    if (currentLightboxIndex < galleryData.length - 1) {
      setLightboxItem(galleryData[currentLightboxIndex + 1]);
    }
  };

  const handleLightboxPrev = () => {
    if (currentLightboxIndex > 0) {
      setLightboxItem(galleryData[currentLightboxIndex - 1]);
    }
  };

  return (
    <>
    {loading && <HeritageLoader onComplete={setLoading} lang={lang} />}
    <div inert={loading ? '' : undefined} aria-hidden={loading || undefined} className={`min-h-screen flex flex-col justify-between bg-background text-foreground ${lang === 'bn' ? 'font-bengali-text' : 'font-body'}`}>
      {/* Fixed Glass Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenBooking={handleOpenBooking}
        content={siteData}
      />

      {/* Main Routed Page Content */}
      <div className="flex-grow" data-page-content>
        {activeTab === 'home' && (
          <HomePage
            lang={lang}
            setActiveTab={handleTabChange}
            onOpenBooking={handleOpenBooking}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'heritage' && (
          <AboutPage
            lang={lang}
            setActiveTab={handleTabChange}
            onOpenBooking={handleOpenBooking}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelinePage
            lang={lang}
            setActiveTab={handleTabChange}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'founder' && (
          <FounderPage
            lang={lang}
            setActiveTab={handleTabChange}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'trustees' && (
          <TrusteesPage
            lang={lang}
            setActiveTab={handleTabChange}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage
            lang={lang}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'rental' && (
          <HeritageRentalPage
            lang={lang}
            onOpenBooking={handleOpenBooking}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            lang={lang}
            content={siteData}
          />
        )}
      </div>

      {/* Luxury Heritage Footer */}
      <Footer
        lang={lang}
        setActiveTab={handleTabChange}
        onOpenBooking={handleOpenBooking}
        content={siteData}
      />

      {/* Booking Enquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingEvent('');
        }}
        lang={lang}
        content={siteData}
        initialEvent={bookingEvent}
      />

      {/* Full-Screen Lightbox */}
      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onNext={handleLightboxNext}
        onPrev={handleLightboxPrev}
        hasNext={currentLightboxIndex < galleryData.length - 1}
        hasPrev={currentLightboxIndex > 0}
      />
    </div>
    </>
  );
}
