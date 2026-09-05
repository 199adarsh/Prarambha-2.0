"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { playDingSound } from "../utils/sounds";
import { Icon } from "@iconify/react";
import { gsap, useGSAP } from "../utils/gsap";

/* ── Prize data ──────────────────────────────────────────────────── */
const DOMAINS = [
  {
    rank: "THEME 01",
    amount: "MEDITECH",
    rarity: "WELLNESS",
    rarityColor: "#FDE047",
    borderColor: "#FDE047",
    glowColor: "rgba(253,224,71,0.4)",
    chestImage: "/chests/HELTH.png",
    desc: "Innovate health-tech solutions",
    contact: "MediTech Head- Farheen : +91 84465 44528",
    problemStatements: [
      "AI-driven early disease prediction",
      "Remote patient monitoring systems",
      "Smart hospital resource management",
    ],
  },
  {
    rank: "THEME 02",
    amount: "AGENTIC AI",
    rarity: "INTELLIGENCE",
    rarityColor: "#93C5FD",
    borderColor: "#93C5FD",
    glowColor: "rgba(147,197,253,0.3)",
    chestImage: "/chests/AGENT.png",
    desc: "Build autonomous AI agents",
    contact: "Contact - Shahid : +91 72767 76558",
    problemStatements: [
      "Autonomous coding and debugging assistants",
      "Automated multi-step customer support agents",
      "AI agents for automated data analysis and reporting",
    ],
  },
  {
    rank: "THEME 03",
    amount: "EDUTECH",
    rarity: "EDUCATION",
    rarityColor: "#86EFAC",
    borderColor: "#86EFAC",
    glowColor: "rgba(134,239,172,0.3)",
    chestImage: "/chests/EDU.png",
    desc: "Revolutionize learning experiences",
    contact: "Contact - Adarsh : +91 96651 53311",
    problemStatements: [
      "Personalized AI learning paths",
      "Gamified virtual classrooms",
      "Automated assessment and feedback tools",
    ],
  },
  {
    rank: "THEME 04",
    amount: "AGRITECH",
    rarity: "AGRICULTURE",
    rarityColor: "#FCA5A5",
    borderColor: "#FCA5A5",
    glowColor: "rgba(252,165,165,0.3)",
    chestImage: "/chests/AGRI.png",
    desc: "Empower agriculture through tech",
    contact: "Contact - Saniya : +91 92702 26272",
    problemStatements: [
      "IoT-based smart irrigation systems",
      "Crop disease prediction models",
      "Supply chain optimization for farmers",
    ],
  },
] as const;

/* ── Prize tiers ─────────────────────────────────────────────────── */
const PRIZE_TIERS = [
  {
    label: "GRAND PRIZE",
    items: [{ text: "22K PRIZE POOL" }],
    borderColor: "#FDE047",
    labelColor: "#FDE047",
    height: "h-32",
    textSize: "text-lg md:text-2xl",
  },
  {
    label: "PERKS",
    items: [
      { text: "CERTIFICATES" },
      { text: "REFRESHMENTS" },
    ],
    borderColor: "#FBBF24",
    labelColor: "#FBBF24",
    height: "h-28",
    textSize: "text-sm md:text-xl",
  },
  {
    label: "ADDITIONAL REWARDS",
    items: [
      { text: "SWAGS" },
      { text: "MENTORSHIP" },
      { text: "NETWORKING" },
    ],
    borderColor: "#9CA3AF",
    labelColor: "#9CA3AF",
    height: "h-24",
    textSize: "text-xs md:text-base",
  },
] as const;

