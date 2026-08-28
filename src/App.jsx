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

  // Sync title and html lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'bn' 
      ? 'খেলাৎ ভবন | ১৮৪৫ সাল থেকে জীবন্ত ঐতিহ্য' 
      : 'Khelat Bhawan | Living Heritage Since 1845';
  }, [lang]);

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
    <div className={`min-h-screen flex flex-col justify-between bg-[#FAF8F5] text-heritage-charcoal ${lang === 'bn' ? 'font-bengali-text' : 'font-sans'}`}>
      {/* Sticky Luxury Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => setIsBookingOpen(true)}
        content={siteData}
      />

      {/* Main Page View Content */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomePage
            lang={lang}
            setActiveTab={setActiveTab}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'heritage' && (
          <AboutPage
            lang={lang}
            setActiveTab={setActiveTab}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelinePage
            lang={lang}
            setActiveTab={setActiveTab}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'founder' && (
          <FounderPage
            lang={lang}
            setActiveTab={setActiveTab}
            onOpenLightbox={(item) => setLightboxItem(item)}
            content={siteData}
          />
        )}

        {activeTab === 'trustees' && (
          <TrusteesPage
            lang={lang}
            setActiveTab={setActiveTab}
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
      </main>

      {/* Luxury Heritage Footer */}
      <Footer
        lang={lang}
        setActiveTab={setActiveTab}
        onOpenBooking={() => setIsBookingOpen(true)}
        content={siteData}
      />

      {/* Royal Booking Modal */}
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
