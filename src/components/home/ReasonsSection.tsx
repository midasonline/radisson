"use client";
import { useEffect, useRef, useState } from "react";
import { reasons } from "@/data/home";
import { useSectionMotion, gsap } from "@/hooks/useSectionMotion";
import { Mark, Eyebrow, SliderControls } from "@/components/ui/HomePrimitives";

export default function ReasonsSection() {
  const root = useRef<HTMLElement>(null);
  const slide = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const change = (direction: number) =>
    setIndex(
      (current) => (current + direction + reasons.length) % reasons.length,
    );
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const timer = setInterval(() => {
      if (
        root.current &&
        root.current.getBoundingClientRect().bottom > 0 &&
        root.current.getBoundingClientRect().top < innerHeight
      )
        setIndex((current) => (current + 1) % reasons.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.fromTo(
          "[data-slide-part]",
          { yPercent: 100, opacity: 0.3 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.06,
            ease: "eraOut",
          },
        );
    }, slide);
    return () => ctx.revert();
  }, [index]);
  useSectionMotion(root, () => {
    gsap.fromTo(
      "[data-curve-text]",
      { wordSpacing: "0vw" },
      {
        wordSpacing: "10vw",
        ease: "none",
        scrollTrigger: {
          trigger: "[data-reasons-intro]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
  const item = reasons[index];
  return (
    <section
      ref={root}
      id="reasons"
      data-header-theme="light"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setPaused(false);
      }}
      className="relative z-10 -mt-[30vw] overflow-hidden rounded-t-[50vw_50vw] bg-era-sky text-era-ink min-[992px]:-mt-[calc(100svh+50vw)]"
    >
      <div
        data-reasons-intro
        className="relative flex h-[80vw] flex-col items-center justify-end pb-[6vw] min-[992px]:h-[50vw]"
      >
        <svg
          viewBox="0 0 1600 1600"
          className="pointer-events-none absolute inset-x-0 top-0 w-full overflow-visible"
          aria-label="Three reasons to choose ERA"
        >
          <defs>
            <path
              id="reasons-arc"
              d="M800,800 m-676,0 a676,676 0 1,1 1352,0 a676,676 0 1,1 -1352,0"
            />
          </defs>
          <text
            fill="currentColor"
            className="font-display text-[63px] uppercase"
          >
            <textPath
              data-curve-text
              href="#reasons-arc"
              startOffset="25%"
              textAnchor="middle"
            >
              THREE REASONS. ONE ADDRESS.
            </textPath>
          </text>
        </svg>
        <div className="flex items-center gap-[3vw]">
          <Eyebrow>Costa</Eyebrow>
          <Mark className="min-[992px]:size-[3vw]" />
          <Eyebrow>Del Sol</Eyebrow>
        </div>
        <span className="my-[3vw] h-[13vw] w-px bg-current/30" />
        <Eyebrow className="text-center">
          A PLACE TO STAY.
          <br />A WAY TO LIVE.
        </Eyebrow>
      </div>
      <div
        ref={slide}
        className="flex min-h-[90svh] flex-col items-center justify-between px-[6vw] py-[3vw] text-center min-[992px]:h-svh min-[992px]:min-h-0"
      >
        <h2 className="overflow-hidden font-display text-[13vw] uppercase leading-none tracking-[-.024em] min-[992px]:text-[12vw] min-[992px]:leading-[.875]">
          <span data-slide-part className="block">
            {item.title}
          </span>
        </h2>
        <div className="mx-auto mt-[6vw] w-[64vw] overflow-hidden min-[992px]:mt-auto min-[992px]:w-[26vw]">
          <img
            data-slide-part
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="aspect-[2/1] w-full object-cover"
          />
        </div>
        <SliderControls index={index} count={reasons.length} change={change} />
        <div className="mx-auto mt-[6vw] max-w-[500px] overflow-hidden min-[992px]:mt-auto min-[992px]:w-[37vw]">
          <p
            data-slide-part
            className="text-xs leading-[1.45] min-[992px]:text-[.82vw]"
          >
            {item.text}
          </p>
        </div>
        <Eyebrow className="mt-[3vw]">
          RADISSON BLU ISLAMABAD
          <br />
          PROJECT VISION
        </Eyebrow>
      </div>
    </section>
  );
}
