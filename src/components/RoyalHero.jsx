import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export default function RoyalHero({ lang, setActiveTab, ready }) {
  const bn = lang === 'bn';
  const video = useRef(null);

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
        if (el.currentTime < 1) {
          el.currentTime = 10.9;
        }
      } catch (e) {}
    };

    if (el.readyState >= 1) {
      setBrideScene();
    } else {
      el.addEventListener('loadedmetadata', setBrideScene, { once: true });
    }

    const attemptPlay = () => {
      const p = el.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    };

    attemptPlay();

    // Trigger video play on first user interaction if blocked by mobile battery saver / strict policy
    const handleFirstInteraction = () => {
      attemptPlay();
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
    <section className="royal-hero is-entered" aria-label={bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}>
      <div className="royal-hero__media">
        <img className="royal-hero__backdrop" src={getAssetUrl('/images/SDP_0344.jpg')} alt="" fetchpriority="high" />
        <video
          ref={video}
          className="royal-hero__film"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
          poster={getAssetUrl('/images/SDP_0344.jpg')}
        >
          <source src={getAssetUrl('/Videos/hero-palace-film.mp4')} type="video/mp4" />
        </video>
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
