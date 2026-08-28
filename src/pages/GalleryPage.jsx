import React, { useState } from 'react';
import { Play, Maximize2, Video } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

export default function GalleryPage({ lang, onOpenLightbox, content }) {
  const t = content[lang];
  const [filter, setFilter] = useState('all');

  const galleryItems = t.gallery.items;

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'video') return item.type === 'video';
    return item.category === filter;
  });

  const filterButtons = [
    { id: 'all', label: lang === 'bn' ? 'সব চিত্র ও ভিডিও' : 'All' },
    { id: 'puja', label: lang === 'bn' ? 'পূজা ও উৎসব' : 'Puja Celebrations' },
    { id: 'arch', label: lang === 'bn' ? 'ঐতিহাসিক স্থাপত্য' : 'Heritage Architecture' },
    { id: 'culture', label: lang === 'bn' ? 'শাস্ত্রীয় সঙ্গীত ও সংস্কৃতি' : 'Classical Arts & Music' },
    { id: 'video', label: lang === 'bn' ? 'ভিডিও ট্যুর' : 'Video Tour' },
  ];

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        {/* Lovable Reference Style Section Header */}
        <SectionHeader
          title={lang === 'bn' ? 'আমাদের গ্যালারি' : 'Our Gallery'}
          subtitle={lang === 'bn' 
            ? 'পাথুরিয়াঘাটা খেলাৎ ভবন রাজবাড়ির আভিজাত্য, সাবেকি পূজা ও জীবন্ত ঐতিহ্যের দৃশ্যপট' 
            : 'A glimpse into the grandeur of Khelat Bhavan Rajbari'}
        />

        {/* Filter Tabs matching lovable.app style */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterButtons.map((btn) => {
            const isActive = filter === btn.id;

            return (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-5 py-2 text-xs tracking-widest uppercase font-body border transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm font-semibold'
                    : 'bg-transparent text-foreground border-border hover:border-accent'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Grid matching lovable.app layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="relative group cursor-pointer overflow-hidden aspect-square rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 bg-black"
            >
              {/* Media Image / Video Poster */}
              <img
                src={item.type === 'video' ? (item.poster || '/images/SDP_0344.jpg') : item.src}
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

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300 flex items-end">
                {/* Slide-up Details */}
                <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full text-left">
                  <p className="font-serif text-primary-foreground text-lg md:text-xl font-semibold leading-tight">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-rose-gold text-xs font-body tracking-wider uppercase">
                      {item.type === 'video' ? (lang === 'bn' ? 'ভিডিও ট্যুর' : 'Video Tour') : item.category.toUpperCase()}
                    </p>
                    <span className="text-primary-foreground/60 text-[11px] font-body">
                      {lang === 'bn' ? 'পূর্ণাঙ্গ দৃশ্য' : 'View Full'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
