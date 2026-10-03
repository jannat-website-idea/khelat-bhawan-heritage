import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, Sparkles, X } from 'lucide-react';
import { familyTreeData } from '../data/familyTreeData';
import { getAssetUrl } from '../utils/assetHelper';

const generations = [
  { gen: 1, tag: { en: '1ST GENERATION', bn: '১ম প্রজন্ম' }, role: { en: 'FOUNDER', bn: 'প্রতিষ্ঠাতা' }, name: { en: 'Khelat Ghosh', bn: 'খেলাৎ ঘোষ' }, years: '1775 — 1845', summary: { en: 'The visionary founder who established Khelat Bhawan in 1845, laying the foundation for a cultural legacy that would span generations.', bn: 'দূরদর্শী প্রতিষ্ঠাতা যিনি ১৮৪৫ সালে খেলাৎ ভবন প্রতিষ্ঠা করে প্রজন্মব্যাপী সাংস্কৃতিক ঐতিহ্যের ভিত্তি স্থাপন করেন।' }, image: '/images/babu_khelat_ghosh_bust.png' },
  { gen: 2, tag: { en: '2ND GENERATION', bn: '২য় প্রজন্ম' }, role: { en: 'INHERITOR', bn: 'উত্তরাধিকারী' }, name: { en: 'Second Generation', bn: 'দ্বিতীয় প্রজন্ম' }, years: '1810 — 1880', summary: { en: 'Carried forward the legacy of Khelat Ghosh, establishing the Durga Puja tradition that continues to this day.', bn: 'খেলাৎ ঘোষের উত্তরাধিকার এগিয়ে নিয়ে যান এবং আজও চলমান দুর্গাপূজার ঐতিহ্য প্রতিষ্ঠা করেন।' }, image: '/images/SDP_0305.jpg' },
  { gen: 3, tag: { en: '3RD GENERATION', bn: '৩য় প্রজন্ম' }, role: { en: 'SPIRITUAL CUSTODIAN', bn: 'আধ্যাত্মিক অভিভাবক' }, name: { en: 'Third Generation', bn: 'তৃতীয় প্রজন্ম' }, years: '1845 — 1915', summary: { en: 'Welcomed Sri Ramakrishna Paramhansa to Khelat Bhawan in 1881, a visit that sanctified the premises forever.', bn: '১৮৮১ সালে শ্রীরামকৃষ্ণ পরমহংসদেবকে খেলাৎ ভবনে স্বাগত জানান; তাঁর আগমনে প্রাঙ্গণটি চিরপবিত্র হয়ে ওঠে।' }, image: '/images/SDP_0273.jpg' },
  { gen: 4, tag: { en: '4TH GENERATION', bn: '৪র্থ প্রজন্ম' }, role: { en: 'CULTURAL GUARDIAN', bn: 'সাংস্কৃতিক অভিভাবক' }, name: { en: 'Fourth Generation', bn: 'চতুর্থ প্রজন্ম' }, years: '1880 — 1950', summary: { en: 'Navigated the family heritage through changing times, establishing formal trusts to protect the legacy.', bn: 'পরিবর্তনশীল সময়ে পারিবারিক ঐতিহ্য রক্ষা করেন এবং উত্তরাধিকার সুরক্ষায় আনুষ্ঠানিক ট্রাস্ট প্রতিষ্ঠা করেন।' }, image: '/images/SDP_0308.jpg' },
  { gen: 5, tag: { en: '5TH GENERATION', bn: '৫ম প্রজন্ম' }, role: { en: 'MODERNIZER', bn: 'আধুনিকায়নের পথিকৃৎ' }, name: { en: 'Fifth Generation', bn: 'পঞ্চম প্রজন্ম' }, years: '1915 — 1985', summary: { en: 'Bridged traditional values with modern needs, expanding cultural activities while maintaining the heritage.', bn: 'ঐতিহ্যবাহী মূল্যবোধের সঙ্গে আধুনিক প্রয়োজনের সেতুবন্ধন গড়ে সাংস্কৃতিক কর্মকাণ্ড সম্প্রসারিত করেন।' }, image: '/images/SDP_0291.jpg' },
  { gen: 6, tag: { en: '6TH GENERATION', bn: '৬ষ্ঠ প্রজন্ম' }, role: { en: 'CONTEMPORARY CUSTODIAN', bn: 'সমকালীন অভিভাবক' }, name: { en: 'Sixth Generation', bn: 'ষষ্ঠ প্রজন্ম' }, years: '1950 — Present', summary: { en: 'Current custodians who balance preservation with accessibility, opening the heritage to wider appreciation.', bn: 'বর্তমান অভিভাবকেরা সংরক্ষণ ও প্রবেশাধিকারের ভারসাম্য বজায় রেখে ঐতিহ্যকে বৃহত্তর পরিসরে পরিচিত করছেন।' }, image: '/images/SDP_0344.jpg' },
  { gen: 7, tag: { en: '7TH GENERATION', bn: '৭ম প্রজন্ম' }, role: { en: 'FUTURE VISION', bn: 'ভবিষ্যৎ দৃষ্টিভঙ্গি' }, name: { en: 'Seventh Generation', bn: 'সপ্তম প্রজন্ম' }, years: '1985 — Present', summary: { en: 'The newest generation preparing to carry the legacy forward into the digital age while honoring traditions.', bn: 'নবীন প্রজন্ম ঐতিহ্যকে সম্মান জানিয়ে ডিজিটাল যুগে এই উত্তরাধিকার এগিয়ে নিয়ে যাওয়ার প্রস্তুতি নিচ্ছে।' }, image: '/images/SDP_0359.jpg' }
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
            <marker id="familyJourneyArrowhead" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto" markerUnits="strokeWidth">
              <path className="heritage-family-journey__arrowhead" d="M1 1 L9 5.5 L1 10 L3.4 5.5 Z" />
            </marker>
          </defs>
          <path className="heritage-family-journey__arrow" d="M300 225 C420 345 580 185 700 320" />
          <path className="heritage-family-journey__arrow" d="M700 525 C580 645 420 485 300 620" />
          <path className="heritage-family-journey__arrow" d="M300 825 C420 945 580 785 700 920" />
          <path className="heritage-family-journey__arrow" d="M700 1125 C580 1245 420 1085 300 1220" />
          <path className="heritage-family-journey__arrow" d="M300 1395 C420 1490 580 1355 700 1470" />
          <path className="heritage-family-journey__arrow" d="M700 1695 C580 1790 420 1655 300 1770" />
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
          <button
            type="button"
            className="heritage-family-dialog__side-nav is-previous"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={() => setSelectedGenIndex((index) => (index - 1 + generations.length) % generations.length)}
            aria-label={isBn ? 'পূর্ববর্তী প্রজন্ম দেখুন' : 'View previous generation'}
          >
            <ChevronLeft />
          </button>
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
              {setActiveTab && (selectedGen.gen === 1 || selectedGen.gen >= 4) && (
                <div className="heritage-family-dialog__actions">
                  {selectedGen.gen === 1 && <button type="button" onClick={() => { setSelectedGenIndex(null); setActiveTab('founder'); }}>{isBn ? 'প্রতিষ্ঠাতার জীবনী' : 'Founder biography'}<ExternalLink /></button>}
                  {selectedGen.gen >= 4 && <button type="button" onClick={() => { setSelectedGenIndex(null); setActiveTab('trustees'); }}>{isBn ? 'ট্রাস্ট ও ট্রাস্টি' : 'Trusts & trustees'}<ExternalLink /></button>}
                </div>
              )}
            </div>
          </article>
          <button
            type="button"
            className="heritage-family-dialog__side-nav is-next"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={() => setSelectedGenIndex((index) => (index + 1) % generations.length)}
            aria-label={isBn ? 'পরবর্তী প্রজন্ম দেখুন' : 'View next generation'}
          >
            <ChevronRight />
          </button>
        </div>,
        document.body
      )}
    </section>
  );
}
