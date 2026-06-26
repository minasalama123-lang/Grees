"use client";

import { Button } from "./Button";

/**
 * A button that smooth-scrolls to an in-page section every time it's clicked.
 *
 * Plain `href="#id"` anchors do nothing on a second click once the URL hash
 * already equals that id — this always scrolls, regardless of the current hash.
 */
export function ScrollButton({
  targetId,
  children,
  variant = "outline",
  className,
}: {
  targetId: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "outline-light" | "ghost";
  className?: string;
}) {
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => {
        const el = document.getElementById(targetId);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Keep the URL in sync without triggering a jump.
        history.replaceState(null, "", `#${targetId}`);
      }}
    >
      {children}
    </Button>
  );
}
