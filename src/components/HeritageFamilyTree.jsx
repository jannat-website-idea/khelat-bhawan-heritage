import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, Sparkles, X } from 'lucide-react';
import { familyTreeData } from '../data/familyTreeData';
import { getAssetUrl } from '../utils/assetHelper';

const generations = [
  { gen: 1, tag: { en: '1ST GENERATION', bn: '১ম প্রজন্ম' }, role: { en: 'THE FOUNDER & PATRIARCH', bn: 'প্রতিষ্ঠাতা ও আদি পুরুষ' }, name: { en: 'Babu Khelat Chandra Ghosh', bn: 'বাবু খেলাৎ চন্দ্র ঘোষ' }, years: '1775 — 1845', summary: { en: 'Founded Khelat Bhawan and laid the foundation for a legacy of devotion, art and philanthropy.', bn: 'খেলাৎ ভবনের প্রতিষ্ঠা এবং ভক্তি, মার্গসঙ্গীত ও সমাজসেবার অমর ঐতিহ্যের ভিত্তিপ্রস্তর স্থাপন করেন।' }, image: '/images/babu_khelat_ghosh_bust.png' },
  { gen: 2, tag: { en: '2ND GENERATION', bn: '২য় প্রজন্ম' }, role: { en: 'RENAISSANCE STEWARDS', bn: 'নবজাগরণের ধারক' }, name: { en: 'Babu Mohim Chandra Ghosh', bn: 'বাবু মহিম চন্দ্র ঘোষ' }, years: '1845 — 1920', summary: { en: 'Expanded the estate, strengthened cultural patronage and institutionalized key traditions.', bn: 'সম্পত্তি ও ট্রাস্টের প্রসার, সংস্কৃতি ও মার্গসঙ্গীতের পৃষ্ঠপোষকতা এবং পারিবারিক দেবসেবা সুদৃঢ় করেন।' }, image: '/images/SDP_0305.jpg' },
  { gen: 3, tag: { en: '3RD GENERATION', bn: '৩য় প্রজন্ম' }, role: { en: 'CULTURAL PATRONS', bn: 'সংস্কৃতি অনুরাগী' }, name: { en: 'Babu Sarat Chandra Ghosh', bn: 'বাবু শরৎ চন্দ্র ঘোষ' }, years: '1920 — 1950', summary: { en: 'Nurtured the arts, supported classical music and maintained the architectural grandeur of Khelat Bhawan.', bn: 'বাংলার শিল্পকলা ও উচ্চাঙ্গ সঙ্গীতের পৃষ্ঠপোষকতা এবং প্রাসাদের স্থাপত্যের অনন্য সংরক্ষণ করেন।' }, image: '/images/SDP_0273.jpg' },
  { gen: 4, tag: { en: '4TH GENERATION', bn: '৪র্থ প্রজন্ম' }, role: { en: 'INSTITUTIONAL FOUNDERS', bn: 'প্রতিষ্ঠান ও ট্রাস্ট নির্মাতা' }, name: { en: 'Babu Khelat Ghosh Trustees', bn: 'বাবু খেলাৎ ঘোষ ট্রাস্টিগণ' }, years: '1950 — 1975', summary: { en: 'Formalized legal trusts to protect the estate, its properties and its continued service to society.', bn: 'পারিবারিক দেবসেবা, গৃহসম্পত্তি ও সমাজকল্যাণকে স্থায়ী করতে বিধিবদ্ধ ট্রাস্ট গঠন করেন।' }, image: '/images/SDP_0308.jpg' },
  { gen: 5, tag: { en: '5TH GENERATION', bn: '৫ম প্রজন্ম' }, role: { en: 'HERITAGE CONSERVATORS', bn: 'সংরক্ষণ ও সংস্কারক' }, name: { en: 'Siddhartha Ghosh', bn: 'সিদ্ধার্থ ঘোষ' }, years: '1975 — 1985', summary: { en: 'Restored the historic structure, supported the community and ensured continuity of the family values.', bn: 'ঐতিহাসিক প্রাসাদের বৃহৎ স্থাপত্য সংস্কার সম্পন্ন করেন এবং পরিবারের সাংস্কৃতিক ঐতিহ্যের ধারাবাহিকতা রক্ষা করেন।' }, image: '/images/SDP_0291.jpg' },
  { gen: 6, tag: { en: '6TH GENERATION', bn: '৬ষ্ঠ প্রজন্ম' }, role: { en: 'ARCHIVAL CUSTODIANS', bn: 'আর্কাইভ ও ট্রাস্ট বোর্ড' }, name: { en: 'Governing Trustees of Khelat Bhawan', bn: 'খেলাৎ ভবনের গভর্নিং ট্রাস্টি মণ্ডলী' }, years: '1985 — 2015', summary: { en: 'Initiated archives, opened the estate for heritage engagement and preserved centuries-old artefacts.', bn: 'আর্কাইভের সূচনা, হেরিটেজ পর্যটন ও শতবর্ষ প্রাচীন নথি-স্মারক সংরক্ষণ করেন।' }, image: '/images/SDP_0344.jpg' },
  { gen: 7, tag: { en: '7TH GENERATION', bn: '৭ম প্রজন্ম' }, role: { en: 'PRESENT GUARDIANS', bn: 'বর্তমান ও ভবিষ্যৎ অভিভাবক' }, name: { en: 'Current Custodians & Youth Council', bn: 'বর্তমান ট্রাস্টি ও উত্তরাধিকারী মণ্ডলী' }, years: '2015 — Present', summary: { en: 'Continuing the legacy through preservation, education, access and community engagement.', bn: 'টেকসই ঐতিহ্য সংরক্ষণ, শিক্ষা ও ভবিষ্যৎ প্রজন্মের মাঝে ঐতিহ্যকে বাঁচিয়ে রাখা।' }, image: '/images/SDP_0359.jpg' }
];

