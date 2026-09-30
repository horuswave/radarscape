"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { primaryNav, routes, withLocale, type NavKey } from "@/lib/navigation";
import { Logo } from "@/components/ui/logo";
import { LocaleSegmented, LocaleSwitcher } from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

type HeaderDict = {
  contactCta: string;
  openMenu: string;
  closeMenu: string;
  homeLabel: string;
  localeLabel: string;
  menuTitle: string;
  navShort?: Partial<Record<NavKey, string>>;
};

type Props = {
  locale: Locale;
  dict: {
    nav: Record<NavKey, string>;
    header: HeaderDict;
  };
};

export function SiteHeader({ locale, dict }: Props) {
  const { nav, header } = dict;
  const shortLabel = (key: NavKey) => header.navShort?.[key] ?? nav[key];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile panel is open: lock page scroll, close on Escape, and
  // close if the viewport grows past the breakpoint where the panel is hidden.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const isActive = (key: NavKey) => {
    const target = withLocale(routes[key].path, locale);
    if (routes[key].path === "/") return pathname === target;
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        menuOpen
          ? "border-b border-hairline bg-white"
          : scrolled
          ? "border-b border-hairline bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(7,24,36,0.04),0_10px_30px_-20px_rgba(7,24,36,0.35)]"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <div className="rs-container flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo locale={locale} variant="navy" label={header.homeLabel} priority />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 xl:flex"
        >
          {primaryNav
            .filter((key) => key !== "contact")
            .map((key) => (
              <Link
                key={key}
                href={withLocale(routes[key].path, locale)}
                aria-current={isActive(key) ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-md px-2.5 py-2 text-[0.82rem] font-medium transition-colors ${
                  isActive(key)
                    ? "text-navy-900"
                    : "text-navy-600 hover:text-navy-900"
                }`}
              >
                {shortLabel(key)}
                <span
                  className={`absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-amber-500 transition-transform duration-200 ${
                    isActive(key) ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden
                />
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LocaleSwitcher locale={locale} label={header.localeLabel} />
          </div>
          <div className="hidden xl:block">
            <Button
              href={withLocale(routes.contact.path, locale)}
              variant="secondary"
              size="md"
              withArrow
            >
              {header.contactCta}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? header.closeMenu : header.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline text-navy-800 transition-colors hover:bg-sand-100 xl:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {/* Rendered as a fixed overlay below the header so it takes over the
          page. The header drops its backdrop-blur while open, since a
          backdrop-filter would make it the containing block for this layer. */}
      <div
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-16 z-40 sm:top-20 xl:hidden"
      >
        <div
          className="rs-backdrop-in absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
        <div
          id="mobile-menu"
          className="rs-panel-in relative max-h-full overflow-y-auto overscroll-contain rounded-b-2xl bg-white shadow-(--shadow-lift)"
        >
          <div className="rs-container pb-8 pt-4">
            <p className="rs-eyebrow mb-3">{header.menuTitle}</p>
            <nav aria-label="Mobile" className="flex flex-col">
              {primaryNav.map((key) => (
                <Link
                  key={key}
                  href={withLocale(routes[key].path, locale)}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-hairline py-3.5 text-base font-medium ${
                    isActive(key) ? "text-navy-900" : "text-navy-700"
                  }`}
                >
                  {nav[key]}
                  <Icon name="arrowRight" size={18} className="text-amber-500" />
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-6">
              <LocaleSegmented
                locale={locale}
                label={header.localeLabel}
                onNavigate={() => setMenuOpen(false)}
              />
              <Button
                href={withLocale(routes.contact.path, locale)}
                variant="primary"
                size="lg"
                withArrow
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                {header.contactCta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
