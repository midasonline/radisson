"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

const ScrollContext = createContext<RefObject<Lenis | null> | null>(null);
export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const instance = useRef<Lenis | null>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tick: ((time: number) => void) | undefined;
    const configure = () => {
      if (tick) gsap.ticker.remove(tick);
      instance.current?.destroy();
      instance.current = null;
      if (preference.matches) return;
      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 2,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        anchors: true,
      });
      instance.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      if (document.body.dataset.scrollLocked === "true") lenis.stop();
    };
    configure();
    preference.addEventListener("change", configure);
    let active = true;
    void document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    let refreshFrame = 0;
    const imageReady = (event: Event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(refresh);
    };
    document.addEventListener("load", imageReady, true);
    return () => {
      active = false;
      cancelAnimationFrame(refreshFrame);
      document.removeEventListener("load", imageReady, true);
      window.removeEventListener("load", refresh);
      preference.removeEventListener("change", configure);
      if (tick) gsap.ticker.remove(tick);
      instance.current?.destroy();
      instance.current = null;
    };
  }, []);
  return (
    <ScrollContext.Provider value={instance}>{children}</ScrollContext.Provider>
  );
}
