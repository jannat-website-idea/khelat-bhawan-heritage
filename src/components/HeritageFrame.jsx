import React from 'react';

function PatternBand({ position }) {
  const id = `heritage-weave-${position}`;
  return (
    <svg className={`heritage-frame__band heritage-frame__band--${position}`} viewBox="0 0 1400 58" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={id} width="64" height="58" patternUnits="userSpaceOnUse">
          <path d="M0 8h64M0 50h64M0 16l8 25 8-25 8 25 8-25 8 25 8-25 8 25 8-25" />
          <path d="M4 17l4 12 4-12m8 0 4 12 4-12m8 0 4 12 4-12m8 0 4 12 4-12" />
          <path d="M4 45h56M8 9l6 6m8-6 6 6m8-6 6 6m8-6 6 6" />
          <circle cx="4" cy="35" r="2.2" /><circle cx="20" cy="35" r="2.2" /><circle cx="36" cy="35" r="2.2" /><circle cx="52" cy="35" r="2.2" />
        </pattern>
      </defs>
      <rect width="1400" height="58" fill={`url(#${id})`} />
    </svg>
  );
}

function Corner({ corner }) {
  return (
    <svg className={`heritage-frame__corner heritage-frame__corner--${corner}`} viewBox="0 0 72 72" aria-hidden="true">
      <rect x="3" y="3" width="66" height="66" />
      <rect x="9" y="9" width="54" height="54" />
      <circle cx="36" cy="36" r="5" className="folk-solid" />
      <path className="folk-solid" d="M36 30C23 26 19 17 22 9c10 3 16 10 14 21Zm6 6c4-13 13-18 21-15-2 10-9 16-21 15Zm-6 6c13 4 18 13 15 21-10-2-16-9-15-21Zm-6-6c-4 13-13 18-21 15 2-10 9-16 21-15Z" />
      <path d="M12 12l12 12M60 12 48 24M12 60l12-12m36 12L48 48" />
    </svg>
  );
}

function Leaf({ x, y, scale = 1, flip = false }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}><path className="folk-solid" d="M0 0C9-19 27-22 38-8 29 7 13 10 0 0Z" /><path className="folk-cut" d="M4-1c11-3 20-5 30-9" /></g>;
}

function Flower({ x, y, scale = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}><circle cx="0" cy="0" r="4" className="folk-solid" /><path className="folk-solid" d="M0-5c-9-7-9-15 0-22 9 7 9 15 0 22Zm5 5c7-9 15-9 22 0-7 9-15 9-22 0Zm-5 5c9 7 9 15 0 22-9-7-9-15 0-22Zm-5-5c-7 9-15 9-22 0 7-9 15-9 22 0Z" /></g>;
}

function Bird({ x, y, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path className="folk-solid" d="M2 30C18 4 48 1 64 23c10-2 19-8 27-18-1 20-10 34-30 42C36 57 14 49 2 30Z" />
      <path className="folk-cut" d="M23 29c12-14 27-13 40 1-13 8-27 8-40-1Zm42-10 13-9 2 14M20 47l-4 15m22-12-1 15M10 28C2 24-3 17-5 8c12 3 21 9 27 17" />
      <circle cx="62" cy="20" r="2.4" className="folk-cut-fill" />
      <path className="folk-cut" d="M13 64h15m1 2h17" />
    </g>
  );
}

function Fish({ x, y, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path className="folk-solid" d="M0 30C20-1 57-4 82 25 59 58 22 60 0 30Zm82-5 20-18-4 23 4 23-20-18Z" />
      <circle cx="23" cy="25" r="3" className="folk-cut-fill" />
      <path className="folk-cut" d="M34 10c10 12 10 28 0 41m13-45c12 15 12 34 0 50m9-43 13 11-12 11 12 11M18 45c12-7 26-7 40 1M18 13c13 7 27 7 40 0" />
    </g>
  );
}

