import type { ReactNode } from "react";

export default function RollingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-400 ease-[cubic-bezier(.25,1,.5,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(.25,1,.5,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}
