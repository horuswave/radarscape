"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  locales,
  localeNames,
  localeShortNames,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { Icon } from "@/components/ui/icon";

function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/");
  // segments[0] === "" , segments[1] === current locale
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  }
  return `/${next}${pathname}`;
}

export function LocaleSwitcher({
  locale,
  onDark = false,
  label,
  onNavigate,
}: {
  locale: Locale;
  onDark?: boolean;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const trigger = onDark
    ? "text-navy-100 hover:text-white border-white/20 hover:border-white/40"
    : "text-navy-700 hover:text-navy-900 border-hairline hover:border-navy-300";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-display text-xs font-semibold tracking-wide transition-colors ${trigger}`}
      >
        <Icon name="compass" size={15} />
        {localeShortNames[locale]}
        <svg
          viewBox="0 0 20 20"
          width={12}
          height={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          aria-hidden
        >
          <path
            d="m5 8 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute right-0 z-50 mt-2 min-w-44 overflow-hidden rounded-lg border border-hairline bg-white py-1 shadow-(--shadow-lift)"
        >
          {locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                <Link
                  href={swapLocale(pathname, l)}
                  hrefLang={l}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className={`flex items-center justify-between px-3.5 py-2 text-sm transition-colors ${
                    active
                      ? "bg-navy-50 font-semibold text-navy-800"
                      : "text-navy-700 hover:bg-sand-100"
                  }`}
                >
                  <span>{localeNames[l]}</span>
                  <span className="font-display text-[0.7rem] tracking-widest text-muted">
                    {localeShortNames[l]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