/* ── Loot chest image with scroll-triggered glow ─────────────────── */
function LootChest({
  isOpen,
  src,
  alt,
  glowColor,
}: {
  isOpen: boolean;
  src: string;
  alt: string;
  glowColor: string;
}) {
  return (
    <div className="relative mx-auto w-44 h-44 z-10">
      <motion.div
        className="relative w-full h-full"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={
          isOpen
            ? { scale: 1, opacity: 1 }
            : { scale: 0.85, opacity: 0 }
        }
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 120,
          damping: 14,
        }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={isOpen ? { y: [0, -8, 0] } : { y: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            style={{ imageRendering: "pixelated" }}
            sizes="176px"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Glow pulse when visible */}
      {isOpen && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.4] }}
          transition={{ delay: 0.3, duration: 1.2, times: [0, 0.4, 1] }}
          style={{
            background: `radial-gradient(ellipse at 50% 70%, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(12px)",
          }}
        />
      )}
    </div>
  );
}

/* ── Theme Modal ─────────────────────────────────────────────────── */
function ThemeModal({
  theme,
  onClose,
}: {
  theme: (typeof DOMAINS)[number] | null;
  onClose: () => void;
}) {
  if (!theme) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        className="relative z-10 w-full max-w-lg bg-[#0F172A] border-2 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl"
        style={{
          borderColor: theme.borderColor,
          boxShadow: `0 0 40px ${theme.glowColor}`,
        }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <Icon icon="pixelarticons:close" className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <Image
            src={theme.chestImage}
            alt={theme.rank}
            width={80}
            height={80}
            className="mb-4"
            style={{ imageRendering: "pixelated" }}
          />

          <h3
            className="font-pixel text-2xl md:text-3xl mb-2"
            style={{
              color: theme.rarityColor,
              textShadow: `0 0 10px ${theme.glowColor}`,
            }}
          >
            {theme.rank}
          </h3>

          <p className="font-sans text-sm text-gray-300 mb-6">{theme.desc}</p>

          <div className="w-full text-left">
            <h4 className="font-pixel text-sm md:text-base text-gray-400 tracking-widest mb-4 border-b border-white/10 pb-2">
              PROBLEM STATEMENTS
            </h4>
            <div className="font-sans text-base md:text-lg font-medium text-amber-500 bg-amber-500/10 p-4 border border-amber-500/20 rounded-lg text-center flex flex-col gap-2">
              <span>Problem statements will be displayed on 20 Sept</span>
              <span className="text-sm text-amber-500/80">Contact: {theme.contact}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Individual prize chest card with 3D tilt ────────────────────── */
function PrizeCard({
  prize,
  index,
  onClick,
}: {
  prize: (typeof DOMAINS)[number];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 3D cursor tilt — desktop only
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    };

    const onLeave = () => {
      el.style.transform = "";
      el.style.transition = "transform 0.4s ease";
      setTimeout(() => {
        if (el) el.style.transition = "";
      }, 400);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // GSAP scroll reveal
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsVisible(true);
        return;
      }
      const el = ref.current;
      if (!el) return;

      gsap.from(el, {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.6,
        delay: index * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
          onEnter: () => setIsVisible(true),
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      data-prize-card
      onClick={onClick}
      onMouseEnter={() => playDingSound()}
      className="group relative flex flex-col items-center gap-4 p-6 rounded-xl border backdrop-blur-md cursor-pointer transition-shadow duration-300"
      style={{
        background: "rgba(17, 24, 39, 0.65)",
        borderColor: "rgba(255, 255, 255, 0.05)",
        boxShadow: isVisible ? `0 0 40px ${prize.glowColor}` : "none",
        willChange: "transform",
      }}
    >
      {/* Hover glow outline */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ border: `1px solid ${prize.borderColor}` }}
      />

      {/* Rank label */}
      <div
        className="relative z-10 font-pixel text-xs tracking-widest px-4 py-2 border rounded-md backdrop-blur-sm"
        style={{
          color: prize.rarityColor,
          borderColor: `${prize.borderColor}40`,
          background: `${prize.borderColor}10`,
        }}
      >
        {prize.rank}
      </div>

      {/* Loot chest */}
      <LootChest
        isOpen={isVisible}
        src={prize.chestImage}
        alt={`${prize.rank} loot chest`}
        glowColor={prize.glowColor}
      />

      {/* Rarity badge */}
      <div
        className="relative z-10 font-pixel text-[0.6rem] md:text-xs px-3 py-2 rounded-sm"
        style={{
          background: `${prize.rarityColor}15`,
          border: `1px solid ${prize.rarityColor}50`,
          color: prize.rarityColor,
        }}
      >
        ★ {prize.rarity}
      </div>

      {/* Amount */}
      <div
        className="relative z-10 font-pixel text-2xl tracking-wide"
        style={{
          color: prize.rarityColor,
          textShadow: `0 0 10px ${prize.glowColor}`,
        }}
      >
        {prize.amount}
      </div>

      <p className="relative z-10 font-sans text-xs text-gray-400 text-center">
        {prize.desc}
      </p>

      <div className="relative z-10 w-full pt-3 border-t border-white/10 flex flex-col items-center gap-1 text-center">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Tap to view</span>
        <span className="text-xs text-gray-300 font-sans">{prize.contact}</span>
      </div>
    </div>
  );
}

/* ── Prize slot ────────────────────────────────────────────────── */
function PrizeSlot({
  borderColor,
  height,
  textSize,
  item,
}: {
  borderColor: string;
  height: string;
  textSize: string;
  item: { text: string };
}) {
  return (
    <div
      className={`flex items-center justify-center ${height} flex-1 rounded-lg border relative overflow-hidden backdrop-blur-sm transition-all duration-300 group hover:bg-white/5`}
      style={{
        background: "rgba(17, 24, 39, 0.5)",
        borderColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 20px ${borderColor}20` }}
      />

      {/* Prize Text */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-3 group-hover:scale-110 transition-transform duration-300 pointer-events-none p-2 text-center">
        <span
          className={`font-pixel ${textSize} tracking-widest text-gray-400 group-hover:text-white transition-colors drop-shadow-md`}
          style={{ textShadow: `0 0 10px ${borderColor}40` }}
        >
          {item.text}
        </span>
      </div>
    </div>
  );
}

