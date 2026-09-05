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
    const duration = reduced ? 350 : 6500;
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
      const canOpen = assetsReady || elapsed > 9000;
      setProgress(canOpen ? value : Math.min(value, 96));
      if (sequence >= 1 && canOpen) { setLeaving(true); exitTimer = setTimeout(() => onComplete(false), reduced ? 0 : 1100); }
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { disposed = true; cancelAnimationFrame(frame); clearTimeout(exitTimer); photo.onload = photo.onerror = null; document.body.style.overflow = previousOverflow; };
  }, [onComplete]);
  return <div ref={dialog} tabIndex={-1} className={`palace-entrance ${leaving ? 'is-leaving' : ''}`} role="status" aria-label={bn ? 'খেলাৎ ভবন লোড হচ্ছে' : 'Loading Khelat Bhawan'}>
    <div className="palace-entrance__shutter palace-entrance__shutter--left" aria-hidden="true" />
    <div className="palace-entrance__shutter palace-entrance__shutter--right" aria-hidden="true" />
    <div className="palace-entrance__portrait" aria-hidden="true"><img src={getAssetUrl('/images/SDP_0291.jpg')} alt="" /></div>
    <footer><div className="palace-entrance__progress"><div><output aria-hidden="true">{String(progress).padStart(2,'0')}<small>%</small></output></div><progress aria-label={bn ? 'প্রবেশের অগ্রগতি' : 'Entrance sequence progress'} value={progress} max="100" /></div></footer>
  </div>;
}
