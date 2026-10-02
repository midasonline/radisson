"use client";
import { useEffect, type RefObject } from "react";
export function useAutoSlide<T extends HTMLElement>(root: RefObject<T | null>, next: () => void, index: number) {
  useEffect(() => {
    if (!root.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let visible = false;
    const sync = () => { clearInterval(timer); if(visible && !document.hidden) timer=setInterval(next,6000); };
    const observer = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; sync(); }, {threshold:.2});
    observer.observe(root.current); document.addEventListener("visibilitychange",sync);
    return () => { clearInterval(timer); observer.disconnect(); document.removeEventListener("visibilitychange",sync); };
    // Restart the six-second interval after a manual slide change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[root,index]);
}
