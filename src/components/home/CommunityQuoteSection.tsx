"use client";
import { assets } from "@/data/home";
import { Eyebrow, Mark } from "@/components/ui/HomePrimitives";
export default function CommunityQuoteSection() {
  return (
    <section
      data-header-theme="dark"
      className="relative z-10 overflow-hidden bg-era-sky text-white"
    >
      <img
        width={1920}
        height={1440}
        src={assets.quote}
        alt="Pool and Mediterranean planting at ERA Residence"
        loading="lazy"
        className="h-auto w-full"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-[3vw] left-[50.5vw] hidden w-[37vw] min-[992px]:block">
        <Mark className="mb-[2vw] ml-[9.5vw] size-[3vw]" />
        <h2 className="font-display text-[2.5vw] uppercase leading-none tracking-[-.008em]">
          <span className="inline-block w-[9.5vw]" />A destination designed to
          bring staying, living and everyday life together, creating an address
          that feels connected to Islamabad, yet removed from its pace.
        </h2>
        <Eyebrow className="mt-[4vw]">
          RADISSON BLU ISLAMABAD
          <br />
          <span className="font-normal">PROJECT VISION</span>
        </Eyebrow>
      </div>
    </section>
  );
}
