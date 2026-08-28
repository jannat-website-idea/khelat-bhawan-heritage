import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Lightbox from './components/Lightbox';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TimelinePage from './pages/TimelinePage';
import FounderPage from './pages/FounderPage';
import TrusteesPage from './pages/TrusteesPage';
import GalleryPage from './pages/GalleryPage';
import HeritageRentalPage from './pages/HeritageRentalPage';
import ContactPage from './pages/ContactPage';

import { siteData } from './data/content';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  // Sync hash routing so users can link directly to #gallery, #about, #timeline, etc.
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'heritage', 'timeline', 'founder', 'trustees', 'gallery', 'rental', 'contact'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update hash when activeTab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync document title and html lang
  useEffect(() => {
    document.documentElement.lang = lang;
    const tabName = siteData[lang].nav[activeTab] || 'Heritage';
    document.title = lang === 'bn' 
      ? `খেলাৎ ভবন রাজবাড়ি | ${tabName}`
      : `Khelat Bhavan Rajbari | ${tabName}`;
  }, [lang, activeTab]);

  // Gallery items for lightbox navigation
  const galleryItems = siteData[lang].gallery.items;
  const currentLightboxIndex = lightboxItem 
    ? galleryItems.findIndex(i => i.id === lightboxItem.id) 
    : -1;

  const handleLightboxNext = () => {
    if (currentLightboxIndex < galleryItems.length - 1) {
      setLightboxItem(galleryItems[currentLightboxIndex + 1]);
    }
  };

  const handleLightboxPrev = () => {
    if (currentLightboxIndex > 0) {
      setLightboxItem(galleryItems[currentLightboxIndex - 1]);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between bg-background text-foreground ${lang === 'bn' ? 'font-bengali-text' : 'font-body'}`}>
      {/* Fixed Glass Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenBooking={() => setIsBookingOpen(true)}
        content={siteData}
      />

      {/* Main Routed Page Content */}
      <div className="flex-grow">
        {activeTab === 'home' && (
          <HomePage
            lang={lang}
            setActiveTab={handleTabChange}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'heritage' && (
          <AboutPage
            lang={lang}
            setActiveTab={handleTabChange}
            onOpenBooking={() => setIsBookingOpen(true)}
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
            onOpenBooking={() => setIsBookingOpen(true)}
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
        onOpenBooking={() => setIsBookingOpen(true)}
        content={siteData}
      />

      {/* Booking Enquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        content={siteData}
      />

      {/* Full-Screen Lightbox */}
      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onNext={handleLightboxNext}
        onPrev={handleLightboxPrev}
        hasNext={currentLightboxIndex < galleryItems.length - 1}
        hasPrev={currentLightboxIndex > 0}
      />
    </div>
  );
}