/* ── Prize tier row ────────────────────────────────────────────── */
function PrizeTier({
  tier,
  index,
}: {
  tier: (typeof PRIZE_TIERS)[number];
  index: number;
}) {
  return (
    <div data-prize-tier className="flex flex-col gap-2">
      {/* Tier label */}
      <div className="flex items-center gap-3">
        <div
          className="h-[1px] flex-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${tier.borderColor}40)`,
          }}
        />
        <span
          className="font-pixel text-[0.6rem] md:text-sm tracking-widest px-4"
          style={{
            color: tier.labelColor,
            textShadow: `0 0 8px ${tier.borderColor}40`,
          }}
        >
          {tier.label}
        </span>
        <div
          className="h-[1px] flex-1"
          style={{
            background: `linear-gradient(-90deg, transparent, ${tier.borderColor}40)`,
          }}
        />
      </div>

      {/* Slots */}
      <div className="flex gap-3">
        {tier.items.map((item, i) => (
          <PrizeSlot
            key={i}
            item={item}
            borderColor={tier.borderColor}
            height={tier.height}
            textSize={tier.textSize}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Section separator ───────────────────────────────────────────── */
function BlockSeparator({ color = "#FDE047" }: { color?: string }) {
  return (
    <div className="flex w-full h-[2px] my-16 opacity-30" aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-full mx-1"
          style={{ background: color, filter: "blur(1px)" }}
        />
      ))}
    </div>
  );
}

/* ── Section wrapper ─────────────────────────────────────────────── */
export default function PrizesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedTheme, setSelectedTheme] = useState<
    (typeof DOMAINS)[number] | null
  >(null);

  // ── Prize header reveal ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const header = sectionRef.current?.querySelector(
        "[data-prizes-header]"
      );
      if (!header) return;

      gsap.from(header.children, {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  // ── Prizes header reveal ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const header = sectionRef.current?.querySelector(
        "[data-prizes-awards-header]"
      );
      if (!header) return;

      gsap.from(header.children, {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  // ── Prize tiers alternating slide ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tiers = sectionRef.current?.querySelectorAll(
        "[data-prize-tier]"
      );
      if (!tiers || tiers.length === 0) return;

      tiers.forEach((tier, i) => {
        gsap.from(tier, {
          opacity: 0,
          x: i % 2 === 0 ? -50 : 50,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tier,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-[#0A0F15]"
      aria-label="Prize pool and sponsors section"
    >
      {/* Spooky Fog Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/spooky-forest-bg.jpg"
          alt="Spooky Foggy Forest"
          fill
          className="object-cover opacity-25 object-bottom"
          priority
        />
        {/* Fog Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F15] via-transparent to-[#0A0F15]" />
        <div className="absolute inset-0 bg-[#0A0F15]/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* ── DOMAINS ── */}
        <div id="prizes">
          <div
            data-prizes-header
            className="mb-16 flex flex-col items-center text-center"
          >
            <div className="inline-block border border-yellow-400/30 bg-yellow-400/10 backdrop-blur-md rounded-md px-3 py-1 mb-6">
              <span className="font-sans text-xs font-bold text-yellow-300 tracking-widest drop-shadow-[0_0_5px_rgba(253,224,71,0.5)]">
                CHAPTER 04A
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="pixelarticons:map"
                className="text-yellow-400 text-4xl drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]"
              />
              <h2
                className="font-pixel text-4xl md:text-5xl text-yellow-400"
                style={{ textShadow: "0 0 15px rgba(253,224,71,0.4)" }}
              >
                THEMES
              </h2>
            </div>
            <p className="font-sans text-gray-400 text-sm md:text-base max-w-lg">
              Explore the themes and choose your path for Prarambha 2.0.{" "}
            </p>
          </div>

          {/* Chest cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOMAINS.map((prize, i) => (
              <PrizeCard
                key={prize.rank}
                prize={prize}
                index={i}
                onClick={() => setSelectedTheme(prize)}
              />
            ))}
          </div>
        </div>

        {/* Separator */}
        <BlockSeparator color="#FDE047" />

        {/* ── PRIZES & AWARDS ── */}
        <div id="prizes-awards">
          <div
            data-prizes-awards-header
            className="mb-12 flex flex-col items-center text-center"
          >
            <div className="inline-block border border-red-500/30 bg-red-500/10 backdrop-blur-md rounded-md px-3 py-1 mb-6">
              <span className="font-sans text-xs font-bold text-red-400 tracking-widest drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                CHAPTER 04B
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="pixelarticons:trophy"
                className="text-red-500 text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              />
              <h2
                className="font-pixel text-4xl md:text-5xl text-red-500"
                style={{ textShadow: "0 0 15px rgba(239,68,68,0.4)" }}
              >
                PRIZES & AWARDS
              </h2>
            </div>
            <p className="font-sans text-gray-400 text-sm md:text-base max-w-lg">
              Unlock epic loot and claim your rewards.
            </p>
          </div>

          {/* Tier hierarchy */}
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {PRIZE_TIERS.map((tier, i) => (
              <PrizeTier key={tier.label} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTheme && (
          <ThemeModal
            theme={selectedTheme}
            onClose={() => setSelectedTheme(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
