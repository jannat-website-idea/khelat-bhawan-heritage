import React from 'react';

/**
 * Authentic Royal Bengali 8-Petal Mandala Motif
 * Exact reproduction of user-specified Bonedi Bari design:
 * 8 marquise petals with midribs and tip pearls, dashed pearl halo,
 * concentric gold rings, and central bindu.
 */
export default function AlpanaMotif({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Fine Golden Ring */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.4" opacity="0.9" />

      {/* Secondary Inner Ring */}
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1" opacity="0.6" />

      {/* Dashed / Beaded Pearl Halo */}
      <circle
        cx="50"
        cy="50"
        r="36.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeDasharray="1.6 5.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Inner Petal Boundary Ring */}
      <circle cx="50" cy="50" r="32.5" stroke="currentColor" strokeWidth="1" opacity="0.65" />

      {/* Central Double Core with Solid Gold Bindu */}
      <circle cx="50" cy="50" r="10.5" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.22" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />

      {/* 8-Petal Pointed Lotus (অষ্টদল পদ্ম) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
        <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
          {/* Pointed Marquise Petal Silhouette */}
          <path
            d="M50 39.5 C43.8 34.5 43.8 24.5 50 19.5 C56.2 24.5 56.2 34.5 50 39.5 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.1"
          />
          {/* Petal Central Midrib Vein */}
          <line
            x1="50"
            y1="38"
            x2="50"
            y2="21"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Petal Tip Gold Pearl Bead */}
          <circle cx="50" cy="18" r="1.4" fill="currentColor" />
        </g>
      ))}

      {/* Interstitial Radiating Pearls between Petals */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((rotation) => (
        <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
          <circle cx="50" cy="22" r="1.1" fill="currentColor" opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}
