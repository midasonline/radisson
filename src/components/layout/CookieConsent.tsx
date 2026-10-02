"use client";
import { useEffect, useState } from "react";
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      setVisible(!localStorage.getItem("era-cookie-choice"));
    } catch {
      setVisible(true);
    }
  }, []);
  function choose(value: string) {
    try {
      localStorage.setItem("era-cookie-choice", value);
    } catch {}
    setVisible(false);
  }
  if (!visible) return null;
  return (
    <aside
      aria-label="Cookie preference"
      className="fixed bottom-5 right-5 z-[60] w-[min(360px,calc(100vw-40px))] overflow-hidden rounded-sm bg-era-cream p-6 text-era-ink min-[992px]:bottom-[2.5vw] min-[992px]:right-[2.5vw] min-[992px]:flex min-[992px]:aspect-[17/21] min-[992px]:w-[19vw] min-[992px]:flex-col min-[992px]:justify-between min-[992px]:p-[1.5vw]"
    >
      <h2 className="-ml-[3vw] -rotate-12 font-accent text-[70px] leading-none min-[992px]:text-[12vw]">Cookies</h2>
      <p className="mt-3 text-center text-[9px] font-bold uppercase leading-[1.45] min-[992px]:mt-auto min-[992px]:text-[.6875vw]">
        This website uses cookies to ensure you get the best experience on
        website.
      </p>
      <div className="mt-[1vw] flex justify-center gap-[.5vw] font-display text-[24px] uppercase leading-none min-[992px]:text-[1.75vw]">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="border-b border-current uppercase"
        >
          Accept
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => choose("declined")}
          className="border-b border-current uppercase"
        >
          Decline
        </button>
      </div>
    </aside>
  );
}
