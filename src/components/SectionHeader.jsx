import React from 'react';
import AlpanaMotif from './AlpanaMotif';

export default function SectionHeader({ title, subtitle, light = false, className = "" }) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {/* Authentic Bengali 8-Petal Mandala Header Flourish */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className={`h-px w-10 sm:w-16 ${light ? "bg-primary-foreground/30" : "bg-accent/40"}`} />
        <AlpanaMotif className={`w-5 h-5 ${light ? "text-rose-gold" : "text-accent"} opacity-90`} />
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
