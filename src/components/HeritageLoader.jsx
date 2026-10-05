import React, { useEffect, useRef, useState } from 'react';

export default function HeritageLoader({ onComplete, onReveal, lang }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [entered, setEntered] = useState(false);
  const canvasRef = useRef(null);
  const dialog = useRef(null);
  const bn = lang === 'bn';

  // 1. Balanced Golden Glitter & Corner Ambient Dust Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 75 total particles: balanced across corners, edges, and central glow
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, (_, idx) => {
      // 45% center cluster, 55% distributed across corners and outer bounds
      const isCenter = idx < 34;
      const x = isCenter
        ? width / 2 + (Math.random() - 0.5) * (width * 0.55)
        : Math.random() * width;
      const y = isCenter
        ? height / 2 + (Math.random() - 0.5) * (height * 0.55)
        : Math.random() * height;

      return {
        x,
        y,
        radius: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22 - 0.08,
        alpha: Math.random() * 0.65 + 0.2,
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
        30,
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

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#ffd270';
        ctx.shadowBlur = p.radius * 5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Delicate 4-point cross glint on brightest stars
        if (p.isStar && p.radius > 1.3) {
          ctx.strokeStyle = `rgba(255, 240, 195, ${currentAlpha * 0.75})`;
          ctx.lineWidth = 0.5;
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

  // 2. Smooth Cinematic Timer (~3.5 seconds)
  useEffect(() => {
    let disposed = false, finishing = false, frame, holdTimer, exitTimer;
    
    const enterTimer = setTimeout(() => setEntered(true), 60);
    const start = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 300 : 3500;
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
          exitTimer = setTimeout(() => onComplete(false), reduced ? 0 : 800);
        }, reduced ? 0 : 300);
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      clearTimeout(enterTimer);
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
      className={`palace-entrance ${entered ? 'is-entered' : ''} ${leaving ? 'is-leaving' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 5vw 6vh',
        backgroundColor: '#050203',
        color: '#f0e7d5',
        opacity: leaving ? 0 : entered ? 1 : 0,
        transform: leaving ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
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
      <header className="relative z-10 flex justify-between gap-6 uppercase text-[11px] font-sans tracking-[0.2em] text-[#e2d3b7] animate-fade-in opacity-90">
        <span>{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</span>
        <span>{bn ? 'কলকাতা · স্থাপিত ১৮৪৫' : 'Kolkata · Est. 1845'}</span>
      </header>

      {/* Central Composition with Silky Smooth Continuous Letter Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-6 max-w-4xl mx-auto">
        {/* Top Label: Pathuria Ghata Ghosh Bari */}
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#dbc59d] mb-4 font-sans animate-fade-in opacity-85">
          {bn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি' : 'Pathuria Ghata Ghosh Bari'}
        </p>
        
        {/* Stacked Luxury Title with Smooth Fluid Letter Expansion & Liquid Gold Shimmer */}
        <div className="flex flex-col items-center justify-center select-none py-2">
          {/* Line 1: Khelat */}
          <span className="loader-title-khelat font-serif font-light text-[clamp(54px,8.5vw,115px)] leading-[1.0]">
            {bn ? 'খেলাৎ' : 'Khelat'}
          </span>

          {/* Line 2: Bhawan */}
          <span className="loader-title-bhawan font-serif italic font-normal text-[clamp(58px,9.5vw,125px)] leading-[0.95] mt-1 sm:mt-2">
            {bn ? 'ভবন' : 'Bhawan'}
          </span>
        </div>

        {/* Bottom Caption: A living legacy of Bengal since 1845 */}
        <span className="loader-caption-emerge font-serif italic text-sm sm:text-base text-[#ccbaa1] mt-6">
          {bn ? 'এক জীবন্ত ঐতিহ্য ও সাবেকি উত্তরাধিকার' : 'A living legacy of Bengal since 1845'}
        </span>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <footer className="relative z-10 w-full max-w-[760px] mx-auto">
        <div className="w-full">
          <div className="flex items-end justify-between mb-3 text-xs tracking-[0.22em] font-sans uppercase">
            <span className="text-[10.5px] font-medium text-[#c6b69a]">
              {bn ? 'প্রাসাদে প্রবেশাধিকার' : 'ENTERING THE PALACE'}
            </span>
            <output aria-hidden="true" className="font-serif text-2xl sm:text-3xl text-[#ecd69e] tabular-nums">
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

      {/* Embedded High-Performance Fluid CSS Animation Styles */}
      <style>{`
        @keyframes loaderKhelatFlow {
          0% {
            opacity: 0;
            filter: blur(8px);
            letter-spacing: 0.03em;
            transform: scale(0.96) translateY(6px);
          }
          20% {
            opacity: 1;
            filter: blur(0px);
            letter-spacing: 0.04em;
            transform: scale(0.98) translateY(0);
          }
          65% {
            letter-spacing: 0.22em;
            transform: scale(1.01);
            text-shadow: 0 0 35px rgba(230, 185, 110, 0.6), 0 0 60px rgba(216, 174, 98, 0.3);
          }
          100% {
            letter-spacing: 0.18em;
            transform: scale(1);
            opacity: 1;
            filter: blur(0px);
            text-shadow: 0 0 40px rgba(230, 185, 110, 0.5);
          }
        }

        @keyframes loaderBhawanFlow {
          0% {
            opacity: 0;
            filter: blur(8px);
            letter-spacing: 0.02em;
            transform: scale(0.96) translateY(8px);
          }
          25% {
            opacity: 1;
            filter: blur(0px);
            letter-spacing: 0.03em;
            transform: scale(0.98) translateY(0);
          }
          68% {
            letter-spacing: 0.16em;
            transform: scale(1.01);
            text-shadow: 0 0 35px rgba(216, 174, 98, 0.6), 0 0 60px rgba(184, 134, 40, 0.3);
          }
          100% {
            letter-spacing: 0.13em;
            transform: scale(1);
            opacity: 1;
            filter: blur(0px);
            text-shadow: 0 0 40px rgba(216, 174, 98, 0.5);
          }
        }

        @keyframes loaderCaptionFlow {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          35% {
            opacity: 0;
            transform: translateY(8px);
          }
          60% {
            opacity: 0.85;
            transform: translateY(0);
          }
          100% {
            opacity: 0.95;
            transform: translateY(0);
          }
        }

        .loader-title-khelat {
          display: block;
          background: linear-gradient(115deg, #fff2d4 0%, #ffd88a 35%, #ffffff 50%, #ffd88a 65%, #d8ae62 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: loaderKhelatFlow 3.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: letter-spacing, transform, opacity;
        }

        .loader-title-bhawan {
          display: block;
          background: linear-gradient(115deg, #ffeec7 0%, #e2c996 40%, #ffffff 55%, #e2c996 70%, #ba8a38 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: loaderBhawanFlow 3.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: letter-spacing, transform, opacity;
        }

        .loader-caption-emerge {
          display: block;
          animation: loaderCaptionFlow 3.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
}
