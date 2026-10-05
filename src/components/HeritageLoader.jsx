import React, { useEffect, useRef, useState } from 'react';

export default function HeritageLoader({ onComplete, onReveal, lang }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [entered, setEntered] = useState(false);
  const canvasRef = useRef(null);
  const dialog = useRef(null);
  const bn = lang === 'bn';

  // 1. Particle Canvas System (Reference image: Golden Sparkles & Floating Bokeh Embers)
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

    const particleCount = 60;
    const particles = Array.from({ length: particleCount }, () => ({
      x: width / 2 + (Math.random() - 0.5) * (width * 0.75),
      y: height / 2 + (Math.random() - 0.5) * (height * 0.65),
      radius: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.12,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.015,
      color: Math.random() > 0.35 ? '#fcdb8a' : '#e6ab47',
      isStar: Math.random() > 0.65
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle center ambient glow
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.45
      );
      grad.addColorStop(0, 'rgba(75, 38, 18, 0.25)');
      grad.addColorStop(0.5, 'rgba(25, 9, 14, 0.15)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.twinkleSpeed) * 0.015;
        const currentAlpha = Math.max(0.1, Math.min(0.95, p.alpha));

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#ffd270';
        ctx.shadowBlur = p.radius * 6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.isStar && p.radius > 1.4) {
          ctx.strokeStyle = `rgba(255, 235, 175, ${currentAlpha * 0.8})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.radius * 2.5, p.y);
          ctx.lineTo(p.x + p.radius * 2.5, p.y);
          ctx.moveTo(p.x, p.y - p.radius * 2.5);
          ctx.lineTo(p.x, p.y + p.radius * 2.5);
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

  // 2. Cinematic Loading Timer (~2.2 seconds for smooth letter convergence)
  useEffect(() => {
    let disposed = false, finishing = false, frame, holdTimer, exitTimer;
    
    const enterTimer = setTimeout(() => setEntered(true), 60);
    const start = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 300 : 2200;
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
          exitTimer = setTimeout(() => onComplete(false), reduced ? 0 : 700);
        }, reduced ? 0 : 150);
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

  const normalizedProgress = Number.isFinite(progress) ? progress / 100 : 0;
  
  // Letter Convergence Calculations:
  // Starts wide apart (0.35em) -> smoothly converges together (0.015em)
  const titleTracking = `${0.35 - normalizedProgress * 0.335}em`;
  const titleOpacity = Math.min(1, Math.pow(normalizedProgress, 0.8) * 1.25);
  const titleBlur = Math.max(0, (1 - normalizedProgress) * 8);
  const titleScale = 0.94 + normalizedProgress * 0.06;

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
        padding: '28px 4vw 5vh',
        backgroundColor: '#060303',
        color: '#f0e7d5',
        opacity: leaving ? 0 : entered ? 1 : 0,
        transform: leaving ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: leaving ? 'none' : 'auto',
        overflow: 'hidden'
      }}
      role="status"
      aria-label={bn ? 'খেলাৎ ভবন লোড হচ্ছে' : 'Loading Khelat Bhawan'}
    >
      {/* Background Canvas: Golden Sparkles & Embers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top Header Labels (Original exact text) */}
      <header 
        className="relative z-10 flex justify-between gap-6 uppercase text-[11px] font-sans tracking-[0.2em] text-[#e2d3b7]"
        style={{ opacity: Math.min(1, normalizedProgress * 1.6) }}
      >
        <span>{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</span>
        <span>{bn ? 'কলকাতা · স্থাপিত ১৮৪৫' : 'Kolkata · Est. 1845'}</span>
      </header>

      {/* Central Composition with Original Exact Text + Smooth Letter Convergence */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-8">
        <p 
          className="text-[11px] uppercase tracking-[0.3em] text-[#dbc59d] mb-6 font-sans"
          style={{
            opacity: Math.min(1, Math.pow(normalizedProgress, 1.2)),
            transition: 'opacity 0.3s ease-out'
          }}
        >
          {bn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি' : 'Pathuria Ghata Ghosh Bari'}
        </p>
        
        {/* Title Emergence with Letter Convergence */}
        <h2
          className="font-serif text-[clamp(56px,8vw,120px)] leading-[0.95] select-none"
          style={{
            letterSpacing: titleTracking,
            opacity: titleOpacity,
            filter: `blur(${titleBlur}px)`,
            transform: `scale(${titleScale})`,
            color: '#f0e7d5',
            textShadow: '0 0 40px rgba(216, 174, 98, 0.45)',
            transition: 'letter-spacing 0.12s ease-out, filter 0.12s ease-out, transform 0.12s ease-out'
          }}
        >
          {bn ? (
            <>খেলাৎ <em className="italic text-[#e2c996] font-normal">ভবন</em></>
          ) : (
            <>Khelat <em className="italic text-[#e2c996] font-normal">Bhawan</em></>
          )}
        </h2>

        <span 
          className="font-serif italic text-base sm:text-[18px] text-[#ccbaa1] mt-8"
          style={{
            opacity: Math.min(1, Math.max(0, (normalizedProgress - 0.25) * 1.4)),
            transition: 'opacity 0.3s ease-out'
          }}
        >
          {bn ? 'এক জীবন্ত ঐতিহ্য ও সাবেকি উত্তরাধিকার' : 'A living legacy of Bengal since 1845'}
        </span>
      </div>

      {/* Bottom Progress Bar & Counter (Original exact layout) */}
      <footer className="relative z-10 w-full max-w-[760px] mx-auto">
        <div className="w-full">
          <div className="flex items-end justify-between mb-4">
            <span className="text-[10.5px] uppercase tracking-[0.22em] font-sans font-medium text-[#c6b69a]">
              {bn ? 'প্রাসাদে প্রবেশাধিকার' : 'ENTERING THE PALACE'}
            </span>
            <output aria-hidden="true" className="font-serif text-3xl sm:text-4xl text-[#ecd69e] tabular-nums">
              {String(progress).padStart(2, '0')}
              <small className="text-xs text-[#d8ae62] ml-1 font-sans font-normal">%</small>
            </output>
          </div>
          
          {/* Custom Glowing Gold Hairline Progress Bar */}
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#b78c43] via-[#ecd69e] to-[#ffffff] rounded-full transition-all duration-75 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-200 rounded-full blur-[3px] opacity-90" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
