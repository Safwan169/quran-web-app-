'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Loader } from 'lucide-react';
import { getAyahAudioUrl } from '@/lib/api';

interface AudioPlayerProps {
  ayahNumber: number;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

let currentAudio: HTMLAudioElement | null = null;

export function AudioPlayer({
  ayahNumber,
  isPlaying = false,
  onPlay,
  onPause,
}: AudioPlayerProps) {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayClick = async () => {
    try {
      setLoading(true);

      // Stop currently playing audio
      if (currentAudio && currentAudio !== audioRef.current) {
        currentAudio.pause();
        currentAudio = null;
      }

      if (!audioRef.current) {
        const audio = new Audio(getAyahAudioUrl(ayahNumber));
        audioRef.current = audio;
        currentAudio = audio;

        audio.addEventListener('ended', () => {
          setPlaying(false);
          onPause?.();
        });
      }

      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
        onPause?.();
      } else {
        await audioRef.current.play();
        setPlaying(true);
        onPlay?.();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <button
      onClick={handlePlayClick}
      disabled={loading}
      className={`p-2 rounded-lg transition-colors ${
        playing
          ? 'bg-primary text-white'
          : 'bg-gray-700 text-white hover:bg-primary'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-label="Play audio"
      title="Play audio"
    >
      {loading ? (
        <Loader size={18} className="animate-spin" />
      ) : playing ? (
        <Pause size={18} />
      ) : (
        <Play size={18} />
      )}
    </button>
  );
}
