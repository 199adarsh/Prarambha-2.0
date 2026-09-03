"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

// Register GSAP with React for proper cleanup
gsap.registerPlugin(useGSAP);

export { gsap, ScrollTrigger, useGSAP };
