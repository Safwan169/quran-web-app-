'use client';

import React from 'react';
import { Search, Settings, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onSearchClick?: () => void;
  onSettingsClick?: () => void;
  darkMode?: boolean;
  onThemeToggle?: () => void;
}

export function Header({
  onSearchClick,
  onSettingsClick,
  darkMode = true,
  onThemeToggle,
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-dark-card/80 backdrop-blur border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={onSearchClick}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Search"
            title="Search"
          >
            <Search size={20} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Settings Button */}
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Settings"
            title="Settings"
          >
            <Settings size={20} />
          </button>

          {/* Support Button */}
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors">
            Support Us
          </button>
        </div>
      </div>
    </div>
  );
}
