import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SoundControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize Audio
    const audio = new Audio('/assets/sound/nastelbom-relax-463106 (1).mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio playback prevented', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="fixed bottom-4 left-4 z-50 glass-panel p-3 flex items-center gap-4 transition-all hover:bg-white/10">
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none"
        aria-label={isPlaying ? "Mute ambient ocean sounds" : "Play ambient ocean sounds"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      
      <div className="hidden md:flex flex-col w-24">
        <label htmlFor="volume-slider" className="sr-only">Volume control</label>
        <input 
          id="volume-slider"
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>
    </div>
  );
};

export default SoundControls;
