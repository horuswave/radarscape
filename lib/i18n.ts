/**
 * Internationalization configuration.
 *
 * The site is served from a `/[lang]` route segment. `proxy.ts` redirects
 * un-prefixed requests to the best matching locale.
 */

export const locales = ["en", "pt", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  fr: "Français",
};

/** Short label used in the compact locale switcher. */
export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  fr: "FR",
};

/** BCP-47 tag for the `<html lang>` attribute and `Intl` formatting. */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  pt: "pt-MZ",
  fr: "fr",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
