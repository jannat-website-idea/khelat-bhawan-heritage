import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '../utils/assetHelper';

export default function HeritageLoader({ onComplete, lang }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const dialog = useRef(null);
  const bn = lang === 'bn';
  useEffect(() => {
    let disposed = false, assetsReady = false, frame, exitTimer;
    const start = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 350 : 3800;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
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
      const canOpen = assetsReady || elapsed > 6000;
      setProgress(canOpen ? value : Math.min(value, 96));
      if (sequence >= 1 && canOpen) { setLeaving(true); exitTimer = setTimeout(() => onComplete(false), reduced ? 0 : 900); }
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { disposed = true; cancelAnimationFrame(frame); clearTimeout(exitTimer); photo.onload = photo.onerror = null; document.body.style.overflow = previousOverflow; };
  }, [onComplete]);
  return <div ref={dialog} tabIndex={-1} className={`palace-entrance ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-modal="true" aria-labelledby="loading-title" onKeyDown={(event) => {
    if (event.key === 'Escape') onComplete(false);
    if (event.key === 'Tab') {
      event.preventDefault();
      dialog.current?.querySelector('button')?.focus();
    }
  }}>
    <div className="palace-entrance__shutter palace-entrance__shutter--left" aria-hidden="true" /><div className="palace-entrance__shutter palace-entrance__shutter--right" aria-hidden="true" />
    <header><span>{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</span><span>{bn ? 'কলকাতা · ১৮৪৫' : 'Kolkata · 1845'}</span></header>
    <div className="palace-entrance__composition">
      <div className="palace-entrance__portrait"><img src={getAssetUrl('/images/SDP_0291.jpg')} alt="" /></div>
      <p className="palace-entrance__label">{bn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি' : 'Pathuria Ghata Ghosh Bari'}</p>
      <h2 id="loading-title">{bn ? 'খেলাৎ' : 'Khelat'}<em>{bn ? 'ভবন' : 'Bhawan'}</em></h2>
      <span className="palace-entrance__caption">{bn ? 'এক জীবন্ত উত্তরাধিকার' : 'A living legacy'}</span>
    </div>
    <footer><div className="palace-entrance__progress"><div><span>{bn ? 'স্বাগতম' : 'Entering the house'}</span><output aria-hidden="true">{String(progress).padStart(2,'0')}<small>%</small></output></div><progress aria-label={bn ? 'প্রবেশের অগ্রগতি' : 'Entrance sequence progress'} value={progress} max="100" /></div><button onClick={() => onComplete(false)}>{bn ? 'সরাসরি প্রবেশ করুন' : 'Skip introduction'}</button></footer>
  </div>;
}
