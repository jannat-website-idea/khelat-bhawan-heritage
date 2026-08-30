import React from 'react';

function HorizontalPattern({ position }) {
  return (
    <svg className={`heritage-frame__band heritage-frame__band--${position}`} viewBox="0 0 1200 44" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={`folk-band-${position}`} width="48" height="44" patternUnits="userSpaceOnUse">
          <path d="M0 8h48M0 36h48" />
          <path d="M2 12l10 18 10-18 10 18 10-18" />
          <path d="M7 15l5 9 5-9m10 0 5 9 5-9" />
          <circle cx="2" cy="22" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="46" cy="22" r="1.8" fill="currentColor" stroke="none" />
          <path d="M20 8l4 5 4-5M20 36l4-5 4 5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="1200" height="44" fill={`url(#folk-band-${position})`} />
    </svg>
  );
}

function CornerOrnament({ corner }) {
  return (
    <svg className={`heritage-frame__corner heritage-frame__corner--${corner}`} viewBox="0 0 60 60" aria-hidden="true">
      <rect x="3" y="3" width="54" height="54" />
      <circle cx="30" cy="30" r="5" fill="currentColor" />
      <path d="M30 26C20 21 18 13 21 7c7 3 11 9 9 19Zm4 4c5-10 13-12 19-9-3 7-9 11-19 9Zm-4 4c10 5 12 13 9 19-7-3-11-9-9-19Zm-4-4c-5 10-13 12-19 9 3-7 9-11 19-9Z" />
      <path d="M8 8l10 10M52 8 42 18M8 52l10-10m34 10L42 42" />
    </svg>
  );
}

function LeftFolkIllustration() {
  return (
    <svg className="heritage-frame__side-art heritage-frame__side-art--left" viewBox="0 0 82 800" aria-hidden="true">
      <path className="rail" d="M8 0v800M19 0v800M8 15l11 13L8 41l11 13L8 67l11 13L8 93l11 13L8 119" />
      <path d="M50 73c-19 20-20 44-4 64m4-64c17 11 24 28 19 50M47 89c-9 4-15 11-19 21m26-5c9 6 14 15 14 26" />
      <path d="M28 168c13-20 34-24 48-8-8 1-14 5-18 11 3 8 3 15 0 23-9-10-19-14-30-12l8-8-8-6Z" />
      <circle cx="63" cy="163" r="2.5" fill="currentColor" />
      <path d="M38 188c-3 20 1 38 13 52m0-31c-14 3-23 11-29 23m30-4c10 4 16 12 18 23" />
      <path d="M36 291c7-10 15-14 23-12 4 10 3 21-3 32-7 11-16 18-27 22 1-16 3-30 7-42Zm5 2c3 8 8 14 15 18m-18 0 14-15" />
      <path d="M24 384l11-18h26l12 18-5 43H29l-5-43Zm5 0h39m-34 2v36m9-36v36m10-36v36m10-36v36M28 371c9 6 15 6 20 0 6 6 12 6 19 0" />
      <path d="M39 463c15 4 25 14 30 30-16-2-27 4-35 18-8-12-10-25-5-38 4-7 7-10 10-10Zm-4 48c8 10 11 23 9 37m2-26c12-1 20 4 26 14" />
      <path d="M25 604c16-30 43-34 56-8-14 1-24 8-30 22-10 1-19-4-26-14Zm3 1c9 5 16 12 21 21m9-31 11 8-9 7" />
      <circle cx="68" cy="597" r="2.4" fill="currentColor" />
      <path d="M33 674c-11 19-10 39 2 60m0-60c15 9 22 22 22 40m-24-17c-10 2-17 8-22 17m27 2c11 3 19 11 24 22" />
      <path d="M26 759c13-10 27-10 40 0-9 8-12 18-10 29-10-4-20-4-30 0 3-11 3-21 0-29Z" />
    </svg>
  );
}

function RightFolkIllustration() {
  return (
    <svg className="heritage-frame__side-art heritage-frame__side-art--right" viewBox="0 0 82 800" aria-hidden="true">
      <path className="rail" d="M74 0v800M63 0v800M74 15 63 28l11 13-11 13 11 13-11 13 11 13-11 13" />
      <path d="M33 55c18 16 22 36 13 59m-13-59c-13 8-20 20-21 36m25-17c12 3 21 10 27 21m-28 4c-10 4-17 11-21 22" />
      <path d="M26 154c17-16 36-16 51 0l-8 6c5 13 2 28-8 44-5-8-11-12-18-12-7 0-13 4-18 12-9-16-12-31-7-44l8-6Zm5 7c3 14 10 21 20 21s17-7 20-21M35 169l7 7m14 0 7-7" />
      <circle cx="37" cy="163" r="2.5" fill="currentColor" /><circle cx="59" cy="163" r="2.5" fill="currentColor" />
      <path d="M47 242c-17 12-23 30-18 53m18-53c13 10 19 23 19 40m-28-15c-10 5-17 13-20 23m25 0c10 2 18 8 24 18" />
      <path d="M19 355c15-27 42-33 60-11-17 3-28 12-34 28-10 0-19-6-26-17Zm5-1c9 6 16 13 21 22m13-27 11 7-9 8" />
      <circle cx="67" cy="347" r="2.3" fill="currentColor" />
      <path d="M36 430c7-9 15-13 24-11 5 12 4 25-4 38-7 9-16 15-26 18 0-18 2-33 6-45Zm3 3c4 8 9 14 17 18m-17 2 15-16" />
      <path d="M23 520l9-15h33l10 15-5 44H28l-5-44Zm4 0h44m-34 2v37m10-37v37m10-37v37m10-37v37M32 505c8 7 14 7 20 0 5 7 10 7 16 0" />
      <path d="M49 610c-18 11-25 29-21 54m21-54c13 8 20 21 21 38m-29-14c-11 4-19 11-24 21m29 3c10 4 18 11 23 21" />
      <path d="M21 710c18-22 40-24 58-7-9 2-16 7-21 15 2 9 0 17-5 25-7-11-18-15-32-12l9-10-9-11Z" />
      <circle cx="65" cy="707" r="2.5" fill="currentColor" />
      <path d="M34 760c7-8 14-11 22-10 4 11 2 22-5 33-7 8-15 13-24 15 0-14 2-27 7-38Z" />
    </svg>
  );
}

export default function HeritageFrame() {
  return (
    <div className="heritage-frame" aria-hidden="true">
      <div className="heritage-frame__outer" />
      <div className="heritage-frame__inner" />
      <HorizontalPattern position="top" />
      <HorizontalPattern position="bottom" />
      <LeftFolkIllustration />
      <RightFolkIllustration />
      <CornerOrnament corner="tl" />
      <CornerOrnament corner="tr" />
      <CornerOrnament corner="bl" />
      <CornerOrnament corner="br" />
    </div>
  );
}
