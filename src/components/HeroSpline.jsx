import React, { useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Background layer with ghostly flames (soft moving glows)
function GhostFlames() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-3xl opacity-30 mix-blend-screen"
          style={{
            width: `${120 + i * 30}px`,
            height: `${120 + i * 30}px`,
            background: i % 2 === 0 ? 'radial-gradient(circle, rgba(255,115,0,0.8), rgba(255,0,0,0.0))' : 'radial-gradient(circle, rgba(255,200,0,0.7), rgba(255,0,0,0.0))',
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
            animation: `floatY ${12 + i * 2}s ease-in-out ${i}s infinite alternate, floatX ${18 + i * 3}s ease-in-out ${i / 2}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatY { from { transform: translateY(-10px); } to { transform: translateY(20px); } }
        @keyframes floatX { from { transform: translateX(-15px) rotate(0deg); } to { transform: translateX(25px) rotate(4deg); } }
      `}</style>
    </div>
  );
}

// Ambient butterflies (glowing particles shaped like simple butterflies)
function Butterflies() {
  const count = 14;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const delay = (i % 7) * 0.8;
        const duration = 10 + (i % 5) * 3;
        const left = (i * 7) % 100;
        const size = 10 + (i % 4) * 4;
        return (
          <span
            key={i}
            className="absolute opacity-70"
            style={{
              left: `${left}%`,
              bottom: `-${20 + (i % 3) * 10}px`,
              animation: `flyUp ${duration}s ease-in ${delay}s infinite`,
              filter: 'drop-shadow(0 0 6px rgba(255,180,60,0.9)) drop-shadow(0 0 16px rgba(255,120,40,0.4))',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: `${size}px`,
                height: `${size}px`,
                background: 'linear-gradient(135deg, #ffb347, #ff0844)',
                borderRadius: '50% 0 50% 50%',
                transform: 'rotate(45deg)',
                boxShadow: '0 0 8px rgba(255, 120, 40, 0.6)',
                animation: 'flap 1.4s ease-in-out infinite',
              }}
            />
            <span
              style={{
                display: 'inline-block',
                width: `${size}px`,
                height: `${size}px`,
                marginLeft: '3px',
                background: 'linear-gradient(225deg, #ffd27f, #ff5e62)',
                borderRadius: '0 50% 50% 50%',
                transform: 'rotate(-45deg)',
                boxShadow: '0 0 8px rgba(255, 150, 50, 0.6)',
                animation: 'flap 1.4s ease-in-out infinite reverse',
              }}
            />
          </span>
        );
      })}
      <style>{`
        @keyframes flyUp {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(-60vh) translateX(-20px) rotate(-5deg); }
          100% { transform: translateY(-110vh) translateX(20px) rotate(5deg); opacity: 0; }
        }
        @keyframes flap { 0%, 100% { transform: scale(1); } 50% { transform: scale(0.85); } }
      `}</style>
    </div>
  );
}

export default function HeroSpline({ onPointerMoveParallax }) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 1], [6, -6]);
  const rotateY = useTransform(x, [0, 1], [-6, 6]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handle = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      x.set(px);
      y.set(py);
      if (onPointerMoveParallax) onPointerMoveParallax(px, py);
    };
    el.addEventListener('pointermove', handle);
    return () => el.removeEventListener('pointermove', handle);
  }, [x, y, onPointerMoveParallax]);

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full h-[80vh] sm:h-screen overflow-hidden bg-[#0b0a0a]"
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX, rotateY }} className="w-full h-full">
        <Spline scene="https://prod.spline.design/fTzRQ8pMbm1-BzvF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#160606]/30 to-black/70" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,80,40,0.25) 0%, rgba(0,0,0,0) 60%)'
        }} />
      </div>

      <GhostFlames />
      <Butterflies />

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: 'linear-gradient(to top, rgba(30,0,0,0.5), rgba(0,0,0,0))',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </motion.section>
  );
}
