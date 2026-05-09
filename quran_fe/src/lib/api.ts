import {
  Surah,
  SurahData,
  ApiResponse,
  EditionData,
  Ayah,
} from './types';

const API_BASE = 'https://api.alquran.cloud/v1';
const AUDIO_BASE = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy';

async function fetchWithRetry(
  input: string,
  init?: RequestInit & { next?: { revalidate: number } },
  retries = 3
): Promise<Response> {
  let lastError: unknown = null;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(input, init);
      if (response.ok) return response;
      lastError = new Error(`Request failed with ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Request failed.');
}

export async function getSurahList(): Promise<Surah[]> {
  const response = await fetchWithRetry(`${API_BASE}/surah`, {
    next: { revalidate: 86400 },
  });
  const payload = (await response.json()) as ApiResponse<Surah[]>;
  return payload.data;
}

export async function getSurahWithTranslation(
  id: number
): Promise<SurahData> {
  const response = await fetchWithRetry(
    `${API_BASE}/surah/${id}/editions/quran-uthmani,en.sahih`,
    { next: { revalidate: 86400 } }
  );

  const payload = (await response.json()) as ApiResponse<EditionData[]>;
  const [arabicEdition, translationEdition] = payload.data;

  if (!arabicEdition || !translationEdition) {
    throw new Error('Unexpected surah response shape.');
  }

  const surah: Surah = {
    number: id,
    name: arabicEdition.name,
    englishName: arabicEdition.englishName,
    englishNameTranslation: arabicEdition.englishNameTranslation,
    numberOfAyahs: arabicEdition.numberOfAyahs,
    revelationType: arabicEdition.revelationType,
  };

  const ayahs: Ayah[] = arabicEdition.ayahs.map((ayah, index) => ({
    number: ayah.number,
    numberInSurah: ayah.numberInSurah,
    text: ayah.text,
    translation: translationEdition.ayahs[index]?.text ?? '',
  }));

  return { surah, ayahs };
}

export function getAyahAudioUrl(verseNumber: number): string {
  return `${AUDIO_BASE}/${verseNumber}.mp3`;
}

