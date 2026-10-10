"use client";
import { useRef, useState, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { projectDetails } from "@/data/home";
import { Eyebrow, Flower } from "@/components/ui/HomePrimitives";
function Detail({
  title,
  text,
  i,
  open,
  toggle,
}: {
  title: string;
  text: string;
  i: number;
  open: boolean;
  toggle: () => void;
}) {
  const body = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(body.current, {
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
        duration: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : 0.7,
        ease: "eraInOut",
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
    return () => ctx.revert();
  }, [open]);
  return (
    <div>
      <h3>
        <button
          onClick={toggle}
          type="button"
          aria-expanded={open}
          aria-controls={`detail-${i}`}
          className="relative font-display text-[10vw] uppercase leading-[1.05] min-[992px]:text-[6vw]"
        >
          {title}
          <span className="absolute -right-4 top-1 text-base">
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>
      <div
        id={`detail-${i}`}
        ref={body}
        inert={!open}
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="mx-auto max-w-[440px] py-6 text-xs leading-relaxed">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
export default function ProjectDetailsSection() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section
      id="project"
      data-header-theme="light"
      className="relative overflow-hidden bg-era-cream px-[7vw] py-[15vw] text-center min-[992px]:pb-[10vw] min-[992px]:pt-[13vw]"
    >
      <Eyebrow>A place to live — to return year after year</Eyebrow>
      <div className="relative z-10 mt-[8vw]">
        {projectDetails.map((item, i) => (
          <Detail
            key={item.title}
            {...item}
            i={i}
            open={active === i}
            toggle={() => setActive(active === i ? null : i)}
          />
        ))}
      </div>
      <Flower
        variant="07"
        className="absolute -right-[15vw] -top-[10vw] w-[55vw] min-[992px]:w-[37vw]"
      />
    </section>
  );
}
