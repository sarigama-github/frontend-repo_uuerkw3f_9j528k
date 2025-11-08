import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // fake analyzer for waves when music is playing
      setLevel(prev => (playing ? Math.max(0.2, Math.random()) : 0));
    }, 200);
    return () => clearInterval(interval);
  }, [playing]);

  const toggle = () => {
    if (!enabled) return;
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setEnabled(false));
    }
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-black/40 border border-amber-300/20 backdrop-blur-md">
      <button
        onClick={toggle}
        className="w-9 h-9 grid place-items-center rounded-full bg-gradient-to-br from-amber-600 to-red-700 text-amber-50 shadow-inner"
        aria-label="Toggle music"
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
      <div className="flex items-end gap-1 h-8">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-sm bg-gradient-to-t from-amber-400 to-red-400"
            animate={{ height: playing ? `${(Math.sin(i + level * Math.PI) * 30 + 40)}%` : '6%' }}
            transition={{ duration: 0.2 }}
            style={{ boxShadow: '0 0 8px rgba(255,120,40,0.7)' }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 text-amber-100/90">
        <Music size={16} />
        <span className="text-sm">Let the Living Beware</span>
      </div>
      {/* Royalty-free placeholder bgm link (muted autoplay blocked on some browsers) */}
      <audio ref={audioRef} loop preload="none" src="https://cdn.pixabay.com/audio/2022/03/15/audio_0a2f0e12f7.mp3" />
    </div>
  );
}
