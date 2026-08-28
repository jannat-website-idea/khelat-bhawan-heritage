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
      
      {/* Traditional Bengali Alpana / Floral Center Motif */}
      <svg
        width="44"
        height="24"
        viewBox="0 0 44 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${light ? 'text-rosegold-300' : 'text-rosegold-500'} opacity-90 transition-transform duration-500 hover:scale-110`}
      >
        {/* Central Lotus Petal */}
        <path
          d="M22 2C22 2 17 8 17 14C17 17.5 19.5 20 22 20C24.5 20 27 17.5 27 14C27 8 22 2 22 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        {/* Left Petal */}
        <path
          d="M20 7C16 9 10 13 11 17C12 20 16 19 19 16"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        {/* Right Petal */}
        <path
          d="M24 7C28 9 34 13 33 17C32 20 28 19 25 16"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        {/* Left Side Scroll */}
        <path
          d="M10 14C6 14 3 16 3 18C3 20 6 21 8 19"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        {/* Right Side Scroll */}
        <path
          d="M34 14C38 14 41 16 41 18C41 20 38 21 36 19"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        {/* Center Seed Dot */}
        <circle cx="22" cy="14" r="1.5" fill="currentColor" />
        <circle cx="15" cy="14" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="29" cy="14" r="1" fill="currentColor" opacity="0.6" />
      </svg>

      <div className={`h-[1px] w-16 md:w-28 ${lineClassRev} opacity-60`} />
    </div>
  );
}
