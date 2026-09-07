import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export default function RoyalHero({ lang, setActiveTab, ready }) {
  const bn = lang === 'bn';
  const video = useRef(null);
  const hasStarted = useRef(false);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute('playsinline', 'true');
    el.setAttribute('webkit-playsinline', 'true');
    el.setAttribute('x5-playsinline', 'true');

    const setBrideScene = () => {
      try {
        if (!hasStarted.current && el.duration > 11) {
          el.currentTime = 10.9;
        }
      } catch (e) {}
    };

    if (el.readyState >= 1) {
      setBrideScene();
    } else {
      el.addEventListener('loadedmetadata', setBrideScene, { once: true });
    }

    return () => {
      el.removeEventListener('loadedmetadata', setBrideScene);
    };
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || !ready) return;
    let active = true;

    const attemptPlay = () => {
      if (!active || document.hidden) return;
      el.muted = true;
      el.defaultMuted = true;
      const promise = el.play();
      promise?.then(() => {
        if (active) {
          hasStarted.current = true;
          setFilmPlaying(true);
          setAutoplayBlocked(false);
        }
      }).catch(() => {
        // Strict mobile power-saving modes require the first touch; the
        // interaction listeners below retry playback in that user gesture.
      });
    };

    const resumeWhenVisible = () => {
      if (!document.hidden) attemptPlay();
    };
    const resumeFromInteraction = () => attemptPlay();

    el.addEventListener('canplay', attemptPlay);
    el.addEventListener('loadeddata', attemptPlay);
    document.addEventListener('visibilitychange', resumeWhenVisible);
    window.addEventListener('pageshow', attemptPlay);
    window.addEventListener('focus', attemptPlay);
    window.addEventListener('touchstart', resumeFromInteraction, { passive: true });
    window.addEventListener('pointerdown', resumeFromInteraction, { passive: true });

    // The last retry runs after the entrance overlay has fully unmounted.
    const retries = [0, 350, 1450].map(delay => window.setTimeout(attemptPlay, delay));
    const blockedTimer = window.setTimeout(() => {
      if (active && el.paused) setAutoplayBlocked(true);
    }, 2300);

    return () => {
      active = false;
      retries.forEach(window.clearTimeout);
      window.clearTimeout(blockedTimer);
      el.removeEventListener('canplay', attemptPlay);
      el.removeEventListener('loadeddata', attemptPlay);
      document.removeEventListener('visibilitychange', resumeWhenVisible);
      window.removeEventListener('pageshow', attemptPlay);
      window.removeEventListener('focus', attemptPlay);
      window.removeEventListener('touchstart', resumeFromInteraction);
      window.removeEventListener('pointerdown', resumeFromInteraction);
    };
  }, [ready]);

  const playFilm = () => {
    const el = video.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.play().then(() => {
      hasStarted.current = true;
      setFilmPlaying(true);
      setAutoplayBlocked(false);
    }).catch(() => setAutoplayBlocked(true));
  };

  const discover = () => {
    const target = document.getElementById('home-legacy');
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -90, duration: 1.1 });
    else target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`royal-hero ${ready ? 'is-entered' : ''}`} aria-label={bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}>
      <div className="royal-hero__media">
        <img className="royal-hero__backdrop" src={getAssetUrl('/images/SDP_0344.jpg')} alt="" fetchpriority="high" />
        <video
          ref={video}
          className="royal-hero__film"
          autoPlay
          muted
          defaultMuted
          playsInline
          loop
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-hidden="true"
          src={getAssetUrl('/Videos/hero-palace-film.mp4')}
          poster={getAssetUrl('/images/SDP_0344.jpg')}
          onPlaying={() => {
            hasStarted.current = true;
            setFilmPlaying(true);
            setAutoplayBlocked(false);
          }}
          onPause={() => setFilmPlaying(false)}
          onError={() => setAutoplayBlocked(true)}
        >
          Your browser does not support background video.
        </video>
      </div>
      <div className="royal-hero__shade" />

      {autoplayBlocked && !filmPlaying && (
        <button className="royal-hero__play-film" type="button" onClick={playFilm} aria-label={bn ? 'প্রাসাদের চলচ্চিত্র চালান' : 'Play the palace film'}>
          <span><Play size={16} fill="currentColor" aria-hidden="true" /></span>
          {bn ? 'প্রাসাদের চলচ্চিত্র চালান' : 'Play palace film'}
        </button>
      )}
      
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
