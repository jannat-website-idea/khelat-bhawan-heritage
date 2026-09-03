import React from 'react';
import { ArrowRight, Crown } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export default function Chronicles({ lang, milestones, onExplore, onOpenImage }) {
  const bn = lang === 'bn';
  return <section className="chronicles" aria-labelledby="chronicles-heading">
    <header className="chronicles__heading">
      <Crown size={42} strokeWidth={1.3} aria-hidden="true" />
      <h2 id="chronicles-heading">{bn ? 'সময়ের ইতিবৃত্ত' : 'Chronicles of Time'}</h2>
      <span aria-hidden="true" />
    </header>
    <div className="chronicles__journey">
      {milestones.map((item, index) => <article className={`chronicles__chapter ${index % 2 ? 'chronicles__chapter--reverse' : ''}`} key={item.year}>
        <span className="chronicles__watermark" aria-hidden="true">{index % 2 ? (bn ? 'উত্তরাধিকার' : 'LEGACY') : (bn ? 'ঐতিহ্য' : 'HERITAGE')}</span>
        <button className="chronicles__image" onClick={() => onOpenImage(item.image, item.title, item.desc)} aria-label={bn ? `${item.title} — ছবি দেখুন` : `View image: ${item.title}`}>
          <img src={getAssetUrl(item.image)} alt={item.title} loading="lazy" />
        </button>
        <i className="chronicles__marker" aria-hidden="true" />
        <div className="chronicles__copy">
          <span className="chronicles__year">{item.year}</span>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      </article>)}
    </div>
    <button className="royal-outline-button" onClick={onExplore}>{bn ? 'সম্পূর্ণ ঐতিহ্যের সময়রেখা' : 'View full heritage timeline'}<ArrowRight size={18} aria-hidden="true" /></button>
  </section>;
}
