'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Surah } from '@/lib/types';

interface SurahSidebarProps {
  surahs: Surah[];
  activeSurahId?: number;
}

export function SurahSidebar({ surahs, activeSurahId }: SurahSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'surah' | 'juz' | 'page'>('surah');

  const filteredSurahs = useMemo(() => {
    if (!searchQuery) return surahs;
    return surahs.filter(
      (surah) =>
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.number.toString().includes(searchQuery)
    );
  }, [surahs, searchQuery]);

  return (
    <aside className="hidden md:flex flex-col w-80 bg-dark-sidebar border-r border-gray-700 h-screen fixed left-16 top-0">
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-700 p-2">
        {['surah', 'juz', 'page'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'surah' | 'juz' | 'page')}
            className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Surah"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-card text-white rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Surahs List */}
      <div className="flex-1 overflow-y-auto">
        {filteredSurahs.map((surah) => (
          <Link key={surah.number} href={`/surah/${surah.number}`}>
            <div
              className={`p-4 border-b border-gray-700 cursor-pointer transition-colors ${
                activeSurahId === surah.number
                  ? 'bg-primary/20 border-l-4 border-primary'
                  : 'hover:bg-dark-card'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Diamond Badge */}
                <div
                  className={`flex items-center justify-center w-10 h-10 transform rotate-45 flex-shrink-0 ${
                    activeSurahId === surah.number
                      ? 'bg-primary'
                      : 'bg-gray-600'
                  }`}
                >
                  <span className="transform -rotate-45 text-white font-bold text-sm">
                    {surah.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm">
                    {surah.englishName}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {surah.numberOfAyahs} Ayahs •{' '}
                    {surah.revelationType === 'Meccan' ? 'Makkah' : 'Madinah'}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
