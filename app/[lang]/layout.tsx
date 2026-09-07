import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { lang as langParam } from "next/root-params";
import "../globals.css";
import {
  isLocale,
  locales,
  localeHtmlLang,
  type Locale,
} from "@/lib/i18n";
import { company } from "@/lib/company";
import { getDictionary } from "./dictionaries";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const raw = (await langParam()) ?? "en";
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = await getDictionary(locale);
  const meta = dict.meta.site;

  const languageAlternates = Object.fromEntries(
    locales.map((l) => [localeHtmlLang[l], `/${l}`]),
  );

  return {
    metadataBase: new URL(company.siteUrl),
    title: {
      default: meta.title,
      template: `%s | ${company.shortName}`,
    },
    description: meta.description,
    applicationName: company.shortName,
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languageAlternates, "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: company.legalName,
      title: meta.title,
      description: meta.description,
      locale: localeHtmlLang[locale],
      url: `/${locale}`,
    },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={localeHtmlLang[lang]}
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100"
        >
          {dict.a11y.skipToContent}
        </a>
        <SiteHeader locale={lang} dict={{ nav: dict.nav, header: dict.header }} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={lang} dict={dict} />
      </body>
    </html>
  );
}
