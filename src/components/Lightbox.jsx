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
      className="fixed inset-0 z-[9999] bg-[#120a0d]/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 animate-fade-in text-[#f7eed9] select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title || 'Visual Archive Lightbox'}
    >
      {/* Top Header Bar */}
      <div 
        className="flex items-center justify-between z-20 w-full max-w-7xl mx-auto pb-4 border-b border-[#d8ae62]/25" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a171c] hover:bg-[#3d2027] border border-[#d8ae62]/40 text-[#d8ae62] hover:text-[#fff] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer"
            aria-label="Go back and close"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div>
            <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#d8ae62] font-semibold block">
              Khelat Bhawan · Visual Archive {item.category && `· ${item.category.toUpperCase()}`}
            </span>
            <h3 className="font-serif text-base md:text-2xl font-bold text-[#fcf8ee] mt-0.5 leading-tight line-clamp-1">
              {item.title}
            </h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#741e30] hover:bg-[#8f273d] text-[#fff] border border-[#d8ae62]/60 hover:border-[#d8ae62] text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Close Lightbox"
        >
          <span>Close</span>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <div className="max-w-5xl max-h-[70vh] w-full rounded-xl overflow-hidden shadow-2xl bg-black border border-[#d8ae62]/30">
            <video
              src={finalSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-[70vh] object-contain mx-auto"
            />
          </div>
        ) : (
          <img
            src={finalSrc}
            alt={item.title}
            className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-[#d8ae62]/20"
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
      <div className="max-w-3xl mx-auto text-center px-4 space-y-1 z-10" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm md:text-base text-[#e5ddc8] font-light leading-relaxed">
          {item.desc}
        </p>
        {item.photographer && (
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#d8ae62]">
            <span>Credit: {item.photographer}</span>
          </div>
        )}
      </div>
    </div>
  );
}
