"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { playClickSound } from "../utils/sounds";
import { Icon } from "@iconify/react";
import { gsap, useGSAP } from "../utils/gsap";

const FAQ_DATA = [
  {
    player: "NoobMaster69",
    question: "Is Prarambha 2.0 free to participate?",
    serverReply: "Round 1 is completely free to participate.",
  },
  {
    player: "DiamondMiner",
    question: "What is the team size?",
    serverReply: "Each team must have 3-4 members.",
  },
  {
    player: "RedstoneGenius",
    question: "How long is Round 1?",
    serverReply: "Round 1 is a 24-hour online hackathon.",
  },
  {
    player: "CreeprAwwMan",
    question: "What happens after Round 1?",
    serverReply:
      "Selected teams will be shortlisted and announced on September 30, 2026.",
  },
  {
    player: "Steve",
    question: "Is there an entry fee for the final round?",
    serverReply: "Yes. Round 2 has an entry fee of ₹600.",
  },
  {
    player: "Alex",
    question: "When and where is the final round?",
    serverReply:
      "The final round will be held offline on October 3, 2026.",
  },
  {
    player: "Enderman",
    question: "Will certificates be provided?",
    serverReply:
      "Yes, certificates will be provided for Round 1 and Round 2.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Header stagger reveal ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const header = sectionRef.current?.querySelector("[data-faq-header]");
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

  // ── Terminal-style clip-path container reveal ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const chatBox = sectionRef.current?.querySelector(
        "[data-faq-chatbox]"
      ) as HTMLElement;
      if (!chatBox) return;

      gsap.from(chatBox, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: chatBox,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  // ── Staggered chat message reveals ──
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const messages = sectionRef.current?.querySelectorAll("[data-faq-msg]");
      if (!messages || messages.length === 0) return;

      gsap.from(messages, {
        opacity: 0,
        x: -20,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: messages[0],
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-16 md:py-24 px-4 relative z-10"
      aria-label="FAQ Section"
    >
      <div className="max-w-[900px] mx-auto">
        <div
          data-faq-header
          className="flex flex-col items-center text-center"
        >
          <div className="inline-block border border-blue-400/30 bg-blue-400/10 backdrop-blur-md rounded-md px-3 py-1 mb-6 shadow-[0_0_15px_rgba(96,165,250,0.15)]">
            <span className="font-sans text-xs font-bold text-blue-400 tracking-widest drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]">
              CHAPTER 05
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Icon
              icon="pixelarticons:message"
              className="text-blue-400 text-4xl drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]"
            />
            <h2
              className="font-pixel text-4xl md:text-5xl text-blue-400"
              style={{ textShadow: "0 0 15px rgba(96,165,250,0.4)" }}
            >
              FAQ (CHAT LOG)
            </h2>
          </div>

          <p className="font-sans text-gray-400 text-sm md:text-base max-w-lg mb-8 md:mb-12 drop-shadow-md">
            Got questions? Check out the answers below.
          </p>
        </div>

        {/* Glassmorphic Chat Box */}
        <div
          data-faq-chatbox
          className="bg-[#050505]/60 backdrop-blur-xl border border-white/10 p-5 md:p-8 flex flex-col rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ minHeight: "400px" }}
        >
          <div className="flex flex-col gap-4 flex-1 mb-6 overflow-y-auto pr-2 custom-scrollbar">
            <div className="font-sans text-sm md:text-base text-yellow-300 drop-shadow-[0_0_5px_rgba(253,224,71,0.5)] mb-6 pb-4 border-b border-white/5">
              Welcome to the Prarambha 2.0 server! Type /help for a list of
              commands.
            </div>

            {FAQ_DATA.map((faq, i) => (
              <div
                key={i}
                data-faq-msg
                className="flex flex-col gap-2 cursor-pointer group"
                onClick={() => {
                  setOpenIndex(openIndex === i ? null : i);
                  playClickSound();
                }}
              >
                {/* Question */}
                <div className="font-sans text-sm md:text-base text-gray-300 group-hover:text-white transition-colors drop-shadow-md flex items-start gap-2">
                  <span className="text-gray-500 mt-1">&gt;</span>
                  <div>
                    <span className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                      &lt;{faq.player}&gt;{" "}
                    </span>
                    {faq.question}
                  </div>
                </div>
                {/* Answer */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: openIndex === i ? 1 : 0,
                    height: openIndex === i ? "auto" : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="font-sans text-sm md:text-base text-gray-200 drop-shadow-md pl-6 border-l-2 border-blue-500/50 ml-[5px] my-2 py-1 bg-white/5 rounded-r-md">
                    <span className="text-red-400 font-bold">[Server]</span>{" "}
                    {faq.serverReply}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Chat input box at bottom */}
          <div className="mt-auto flex items-center bg-black/50 border border-white/10 rounded-lg px-4 py-3 shadow-inner">
            <span className="text-blue-400 mr-3 font-pixel text-xs">
              &gt;
            </span>
            <input
              type="text"
              className="bg-transparent border-none outline-none text-white font-sans text-sm w-full placeholder-gray-600"
              placeholder="Click a question above to see the answer..."
              disabled
            />
            <div className="w-2 h-4 bg-gray-400 animate-pulse rounded-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
