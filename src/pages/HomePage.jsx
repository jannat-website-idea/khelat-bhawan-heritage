import React from 'react';
import { ArrowRight } from 'lucide-react';
import AlpanaDivider from '../components/AlpanaDivider';
import { getAssetUrl } from '../utils/assetHelper';
import { galleryData } from '../data/galleryData';

export default function HomePage({ lang, setActiveTab, onOpenBooking, onOpenLightbox, content }) {
  const t = content[lang];
  const isBn = lang === 'bn';
  const milestones = t.timelinePreview.items.slice(0, 3);
  const galleryPreview = galleryData.filter((item) => item.type === 'image').slice(0, 5);

  const openImage = (src, title, desc = '') => onOpenLightbox({ type: 'image', src, title, desc });

  return (
    <main className="heritage-home">
      <section className="heritage-hero">
        <div className="heritage-hero__frame">
          <img
            src={getAssetUrl('/images/SDP_0344.jpg')}
            alt="Khelat Bhawan heritage façade"
            className="heritage-hero__image"
            loading="eager"
            fetchPriority="high"
          />
          <div className="heritage-hero__wash" />

          <div className="heritage-hero__content">
            <p className="heritage-hero__eyebrow">
              {isBn ? 'প্রতিষ্ঠিত ১৮৪৫ · ৪৭ পাথুরিয়াঘাটা স্ট্রিট, কলকাতা' : 'Est. 1845 · 47 Pathuria Ghata Street, Kolkata'}
            </p>
            <h1>
              {isBn ? 'এক জীবন্ত উত্তরাধিকার' : 'A living legacy,'}
              <em>{isBn ? '১৮৪৫ সাল থেকে সযত্নে রক্ষিত' : 'held in trust since 1845'}</em>
            </h1>
            <p className="heritage-hero__lead">
              {isBn
                ? '১৭৫ বছরেরও বেশি সময় ধরে বাংলা সংস্কৃতি, সঙ্গীত ও ভক্তির ঐতিহ্য সংরক্ষণ করে চলেছে খেলাৎ ভবন।'
                : 'Khelat Bhawan—Pathuria Ghata Ghosh Bari—has preserved Bengal’s culture, music and devotion for more than 175 years.'}
            </p>
            <div className="heritage-hero__actions">
              <button onClick={() => setActiveTab('trustees')} className="heritage-button heritage-button--gold">
                {isBn ? 'ট্রাস্টের বিস্তারিত' : 'Trustee details'}
              </button>
              <button onClick={() => setActiveTab('timeline')} className="heritage-button heritage-button--line">
                {isBn ? 'ঐতিহ্যের সময়রেখা' : 'Heritage timeline'}
              </button>
            </div>
          </div>

          <div className="heritage-hero__stats" aria-label={isBn ? 'ঐতিহ্যের মূল পরিসংখ্যান' : 'Key heritage figures'}>
            <div><strong>175+</strong><span>{isBn ? 'বছরের ঐতিহ্য' : 'Years of heritage'}</span></div>
            <div><strong>170+</strong><span>{isBn ? 'বছরের দুর্গাপূজা' : 'Years of Durga Puja'}</span></div>
            <div><strong>3</strong><span>{isBn ? 'সক্রিয় ট্রাস্ট' : 'Active trusts'}</span></div>
          </div>
        </div>
      </section>

      <section className="heritage-story heritage-section">
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

      <section className="heritage-trusts heritage-section heritage-pattern-field">
        <div className="heritage-heading-row">
          <div>
            <p className="heritage-kicker">{isBn ? 'তত্ত্বাবধান' : 'Custodianship'}</p>
            <h2>{isBn ? 'আমাদের তিন সাংস্কৃতিক ট্রাস্ট' : 'Our three cultural trusts'}</h2>
          </div>
          <p>{isBn ? 'ভক্তি, শিল্প ও সেবার মাধ্যমে বাংলা ঐতিহ্য সংরক্ষণে তিনটি ট্রাস্ট একসঙ্গে কাজ করে।' : 'United in purpose and distinct in mission, three trusts preserve Bengali heritage through devotion, arts and service.'}</p>
        </div>
        <div className="heritage-trust-grid">
          {t.trusts.list.map((trust) => (
            <article key={trust.id} className="heritage-trust-card">
              <div className="heritage-trust-card__top"><span>{trust.num}</span><small>{trust.est}</small></div>
              <p className="heritage-kicker">{trust.focus}</p>
              <h3>{trust.title}</h3>
              <p>{trust.desc}</p>
              <ul>{trust.activities.slice(0, 4).map((activity) => <li key={activity}>{activity}</li>)}</ul>
            </article>
          ))}
        </div>
        <button className="heritage-button heritage-button--dark" onClick={() => setActiveTab('trustees')}>
          {isBn ? 'ট্রাস্ট ও ট্রাস্টি দেখুন' : 'View trusts & trustees'}
        </button>
      </section>

      <section className="heritage-timeline-band">
        <div className="heritage-timeline-band__motif" aria-hidden="true" />
        <div className="heritage-section">
          <div className="heritage-heading-row heritage-heading-row--light">
            <div><p className="heritage-kicker">{isBn ? 'সময়ের যাত্রা' : 'Journey through time'}</p><h2>{isBn ? 'ঐতিহ্যের প্রধান অধ্যায়' : 'Defining chapters of the legacy'}</h2></div>
            <button className="editorial-link editorial-link--light" onClick={() => setActiveTab('timeline')}>{isBn ? 'সম্পূর্ণ সময়রেখা' : 'Full heritage timeline'}<ArrowRight /></button>
          </div>
          <div className="heritage-timeline-preview">
            {milestones.map((item, index) => (
              <article key={item.year}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.year}</strong>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="heritage-devotion">
        <div className="heritage-devotion__pattern heritage-devotion__pattern--top" aria-hidden="true" />
        <p className="heritage-kicker">{isBn ? 'ভক্তি' : 'Devotion'}</p>
        <h2>{isBn ? '১৮৫৫ সাল থেকে অবিচ্ছিন্ন দুর্গাপূজা' : 'Durga Puja, unbroken since 1855'}</h2>
        <AlpanaDivider light />
        <p>{isBn ? 'প্রজন্মের পর প্রজন্ম ধরে ভক্তি ও ঐতিহ্যবাহী আচার সংরক্ষিত হয়ে চলেছে।' : 'A sacred annual tradition carried forward with devotion across generations.'}</p>
        <button className="heritage-button heritage-button--gold" onClick={() => setActiveTab('heritage')}>{isBn ? 'ঐতিহ্য জানুন' : 'Explore the tradition'}</button>
        <div className="heritage-devotion__pattern heritage-devotion__pattern--bottom" aria-hidden="true" />
      </section>

      <section className="heritage-lineage heritage-section">
        <button className="heritage-lineage__image" onClick={() => openImage('/images/SDP_0359.jpg', 'Khelat Bhawan architectural archive')}>
          <img src={getAssetUrl('/images/SDP_0359.jpg')} alt="Architectural view of Khelat Bhawan" loading="lazy" />
        </button>
        <div>
          <p className="heritage-kicker">{isBn ? 'পারিবারিক আর্কাইভ' : 'The family archive'}</p>
          <h2>{isBn ? 'সাত প্রজন্মের তত্ত্বাবধান' : 'Seven generations of custodians'}</h2>
          <AlpanaDivider className="heritage-lineage__divider" />
          <p>{isBn ? 'Khelat Ghosh থেকে বর্তমান প্রজন্ম পর্যন্ত, পরিবারের সাত প্রজন্ম এই উত্তরাধিকার সংরক্ষণ করেছে। অপ্রকাশিত নাম বা প্রতিকৃতি অনুমান করা হয়নি।' : 'From Khelat Ghosh to the present generation, seven generations have carried the responsibility of preserving this heritage. Unpublished names and portraits remain respectfully unstated.'}</p>
          <button className="editorial-link" onClick={() => setActiveTab('heritage')}>{isBn ? 'পারিবারিক উত্তরাধিকার দেখুন' : 'Explore the family lineage'}<ArrowRight /></button>
        </div>
      </section>

      <section className="heritage-gallery heritage-section">
        <div className="heritage-heading-row">
          <div><p className="heritage-kicker">{isBn ? 'দৃশ্য-সংগ্রহ' : 'The visual archive'}</p><h2>{isBn ? 'স্থাপত্য, ভক্তি ও সাংস্কৃতিক জীবন' : 'Architecture, devotion & cultural life'}</h2></div>
          <button className="editorial-link" onClick={() => setActiveTab('gallery')}>{isBn ? 'সম্পূর্ণ গ্যালারি' : 'Explore the gallery'}<ArrowRight /></button>
        </div>
        <div className="heritage-gallery__grid">
          {galleryPreview.map((item, index) => (
            <button key={item.id} className={`heritage-gallery__item heritage-gallery__item--${index + 1}`} onClick={() => onOpenLightbox(item)}>
              <img src={getAssetUrl(item.src)} alt={item.title} loading="lazy" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="heritage-booking">
        <img src={getAssetUrl('/images/SDP_0344.jpg')} alt="Khelat Bhawan courtyard" loading="lazy" />
        <div className="heritage-booking__wash" />
        <div className="heritage-booking__content">
          <p className="heritage-kicker">{isBn ? 'পরিদর্শন ও যোগাযোগ' : 'Official Enquiries'}</p>
          <h2>{isBn ? 'এক ঐতিহাসিক পরিসরে আপনার বিশেষ আয়োজন' : 'Bring your occasion into a historic setting'}</h2>
          <p>{isBn ? 'বিবাহ, কমার্শিয়াল ব্র্যান্ডিং, ফটোগ্রাফি ও চলচ্চিত্রায়ন, এবং সাংস্কৃতিক অনুষ্ঠানের জন্য যোগাযোগ করুন।' : 'Connect with us for heritage visits, photography, film shoots, commercial branding, and cultural programmes.'}</p>
          <button className="heritage-button heritage-button--gold" onClick={() => setActiveTab('contact')}>{isBn ? 'যোগাযোগ করুন' : 'Contact Us'}</button>
        </div>
      </section>
    </main>
  );
}
