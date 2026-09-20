import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/assetHelper';
import { familyTreeData } from '../data/familyTreeData';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  ExternalLink,
  BookOpen,
  Landmark
} from 'lucide-react';

export default function HeritageFamilyTree({ lang = 'en', setActiveTab, onOpenLightbox }) {
  const isBn = lang === 'bn';
  const [selectedGenIndex, setSelectedGenIndex] = useState(null);
  const [hoveredGen, setHoveredGen] = useState(null);

  // Exact generation editorial data and images matching the latest visual reference
  const genEditorialData = [
    {
      gen: 1,
      tag: { en: 'GENERATION 01', bn: '১ম প্রজন্ম' },
      role: { en: 'THE FOUNDER & PATRIARCH', bn: 'প্রতিষ্ঠাতা ও আদি পুরুষ' },
      name: { en: 'Babu Khelat Chandra Ghosh', bn: 'বাবু খেলাৎ চন্দ্র ঘোষ' },
      years: '1775 — 1845',
      summary: {
        en: 'Founded Khelat Bhawan and laid the foundation for a legacy of devotion, art and philanthropy.',
        bn: 'খেলাৎ ভবনের প্রতিষ্ঠা এবং ভক্তি, মার্গসঙ্গীত ও সমাজসেবার অমর ঐতিহ্যের ভিত্তিপ্রস্তর স্থাপন করেন।'
      },
      image: '/images/babu_khelat_ghosh_bust.png',
      isOval: true
    },
    {
      gen: 2,
      tag: { en: 'GENERATION 02', bn: '২য় প্রজন্ম' },
      role: { en: 'RENAISSANCE STEWARDS', bn: 'নবজাগরণের ধারক' },
      name: { en: 'Babu Mohim Chandra Ghosh', bn: 'বাবু মহিম চন্দ্র ঘোষ' },
      years: '1845 — 1920',
      summary: {
        en: 'Expanded the estate, strengthened cultural patronage and institutionalized key traditions.',
        bn: 'সম্পত্তি ও ট্রাস্টের প্রসার, সংস্কৃতি ও মার্গসঙ্গীতের পৃষ্ঠপোষকতা এবং পারিবারিক দেবসেবা সুদৃঢ় করেন।'
      },
      image: '/images/SDP_0305.jpg',
      isOval: false
    },
    {
      gen: 3,
      tag: { en: 'GENERATION 03', bn: '৩য় প্রজন্ম' },
      role: { en: 'CULTURAL PATRONS', bn: 'সংস্কৃতি অনুরাগী' },
      name: { en: 'Babu Sarat Chandra Ghosh', bn: 'বাবু শরৎ চন্দ্র ঘোষ' },
      years: '1920 — 1950',
      summary: {
        en: 'Nurtured the arts, supported classical music and maintained the architectural grandeur of Khelat Bhawan.',
        bn: 'বাংলার শিল্পকলা ও উচ্চাঙ্গ সঙ্গীতের পৃষ্ঠপোষকতা এবং প্রাসাদের স্থাপত্যের অনন্য সংরক্ষণ করেন।'
      },
      image: '/images/SDP_0273.jpg',
      isOval: false
    },
    {
      gen: 4,
      tag: { en: 'GENERATION 04', bn: '৪র্থ প্রজন্ম' },
      role: { en: 'INSTITUTIONAL FOUNDERS', bn: 'প্রতিষ্ঠান ও ট্রাস্ট নির্মাতা' },
      name: { en: 'Babu Khelat Ghosh', bn: 'বাবু খেলাৎ ঘোষ ট্রাস্টিগণ' },
      years: '1950 — 1975',
      summary: {
        en: 'Formalized legal trusts to protect the estate, its properties and its continued service to society.',
        bn: 'পারিবারিক দেবসেবা, গৃহসম্পত্তি ও সমাজকল্যাণকে স্থায়ী করতে প্রথম বিধিবদ্ধ ট্রাস্ট গঠন করেন।'
      },
      image: '/images/SDP_0308.jpg',
      isOval: false
    },
    {
      gen: 5,
      tag: { en: 'GENERATION 05', bn: '৫ম প্রজন্ম' },
      role: { en: 'HERITAGE CONSERVATORS', bn: 'সংরক্ষণ ও সংস্কারক' },
      name: { en: 'Siddhartha Ghosh', bn: 'সিদ্ধার্থ ঘোষ' },
      years: '1975 — 1985',
      summary: {
        en: 'Carried out extensive structural restoration, supported the community and ensured continuity of the family\'s values.',
        bn: 'ঐতিহাসিক প্রাসাদের বৃহৎ স্থাপত্য সংস্কার সম্পন্ন করেন এবং পরিবারের সাংস্কৃতিক ঐতিহ্যের ধারাবাহিকতা রক্ষা করেন।'
      },
      image: '/images/SDP_0291.jpg',
      isOval: false
    },
    {
      gen: 6,
      tag: { en: 'GENERATION 06', bn: '৬ষ্ঠ প্রজন্ম' },
      role: { en: 'DIGITAL ARCHIVAL CUSTODIANS', bn: 'ডিজিটাল আর্কাইভ ও ট্রাস্ট বোর্ড' },
      name: { en: 'Governing Trustees of Khelat Bhawan', bn: 'খেলাৎ ভবনের গভর্নিং ট্রাস্টি মণ্ডলী' },
      years: '1985 — 2015',
      summary: {
        en: 'Initiated digital archives, opened the estate for heritage tourism and preserved centuries-old manuscripts and artefacts.',
        bn: 'ডিজিটাল আর্কাইভের সূচনা, আন্তর্জাতিক হেরিটেজ পর্যটন ও শতবর্ষ প্রাচীন নথি-স্মারক সংরক্ষণ করেন।'
      },
      image: '/images/SDP_0344.jpg',
      isOval: false
    },
    {
      gen: 7,
      tag: { en: 'GENERATION 07', bn: '৭ম প্রজন্ম' },
      role: { en: 'PRESENT GUARDIANS', bn: 'বর্তমান ও ভবিষ্যৎ অভিভাবক' },
      name: { en: 'Current Custodians & Youth Council', bn: 'বর্তমান ট্রাস্টি ও উত্তরাধিকারী মণ্ডলী' },
      years: '2015 — Present',
      summary: {
        en: 'Continuing the legacy through preservation, education, digital access and community engagement for future generations.',
        bn: 'টেকসই ঐতিহ্য সংরক্ষণ, ডিজিটাল জীবন্ত মিউজিয়াম ও ভবিষ্যৎ প্রজন্মের মাঝে ঐতিহ্যকে বাঁচিয়ে রাখা।'
      },
      image: '/images/SDP_0359.jpg',
      isOval: false
    }
  ];

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
  const selectedEditorial = selectedGenIndex !== null ? genEditorialData[selectedGenIndex] : null;

  return (
    <section 
      className="heritage-lineage-layout relative my-8 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 text-[#321b17] z-10 animate-in fade-in duration-500 overflow-hidden"
      aria-label={isBn ? 'খেলাৎ ভবন বংশধারা' : 'The Khelat Bhawan Lineage'}
    >
      {/* ================= CONTINUOUS FAINT PALACE ARCHITECTURAL WATERMARK ================= */}
      <div className="heritage-lineage-bg" aria-hidden="true">
        <div className="heritage-lineage-watermark-facade" />
      </div>

      {/* =========================================================================
          1. HEADER (Strictly matching reference layout)
         ========================================================================= */}
      <header className="heritage-lineage-header relative grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-12 sm:pb-16 z-10">
        {/* Top-Left: "ROOTED IN HISTORY / GUIDED BY GENERATIONS" */}
        <div className="md:col-span-3 text-left space-y-2 hidden md:block">
          <div className="font-serif text-xs uppercase tracking-[0.24em] text-[#8c6e4e] font-semibold leading-relaxed">
            <div>ROOTED</div>
            <div>IN HISTORY</div>
            <div>GUIDED</div>
            <div>BY GENERATIONS</div>
          </div>
          <div className="w-10 h-[1.5px] bg-[#b68a32] mt-2" />
        </div>

        {/* Top-Center: Eyebrow, Main Title, Landmark Icon, Sub-tagline */}
        <div className="md:col-span-6 text-center space-y-2">
          <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-sans font-bold text-[#8c6e4e] block">
            {isBn ? 'প্রজন্ম থেকে প্রজন্মান্তরে' : 'A LEGACY ACROSS GENERATIONS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#321b17] tracking-tight">
            {isBn ? 'খেলাৎ ভবন বংশধারা' : 'The Khelat Bhawan Lineage'}
          </h2>

          {/* Architectural Landmark Icon with Gold Rules */}
          <div className="flex items-center justify-center gap-3 py-1 text-[#b68a32]" aria-hidden="true">
            <span className="w-14 h-[1px] bg-[#b68a32]/60" />
            <Landmark className="w-4 h-4 text-[#b68a32]" />
            <span className="w-14 h-[1px] bg-[#b68a32]/60" />
          </div>

          <p className="text-[10px] sm:text-xs tracking-[0.24em] font-sans font-semibold uppercase text-[#6e554d]">
            {isBn ? 'ব্যক্তিত্ব • পৃষ্ঠপোষকতা • চিরন্তন ঐতিহ্য' : 'PEOPLE • PATRONAGE • A LASTING LEGACY'}
          </p>
        </div>

        {/* Top-Right: Script Quote: "A heritage that lives on." */}
        <div className="md:col-span-3 text-right hidden md:block pt-2">
          <span className="font-serif italic text-lg sm:text-xl text-[#8c6426] leading-tight block">
            {isBn ? '“এক অমর ঐতিহ্যের প্রবাহ।”' : '“A heritage that lives on.”'}
          </span>
        </div>
      </header>

      {/* =========================================================================
          2. THE LINEAGE TREE HIERARCHY (Apex + Symmetrical Tiers)
         ========================================================================= */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-10 sm:space-y-12">
        
        {/* =========================================================================
            APEX: GENERATION 01 (Babu Khelat Chandra Ghosh)
           ========================================================================= */}
        <div className="flex flex-col items-center relative">
          <div 
            onClick={() => setSelectedGenIndex(0)}
            onMouseEnter={() => setHoveredGen(1)}
            onMouseLeave={() => setHoveredGen(null)}
            className="group cursor-pointer flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-transparent transition-transform duration-300 hover:scale-[1.02] max-w-xl mx-auto"
          >
            {/* Oval Gilded Medallion */}
            <div className="heritage-lineage-oval-frame shadow-2xl shrink-0">
              <div className="heritage-lineage-oval-ring">
                <img
                  src={getAssetUrl(genEditorialData[0].image)}
                  alt={genEditorialData[0].name[lang] || genEditorialData[0].name.en}
                  className="heritage-lineage-img"
                  loading="lazy"
                />
                <div className="heritage-lineage-vignette" />
              </div>
              <div className="heritage-lineage-cue-badge">
                <BookOpen className="w-3.5 h-3.5 text-[#f3e5ab]" />
              </div>
            </div>

            {/* Editorial Text to the Right of Oval */}
            <div className="text-center sm:text-left space-y-1 max-w-sm">
              <div className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#8c6426] uppercase">
                {genEditorialData[0].tag[lang] || genEditorialData[0].tag.en}
              </div>
              <div className="text-[11px] tracking-[0.16em] font-sans font-semibold text-[#5a4038] uppercase">
                {genEditorialData[0].role[lang] || genEditorialData[0].role.en}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#321b17] leading-tight group-hover:text-[#8c6426] transition-colors">
                {genEditorialData[0].name[lang] || genEditorialData[0].name.en}
              </h3>
              <div className="font-sans text-xs font-semibold text-[#8c6e4e] tracking-wider">
                {genEditorialData[0].years}
              </div>
              <p className="font-serif text-xs sm:text-sm text-[#6e554d] leading-relaxed pt-1">
                {genEditorialData[0].summary[lang] || genEditorialData[0].summary.en}
              </p>
            </div>
          </div>

          {/* Apex to Tier 1 Vertical Connector Line & Gold Node */}
          <div className="flex flex-col items-center mt-6" aria-hidden="true">
            <span className="w-[1.5px] h-10 bg-[#c29b38]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#b68a32] border-2 border-[#fdfbf7] shadow-sm -mt-1" />
          </div>
        </div>

        {/* =========================================================================
            TIER 1 (GENERATION 02 & GENERATION 03)
            Left: Circle Medallion -> Text
            Right: Text -> Circle Medallion
           ========================================================================= */}
        <div className="relative">
          {/* Horizontal Spanning Branch Line */}
          <div className="hidden lg:block absolute -top-4 left-[22%] right-[22%] h-[1.5px] bg-[#c29b38]" aria-hidden="true">
            <span className="absolute left-0 top-0 w-[1.5px] h-6 bg-[#c29b38]" />
            <span className="absolute right-0 top-0 w-[1.5px] h-6 bg-[#c29b38]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Gen 02 (Left): Circular Medallion on Left, Text on Right */}
            <div 
              onClick={() => setSelectedGenIndex(1)}
              onMouseEnter={() => setHoveredGen(2)}
              onMouseLeave={() => setHoveredGen(null)}
              className="group cursor-pointer flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="heritage-lineage-round-frame shadow-xl shrink-0">
                <div className="heritage-lineage-round-ring">
                  <img
                    src={getAssetUrl(genEditorialData[1].image)}
                    alt={genEditorialData[1].name[lang] || genEditorialData[1].name.en}
                    className="heritage-lineage-img"
                    loading="lazy"
                  />
                  <div className="heritage-lineage-vignette" />
                </div>
                <div className="heritage-lineage-cue-badge">
                  <BookOpen className="w-3.5 h-3.5 text-[#f3e5ab]" />
                </div>
              </div>

              <div className="space-y-1 max-w-xs">
                <div className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#8c6426] uppercase">
                  {genEditorialData[1].tag[lang] || genEditorialData[1].tag.en}
                </div>
                <div className="text-[11px] tracking-[0.16em] font-sans font-semibold text-[#5a4038] uppercase">
                  {genEditorialData[1].role[lang] || genEditorialData[1].role.en}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#321b17] leading-tight group-hover:text-[#8c6426] transition-colors">
                  {genEditorialData[1].name[lang] || genEditorialData[1].name.en}
                </h3>
                <div className="font-sans text-xs font-semibold text-[#8c6e4e] tracking-wider">
                  {genEditorialData[1].years}
                </div>
                <p className="font-serif text-xs sm:text-sm text-[#6e554d] leading-relaxed pt-1">
                  {genEditorialData[1].summary[lang] || genEditorialData[1].summary.en}
                </p>
              </div>
            </div>

            {/* Gen 03 (Right): Text on Left, Circular Medallion on Right */}
            <div 
              onClick={() => setSelectedGenIndex(2)}
              onMouseEnter={() => setHoveredGen(3)}
              onMouseLeave={() => setHoveredGen(null)}
              className="group cursor-pointer flex flex-col-reverse sm:flex-row items-center justify-end gap-5 sm:gap-6 text-center sm:text-right transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="space-y-1 max-w-xs">
                <div className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#8c6426] uppercase">
                  {genEditorialData[2].tag[lang] || genEditorialData[2].tag.en}
                </div>
                <div className="text-[11px] tracking-[0.16em] font-sans font-semibold text-[#5a4038] uppercase">
                  {genEditorialData[2].role[lang] || genEditorialData[2].role.en}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#321b17] leading-tight group-hover:text-[#8c6426] transition-colors">
                  {genEditorialData[2].name[lang] || genEditorialData[2].name.en}
                </h3>
                <div className="font-sans text-xs font-semibold text-[#8c6e4e] tracking-wider">
                  {genEditorialData[2].years}
                </div>
                <p className="font-serif text-xs sm:text-sm text-[#6e554d] leading-relaxed pt-1">
                  {genEditorialData[2].summary[lang] || genEditorialData[2].summary.en}
                </p>
              </div>

              <div className="heritage-lineage-round-frame shadow-xl shrink-0">
                <div className="heritage-lineage-round-ring">
                  <img
                    src={getAssetUrl(genEditorialData[2].image)}
                    alt={genEditorialData[2].name[lang] || genEditorialData[2].name.en}
                    className="heritage-lineage-img"
                    loading="lazy"
                  />
                  <div className="heritage-lineage-vignette" />
                </div>
                <div className="heritage-lineage-cue-badge">
                  <BookOpen className="w-3.5 h-3.5 text-[#f3e5ab]" />
                </div>
              </div>
            </div>
          </div>

          {/* Tier 1 to Tier 2 Vertical Connector Line & Gold Node */}
          <div className="flex flex-col items-center mt-8" aria-hidden="true">
            <span className="w-[1.5px] h-12 bg-[#c29b38]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#b68a32] border-2 border-[#fdfbf7] shadow-sm -mt-1" />
          </div>
        </div>

        {/* =========================================================================
            TIER 2 (GENERATION 04 & GENERATION 05)
            Left: Circle Medallion -> Text
            Right: Text -> Circle Medallion
           ========================================================================= */}
        <div className="relative">
          {/* Horizontal Spanning Branch Line */}
          <div className="hidden lg:block absolute -top-4 left-[22%] right-[22%] h-[1.5px] bg-[#c29b38]" aria-hidden="true">
            <span className="absolute left-0 top-0 w-[1.5px] h-6 bg-[#c29b38]" />
            <span className="absolute right-0 top-0 w-[1.5px] h-6 bg-[#c29b38]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Gen 04 (Left): Circular Medallion on Left, Text on Right */}
            <div 
              onClick={() => setSelectedGenIndex(3)}
              onMouseEnter={() => setHoveredGen(4)}
              onMouseLeave={() => setHoveredGen(null)}
              className="group cursor-pointer flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="heritage-lineage-round-frame shadow-xl shrink-0">
                <div className="heritage-lineage-round-ring">
                  <img
                    src={getAssetUrl(genEditorialData[3].image)}
                    alt={genEditorialData[3].name[lang] || genEditorialData[3].name.en}
                    className="heritage-lineage-img"
                    loading="lazy"
                  />
                  <div className="heritage-lineage-vignette" />
                </div>
                <div className="heritage-lineage-cue-badge">
                  <BookOpen className="w-3.5 h-3.5 text-[#f3e5ab]" />
                </div>
              </div>

              <div className="space-y-1 max-w-xs">
                <div className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#8c6426] uppercase">
                  {genEditorialData[3].tag[lang] || genEditorialData[3].tag.en}
                </div>
                <div className="text-[11px] tracking-[0.16em] font-sans font-semibold text-[#5a4038] uppercase">
                  {genEditorialData[3].role[lang] || genEditorialData[3].role.en}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#321b17] leading-tight group-hover:text-[#8c6426] transition-colors">
                  {genEditorialData[3].name[lang] || genEditorialData[3].name.en}
                </h3>
                <div className="font-sans text-xs font-semibold text-[#8c6e4e] tracking-wider">
                  {genEditorialData[3].years}
                </div>
                <p className="font-serif text-xs sm:text-sm text-[#6e554d] leading-relaxed pt-1">
                  {genEditorialData[3].summary[lang] || genEditorialData[3].summary.en}
                </p>
              </div>
            </div>

            {/* Gen 05 (Right): Text on Left, Circular Medallion on Right */}
            <div 
              onClick={() => setSelectedGenIndex(4)}
              onMouseEnter={() => setHoveredGen(5)}
              onMouseLeave={() => setHoveredGen(null)}
              className="group cursor-pointer flex flex-col-reverse sm:flex-row items-center justify-end gap-5 sm:gap-6 text-center sm:text-right transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="space-y-1 max-w-xs">
                <div className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#8c6426] uppercase">
                  {genEditorialData[4].tag[lang] || genEditorialData[4].tag.en}
                </div>
                <div className="text-[11px] tracking-[0.16em] font-sans font-semibold text-[#5a4038] uppercase">
                  {genEditorialData[4].role[lang] || genEditorialData[4].role.en}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#321b17] leading-tight group-hover:text-[#8c6426] transition-colors">
                  {genEditorialData[4].name[lang] || genEditorialData[4].name.en}
                </h3>
                <div className="font-sans text-xs font-semibold text-[#8c6e4e] tracking-wider">
                  {genEditorialData[4].years}
                </div>
                <p className="font-serif text-xs sm:text-sm text-[#6e554d] leading-relaxed pt-1">
                  {genEditorialData[4].summary[lang] || genEditorialData[4].summary.en}
                </p>
              </div>

              <div className="heritage-lineage-round-frame shadow-xl shrink-0">
                <div className="heritage-lineage-round-ring">
                  <img
                    src={getAssetUrl(genEditorialData[4].image)}
                    alt={genEditorialData[4].name[lang] || genEditorialData[4].name.en}
                    className="heritage-lineage-img"
                    loading="lazy"
                  />
                  <div className="heritage-lineage-vignette" />
                </div>
                <div className="heritage-lineage-cue-badge">
                  <BookOpen className="w-3.5 h-3.5 text-[#f3e5ab]" />
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2 to Tier 3 Vertical Connector Line & Gold Node */}
          <div className="flex flex-col items-center mt-8" aria-hidden="true">
            <span className="w-[1.5px] h-12 bg-[#c29b38]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#b68a32] border-2 border-[#fdfbf7] shadow-sm -mt-1" />
          </div>
        </div>

        {/* =========================================================================
            TIER 3 (GENERATION 06 & GENERATION 07)
            Left: Circle Medallion -> Text
            Right: Text -> Circle Medallion
           ========================================================================= */}
        <div className="relative">
          {/* Horizontal Spanning Branch Line */}
          <div className="hidden lg:block absolute -top-4 left-[22%] right-[22%] h-[1.5px] bg-[#c29b38]" aria-hidden="true">
            <span className="absolute left-0 top-0 w-[1.5px] h-6 bg-[#c29b38]" />
            <span className="absolute right-0 top-0 w-[1.5px] h-6 bg-[#c29b38]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Gen 06 (Left): Circular Medallion on Left, Text on Right */}
            <div 
              onClick={() => setSelectedGenIndex(5)}
              onMouseEnter={() => setHoveredGen(6)}
              onMouseLeave={() => setHoveredGen(null)}
              className="group cursor-pointer flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="heritage-lineage-round-frame shadow-xl shrink-0">
                <div className="heritage-lineage-round-ring">
                  <img
                    src={getAssetUrl(genEditorialData[5].image)}
                    alt={genEditorialData[5].name[lang] || genEditorialData[5].name.en}
                    className="heritage-lineage-img"
                    loading="lazy"
                  />
                  <div className="heritage-lineage-vignette" />
                </div>
                <div className="heritage-lineage-cue-badge">
                  <BookOpen className="w-3.5 h-3.5 text-[#f3e5ab]" />
                </div>
              </div>

              <div className="space-y-1 max-w-xs">
                <div className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#8c6426] uppercase">
                  {genEditorialData[5].tag[lang] || genEditorialData[5].tag.en}
                </div>
                <div className="text-[11px] tracking-[0.16em] font-sans font-semibold text-[#5a4038] uppercase">
                  {genEditorialData[5].role[lang] || genEditorialData[5].role.en}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#321b17] leading-tight group-hover:text-[#8c6426] transition-colors">
                  {genEditorialData[5].name[lang] || genEditorialData[5].name.en}
                </h3>
                <div className="font-sans text-xs font-semibold text-[#8c6e4e] tracking-wider">
                  {genEditorialData[5].years}
                </div>
                <p className="font-serif text-xs sm:text-sm text-[#6e554d] leading-relaxed pt-1">
                  {genEditorialData[5].summary[lang] || genEditorialData[5].summary.en}
                </p>
              </div>
            </div>

            {/* Gen 07 (Right): Text on Left, Circular Medallion on Right */}
            <div 
              onClick={() => setSelectedGenIndex(6)}
              onMouseEnter={() => setHoveredGen(7)}
              onMouseLeave={() => setHoveredGen(null)}
              className="group cursor-pointer flex flex-col-reverse sm:flex-row items-center justify-end gap-5 sm:gap-6 text-center sm:text-right transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="space-y-1 max-w-xs">
                <div className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#8c6426] uppercase">
                  {genEditorialData[6].tag[lang] || genEditorialData[6].tag.en}
                </div>
                <div className="text-[11px] tracking-[0.16em] font-sans font-semibold text-[#5a4038] uppercase">
                  {genEditorialData[6].role[lang] || genEditorialData[6].role.en}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#321b17] leading-tight group-hover:text-[#8c6426] transition-colors">
                  {genEditorialData[6].name[lang] || genEditorialData[6].name.en}
                </h3>
                <div className="font-sans text-xs font-semibold text-[#8c6e4e] tracking-wider">
                  {genEditorialData[6].years}
                </div>
                <p className="font-serif text-xs sm:text-sm text-[#6e554d] leading-relaxed pt-1">
                  {genEditorialData[6].summary[lang] || genEditorialData[6].summary.en}
                </p>
              </div>

              <div className="heritage-lineage-round-frame shadow-xl shrink-0">
                <div className="heritage-lineage-round-ring">
                  <img
                    src={getAssetUrl(genEditorialData[6].image)}
                    alt={genEditorialData[6].name[lang] || genEditorialData[6].name.en}
                    className="heritage-lineage-img"
                    loading="lazy"
                  />
                  <div className="heritage-lineage-vignette" />
                </div>
                <div className="heritage-lineage-cue-badge">
                  <BookOpen className="w-3.5 h-3.5 text-[#f3e5ab]" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          3. FOOTER: "A LEGACY THAT CONTINUES"
         ========================================================================= */}
      <footer className="heritage-lineage-footer relative text-center pt-14 pb-4 z-10">
        <div className="inline-flex items-center justify-center gap-4 text-[#8c6e4e]">
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#b68a32]" />
          <span className="text-xs text-[#b68a32]">✦</span>
          <span className="font-serif font-bold text-xs sm:text-sm tracking-[0.25em] uppercase text-[#8c6e4e]">
            {isBn ? 'অমর ঐতিহ্য প্রবাহ' : 'A LEGACY THAT CONTINUES'}
          </span>
          <span className="text-xs text-[#b68a32]">✦</span>
          <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#b68a32]" />
        </div>
      </footer>

      {/* =========================================================================
          4. MUSEUM CUSTODIAN DETAIL MODAL
         ========================================================================= */}
      {selectedGen && selectedEditorial && (
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
            {/* Top Gold Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8c6426] via-[#d4af37] to-[#8c6426]" />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedGenIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#f4efe6] border border-[#d4af37]/40 text-[#321b17] flex items-center justify-center hover:bg-[#321b17] hover:text-[#f4efe6] transition-colors duration-200 z-10"
              aria-label={isBn ? 'বন্ধ করুন' : 'Close modal'}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between border-b border-[#321b17]/15 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#321b17] text-[#f4efe6] text-xs font-mono font-bold tracking-wider">
                    {selectedEditorial.tag[lang] || selectedEditorial.tag.en}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8c6426]">
                    {selectedEditorial.role[lang] || selectedEditorial.role.en}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={selectedGenIndex === 0}
                    onClick={() => setSelectedGenIndex(selectedGenIndex - 1)}
                    className="p-1.5 rounded-full border border-[#321b17]/20 disabled:opacity-30 hover:bg-[#f4efe6] transition-colors"
                    title={isBn ? 'পূর্ববর্তী' : 'Previous'}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={selectedGenIndex === familyTreeData.length - 1}
                    onClick={() => setSelectedGenIndex(selectedGenIndex + 1)}
                    className="p-1.5 rounded-full border border-[#321b17]/20 disabled:opacity-30 hover:bg-[#f4efe6] transition-colors"
                    title={isBn ? 'পরবর্তী' : 'Next'}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="heritage-lineage-oval-frame heritage-lineage-oval-frame--lg shadow-2xl">
                    <div className="heritage-lineage-oval-ring">
                      <img
                        src={getAssetUrl(selectedEditorial.image)}
                        alt={selectedEditorial.name[lang] || selectedEditorial.name.en}
                        className="heritage-lineage-img"
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4efe6] border border-[#321b17]/20 text-xs font-mono text-[#321b17]">
                      <Calendar className="w-3.5 h-3.5 text-[#8c6426]" />
                      <span>{selectedEditorial.years}</span>
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-7 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#321b17] leading-tight">
                      {selectedEditorial.name[lang] || selectedEditorial.name.en}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#8c6426] font-semibold mt-1">
                      {selectedEditorial.role[lang] || selectedEditorial.role.en}
                    </p>
                  </div>

                  <p className="text-sm font-sans text-[#321b17]/85 leading-relaxed bg-[#f4efe6]/50 p-4 rounded-xl border border-[#321b17]/10">
                    {selectedGen.bio[lang] || selectedGen.bio.en}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-[#321b17] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{isBn ? 'ঐতিহাসিক অবদান ও ভূমিকা:' : 'Key Heritage Contributions:'}</span>
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

              <div className="pt-4 border-t border-[#321b17]/15 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground font-serif italic">
                  {isBn ? 'খেলাৎ ভবন ঐতিহাসিক মহাফেজখানা' : 'Khelat Bhawan Heritage Archives'}
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
