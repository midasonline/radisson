"use client";
import { useEffect, useRef, useState } from "react";
import { assets, hotspots } from "@/data/home";
import { useSectionMotion, gsap } from "@/hooks/useSectionMotion";
import { CircleCTA } from "@/components/ui/HomePrimitives";

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const [night, setNight] = useState(false);
  const [tip, setTip] = useState<number | null>(null);
  useSectionMotion(root, () => {
    const mm = gsap.matchMedia();
    mm.add(
      { desktop: "(min-width:992px)", mobile: "(max-width:991px)" },
      (context) => {
        const desktop = context.conditions?.desktop;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        if (desktop) {
          tl.to(
            "[data-hero-copy]",
            {
              y: () =>
                -(
                  1.25 *
                    root.current!.querySelector<HTMLElement>(
                      "[data-hero-scene]",
                    )!.offsetHeight -
                  innerHeight
                ),
              ease: "eraEase",
              duration: 0.6,
            },
            0,
          ).to(
            "[data-hero-scene]",
            {
              y: () =>
                -(
                  root.current!.querySelector<HTMLElement>("[data-hero-scene]")!
                    .offsetHeight - innerHeight
                ),
              ease: "eraEase",
              duration: 0.6,
            },
            0,
          );
        }
        tl.to(
          "[data-hero-scene]",
          {
            scale: 2,
            transformOrigin: "50% 75%",
            ease: "eraIn",
            duration: 0.6,
          },
          desktop ? 0.4 : 0,
        );
      },
    );
  });
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTip(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <section
      ref={root}
      id="hero"
      data-header-theme="dark"
      className="relative h-[calc(300svh+50vw)] bg-[#316cac] text-white min-[992px]:h-[calc(500svh+50vw)]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          data-hero-scene
          className="absolute left-0 top-0 h-[140svh] w-full min-[992px]:h-auto min-[992px]:aspect-[1920/1728]"
        >
          <div data-hero-reveal className="absolute inset-0 origin-top">
            <img
              src={assets.heroDay}
              fetchPriority="high"
              alt="Radisson Blu gardens and swimming pool in daylight"
              className="absolute inset-0 h-full w-full object-cover object-[50%_top]"
            />
            <img
              src={assets.heroNight}
              alt="Radisson Blu illuminated at night"
              className={`absolute inset-0 h-full w-full object-cover object-[50%_top] transition-opacity duration-[1200ms] ${night ? "opacity-100" : "opacity-0"}`}
            />
            <div className="pointer-events-none absolute inset-0 bg-black/15" />
            <div
              data-hero-pins
              className="absolute inset-0 hidden min-[992px]:block"
            >
              {hotspots.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setTip(tip === i ? null : i)}
                  aria-label={item.title}
                  aria-expanded={tip === i}
                  className="absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 transition-transform hover:scale-125"
                  style={{ left: item.x, top: item.y }}
                >
                  <span className="size-1.5 rounded-full bg-white" />
                </button>
              ))}
            </div>
            <div className="absolute bottom-[3vw] left-1/2 -translate-x-1/2">
              <CircleCTA />
            </div>
          </div>
        </div>
        <div
          data-hero-copy
          className="absolute inset-x-0 top-[24svh] text-center min-[992px]:top-[3vw]"
        >
          <h1 className="font-display text-[24vw] uppercase leading-[.875] tracking-[-.024em] min-[992px]:text-[12vw]">
            Radisson
            <br />
            Blu
          </h1>
          <h2 className="relative -mt-[2vw] -rotate-12 font-accent text-[23vw] leading-[.8] min-[992px]:-ml-[2vw] min-[992px]:-mt-[1vw] min-[992px]:text-[7.5vw]">
            Islamabad
          </h2>
          <div className="mx-auto mt-[9vw] grid w-[88%] grid-cols-2 items-center gap-y-6 min-[992px]:mt-[3vw] min-[992px]:w-[56%] min-[992px]:grid-cols-[1fr_1fr_1fr]">
            <h3 className="text-left font-display text-[7vw] uppercase leading-none min-[992px]:text-[2.5vw]">
              HOTEL & RESIDENCES
            </h3>
            <div className="order-last col-span-2 hidden items-center justify-center gap-5 text-[9px] font-bold uppercase tracking-[.25em] min-[992px]:order-none min-[992px]:col-span-1 min-[992px]:flex min-[992px]:text-[.56vw]">
              <button
                type="button"
                aria-pressed={!night}
                onClick={() => setNight(false)}
                className={
                  night ? "uppercase opacity-40" : "uppercase opacity-100"
                }
              >
                By day
              </button>
              <span className="h-px w-10 bg-white/30" />
              <button
                type="button"
                aria-pressed={night}
                onClick={() => setNight(true)}
                className={
                  night ? "uppercase opacity-100" : "uppercase opacity-40"
                }
              >
                By night
              </button>
            </div>
            <h3 className="text-right font-display text-[7vw] uppercase leading-none min-[992px]:text-[2.5vw]">
              COMING SOON
            </h3>
          </div>
        </div>
        {tip !== null && (
          <div
            role="dialog"
            aria-label={hotspots[tip].title}
            className="absolute bottom-[10vh] left-1/2 z-10 w-[min(90vw,460px)] -translate-x-1/2 bg-era-cream p-8 text-era-ink"
          >
            <button
              type="button"
              aria-label="Close detail"
              onClick={() => setTip(null)}
              className="absolute right-3 top-2 text-xl"
            >
              ×
            </button>
            <h3 className="font-display text-4xl uppercase">
              {hotspots[tip].title}
            </h3>
            <p className="mt-4 text-xs leading-relaxed">{hotspots[tip].text}</p>
          </div>
        )}
      </div>
    </section>
  );
}
