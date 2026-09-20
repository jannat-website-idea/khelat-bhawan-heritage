import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/assetHelper';
import { familyTreeData } from '../data/familyTreeData';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight, 
  Shield, 
  Award,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function HeritageFamilyTree({ lang = 'en', setActiveTab, onOpenLightbox }) {
  const isBn = lang === 'bn';
  const [selectedGenIndex, setSelectedGenIndex] = useState(null);
  const [hoveredGen, setHoveredGen] = useState(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedGenIndex(null);
      if (selectedGenIndex !== null) {
        if (e.key === 'ArrowLeft' && selectedGenIndex > 0) {
          setSelectedGenIndex(selectedGenIndex - 1);
        } else if (e.key === 'ArrowRight' && selectedGenIndex < familyTreeData.length - 1) {
          setSelectedGenIndex(selectedGenIndex + 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGenIndex]);

  const selectedGen = selectedGenIndex !== null ? familyTreeData[selectedGenIndex] : null;

  // Node position map for desktop 2D Tree (percentages)
  const nodePositions = [
    { gen: 1, top: '10%', left: '50%', transform: 'translate(-50%, 0)' }, // Apex
    { gen: 2, top: '29%', left: '26%', transform: 'translate(-50%, 0)' }, // Tier 1 Left
    { gen: 3, top: '29%', left: '74%', transform: 'translate(-50%, 0)' }, // Tier 1 Right
    { gen: 4, top: '51%', left: '30%', transform: 'translate(-50%, 0)' }, // Tier 2 Left
    { gen: 5, top: '51%', left: '70%', transform: 'translate(-50%, 0)' }, // Tier 2 Right
    { gen: 6, top: '72%', left: '24%', transform: 'translate(-50%, 0)' }, // Tier 3 Left
    { gen: 7, top: '72%', left: '76%', transform: 'translate(-50%, 0)' }  // Tier 3 Right
  ];

  return (
    <section 
      className="heritage-tree-wrapper relative my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 animate-in fade-in duration-500"
      aria-label={isBn ? 'খেলাৎ ভবন পারিবারিক বংশলতিকা' : 'Khelat Bhawan Family Tree'}
    >
      {/* Background Architectural Watermark & Botanical Vignette */}
      <div className="heritage-tree-canvas-bg" aria-hidden="true">
        <div className="heritage-tree-palace-watermark" />
        <div className="heritage-tree-botanical-corner heritage-tree-botanical-corner--tl" />
        <div className="heritage-tree-botanical-corner heritage-tree-botanical-corner--tr" />
        <div className="heritage-tree-botanical-corner heritage-tree-botanical-corner--bl" />
        <div className="heritage-tree-botanical-corner heritage-tree-botanical-corner--br" />
      </div>

      {/* =========================================================================
          HERITAGE TREE HEADER (Strictly matching reference layout)
         ========================================================================= */}
      <header className="heritage-tree-header relative text-center pt-8 sm:pt-12 pb-6 sm:pb-8">
        {/* Top bar row: Left Brand, Center Space, Right Triple Badge */}
        <div className="flex items-center justify-between px-2 sm:px-6 mb-4 text-[10px] sm:text-xs tracking-[0.22em] uppercase font-sans text-muted-foreground/80">
          <div className="text-left">
            <span className="font-serif font-bold text-foreground tracking-[0.25em] block text-xs sm:text-sm">KHELAT BHAWAN</span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-primary/70">PATHURIA GHATA • EST. 1845</span>
          </div>
          <div className="text-right hidden sm:block">
            <span className="tracking-[0.28em] font-serif font-semibold text-primary/80">
              {isBn ? 'অতীত • বর্তমান • ভবিষ্যৎ' : 'PAST. PRESENT. FUTURE.'}
            </span>
          </div>
        </div>

        {/* Main Title Group */}
        <div className="max-w-3xl mx-auto space-y-2">
          <span className="heritage-tree-eyebrow">
            {isBn ? 'খেলাৎ ভবন বংশধারা' : 'THE KHELAT BHAWAN LINEAGE'}
          </span>
          <h2 className="heritage-tree-main-title">
            {isBn ? 'সাত প্রজন্মের অবিচ্ছিন্ন অভিভাবকত্ব' : 'Seven Generations of Unbroken Custodianship'}
          </h2>
          
          {/* Ornate Gold Filigree Divider */}
          <div className="heritage-tree-filigree" aria-hidden="true">
            <span className="heritage-tree-filigree-line" />
            <span className="heritage-tree-filigree-gem">✦</span>
            <span className="heritage-tree-filigree-line" />
          </div>

          <p className="heritage-tree-subtitle">
            {isBn 
              ? '১৮৪৫ সাল থেকে ঐতিহ্য, শিল্প, সংস্কৃতি ও মানবতার সেবায় নিবেদিত এক অমর পারিবারিক উত্তরাধিকার।'
              : 'A family devoted to heritage, art, culture and community since 1845.'}
          </p>
        </div>

        {/* Floating Side Quotes (Flanking upper branches on Desktop) */}
        <aside className="heritage-tree-quote heritage-tree-quote--left hidden xl:block" aria-hidden="true">
          <p className="heritage-tree-quote-text">
            {isBn ? '“ঐতিহ্যে নিহিত শিকড়, আগামীর জন্য শাখা-প্রশাখা।”' : '“Roots in heritage, branches for tomorrow.”'}
          </p>
          <span className="heritage-tree-quote-rule" />
        </aside>

        <aside className="heritage-tree-quote heritage-tree-quote--right hidden xl:block" aria-hidden="true">
          <p className="heritage-tree-quote-text">
            {isBn ? '“ভবিষ্যৎ প্রজন্মের জন্য এক জীবন্ত উত্তরসূরি ধারা।”' : '“A living legacy for generations to come.”'}
          </p>
          <span className="heritage-tree-quote-rule" />
        </aside>
      </header>

      {/* =========================================================================
          DESKTOP ILLUSTRATED BOTANICAL FAMILY TREE (Screen >= 1024px)
         ========================================================================= */}
      <div className="hidden lg:block relative w-full heritage-tree-stage">
        {/* The Botanical Tree Vector Graphics (ViewBox 0 0 1000 1380) */}
        <svg 
          viewBox="0 0 1000 1380" 
          className="heritage-tree-svg w-full h-auto select-none pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            {/* Rich Organic Bark Gradients */}
            <linearGradient id="barkGradMain" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2c1611" />
              <stop offset="35%" stopColor="#4a2c20" />
              <stop offset="65%" stopColor="#6e4632" />
              <stop offset="100%" stopColor="#2c1611" />
            </linearGradient>

            <linearGradient id="barkGradBranch" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6e4632" />
              <stop offset="50%" stopColor="#4a2c20" />
              <stop offset="100%" stopColor="#2c1611" />
            </linearGradient>

            <linearGradient id="goldFiligreeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8c6426" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#966e2c" />
            </linearGradient>

            <linearGradient id="leafGradSepia" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9e8557" />
              <stop offset="50%" stopColor="#7a623c" />
              <stop offset="100%" stopColor="#4d3b22" />
            </linearGradient>

            <linearGradient id="leafGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c5a059" />
              <stop offset="50%" stopColor="#9c7b39" />
              <stop offset="100%" stopColor="#695123" />
            </linearGradient>

            {/* Filter for subtle antique tree glow & shadow */}
            <filter id="treeDropShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#321b17" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* ================= BACKGROUND ROOTS & GROUND EMBELLISHMENTS ================= */}
          <g className="tree-roots" filter="url(#treeDropShadow)">
            {/* Deep Root Strands spreading outward */}
            <path d="M 500 1200 C 470 1250, 380 1290, 240 1330 C 290 1320, 360 1285, 460 1235 Z" fill="url(#barkGradMain)" opacity="0.9" />
            <path d="M 500 1200 C 530 1250, 620 1290, 760 1330 C 710 1320, 640 1285, 540 1235 Z" fill="url(#barkGradMain)" opacity="0.9" />
            <path d="M 480 1210 C 430 1270, 320 1320, 180 1345 C 230 1330, 320 1290, 440 1240 Z" fill="url(#barkGradMain)" opacity="0.75" />
            <path d="M 520 1210 C 570 1270, 680 1320, 820 1345 C 770 1330, 680 1290, 560 1240 Z" fill="url(#barkGradMain)" opacity="0.75" />
            <path d="M 490 1220 C 460 1280, 400 1340, 330 1365 C 370 1340, 430 1290, 470 1240 Z" fill="url(#barkGradMain)" opacity="0.8" />
            <path d="M 510 1220 C 540 1280, 600 1340, 670 1365 C 630 1340, 570 1290, 530 1240 Z" fill="url(#barkGradMain)" opacity="0.8" />
          </g>

          {/* ================= MAIN CENTRAL TRUNK ================= */}
          <g className="tree-trunk" filter="url(#treeDropShadow)">
            {/* Trunk flare base to apex */}
            <path 
              d="M 450 1210 
                 C 460 1120, 455 1020, 465 920 
                 C 455 820, 465 720, 470 600 
                 C 475 490, 480 390, 490 280 
                 L 510 280 
                 C 520 390, 525 490, 530 600 
                 C 535 720, 545 820, 535 920 
                 C 545 1020, 540 1120, 550 1210 
                 Z" 
              fill="url(#barkGradMain)" 
            />
            {/* Bark contour ridges for authentic hand-drawn wood engraving texture */}
            <path d="M 485 1200 C 480 1080, 488 950, 482 820 C 486 710, 488 560, 496 380" stroke="#1d0f0c" strokeWidth="2.5" fill="none" opacity="0.45" />
            <path d="M 515 1200 C 520 1080, 512 950, 518 820 C 514 710, 512 560, 504 380" stroke="#1d0f0c" strokeWidth="2.5" fill="none" opacity="0.45" />
            <path d="M 500 1190 C 495 1040, 505 880, 498 700 C 502 540, 498 420, 500 290" stroke="#7a523a" strokeWidth="1.8" fill="none" opacity="0.5" />
          </g>

          {/* ================= LEVEL 3 BRANCHES (Gen 06 & Gen 07) ================= */}
          <g className="tree-branches-tier-3">
            {/* Branch to Gen 06 (Left) */}
            <path 
              d="M 465 970 
                 C 420 980, 360 990, 260 1020 
                 C 340 1000, 410 995, 465 1015 Z" 
              fill="url(#barkGradBranch)" 
            />
            <path d="M 465 980 C 390 990, 330 1000, 260 1025" stroke="#1d0f0c" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M 280 1015 C 240 1010, 210 1030, 180 1045 C 210 1035, 240 1025, 275 1025 Z" fill="url(#barkGradBranch)" opacity="0.75" />

            {/* Branch to Gen 07 (Right) */}
            <path 
              d="M 535 970 
                 C 580 980, 640 990, 740 1020 
                 C 660 1000, 590 995, 535 1015 Z" 
              fill="url(#barkGradBranch)" 
            />
            <path d="M 535 980 C 610 990, 670 1000, 740 1025" stroke="#1d0f0c" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M 720 1015 C 760 1010, 790 1030, 820 1045 C 790 1035, 760 1025, 725 1025 Z" fill="url(#barkGradBranch)" opacity="0.75" />
          </g>

          {/* ================= LEVEL 2 BRANCHES (Gen 04 & Gen 05) ================= */}
          <g className="tree-branches-tier-2">
            {/* Branch to Gen 04 (Left) */}
            <path 
              d="M 470 700 
                 C 420 705, 370 710, 310 725 
                 C 370 720, 420 725, 470 745 Z" 
              fill="url(#barkGradBranch)" 
            />
            <path d="M 470 710 C 410 712, 360 718, 315 730" stroke="#1d0f0c" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M 330 720 C 290 710, 250 725, 220 740 C 250 730, 290 722, 325 728 Z" fill="url(#barkGradBranch)" opacity="0.75" />

            {/* Branch to Gen 05 (Right) */}
            <path 
              d="M 530 700 
                 C 580 705, 630 710, 690 725 
                 C 630 720, 580 725, 530 745 Z" 
              fill="url(#barkGradBranch)" 
            />
            <path d="M 530 710 C 590 712, 640 718, 685 730" stroke="#1d0f0c" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M 670 720 C 710 710, 750 725, 780 740 C 750 730, 710 722, 675 728 Z" fill="url(#barkGradBranch)" opacity="0.75" />
          </g>

          {/* ================= LEVEL 1 BRANCHES (Gen 02 & Gen 03) ================= */}
          <g className="tree-branches-tier-1">
            {/* Branch to Gen 02 (Left) */}
            <path 
              d="M 480 430 
                 C 420 425, 340 425, 270 435 
                 C 340 440, 420 450, 480 470 Z" 
              fill="url(#barkGradBranch)" 
            />
            <path d="M 480 440 C 410 435, 335 435, 275 442" stroke="#1d0f0c" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M 280 430 C 230 415, 190 430, 150 445 C 190 435, 235 425, 275 438 Z" fill="url(#barkGradBranch)" opacity="0.75" />

            {/* Branch to Gen 03 (Right) */}
            <path 
              d="M 520 430 
                 C 580 425, 660 425, 730 435 
                 C 660 440, 580 450, 520 470 Z" 
              fill="url(#barkGradBranch)" 
            />
            <path d="M 520 440 C 590 435, 665 435, 725 442" stroke="#1d0f0c" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M 720 430 C 770 415, 810 430, 850 445 C 810 435, 765 425, 725 438 Z" fill="url(#barkGradBranch)" opacity="0.75" />
          </g>

          {/* ================= APEX CROWN FORK (Gen 01 - Babu Khelat Chandra Ghosh) ================= */}
          <g className="tree-branches-apex">
            <path 
              d="M 490 280 
                 C 460 250, 435 210, 460 160 
                 C 475 200, 490 230, 495 270 Z" 
              fill="url(#barkGradBranch)" 
            />
            <path 
              d="M 510 280 
                 C 540 250, 565 210, 540 160 
                 C 525 200, 510 230, 505 270 Z" 
              fill="url(#barkGradBranch)" 
            />
            {/* Top decorative cradle flourish holding Babu Khelat Ghosh */}
            <path d="M 440 180 C 470 230, 530 230, 560 180" stroke="#7a523a" strokeWidth="3" fill="none" opacity="0.6" />
          </g>

          {/* ================= BOTANICAL LEAF CLUSTERS & GOLD BLOSSOMS ================= */}
          <g className="tree-foliage" opacity="0.85">
            {/* Apex Foliage (Gen 1) */}
            <g transform="translate(500, 130)">
              <ellipse cx="-75" cy="-20" rx="14" ry="7" transform="rotate(-30, -75, -20)" fill="url(#leafGradGold)" />
              <ellipse cx="-90" cy="-35" rx="12" ry="6" transform="rotate(-45, -90, -35)" fill="url(#leafGradSepia)" />
              <ellipse cx="-60" cy="-45" rx="13" ry="6.5" transform="rotate(-15, -60, -45)" fill="url(#leafGradGold)" />
              <ellipse cx="75" cy="-20" rx="14" ry="7" transform="rotate(30, 75, -20)" fill="url(#leafGradGold)" />
              <ellipse cx="90" cy="-35" rx="12" ry="6" transform="rotate(45, 90, -35)" fill="url(#leafGradSepia)" />
              <ellipse cx="60" cy="-45" rx="13" ry="6.5" transform="rotate(15, 60, -45)" fill="url(#leafGradGold)" />
              {/* Crown top central spray */}
              <ellipse cx="0" cy="-65" rx="12" ry="6" transform="rotate(-90, 0, -65)" fill="url(#leafGradGold)" />
              <ellipse cx="-15" cy="-60" rx="10" ry="5" transform="rotate(-115, -15, -60)" fill="url(#leafGradSepia)" />
              <ellipse cx="15" cy="-60" rx="10" ry="5" transform="rotate(-65, 15, -60)" fill="url(#leafGradSepia)" />
            </g>

            {/* Gen 2 & 3 Foliage Sprays */}
            <g transform="translate(260, 420)">
              <ellipse cx="-80" cy="-10" rx="14" ry="7" transform="rotate(-40, -80, -10)" fill="url(#leafGradSepia)" />
              <ellipse cx="-95" cy="10" rx="13" ry="6" transform="rotate(-15, -95, 10)" fill="url(#leafGradGold)" />
              <ellipse cx="-70" cy="25" rx="12" ry="6" transform="rotate(20, -70, 25)" fill="url(#leafGradSepia)" />
              <ellipse cx="-55" cy="-25" rx="11" ry="5.5" transform="rotate(-55, -55, -25)" fill="url(#leafGradGold)" />
            </g>
            <g transform="translate(740, 420)">
              <ellipse cx="80" cy="-10" rx="14" ry="7" transform="rotate(40, 80, -10)" fill="url(#leafGradSepia)" />
              <ellipse cx="95" cy="10" rx="13" ry="6" transform="rotate(15, 95, 10)" fill="url(#leafGradGold)" />
              <ellipse cx="70" cy="25" rx="12" ry="6" transform="rotate(-20, 70, 25)" fill="url(#leafGradSepia)" />
              <ellipse cx="55" cy="-25" rx="11" ry="5.5" transform="rotate(55, 55, -25)" fill="url(#leafGradGold)" />
            </g>

            {/* Gen 4 & 5 Foliage Sprays */}
            <g transform="translate(300, 710)">
              <ellipse cx="-80" cy="-10" rx="14" ry="7" transform="rotate(-35, -80, -10)" fill="url(#leafGradGold)" />
              <ellipse cx="-90" cy="15" rx="12" ry="6" transform="rotate(10, -90, 15)" fill="url(#leafGradSepia)" />
              <ellipse cx="-65" cy="-25" rx="11" ry="5.5" transform="rotate(-60, -65, -25)" fill="url(#leafGradGold)" />
            </g>
            <g transform="translate(700, 710)">
              <ellipse cx="80" cy="-10" rx="14" ry="7" transform="rotate(35, 80, -10)" fill="url(#leafGradGold)" />
              <ellipse cx="90" cy="15" rx="12" ry="6" transform="rotate(-10, 90, 15)" fill="url(#leafGradSepia)" />
              <ellipse cx="65" cy="-25" rx="11" ry="5.5" transform="rotate(60, 65, -25)" fill="url(#leafGradGold)" />
            </g>

            {/* Gen 6 & 7 Foliage Sprays */}
            <g transform="translate(240, 1000)">
              <ellipse cx="-80" cy="-5" rx="14" ry="7" transform="rotate(-30, -80, -5)" fill="url(#leafGradSepia)" />
              <ellipse cx="-95" cy="20" rx="13" ry="6" transform="rotate(15, -95, 20)" fill="url(#leafGradGold)" />
              <ellipse cx="-60" cy="-20" rx="11" ry="5" transform="rotate(-50, -60, -20)" fill="url(#leafGradGold)" />
            </g>
            <g transform="translate(760, 1000)">
              <ellipse cx="80" cy="-5" rx="14" ry="7" transform="rotate(30, 80, -5)" fill="url(#leafGradSepia)" />
              <ellipse cx="95" cy="20" rx="13" ry="6" transform="rotate(-15, 95, 20)" fill="url(#leafGradGold)" />
              <ellipse cx="60" cy="-20" rx="11" ry="5" transform="rotate(50, 60, -20)" fill="url(#leafGradGold)" />
            </g>

            {/* Ground Botanical Flora around Roots */}
            <g transform="translate(500, 1260)">
              <ellipse cx="-200" cy="30" rx="18" ry="8" transform="rotate(-10, -200, 30)" fill="url(#leafGradSepia)" />
              <ellipse cx="-170" cy="45" rx="16" ry="7" transform="rotate(20, -170, 45)" fill="url(#leafGradGold)" />
              <ellipse cx="-230" cy="50" rx="14" ry="6" transform="rotate(-25, -230, 50)" fill="url(#leafGradSepia)" />
              <ellipse cx="200" cy="30" rx="18" ry="8" transform="rotate(10, 200, 30)" fill="url(#leafGradSepia)" />
              <ellipse cx="170" cy="45" rx="16" ry="7" transform="rotate(-20, 170, 45)" fill="url(#leafGradGold)" />
              <ellipse cx="230" cy="50" rx="14" ry="6" transform="rotate(25, 230, 50)" fill="url(#leafGradSepia)" />
            </g>
          </g>
        </svg>

        {/* =========================================================================
            7 OVAL GENERATION PORTRAIT MEDALLIONS & PARCHMENT SCROLLS (DESKTOP)
           ========================================================================= */}
        {familyTreeData.map((gen, idx) => {
          const pos = nodePositions[idx];
          const isHovered = hoveredGen === gen.gen;
          const isFounder = gen.gen === 1;

          return (
            <div
              key={gen.gen}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: pos.transform,
                zIndex: isHovered ? 30 : 20
              }}
              onMouseEnter={() => setHoveredGen(gen.gen)}
              onMouseLeave={() => setHoveredGen(null)}
              onClick={() => setSelectedGenIndex(idx)}
              className={`heritage-tree-node group cursor-pointer transition-all duration-300 ${
                isFounder ? 'heritage-tree-node--apex' : ''
              } ${isHovered ? 'scale-105' : ''}`}
            >
              {/* Oval Gold-Gilded Portrait Medallion */}
              <div className="heritage-tree-medallion-outer">
                <div className="heritage-tree-medallion-ring">
                  <div className="heritage-tree-medallion-inner">
                    <img
                      src={getAssetUrl(gen.image)}
                      alt={gen.name[lang] || gen.name.en}
                      className="heritage-tree-portrait-img"
                      loading="lazy"
                    />
                    <div className="heritage-tree-portrait-vignette" />
                  </div>
                </div>

                {/* Inspect Action Cue on Hover */}
                <div className="heritage-tree-medallion-cue">
                  <BookOpen className="w-4 h-4 text-amber-200" />
                </div>
              </div>

              {/* Antiqued Parchment Ribbon / Banner */}
              <div className="heritage-tree-parchment-scroll">
                {/* Generation Numeral Seal */}
                <div className="heritage-tree-gen-badge">
                  <span>{String(gen.gen).padStart(2, '0')}</span>
                </div>

                {/* Name */}
                <h3 className="heritage-tree-node-name">
                  {gen.name[lang] || gen.name.en}
                </h3>

                {/* Period Years */}
                <div className="heritage-tree-node-years">
                  {gen.years}
                </div>

                {/* Archetype / Heritage Role */}
                <div className="heritage-tree-node-role">
                  {gen.title[lang] || gen.title.en}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          RESPONSIVE TABLET & MOBILE TREE (Screen < 1024px)
         ========================================================================= */}
      <div className="lg:hidden relative py-8 space-y-12">
        {/* Central Vertical Trunk Line */}
        <div className="absolute left-1/2 top-4 bottom-12 -translate-x-1/2 w-3 bg-gradient-to-b from-[#351e13] via-[#6e4632] to-[#2c1611] rounded-full opacity-60 pointer-events-none shadow-sm" aria-hidden="true" />

        {familyTreeData.map((gen, idx) => {
          const isFounder = gen.gen === 1;
          const isLeft = idx % 2 === 1; // Gen 2, 4, 6 left; Gen 3, 5, 7 right

          return (
            <div 
              key={gen.gen}
              onClick={() => setSelectedGenIndex(idx)}
              className={`relative z-10 flex flex-col items-center cursor-pointer transition-transform duration-300 active:scale-95 ${
                isFounder ? 'max-w-xs mx-auto' : isLeft ? 'sm:mr-auto max-w-xs sm:translate-x-4' : 'sm:ml-auto max-w-xs sm:-translate-x-4'
              }`}
            >
              {/* Oval Medallion */}
              <div className="heritage-tree-medallion-outer shadow-xl">
                <div className="heritage-tree-medallion-ring">
                  <div className="heritage-tree-medallion-inner">
                    <img
                      src={getAssetUrl(gen.image)}
                      alt={gen.name[lang] || gen.name.en}
                      className="heritage-tree-portrait-img"
                      loading="lazy"
                    />
                    <div className="heritage-tree-portrait-vignette" />
                  </div>
                </div>
              </div>

              {/* Parchment Scroll */}
              <div className="heritage-tree-parchment-scroll mt-2 w-full text-center">
                <div className="heritage-tree-gen-badge">
                  <span>{String(gen.gen).padStart(2, '0')}</span>
                </div>
                <h3 className="heritage-tree-node-name">
                  {gen.name[lang] || gen.name.en}
                </h3>
                <div className="heritage-tree-node-years">
                  {gen.years}
                </div>
                <div className="heritage-tree-node-role">
                  {gen.title[lang] || gen.title.en}
                </div>
                <div className="pt-2 text-[10px] tracking-wider uppercase text-primary font-semibold flex items-center justify-center gap-1">
                  <span>{isBn ? 'বিস্তারিত দেখুন' : 'VIEW BIOGRAPHY'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          TREE BASE GROUND & FOOTER: "THE LEGACY CONTINUES"
         ========================================================================= */}
      <footer className="heritage-tree-footer relative text-center pt-8 sm:pt-14 pb-4">
        <div className="heritage-tree-legacy-badge">
          <span className="heritage-tree-legacy-line" />
          <span className="heritage-tree-legacy-text">
            {isBn ? 'অমর ঐতিহ্য প্রবাহ • ১৮৪৫ — বর্তমান' : 'THE LEGACY CONTINUES • 1845 — PRESENT'}
          </span>
          <span className="heritage-tree-legacy-line" />
        </div>
      </footer>

      {/* =========================================================================
          HERITAGE CUSTODIAN DETAIL MODAL / DRAWER
         ========================================================================= */}
      {selectedGen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedGenIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="heritage-tree-modal bg-[#fdfbf7] text-[#321b17] border border-[#d4af37]/60 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Antique Modal Background Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8c6426] via-[#d4af37] to-[#8c6426]" />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedGenIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#f4efe6] border border-[#d4af37]/40 text-[#321b17] flex items-center justify-center hover:bg-[#321b17] hover:text-[#f4efe6] transition-colors duration-200 z-10"
              aria-label={isBn ? 'বন্ধ করুন' : 'Close modal'}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="space-y-6 pt-2">
              {/* Header: Generation Tag & Navigation */}
              <div className="flex items-center justify-between border-b border-[#321b17]/15 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#321b17] text-[#f4efe6] text-xs font-mono font-bold tracking-wider">
                    GEN #{String(selectedGen.gen).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8c6426]">
                    {selectedGen.generationLabel[lang] || selectedGen.generationLabel.en}
                  </span>
                </div>

                {/* Gen Prev / Next Quick Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={selectedGenIndex === 0}
                    onClick={() => setSelectedGenIndex(selectedGenIndex - 1)}
                    className="p-1.5 rounded-full border border-[#321b17]/20 disabled:opacity-30 hover:bg-[#f4efe6] transition-colors"
                    title={isBn ? 'পূর্ববর্তী প্রজন্ম' : 'Previous Generation'}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={selectedGenIndex === familyTreeData.length - 1}
                    onClick={() => setSelectedGenIndex(selectedGenIndex + 1)}
                    className="p-1.5 rounded-full border border-[#321b17]/20 disabled:opacity-30 hover:bg-[#f4efe6] transition-colors"
                    title={isBn ? 'পরবর্তী প্রজন্ম' : 'Next Generation'}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Content Layout: Portrait & Narrative */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                {/* Left Column: Portrait */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="heritage-tree-modal-portrait">
                    <img
                      src={getAssetUrl(selectedGen.image)}
                      alt={selectedGen.name[lang] || selectedGen.name.en}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4efe6] border border-[#321b17]/20 text-xs font-mono text-[#321b17]">
                      <Calendar className="w-3.5 h-3.5 text-[#8c6426]" />
                      <span>{selectedGen.years}</span>
                    </span>
                  </div>
                </div>

                {/* Right Column: Name, Bio, Key Contributions */}
                <div className="sm:col-span-7 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#321b17] leading-tight">
                      {selectedGen.name[lang] || selectedGen.name.en}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#8c6426] font-semibold mt-1">
                      {selectedGen.title[lang] || selectedGen.title.en}
                    </p>
                  </div>

                  <p className="text-sm font-sans text-[#321b17]/85 leading-relaxed bg-[#f4efe6]/50 p-4 rounded-xl border border-[#321b17]/10">
                    {selectedGen.bio[lang] || selectedGen.bio.en}
                  </p>

                  {/* Contributions Checklist */}
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-[#321b17] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{isBn ? 'ঐতিহাসিক অবদান ও কীর্তি:' : 'Key Heritage Contributions:'}</span>
                    </h4>
                    <ul className="space-y-2">
                      {(selectedGen.contributions[lang] || selectedGen.contributions.en).map((item, i) => (
                        <li key={i} className="text-xs sm:text-sm text-[#321b17]/80 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#8c6426] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[#321b17]/15 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground font-serif italic">
                  {isBn ? 'খেলাৎ ভবন মহাফেজখানা ও ট্রাস্ট দলিল' : 'Khelat Bhawan Heritage Archives & Trust Records'}
                </div>

                <div className="flex items-center gap-3">
                  {selectedGen.gen === 1 && setActiveTab && (
                    <button
                      onClick={() => {
                        setSelectedGenIndex(null);
                        setActiveTab('founder');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#321b17] text-[#f4efe6] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#8c6426] transition-colors"
                    >
                      <span>{isBn ? 'প্রতিষ্ঠাতার পূর্ণ জীবনী' : 'Founder Biography'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {selectedGen.gen >= 4 && setActiveTab && (
                    <button
                      onClick={() => {
                        setSelectedGenIndex(null);
                        setActiveTab('trustees');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f4efe6] border border-[#321b17]/30 text-[#321b17] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#321b17] hover:text-[#f4efe6] transition-colors"
                    >
                      <span>{isBn ? 'ট্রাস্ট ও ট্রাস্টি মণ্ডলী' : 'Trustees & Trusts'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
