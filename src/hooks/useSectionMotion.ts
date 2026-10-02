"use client";
import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/animations";

/** Each section owns its timeline; matchMedia also reverts on preference changes. */
export function useSectionMotion<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: () => void,
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", setup);
    }, scope);
    return () => ctx.revert();
    // The section animation is intentionally installed once, with live DOM measurements.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
export function revealLines(element: HTMLElement | null) {
  if (!element) return;
  const split = SplitText.create(element.querySelector("[data-line]") || element, {type:"words,chars",tag:"span",smartWrap:true});
  gsap.fromTo(split.chars, {opacity:0,yPercent:50,rotationY:90}, {
    opacity:1,yPercent:0,rotationY:0,stagger:.025,duration:1.2,ease:"eraOut",
    scrollTrigger:{trigger:element,start:"top 92%",toggleActions:"play none none reverse"},
  });
}
export { gsap, ScrollTrigger };
