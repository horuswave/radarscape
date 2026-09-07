import "server-only";
import type { Metadata } from "next";
import { locales, localeHtmlLang, type Locale } from "@/lib/i18n";
import { routes } from "@/lib/navigation";
import { company } from "@/lib/company";
import { getDictionary } from "./dictionaries";

type PageKey = keyof Awaited<ReturnType<typeof getDictionary>>["meta"]["pages"];

/** Map a page key to its locale-agnostic path for canonical / alternate URLs. */
const pagePath: Record<PageKey, string> = {
  home: routes.home.path,
  about: routes.about.path,
  capabilities: routes.capabilities.path,
  technology: routes.technology.path,
  hseq: routes.hseq.path,
  projects: routes.projects.path,
  deliveryModel: routes.deliveryModel.path,
  whyRadarscape: routes.whyRadarscape.path,
  contact: routes.contact.path,
};

function href(path: string, locale: Locale): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Localized per-page metadata: title, description, canonical and hreflang set. */
export async function buildMetadata(
  locale: Locale,
  page: PageKey,
): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const { title, description } = dict.meta.pages[page];
  const path = pagePath[page];

  const languages = Object.fromEntries([
    ...locales.map((l) => [localeHtmlLang[l], href(path, l)]),
    ["x-default", href(path, "en")],
  ]);

  return {
    title: page === "home" ? { absolute: `${title} | ${company.shortName}` } : title,
    description,
    alternates: {
      canonical: href(path, locale),
      languages,
    },
    openGraph: {
      title,
      description,
      url: href(path, locale),
      type: "website",
      locale: localeHtmlLang[locale],
      siteName: company.legalName,
    },
  };
}

export type { PageKey };