export default function HeritageFamilyTree({ lang = 'en', setActiveTab }) {
  const isBn = lang === 'bn';
  const [selectedGenIndex, setSelectedGenIndex] = useState(null);
  const selectedGen = selectedGenIndex === null ? null : familyTreeData[selectedGenIndex];
  const selectedEditorial = selectedGenIndex === null ? null : generations[selectedGenIndex];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedGenIndex(null);
      if (selectedGenIndex === null) return;
      if (event.key === 'ArrowLeft') setSelectedGenIndex((index) => Math.max(0, index - 1));
      if (event.key === 'ArrowRight') setSelectedGenIndex((index) => Math.min(generations.length - 1, index + 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGenIndex]);

  return (
    <section className="heritage-family-journey" aria-label={isBn ? 'খেলাৎ ভবনের সাত প্রজন্ম' : 'Seven generations of Khelat Bhawan'}>
      <div className="heritage-family-journey__backdrop" aria-hidden="true" />
      <header className="heritage-family-journey__header">
        <p><span />{isBn ? 'আমাদের উত্তরাধিকার' : 'OUR LEGACY'}<span /></p>
        <h2>{isBn ? 'সাত প্রজন্ম, এক চিরন্তন উত্তরাধিকার' : <>Seven Generations,<br /><em>One Enduring Legacy</em></>}</h2>
        <div>{isBn ? '১৭৫ বছরের দূরদৃষ্টি, অভিভাবকত্ব ও সাংস্কৃতিক ধারাবাহিকতার কাহিনি।' : 'A story of vision, stewardship and cultural continuity across 175 years.'}</div>
      </header>

      <div className="heritage-family-journey__path">
        <svg className="heritage-family-journey__line" viewBox="0 0 1000 2100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id="familyJourneyArrowhead" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
              <path className="heritage-family-journey__arrowhead" d="M1 1.5 L8 5 L1 8.5" />
            </marker>
          </defs>
          <path className="heritage-family-journey__arrow" d="M630 205 C690 205 735 228 765 285" />
          <path className="heritage-family-journey__arrow" d="M370 505 C310 505 265 528 235 585" />
          <path className="heritage-family-journey__arrow" d="M630 805 C690 805 735 828 765 885" />
          <path className="heritage-family-journey__arrow" d="M370 1105 C310 1105 265 1128 235 1185" />
          <path className="heritage-family-journey__arrow" d="M630 1405 C690 1405 735 1428 765 1485" />
          <path className="heritage-family-journey__arrow" d="M370 1705 C310 1705 265 1728 235 1785" />
        </svg>

        {generations.map((generation, index) => {
          const value = (field) => field[lang] || field.en;
          return (
            <button type="button" className={`heritage-family-node ${index % 2 ? 'is-right' : 'is-left'}`} style={{ '--generation-index': index }} key={generation.gen} onClick={() => setSelectedGenIndex(index)} aria-label={`${value(generation.tag)}: ${value(generation.name)}`}>
              <span className="heritage-family-node__portrait"><img src={getAssetUrl(generation.image)} alt="" loading="lazy" /></span>
              <span className="heritage-family-node__copy">
                <span className="heritage-family-node__generation">{value(generation.tag)}</span>
                <span className="heritage-family-node__role">{value(generation.role)}</span>
                <strong>{value(generation.name)}</strong>
                <span className="heritage-family-node__years">{generation.years}</span>
                <span className="heritage-family-node__summary">{value(generation.summary)}</span>
              </span>
            </button>
          );
        })}
      </div>

      <footer className="heritage-family-journey__footer"><span />{isBn ? 'উত্তরাধিকার বহমান' : 'THE LEGACY CONTINUES'}<span /></footer>

      {selectedGen && selectedEditorial && createPortal(
        <div className="heritage-family-dialog" role="presentation" onMouseDown={() => setSelectedGenIndex(null)}>
          <article className="heritage-family-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="heritage-family-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="heritage-family-dialog__close" onClick={() => setSelectedGenIndex(null)} aria-label={isBn ? 'পারিবারিক বংশতালিকায় ফিরে যান' : 'Back to family tree'}>
              <span>{isBn ? 'বংশতালিকায় ফিরুন' : 'Back to family tree'}</span>
              <X />
            </button>
            <div className="heritage-family-dialog__portrait"><img src={getAssetUrl(selectedEditorial.image)} alt="" /></div>
            <div className="heritage-family-dialog__content">
              <span className="heritage-family-dialog__label">{selectedEditorial.tag[lang] || selectedEditorial.tag.en}</span>
              <h3 id="heritage-family-dialog-title">{selectedEditorial.name[lang] || selectedEditorial.name.en}</h3>
              <p className="heritage-family-dialog__role">{selectedEditorial.role[lang] || selectedEditorial.role.en}</p>
              <p className="heritage-family-dialog__period"><Calendar />{selectedEditorial.years}</p>
              <p className="heritage-family-dialog__bio">{selectedGen.bio[lang] || selectedGen.bio.en}</p>
              <h4><Sparkles />{isBn ? 'ঐতিহাসিক অবদান' : 'Key heritage contributions'}</h4>
              <ul>{(selectedGen.contributions[lang] || selectedGen.contributions.en).map((item) => <li key={item}><CheckCircle2 />{item}</li>)}</ul>
              <div className="heritage-family-dialog__actions">
                <button type="button" disabled={selectedGenIndex === 0} onClick={() => setSelectedGenIndex((index) => index - 1)}><ChevronLeft />{isBn ? 'পূর্ববর্তী' : 'Previous'}</button>
                {selectedGen.gen === 1 && setActiveTab && <button type="button" onClick={() => { setSelectedGenIndex(null); setActiveTab('founder'); }}>{isBn ? 'প্রতিষ্ঠাতার জীবনী' : 'Founder biography'}<ExternalLink /></button>}
                {selectedGen.gen >= 4 && setActiveTab && <button type="button" onClick={() => { setSelectedGenIndex(null); setActiveTab('trustees'); }}>{isBn ? 'ট্রাস্ট ও ট্রাস্টি' : 'Trusts & trustees'}<ExternalLink /></button>}
                <button type="button" disabled={selectedGenIndex === generations.length - 1} onClick={() => setSelectedGenIndex((index) => index + 1)}>{isBn ? 'পরবর্তী' : 'Next'}<ChevronRight /></button>
              </div>
            </div>
          </article>
        </div>,
        document.body
      )}
    </section>
  );
}
