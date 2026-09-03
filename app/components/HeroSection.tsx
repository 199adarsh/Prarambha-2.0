"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from '@iconify/react';
import { playClickSound } from "../utils/sounds";

/* TODO: Replace with the real Unstop registration link */
const REGISTER_URL = "https://unstop.com";

const LOADER_SEGMENTS = 20;

/* ── World-gen loading screen ─────────────────────────────────────── */
function WorldLoader({ onComplete }: { onComplete: () => void }) {
  const [filled, setFilled] = useState(0);
  const [statusText, setStatusText] = useState("Initializing world seed...");

  const STATUSES = [
    "Initializing world seed...",
    "Generating terrain...",
    "Placing biomes...",
    "Spawning mobs...",
    "Lighting chunks...",
    "Loading spawn point...",
    "Done!",
  ];

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      onComplete();
      return;
    }

    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setFilled(count);
      setStatusText(STATUSES[Math.floor((count / LOADER_SEGMENTS) * (STATUSES.length - 1))]);
      if (count >= LOADER_SEGMENTS) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 90);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0D]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="font-pixel text-red-500 text-sm md:text-xl mb-2 tracking-widest drop-shadow-[0_0_10px_rgba(232,64,64,0.8)]">
        PRARAMBHA 2.0
      </div>
      <div className="font-pixel text-gray-400 text-[0.4rem] mb-12 tracking-wider">
        A 24-HOUR HACKATHON
      </div>

      {/* Loading bar */}
      <div className="flex gap-[3px] border border-white/20 p-[3px] bg-black/60 mb-4 shadow-lg rounded-xl">
        {Array.from({ length: LOADER_SEGMENTS }).map((_, i) => (
          <motion.div
            key={i}
            className="w-5 h-5 md:w-7 md:h-5 rounded-md"
            style={{
              background: i < filled ? "#E84040" : "transparent",
              transition: "background 0.05s",
            }}
          />
        ))}
      </div>

      <div className="font-pixel text-gray-300 text-[0.45rem] tracking-widest">
        {statusText}
        <span style={{ animation: "cursor-blink 1s step-end infinite" }}>█</span>
      </div>
    </motion.div>
  );
}

function StatChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex-1 min-w-0 sm:min-w-[120px] bg-black/40 backdrop-blur-xl p-2 sm:p-3 flex flex-col items-start gap-1 sm:gap-1.5 border border-white/10 hover:border-red-500/50 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-black/60 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="flex items-center gap-1.5 sm:gap-2 relative z-10 w-full">
        <span className="text-red-500 text-base sm:text-lg flex items-center justify-center drop-shadow-[0_0_8px_rgba(232,64,64,0.6)] group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <span className="font-pixel text-[0.4rem] sm:text-[0.45rem] font-bold text-gray-300 tracking-widest uppercase truncate">{label}</span>
      </div>
      <span className="font-pixel text-[0.5rem] sm:text-[0.6rem] text-white drop-shadow-md relative z-10 mt-0.5 mc-text-shadow">{value}</span>
    </div>
  );
}

/* ── CSS 3D Block ─────────────────────────────────────────────────── */
function RotatingBlock() {
  const size = 110;
  const half = size / 2;

  return (
    <div style={{ perspective: '1200px', width: size, height: size }} className="cursor-pointer" title="Mine me!">
      <motion.div
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        animate={{ rotateX: [35, 395], rotateY: [45, 405] }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Front */}
        <div className="absolute border-2 border-red-500/40 flex items-center justify-center bg-black/80 backdrop-blur-md shadow-[inset_0_0_20px_rgba(232,64,64,0.4)]" style={{ width: size, height: size, transform: `translateZ(${half}px)` }}>
          <span className="font-pixel text-red-500 text-[0.6rem] font-bold drop-shadow-[0_0_12px_rgba(232,64,64,1)] text-center leading-[1]">P2.0</span>
        </div>
        {/* Back */}
        <div className="absolute border-2 border-red-500/20 bg-black/90 backdrop-blur-md shadow-[inset_0_0_15px_rgba(232,64,64,0.2)]" style={{ width: size, height: size, transform: `rotateY(180deg) translateZ(${half}px)` }}></div>
        {/* Left */}
        <div className="absolute border-2 border-red-500/20 bg-black/80 backdrop-blur-md shadow-[inset_0_0_15px_rgba(232,64,64,0.2)]" style={{ width: size, height: size, transform: `rotateY(-90deg) translateZ(${half}px)` }}></div>
        {/* Right */}
        <div className="absolute border-2 border-red-500/30 bg-black/80 backdrop-blur-md shadow-[inset_0_0_15px_rgba(232,64,64,0.2)]" style={{ width: size, height: size, transform: `rotateY(90deg) translateZ(${half}px)` }}></div>
        {/* Top */}
        <div className="absolute border-2 border-red-500/50 bg-[#0a0a0a]/90 backdrop-blur-md shadow-[inset_0_0_25px_rgba(232,64,64,0.5)]" style={{ width: size, height: size, transform: `rotateX(90deg) translateZ(${half}px)` }}></div>
        {/* Bottom */}
        <div className="absolute border-2 border-red-500/20 bg-black/95 backdrop-blur-md" style={{ width: size, height: size, transform: `rotateX(-90deg) translateZ(${half}px)` }}></div>
      </motion.div>
    </div>
  );
}

