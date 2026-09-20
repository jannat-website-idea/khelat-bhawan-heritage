import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAssetUrl } from '../utils/assetHelper';
import { ArrowLeft, ArrowRight, Play, Maximize2 } from 'lucide-react';

export default function CurvedGalleryCarousel({
  items = [],
  mediaType = 'image', // 'image' | 'video'
  lang = 'en',
  onSelectMedia
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const lastWheelTimeRef = useRef(0);

  const total = items.length;
  const isBn = lang === 'bn';

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Keyboard navigation when hovering or focused
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Mouse wheel / trackpad scroll handling with debounce
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTimeRef.current < 280) return;

    if (Math.abs(e.deltaX) > 30 || (e.shiftKey && Math.abs(e.deltaY) > 30)) {
      lastWheelTimeRef.current = now;
      if (e.deltaX > 0 || e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Touch / Drag event handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.touches ? e.touches[0].clientX : e.clientX);
    setDragDeltaX(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragDeltaX(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX > 50) {
      handlePrev();
    } else if (dragDeltaX < -50) {
      handleNext();
    }
    setDragDeltaX(0);
  };

  if (total === 0) return null;

  const activeItem = items[activeIndex];

  // Helper to get wrapped offset relative to activeIndex
  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Get dynamic 3D transform style for an item at offset
  const getCardStyle = (offset) => {
    if (isMobile) {
      // Mobile 3D perspective (center + peek left/right)
      if (offset === 0) {
        return {
          transform: 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)',
          zIndex: 30,
          opacity: 1,
          pointerEvents: 'auto',
          filter: 'brightness(1)'
        };
      }
      if (offset === 1) {
        return {
          transform: 'translateX(72%) translateZ(-90px) rotateY(-22deg) scale(0.82)',
          zIndex: 20,
          opacity: 0.65,
          pointerEvents: 'auto',
          filter: 'brightness(0.7)'
        };
      }
      if (offset === -1) {
        return {
          transform: 'translateX(-72%) translateZ(-90px) rotateY(22deg) scale(0.82)',
          zIndex: 20,
          opacity: 0.65,
          pointerEvents: 'auto',
          filter: 'brightness(0.7)'
        };
      }
      return {
        transform: `translateX(${offset * 120}%) translateZ(-200px)`,
        zIndex: 5,
        opacity: 0,
        pointerEvents: 'none',
        display: 'none'
      };
    }

    // Desktop 3D Curved Cylinder Perspective
    if (offset === 0) {
      return {
        transform: 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)',
        zIndex: 30,
        opacity: 1,
        pointerEvents: 'auto',
        filter: 'brightness(1) drop-shadow(0 25px 50px rgba(0,0,0,0.85))'
      };
    }
    if (offset === 1) {
      return {
        transform: 'translateX(clamp(320px, 34vw, 420px)) translateZ(-160px) rotateY(-26deg) scale(0.84)',
        zIndex: 20,
        opacity: 0.82,
        pointerEvents: 'auto',
        filter: 'brightness(0.82) drop-shadow(0 15px 30px rgba(0,0,0,0.7))'
      };
    }
    if (offset === -1) {
      return {
        transform: 'translateX(clamp(-420px, -34vw, -320px)) translateZ(-160px) rotateY(26deg) scale(0.84)',
        zIndex: 20,
        opacity: 0.82,
        pointerEvents: 'auto',
        filter: 'brightness(0.82) drop-shadow(0 15px 30px rgba(0,0,0,0.7))'
      };
    }
    if (offset === 2) {
      return {
        transform: 'translateX(clamp(600px, 62vw, 760px)) translateZ(-340px) rotateY(-45deg) scale(0.70)',
        zIndex: 10,
        opacity: 0.55,
        pointerEvents: 'auto',
        filter: 'brightness(0.65) drop-shadow(0 10px 20px rgba(0,0,0,0.6))'
      };
    }
    if (offset === -2) {
      return {
        transform: 'translateX(clamp(-760px, -62vw, -600px)) translateZ(-340px) rotateY(45deg) scale(0.70)',
        zIndex: 10,
        opacity: 0.55,
        pointerEvents: 'auto',
        filter: 'brightness(0.65) drop-shadow(0 10px 20px rgba(0,0,0,0.6))'
      };
    }

    // Virtualized items beyond viewport
    return {
      transform: `translateX(${offset * 400}px) translateZ(-500px)`,
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      display: 'none'
    };
  };

  return (
    <div 
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      className="curved-gallery-viewport relative w-full overflow-hidden select-none py-6 sm:py-10"
    >
      {/* 3D Perspective Stage */}
      <div className="curved-gallery-stage relative w-full flex items-center justify-center min-h-[460px] sm:min-h-[580px] lg:min-h-[640px]">
        
        {/* ================= VERTICAL CATEGORY TYPOGRAPHY WATERMARK ================= */}
        {activeItem && (
          <div 
            className="curved-gallery-vertical-word absolute z-25 pointer-events-none transition-all duration-700 ease-out"
            aria-hidden="true"
          >
            <span className="curved-gallery-vertical-text font-serif">
              {activeItem.verticalWord || (typeof activeItem.category === 'object' ? activeItem.category.en : activeItem.category)}
            </span>
          </div>
        )}

        {/* ================= 3D CURVED MEDIA CARDS ================= */}
        {items.map((item, index) => {
          const offset = getOffset(index);
          const isCurrentActive = offset === 0;
          const style = getCardStyle(offset);
          const rawSrc = mediaType === 'video' ? item.poster : item.src;
          const mediaSrc = getAssetUrl(rawSrc);
          const title = typeof item.title === 'object' ? (item.title[lang] || item.title.en) : item.title;
          const category = typeof item.category === 'object' ? (item.category[lang] || item.category.en) : item.category;

          return (
            <div
              key={item.id || index}
              style={style}
              onClick={() => {
                if (isCurrentActive) {
                  onSelectMedia(item, index);
                } else {
                  setActiveIndex(index);
                }
              }}
              className={`curved-gallery-card absolute cursor-pointer transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) flex flex-col items-center ${
                isCurrentActive ? 'is-active-card' : 'is-side-card'
              }`}
            >
              {/* Media Container with Golden Beveled Rim */}
              <div className="curved-gallery-media-frame relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#d4af37]/35 bg-[#1a0e0b]">
                <img
                  src={mediaSrc}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                />

                {/* Subtle Ambient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#160c0a]/70 via-transparent to-black/20 pointer-events-none" />

                {/* Video Play Badge if Video Media */}
                {mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`rounded-full bg-[#160c0a]/80 border border-[#d4af37] flex items-center justify-center text-[#f3e5ab] shadow-2xl transition-transform duration-300 ${
                      isCurrentActive ? 'w-16 h-16 sm:w-20 sm:h-20 scale-100 hover:scale-110' : 'w-10 h-10 sm:w-12 sm:h-12 opacity-80'
                    }`}>
                      <Play className={`${isCurrentActive ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-4 h-4 sm:w-5 sm:h-5'} fill-current ml-1`} />
                    </div>
                  </div>
                )}

                {/* Duration Badge for Videos */}
                {mediaType === 'video' && item.duration && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 border border-[#d4af37]/40 text-[10px] font-mono text-[#f3e5ab] tracking-wider">
                    {item.duration}
                  </div>
                )}

                {/* Fullscreen Expand Cue for Images on Hover */}
                {mediaType === 'image' && isCurrentActive && (
                  <div className="curved-gallery-expand-cue absolute bottom-3 right-3 p-2 rounded-full bg-[#160c0a]/85 border border-[#d4af37]/60 text-[#f3e5ab] opacity-0 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* ================= MEDIA INFO LABEL UNDER CARD ================= */}
              <div className="curved-gallery-card-meta text-center mt-3 sm:mt-4 space-y-0.5 max-w-[280px]">
                <div className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#8c6426] uppercase">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {isCurrentActive ? (
                  /* Center Active Item Label */
                  <div className="space-y-0.5">
                    <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#f4efe6] uppercase tracking-[0.16em] leading-tight">
                      {title}
                    </h3>
                    {item.desc && (
                      <p className="text-[11px] sm:text-xs text-[#a89083] font-sans line-clamp-1 max-w-xs mx-auto">
                        {typeof item.desc === 'object' ? (item.desc[lang] || item.desc.en) : item.desc}
                      </p>
                    )}
                  </div>
                ) : (
                  /* Side Inactive Item Label */
                  <div className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.14em] text-[#a89083]/80">
                    {category}
                  </div>
                )}
              </div>

              {/* Glassy Mirror Reflection on Floor */}
              {isCurrentActive && (
                <div className="curved-gallery-reflection pointer-events-none" aria-hidden="true">
                  <img
                    src={mediaSrc}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="curved-gallery-reflection-mask" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          ELEGANT CONTROLS BAR: ← [ 03 / 12 ] →
         ========================================================================= */}
      <div className="curved-gallery-controls relative z-30 flex items-center justify-center gap-6 sm:gap-8 mt-6 sm:mt-8">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="curved-gallery-nav-btn"
          aria-label={isBn ? 'পূর্ববর্তী মিডিয়া' : 'Previous media'}
        >
          <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
        </button>

        {/* Center Dynamic Counter Indicator */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#f4efe6]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="w-8 h-[1px] bg-[#d4af37]/60 mt-1" />
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="curved-gallery-nav-btn"
          aria-label={isBn ? 'পরবর্তী মিডিয়া' : 'Next media'}
        >
          <ArrowRight className="w-4 h-4 text-[#d4af37]" />
        </button>
      </div>
    </div>
  );
}
