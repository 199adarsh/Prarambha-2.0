"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@iconify/react";

/* ── Milestone data ──────────────────────────────────────────────── */
const MILESTONES = [
  {
    id: 1,
    label: "Registrations Open",
    icon: "pixelarticons:map",
    date: "Registration open till Sept 19, 2026",
    desc: "Secure your spot in the hackathon and register your team.",
    phase: "LEVEL 1",
    highlight: false,
  },
  {
    id: 2,
    label: "Round 1 – Online Hackathon",
    icon: "pixelarticons:compass",
    date: "Sep 20 – 21, 2026",
    desc: "The Online 24-hour hackathon (20 Sept 10 AM to 21 Sept 10 AM) begins. Solve the problem and build your innovative solution.",
    phase: "LEVEL 2",
    highlight: false,
  },
  {
    id: 3,
    label: "Round 1 Results",
    icon: "pixelarticons:key",
    date: "Sep 30, 2026",
    desc: "Announcement of the teams shortlisted for the final round.",
    phase: "LEVEL 3",
    highlight: false,
  },
  {
    id: 4,
    label: "Round 2 – Grand Finale",
    icon: "pixelarticons:trophy",
    date: "Oct 3, 2026",
    desc: "Offline final presentation, project demonstration, and final evaluation.",
    phase: "BOSS STAGE",
    highlight: true,
  },
] as const;

