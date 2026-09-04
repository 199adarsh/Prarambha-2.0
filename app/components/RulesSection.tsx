"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap, useGSAP } from "../utils/gsap";

/* ── Rule card data ──────────────────────────────────────────────── */
type Rule = {
  id: number;
  num: string;
  icon: JSX.Element;
  title: string;
  body: string[];
};

const RULES: readonly Rule[] = [
  {
    id: 1,
    num: "01/06",
    icon: <Icon icon="pixelarticons:users" width="24" height="24" />,
    title: "TEAM FORMATION",
    body: [
      "Maximum 4 members per team.",
      "Only one submission per team is allowed.",
      "Submission should be made by the team leader.",
      "Team details must be submitted through the Google Form: Team Name, Team Leader Name, Team Members",
    ],
  },
  {
    id: 2,
    num: "02/06",
    icon: <Icon icon="pixelarticons:bullseye" width="24" height="24" />,
    title: "DOMAIN & ROUND RULES",
    body: [
      "The domain must remain the same for the 1st and 2nd rounds."
    ],
  },
  {
    id: 3,
    num: "03/06",
    icon: <Icon icon="pixelarticons:code" width="24" height="24" />,
    title: "DEVELOPMENT & GITHUB",
    body: [
      "GitHub commits are not allowed after the deadline.",
      "A collaborative contribution/addition is compulsory."
    ],
  },
  {
    id: 4,
    num: "04/06",
    icon: <Icon icon="pixelarticons:folder" width="24" height="24" />,
    title: "PROJECT SUBMISSION",
    body: [
      "The following should be submitted:",
      "GitHub Link",
      "Demo Video",
      "PPT (using the provided template)",
      "App/Web Link",
      "Public Google Drive Link, if required"
    ],
  },
  {
    id: 5,
    num: "05/06",
    icon: <Icon icon="pixelarticons:scale" width="24" height="24" />,
    title: "EVALUATION & JUDGING",
    body: [
      "The decision will be finalized by the judges.",
      "The final decision cannot be changed."
    ],
  },
  {
    id: 6,
    num: "06/06",
    icon: <Icon icon="pixelarticons:alert" width="24" height="24" />,
    title: "SUBMISSION CONDITIONS",
    body: [
      "If the required template/submission format is not followed or accessible properly, the submission may be disqualified.",
      "Late submissions will not be accepted."
    ],
  },
] as const;

/* ── Rule card ───────────────────────────────────────────────────── */
function RuleCard({
  rule,
}: {
  rule: Rule;
}) {
  return (
    <div
      data-rule-card
      className="group relative flex flex-col h-full bg-[#0F172A]/80 border-2 border-white/10 hover:border-amber-500/50 p-6 sm:p-8 backdrop-blur-sm transition-colors duration-300"
      style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.5)" }}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

      {/* Top row: icon + card number */}
      <div className="relative z-10 flex items-start justify-between">
        <span
          className="text-2xl w-10 h-10 flex items-center justify-center border-2 border-amber-900 bg-amber-900/20 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
          aria-hidden
        >
          {rule.icon}
        </span>
        <span className="font-sans text-[0.65rem] font-bold text-amber-400 tracking-widest bg-amber-900/30 px-2 py-1 border border-amber-500/30">
          {rule.num}
        </span>
      </div>

      {/* Title */}
      <h3
        className="relative z-10 font-pixel text-[0.7rem] md:text-sm mt-2 text-white"
        style={{ textShadow: "0 0 8px rgba(255,255,255,0.4)" }}
      >
        {rule.title}
      </h3>

      {/* Body */}
      <ul className="relative z-10 font-sans text-sm text-gray-300 leading-relaxed flex-1 mt-3 space-y-1.5 list-disc pl-4 marker:text-amber-500/70">
        {rule.body.map((point, index) => (
          <li key={index} className="pl-1">{point}</li>
        ))}
      </ul>
    </div>
  );
}



