import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '../utils/assetHelper';

export default function HeritageLoader({ onComplete, onReveal, lang }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const dialog = useRef(null);
  const bn = lang === 'bn';
  useEffect(() => {
    let disposed = false, assetsReady = false, finishing = false, frame, holdTimer, exitTimer;
    const start = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 350 : 6500;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    dialog.current?.focus({ preventScroll: true });
    const photo = new Image();
    const photoReady = new Promise(resolve => { photo.onload = resolve; photo.onerror = resolve; });
    photo.src = getAssetUrl('/images/SDP_0291.jpg');
    Promise.all([photoReady, document.fonts?.ready || Promise.resolve()]).then(() => { if (!disposed) assetsReady = true; });
    // Deliberately paced entrance progress, not a simulated download percentage.
    const tick = (now) => {
      const elapsed = now - start;
      const sequence = Math.min(1, elapsed / duration);
      const value = Math.floor((sequence * sequence * (3 - 2 * sequence)) * 100);
      const canOpen = assetsReady || elapsed > 9000;
      setProgress(canOpen ? value : Math.min(value, 96));
      if (sequence >= 1 && canOpen && !finishing) {
        finishing = true;
        setProgress(100);
        holdTimer = setTimeout(() => {
          if (disposed) return;
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          onReveal?.(true);
          setLeaving(true);
          exitTimer = setTimeout(() => onComplete(false), reduced ? 0 : 1100);
        }, reduced ? 0 : 250);
      }
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { disposed = true; cancelAnimationFrame(frame); clearTimeout(holdTimer); clearTimeout(exitTimer); photo.onload = photo.onerror = null; document.body.style.overflow = previousOverflow; };
  }, [onComplete, onReveal]);
  return <div ref={dialog} tabIndex={-1} className={`palace-entrance ${leaving ? 'is-leaving' : ''}`} role="status" aria-label={bn ? 'খেলাৎ ভবন লোড হচ্ছে' : 'Loading Khelat Bhawan'}>
    <div className="palace-entrance__portrait" aria-hidden="true"><img src={getAssetUrl('/images/SDP_0291.jpg')} alt="" /></div>
    <header>
      <span>{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</span>
      <span>{bn ? 'কলকাতা · ১৮৪৫' : 'Kolkata · 1845'}</span>
    </header>
    <div className="palace-entrance__composition">
      <p className="palace-entrance__label">{bn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি' : 'Pathuria Ghata Ghosh Bari'}</p>
      <h2>{bn ? 'খেলাৎ' : 'Khelat'}<em>{bn ? 'ভবন' : 'Bhawan'}</em></h2>
      <span className="palace-entrance__caption">{bn ? 'এক জীবন্ত উত্তরাধিকার' : 'A living legacy'}</span>
    </div>
    <footer><div className="palace-entrance__progress"><div><span>{bn ? 'বাড়িতে প্রবেশ' : 'Entering the house'}</span><output aria-hidden="true">{String(progress).padStart(2,'0')}<small>%</small></output></div><progress aria-label={bn ? 'প্রবেশের অগ্রগতি' : 'Entrance sequence progress'} value={progress} max="100" /></div></footer>
  </div>;
}
