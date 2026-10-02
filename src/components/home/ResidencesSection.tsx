"use client";
import { useEffect, useRef, useState } from "react";
import { useAutoSlide } from "@/hooks/useAutoSlide";
import { residences } from "@/data/home";
import { gsap } from "@/lib/animations";
import {
  Eyebrow,
  SliderControls,
  Flower,
  Mark,
  Display,
} from "@/components/ui/HomePrimitives";
export default function ResidencesSection() {
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const touch = useRef(0);
  const item = residences[index];
  const change = (direction: number) =>
    setIndex(
      (current) =>
        (current + direction + residences.length) % residences.length,
    );
  useAutoSlide(root, () => change(1), index);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.fromTo(
          "[data-residence-part]",
          { clipPath: "inset(0 0 100% 0)", y: 30 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 1.2,
            stagger: 0.07,
            ease: "eraOut",
          },
        );
    }, root);
    return () => ctx.revert();
  }, [index]);
  return (
    <section
      id="residences"
      data-header-theme="light"
      className="relative overflow-hidden bg-era-sky"
    >
      <div
        ref={root}
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = touch.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 60) change(delta > 0 ? 1 : -1);
        }}
        className="relative min-h-svh px-[6vw] pb-12 pt-[15vw] min-[992px]:h-svh min-[992px]:pl-[22vw] min-[992px]:pr-[12.5vw] min-[992px]:pt-[6vw] min-[992px]:pb-[3vw]"
      >
        <div className="grid items-center gap-8 min-[992px]:grid-cols-[8.5vw_28vw_18vw] min-[992px]:gap-[5.5vw]">
          <div
            data-residence-part
            className="order-2 flex justify-between min-[992px]:order-1 min-[992px]:block"
          >
            <div>
              <Eyebrow>Bedrooms</Eyebrow>
              <p className="mt-2 font-display text-4xl min-[992px]:text-[2.5vw]">
                {item.bedrooms}
              </p>
            </div>
            <div className="min-[992px]:mt-6">
              <Eyebrow>Area up to</Eyebrow>
              <p className="mt-2 whitespace-nowrap font-display text-4xl min-[992px]:text-[2.5vw]">
                {item.area}
              </p>
            </div>
          </div>
          <div
            data-residence-part
            className="order-1 mx-auto w-[72%] overflow-hidden min-[992px]:order-2 min-[992px]:w-full"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          <div data-residence-part className="order-3">
            <p className="text-xs leading-relaxed min-[992px]:text-[.82vw]">
              {item.text}
            </p>
            <a
              href={`https://www.era-residence.com/apartments?type=${item.type}`}
              className="mt-5 inline-block rounded-full border border-current px-5 py-3 text-[9px] font-bold uppercase"
            >
              {item.link}
            </a>
          </div>
        </div>
        <h2
          data-residence-part
          className="mt-12 text-center font-display text-[13vw] uppercase leading-[.92] min-[992px]:mt-[3vw] min-[992px]:text-[6vw]"
        >
          {item.title}
        </h2>
        <div className="mt-6">
          <SliderControls
            index={index}
            count={residences.length}
            change={change}
          />
        </div>
      </div>
      <div className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden px-[8vw] py-[12vw] text-center min-[992px]:min-h-0 min-[992px]:px-[22vw] min-[992px]:py-[3vw]">
        <span className="mb-[3vw] hidden h-[13vw] w-px bg-current/30 min-[992px]:block" />
        <Eyebrow>A place to live — to return year after year</Eyebrow>
        <Display className="mt-16 text-[7vw] min-[992px]:mt-[10vw] min-[992px]:text-[3.9375vw]">
          Residences range from 104 to 244 sq.m., offering spacious single level
          and duplex layouts with generous terraces and rooftop solariums.
        </Display>
        <Mark className="mt-16 min-[992px]:mt-[12vw] min-[992px]:size-[3vw]" />
        <Flower
          variant="04"
          className="absolute -bottom-[10vw] -left-[20vw] w-[60vw] min-[992px]:-bottom-[2vw] min-[992px]:-left-[7vw] min-[992px]:w-[50vw]"
        />
      </div>
    </section>
  );
}
