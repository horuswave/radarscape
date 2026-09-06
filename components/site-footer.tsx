import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { footerQuickLinks, routes, withLocale, type NavKey } from "@/lib/navigation";
import { company } from "@/lib/company";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { TopoMotif } from "@/components/ui/motif";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const f = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-navy-100">
      <TopoMotif
        className="pointer-events-none absolute -right-20 top-0 h-full w-180 text-navy-100/10"
      />
      <div className="rs-container relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          {/* Company */}
          <div className="flex flex-col gap-5">
            <Logo locale={locale} variant="white" label={dict.header.homeLabel} />
            <p className="max-w-sm text-sm leading-relaxed text-navy-200">
              {f.tagline}
            </p>
            <address className="not-italic">
              <ul className="flex flex-col gap-3 text-sm">
                <li className="flex gap-3">
                  <Icon name="location" size={18} className="mt-0.5 shrink-0 text-amber-400" />
                  <span>
                    {company.address.line1}
                    <br />
                    {company.address.line2}
                    <br />
                    {company.address.city}, {company.address.country}
                  </span>
                </li>
                <li>
                  <a
                    href={company.phoneHref}
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Icon name="phone" size={18} className="shrink-0 text-amber-400" />
                    {company.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={company.emailHref}
                    className="flex items-center gap-3 break-all transition-colors hover:text-white"
                  >
                    <Icon name="mail" size={18} className="shrink-0 text-amber-400" />
                    {company.email}
                  </a>
                </li>
              </ul>
            </address>
          </div>

          {/* Quick links */}
          <nav aria-label={f.quickLinksTitle} className="flex flex-col gap-4">
            <h2 className="rs-eyebrow" data-on-dark>
              {f.quickLinksTitle}
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {footerQuickLinks.map((key: NavKey) => (
                <li key={key}>
                  <Link
                    href={withLocale(routes[key].path, locale)}
                    className="text-navy-200 transition-colors hover:text-white"
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Capabilities */}
          <nav aria-label={f.capabilitiesTitle} className="flex flex-col gap-4">
            <h2 className="rs-eyebrow" data-on-dark>
              {f.capabilitiesTitle}
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {f.capabilityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={withLocale(link.href, locale)}
                    className="text-navy-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>{f.legalLine}</p>
          <p>
            © {year} {company.legalName}. {f.rights}
          </p>
        </div>
        <p className="mt-3 text-xs text-navy-400">{f.credit}</p>
      </div>
    </footer>
  );
}
