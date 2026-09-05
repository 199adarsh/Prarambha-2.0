"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }

    // Try to auto-play when user interacts with the page (to bypass browser autoplay block)
    const handleInteraction = () => {
      if (!interacted && audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setInteracted(true);
        }).catch(() => {
          // Autoplay blocked, wait for manual toggle
        });
      }
    };

    // Add global sound effects
    const handleGlobalClick = () => {
      import("../utils/sounds").then((mod) => mod.playClickSound());
    };
    
    const handleGlobalScroll = () => {
      import("../utils/sounds").then((mod) => mod.playScrollTickSound());
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });
    
    // Persistent global sounds
    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("scroll", handleGlobalScroll, { passive: true });
    
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, [interacted, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setInteracted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop />
      <button 
        onClick={togglePlay}
        className="fixed bottom-4 left-4 z-[9999] p-3 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-white hover:bg-black/90 transition-all hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        aria-label="Toggle background music"
      >
        <Icon icon={isPlaying ? "pixelarticons:volume-2" : "pixelarticons:volume-x"} width="24" height="24" />
      </button>
    </>
  );
}
