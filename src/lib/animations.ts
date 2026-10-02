"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
CustomEase.create("eraEase", "0.25,0.1,0.25,1");
CustomEase.create("eraOut", "0.25,1,0.5,1");
CustomEase.create("eraIn", "0.5,0,0.75,0");
CustomEase.create("eraInOut", "0.75,0,0.25,1");
CustomEase.create("eraHorizontal", "0.25,0,0.75,1");

export const motion = {
  short: 0.4,
  medium: 0.8,
  long: 1.2,
  breakpoint: 992,
} as const;
export { gsap, ScrollTrigger, SplitText };
