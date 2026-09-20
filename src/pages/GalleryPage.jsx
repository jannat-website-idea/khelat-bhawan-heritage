import React, { useState, useEffect, useCallback } from 'react';
import { getAssetUrl } from '../utils/assetHelper';
import { photographyGalleryData, filmsGalleryData } from '../data/galleryData';
import CurvedGalleryCarousel from '../components/CurvedGalleryCarousel';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Film, 
  Camera, 
  Calendar, 
  User, 
  Maximize2 
} from 'lucide-react';

export default function GalleryPage({ lang = 'en', onOpenLightbox }) {
  const isBn = lang === 'bn';

  // Fullscreen State for Photography Lightbox
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Cinematic Theater State for Film Player
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(null);

  // Keyboard navigation inside modal viewers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
        setSelectedFilmIndex(null);
      }
      // Photo modal navigation
      if (selectedPhotoIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setSelectedPhotoIndex((prev) => (prev - 1 + photographyGalleryData.length) % photographyGalleryData.length);
        } else if (e.key === 'ArrowRight') {
          setSelectedPhotoIndex((prev) => (prev + 1) % photographyGalleryData.length);
        }
      }
      // Film modal navigation
      if (selectedFilmIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setSelectedFilmIndex((prev) => (prev - 1 + filmsGalleryData.length) % filmsGalleryData.length);
        } else if (e.key === 'ArrowRight') {
          setSelectedFilmIndex((prev) => (prev + 1) % filmsGalleryData.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, selectedFilmIndex]);

  const activePhoto = selectedPhotoIndex !== null ? photographyGalleryData[selectedPhotoIndex] : null;
  const activeFilm = selectedFilmIndex !== null ? filmsGalleryData[selectedFilmIndex] : null;

  return (
    <main className="gallery-immersive-page pt-28 sm:pt-36 pb-24 min-h-screen text-[#f4efe6] bg-[#120a08] relative overflow-hidden">
      {/* Deep Atmospheric Architectural Background */}
      <div className="gallery-immersive-backdrop" aria-hidden="true">
        <div className="gallery-backdrop-watermark" />
        <div className="gallery-backdrop-vignette" />
        <div className="gallery-backdrop-radial-glow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            PAGE INTRO (Minimal, refined, elegant)
           ========================================================================= */}
        <header className="text-center max-w-3xl mx-auto pt-4 sm:pt-8 pb-10 sm:pb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-3 text-[#d4af37]" aria-hidden="true">
            <span className="w-10 h-[1px] bg-[#d4af37]/60" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] uppercase text-[#d4af37]">
              {isBn ? 'গ্যালারি' : 'GALLERY'}
            </span>
            <span className="w-10 h-[1px] bg-[#d4af37]/60" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#fdfbf7] tracking-tight">
            {isBn ? 'সময়ের পরিক্রমায় এক অমর যাত্রা' : 'A Journey Through Time'}
          </h1>

          <p className="font-serif italic text-sm sm:text-base lg:text-lg text-[#a89083] leading-relaxed">
            {isBn 
              ? 'খেলাৎ ভবনের জীবন্ত ঐতিহ্য, ঐতিহাসিক স্থান ও সাংস্কৃতিক স্মৃতির নির্বাচিত সংকলন।'
              : 'Spaces, stories and moments from the living heritage of Khelat Bhawan.'}
          </p>
        </header>

        {/* =========================================================================
            SECTION 01 — PHOTOGRAPHY (Immersive 3D Curved Gallery)
           ========================================================================= */}
        <section 
          className="gallery-section relative pt-4 pb-16 sm:pb-24 border-b border-[#d4af37]/20"
          aria-label={isBn ? 'চিত্রশালা' : 'Photography Gallery'}
        >
          <div className="flex items-center justify-between mb-2 px-2 sm:px-6">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] uppercase text-[#d4af37]">
                {isBn ? '০১ — আলোকচিত্র সংকলন' : '01 — PHOTOGRAPHY'}
              </span>
            </div>
            <span className="text-[11px] font-serif italic text-[#a89083]">
              {isBn ? 'প্রাঙ্গণ ও স্থাপত্য' : 'Architecture & Heritage Spaces'}
            </span>
          </div>

          {/* Curved 3D Photography Carousel */}
          <CurvedGalleryCarousel
            items={photographyGalleryData}
            mediaType="image"
            lang={lang}
            onSelectMedia={(item, index) => setSelectedPhotoIndex(index)}
          />
        </section>

        {/* =========================================================================
            SECTION 02 — FILMS / VIDEO GALLERY (Immersive 3D Curved Video Gallery)
           ========================================================================= */}
        <section 
          className="gallery-section relative pt-16 sm:pt-28 pb-12"
          aria-label={isBn ? 'ভিডিও ও চলচ্চিত্র' : 'Films and Video Gallery'}
        >
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2">
            <div className="inline-flex items-center justify-center gap-2">
              <Film className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] uppercase text-[#d4af37]">
                {isBn ? '০২ — চলচ্চিত্র ও প্রামাণ্যচিত্র' : '02 — FILMS'}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#fdfbf7] tracking-tight">
              {isBn ? 'চলচ্চিত্রে জীবন্ত ঐতিহ্য' : 'Stories in Motion'}
            </h2>
            <p className="font-serif italic text-xs sm:text-sm text-[#a89083]">
              {isBn 
                ? 'ভিডিও পরিভ্রমণ ও সিনেমাটিক প্রামাণ্যচিত্রের মাধ্যমে ঐতিহ্যের জীবন্ত রূপ প্রত্যক্ষ করুন।'
                : 'Cinematic archives and documentary walkthroughs capturing the soul of Khelat Bhawan.'}
            </p>
          </div>

          {/* Curved 3D Films Carousel */}
          <CurvedGalleryCarousel
            items={filmsGalleryData}
            mediaType="video"
            lang={lang}
            onSelectMedia={(item, index) => setSelectedFilmIndex(index)}
          />
        </section>

        {/* =========================================================================
            CORNER EDITORIAL BADGES (Matching visual reference)
           ========================================================================= */}
        <footer className="pt-16 sm:pt-24 pb-6 flex items-center justify-between text-[10px] sm:text-xs tracking-[0.24em] font-serif uppercase text-[#8c6e4e]/70 border-t border-[#d4af37]/15">
          <div className="space-y-0.5 text-left">
            <div>A HERITAGE</div>
            <div>THAT LIVES ON</div>
          </div>

          <div className="text-center">
            <span className="text-[#d4af37]">✦</span>
          </div>

          <div className="space-y-0.5 text-right">
            <div>KOLKATA</div>
            <div>INDIA</div>
          </div>
        </footer>
      </div>

      {/* =========================================================================
          FULLSCREEN IMAGE VIEWER LIGHTBOX
         ========================================================================= */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#100806]/96 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setSelectedPhotoIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar: Close Button, Counter, Category */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-[#f4efe6] z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-[#d4af37]">
                {String(selectedPhotoIndex + 1).padStart(2, '0')} / {String(photographyGalleryData.length).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase font-serif tracking-widest text-[#a89083] hidden sm:inline">
                {typeof activePhoto.category === 'object' ? (activePhoto.category[lang] || activePhoto.category.en) : activePhoto.category}
              </span>
            </div>

            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e100c] border border-[#d4af37]/40 text-xs font-mono uppercase tracking-widest text-[#f4efe6] hover:bg-[#d4af37] hover:text-[#120a08] transition-colors"
              aria-label={isBn ? 'বন্ধ করুন' : 'Close image'}
            >
              <span>{isBn ? 'বন্ধ করুন' : 'CLOSE IMAGE'}</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Left Arrow Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex((prev) => (prev - 1 + photographyGalleryData.length) % photographyGalleryData.length);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1e100c]/80 border border-[#d4af37]/40 text-[#f4efe6] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#120a08] transition-colors z-20"
            aria-label={isBn ? 'পূর্ববর্তী ছবি' : 'Previous photograph'}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Photo Center Container */}
          <div 
            className="relative max-w-5xl max-h-[82vh] p-2 flex flex-col items-center justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getAssetUrl(activePhoto.src)}
              alt={typeof activePhoto.title === 'object' ? (activePhoto.title[lang] || activePhoto.title.en) : activePhoto.title}
              className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl border border-[#d4af37]/30"
            />
            
            {/* Caption & Description */}
            <div className="mt-4 text-center space-y-1">
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#fdfbf7] tracking-wide">
                {typeof activePhoto.title === 'object' ? (activePhoto.title[lang] || activePhoto.title.en) : activePhoto.title}
              </h3>
              {activePhoto.desc && (
                <p className="font-serif italic text-xs sm:text-sm text-[#a89083] max-w-xl mx-auto">
                  {typeof activePhoto.desc === 'object' ? (activePhoto.desc[lang] || activePhoto.desc.en) : activePhoto.desc}
                </p>
              )}
            </div>
          </div>

          {/* Right Arrow Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex((prev) => (prev + 1) % photographyGalleryData.length);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1e100c]/80 border border-[#d4af37]/40 text-[#f4efe6] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#120a08] transition-colors z-20"
            aria-label={isBn ? 'পরবর্তী ছবি' : 'Next photograph'}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* =========================================================================
          CINEMATIC FILM THEATER PLAYER
         ========================================================================= */}
      {activeFilm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0605]/98 backdrop-blur-2xl animate-in fade-in duration-300"
          onClick={() => setSelectedFilmIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-[#f4efe6] z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-[#d4af37]">
                {String(selectedFilmIndex + 1).padStart(2, '0')} / {String(filmsGalleryData.length).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase font-serif tracking-widest text-[#a89083] hidden sm:inline">
                {typeof activeFilm.category === 'object' ? (activeFilm.category[lang] || activeFilm.category.en) : activeFilm.category}
              </span>
            </div>

            <button
              onClick={() => setSelectedFilmIndex(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e100c] border border-[#d4af37]/40 text-xs font-mono uppercase tracking-widest text-[#f4efe6] hover:bg-[#d4af37] hover:text-[#120a08] transition-colors"
              aria-label={isBn ? 'বন্ধ করুন' : 'Close film'}
            >
              <span>{isBn ? 'বন্ধ করুন' : 'CLOSE FILM'}</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Film Video Player Container */}
          <div 
            className="relative w-full max-w-5xl max-h-[85vh] p-4 flex flex-col items-center justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-[#d4af37]/40">
              <video
                src={getAssetUrl(activeFilm.src)}
                poster={getAssetUrl(activeFilm.poster)}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Video Meta & Prev/Next Controls Underneath */}
            <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left space-y-0.5">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#fdfbf7]">
                  {typeof activeFilm.title === 'object' ? (activeFilm.title[lang] || activeFilm.title.en) : activeFilm.title}
                </h3>
                {activeFilm.desc && (
                  <p className="font-serif text-xs text-[#a89083] max-w-xl">
                    {typeof activeFilm.desc === 'object' ? (activeFilm.desc[lang] || activeFilm.desc.en) : activeFilm.desc}
                  </p>
                )}
              </div>

              {/* Prev / Next Film Quick Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setSelectedFilmIndex((prev) => (prev - 1 + filmsGalleryData.length) % filmsGalleryData.length)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1e100c] border border-[#d4af37]/40 text-xs font-serif text-[#f4efe6] hover:bg-[#d4af37] hover:text-[#120a08] transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{isBn ? 'পূর্ববর্তী' : 'PREV FILM'}</span>
                </button>

                <button
                  onClick={() => setSelectedFilmIndex((prev) => (prev + 1) % filmsGalleryData.length)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1e100c] border border-[#d4af37]/40 text-xs font-serif text-[#f4efe6] hover:bg-[#d4af37] hover:text-[#120a08] transition-colors"
                >
                  <span>{isBn ? 'পরবর্তী' : 'NEXT FILM'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
