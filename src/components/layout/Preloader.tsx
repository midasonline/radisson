"use client";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { Mark } from "@/components/ui/HomePrimitives";
import { useSmoothScroll } from "./SmoothScroll";

// The original arch silhouette is bundled locally; the three solid masks fill
// the space surrounding it while GSAP moves the opening through the viewport.
const mask: CSSProperties = {
  "--arch-w": "24vw",
  "--arch-y": "104vh",
  "--arch-h": "calc(var(--arch-w) * 4.6285714)",
  maskImage:
    "linear-gradient(white,white),linear-gradient(white,white),linear-gradient(white,white),url('/images/preloader-arch.svg')",
  maskSize:
    "calc(50% - var(--arch-w)/2 + 2px) 100%,calc(var(--arch-w) + 4px) max(0px,calc(var(--arch-y) + 2px)),calc(50% - var(--arch-w)/2 + 2px) 100%,var(--arch-w) var(--arch-h)",
  maskPosition: "left top,center top,right top,center var(--arch-y)",
  maskRepeat: "no-repeat",
  maskComposite: "add",
} as CSSProperties;
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const smooth = useSmoothScroll();
  const [finished, setFinished] = useState(false);
  useLayoutEffect(() => {
    let alive = true,
      done = false;
    const previousOverflow = document.body.style.overflow;
    window.scrollTo(0, 0);
    smooth?.current?.scrollTo(0, { immediate: true });
    document.body.style.overflow = "hidden";
    document.body.dataset.scrollLocked = "true";
    smooth?.current?.stop();
    const ctx = gsap.context(() => {}, root);
    const unlock = () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.scrollLocked;
      smooth?.current?.start();
    };
    const complete = () => {
      if (!alive || done) return;
      done = true;
      gsap.set(document.querySelector("[data-hero-reveal]"), { scale: 1 });
      unlock();
      setFinished(true);
      window.dispatchEvent(new Event("era:ready"));
      ScrollTrigger.refresh();
    };
    const timeout = window.setTimeout(complete, 14000);
    const launch = () => {
      if (!alive || done) return;
      ctx.add(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
          complete();
          return;
        }
        let visited = false;
        try {
          visited = sessionStorage.getItem("era-visited") === "yes";
          sessionStorage.setItem("era-visited", "yes");
        } catch {}
        const mobile = matchMedia("(max-width:991px)").matches;
        gsap.set(root.current, { "--arch-w": mobile ? "40vw" : "24vw" });
        const tl = gsap.timeline({ onComplete: complete });
        const heroReveal = document.querySelector("[data-hero-reveal]");
        if (heroReveal) gsap.set(heroReveal, { scale: mobile ? 1.15 : 0.75 });
        if (!visited) {
          tl.fromTo(
            "[data-loader-text]",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, stagger: 0.08, ease: "eraOut" },
          ).fromTo(
            "[data-loader-progress]",
            { yPercent: -100 },
            { yPercent: 0, duration: 4, ease: "eraInOut" },
            0.4,
          );
        } else {
          gsap.set("[data-loader-content]", { opacity: 0 });
          tl.to({}, { duration: 1.2 });
        }
        tl.to("[data-loader-content]", { opacity: 0, duration: 0.4 })
          .to(
            root.current,
            {
              "--arch-w": mobile ? "50vw" : "36vw",
              "--arch-y": "15vh",
              duration: 1.5,
              ease: "eraOut",
            },
            "<",
          )
          .to(
            root.current,
            {
              "--arch-w": "125vw",
              "--arch-y": "-100vh",
              duration: 2.4,
              ease: "eraInOut",
            },
            "<90%",
          );
        if (heroReveal)
          tl.to(heroReveal, { scale: 1, duration: 1.5, ease: "eraOut" }, "<");
      });
    };
    void Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]).then(launch);
    return () => {
      alive = false;
      clearTimeout(timeout);
      ctx.revert();
      unlock();
    };
  }, [smooth]);
  if (finished) return null;
  return (
    <div
      ref={root}
      style={mask}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 bottom-[-100vh] z-[100] bg-era-plum pb-[100vh] text-era-cream"
    >
      <div className="absolute inset-x-[1.5vw] top-[1.5vw] bottom-[calc(100vh+1.5vw)] border border-era-cream/10" />
      <img
        src="/images/6a2311-e22485744735d6f17214f25b6157e9b5_preloader_bg.svg"
        alt=""
        className="absolute inset-x-[1.5vw] top-[1.5vw] h-[97vh] w-[97vw] object-fill opacity-5"
      />
      <div
        data-loader-content
        className="relative flex h-full flex-col px-[6vw] min-[992px]:px-[3vw]"
      >
        <div className="flex flex-1 justify-center pt-[6vw] min-[992px]:pt-[3vw]">
          <Mark className="min-[992px]:size-[3vw]" />
        </div>
        <div className="grid grid-cols-10 gap-[1vw] items-center text-center">
          <span className="col-span-2 col-start-2 hidden font-display text-[1.5625vw] tracking-[.8em] min-[992px]:block">
            Hotels
          </span>
          <div className="col-span-10 min-[992px]:col-span-4 min-[992px]:col-start-4">
            <div className="overflow-hidden">
              <span
                data-loader-text
                className="block font-display text-[13.46vw] uppercase leading-[.91667] min-[992px]:text-[6vw]"
              >
                Radisson
                <br />
                Blu
              </span>
            </div>
            <div className="-ml-[2vw] -mt-[1.5vw] overflow-hidden pb-[2vw]">
              <span
                data-loader-text
                className="block -rotate-12 font-accent text-[11.54vw] leading-none min-[992px]:text-[4vw]"
              >
                Islamabad
              </span>
            </div>
          </div>
          <span className="col-span-2 col-start-8 hidden font-display text-[1.5625vw] tracking-[.8em] min-[992px]:block">
            Residences
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-end gap-[2vw] pb-[6vw] min-[992px]:pb-[3vw]">
          <div className="h-[20vw] w-px overflow-hidden bg-white/10 min-[992px]:h-[6vw]">
            <div data-loader-progress className="h-full w-px bg-white" />
          </div>
          <p className="text-center text-[9px] font-bold uppercase leading-[1.45] min-[992px]:text-[.6875vw]">
            Radisson Blu
            <br />
            <span className="font-normal">A place to return to.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
