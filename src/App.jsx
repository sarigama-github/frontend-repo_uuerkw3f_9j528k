import React, { useState, useCallback } from 'react';
import HeroSpline from './components/HeroSpline.jsx';
import DialogBox from './components/DialogBox.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import SummonHuTao from './components/SummonHuTao.jsx';
import HuTaoAvatar from './components/HuTaoAvatar.jsx';
import { motion } from 'framer-motion';

export default function App() {
  const [summoned, setSummoned] = useState(false);
  const [parallax, setParallax] = useState({ x: 0.5, y: 0.5 });

  const onPointerMoveParallax = useCallback((x, y) => setParallax({ x, y }), []);

  return (
    <div className="min-h-screen w-full bg-[#0b0808] text-white selection:bg-red-600/40 selection:text-amber-100">
      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 shadow-[0_0_20px_rgba(255,90,40,.5)]" />
          <div className="leading-none">
            <p className="text-lg font-semibold tracking-wide text-amber-100">Wangsheng Parlor</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/70">Hu Tao Showcase</p>
          </div>
        </div>
        <MusicPlayer />
      </header>

      {/* Hero with Spline background and effects */}
      <div className="relative">
        <HeroSpline onPointerMoveParallax={onPointerMoveParallax} />
        <div className="absolute inset-x-0 top-24 sm:top-28 z-30 px-4 sm:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-amber-200 to-red-400 drop-shadow-[0_4px_18px_rgba(255,120,40,.25)]"
          >
            Hu Tao — Keeper of the Pyre
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="mt-3 text-center text-amber-100/80 max-w-2xl mx-auto"
          >
            A mystical, ghostly and elegant experience inspired by the Wangsheng Funeral Parlor.
          </motion.p>
        </div>
      </div>

      {/* Content area */}
      <main className="relative z-30 -mt-10 sm:-mt-20">
        <div className="px-4 sm:px-8">
          <SummonHuTao onSummon={() => setSummoned(true)} />
          <HuTaoAvatar summoned={summoned} />
          <div className="mt-6">
            <DialogBox />
          </div>
        </div>
      </main>

      {/* Decorative parallax glows that react to pointer */}
      <div className="pointer-events-none fixed inset-0 z-20" aria-hidden>
        <div
          className="absolute w-[50vmax] h-[50vmax] rounded-full blur-3xl opacity-30"
          style={{
            left: `${parallax.x * 80 - 10}%`,
            top: `${parallax.y * 70 - 5}%`,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,120,60,.35), rgba(255,40,0,0))',
          }}
        />
        <div
          className="absolute w-[35vmax] h-[35vmax] rounded-full blur-3xl opacity-20"
          style={{
            right: `${(1 - parallax.x) * 70 - 5}%`,
            bottom: `${(1 - parallax.y) * 60 - 5}%`,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,200,60,.25), rgba(255,0,0,0))',
          }}
        />
      </div>

      {/* Footer */}
      <footer className="relative z-30 mt-12 pb-10 text-center text-xs text-amber-200/60">
        Fan-made interactive experience. Genshin Impact and Hu Tao are property of miHoYo/HoYoverse.
      </footer>
    </div>
  );
}
