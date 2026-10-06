import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { getAssetUrl } from '../utils/assetHelper';
import { photographyGalleryData, filmsGalleryData } from '../data/galleryData';
import { sanityClient } from '../sanity/client';
import { GALLERY_QUERY } from '../sanity/queries';
import { 
  X, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Maximize2
} from 'lucide-react';

export default function GalleryPage({ lang = 'en' }) {
  const isBn = lang === 'bn';

  // Unified Fullscreen Lightbox for both Photography and Films
  const [activeIndex, setActiveIndex] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sanityGallery, setSanityGallery] = useState(null);

  useEffect(() => {
    sanityClient.fetch(GALLERY_QUERY)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSanityGallery(data);
        }
      })
      .catch((err) => {
        console.warn('Sanity query fallback to local gallery:', err);
      });
  }, []);

  const { allItems, photoCount, filmCount } = useMemo(() => {
    if (sanityGallery && sanityGallery.length > 0) {
      const formatted = sanityGallery.map((item, idx) => ({
        ...item,
        id: item._id || idx,
        mediaType: item.mediaType || (item.src && item.src.endsWith('.mp4') ? 'video' : 'image'),
        preview: item.preview || item.src,
        src: item.src
      }));
      const pCount = formatted.filter(item => item.mediaType === 'image').length;
      const fCount = formatted.filter(item => item.mediaType === 'video').length;
      return { allItems: formatted, photoCount: pCount, filmCount: fCount };
    }

    const photos = photographyGalleryData.map((item) => ({
      ...item,
      mediaType: 'image',
      preview: item.src,
      src: item.src
    }));
    const films = filmsGalleryData.map((item) => ({
      ...item,
      mediaType: 'video',
      preview: item.poster,
      src: item.src
    }));
    return {
      allItems: [...photos, ...films],
      photoCount: photos.length,
      filmCount: films.length
    };
  }, [sanityGallery]);

  const galleryItems = useMemo(() => {
    if (activeFilter === 'photography') return allItems.filter(i => i.mediaType === 'image');
    if (activeFilter === 'films') return allItems.filter(i => i.mediaType === 'video');
    return allItems;
  }, [activeFilter, allItems]);

  const openGalleryItem = (index) => {
    setIsClosing(false);
    setActiveIndex(index);
  };

  const closeLightbox = useCallback(() => {
    if (activeIndex === null || isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setActiveIndex(null);
      setIsClosing(false);
    }, 450);
  }, [isClosing, activeIndex]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
      if (activeIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
        } else if (e.key === 'ArrowRight') {
          setActiveIndex((prev) => (prev + 1) % galleryItems.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, galleryItems.length, closeLightbox]);

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activeIndex]);

  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : null;

  return (
    <main className="gallery-mosaic-page pt-20 sm:pt-24 min-h-screen text-foreground relative overflow-x-clip">
      {/* Full-bleed Atmospheric Heritage Background */}
      <div className="gallery-mosaic-backdrop" aria-hidden="true">
        <div className="gallery-mosaic-backdrop__glow" />
      </div>

      <div className="relative z-10 w-full">
        {/* =========================================================================
            EDITORIAL HEADER (Matching Reference Mockup)
           ========================================================================= */}
        <header className="gallery-mosaic-header text-center pt-8 sm:pt-12 pb-7 sm:pb-10 px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm font-mono tracking-[0.35em] text-accent uppercase">
            <span className="opacity-60">—</span>
            <span>{isBn ? 'চিত্রশালা' : 'GALLERY'}</span>
            <span className="opacity-60">—</span>
          </div>
          <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal tracking-wide mt-3 mb-3">
            {isBn ? 'সময়ের অনন্ত পরিভ্রমণ' : 'A Journey Through Time'}
          </h1>
          <p className="font-serif text-xs sm:text-sm lg:text-base text-muted-foreground max-w-xl mx-auto tracking-normal">
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
                <span>{value === 'all' ? photoCount + filmCount : value === 'photography' ? photoCount : filmCount}</span>
              </button>
            ))}
          </div>

          <div className="gallery-editorial-grid" aria-live="polite">
            {galleryItems.map((item, displayIndex) => {
              const title = typeof item.title === 'object' ? (item.title[lang] || item.title.en) : item.title;
              const label = item.shortLabel
                ? (typeof item.shortLabel === 'object' ? (item.shortLabel[lang] || item.shortLabel.en) : item.shortLabel)
                : title;
              return (
                <button
                  type="button"
                  key={`${item.mediaType}-${item.id || item.displayIndex || displayIndex}`}
                  className={`gallery-editorial-tile ${item.mediaType === 'video' ? 'gallery-editorial-tile--video' : 'gallery-editorial-tile--photo'} group`}
                  onClick={() => openGalleryItem(displayIndex)}
                  aria-label={`${item.mediaType === 'video' ? 'Play' : 'Open'} ${title}`}
                  style={{ '--tile-index': displayIndex }}
                >
                  {item.mediaType === 'video' ? (
                    <video
                      src={getAssetUrl(item.src)}
                      poster={getAssetUrl(item.preview)}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <img
                      src={getAssetUrl(item.preview)}
                      alt={title}
                      loading={displayIndex < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={displayIndex === 0 ? 'high' : 'auto'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <span className="gallery-crest-tile__shade" aria-hidden="true" />
                  <span className="gallery-crest-tile__meta">
                    <strong>{label}</strong>
                  </span>
                  <span className="gallery-crest-tile__action" aria-hidden="true">
                    {item.mediaType === 'video' ? <Play className="w-4 h-4 fill-current" /> : <Maximize2 className="w-4 h-4" />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            CORNER EDITORIAL BADGES
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
          UNIFIED FULLSCREEN LIGHTBOX (IMAGES & VIDEOS)
         ========================================================================= */}
      {activeItem && createPortal(
        <div 
          className={`gallery-lightbox fixed inset-0 z-[100000] flex flex-col justify-between p-4 sm:p-8 bg-[#090403]/98 backdrop-blur-2xl ${isClosing ? 'is-closing' : 'is-open'} text-[#f4efe6] select-none`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Floating Minimalist Close Button on Top Right */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 w-11 h-11 rounded-full bg-[#1e100c]/90 hover:bg-[#8a2034] text-[#d8ae62] hover:text-[#fff] border border-[#d8ae62]/50 hover:border-[#d8ae62] flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 hover:rotate-90 active:scale-95 cursor-pointer"
            aria-label={isBn ? 'বন্ধ করুন' : 'Close viewer'}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Media Center Stage */}
          <div 
            className="relative flex-1 flex items-center justify-center my-auto overflow-hidden pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.mediaType === 'video' ? (
              <div className="relative w-full max-w-5xl max-h-[78vh] aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-[#d8ae62]/40">
                <video
                  key={activeItem.src}
                  src={getAssetUrl(activeItem.src)}
                  poster={getAssetUrl(activeItem.preview)}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain mx-auto"
                />
              </div>
            ) : (
              <img
                src={getAssetUrl(activeItem.src)}
                alt={typeof activeItem.title === 'object' ? (activeItem.title[lang] || activeItem.title.en) : activeItem.title}
                className="gallery-lightbox__image max-h-[78vh] max-w-[94vw] object-contain rounded-xl shadow-2xl border border-[#d8ae62]/35"
              />
            )}

            {/* Left Arrow Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
              }}
              className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-[#1e100c]/90 hover:bg-[#8a2034] text-[#d8ae62] hover:text-white flex items-center justify-center transition-all border border-[#d8ae62]/40 backdrop-blur-md shadow-xl hover:scale-110 cursor-pointer z-20"
              aria-label={isBn ? 'পূর্ববর্তী' : 'Previous'}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Right Arrow Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev + 1) % galleryItems.length);
              }}
              className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-[#1e100c]/90 hover:bg-[#8a2034] text-[#d8ae62] hover:text-white flex items-center justify-center transition-all border border-[#d8ae62]/40 backdrop-blur-md shadow-xl hover:scale-110 cursor-pointer z-20"
              aria-label={isBn ? 'পরবর্তী' : 'Next'}
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Caption & Description Bottom Bar */}
          <div 
            className="max-w-4xl mx-auto text-center px-4 pt-2 pb-2 space-y-1 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#ffffff] tracking-wide drop-shadow-md">
              {typeof activeItem.title === 'object' ? (activeItem.title[lang] || activeItem.title.en) : activeItem.title}
            </h3>
            {activeItem.desc && (
              <p className="font-sans text-xs sm:text-sm text-[#f0e8d8] font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
                {typeof activeItem.desc === 'object' ? (activeItem.desc[lang] || activeItem.desc.en) : activeItem.desc}
              </p>
            )}
            {activeItem.photographer && (
              <div className="text-[11px] text-[#d8ae62] tracking-wider uppercase font-sans font-semibold pt-0.5">
                <span>Credit: {activeItem.photographer}</span>
                {activeItem.year && <span> · {activeItem.year}</span>}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
