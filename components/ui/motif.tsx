import type { SVGProps } from "react";

/**
 * Topographic contour lines. `aria-hidden`, inherits `currentColor`, meant to
 * sit at low opacity behind content as a subtle "surveyed terrain" texture.
 */
export function TopoMotif({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 600 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      className={className}
      {...rest}
    >
      <path d="M-20 90c80-40 150-40 230 0s150 40 230 0 150-40 200-20" opacity="0.5" />
      <path d="M-20 130c80-40 150-40 230 0s150 40 230 0 150-40 200-20" opacity="0.4" />
      <path d="M-20 170c80-40 150-40 230 0s150 40 230 0 150-40 200-20" opacity="0.3" />
      <path d="M-20 210c80-40 150-40 230 0s150 40 230 0 150-40 200-20" opacity="0.22" />
      <path d="M-20 250c80-40 150-40 230 0s150 40 230 0 150-40 200-20" opacity="0.16" />
    </svg>
  );
}
