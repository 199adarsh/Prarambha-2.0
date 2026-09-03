"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { gsap, ScrollTrigger, useGSAP } from "../utils/gsap";

/* ── Milestone data ──────────────────────────────────────────────── */
const MILESTONES = [
  {
    id: 1,
    label: "Registrations Open",
    icon: "pixelarticons:map",
    date: "Registration open till Sep 19, 2026",
    desc: "Secure your spot in the hackathon and register your team.",
    phase: "CLUE 1",
    highlight: false,
  },
  {
    id: 2,
    label: "Round 1 – Online Hackathon",
    icon: "pixelarticons:compass",
    date: "Sep 20 – 21, 2026",
    desc: "The 24-hour hackathon begins. Solve the problem and build your innovative solution.",
    phase: "CLUE 2",
    highlight: false,
  },
  {
    id: 3,
    label: "Round 1 Results",
    icon: "pixelarticons:key",
    date: "Sep 30, 2026",
    desc: "Announcement of the teams shortlisted for the final round.",
    phase: "CLUE 3",
    highlight: false,
  },
  {
    id: 4,
    label: "Round 2 – Grand Finale",
    icon: "pixelarticons:gift",
    date: "Oct 3, 2026",
    desc: "Offline final presentation, project demonstration, and final evaluation.",
    phase: "THE TREASURE",
    highlight: true,
  },
] as const;

