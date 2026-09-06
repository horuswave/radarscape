import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { routes, withLocale, type NavKey } from "@/lib/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { RadarMotif } from "@/components/ui/motif";
import { Icon } from "@/components/ui/icon";

type Crumb = { key: NavKey; label: string };

export function PageHero({
  locale,
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  breadcrumbLabel = "Breadcrumb",
  homeLabel = "Home",
  children,
}: {
  locale: Locale;
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: Crumb[];
  breadcrumbLabel?: string;
  homeLabel?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      <div className="rs-grid-texture absolute inset-0 opacity-40" data-on-dark aria-hidden />
      <RadarMotif
        className="pointer-events-none absolute -right-24 -top-24 h-130 w-130 text-amber-400/40"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-navy-900/40"
        aria-hidden
      />
      <Container className="relative py-14 sm:py-20">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label={breadcrumbLabel} className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-navy-200">
              <li>
                <Link
                  href={withLocale(routes.home.path, locale)}
                  className="transition-colors hover:text-white"
                >
                  {homeLabel}
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={crumb.key} className="flex items-center gap-1.5">
                    <Icon name="arrowRight" size={12} className="text-navy-400" />
                    {last ? (
                      <span aria-current="page" className="text-white">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={withLocale(routes[crumb.key].path, locale)}
                        className="transition-colors hover:text-white"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-3xl">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 text-lg leading-relaxed text-navy-100">{subtitle}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