function Drum({ x, y, scale = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path className="folk-solid" d="M6 7C8-2 57-2 60 7l-7 63c-15 9-28 9-41 0L6 7Z" />
      <ellipse cx="33" cy="7" rx="27" ry="9" className="folk-cut-fill" />
      <ellipse cx="33" cy="7" rx="15" ry="5" className="folk-solid" />
      <path className="folk-cut" d="M12 19 53 61M14 61 54 18M24 18l-7 45m25-45 7 45" />
    </g>
  );
}

function Kalash({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path className="folk-solid" d="M7 22h57C49 42 55 61 61 77 47 89 26 89 11 77c8-20 12-38-4-55Z" />
      <path className="folk-cut" d="M13 33h46M12 62h48M20 48l16-10 17 10-17 11-16-11Z" />
      <path className="folk-solid" d="M32 21C21 8 24-2 35-11c8 13 8 23-3 32Zm7 0C47 5 59 2 69 8c-6 11-16 15-30 13Zm-13 0C17 7 6 4-4 11c7 10 16 13 30 10Z" />
    </g>
  );
}

function LeftFolkPanel() {
  return (
    <svg className="heritage-frame__side-art heritage-frame__side-art--left" viewBox="0 0 130 820" aria-hidden="true">
      <path className="folk-vine" d="M91 18C43 73 91 118 53 169S82 271 42 330s35 106 2 167 21 108-3 165 10 103 48 140" />
      <Flower x="89" y="28" scale=".7" />
      <Leaf x="66" y="79" scale=".7" /><Leaf x="79" y="111" scale=".55" flip />
      <Bird x="23" y="148" scale=".9" />
      <Leaf x="48" y="247" scale=".65" flip /><Leaf x="67" y="276" scale=".56" />
      <Drum x="25" y="325" scale="1.02" rotate="-14" />
      <Flower x="83" y="421" scale=".47" />
      <Fish x="16" y="463" scale=".92" />
      <Leaf x="58" y="554" scale=".62" flip />
      <Fish x="8" y="603" scale="1.06" />
      <Leaf x="51" y="699" scale=".72" /><Leaf x="81" y="731" scale=".58" flip />
      <path className="folk-botanical" d="M38 793c5-38 23-64 55-78m-49 57c-15-3-26-12-33-27 17-2 29 5 36 20m15-20c4-17 14-28 30-34 2 16-6 29-25 38" />
    </svg>
  );
}

function RightFolkPanel() {
  return (
    <svg className="heritage-frame__side-art heritage-frame__side-art--right" viewBox="0 0 130 820" aria-hidden="true">
      <path className="folk-vine" d="M39 20c46 55 3 103 40 153s-28 100 9 161-31 104 3 163-28 107 4 165-13 104-53 139" />
      <Kalash x="39" y="25" scale=".72" />
      <Leaf x="74" y="129" scale=".66" flip /><Leaf x="54" y="160" scale=".5" />
      <Bird x="103" y="199" scale=".86" flip />
      <Leaf x="66" y="292" scale=".66" /><Flower x="43" y="337" scale=".48" />
      <Fish x="111" y="382" scale=".92" flip />
      <Leaf x="71" y="470" scale=".6" flip /><Leaf x="53" y="510" scale=".53" />
      <Drum x="42" y="563" scale=".96" rotate="10" />
      <Flower x="38" y="664" scale=".58" />
      <Leaf x="78" y="706" scale=".7" flip />
      <path className="folk-botanical" d="M91 798c-5-38-23-64-55-78m49 57c15-3 26-12 33-27-17-2-29 5-36 20m-15-20c-4-17-14-28-30-34-2 16 6 29 25 38" />
    </svg>
  );
}

export default function HeritageFrame() {
  return (
    <div className="heritage-frame" aria-hidden="true">
      <div className="heritage-frame__side-panel heritage-frame__side-panel--left" />
      <div className="heritage-frame__side-panel heritage-frame__side-panel--right" />
      <div className="heritage-frame__outer" /><div className="heritage-frame__inner" />
      <PatternBand position="top" /><PatternBand position="bottom" />
      <LeftFolkPanel /><RightFolkPanel />
      <Corner corner="tl" /><Corner corner="tr" /><Corner corner="bl" /><Corner corner="br" />
    </div>
  );
}
