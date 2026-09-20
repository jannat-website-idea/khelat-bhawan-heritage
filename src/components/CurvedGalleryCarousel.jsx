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
  const [startX, setStartX] = useState(0);
  const [currentDeltaX, setCurrentDeltaX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const wheelLockRef = useRef(false);

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

  // Keyboard navigation
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

  // Wheel / Trackpad horizontal swipe
  const handleWheel = (e) => {
    if (wheelLockRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    
    if (Math.abs(delta) > 20) {
      wheelLockRef.current = true;
      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 250);
    }
  };

  // Pointer Drag handling (Mouse & Touch unified)
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentDeltaX(0);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setCurrentDeltaX(delta);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    if (currentDeltaX > 35) {
      handlePrev();
    } else if (currentDeltaX < -35) {
      handleNext();
    }
    setCurrentDeltaX(0);
  };

  if (total === 0) return null;

  const activeItem = items[activeIndex];

  // Helper to calculate wrapped offset relative to activeIndex
  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Get dynamic 3D transform for each card
  const getCardStyle = (offset) => {
    const dragOffsetPx = isDragging ? currentDeltaX * 0.4 : 0;

    if (isMobile) {
      // Mobile 3D Layout (large center with partial sides)
      if (offset === 0) {
        return {
          transform: `translateX(${dragOffsetPx}px) translateZ(0px) rotateY(${dragOffsetPx * -0.05}deg) scale(1)`,
          zIndex: 30,
          opacity: 1,
          filter: 'brightness(1)'
        };
      }
      if (offset === 1) {
        return {
          transform: `translateX(calc(75% + ${dragOffsetPx}px)) translateZ(-100px) rotateY(-22deg) scale(0.82)`,
          zIndex: 20,
          opacity: 0.65,
          filter: 'brightness(0.7)'
        };
      }
      if (offset === -1) {
        return {
          transform: `translateX(calc(-75% + ${dragOffsetPx}px)) translateZ(-100px) rotateY(22deg) scale(0.82)`,
          zIndex: 20,
          opacity: 0.65,
          filter: 'brightness(0.7)'
        };
      }
      return {
        transform: `translateX(${offset * 120}%) translateZ(-300px)`,
        zIndex: 5,
        opacity: 0,
        pointerEvents: 'none',
        display: 'none'
      };
    }

    // Fullscreen Grand Desktop 3D Panoramic Curve (Matching Reference Mockup)
    if (offset === 0) {
      return {
        transform: `translateX(${dragOffsetPx}px) translateZ(0px) rotateY(${dragOffsetPx * -0.04}deg) scale(1)`,
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1) drop-shadow(0 25px 60px rgba(0,0,0,0.95))'
      };
    }
    if (offset === 1) {
      return {
        transform: `translateX(calc(clamp(340px, 35vw, 480px) + ${dragOffsetPx}px)) translateZ(-160px) rotateY(-25deg) scale(0.85)`,
        zIndex: 20,
        opacity: 0.85,
        filter: 'brightness(0.8) drop-shadow(0 15px 35px rgba(0,0,0,0.75))'
      };
    }
    if (offset === -1) {
      return {
        transform: `translateX(calc(clamp(-480px, -35vw, -340px) + ${dragOffsetPx}px)) translateZ(-160px) rotateY(25deg) scale(0.85)`,
        zIndex: 20,
        opacity: 0.85,
        filter: 'brightness(0.8) drop-shadow(0 15px 35px rgba(0,0,0,0.75))'
      };
    }
    if (offset === 2) {
      return {
        transform: `translateX(calc(clamp(640px, 64vw, 880px) + ${dragOffsetPx}px)) translateZ(-320px) rotateY(-42deg) scale(0.72)`,
        zIndex: 10,
        opacity: 0.55,
        filter: 'brightness(0.6) drop-shadow(0 10px 20px rgba(0,0,0,0.6))'
      };
    }
    if (offset === -2) {
      return {
        transform: `translateX(calc(clamp(-880px, -64vw, -640px) + ${dragOffsetPx}px)) translateZ(-320px) rotateY(42deg) scale(0.72)`,
        zIndex: 10,
        opacity: 0.55,
        filter: 'brightness(0.6) drop-shadow(0 10px 20px rgba(0,0,0,0.6))'
      };
    }

    // Virtualized
    return {
      transform: `translateX(${offset * 500}px) translateZ(-500px)`,
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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="curved-gallery-fullscreen-wrapper relative w-full overflow-hidden select-none py-4 sm:py-8 cursor-grab active:cursor-grabbing"
    >
      {/* 3D Perspective Stage spanning full-width */}
      <div className="curved-gallery-stage relative w-full flex items-center justify-center min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
        
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
              onClick={(e) => {
                if (Math.abs(currentDeltaX) > 10) return; // ignore click if dragged
                if (isCurrentActive) {
                  onSelectMedia(item, index);
                } else {
                  setActiveIndex(index);
                }
              }}
              className={`curved-gallery-card absolute transition-all ${
                isDragging ? 'duration-75' : 'duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)'
              } flex flex-col items-center ${
                isCurrentActive ? 'is-active-card' : 'is-side-card'
              }`}
            >
              {/* Media Container with Golden Beveled Rim */}
              <div className="curved-gallery-media-frame relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#d4af37]/40 bg-[#1a0e0b]">
                <img
                  src={mediaSrc}
                  alt={title}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 pointer-events-none"
                  loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                />

                {/* Subtle Ambient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120a08]/70 via-transparent to-black/20 pointer-events-none" />

                {/* Video Play Badge if Video Media */}
                {mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`rounded-full bg-[#160c0a]/85 border border-[#d4af37] flex items-center justify-center text-[#f3e5ab] shadow-2xl transition-transform duration-300 ${
                      isCurrentActive ? 'w-16 h-16 sm:w-20 sm:h-20 scale-100 hover:scale-110' : 'w-10 h-10 sm:w-12 sm:h-12 opacity-80'
                    }`}>
                      <Play className={`${isCurrentActive ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-4 h-4 sm:w-5 sm:h-5'} fill-current ml-1`} />
                    </div>
                  </div>
                )}

                {/* Duration Badge for Videos */}
                {mediaType === 'video' && item.duration && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 border border-[#d4af37]/40 text-[10px] font-mono text-[#f3e5ab] tracking-wider">
                    {item.duration}
                  </div>
                )}

                {/* Fullscreen Expand Cue on Hover */}
                {isCurrentActive && (
                  <div className="curved-gallery-expand-cue absolute bottom-3 right-3 p-2 rounded-full bg-[#160c0a]/85 border border-[#d4af37]/60 text-[#f3e5ab] opacity-0 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* ================= CARD LABEL UNDER MEDIA ================= */}
              <div className="curved-gallery-card-meta text-center mt-3 sm:mt-4 space-y-0.5 max-w-[320px]">
                <div className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#8c6426] uppercase">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {isCurrentActive ? (
                  /* Center Active Item Title */
                  <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#f4efe6] uppercase tracking-[0.16em] leading-tight">
                    {title}
                  </h3>
                ) : (
                  /* Side Item Label */
                  <div className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.14em] text-[#a89083]/80">
                    {category}
                  </div>
                )}
              </div>

              {/* Mirror Reflection on Floor */}
              {isCurrentActive && (
                <div className="curved-gallery-reflection pointer-events-none" aria-hidden="true">
                  <img
                    src={mediaSrc}
                    alt=""
                    draggable={false}
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
          ELEGANT NAVIGATION CONTROLS: ← [ 03 / 12 ] →
         ========================================================================= */}
      <div className="curved-gallery-controls relative z-30 flex items-center justify-center gap-6 sm:gap-8 mt-4 sm:mt-6">
        <button
          onClick={handlePrev}
          className="curved-gallery-nav-btn"
          aria-label={isBn ? 'পূর্ববর্তী মিডিয়া' : 'Previous media'}
        >
          <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
        </button>

        <div className="flex flex-col items-center">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#f4efe6]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="w-8 h-[1px] bg-[#d4af37]/60 mt-1" />
        </div>

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
