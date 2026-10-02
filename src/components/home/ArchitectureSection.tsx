"use client";
import { useRef } from "react";
import { assets } from "@/data/home";
import { gsap, useSectionMotion } from "@/hooks/useSectionMotion";
import { Flower, CircleCTA } from "@/components/ui/HomePrimitives";

const leftMask = "polygon(0% 0%,0% 100%,44.444% 100%,44.444% 36.111%,98.889% 36.111%,98.889% 99.074%,44.444% 99.074%,1.111% 100%,100% 100%,100% 0%)";
const rightMask = "polygon(0% 0%,0% 100%,1.111% 100%,1.111% .926%,55.556% .926%,55.556% 63.889%,1.111% 63.889%,1.111% 100%,100% 100%,100% 0%)";

export default function ArchitectureSection() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root, () => {
    const media = gsap.matchMedia();
    media.add("(min-width:992px)", () => {
      const tl = gsap.timeline({ scrollTrigger: {
        trigger: root.current, start: "top bottom", end: "top -200%", scrub: true,
        invalidateOnRefresh: true,
      }});
      tl.to("[data-arch-mask-left]", { clipPath: "polygon(0% 0%,0% 100%,44.444% 100%,44.444% 18.519%,100% 18.519%,100% 81.481%,44.444% 81.481%,1.111% 100%,100% 100%,100% 0%)", duration: .6, ease: "none" },0)
        .to("[data-arch-mask-right]", { clipPath: "polygon(0% 0%,0% 100%,0% 100%,0% 18.519%,55.556% 18.519%,55.556% 81.481%,0% 81.481%,0% 100%,100% 100%,100% 0%)", duration: .6, ease: "none" },0)
        .to("[data-arch-mask]", { scale: 1.84, duration: .4, ease: "eraInOut" },.6)
        .to("[data-arch-flower-left]", { xPercent: -50, scale: 1.84, duration: .4, ease: "eraInOut" },.6)
        .to("[data-arch-flower-right]", { xPercent: 50, scale: 1.84, duration: .4, ease: "eraInOut" },.6)
        .fromTo("[data-arch-scene]", { scale: .75, transformOrigin: "center top" }, { scale: 1, duration: .4, ease: "eraInOut" },.6)
        .to("[data-arch-mask]", { autoAlpha: 0, duration: .04 },.98);
      gsap.fromTo("[data-arch-heading]", { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: "eraOut", scrollTrigger: {trigger: root.current, start: "top -160%", toggleActions: "play none none reverse"} });
      gsap.to("[data-arch-photo]", { yPercent: 15, ease: "none", scrollTrigger: {trigger: root.current, start: "55% top", end: "bottom top", scrub: true} });
    });
  });
  return (
    <section ref={root} id="architecture" data-header-theme="dark" className="relative bg-era-cream min-[992px]:h-[calc(109.667vw+200svh-17.5px)]">
      <div data-arch-mask className="pointer-events-none sticky top-0 z-20 -mb-[100svh] hidden h-svh min-[992px]:block">
        <div data-arch-mask-left style={{clipPath:leftMask}} className="absolute inset-y-0 left-0 w-1/2 bg-era-cream" />
        <div data-arch-mask-right style={{clipPath:rightMask}} className="absolute inset-y-0 right-0 w-1/2 bg-era-cream" />
        <div data-arch-flower-left className="absolute -bottom-[8vw] -left-[10vw] w-[40vw] rotate-[-150deg]"><Flower variant="05" /></div>
        <div data-arch-flower-right className="absolute -bottom-[8vw] -right-[8vw] w-[40vw] rotate-[65deg]"><Flower variant="07" /></div>
      </div>
      <div data-arch-scene className="relative overflow-hidden text-white min-[992px]:sticky min-[992px]:top-0">
        <div className="absolute inset-0 overflow-hidden">
          <img data-arch-photo src={assets.architecture} alt="Contemporary terrace apartments with Mediterranean planting" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />
        </div>
        <div className="relative flex min-h-[160svh] flex-col justify-between px-[6vw] py-[8vw] min-[992px]:h-[calc(109.667vw-17.5px)] min-[992px]:min-h-0 min-[992px]:px-[3vw] min-[992px]:py-[3vw]">
          <div className="overflow-hidden"><h2 data-arch-heading className="text-center font-display text-[17vw] uppercase leading-none min-[992px]:text-[15vw]">Architecture</h2></div>
          <div className="flex flex-col gap-12 min-[992px]:flex-row min-[992px]:items-end min-[992px]:justify-between min-[992px]:pb-[7vw]">
            <div className="min-[992px]:ml-[9.5vw] min-[992px]:w-[37vw]">
              <h3 className="font-display text-[9vw] uppercase leading-[.98] min-[992px]:text-[2.5vw]">The architecture of ERA Residences balances clean contemporary lines with Mediterranean warmth and texture</h3>
              <p className="mt-10 text-[10px] uppercase leading-relaxed">By Schiemann Weyers<br />Architects OCWA Architects</p>
            </div>
            <CircleCTA call>Book a call now</CircleCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
