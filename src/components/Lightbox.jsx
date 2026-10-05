import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export default function Lightbox({ item, onClose, onNext, onPrev, hasNext, hasPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!item) return null;

  const finalSrc = getAssetUrl(item.src);

  return (
    <div 
      className="heritage-lightbox fixed inset-0 z-[100000] bg-[#090403]/98 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 animate-fade-in text-[#f4efe6] select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title || 'Visual Archive Lightbox'}
    >
      {/* Floating Minimalist Close Button on Top Right */}
      <button
        onClick={onClose}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 w-11 h-11 rounded-full bg-[#1e100c]/90 hover:bg-[#8a2034] text-[#d8ae62] hover:text-[#fff] border border-[#d8ae62]/50 hover:border-[#d8ae62] flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 hover:rotate-90 active:scale-95 cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Content Area */}
      <div className="heritage-lightbox__stage relative flex-1 flex items-center justify-center my-3 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <div className="max-w-[95vw] max-h-[85vh] w-full rounded-xl overflow-hidden shadow-2xl bg-black border border-[#d8ae62]/30">
            <video
              src={finalSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-[85vh] object-contain mx-auto"
            />
          </div>
        ) : (
          <img
            src={finalSrc}
            alt={item.title}
            className="max-w-[95vw] max-h-[85vh] object-contain rounded-xl shadow-2xl border border-[#d8ae62]/20"
          />
        )}

        {/* Prev & Next Arrows */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 md:left-6 w-12 h-12 rounded-full bg-[#2a171c]/90 hover:bg-[#741e30] text-[#d8ae62] hover:text-white flex items-center justify-center transition-all border border-[#d8ae62]/40 backdrop-blur-md shadow-xl hover:scale-110 cursor-pointer"
            aria-label="Previous Media"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-2 md:right-6 w-12 h-12 rounded-full bg-[#2a171c]/90 hover:bg-[#741e30] text-[#d8ae62] hover:text-white flex items-center justify-center transition-all border border-[#d8ae62]/40 backdrop-blur-md shadow-xl hover:scale-110 cursor-pointer"
            aria-label="Next Media"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        )}
      </div>

      {/* Bottom Description */}
      <div className="heritage-lightbox__description max-w-3xl mx-auto text-center px-4 space-y-1 z-10" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm md:text-base text-[#f0e8d8] font-normal leading-relaxed drop-shadow-sm">
          {item.desc}
        </p>
        {item.photographer && (
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#d8ae62] font-semibold tracking-wider uppercase pt-1">
            <span>Credit: {item.photographer}</span>
          </div>
        )}
      </div>
    </div>
  );
}
