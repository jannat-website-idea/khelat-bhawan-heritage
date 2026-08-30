import React from 'react';

export default function AlpanaMotif({ variant = 'flower', className = '' }) {
  if (variant === 'fish') {
    return (
      <svg className={className} viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="43" strokeWidth="2" />
        <path d="M18 55c15-30 46-34 64-13-18 4-27 16-31 32-12-2-23-8-33-19Z" strokeWidth="3" />
        <path d="M25 55c13 5 22 12 27 21M55 40c8 1 18 3 27 2M33 50c8-9 18-13 30-12" strokeWidth="2" />
        <path d="M50 73c-11 3-19 9-25 17 1-12-1-21-7-28" strokeWidth="2.5" />
        <circle cx="69" cy="47" r="2.7" fill="currentColor" stroke="none" />
        <path d="M39 56l7 4-5 6m12-21 6 4-5 5" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="15" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
        <path key={rotation} d="M50 32c-7-7-7-15 0-23 7 8 7 16 0 23Z" strokeWidth="2.2" transform={`rotate(${rotation} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="40" strokeWidth="1.8" strokeDasharray="1 8" strokeLinecap="round" />
      <path d="M18 23c8-10 16-14 25-16M82 23C74 13 66 9 57 7M18 77c8 10 16 14 25 16M82 77c-8 10-16 14-25 16" strokeWidth="1.8" />
    </svg>
  );
}
