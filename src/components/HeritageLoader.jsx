import React, { useEffect, useRef, useState } from 'react';

export default function HeritageLoader({ onComplete, onReveal, lang }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const canvasRef = useRef(null);
  const dialog = useRef(null);
  const bn = lang === 'bn';

  // 1. Balanced Golden Glitter & Corner Ambient Dust Canvas with Retina / High-DPI support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 48;
    const particles = Array.from({ length: particleCount }, (_, idx) => {
      const isCenter = idx < 22;
      const x = isCenter
        ? width / 2 + (Math.random() - 0.5) * (width * 0.55)
        : Math.random() * width;
      const y = isCenter
        ? height / 2 + (Math.random() - 0.5) * (height * 0.55)
        : Math.random() * height;

      return {
        x,
        y,
        radius: (Math.random() * 1.8 + 0.5) * dpr,
        vx: (Math.random() - 0.5) * 0.12 * dpr,
        vy: ((Math.random() - 0.5) * 0.12 - 0.035) * dpr,
        alpha: Math.random() * 0.45 + 0.14,
        twinkleSpeed: Math.random() * 0.025 + 0.012,
        color: Math.random() > 0.35 ? '#ffd885' : '#f5be58',
        isStar: Math.random() > 0.55
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Warm ambient center glow
      const centerGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20 * dpr,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.5
      );
      centerGlow.addColorStop(0, 'rgba(85, 42, 18, 0.25)');
      centerGlow.addColorStop(0.5, 'rgba(28, 10, 14, 0.12)');
      centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // Render sparkles and corner dust
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.twinkleSpeed) * 0.012;
        const currentAlpha = Math.max(0.08, Math.min(0.9, p.alpha));

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#ffd270';
        ctx.shadowBlur = p.radius * 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.isStar && p.radius > 1.2 * dpr) {
          ctx.strokeStyle = `rgba(255, 240, 195, ${currentAlpha * 0.75})`;
          ctx.lineWidth = 0.5 * dpr;
          const len = p.radius * 2.8;
          ctx.beginPath();
          ctx.moveTo(p.x - len, p.y);
          ctx.lineTo(p.x + len, p.y);
          ctx.moveTo(p.x, p.y - len);
          ctx.lineTo(p.x, p.y + len);
          ctx.stroke();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 2. Deliberate cinematic timer. The longer pace lets the wordmark breathe
  // before the homepage is revealed.
  useEffect(() => {
    let disposed = false, finishing = false, frame, holdTimer, exitTimer;
    
    const start = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 300 : 5200;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    dialog.current?.focus({ preventScroll: true });

    const tick = (now) => {
      const elapsed = now - start;
      const sequence = Math.min(1, elapsed / duration);
      
      const ease = sequence < 0.5 
        ? 4 * sequence * sequence * sequence 
        : 1 - Math.pow(-2 * sequence + 2, 3) / 2;
      
      const value = Math.floor(ease * 100);
      setProgress(value);

      if (sequence >= 1 && !finishing) {
        finishing = true;
        setProgress(100);
        holdTimer = setTimeout(() => {
          if (disposed) return;
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          onReveal?.(true);
          setLeaving(true);
          exitTimer = setTimeout(() => onComplete(false), reduced ? 0 : 1000);
        }, reduced ? 0 : 550);
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, onReveal]);

  return (
    <div
      ref={dialog}
      tabIndex={-1}
      className={`palace-entrance ${leaving ? 'is-leaving' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'calc(env(safe-area-inset-top, 0px) + 24px) 5vw calc(env(safe-area-inset-bottom, 0px) + 28px)',
        backgroundColor: '#050203',
        color: '#f0e7d5',
        opacity: leaving ? 0 : 1,
        transform: leaving ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: leaving ? 'none' : 'auto',
        overflow: 'hidden'
      }}
      role="status"
      aria-label={bn ? 'খেলাৎ ভবন লোড হচ্ছে' : 'Loading Khelat Bhawan'}
    >
      {/* Background Canvas: Golden Sparkles & Balanced Corner Dust */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top Header Labels */}
      <header className="relative z-10 flex justify-between gap-3 uppercase text-[10px] sm:text-[11px] font-sans tracking-[0.16em] sm:tracking-[0.2em] text-[#e2d3b7] animate-fade-in opacity-90">
        <span>{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</span>
        <span>{bn ? 'কলকাতা · স্থাপিত ১৮৪৫' : 'Kolkata · Est. 1845'}</span>
      </header>

      {/* Central composition: a quiet wordmark that opens gradually as the palace loads. */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-4 sm:py-6 max-w-4xl mx-auto w-full px-2">
        <div className="loader-crest" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <p className="loader-kicker text-[9px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.34em] text-[#dbc59d] mt-4 mb-4 sm:mb-6 font-sans">
          {bn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি' : 'Pathuria Ghata Ghosh Bari'}
        </p>

        <h1 className={`loader-wordmark ${bn ? 'loader-wordmark--bn' : ''} select-none font-serif font-light text-[clamp(46px,8vw,112px)] whitespace-nowrap`}>
          <span className="loader-wordmark__line">{bn ? 'খেলাৎ' : 'Khelat'}</span>
          <span className="loader-wordmark__line">{bn ? 'ভবন' : 'Bhawan'}</span>
        </h1>

        <span className="loader-caption-emerge font-serif italic text-xs sm:text-base text-[#ccbaa1] mt-5 sm:mt-8 px-4">
          {bn ? 'এক জীবন্ত ঐতিহ্য ও সাবেকি উত্তরাধিকার' : 'A living legacy of Bengal since 1845'}
        </span>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <footer
        className="relative z-10 w-full max-w-[760px] mx-auto px-2"
        style={{ marginBottom: 'clamp(34px, 6vh, 84px)' }}
      >
        <div className="w-full">
          <div className="flex items-end justify-between mb-2 sm:mb-3 text-xs tracking-[0.2em] font-sans uppercase">
            <span className="text-[9.5px] sm:text-[10.5px] font-medium text-[#c6b69a]">
              {bn ? 'প্রাসাদে প্রবেশাধিকার' : 'ENTERING THE PALACE'}
            </span>
            <output aria-hidden="true" className="font-serif text-xl sm:text-3xl text-[#ecd69e] tabular-nums">
              {String(progress).padStart(2, '0')}
              <small className="text-xs text-[#d8ae62] ml-1 font-sans font-normal">%</small>
            </output>
          </div>
          
          {/* Custom Glowing Gold Hairline Progress Bar */}
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#b78c43] via-[#ecd69e] to-[#ffffff] rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-amber-200 rounded-full blur-[3px] opacity-90" />
            </div>
          </div>
        </div>
      </footer>

      {/* Wordmark spacing starts close and expands throughout the loading sequence. */}
      <style>{`
        @keyframes loaderWordmarkReveal {
          0% {
            opacity: 0;
            filter: blur(7px);
            letter-spacing: 0.005em;
            transform: translateY(7px) scale(0.985);
          }
          14% {
            opacity: 1;
            filter: blur(0px);
            letter-spacing: 0.012em;
            transform: translateY(0) scale(1);
          }
          100% {
            letter-spacing: 0.20em;
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0) scale(1);
            text-shadow: 0 0 28px rgba(226, 188, 116, 0.22);
          }
        }

        @keyframes loaderGoldPass {
          0% {
            background-position: 130% 50%;
          }
          100% {
            background-position: -30% 50%;
          }
        }

        @keyframes loaderSupportingText {
          0%, 18% {
            opacity: 0;
            transform: translateY(7px);
          }
          48%, 100% {
            opacity: 0.88;
            transform: translateY(0);
          }
        }

        @keyframes loaderCrestReveal {
          0%, 8% {
            opacity: 0;
            transform: scaleX(0.2);
          }
          38%, 100% {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .loader-wordmark {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.02em;
          line-height: 0.82;
          max-width: 100%;
          color: #ead19a;
          background: linear-gradient(100deg, #b98639 0%, #f7dfaa 32%, #fff8e7 50%, #e5bd71 68%, #a46f29 100%);
          background-size: 260% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation:
            loaderWordmarkReveal 5.2s cubic-bezier(0.24, 0.66, 0.25, 1) forwards,
            loaderGoldPass 5.2s cubic-bezier(0.37, 0, 0.2, 1) forwards;
          will-change: letter-spacing, transform, opacity;
        }

        .loader-wordmark__line {
          display: block;
          padding-left: 0.2em;
        }

        .loader-kicker,
        .loader-caption-emerge {
          animation: loaderSupportingText 5.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .loader-crest {
          width: min(210px, 48vw);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 13px;
          transform-origin: center;
          animation: loaderCrestReveal 5.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .loader-crest span {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(216, 174, 98, 0.72));
        }

        .loader-crest span:last-child {
          transform: rotate(180deg);
        }

        .loader-crest i {
          width: 6px;
          height: 6px;
          border: 1px solid rgba(238, 205, 139, 0.9);
          transform: rotate(45deg);
          box-shadow: 0 0 16px rgba(216, 174, 98, 0.45);
        }

        @media (max-width: 640px) {
          @keyframes loaderWordmarkReveal {
            0% {
              opacity: 0;
              filter: blur(6px);
              letter-spacing: 0;
              transform: translateY(6px) scale(0.985);
            }
            14% {
              opacity: 1;
              filter: blur(0);
              letter-spacing: 0.006em;
              transform: translateY(0) scale(1);
            }
            100% {
              opacity: 1;
              filter: blur(0);
              letter-spacing: 0.075em;
              transform: translateY(0) scale(1);
              text-shadow: 0 0 22px rgba(226, 188, 116, 0.2);
            }
          }

          .loader-wordmark {
            font-size: clamp(42px, 13.5vw, 58px);
            line-height: 0.84;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-wordmark,
          .loader-kicker,
          .loader-caption-emerge,
          .loader-crest {
            animation-duration: 0.25s;
          }
        }
      `}</style>
    </div>
  );
}
