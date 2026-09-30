import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 max-w-full text-center whitespace-normal sm:whitespace-nowrap font-display font-semibold rounded-md transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-amber-500 text-ink hover:bg-amber-400 active:bg-amber-600 shadow-[0_10px_30px_-12px_rgba(247,162,31,0.7)]",
  secondary:
    "bg-navy-800 text-white hover:bg-navy-700 active:bg-navy-900",
  outline:
    "border border-current text-current hover:bg-current/10",
  ghost: "text-current hover:bg-current/10",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-2.5",
  lg: "text-[0.95rem] px-7 py-3.5",
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
  external = false,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
        {withArrow ? <Arrow /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}
