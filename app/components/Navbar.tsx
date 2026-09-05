"use client";

import { useState, useEffect, useRef } from "react";
import { playClickSound } from "../utils/sounds";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { gsap, useGSAP } from "../utils/gsap";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Timeline", href: "#timeline" },
  { label: "Rules", href: "#rules" },
  { label: "Prizes", href: "#prizes" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
] as const;

const REGISTER_URL = "https://unstop.com/p/prarambh-20-24-hour-innovation-hackathon-dkte-societys-textile-engineering-institute-dktestei-ichalkaranji-maharashtra-1746973?utm_medium=Share&utm_source=aditykha97354&utm_campaign=Online_coding_challenge";

export default function Navbar() {
  const [activeHash, setActiveHash] = useState("#hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Keep track of active section for highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
          current = "#" + section;
        }
      }
      if (current) {
        setActiveHash(current);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth entrance
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (navRef.current) {
        gsap.from(navRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 2.5,
        });
      }
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b-2 border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              onClick={() => { playClickSound(); setActiveHash("#hero"); }}
              className="font-pixel text-xl md:text-2xl text-white tracking-widest uppercase hover:text-cyan-400 transition-colors drop-shadow-[2px_2px_0_#000]"
            >
              Prarambha <span className="text-red-500">2.0</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 lg:space-x-8">
              {NAV_LINKS.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveHash(link.href);
                      playClickSound();
                    }}
                    className={`font-pixel text-[0.6rem] lg:text-xs tracking-widest uppercase px-3 py-2 rounded-md transition-all duration-300 ${isActive
                        ? "text-cyan-400 bg-white/5 border border-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="font-pixel text-[0.65rem] lg:text-xs text-white bg-red-600 hover:bg-red-500 px-4 py-2 lg:px-5 lg:py-2.5 rounded border-2 border-red-700 shadow-[2px_2px_0_#000] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#000] transition-all ml-2"
              >
                REGISTER
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                playClickSound();
              }}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
              aria-label="Toggle mobile menu"
            >
              <Icon
                icon={isMobileMenuOpen ? "pixelarticons:close" : "pixelarticons:menu"}
                className="w-8 h-8"
              />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 border-b-2 border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {NAV_LINKS.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveHash(link.href);
                      setIsMobileMenuOpen(false);
                      playClickSound();
                    }}
                    className={`font-pixel text-sm tracking-widest uppercase block px-4 py-3 rounded-md ${isActive
                        ? "text-cyan-400 bg-white/10 border-l-4 border-cyan-400"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="pt-4 pb-2 px-4">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    playClickSound();
                  }}
                  className="block text-center font-pixel text-sm text-white bg-red-600 hover:bg-red-500 w-full py-3 rounded border-2 border-red-700 shadow-[2px_2px_0_#000]"
                >
                  REGISTER NOW
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
