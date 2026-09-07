import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export default function HeritageMilestones({ lang, milestones, onExplore, onOpenImage, eyebrow, subtitle }) {
  const bn = lang === 'bn';
  const watermarkWords = bn
    ? ['সূচনা', 'ভক্তি', 'আশীর্বাদ', 'সংস্কৃতি', 'উত্তরাধিকার']
    : ['ORIGINS', 'DEVOTION', 'SANCTITY', 'CULTURE', 'LIVING'];
  return <section className="heritage-archive" aria-labelledby="archive-heading">
    <header className="heritage-archive__heading">
      <p className="archive-label" data-reveal>{eyebrow || (bn ? 'আমাদের ঐতিহ্যের সময়রেখা' : 'Our Legacy Timeline')}</p>
      <h2 id="archive-heading" data-line-reveal>
        <span className="reveal-line"><span>{bn ? 'ঐতিহ্যের প্রধান' : 'Key historical'}</span></span>
        <span className="reveal-line"><em>{bn ? 'অধ্যায়' : 'milestones'}</em></span>
      </h2>
      <p className="archive-subtitle" data-reveal>
        {subtitle || (bn
          ? '১৭৫+ বছরের সাংস্কৃতিক সংরক্ষণ, আধ্যাত্মিক ভক্তি এবং সমাজসেবার ঐতিহ্যময় পথচলা'
          : 'Journey through 175+ years of cultural preservation, spiritual devotion, and community service')}
      </p>
    </header>
    <div className="heritage-archive__spread">
      {milestones.map((item, index) => <article className={`archive-entry archive-entry--${index + 1}`} key={item.year}>
        <span className="archive-entry__watermark" aria-hidden="true">{watermarkWords[index] || (bn ? 'ঐতিহ্য' : 'LEGACY')}</span>
        <figure className="archive-entry__figure">
          <button className="archive-image" data-image-reveal onClick={() => onOpenImage(item.image, item.title, item.desc)} aria-label={bn ? `${item.title} — ছবি দেখুন` : `View image: ${item.title}`}>
            <img src={getAssetUrl(item.image)} alt={item.title} loading="lazy" />
          </button>
          <figcaption data-reveal><span>{item.year}</span><span>{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</span></figcaption>
        </figure>
        <div className="archive-entry__copy" data-reveal>
          <span className="archive-entry__year">{item.year}</span>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
          {item.highlight && (
            <div className="archive-entry__highlight">
              <p>{item.highlight}</p>
            </div>
          )}
        </div>
      </article>)}
    </div>
    <div className="heritage-archive__footer" data-reveal><span>{bn ? 'ঐতিহ্য ও উত্তরাধিকার' : 'Heritage & legacy'}</span><button onClick={onExplore}>{bn ? 'সম্পূর্ণ ঐতিহ্যের সময়রেখা' : 'View full heritage timeline'}<ArrowRight size={18} aria-hidden="true" /></button></div>
  </section>;
}
