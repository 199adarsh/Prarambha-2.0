"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { playClickSound } from "../utils/sounds";
import { gsap, ScrollTrigger, useGSAP } from "../utils/gsap";
import MagneticButton from "./MagneticButton";

/* TODO: Replace with the real Unstop registration link */
const REGISTER_URL = "https://unstop.com/p/prarambh-20-24-hour-innovation-hackathon-dkte-societys-textile-engineering-institute-dktestei-ichalkaranji-maharashtra-1746973?utm_medium=Share&utm_source=aditykha97354&utm_campaign=Online_coding_challenge";

const LOADER_SEGMENTS = 20;

/* ── SplitText Helper ────────────────────────────────────────────── */
function SplitText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split("").map((char, index) => {
        if (char === " ") return <span key={index}>&nbsp;</span>;
        return (
          <span
            key={index}
            className={`split-char ${className}`}
            style={{ opacity: 0, transform: "translateY(30px)", display: "inline-block" }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

/* ── World-gen loading screen ─────────────────────────────────────── */
function WorldLoader({ onComplete, isReady }: { onComplete: () => void, isReady: boolean }) {
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

    const interval = setInterval(() => {
      setFilled((prev) => {
        // Stop at 90% (LOADER_SEGMENTS - 2) if not ready
        if (prev < LOADER_SEGMENTS - 2) {
          return prev + 1;
        }
        return prev;
      });
    }, 90);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStatusText(
      STATUSES[Math.floor((Math.min(filled, LOADER_SEGMENTS - 1) / LOADER_SEGMENTS) * (STATUSES.length - 1))]
    );

    // When fake progress is done AND actual resources are ready, complete it
    if (filled >= LOADER_SEGMENTS - 2 && isReady) {
      setFilled(LOADER_SEGMENTS);
      setStatusText("Done!");
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [filled, isReady, onComplete]);

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
          <div
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
        <span style={{ animation: "cursor-blink 1s step-end infinite" }}>
          █
        </span>
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
    <div className="flex-1 min-w-0 sm:min-w-[140px] bg-white/95 backdrop-blur-xl p-2 sm:p-4 flex flex-col items-start gap-1 sm:gap-2 border border-white/20 hover:border-red-500/50 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:bg-white hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="flex items-center gap-1.5 sm:gap-2 relative z-10 w-full">
        <span className="text-red-600 text-lg sm:text-2xl flex items-center justify-center drop-shadow-[0_0_4px_rgba(232,64,64,0.3)] group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
        <span className="font-pixel text-[0.45rem] sm:text-[0.5rem] font-bold text-gray-500 tracking-widest uppercase truncate">
          {label}
        </span>
      </div>
      <span className="font-pixel text-[0.55rem] sm:text-[0.7rem] text-black font-bold drop-shadow-sm relative z-10 mt-0.5">
        {value}
      </span>
    </div>
  );
}

/* ── Main hero component ──────────────────────────────────────────── */
export default function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const isReady = videoLoaded || timeoutReached;

  // ── Cinematic entrance timeline ──
  useGSAP(
    () => {
      if (loading) return;

      const prefersReduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        // Just show everything immediately
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        return;
      }

      const content = contentRef.current;
      if (!content) return;

      // Elements to reveal
      const label = content.querySelector("[data-hero-label]");
      const chars = content.querySelectorAll(".split-char");
      const desc = content.querySelector("[data-hero-desc]");
      const ctas = content.querySelectorAll("[data-hero-cta]");
      const stats = content.querySelectorAll("[data-hero-stat]");
      const footerBar = sectionRef.current?.querySelector(
        "[data-hero-footer]"
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      // Set initial states
      gsap.set(content, { opacity: 1, y: 0 });

      tl.from(label, {
        opacity: 0,
        x: -30,
        duration: 0.6,
      })
        .to(
          chars,
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          desc,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.2"
        )
        .from(
          ctas,
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          stats,
          {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          footerBar!,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.3"
        );
    },
    { scope: sectionRef, dependencies: [loading] }
  );

  // ── Video parallax ──
  useGSAP(
    () => {
      if (loading) return;
      if (!videoRef.current || !sectionRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(videoRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [loading] }
  );

  return (
    <>
      <AnimatePresence>
        {loading && <WorldLoader onComplete={handleLoadComplete} isReady={isReady} />}
      </AnimatePresence>

      <section
        ref={sectionRef}
        id="hero"
        className="relative h-screen w-full flex flex-col justify-start pt-32 lg:pt-0 lg:justify-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          style={{ opacity: (!videoLoaded && timeoutReached) ? 0 : 1 }}
          className="absolute inset-0 w-full h-full object-cover object-bottom z-0 transition-opacity duration-1000"
        >
          <source src="/Minecraft-Hero.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Overlay: Darker on the left for text readability, subtle overall */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/20 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]/40 pointer-events-none z-0" />

        {/* ── Hero content ── */}
        <div
          ref={contentRef}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 md:pb-32 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 md:gap-16"
          style={{ opacity: loading ? 0 : undefined }}
        >
          {/* Left Column: Text & CTA */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl mt-0 lg:-ml-4 xl:-ml-8 mx-auto lg:mx-0 w-full">
            {/* Label */}
            <div
              data-hero-label
              className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6 w-full"
            >
              <span className="w-6 sm:w-8 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              <span className="font-pixel text-[0.5rem] sm:text-[0.6rem] text-gray-300 tracking-[0.4em] uppercase drop-shadow-md mc-text-shadow">
                DSSA PRESENTS
              </span>
            </div>

            {/* Main title */}
            <h1
              ref={titleRef}
              className="font-pixel text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none mb-4"
              style={{
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.8))",
              }}
            >
              <span className="inline-block mr-2 sm:mr-4">
                <SplitText
                  text="Prarambha"
                  className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500"
                />
              </span>
              <span className="text-red-500 drop-shadow-[0_0_15px_rgba(232,64,64,0.6)] inline-block">
                <SplitText text="2.0" />
              </span>
            </h1>

            <p
              data-hero-desc
              className="font-sans text-sm sm:text-base md:text-lg text-gray-300 mb-8 sm:mb-10 font-medium leading-relaxed max-w-2xl px-4 lg:px-0"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}
            >
              Immerse yourself in a 24-hour hackathon. Solve real-world
              problems, build innovative solutions, and showcase your creativity
              across emerging technology domains.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-3 w-full">
              <div data-hero-cta>
                <MagneticButton strength={0.25}>
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 font-pixel text-white bg-gradient-to-r from-red-600/90 to-red-500/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-[0_0_20px_rgba(232,64,64,0.4)] hover:shadow-[0_0_30px_rgba(232,64,64,0.7)] hover:from-red-500 hover:to-red-400 transition-all duration-300 overflow-hidden"
                    aria-label="Register for Prarambha 2.0 on Unstop"
                    onClick={playClickSound}
                  >
                    <span className="relative z-10 text-[0.55rem] sm:text-[0.65rem] tracking-widest flex items-center gap-2 mc-text-shadow group-hover:scale-105 transition-transform duration-300">
                      <Icon icon="pixelarticons:play" width="14" height="14" />{" "}
                      REGISTER NOW
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </a>
                </MagneticButton>
              </div>

              <div data-hero-cta>
                <MagneticButton strength={0.25}>
                  <a
                    href="#timeline"
                    className="group relative inline-flex items-center justify-center px-4 py-3 sm:px-5 sm:py-3.5 font-pixel text-gray-300 hover:text-white bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    onClick={playClickSound}
                  >
                    <span className="relative z-10 text-[0.5rem] sm:text-[0.6rem] tracking-widest group-hover:scale-105 transition-transform duration-300">
                      VIEW SCHEDULE
                    </span>
                  </a>
                </MagneticButton>
              </div>

              <div data-hero-cta>
                <MagneticButton strength={0.25}>
                  <a
                    href="#prizes"
                    className="group relative inline-flex items-center justify-center px-4 py-3 sm:px-5 sm:py-3.5 font-pixel text-cyan-300 hover:text-cyan-100 bg-cyan-950/40 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 rounded-xl transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    onClick={playClickSound}
                  >
                    <span className="relative z-10 text-[0.5rem] sm:text-[0.6rem] tracking-widest group-hover:scale-105 transition-transform duration-300">
                      VIEW THEMES
                    </span>
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: Stats Only */}
          <div className="flex w-full lg:absolute lg:-bottom-10 lg:right-0 flex-col items-center lg:items-end lg:w-auto mt-16 lg:mt-0 z-20">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md">
              <div data-hero-stat>
                <StatChip
                  icon={
                    <Icon
                      icon="pixelarticons:calendar"
                      width="36"
                      height="36"
                    />
                  }
                  label="Start Date"
                  value="SEP 20, 2026"
                />
              </div>
              <div data-hero-stat>
                <StatChip
                  icon={
                    <Icon icon="pixelarticons:coins" width="36" height="36" />
                  }
                  label="Prize Pool"
                  value="20K+"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── "Generating world…" footer bar ── */}
        <div
          data-hero-footer
          className="absolute bottom-0 inset-x-0 z-10 bg-[#0D0D0D]/60 backdrop-blur-xl border-t border-white/10 flex items-center gap-4 px-6 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
        >
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
