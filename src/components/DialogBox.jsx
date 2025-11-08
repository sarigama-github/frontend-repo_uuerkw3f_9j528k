import React, { useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  "When the curtain falls, will you applaud? Hehe~",
  "A flame that flickers still warms the soul.",
  "Wangsheng invites you — reservations are... permanent.",
  "Listen closely. The spirits love to gossip.",
  "Hu Tao, at your service! No refunds.",
  "Life's a candle. Enjoy the dance before the wax runs out.",
  "Boo! Did I scare ya?",
  "Poetry is just a ghost wearing words.",
];

export default function DialogBox() {
  const [text, setText] = useState(QUOTES[0]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const nextQuote = () => {
    let i = Math.floor(Math.random() * QUOTES.length);
    if (i === index) i = (i + 1) % QUOTES.length;
    setIndex(i);
    setVisible(false);
    setTimeout(() => {
      setText(QUOTES[i]);
      setVisible(true);
    }, 220);
  };

  useEffect(() => {
    const t = setInterval(nextQuote, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#1a0b0b]/70 to-black/60 border border-red-400/20 backdrop-blur-md shadow-[0_0_40px_rgba(255,60,20,.25)]">
        <div className="absolute -top-3 -left-3 px-3 py-1 rounded-full bg-red-800/80 text-amber-100 text-xs border border-red-300/30 shadow">
          <div className="flex items-center gap-1"><Sparkles size={14} /> Hu Tao says</div>
        </div>
        <AnimatePresence mode="wait">
          {visible && (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-amber-100/95 text-lg sm:text-xl leading-relaxed"
            >
              {text}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="mt-4 flex justify-end">
          <button onClick={nextQuote} className="text-sm px-3 py-1.5 rounded-full bg-red-700/70 text-amber-50 border border-red-400/30 hover:bg-red-700/90 transition">
            More
          </button>
        </div>
      </div>
    </div>
  );
}
