import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Stylized 2.5D avatar: floats, reacts to hover/click, with pyro aura
export default function HuTaoAvatar({ summoned }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (summoned) {
      setClicked(true);
      const t = setTimeout(() => setClicked(false), 1000);
      return () => clearTimeout(t);
    }
  }, [summoned]);

  return (
    <div className="relative w-full flex items-center justify-center py-8">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 600);
        }}
        className="relative"
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: summoned ? 0 : 12, opacity: 1, scale: hovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        <motion.div
          className="absolute -inset-6 rounded-[28px]"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(255,120,60,0.12), rgba(255,40,10,0.06), rgba(255,180,60,0.12))',
            filter: 'blur(12px)'
          }}
          animate={{ opacity: hovered ? 1 : 0.7 }}
        />
        <div className="relative z-10 p-1 bg-gradient-to-br from-red-900/60 to-black/60 rounded-[28px] border border-red-400/30 backdrop-blur">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1b0a0a] to-[#0b0909] border border-red-500/20">
            {/* Minimalist avatar illustration using CSS shapes */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56">
              {/* Hat */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-36 h-12 rounded-t-[18px] bg-[#211616] border border-red-800/40 shadow-inner" />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-3 bg-gradient-to-r from-amber-500 to-red-600 rounded-full blur-[1px]" />
              {/* Face */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#2a1b1b] rounded-[22px] border border-red-900/30" />
              {/* Eyes */}
              <motion.div className="absolute top-[76px] left-1/2 -translate-x-[48px] w-4 h-4 rounded-full bg-amber-400" animate={{ scale: hovered ? 1.2 : 1 }} />
              <motion.div className="absolute top-[76px] left-1/2 translate-x-[32px] w-4 h-4 rounded-full bg-amber-400" animate={{ scale: hovered ? 1.2 : 1 }} />
              {/* Hair */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-36 h-20 bg-[#2a0f0f] rounded-b-[32px]" />
              {/* Pyro aura */}
              <motion.div
                className="absolute -inset-2 rounded-[28px]"
                style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,120,60,0.35), rgba(255,0,0,0))' }}
                animate={{ opacity: clicked ? 1 : 0.6, scale: clicked ? 1.08 : 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
