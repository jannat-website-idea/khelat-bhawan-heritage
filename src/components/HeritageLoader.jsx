import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '../utils/assetHelper';

export default function HeritageLoader({ onComplete, onReveal, lang }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [entered, setEntered] = useState(false);
  const canvasRef = useRef(null);
  const dialog = useRef(null);
  const bn = lang === 'bn';

  // 1. Rich Golden Glitter Canvas (130+ sparkles, embers, starbursts)
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

    const particleCount = 130;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.4 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.15,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.035 + 0.015,
      color: Math.random() > 0.4 ? '#ffdf88' : Math.random() > 0.2 ? '#e6ab47' : '#ffffff',
      isStar: Math.random() > 0.5,
      sparkleAngle: Math.random() * Math.PI
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Top overhead golden light cone (god rays / ambient spotlight)
      const topBeam = ctx.createRadialGradient(
        width / 2, 0, 10,
        width / 2, height * 0.45, Math.max(width, height) * 0.6
      );
      topBeam.addColorStop(0, 'rgba(216, 174, 98, 0.35)');
      topBeam.addColorStop(0.35, 'rgba(120, 60, 20, 0.18)');
      topBeam.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topBeam;
      ctx.fillRect(0, 0, width, height);

      // Bottom warm reflective floor glow
      const floorGlow = ctx.createLinearGradient(0, height * 0.65, 0, height);
      floorGlow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      floorGlow.addColorStop(1, 'rgba(180, 120, 45, 0.22)');
      ctx.fillStyle = floorGlow;
      ctx.fillRect(0, height * 0.65, width, height * 0.35);

      // Render all glitter particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.twinkleSpeed) * 0.02;
        const currentAlpha = Math.max(0.1, Math.min(0.95, p.alpha));

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#ffe082';
        ctx.shadowBlur = p.radius * 7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Cross starbursts for larger glitter particles
        if (p.isStar && p.radius > 1.2) {
          ctx.strokeStyle = `rgba(255, 245, 200, ${currentAlpha * 0.9})`;
          ctx.lineWidth = 0.6;
          const starLen = p.radius * 3;
          ctx.beginPath();
          ctx.moveTo(p.x - starLen, p.y);
          ctx.lineTo(p.x + starLen, p.y);
          ctx.moveTo(p.x, p.y - starLen);
          ctx.lineTo(p.x, p.y + starLen);
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

  // 2. Cinematic Loading Timer (~3.8 seconds)
  useEffect(() => {
    let disposed = false, finishing = false, frame, holdTimer, exitTimer;
    
    const enterTimer = setTimeout(() => setEntered(true), 60);
    const start = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 300 : 3800;
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
        }, reduced ? 0 : 350);
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

  const norm = Number.isFinite(progress) ? progress / 100 : 0;
  
  // Animation Progression:
  // 1. Initial fade-in at natural spacing (norm 0 -> 0.15)
  // 2. In the middle (norm 0.2 -> 0.85): Smoothly expands outward to majestic gaps between each letter (like reference image: K h e l a t  B h a w a n)
  // 3. Smooth letter-spacing expansion curve:
  const expansionProgress = Math.min(1, Math.max(0, (norm - 0.12) / 0.65));
  // Smooth cubic ease for spacing expansion
  const expansionEase = expansionProgress < 0.5
    ? 2 * expansionProgress * expansionProgress
    : 1 - Math.pow(-2 * expansionProgress + 2, 2) / 2;

  // Spacing for "Khelat": starts at 0.05em -> expands to 0.32em (wide gap matching reference image)
  const khelatSpacing = `${0.05 + expansionEase * 0.28}em`;
  // Spacing for "Bhawan": starts at 0.04em -> expands to 0.22em
  const bhawanSpacing = `${0.04 + expansionEase * 0.20}em`;

  const titleOpacity = Math.min(1, norm * 2.2);
  const titleGlow = Math.min(55, 18 + norm * 35);
  const textScale = 0.96 + norm * 0.04;

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
        padding: '36px 6vw 7vh',
        backgroundColor: '#040202',
        color: '#f0e7d5',
        opacity: leaving ? 0 : entered ? 1 : 0,
        transform: leaving ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1), transform 0.95s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: leaving ? 'none' : 'auto',
        overflow: 'hidden'
      }}
      role="status"
      aria-label={bn ? 'খেলাৎ ভবন লোড হচ্ছে' : 'Loading Khelat Bhawan'}
    >
      {/* Background Architectural Columns Silhouette */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20 filter contrast-125 brightness-75"
        style={{
          backgroundImage: `url(${getAssetUrl('/images/SDP_0291.jpg')})`,
          mixBlendMode: 'luminosity'
        }}
      />

      {/* Background Canvas: Golden Sparkles & Floating Glitter */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Top Header Labels (Matching reference image: KHELAT BHAWAN | KOLKATA · EST. 1845) */}
      <header 
        className="relative z-20 flex justify-between gap-6 uppercase text-xs font-sans tracking-[0.25em] text-[#d8ae62]"
        style={{ 
          opacity: Math.min(1, norm * 2),
          transition: 'opacity 0.5s ease-out'
        }}
      >
        <span className="font-medium drop-shadow">{bn ? 'খেলাৎ ভবন' : 'KHELAT BHAWAN'}</span>
        <span className="font-medium drop-shadow">{bn ? 'কলকাতা · স্থাপিত ১৮৪৫' : 'KOLKATA · EST. 1845'}</span>
      </header>

      {/* Central Composition with Stacked Typography & Gap-Expansion Animation */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto py-6 max-w-5xl mx-auto">
        {/* Line 1: Khelat (Serif, starts normal and expands with gap between each letter) */}
        <div
          className="font-serif text-[clamp(60px,10vw,140px)] font-light leading-[1.0] select-none text-[#ffeed1] tracking-wide"
          style={{
            letterSpacing: khelatSpacing,
            opacity: titleOpacity,
            transform: `scale(${textScale})`,
            textShadow: `0 0 ${titleGlow}px rgba(230, 185, 110, ${0.4 + norm * 0.45})`,
            transition: 'letter-spacing 0.1s ease-out, transform 0.1s ease-out'
          }}
        >
          {bn ? 'খেলাৎ' : 'Khelat'}
        </div>

        {/* Line 2: Bhawan (Italic Luxury Script, starts normal and expands with gaps) */}
        <div
          className="font-serif italic text-[clamp(65px,11vw,150px)] font-normal leading-[0.95] select-none text-[#ecd497] mt-1 sm:mt-2"
          style={{
            letterSpacing: bhawanSpacing,
            opacity: titleOpacity,
            transform: `scale(${textScale})`,
            textShadow: `0 0 ${titleGlow}px rgba(216, 174, 98, ${0.4 + norm * 0.45})`,
            transition: 'letter-spacing 0.1s ease-out, transform 0.1s ease-out'
          }}
        >
          {bn ? 'ভবন' : 'Bhawan'}
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage (Exact match to reference image) */}
      <footer className="relative z-20 w-full max-w-[840px] mx-auto">
        <div className="w-full">
          <div className="flex items-end justify-between mb-3 text-xs tracking-[0.25em] font-sans uppercase">
            <span className="text-[11px] font-medium text-[#d8ae62]/90 drop-shadow">
              {bn ? 'প্রাসাদে প্রবেশাধিকার' : 'ENTERING THE PALACE'}
            </span>
            <div className="font-serif text-2xl sm:text-3xl text-[#ffeec9] font-normal tabular-nums drop-shadow">
              <span>{progress}</span>
              <span className="text-xs text-[#d8ae62] ml-1 font-sans">%</span>
            </div>
          </div>
          
          {/* Glowing Gold Hairline Progress Bar with Traveling Spark */}
          <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden relative shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#b78c43] via-[#ffd68a] to-[#ffffff] rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-100 rounded-full blur-[3px] opacity-95 shadow-[0_0_10px_#ffd270]" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
