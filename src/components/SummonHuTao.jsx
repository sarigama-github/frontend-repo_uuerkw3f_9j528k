import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SummonHuTao({ onSummon }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    if (onSummon) onSummon();
    setTimeout(() => setActive(false), 1800);
  };

  return (
    <div className="w-full flex items-center justify-center py-6">
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="relative group px-6 py-3 rounded-full text-lg font-semibold tracking-wide text-amber-50 bg-gradient-to-r from-red-700 via-amber-600 to-red-700 shadow-[0_0_30px_rgba(255,80,30,.35)] border border-red-400/30"
      >
        <span className="relative z-10">Summon Hu Tao</span>
        <span className="absolute inset-0 rounded-full blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-300" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,120,60,.6), rgba(255,40,0,.1))'
        }} />
      </motion.button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            className="absolute mt-24 px-4 py-2 rounded-full text-sm bg-black/60 text-amber-100 backdrop-blur-md border border-amber-300/20"
          >
            Hu Tao enters with playful flair!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
