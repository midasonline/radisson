"use client";

import { useState, type FormEvent } from "react";
import Modal from "./Modal";
import SymbolIcon from "@/components/ui/symbol";
import DesktopRing from "@/components/ui/ring-desktop";

type Details = { name: string; email: string; phone: string; message: string };
type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (details: Details) => Promise<void>;
};

export default function BookCallDialog({ open, onClose, onSubmit }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!onSubmit || status === "sending") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      await onSubmit({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }
  return (
    <Modal open={open} onClose={onClose} titleId="call-title" variant="call">
      <div className="grid gap-10 min-[992px]:min-h-[29.5vw] min-[992px]:grid-cols-[1fr_.4fr_1fr] min-[992px]:gap-[4vw]">
        <div className="flex flex-col justify-between">
          <h2
            id="call-title"
            className="origin-top-left -rotate-12 font-accent text-[clamp(48px,7vw,112px)] leading-none"
          >
            Book a call
          </h2>
          <p className="mt-8 max-w-[210px] text-[10px] font-bold uppercase leading-relaxed">
            Leave your details and we will get back to you within 24 hours.
          </p>
        </div>
        <div
          aria-hidden="true"
          className="hidden flex-col items-center justify-between min-[992px]:flex"
        >
          <span className="h-[8vw] w-px bg-era-ink/35" />
          <span className="relative flex size-[8vw] items-center justify-center">
            <span className="absolute inset-0">
              <DesktopRing />
            </span>
            <span className="size-[2vw]">
              <SymbolIcon />
            </span>
          </span>
          <span className="h-[8vw] w-px bg-era-ink/35" />
        </div>
        <form
          onSubmit={submit}
          className="flex flex-col justify-center gap-3 pt-10 text-[10px] uppercase"
        >
          <label className="flex flex-col gap-2">
            Name:
            <input
              name="name"
              autoComplete="name"
              required
              className="w-full border-b border-era-ink/20 bg-transparent py-2 outline-offset-4"
            />
          </label>
          <label className="flex flex-col gap-2">
            Email:
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full border-b border-era-ink/20 bg-transparent py-2 outline-offset-4"
            />
          </label>
          <label className="flex flex-col gap-2">
            Phone:
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className="w-full border-b border-era-ink/20 bg-transparent py-2 outline-offset-4"
            />
          </label>
          <label className="flex flex-col gap-2">
            Message:
            <textarea
              name="message"
              rows={2}
              className="w-full resize-y border-b border-era-ink/20 bg-transparent py-2 outline-offset-4"
            />
          </label>
          <p className="text-[10px] leading-relaxed">
            By submitting, you agree to our{" "}
            <a
              href="/documents/privacy-policy.pdf"
              className="underline"
            >
              Privacy policy
            </a>
            .
          </p>
          <button
            disabled={!onSubmit || status === "sending" || status === "sent"}
            className="self-end rounded-full border border-current px-6 py-3 text-[9px] font-bold uppercase tracking-[.1em] disabled:opacity-40"
          >
            {status === "sending" ? "Sending…" : "Submit"}
          </button>
          <p role="status" className="text-[11px] leading-relaxed">
            {!onSubmit
              ? "Preview only — enquiries are not sent."
              : status === "sent"
                ? "Thank you. Your request has been received."
                : status === "error"
                  ? "Your request could not be sent. Please try again."
                  : ""}
          </p>
        </form>
      </div>
    </Modal>
  );
}
