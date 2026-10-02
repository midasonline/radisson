"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { amenities } from "@/data/home";
import { gsap, useSectionMotion } from "@/hooks/useSectionMotion";
import { CircleCTA } from "@/components/ui/HomePrimitives";
export default function AmenitiesSection() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  useSectionMotion(root, () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .to("[data-amenities-images]", { scale: 2, ease: "eraIn" }, 0)
      .to("[data-amenities-screen]", { opacity: 0, ease: "eraIn" }, 0);
  });
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-amenity-active]", { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
        { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.2, ease: "eraOut" });
      gsap.fromTo("[data-amenity-text]", { yPercent: 110 },
        { yPercent: 0, duration: .8, stagger: .1, ease: "eraOut" });
    }, root);
    return () => ctx.revert();
  }, [index]);
  return (
    <section
      ref={root}
      id="amenities"
      data-header-theme="dark"
      className="relative h-[calc(250svh+50vw)] bg-era-ink text-white min-[992px]:h-[calc(250svh+50vw)]"
    >
      <div data-amenities-screen className="sticky top-0 h-svh overflow-hidden">
        <div data-amenities-images className="absolute inset-0">
          {amenities.map((item, i) => (
            <img
              key={item.title}
              src={item.image}
              alt={item.title}
              data-amenity-active={index === i ? "" : undefined}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover ${index === i ? "opacity-100 z-10" : "opacity-0"}`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <div
          data-amenities-copy
          className="absolute inset-0 flex flex-col justify-between px-[7vw] py-[17vh] min-[992px]:px-[12vw] min-[992px]:py-[11vh]"
        >
          <div className="absolute bottom-[6vh] left-[8vw] w-[80vw] min-[992px]:left-[12.5vw] min-[992px]:w-[38vw]">
            <h2 data-amenity-text className="mb-7 text-[9px] font-bold uppercase min-[992px]:ml-[9.5vw]">
              {amenities[index].title}
            </h2>
            <p data-amenity-text className="font-display text-[7vw] uppercase leading-[1.05] min-[992px]:text-[2.5vw]">
              {amenities[index].text}
            </p>
          </div>
          <div className="flex items-end justify-between gap-6">
            <div className="absolute bottom-[6vh] right-[17vw] hidden min-[992px]:block"><CircleCTA call>Book a call now</CircleCTA></div>
            <div
              role="tablist"
              aria-label="Amenities"
              className="absolute right-[8vw] top-[17vh] flex flex-col items-start border-l border-white/40 pl-4 min-[992px]:right-[17vw] min-[992px]:top-[15vh]"
            >
              {amenities.map((item, i) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === i}
                  aria-controls="amenity-description"
                  key={item.title}
                  onClick={() => setIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                      e.preventDefault();
                      setIndex(
                        (index +
                          (e.key === "ArrowDown" ? 1 : -1) +
                          amenities.length) %
                          amenities.length,
                      );
                    }
                  }}
                  className={`text-left font-display text-[7vw] uppercase leading-[1.1] transition-opacity min-[992px]:text-[2.5vw] ${index === i ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
          <span id="amenity-description" role="tabpanel" className="sr-only">
            {amenities[index].text}
          </span>
        </div>
      </div>
    </section>
  );
}
