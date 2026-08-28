import React from 'react';

export default function SectionHeader({ title, subtitle, light = false, className = "" }) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {/* Signature Lovable Ornamental Divider */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className={`h-px w-12 ${light ? "bg-primary-foreground/30" : "bg-accent/40"}`} />
        <span className={`${light ? "text-rose-gold" : "text-accent"} text-xs tracking-[0.3em] uppercase font-body font-medium`}>
          ❖
        </span>
        <div className={`h-px w-12 ${light ? "bg-primary-foreground/30" : "bg-accent/40"}`} />
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
