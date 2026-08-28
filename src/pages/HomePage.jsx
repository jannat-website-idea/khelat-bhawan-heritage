import React, { useState, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ChevronRight, 
  Calendar, 
  Award, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Music,
  Users,
  Compass
} from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';

export default function HomePage({ lang, setActiveTab, onOpenBooking, onOpenLightbox, content }) {
  const t = content[lang];
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="space-y-0">
      {/* 01: HERO SECTION */}
      <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-burgundy-950 text-white pt-24 pb-16">
        {/* Video / Background Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            src="/Videos/khelat bhaban video.mp4"
            poster="/images/SDP_0344.jpg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover opacity-45 scale-105 transform transition-transform duration-1000"
          />
          {/* Subtle Royal Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950 via-burgundy-950/70 to-burgundy-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(44,6,13,0.85)_100%)]" />
        </div>

        {/* Video Controls (Floating Top Right) */}
        <div className="absolute top-28 right-4 md:right-8 z-30 flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-burgundy-900/80 hover:bg-burgundy-800 text-rosegold-200 border border-rosegold-400/40 backdrop-blur-md transition-all shadow-lg"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-burgundy-900/80 hover:bg-burgundy-800 text-rosegold-200 border border-rosegold-400/40 backdrop-blur-md transition-all shadow-lg"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-900/80 border border-rosegold-400/50 backdrop-blur-sm mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-rosegold-400" />
            <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-200">
              {t.hero.subtitle}
            </span>
          </div>

          {/* Majestic Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            <span className="block">{t.nav.brand}</span>
            <span className="block font-display italic font-normal text-3xl sm:text-4xl md:text-5xl text-rosegold-300 mt-2">
              {t.hero.title}
            </span>
          </h1>

          <AlpanaDivider light={true} className="my-2" />

          {/* Subheading Tagline */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-rosegold-100/90 font-light leading-relaxed mb-10">
            {t.hero.tagline}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('heritage')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-rosegold-500 hover:bg-rosegold-600 text-white font-semibold text-xs md:text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 group"
            >
              <span>{t.hero.exploreBtn}</span>
              <ChevronRight className="w-4 h-4 text-rosegold-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-rosegold-300/80 hover:bg-rosegold-100 hover:text-burgundy-950 text-rosegold-100 font-semibold text-xs md:text-sm tracking-wider uppercase backdrop-blur-sm transition-all"
            >
              {t.hero.timelineBtn}
            </button>
          </div>

          {/* Heritage Stats Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-10 border-t border-rosegold-800/40 text-left">
            {t.hero.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-burgundy-900/60 border border-rosegold-700/40 backdrop-blur-md hover:border-rosegold-400 transition-colors"
              >
                <div className="font-serif text-2xl md:text-3xl font-bold text-rosegold-300">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-white mt-1 leading-snug">
                  {stat.label}
                </div>
                <div className="text-[11px] text-rosegold-400 font-light mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 02: EDITORIAL HERITAGE INTRODUCTION */}
      <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Architectural Feature Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/SDP_0344.jpg"
                  alt="Khelat Bhawan Courtyard"
                  className="w-full h-[450px] md:h-[520px] object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onClick={() => onOpenLightbox({
                    type: 'image',
                    title: 'Khelat Bhawan Courtyard & Facade',
                    desc: 'The majestic colonnaded courtyard of 47 Pathuria Ghata Street, established in 1845.',
                    src: '/images/SDP_0344.jpg'
                  })}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-rosegold-300 block">
                    Pathuria Ghata Street
                  </span>
                  <p className="font-serif text-lg font-bold mt-1">
                    47, Pathuria Ghata Street, Kolkata
                  </p>
                </div>
              </div>

              {/* Decorative Floating Seal Badge */}
              <div className="absolute -bottom-6 -right-6 z-20 hidden sm:flex flex-col items-center justify-center w-28 h-28 rounded-full bg-burgundy-900 text-rosegold-200 border-2 border-rosegold-400 shadow-xl text-center p-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-rosegold-300">ESTD.</span>
                <span className="font-serif text-xl font-bold text-white">1845</span>
                <span className="text-[9px] text-rosegold-400">175+ Years</span>
              </div>
            </div>

            {/* Right Editorial Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-600 block mb-2">
                  {t.intro.eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 leading-[1.2]">
                  {t.intro.heading}
                </h2>
              </div>

              <AlpanaDivider className="justify-start py-1" />

              <p className="text-heritage-charcoal text-base md:text-lg leading-relaxed font-light">
                {t.intro.p1}
              </p>

              <p className="text-stone-700 text-sm md:text-base leading-relaxed">
                {t.intro.p2}
              </p>

              {/* Highlight Quote Box */}
              <div className="p-5 rounded-xl bg-rosegold-100/50 border-l-4 border-rosegold-500 my-6">
                <p className="font-serif italic text-burgundy-900 text-base md:text-lg">
                  "{t.intro.statHighlight}"
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveTab('heritage')}
                  className="px-6 py-3 rounded-lg bg-burgundy-900 hover:bg-burgundy-950 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center space-x-2"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowUpRight className="w-4 h-4 text-rosegold-400" />
                </button>

                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-lg border border-rosegold-400 hover:bg-rosegold-50 text-burgundy-900 text-xs font-semibold tracking-wider uppercase transition-all"
                >
                  {t.nav.bookCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 03: HERITAGE HIGHLIGHTS CARDS */}
      <section className="py-20 bg-[#F4ECE0]/50 border-y border-rosegold-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-600 block mb-2">
              Pillars of Legacy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900">
              Heritage Attributes
            </h2>
            <AlpanaDivider className="my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.highlights.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-rosegold-200/80 transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-burgundy-900/90 text-rosegold-200 border border-rosegold-400/40 backdrop-blur-sm">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-burgundy-900 mb-2 group-hover:text-rosegold-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('heritage')}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-rosegold-600 hover:text-burgundy-900 transition-colors pt-2 border-t border-stone-100"
                  >
                    <span>Read More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 04: HISTORICAL TIMELINE PREVIEW */}
      <section className="py-24 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-rosegold-200">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-600 block mb-2">
                {t.timelinePreview.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900">
                {t.timelinePreview.heading}
              </h2>
              <p className="text-stone-600 text-sm md:text-base mt-2 max-w-xl">
                {t.timelinePreview.desc}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('timeline')}
              className="mt-6 md:mt-0 px-6 py-3 rounded-lg bg-burgundy-900 hover:bg-burgundy-800 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow flex items-center space-x-2 self-start md:self-auto"
            >
              <span>{t.timelinePreview.viewFull}</span>
              <ChevronRight className="w-4 h-4 text-rosegold-300" />
            </button>
          </div>

          {/* Horizontal / Grid Timeline Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.timelinePreview.items.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-rosegold-200/80 shadow-md hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-bold text-rosegold-600">
                    {item.year}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-rosegold-100 flex items-center justify-center text-rosegold-700 text-xs font-bold">
                    0{idx + 1}
                  </div>
                </div>

                <div className="h-44 rounded-xl overflow-hidden mb-4 bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif text-lg font-bold text-burgundy-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 05: FOUNDER PREVIEW — BABU KHELAT GHOSH */}
      <section className="py-24 bg-burgundy-950 text-white relative overflow-hidden border-y-2 border-rosegold-500/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Founder Portrait Card */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <div className="relative inline-block max-w-sm mx-auto">
                <div className="p-3 bg-burgundy-900 rounded-2xl border-2 border-rosegold-400 shadow-2xl">
                  <div className="overflow-hidden rounded-xl h-[420px]">
                    <img
                      src={t.founder.image}
                      alt={t.founder.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>

                {/* Floating caption badge */}
                <div className="absolute -bottom-4 inset-x-6 py-2 px-4 bg-burgundy-900/95 border border-rosegold-400/80 rounded-xl text-center shadow-lg backdrop-blur-md">
                  <span className="font-serif text-sm font-bold text-rosegold-200 block">
                    {t.founder.name}
                  </span>
                  <span className="text-[10px] text-rosegold-300 uppercase tracking-widest">
                    {t.founder.years}
                  </span>
                </div>
              </div>
            </div>

            {/* Founder Story & Pull Quote */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-400 block mb-2">
                  {t.founder.eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.2]">
                  {t.founder.name}
                </h2>
                <p className="text-rosegold-300 text-sm font-medium mt-1">
                  {t.founder.tagline}
                </p>
              </div>

              <AlpanaDivider light={true} className="justify-start py-1" />

              <p className="text-rosegold-100/90 text-sm md:text-base leading-relaxed font-light">
                {t.founder.bio1}
              </p>

              <p className="text-rosegold-200/80 text-sm md:text-base leading-relaxed font-light">
                {t.founder.bio2}
              </p>

              <blockquote className="p-5 rounded-xl bg-burgundy-900/80 border-l-4 border-rosegold-400 my-6 italic font-serif text-base text-rosegold-200">
                "{t.founder.quote}"
              </blockquote>

              <div>
                <button
                  onClick={() => setActiveTab('founder')}
                  className="px-8 py-3.5 rounded-lg bg-rosegold-500 hover:bg-rosegold-600 text-white font-semibold text-xs md:text-sm tracking-wider uppercase transition-all shadow-xl flex items-center space-x-2"
                >
                  <span>{t.founder.cta}</span>
                  <ChevronRight className="w-4 h-4 text-rosegold-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 06: THE THREE CULTURAL TRUSTS SHOWCASE */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-600 block mb-2">
              {t.trusts.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900">
              {t.trusts.heading}
            </h2>
            <AlpanaDivider className="my-3" />
            <p className="text-stone-600 text-sm md:text-base">
              {t.trusts.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {t.trusts.list.map((trust) => (
              <div
                key={trust.id}
                className="bg-white rounded-2xl overflow-hidden border border-rosegold-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="p-6 bg-gradient-to-r from-burgundy-900 to-burgundy-950 text-white">
                    <div className="flex items-center justify-between text-xs text-rosegold-300 font-medium mb-2">
                      <span className="uppercase tracking-widest">{trust.est}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-burgundy-800 border border-rosegold-500/40 text-[10px]">
                        Trust {trust.num}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-rosegold-100 leading-snug">
                      {trust.title}
                    </h3>
                    <p className="text-xs text-rosegold-300 font-light mt-1">
                      {trust.focus}
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                      {trust.desc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy-900 block">
                        Core Activities:
                      </span>
                      {trust.activities.slice(0, 3).map((act, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-stone-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-rosegold-500 mt-1.5 flex-shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setActiveTab('trustees')}
                    className="w-full py-2.5 rounded-lg border border-rosegold-300 hover:bg-rosegold-500 hover:text-white text-burgundy-900 text-xs font-semibold tracking-wider uppercase transition-all text-center flex items-center justify-center space-x-1.5"
                  >
                    <span>Explore Trust Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 07: IMMERSIVE GALLERY PREVIEW */}
      <section className="py-24 bg-[#F4ECE0]/50 border-t border-rosegold-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-rosegold-200">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rosegold-600 block mb-2">
                {t.gallery.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900">
                {t.gallery.heading}
              </h2>
              <p className="text-stone-600 text-sm md:text-base mt-2 max-w-xl">
                {t.gallery.desc}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('gallery')}
              className="mt-6 md:mt-0 px-6 py-3 rounded-lg bg-burgundy-900 hover:bg-burgundy-800 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow flex items-center space-x-2 self-start md:self-auto"
            >
              <span>Explore Full Gallery</span>
              <ChevronRight className="w-4 h-4 text-rosegold-300" />
            </button>
          </div>

          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.gallery.items.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer bg-black"
              >
                <img
                  src={item.type === 'video' ? (item.poster || '/images/SDP_0344.jpg') : item.src}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-108 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-widest text-rosegold-300 font-semibold mb-1">
                    {item.type === 'video' ? 'Video Archive' : 'Heritage Photograph'}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-rosegold-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-300 line-clamp-2 mt-1 font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 08: ROYAL BOOKING ENQUIRY CTA SECTION */}
      <section className="py-24 bg-burgundy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(184,125,101,0.2)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <AlpanaDivider light={true} />

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-rosegold-400 block">
            {t.rental.eyebrow}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
            Host Your Moments in Living Heritage
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-rosegold-200/90 font-light max-w-2xl mx-auto leading-relaxed">
            From traditional wedding ceremonies and period film shoots to acoustic classical soirees, Khelat Bhawan offers an authentic 19th-century royal Bengali sanctuary.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-10 py-4 rounded-lg bg-rosegold-500 hover:bg-rosegold-600 text-white font-semibold text-sm tracking-widest uppercase shadow-2xl transition-all flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-rosegold-200" />
              <span>Make a Booking Enquiry</span>
            </button>

            <button
              onClick={() => setActiveTab('rental')}
              className="w-full sm:w-auto px-8 py-4 rounded-lg border border-rosegold-400/60 hover:bg-burgundy-900 text-rosegold-200 font-semibold text-sm tracking-wider uppercase transition-all"
            >
              View Rental Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
