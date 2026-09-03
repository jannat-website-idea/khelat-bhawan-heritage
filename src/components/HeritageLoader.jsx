import React, { useEffect, useRef, useState } from 'react';
import { Crown } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export default function HeritageLoader({ onComplete, lang }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const skip = useRef(null);
  const bn = lang === 'bn';
  useEffect(() => {
    let disposed = false, completed = 0, displayed = 0, frame, exitTimer;
    const start = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    skip.current?.focus({ preventScroll: true });
    const finish = () => { if (!disposed) completed += 1; };
    const poster = new Image();
    poster.onload = finish;
    poster.onerror = finish;
    poster.src = getAssetUrl('/images/SDP_0344.jpg');
    // Progress tracks critical readiness milestones, not downloaded bytes.
    (document.fonts?.ready || Promise.resolve()).then(finish, finish);
    const ready = () => finish();
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', ready, { once: true });
    const tick = (now) => {
      // Slow networks never trap a visitor behind the introduction.
      const timedOut = now - start > 4500;
      const target = timedOut ? 100 : Math.min(100, completed / 3 * 100);
      displayed = reduced ? target : Math.min(target, displayed + 1.8);
      setProgress(Math.floor(displayed));
      if (displayed >= 100 && now - start > (reduced ? 0 : 1200)) {
        setLeaving(true);
        exitTimer = setTimeout(() => onComplete(false), reduced ? 0 : 650);
      } else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      poster.onload = poster.onerror = null;
      window.removeEventListener('load', ready);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };
  }, [onComplete]);
  return <div className={`heritage-loader ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-modal="true" aria-labelledby="loading-title">
    <div className="heritage-loader__frame" aria-hidden="true" />
    <div className="heritage-loader__content">
      <div className="heritage-loader__seal"><Crown size={40} strokeWidth={1} aria-hidden="true" /><span>KB</span></div>
      <p className="heritage-loader__eyebrow">{bn ? 'পাথুরিয়াঘাটা · প্রতিষ্ঠিত ১৮৪৫' : 'Pathuria Ghata · Established 1845'}</p>
      <h2 id="loading-title">{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</h2>
      <p className="heritage-loader__invitation">{bn ? 'এক জীবন্ত উত্তরাধিকারে স্বাগতম' : 'Enter a living legacy'}</p>
      <div className="heritage-loader__progress"><span>{bn ? 'প্রস্তুত হচ্ছে' : 'Preparing your visit'}</span><output aria-hidden="true">{progress}%</output></div>
      <progress aria-label={bn ? 'ওয়েবসাইট প্রস্তুতির অগ্রগতি' : 'Website preparation progress'} value={progress} max="100" />
      <button ref={skip} onClick={() => onComplete(false)}>{bn ? 'সরাসরি প্রবেশ করুন' : 'Enter website'}</button>
    </div>
  </div>;
}
