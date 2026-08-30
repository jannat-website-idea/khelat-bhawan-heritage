import React from 'react';

export default function SectionHeader({ title, subtitle, light = false, className = "" }) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {/* Authentic Bengali Bonedi Bari Kalka Header Flourish */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className={`h-px w-10 sm:w-16 ${light ? "bg-primary-foreground/30" : "bg-accent/40"}`} />
        <svg
          width="32"
          height="16"
          viewBox="0 0 32 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${light ? "text-rose-gold" : "text-accent"} opacity-90`}
          aria-hidden="true"
        >
          {/* Central Lotus Seed */}
          <circle cx="16" cy="8" r="1.8" fill="currentColor" />
          {/* Left Kalka Paisley */}
          <path
            d="M9 11 C6 12 3 11 2 8 C1 5 3 2 6 2 C8 2 9 3 9 4 C10 6 9 7 8 7 C6 7 6 5 7 5 C5 6 3 8 4 10 C5 11 7 11 8 10 Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Right Kalka Paisley */}
          <path
            d="M23 11 C26 12 29 11 30 8 C31 5 29 2 26 2 C24 2 23 3 23 4 C22 6 23 7 24 7 C26 7 26 5 25 5 C27 6 29 8 28 10 C27 11 25 11 24 10 Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="currentColor"
            fillOpacity="0.15"
          />
        </svg>
        <div className={`h-px w-10 sm:w-16 ${light ? "bg-primary-foreground/30" : "bg-accent/40"}`} />
      </div>

      <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 ${light ? "text-primary-foreground" : "text-foreground"}`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-sm md:text-base max-w-xl mx-auto font-body leading-relaxed ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
