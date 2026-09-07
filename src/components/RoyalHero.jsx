import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export default function RoyalHero({ lang, setActiveTab, ready }) {
  const bn = lang === 'bn';
  const [filmReady, setFilmReady] = useState(false);
  const video = useRef(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');

    const attemptPlay = () => {
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setFilmReady(true);
        }).catch(() => {
          // Autoplay was prevented by mobile browser power mode
        });
      }
    };

    attemptPlay();

    // Trigger video play on first user interaction if blocked by mobile battery saver / strict policy
    const handleFirstInteraction = () => {
      if (el.paused) {
        attemptPlay();
      }
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  const discover = () => {
    const target = document.getElementById('home-legacy');
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -90, duration: 1.1 });
    else target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`royal-hero is-entered`} aria-label={bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}>
      <div className="royal-hero__media">
        <img className="royal-hero__backdrop" src={getAssetUrl('/images/SDP_0344.jpg')} alt="" fetchpriority="high" />
        <video
          ref={video}
          className={`royal-hero__film ${filmReady ? 'is-ready' : ''}`}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
          src={getAssetUrl('/Videos/hero-palace-film.mp4')}
          onCanPlay={() => setFilmReady(true)}
          onPlaying={() => setFilmReady(true)}
          onLoadedData={() => setFilmReady(true)}
          onLoadedMetadata={() => setFilmReady(true)}
        />
      </div>
      <div className="royal-hero__shade" />
      
      {/* Top Right Corner Tag */}
      <div className="royal-hero__corner-tag">
        <span>{bn ? 'স্থাপিত ১৮৪৫' : 'ESTABLISHED 1845'}</span>
      </div>

      <div className="royal-hero__content">
        <h1 aria-label={bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}>
          <span className="reveal-line"><span>{bn ? 'খেলাৎ' : 'Khelat'}</span></span>{' '}
          <span className="reveal-line"><span>{bn ? 'ভবন' : 'Bhawan'}</span></span>
        </h1>
        <p className="royal-hero__subtitle">
          <span>{bn ? '১৮৪৫ সাল থেকে এক জীবন্ত উত্তরাধিকার' : 'A living legacy since 1845'}</span>
        </p>
        <button className="royal-outline-button" onClick={() => setActiveTab('heritage')}>
          {bn ? 'ঐতিহ্য আবিষ্কার করুন' : 'Explore heritage'}
          <ArrowRight size={19} aria-hidden="true" />
        </button>
      </div>

      <div className="royal-hero__bottom">
        <span>{bn ? 'পাথুরিয়াঘাটা · কলকাতা' : 'Pathuria Ghata · Kolkata'}</span>
        <button className="royal-scroll" onClick={discover}>
          {bn ? 'আরও দেখুন' : 'Scroll'}
          <i aria-hidden="true" />
        </button>
        <span className="text-right">{bn ? 'ঐতিহাসিক রাজবাড়ি' : 'Heritage Rajbari'}</span>
      </div>
    </section>
  );
}
