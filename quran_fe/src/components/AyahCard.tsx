'use client';

import React, { useState } from 'react';
import { Play, Bookmark, MoreVertical } from 'lucide-react';
import { Ayah, FontSettings } from '@/lib/types';
import { AudioPlayer } from './AudioPlayer';

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  fontSettings: FontSettings;
  isPlaying?: boolean;
  onPlayAudio?: (ayahNumber: number) => void;
}

export function AyahCard({
  ayah,
  surahNumber,
  fontSettings,
  isPlaying = false,
  onPlayAudio,
}: AyahCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getFontFamilyClass = () => {
    switch (fontSettings.arabicFontFace) {
      case 'Amiri':
        return 'font-amiri';
      case 'Scheherazade New':
        return 'font-arabic';
      case 'KFGQ':
      default:
        return 'font-kfgq';
    }
  };

  return (
    <div className="bg-dark-card rounded-lg p-8 mb-6 border border-gray-700 hover:border-primary/50 transition-colors">
      {/* Header with Reference */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          {/* Verse Reference */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <span className="text-primary font-bold text-sm">
                {surahNumber}:{ayah.numberInSurah}
              </span>
            </div>
            <AudioPlayer
              ayahNumber={ayah.number}
              isPlaying={isPlaying}
              onPlay={() => onPlayAudio?.(ayah.number)}
            />
          </div>

          {/* Arabic Text */}
          <div className="flex-1">
            <p
              className={`${getFontFamilyClass()} text-white text-right leading-relaxed`}
              style={{ fontSize: `${fontSettings.arabicFontSize}px` }}
            >
              {ayah.text}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked
                ? 'bg-primary/20 text-primary'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
            aria-label="Bookmark"
            title="Bookmark"
          >
            <Bookmark size={20} />
          </button>
          <button
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="More options"
            title="More options"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Translation */}
      <div className="bg-dark-bg rounded p-4 mt-6">
        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
          Saheeh International
        </p>
        <p
          className="text-gray-300 leading-relaxed"
          style={{ fontSize: `${fontSettings.translationFontSize}px` }}
        >
          {ayah.translation}
        </p>
      </div>
    </div>
  );
}
