"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import SymbolIcon from "@/components/ui/symbol";
import DesktopRing from "@/components/ui/ring-desktop";
import MobileRing from "@/components/ui/ring-mobile";
import RollingLabel from "@/components/ui/RollingLabel";
import FullscreenMenu from "./FullscreenMenu";
import BookCallDialog from "./BookCallDialog";

/** Later sections use data-header-theme="light" (dark text) or "dark" (white text). */
export default function Header() {
  const scope = useRef<HTMLElement>(null);
  const [overlay, setOverlay] = useState<"menu" | "call" | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const speed = { value: 30 };
        let angle = 0;
        const ring = gsap.quickSetter("[data-logo-ring]", "rotation", "deg");
        const update = (_time: number, delta: number) => {
          angle += (speed.value * Math.min(delta, 100)) / 1000;
          ring(angle);
        };
        gsap.ticker.add(update);
        const decelerate = gsap
          .delayedCall(0.1, () => {
            gsap.to(speed, {
              value: 30 * Math.sign(speed.value || 1),
              duration: 1.2,
              ease: "eraOut",
              overwrite: true,
            });
          })
          .pause();
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            gsap.to(speed, {
              value:
                self.direction * (30 + Math.min(Math.abs(velocity) / 6, 360)),
              duration: 0.3,
              ease: "eraOut",
              overwrite: true,
            });
            decelerate.restart(true);
          },
        });
        return () => {
          gsap.ticker.remove(update);
          decelerate.kill();
          gsap.killTweensOf(speed);
        };
      });
      const parts =
        document.querySelectorAll<HTMLElement>("[data-header-part]") ??
        [];
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-header-theme]",
      );
      sections.forEach((section) => {
        parts.forEach((part) => {
          const apply = () => {
            const bounds = part.getBoundingClientRect();
            const region = section.getBoundingClientRect();
            const x = bounds.left + bounds.width / 2;
            if (x < region.left || x > region.right) return;
            gsap.set(part, {
              color:
                section.dataset.headerTheme === "dark" ? "#ffffff" : "#17233b",
            });
          };
          ScrollTrigger.create({
            trigger: section,
            start: () => {
              const r = part.getBoundingClientRect();
              return `top top+=${r.top + r.height / 2}`;
            },
            end: () => {
              const r = part.getBoundingClientRect();
              return `bottom top+=${r.top + r.height / 2}`;
            },
            onEnter: apply,
            onEnterBack: apply,
            onRefresh: (self) => {
              if (self.isActive) apply();
            },
          });
        });
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const book = () => setOverlay("call");
    window.addEventListener("era:book-call", book);
    return () => window.removeEventListener("era:book-call", book);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 992px)");
    const closeMobileMenu = () => {
      if (desktop.matches)
        setOverlay((current) => (current === "menu" ? null : current));
    };
    desktop.addEventListener("change", closeMobileMenu);
    return () => desktop.removeEventListener("change", closeMobileMenu);
  }, []);

  return (
    <>
      <header
        ref={scope}
        aria-label="Site header"
        className="relative z-50 text-era-ink"
      >
        <a
          data-header-part
          href="#hero"
          aria-label="ERA Residence — back to top"
          className="fixed left-[5.77vw] top-[5.77vw] flex aspect-square w-[19.23vw] items-center justify-center min-[992px]:left-[3vw] min-[992px]:top-[3vw] min-[992px]:w-[8.5vw]"
        >
          <span
            aria-hidden="true"
            className="relative z-10 block size-[7.69vw] min-[992px]:size-[3vw]"
          >
            <SymbolIcon />
          </span>
          <span
            aria-hidden="true"
            data-logo-ring
            className="absolute inset-0 hidden min-[992px]:block"
          >
            <DesktopRing />
          </span>
          <span
            aria-hidden="true"
            data-logo-ring
            className="absolute inset-0 block min-[992px]:hidden"
          >
            <MobileRing />
          </span>
        </a>
        <nav
          data-header-part
          aria-label="Primary navigation"
          className="fixed right-[5.77vw] top-[5.77vw] text-right min-[992px]:right-[3vw] min-[992px]:top-[3vw] min-[992px]:w-[8.5vw]"
        >
          <div className="hidden flex-col items-end min-[992px]:flex">
            <a
              href="https://www.era-residence.com/apartments"
              className="group block border-b border-current pb-[.25vw] font-display text-[1.75vw] uppercase leading-none"
            >
              <RollingLabel>
                Select
                <br />
                an Apartment
              </RollingLabel>
            </a>
            <div className="h-[1.5vw]" />
            <button
              onClick={() => setOverlay("call")}
              type="button"
              aria-haspopup="dialog"
              className="group block font-body text-[.5625vw] font-bold uppercase leading-[1.3333] tracking-[.32em]"
            >
              <RollingLabel>Book a call</RollingLabel>
            </button>
            <div className="h-[.25vw]" />
            <a
              href="https://www.era-residence.com/contact"
              className="group block font-body text-[.5625vw] font-bold uppercase leading-[1.3333] tracking-[.32em]"
            >
              <RollingLabel>Contact</RollingLabel>
            </a>
          </div>
          <button
            onClick={() => setOverlay("menu")}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={overlay === "menu"}
            className="group flex min-h-11 items-center gap-1 font-body text-[2.164vw] font-bold uppercase tracking-[.32em] min-[992px]:hidden"
          >
            <RollingLabel>Menu</RollingLabel>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6 fill-current"
            >
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
        </nav>
      </header>
      <FullscreenMenu
        open={overlay === "menu"}
        onClose={() => setOverlay(null)}
        onBookCall={() => setOverlay("call")}
      />
      <BookCallDialog
        open={overlay === "call"}
        onClose={() => setOverlay(null)}
      />
    </>
  );
}
