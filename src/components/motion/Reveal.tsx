"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the reveal animates, for staggered groups. */
  delay?: number;
  /** Element tag to render. Defaults to a div. */
  as?: "div" | "section" | "li" | "article";
}

// Run before the browser paints on the client (so arming doesn't flash), but
// fall back to useEffect during SSR to avoid React's layout-effect warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Force-reveal this many ms after mount if the observer never fires. */
const FALLBACK_MS = 1500;

/**
 * Scroll-reveal wrapper: fades and slides its children up the first time they
 * enter the viewport.
 *
 * Resilience is the priority — content must NEVER stay permanently hidden:
 *  - It renders VISIBLE by default (SSR / no-JS / no observer support all show
 *    content). We only switch to the hidden start state once a working
 *    IntersectionObserver has been armed and is guaranteed to reveal it.
 *  - A {FALLBACK_MS}ms timer reveals the element even if the observer never
 *    fires (e.g. some iOS Safari builds), so it can't get stuck at opacity:0.
 *  - The observer is disconnected the moment it reveals (or on cleanup).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // `armed`: a working observer is set up and WILL reveal this element, so it's
  // safe to start hidden. Until armed, the element stays visible.
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    // Stay visible when we can't reliably reveal it: no element, no observer
    // support, or the visitor prefers reduced motion.
    if (
      !el ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // We have a working observer — now it's safe to hide and animate in.
    setArmed(true);

    let observer: IntersectionObserver | null = null;
    let timer: ReturnType<typeof setTimeout>;
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      observer?.disconnect();
      clearTimeout(timer);
      setRevealed(true);
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);

    // Safety net: reveal anyway if the observer hasn't fired in time.
    timer = setTimeout(reveal, FALLBACK_MS);

    return () => {
      observer?.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const hidden = armed && !revealed;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-all duration-700 ease-luxe motion-reduce:transition-none",
        hidden ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
