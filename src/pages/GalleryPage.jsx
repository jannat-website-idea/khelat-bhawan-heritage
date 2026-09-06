import React, { useState, useMemo } from 'react';
import { Play, Maximize2, Calendar, User, Eye, Sparkles } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { galleryData } from '../data/galleryData';
import { getAssetUrl } from '../utils/assetHelper';

export default function GalleryPage({ lang, onOpenLightbox, content }) {
  const [filter, setFilter] = useState('all');

  const filterButtons = useMemo(() => [
    { 
      id: 'all', 
      label: lang === 'bn' ? 'সব সংকলন' : 'All Highlights',
      count: galleryData.length
    },
    { 
      id: 'heritage', 
      label: lang === 'bn' ? 'ঐতিহাসিক স্থাপত্য' : 'Heritage Architecture',
      count: galleryData.filter(i => i.category === 'heritage').length
    },
    { 
      id: 'puja', 
      label: lang === 'bn' ? 'পূজা ও আধ্যাত্মিকতা' : 'Puja Celebrations',
      count: galleryData.filter(i => i.category === 'puja').length
    },
    { 
      id: 'performance', 
      label: lang === 'bn' ? 'শাস্ত্রীয় সঙ্গীত ও নৃত্য' : 'Classical Arts & Music',
      count: galleryData.filter(i => i.category === 'performance').length
    },
    { 
      id: 'wedding', 
      label: lang === 'bn' ? 'সাবেকি বিবাহ ও ভেন্যু' : 'Heritage Venue',
      count: galleryData.filter(i => i.category === 'wedding').length
    },
    { 
      id: 'video', 
      label: lang === 'bn' ? 'ভিডিও ট্যুর' : 'Video Tour',
      count: galleryData.filter(i => i.type === 'video').length
    },
  ], [lang]);

  const displayedItems = useMemo(() => {
    if (filter === 'all') return galleryData;
    if (filter === 'video') return galleryData.filter(item => item.type === 'video');
    return galleryData.filter(item => item.category === filter);
  }, [filter]);

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        {/* Curated Client Demo Section Header */}
        <SectionHeader
          title={lang === 'bn' ? 'নির্বাচিত গ্যালারি' : 'Curated Gallery'}
          subtitle={lang === 'bn' 
            ? 'খেলাৎ ভবন রাজবাড়ির নির্বাচিত চিত্র-সংগ্রহ — ঐতিহাসিক স্থাপত্য, চিরন্তন ঐতিহ্য ও সাংস্কৃতিক পরিমণ্ডলের এক অনুপম নিদর্শন' 
            : 'A curated visual showcase of Khelat Bhavan Rajbari — signature architectural perspectives, sacred traditions, and cultural heritage'}
        />

        {/* Filter Tabs matching lovable.app style */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
          {filterButtons.map((btn) => {
            const isActive = filter === btn.id;

            return (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-4 sm:px-5 py-2 text-xs tracking-widest uppercase font-body border transition-all rounded-sm flex items-center gap-2 ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm font-semibold'
                    : 'bg-transparent text-foreground border-border hover:border-accent'
                }`}
              >
                <span>{btn.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-card text-muted-foreground'}`}>
                  {btn.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid Gallery */}
        <div className="bento-gallery">
          {displayedItems.map((item, index) => {
            const rawSrc = item.type === 'video' ? (item.poster || '/images/SDP_0344.jpg') : item.src;
            const finalSrc = getAssetUrl(rawSrc);
            
            // Dynamic Bento class mapping matching the architectural layout
            let bentoClass = 'bento-card--wide-2';
            if (displayedItems.length >= 5) {
              if (index === 0) bentoClass = 'bento-card--hero';
              else if (index === 1) bentoClass = 'bento-card--top-right';
              else if (index === 2) bentoClass = 'bento-card--square';
              else if (index === 3) bentoClass = 'bento-card--tall';
              else if (index === 4) bentoClass = 'bento-card--wide-bottom';
              else bentoClass = 'bento-card--wide-2';
            } else if (displayedItems.length === 3) {
              bentoClass = index === 0 ? 'bento-card--hero' : 'bento-card--wide-2';
            } else if (displayedItems.length <= 2) {
              bentoClass = 'bento-card--wide-2';
            }

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className={`bento-card ${bentoClass} group`}
              >
                {/* Media Image / Video Poster */}
                <img
                  src={finalSrc}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Video Play Badge if Video */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors z-10">
                    <div className="w-16 h-16 rounded-full bg-accent/90 border-2 border-white flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Category Pill on top left */}
                <div className="bento-card__badge">
                  {item.type === 'video' ? 'VIDEO TOUR' : item.category.toUpperCase()}
                </div>

                {/* Ambient Overlay & Typography */}
                <div className="bento-card__overlay">
                  <h3 className="bento-card__title">
                    {item.title}
                  </h3>
                  <p className="bento-card__desc">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
