import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Element tag to render. Defaults to a div. */
  as?: "div" | "section" | "li" | "article";
  /**
   * @deprecated No longer used. Kept so existing call sites still type-check.
   * The reveal is now scroll-driven CSS, which has no time-based delay.
   */
  delay?: number;
}

/**
 * Scroll-reveal wrapper — **CSS only, no JavaScript and no IntersectionObserver**
 * (the old observer-based version could leave content hidden on iOS Safari).
 *
 * The element is ALWAYS visible by default. The `.reveal` class (see
 * globals.css) adds a subtle fade + rise as the element scrolls into view, but
 * ONLY on browsers that support scroll-driven animations and when the visitor
 * hasn't requested reduced motion. Everywhere else — older Safari, iOS, no JS,
 * reduced motion — the content simply shows, never hidden.
 */
export function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}
