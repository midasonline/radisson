"use client";

import { useRef } from "react";
import { assets } from "@/data/home";

export default function CoastSection() {
  const root = useRef<HTMLElement>(null);

  return (
    <section
      ref={root}
      data-coast-panel
      data-header-theme="light"
      className="relative w-full shrink-0 overflow-hidden bg-era-cream px-[8vw] pb-[12vw] pt-[10vw] text-center min-[992px]:flex min-[992px]:h-svh min-[992px]:w-[94vw] min-[992px]:flex-col min-[992px]:justify-between min-[992px]:px-[9.5vw] min-[992px]:py-[3vw]"
    >
      <h2 className="relative z-10 font-display text-[12vw] uppercase leading-[.9] min-[992px]:mt-auto min-[992px]:mb-auto min-[992px]:text-[6vw]">
        THE CAPITAL WITHIN REACH
        <span className="block -rotate-12 font-accent normal-case leading-[.7]">
          the world
        </span>
        BEYOND
      </h2>

      {/* VIDEO FLOWER OVERLAY */}
      <video
        src="/images/bougainvillea-flowers_03.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[14vw]
          -scale-x-100
          top-0
          z-0
          w-[50vw]
          max-w-none

          min-[992px]:w-[50vw]
        "
      />

      <div className="relative z-10 mt-[12vw] w-full overflow-x-auto min-[992px]:mt-0">
        <img
          src={assets.coastLabels}
          alt="Gibraltar 50 min, Estepona 10 min, Kempinski 5 min, Puerto Banús 20 min, Marbella 25 min, Málaga Airport 45 min"
          loading="lazy"
          className="w-full"
        />

        <img
          data-coast-path
          src={assets.coast}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full"
        />
      </div>
    </section>
  );
}
