'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { FontSettings } from '@/lib/types';

const DEFAULT_FONT_SETTINGS: FontSettings = {
  arabicFontSize: 30,
  translationFontSize: 17,
  arabicFontFace: 'KFGQ',
};

interface FontSettingsContextType {
  fontSettings: FontSettings;
  setFontSettings: (settings: FontSettings) => void;
  updateFontSize: (
    type: 'arabic' | 'translation',
    size: number
  ) => void;
  updateFontFace: (face: 'KFGQ' | 'Amiri' | 'Scheherazade New') => void;
}

const FontSettingsContext = createContext<FontSettingsContextType | undefined>(
  undefined
);

export function FontSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontSettings, setFontSettingsState] = useState<FontSettings>(
    DEFAULT_FONT_SETTINGS
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('quran-font-settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFontSettingsState(parsed);
      }
    } catch (error) {
      console.error('Failed to load font settings:', error);
    }
    setIsHydrated(true);
  }, []);

  const setFontSettings = (settings: FontSettings) => {
    setFontSettingsState(settings);
    try {
      localStorage.setItem('quran-font-settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save font settings:', error);
    }
  };

  const updateFontSize = (type: 'arabic' | 'translation', size: number) => {
    const newSettings = { ...fontSettings };
    if (type === 'arabic') {
      newSettings.arabicFontSize = Math.max(16, Math.min(48, size));
    } else {
      newSettings.translationFontSize = Math.max(12, Math.min(28, size));
    }
    setFontSettings(newSettings);
  };

  const updateFontFace = (face: 'KFGQ' | 'Amiri' | 'Scheherazade New') => {
    const newSettings = { ...fontSettings, arabicFontFace: face };
    setFontSettings(newSettings);
  };

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <FontSettingsContext.Provider
      value={{
        fontSettings,
        setFontSettings,
        updateFontSize,
        updateFontFace,
      }}
    >
      {children}
    </FontSettingsContext.Provider>
  );
}

export function useFontSettings(): FontSettingsContextType {
  const context = useContext(FontSettingsContext);
  if (context === undefined) {
    throw new Error(
      'useFontSettings must be used within FontSettingsProvider'
    );
  }
  return context;
}
