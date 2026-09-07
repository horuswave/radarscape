import type { SVGProps } from "react";

/**
 * Line icon set. 24px grid, 1.6 stroke, `currentColor`.
 * Deliberately geometric to sit alongside the Radarscape mark.
 */
export type IconName =
  | "engineering"
  | "designBuild"
  | "energy"
  | "water"
  | "maintenance"
  | "technology"
  | "hseq"
  | "projects"
  | "delivery"
  | "growth"
  | "safety"
  | "integrity"
  | "client"
  | "excellence"
  | "innovation"
  | "sustainability"
  | "check"
  | "arrowRight"
  | "arrowUpRight"
  | "location"
  | "phone"
  | "mail"
  | "team"
  | "document"
  | "compass"
  | "scale"
  | "clock";

const paths: Record<IconName, React.ReactNode> = {
  engineering: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V8l7-4 7 4v13" />
      <path d="M10 21v-5h6v5" />
      <path d="M9.5 10.5h5M9.5 13.5h5" />
    </>
  ),
  designBuild: (
    <>
      <path d="M12 3v4" />
      <path d="M12 7 5.5 20M12 7l6.5 13" />
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M7.7 15.5h8.6" />
    </>
  ),
  energy: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  water: (
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
      <path d="M9 14a3 3 0 0 0 3 3" />
    </>
  ),
  maintenance: (
    <>
      <path d="M14.7 6.3a4 4 0 0 1-5.2 5.2L4 17v3h3l5.5-5.5a4 4 0 0 1 5.2-5.2l-2.6 2.6-2-2 2.6-2.6Z" />
    </>
  ),
  technology: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  hseq: (
    <>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
  projects: (
    <>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5L20 12" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </>
  ),
  delivery: (
    <>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="M8.1 10.8 15.9 7.2M8.1 13.2l7.8 3.6" />
    </>
  ),
  growth: (
    <>
      <path d="M4 18 10 12l4 4 6-7" />
      <path d="M15 7h5v5" />
    </>
  ),
  safety: (
    <>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  integrity: (
    <>
      <path d="M12 4c1.6 1.4 3.6 2.2 6 2.3 0 6.2-2.2 10-6 12.7-3.8-2.7-6-6.5-6-12.7 2.4-.1 4.4-.9 6-2.3Z" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  client: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
    </>
  ),
  excellence: (
    <>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="m12 13 4-4" />
      <circle cx="12" cy="15" r="1.4" />
    </>
  ),
  innovation: (
    <>
      <path d="M9 17h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.8.7 1 1.2 1 2.5h6c0-1.3.2-1.8 1-2.5A6 6 0 0 0 12 3Z" />
    </>
  ),
  sustainability: (
    <>
      <path d="M20 4s.5 6-3 9.5S9 18 6 18c0-3 .5-7 4-10.5S20 4 20 4Z" />
      <path d="M6 20c0-3 1.5-5.5 4-7.5" />
    </>
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  arrowRight: <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7m0 0H8m9 0v9" />,
  location: (
    <>
      <path d="M12 21c4-4.5 7-8 7-11a7 7 0 1 0-14 0c0 3 3 6.5 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L15.5 12l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 4 6.6 1.5 1.5 0 0 1 5.5 4Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.5a3 3 0 0 1 0 5.8M17 19a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l5 5v13H7V3Z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6M10 16.5h6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5.5-5.5 2 2-5.5 5.5-2Z" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M7 20h10" />
      <path d="M4 9h16" />
      <path d="M4 9 2 14a3 3 0 0 0 6 0L4 9Z" />
      <path d="M20 9 16 14a3 3 0 0 0 6 0L20 9Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  className,
  ...rest
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
