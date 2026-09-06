import type { SVGProps } from "react";

/**
 * Decorative brand motifs. All are `aria-hidden`, inherit `currentColor`, and
 * are built to sit at low opacity behind content — a nod to the "Radarscape"
 * name (radar sweep + surveyed terrain).
 */

export function RadarMotif({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
      className={className}
      {...rest}
    >
      <defs>
        <radialGradient id="rs-radar-sweep" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(-45) scale(190)">
          <stop stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="200" cy="200" r="60" opacity="0.35" />
        <circle cx="200" cy="200" r="110" opacity="0.28" />
        <circle cx="200" cy="200" r="160" opacity="0.2" />
        <circle cx="200" cy="200" r="190" opacity="0.14" />
        <path d="M10 200h380M200 10v380" opacity="0.16" />
        <path d="M66 66 334 334M334 66 66 334" opacity="0.1" />
      </g>
      <path
        d="M200 200 L200 15 A185 185 0 0 1 331 69 Z"
        fill="url(#rs-radar-sweep)"
      />
      <g fill="currentColor">
        <circle cx="286" cy="132" r="3.5" />
        <circle cx="150" cy="258" r="2.5" opacity="0.7" />
        <circle cx="242" cy="292" r="2" opacity="0.5" />
      </g>
    </svg>
  );
}

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

export function BlueprintCorner({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
      className={className}
      {...rest}
    >
      <path d="M4 40V4h36" />
      <path d="M4 24h20M24 4v20" opacity="0.5" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  );
}
