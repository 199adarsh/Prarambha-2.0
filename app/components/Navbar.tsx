"use client";

import { useState, useEffect } from "react";
import { playClickSound } from "../utils/sounds";
import { Icon } from '@iconify/react';

const NAV_LINKS = [
  { label: "Home",     href: "#hero",     icon: <Icon icon="pixelarticons:home" /> },
  { label: "Timeline", href: "#timeline", icon: <Icon icon="pixelarticons:clock" /> },
  { label: "Rules",    href: "#rules",    icon: <Icon icon="pixelarticons:book-open" /> },
  { label: "Prizes",   href: "#prizes",   icon: <Icon icon="pixelarticons:gift" /> },
  { label: "Sponsors", href: "#sponsors", icon: <Icon icon="pixelarticons:heart" /> },
  { label: "FAQ",      href: "#faq",      icon: <Icon icon="pixelarticons:message" /> },
] as const;

/* TODO: Replace with real registration URL */
const REGISTER_URL = "https://unstop.com";

export default function Navbar() {
  const [activeHash, setActiveHash] = useState("#hero");

  // Keep track of active section for the hotbar selection
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1));
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
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-6 inset-x-0 z-50 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* The Hotbar Container */}
      <div 
        className="flex bg-black/60 backdrop-blur-xl p-[2px] pointer-events-auto rounded-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden" 
      >
        {NAV_LINKS.map((link, index) => {
          const isActive = activeHash === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveHash(link.href);
                playClickSound();
              }}
              className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/80 transition-colors group border-r border-white/10 last:border-r-0"
              aria-label={link.label}
            >
              {/* Selection Box overlay */}
              {isActive && (
                <div className="absolute inset-[-2px] border-[3px] border-white pointer-events-none z-10 box-content">
                   <div className="absolute inset-[-3px] border-[1px] border-black pointer-events-none box-content"></div>
                </div>
              )}
              {/* Icon */}
              <span className={`text-lg md:text-xl ${isActive ? 'scale-110' : 'scale-100'} group-hover:scale-110 transition-transform duration-200 mc-text-shadow`}>
                {link.icon}
              </span>
              {/* Hotbar Slot Number */}
              <span className="absolute bottom-[2px] right-[4px] font-pixel text-[0.55rem] text-white drop-shadow-[1px_1px_0_#000]">
                {index + 1}
              </span>
            </a>
          );
        })}

        {/* Register Button as a wider slot */}
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-16 md:w-20 h-10 md:h-12 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-colors group"
          title="Register Now"
          onClick={playClickSound}
        >
          <span className="font-pixel text-[0.5rem] md:text-[0.55rem] text-white tracking-widest group-hover:scale-105 transition-transform duration-200 drop-shadow-[1px_1px_0_#000]">
            REGISTER
          </span>
        </a>
      </div>

      {/* Active Item Label (Minecraft style below hotbar when at top) */}
      <div className="mt-2 font-pixel text-[0.6rem] text-white tracking-widest pointer-events-auto transition-all drop-shadow-[2px_2px_0_#000]">
        {NAV_LINKS.find(link => link.href === activeHash)?.label || "Join Server"}
      </div>
    </nav>
  );
}