/* ── Grass block divider (Night Mode) ────────────────────────────── */
function NightGrassDivider() {
  return (
    <div className="flex w-full h-3 overflow-hidden" aria-hidden>
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-full"
          style={{
            background: i % 2 === 0 ? "#0d2b12" : "#143a1a",
          }}
        />
      ))}
    </div>
  );
}

/* ── Section wrapper ─────────────────────────────────────────────── */
export default function RulesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // ── Split-text heading reveal ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const heading = sectionRef.current?.querySelector(
        "[data-rules-heading]"
      ) as HTMLElement;
      if (!heading) return;

      // Split heading text into characters
      const text = heading.textContent || "";
      heading.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? " "
            : `<span class="split-char" style="opacity:0;transform:translateY(20px)">${char}</span>`
        )
        .join("");

      gsap.to(heading.querySelectorAll(".split-char"), {
        opacity: 1,
        y: 0,
        stagger: 0.025,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  // ── Header elements stagger ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const header = sectionRef.current?.querySelector(
        "[data-rules-header]"
      );
      if (!header) return;

      gsap.from(header.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
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

  // ── Staggered card reveals ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = sectionRef.current?.querySelectorAll("[data-rule-card]");
      if (!cards || cards.length === 0) return;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  // ── Clip-path reveal on "BUILD THE FUTURE" strip ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const strip = sectionRef.current?.querySelector(
        "[data-rules-strip]"
      ) as HTMLElement;
      if (!strip) return;

      gsap.from(strip, {
        clipPath: "inset(0 50% 0 50%)",
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: strip,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="rules"
      className="relative w-full py-16 md:py-32 overflow-hidden bg-[#0A0F1D]"
      aria-label="Rules and Protocol"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 scale-105"
      >
        <source src="/minecraft-campfire-bg.mp4" type="video/mp4" />
      </video>

      {/* Deep Night & Campfire Glow Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1D] via-[#0A0F1D]/60 to-[#0A0F1D] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div
          data-rules-header
          className="mb-16 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 border-2 border-amber-900 bg-amber-900/20 px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 backdrop-blur-md">
            <Icon
              icon="pixelarticons:book-open"
              className="text-amber-500 text-lg md:text-xl"
            />
            <span className="font-sans text-[0.65rem] md:text-xs font-bold text-amber-300 tracking-[0.2em]">
              CHAPTER 04
            </span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Icon
              icon="pixelarticons:book-open"
              className="text-gray-300 text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />
            <h2
              data-rules-heading
              className="font-pixel text-4xl md:text-5xl text-gray-200"
              style={{ textShadow: "0 0 15px rgba(255,255,255,0.2)" }}
            >
              PROTOCOL & PHASES
            </h2>
          </div>
          <p
            className="font-sans text-gray-300 text-sm md:text-lg max-w-2xl leading-relaxed"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            Read carefully before registering for Prarambha 2.0.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {RULES.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>

        {/* "Build the future" motivational strip */}
        <div
          data-rules-strip
          className="mt-16 rounded-xl border border-amber-500/30 p-8 text-center relative overflow-hidden backdrop-blur-md"
          style={{ background: "rgba(11, 16, 33, 0.7)" }}
        >
          {/* Subtle glowing sparks texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(245,158,11,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <p
            className="font-pixel text-amber-500 text-lg md:text-xl relative z-10"
            style={{ textShadow: "2px 2px 0 #78350F" }}
          >
            BUILD THE FUTURE
          </p>
          <p className="font-pixel text-amber-200 text-[0.55rem] tracking-widest mt-3 relative z-10">
            ONE BLOCK AT A TIME
          </p>
        </div>

        {/* Night Grass divider */}
        <div className="mt-16 rounded-xl overflow-hidden border border-white/5">
          <NightGrassDivider />
          <div className="px-4 py-4 bg-[#050811]">
            <p className="font-sans text-xs text-gray-500 text-center">
              Rules and event guidelines are subject to official updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
