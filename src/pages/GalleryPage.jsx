import React, { useState } from 'react';
import { Camera, Video, Play, Sparkles, Filter, Maximize2 } from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';

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
    { id: 'all', label: t.gallery.filters.all },
    { id: 'puja', label: t.gallery.filters.puja },
    { id: 'arch', label: t.gallery.filters.arch },
    { id: 'culture', label: t.gallery.filters.culture },
    { id: 'video', label: t.gallery.filters.video },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5]">
      {/* Header */}
      <section className="py-16 bg-burgundy-950 text-white relative overflow-hidden border-b-2 border-rosegold-500/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,125,101,0.15)_0%,_transparent_75%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-900 border border-rosegold-400/50 text-rosegold-300 text-xs font-semibold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Heritage Archive</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.nav.gallery}
          </h1>

          <AlpanaDivider light={true} className="my-2" />

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-rosegold-200/90 font-light leading-relaxed">
            {t.gallery.desc}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {filterButtons.map((btn) => {
            const isActive = filter === btn.id;

            return (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center space-x-2 ${
                  isActive
                    ? 'bg-burgundy-900 text-white shadow-md border-2 border-rosegold-400'
                    : 'bg-white text-stone-700 border border-rosegold-200 hover:border-rosegold-400 hover:bg-rosegold-50'
                }`}
              >
                {btn.id === 'video' && <Video className="w-3.5 h-3.5 text-rosegold-500" />}
                <span>{btn.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-rosegold-500 text-white' : 'bg-stone-100 text-stone-600'}`}>
                  {btn.id === 'all' 
                    ? galleryItems.length 
                    : btn.id === 'video' 
                      ? galleryItems.filter(i => i.type === 'video').length 
                      : galleryItems.filter(i => i.category === btn.id).length
                  }
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="bg-white rounded-2xl overflow-hidden border border-rosegold-200/80 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col"
            >
              <div className="relative h-72 overflow-hidden bg-black">
                <img
                  src={item.type === 'video' ? (item.poster || '/images/SDP_0344.jpg') : item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                />

                {/* Video Play Indicator */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all">
                    <div className="w-16 h-16 rounded-full bg-rosegold-500/90 border-2 border-white flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-burgundy-950/80 text-rosegold-200 border border-rosegold-400/50 backdrop-blur-md">
                    {item.type === 'video' ? 'Video' : item.category.toUpperCase()}
                  </span>
                </div>

                {/* Fullscreen icon indicator on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-burgundy-900 group-hover:text-rosegold-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-rosegold-700 font-medium">
                  <span>View High-Res Media</span>
                  <span className="text-stone-400">Pathuria Ghata Ghosh Bari</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
