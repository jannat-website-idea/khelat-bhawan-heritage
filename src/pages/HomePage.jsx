import React, { useState, useEffect, useRef } from 'react';
import RoyalHero from '../components/RoyalHero';
import HeritageMilestones from '../components/HeritageMilestones';
import { ArrowRight, Star, ExternalLink, Play, Quote } from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';
import { getAssetUrl } from '../utils/assetHelper';
import { galleryData } from '../data/galleryData';

function AnimatedStat({ target, suffix = '', isBn = false, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animatedRef = useRef(false);

  const toBn = (n) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(n).replace(/\d/g, (d) => bnDigits[d]);
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animatedRef.current) {
        animatedRef.current = true;
        const startTime = performance.now();

        const step = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(2, -10 * progress);
          const currentCount = Math.round(easeOut * target);
          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setCount(target);
          }
        };

        requestAnimationFrame(step);
        observer.unobserve(node);
      }
    }, { threshold: 0.15 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <strong ref={ref} className="tabular-nums">
      {isBn ? toBn(count) : count}{suffix}
    </strong>
  );
}

export default function HomePage({ lang = 'en', setActiveTab, onOpenBooking, onOpenLightbox, content, ready }) {
  const t = content[lang];
  const isBn = lang === 'bn';
  const milestones = t.timelinePreview.items;
  const galleryPreview = galleryData.slice(0, 6);
  const reviews = t.reviews.items || [];

  const openImage = (src, title, desc = '') => onOpenLightbox({ type: 'image', src, title, desc });

  return (
    <main className="heritage-home">
      <RoyalHero lang={lang} setActiveTab={setActiveTab} ready={ready} />

      {/* Legacy Statistics Strip */}
      <section className="royal-legacy-strip" aria-label={isBn ? 'ঐতিহ্যের পরিচয়' : 'Heritage at a glance'}>
        <div className="royal-legacy-strip__intro">
          <h2>{isBn ? 'এক জীবন্ত উত্তরাধিকার' : 'A living legacy,'}<em>{isBn ? '১৮৪৫ সাল থেকে সযত্নে রক্ষিত' : 'held in trust since 1845'}</em></h2>
          <p>{isBn ? '১৭৫ বছরেরও বেশি সময় ধরে বাংলা সংস্কৃতি, সঙ্গীত ও ভক্তির ঐতিহ্য সংরক্ষণ করে চলেছে খেলাৎ ভবন।' : 'Khelat Bhawan—Pathuria Ghata Ghosh Bari—has preserved Bengal’s culture, music and devotion for more than 175 years.'}</p>
          <div>
            <button onClick={() => setActiveTab('trustees')}>{isBn ? 'ট্রাস্টের বিস্তারিত' : 'Trustee details'}<ArrowRight size={16} /></button>
            <button onClick={() => setActiveTab('timeline')}>{isBn ? 'ঐতিহ্যের সময়রেখা' : 'Heritage timeline'}<ArrowRight size={16} /></button>
          </div>
        </div>
        <div className="royal-legacy-strip__stats">
          <div>
            <AnimatedStat target={175} suffix="+" isBn={isBn} />
            <span>{isBn ? 'বছরের ঐতিহ্য' : 'Years of heritage'}</span>
          </div>
          <div>
            <AnimatedStat target={170} suffix="+" isBn={isBn} />
            <span>{isBn ? 'বছরের দুর্গাপূজা' : 'Years of Durga Puja'}</span>
          </div>
          <div>
            <AnimatedStat target={3} suffix="" isBn={isBn} />
            <span>{isBn ? 'সক্রিয় ট্রাস্ট' : 'Active trusts'}</span>
          </div>
        </div>
      </section>

      {/* Heritage Narrative Section */}
      <section id="home-legacy" className="heritage-story heritage-section">
        <div className="heritage-story__copy">
          <p className="heritage-kicker">{isBn ? 'ঐতিহ্য ও উত্তরাধিকার' : 'Heritage & legacy'}</p>
          <h2>
            {isBn ? '“এই বাড়ি শুধু ইট ও দেয়াল নয়—' : '“This house isn’t bricks and walls—'}
            <em>{isBn ? 'এটি বাংলার সাংস্কৃতিক আত্মা।”' : 'it is Bengal’s cultural soul.”'}</em>
          </h2>
          <AlpanaDivider className="heritage-story__divider" />
          <p>
            {isBn
              ? '১৮৪৫ সালে প্রতিষ্ঠিত খেলাৎ ভবন—পাথুরিয়াঘাটা ঘোষ বাড়ি নামেও পরিচিত—বাংলার সাংস্কৃতিক ঐতিহ্য ও আধ্যাত্মিক ভক্তির এক জীবন্ত সাক্ষ্য।'
              : 'Established in 1845, Khelat Bhawan—also known as Pathuria Ghata Ghosh Bari—stands as a living testament to Bengali cultural heritage and spiritual devotion.'}
          </p>
          <p>
            {isBn
              ? '১৮৮১ সালে শ্রী রামকৃষ্ণ পরমহংসের আগমন বাড়িটির আধ্যাত্মিক গুরুত্ব বাড়ায়। আজ তিনটি সক্রিয় ট্রাস্ট ধর্মীয় ভক্তি, শাস্ত্রীয় শিল্পকলা ও সমাজসেবার উত্তরাধিকার বহন করছে।'
              : 'Sri Ramakrishna Paramhansa visited the house in 1881, adding to its spiritual significance. Today, three active trusts carry forward its work in devotion, classical arts and community service.'}
          </p>
          <button className="editorial-link" onClick={() => setActiveTab('heritage')}>
            {isBn ? 'সম্পূর্ণ ঐতিহ্য জানুন' : 'Read the full heritage'}<ArrowRight />
          </button>
        </div>
        <button
          className="heritage-story__image heritage-arched-image"
          onClick={() => openImage('/images/SDP_0291.jpg', 'Khelat Bhawan courtyard')}
          aria-label="Open Khelat Bhawan courtyard image"
        >
          <img src={getAssetUrl('/images/SDP_0291.jpg')} alt="Illuminated courtyard arches at Khelat Bhawan" loading="lazy" />
          <span>{isBn ? 'পাথুরিয়াঘাটা ঘোষ বাড়ি' : 'Pathuria Ghata Ghosh Bari'}</span>
        </button>
      </section>

      {/* Item 3: Three Cultural Trust Cards with Full-Screen Span, Rounded Corners and Deep Luxury Shadows */}
      <section className="heritage-trusts-fullscreen heritage-pattern-field">
        <div className="max-w-[1550px] w-full mx-auto flex flex-col justify-between h-full">
          <div className="heritage-heading-row">
            <div>
              <p className="heritage-kicker">{isBn ? 'তত্ত্বাবধান' : 'Custodianship'}</p>
              <h2>{isBn ? 'আমাদের তিন সাংস্কৃতিক ট্রাস্ট' : 'Our three cultural trusts'}</h2>
            </div>
            <p>{isBn ? 'ভক্তি, শিল্প ও সেবার মাধ্যমে বাংলা ঐতিহ্য সংরক্ষণে তিনটি ট্রাস্ট একসঙ্গে কাজ করে।' : 'United in purpose and distinct in mission, three trusts preserve Bengali heritage through devotion, arts and service.'}</p>
          </div>
          
          <div className="heritage-trust-grid my-auto">
            {t.trusts.list.map((trust) => (
              <article
                key={trust.id}
                className="heritage-trust-card"
              >
                <div>
                  <div className="heritage-trust-card__top">
                    <span className="font-serif text-4xl text-primary font-bold">{trust.num}</span>
                    <small className="text-[10px] uppercase font-semibold tracking-widest text-muted-foreground">{trust.est}</small>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary mb-2 font-sans">{trust.focus}</p>
                  <h3 className="font-serif text-2xl lg:text-3xl text-foreground font-semibold mb-4 leading-tight">{trust.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed mb-4">{trust.desc}</p>
                </div>

                <div className="pt-4 border-t border-border/40 mt-auto">
                  <ul className="space-y-2">
                    {trust.activities.slice(0, 4).map((activity, idx) => (
                      <li key={idx} className="text-xs text-foreground/80 flex items-start gap-2">
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="heritage-button heritage-button--dark mx-auto" onClick={() => setActiveTab('trustees')}>
              {isBn ? 'ট্রাস্ট ও ট্রাস্টি দেখুন' : 'View trusts & trustees'}
            </button>
          </div>
        </div>
      </section>

      {/* Item 4: Key Milestones with Responsive Margins */}
      <HeritageMilestones
        lang={lang}
        milestones={milestones}
        onExplore={() => setActiveTab('timeline')}
        onOpenImage={openImage}
        eyebrow={t.timelinePreview.eyebrow}
        subtitle={t.timelinePreview.desc}
      />

      {/* Item 5: Durga Puja Segment with Atmospheric Faded Idol Background Overlay */}
      <section className="heritage-devotion relative overflow-hidden py-24 px-6 text-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-30 pointer-events-none scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${getAssetUrl('/images/unnamed_6.webp')})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/85 to-black/90 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="heritage-devotion__pattern heritage-devotion__pattern--top" aria-hidden="true" />
          <p className="heritage-kicker text-primary">{isBn ? 'ভক্তি ও ঐতিহ্য' : 'Sacred Devotion'}</p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#fff8eb] tracking-wide">
            {isBn ? '১৮৫৫ সাল থেকে অবিচ্ছিন্ন দুর্গাপূজা' : 'Durga Puja, unbroken since 1855'}
          </h2>
          <AlpanaDivider light />
          <p className="text-sm sm:text-base text-[#f0e6d2]/80 leading-relaxed font-sans">
            {isBn
              ? 'পাথুরিয়াঘাটা ঘোষ বাড়ির ঠাকুর দালানে ১৭১ বছর ধরে অবিচ্ছিন্ন নিষ্ঠায় অনুষ্ঠিত হচ্ছে ঐতিহ্যবাহী একচালা ডাকের সাজের দেবী দুর্গাপূজা ও নিত্য সেবা।'
              : 'For over 171 consecutive years, the sacred Thakur Dalan of Pathuria Ghata Ghosh Bari has witnessed unbroken traditional Durga Puja, sandhi puja, and community Prasad distribution.'}
          </p>
          <div className="pt-4">
            <button className="heritage-button heritage-button--gold" onClick={() => setActiveTab('events')}>
              {isBn ? 'পূজা ও উৎসব সূচি দেখুন' : 'Explore Festival & Puja Calendar'}
            </button>
          </div>
          <div className="heritage-devotion__pattern heritage-devotion__pattern--bottom" aria-hidden="true" />
        </div>
      </section>

      {/* Seven Generations Lineage Preview */}
      <section className="heritage-lineage heritage-section">
        <button className="heritage-lineage__image" onClick={() => openImage('/images/SDP_0359.jpg', 'Khelat Bhawan architectural archive')}>
          <img src={getAssetUrl('/images/SDP_0359.jpg')} alt="Architectural view of Khelat Bhawan" loading="lazy" />
        </button>
        <div>
          <p className="heritage-kicker">{isBn ? 'পারিবারিক আর্কাইভ' : 'The family archive'}</p>
          <h2>{isBn ? 'সাত প্রজন্মের তত্ত্বাবধান' : 'Seven generations of custodians'}</h2>
          <AlpanaDivider className="heritage-lineage__divider" />
          <p>{isBn ? 'বাবু খেলাৎ ঘোষ থেকে বর্তমান প্রজন্ম পর্যন্ত, পরিবারের সাত প্রজন্ম এই উত্তরাধিকার সংরক্ষণ করেছে।' : 'From Babu Khelat Chandra Ghosh to the present day, seven unbroken generations have carried the stewardship of this monumental estate.'}</p>
          <button className="editorial-link" onClick={() => setActiveTab('timeline')}>
            {isBn ? 'পারিবারিক বংশতালিকা ও সময়রেখা' : 'Explore Family Tree & Timeline'}<ArrowRight />
          </button>
        </div>
      </section>

      {/* Item 6: Modern Dynamic Luxury Masonry Gallery Spread */}
      <section className="heritage-gallery heritage-section">
        <div className="heritage-heading-row">
          <div>
            <p className="heritage-kicker">{isBn ? 'দৃশ্য-সংগ্রহ' : 'The visual archive'}</p>
            <h2>{isBn ? 'স্থাপত্য, ভক্তি ও সাংস্কৃতিক জীবন' : 'Architecture, devotion & cultural life'}</h2>
          </div>
          <button className="editorial-link" onClick={() => setActiveTab('gallery')}>
            {isBn ? 'সম্পূর্ণ গ্যালারি' : 'Explore the gallery'}<ArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryPreview.map((item, index) => {
            const rawSrc = item.type === 'video' ? (item.poster || '/images/SDP_0344.jpg') : item.src;
            const finalSrc = getAssetUrl(rawSrc);

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 cursor-pointer shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-500 ${
                  index === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={finalSrc}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                )}

                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-primary border border-primary/30">
                    {item.type === 'video' ? 'VIDEO TOUR' : item.category?.toUpperCase() || 'ARCHIVE'}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Item 7: 8 Verified Testimonials with Continuous Smooth Left-to-Right Marquee Scroll */}
      <section className="heritage-reviews py-20 bg-card/40 border-y border-border/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-2">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{isBn ? 'সত্যায়িত অভিজ্ঞতা' : 'Verified Google Reviews & Voices'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold">
              {isBn ? 'অতিথি ও বিশেষজ্ঞদের মতামত' : 'Guest Testimonials & Praise'}
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-background/80 px-5 py-3 rounded-2xl border border-border/80 shadow-md">
            <div className="text-center">
              <span className="font-serif text-2xl font-bold text-foreground">4.9</span>
              <span className="text-xs text-muted-foreground">/5.0</span>
            </div>
            <div className="h-8 w-px bg-border/60" />
            <div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <a
                href={t.reviews.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary font-medium hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>{isBn ? '১৫০+ গুগল রিভিউ' : '150+ Google Reviews'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Continuous Smooth Horizontal Ribbon Carousel */}
        <div className="testimonials-marquee-container py-4">
          <div className="testimonials-marquee-track">
            {/* Duplicated 8 items twice for continuous infinite loop */}
            {[...reviews, ...reviews].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[320px] sm:w-[380px] bg-background/90 rounded-2xl border border-border/70 p-6 shadow-xl flex flex-col justify-between shrink-0 hover:border-primary/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {item.category || 'Heritage'}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-semibold text-foreground mb-2 line-clamp-1">
                    “{item.title}”
                  </h4>

                  <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed line-clamp-4 mb-6">
                    {item.review}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                  <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-serif font-bold text-sm flex items-center justify-center border border-primary/30 shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <strong className="block text-xs font-semibold text-foreground truncate">{item.name}</strong>
                    <span className="block text-[10px] text-muted-foreground truncate">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 text-center">
          <a
            href={t.reviews.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wider uppercase hover:bg-primary/90 transition-all shadow-md"
          >
            <span>{isBn ? 'গুগলে সব পর্যালোচনা দেখুন' : 'Read All 150+ Reviews on Google'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Official Booking CTA Band */}
      <section className="heritage-booking">
        <img src={getAssetUrl('/images/SDP_0344.jpg')} alt="Khelat Bhawan courtyard" loading="lazy" />
        <div className="heritage-booking__wash" />
        <div className="heritage-booking__content">
          <p className="heritage-kicker">{isBn ? 'পরিদর্শন ও বুকিং' : 'Official Enquiries'}</p>
          <h2>{isBn ? 'এক ঐতিহাসিক পরিসরে আপনার বিশেষ আয়োজন' : 'Bring your occasion into a historic setting'}</h2>
          <p>{isBn ? 'বিবাহ, চলচ্চিত্রায়ন, ফটোগ্রাফি, এবং সাংস্কৃতিক ও বিশেষ অনুষ্ঠানের জন্য রিজার্ভেশন ও বুকিং করুন।' : 'Connect with us for heritage visits, film shoots, photography, weddings, and cultural programmes.'}</p>
          <button className="heritage-button heritage-button--gold" onClick={() => onOpenBooking()}>
            {isBn ? 'তারিখ রিজার্ভ করুন' : 'Book a Date'}
          </button>
        </div>
      </section>
    </main>
  );
}
