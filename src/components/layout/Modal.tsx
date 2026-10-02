"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/animations";
import { useSmoothScroll } from "./SmoothScroll";

type Props = {
  open: boolean;
  titleId: string;
  onClose: () => void;
  children: ReactNode;
  variant: "menu" | "call";
};

export default function Modal({
  open,
  titleId,
  onClose,
  children,
  variant,
}: Props) {
  const root = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const lenis = useSmoothScroll();
  const exitContext = useRef<gsap.Context | null>(null);
  const closing = useRef(false);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  function requestClose() {
    if (closing.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      closeRef.current();
      return;
    }
    closing.current = true;
    exitContext.current = gsap.context(() => {
      if (variant === "call") {
        gsap.to(panel.current, {
          rotationX: 90,
          yPercent: 200,
          rotation: 25,
          duration: 0.8,
          ease: "eraIn",
          overwrite: true,
          onComplete: () => closeRef.current(),
        });
      } else {
        gsap.to("[data-menu-line]", {
          yPercent: -110,
          duration: 0.8,
          ease: "eraIn",
          overwrite: true,
          onComplete: () => closeRef.current(),
        });
      }
    }, root);
  }
  const requestCloseRef = useRef(requestClose);
  requestCloseRef.current = requestClose;

  useLayoutEffect(() => {
    if (!open || !root.current) return;
    closing.current = false;
    const dialog = root.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;
    document.body.dataset.scrollLocked = "true";
    lenis?.current?.stop();
    dialog.showModal();
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;
      if (variant === "call") {
        gsap.fromTo(
          panel.current,
          {
            scale: 0,
            rotationX: -90,
            yPercent: -100,
            rotation: -25,
            transformPerspective: 1000,
          },
          {
            scale: 1,
            rotationX: 0,
            yPercent: 0,
            rotation: 0,
            duration: 1.2,
            ease: "eraOut",
          },
        );
      } else {
        gsap.fromTo(
          "[data-menu-line]",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.08, ease: "eraOut" },
        );
      }
    }, root);
    return () => {
      exitContext.current?.revert();
      closing.current = false;
      ctx.revert();
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      delete document.body.dataset.scrollLocked;
      lenis?.current?.start();
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, lenis, variant]);

  useEffect(() => {
    const dialog = root.current;
    if (!dialog) return;
    const cancel = (event: Event) => {
      event.preventDefault();
      requestCloseRef.current();
    };
    dialog.addEventListener("cancel", cancel);
    return () => dialog.removeEventListener("cancel", cancel);
  }, []);

  return (
    <dialog
      ref={root}
      aria-labelledby={titleId}
      data-lenis-prevent
      className={`fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto border-0 p-0 backdrop:bg-black/60 ${variant === "menu" ? "bg-era-plum text-era-cream" : "bg-transparent text-era-ink"}`}
    >
      <div
        className={`flex min-h-full w-full items-center justify-center ${variant === "call" ? "p-[5.77vw] min-[992px]:px-[12vw]" : "p-[5.77vw]"}`}
      >
        <div
          ref={panel}
          className={`relative w-full ${variant === "call" ? "bg-era-sky p-[4vw] min-[992px]:min-h-[37.5vw]" : "min-h-[85svh]"}`}
        >
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-current/50 text-lg"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    </dialog>
  );
}
