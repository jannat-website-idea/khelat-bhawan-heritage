import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/assetHelper';
import { photographyGalleryData, filmsGalleryData } from '../data/galleryData';
import CurvedGalleryCarousel from '../components/CurvedGalleryCarousel';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Film
} from 'lucide-react';

export default function GalleryPage({ lang = 'en' }) {
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
    <main className="gallery-immersive-page pt-20 sm:pt-24 pb-16 min-h-screen text-[#f4efe6] bg-[#120a08] relative overflow-hidden">
      {/* Full-bleed Atmospheric Heritage Background */}
      <div className="gallery-immersive-backdrop" aria-hidden="true">
        <div className="gallery-backdrop-watermark" />
        <div className="gallery-backdrop-vignette" />
        <div className="gallery-backdrop-radial-glow" />
      </div>

      <div className="relative z-10 w-full">
        {/* =========================================================================
            EDITORIAL HEADER (Matching Reference Mockup)
           ========================================================================= */}
        <header className="text-center pt-6 sm:pt-10 pb-4 sm:pb-8 px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm font-mono tracking-[0.35em] text-[#d4af37] uppercase">
            <span className="opacity-60">—</span>
            <span>{isBn ? 'চিত্রশালা' : 'GALLERY'}</span>
            <span className="opacity-60">—</span>
          </div>
          <h1 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#fdfbf7] font-normal tracking-wide mt-3 mb-2">
            {isBn ? 'সময়ের অনন্ত পরিভ্রমণ' : 'A Journey Through Time'}
          </h1>
          <p className="font-serif text-xs sm:text-sm lg:text-base text-[#c7b299] max-w-xl mx-auto tracking-normal">
            {isBn ? 'খেলাৎ ভবনের জীবন্ত ঐতিহ্যের স্থাপত্য, মুহূর্ত ও গৌরবময় ইতিহাস।' : 'Spaces, stories and moments from the living heritage of Khelat Bhawan.'}
          </p>
        </header>

        {/* =========================================================================
            SECTION 01 — PHOTOGRAPHY (Full-bleed 3D Curved Scrollable Gallery)
           ========================================================================= */}
        <section 
          className="gallery-section relative pt-2 pb-14 sm:pb-20 border-b border-[#d4af37]/20"
          aria-label={isBn ? 'চিত্রশালা' : 'Photography Gallery'}
        >
          {/* Section Indicator */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between mb-2 sm:mb-4">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase">
                {isBn ? '০১ — আলোকচিত্র সংকলন' : '01 — PHOTOGRAPHY'}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-serif italic text-[#a89083]">
              {isBn ? 'ড্র্যাগ বা অনুভূমিক স্ক্রোল করুন' : 'Drag or scroll horizontally'}
            </span>
          </div>

          {/* Full-width 3D Curved Photography Carousel */}
          <CurvedGalleryCarousel
            items={photographyGalleryData}
            mediaType="image"
            lang={lang}
            initialIndex={2}
            onSelectMedia={(item, index) => setSelectedPhotoIndex(index)}
          />
        </section>

        {/* =========================================================================
            SECTION 02 — FILMS / VIDEO GALLERY (Full-bleed 3D Curved Scrollable Gallery)
           ========================================================================= */}
        <section 
          className="gallery-section relative pt-14 sm:pt-20 pb-8"
          aria-label={isBn ? 'ভিডিও ও চলচ্চিত্র' : 'Films and Video Gallery'}
        >
          {/* Section Indicator */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between mb-2 sm:mb-4">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase">
                {isBn ? '০২ — চলচ্চিত্র ও প্রামাণ্যচিত্র' : '02 — FILMS'}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-serif italic text-[#a89083]">
              {isBn ? 'ভিডিও দেখতে কার্ডে ক্লিক করুন' : 'Click active card to play'}
            </span>
          </div>

          {/* Full-width 3D Curved Films Carousel */}
          <CurvedGalleryCarousel
            items={filmsGalleryData}
            mediaType="video"
            lang={lang}
            initialIndex={0}
            onSelectMedia={(item, index) => setSelectedFilmIndex(index)}
          />
        </section>

        {/* =========================================================================
            CORNER EDITORIAL BADGES (Exact Reference Layout)
           ========================================================================= */}
        <footer className="max-w-7xl mx-auto px-6 sm:px-12 pt-16 pb-6 flex items-center justify-between text-[10px] sm:text-xs tracking-[0.24em] font-serif uppercase text-[#8c6e4e]/70 border-t border-[#d4af37]/15">
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
          {/* Top Bar */}
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
