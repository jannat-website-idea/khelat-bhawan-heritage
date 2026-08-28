import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronRight, Calendar, ArrowRight, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

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
      {/* 01: CINEMATIC HERO SECTION */}
      <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden gradient-heritage text-primary-foreground">
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
            className="w-full h-full object-cover opacity-50 scale-105 transform transition-transform duration-1000"
          />
          {/* Subtle Dark Radial Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/40" />
        </div>

        {/* Video Controls (Floating Top Right) */}
        <div className="absolute top-28 right-6 z-30 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-navy/80 hover:bg-navy text-primary-foreground border border-white/20 backdrop-blur-md transition-all shadow-md"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-navy/80 hover:bg-navy text-primary-foreground border border-white/20 backdrop-blur-md transition-all shadow-md"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-8">
          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-primary-foreground/30" />
            <span className="text-rose-gold text-xs tracking-[0.3em] uppercase font-body font-medium">❖</span>
            <div className="h-px w-12 bg-primary-foreground/30" />
          </div>

          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-rose-gold font-body font-semibold mb-4">
            {t.hero.subtitle}
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-primary-foreground leading-[1.05] mb-6">
            {lang === 'bn' ? 'খেলাৎ ভবন রাজবাড়ি' : 'Khelat Bhavan'}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-primary-foreground/80 font-body font-light leading-relaxed mb-10">
            {t.hero.tagline}
          </p>

          {/* CTAs matching Lovable style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-accent text-accent-foreground px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body font-semibold hover:bg-matte-red transition-colors rounded-sm shadow-md"
            >
              {lang === 'bn' ? 'বুকিং অনুসন্ধান' : 'Book Your Event'}
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className="w-full sm:w-auto border border-primary-foreground/40 text-primary-foreground px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-primary-foreground/10 transition-colors rounded-sm backdrop-blur-sm"
            >
              {lang === 'bn' ? 'গ্যালারি দেখুন' : 'Explore Gallery'}
            </button>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/15 text-left">
            {t.hero.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-sm bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="font-serif text-2xl md:text-3xl font-bold text-rose-gold">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-primary-foreground mt-1 font-body">
                  {stat.label}
                </div>
                <div className="text-[11px] text-primary-foreground/60 font-light mt-0.5 font-body">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02: EDITORIAL HERITAGE INTRODUCTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeader
            title={t.intro.heading}
            subtitle={t.intro.eyebrow}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto mt-12">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-sm overflow-hidden shadow-xl aspect-[4/3] bg-black">
                <img
                  src="/images/SDP_0344.jpg"
                  alt="Khelat Bhavan Courtyard"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onClick={() => onOpenLightbox({
                    type: 'image',
                    title: 'Grand Courtyard of Khelat Bhavan',
                    desc: 'The historic courtyard of Pathuria Ghata Ghosh Bari, established in 1845.',
                    src: '/images/SDP_0344.jpg'
                  })}
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 text-left">
              <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-body">
                {t.intro.p1}
              </p>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-body">
                {t.intro.p2}
              </p>

              <div className="p-5 rounded-sm bg-card border-l-2 border-accent">
                <p className="font-serif italic text-foreground text-base">
                  "{t.intro.statHighlight}"
                </p>
              </div>

              <div className="pt-2 flex gap-4">
                <button
                  onClick={() => setActiveTab('heritage')}
                  className="bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-foreground transition-colors rounded-sm flex items-center gap-2"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03: THREE PILLARS OF HERITAGE (TRUSTS) */}
      <section className="py-24 bg-card/40 border-y border-border/50">
        <div className="container mx-auto px-6">
          <SectionHeader
            title={t.trusts.heading}
            subtitle={t.trusts.desc}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.trusts.list.map((trust) => (
              <div
                key={trust.id}
                className="bg-background rounded-sm overflow-hidden border border-border hover:border-accent transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="h-56 overflow-hidden bg-black relative">
                    <img
                      src={trust.image}
                      alt={trust.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-navy/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider text-rose-gold font-body font-semibold rounded-sm">
                      {trust.est}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-body font-semibold block">
                      Trust {trust.num} · {trust.focus}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-foreground leading-snug">
                      {trust.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
                      {trust.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setActiveTab('trustees')}
                    className="w-full py-2.5 border border-border text-foreground text-xs tracking-widest uppercase font-body font-medium hover:border-accent hover:text-accent transition-colors rounded-sm"
                  >
                    View Trust Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04: HISTORICAL TIMELINE PREVIEW */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader
            title={t.timelinePreview.heading}
            subtitle={t.timelinePreview.desc}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            {t.timelinePreview.items.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="bg-card/60 p-6 rounded-sm border border-border hover:border-accent transition-all duration-300"
              >
                <span className="font-serif text-3xl font-bold text-accent block mb-2">
                  {item.year}
                </span>
                <div className="h-40 rounded-sm overflow-hidden mb-4 bg-black">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setActiveTab('timeline')}
              className="inline-block border border-foreground/20 text-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-foreground hover:text-background transition-colors rounded-sm"
            >
              {t.timelinePreview.viewFull}
            </button>
          </div>
        </div>
      </section>

      {/* 05: FOUNDER PREVIEW */}
      <section className="py-24 gradient-heritage text-primary-foreground">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 text-center">
              <div className="p-3 bg-white/5 rounded-sm border border-white/15 inline-block">
                <img
                  src={t.founder.image}
                  alt={t.founder.name}
                  className="w-full h-[400px] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left">
              <SectionHeader
                title={t.founder.name}
                subtitle={`${t.founder.years} · ${t.founder.tagline}`}
                light={true}
                className="text-left mb-6 !items-start"
              />

              <p className="text-primary-foreground/80 font-body text-sm md:text-base leading-relaxed font-light">
                {t.founder.bio1}
              </p>

              <p className="text-primary-foreground/70 font-body text-sm md:text-base leading-relaxed font-light">
                {t.founder.bio2}
              </p>

              <blockquote className="p-5 border-l-2 border-rose-gold bg-white/5 italic font-serif text-primary-foreground/90 text-base">
                "{t.founder.quote}"
              </blockquote>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('founder')}
                  className="bg-accent text-accent-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-semibold hover:bg-matte-red transition-colors rounded-sm"
                >
                  {t.founder.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06: GALLERY PREVIEW */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeader
            title={lang === 'bn' ? 'আমাদের গ্যালারি' : 'Our Gallery'}
            subtitle={lang === 'bn' ? 'খেলাৎ ভবন রাজবাড়ির দৃশ্যপট' : 'A glimpse into the grandeur of Khelat Bhavan Rajbari'}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto my-12">
            {t.gallery.items.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className="relative group cursor-pointer overflow-hidden aspect-square rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 bg-black"
              >
                <img
                  src={item.type === 'video' ? (item.poster || '/images/SDP_0344.jpg') : item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300 flex items-end">
                  <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full text-left">
                    <p className="font-serif text-primary-foreground text-lg font-semibold">
                      {item.title}
                    </p>
                    <p className="text-rose-gold text-xs font-body tracking-wider uppercase mt-1">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab('gallery')}
              className="inline-block border border-foreground/20 text-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-foreground hover:text-background transition-colors rounded-sm"
            >
              {lang === 'bn' ? 'সম্পূর্ণ গ্যালারি দেখুন' : 'View Full Gallery'}
            </button>
          </div>
        </div>
      </section>

      {/* 07: BOOKING ENQUIRY BANNER */}
      <section className="py-24 gradient-heritage text-primary-foreground text-center relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-3xl space-y-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-primary-foreground/30" />
            <span className="text-rose-gold text-xs tracking-[0.3em] uppercase font-body font-medium">❖</span>
            <div className="h-px w-12 bg-primary-foreground/30" />
          </div>

          <p className="text-xs tracking-[0.3em] uppercase text-rose-gold font-body font-semibold">
            {lang === 'bn' ? 'হেরিটেজ বুকিং' : 'Heritage Venue & Rental'}
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {lang === 'bn' ? 'ঐতিহাসিক পরিসরে আপনার বিশেষ আয়োজন' : 'Host Your Moments in Living Heritage'}
          </h2>

          <p className="text-primary-foreground/80 font-body text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto">
            {lang === 'bn' 
              ? 'বিবাহ অনুষ্ঠান, চলচ্চিত্র ও স্থিরচিত্র শুটিং, উচ্চাঙ্গ সঙ্গীত আসর এবং কর্পোরেট সম্মিলনীর জন্য খেলাৎ ভবন এক অনন্য রাজকীয় পটভূমি।' 
              : 'From traditional Bengali wedding ceremonies and period film shoots to acoustic classical baithaks, Khelat Bhavan offers an authentic 19th-century royal sanctuary.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="bg-accent text-accent-foreground px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body font-semibold hover:bg-matte-red transition-colors rounded-sm shadow-lg"
            >
              {lang === 'bn' ? 'বুকিং অনুসন্ধান পাঠান' : 'Book Your Event'}
            </button>

            <button
              onClick={() => setActiveTab('rental')}
              className="border border-primary-foreground/40 text-primary-foreground px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-white/10 transition-colors rounded-sm"
            >
              {lang === 'bn' ? 'ভাড়া সেবা দেখুন' : 'Explore Rental Services'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
