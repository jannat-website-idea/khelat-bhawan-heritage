import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAssetUrl } from '../utils/assetHelper';
import { ArrowLeft, ArrowRight, Play, Maximize2 } from 'lucide-react';

export default function CurvedGalleryCarousel({
  items = [],
  mediaType = 'image', // 'image' | 'video'
  lang = 'en',
  initialIndex = 2,
  onSelectMedia
}) {
  const [activeIndex, setActiveIndex] = useState(() => {
    if (items.length === 0) return 0;
    return initialIndex >= 0 && initialIndex < items.length ? initialIndex : 0;
  });
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentDeltaX, setCurrentDeltaX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const wheelLockRef = useRef(false);
  const hasDraggedRef = useRef(false);

  const total = items.length;
  const isBn = lang === 'bn';

  // Responsive breakpoint check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers with smooth cycling
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

  // Trackpad / Horizontal Wheel scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheelScroll = (e) => {
      if (wheelLockRef.current) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : (Math.abs(e.deltaY) > 35 ? e.deltaY : 0));
      
      if (Math.abs(delta) > 15) {
        wheelLockRef.current = true;
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 260);
      }
    };

    el.addEventListener('wheel', onWheelScroll, { passive: true });
    return () => el.removeEventListener('wheel', onWheelScroll);
  }, [handleNext, handlePrev]);

  // Mouse & Touch Drag handling
  const handlePointerDown = (e) => {
    setIsPointerDown(true);
    hasDraggedRef.current = false;
    setStartX(e.clientX);
    setCurrentDeltaX(0);
  };

  const handlePointerMove = (e) => {
    if (!isPointerDown) return;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 8) {
      setIsDragging(true);
      hasDraggedRef.current = true;
      setCurrentDeltaX(delta);
    }
  };

  const handlePointerUp = () => {
    if (isPointerDown) {
      if (isDragging) {
        if (currentDeltaX > 35) {
          handlePrev();
        } else if (currentDeltaX < -35) {
          handleNext();
        }
      }
      setIsPointerDown(false);
      setIsDragging(false);
      setCurrentDeltaX(0);
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  if (total === 0) return null;

  // Calculate shortest wrapped offset relative to activeIndex
  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // 3D Transforms matching Reference 2 curved panoramic geometry
  const getCardTransform = (offset) => {
    const dragOffsetPx = isDragging ? currentDeltaX * 0.45 : 0;

    if (isMobile) {
      if (offset === 0) {
        return {
          transform: `translateX(calc(-50% + ${dragOffsetPx}px)) translateZ(30px) rotateY(${dragOffsetPx * -0.05}deg) scale(1)`,
          zIndex: 30,
          opacity: 1,
          filter: 'brightness(1)'
        };
      }
      if (offset === 1) {
        return {
          transform: `translateX(calc(-50% + 76% + ${dragOffsetPx}px)) translateZ(-60px) rotateY(-18deg) scale(0.84)`,
          zIndex: 20,
          opacity: 0.7,
          filter: 'brightness(0.75)'
        };
      }
      if (offset === -1) {
        return {
          transform: `translateX(calc(-50% - 76% + ${dragOffsetPx}px)) translateZ(-60px) rotateY(18deg) scale(0.84)`,
          zIndex: 20,
          opacity: 0.7,
          filter: 'brightness(0.75)'
        };
      }
      return {
        transform: `translateX(calc(-50% + ${offset * 110}%)) translateZ(-250px)`,
        zIndex: 5,
        opacity: 0,
        pointerEvents: 'none',
        display: 'none'
      };
    }

    // 5-Card Panoramic Exhibition Geometry for Desktop
    if (offset === 0) {
      return {
        transform: `translateX(calc(-50% + ${dragOffsetPx}px)) translateZ(40px) rotateY(${dragOffsetPx * -0.03}deg) scale(1)`,
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)'
      };
    }
    if (offset === 1) {
      return {
        transform: `translateX(calc(-50% + clamp(270px, 26vw, 380px) + ${dragOffsetPx}px)) translateZ(-70px) rotateY(-16deg) scale(0.86)`,
        zIndex: 20,
        opacity: 0.9,
        filter: 'brightness(0.84)'
      };
    }
    if (offset === -1) {
      return {
        transform: `translateX(calc(-50% - clamp(270px, 26vw, 380px) + ${dragOffsetPx}px)) translateZ(-70px) rotateY(16deg) scale(0.86)`,
        zIndex: 20,
        opacity: 0.9,
        filter: 'brightness(0.84)'
      };
    }
    if (offset === 2) {
      return {
        transform: `translateX(calc(-50% + clamp(480px, 46vw, 680px) + ${dragOffsetPx}px)) translateZ(-190px) rotateY(-30deg) scale(0.72)`,
        zIndex: 10,
        opacity: 0.65,
        filter: 'brightness(0.68)'
      };
    }
    if (offset === -2) {
      return {
        transform: `translateX(calc(-50% - clamp(480px, 46vw, 680px) + ${dragOffsetPx}px)) translateZ(-190px) rotateY(30deg) scale(0.72)`,
        zIndex: 10,
        opacity: 0.65,
        filter: 'brightness(0.68)'
      };
    }

    // Virtualized out
    return {
      transform: `translateX(calc(-50% + ${offset * 500}px)) translateZ(-500px)`,
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      display: 'none'
    };
  };

  const handleCardClick = (item, index, isCurrentActive) => {
    if (hasDraggedRef.current) return;
    setActiveIndex(index);
    if (onSelectMedia) {
      onSelectMedia(item, index);
    }
  };

  return (
    <div 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="curved-gallery-fullscreen-wrapper relative w-full overflow-hidden select-none py-2 sm:py-6 cursor-grab active:cursor-grabbing"
    >
      {/* 3D Perspective Stage */}
      <div className="curved-gallery-stage relative w-full min-h-[460px] sm:min-h-[540px] lg:min-h-[600px]">
        
        {/* ================= 3D CURVED MEDIA CARDS ================= */}
        {items.map((item, index) => {
          const offset = getOffset(index);
          const isCurrentActive = offset === 0;
          const isNearSide = Math.abs(offset) === 1;
          const isFarSide = Math.abs(offset) === 2;
          const isVisible = Math.abs(offset) <= 2;
          if (!isVisible) return null;

          const transformStyle = getCardTransform(offset);
          const rawSrc = mediaType === 'video' ? item.poster : item.src;
          const mediaSrc = getAssetUrl(rawSrc);
          
          // Get short label (e.g. DETAILS, INTERIORS, THE GRAND COURTYARD, DURGA PUJA, CELEBRATIONS)
          const shortLabel = item.shortLabel 
            ? (typeof item.shortLabel === 'object' ? (item.shortLabel[lang] || item.shortLabel.en) : item.shortLabel)
            : (typeof item.category === 'object' ? (item.category[lang] || item.category.en) : item.category);

          const fullTitle = typeof item.title === 'object' ? (item.title[lang] || item.title.en) : item.title;

          return (
            <div
              key={item.id || index}
              style={transformStyle}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(item, index, isCurrentActive);
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${fullTitle} in full screen`}
              className={`curved-gallery-card absolute top-4 left-1/2 transition-all ${
                isDragging ? 'duration-75' : 'duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)'
              } flex flex-col items-center cursor-pointer ${
                isCurrentActive 
                  ? 'is-active-card' 
                  : isNearSide 
                    ? 'is-near-side-card' 
                    : 'is-far-side-card'
              }`}
            >
              {/* Media Container Frame (Fine antique gold edge, 4px radius) */}
              <div className="curved-gallery-media-frame relative overflow-hidden bg-[#160c0a] group">
                <img
                  src={mediaSrc}
                  alt={fullTitle}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 pointer-events-none group-hover:scale-105"
                  loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                />

                {/* Subtle Ambient Vignette Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                  isCurrentActive ? 'bg-gradient-to-t from-black/35 via-transparent to-black/10' : 'bg-black/30 group-hover:bg-black/10'
                }`} />

                {/* Video Play Badge for Video Media */}
                {mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`rounded-full bg-[#120a08]/85 border border-[#d4af37] flex items-center justify-center text-[#f3e5ab] shadow-2xl transition-transform duration-300 ${
                      isCurrentActive ? 'w-16 h-16 sm:w-20 sm:h-20 scale-100 group-hover:scale-110' : 'w-10 h-10 sm:w-12 sm:h-12 opacity-85 group-hover:opacity-100'
                    }`}>
                      <Play className={`${isCurrentActive ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-4 h-4'} fill-current ml-1`} />
                    </div>
                  </div>
                )}

                {/* Video Duration Badge */}
                {mediaType === 'video' && item.duration && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/85 border border-[#d4af37]/40 text-[10px] font-mono text-[#f3e5ab] tracking-wider pointer-events-none">
                    {item.duration}
                  </div>
                )}

                {/* Fullscreen Expand Cue on Hover */}
                {mediaType === 'image' && (
                  <div className={`curved-gallery-expand-cue absolute bottom-3 right-3 p-2 rounded-full bg-[#160c0a]/85 border border-[#d4af37]/60 text-[#f3e5ab] transition-opacity duration-300 pointer-events-none ${
                    isCurrentActive ? 'opacity-80 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-80'
                  }`}>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* ================= CARD LABEL UNDER MEDIA (Exact Reference Layout) ================= */}
              <div className="curved-gallery-card-meta text-center mt-3 sm:mt-4 space-y-0.5 w-full select-none pointer-events-none">
                {isCurrentActive ? (
                  /* Center Active Item Number, Title, and Gold Decorative Dash */
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] text-[#d4af37] uppercase">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-xs sm:text-sm lg:text-base font-medium text-[#f4efe6] uppercase tracking-[0.22em] mt-0.5 leading-snug">
                      {shortLabel}
                    </h3>
                    <div className="w-8 h-[1px] bg-[#d4af37]/60 mt-1.5" />
                  </div>
                ) : (
                  /* Side Inactive Item Number & Label */
                  <div className="flex flex-col items-center opacity-85">
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.2em] text-[#d4af37]/75 uppercase">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.18em] text-[#c7b299]/90 mt-0.5">
                      {shortLabel}
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle Inverted Floor Reflection (Grounding depth) */}
              <div className="curved-gallery-reflection pointer-events-none" aria-hidden="true">
                <img
                  src={mediaSrc}
                  alt=""
                  draggable={false}
                  className="w-full h-full object-cover"
                />
                <div className="curved-gallery-reflection-mask" />
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          ELEGANT NAVIGATION CONTROLS: ← [ 03 / 12 ] →
         ========================================================================= */}
      <div className="curved-gallery-controls relative z-30 flex items-center justify-center gap-6 sm:gap-8 mt-4 sm:mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="curved-gallery-nav-btn group"
          aria-label={isBn ? 'পূর্ববর্তী' : 'Previous'}
        >
          <ArrowLeft className="w-4 h-4 text-[#d4af37] transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        <div className="flex flex-col items-center">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#f4efe6]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="w-8 h-[1px] bg-[#d4af37]/50 mt-1" />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="curved-gallery-nav-btn group"
          aria-label={isBn ? 'পরবর্তী' : 'Next'}
        >
          <ArrowRight className="w-4 h-4 text-[#d4af37] transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
