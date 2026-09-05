import ReactLenis from "lenis/react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import RulesSection from "./components/RulesSection";
import PrizesSection from "./components/PrizesSection";
import FaqSection from "./components/FaqSection";
import { BottomCTA } from "./components/PolishLayer";
import CursorGlow from "./components/CursorGlow";

export default function Home() {
  return (
    <>
      <ReactLenis root />
      <Navbar />
      <CursorGlow />

      <main id="main-content">
        {/* ── Section 1: Hero (closes issue #1) ── */}
        <HeroSection />

        {/* ── Section 2: Timeline (closes issue #2) ── */}
        <TimelineSection />

        {/* ── Section 3: Rules & Eligibility (closes issue #3) ── */}
        <RulesSection />

        {/* ── Section 4: Prize Pool & Sponsors (closes issue #4) ── */}
        <PrizesSection />

        {/* ── END SECTIONS WRAPPER (FAQ & CTA) ── */}
        <div className="relative w-full">
          {/* Shared Background for FAQ & Bottom CTA */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/all-set-bg.jpg"
              alt="Ready to Join Minecraft Server"
              fill
              className="object-cover object-center opacity-40"
              priority
            />
            {/* Gradient overlays to blend smoothly with previous section and footer */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F15] via-black/40 to-[#0A0202]" />
          </div>

          <div className="relative z-10">
            {/* ── Section 5: FAQ Chat Log ── */}
            <FaqSection />

            {/* ── Section 6: Bottom CTA / "JOIN SERVER" push (closes issue #5) ── */}
            <BottomCTA />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t border-white/10 py-12 px-6 bg-[#0A0202] relative z-20"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left text-gray-400 font-sans text-sm pb-8 border-b border-white/10">
          <div>
            <h4 className="font-pixel text-gray-200 mb-4 text-xs tracking-widest">
              CONTACT & SUPPORT
            </h4>
            <p>Phone: +91 91308 17727</p>
            <p>Phone: +91 755 845 4108</p>
            <p>Email: dssa.dkte24@gmail.com</p>
          </div>
          <div>
            <h4 className="font-pixel text-gray-200 mb-4 text-xs tracking-widest">
              FOLLOW US
            </h4>
            <p>LinkedIn: data-science-students-association</p>
            <p>Instagram: dssa_dkte</p>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center">
            <h4 className="font-pixel text-red-500 mb-2 text-xs tracking-widest drop-shadow-[0_0_10px_rgba(232,64,64,0.8)]">
              DSSA PRESENTS
            </h4>
            <h3 className="font-pixel text-gray-200 text-lg tracking-widest">
              Prarambha{" "}
              <span className="text-red-500">2.0</span>
            </h3>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-6 flex flex-col items-center justify-center">
          <p className="font-sans text-[0.65rem] font-bold text-gray-500 tracking-widest text-center uppercase">
            Prarambha 2.0 © 2026 — ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </>
  );
}
