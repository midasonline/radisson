"use client";
import { useEffect, useRef, useState } from "react";
import { useAutoSlide } from "@/hooks/useAutoSlide";
import { assets, interiors } from "@/data/home";
import { gsap, useSectionMotion } from "@/hooks/useSectionMotion";
import {
  Display,
  CircleCTA,
  Flower,
  SliderControls,
} from "@/components/ui/HomePrimitives";
export default function LifestyleSection() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const [index, setIndex] = useState(0);
  useAutoSlide(photo, () => setIndex(i => (i+1)%interiors.length), index);
  useSectionMotion(root, () => {
    gsap.fromTo(
      "[data-life-photo]",
      { yPercent: 7 },
      {
        yPercent: -7,
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
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.fromTo(
          photo.current,
          { scale: 1.08, clipPath: "inset(0 100% 0 0)" },
          {
            scale: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "eraOut",
          },
        );
    });
    return () => ctx.revert();
  }, [index]);
  return (
    <section
      ref={root}
      id="lifestyle"
      data-header-theme="light"
      className="relative z-10 -mt-[28vw] overflow-hidden rounded-t-[50%_27vw] bg-era-cream pt-[18vw] min-[992px]:-mt-[calc(100svh+50vw)] min-[992px]:rounded-t-[50vw_50vw] min-[992px]:pt-[17vw]"
    >
      <h2 className="relative z-10 text-center font-display text-[22vw] uppercase leading-[.88] min-[992px]:text-[12vw]">
        The
        <br />
        space
        <br />
        to
        <span className="block -ml-[2.5vw] -mt-[4.5vw] -rotate-12 font-accent normal-case leading-none">
          Live in
        </span>
      </h2>
      <div className="mt-[15vw] grid grid-cols-1 gap-12 min-[992px]:mx-[3vw] min-[992px]:mt-0 min-[992px]:grid-cols-2 min-[992px]:gap-[1vw]">
        <div className="relative min-[992px]:pt-[17vw]">
          <div className="relative flex aspect-[3/4] items-center overflow-hidden bg-era-plum px-[14vw] min-[992px]:-ml-[3vw] min-[992px]:w-[40vw] min-[992px]:px-[8.5vw]">
            <img
              data-life-photo
              src={assets.garden}
              alt="Outdoor seating surrounded by flowering Mediterranean planting"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          <Flower variant="04" className="pointer-events-none absolute left-[-3vw] top-[13vw] w-[40vw]" />
          <p className="mx-[8vw] mt-8 text-[11px] font-bold uppercase leading-relaxed min-[992px]:ml-[19vw] min-[992px]:mr-0 min-[992px]:mt-[1vw] min-[992px]:w-[18vw] min-[992px]:text-[.6875vw]">
            Optional upgrades are available:
            <br />• Private jacuzzi
            <br />• EV charging point installation
            <br />• Photovoltaic panels
          </p>
        </div>
        <div>
          <div className="overflow-hidden min-[992px]:ml-[9.5vw] min-[992px]:w-[40vw]">
            <img
              data-life-photo
              src={assets.terrace}
              alt="Sea-view terrace at ERA Residence"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="px-[8vw] pt-10 min-[992px]:px-0 min-[992px]:pt-[1vw]">
            <Display className="text-[8vw] min-[992px]:w-[37vw] min-[992px]:text-[2.5vw]">
              Every detail was selected to create homes that feel elegant,
              intuitive and effortless to live in
            </Display>
            <p className="mt-6 text-xs leading-relaxed min-[992px]:ml-[19vw] min-[992px]:mt-[4vw] min-[992px]:w-[18vw] min-[992px]:text-[.8125vw]">
              Underfloor heating throughout the property. Climate automation
              systems. Smart lock access systems. Electrically adjustable
              aluminium shutters. Schneider Electric DLIFE switches and
              mechanisms.
            </p>
            <CircleCTA className="mt-10 min-[992px]:ml-[9.5vw] min-[992px]:mt-[6vw]" />
          </div>
        </div>
      </div>
      <div className="relative pb-[6vw] pt-[17vw]">
        <Flower
          variant="06"
          className="absolute -left-[16vw] top-[5vw] z-10 w-[55vw] min-[992px]:w-[36vw]"
        />
        <div className="ml-[12vw] overflow-hidden min-[992px]:ml-[22vw]">
          <img
            ref={photo}
            src={interiors[index]}
            alt={`ERA Residence interior, view ${index + 1}`}
            loading="lazy"
            className="aspect-[1.6] w-full object-cover"
          />
        </div>
        <div className="ml-[12vw] mt-3 min-[992px]:ml-[22vw]">
          <SliderControls
            index={index}
            count={interiors.length}
            change={(direction) =>
              setIndex(
                (current) =>
                  (current + direction + interiors.length) % interiors.length,
              )
            }
          />
        </div>
      </div>
    </section>
  );
}
