import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Play } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between animate-fade-in text-white p-4 md:p-8">
      {/* Top Controls */}
      <div className="flex items-center justify-between z-10">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-rosegold-400 font-medium">
            Khelat Bhawan Heritage Archive
          </span>
          <h4 className="text-lg md:text-xl font-serif font-bold text-rosegold-100">
            {item.title}
          </h4>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Media Container */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {item.type === 'video' ? (
          <div className="max-w-5xl max-h-[75vh] w-full rounded-xl overflow-hidden shadow-2xl border border-rosegold-500/30 bg-black">
            <video
              src={item.src}
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-[75vh] object-contain mx-auto"
            />
          </div>
        ) : (
          <div className="relative max-w-5xl max-h-[75vh] flex items-center justify-center">
            <img
              src={item.src}
              alt={item.title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-rosegold-900/50"
            />
          </div>
        )}

        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 md:left-6 w-12 h-12 rounded-full bg-black/50 hover:bg-rosegold-600/80 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-2 md:right-6 w-12 h-12 rounded-full bg-black/50 hover:bg-rosegold-600/80 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div className="max-w-4xl mx-auto text-center px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
        <p className="text-xs md:text-sm text-stone-300 font-light leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
}
