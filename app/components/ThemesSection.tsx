"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Icon } from '@iconify/react';

const THEMES = [
  {
    id: 1,
    title: "MEDITECH",
    icon: "pixelarticons:heart",
    desc: "Innovate solutions for modern healthcare challenges, improving patient care and medical systems.",
    color: "from-rose-500/20 to-transparent",
    border: "group-hover:border-rose-500/50"
  },
  {
    id: 2,
    title: "Agentic AI",
    icon: "pixelarticons:cpu",
    desc: "Build autonomous AI agents that can reason, plan, and execute complex workflows.",
    color: "from-cyan-500/20 to-transparent",
    border: "group-hover:border-cyan-500/50"
  },
  {
    id: 3,
    title: "Edutech",
    icon: "pixelarticons:book-open",
    desc: "Transform the future of education with accessible, engaging, and smart learning tools.",
    color: "from-amber-500/20 to-transparent",
    border: "group-hover:border-amber-500/50"
  },
  {
    id: 4,
    title: "Agritech",
    icon: "pixelarticons:leaf",
    desc: "Empower agriculture through technology to increase yield, sustainability, and efficiency.",
    color: "from-emerald-500/20 to-transparent",
    border: "group-hover:border-emerald-500/50"
  }
];

export default function ThemesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  return (
    <section
      id="themes"
      className="relative w-full py-20 md:py-32 bg-[#020B14] overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#020B14] to-[#020B14] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">

        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 border-2 border-cyan-900 bg-cyan-900/20 px-4 py-2 mb-6 backdrop-blur-md rounded-lg">
            <Icon icon="pixelarticons:lightbulb-on" className="text-cyan-400 text-xl" />
            <span className="font-sans text-xs font-bold text-cyan-300 tracking-[0.2em] uppercase">
              Hackathon Tracks
            </span>
          </div>

          <h2 className="font-pixel text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            style={{ textShadow: "4px 4px 0 #083344" }}>
            THEMES
          </h2>
          <p className="font-sans text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Choose a track that sparks your passion. Build the future across these four pivotal domains.
          </p>
        </div>

        {/* Themes Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {THEMES.map((theme) => (
            <motion.div
              key={theme.id}
              variants={itemVariants}
              onClick={() => alert("Problem statements will be displayed on 20 Sept")}
              className={`
                group relative p-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl 
                overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer
                ${theme.border}
              `}
            >
              {/* Dynamic Glow Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Icon icon={theme.icon} className="text-4xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                </div>

                <h3 className="font-pixel text-2xl text-gray-100 tracking-wider mt-2 group-hover:text-white transition-colors">
                  {theme.title}
                </h3>

                <p className="font-sans text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {theme.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
