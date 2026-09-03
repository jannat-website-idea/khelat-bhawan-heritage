import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Crown, Pause, Play } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

const scenes = ['hero-colonnade', 'hero-doorway', 'hero-courtyard'];

export default function RoyalHero({ lang, setActiveTab }) {
  const bn = lang === 'bn';
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motion, setMotion] = useState(false);
  const video = useRef(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!preference.matches && !navigator.connection?.saveData);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const playOrPause = () => {
      if (paused || document.hidden) element.pause();
      else element.play().catch(() => setPaused(true));
    };
    playOrPause();
    document.addEventListener('visibilitychange', playOrPause);
    return () => document.removeEventListener('visibilitychange', playOrPause);
  }, [paused, scene, motion]);

  return (
    <section className="royal-hero" aria-label={bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}>
      <div className="royal-hero__media">
      <img className="royal-hero__backdrop" src={getAssetUrl('/images/SDP_0344.jpg')} alt="" fetchpriority="high" />
      {motion && <video ref={video} key={scene} className="royal-hero__film" muted playsInline autoPlay={!paused} preload="auto"
        poster={getAssetUrl('/images/SDP_0344.jpg')} aria-hidden="true"
        src={getAssetUrl(`/Videos/${scenes[scene]}.mp4`)}
        onEnded={() => setScene((current) => (current + 1) % scenes.length)} onError={() => setMotion(false)} />}
      </div>
      <div className="royal-hero__shade" />
      <div className="royal-hero__content">
        <Crown className="royal-hero__crown" strokeWidth={1.25} aria-hidden="true" />
        <h1>{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</h1>
        <p className="royal-hero__subtitle"><span>{bn ? '১৮৪৫ সাল থেকে এক জীবন্ত উত্তরাধিকার' : 'A living legacy since 1845'}</span></p>
        <button className="royal-outline-button" onClick={() => setActiveTab('heritage')}>
          {bn ? 'ঐতিহ্য আবিষ্কার করুন' : 'Explore heritage'} <ArrowRight size={19} aria-hidden="true" />
        </button>
      </div>
      <div className="royal-hero__bottom">
        <span>{bn ? 'পাথুরিয়াঘাটা · কলকাতা' : 'Pathuria Ghata · Kolkata'}</span>
        <button className="royal-scroll" onClick={() => document.getElementById('home-legacy').scrollIntoView({ behavior: motion ? 'smooth' : 'auto' })}>{bn ? 'আরও দেখুন' : 'Scroll to discover'}<i aria-hidden="true" /></button>
        <div className="royal-hero__film-controls" aria-label={bn ? 'ভিডিও নিয়ন্ত্রণ' : 'Hero film controls'}>
          {scenes.map((name, index) => <button key={name} className={scene === index ? 'is-active' : ''} aria-label={bn ? `দৃশ্য ${index + 1}` : `Play scene ${index + 1}`} aria-pressed={scene === index} onClick={() => { setScene(index); setMotion(true); setPaused(false); }}><span /></button>)}
          <button aria-label={paused || !motion ? (bn ? 'ভিডিও চালান' : 'Play hero video') : (bn ? 'ভিডিও থামান' : 'Pause hero video')} onClick={() => { if (!motion) { setMotion(true); setPaused(false); } else setPaused(!paused); }}>{paused || !motion ? <Play size={15} /> : <Pause size={15} />}</button>
        </div>
      </div>
    </section>
  );
}
