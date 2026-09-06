import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import { lang as langParam } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import type en from "./dictionaries/en.json";

/** The shape of every dictionary is derived from the English source of truth. */
export type Dictionary = typeof en;

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
};

/**
 * Load a dictionary for an explicit locale. Deduplicated per request so a page
 * and its `generateMetadata` share one import.
 */
export const getDictionary = cache(
  async (locale: string): Promise<Dictionary> => {
    if (!isLocale(locale)) notFound();
    return loaders[locale]();
  },
);

/**
 * Resolve the active locale from the `[lang]` root param, then load its
 * dictionary. Lets deeply-nested Server Components skip prop drilling.
 */
export const getActiveLocale = cache(async (): Promise<Locale> => {
  const value = (await langParam()) ?? defaultLocale;
  if (!isLocale(value)) notFound();
  return value;
});

export async function getActiveDictionary(): Promise<Dictionary> {
  return getDictionary(await getActiveLocale());
}
