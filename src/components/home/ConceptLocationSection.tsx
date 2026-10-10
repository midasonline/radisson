"use client";
import { useRef } from "react";
import { assets } from "@/data/home";
import { gsap, useSectionMotion } from "@/hooks/useSectionMotion";
import {
  Mark,
  Eyebrow,
  Flower,
  CircleCTA,
} from "@/components/ui/HomePrimitives";
import CoastSection from "./CoastSection";

export default function ConceptLocationSection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useSectionMotion(root, () => {
    const media = gsap.matchMedia();
    media.add("(min-width: 992px)", () => {
      const horizontal = gsap.to(track.current, {
        x: () =>
          -(track.current!.scrollWidth - document.documentElement.clientWidth),
        ease: "eraHorizontal",
        scrollTrigger: {
          trigger: root.current,
          start: "2.5% top",
          end: "97.5% bottom",
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo(
        "[data-location-line]",
        { xPercent: gsap.utils.wrap([-5, 25, -15]) },
        {
          xPercent: gsap.utils.wrap([5, -25, 25]),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        },
      );
      gsap.fromTo(
        "[data-coast-path]",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.4,
          ease: "eraOut",
          scrollTrigger: {
            trigger: "[data-coast-panel]",
            containerAnimation: horizontal,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
    media.add("(max-width: 991px)", () => {
      gsap.fromTo(
        "[data-coast-path]",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.4,
          ease: "eraOut",
          scrollTrigger: { trigger: "[data-coast-panel]", start: "top 70%" },
        },
      );
    });
  });
  return (
    <section
      ref={root}
      id="concept"
      data-header-theme="light"
      className="relative z-10 bg-era-cream min-[992px]:h-[313.5vw]"
    >
      <div className="overflow-hidden min-[992px]:sticky min-[992px]:top-0 min-[992px]:h-svh">
        <div
          ref={track}
          className="flex flex-col min-[992px]:h-svh min-[992px]:w-max min-[992px]:flex-row min-[992px]:pl-[3vw]"
        >
          <div className="relative flex min-h-[90svh] w-full shrink-0 flex-col items-center justify-center px-[8vw] py-[20vw] text-center min-[992px]:h-svh min-[992px]:w-[94vw] min-[992px]:justify-between min-[992px]:px-0 min-[992px]:py-[3vw]">
            <Flower
              variant="01"
              className="absolute -left-[7vw] -top-[6vw] w-[50vw]"
            />
            <div className="min-[992px]:flex-1" />
            <div className="relative min-[992px]:w-[56vw]">
              <Eyebrow>THE PROJECT VISION</Eyebrow>
              <h2 className="mt-[2vw] font-display text-[9.615vw] uppercase leading-[.88889] tracking-[-.016em] min-[992px]:text-[3.9375vw]">
                An Islamabad address where hotel hospitality, private
                residences, and retail come together to shape the way you live,
                work, and unwind.
              </h2>
            </div>
            <div className="relative mt-[12vw] flex flex-col items-center justify-end min-[992px]:mt-0 min-[992px]:flex-1">
              <p className="max-w-[260px] text-xs leading-[1.38462] tracking-[-.024em] min-[992px]:w-[18vw] min-[992px]:text-[.8125vw]">
                Presented by J7 Global, the development pairs furnished suites
                and residences with places to dine, recharge and do business,
                all near Islamabad International Airport.
              </p>
              <Mark className="mt-[2vw] min-[992px]:size-[3vw]" />
            </div>
          </div>
          <div className="relative grid w-full shrink-0 gap-10 px-[8vw] py-16 min-[992px]:h-svh min-[992px]:w-[122.5vw] min-[992px]:grid-cols-[repeat(13,8.5vw)] min-[992px]:grid-rows-1 min-[992px]:items-center min-[992px]:gap-[1vw] min-[992px]:px-0 min-[992px]:py-[3vw]">
            <p className="relative z-10 font-display text-[4vw] uppercase tracking-[.8em] min-[992px]:col-span-2 min-[992px]:col-start-2 min-[992px]:row-start-1 min-[992px]:text-center min-[992px]:text-[1.5625vw]">
              ISLAMABAD
            </p>
            <h2 className="relative z-10 font-display text-[22vw] uppercase leading-[.875] tracking-[-.024em] min-[992px]:col-span-5 min-[992px]:col-start-3 min-[992px]:row-start-1 min-[992px]:text-[12vw]">
              <span data-location-line className="block pl-[4.25vw]">
                A
              </span>
              <span data-location-line className="block pl-[9.5vw]">
                CAPITAL
              </span>
              <span data-location-line className="block">
                ADDRESS
              </span>
            </h2>
            <img
              src={assets.terrace}
              alt="Shaded terrace looking towards the Mediterranean"
              loading="lazy"
              className="ml-auto aspect-[3/4] w-[75%] object-cover min-[992px]:col-span-4 min-[992px]:col-start-6 min-[992px]:row-start-1 min-[992px]:h-full min-[992px]:w-full"
            />
            <div className="relative z-10 ml-auto w-[75%] min-[992px]:col-span-3 min-[992px]:col-start-10 min-[992px]:row-start-1 min-[992px]:w-full min-[992px]:self-end">
              <h3 className="font-display text-[7vw] uppercase leading-none min-[992px]:text-[2.5vw]">
                ON SRINAGAR HIGHWAY
              </h3>
              <p className="mt-[1vw] text-xs leading-[1.38462] min-[992px]:text-[.8125vw]">
                An address in Mumtaz City, close to Islamabad International
                Airport and the M1–M2 motorways. A convenient starting point for
                business, travel and time in the capital.
              </p>
            </div>
            <div className="min-[992px]:col-span-2 min-[992px]:col-start-12 min-[992px]:row-start-1 min-[992px]:justify-self-center">
              <CircleCTA />
            </div>
            <Flower
              variant="02"
              className="absolute -bottom-[9vw] -left-[14vw] w-[50vw] rotate-90"
            />
          </div>
          <CoastSection />
        </div>
      </div>
    </section>
  );
}
