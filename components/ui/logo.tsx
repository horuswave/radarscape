import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { company } from "@/lib/company";

type LogoProps = {
  locale: Locale;
  variant?: "navy" | "white";
  className?: string;
  priority?: boolean;
  /** Accessible label for the home link. */
  label: string;
};

/** Horizontal Radarscape lockup that links to the localized home page. */
export function Logo({
  locale,
  variant = "navy",
  className = "",
  priority = false,
  label,
}: LogoProps) {
  const src =
    variant === "white"
      ? "/brand/logo-horizontal-white.png"
      : "/brand/logo-horizontal-navy.png";

  return (
    <Link
      href={`/${locale}`}
      aria-label={label}
      className={`inline-flex items-center rounded-sm ${className}`}
    >
      <Image
        src={src}
        alt={company.legalName}
        width={622}
        height={120}
        priority={priority}
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}

export function LogoSymbol({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/brand/symbol.png"
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={className}
    />
  );
}
