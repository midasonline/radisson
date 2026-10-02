"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/lib/animations";

/** Memoize setup with useCallback; animation ownership stays inside this scope. */
export function useGsap<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: (context: gsap.Context) => void,
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(setup, scope);
    return () => ctx.revert();
  }, [scope, setup]);
}
