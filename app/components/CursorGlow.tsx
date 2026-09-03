"use client";

import { useRef, useEffect } from "react";

/**
 * Subtle cursor-following glow overlay.
 * Disabled on touch/mobile devices and when prefers-reduced-motion is set.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    // Disable on touch devices or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      return;
    }

    let mouseX = -200;
    let mouseY = -200;
    let currentX = -200;
    let currentY = -200;
    let raf = 0;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.08);
      currentY = lerp(currentY, mouseY, 0.08);
      el.style.transform = `translate(${currentX - 150}px, ${currentY - 150}px)`;
      raf = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[9998]"
      style={{
        background:
          "radial-gradient(circle, rgba(232,64,64,0.06) 0%, rgba(232,64,64,0.02) 40%, transparent 70%)",
        borderRadius: "50%",
        willChange: "transform",
      }}
      aria-hidden
    />
  );
}
