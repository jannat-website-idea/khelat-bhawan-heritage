import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAssetUrl } from '../utils/assetHelper';
import { ArrowLeft, ArrowRight, Play, Maximize2 } from 'lucide-react';

export default function CurvedGalleryCarousel({
  items = [],
  mediaType = 'image', // 'image' | 'video'
  lang = 'en',
  initialIndex = 2,
  scrollDriven = false,
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
  const [displayIndex, setDisplayIndex] = useState(() => initialIndex);
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === 'undefined' ? 1440 : window.innerWidth);
  const containerRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const wheelLockRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const frameRef = useRef(null);

  const total = items.length;
  const isBn = lang === 'bn';

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1100;

  // Responsive breakpoint check
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToIndex = useCallback((index) => {
    const track = scrollTrackRef.current;
    if (!scrollDriven || !track || viewportWidth < 1100) return false;
    const startIndex = Math.min(initialIndex, Math.max(total - 1, 0));
    if (index < startIndex) return false;
    const steps = Math.max(total - 1 - startIndex, 1);
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
    const progress = Math.max(0, Math.min(1, (index - startIndex) / steps));
    window.scrollTo({ top: trackTop + (travel * progress), behavior: 'smooth' });
    return true;
  }, [initialIndex, scrollDriven, total, viewportWidth]);

  // Navigation handlers with smooth cycling
  const handlePrev = useCallback(() => {
    if (total === 0) return;
    const nextIndex = (activeIndex - 1 + total) % total;
    if (!scrollToIndex(nextIndex)) {
      setActiveIndex(nextIndex);
      setDisplayIndex(nextIndex);
    }
  }, [activeIndex, scrollToIndex, total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    const nextIndex = (activeIndex + 1) % total;
    if (!scrollToIndex(nextIndex)) {
      setActiveIndex(nextIndex);
      setDisplayIndex(nextIndex);
    }
  }, [activeIndex, scrollToIndex, total]);

  // Desktop vertical scrolling rotates the photographic wall while it remains pinned.
  useEffect(() => {
    if (!scrollDriven || viewportWidth < 1100 || total < 2) return undefined;

    const updateFromScroll = () => {
      frameRef.current = null;
      const track = scrollTrackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      const startIndex = Math.min(initialIndex, total - 1);
      const nextDisplayIndex = startIndex + (progress * (total - 1 - startIndex));
      setDisplayIndex(nextDisplayIndex);
      setActiveIndex(Math.round(nextDisplayIndex));
    };

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [initialIndex, scrollDriven, total, viewportWidth]);

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

  // Horizontal wheel navigation remains available when the gallery is not pinned.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || (scrollDriven && viewportWidth >= 1100)) return undefined;

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
  }, [handleNext, handlePrev, scrollDriven, viewportWidth]);

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

  // Calculate position relative to the continuously interpolated active index.
  const getOffset = (index) => {
    let diff = index - displayIndex;
    if (scrollDriven && viewportWidth >= 1100) return diff;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const mix = (from, to, amount) => from + ((to - from) * amount);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  // Continuous concave-wall interpolation: every scroll tick changes X, Z,
  // rotation, scale, opacity and brightness together.
  const getCardTransform = (offset) => {
    const dragOffsetPx = isDragging ? currentDeltaX * 0.45 : 0;

    if (isMobile) {
      const limited = clamp(offset, -1.35, 1.35);
      const abs = Math.abs(limited);
      const x = limited * viewportWidth * .68;
      const z = mix(40, -80, Math.min(abs, 1));
      const rotate = limited * -18;
      const scale = mix(1, .84, Math.min(abs, 1));
      return {
        transform: `translateX(calc(-50% + ${x + dragOffsetPx}px)) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`,
        zIndex: Math.round(30 - (abs * 10)),
        opacity: mix(1, .64, Math.min(abs, 1)),
        filter: `brightness(${mix(1, .74, Math.min(abs, 1))})`
      };
    }

    const abs = Math.abs(offset);
    const sign = Math.sign(offset);
    const nearX = clamp(viewportWidth * .255, 270, 390);
    const farX = clamp(viewportWidth * .455, 500, 720);
    const secondLeg = clamp(abs - 1, 0, 1);
    const firstLeg = Math.min(abs, 1);
    const x = abs <= 1 ? nearX * firstLeg : mix(nearX, farX, secondLeg);
    const z = abs <= 1 ? mix(180, 40, firstLeg) : mix(40, -115, secondLeg);
    const rotate = sign * (abs <= 1 ? mix(0, -22, firstLeg) : mix(-22, -37, secondLeg));
    const scale = abs <= 1 ? mix(1, .82, firstLeg) : mix(.82, .67, secondLeg);
    const opacity = abs <= 1 ? mix(1, .9, firstLeg) : mix(.9, .58, secondLeg);
    const brightness = abs <= 1 ? mix(1, .84, firstLeg) : mix(.84, .62, secondLeg);

    if (abs <= 2.55) {
      return {
        transform: `translateX(calc(-50% + ${(sign * x) + dragOffsetPx}px)) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`,
        zIndex: Math.round(40 - (abs * 12)),
        opacity,
        filter: `brightness(${brightness})`
      };
    }

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
    if (!isCurrentActive) {
      if (!scrollToIndex(index)) {
        setActiveIndex(index);
        setDisplayIndex(index);
      }
      return;
    }
    setActiveIndex(index);
    if (onSelectMedia) {
      onSelectMedia(item, index);
    }
  };

  const stickyScrollEnabled = scrollDriven && !isMobile && !isTablet;
  const scrollSteps = Math.max(total - 1 - Math.min(initialIndex, total - 1), 1);

  return (
    <div
      ref={scrollTrackRef}
      className={stickyScrollEnabled ? 'curved-gallery-scroll-track' : ''}
      style={stickyScrollEnabled ? { '--gallery-scroll-height': `${100 + (scrollSteps * 38)}vh` } : undefined}
    >
      <div className={stickyScrollEnabled ? 'curved-gallery-sticky-viewport' : ''}>
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
          const distance = Math.abs(offset);
          const isCurrentActive = distance < 0.5;
          const isNearSide = distance >= 0.5 && distance < 1.5;
          const isFarSide = distance >= 1.5;
          const visibleRange = isMobile || isTablet ? 1.55 : 2.55;
          const isVisible = distance <= visibleRange;
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item, index, isCurrentActive);
                }
              }}
              aria-label={`Open ${fullTitle} in full screen`}
              className={`curved-gallery-card absolute top-4 left-1/2 transition-all ${
                isDragging || stickyScrollEnabled ? 'duration-150' : 'duration-1000 cubic-bezier(0.16, 1, 0.3, 1)'
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
                  className="w-full h-full object-cover transition-transform duration-1000 pointer-events-none group-hover:scale-[1.015]"
                  loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                />

                {/* Subtle Ambient Vignette Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                  isCurrentActive ? 'bg-gradient-to-t from-black/35 via-transparent to-black/10' : 'bg-black/30 group-hover:bg-black/10'
                }`} />

                {/* Video Play Badge for Video Media */}
                {mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`rounded-full bg-[#120a08]/85 border border-[#c99a4a] flex items-center justify-center text-[#e1c889] shadow-2xl transition-transform duration-300 ${
                      isCurrentActive ? 'w-16 h-16 sm:w-20 sm:h-20 scale-100 group-hover:scale-110' : 'w-10 h-10 sm:w-12 sm:h-12 opacity-85 group-hover:opacity-100'
                    }`}>
                      <Play className={`${isCurrentActive ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-4 h-4'} fill-current ml-1`} />
                    </div>
                  </div>
                )}

                {/* Video Duration Badge */}
                {mediaType === 'video' && item.duration && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/85 border border-[#c99a4a]/40 text-[10px] font-mono text-[#e1c889] tracking-wider pointer-events-none">
                    {item.duration}
                  </div>
                )}

                {/* Fullscreen Expand Cue on Hover */}
                {mediaType === 'image' && (
                  <div className={`curved-gallery-expand-cue absolute bottom-3 right-3 p-2 rounded-full bg-[#160c0a]/85 border border-[#c99a4a]/60 text-[#e1c889] transition-opacity duration-300 pointer-events-none ${
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
                    <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] text-[#c99a4a] uppercase">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-xs sm:text-sm lg:text-base font-medium text-[#f4efe6] uppercase tracking-[0.22em] mt-0.5 leading-snug">
                      {shortLabel}
                    </h3>
                    <div className="w-8 h-[1px] bg-[#c99a4a]/60 mt-1.5" />
                  </div>
                ) : (
                  /* Side Inactive Item Number & Label */
                  <div className="flex flex-col items-center opacity-85">
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.2em] text-[#c99a4a]/75 uppercase">
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
          <ArrowLeft className="w-4 h-4 text-[#c99a4a] transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        <div className="flex flex-col items-center">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#f4efe6]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="w-8 h-[1px] bg-[#c99a4a]/50 mt-1" />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="curved-gallery-nav-btn group"
          aria-label={isBn ? 'পরবর্তী' : 'Next'}
        >
          <ArrowRight className="w-4 h-4 text-[#c99a4a] transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        </div>
      </div>
    </div>
    </div>
  );
}