/* ── Main hero component ──────────────────────────────────────────── */
export default function HeroSection() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {loading && <WorldLoader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <section
        id="hero"
        className="relative h-screen w-full flex flex-col justify-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
        >
          <source src="/Minecraft-Hero.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Overlay: Darker on the left for text readability, subtle overall */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/20 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]/40 pointer-events-none z-0" />

        {/* ── Hero content ── */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-12 md:pt-24 pb-16 md:pb-32 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={loading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Left Column: Text & CTA */}
          <div className="flex-1 flex flex-col items-start text-left max-w-2xl mt-8 md:mt-12 lg:mt-0">
            {/* Label */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="w-6 sm:w-8 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              <span className="font-pixel text-[0.5rem] sm:text-[0.6rem] text-gray-300 tracking-[0.4em] uppercase drop-shadow-md mc-text-shadow">
                DSSA PRESENTS
              </span>
            </div>

            {/* Sub-label DSSA PRESENTS */}


            {/* Main title */}
            <h1
              className="font-pixel text-2xl sm:text-3xl md:text-5xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 leading-none mb-3"
              style={{
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.8))",
              }}
            >
              Prarambha <span className="text-red-500 drop-shadow-[0_0_15px_rgba(232,64,64,0.6)]">2.0</span>
            </h1>


            <p className="font-sans text-xs sm:text-sm md:text-base text-gray-300 mb-6 sm:mb-8 font-medium leading-relaxed max-w-lg"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}>
              Immerse yourself in a 24-hour hackathon. Solve real-world problems, build innovative solutions, and showcase your creativity across emerging technology domains.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 py-4 sm:px-8 sm:py-4 font-pixel text-white bg-gradient-to-r from-red-600/90 to-red-500/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_0_20px_rgba(232,64,64,0.4)] hover:shadow-[0_0_30px_rgba(232,64,64,0.7)] hover:from-red-500 hover:to-red-400 transition-all duration-300 overflow-hidden"
                aria-label="Register for Prarambha 2.0 on Unstop"
                onClick={playClickSound}
              >
                <span className="relative z-10 text-[0.6rem] sm:text-[0.7rem] tracking-widest flex items-center gap-2 sm:gap-3 mc-text-shadow group-hover:scale-105 transition-transform duration-300">
                  <Icon icon="pixelarticons:play" width="16" height="16" /> REGISTER NOW
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>

              <a
                href="#timeline"
                className="group relative inline-flex items-center justify-center px-6 py-4 sm:px-6 sm:py-4 font-pixel text-gray-300 hover:text-white bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                onClick={playClickSound}
              >
                <span className="relative z-10 text-[0.6rem] sm:text-[0.7rem] tracking-widest group-hover:scale-105 transition-transform duration-300">VIEW SCHEDULE</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stats Only */}
          <div className="w-full lg:absolute lg:bottom-0 lg:right-0 flex flex-col items-center lg:items-end lg:w-auto mt-12 lg:mt-0 z-20">

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <StatChip icon={<Icon icon="pixelarticons:calendar" width="24" height="24" />} label="Start Date" value="SEP 20, 2026" />
              <StatChip icon={<Icon icon="pixelarticons:coins" width="24" height="24" />} label="Prize Pool" value="Exciting Cash Prizes" />
              <StatChip icon={<Icon icon="pixelarticons:users" width="24" height="24" />} label="Team Size" value="4 MEMBERS" />
              <StatChip icon={<Icon icon="pixelarticons:clock" width="24" height="24" />} label="Duration" value="24 HOURS" />
            </div>
          </div>
        </motion.div>

        {/* ── "Generating world…" footer bar ── */}
        <div className="absolute bottom-0 inset-x-0 z-10 bg-[#0D0D0D]/60 backdrop-blur-xl border-t border-white/10 flex items-center gap-4 px-6 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
          <span className="font-sans text-xs font-bold text-gray-400 tracking-widest whitespace-nowrap">
            Prarambha 2.0 © 2026
          </span>
          <div className="flex-1 h-[6px] bg-black/60 border border-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_15px_rgba(232,64,64,0.9)]"
              initial={{ width: "0%" }}
              animate={loading ? { width: "75%" } : { width: "100%" }}
              transition={{ duration: loading ? 2 : 0.4, ease: "easeInOut" }}
            />
          </div>
          <span className="font-pixel text-[0.5rem] text-red-400 tracking-widest whitespace-nowrap drop-shadow-[0_0_5px_rgba(232,64,64,0.6)]">
            {loading ? "GENERATING WORLD..." : "WORLD READY"}
          </span>
        </div>
      </section>
    </>
  );
}
