import React from 'react';

export default function AlpanaDivider({ className = "", light = false }) {
  const lineClass = light
    ? "bg-gradient-to-r from-transparent via-rosegold-200 to-rosegold-200"
    : "bg-gradient-to-r from-transparent via-rosegold-500 to-rosegold-500";
    
  const lineClassRev = light
    ? "bg-gradient-to-l from-transparent via-rosegold-200 to-rosegold-200"
    : "bg-gradient-to-l from-transparent via-rosegold-500 to-rosegold-500";

  return (
    <div className={`flex items-center justify-center space-x-3 py-4 ${className}`}>
      <div className={`h-[1px] w-16 md:w-28 ${lineClass} opacity-60`} />
      
      {/* Traditional Bengali Bonedi Bari Kalka & Lotus Centerpiece */}
      <svg
        width="64"
        height="28"
        viewBox="0 0 64 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${light ? 'text-rosegold-300' : 'text-rosegold-500'} opacity-90 transition-transform duration-500 hover:scale-110`}
      >
        {/* Central Blooming Lotus */}
        <path
          d="M32 3 C32 3 27 9 27 15 C27 19 29.5 22 32 22 C34.5 22 37 19 37 15 C37 9 32 3 32 3 Z"
          stroke="currentColor"
          strokeWidth="1.3"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <path d="M30 9 C26 11 21 15 22 19 C23 21 26 21 28 18" stroke="currentColor" strokeWidth="1" />
        <path d="M34 9 C38 11 43 15 42 19 C41 21 38 21 36 18" stroke="currentColor" strokeWidth="1" />
        <circle cx="32" cy="15" r="1.6" fill="currentColor" />

        {/* Left Bonedi Kalka (Curling toward center) */}
        <path
          d="M17 19 C13 22 7 21 5 17 C3 13 6 8 11 6 C14 5 17 6 18 8 C19 10 17 12 15 12 C12 12 12 9 14 8 C10 10 7 14 9 17 C10 19 14 19 16 17 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <circle cx="16" cy="9.5" r="1" fill="currentColor" />
        <circle cx="9" cy="19.5" r="1" fill="currentColor" />
        <circle cx="5" cy="15" r="0.8" fill="currentColor" />

        {/* Right Bonedi Kalka (Curling toward center) */}
        <path
          d="M47 19 C51 22 57 21 59 17 C61 13 58 8 53 6 C50 5 47 6 46 8 C45 10 47 12 49 12 C52 12 52 9 50 8 C54 10 57 14 55 17 C54 19 50 19 48 17 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <circle cx="48" cy="9.5" r="1" fill="currentColor" />
        <circle cx="55" cy="19.5" r="1" fill="currentColor" />
        <circle cx="59" cy="15" r="0.8" fill="currentColor" />

        {/* Base Padmapitha Line */}
        <path d="M22 23 C27 24 37 24 42 23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      </svg>

      <div className={`h-[1px] w-16 md:w-28 ${lineClassRev} opacity-60`} />
    </div>
  );
}
