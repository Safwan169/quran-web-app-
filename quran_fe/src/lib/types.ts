export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation?: string;
}

export interface SurahData {
  surah: Surah;
  ayahs: Ayah[];
}

export interface FontSettings {
  arabicFontSize: number;
  translationFontSize: number;
  arabicFontFace: 'KFGQ' | 'Amiri' | 'Scheherazade New';
}

export interface EditionData {
  edition: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
  };
  ayahs: Array<{
    number: number;
    numberInSurah: number;
    numberInQuran: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajdah: boolean;
    text: string;
  }>;
}

export interface ApiSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}
