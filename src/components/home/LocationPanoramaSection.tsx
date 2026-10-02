"use client";

import { useRef, type PointerEvent } from "react";
import { assets } from "@/data/home";
import { gsap, useSectionMotion } from "@/hooks/useSectionMotion";

export default function LocationPanoramaSection() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLImageElement>(null);

  const drag = useRef({
    active: false,
    x: 0,
    start: 0,
    offset: 0,
  });

  useSectionMotion(root, () => {
    gsap.fromTo(
      "[data-panorama]",
      {
        scale: 1.15,
      },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.25,
        },
      },
    );

    gsap.to("[data-cloud]", {
      xPercent: gsap.utils.wrap([-20, 20]),
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  function down(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);

    drag.current = {
      ...drag.current,
      active: true,
      x: e.clientX,
      start: drag.current.offset,
    };
  }

  function move(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active || !photo.current) return;

    const bound = Math.max(
      0,
      (photo.current.offsetWidth - e.currentTarget.clientWidth) / 2,
    );

    const x = Math.max(
      -bound,
      Math.min(bound, drag.current.start + e.clientX - drag.current.x),
    );

    drag.current.offset = x;

    photo.current.style.transform = `translateX(${x}px)`;
  }

  function up() {
    drag.current.active = false;
  }

  return (
    <section
      ref={root}
      id="location"
      data-header-theme="dark"
      className="relative overflow-hidden bg-[#8bbbd4] text-white"
    >
      <div className="relative h-[85svh] overflow-hidden min-[992px]:h-[86.535vw]">
        <div
          data-panorama
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing min-[992px]:cursor-default"
        >
          <img
            ref={photo}
            src={assets.location}
            alt="Aerial view of ERA Residence and the Estepona coastline"
            loading="lazy"
            draggable={false}
            className="relative left-[-50%] h-full w-[200%] max-w-none select-none object-cover min-[992px]:left-0 min-[992px]:w-full"
          />
        </div>

        <img
          data-cloud
          src="/images/6a0fa3-img_clouds_33.avif"
          alt=""
          className="pointer-events-none absolute -left-[10%] -top-[10%] w-[120%]"
        />

        <img
          data-cloud
          src="/images/6a0fa3-img_clouds_47.avif"
          alt=""
          className="pointer-events-none absolute right-[-25%] top-0 w-[75%]"
        />

        {/* LOCATION INFO */}
        <div className="pointer-events-none absolute bottom-[12%] left-[48%] w-[175px] text-white min-[600px]:bottom-[8%] min-[600px]:left-[57%] min-[992px]:bottom-[5.5%] min-[992px]:left-[68%] min-[992px]:w-[245px]">
          <div className="relative border-l border-white/45 pl-[14px] text-left min-[992px]:pl-[18px]">
            <h2 className="max-w-[150px] text-[11px] font-semibold uppercase leading-[1.2] min-[992px]:max-w-[175px] min-[992px]:text-[13px]">
              New Golden Mile,
              <br />
              Estepona
            </h2>

            <div className="mt-[17px] border-y border-white/35 py-[8px] min-[992px]:mt-[28px] min-[992px]:py-[10px]">
              {/* <p className="font-accent text-[15px] leading-none min-[992px]:text-[17px]"> */}
                <p className="text-[15px] leading-none min-[992px]:text-[17px]">
                Costa del Sol
              </p>
            </div>

            <p className="mt-[10px] text-[11px] leading-none min-[992px]:mt-[13px] min-[992px]:text-[13px]">
              Spain
            </p>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[.12em] min-[992px]:hidden">
          Drag to see more
        </p>
      </div>
    </section>
  );
}
