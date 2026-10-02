"use client";

import Modal from "./Modal";
import RollingLabel from "@/components/ui/RollingLabel";

type Props = { open: boolean; onClose: () => void; onBookCall: () => void };
export default function FullscreenMenu({ open, onClose, onBookCall }: Props) {
  return (
    <Modal open={open} onClose={onClose} titleId="menu-title" variant="menu">
      <div className="flex min-h-[85svh] flex-col items-center justify-center gap-[8vh] py-16 text-center">
        <h2
          id="menu-title"
          className="font-display text-[clamp(64px,15vw,160px)] uppercase leading-[.9]"
        >
          <span className="block overflow-hidden">
            <span
              data-menu-line
              className="block -rotate-12 font-accent normal-case"
            >
              The
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-menu-line className="block">
              Menu
            </span>
          </span>
        </h2>
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col items-center gap-6 font-body text-[11px] font-bold uppercase tracking-[.2em]"
        >
          <span className="overflow-hidden">
            <a
              data-menu-line
              href="#hero"
              onClick={onClose}
              className="group block"
            >
              <RollingLabel>Home</RollingLabel>
            </a>
          </span>
          <span className="overflow-hidden">
            <a
              data-menu-line
              href="https://www.era-residence.com/apartments"
              className="group block"
            >
              <RollingLabel>Select an Apartment</RollingLabel>
            </a>
          </span>
          <span className="overflow-hidden">
            <button
              data-menu-line
              type="button"
              onClick={onBookCall}
              className="group block"
            >
              <RollingLabel>Book a call</RollingLabel>
            </button>
          </span>
          <span className="overflow-hidden">
            <a
              data-menu-line
              href="https://www.era-residence.com/contact"
              className="group block"
            >
              <RollingLabel>Contact</RollingLabel>
            </a>
          </span>
        </nav>
      </div>
    </Modal>
  );
}
