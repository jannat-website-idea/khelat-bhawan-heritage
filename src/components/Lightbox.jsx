import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

  return (
    <div 
      className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-10 animate-fade-in text-primary-foreground"
      onClick={onClose}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between z-10 w-full" onClick={(e) => e.stopPropagation()}>
        <div>
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-rose-gold font-body">
            Khelat Bhavan Rajbari · Visual Archive {item.category && `· ${item.category.toUpperCase()}`}
          </span>
          <h3 className="font-serif text-lg md:text-2xl font-semibold text-primary-foreground mt-0.5">
            {item.title}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="text-primary-foreground hover:text-rose-gold transition-colors p-2"
          aria-label="Close Lightbox"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <div className="max-w-5xl max-h-[75vh] w-full rounded-sm overflow-hidden shadow-2xl bg-black border border-white/10">
            <video
              src={item.src}
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-[75vh] object-contain mx-auto"
            />
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.title}
            className="max-w-full max-h-[75vh] object-contain rounded-sm shadow-2xl"
          />
        )}

        {/* Prev & Next Arrows */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 md:left-6 w-12 h-12 rounded-full bg-navy/80 hover:bg-accent text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-sm shadow-lg"
            aria-label="Previous Media"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-2 md:right-6 w-12 h-12 rounded-full bg-navy/80 hover:bg-accent text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-sm shadow-lg"
            aria-label="Next Media"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Description */}
      <div className="max-w-3xl mx-auto text-center px-4 space-y-1.5" onClick={(e) => e.stopPropagation()}>
        <p className="text-xs md:text-sm text-primary-foreground/85 font-body leading-relaxed">
          {item.desc}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-rose-gold font-body">
          {item.date && <span>Date: {item.date}</span>}
          {item.photographer && <span>• Credit: {item.photographer}</span>}
        </div>
      </div>
    </div>
  );
}
