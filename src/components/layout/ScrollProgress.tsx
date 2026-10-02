"use client";
import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  useSectionMotion,
} from "@/hooks/useSectionMotion";
export default function ScrollProgress() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  useSectionMotion(root, () => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (label.current)
          label.current.textContent = String(
            Math.round(self.progress * 100),
          ).padStart(2, "0");
        gsap.set(fill.current, { scaleY: self.progress });
      },
    });
  });
  return (
    <div
      ref={root}
      data-header-part
      aria-hidden="true"
      className="pointer-events-none fixed bottom-[3vw] left-[6.8vw] top-[39vh] z-40 hidden w-px text-white min-[992px]:block"
    >
      <div className="relative h-[26vh] bg-current/20">
        <span
          ref={fill}
          className="absolute inset-0 origin-top scale-y-0 bg-current"
        />
        <span
          ref={label}
          className="absolute -left-1.5 -top-7 text-[9px] font-bold"
        >
          00
        </span>
      </div>
      <div className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center gap-4">
        <span className="text-[8px] uppercase tracking-[.3em] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-14 w-px bg-current/60" />
        <span className="-mt-5 text-xs">↓</span>
      </div>
    </div>
  );
}
