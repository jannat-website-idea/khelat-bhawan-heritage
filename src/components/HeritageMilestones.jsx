import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export default function HeritageMilestones({ lang, milestones, onExplore, onOpenImage }) {
  const bn = lang === 'bn';
  return <section className="heritage-archive" aria-labelledby="archive-heading">
    <header className="heritage-archive__heading">
      <p className="archive-label" data-reveal>{bn ? 'সময়ের যাত্রা' : 'Journey through time'}</p>
      <h2 id="archive-heading" data-line-reveal>
        <span className="reveal-line"><span>{bn ? 'ঐতিহ্যের প্রধান' : 'Key historical'}</span></span>
        <span className="reveal-line"><em>{bn ? 'অধ্যায়' : 'milestones'}</em></span>
      </h2>
    </header>
    <div className="heritage-archive__spread">
      {milestones.map((item, index) => <article className={`archive-entry archive-entry--${index + 1}`} key={item.year}>
        <span className="archive-entry__watermark" aria-hidden="true">{bn ? 'উত্তরাধিকার' : 'HERITAGE'}</span>
        <figure className="archive-entry__figure">
          <button className="archive-image" data-image-reveal onClick={() => onOpenImage(item.image, item.title, item.desc)} aria-label={bn ? `${item.title} — ছবি দেখুন` : `View image: ${item.title}`}>
            <img src={getAssetUrl(item.image)} alt={item.title} loading="lazy" />
          </button>
          <figcaption data-reveal><span>{item.year}</span><span>{bn ? 'খেলাৎ ভবন' : 'Khelat Bhawan'}</span></figcaption>
        </figure>
        <div className="archive-entry__copy" data-reveal>
          <span className="archive-entry__year">{item.year}</span>
          <h3>{item.title}</h3><p>{item.desc}</p>
        </div>
      </article>)}
    </div>
    <div className="heritage-archive__footer" data-reveal><span>{bn ? 'ঐতিহ্য ও উত্তরাধিকার' : 'Heritage & legacy'}</span><button onClick={onExplore}>{bn ? 'সম্পূর্ণ ঐতিহ্যের সময়রেখা' : 'View full heritage timeline'}<ArrowRight size={18} aria-hidden="true" /></button></div>
  </section>;
}
