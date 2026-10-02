"use client";
import { useRef } from "react";
import { assets } from "@/data/home";
import { useSectionMotion, gsap } from "@/hooks/useSectionMotion";
import { Eyebrow, CircleCTA, Mark } from "@/components/ui/HomePrimitives";
export default function FinalSection() {
  const root = useRef<HTMLDivElement>(null);
  useSectionMotion(root, () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "[data-footer]",
          start: "top 30%",
          end: "bottom bottom",
          scrub: 0.5,
        },
      })
      .to(
        "[data-final-image]",
        {
          clipPath:
            innerWidth >= 992 ? "inset(8% 22% 8% 22%)" : "inset(4% 32% 4% 32%)",
          ease: "none",
        },
        0,
      )
      .fromTo(
        "[data-footer-copy]",
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, ease: "none" },
        0,
      );
  });
  return (
    <div ref={root} className="relative bg-era-plum">
      <section
        id="sea-views"
        data-header-theme="dark"
        className="relative z-10 h-[130svh] overflow-hidden text-white min-[992px]:h-[108.385vw]"
      >
        <div data-final-image className="absolute inset-0">
          <img
            src={assets.seaViews}
            alt="Sea views from an ERA Residence rooftop terrace"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative flex h-full flex-col items-center px-[8vw] py-[13vw] text-center min-[992px]:pt-[3vw]">
          <Eyebrow className="max-w-[650px] min-[992px]:w-[37vw]">
            A short conversation is enough to understand which apartment fits
            your use case — whether it is a family second home, a longer stay,
            or a place to return to year after year.
          </Eyebrow>
          <div className="mt-[17vw]">
            <h2 className="font-display text-[23vw] uppercase leading-[.86] min-[992px]:text-[12vw]">
              Perfect
              <br />
              sea views
            </h2>
            <h3 className="mt-[2vw] font-display text-[5vw] uppercase tracking-[.8em] min-[992px]:text-[1.5625vw]">
              From rooftop terraces
            </h3>
          </div>
          <CircleCTA className="mt-[10vw]"/>
        </div>
      </section>
      <footer
        data-footer
        id="contact"
        data-header-theme="dark"
        className="relative z-20 -mt-[16vw] flex min-h-svh flex-col justify-between px-[7vw] pb-10 pt-[15vh] text-era-cream min-[992px]:px-[22vw]"
      >
        <div
          data-footer-copy
          className="flex flex-1 flex-col items-center justify-center text-center"
        >
          <Mark />
          <a
            href="tel:+34655408648"
            className="mt-6 whitespace-nowrap font-display text-[11vw] leading-none min-[992px]:text-[8.5vw]"
          >
            +34 (655) 408-648
          </a>
          <Eyebrow className="mt-12">Sales Office</Eyebrow>
          <a
            href="https://maps.app.goo.gl/EzyfT2M6vR5aBdMu9"
            className="mt-2 text-[10px] font-bold uppercase leading-relaxed"
          >
            Avenida Litoral, 29680
            <br />
            Estepona, Málaga, Spain
          </a>
        </div>
        <div className="mt-24 flex flex-col gap-6 text-[9px] uppercase leading-relaxed min-[992px]:flex-row min-[992px]:items-end min-[992px]:justify-between">
          <div>
            <strong>Era Residence.</strong>
            <p>©2026 All rights reserved</p>
            <div className="mt-4 flex gap-3">
              <a href="/documents/privacy-policy.pdf">Privacy policy</a>
              <a href="/documents/terms-of-use.pdf">Terms of Use</a>
            </div>
          </div>
          <a href="#hero" className="border-b border-current pb-1">
            To top ↑
          </a>
          <a
            href="https://thefirstthelast.agency/"
            className="text-left min-[992px]:text-right"
          >
            Original design by
            <br />
            <strong>Thefirstthelast</strong>
          </a>
        </div>
      </footer>
    </div>
  );
}
