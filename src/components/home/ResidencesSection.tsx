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

const slides = [
  {
    title: "Residential Suites",
    specOneLabel: "Bedrooms",
    specOneValue: "1, 2 & 3",
    specTwoLabel: "Interiors",
    specTwoValue: "Furnished",
    description:
      "Your own living room, an equipped kitchenette and space to settle into familiar routines. Residences designed for longer stays and life at your pace.",
    cta: "Explore Residences",
    href: "#contact",
  },
  {
    title: "Deluxe Suites",
    specOneLabel: "Stay Style",
    specOneValue: "Short Stays",
    specTwoLabel: "Interiors",
    specTwoValue: "Furnished",
    description:
      "A comfortable base for days in the capital, with tea and coffee facilities, an in-room refrigerator and a television for evenings spent unwinding.",
    cta: "Explore Suites",
    href: "#contact",
  },
  {
    title: "Branded Shops",
    specOneLabel: "Retail Levels",
    specOneValue: "LG · G · 1",
    specTwoLabel: "Space Options",
    specTwoValue: "Custom Sizes",
    description:
      "Give your brand a setting within the development’s retail floors, with glass frontages and shared spaces planned around hotel guests, residents and visitors.",
    cta: "Explore Retail",
    href: "#contact",
  },
];

export default function ResidencesSection() {
  const [index, setIndex] = useState(0);

  const root = useRef<HTMLDivElement>(null);
  const touch = useRef(0);

  const slide = slides[index];
  const mediaItem = residences[index % residences.length];

  const change = (direction: number) => {
    setIndex(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  useAutoSlide(root, () => change(1), index);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(
          "[data-residence-part]",
          {
            clipPath: "inset(0 0 100% 0)",
            y: 30,
          },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 1.2,
            stagger: 0.07,
            ease: "eraOut",
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, [index]);

  return (
    <section
      id="residences"
      data-header-theme="light"
      className="relative overflow-hidden bg-era-sky"
    >
      {/* SLIDER */}

      <div
        ref={root}
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = touch.current - e.changedTouches[0].clientX;

          if (Math.abs(delta) > 60) {
            change(delta > 0 ? 1 : -1);
          }
        }}
        className="relative min-h-svh px-[6vw] pb-12 pt-[15vw] min-[992px]:h-svh min-[992px]:pl-[22vw] min-[992px]:pr-[12.5vw] min-[992px]:pt-[6vw] min-[992px]:pb-[3vw]"
      >
        <div className="grid items-center gap-8 min-[992px]:grid-cols-[9.5vw_28vw_19vw] min-[992px]:gap-[5vw]">
          {/* LEFT SPECIFICATIONS */}

          <div
            data-residence-part
            className="order-2 flex justify-between gap-6 min-[992px]:order-1 min-[992px]:block"
          >
            <div className="min-w-0">
              <Eyebrow>{slide.specOneLabel}</Eyebrow>

              <p className="mt-2 font-display text-[9vw] uppercase leading-none min-[992px]:text-[2.25vw]">
                {slide.specOneValue}
              </p>
            </div>

            <div className="min-w-0 min-[992px]:mt-[2.6vw]">
              <Eyebrow>{slide.specTwoLabel}</Eyebrow>

              <p className="mt-2 font-display text-[7vw] uppercase leading-none min-[992px]:text-[1.85vw]">
                {slide.specTwoValue}
              </p>
            </div>
          </div>

          {/* IMAGE */}

          <div
            data-residence-part
            className="order-1 mx-auto w-[72%] overflow-hidden min-[992px]:order-2 min-[992px]:w-full"
          >
            <img
              src={mediaItem.image}
              alt={slide.title}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>

          {/* DESCRIPTION */}

          <div data-residence-part className="order-3 min-[992px]:pl-[0.5vw]">
            <p className="max-w-[420px] text-xs leading-[1.55] min-[992px]:text-[0.82vw] min-[992px]:leading-[1.45]">
              {slide.description}
            </p>

            <a
              href={slide.href}
              className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-full border border-current px-6 py-3 text-[9px] font-bold uppercase tracking-[0.04em] transition-transform duration-300 hover:scale-[1.03] min-[992px]:mt-[1.6vw] min-[992px]:px-[1.7vw] min-[992px]:py-[0.75vw] min-[992px]:text-[0.65vw]"
            >
              {slide.cta}
            </a>
          </div>
        </div>

        {/* LARGE TITLE */}

        <h2
          data-residence-part
          className="relative z-10 mt-12 whitespace-normal text-center font-display text-[12vw] uppercase leading-[0.87] min-[992px]:mt-[2.2vw] min-[992px]:whitespace-nowrap min-[992px]:text-[5.6vw]"
        >
          {slide.title}
        </h2>

        {/* CONTROLS */}

        <div className="relative z-20 mt-7 min-[992px]:mt-[2vw]">
          <SliderControls index={index} count={slides.length} change={change} />
        </div>
      </div>

      {/* CLOSING STATEMENT */}

      <div className="relative min-h-[85svh] overflow-hidden px-[7vw] text-center min-[992px]:h-svh min-[992px]:min-h-svh min-[992px]:px-0">
        {/* TOP LINE */}

        <span className="absolute left-1/2 top-0 hidden h-[5.3vw] w-px -translate-x-1/2 bg-current/35 min-[992px]:block" />

        {/* EYEBROW */}

        <div className="relative z-20 pt-[16vw] min-[992px]:absolute min-[992px]:left-1/2 min-[992px]:top-[8.7vw] min-[992px]:w-full min-[992px]:-translate-x-1/2 min-[992px]:pt-0">
          <Eyebrow>Stay · Live · Belong · Build</Eyebrow>
        </div>

        {/* LARGE STATEMENT */}

        <div className="relative z-20 mx-auto mt-[22vw] flex w-full items-center justify-center min-[992px]:absolute min-[992px]:left-1/2 min-[992px]:top-[51%] min-[992px]:mt-0 min-[992px]:w-[66vw] min-[992px]:-translate-x-1/2 min-[992px]:-translate-y-1/2">
          <Display className="max-w-[90vw] text-[7.5vw] uppercase leading-[0.92] min-[992px]:max-w-none min-[992px]:text-[3.45vw] min-[992px]:leading-[0.94]">
            A suite for your visits. A residence for your routines. A space for
            your brand. One address in Islamabad.
          </Display>
        </div>

        {/* BOTTOM CENTER MARK */}

        <Mark className="relative z-20 mx-auto mt-[18vw] size-[9vw] min-[992px]:absolute min-[992px]:bottom-[6.3vw] min-[992px]:left-1/2 min-[992px]:mt-0 min-[992px]:size-[3vw] min-[992px]:-translate-x-1/2" />

        {/* REFLECTED FLOWER */}

        <Flower
          variant="04"
          className="pointer-events-none absolute -bottom-[15vw] -left-[16vw] z-10 w-[68vw] -scale-y-100 min-[992px]:-bottom-[18vw] min-[992px]:-left-[6vw] min-[992px]:w-[38vw]"
        />
      </div>
    </section>
  );
}
