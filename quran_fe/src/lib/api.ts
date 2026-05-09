import {
  Surah,
  SurahData,
  ApiResponse,
  ApiSurah,
  EditionData,
  Ayah,
} from './types';

const API_BASE = 'https://api.alquran.cloud/v1';
const AUDIO_BASE = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy';

export async function getSurahList(): Promise<Surah[]> {
  try {
    const response = await fetch(`${API_BASE}/surah`, {
      next: { revalidate: 86400 }, // ISR: revalidate daily
    });

    if (!response.ok) throw new Error('Failed to fetch surahs');

    const data: ApiResponse<ApiSurah[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surah list:', error);
    throw error;
  }
}

export async function getSurahWithTranslation(
  id: number
): Promise<SurahData> {
  try {
    const response = await fetch(
      `${API_BASE}/surah/${id}/editions/quran-uthmani,en.sahih`,
      {
        next: { revalidate: 86400 }, // ISR: revalidate daily
      }
    );

    if (!response.ok) throw new Error(`Failed to fetch surah ${id}`);

    const data: ApiResponse<EditionData[]> = await response.json();

    if (!data.data || data.data.length < 2) {
      throw new Error('Invalid API response');
    }

    // First edition is Arabic (quran-uthmani)
    const arabicEdition = data.data[0];
    // Second edition is English translation (en.sahih)
    const englishEdition = data.data[1];

    const surah: Surah = {
      number: id,
      name: arabicEdition.edition.name,
      englishName: arabicEdition.edition.englishName,
      englishNameTranslation: arabicEdition.edition.englishName,
      numberOfAyahs: arabicEdition.ayahs.length,
      revelationType:
        arabicEdition.edition.type === 'Meccan' ? 'Meccan' : 'Medinan',
    };

    const ayahs: Ayah[] = arabicEdition.ayahs.map((arabicAyah, index) => ({
      number: arabicAyah.number,
      numberInSurah: arabicAyah.numberInSurah,
      text: arabicAyah.text,
      translation: englishEdition.ayahs[index]?.text || '',
    }));

    return { surah, ayahs };
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    throw error;
  }
}

export function getAyahAudioUrl(verseNumber: number): string {
  return `${AUDIO_BASE}/${verseNumber}.mp3`;
}

export async function searchAyahs(
  query: string,
  surahs: SurahData[]
): Promise<
  Array<{
    surahName: string;
    ayahNumber: number;
    numberInSurah: number;
    text: string;
    translation: string;
  }>
> {
  const results = [];

  for (const surahData of surahs) {
    for (const ayah of surahData.ayahs) {
      if (
        ayah.translation?.toLowerCase().includes(query.toLowerCase()) ||
        ayah.text?.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push({
          surahName: surahData.surah.englishName,
          ayahNumber: ayah.number,
          numberInSurah: ayah.numberInSurah,
          text: ayah.text,
          translation: ayah.translation || '',
        });
      }
    }
  }

  return results;
}
