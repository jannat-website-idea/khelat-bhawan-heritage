import React, { useState, useMemo } from 'react';
import { Play, Maximize2, Calendar, User, Eye, Sparkles } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { galleryData } from '../data/galleryData';
import { getAssetUrl } from '../utils/assetHelper';

export default function GalleryPage({ lang, onOpenLightbox, content }) {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(24);

  const filterButtons = useMemo(() => [
    { 
      id: 'all', 
      label: lang === 'bn' ? 'সব চিত্র ও ভিডিও' : 'All',
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
      label: lang === 'bn' ? 'সাবেকি বিবাহ ও ভেন্যু' : 'Heritage Weddings',
      count: galleryData.filter(i => i.category === 'wedding').length
    },
    { 
      id: 'video', 
      label: lang === 'bn' ? 'ভিডিও ট্যুর' : 'Video Tour',
      count: galleryData.filter(i => i.type === 'video').length
    },
  ], [lang]);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return galleryData;
    if (filter === 'video') return galleryData.filter(item => item.type === 'video');
    return galleryData.filter(item => item.category === filter);
  }, [filter]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        {/* Lovable Reference Style Section Header */}
        <SectionHeader
          title={lang === 'bn' ? 'আমাদের গ্যালারি' : 'Our Gallery'}
          subtitle={lang === 'bn' 
            ? 'খেলাৎ ভবন রাজবাড়ির সম্পূর্ণ অফিশিয়াল আর্কাইভ — স্থাপত্য, সাবেকি পূজা, উচ্চাঙ্গ সঙ্গীত ও রাজকীয় উৎসবের ৭২টি অমূল্য চিত্র ও ভিডিও' 
            : 'The official visual chronicle of Khelat Bhavan Rajbari — 72 high-resolution archival images and video showcasing 175+ years of living heritage'}
        />

        {/* Filter Tabs matching lovable.app style */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
          {filterButtons.map((btn) => {
            const isActive = filter === btn.id;

            return (
              <button
                key={btn.id}
                onClick={() => {
                  setFilter(btn.id);
                  setVisibleCount(24);
                }}
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

        {/* Grid matching lovable.app layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayedItems.map((item) => {
            const rawSrc = item.type === 'video' ? (item.poster || '/images/SDP_0344.jpg') : item.src;
            const finalSrc = getAssetUrl(rawSrc);

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className="relative group cursor-pointer overflow-hidden aspect-square rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 bg-black"
              >
                {/* Media Image / Video Poster */}
                <img
                  src={finalSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Video Play Badge if Video */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-accent/90 border-2 border-white flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Category Pill on top left */}
                <div className="absolute top-3 left-3 bg-navy-deep/80 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-wider uppercase text-rose-gold font-body font-semibold rounded-sm border border-white/10 opacity-90 group-hover:opacity-100">
                  {item.type === 'video' ? 'VIDEO TOUR' : item.category.toUpperCase()}
                </div>

                {/* Hover Dark Overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300 flex items-end">
                  {/* Slide-up Details */}
                  <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full text-left bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="font-serif text-primary-foreground text-lg md:text-xl font-semibold leading-snug">
                      {item.title}
                    </p>
                    <p className="text-primary-foreground/75 text-xs font-body line-clamp-2 mt-1">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-[11px] text-rose-gold font-body">
                      <span>{item.date}</span>
                      <span className="text-primary-foreground/70 uppercase tracking-wider text-[10px]">
                        {lang === 'bn' ? 'পূর্ণাঙ্গ চিত্র' : 'View High-Res'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredItems.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 24)}
              className="border border-border text-foreground hover:border-accent hover:text-accent px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-semibold transition-colors rounded-sm bg-card"
            >
              {lang === 'bn' ? `আরও চিত্র দেখুন (${filteredItems.length - visibleCount}টি বাকি)` : `Load More Images (${filteredItems.length - visibleCount} remaining)`}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
