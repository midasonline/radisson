"use client";
import { useRef, type ReactNode } from "react";
import SymbolIcon from "./symbol";
import RollingLabel from "./RollingLabel";
import { useSectionMotion, revealLines, gsap } from "@/hooks/useSectionMotion";

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-block size-10 ${className}`}>
      <SymbolIcon />
    </span>
  );
}
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-body text-[10px] font-bold uppercase leading-[1.5] tracking-[.04em] min-[992px]:text-[.69vw] ${className}`}
    >
      {children}
    </p>
  );
}
export function Display({
  children,
  className = "",
  as = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const root = useRef<HTMLHeadingElement>(null);
  const Tag = as;
  useSectionMotion(root, () => revealLines(root.current));
  return (
    <Tag
      ref={root}
      className={`font-display uppercase leading-[.9] tracking-[-.024em] ${className}`}
    >
      <span className="block overflow-hidden pb-[.1em]">
        <span data-line className="block">
          {children}
        </span>
      </span>
    </Tag>
  );
}
export function Flower({
  variant = "01",
  className = "",
}: {
  variant?: string;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useSectionMotion(root, () => {
    gsap.fromTo(
      root.current,
      { yPercent: -8 },
      {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
  return (
    <div
      ref={root}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <img
        src={`/images/bougainvillea-flowers_${variant}.avif`}
        alt=""
        loading="lazy"
        className="h-auto w-full"
      />
    </div>
  );
}
export function CircleCTA({
  children = "EXPLORE OUR SPACES",
  call = false,
  className = "",
}: {
  children?: ReactNode;
  call?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-current/40 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110"
      />
      <span className="max-w-[80%]">
        <RollingLabel>{children}</RollingLabel>
      </span>
    </>
  );
  const styles = `group relative inline-flex size-[132px] items-center justify-center rounded-full text-center font-body text-[10px] font-bold uppercase leading-relaxed min-[992px]:size-[10vw] min-[992px]:text-[.7vw] ${className}`;
  return call ? (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("era:book-call"))}
      className={styles}
    >
      {content}
    </button>
  ) : (
    <a href="https://www.era-residence.com/apartments" className={styles}>
      {content}
    </a>
  );
}
export function SliderControls({
  index,
  count,
  change,
}: {
  index: number;
  count: number;
  change: (direction: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-5 text-[10px] font-bold">
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => change(-1)}
        className="flex size-10 items-center justify-center text-xl"
      >
        ‹
      </button>
      <span aria-live="polite">{index + 1}</span>
      <span className="relative h-px w-28 bg-current/20">
        <span
          className="absolute left-0 top-0 h-px bg-current transition-[width] duration-700"
          style={{ width: `${((index + 1) / count) * 100}%` }}
        />
      </span>
      <span>{((index + 1) % count) + 1}</span>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => change(1)}
        className="flex size-10 items-center justify-center text-xl"
      >
        ›
      </button>
    </div>
  );
}