/* ── Horizontal Timeline Card ─────────────────────────────────────── */
function TimelineCard({
  milestone,
  index,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const isTop = index % 2 === 0;

  return (
    <div
      data-timeline-card
      className="relative flex-shrink-0 flex flex-col items-center justify-center h-[500px]"
      style={{ width: "clamp(320px, 35vw, 400px)" }}
    >
      {/* ── Node (Icon) on the horizontal track ── */}
      <div
        data-timeline-node
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 border-2 flex items-center justify-center bg-[#020B14] rounded-full transition-colors duration-300 ${
          milestone.highlight
            ? "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] text-white"
            : "border-cyan-900 text-cyan-400 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        }`}
      >
        <Icon icon={milestone.icon} width="22" height="22" />
      </div>

      {/* ── Vertical connector from the node to the card ── */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b ${
          isTop
            ? "bottom-1/2 h-24 from-transparent to-cyan-900/60"
            : "top-1/2 h-24 from-cyan-900/60 to-transparent"
        } z-0`}
      />

      {/* ── Card body ── */}
      <div
        data-timeline-card-body
        className={`absolute w-full px-4 z-20 ${
          isTop ? "bottom-[calc(50%+4rem)]" : "top-[calc(50%+4rem)]"
        }`}
      >
        <div
          onClick={() => setUnlocked(true)}
          className={`
            p-6 rounded-xl border backdrop-blur-xl group relative overflow-hidden transition-all duration-300 cursor-pointer
            ${
              milestone.highlight
                ? "border-yellow-400/50 bg-yellow-900/20 shadow-[0_0_30px_rgba(250,204,21,0.2)] hover:shadow-[0_0_40px_rgba(250,204,21,0.4)]"
                : "border-white/10 bg-black/60 hover:bg-black/80 hover:border-cyan-400/50 shadow-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            }
          `}
        >
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Reveal Overlay */}
          <AnimatePresence>
            {!unlocked && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
              >
                <Icon
                  icon="pixelarticons:lock"
                  className="text-cyan-400 text-3xl mb-3 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-pixel text-xs text-white tracking-widest group-hover:text-cyan-300 transition-colors">
                  TAP TO REVEAL
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={`relative z-10 flex flex-col gap-3 transition-all duration-500 ${!unlocked ? "opacity-0 blur-sm scale-95" : "opacity-100 blur-0 scale-100"}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[0.65rem] font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <span
                  className={`w-2 h-2 inline-block rounded-full ${milestone.highlight ? "bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.8)]" : "bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]"}`}
                />
                {milestone.phase}
              </span>
              
              <div className="font-sans text-[0.65rem] font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                <Icon icon="pixelarticons:clock" className="text-cyan-500" />
                {milestone.date.split(" ")[0]}
              </div>
            </div>

            <h3
              className={`font-pixel text-lg md:text-xl mt-1 leading-snug ${
                milestone.highlight
                  ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                  : "text-white"
              }`}
            >
              {milestone.label}
            </h3>

            <p className="font-sans text-sm text-gray-300 leading-relaxed opacity-90">
              {milestone.desc}
            </p>
            
            {milestone.highlight && (
              <div className="mt-2 text-xs font-pixel text-yellow-300 bg-yellow-500/10 border border-yellow-500/30 px-3 py-2 rounded-md inline-block w-fit">
                GRAND FINALE
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section wrapper (pinned horizontal scroll) ──────────────────── */
export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !track) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Calculate how far we need to scroll horizontally
      // We want to scroll exactly enough to show the last card, plus a little padding
      const getScrollAmount = () => {
        const trackScrollWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackScrollWidth - viewportWidth);
      };

      // ── Main horizontal scroll tween ──
      const scrollTween = gsap.to(track, {
        x: () => getScrollAmount(),
        ease: "none",
      });

      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + Math.abs(getScrollAmount()),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        animation: scrollTween,
      });

      // ── Horizontal progress bar ──
      if (progress && !prefersReduced) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => "+=" + Math.abs(getScrollAmount()),
          scrub: 0.5,
          animation: gsap.fromTo(
            progress,
            { scaleX: 0 },
            { scaleX: 1, ease: "none" }
          ),
          onUpdate: () => {
            import("../utils/sounds").then((mod) => mod.playScrollTickSound());
          },
        });
      }

      // ── Card reveals as they enter viewport during horizontal scroll ──
      if (!prefersReduced) {
        const cards = track.querySelectorAll("[data-timeline-card]");
        cards.forEach((card, i) => {
          const cardBody = card.querySelector("[data-timeline-card-body]");
          if (cardBody) {
            gsap.from(cardBody, {
              opacity: 0,
              y: i % 2 === 0 ? 40 : -40,
              scale: 0.95,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });

        // Node pop-in
        const nodes = track.querySelectorAll("[data-timeline-node]");
        nodes.forEach((node) => {
          gsap.from(node, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: node,
              containerAnimation: scrollTween,
              start: "left 90%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                import("../utils/sounds").then((mod) => mod.playPopSound());
              },
            },
          });
        });
      }

      // ── Video parallax ──
      if (videoRef.current && !prefersReduced) {
        gsap.to(videoRef.current, {
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + Math.abs(getScrollAmount()),
            scrub: true,
          },
        });
      }

      // ── Header reveal ──
      if (!prefersReduced) {
        const header = track.querySelector("[data-timeline-header]");
        if (header) {
          gsap.from(header.children, {
            opacity: 0,
            y: 30,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      return () => {
        pinTrigger.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative w-full h-screen overflow-hidden bg-[#020B14]"
      aria-label="Event Timeline"
    >
      {/* Video Background — wider to accommodate parallax */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-[120%] h-full object-cover z-0 opacity-30"
      >
        <source src="/minecraft-underwater-bg.mp4" type="video/mp4" />
      </video>

      {/* Oceanic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020B14] via-[#020B14]/70 to-[#020B14] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent z-0 pointer-events-none" />

      {/* ── Horizontal progress bar (fixed at bottom of pinned section) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-cyan-900/30">
        <div
          ref={progressRef}
          className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"
          style={{ transformOrigin: "left", transform: "scaleX(0)" }}
        />
      </div>

      {/* ── Global Horizontal Track Line (Fixed in center) ── */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] border-t-[2px] border-dashed border-cyan-900/50 z-0 pointer-events-none" />

      {/* ── The horizontal track (everything scrolls together) ── */}
      <div
        ref={trackRef}
        className="relative z-10 flex h-full items-center w-max"
        style={{ willChange: "transform" }}
      >
        {/* ── Header panel (first viewport-width block) ── */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center px-8"
          style={{ width: "100vw" }}
        >
          <div data-timeline-header className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-3 border border-cyan-900 bg-cyan-900/30 px-5 py-2 mb-8 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(8,145,178,0.2)]">
              <Icon
                icon="pixelarticons:hourglass"
                className="text-cyan-400 text-xl"
              />
              <span className="font-sans text-xs font-bold text-cyan-300 tracking-[0.25em]">
                CHAPTER 02
              </span>
            </div>

            <h2
              className="font-pixel text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight"
              style={{ textShadow: "4px 4px 0 #083344" }}
            >
              TIMELINE
            </h2>
            <p
              className="font-sans text-gray-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
            >
              Track the journey of Prarambha 2.0 from registration to the
              final presentation round.
            </p>

            {/* Scroll hint */}
            <div className="mt-12 flex items-center gap-4 text-cyan-400/80 bg-cyan-950/30 px-6 py-3 rounded-full border border-cyan-900/50 backdrop-blur-sm">
              <span className="font-pixel text-[0.6rem] tracking-[0.3em] uppercase">
                Scroll to explore
              </span>
              <div className="flex -space-x-2">
                <Icon icon="pixelarticons:chevron-right" className="text-lg animate-pulse" style={{ animationDelay: "0ms" }} />
                <Icon icon="pixelarticons:chevron-right" className="text-lg animate-pulse" style={{ animationDelay: "150ms" }} />
                <Icon icon="pixelarticons:chevron-right" className="text-lg animate-pulse" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Horizontal card strip ── */}
        <div className="flex-shrink-0 flex items-center pr-[15vw]">
          {MILESTONES.map((m, i) => (
            <TimelineCard key={m.id} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
