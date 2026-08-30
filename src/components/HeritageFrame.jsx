import React from 'react';

function HorizontalPattern({ position }) {
  return (
    <svg className={`heritage-frame__band heritage-frame__band--${position}`} viewBox="0 0 1200 44" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={`folk-band-${position}`} width="48" height="44" patternUnits="userSpaceOnUse">
          <path d="M0 8h48M0 36h48M2 12l10 18 10-18 10 18 10-18M7 15l5 9 5-9m10 0 5 9 5-9M20 8l4 5 4-5M20 36l4-5 4 5" />
          <circle cx="2" cy="22" r="1.6" /><circle cx="46" cy="22" r="1.6" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="1200" height="44" fill={`url(#folk-band-${position})`} stroke="none" />
    </svg>
  );
}

function CornerOrnament({ corner }) {
  return (
    <svg className={`heritage-frame__corner heritage-frame__corner--${corner}`} viewBox="0 0 60 60" aria-hidden="true">
      <rect x="3" y="3" width="54" height="54" />
      <circle cx="30" cy="30" r="4" />
      <path d="M30 26C20 21 18 13 21 7c7 3 11 9 9 19Zm4 4c5-10 13-12 19-9-3 7-9 11-19 9Zm-4 4c10 5 12 13 9 19-7-3-11-9-9-19Zm-4-4c-5 10-13 12-19 9 3-7 9-11 19-9ZM8 8l10 10M52 8 42 18M8 52l10-10m34 10L42 42" />
    </svg>
  );
}

function Bird({ transform = '' }) {
  return <g transform={transform}><path d="M8 31c15-20 35-19 46-3 7-1 13-5 18-11-1 14-8 24-22 29-16 6-31 1-42-15Z" /><path d="M24 31c9-9 19-8 29 2-10 5-20 5-29-2Zm32-6 7-8 3 10m-42 20-3 11m15-10-1 12M17 58h11m2 2h12M12 29C6 26 3 22 2 17c8 2 14 5 18 10" /><circle cx="52" cy="26" r="1.8" /></g>;
}

function Fish({ transform = '' }) {
  return <g transform={transform}><path d="M8 31c15-24 42-26 60-4-18 24-44 25-60 4Zm60-4 13-12-2 17 2 17-13-14" /><circle cx="24" cy="28" r="2" /><path d="M31 19c7 8 7 17 0 25m8-29c8 10 8 22 0 33m8-31 9 8-8 8 8 8M18 42c8-5 17-5 27 1M18 19c9 5 18 5 27 0" /></g>;
}

function Drum({ transform = '' }) {
  return <g transform={transform}><ellipse cx="38" cy="12" rx="24" ry="8" /><path d="M14 12 20 62c11 7 24 7 36 0l6-50M20 62c12-5 24-5 36 0M20 18l36 38m-34-2 33-35M31 18l-6 39m19-39 7 39" /><ellipse cx="38" cy="12" rx="12" ry="4" /></g>;
}

function Kalash({ transform = '' }) {
  return <g transform={transform}><path d="M24 19h31m-28 0c-8 15-6 32 4 46h17c10-14 12-31 4-46M30 65h20M28 29h25M29 48h22M38 17c-6-10-5-16 2-20 5 8 4 15-2 20Zm4 0c5-10 11-13 18-10-2 7-8 11-18 10Zm-7 0c-5-9-11-12-17-8 3 6 8 9 17 8Zm-3 20 7-5 8 5-8 6-7-6Z" /></g>;
}

function FloralSprig({ transform = '' }) {
  return <g transform={transform}><path d="M36 112C27 85 31 55 38 8M35 92C23 84 16 74 13 62c12 2 20 10 22 23m1-13c13-7 21-17 24-30-13 3-21 11-24 24m1-17c-9-6-15-14-17-24 10 2 16 8 18 18m1-15c10-6 16-14 17-24-9 2-15 8-18 18M38 8c-8-7-8-14 0-21 8 7 8 14 0 21Z" /><circle cx="13" cy="62" r="2" /><circle cx="60" cy="42" r="2" /><circle cx="20" cy="25" r="2" /></g>;
}

function Flower({ transform = '' }) {
  return <g transform={transform}><circle cx="30" cy="30" r="4" /><path d="M30 26c-8-8-8-15 0-22 8 7 8 14 0 22Zm4 4c8-8 15-8 22 0-7 8-14 8-22 0Zm-4 4c8 8 8 15 0 22-8-7-8-14 0-22Zm-4-4c-8 8-15 8-22 0 7-8 14-8 22 0ZM12 12l8 8m28-8-8 8M12 48l8-8m28 8-8-8" /></g>;
}

function SideRail({ side }) {
  const isLeft = side === 'left';
  return (
    <svg className={`heritage-frame__side-art heritage-frame__side-art--${side}`} viewBox="0 0 94 800" aria-hidden="true">
      <path className="rail" d={isLeft ? 'M7 0v800M18 0v800M7 12l11 13L7 38l11 13L7 64l11 13L7 90l11 13L7 116' : 'M87 0v800M76 0v800M87 12 76 25l11 13-11 13 11 13-11 13 11 13-11 13'} />
      {isLeft ? <>
        <FloralSprig transform="translate(24 34) scale(.8)" />
        <Bird transform="translate(21 155) scale(.82) rotate(-5 35 30)" />
        <FloralSprig transform="translate(38 230) scale(.55)" />
        <Drum transform="translate(18 340) scale(.78) rotate(-15 38 35)" />
        <Flower transform="translate(35 427) scale(.52)" />
        <Fish transform="translate(17 493) scale(.82)" />
        <FloralSprig transform="translate(25 558) scale(.78)" />
        <Fish transform="translate(8 680) scale(.96) rotate(3 40 30)" />
        <Flower transform="translate(31 742) scale(.6)" />
      </> : <>
        <Kalash transform="translate(18 35) scale(.75)" />
        <FloralSprig transform="translate(26 116) scale(.78)" />
        <Bird transform="translate(13 236) scale(.88) rotate(6 35 30)" />
        <FloralSprig transform="translate(40 310) scale(.5)" />
        <Fish transform="translate(9 410) scale(.92)" />
        <FloralSprig transform="translate(23 470) scale(.78)" />
        <Drum transform="translate(20 598) scale(.72) rotate(8 38 35)" />
        <Flower transform="translate(28 682) scale(.72)" />
        <FloralSprig transform="translate(32 720) scale(.55)" />
      </>}
    </svg>
  );
}

export default function HeritageFrame() {
  return <div className="heritage-frame" aria-hidden="true">
    <div className="heritage-frame__outer" /><div className="heritage-frame__inner" />
    <HorizontalPattern position="top" /><HorizontalPattern position="bottom" />
    <SideRail side="left" /><SideRail side="right" />
    <CornerOrnament corner="tl" /><CornerOrnament corner="tr" /><CornerOrnament corner="bl" /><CornerOrnament corner="br" />
  </div>;
}
