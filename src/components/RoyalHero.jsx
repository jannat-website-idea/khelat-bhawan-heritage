import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

// One continuous edit keeps the decoder alive through dissolves and looping.
const chapters = [0, 5.6, 10.9];
export default function RoyalHero({ lang, setActiveTab, ready }) {
  const bn = lang === 'bn';
  // Open on the bride ascending the grand staircase, then continue through the palace film.
  const [scene, setScene] = useState(2);
  const [paused, setPaused] = useState(false);
  const [motion, setMotion] = useState(false);
  const [filmReady, setFilmReady] = useState(false);
  const video = useRef(null);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!preference.matches && !navigator.connection?.saveData);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let inView = true, active = true;
    const sync = () => {
      if (paused || !ready || document.hidden || !inView) element.pause();
      else element.play().catch(error => {
        // Leaving the viewport can cancel a pending play; it is not a user pause.
        if (active && error.name !== 'AbortError') setPaused(true);
      });
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    observer.observe(element.closest('section'));
    return () => { active = false; document.removeEventListener('visibilitychange', sync); observer.disconnect(); };
  }, [paused, motion, ready]);
  const selectScene = (index) => {
    setMotion(true); setPaused(false); setScene(index);
    if (video.current) video.current.currentTime = chapters[index];
  };
  const discover = () => {
    const target = document.getElementById('home-legacy');
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -90, duration: 1.1 });
    else target?.scrollIntoView({ behavior: 'auto' });
  };
  return <section className={`royal-hero ${ready ? 'is-entered' : ''}`} aria-label={bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}>
    <div className="royal-hero__media">
      <img className="royal-hero__backdrop" src={getAssetUrl('/images/SDP_0344.jpg')} alt="" fetchpriority="high" />
      {motion && <video ref={video} className={`royal-hero__film ${filmReady ? 'is-ready' : ''}`} muted playsInline loop preload="auto" aria-hidden="true"
        src={getAssetUrl('/Videos/hero-palace-film.mp4')} onLoadedData={() => { setFilmReady(true); if (video.current) video.current.currentTime = chapters[scene]; }}
        onTimeUpdate={(e) => { const time = e.currentTarget.currentTime; const next = time >= chapters[2] ? 2 : time >= chapters[1] ? 1 : 0; setScene(previous => previous === next ? previous : next); }}
        onError={() => setMotion(false)} />}
    </div>
    <div className="royal-hero__shade" />
    
    {/* Top Right Corner Tag */}
    <div className="royal-hero__corner-tag">
      <span>{bn ? 'স্থাপিত ১৮৪৫' : 'ESTABLISHED 1845'}</span>
    </div>

    <div className="royal-hero__content">
      <h1 aria-label={bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}><span className="reveal-line"><span>{bn ? 'খেলাৎ' : 'Khelat'}</span></span>{' '}<span className="reveal-line"><span>{bn ? 'ভবন' : 'Bhawan'}</span></span></h1>
      <p className="royal-hero__subtitle"><span>{bn ? '১৮৪৫ সাল থেকে এক জীবন্ত উত্তরাধিকার' : 'A living legacy since 1845'}</span></p>
      <button className="royal-outline-button" onClick={() => setActiveTab('heritage')}>{bn ? 'ঐতিহ্য আবিষ্কার করুন' : 'Explore heritage'}<ArrowRight size={19} aria-hidden="true" /></button>
    </div>
    <div className="royal-hero__bottom">
      <span>{bn ? 'পাথুরিয়াঘাটা · কলকাতা' : 'Pathuria Ghata · Kolkata'}</span>
      <button className="royal-scroll" onClick={discover}>{bn ? 'আরও দেখুন' : 'Scroll'}<i aria-hidden="true" /></button>
      <span className="text-right">{bn ? 'ঐতিহাসিক রাজবাড়ি' : 'Heritage Rajbari'}</span>
    </div>
  </section>;
}
