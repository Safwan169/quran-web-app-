import React from 'react';
import { Surah } from '@/lib/types';

interface SurahHeaderProps {
  surah: Surah;
}

export function SurahHeader({ surah }: SurahHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-primary/10 to-transparent py-12 px-6 text-center border-b border-gray-700">
      {/* Kaaba SVG Icon */}
      <div className="mb-6 flex justify-center">
        <svg
          className="w-24 h-24 text-primary"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 10 L80 35 L80 75 Q80 85 70 85 L30 85 Q20 85 20 75 L20 35 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M50 10 L80 35 L80 75 Q80 85 70 85 L30 85 Q20 85 20 75 L20 35 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <rect x="35" y="45" width="30" height="25" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Surah Name */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
        {surah.englishName}
      </h1>

      {/* Arabic Name */}
      <h2 className="text-3xl font-arabic text-primary mb-4">{surah.name}</h2>

      {/* Details */}
      <p className="text-gray-400 text-sm">
        {surah.numberOfAyahs} Ayahs •{' '}
        {surah.revelationType === 'Meccan' ? 'Makkah' : 'Madinah'}
      </p>
    </div>
  );
}
