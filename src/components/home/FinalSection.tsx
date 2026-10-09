"use client";

import { useRef } from "react";
import { assets } from "@/data/home";
import { useSectionMotion, gsap } from "@/hooks/useSectionMotion";
import { Eyebrow, CircleCTA } from "@/components/ui/HomePrimitives";

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
        {
          scale: 0.75,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
        },
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
            alt="Sea views from an Radisson Blu rooftop terrace"
            loading="lazy"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/15" />
        </div>

        <div className="relative flex h-full flex-col items-center px-[8vw] py-[13vw] text-center min-[992px]:pt-[3vw]">
          <Eyebrow className="max-w-[650px] min-[992px]:w-[37vw]">
            A residence to make your own, a suite for time in the capital, or a
            setting for your brand. Let’s find the space that fits.
          </Eyebrow>

          <div className="mt-[17vw]">
            <h2 className="font-display text-[23vw] uppercase leading-[.86] min-[992px]:text-[12vw]">
              YOUR PLACE
              <br />
              IN ISLAMABAD
            </h2>

            <h3 className="mt-[2vw] font-display text-[5vw] uppercase tracking-[.8em] min-[992px]:text-[1.5625vw]">
              SUITES · RESIDENCES · RETAIL
            </h3>
          </div>

          <CircleCTA className="mt-[10vw]" />
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
          {/* CUSTOM FOOTER IMAGE */}
          <img
            src="/images/logo-dark.svg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="
              block
              w-[18vw]
              select-none
              object-contain

              min-[992px]:w-[10vw]
            "
          />

          <a
            href="tel:+923311111033"
            className="mt-6 whitespace-nowrap font-display text-[11vw] leading-none min-[992px]:text-[8.5vw]"
          >
            +92 331 1111 033
          </a>

          <Eyebrow className="mt-12">Address</Eyebrow>

          <a
            href="https://maps.app.goo.gl/cinMMChcaWVpV3cm7"
            className="mt-2 text-[10px] font-bold uppercase leading-relaxed"
          >
            Main Srinagar Highway, Mumtaz City
            <br />
            Near Islamabad International Airport
          </a>
        </div>

        <div className="mt-24 flex flex-col gap-6 text-[9px] uppercase leading-relaxed min-[992px]:flex-row min-[992px]:items-end min-[992px]:justify-between">
          <div>
            <strong>Radisson Blu</strong>

            <p>© 2026 Radisson Blu Islamabad. All rights reserved.</p>

            <div className="mt-4 flex gap-3">
              <a href="/documents/privacy-policy.pdf">Privacy policy</a>

              <a href="/documents/terms-of-use.pdf">Terms of Use</a>
            </div>
          </div>

          <a href="#hero" className="border-b border-current pb-1">
            To top ↑
          </a>

          <a
            href="https://midas.online"
            className="text-left min-[992px]:text-right"
          >
            Designed and Developed by
            <br />
            <strong>Midas Online</strong>
          </a>
        </div>
      </footer>
    </div>
  );
}