/* ── Vertical Timeline Card ─────────────────────────────────────── */
function TimelineCard({
  milestone,
  index,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex w-full my-4 md:my-8 justify-start md:justify-center">
      {/* ── Node (Icon) on the vertical track ── */}
      <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-20 w-10 h-10 md:w-12 md:h-12 border-[3px] shadow-[3px_3px_0_#000] flex items-center justify-center bg-[#020B14] transition-colors duration-300 pixel-corners hover:scale-110 cursor-pointer"
        style={{
          borderColor: milestone.highlight ? "#facc15" : "#22d3ee",
          color: milestone.highlight ? "#facc15" : "#22d3ee"
        }}
        onClick={() => {
          setUnlocked(true);
          import("../utils/sounds").then((mod) => mod.playPopSound());
        }}
      >
        <Icon icon={milestone.icon} className="w-5 h-5 md:w-6 md:h-6" />
      </div>

      {/* ── Desktop Layout: Two Halves ── */}
      <div className="hidden md:flex w-full items-center justify-between">
        {/* Left Side */}
        <div className="w-[45%] flex justify-end pr-10">
          {isLeft ? (
            <TimelineCardContent milestone={milestone} unlocked={unlocked} setUnlocked={setUnlocked} />
          ) : (
            <TimelineDate milestone={milestone} alignment="right" />
          )}
        </div>

        {/* Right Side */}
        <div className="w-[45%] flex justify-start pl-10">
          {!isLeft ? (
            <TimelineCardContent milestone={milestone} unlocked={unlocked} setUnlocked={setUnlocked} />
          ) : (
            <TimelineDate milestone={milestone} alignment="left" />
          )}
        </div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="flex md:hidden w-full pl-20 pr-4 justify-start">
        <TimelineCardContent milestone={milestone} unlocked={unlocked} setUnlocked={setUnlocked} showDateOnMobile={true} />
      </div>
    </div>
  );
}

function TimelineDate({ milestone, alignment }: { milestone: (typeof MILESTONES)[number], alignment: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: alignment === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col justify-center ${alignment === "right" ? "items-end text-right" : "items-start text-left"}`}
    >
      <div className="font-pixel text-xs text-cyan-400 mb-1 tracking-widest drop-shadow-[1px_1px_0_#000]">
        {milestone.date.split(" ")[0]} {milestone.date.split(" ")[1]}
      </div>
      <div className="font-sans text-sm text-gray-400 font-medium">
        {milestone.date.split(" ").slice(2).join(" ")}
      </div>
    </motion.div>
  );
}

function TimelineCardContent({
  milestone,
  unlocked,
  setUnlocked,
  showDateOnMobile = false
}: {
  milestone: (typeof MILESTONES)[number];
  unlocked: boolean;
  setUnlocked: (val: boolean) => void;
  showDateOnMobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      onClick={() => {
        setUnlocked(true);
        if (!unlocked) import("../utils/sounds").then((mod) => mod.playScrollTickSound());
      }}
      className={`
        w-full p-4 border-[3px] shadow-[4px_4px_0_#000] group relative overflow-hidden transition-all duration-300 cursor-pointer pixel-corners
        ${milestone.highlight
          ? "border-yellow-400 bg-yellow-900/40 hover:bg-yellow-800/60"
          : "border-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/60"
        }
      `}
    >
      {/* Pixelated grid overlay */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/pixel-weave.png')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Reveal Overlay */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm border-[3px] border-dashed border-cyan-500/50"
          >
            <Icon
              icon="pixelarticons:lock"
              className="text-cyan-400 text-3xl mb-2 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-pixel text-[10px] text-white tracking-widest group-hover:text-cyan-300 transition-colors animate-pulse">
              CLICK TO UNLOCK
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`relative z-10 flex flex-col gap-2 transition-all duration-500 ${!unlocked ? "opacity-0 blur-sm scale-95" : "opacity-100 blur-0 scale-100"}`}
      >
        <div className="flex items-center justify-between border-b-2 border-white/10 pb-1.5">
          <span className="font-pixel text-[10px] text-cyan-300 tracking-widest uppercase flex items-center gap-1.5">
            <span
              className={`w-2 h-2 inline-block ${milestone.highlight ? "bg-yellow-400" : "bg-cyan-400"} pixel-corners`}
            />
            {milestone.phase}
          </span>

          {showDateOnMobile && (
            <div className="md:hidden font-pixel text-[8px] sm:text-[9px] text-gray-300 bg-black/50 px-1.5 py-0.5 border border-gray-600 flex items-center gap-1 w-fit max-w-[70%] sm:max-w-none">
              <Icon icon="pixelarticons:clock" className="text-cyan-500 shrink-0" />
              <span className="whitespace-normal leading-tight">{milestone.date}</span>
            </div>
          )}
        </div>

        <h3
          className={`font-pixel text-lg md:text-xl mt-1 leading-snug ${milestone.highlight
            ? "text-yellow-400 drop-shadow-[2px_2px_0_#000]"
            : "text-white drop-shadow-[2px_2px_0_#000]"
            }`}
        >
          {milestone.label}
        </h3>

        <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed border-l-2 pl-2 border-white/20 mt-1">
          {milestone.desc}
        </p>

        {milestone.highlight && (
          <div className="mt-2 text-[10px] font-pixel text-black bg-yellow-400 border border-white px-2 py-1 inline-block w-fit shadow-[2px_2px_0_#000] animate-bounce">
            FINAL BATTLE
          </div>
        )}
      </div>
    </motion.div>
  );
}


/* ── Section wrapper ──────────────────── */
export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative w-full py-16 bg-[#020B14] overflow-hidden"
      aria-label="Event Timeline"
    >
      {/* CSS for pixel corners */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .pixel-corners {
          clip-path: polygon(
            0 4px, 4px 4px, 4px 0, 
            calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 
            100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 
            4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
          );
        }
      `}} />

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full opacity-10 mix-blend-screen pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/minecraft-underwater-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#020B14]/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center flex flex-col items-center mb-10 md:mb-16">
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-black border-2 border-cyan-500 px-4 py-1.5 mb-4 shadow-[3px_3px_0_#0891b2] pixel-corners"
          >
            <Icon
              icon="pixelarticons:gamepad"
              className="text-cyan-400 text-xl animate-pulse"
            />
            <span className="font-pixel text-xs text-cyan-300 tracking-[0.2em]">
              STAGE SELECT
            </span>
          </motion.div>

          <motion.h2
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl md:text-5xl text-white mb-4 uppercase"
            style={{ textShadow: "3px 3px 0 #0891b2, 6px 6px 0 #000" }}
          >
            Quest Log
          </motion.h2>

          <motion.p
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-pixel text-gray-400 text-[10px] md:text-xs max-w-lg mx-auto leading-relaxed border border-dashed border-gray-600 p-3 bg-black/50"
          >
            Track your progress through the hackathon. Unlock each level to see what awaits.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Track Line */}
          <div className="absolute left-11 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 bg-cyan-900/30 border-x border-dashed border-cyan-800 z-0"></div>

          <div className="flex flex-col">
            {MILESTONES.map((m, i) => (
              <TimelineCard key={m.id} milestone={m} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
