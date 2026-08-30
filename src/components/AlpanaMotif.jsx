import React from 'react';

/**
 * Authentic Bengali Bonedi Bari Motif System
 * Features authentic 19th-century Kalka (কলকা - Paisley), 
 * Royal Bonedi Lotus Mandala, and Auspicious Shankha motifs.
 */
export default function AlpanaMotif({ variant = 'kalka', className = '' }) {
  // 1. Authentic Bonedi Bari Kalka (কলকা - Royal Paisley)
  if (variant === 'kalka') {
    return (
      <svg
        className={className}
        viewBox="0 0 100 100"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Beaded Pearl Halo (মুক্তার মালা) */}
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 4.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" opacity="0.45" />

        {/* Base Lotus Pedestal (পদ্মপীঠ) */}
        <path
          d="M38 78 C42 74 46 72 50 72 C54 72 58 74 62 78 C56 81 44 81 38 78 Z"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path d="M44 75 C47 72 50 71 53 72 C56 73 58 75 60 77" stroke="currentColor" strokeWidth="1" />

        {/* Master Kalka Paisley Silhouette (স্বর্ণ কলকা) */}
        <path
          d="M40 73 C29 68 23 57 24 45 C25 32 33 22 47 15 C54 11 62 12 64 16 C66 21 62 26 56 27 C49 28 47 24 49 20 C42 25 36 34 35 44 C34 54 39 63 47 65 C57 67 65 60 68 50 C71 42 69 35 65 30 C69 34 72 43 70 52 C67 64 57 73 44 73 Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Kalka Crest Curl Finial (কলকার শিখা) */}
        <path
          d="M62 16 C64 19 63 24 58 25 C54 26 52 23 53 20 C54 18 57 18 58 19"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="57" cy="20" r="1.4" fill="currentColor" />

        {/* Inner Kalka Teardrop Core with Lotus Blossom */}
        <path
          d="M37 47 C36 40 40 33 46 29 C48 27 50 28 49 30 C46 34 43 39 44 45 C45 50 49 54 54 53 C57 52 59 49 59 46"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Spine of Auspicious Pearl Beads along Kalka Curve */}
        <circle cx="33" cy="38" r="1.3" fill="currentColor" />
        <circle cx="31" cy="46" r="1.4" fill="currentColor" />
        <circle cx="33" cy="54" r="1.4" fill="currentColor" />
        <circle cx="38" cy="61" r="1.5" fill="currentColor" />
        <circle cx="44" cy="66" r="1.5" fill="currentColor" />
        <circle cx="50" cy="67" r="1.5" fill="currentColor" />

        {/* Inner Floral Rosette (হৃদপদ্ম) */}
        <circle cx="49" cy="46" r="3" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" />
        <path d="M49 41 C48 43 48 45 49 46 C50 45 50 43 49 41 Z" fill="currentColor" />
        <path d="M49 51 C48 49 48 47 49 46 C50 47 50 49 49 51 Z" fill="currentColor" />
        <path d="M44 46 C46 45 48 45 49 46 C48 47 46 47 44 46 Z" fill="currentColor" />
        <path d="M54 46 C52 45 50 45 49 46 C50 47 52 47 54 46 Z" fill="currentColor" />

        {/* Outer Kalmi Flutes / Scalloped Leaf Radiance */}
        <path d="M25 40 C21 37 23 33 26 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M24 49 C19 47 21 42 25 44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M27 58 C22 57 23 51 28 53" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }

  // 2. Auspicious Bengali Shankha (শঙ্খ - Sacred Conch)
  if (variant === 'fish' || variant === 'shankha') {
    return (
      <svg
        className={className}
        viewBox="0 0 100 100"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Beaded Pearl Halo */}
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 4.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" opacity="0.45" />

        {/* Sacred Shankha Contour */}
        <path
          d="M24 62 C20 48 26 34 38 25 C48 18 60 17 68 22 C76 27 79 38 75 48 C72 56 65 62 57 65 C48 68 36 67 28 72 C25 74 23 72 24 68 Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Conch Spiral Aperture (শঙ্খের আবর্ত) */}
        <path
          d="M48 27 C58 30 63 38 60 47 C57 55 49 59 40 58 C33 57 29 51 31 44 C33 38 39 34 46 36 C51 37 54 42 52 47 C50 51 45 52 42 50"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Sacred Conch Fluting & Ribs */}
        <path d="M42 22 C48 24 53 29 55 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M60 25 C66 30 69 37 68 44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M30 65 C34 62 39 63 43 66" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M26 69 C30 66 35 67 38 71" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

        {/* Auspicious Pearl Garland Accents */}
        <circle cx="50" cy="50" r="2" fill="currentColor" />
        <circle cx="70" cy="27" r="1.5" fill="currentColor" />
        <circle cx="27" cy="33" r="1.5" fill="currentColor" />
        <circle cx="68" cy="62" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // 3. Royal Bonedi Bari Lotus Alpana Mandala (পদ্ম আলপনা)
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Pearl Halo */}
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 4.5" strokeLinecap="round" opacity="0.8" />
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" opacity="0.45" />

      {/* Central Rosette Core with Gold Droplet */}
      <circle cx="50" cy="50" r="13" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
      <circle cx="50" cy="50" r="4.5" fill="currentColor" />

      {/* 8-Fold Radiating Bonedi Kalka Petals (অষ্টদল পদ্ম-কলকা) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
        <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
          {/* Main Petal with Kalka Teardrop Curve */}
          <path
            d="M50 37 C43 31 43 22 50 14 C57 22 57 31 50 37 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Inner Petal Vein */}
          <line x1="50" y1="35" x2="50" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.75" />
          {/* Petal Tip Pearl Dot */}
          <circle cx="50" cy="11.5" r="1.3" fill="currentColor" />
        </g>
      ))}

      {/* Interstitial Fluted Radiance */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((rotation) => (
        <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
          <line x1="50" y1="36" x2="50" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="50" cy="25" r="1" fill="currentColor" opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}
