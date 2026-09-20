import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '../utils/assetHelper';

export default function HeritageLoader({ onComplete, onReveal, lang }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [entered, setEntered] = useState(false);
  const dialog = useRef(null);
  const bn = lang === 'bn';

  useEffect(() => {
    let disposed = false, assetsReady = false, finishing = false, frame, holdTimer, exitTimer;
    
    // Initial fade-in trigger
    const enterTimer = setTimeout(() => setEntered(true), 60);

    const start = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 400 : 3600; // Regal, leisurely luxury duration
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    dialog.current?.focus({ preventScroll: true });

    const photo = new Image();
    const photoReady = new Promise(resolve => { photo.onload = resolve; photo.onerror = resolve; });
    photo.src = getAssetUrl('/images/SDP_0291.jpg');
    Promise.all([photoReady, document.fonts?.ready || Promise.resolve()]).then(() => {
      if (!disposed) assetsReady = true;
    });
    
    const tick = (now) => {
      const elapsed = now - start;
      const sequence = Math.min(1, elapsed / duration);
      // Smooth quintic ease-in-out for slow cinematic emergence
      const ease = sequence < 0.5 
        ? 16 * Math.pow(sequence, 5) 
        : 1 - Math.pow(-2 * sequence + 2, 5) / 2;
      const value = Math.floor(ease * 100);
      const canOpen = assetsReady || elapsed > 5000;
      setProgress(canOpen ? value : Math.min(value, 98));

      if (sequence >= 1 && canOpen && !finishing) {
        finishing = true;
        setProgress(100);
        holdTimer = setTimeout(() => {
          if (disposed) return;
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          onReveal?.(true);
          setLeaving(true);
          exitTimer = setTimeout(() => onComplete(false), reduced ? 0 : 1200);
        }, reduced ? 0 : 320);
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      clearTimeout(enterTimer);
      cancelAnimationFrame(frame);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      photo.onload = photo.onerror = null;
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, onReveal]);

  // Progressive Emergence Calculations
  const normalizedProgress = progress / 100;
  // Title starts at 0 opacity, emerges slowly as loading progresses
  const titleOpacity = Math.min(1, Math.pow(normalizedProgress, 1.3) * 1.1);
  const titleBlur = Math.max(0, (1 - normalizedProgress) * 14);
  const titleScale = 0.94 + normalizedProgress * 0.06;
  const titleTracking = `${0.02 + normalizedProgress * 0.12}em`;
  const titleTranslateY = (1 - normalizedProgress) * 14;

  return (
    <div
      ref={dialog}
      tabIndex={-1}
      className={`palace-entrance ${entered ? 'is-entered' : ''} ${leaving ? 'is-leaving' : ''}`}
      style={{
        transition: 'opacity 1.25s cubic-bezier(0.22, 1, 0.36, 1), transform 1.25s cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: leaving ? 0 : entered ? 1 : 0,
        transform: leaving ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: leaving ? 'none' : 'auto',
        backgroundColor: '#12080a'
      }}
      role="status"
      aria-label={bn ? 'খেলাৎ ভবন লোড হচ্ছে' : 'Loading Khelat Bhawan'}
    >
      {/* Background Architectural Atmosphere */}
      <div 
        className="palace-entrance__portrait" 
        aria-hidden="true"
        style={{
          transform: `scale(${1.08 - normalizedProgress * 0.08})`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <img src={getAssetUrl('/images/SDP_0291.jpg')} alt="" />
      </div>

      {/* Top Header Labels */}
      <header className="fade-in-header" style={{ opacity: Math.min(1, normalizedProgress * 1.5) }}>
        <span className="tracking-[0.25em] font-sans text-xs">{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</span>
        <span className="tracking-[0.25em] font-sans text-xs">{bn ? 'কলকাতা · স্থাপিত ১৮৪৫' : 'Kolkata · Est. 1845'}</span>
      </header>

      {/* Central Composition with Slow Faded "Khelat Bhawan" Emergence */}
      <div className="palace-entrance__composition">
        <p 
          className="palace-entrance__label"
          style={{
            opacity: Math.min(1, Math.pow(normalizedProgress, 1.5)),
            letterSpacing: `${0.25 + normalizedProgress * 0.1}em`,
            transition: 'opacity 0.4s ease-out'
          }}
        >
          {bn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি' : 'Pathuria Ghata Ghosh Bari'}
        </p>
        
        {/* Progressive Title Emergence */}
        <h2
          className="palace-title-emerge"
          style={{
            opacity: titleOpacity,
            filter: `blur(${titleBlur}px)`,
            letterSpacing: titleTracking,
            transform: `translate3d(0, ${titleTranslateY}px, 0) scale(${titleScale})`,
            transition: 'opacity 0.25s ease-out, filter 0.25s ease-out, transform 0.25s ease-out, letter-spacing 0.25s ease-out'
          }}
        >
          {bn ? (
            <>খেলাৎ <em>ভবন</em></>
          ) : (
            <>Khelat <em>Bhawan</em></>
          )}
        </h2>

        <span 
          className="palace-entrance__caption"
          style={{
            opacity: Math.min(1, Math.max(0, (normalizedProgress - 0.25) * 1.4)),
            transition: 'opacity 0.4s ease-out'
          }}
        >
          {bn ? 'এক জীবন্ত ঐতিহ্য ও সাবেকি উত্তরাধিকার' : 'A living legacy of Bengal since 1845'}
        </span>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <footer>
        <div className="palace-entrance__progress">
          <div>
            <span className="tracking-[0.22em] text-[10.5px] font-sans font-medium text-[#d8ae62]/90">
              {bn ? 'প্রাসাদে প্রবেশাধিকার' : 'ENTERING THE PALACE'}
            </span>
            <output aria-hidden="true" className="font-serif text-2xl sm:text-3xl text-[#ecd69e]">
              {String(progress).padStart(2, '0')}
              <small className="text-xs text-[#d8ae62] ml-1 font-sans">%</small>
            </output>
          </div>
          
          {/* Custom Glowing Gold Hairline Progress Bar */}
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-[#b78c43] via-[#ecd69e] to-[#ffffff] rounded-full transition-all duration-150 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-200 rounded-full blur-[3px] opacity-80" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
