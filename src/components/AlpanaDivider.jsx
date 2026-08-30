import React from 'react';
import AlpanaMotif from './AlpanaMotif';

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
      
      {/* User-Specified 8-Petal Mandala Motif */}
      <div className="flex items-center justify-center transition-transform duration-500 hover:scale-110">
        <AlpanaMotif className={`w-8 h-8 ${light ? 'text-rosegold-300' : 'text-rosegold-500'} opacity-90`} />
      </div>

      <div className={`h-[1px] w-16 md:w-28 ${lineClassRev} opacity-60`} />
    </div>
  );
}
