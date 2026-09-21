import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { getAssetUrl } from '../utils/assetHelper';
import { photographyGalleryData, filmsGalleryData } from '../data/galleryData';
import { 
  X, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Maximize2
} from 'lucide-react';

export default function GalleryPage({ lang = 'en' }) {
  const isBn = lang === 'bn';

  // Fullscreen State for Photography Lightbox
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isPhotoClosing, setIsPhotoClosing] = useState(false);

  // Cinematic Theater State for Film Player
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryItems = useMemo(() => {
    const photos = photographyGalleryData.map((item, index) => ({
      ...item,
      mediaType: 'image',
      sourceIndex: index,
      preview: item.src
    }));
    const films = filmsGalleryData.map((item, index) => ({
      ...item,
      mediaType: 'video',
      sourceIndex: index,
      preview: item.poster
    }));
    if (activeFilter === 'photography') return photos;
    if (activeFilter === 'films') return films;
    return [...photos, ...films];
  }, [activeFilter]);

  const openGalleryItem = (item) => {
    if (item.mediaType === 'video') {
      setSelectedFilmIndex(item.sourceIndex);
      return;
    }
    setIsPhotoClosing(false);
    setSelectedPhotoIndex(item.sourceIndex);
  };

  const closePhoto = useCallback(() => {
    if (selectedPhotoIndex === null || isPhotoClosing) return;
    setIsPhotoClosing(true);
    window.setTimeout(() => {
      setSelectedPhotoIndex(null);
      setIsPhotoClosing(false);
    }, 650);
  }, [isPhotoClosing, selectedPhotoIndex]);

  // Keyboard navigation inside modal viewers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePhoto();
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
  }, [selectedPhotoIndex, selectedFilmIndex, closePhoto]);

  useEffect(() => {
    if (selectedPhotoIndex === null && selectedFilmIndex === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedPhotoIndex, selectedFilmIndex]);

  const activePhoto = selectedPhotoIndex !== null ? photographyGalleryData[selectedPhotoIndex] : null;
  const activeFilm = selectedFilmIndex !== null ? filmsGalleryData[selectedFilmIndex] : null;

  return (
    <main className="gallery-mosaic-page pt-20 sm:pt-24 min-h-screen text-[#f4efe6] relative overflow-x-clip">
      {/* Full-bleed Atmospheric Heritage Background */}
      <div className="gallery-mosaic-backdrop" aria-hidden="true">
        <div className="gallery-mosaic-backdrop__glow" />
      </div>

      <div className="relative z-10 w-full">
        {/* =========================================================================
            EDITORIAL HEADER (Matching Reference Mockup)
           ========================================================================= */}
        <header className="gallery-mosaic-header text-center pt-8 sm:pt-12 pb-7 sm:pb-10 px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm font-mono tracking-[0.35em] text-[#c99a4a] uppercase">
            <span className="opacity-60">—</span>
            <span>{isBn ? 'চিত্রশালা' : 'GALLERY'}</span>
            <span className="opacity-60">—</span>
          </div>
          <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#fdfbf7] font-normal tracking-wide mt-3 mb-3">
            {isBn ? 'সময়ের অনন্ত পরিভ্রমণ' : 'A Journey Through Time'}
          </h1>
          <p className="font-serif text-xs sm:text-sm lg:text-base text-[#c7b299] max-w-xl mx-auto tracking-normal">
            {isBn ? 'খেলাৎ ভবনের জীবন্ত ঐতিহ্যের স্থাপত্য, মুহূর্ত ও গৌরবময় ইতিহাস।' : 'Spaces, stories and moments from the living heritage of Khelat Bhawan.'}
          </p>
        </header>

        <section className="gallery-mosaic-shell" aria-label={isBn ? 'চিত্রশালা' : 'Khelat Bhawan media gallery'}>
          <div className="gallery-mosaic-filters" role="group" aria-label={isBn ? 'গ্যালারি বিভাগ' : 'Gallery filters'}>
            {[
              ['all', isBn ? 'সব' : 'All stories'],
              ['photography', isBn ? 'আলোকচিত্র' : 'Photography'],
              ['films', isBn ? 'চলচ্চিত্র' : 'Films']
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setActiveFilter(value)}
                className={`gallery-mosaic-filter ${activeFilter === value ? 'is-active' : ''}`}
                aria-pressed={activeFilter === value}
              >
                {label}
                <span>{value === 'all' ? photographyGalleryData.length + filmsGalleryData.length : value === 'photography' ? photographyGalleryData.length : filmsGalleryData.length}</span>
              </button>
            ))}
          </div>

          <div className={`gallery-mosaic-grid gallery-mosaic-grid--${activeFilter}`}>
            {galleryItems.map((item, index) => {
              const title = typeof item.title === 'object' ? (item.title[lang] || item.title.en) : item.title;
              const label = item.shortLabel
                ? (typeof item.shortLabel === 'object' ? (item.shortLabel[lang] || item.shortLabel.en) : item.shortLabel)
                : title;
              return (
                <button
                  type="button"
                  key={`${item.mediaType}-${item.id || index}`}
                  className="gallery-mosaic-tile group"
                  onClick={() => openGalleryItem(item)}
                  aria-label={`${item.mediaType === 'video' ? 'Play' : 'Open'} ${title}`}
                  style={{ '--tile-index': index }}
                >
                  <img src={getAssetUrl(item.preview)} alt={title} loading={index < 8 ? 'eager' : 'lazy'} />
                  <span className="gallery-mosaic-tile__shade" aria-hidden="true" />
                  <span className="gallery-mosaic-tile__meta">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{label}</strong>
                  </span>
                  <span className="gallery-mosaic-tile__action" aria-hidden="true">
                    {item.mediaType === 'video' ? <Play className="w-4 h-4 fill-current" /> : <Maximize2 className="w-4 h-4" />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            CORNER EDITORIAL BADGES (Exact Reference Layout)
           ========================================================================= */}
        <footer className="gallery-mosaic-footer max-w-[1500px] mx-auto px-6 sm:px-10 pt-10 pb-10 flex items-center justify-between text-[10px] sm:text-xs tracking-[0.2em] font-serif uppercase text-[#bda88a]">
          <div className="space-y-0.5 text-left">
            <div>CONTACT US</div>
          </div>

          <div className="text-center">
            <span className="text-[#c99a4a]">KHELAT BHAWAN · 1845</span>
          </div>

          <div className="space-y-0.5 text-right">
            <div>{isBn ? 'যাত্রা শুরু হোক' : "LET'S BEGIN"}</div>
          </div>
        </footer>
      </div>

      {/* =========================================================================
          FULLSCREEN IMAGE VIEWER LIGHTBOX
         ========================================================================= */}
      {activePhoto && createPortal(
        <div 
          className={`gallery-lightbox fixed inset-0 z-50 flex items-center justify-center bg-[#100806]/96 ${isPhotoClosing ? 'is-closing' : 'is-open'}`}
          onClick={closePhoto}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-[#f4efe6] z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-[#c99a4a]">
                {String(selectedPhotoIndex + 1).padStart(2, '0')} / {String(photographyGalleryData.length).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase font-serif tracking-widest text-[#a89083] hidden sm:inline">
                {typeof activePhoto.category === 'object' ? (activePhoto.category[lang] || activePhoto.category.en) : activePhoto.category}
              </span>
            </div>

            <button
              onClick={closePhoto}
              className="gallery-lightbox__close inline-flex items-center gap-2 px-4 py-2 bg-[#1e100c] border border-[#c99a4a]/40 text-xs font-mono uppercase tracking-widest text-[#f4efe6] hover:bg-[#c99a4a] hover:text-[#120a08] transition-colors"
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
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1e100c]/80 border border-[#c99a4a]/40 text-[#f4efe6] flex items-center justify-center hover:bg-[#c99a4a] hover:text-[#120a08] transition-colors z-20"
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
              className="gallery-lightbox__image max-h-[72vh] max-w-full object-contain shadow-2xl border border-[#c99a4a]/45"
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
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1e100c]/80 border border-[#c99a4a]/40 text-[#f4efe6] flex items-center justify-center hover:bg-[#c99a4a] hover:text-[#120a08] transition-colors z-20"
            aria-label={isBn ? 'পরবর্তী ছবি' : 'Next photograph'}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>,
        document.body
      )}

      {/* =========================================================================
          CINEMATIC FILM THEATER PLAYER
         ========================================================================= */}
      {activeFilm && createPortal(
        <div 
          className="gallery-film-theater fixed inset-0 flex items-center justify-center bg-[#0d0605]/98 backdrop-blur-2xl animate-in fade-in duration-300"
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
        </div>,
        document.body
      )}
    </main>
  );
}
