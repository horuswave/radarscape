import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Lightweight entrance animation.
 *
 * Intentionally NOT scroll-tied: content is always in the DOM and always ends
 * visible (the CSS uses `animation-fill-mode: both` onto a visible end state,
 * and falls back to plain visible with no animation support or reduced motion).
 * `delay` staggers siblings on initial load.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  style,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={["rs-reveal", className].filter(Boolean).join(" ")}
      style={{
        animationDelay: delay ? `${Math.min(delay, 6) * 70}ms` : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
